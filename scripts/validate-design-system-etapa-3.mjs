import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const currentBaseUrl =
  process.env.ETAPA3_VALIDATION_URL || "http://127.0.0.1:3000";
const baselineBaseUrl =
  process.env.ETAPA3_BASELINE_URL || "https://bdf-navy.vercel.app";
const outputDir =
  process.env.ETAPA3_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-3";
const baseline = JSON.parse(
  fs.readFileSync("docs/fase-4/etapa-1/baseline.json", "utf8"),
);
const routes = baseline.metadata.routes;
const widths = [1920, 1440, 1280, 1024, 900, 768, 640, 430, 390, 360];
const clsAverageTolerance = 0.01;
const clsRouteTolerance = 0.02;
const errors = [];
const warnings = [];
const cases = [];
const clsComparisons = [];
const targeted = [];

fs.mkdirSync(outputDir, { recursive: true });

function heightForWidth(width) {
  if (width === 1920) return 1080;
  if (width <= 430) return 844;
  if (width <= 768) return 1024;
  return 900;
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function summarizeCls(label, width, samples) {
  const values = samples.map((sample) => sample.value);
  const maximum = Math.max(...values, 0);
  const maximumSample =
    samples.find((sample) => sample.value === maximum) ?? null;
  return {
    label,
    width,
    samples,
    average: average(values),
    median: median(values),
    maximum,
    maximumRoute: maximumSample?.route ?? null,
    maximumPath: maximumSample?.path ?? null,
  };
}

function recordError(scope, message) {
  errors.push(`${scope}: ${message}`);
}

function recordWarning(scope, message) {
  warnings.push(`${scope}: ${message}`);
}

async function installClsObserver(context) {
  await context.addInitScript(() => {
    const audit = { cls: 0, shifts: [] };
    Object.defineProperty(window, "__designAudit", {
      configurable: true,
      value: audit,
    });

    if (
      "PerformanceObserver" in window &&
      PerformanceObserver.supportedEntryTypes?.includes("layout-shift")
    ) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.hadRecentInput) continue;
          audit.cls += entry.value;
          audit.shifts.push({
            value: entry.value,
            startTime: entry.startTime,
            sources: (entry.sources || []).slice(0, 5).map((source) => {
              const node = source.node;
              return {
                tag: node?.tagName?.toLowerCase?.() ?? null,
                id: node?.id ?? null,
                className:
                  typeof node?.className === "string"
                    ? node.className.slice(0, 180)
                    : null,
                previousRect: source.previousRect,
                currentRect: source.currentRect,
              };
            }),
          });
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
    }
  });
}

async function settle(page, delay = 700) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
  await page.waitForTimeout(delay);
}

