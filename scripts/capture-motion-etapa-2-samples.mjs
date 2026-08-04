import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl =
  process.env.MOTION_VALIDATION_URL || "http://127.0.0.1:3000";
const outputDir =
  process.env.MOTION_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-2";
const evidenceDir = path.join(outputDir, "evidence");
const evidenceIndex = [];

fs.mkdirSync(evidenceDir, { recursive: true });

async function settle(page, delay = 650) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(delay);
}

async function waitForStableRoute(page) {
  await page.waitForFunction(
    () => {
      const shell = document.querySelector(".route-transition-shell");
      return (
        shell?.getAttribute("aria-busy") !== "true" &&
        !document.documentElement.dataset.routeTransition &&
        document.querySelectorAll(".route-transition-page").length === 1
      );
    },
    undefined,
    { timeout: 4000 },
  );
}

async function paintFullPage(page) {
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

    for (let step = 0; step <= 12; step += 1) {
      window.scrollTo({
        top: range * (step / 12),
        behavior: "instant",
      });
      await new Promise((resolve) => setTimeout(resolve, 70));
    }

    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((resolve) => setTimeout(resolve, 180));
  });
}

async function capture(page, name, fullPage = false) {
  await waitForStableRoute(page);
  if (fullPage) await paintFullPage(page);

  const fileName = `${name}.png`;
  await page.screenshot({
    path: path.join(evidenceDir, fileName),
    fullPage,
  });
  evidenceIndex.push({ name, file: `evidence/${fileName}`, fullPage });
}

const browser = await chromium.launch({ headless: true });

try {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "no-preference",
  });
  const desktopPage = await desktop.newPage();

  await desktopPage.goto(`${baseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(desktopPage, 320);
  await waitForStableRoute(desktopPage);
  const firstHeroEntry = await desktopPage
    .locator(".hero-section")
    .last()
    .getAttribute("data-hero-entry");
  await capture(desktopPage, "home-hero-first-1440");

  await desktopPage.locator('a[href="/lore"]').first().click();
  await desktopPage.waitForURL(/\/lore(?:\?|$)/, { timeout: 10000 });
  await waitForStableRoute(desktopPage);
  await desktopPage.locator('.dock-menu a[href="/"]').click();
  await desktopPage.waitForURL((url) => url.pathname === "/", {
    timeout: 10000,
  });
  await settle(desktopPage, 420);
  await waitForStableRoute(desktopPage);
  const returnHeroEntry = await desktopPage
    .locator(".hero-section")
    .last()
    .getAttribute("data-hero-entry");
  await capture(desktopPage, "home-hero-return-1440");

  await desktopPage.goto(`${baseUrl}/roadmap`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(desktopPage, 500);
  await capture(desktopPage, "roadmap-complete-1440", true);

  await desktopPage.goto(`${baseUrl}/lore`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(desktopPage, 500);
  await capture(desktopPage, "lore-complete-1440", true);

  await desktopPage.goto(`${baseUrl}/galeria`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(desktopPage, 700);
  await capture(desktopPage, "gallery-grid-1440", true);
  await desktopPage.locator(".gallery-filter").nth(1).click();
  await desktopPage.waitForTimeout(430);
  await capture(desktopPage, "gallery-filtered-1440", true);
  await desktopPage.locator(".gallery-entry").first().click();
  await desktopPage.locator('[role="dialog"]').waitFor({ state: "visible" });
  await desktopPage.waitForTimeout(180);
  await capture(desktopPage, "gallery-modal-1440");
  await desktopPage.keyboard.press("Escape");
  await desktop.close();

  const tablet = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    reducedMotion: "no-preference",
  });
  const tabletPage = await tablet.newPage();
  await tabletPage.goto(`${baseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(tabletPage, 820);
  await capture(tabletPage, "home-tablet-768");
  await tabletPage.goto(`${baseUrl}/roadmap`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(tabletPage, 500);
  await capture(tabletPage, "roadmap-tablet-768", true);
  await tablet.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
    hasTouch: true,
    isMobile: true,
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${baseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(mobilePage, 820);
  await capture(mobilePage, "home-mobile-390");
  await mobilePage.goto(`${baseUrl}/galeria`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(mobilePage, 700);
  await mobilePage.locator(".gallery-entry").first().tap();
  await mobilePage.locator('[role="dialog"]').waitFor({ state: "visible" });
  await mobilePage.waitForTimeout(180);
  await capture(mobilePage, "gallery-modal-mobile-390");
  await mobilePage.keyboard.press("Escape");
  await mobile.close();

  const reduced = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    hasTouch: true,
    isMobile: true,
  });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(`${baseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(reducedPage, 260);
  await capture(reducedPage, "home-reduced-motion-390");
  await reducedPage.goto(`${baseUrl}/lore`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await settle(reducedPage, 260);
  await capture(reducedPage, "lore-reduced-motion-390", true);
  await reduced.close();

  fs.writeFileSync(
    path.join(outputDir, "evidence-index.json"),
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        firstHeroEntry,
        returnHeroEntry,
        evidence: evidenceIndex,
      },
      null,
      2,
    )}\n`,
  );
} finally {
  await browser.close();
}
