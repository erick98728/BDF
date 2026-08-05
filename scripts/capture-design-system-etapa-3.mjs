import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const currentBaseUrl =
  process.env.ETAPA3_VALIDATION_URL || "http://127.0.0.1:3000";
const baselineBaseUrl =
  process.env.ETAPA3_BASELINE_URL || "https://bdf-navy.vercel.app";
const outputDir =
  process.env.ETAPA3_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-3";
const evidenceDir = path.join(outputDir, "evidence");
const index = [];

fs.mkdirSync(evidenceDir, { recursive: true });

function heightForWidth(width) {
  if (width <= 430) return 844;
  if (width <= 768) return 1024;
  return 900;
}

async function settle(page, delay = 650) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(delay);
}

async function paintPage(page) {
  await page.addStyleTag({
    content: `
      .fx-content-auto {
        content-visibility: visible !important;
        contain-intrinsic-size: none !important;
      }
    `,
  });
  await page.evaluate(async () => {
    const range = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    );
    for (let step = 0; step <= 10; step += 1) {
      window.scrollTo({ top: range * (step / 10), behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 55));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((resolve) => setTimeout(resolve, 120));
  });
}

async function screenshot(page, name, options = {}) {
  const fileName = `${name}.png`;
  const filePath = path.join(evidenceDir, fileName);
  await page.screenshot({ path: filePath, ...options });
  index.push({ name, file: `evidence/${fileName}`, ...options });
}

async function captureViewport({
  browser,
  label,
  baseUrl,
  route,
  name,
  width,
  selector,
  fullPage = false,
  reducedMotion = "no-preference",
  hasTouch = false,
  isMobile = false,
}) {
  const context = await browser.newContext({
    viewport: { width, height: heightForWidth(width) },
    reducedMotion,
    hasTouch,
    isMobile,
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}${route}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page);
  await paintPage(page);

  if (selector) {
    const locator = page.locator(selector).first();
    await locator.waitFor({ state: "attached", timeout: 10000 });
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(180);
  }

  await screenshot(page, `${label}-${name}`, { fullPage });
  await context.close();
}

async function captureModal(browser, label, baseUrl, width) {
  const context = await browser.newContext({
    viewport: { width, height: heightForWidth(width) },
    hasTouch: width <= 430,
    isMobile: width <= 430,
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/galeria`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page);
  const opener = page.locator(".gallery-entry").first();
  if (width <= 430) await opener.tap();
  else await opener.click();
  await page.locator('[role="dialog"]').waitFor({ state: "visible" });
  await page.waitForTimeout(180);
  await screenshot(page, `${label}-gallery-modal-${width}`);
  await context.close();
}

async function captureFooter(browser, label, baseUrl, width) {
  const context = await browser.newContext({
    viewport: { width, height: heightForWidth(width) },
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(page);
  await paintPage(page);
  const footer = page.locator("footer").first();
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(160);
  await screenshot(page, `${label}-footer-${width}`);
  await context.close();
}

const browser = await chromium.launch({ headless: true });

try {
  const comparisons = [
    { route: "/", name: "home-desktop", width: 1440, fullPage: true },
    { route: "/", name: "home-tablet", width: 768, fullPage: true },
    {
      route: "/",
      name: "home-mobile",
      width: 390,
      fullPage: true,
      hasTouch: true,
      isMobile: true,
    },
    { route: "/", name: "hero-desktop", width: 1440, selector: ".hero-section" },
    {
      route: "/",
      name: "hero-mobile",
      width: 390,
      selector: ".hero-section",
      hasTouch: true,
      isMobile: true,
    },
    {
      route: "/lore",
      name: "page-header-internal",
      width: 1440,
      selector: ".fx-page-header",
    },
    {
      route: "/lore",
      name: "lore-records",
      width: 1440,
      selector: ".lore-timeline-shell",
    },
    {
      route: "/personagens",
      name: "character-dossiers",
      width: 1440,
      selector: ".character-dossier, .editorial-roster",
    },
    {
      route: "/roadmap",
      name: "roadmap-records",
      width: 1440,
      selector: "[data-fx-timeline='roadmap']",
    },
    {
      route: "/devlog",
      name: "devlog-records",
      width: 1440,
      selector: ".devlog-ledger",
    },
    {
      route: "/galeria",
      name: "gallery-grid",
      width: 1440,
      selector: ".gallery-grid",
    },
    {
      route: "/login",
      name: "login-functional",
      width: 1440,
      selector: "form",
    },
    {
      route: "/feedback",
      name: "feedback-functional",
      width: 1440,
      selector: "form",
    },
  ];

  for (const sample of comparisons) {
    await captureViewport({
      browser,
      label: "before",
      baseUrl: baselineBaseUrl,
      ...sample,
    });
    await captureViewport({
      browser,
      label: "after",
      baseUrl: currentBaseUrl,
      ...sample,
    });
  }

  for (const width of [1440, 390]) {
    await captureModal(browser, "before", baselineBaseUrl, width);
    await captureModal(browser, "after", currentBaseUrl, width);
  }

  await captureFooter(browser, "before", baselineBaseUrl, 1440);
  await captureFooter(browser, "after", currentBaseUrl, 1440);

  await captureViewport({
    browser,
    label: "after",
    baseUrl: currentBaseUrl,
    route: "/",
    name: "zoom-200-equivalent",
    width: 720,
    fullPage: true,
  });

  await captureViewport({
    browser,
    label: "after",
    baseUrl: currentBaseUrl,
    route: "/",
    name: "reduced-motion-mobile",
    width: 390,
    fullPage: true,
    reducedMotion: "reduce",
    hasTouch: true,
    isMobile: true,
  });

  const fallbackContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  await fallbackContext.route(/\.(?:woff2?|ttf|otf)(?:\?|$)/i, (route) =>
    route.abort("blockedbyclient"),
  );
  const fallbackPage = await fallbackContext.newPage();
  await fallbackPage.goto(`${currentBaseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await fallbackPage.waitForTimeout(900);
  await screenshot(fallbackPage, "after-font-fallback-home-1440");
  await fallbackContext.close();

  fs.writeFileSync(
    path.join(outputDir, "evidence-index.json"),
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baselineBaseUrl,
        currentBaseUrl,
        evidence: index,
      },
      null,
      2,
    )}\n`,
  );
} finally {
  await browser.close();
}