async function progressiveScroll(page) {
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

async function inspectDesign(page) {
  return page.evaluate(() => {
    function isVisible(element) {
      if (!(element instanceof HTMLElement)) return false;
      const style = getComputedStyle(element);
      const bounds = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number.parseFloat(style.opacity || "1") > 0.02 &&
        bounds.width > 0 &&
        bounds.height > 0
      );
    }

    const decorativeSelector = [
      ".fx-record-symbol",
      ".system-index__number",
      ".editorial-log__index",
      ".fragment-index__number",
      ".devlog-ledger__index",
      ".hero-visual__coordinate",
      "[data-typography='coordinate']",
    ].join(",");

    const secondaryMetadataSelector = [
      "time",
      "dt",
      ".gallery-entry__meta",
      ".gallery-modal-copy dt",
      ".devlog-ledger__meta",
      ".character-dossier__meta",
      ".roadmap-record__meta",
      ".lore-record__meta",
      ".studio-record__meta",
    ].join(",");

    const textNodes = Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        if (!(element instanceof HTMLElement)) return false;
        if (!element.innerText?.trim()) return false;
        if (element.children.length > 0) return false;
        if (element.closest('[aria-hidden="true"], .sr-only')) return false;
        return isVisible(element);
      })
      .map((element) => {
        const style = getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        const nonAnchorControl = element.closest(
          "button, input, select, textarea, label, [role='button'], [role='tab'], [role='menuitem']",
        );
        const anchor = element.closest("a");
        const secondaryMetadata = Boolean(
          element.closest(secondaryMetadataSelector),
        );
        const decorative = Boolean(element.closest(decorativeSelector));
        const functional = Boolean(
          nonAnchorControl || (anchor && !secondaryMetadata && !decorative),
        );
        const fontSize = Number.parseFloat(style.fontSize);
        const lineHeight = Number.parseFloat(style.lineHeight);
        const letterSpacing = Number.parseFloat(style.letterSpacing);
        return {
          tag: element.tagName.toLowerCase(),
          text: element.innerText.trim().replace(/\s+/g, " ").slice(0, 160),
          className: element.className?.toString().slice(0, 220) || "",
          fontFamily: style.fontFamily,
          fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          lineHeightRatio:
            Number.isFinite(lineHeight) && fontSize > 0
              ? lineHeight / fontSize
              : null,
          letterSpacing: style.letterSpacing,
          trackingEm:
            Number.isFinite(letterSpacing) && fontSize > 0
              ? letterSpacing / fontSize
              : 0,
          color: style.color,
          opacity: style.opacity,
          functional,
          secondaryMetadata,
          decorative,
          necessary: !functional && !decorative,
          width: bounds.width,
          height: bounds.height,
        };
      });

    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4"))
      .filter(isVisible)
      .map((element) => {
        const style = getComputedStyle(element);
        return {
          tag: element.tagName.toLowerCase(),
          text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 180),
          fontSize: Number.parseFloat(style.fontSize),
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
          clipped: element.scrollWidth > element.clientWidth + 1,
        };
      });

    const readingMeasures = Array.from(
      document.querySelectorAll(
        ".prose, .devlog-article__body, .lore-prose, .editorial-prose, [data-reading-measure]",
      ),
    )
      .filter(isVisible)
      .map((element) => {
        const style = getComputedStyle(element);
        const fontSize = Number.parseFloat(style.fontSize);
        return {
          tag: element.tagName.toLowerCase(),
          className: element.className?.toString().slice(0, 180) || "",
          width: element.getBoundingClientRect().width,
          fontSize,
          measureEm:
            fontSize > 0 ? element.getBoundingClientRect().width / fontSize : 0,
        };
      });

    const rootStyle = getComputedStyle(document.documentElement);
    const tokenNames = [
      "--font-display",
      "--font-body",
      "--font-mono",
      "--text-display",
      "--text-page-title",
      "--text-chapter-title",
      "--text-section-title",
      "--text-component-title",
      "--text-record-title",
      "--text-body-lg",
      "--text-body",
      "--text-body-sm",
      "--text-label",
      "--text-meta",
      "--text-decorative",
      "--text-code",
      "--leading-display",
      "--leading-heading",
      "--leading-body",
      "--leading-compact",
      "--tracking-display",
      "--tracking-heading",
      "--tracking-label",
      "--tracking-meta",
      "--text-primary",
      "--text-secondary",
      "--text-muted",
      "--text-subtle",
      "--text-accent",
      "--surface-page",
      "--surface-raised",
      "--surface-subtle",
      "--surface-interactive",
      "--surface-overlay",
      "--surface-functional",
      "--border-subtle",
      "--border-default",
      "--border-strong",
      "--border-accent",
      "--border-focus",
      "--radius-sm",
      "--radius-md",
      "--radius-lg",
      "--radius-pill",
      "--measure-compact",
      "--measure-body",
      "--measure-wide",
    ];
    const tokens = Object.fromEntries(
      tokenNames.map((name) => [
        name,
        rootStyle.getPropertyValue(name).trim(),
      ]),
    );

    const fontResources = performance
      .getEntriesByType("resource")
      .filter((entry) => /\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(entry.name))
      .map((entry) => ({
        name: entry.name,
        transferSize: entry.transferSize,
        decodedBodySize: entry.decodedBodySize,
        duration: entry.duration,
      }));
    const fontFaces = Array.from(document.fonts).map((font) => ({
      family: font.family,
      weight: font.weight,
      style: font.style,
      status: font.status,
    }));

    const functionalBelow14 = textNodes.filter(
      (item) => item.functional && item.fontSize < 13.9,
    );
    const necessaryBelow12 = textNodes.filter(
      (item) => item.necessary && item.fontSize < 11.9,
    );
    const decorativeBelow11 = textNodes.filter(
      (item) => item.decorative && item.fontSize < 10.9,
    );
    const excessiveTracking = textNodes.filter(
      (item) =>
        !item.decorative &&
        Math.abs(item.trackingEm) > 0.121 &&
        item.text.length > 1,
    );
    const compactLineHeight = textNodes.filter(
      (item) =>
        !item.decorative &&
        item.lineHeightRatio !== null &&
        item.lineHeightRatio < 1.14 &&
        item.text.length > 18,
    );

    return {
      postScrollCls: window.__designAudit?.cls || 0,
      clsShifts: window.__designAudit?.shifts || [],
      tokens,
      fontResources,
      fontFaces,
      computedFamilies: [...new Set(textNodes.map((item) => item.fontFamily))],
      computedWeights: [...new Set(textNodes.map((item) => item.fontWeight))],
      textNodeCount: textNodes.length,
      functionalBelow14Count: functionalBelow14.length,
      necessaryBelow12Count: necessaryBelow12.length,
      decorativeBelow11Count: decorativeBelow11.length,
      functionalBelow14Samples: functionalBelow14.slice(0, 12),
      necessaryBelow12Samples: necessaryBelow12.slice(0, 12),
      decorativeBelow11Samples: decorativeBelow11.slice(0, 12),
      excessiveTrackingCount: excessiveTracking.length,
      excessiveTrackingSamples: excessiveTracking.slice(0, 12),
      compactLineHeightCount: compactLineHeight.length,
      compactLineHeightSamples: compactLineHeight.slice(0, 12),
      headings,
      clippedHeadings: headings.filter((heading) => heading.clipped),
      readingMeasures,
      excessiveReadingMeasures: readingMeasures.filter(
        (measure) => measure.measureEm > 82,
      ),
      h1Count: headings.filter((heading) => heading.tag === "h1").length,
      overflow: Math.max(
        document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        0,
      ),
      roleTablists: document.querySelectorAll('[role="tablist"]').length,
      roleTabs: document.querySelectorAll('[role="tab"]').length,
      surfaceRoles: [
        ...new Set(
          Array.from(document.querySelectorAll("[data-surface-role]"))
            .map((element) => element.getAttribute("data-surface-role"))
            .filter(Boolean),
        ),
      ],
      headingRoles: [
        ...new Set(
          Array.from(document.querySelectorAll("[data-heading-role]"))
            .map((element) => element.getAttribute("data-heading-role"))
            .filter(Boolean),
        ),
      ],
      pendingReveals: document.querySelectorAll(
        '[data-fx-state="pending"]',
      ).length,
      infiniteAnimations: document
        .getAnimations({ subtree: true })
        .filter(
          (animation) =>
            animation.effect?.getTiming?.().iterations === Infinity,
        ).length,
      fixedBackgrounds: Array.from(document.querySelectorAll("body *")).filter(
        (element) => getComputedStyle(element).backgroundAttachment === "fixed",
      ).length,
      routeBusy:
        document.querySelector(".route-transition-shell")?.getAttribute(
          "aria-busy",
        ) ?? null,
    };
  });
}

