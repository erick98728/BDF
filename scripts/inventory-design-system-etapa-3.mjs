import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "src");
const baselinePath = path.join(
  rootDir,
  "docs/fase-4/etapa-1/baseline.json",
);
const outputDir =
  process.env.ETAPA3_INVENTORY_OUTPUT ||
  path.join(rootDir, "artifacts/fase-4-etapa-3-inventory");
const baseUrl =
  process.env.ETAPA3_BASELINE_URL || "https://bdf-navy.vercel.app";
const representativeWidths = [1440, 768, 390];
const expectedExtensions = new Set([".css", ".tsx", ".ts"]);
const fontExtensions = new Set([".woff", ".woff2", ".ttf", ".otf"]);

fs.mkdirSync(outputDir, { recursive: true });

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return [absolute];
  });
}

function relative(file) {
  return path.relative(rootDir, file).replaceAll(path.sep, "/");
}

function frequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

function collectMatches(content, regex, group = 1) {
  const matches = [];
  for (const match of content.matchAll(regex)) {
    const value = match[group]?.trim();
    if (value) matches.push(value);
  }
  return matches;
}

function samplesFor(content, regex, file, limit = 12) {
  const lines = content.split(/\r?\n/);
  const samples = [];
  lines.forEach((line, index) => {
    if (regex.test(line)) {
      samples.push({
        file,
        line: index + 1,
        text: line.trim().slice(0, 240),
      });
    }
    regex.lastIndex = 0;
  });
  return samples.slice(0, limit);
}

