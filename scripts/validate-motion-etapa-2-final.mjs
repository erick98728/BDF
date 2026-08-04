import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const currentBaseUrl =
  process.env.MOTION_VALIDATION_URL || "http://127.0.0.1:3000";
const outputDir =
  process.env.MOTION_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-2";
const baseline = JSON.parse(
  fs.readFileSync("docs/fase-4/etapa-1/baseline.json", "utf8"),
);
const routes = baseline.metadata.routes;
const widths = [1920, 1440, 1280, 1024, 900, 768, 640, 430, 390, 360];
const clsTolerance = 0.01;
const errors = [];
const warnings = [];
const cases = [];
const interactions = [];

fs.mkdirSync(outputDir, { recursive: true });

const baselineByRouteWidth = new Map(
  baseline.results.map((result) => [
    `${result.route.id}:${result.width}`,
    result,
  ]),
);

const dockRoutes = new Set([
  "home",
  "download",
  "lore",
  "personagens",
  "studio",
  "devlog",
  "roadmap",
  "galeria",
  "login",
  "devlog-devlog-construindo-o-bosque-da-nevoa-perdida",
  "devlog-devlog-criando-o-sistema-de-dash",
  "devlog-devlog-primeiro-chefe-lucarelli",
  "devlog-devlog-preparando-a-primeira-demo-jogavel",
]);

function heightForWidth(width) {
  if (width === 1920) return 1080;
  if (width <= 430) return 844;
  if (width <= 768) return 1024;
  return 900;
}

function recordError(scope, message) {
  errors.push(`${scope}: ${message}`);
}

function recordWarning(scope, message) {
  warnings.push(`${scope}: ${message}`);
}

function average(values) {
  return values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : 0;
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

async function installInstrumentation(context) {
  await context.addInitScript(() => {
    const audit = {
      cls: 0,
      rafCalls: 0,
      rectCalls: 0,
      globalListeners: { window: 0, document: 0 },
    };

    Object.defineProperty(window, "__motionAudit", {
      configurable: true,
      value: audit,
    });

    if (
      "PerformanceObserver" in window &&
      PerformanceObserver.supportedEntryTypes?.includes("layout-shift")
    ) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) audit.cls += entry.value;
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
    }

    const originalRaf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (callback) => {
      audit.rafCalls += 1;
      return originalRaf(callback);
    };

    const originalRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
      audit.rectCalls += 1;
      return originalRect.call(this);
    };

    const originalAdd = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function addEventListener(
      type,
      listener,
      options,
    ) {
      if (this === window) audit.globalListeners.window += 1;
      if (this === document) audit.globalListeners.document += 1;
      return originalAdd.call(this, type, listener, options);
    };
  });
}

async function settle(page, delay = 550) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(delay);
}

async function resetCounters(page) {
  await page.evaluate(() => {
    if (!window.__motionAudit) return;
    window.__motionAudit.rafCalls = 0;
    window.__motionAudit.rectCalls = 0;
  });
}

async function fastScroll(page) {
  await page.evaluate(async () => {
    const range = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );

    for (const progress of [0, 0.18, 0.36, 0.58, 0.78, 1]) {
      window.scrollTo({ top: range * progress, behavior: "instant" });
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
    }
  });
  await page.waitForTimeout(180);
}