function filterConsoleErrors(messages, routeId, fallbackMode = false) {
  return messages.filter((message) => {
    if (fallbackMode && /font|woff|failed to load resource/i.test(message)) {
      return false;
    }
    if (
      routeId === "404" &&
      /404|not found|failed to load resource/i.test(message)
    ) {
      return false;
    }
    return true;
  });
}

async function runCurrentMatrix(browser) {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: heightForWidth(width) },
      reducedMotion: "no-preference",
    });
    await installClsObserver(context);

    for (const route of routes) {
      const scope = `${route.id}@${width}`;
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));

      try {
        const response = await page.goto(`${currentBaseUrl}${route.path}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        await settle(page);
        const cleanCls = await page.evaluate(
          () => window.__designAudit?.cls || 0,
        );
        const cleanClsShifts = await page.evaluate(
          () => window.__designAudit?.shifts || [],
        );
        await progressiveScroll(page);
        const state = await inspectDesign(page);
        const expectedStatus = route.id === "404" ? 404 : 200;
        const relevantConsoleErrors = filterConsoleErrors(
          consoleErrors,
          route.id,
        );

        if (response?.status() !== expectedStatus) {
          recordError(
            scope,
            `HTTP ${response?.status()}; esperado ${expectedStatus}`,
          );
        }
        if (state.overflow > 1) {
          recordError(scope, `overflow horizontal=${state.overflow}px`);
        }
        if (state.clippedHeadings.length) {
          recordError(
            scope,
            `títulos cortados=${JSON.stringify(state.clippedHeadings)}`,
          );
        }
        if (state.functionalBelow14Count) {
          recordError(
            scope,
            `textos funcionais abaixo de 14px=${JSON.stringify(state.functionalBelow14Samples)}`,
          );
        }
        if (state.necessaryBelow12Count) {
          recordError(
            scope,
            `metadata necessária abaixo de 12px=${JSON.stringify(state.necessaryBelow12Samples)}`,
          );
        }
        if (state.decorativeBelow11Count) {
          recordError(
            scope,
            `texto decorativo abaixo de 11px=${JSON.stringify(state.decorativeBelow11Samples)}`,
          );
        }
        if (state.excessiveTrackingCount) {
          recordError(
            scope,
            `tracking excessivo=${JSON.stringify(state.excessiveTrackingSamples)}`,
          );
        }
        if (state.compactLineHeightCount) {
          recordError(
            scope,
            `altura de linha insuficiente=${JSON.stringify(state.compactLineHeightSamples)}`,
          );
        }
        if (state.excessiveReadingMeasures.length) {
          recordError(
            scope,
            `largura de leitura excessiva=${JSON.stringify(state.excessiveReadingMeasures)}`,
          );
        }
        if (state.pendingReveals) {
          recordError(scope, `reveals pendentes=${state.pendingReveals}`);
        }
        if (state.infiniteAnimations) {
          recordError(
            scope,
            `animações infinitas=${state.infiniteAnimations}`,
          );
        }
        if (state.fixedBackgrounds) {
          recordError(
            scope,
            `backgrounds fixos=${state.fixedBackgrounds}`,
          );
        }
        if (state.routeBusy === "true") {
          recordError(scope, "aria-busy permaneceu ativo");
        }
        if (relevantConsoleErrors.length) {
          recordError(scope, `console=${relevantConsoleErrors.join(" | ")}`);
        }
        if (pageErrors.length) {
          recordError(scope, `pageerror=${pageErrors.join(" | ")}`);
        }
        if (route.id === "login" && state.roleTablists > 0) {
          recordError(scope, "Login ainda contém role=tablist");
        }

        cases.push({
          route: route.id,
          path: route.path,
          width,
          status: response?.status() ?? null,
          cleanCls,
          cleanClsShifts,
          ...state,
          consoleErrors: relevantConsoleErrors,
          pageErrors,
        });
      } catch (error) {
        recordError(scope, error.message);
      } finally {
        await page.close();
      }
    }

    await context.close();
  }
}

async function collectClsBaseline(browser) {
  const rows = [];

  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: heightForWidth(width) },
      reducedMotion: "no-preference",
    });
    await installClsObserver(context);
    const samples = [];

    for (const route of routes) {
      const page = await context.newPage();
      try {
        await page.goto(`${baselineBaseUrl}${route.path}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        await settle(page);
        samples.push({
          route: route.id,
          path: route.path,
          value: await page.evaluate(() => window.__designAudit?.cls || 0),
          shifts: await page.evaluate(
            () => window.__designAudit?.shifts || [],
          ),
        });
      } catch (error) {
        recordWarning(
          `etapa-2-production:${route.id}@${width}`,
          error.message,
        );
      } finally {
        await page.close();
      }
    }

    rows.push(summarizeCls("etapa-2-production", width, samples));
    await context.close();
  }

  return rows;
}

