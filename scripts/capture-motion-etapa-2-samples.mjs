import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.MOTION_VALIDATION_URL || "http://127.0.0.1:3000";
const outputDir = process.env.MOTION_VALIDATION_OUTPUT || "artifacts/fase-4-etapa-2";
const viewports = [
  { width: 1440, height: 900, name: "desktop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 390, height: 844, name: "mobile" },
];

fs.mkdirSync(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const response = await page.goto(baseUrl, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    if (!response || response.status() >= 400) {
      throw new Error(
        `${viewport.name}: navegação retornou ${response?.status() ?? "sem resposta"}`,
      );
    }

    await page.waitForTimeout(900);
    await page.screenshot({
      path: path.join(
        outputDir,
        `preview-home-${viewport.width}-${viewport.name}.png`,
      ),
      fullPage: false,
    });
    await context.close();
  }
} finally {
  await browser.close();
}