async function readState(page) {
  return page.evaluate(() => {
    const audit = window.__motionAudit || {
      cls: 0,
      rafCalls: 0,
      rectCalls: 0,
      globalListeners: { window: 0, document: 0 },
    };
    const reveals = Array.from(
      document.querySelectorAll("[data-fx-reveal], [data-fx-watch]"),
    );
    const animations = document.getAnimations({ subtree: true });
    const infiniteAnimations = animations.filter(
      (animation) => animation.effect?.getTiming?.().iterations === Infinity,
    );
    const fixedPaintSurfaces = [];

    for (const [selector, pseudo] of [
      [".surface-glass", "::after"],
      [".fx-button", "::before"],
      [".game-glyph", "::before"],
      [".fx-card--interactive > .surface-glass", "::after"],
    ]) {
      Array.from(document.querySelectorAll(selector))
        .slice(0, 30)
        .forEach((element) => {
          try {
            if (
              getComputedStyle(element, pseudo).backgroundAttachment ===
              "fixed"
            ) {
              fixedPaintSurfaces.push(`${selector}${pseudo}`);
            }
          } catch {
            // A pseudo-element unavailable does not invalidate the page.
          }
        });
    }

    const timelines = Array.from(
      document.querySelectorAll("[data-fx-timeline]"),
    ).map((element) => ({
      progress: Number.parseFloat(
        getComputedStyle(element).getPropertyValue(
          "--fx-timeline-progress",
        ) || "0",
      ),
      nodes: element.querySelectorAll("[data-fx-timeline-node]").length,
      inactiveNodes: element.querySelectorAll(
        '[data-fx-timeline-node]:not([data-fx-active="true"])',
      ).length,
    }));

    const dockControls = Array.from(
      document.querySelectorAll(".dock-menu__control"),
    ).map((element) => {
      const bounds = element.getBoundingClientRect();
      return { width: bounds.width, height: bounds.height };
    });

    return {
      cls: audit.cls,
      rafCalls: audit.rafCalls,
      rectCalls: audit.rectCalls,
      globalListeners: audit.globalListeners,
      pendingReveals: reveals.filter(
        (element) => element.getAttribute("data-fx-state") === "pending",
      ).length,
      invisibleReveals: reveals.filter((element) => {
        const style = getComputedStyle(element);
        return (
          style.visibility === "hidden" ||
          Number.parseFloat(style.opacity || "1") < 0.02
        );
      }).length,
      infiniteAnimations: infiniteAnimations.length,
      runningAnimations: animations.filter(
        (animation) => animation.playState === "running",
      ).length,
      fixedPaintSurfaces,
      visibleScrollIndicators: Array.from(
        document.querySelectorAll(".fx-scroll-progress"),
      ).filter((element) => getComputedStyle(element).display !== "none")
        .length,
      visibleRouteIndicators: Array.from(
        document.querySelectorAll(".route-transition-progress"),
      ).filter((element) => getComputedStyle(element).display !== "none")
        .length,
      routeBusy:
        document.querySelector(".route-transition-shell")?.getAttribute(
          "aria-busy",
        ) ?? null,
      routeDataset: document.documentElement.dataset.routeTransition ?? null,
      activeLocalLights: document.querySelectorAll(
        '[data-fx-pointer="active"]',
      ).length,
      rootHasDynamicLight:
        Boolean(
          document.documentElement.style.getPropertyValue(
            "--scene-light-x",
          ),
        ) ||
        Boolean(
          document.documentElement.style.getPropertyValue(
            "--scene-light-y",
          ),
        ),
      strategicElements: document.querySelectorAll(
        "[data-fx-spotlight], [data-fx-magnetic]",
      ).length,
      timelines,
      heroEntry:
        document.querySelector(".hero-section")?.getAttribute(
          "data-hero-entry",
        ) ?? null,
      dockItems: document.querySelectorAll(".dock-menu__item").length,
      activeDockItems: document.querySelectorAll(
        ".dock-menu__item.is-active",
      ).length,
      dockControls,
      overflow: Math.max(
        document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        0,
      ),
      bodyTextLength: document.body.innerText.trim().length,
    };
  });
}

async function waitForRouteIdle(page, scope, timeout = 2800) {
  try {
    await page.waitForFunction(
      () => {
        const shell = document.querySelector(".route-transition-shell");
        return (
          shell?.getAttribute("aria-busy") !== "true" &&
          !document.documentElement.dataset.routeTransition
        );
      },
      undefined,
      { timeout },
    );
  } catch {
    const state = await readState(page);
    recordError(
      scope,
      `navegação pendente: busy=${state.routeBusy}, dataset=${state.routeDataset}`,
    );
  }
}

