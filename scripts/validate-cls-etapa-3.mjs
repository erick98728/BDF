import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const currentBaseUrl =
  process.env.ETAPA3_VALIDATION_URL || "http://127.0.0.1:3000";
const baselineBaseUrl =
  process.env.ETAPA3_BASELINE_URL || "https://bdf-navy.vercel.app";
const outputDir =
  process.env.ETAPA3_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-3";
const samplesPerSide = Number.parseInt(
  process.env.ETAPA3_CLS_SAMPLES || "3",
  10,
);
const clsAverageTolerance = 0.01;
const clsRouteTolerance = 0.02;
const baselineRecord = JSON.parse(
  fs.readFileSync("docs/fase-4/etapa-1/baseline.json", "utf8"),
);
const routes = baselineRecord.metadata.routes;
const widths = [1920, 1440, 1280, 1024, 900, 768, 640, 430, 390, 360];

fs.mkdirSync(outputDir, { recursive: true });

function heightForWidth(width) {
  if (width === 1920) return 1080;
  if (width <= 430) return 844;
  if (width <= 768) return 1024;
  return 900;
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

async function installObserver(context) {
  await context.addInitScript(() => {
    const audit = { cls: 0, shifts: [] };
    Object.defineProperty(window, "__cleanClsAudit", {
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
            sources: (entry.sources || []).slice(0, 5).map((source) => ({
              tag: source.node?.tagName?.toLowerCase?.() ?? null,
              id: source.node?.id ?? null,
              className:
                typeof source.node?.className === "string"
                  ? source.node.className.slice(0, 180)
                  : null,
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

async function settle(page) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
  await page.waitForTimeout(650);
}

async function measureOnce(browser, baseUrl, route, width) {
  const context = await browser.newContext({
    viewport: { width, height: heightForWidth(width) },
    reducedMotion: "no-preference",
    serviceWorkers: "block",
  });
  await installObserver(context);
  const page = await context.newPage();

  try {
    const response = await page.goto(`${baseUrl}${route.path}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    const expectedStatus = route.id === "404" ? 404 : 200;
    if (response?.status() !== expectedStatus) {
      throw new Error(
        `${route.id}@${width}: HTTP ${response?.status()}; esperado ${expectedStatus}`,
      );
    }
    await settle(page);
    return await page.evaluate(() => ({
      value: window.__cleanClsAudit?.cls || 0,
      shifts: window.__cleanClsAudit?.shifts || [],
      fontStatus: document.fonts?.status ?? null,
      readyState: document.readyState,
    }));
  } finally {
    await context.close();
  }
}

function summarizeSide(label, width, routeSamples, key) {
  const samples = routeSamples.map((routeSample) => ({
    route: routeSample.route,
    path: routeSample.path,
    value: routeSample[key].value,
    sampleValues: routeSample[key].samples.map((sample) => sample.value),
    shifts: routeSample[key].representativeShifts,
  }));
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

function representativeSample(samples, targetMedian) {
  return (
    samples.find((sample) => sample.value === targetMedian) ??
    [...samples].sort(
      (a, b) =>
        Math.abs(a.value - targetMedian) - Math.abs(b.value - targetMedian),
    )[0]
  );
}

const browser = await chromium.launch({ headless: true });
const baseline = [];
const current = [];
const comparisons = [];
const errors = [];

try {
  for (const width of widths) {
    const routeSamples = [];

    for (const route of routes) {
      const baselineSamples = [];
      const currentSamples = [];

      for (let sample = 0; sample < samplesPerSide; sample += 1) {
        const [baselineResult, currentResult] = await Promise.all([
          measureOnce(browser, baselineBaseUrl, route, width),
          measureOnce(browser, currentBaseUrl, route, width),
        ]);
        baselineSamples.push(baselineResult);
        currentSamples.push(currentResult);
      }

      const baselineValue = median(
        baselineSamples.map((sample) => sample.value),
      );
      const currentValue = median(
        currentSamples.map((sample) => sample.value),
      );
      const baselineRepresentative = representativeSample(
        baselineSamples,
        baselineValue,
      );
      const currentRepresentative = representativeSample(
        currentSamples,
        currentValue,
      );

      routeSamples.push({
        route: route.id,
        path: route.path,
        baseline: {
          value: baselineValue,
          samples: baselineSamples,
          representativeShifts: baselineRepresentative?.shifts ?? [],
        },
        current: {
          value: currentValue,
          samples: currentSamples,
          representativeShifts: currentRepresentative?.shifts ?? [],
        },
      });
    }

    const baselineWidth = summarizeSide(
      "etapa-2-production-clean-cache",
      width,
      routeSamples,
      "baseline",
    );
    const currentWidth = summarizeSide(
      "etapa-3-local-clean-cache",
      width,
      routeSamples,
      "current",
    );
    baseline.push(baselineWidth);
    current.push(currentWidth);

    const routeDeltas = routeSamples.map((routeSample) => ({
      route: routeSample.route,
      path: routeSample.path,
      baseline: routeSample.baseline.value,
      current: routeSample.current.value,
      delta: routeSample.current.value - routeSample.baseline.value,
      baselineSampleValues: routeSample.baseline.samples.map(
        (sample) => sample.value,
      ),
      currentSampleValues: routeSample.current.samples.map(
        (sample) => sample.value,
      ),
      baselineShifts: routeSample.baseline.representativeShifts,
      currentShifts: routeSample.current.representativeShifts,
    }));
    const largestRouteDelta = [...routeDeltas].sort(
      (a, b) => b.delta - a.delta,
    )[0];
    const comparison = {
      width,
      baselineAverage: baselineWidth.average,
      currentAverage: currentWidth.average,
      averageDelta: currentWidth.average - baselineWidth.average,
      baselineMedian: baselineWidth.median,
      currentMedian: currentWidth.median,
      medianDelta: currentWidth.median - baselineWidth.median,
      baselineMaximum: baselineWidth.maximum,
      baselineMaximumRoute: baselineWidth.maximumRoute,
      currentMaximum: currentWidth.maximum,
      currentMaximumRoute: currentWidth.maximumRoute,
      largestRouteDelta,
      routeDeltas,
    };
    comparisons.push(comparison);

    if (comparison.averageDelta > clsAverageTolerance) {
      errors.push(
        `CLS@${width}: média mediana-por-rota regrediu de ${comparison.baselineAverage.toFixed(4)} para ${comparison.currentAverage.toFixed(4)}`,
      );
    }
    if (largestRouteDelta.delta > clsRouteTolerance) {
      errors.push(
        `CLS-route@${width}: ${largestRouteDelta.route} regrediu ${largestRouteDelta.delta.toFixed(4)} (${largestRouteDelta.baseline.toFixed(4)} → ${largestRouteDelta.current.toFixed(4)})`,
      );
    }
  }
} finally {
  await browser.close();
}

const maxCurrentWidth = [...current].sort(
  (a, b) => b.maximum - a.maximum,
)[0];
const report = {
  generatedAt: new Date().toISOString(),
  baselineBaseUrl,
  currentBaseUrl,
  widths,
  routes,
  methodology: {
    samplesPerSide,
    cache:
      "Cada amostra usa um BrowserContext novo, service workers bloqueados e nenhum cache compartilhado entre rotas ou lados.",
    pairing:
      "Produção da Etapa 2 e build local da Etapa 3 são medidas em paralelo para a mesma rota, largura e repetição.",
    stabilization:
      "Cada documento aguarda DOMContentLoaded, document.fonts.ready, duas pinturas e 650ms adicionais.",
    aggregation:
      "O valor de cada rota é a mediana de três carregamentos limpos por lado. Média, mediana e máximo por largura são calculados sobre as medianas das 17 rotas.",
    clsAverageTolerance,
    clsRouteTolerance,
  },
  summary: {
    routeWidthPairs: routes.length * widths.length,
    cleanLoadsPerSide: routes.length * widths.length * samplesPerSide,
    samplesPerSide,
    widthsRegressed: comparisons.filter(
      (comparison) => comparison.averageDelta > clsAverageTolerance,
    ).length,
    routeRegressions: comparisons.filter(
      (comparison) =>
        comparison.largestRouteDelta.delta > clsRouteTolerance,
    ).length,
    maxCurrentCls: maxCurrentWidth?.maximum ?? 0,
    maxCurrentClsRoute: maxCurrentWidth?.maximumRoute ?? null,
    maxCurrentClsWidth: maxCurrentWidth?.width ?? null,
    validationErrors: errors.length,
  },
  baseline,
  current,
  comparisons,
  errors,
};

const clsPath = path.join(outputDir, "cls-comparison.json");
fs.writeFileSync(clsPath, `${JSON.stringify(report, null, 2)}\n`);

const designValidationPath = path.join(
  outputDir,
  "design-system-validation.json",
);
if (fs.existsSync(designValidationPath)) {
  const designValidation = JSON.parse(
    fs.readFileSync(designValidationPath, "utf8"),
  );
  const nonClsErrors = (designValidation.errors || []).filter(
    (error) =>
      !error.startsWith("CLS@") && !error.startsWith("CLS-route@"),
  );
  designValidation.errors = nonClsErrors;
  designValidation.summary.validationErrors = nonClsErrors.length;
  designValidation.summary.clsWidthsRegressed =
    report.summary.widthsRegressed;
  designValidation.summary.maxCurrentCls = report.summary.maxCurrentCls;
  designValidation.summary.maxCurrentClsRoute =
    report.summary.maxCurrentClsRoute;
  designValidation.methodology.clsComparison = [
    report.methodology.cache,
    report.methodology.pairing,
    report.methodology.stabilization,
    report.methodology.aggregation,
  ].join(" ");
  designValidation.cls = { baseline, current, comparisons };
  designValidation.clsComparisons = comparisons;
  designValidation.clsRobustSampling = report.methodology;
  fs.writeFileSync(
    designValidationPath,
    `${JSON.stringify(designValidation, null, 2)}\n`,
  );
}

console.log(JSON.stringify(report.summary, null, 2));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
