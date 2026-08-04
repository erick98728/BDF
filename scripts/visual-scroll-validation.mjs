import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.BASELINE_URL || 'https://bdf-navy.vercel.app';
const outputRoot = process.env.BASELINE_OUTPUT || 'docs/fase-4/etapa-1';
const evidenceRoot = path.join(outputRoot, 'evidence', 'scrolled');
const widths = [1920, 768, 390];
const routes = [
  ['home', 'Home', '/'],
  ['download', 'Download', '/download'],
  ['lore', 'Lore', '/lore'],
  ['personagens', 'Personagens', '/personagens'],
  ['studio', 'Studio', '/studio'],
  ['devlog', 'Devlog', '/devlog'],
  ['roadmap', 'Roadmap', '/roadmap'],
  ['galeria', 'Galeria', '/galeria'],
  ['login', 'Login', '/login'],
  ['feedback', 'Feedback', '/feedback'],
  ['dashboard', 'Dashboard', '/dashboard'],
  ['admin', 'Admin', '/admin'],
  ['404', 'Página 404', '/fase-4-rota-inexistente'],
  ['devlog-bosque', 'Devlog individual · construindo-o-bosque-da-nevoa-perdida', '/devlog/construindo-o-bosque-da-nevoa-perdida'],
  ['devlog-dash', 'Devlog individual · criando-o-sistema-de-dash', '/devlog/criando-o-sistema-de-dash'],
  ['devlog-lucarelli', 'Devlog individual · primeiro-chefe-lucarelli', '/devlog/primeiro-chefe-lucarelli'],
  ['devlog-demo', 'Devlog individual · preparando-a-primeira-demo-jogavel', '/devlog/preparando-a-primeira-demo-jogavel'],
].map(([id, label, routePath]) => ({ id, label, path: routePath }));

await fs.mkdir(evidenceRoot, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

async function progressiveScroll(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let previousHeight = 0;
    for (let pass = 0; pass < 3; pass += 1) {
      const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const step = Math.max(Math.round(window.innerHeight * 0.62), 280);
      for (let y = 0; y <= height; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await sleep(110);
      }
      window.scrollTo({ top: height, behavior: 'instant' });
      await sleep(260);
      const nextHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      if (nextHeight === previousHeight || nextHeight === height) break;
      previousHeight = nextHeight;
    }
  });
  await page.waitForTimeout(450);
}

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width <= 430 ? 844 : width <= 768 ? 1024 : 1080 },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    reducedMotion: 'no-preference',
  });

  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(String(error)));

    let status = null;
    let navigationError = null;
    try {
      const response = await page.goto(new URL(route.path, baseUrl).href, {
        waitUntil: 'domcontentloaded',
        timeout: 45000,
      });
      status = response?.status() ?? null;
      await page.waitForTimeout(1400);
      await progressiveScroll(page);

      const afterScroll = await page.evaluate(() => {
        const pending = [...document.querySelectorAll('[data-fx-state="pending"]')];
        const invisible = [...document.querySelectorAll('[data-fx-reveal], [data-fx-watch]')]
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 &&
              (Number.parseFloat(style.opacity || '1') < 0.05 || style.visibility === 'hidden');
          })
          .slice(0, 12)
          .map((element) => ({
            selector: `${element.tagName.toLowerCase()}.${[...element.classList].slice(0, 3).join('.')}`,
            state: element.getAttribute('data-fx-state'),
            opacity: getComputedStyle(element).opacity,
            text: (element.textContent || '').trim().slice(0, 100),
          }));
        const timelinePending = [...document.querySelectorAll('[data-fx-timeline-node]')]
          .filter((node) => node.getAttribute('data-fx-active') !== 'true').length;
        const brokenImages = [...document.images]
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src);
        return {
          pendingCount: pending.length,
          pendingExamples: pending.slice(0, 8).map((element) => ({
            selector: `${element.tagName.toLowerCase()}.${[...element.classList].slice(0, 3).join('.')}`,
            text: (element.textContent || '').trim().slice(0, 100),
          })),
          invisibleCount: invisible.length,
          invisibleExamples: invisible,
          timelinePending,
          brokenImages,
          scrollHeight: document.documentElement.scrollHeight,
          finalScrollY: window.scrollY,
          bodyTextLength: (document.body.innerText || '').trim().length,
          shellBusy: document.querySelector('.route-transition-shell')?.getAttribute('aria-busy') ?? null,
          loaderVisible: Boolean([...document.querySelectorAll('.route-loading-state')].find((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
          })),
        };
      });

      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(160);
      const screenshot = path.join(evidenceRoot, `${route.id}-${width}.jpg`);
      await page.screenshot({ path: screenshot, type: 'jpeg', quality: 72, fullPage: true });

      results.push({
        route,
        width,
        status,
        finalUrl: page.url(),
        navigationError,
        afterScroll,
        consoleErrors,
        pageErrors,
        screenshot: path.relative(outputRoot, screenshot).replaceAll('\\', '/'),
      });
    } catch (error) {
      navigationError = error instanceof Error ? error.message : String(error);
      results.push({ route, width, status, finalUrl: page.url(), navigationError, consoleErrors, pageErrors });
    } finally {
      await page.close();
    }
  }
  await context.close();
}

