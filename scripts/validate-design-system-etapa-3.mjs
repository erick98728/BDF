import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const currentBaseUrl = process.env.ETAPA3_VALIDATION_URL || "http://127.0.0.1:3000";
const baselineBaseUrl = process.env.ETAPA3_BASELINE_URL || "https://bdf-navy.vercel.app";
const outputDir = process.env.ETAPA3_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-3";
const baselineRecord = JSON.parse(fs.readFileSync("docs/fase-4/etapa-1/baseline.json", "utf8"));
const routes = baselineRecord.metadata.routes;
const widths = [1920, 1440, 1280, 1024, 900, 768, 640, 430, 390, 360];
const clsAverageTolerance = 0.01;
const clsRouteTolerance = 0.02;
const cases = [];
const targeted = [];
const errors = [];
const warnings = [];

fs.mkdirSync(outputDir, { recursive: true });

const heightForWidth = (width) => width === 1920 ? 1080 : width <= 430 ? 844 : width <= 768 ? 1024 : 900;
const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
function recordError(scope, message) { errors.push(`${scope}: ${message}`); }
function recordWarning(scope, message) { warnings.push(`${scope}: ${message}`); }

async function instrument(context) {
  await context.addInitScript(() => {
    const audit = { cls: 0, shifts: [] };
    Object.defineProperty(window, "__designAudit", { configurable: true, value: audit });
    if ("PerformanceObserver" in window && PerformanceObserver.supportedEntryTypes?.includes("layout-shift")) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.hadRecentInput) continue;
          audit.cls += entry.value;
          audit.shifts.push({
            value: entry.value,
            startTime: entry.startTime,
            sources: (entry.sources || []).slice(0, 5).map((source) => ({
              tag: source.node?.tagName?.toLowerCase?.() ?? null,
              id: source.node?.id ?? null,
              className: typeof source.node?.className === "string" ? source.node.className.slice(0, 180) : null,
              previousRect: source.previousRect,
              currentRect: source.currentRect,
            })),
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
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  await page.waitForTimeout(delay);
}

async function progressiveScroll(page) {
  await page.evaluate(async () => {
    const range = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    for (const progress of [0, 0.18, 0.36, 0.58, 0.78, 1]) {
      window.scrollTo({ top: range * progress, behavior: "instant" });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
  });
  await page.waitForTimeout(180);
}

async function inspect(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      if (!(element instanceof HTMLElement)) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number.parseFloat(style.opacity || "1") > 0.02 && rect.width > 0 && rect.height > 0;
    };
    const decorativeSelector = [
      ".fx-record-symbol", ".system-index__number", ".editorial-log__index",
      ".fragment-index__number", ".devlog-ledger__index", ".hero-visual__coordinate",
      "[data-typography='coordinate']",
    ].join(",");
    const secondaryMetadataSelector = [
      "time", "dt", ".gallery-entry__meta", ".gallery-modal-copy dt",
      ".devlog-ledger__meta", ".character-dossier__meta", ".roadmap-record__meta",
      ".lore-record__meta", ".studio-record__meta",
    ].join(",");

    const textNodes = Array.from(document.querySelectorAll("body *"))
      .filter((element) => element instanceof HTMLElement && element.innerText?.trim() && element.children.length === 0 && !element.closest('[aria-hidden="true"], .sr-only') && visible(element))
      .map((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const control = element.closest("button, input, select, textarea, label, [role='button'], [role='tab'], [role='menuitem']");
        const anchor = element.closest("a");
        const secondaryMetadata = Boolean(element.closest(secondaryMetadataSelector));
        const decorative = Boolean(element.closest(decorativeSelector));
        const functional = Boolean(control || (anchor && !secondaryMetadata && !decorative));
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
          lineHeightRatio: Number.isFinite(lineHeight) && fontSize > 0 ? lineHeight / fontSize : null,
          letterSpacing: style.letterSpacing,
          trackingEm: Number.isFinite(letterSpacing) && fontSize > 0 ? letterSpacing / fontSize : 0,
          color: style.color,
          opacity: style.opacity,
          functional,
          secondaryMetadata,
          decorative,
          necessary: !functional && !decorative,
          width: rect.width,
          height: rect.height,
        };
      });

    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4"))
      .filter(visible)
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

    const readingMeasures = Array.from(document.querySelectorAll(".prose, .devlog-article__body, .lore-prose, .editorial-prose, [data-reading-measure]"))
      .filter(visible)
      .map((element) => {
        const style = getComputedStyle(element);
        const fontSize = Number.parseFloat(style.fontSize);
        const width = element.getBoundingClientRect().width;
        return { tag: element.tagName.toLowerCase(), className: element.className?.toString().slice(0, 180) || "", width, fontSize, measureEm: fontSize > 0 ? width / fontSize : 0 };
      });

    const functionalBelow14 = textNodes.filter((item) => item.functional && item.fontSize < 13.9);
    const necessaryBelow12 = textNodes.filter((item) => item.necessary && item.fontSize < 11.9);
    const decorativeBelow11 = textNodes.filter((item) => item.decorative && item.fontSize < 10.9);
    const excessiveTracking = textNodes.filter((item) => !item.decorative && Math.abs(item.trackingEm) > 0.121 && item.text.length > 1);
    const compactBodyLineHeight = textNodes.filter((item) =>
      !item.decorative && ["p", "li", "dd", "blockquote"].includes(item.tag) && item.lineHeightRatio !== null && item.lineHeightRatio < 1.35 && item.text.length > 40,
    );

    const fixedPaintSurfaces = [];
    for (const [selector, pseudo] of [
      [".surface-glass", "::after"], [".fx-button", "::before"],
      [".game-glyph", "::before"], [".fx-card--interactive > .surface-glass", "::after"],
    ]) {
      Array.from(document.querySelectorAll(selector)).slice(0, 30).forEach((element) => {
        try {
          if (getComputedStyle(element, pseudo).backgroundAttachment === "fixed") fixedPaintSurfaces.push(`${selector}${pseudo}`);
        } catch {}
      });
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const tokenNames = [
      "--font-display", "--font-body", "--font-mono", "--text-display", "--text-page-title",
      "--text-chapter-title", "--text-section-title", "--text-component-title", "--text-record-title",
      "--text-body-lg", "--text-body", "--text-body-sm", "--text-label", "--text-meta", "--text-decorative",
      "--text-code", "--leading-display", "--leading-heading", "--leading-body", "--leading-compact",
      "--tracking-display", "--tracking-heading", "--tracking-label", "--tracking-meta", "--text-primary",
      "--text-secondary", "--text-muted", "--text-subtle", "--text-accent", "--surface-page", "--surface-raised",
      "--surface-subtle", "--surface-interactive", "--surface-overlay", "--surface-functional", "--border-subtle",
      "--border-default", "--border-strong", "--border-accent", "--border-focus", "--radius-sm", "--radius-md",
      "--radius-lg", "--radius-pill", "--measure-compact", "--measure-body", "--measure-wide",
    ];
    const tokens = Object.fromEntries(tokenNames.map((name) => [name, rootStyle.getPropertyValue(name).trim()]));
    const fontResources = performance.getEntriesByType("resource")
      .filter((entry) => /\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(entry.name))
      .map((entry) => ({ name: entry.name, transferSize: entry.transferSize, decodedBodySize: entry.decodedBodySize, duration: entry.duration }));
    const fontFaces = Array.from(document.fonts).map((font) => ({ family: font.family, weight: font.weight, style: font.style, status: font.status }));

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
      compactLineHeightCount: compactBodyLineHeight.length,
      compactLineHeightSamples: compactBodyLineHeight.slice(0, 12),
      headings,
      clippedHeadings: headings.filter((heading) => heading.clipped),
      readingMeasures,
      excessiveReadingMeasures: readingMeasures.filter((measure) => measure.measureEm > 82),
      overflow: Math.max(document.documentElement.scrollWidth - document.documentElement.clientWidth, 0),
      roleTablists: document.querySelectorAll('[role="tablist"]').length,
      pendingReveals: document.querySelectorAll('[data-fx-state="pending"]').length,
      infiniteAnimations: document.getAnimations({ subtree: true }).filter((animation) => animation.effect?.getTiming?.().iterations === Infinity).length,
      fixedBackgrounds: fixedPaintSurfaces,
      routeBusy: document.querySelector(".route-transition-shell")?.getAttribute("aria-busy") ?? null,
      surfaceRoles: [...new Set(Array.from(document.querySelectorAll("[data-surface-role]")).map((element) => element.getAttribute("data-surface-role")).filter(Boolean))],
      headingRoles: [...new Set(Array.from(document.querySelectorAll("[data-heading-role]")).map((element) => element.getAttribute("data-heading-role")).filter(Boolean))],
    };
  });
}