function buildSourceInventory() {
  const allFiles = walk(rootDir).filter(
    (file) =>
      !file.includes(`${path.sep}node_modules${path.sep}`) &&
      !file.includes(`${path.sep}.next${path.sep}`) &&
      !file.includes(`${path.sep}.git${path.sep}`),
  );
  const sourceFiles = allFiles.filter((file) =>
    expectedExtensions.has(path.extname(file)),
  );
  const fontFiles = allFiles.filter((file) =>
    fontExtensions.has(path.extname(file).toLowerCase()),
  );

  const aggregate = {
    fontFamilies: [],
    fontSizes: [],
    fontWeights: [],
    lineHeights: [],
    letterSpacing: [],
    borderRadii: [],
    directTextColors: [],
    arbitraryText: [],
    arbitraryTracking: [],
    arbitraryLeading: [],
    arbitraryRounded: [],
    arbitraryBorder: [],
    tailwindWeights: [],
    cssVariables: [],
    importantRules: [],
    surfaceSelectors: [],
    roleTablist: [],
  };
  const files = [];

  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, "utf8");
    const fileName = relative(file);
    const perFile = {
      file: fileName,
      fontFamilies: collectMatches(
        content,
        /font-family\s*:\s*([^;}{]+)/gi,
      ),
      fontSizes: collectMatches(content, /font-size\s*:\s*([^;}{]+)/gi),
      fontWeights: collectMatches(
        content,
        /font-weight\s*:\s*([^;}{]+)/gi,
      ),
      lineHeights: collectMatches(
        content,
        /line-height\s*:\s*([^;}{]+)/gi,
      ),
      letterSpacing: collectMatches(
        content,
        /letter-spacing\s*:\s*([^;}{]+)/gi,
      ),
      borderRadii: collectMatches(
        content,
        /border-radius\s*:\s*([^;}{]+)/gi,
      ),
      directTextColors: collectMatches(
        content,
        /(?:^|[;{\s])color\s*:\s*([^;}{]+)/gim,
      ),
      arbitraryText: collectMatches(content, /\b(text-\[[^\]]+\])/g),
      arbitraryTracking: collectMatches(
        content,
        /\b(tracking-\[[^\]]+\])/g,
      ),
      arbitraryLeading: collectMatches(
        content,
        /\b(leading-\[[^\]]+\])/g,
      ),
      arbitraryRounded: collectMatches(
        content,
        /\b(rounded-\[[^\]]+\])/g,
      ),
      arbitraryBorder: collectMatches(
        content,
        /\b(border-\[[^\]]+\])/g,
      ),
      tailwindWeights: collectMatches(
        content,
        /\b(font-(?:black|extrabold|bold|semibold|medium|normal|light|thin))\b/g,
      ),
      cssVariables: collectMatches(content, /(--[a-z0-9-]+)\s*:/gi),
      importantRules: collectMatches(content, /([^;{}]+!important)/gi),
      surfaceSelectors: collectMatches(
        content,
        /((?:\.|\[)[^,{\n]*(?:surface|card|panel)[^,{\n]*)\s*\{/gi,
      ),
      roleTablist: samplesFor(
        content,
        /role=["']tablist["']/i,
        fileName,
      ),
    };

    for (const key of Object.keys(aggregate)) {
      if (key === "roleTablist") {
        aggregate.roleTablist.push(...perFile.roleTablist);
      } else if (Array.isArray(perFile[key])) {
        aggregate[key].push(...perFile[key]);
      }
    }

    if (
      Object.entries(perFile).some(
        ([key, value]) => key !== "file" && Array.isArray(value) && value.length,
      )
    ) {
      files.push(perFile);
    }
  }

  const nextFontReferences = sourceFiles.flatMap((file) => {
    const content = fs.readFileSync(file, "utf8");
    return samplesFor(
      content,
      /next\/font|localFont\s*\(|(?:Inter|Oswald|Roboto_Mono)\s*\(/,
      relative(file),
    );
  });

  return {
    generatedAt: new Date().toISOString(),
    sourceFileCount: sourceFiles.length,
    localFontFiles: fontFiles.map(relative),
    nextFontReferences,
    declaredFontFamilies: frequency(aggregate.fontFamilies),
    fontSizes: frequency(aggregate.fontSizes),
    fontWeights: frequency(aggregate.fontWeights),
    lineHeights: frequency(aggregate.lineHeights),
    letterSpacing: frequency(aggregate.letterSpacing),
    borderRadii: frequency(aggregate.borderRadii),
    directTextColors: frequency(aggregate.directTextColors),
    arbitraryUtilities: {
      text: frequency(aggregate.arbitraryText),
      tracking: frequency(aggregate.arbitraryTracking),
      leading: frequency(aggregate.arbitraryLeading),
      rounded: frequency(aggregate.arbitraryRounded),
      border: frequency(aggregate.arbitraryBorder),
      total:
        aggregate.arbitraryText.length +
        aggregate.arbitraryTracking.length +
        aggregate.arbitraryLeading.length +
        aggregate.arbitraryRounded.length +
        aggregate.arbitraryBorder.length,
    },
    tailwindWeights: frequency(aggregate.tailwindWeights),
    cssVariableCount: new Set(aggregate.cssVariables).size,
    cssVariables: frequency(aggregate.cssVariables),
    importantRuleCount: aggregate.importantRules.length,
    surfaceSelectors: frequency(aggregate.surfaceSelectors),
    roleTablistSamples: aggregate.roleTablist,
    files,
  };
}

async function progressiveScroll(page) {
  await page.evaluate(async () => {
    const range = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );
    for (let step = 0; step <= 8; step += 1) {
      window.scrollTo({ top: range * (step / 8), behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 55));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((resolve) => setTimeout(resolve, 120));
  });
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const visibleTextElements = Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        if (!(element instanceof HTMLElement)) return false;
        if (!element.innerText?.trim()) return false;
        if (element.children.length > 0) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number.parseFloat(style.opacity || "1") > 0.02 &&
          rect.width > 0 &&
          rect.height > 0
        );
      })
      .map((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const functional = Boolean(
          element.closest(
            "button, a, input, select, textarea, label, [role='button'], [role='tab'], [role='menuitem'], [role='tooltip']",
          ),
        );
        return {
          tag: element.tagName.toLowerCase(),
          text: element.innerText.trim().replace(/\s+/g, " ").slice(0, 180),
          className: element.className?.toString().slice(0, 220) || "",
          fontFamily: style.fontFamily,
          fontSize: Number.parseFloat(style.fontSize),
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          color: style.color,
          opacity: style.opacity,
          functional,
          width: rect.width,
          height: rect.height,
        };
      });

    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4"))
      .filter((element) => element instanceof HTMLElement)
      .map((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 180),
          fontFamily: style.fontFamily,
          fontSize: Number.parseFloat(style.fontSize),
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
          width: rect.width,
          scrollWidth: element.scrollWidth,
          clipped: element.scrollWidth > element.clientWidth + 1,
        };
      });

    const fontFaces = Array.from(document.fonts).map((font) => ({
      family: font.family,
      style: font.style,
      weight: font.weight,
      status: font.status,
    }));
    const fontResources = performance
      .getEntriesByType("resource")
      .filter((entry) => /\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(entry.name))
      .map((entry) => ({
        name: entry.name,
        duration: entry.duration,
        transferSize: entry.transferSize,
        decodedBodySize: entry.decodedBodySize,
      }));

    return {
      loadedFonts: fontFaces,
      fontResources,
      allVisibleTextCount: visibleTextElements.length,
      below12px: visibleTextElements.filter((item) => item.fontSize < 12),
      functionalBelow14px: visibleTextElements.filter(
        (item) => item.functional && item.fontSize < 14,
      ),
      fontFamilies: [...new Set(visibleTextElements.map((item) => item.fontFamily))],
      fontWeights: [...new Set(visibleTextElements.map((item) => item.fontWeight))],
      textColors: [...new Set(visibleTextElements.map((item) => item.color))],
      headings,
      clippedHeadings: headings.filter((heading) => heading.clipped),
      overflowAmount: Math.max(
        document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        0,
      ),
      pageHeight: document.documentElement.scrollHeight,
      title: document.title,
      roleTablists: document.querySelectorAll('[role="tablist"]').length,
      rolesTabs: document.querySelectorAll('[role="tab"]').length,
    };
  });
}