const modalChecks = [];
for (const width of [1440, 390]) {
  const context = await browser.newContext({
    viewport: { width, height: width === 390 ? 844 : 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  await page.goto(new URL('/galeria', baseUrl).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(1300);
  await progressiveScroll(page);
  const trigger = page.locator('button.gallery-entry').first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(550);
  const focusAfterOpen = await page.evaluate(() => ({
    insideDialog: Boolean(document.activeElement?.closest('[role="dialog"]')),
    ariaLabel: document.activeElement?.getAttribute('aria-label') || null,
    tag: document.activeElement?.tagName.toLowerCase() || null,
  }));
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden', timeout: 5000 });
  await page.waitForTimeout(550);
  const afterEscape = await page.evaluate(() => ({
    dialogCount: document.querySelectorAll('[role="dialog"]').length,
    focusReturned: document.activeElement?.matches('button.gallery-entry') || false,
    activeAriaLabel: document.activeElement?.getAttribute('aria-label') || null,
    bodyModalState: document.body.dataset.galleryModalOpen || null,
  }));
  modalChecks.push({ width, focusAfterOpen, afterEscape });
  await context.close();
}

await browser.close();

const summary = {
  tested: results.length,
  pendingAfterScroll: results.filter((result) => result.afterScroll?.pendingCount > 0).length,
  invisibleAfterScroll: results.filter((result) => result.afterScroll?.invisibleCount > 0).length,
  navigationErrors: results.filter((result) => result.navigationError).length,
  consoleErrorCases: results.filter((result) => result.consoleErrors?.length).length,
  pageErrorCases: results.filter((result) => result.pageErrors?.length).length,
  modalEscapePassed: modalChecks.every((check) => check.afterEscape.dialogCount === 0),
  modalFocusPassed: modalChecks.every((check) => check.focusAfterOpen.insideDialog && check.afterEscape.focusReturned),
};

const output = {
  metadata: {
    baseUrl,
    generatedAt: new Date().toISOString(),
    widths,
    routes: routes.length,
    method: 'Rolagem progressiva até o fim da página antes da captura e da verificação de reveals.',
  },
  summary,
  modalChecks,
  results,
};

await fs.writeFile(path.join(outputRoot, 'scroll-validation.json'), `${JSON.stringify(output, null, 2)}\n`);
const md = [
  '# Validação complementar de rolagem e reveals',
  '',
  `- Combinações: **${summary.tested}**`,
  `- Casos com elementos ainda pendentes após percorrer toda a página: **${summary.pendingAfterScroll}**`,
  `- Casos com elementos de reveal ainda invisíveis após percorrer toda a página: **${summary.invisibleAfterScroll}**`,
  `- Erros de navegação: **${summary.navigationErrors}**`,
  `- Modal fecha com Escape: **${summary.modalEscapePassed ? 'sim' : 'não'}**`,
  `- Foco entra e retorna corretamente no modal: **${summary.modalFocusPassed ? 'sim' : 'não'}**`,
  '',
  'Esta verificação corrige a limitação de uma captura full-page feita sem rolagem: elementos controlados por `IntersectionObserver` só devem ser classificados como presos quando continuam pendentes depois de a página ser realmente percorrida.',
  '',
  '[Dados completos](scroll-validation.json)',
  '',
].join('\n');
await fs.writeFile(path.join(outputRoot, 'SCROLL_VALIDATION.md'), md);
console.log(JSON.stringify(summary, null, 2));
