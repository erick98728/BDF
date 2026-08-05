import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const currentBaseUrl =
  process.env.ETAPA3_VALIDATION_URL || "http://127.0.0.1:3000";
const baselineBaseUrl =
  process.env.ETAPA3_BASELINE_URL || "https://bdf-navy.vercel.app";
const outputDir =
  process.env.ETAPA3_VALIDATION_OUTPUT ||
  "artifacts/fase-4-etapa-3";
const baseline = JSON.parse(
  fs.readFileSync("docs/fase-4/etapa-1/baseline.json", "utf8"),
);
const routes = baseline.metadata.routes;
const widths = [1920, 1440, 1280, 1024, 900, 768, 640, 430, 390, 360];
const clsTolerance = 0.01;
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

function recordError(scope, message) {
  errors.push(`${scope}: ${message}`);
}

function recordWarning(scope, message) {
  warnings.push(`${scope}: ${message}`);
}

async function installClsObserver(context) {
  await context.addInitScript(() => {
    const audit = { cls: 0 };
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
          if (!entry.hadRecentInput) audit.cls += entry.value;
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
    }
  });
}

async function settle(page, delay = 650) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
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
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  });
  await page.waitForTimeout(160);
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
        const control = element.closest(
          "button, a, input, select, textarea, label, [role='button'], [role='tab'], [role='menuitem']",
        );
        const auxiliary = Boolean(
          element.closest(
            "[role='tooltip'], .dock-menu__tooltip, .hero-visual__coordinate",
          ),
        );
        const bounds = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          text: element.innerText.trim().replace(/\s+/g, " ").slice(0, 160),
          className: element.className?.toString().slice(0, 220) || "",
          fontFamily: style.fontFamily,
          fontSize: Number.parseFloat(style.fontSize),
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          color: style.color,
          opacity: style.opacity,
          functional: Boolean(control) && !auxiliary,
          auxiliary,
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
      "--text-code",
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
    const below12 = textNodes.filter(
      (item) => !item.auxiliary && item.fontSize < 11.9,
    );
    const below11 = textNodes.filter((item) => item.fontSize < 10.9);

    return {
      cls: window.__designAudit?.cls || 0,
      tokens,
      fontResources,
      fontFaces,
      computedFamilies: [...new Set(textNodes.map((item) => item.fontFamily))],
      computedWeights: [...new Set(textNodes.map((item) => item.fontWeight))],
      textNodeCount: textNodes.length,
      below12Count: below12.length,
      functionalBelow14Count: functionalBelow14.length,
      below11Count: below11.length,
      below12Samples: below12.slice(0, 12),
      functionalBelow14Samples: functionalBelow14.slice(0, 12),
      below11Samples: below11.slice(0, 12),
      headings,
      clippedHeadings: headings.filter((heading) => heading.clipped),
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
    const page = await context.newPage();

    for (const route of routes) {
      const scope = `${route.id}@${width}`;
      const consoleErrors = [];
      const pageErrors = [];
      page.removeAllListeners("console");
      page.removeAllListeners("pageerror");
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
        if (state.below11Count) {
          recordError(
            scope,
            `texto abaixo de 11px=${JSON.stringify(state.below11Samples)}`,
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
          ...state,
          consoleErrors: relevantConsoleErrors,
          pageErrors,
        });
      } catch (error) {
        recordError(scope, error.message);
      }
    }

    await context.close();
  }
}