async function runFontFallback(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  await installClsObserver(context);
  await context.route(/\.(?:woff2?|ttf|otf)(?:\?|$)/i, (route) =>
    route.abort("blockedbyclient"),
  );
  const results = [];

  for (const routePath of ["/", "/login"]) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.goto(`${currentBaseUrl}${routePath}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(950);
    const state = await inspectDesign(page);
    const relevant = filterConsoleErrors(consoleErrors, routePath, true);

    if (state.overflow > 1 || state.clippedHeadings.length) {
      recordError(
        `font-fallback:${routePath}`,
        `overflow=${state.overflow}; headings=${JSON.stringify(state.clippedHeadings)}`,
      );
    }
    if (state.textNodeCount === 0) {
      recordError(`font-fallback:${routePath}`, "conteúdo invisível");
    }
    if (relevant.length) {
      recordError(`font-fallback:${routePath}`, relevant.join(" | "));
    }

    results.push({ route: routePath, ...state, consoleErrors: relevant });
    await page.close();
  }

  targeted.push({ type: "font-fallback", results });
  await context.close();
}

function focusIsVisible(item) {
  if (!item) return false;
  const outlined =
    item.outlineStyle !== "none" &&
    item.outlineStyle !== "auto" &&
    item.outlineWidth !== "0px";
  const autoOutline =
    item.outlineStyle === "auto" && item.outlineWidth !== "0px";
  const shadowed = item.boxShadow && item.boxShadow !== "none";
  return outlined || autoOutline || shadowed;
}

async function runAccessibilityModes(browser) {
  const forcedContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    forcedColors: "active",
    reducedMotion: "reduce",
  });
  const forcedPage = await forcedContext.newPage();
  await forcedPage.goto(`${currentBaseUrl}/login`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(forcedPage, 350);
  await forcedPage.keyboard.press("Tab");
  const forcedState = await forcedPage.evaluate(() => {
    const active = document.activeElement;
    const style = active instanceof Element ? getComputedStyle(active) : null;
    return {
      activeTag: active?.tagName.toLowerCase() ?? null,
      activeText: active?.textContent?.trim().slice(0, 100) ?? null,
      outlineStyle: style?.outlineStyle ?? null,
      outlineWidth: style?.outlineWidth ?? null,
      boxShadow: style?.boxShadow ?? null,
      overflow: Math.max(
        document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        0,
      ),
      invisibleText: Array.from(document.querySelectorAll("body *")).filter(
        (element) => {
          if (!(element instanceof HTMLElement)) return false;
          if (!element.innerText?.trim() || element.children.length) {
            return false;
          }
          const computed = getComputedStyle(element);
          return (
            computed.display !== "none" &&
            computed.visibility !== "hidden" &&
            computed.color === computed.backgroundColor
          );
        },
      ).length,
    };
  });
  if (
    forcedState.overflow > 1 ||
    forcedState.invisibleText > 0 ||
    !focusIsVisible(forcedState)
  ) {
    recordError("forced-colors", JSON.stringify(forcedState));
  }
  targeted.push({ type: "forced-colors", ...forcedState });
  await forcedContext.close();

  const zoomContext = await browser.newContext({
    viewport: { width: 720, height: 900 },
    reducedMotion: "no-preference",
  });
  for (const routePath of ["/", "/login", "/galeria"]) {
    const zoomPage = await zoomContext.newPage();
    await zoomPage.goto(`${currentBaseUrl}${routePath}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await settle(zoomPage, 450);
    await progressiveScroll(zoomPage);
    const state = await inspectDesign(zoomPage);
    if (state.overflow > 1 || state.clippedHeadings.length) {
      recordError(
        `zoom-200:${routePath}`,
        `overflow=${state.overflow}; headings=${JSON.stringify(state.clippedHeadings)}`,
      );
    }
    targeted.push({
      type: "zoom-200-equivalent",
      sourceViewport: 1440,
      effectiveCssViewport: 720,
      route: routePath,
      overflow: state.overflow,
      clippedHeadings: state.clippedHeadings,
    });
    await zoomPage.close();
  }
  await zoomContext.close();

  const reducedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    hasTouch: true,
    isMobile: true,
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(reducedPage, 350);
  await progressiveScroll(reducedPage);
  const reducedState = await inspectDesign(reducedPage);
  if (reducedState.pendingReveals || reducedState.infiniteAnimations) {
    recordError(
      "reduced-motion",
      `pending=${reducedState.pendingReveals}; infinite=${reducedState.infiniteAnimations}`,
    );
  }
  targeted.push({
    type: "reduced-motion",
    pendingReveals: reducedState.pendingReveals,
    infiniteAnimations: reducedState.infiniteAnimations,
    overflow: reducedState.overflow,
  });
  await reducedContext.close();
}