async function buildRenderedInventory() {
  const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  const routes = baseline.metadata.routes;
  const browser = await chromium.launch({ headless: true });
  const cases = [];

  try {
    for (const width of representativeWidths) {
      const context = await browser.newContext({
        viewport: {
          width,
          height: width <= 430 ? 844 : width <= 768 ? 1024 : 900,
        },
        reducedMotion: "no-preference",
      });
      const page = await context.newPage();

      for (const route of routes) {
        const consoleErrors = [];
        const pageErrors = [];
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => pageErrors.push(error.message));

        let status = null;
        try {
          const response = await page.goto(`${baseUrl}${route.path}`, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
          });
          status = response?.status() ?? null;
          await page.evaluate(async () => {
            if (document.fonts?.ready) await document.fonts.ready;
          });
          await page.waitForTimeout(650);
          await progressiveScroll(page);
          const inspection = await inspectPage(page);
          cases.push({
            route: route.id,
            path: route.path,
            width,
            status,
            ...inspection,
            consoleErrors,
            pageErrors,
          });
        } catch (error) {
          cases.push({
            route: route.id,
            path: route.path,
            width,
            status,
            error: error.message,
            consoleErrors,
            pageErrors,
          });
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  const validCases = cases.filter((item) => !item.error);
  const below12Samples = validCases
    .flatMap((item) =>
      item.below12px.map((sample) => ({
        route: item.route,
        width: item.width,
        ...sample,
      })),
    )
    .slice(0, 100);
  const functionalSamples = validCases
    .flatMap((item) =>
      item.functionalBelow14px.map((sample) => ({
        route: item.route,
        width: item.width,
        ...sample,
      })),
    )
    .slice(0, 100);

  return {
    baseUrl,
    widths: representativeWidths,
    routeCount: routes.length,
    caseCount: cases.length,
    cases,
    summary: {
      totalVisibleTextNodes: validCases.reduce(
        (total, item) => total + item.allVisibleTextCount,
        0,
      ),
      below12pxCount: validCases.reduce(
        (total, item) => total + item.below12px.length,
        0,
      ),
      functionalBelow14pxCount: validCases.reduce(
        (total, item) => total + item.functionalBelow14px.length,
        0,
      ),
      fontResourceUrls: [
        ...new Set(
          validCases.flatMap((item) =>
            item.fontResources.map((resource) => resource.name),
          ),
        ),
      ],
      loadedFontFaces: [
        ...new Map(
          validCases
            .flatMap((item) => item.loadedFonts)
            .map((font) => [JSON.stringify(font), font]),
        ).values(),
      ],
      computedFontFamilies: [
        ...new Set(validCases.flatMap((item) => item.fontFamilies)),
      ],
      computedFontWeights: [
        ...new Set(validCases.flatMap((item) => item.fontWeights)),
      ],
      textColors: [
        ...new Set(validCases.flatMap((item) => item.textColors)),
      ],
      clippedHeadingCount: validCases.reduce(
        (total, item) => total + item.clippedHeadings.length,
        0,
      ),
      overflowCaseCount: validCases.filter((item) => item.overflowAmount > 1)
        .length,
      consoleErrorCaseCount: validCases.filter(
        (item) => item.consoleErrors.length,
      ).length,
      pageErrorCaseCount: validCases.filter((item) => item.pageErrors.length)
        .length,
      roleTablistCaseCount: validCases.filter((item) => item.roleTablists > 0)
        .length,
      roleTabWithoutTabsCaseCount: validCases.filter(
        (item) => item.roleTablists > 0 && item.rolesTabs === 0,
      ).length,
    },
    below12Samples,
    functionalBelow14Samples: functionalSamples,
  };
}

const sourceInventory = buildSourceInventory();
const renderedInventory = await buildRenderedInventory();
const report = {
  generatedAt: new Date().toISOString(),
  commitBase: "b8faffae63a875a542d6f6f29e5401ea41f471ab",
  branch: "agent/fase-4-etapa-3-tipografia-design-system",
  sourceInventory,
  renderedInventory,
  limitations: [
    "O inventário renderizado usa 1440, 768 e 390 como amostra antes da implementação; a validação final usará todas as dez larguras.",
    "A contagem de utilitários arbitrários é estática e é acompanhada por amostras renderizadas para evitar conclusões baseadas somente em regex.",
    "Dashboard e Admin são observados apenas no estado público sem credenciais, preservando a limitação das etapas anteriores.",
  ],
};

fs.writeFileSync(
  path.join(outputDir, "before-inventory.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.log(
  JSON.stringify(
    {
      sourceFileCount: sourceInventory.sourceFileCount,
      localFontFiles: sourceInventory.localFontFiles.length,
      nextFontReferences: sourceInventory.nextFontReferences.length,
      arbitraryUtilities: sourceInventory.arbitraryUtilities.total,
      renderedCases: renderedInventory.caseCount,
      below12px: renderedInventory.summary.below12pxCount,
      functionalBelow14px:
        renderedInventory.summary.functionalBelow14pxCount,
      fontResources: renderedInventory.summary.fontResourceUrls.length,
      loadedFontFaces: renderedInventory.summary.loadedFontFaces.length,
    },
    null,
    2,
  ),
);