async function runMatrix(browser) {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: heightForWidth(width) },
      reducedMotion: "no-preference",
    });
    await installInstrumentation(context);
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    for (const route of routes) {
      const scope = `${route.id}@${width}`;
      consoleErrors.length = 0;
      pageErrors.length = 0;
      let response;

      try {
        response = await page.goto(`${currentBaseUrl}${route.path}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
      } catch (error) {
        recordError(scope, `falha de navegação: ${error.message}`);
        continue;
      }

      await settle(page);
      const initial = await readState(page);
      await resetCounters(page);
      await fastScroll(page);
      const final = await readState(page);
      const expectedStatus = route.id === "404" ? 404 : 200;
      const expectedDockItems = dockRoutes.has(route.id) ? 1 : 0;
      const baselineCase = baselineByRouteWidth.get(`${route.id}:${width}`);
      const baselineCls = baselineCase?.stable?.cls ?? 0;

      if (response?.status() !== expectedStatus) {
        recordError(
          scope,
          `HTTP ${response?.status()}; esperado ${expectedStatus}`,
        );
      }
      if (initial.bodyTextLength === 0) recordError(scope, "página vazia");
      if (initial.visibleScrollIndicators !== 1) {
        recordError(
          scope,
          `indicadores superiores=${initial.visibleScrollIndicators}`,
        );
      }
      if (initial.visibleRouteIndicators !== 0) {
        recordError(
          scope,
          `indicadores concorrentes=${initial.visibleRouteIndicators}`,
        );
      }
      if (final.pendingReveals !== 0 || final.invisibleReveals !== 0) {
        recordError(
          scope,
          `reveals pendentes=${final.pendingReveals}, invisíveis=${final.invisibleReveals}`,
        );
      }
      if (initial.infiniteAnimations !== 0) {
        recordError(
          scope,
          `animações infinitas=${initial.infiniteAnimations}`,
        );
      }
      if (initial.fixedPaintSurfaces.length !== 0) {
        recordError(
          scope,
          `background fixed=${initial.fixedPaintSurfaces.join(",")}`,
        );
      }
      if (initial.rootHasDynamicLight) {
        recordError(scope, "luz dinâmica escrita na raiz");
      }
      if (initial.activeLocalLights > 1) {
        recordError(
          scope,
          `luzes locais ativas=${initial.activeLocalLights}`,
        );
      }
      if (initial.activeDockItems !== expectedDockItems) {
        recordError(
          scope,
          `itens ativos do Dock=${initial.activeDockItems}; esperado ${expectedDockItems}`,
        );
      }
      if (initial.overflow > 1) {
        recordError(scope, `overflow horizontal=${initial.overflow}px`);
      }

      const relevantConsoleErrors = consoleErrors.filter((message) => {
        if (route.id !== "404") return true;
        return !/404|not found|failed to load resource/i.test(message);
      });
      if (relevantConsoleErrors.length) {
        recordError(scope, `console: ${relevantConsoleErrors.join(" | ")}`);
      }
      if (pageErrors.length) {
        recordError(scope, `pageerror: ${pageErrors.join(" | ")}`);
      }

      cases.push({
        route: route.id,
        path: route.path,
        width,
        status: response?.status() ?? null,
        baselineCls,
        currentCls: final.cls,
        pendingReveals: final.pendingReveals,
        invisibleReveals: final.invisibleReveals,
        infiniteAnimations: initial.infiniteAnimations,
        fixedPaintSurfaces: initial.fixedPaintSurfaces.length,
        strategicElements: initial.strategicElements,
        rectCallsDuringFastScroll: final.rectCalls,
        timelines: final.timelines,
        routeBusy: final.routeBusy,
        routeDataset: final.routeDataset,
        overflow: initial.overflow,
      });
    }

    await context.close();
  }
}

function validateClsByWidth() {
  const results = [];

  for (const width of widths) {
    const widthCases = cases.filter((item) => item.width === width);
    const baselineValues = widthCases.map((item) => item.baselineCls);
    const currentValues = widthCases.map((item) => item.currentCls);
    const baselineAverage = average(baselineValues);
    const currentAverage = average(currentValues);
    const baselineMedian = median(baselineValues);
    const currentMedian = median(currentValues);

    if (currentAverage > baselineAverage + clsTolerance) {
      recordError(
        `CLS@${width}`,
        `média regrediu de ${baselineAverage.toFixed(4)} para ${currentAverage.toFixed(4)}`,
      );
    }

    results.push({
      width,
      baselineAverage,
      currentAverage,
      averageDelta: currentAverage - baselineAverage,
      baselineMedian,
      currentMedian,
      medianDelta: currentMedian - baselineMedian,
      baselineMaximum: Math.max(...baselineValues, 0),
      currentMaximum: Math.max(...currentValues, 0),
    });
  }

  return results;
}

async function runNavigation(page) {
  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 420);
  const firstHero = (await readState(page)).heroEntry;

  await page.locator('a[href="/lore"]').first().click({ noWaitAfter: true });
  await page.waitForURL(/\/lore(?:\?|$)/, { timeout: 10000 });
  await waitForRouteIdle(page, "navigation:link");

  await page.locator('.dock-menu a[href="/"]').click({ noWaitAfter: true });
  await page.waitForURL((url) => url.pathname === "/", { timeout: 10000 });
  await waitForRouteIdle(page, "navigation:return-home");
  const returnHero = (await readState(page)).heroEntry;

  await page.locator('a[href="/roadmap"]').first().click({ noWaitAfter: true });
  await page.waitForURL(/\/roadmap(?:\?|$)/, { timeout: 10000 });
  await waitForRouteIdle(page, "navigation:roadmap");
  await page.goBack({ waitUntil: "domcontentloaded" });
  await waitForRouteIdle(page, "navigation:back");
  await page.goForward({ waitUntil: "domcontentloaded" });
  await waitForRouteIdle(page, "navigation:forward");

  await page.goto(`${currentBaseUrl}/?motionAudit=0`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.evaluate(() => {
    const link = document.createElement("a");
    link.id = "query-audit";
    link.href = "/?motionAudit=1";
    link.textContent = "query";
    document.body.appendChild(link);
  });
  await page.locator("#query-audit").click({ noWaitAfter: true });
  await page.waitForURL(/motionAudit=1/, { timeout: 10000 });
  await waitForRouteIdle(page, "navigation:query");

  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 250);
  await page.locator('a[href="#visao-geral"]').first().click();
  await page.waitForTimeout(100);
  const hashState = await readState(page);

  await page.evaluate(() => {
    const link = document.createElement("a");
    link.id = "cancel-audit";
    link.href = "/roadmap";
    link.textContent = "cancel";
    link.addEventListener("click", (event) => event.preventDefault());
    document.body.appendChild(link);
  });
  await page.locator("#cancel-audit").click();
  await page.waitForTimeout(100);
  const canceledState = await readState(page);

  await page.evaluate(() => {
    const first = document.querySelector('a[href="/lore"]');
    const second = document.querySelector('a[href="/roadmap"]');
    if (first instanceof HTMLAnchorElement) first.click();
    if (second instanceof HTMLAnchorElement) second.click();
  });
  await page.waitForURL(/\/(?:lore|roadmap)(?:\?|$)/, { timeout: 10000 });
  await waitForRouteIdle(page, "navigation:rapid");

  await page.goto(`${currentBaseUrl}/auditoria-fase-4-rota-inexistente`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await waitForRouteIdle(page, "navigation:404");

  if (firstHero !== "first") {
    recordError("navigation", `Hero inicial=${firstHero}`);
  }
  if (returnHero !== "return") {
    recordError("navigation", `Hero de retorno=${returnHero}`);
  }
  if (hashState.routeBusy === "true" || hashState.routeDataset) {
    recordError("navigation", "hash deixou estado pendente");
  }
  if (canceledState.routeBusy === "true" || canceledState.routeDataset) {
    recordError("navigation", "link cancelado ativou loading");
  }

  interactions.push({
    type: "navigation",
    firstHero,
    returnHero,
    hashState: {
      routeBusy: hashState.routeBusy,
      routeDataset: hashState.routeDataset,
    },
    canceledState: {
      routeBusy: canceledState.routeBusy,
      routeDataset: canceledState.routeDataset,
    },
  });
}

async function runGallery(page, width, touch = false) {
  const scope = `gallery@${width}`;
  await page.goto(`${currentBaseUrl}/galeria`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 650);
  const filters = page.locator(".gallery-filter");
  const filterCount = await filters.count();

  if (filterCount !== 6) recordError(scope, `filtros=${filterCount}`);

  for (let index = 0; index < filterCount; index += 1) {
    if (touch) await filters.nth(index).tap();
    else await filters.nth(index).click();
    await page.waitForTimeout(410);

    if ((await page.locator('.gallery-filter[aria-pressed="true"]').count()) !== 1) {
      recordError(scope, `filtro ${index} deixou múltiplos estados ativos`);
    }
    if ((await page.locator(".gallery-entry").count()) < 1) {
      recordError(scope, `filtro ${index} removeu todo o conteúdo`);
    }
  }

  if (touch) await filters.first().tap();
  else await filters.first().click();
  await page.waitForTimeout(410);
  const opener = page.locator(".gallery-entry").first();
  await opener.focus();
  if (touch) await opener.tap();
  else await opener.click();

  const dialog = page.locator('[role="dialog"]');
  await dialog.waitFor({ state: "visible", timeout: 3000 });
  const focusOnOpen = await page.evaluate(() =>
    document.activeElement?.getAttribute("aria-label"),
  );

  const next = page.locator('button[aria-label^="Abrir próximo item"]');
  for (let index = 0; index < 5; index += 1) {
    if (touch) await next.tap();
    else await next.click({ delay: 10 });
  }
  await page.waitForTimeout(220);

  if ((await dialog.count()) !== 1) {
    recordError(scope, "cliques rápidos quebraram o modal");
  }
  if (focusOnOpen !== "Fechar preview") {
    recordError(scope, `foco inicial=${focusOnOpen}`);
  }

  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "detached", timeout: 3000 });
  await page.waitForTimeout(80);
  const focusReturned = await page.evaluate(() =>
    document.activeElement?.classList.contains("gallery-entry"),
  );
  if (!focusReturned) recordError(scope, "foco não retornou ao item");

  interactions.push({
    type: "gallery",
    width,
    touch,
    filterCount,
    focusOnOpen,
    focusReturned,
  });
}

async function runTimelines(page, width) {
  for (const route of ["/roadmap", "/lore"]) {
    const scope = `timeline:${route}@${width}`;
    await page.goto(`${currentBaseUrl}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await settle(page, 500);
    await resetCounters(page);
    await fastScroll(page);
    const state = await readState(page);

    for (const timeline of state.timelines) {
      if (timeline.progress < 0.98) {
        recordError(scope, `progresso=${timeline.progress}`);
      }
      if (timeline.inactiveNodes !== 0) {
        recordError(scope, `nós inativos=${timeline.inactiveNodes}`);
      }
    }

    interactions.push({
      type: "timeline",
      route,
      width,
      rectCallsDuringFastScroll: state.rectCalls,
      timelines: state.timelines,
    });
  }
}

async function runDock(page) {
  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 450);
  const item = page.locator(".dock-menu__item").nth(3);
  const bounds = await item.boundingBox();

  if (!bounds) {
    recordError("dock", "item sem geometria");
    return;
  }

  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.waitForTimeout(240);
  const activeScale = await item.evaluate((element) =>
    Number.parseFloat(
      getComputedStyle(element).getPropertyValue("--dock-menu-scale") || "1",
    ),
  );
  await page.mouse.move(0, 0);
  await page.waitForTimeout(900);
  const restingScale = await item.evaluate((element) =>
    Number.parseFloat(
      getComputedStyle(element).getPropertyValue("--dock-menu-scale") || "1",
    ),
  );

  if (activeScale <= 1) recordError("dock", "ampliação não ativou");
  if (Math.abs(restingScale - 1) > 0.01) {
    recordError("dock", `mola não repousou=${restingScale}`);
  }

  interactions.push({ type: "dock", activeScale, restingScale });
}