async function runKeyboardAndForms(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });

  for (const routePath of ["/login", "/feedback"]) {
    const page = await context.newPage();
    await page.goto(`${currentBaseUrl}${routePath}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await settle(page, 400);
    const focusSequence = [];
    for (let index = 0; index < 24; index += 1) {
      await page.keyboard.press("Tab");
      focusSequence.push(
        await page.evaluate(() => {
          const active = document.activeElement;
          if (!(active instanceof HTMLElement)) return null;
          const style = getComputedStyle(active);
          return {
            tag: active.tagName.toLowerCase(),
            text:
              active.getAttribute("aria-label") ||
              active.textContent?.trim().replace(/\s+/g, " ").slice(0, 90) ||
              active.getAttribute("name") ||
              active.id,
            outlineStyle: style.outlineStyle,
            outlineWidth: style.outlineWidth,
            boxShadow: style.boxShadow,
          };
        }),
      );
    }
    const visibleFocus = focusSequence.filter(focusIsVisible).length;
    if (visibleFocus === 0) {
      recordError(`keyboard:${routePath}`, "nenhum foco visível detectado");
    }
    targeted.push({
      type: "keyboard",
      route: routePath,
      visibleFocus,
      focusSequence,
    });
    await page.close();
  }

  await context.close();
}

async function runNavigationAndResize(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 350);
  await page.goto(`${currentBaseUrl}/lore`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page, 250);
  await page.goBack({ waitUntil: "domcontentloaded" });
  await settle(page, 250);
  const afterBack = new URL(page.url()).pathname;
  await page.goForward({ waitUntil: "domcontentloaded" });
  await settle(page, 250);
  const afterForward = new URL(page.url()).pathname;
  if (afterBack !== "/" || afterForward !== "/lore") {
    recordError(
      "history-navigation",
      `back=${afterBack}; forward=${afterForward}`,
    );
  }

  const resizeStates = [];
  for (const width of [1440, 390, 900]) {
    await page.setViewportSize({ width, height: heightForWidth(width) });
    await page.waitForTimeout(250);
    const state = await inspectDesign(page);
    resizeStates.push({
      width,
      overflow: state.overflow,
      clippedHeadings: state.clippedHeadings,
    });
    if (state.overflow > 1 || state.clippedHeadings.length) {
      recordError(
        `resize@${width}`,
        `overflow=${state.overflow}; headings=${JSON.stringify(state.clippedHeadings)}`,
      );
    }
  }
  targeted.push({
    type: "history-and-resize",
    afterBack,
    afterForward,
    resizeStates,
  });
  await context.close();
}

async function runGalleryInteractions(browser) {
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(`${currentBaseUrl}/galeria`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(desktopPage, 400);
  await desktopPage.locator(".gallery-entry").first().click();
  const dialog = desktopPage.locator('[role="dialog"]');
  await dialog.waitFor({ state: "visible" });
  const focusState = await desktopPage.evaluate(() => {
    const active = document.activeElement;
    return {
      tag: active?.tagName.toLowerCase() ?? null,
      className:
        typeof active?.className === "string" ? active.className : null,
      ariaLabel: active?.getAttribute?.("aria-label") ?? null,
    };
  });
  if (!focusState.className?.includes("gallery-modal-close")) {
    recordError("gallery-modal", `foco inicial=${JSON.stringify(focusState)}`);
  }
  await desktopPage.keyboard.press("Escape");
  const visibleAfterEscape = await dialog.isVisible().catch(() => false);
  if (visibleAfterEscape) {
    recordError("gallery-modal", "Escape não fechou o modal");
  }
  targeted.push({
    type: "gallery-modal-desktop",
    focusState,
    closedByEscape: !visibleAfterEscape,
  });
  await desktopContext.close();

  const touchContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "no-preference",
  });
  const touchPage = await touchContext.newPage();
  await touchPage.goto(`${currentBaseUrl}/galeria`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(touchPage, 400);
  await touchPage.locator(".gallery-entry").first().tap();
  const touchDialog = touchPage.locator('[role="dialog"]');
  await touchDialog.waitFor({ state: "visible" });
  const touchState = await inspectDesign(touchPage);
  if (touchState.overflow > 1) {
    recordError("gallery-touch", `overflow=${touchState.overflow}`);
  }
  targeted.push({
    type: "gallery-modal-touch",
    opened: await touchDialog.isVisible(),
    overflow: touchState.overflow,
  });
  await touchContext.close();
}

function scanSource() {
  const extensions = new Set([".css", ".tsx", ".ts"]);
  const files = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (extensions.has(path.extname(entry.name))) files.push(absolute);
    }
  }
  walk("src");

  const content = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  const matchCount = (regex) => [...content.matchAll(regex)].length;
  const unique = (regex) => [
    ...new Set([...content.matchAll(regex)].map((match) => match[1]?.trim())),
  ].filter(Boolean);
  const designCss = fs.readFileSync("src/app/design-system.css", "utf8");
  const utilityCss = fs.readFileSync(
    "src/app/design-system-utilities.css",
    "utf8",
  );

  return {
    filesScanned: files.length,
    nextFontReferences: matchCount(/next\/font\/google/g),
    arbitraryTypographyUtilities:
      matchCount(/\btext-\[[^\]]+\]/g) +
      matchCount(/\btracking-\[[^\]]+\]/g) +
      matchCount(/\bleading-\[[^\]]+\]/g),
    arbitraryShapeUtilities:
      matchCount(/\brounded-\[[^\]]+\]/g) +
      matchCount(/\bborder-\[[^\]]+\]/g),
    tailwindWeights: unique(
      /\b(font-(?:black|extrabold|bold|semibold|medium|normal|light|thin))\b/g,
    ),
    cssFontWeights: unique(/font-weight\s*:\s*([^;}{]+)/gi),
    cssFontFamilies: unique(/font-family\s*:\s*([^;}{]+)/gi),
    cssBorderRadii: unique(/border-radius\s*:\s*([^;}{]+)/gi),
    directTextColors: unique(/(?:^|[;{\s])color\s*:\s*([^;}{]+)/gim),
    designTokenCount: new Set(
      [...designCss.matchAll(/(--[a-z0-9-]+)\s*:/gi)].map(
        (match) => match[1],
      ),
    ).size,
    semanticUtilityCount: [
      ...utilityCss.matchAll(/^\.[a-z0-9_-]+\s*\{/gim),
    ].length,
    localFontFiles: (() => {
      const found = [];
      function collect(directory) {
        for (const entry of fs.readdirSync(directory, {
          withFileTypes: true,
        })) {
          const absolute = path.join(directory, entry.name);
          if (entry.isDirectory()) collect(absolute);
          else if (/\.(?:woff2?|ttf|otf)$/i.test(entry.name)) {
            found.push(absolute);
          }
        }
      }
      collect(".");
      return found.filter(
        (file) => !file.includes("node_modules") && !file.includes(".next"),
      );
    })(),
  };
}

const browser = await chromium.launch({ headless: true });
let baselineCls = [];
let currentCls = [];

try {
  await runCurrentMatrix(browser);
  baselineCls = await collectClsBaseline(browser);
  currentCls = widths.map((width) => {
    const samples = cases
      .filter((item) => item.width === width)
      .map((item) => ({
        route: item.route,
        path: item.path,
        value: item.cleanCls,
        shifts: item.cleanClsShifts,
      }));
    return summarizeCls("etapa-3-local", width, samples);
  });

  for (const current of currentCls) {
    const before = baselineCls.find((item) => item.width === current.width);
    if (!before) continue;
    const routeDeltas = current.samples.map((sample) => {
      const baselineSample = before.samples.find(
        (item) => item.route === sample.route,
      );
      return {
        route: sample.route,
        path: sample.path,
        baseline: baselineSample?.value ?? null,
        current: sample.value,
        delta:
          baselineSample == null
            ? null
            : sample.value - baselineSample.value,
        currentShifts: sample.shifts,
        baselineShifts: baselineSample?.shifts ?? [],
      };
    });
    const comparableDeltas = routeDeltas.filter(
      (item) => item.delta !== null,
    );
    const largestDelta =
      [...comparableDeltas].sort((a, b) => b.delta - a.delta)[0] ?? null;
    const comparison = {
      width: current.width,
      baselineAverage: before.average,
      currentAverage: current.average,
      averageDelta: current.average - before.average,
      baselineMedian: before.median,
      currentMedian: current.median,
      medianDelta: current.median - before.median,
      baselineMaximum: before.maximum,
      baselineMaximumRoute: before.maximumRoute,
      currentMaximum: current.maximum,
      currentMaximumRoute: current.maximumRoute,
      largestRouteDelta: largestDelta,
      routeDeltas,
    };
    clsComparisons.push(comparison);

    if (comparison.averageDelta > clsAverageTolerance) {
      recordError(
        `CLS@${current.width}`,
        `média regrediu de ${before.average.toFixed(4)} para ${current.average.toFixed(4)}; maior rota=${largestDelta?.route ?? "n/a"}`,
      );
    }
    if (
      largestDelta?.delta !== null &&
      largestDelta?.delta > clsRouteTolerance
    ) {
      recordError(
        `CLS-route@${current.width}`,
        `${largestDelta.route} regrediu ${largestDelta.delta.toFixed(4)} (${largestDelta.baseline.toFixed(4)} → ${largestDelta.current.toFixed(4)})`,
      );
    }
  }

  await runFontFallback(browser);
  await runAccessibilityModes(browser);
  await runKeyboardAndForms(browser);
  await runNavigationAndResize(browser);
  await runGalleryInteractions(browser);
} finally {
  await browser.close();
}

const fontResourceUrls = [
  ...new Set(
    cases.flatMap((item) =>
      item.fontResources.map((resource) => resource.name),
    ),
  ),
];
const fontFaces = [
  ...new Map(
    cases
      .flatMap((item) => item.fontFaces)
      .map((font) => [JSON.stringify(font), font]),
  ).values(),
];
const expectedFamilies = ["Inter", "Oswald", "Roboto Mono"];
for (const family of expectedFamilies) {
  const found = fontFaces.some((font) =>
    font.family.toLowerCase().includes(family.toLowerCase()),
  );
  if (!found) recordError("fonts", `família não registrada: ${family}`);
}
if (fontResourceUrls.length < 3) {
  recordError("fonts", `recursos de fonte carregados=${fontResourceUrls.length}`);
}
const externalFontResources = fontResourceUrls.filter((url) => {
  try {
    const resource = new URL(url);
    const current = new URL(currentBaseUrl);
    return resource.origin !== current.origin;
  } catch {
    return true;
  }
});
if (externalFontResources.length) {
  recordError(
    "fonts",
    `requisições externas em runtime=${externalFontResources.join(", ")}`,
  );
}

const sourceInventory = scanSource();
const summary = {
  routeWidthCases: cases.length,
  expectedRouteWidthCases: routes.length * widths.length,
  validationErrors: errors.length,
  warnings: warnings.length,
  fontResourceCount: fontResourceUrls.length,
  fontFaceCount: fontFaces.length,
  casesWithFunctionalTextBelow14: cases.filter(
    (item) => item.functionalBelow14Count > 0,
  ).length,
  casesWithNecessaryTextBelow12: cases.filter(
    (item) => item.necessaryBelow12Count > 0,
  ).length,
  casesWithDecorativeTextBelow11: cases.filter(
    (item) => item.decorativeBelow11Count > 0,
  ).length,
  casesWithExcessiveTracking: cases.filter(
    (item) => item.excessiveTrackingCount > 0,
  ).length,
  casesWithCompactLineHeight: cases.filter(
    (item) => item.compactLineHeightCount > 0,
  ).length,
  casesWithOverflow: cases.filter((item) => item.overflow > 1).length,
  casesWithClippedHeadings: cases.filter(
    (item) => item.clippedHeadings.length,
  ).length,
  casesWithConsoleErrors: cases.filter(
    (item) => item.consoleErrors.length,
  ).length,
  clsWidthsRegressed: clsComparisons.filter(
    (item) => item.averageDelta > clsAverageTolerance,
  ).length,
  maxCurrentCls: Math.max(
    ...currentCls.map((item) => item.maximum),
    0,
  ),
  maxCurrentClsRoute:
    [...currentCls].sort((a, b) => b.maximum - a.maximum)[0]
      ?.maximumRoute ?? null,
};

const report = {
  generatedAt: new Date().toISOString(),
  commitBase: "b8faffae63a875a542d6f6f29e5401ea41f471ab",
  branch: "agent/fase-4-etapa-3-tipografia-design-system",
  currentBaseUrl,
  baselineBaseUrl,
  widths,
  routes,
  methodology: {
    clsAverageTolerance,
    clsRouteTolerance,
    clsComparison:
      "Produção da Etapa 2 e build local da Etapa 3 são medidas em páginas novas, na mesma rota, largura, preferência de movimento e janela de estabilização. A rolagem funcional ocorre somente depois de registrar o CLS limpo da Etapa 3 e não entra na comparação.",
    textClassification:
      "Controles e ações exigem aproximadamente 14px; metadata necessária exige aproximadamente 12px; índices, coordenadas e símbolos redundantes explicitamente classificados como decorativos podem usar aproximadamente 11px.",
    zoom:
      "O cenário de 200% usa viewport CSS efetiva de 720px para representar 1440px com ampliação de 200%, além da matriz responsiva completa.",
  },
  summary,
  sourceInventory,
  fonts: {
    expectedFamilies,
    resources: fontResourceUrls,
    externalRuntimeResources: externalFontResources,
    faces: fontFaces,
    loadedWeights: [...new Set(fontFaces.map((font) => font.weight))],
  },
  cls: {
    baseline: baselineCls,
    current: currentCls,
    comparisons: clsComparisons,
  },
  clsComparisons,
  cases,
  targeted,
  errors,
  warnings,
  limitations: [
    "Dashboard e Admin permanecem limitados aos estados públicos sem credenciais.",
    "Browser zoom é representado pela viewport CSS equivalente e não por controle da interface gráfica do navegador.",
    "As fontes são auto-hospedadas pelo next/font na build; nenhum arquivo de fonte é incluído nos artefatos de entrega.",
    "Cada rota/largura recebe uma amostra de carregamento limpo no mesmo run; tolerâncias registradas absorvem ruído operacional sem ocultar regressões relevantes.",
  ],
};

fs.writeFileSync(
  path.join(outputDir, "design-system-validation.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(outputDir, "cls-comparison.json"),
  `${JSON.stringify(
    {
      generatedAt: report.generatedAt,
      baselineBaseUrl,
      currentBaseUrl,
      methodology: report.methodology.clsComparison,
      baseline: baselineCls,
      current: currentCls,
      comparisons: clsComparisons,
    },
    null,
    2,
  )}\n`,
);
console.log(JSON.stringify(summary, null, 2));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