const relevantConsoleErrors = (messages, routeId, fallback = false) => messages.filter((message) => {
  if (fallback && /font|woff|failed to load resource/i.test(message)) return false;
  if (routeId === "404" && /404|not found|failed to load resource/i.test(message)) return false;
  return true;
});

async function runCurrentMatrix(browser) {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: heightForWidth(width) }, reducedMotion: "no-preference" });
    await instrument(context);
    for (const route of routes) {
      const scope = `${route.id}@${width}`;
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      try {
        const response = await page.goto(`${currentBaseUrl}${route.path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await settle(page);
        const cleanCls = await page.evaluate(() => window.__designAudit?.cls || 0);
        const cleanClsShifts = await page.evaluate(() => window.__designAudit?.shifts || []);
        await progressiveScroll(page);
        const state = await inspect(page);
        const expectedStatus = route.id === "404" ? 404 : 200;
        const console = relevantConsoleErrors(consoleErrors, route.id);
        if (response?.status() !== expectedStatus) recordError(scope, `HTTP ${response?.status()}; esperado ${expectedStatus}`);
        if (state.overflow > 1) recordError(scope, `overflow horizontal=${state.overflow}px`);
        if (state.clippedHeadings.length) recordError(scope, `títulos cortados=${JSON.stringify(state.clippedHeadings)}`);
        if (state.functionalBelow14Count) recordError(scope, `textos funcionais abaixo de 14px=${JSON.stringify(state.functionalBelow14Samples)}`);
        if (state.necessaryBelow12Count) recordError(scope, `metadata necessária abaixo de 12px=${JSON.stringify(state.necessaryBelow12Samples)}`);
        if (state.decorativeBelow11Count) recordError(scope, `texto decorativo abaixo de 11px=${JSON.stringify(state.decorativeBelow11Samples)}`);
        if (state.excessiveTrackingCount) recordError(scope, `tracking excessivo=${JSON.stringify(state.excessiveTrackingSamples)}`);
        if (state.compactLineHeightCount) recordError(scope, `altura de linha de corpo insuficiente=${JSON.stringify(state.compactLineHeightSamples)}`);
        if (state.excessiveReadingMeasures.length) recordError(scope, `largura de leitura excessiva=${JSON.stringify(state.excessiveReadingMeasures)}`);
        if (state.pendingReveals) recordError(scope, `reveals pendentes=${state.pendingReveals}`);
        if (state.infiniteAnimations) recordError(scope, `animações infinitas=${state.infiniteAnimations}`);
        if (state.fixedBackgrounds.length) recordError(scope, `backgrounds fixos=${state.fixedBackgrounds.join(",")}`);
        if (state.routeBusy === "true") recordError(scope, "aria-busy permaneceu ativo");
        if (console.length) recordError(scope, `console=${console.join(" | ")}`);
        if (pageErrors.length) recordError(scope, `pageerror=${pageErrors.join(" | ")}`);
        if (route.id === "login" && state.roleTablists > 0) recordError(scope, "Login ainda contém role=tablist");
        cases.push({ route: route.id, path: route.path, width, status: response?.status() ?? null, cleanCls, cleanClsShifts, ...state, consoleErrors: console, pageErrors });
      } catch (error) {
        recordError(scope, error.message);
      } finally {
        await page.close();
      }
    }
    await context.close();
  }
}

function clsSummary(label, width, samples) {
  const values = samples.map((sample) => sample.value);
  const maximum = Math.max(...values, 0);
  const maxSample = samples.find((sample) => sample.value === maximum) ?? null;
  return { label, width, samples, average: average(values), median: median(values), maximum, maximumRoute: maxSample?.route ?? null, maximumPath: maxSample?.path ?? null };
}

async function collectBaselineCls(browser) {
  const rows = [];
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: heightForWidth(width) }, reducedMotion: "no-preference" });
    await instrument(context);
    const samples = [];
    for (const route of routes) {
      const page = await context.newPage();
      try {
        await page.goto(`${baselineBaseUrl}${route.path}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await settle(page);
        samples.push({ route: route.id, path: route.path, value: await page.evaluate(() => window.__designAudit?.cls || 0), shifts: await page.evaluate(() => window.__designAudit?.shifts || []) });
      } catch (error) {
        recordWarning(`etapa-2-production:${route.id}@${width}`, error.message);
      } finally {
        await page.close();
      }
    }
    rows.push(clsSummary("etapa-2-production", width, samples));
    await context.close();
  }
  return rows;
}

