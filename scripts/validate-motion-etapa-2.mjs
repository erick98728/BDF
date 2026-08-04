import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.MOTION_VALIDATION_URL || "http://127.0.0.1:3000";
const outputDir = process.env.MOTION_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-2";
const routes = ["/", "/galeria", "/roadmap", "/lore", "/download"];
const widths = [1440, 768, 390];
const errors = [];
const cases = [];

fs.mkdirSync(outputDir, { recursive: true });

function recordError(scope, message) {
  errors.push(`${scope}: ${message}`);
}

async function readMotionState(page) {
  return page.evaluate(() => {
    const viewportHeight = window.innerHeight;
    const reveals = Array.from(
      document.querySelectorAll("[data-fx-reveal]"),
    ).filter((element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.bottom >= 0 && bounds.top <= viewportHeight;
    });

    const hiddenReveals = reveals
      .filter((element) => {
        const style = getComputedStyle(element);
        return (
          element.getAttribute("data-fx-state") === "pending" ||
          Number.parseFloat(style.opacity || "1") < 0.05 ||
          style.visibility === "hidden"
        );
      })
      .map((element) => ({
        tag: element.tagName,
        className: element.className,
        state: element.getAttribute("data-fx-state"),
      }));

    const ambientAnimations = Array.from(
      document.querySelectorAll(
        ".ambient-scene__orb, .ambient-scene__haze",
      ),
    ).map((element) => {
      const style = getComputedStyle(element);
      return {
        className: element.className,
        animationName: style.animationName,
        animationIterationCount: style.animationIterationCount,
      };
    });

    const fixedPaintSurfaces = [];
    const surfaceChecks = [
      [".surface-glass", "::after"],
      [".fx-button", "::before"],
      [".game-glyph", "::before"],
    ];

    for (const [selector, pseudo] of surfaceChecks) {
      Array.from(document.querySelectorAll(selector))
        .slice(0, 12)
        .forEach((element) => {
          if (getComputedStyle(element, pseudo).backgroundAttachment === "fixed") {
            fixedPaintSurfaces.push(`${selector}${pseudo}`);
          }
        });
    }

    return {
      scrollIndicators: document.querySelectorAll(".fx-scroll-progress").length,
      duplicateRouteIndicators: document.querySelectorAll(
        ".route-transition-progress",
      ).length,
      routeShells: document.querySelectorAll(".route-transition-shell").length,
      routeBusy:
        document.querySelector(".route-transition-shell")?.getAttribute(
          "aria-busy",
        ) ?? null,
      routeDataset: document.documentElement.dataset.routeTransition ?? null,
      hiddenReveals,
      ambientAnimations,
      fixedPaintSurfaces,
    };
  });
}

async function waitForRouteIdle(page, scope) {
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
      { timeout: 2500 },
    );
  } catch {
    const state = await readMotionState(page);
    recordError(
      scope,
      `estado de rota não foi restaurado: ${JSON.stringify({
        routeBusy: state.routeBusy,
        routeDataset: state.routeDataset,
      })}`,
    );
  }
}

