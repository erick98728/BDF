import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const currentBaseUrl =
  process.env.MOTION_VALIDATION_URL || "http://127.0.0.1:3000";
const baselineBaseUrl =
  process.env.MOTION_BASELINE_URL || "https://bdf-navy.vercel.app";
const outputDir =
  process.env.MOTION_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-2";
const baselinePath = path.resolve(
  "docs/fase-4/etapa-1/baseline.json",
);
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const routes = baseline.metadata.routes;
const widths = [1920, 1440, 1280, 1024, 900, 768, 640, 430, 390, 360];
const representativeWidths = [1440, 768, 390];
const clsTolerance = 0.01;
const errors = [];
const warnings = [];
const cases = [];
const interactionResults = [];
const comparisons = [];

const baselineByRouteWidth = new Map(
  baseline.results.map((result) => [
    `${result.route.id}:${result.width}`,
    result,
  ]),
);

fs.mkdirSync(outputDir, { recursive: true });

function recordError(scope, message) {
  errors.push(`${scope}: ${message}`);
}

function recordWarning(scope, message) {
  warnings.push(`${scope}: ${message}`);
}

function heightForWidth(width) {
  if (width === 1920) return 1080;
  if (width <= 430) return 844;
  if (width <= 768) return 1024;
  return 900;
}

async function installInstrumentation(context) {
  await context.addInitScript(() => {
    const audit = {
      cls: 0,
      rafCalls: 0,
      rectCalls: 0,
      globalListeners: {
        window: 0,
        document: 0,
      },
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

    const originalRequestAnimationFrame = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (callback) => {
      audit.rafCalls += 1;
      return originalRequestAnimationFrame(callback);
    };

    const originalRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
      audit.rectCalls += 1;
      return originalRect.call(this);
    };

    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function addEventListener(
      type,
      listener,
      options,
    ) {
      if (this === window) audit.globalListeners.window += 1;
      if (this === document) audit.globalListeners.document += 1;
      return originalAddEventListener.call(this, type, listener, options);
    };
  });
}

async function settlePage(page, delay = 650) {
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

async function readRuntimeState(page) {
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
    const pendingReveals = reveals.filter(
      (element) => element.getAttribute("data-fx-state") === "pending",
    );
    const invisibleReveals = reveals.filter((element) => {
      const style = getComputedStyle(element);
      return (
        style.visibility === "hidden" ||
        Number.parseFloat(style.opacity || "1") < 0.02
      );
    });
    const animations = document.getAnimations({ subtree: true });
    const infiniteAnimations = animations.filter((animation) => {
      const timing = animation.effect?.getTiming?.();
      return timing?.iterations === Infinity;
    });
    const runningAnimations = animations.filter(
      (animation) => animation.playState === "running",
    );
    const fixedPaintSurfaces = [];
    const surfaceChecks = [
      [".surface-glass", "::after"],
      [".fx-button", "::before"],
      [".game-glyph", "::before"],
      [".fx-card--interactive > .surface-glass", "::after"],
    ];

    for (const [selector, pseudo] of surfaceChecks) {
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
            // Unsupported pseudo-element inspection does not invalidate the page.
          }
        });
    }

    const timelineStates = Array.from(
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
      return {
        width: bounds.width,
        height: bounds.height,
      };
    });

    const visibleScrollIndicators = Array.from(
      document.querySelectorAll(".fx-scroll-progress"),
    ).filter((element) => getComputedStyle(element).display !== "none").length;
    const visibleRouteIndicators = Array.from(
      document.querySelectorAll(".route-transition-progress"),
    ).filter((element) => getComputedStyle(element).display !== "none").length;

    return {
      cls: audit.cls,
      rafCalls: audit.rafCalls,
      rectCalls: audit.rectCalls,
      globalListeners: audit.globalListeners,
      pendingRevealCount: pendingReveals.length,
      invisibleRevealCount: invisibleReveals.length,
      infiniteAnimationCount: infiniteAnimations.length,
      runningAnimationCount: runningAnimations.length,
      fixedPaintSurfaces,
      activeLocalLights: document.querySelectorAll(
        '[data-fx-pointer="active"]',
      ).length,
      rootHasDynamicLight:
        document.documentElement.style.getPropertyValue("--scene-light-x") !==
          "" ||
        document.documentElement.style.getPropertyValue("--scene-light-y") !==
          "",
      strategicElementCount: document.querySelectorAll(
        "[data-fx-spotlight], [data-fx-magnetic]",
      ).length,
      visibleScrollIndicators,
      visibleRouteIndicators,
      routeBusy:
        document.querySelector(".route-transition-shell")?.getAttribute(
          "aria-busy",
        ) ?? null,
      routeDataset: document.documentElement.dataset.routeTransition ?? null,
      timelineStates,
      heroEntry:
        document.querySelector(".hero-section")?.getAttribute(
          "data-hero-entry",
        ) ?? null,
      dockItemCount: document.querySelectorAll(".dock-menu__item").length,
      activeDockItems: document.querySelectorAll(
        ".dock-menu__item.is-active",
      ).length,
      dockControls,
      overflowAmount: Math.max(
        document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        0,
      ),
      bodyTextLength: document.body.innerText.trim().length,
      documentHeight: document.documentElement.scrollHeight,
    };
  });
}