async function collectClsBaseline(browser, baseUrl, label) {
  const rows = [];

  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: heightForWidth(width) },
      reducedMotion: "no-preference",
    });
    await installClsObserver(context);
    const page = await context.newPage();
    const values = [];

    for (const route of routes) {
      try {
        await page.goto(`${baseUrl}${route.path}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        await settle(page);
        values.push(
          await page.evaluate(() => window.__designAudit?.cls || 0),
        );
      } catch (error) {
        recordWarning(`${label}:${route.id}@${width}`, error.message);
      }
    }

    rows.push({
      label,
      width,
      values,
      average: average(values),
      median: median(values),
      maximum: Math.max(...values, 0),
    });
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
  const page = await context.newPage();
  const results = [];

  for (const routePath of ["/", "/login"]) {
    const consoleErrors = [];
    page.removeAllListeners("console");
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await page.goto(`${currentBaseUrl}${routePath}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(900);
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
  }

  targeted.push({ type: "font-fallback", results });
  await context.close();
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
      overflow: Math.max(
        document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        0,
      ),
      invisibleText: Array.from(document.querySelectorAll("body *")).filter(
        (element) => {
          if (!(element instanceof HTMLElement)) return false;
          if (!element.innerText?.trim() || element.children.length) return false;
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
  if (forcedState.overflow > 1 || forcedState.invisibleText > 0) {
    recordError("forced-colors", JSON.stringify(forcedState));
  }
  targeted.push({ type: "forced-colors", ...forcedState });
  await forcedContext.close();

  const zoomContext = await browser.newContext({
    viewport: { width: 720, height: 900 },
    reducedMotion: "no-preference",
  });
  const zoomPage = await zoomContext.newPage();
  for (const routePath of ["/", "/login", "/galeria"]) {
    await zoomPage.goto(`${currentBaseUrl}${routePath}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await settle(zoomPage, 450);
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
  }
  await zoomContext.close();
}

async function runKeyboardAndForms(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();

  for (const routePath of ["/login", "/feedback"]) {
    await page.goto(`${currentBaseUrl}${routePath}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await settle(page, 400);
    const focusSequence = [];
    for (let index = 0; index < 18; index += 1) {
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
          };
        }),
      );
    }
    const visibleFocus = focusSequence.filter(
      (item) =>
        item &&
        item.outlineStyle !== "none" &&
        item.outlineWidth !== "0px",
    ).length;
    if (visibleFocus === 0) {
      recordError(`keyboard:${routePath}`, "nenhum foco visível detectado");
    }
    targeted.push({
      type: "keyboard",
      route: routePath,
      visibleFocus,
      focusSequence,
    });
  }

  await context.close();
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
    designTokenCount: new Set([
      ...designCss.matchAll(/(--[a-z0-9-]+)\s*:/gi),
    ].map((match) => match[1])).size,
    semanticUtilityCount:
      [...utilityCss.matchAll(/^\.[a-z0-9_-]+\s*\{/gim)].length,
    localFontFiles: (() => {
      const found = [];
      function collect(directory) {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
          const absolute = path.join(directory, entry.name);
          if (entry.isDirectory()) collect(absolute);
          else if (/\.(?:woff2?|ttf|otf)$/i.test(entry.name)) found.push(absolute);
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
  baselineCls = await collectClsBaseline(
    browser,
    baselineBaseUrl,
    "etapa-2-production",
  );
  currentCls = widths.map((width) => {
    const values = cases
      .filter((item) => item.width === width)
      .map((item) => item.cls);
    return {
      label: "etapa-3-local",
      width,
      values,
      average: average(values),
      median: median(values),
      maximum: Math.max(...values, 0),
    };
  });

  for (const current of currentCls) {
    const before = baselineCls.find((item) => item.width === current.width);
    if (!before) continue;
    const comparison = {
      width: current.width,
      baselineAverage: before.average,
      currentAverage: current.average,
      averageDelta: current.average - before.average,
      baselineMedian: before.median,
      currentMedian: current.median,
      medianDelta: current.median - before.median,
      baselineMaximum: before.maximum,
      currentMaximum: current.maximum,
    };
    clsComparisons.push(comparison);
    if (current.average > before.average + clsTolerance) {
      recordError(
        `CLS@${current.width}`,
        `média regrediu de ${before.average.toFixed(4)} para ${current.average.toFixed(4)}`,
      );
    }
  }

  await runFontFallback(browser);
  await runAccessibilityModes(browser);
  await runKeyboardAndForms(browser);
} finally {
  await browser.close();
}

const fontResourceUrls = [
  ...new Set(
    cases.flatMap((item) => item.fontResources.map((resource) => resource.name)),
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
  casesWithTextBelow12: cases.filter((item) => item.below12Count > 0).length,
  casesWithTextBelow11: cases.filter((item) => item.below11Count > 0).length,
  casesWithOverflow: cases.filter((item) => item.overflow > 1).length,
  casesWithClippedHeadings: cases.filter(
    (item) => item.clippedHeadings.length,
  ).length,
  casesWithConsoleErrors: cases.filter((item) => item.consoleErrors.length)
    .length,
  clsWidthsRegressed: clsComparisons.filter(
    (item) => item.averageDelta > clsTolerance,
  ).length,
  maxCurrentCls: Math.max(...cases.map((item) => item.cls), 0),
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
    clsTolerance,
    clsComparison:
      "A build local da Etapa 3 e a produção publicada da Etapa 2 foram medidas no mesmo run, nas mesmas 17 rotas e dez larguras.",
    zoom:
      "O cenário de 200% usa viewport CSS efetiva de 720px para representar 1440px com ampliação de 200%, além da matriz responsiva completa.",
  },
  summary,
  sourceInventory,
  fonts: {
    expectedFamilies,
    resources: fontResourceUrls,
    faces: fontFaces,
    loadedWeights: [...new Set(fontFaces.map((font) => font.weight))],
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
  ],
};

fs.writeFileSync(
  path.join(outputDir, "design-system-validation.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(summary, null, 2));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