async function runLifecycle(page, context) {
  await page.goto(`${currentBaseUrl}/roadmap`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 420);
  const secondary = await context.newPage();
  await secondary.goto("about:blank");
  await secondary.bringToFront();
  await page.waitForTimeout(150);
  await page.bringToFront();
  await page.waitForTimeout(220);
  const restored = await readState(page);

  await page.setViewportSize({ width: 1024, height: 900 });
  await page.waitForTimeout(120);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(220);
  const resized = await readState(page);
  await secondary.close();

  if (restored.routeBusy === "true" || restored.routeDataset) {
    recordError("lifecycle", "aba restaurada deixou navegação pendente");
  }
  if (restored.activeLocalLights !== 0) {
    recordError("lifecycle", "aba restaurada manteve luz ativa");
  }
  if (resized.pendingReveals !== 0) {
    recordError("lifecycle", `resize deixou reveals=${resized.pendingReveals}`);
  }

  interactions.push({
    type: "lifecycle",
    restored: {
      routeBusy: restored.routeBusy,
      routeDataset: restored.routeDataset,
      activeLocalLights: restored.activeLocalLights,
    },
    resizedPendingReveals: resized.pendingReveals,
  });
}

async function runFinePointer(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
    hasTouch: false,
  });
  await installInstrumentation(context);
  const page = await context.newPage();
  await runNavigation(page);
  await runGallery(page, 1440, false);
  await runTimelines(page, 1440);
  await runDock(page);
  await runLifecycle(page, context);
  await context.close();

  const tablet = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    reducedMotion: "no-preference",
  });
  await installInstrumentation(tablet);
  const tabletPage = await tablet.newPage();
  await runTimelines(tabletPage, 768);
  await tablet.close();
}