async function waitForRouteIdle(page, scope, timeout = 2600) {
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
    return true;
  } catch {
    const state = await readRuntimeState(page);
    recordError(
      scope,
      `estado de rota pendente: ${JSON.stringify({
        routeBusy: state.routeBusy,
        routeDataset: state.routeDataset,
      })}`,
    );
    return false;
  }
}

async function fastScroll(page) {
  await page.evaluate(async () => {
    const range = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );
    const checkpoints = [0, 0.18, 0.36, 0.58, 0.78, 1];

    for (const checkpoint of checkpoints) {
      window.scrollTo({ top: range * checkpoint, behavior: "instant" });
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  });
  await page.waitForTimeout(180);
}

async function validateMatrix(browser) {
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

      await settlePage(page);
      const initialState = await readRuntimeState(page);
      await resetCounters(page);
      await fastScroll(page);
      const scrolledState = await readRuntimeState(page);
      const expectedStatus = route.id === "404" ? 404 : 200;
      const status = response?.status() ?? null;
      const baselineCase = baselineByRouteWidth.get(`${route.id}:${width}`);
      const baselineCls = baselineCase?.stable?.cls ?? null;
      const clsDelta =
        baselineCls === null ? null : scrolledState.cls - baselineCls;

      if (status !== expectedStatus) {
        recordError(scope, `HTTP ${status}; esperado ${expectedStatus}`);
      }
      if (initialState.bodyTextLength === 0) {
        recordError(scope, "conteúdo da página vazio");
      }
      if (initialState.visibleScrollIndicators !== 1) {
        recordError(
          scope,
          `indicadores superiores ativos=${initialState.visibleScrollIndicators}`,
        );
      }
      if (initialState.visibleRouteIndicators !== 0) {
        recordError(
          scope,
          `indicadores de rota concorrentes=${initialState.visibleRouteIndicators}`,
        );
      }
      if (scrolledState.pendingRevealCount !== 0) {
        recordError(
          scope,
          `reveals pendentes após scroll=${scrolledState.pendingRevealCount}`,
        );
      }
      if (scrolledState.invisibleRevealCount !== 0) {
        recordError(
          scope,
          `reveals invisíveis após scroll=${scrolledState.invisibleRevealCount}`,
        );
      }
      if (initialState.infiniteAnimationCount !== 0) {
        recordError(
          scope,
          `animações infinitas=${initialState.infiniteAnimationCount}`,
        );
      }
      if (initialState.fixedPaintSurfaces.length !== 0) {
        recordError(
          scope,
          `background fixed=${initialState.fixedPaintSurfaces.join(",")}`,
        );
      }
      if (initialState.rootHasDynamicLight) {
        recordError(scope, "luz dinâmica ainda escrita na raiz global");
      }
      if (initialState.activeLocalLights > 1) {
        recordError(
          scope,
          `mais de uma luz local ativa=${initialState.activeLocalLights}`,
        );
      }
      if (initialState.activeDockItems !== 1) {
        recordError(
          scope,
          `indicadores ativos do Dock=${initialState.activeDockItems}`,
        );
      }
      if (initialState.overflowAmount > 1) {
        recordError(
          scope,
          `overflow horizontal=${initialState.overflowAmount}px`,
        );
      }
      if (
        baselineCls !== null &&
        scrolledState.cls > baselineCls + clsTolerance
      ) {
        recordError(
          scope,
          `CLS regrediu de ${baselineCls.toFixed(4)} para ${scrolledState.cls.toFixed(4)}`,
        );
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
        status,
        baselineCls,
        currentCls: scrolledState.cls,
        clsDelta,
        pendingRevealCount: scrolledState.pendingRevealCount,
        invisibleRevealCount: scrolledState.invisibleRevealCount,
        infiniteAnimationCount: initialState.infiniteAnimationCount,
        fixedPaintSurfaceCount: initialState.fixedPaintSurfaces.length,
        strategicElementCount: initialState.strategicElementCount,
        rootHasDynamicLight: initialState.rootHasDynamicLight,
        rectCallsDuringFastScroll: scrolledState.rectCalls,
        routeBusy: scrolledState.routeBusy,
        routeDataset: scrolledState.routeDataset,
        timelineStates: scrolledState.timelineStates,
        overflowAmount: initialState.overflowAmount,
      });
    }

    await context.close();
  }
}