async function validateViewport(browser, width) {
  const height = width <= 430 ? 844 : width <= 768 ? 1024 : 900;
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const pageErrors = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));

  for (const route of routes) {
    const scope = `${route}@${width}`;
    const response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(500);

    if (!response || response.status() >= 400) {
      recordError(scope, `navegação retornou ${response?.status() ?? "sem resposta"}`);
      continue;
    }

    const checkpoints = [0, 0.42, 0.78, 1];
    const checkpointStates = [];

    for (const checkpoint of checkpoints) {
      await page.evaluate((progress) => {
        const range = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          0,
        );
        window.scrollTo({ top: range * progress, behavior: "instant" });
      }, checkpoint);
      await page.waitForTimeout(180);
      checkpointStates.push(await readMotionState(page));
    }

    const firstState = checkpointStates[0];
    const hiddenRevealCount = checkpointStates.reduce(
      (total, state) => total + state.hiddenReveals.length,
      0,
    );
    const animatedAmbient = firstState.ambientAnimations.filter(
      (item) =>
        item.animationName !== "none" &&
        item.animationIterationCount === "infinite",
    );

    if (firstState.scrollIndicators !== 1) {
      recordError(scope, `indicadores globais=${firstState.scrollIndicators}`);
    }
    if (firstState.duplicateRouteIndicators !== 0) {
      recordError(
        scope,
        `indicadores de rota duplicados=${firstState.duplicateRouteIndicators}`,
      );
    }
    if (firstState.routeShells !== 1) {
      recordError(scope, `route shells=${firstState.routeShells}`);
    }
    if (hiddenRevealCount !== 0) {
      recordError(scope, `reveals ocultos na viewport=${hiddenRevealCount}`);
    }
    if (animatedAmbient.length !== 0) {
      recordError(
        scope,
        `animações ambientais infinitas=${JSON.stringify(animatedAmbient)}`,
      );
    }
    if (firstState.fixedPaintSurfaces.length !== 0) {
      recordError(
        scope,
        `superfícies com background fixed=${firstState.fixedPaintSurfaces.join(",")}`,
      );
    }

    cases.push({
      route,
      width,
      status: response.status(),
      hiddenRevealCount,
      scrollIndicators: firstState.scrollIndicators,
      duplicateRouteIndicators: firstState.duplicateRouteIndicators,
      ambientAnimations: firstState.ambientAnimations,
      fixedPaintSurfaces: firstState.fixedPaintSurfaces,
    });
  }

  await page.goto(`${baseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(350);

  const loreLink = page.locator('a[href="/lore"]').first();
  await loreLink.click({ noWaitAfter: true });
  await page.waitForURL(/\/lore(?:\?|$)/, { timeout: 10000 });
  await waitForRouteIdle(page, `route-click@${width}`);

  await page.goBack({ waitUntil: "domcontentloaded" });
  await waitForRouteIdle(page, `route-back@${width}`);
  await page.goForward({ waitUntil: "domcontentloaded" });
  await waitForRouteIdle(page, `route-forward@${width}`);

  await page.goto(`${baseUrl}/?motionAudit=0`, {
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
  await waitForRouteIdle(page, `query-route@${width}`);

  await page.goto(`${baseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(250);
  await page.evaluate(() => {
    const first = document.querySelector('a[href="/lore"]');
    const second = document.querySelector('a[href="/roadmap"]');
    if (first instanceof HTMLAnchorElement) first.click();
    if (second instanceof HTMLAnchorElement) second.click();
  });
  await page.waitForURL(/\/(?:lore|roadmap)(?:\?|$)/, { timeout: 10000 });
  await waitForRouteIdle(page, `rapid-navigation@${width}`);

  if (pageErrors.length) {
    recordError(`page-errors@${width}`, pageErrors.join(" | "));
  }

  await context.close();
}

async function validateReducedMotion(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const route of ["/", "/roadmap", "/galeria"]) {
    const scope = `reduced-motion:${route}`;
    const response = await page.goto(`${baseUrl}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(250);

    if (!response || response.status() >= 400) {
      recordError(scope, `navegação retornou ${response?.status() ?? "sem resposta"}`);
      continue;
    }

    const state = await readMotionState(page);
    if (state.hiddenReveals.length !== 0) {
      recordError(scope, `reveals ocultos=${state.hiddenReveals.length}`);
    }

    const activeAnimations = await page.evaluate(() =>
      document
        .getAnimations({ subtree: true })
        .filter((animation) => animation.playState === "running").length,
    );

    if (activeAnimations !== 0) {
      recordError(scope, `animações em execução=${activeAnimations}`);
    }
  }

  await context.close();
}

const browser = await chromium.launch({ headless: true });

try {
  for (const width of widths) {
    await validateViewport(browser, width);
  }
  await validateReducedMotion(browser);
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  routes,
  widths,
  summary: {
    routeWidthCases: cases.length,
    navigationErrors: cases.filter((item) => item.status >= 400).length,
    validationErrors: errors.length,
  },
  cases,
  errors,
};

const reportPath = path.join(outputDir, "motion-validation.json");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary, null, 2));

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