async function runCoarsePointer(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
    hasTouch: true,
    isMobile: true,
  });
  await installInstrumentation(context);
  const page = await context.newPage();
  await runGallery(page, 390, true);
  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 450);
  const state = await readState(page);
  const capabilities = await page.evaluate(() => ({
    coarse: matchMedia("(pointer: coarse)").matches,
    noHover: matchMedia("(hover: none)").matches,
  }));
  const dockScales = await page
    .locator(".dock-menu__item")
    .evaluateAll((elements) =>
      elements.map((element) =>
        Number.parseFloat(
          getComputedStyle(element).getPropertyValue("--dock-menu-scale") ||
            "1",
        ),
      ),
    );

  if (!capabilities.coarse || !capabilities.noHover) {
    recordError("coarse-pointer", JSON.stringify(capabilities));
  }
  if (state.activeLocalLights !== 0) {
    recordError("coarse-pointer", "touch ativou luz dinâmica");
  }
  if (dockScales.some((scale) => Math.abs(scale - 1) > 0.01)) {
    recordError("coarse-pointer", `Dock ampliado=${dockScales}`);
  }
  if (
    state.dockControls.some(
      (control) => control.width < 43.5 || control.height < 43.5,
    )
  ) {
    recordError("coarse-pointer", "Dock abaixo de 44×44px");
  }

  interactions.push({
    type: "coarse-pointer",
    capabilities,
    activeLocalLights: state.activeLocalLights,
    dockScales,
    dockControls: state.dockControls,
  });
  await context.close();
}