async function validateNavigation(page, width) {
  const scope = `navigation@${width}`;
  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settlePage(page, 450);

  const firstHeroEntry = (await readRuntimeState(page)).heroEntry;
  await page.locator('a[href="/lore"]').first().click({ noWaitAfter: true });
  await page.waitForURL(/\/lore(?:\?|$)/, { timeout: 10000 });
  await waitForRouteIdle(page, `${scope}:link`);

  await page.goBack({ waitUntil: "domcontentloaded" });
  await waitForRouteIdle(page, `${scope}:back`);
  const returnHeroEntry = (await readRuntimeState(page)).heroEntry;

  await page.goForward({ waitUntil: "domcontentloaded" });
  await waitForRouteIdle(page, `${scope}:forward`);

  await page.goto(`${currentBaseUrl}/?motionAudit=0`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.evaluate(() => {
    const link = document.createElement("a");
    link.id = "motion-audit-query-link";
    link.href = "/?motionAudit=1";
    link.textContent = "query audit";
    document.body.appendChild(link);
  });
  await page.locator("#motion-audit-query-link").click({ noWaitAfter: true });
  await page.waitForURL(/motionAudit=1/, { timeout: 10000 });
  await waitForRouteIdle(page, `${scope}:query`);

  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settlePage(page, 250);
  const hashLink = page.locator('a[href="#visao-geral"]').first();
  await hashLink.click();
  await page.waitForTimeout(120);
  const hashState = await readRuntimeState(page);
  if (hashState.routeBusy === "true" || hashState.routeDataset) {
    recordError(scope, "mudança de hash deixou navegação pendente");
  }

  await page.evaluate(() => {
    const link = document.createElement("a");
    link.id = "motion-audit-cancel-link";
    link.href = "/roadmap";
    link.textContent = "cancel audit";
    link.addEventListener("click", (event) => event.preventDefault());
    document.body.appendChild(link);
  });
  await page.locator("#motion-audit-cancel-link").click();
  await page.waitForTimeout(120);
  const canceledState = await readRuntimeState(page);
  if (canceledState.routeBusy === "true" || canceledState.routeDataset) {
    recordError(scope, "link cancelado ativou loading");
  }

  await page.evaluate(() => {
    const first = document.querySelector('a[href="/lore"]');
    const second = document.querySelector('a[href="/roadmap"]');
    if (first instanceof HTMLAnchorElement) first.click();
    if (second instanceof HTMLAnchorElement) second.click();
  });
  await page.waitForURL(/\/(?:lore|roadmap)(?:\?|$)/, { timeout: 10000 });
  await waitForRouteIdle(page, `${scope}:rapid`);

  await page.goto(
    `${currentBaseUrl}/auditoria-fase-4-rota-inexistente`,
    { waitUntil: "domcontentloaded", timeout: 30000 },
  );
  await waitForRouteIdle(page, `${scope}:404`);

  if (firstHeroEntry !== "first") {
    recordError(scope, `Hero inicial=${firstHeroEntry}; esperado first`);
  }
  if (returnHeroEntry !== "return") {
    recordError(scope, `Hero de retorno=${returnHeroEntry}; esperado return`);
  }

  interactionResults.push({
    type: "navigation",
    width,
    firstHeroEntry,
    returnHeroEntry,
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

async function validateGallery(page, width) {
  const scope = `gallery@${width}`;
  await page.goto(`${currentBaseUrl}/galeria`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settlePage(page, 700);

  const filters = page.locator(".gallery-filter");
  const filterCount = await filters.count();
  if (filterCount !== 6) {
    recordError(scope, `filtros=${filterCount}; esperado 6`);
  }

  for (let index = 0; index < filterCount; index += 1) {
    await filters.nth(index).click();
    await page.waitForTimeout(430);
    const activeFilters = await page
      .locator('.gallery-filter[aria-pressed="true"]')
      .count();
    const entries = await page.locator(".gallery-entry").count();
    if (activeFilters !== 1) {
      recordError(scope, `filtro ${index} deixou ${activeFilters} ativos`);
    }
    if (entries < 1) {
      recordError(scope, `filtro ${index} removeu todos os itens`);
    }
  }

  await filters.first().click();
  await page.waitForTimeout(430);
  const opener = page.locator(".gallery-entry").first();
  await opener.focus();
  await opener.click();
  const dialog = page.locator('[role="dialog"]');
  await dialog.waitFor({ state: "visible", timeout: 3000 });

  const focusOnOpen = await page.evaluate(() =>
    document.activeElement?.getAttribute("aria-label"),
  );
  if (focusOnOpen !== "Fechar preview") {
    recordError(scope, `foco inicial do modal=${focusOnOpen}`);
  }

  const nextButton = page.locator(
    'button[aria-label^="Abrir próximo item"]',
  );
  for (let index = 0; index < 5; index += 1) {
    await nextButton.click({ delay: 10 });
  }
  await page.waitForTimeout(260);
  if ((await dialog.count()) !== 1) {
    recordError(scope, "cliques rápidos fecharam ou duplicaram o modal");
  }

  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "detached", timeout: 3000 });
  await page.waitForTimeout(80);
  const focusReturned = await page.evaluate(() =>
    document.activeElement?.classList.contains("gallery-entry"),
  );
  if (!focusReturned) recordError(scope, "foco não retornou ao item da Galeria");

  interactionResults.push({
    type: "gallery",
    width,
    filterCount,
    focusOnOpen,
    focusReturned,
  });
}

async function validateTimelines(page, width) {
  for (const route of ["/roadmap", "/lore"]) {
    const scope = `timeline:${route}@${width}`;
    await page.goto(`${currentBaseUrl}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await settlePage(page, 500);
    await resetCounters(page);
    await fastScroll(page);
    const state = await readRuntimeState(page);

    for (const timeline of state.timelineStates) {
      if (timeline.progress < 0.98) {
        recordError(scope, `progresso final=${timeline.progress}`);
      }
      if (timeline.inactiveNodes !== 0) {
        recordError(scope, `nós inativos=${timeline.inactiveNodes}`);
      }
    }

    interactionResults.push({
      type: "timeline",
      route,
      width,
      rectCallsDuringFastScroll: state.rectCalls,
      timelineStates: state.timelineStates,
    });
  }
}

async function validateDock(page, width) {
  const scope = `dock@${width}`;
  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settlePage(page, 500);
  const item = page.locator(".dock-menu__item").nth(3);
  const bounds = await item.boundingBox();

  if (bounds) {
    await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    await page.waitForTimeout(220);
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

    if (activeScale <= 1) recordError(scope, "ampliação elástica não ativou");
    if (Math.abs(restingScale - 1) > 0.01) {
      recordError(scope, `mola não voltou ao repouso=${restingScale}`);
    }

    interactionResults.push({
      type: "dock",
      width,
      activeScale,
      restingScale,
    });
  } else {
    recordError(scope, "item do Dock sem geometria");
  }
}

async function validateVisibilityAndResize(page, context, width) {
  const scope = `lifecycle@${width}`;
  await page.goto(`${currentBaseUrl}/roadmap`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settlePage(page, 450);

  const secondaryPage = await context.newPage();
  await secondaryPage.goto("about:blank");
  await secondaryPage.bringToFront();
  await page.waitForTimeout(180);
  await page.bringToFront();
  await page.waitForTimeout(220);

  const restored = await readRuntimeState(page);
  if (restored.routeBusy === "true" || restored.routeDataset) {
    recordError(scope, "aba restaurada manteve navegação pendente");
  }
  if (restored.activeLocalLights !== 0) {
    recordError(scope, "aba restaurada manteve luz de ponteiro ativa");
  }

  await page.setViewportSize({ width: 1024, height: 900 });
  await page.waitForTimeout(120);
  await page.setViewportSize({ width, height: heightForWidth(width) });
  await page.waitForTimeout(220);
  const resized = await readRuntimeState(page);
  if (resized.pendingRevealCount !== 0) {
    recordError(scope, `resize deixou reveals pendentes=${resized.pendingRevealCount}`);
  }

  await secondaryPage.close();
  interactionResults.push({
    type: "lifecycle",
    width,
    restored: {
      routeBusy: restored.routeBusy,
      routeDataset: restored.routeDataset,
      activeLocalLights: restored.activeLocalLights,
    },
    resizedPendingReveals: resized.pendingRevealCount,
  });
}

async function validateIdleAndCpu(browser) {
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
  await settlePage(page, 1000);
  await resetCounters(page);
  await page.waitForTimeout(700);
  const idleState = await readRuntimeState(page);

  let throttledNavigationMs = null;
  try {
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    const startedAt = Date.now();
    await page.locator('a[href="/roadmap"]').first().click({ noWaitAfter: true });
    await page.waitForURL(/\/roadmap(?:\?|$)/, { timeout: 10000 });
    await waitForRouteIdle(page, "cpu-throttled-route", 3500);
    throttledNavigationMs = Date.now() - startedAt;
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
  } catch (error) {
    recordWarning("cpu-throttling", error.message);
  }

  interactionResults.push({
    type: "idle-and-cpu",
    idleRafCallsIn700ms: idleState.rafCalls,
    idleRunningAnimations: idleState.runningAnimationCount,
    throttledNavigationMs,
  });

  await context.close();
}

async function validateFinePointer(browser) {
  for (const width of [1440, 768]) {
    const context = await browser.newContext({
      viewport: { width, height: heightForWidth(width) },
      reducedMotion: "no-preference",
      hasTouch: false,
    });
    await installInstrumentation(context);
    const page = await context.newPage();
    await validateNavigation(page, width);
    await validateGallery(page, width);
    await validateTimelines(page, width);
    await validateDock(page, width);
    await validateVisibilityAndResize(page, context, width);
    await context.close();
  }
}

async function validateCoarsePointer(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
    hasTouch: true,
    isMobile: true,
  });
  await installInstrumentation(context);
  const page = await context.newPage();
  await page.goto(`${currentBaseUrl}/galeria`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settlePage(page, 650);

  const capabilities = await page.evaluate(() => ({
    coarse: matchMedia("(pointer: coarse)").matches,
    noHover: matchMedia("(hover: none)").matches,
  }));
  await page.locator(".gallery-entry").first().tap();
  await page.waitForTimeout(160);
  const state = await readRuntimeState(page);
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
    recordError("coarse-pointer", `capacidades=${JSON.stringify(capabilities)}`);
  }
  if (state.activeLocalLights !== 0) {
    recordError("coarse-pointer", "touch ativou luz dinâmica");
  }
  if (dockScales.some((scale) => Math.abs(scale - 1) > 0.01)) {
    recordError("coarse-pointer", `Dock ampliado no touch=${dockScales}`);
  }
  if (
    state.dockControls.some(
      (control) => control.width < 43.5 || control.height < 43.5,
    )
  ) {
    recordError("coarse-pointer", "controle do Dock menor que 44×44px");
  }

  await page.keyboard.press("Escape");
  interactionResults.push({
    type: "coarse-pointer",
    capabilities,
    activeLocalLights: state.activeLocalLights,
    dockScales,
    dockControls: state.dockControls,
  });
  await context.close();
}

async function validateReducedMotion(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    hasTouch: true,
    isMobile: true,
  });
  await installInstrumentation(context);
  const page = await context.newPage();

  for (const route of ["/", "/roadmap", "/lore", "/galeria"]) {
    const scope = `reduced-motion:${route}`;
    await page.goto(`${currentBaseUrl}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await settlePage(page, 300);
    await fastScroll(page);
    const state = await readRuntimeState(page);

    if (state.pendingRevealCount !== 0 || state.invisibleRevealCount !== 0) {
      recordError(
        scope,
        `reveals pendentes=${state.pendingRevealCount}; invisíveis=${state.invisibleRevealCount}`,
      );
    }
    if (state.infiniteAnimationCount !== 0) {
      recordError(scope, `animações infinitas=${state.infiniteAnimationCount}`);
    }
    if (state.activeLocalLights !== 0) {
      recordError(scope, "luz dinâmica ativa em reduced motion");
    }
    for (const timeline of state.timelineStates) {
      if (timeline.progress < 0.98 || timeline.inactiveNodes !== 0) {
        recordError(scope, `timeline incompleta=${JSON.stringify(timeline)}`);
      }
    }

    interactionResults.push({
      type: "reduced-motion",
      route,
      state: {
        pendingRevealCount: state.pendingRevealCount,
        invisibleRevealCount: state.invisibleRevealCount,
        infiniteAnimationCount: state.infiniteAnimationCount,
        activeLocalLights: state.activeLocalLights,
        timelineStates: state.timelineStates,
        heroEntry: state.heroEntry,
      },
    });
  }

  await context.close();
}

async function collectExternalComparison(browser) {
  const comparisonRoutes = ["/", "/roadmap", "/lore", "/galeria"];

  for (const width of representativeWidths) {
    for (const route of comparisonRoutes) {
      const entries = [];

      for (const [label, baseUrl] of [
        ["before", baselineBaseUrl],
        ["after", currentBaseUrl],
      ]) {
        const context = await browser.newContext({
          viewport: { width, height: heightForWidth(width) },
          reducedMotion: "no-preference",
        });
        await installInstrumentation(context);
        const page = await context.newPage();

        try {
          const response = await page.goto(`${baseUrl}${route}`, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
          });
          await settlePage(page, 800);
          const state = await readRuntimeState(page);
          entries.push({
            label,
            status: response?.status() ?? null,
            cls: state.cls,
            infiniteAnimationCount: state.infiniteAnimationCount,
            fixedPaintSurfaceCount: state.fixedPaintSurfaces.length,
            strategicElementCount: state.strategicElementCount,
            rootHasDynamicLight: state.rootHasDynamicLight,
            globalListeners: state.globalListeners,
          });
        } catch (error) {
          entries.push({ label, error: error.message });
          recordWarning(
            `external-comparison:${route}@${width}:${label}`,
            error.message,
          );
        } finally {
          await context.close();
        }
      }

      comparisons.push({ route, width, entries });
    }
  }
}

const browser = await chromium.launch({ headless: true });

try {
  await validateMatrix(browser);
  await validateFinePointer(browser);
  await validateCoarsePointer(browser);
  await validateReducedMotion(browser);
  await validateIdleAndCpu(browser);
  await collectExternalComparison(browser);
} finally {
  await browser.close();
}

const clsRegressions = cases.filter(
  (item) =>
    item.baselineCls !== null &&
    item.currentCls > item.baselineCls + clsTolerance,
);
const maxCurrentCls = Math.max(...cases.map((item) => item.currentCls), 0);
const maxBaselineCls = Math.max(
  ...cases.map((item) => item.baselineCls ?? 0),
  0,
);
const maxRectCallsDuringFastScroll = Math.max(
  ...cases.map((item) => item.rectCallsDuringFastScroll),
  0,
);

const report = {
  generatedAt: new Date().toISOString(),
  currentBaseUrl,
  baselineBaseUrl,
  baselineCommit: "7a192260c7945c6c75ab05bba78ebe97f94050e1",
  mainAtEtapa2Start: "20c203d5aadaea97cf83c95f703b7a73a9ccb630",
  branch: "agent/fase-4-etapa-2-simplificacao-movimento",
  widths,
  routes,
  methodology: {
    clsRegressionTolerance: clsTolerance,
    note:
      "A tolerância de 0,01 cobre ruído de instrumentação entre a produção auditada e a build local. Valores acima disso falham a etapa.",
  },
  beforeSourceInventory: {
    upperProgressSystems: 2,
    routeFallbackMs: 8000,
    continuousAmbientAnimations: 3,
    dynamicLightScope: "variáveis globais herdadas por fundo, superfícies e controles",
    repeatedFixedBackgroundPatterns: 3,
    textRevealBlur: true,
    timelineCssSmoothingMs: 90,
    dockGeometryReads: "getBoundingClientRect por item em cada frame ativo",
    galleryPresenceModes: ["popLayout", "wait"],
    heroReturnBehavior: "coreografia equivalente em cada montagem",
  },
  afterInventory: {
    upperProgressSystems: 1,
    routeFallbackMs: 1600,
    continuousAmbientAnimations: Math.max(
      ...cases.map((item) => item.infiniteAnimationCount),
      0,
    ),
    dynamicLightScope: "no máximo um elemento estratégico local",
    repeatedFixedBackgroundPatterns: Math.max(
      ...cases.map((item) => item.fixedPaintSurfaceCount),
      0,
    ),
    textRevealBlur: false,
    timelineCssSmoothingMs: 0,
    dockGeometryReads: "cache por entrada, resize e mudança de rota",
    galleryPresenceModes: ["sync"],
    heroReturnBehavior: "entrada compacta durante a mesma sessão cliente",
  },
  summary: {
    routeWidthCases: cases.length,
    expectedRouteWidthCases: routes.length * widths.length,
    validationErrors: errors.length,
    warnings: warnings.length,
    clsRegressions: clsRegressions.length,
    maxBaselineCls,
    maxCurrentCls,
    maxRectCallsDuringFastScroll,
    routesWithPendingReveals: cases.filter(
      (item) => item.pendingRevealCount > 0,
    ).length,
    routesWithInfiniteAnimations: cases.filter(
      (item) => item.infiniteAnimationCount > 0,
    ).length,
    routesWithFixedBackgrounds: cases.filter(
      (item) => item.fixedPaintSurfaceCount > 0,
    ).length,
  },
  cases,
  interactionResults,
  comparisons,
  errors,
  warnings,
  limitations: [
    "FPS e tempo real de GPU não são afirmados: o Chromium headless não reproduz com fidelidade a composição de todos os dispositivos.",
    "O teste de CPU usa throttling 4× do Chromium quando disponível; não substitui profiling em hardware físico.",
    "Dashboard e Admin foram validados apenas nos estados públicos/sem autenticação, preservando a limitação do baseline.",
  ],
};

const reportPath = path.join(outputDir, "motion-validation.json");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary, null, 2));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