const focusVisible = (item) => Boolean(item && ((item.outlineStyle !== "none" && item.outlineWidth !== "0px") || (item.boxShadow && item.boxShadow !== "none")));

async function runTargeted(browser) {
  const fallbackContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await instrument(fallbackContext);
  await fallbackContext.route(/\.(?:woff2?|ttf|otf)(?:\?|$)/i, (route) => route.abort("blockedbyclient"));
  const fallbackResults = [];
  for (const routePath of ["/", "/login"]) {
    const page = await fallbackContext.newPage();
    const consoleErrors = [];
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    await page.goto(`${currentBaseUrl}${routePath}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(950);
    const state = await inspect(page);
    const console = relevantConsoleErrors(consoleErrors, routePath, true);
    if (state.overflow > 1 || state.clippedHeadings.length || state.textNodeCount === 0 || console.length) recordError(`font-fallback:${routePath}`, `overflow=${state.overflow}; headings=${JSON.stringify(state.clippedHeadings)}; console=${console.join(" | ")}`);
    fallbackResults.push({ route: routePath, ...state, consoleErrors: console });
    await page.close();
  }
  targeted.push({ type: "font-fallback", results: fallbackResults });
  await fallbackContext.close();

  const forcedContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active", reducedMotion: "reduce" });
  const forcedPage = await forcedContext.newPage();
  await forcedPage.goto(`${currentBaseUrl}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await settle(forcedPage, 350);
  await forcedPage.keyboard.press("Tab");
  const forced = await forcedPage.evaluate(() => {
    const active = document.activeElement;
    const style = active instanceof Element ? getComputedStyle(active) : null;
    return { activeTag: active?.tagName.toLowerCase() ?? null, activeText: active?.textContent?.trim().slice(0, 100) ?? null, outlineStyle: style?.outlineStyle ?? null, outlineWidth: style?.outlineWidth ?? null, boxShadow: style?.boxShadow ?? null, overflow: Math.max(document.documentElement.scrollWidth - document.documentElement.clientWidth, 0) };
  });
  if (forced.overflow > 1 || !focusVisible(forced)) recordError("forced-colors", JSON.stringify(forced));
  targeted.push({ type: "forced-colors", ...forced });
  await forcedContext.close();

  const zoomContext = await browser.newContext({ viewport: { width: 720, height: 900 } });
  for (const routePath of ["/", "/login", "/galeria"]) {
    const page = await zoomContext.newPage();
    await page.goto(`${currentBaseUrl}${routePath}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await settle(page, 450);
    await progressiveScroll(page);
    const state = await inspect(page);
    if (state.overflow > 1 || state.clippedHeadings.length) recordError(`zoom-200:${routePath}`, `overflow=${state.overflow}; headings=${JSON.stringify(state.clippedHeadings)}`);
    targeted.push({ type: "zoom-200-equivalent", sourceViewport: 1440, effectiveCssViewport: 720, route: routePath, overflow: state.overflow, clippedHeadings: state.clippedHeadings });
    await page.close();
  }
  await zoomContext.close();

  const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", hasTouch: true, isMobile: true });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${currentBaseUrl}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await settle(reducedPage, 350);
  await progressiveScroll(reducedPage);
  const reduced = await inspect(reducedPage);
  if (reduced.pendingReveals || reduced.infiniteAnimations || reduced.overflow > 1) recordError("reduced-motion", `pending=${reduced.pendingReveals}; infinite=${reduced.infiniteAnimations}; overflow=${reduced.overflow}`);
  targeted.push({ type: "reduced-motion", pendingReveals: reduced.pendingReveals, infiniteAnimations: reduced.infiniteAnimations, overflow: reduced.overflow });
  await reducedContext.close();

  const keyboardContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  for (const routePath of ["/login", "/feedback"]) {
    const page = await keyboardContext.newPage();
    await page.goto(`${currentBaseUrl}${routePath}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await settle(page, 400);
    const focusSequence = [];
    for (let index = 0; index < 24; index += 1) {
      await page.keyboard.press("Tab");
      focusSequence.push(await page.evaluate(() => {
        const active = document.activeElement;
        if (!(active instanceof HTMLElement)) return null;
        const style = getComputedStyle(active);
        return { tag: active.tagName.toLowerCase(), text: active.getAttribute("aria-label") || active.textContent?.trim().replace(/\s+/g, " ").slice(0, 90) || active.getAttribute("name") || active.id, outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, boxShadow: style.boxShadow };
      }));
    }
    const visibleFocus = focusSequence.filter(focusVisible).length;
    if (visibleFocus === 0) recordError(`keyboard:${routePath}`, "nenhum foco visível detectado");
    targeted.push({ type: "keyboard", route: routePath, visibleFocus, focusSequence });
    await page.close();
  }
  await keyboardContext.close();

  const navigationContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const navigationPage = await navigationContext.newPage();
  await navigationPage.goto(`${currentBaseUrl}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await settle(navigationPage, 300);
  await navigationPage.goto(`${currentBaseUrl}/lore`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await settle(navigationPage, 250);
  await navigationPage.goBack({ waitUntil: "domcontentloaded" }); await settle(navigationPage, 250);
  const afterBack = new URL(navigationPage.url()).pathname;
  await navigationPage.goForward({ waitUntil: "domcontentloaded" }); await settle(navigationPage, 250);
  const afterForward = new URL(navigationPage.url()).pathname;
  if (afterBack !== "/" || afterForward !== "/lore") recordError("history-navigation", `back=${afterBack}; forward=${afterForward}`);
  const resizeStates = [];
  for (const width of [1440, 390, 900]) {
    await navigationPage.setViewportSize({ width, height: heightForWidth(width) });
    await navigationPage.waitForTimeout(250);
    const state = await inspect(navigationPage);
    resizeStates.push({ width, overflow: state.overflow, clippedHeadings: state.clippedHeadings });
    if (state.overflow > 1 || state.clippedHeadings.length) recordError(`resize@${width}`, `overflow=${state.overflow}; headings=${JSON.stringify(state.clippedHeadings)}`);
  }
  targeted.push({ type: "history-and-resize", afterBack, afterForward, resizeStates });
  await navigationContext.close();

  const galleryContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const galleryPage = await galleryContext.newPage();
  await galleryPage.goto(`${currentBaseUrl}/galeria`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await settle(galleryPage, 400);
  await galleryPage.locator(".gallery-entry").first().click();
  const dialog = galleryPage.locator('[role="dialog"]');
  await dialog.waitFor({ state: "visible" });
  const focusState = await galleryPage.evaluate(() => ({ tag: document.activeElement?.tagName.toLowerCase() ?? null, className: typeof document.activeElement?.className === "string" ? document.activeElement.className : null, ariaLabel: document.activeElement?.getAttribute?.("aria-label") ?? null }));
  if (!focusState.className?.includes("gallery-modal-close")) recordError("gallery-modal", `foco inicial=${JSON.stringify(focusState)}`);
  await galleryPage.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden", timeout: 2500 }).catch(() => {});
  const closedByEscape = !(await dialog.isVisible().catch(() => false));
  if (!closedByEscape) recordError("gallery-modal", "Escape não fechou o modal");
  targeted.push({ type: "gallery-modal-desktop", focusState, closedByEscape });
  await galleryContext.close();

  const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const touchPage = await touchContext.newPage();
  await touchPage.goto(`${currentBaseUrl}/galeria`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await settle(touchPage, 400);
  await touchPage.locator(".gallery-entry").first().tap();
  const touchDialog = touchPage.locator('[role="dialog"]');
  await touchDialog.waitFor({ state: "visible" });
  const touchState = await inspect(touchPage);
  if (touchState.overflow > 1) recordError("gallery-touch", `overflow=${touchState.overflow}`);
  targeted.push({ type: "gallery-modal-touch", opened: await touchDialog.isVisible(), overflow: touchState.overflow });
  await touchContext.close();
}

function scanSource() {
  const files = [];
  const extensions = new Set([".css", ".tsx", ".ts"]);
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (extensions.has(path.extname(entry.name))) files.push(absolute);
    }
  }
  walk("src");
  const content = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  const count = (regex) => [...content.matchAll(regex)].length;
  const unique = (regex) => [...new Set([...content.matchAll(regex)].map((match) => match[1]?.trim()))].filter(Boolean);
  const designCss = fs.readFileSync("src/app/design-system.css", "utf8");
  const utilitiesCss = fs.readFileSync("src/app/design-system-utilities.css", "utf8");
  return {
    filesScanned: files.length,
    nextFontReferences: count(/next\/font\/google/g),
    arbitraryTypographyUtilities: count(/\btext-\[[^\]]+\]/g) + count(/\btracking-\[[^\]]+\]/g) + count(/\bleading-\[[^\]]+\]/g),
    arbitraryShapeUtilities: count(/\brounded-\[[^\]]+\]/g) + count(/\bborder-\[[^\]]+\]/g),
    tailwindWeights: unique(/\b(font-(?:black|extrabold|bold|semibold|medium|normal|light|thin))\b/g),
    cssFontWeights: unique(/font-weight\s*:\s*([^;}{]+)/gi),
    cssFontFamilies: unique(/font-family\s*:\s*([^;}{]+)/gi),
    cssBorderRadii: unique(/border-radius\s*:\s*([^;}{]+)/gi),
    directTextColors: unique(/(?:^|[;{\s])color\s*:\s*([^;}{]+)/gim),
    designTokenCount: new Set([...designCss.matchAll(/(--[a-z0-9-]+)\s*:/gi)].map((match) => match[1])).size,
    semanticUtilityCount: [...utilitiesCss.matchAll(/^\.[a-z0-9_-]+\s*\{/gim)].length,
    localFontFiles: [],
  };
}

const browser = await chromium.launch({ headless: true });
let baselineCls = [];
let currentCls = [];
try {
  await runCurrentMatrix(browser);
  baselineCls = await collectBaselineCls(browser);
  currentCls = widths.map((width) => clsSummary("etapa-3-local", width, cases.filter((item) => item.width === width).map((item) => ({ route: item.route, path: item.path, value: item.cleanCls, shifts: item.cleanClsShifts }))));
  await runTargeted(browser);
} finally {
  await browser.close();
}

const clsComparisons = currentCls.map((current) => {
  const baseline = baselineCls.find((item) => item.width === current.width);
  const routeDeltas = current.samples.map((sample) => {
    const before = baseline?.samples.find((item) => item.route === sample.route);
    return { route: sample.route, path: sample.path, baseline: before?.value ?? null, current: sample.value, delta: before ? sample.value - before.value : null, baselineShifts: before?.shifts ?? [], currentShifts: sample.shifts };
  });
  const largestRouteDelta = [...routeDeltas].filter((item) => item.delta !== null).sort((a, b) => b.delta - a.delta)[0] ?? null;
  const comparison = {
    width: current.width,
    baselineAverage: baseline?.average ?? 0,
    currentAverage: current.average,
    averageDelta: current.average - (baseline?.average ?? 0),
    baselineMedian: baseline?.median ?? 0,
    currentMedian: current.median,
    medianDelta: current.median - (baseline?.median ?? 0),
    baselineMaximum: baseline?.maximum ?? 0,
    baselineMaximumRoute: baseline?.maximumRoute ?? null,
    currentMaximum: current.maximum,
    currentMaximumRoute: current.maximumRoute,
    largestRouteDelta,
    routeDeltas,
  };
  if (comparison.averageDelta > clsAverageTolerance) recordError(`CLS@${current.width}`, `média regrediu de ${comparison.baselineAverage.toFixed(4)} para ${comparison.currentAverage.toFixed(4)}; maior rota=${largestRouteDelta?.route ?? "n/a"}`);
  if (largestRouteDelta?.delta !== null && largestRouteDelta.delta > clsRouteTolerance) recordError(`CLS-route@${current.width}`, `${largestRouteDelta.route} regrediu ${largestRouteDelta.delta.toFixed(4)} (${largestRouteDelta.baseline.toFixed(4)} → ${largestRouteDelta.current.toFixed(4)})`);
  return comparison;
});

if (cases.length !== routes.length * widths.length) recordError("matrix", `casos=${cases.length}; esperado=${routes.length * widths.length}`);
const fontResourceUrls = [...new Set(cases.flatMap((item) => item.fontResources.map((resource) => resource.name)))];
const fontFaces = [...new Map(cases.flatMap((item) => item.fontFaces).map((font) => [JSON.stringify(font), font])).values()];
for (const family of ["Inter", "Oswald", "Roboto Mono"]) {
  if (!fontFaces.some((font) => font.family.toLowerCase().includes(family.toLowerCase()))) recordError("fonts", `família não registrada: ${family}`);
}
if (fontResourceUrls.length < 3) recordError("fonts", `recursos de fonte carregados=${fontResourceUrls.length}`);
const externalFontResources = fontResourceUrls.filter((url) => {
  try { return new URL(url).origin !== new URL(currentBaseUrl).origin; } catch { return true; }
});
if (externalFontResources.length) recordError("fonts", `requisições externas em runtime=${externalFontResources.join(", ")}`);

const summary = {
  routeWidthCases: cases.length,
  expectedRouteWidthCases: routes.length * widths.length,
  validationErrors: errors.length,
  warnings: warnings.length,
  fontResourceCount: fontResourceUrls.length,
  fontFaceCount: fontFaces.length,
  casesWithFunctionalTextBelow14: cases.filter((item) => item.functionalBelow14Count > 0).length,
  casesWithNecessaryTextBelow12: cases.filter((item) => item.necessaryBelow12Count > 0).length,
  casesWithDecorativeTextBelow11: cases.filter((item) => item.decorativeBelow11Count > 0).length,
  casesWithExcessiveTracking: cases.filter((item) => item.excessiveTrackingCount > 0).length,
  casesWithCompactLineHeight: cases.filter((item) => item.compactLineHeightCount > 0).length,
  casesWithOverflow: cases.filter((item) => item.overflow > 1).length,
  casesWithClippedHeadings: cases.filter((item) => item.clippedHeadings.length > 0).length,
  casesWithConsoleErrors: cases.filter((item) => item.consoleErrors.length > 0).length,
  casesWithFixedBackgrounds: cases.filter((item) => item.fixedBackgrounds.length > 0).length,
  clsWidthsRegressed: clsComparisons.filter((item) => item.averageDelta > clsAverageTolerance).length,
  maxCurrentCls: Math.max(...currentCls.map((item) => item.maximum), 0),
  maxCurrentClsRoute: [...currentCls].sort((a, b) => b.maximum - a.maximum)[0]?.maximumRoute ?? null,
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
    clsComparison: "Produção da Etapa 2 e build local da Etapa 3 são medidas em páginas novas, na mesma rota, largura, preferência de movimento e janela de estabilização. A rolagem funcional ocorre somente depois de registrar o CLS limpo da Etapa 3 e não entra na comparação.",
    textClassification: "Controles e ações exigem aproximadamente 14px; metadata necessária exige aproximadamente 12px; índices, coordenadas e símbolos redundantes explicitamente classificados como decorativos podem usar aproximadamente 11px.",
    lineHeight: "A validação de altura de linha mínima é aplicada a parágrafos, itens, definições e citações longas. Headings usam os tokens compactos próprios do sistema.",
    fixedBackgrounds: "A inspeção usa os mesmos pseudo-elementos autoritativos da suíte de movimento da Etapa 2.",
    zoom: "O cenário de 200% usa viewport CSS efetiva de 720px para representar 1440px com ampliação de 200%, além da matriz responsiva completa.",
  },
  summary,
  sourceInventory: scanSource(),
  fonts: { expectedFamilies: ["Inter", "Oswald", "Roboto Mono"], resources: fontResourceUrls, externalRuntimeResources: externalFontResources, faces: fontFaces, loadedWeights: [...new Set(fontFaces.map((font) => font.weight))] },
  cls: { baseline: baselineCls, current: currentCls, comparisons: clsComparisons },
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

fs.writeFileSync(path.join(outputDir, "design-system-validation.json"), `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(path.join(outputDir, "cls-comparison.json"), `${JSON.stringify({ generatedAt: report.generatedAt, baselineBaseUrl, currentBaseUrl, methodology: report.methodology.clsComparison, baseline: baselineCls, current: currentCls, comparisons: clsComparisons }, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