async function runReducedMotion(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    hasTouch: true,
    isMobile: true,
  });
  await installInstrumentation(context);
  const page = await context.newPage();

  for (const route of ["/", "/roadmap", "/lore", "/galeria"]) {
    await page.goto(`${currentBaseUrl}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await settle(page, 300);
    await fastScroll(page);
    const state = await readState(page);

    if (state.pendingReveals !== 0 || state.invisibleReveals !== 0) {
      recordError(
        `reduced:${route}`,
        `reveals=${state.pendingReveals}/${state.invisibleReveals}`,
      );
    }
    if (state.infiniteAnimations !== 0) {
      recordError(
        `reduced:${route}`,
        `animações infinitas=${state.infiniteAnimations}`,
      );
    }
    if (state.activeLocalLights !== 0) {
      recordError(`reduced:${route}`, "luz dinâmica ativa");
    }
    for (const timeline of state.timelines) {
      if (timeline.progress < 0.98 || timeline.inactiveNodes !== 0) {
        recordError(
          `reduced:${route}`,
          `timeline incompleta=${JSON.stringify(timeline)}`,
        );
      }
    }

    interactions.push({
      type: "reduced-motion",
      route,
      state: {
        pendingReveals: state.pendingReveals,
        invisibleReveals: state.invisibleReveals,
        infiniteAnimations: state.infiniteAnimations,
        activeLocalLights: state.activeLocalLights,
        timelines: state.timelines,
        heroEntry: state.heroEntry,
      },
    });
  }

  await context.close();
}

async function runIdleAndCpu(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  await installInstrumentation(context);
  const page = await context.newPage();
  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 1000);
  await resetCounters(page);
  await page.waitForTimeout(700);
  const idle = await readState(page);
  let throttledNavigationMs = null;

  try {
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    const start = Date.now();
    await page.locator('a[href="/roadmap"]').first().click({ noWaitAfter: true });
    await page.waitForURL(/\/roadmap(?:\?|$)/, { timeout: 10000 });
    await waitForRouteIdle(page, "cpu-throttled", 3500);
    throttledNavigationMs = Date.now() - start;
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  } catch (error) {
    recordWarning("cpu-throttling", error.message);
  }

  interactions.push({
    type: "idle-and-cpu",
    idleRafCallsIn700ms: idle.rafCalls,
    idleRunningAnimations: idle.runningAnimations,
    throttledNavigationMs,
  });
  await context.close();
}

const browser = await chromium.launch({ headless: true });
let clsByWidth = [];

try {
  await runMatrix(browser);
  clsByWidth = validateClsByWidth();
  await runFinePointer(browser);
  await runCoarsePointer(browser);
  await runReducedMotion(browser);
  await runIdleAndCpu(browser);
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  currentBaseUrl,
  baselineCommit: "7a192260c7945c6c75ab05bba78ebe97f94050e1",
  mainAtEtapa2Start: "20c203d5aadaea97cf83c95f703b7a73a9ccb630",
  branch: "agent/fase-4-etapa-2-simplificacao-movimento",
  widths,
  routes,
  methodology: {
    routeWidthCases: routes.length * widths.length,
    clsComparison:
      "O CLS compartilhado é comparado pela média de cada largura. A atribuição rota a rota varia conforme o momento em que fontes e shells compartilhados estabilizam.",
    clsTolerance,
  },
  before: {
    upperProgressSystems: 2,
    routeFallbackMs: 8000,
    continuousAmbientAnimations: 3,
    dynamicLightScope: "variáveis globais herdadas por grande parte da página",
    repeatedFixedBackgroundPatterns: 3,
    textRevealBlur: true,
    timelineCssSmoothingMs: 90,
    dockGeometryReads: "por item durante frames ativos",
    galleryPresenceModes: ["popLayout", "wait"],
    heroReturnBehavior: "coreografia completa em cada montagem",
  },
  after: {
    upperProgressSystems: 1,
    routeFallbackMs: 1600,
    continuousAmbientAnimations: Math.max(
      ...cases.map((item) => item.infiniteAnimations),
      0,
    ),
    dynamicLightScope: "no máximo um elemento estratégico local",
    repeatedFixedBackgroundPatterns: Math.max(
      ...cases.map((item) => item.fixedPaintSurfaces),
      0,
    ),
    textRevealBlur: false,
    timelineCssSmoothingMs: 0,
    dockGeometryReads: "cache atualizado em resize e mudança de rota",
    galleryPresenceModes: ["sync"],
    heroReturnBehavior: "entrada curta durante a mesma sessão cliente",
  },
  summary: {
    routeWidthCases: cases.length,
    expectedRouteWidthCases: routes.length * widths.length,
    validationErrors: errors.length,
    warnings: warnings.length,
    clsWidthsRegressed: clsByWidth.filter(
      (item) => item.currentAverage > item.baselineAverage + clsTolerance,
    ).length,
    maxBaselineCls: Math.max(...cases.map((item) => item.baselineCls), 0),
    maxCurrentCls: Math.max(...cases.map((item) => item.currentCls), 0),
    maxRectCallsDuringFastScroll: Math.max(
      ...cases.map((item) => item.rectCallsDuringFastScroll),
      0,
    ),
    casesWithPendingReveals: cases.filter(
      (item) => item.pendingReveals > 0,
    ).length,
    casesWithInfiniteAnimations: cases.filter(
      (item) => item.infiniteAnimations > 0,
    ).length,
    casesWithFixedBackgrounds: cases.filter(
      (item) => item.fixedPaintSurfaces > 0,
    ).length,
  },
  clsByWidth,
  cases,
  interactions,
  errors,
  warnings,
  limitations: [
    "FPS e GPU não são afirmados porque Chromium headless não representa com fidelidade todos os dispositivos.",
    "CPU 4× é uma aproximação do DevTools, não substitui profiling em hardware físico.",
    "Dashboard e Admin permanecem limitados aos estados públicos sem credenciais, conforme o baseline.",
    "Não existe script de teste unitário declarado no package.json; TypeScript, ESLint, build e Playwright são as validações executáveis existentes.",
  ],
};

fs.writeFileSync(
  path.join(outputDir, "motion-validation.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report.summary, null, 2));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
