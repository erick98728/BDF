import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.BASELINE_URL || 'https://bdf-navy.vercel.app';
const outputRoot = process.env.SECTION_OUTPUT || 'docs/fase-4/etapa-1/section-capture';
const widths = [1440, 768, 390];
const routes = [
  ['home', 'Home', '/'], ['download', 'Download', '/download'], ['lore', 'Lore', '/lore'],
  ['personagens', 'Personagens', '/personagens'], ['studio', 'Studio', '/studio'], ['devlog', 'Devlog', '/devlog'],
  ['roadmap', 'Roadmap', '/roadmap'], ['galeria', 'Galeria', '/galeria'], ['login', 'Login', '/login'],
  ['feedback', 'Feedback', '/feedback'], ['dashboard', 'Dashboard', '/dashboard'], ['admin', 'Admin', '/admin'],
  ['404', 'Página 404', '/fase-4-rota-inexistente'],
  ['devlog-bosque', 'Devlog individual · Bosque', '/devlog/construindo-o-bosque-da-nevoa-perdida'],
  ['devlog-dash', 'Devlog individual · Dash', '/devlog/criando-o-sistema-de-dash'],
  ['devlog-lucarelli', 'Devlog individual · Lucarelli', '/devlog/primeiro-chefe-lucarelli'],
  ['devlog-demo', 'Devlog individual · Demo', '/devlog/preparando-a-primeira-demo-jogavel'],
].map(([id, label, routePath]) => ({ id, label, path: routePath }));

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];

for (const width of widths) {
  const height = width === 390 ? 844 : width === 768 ? 1024 : 1000;
  const context = await browser.newContext({ viewport: { width, height }, colorScheme: 'dark', deviceScaleFactor: 1 });
  for (const route of routes) {
    const page = await context.newPage();
    const routeDir = path.join(outputRoot, route.id);
    await fs.mkdir(routeDir, { recursive: true });
    let status = null;
    let error = null;
    const captures = [];
    try {
      const response = await page.goto(new URL(route.path, baseUrl).href, { waitUntil: 'domcontentloaded', timeout: 45000 });
      status = response?.status() ?? null;
      await page.waitForTimeout(1400);
      const anchors = await page.evaluate(() => {
        const candidates = [
          document.querySelector('main > section:first-of-type'),
          ...document.querySelectorAll('main section'),
          document.querySelector('footer'),
        ].filter(Boolean);
        const unique = [];
        for (const element of candidates) {
          if (!unique.includes(element)) unique.push(element);
        }
        return unique.slice(0, 12).map((element, index) => {
          element.setAttribute('data-baseline-capture-id', String(index));
          const heading = element.querySelector('h1,h2,h3');
          return {
            index,
            tag: element.tagName.toLowerCase(),
            heading: (heading?.textContent || (element.tagName === 'FOOTER' ? 'Rodapé' : `Seção ${index + 1}`)).trim().replace(/\s+/g, ' ').slice(0, 100),
          };
        });
      });

      for (const anchor of anchors) {
        const locator = page.locator(`[data-baseline-capture-id="${anchor.index}"]`);
        await locator.scrollIntoViewIfNeeded();
        await page.waitForTimeout(520);
        const state = await page.evaluate(() => {
          const intersects = (element) => {
            const rect = element.getBoundingClientRect();
            return rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
          };
          const pending = [...document.querySelectorAll('[data-fx-state="pending"]')].filter(intersects);
          const hidden = [...document.querySelectorAll('[data-fx-reveal], [data-fx-watch]')].filter((element) => {
            if (!intersects(element)) return false;
            const style = getComputedStyle(element);
            return Number.parseFloat(style.opacity || '1') < 0.05 || style.visibility === 'hidden';
          });
          return { pendingInViewport: pending.length, hiddenInViewport: hidden.length, scrollY: window.scrollY };
        });
        const file = `${String(anchor.index + 1).padStart(2, '0')}-${width}.jpg`;
        await page.screenshot({ path: path.join(routeDir, file), type: 'jpeg', quality: 76, fullPage: false });
        captures.push({ ...anchor, ...state, file: `${route.id}/${file}` });
      }
    } catch (caught) {
      error = caught instanceof Error ? caught.message : String(caught);
    }
    results.push({ route, width, height, status, finalUrl: page.url(), error, captures });
    await page.close();
  }
  await context.close();
}
await browser.close();

const summary = {
  routeWidthCases: results.length,
  screenshots: results.reduce((total, result) => total + result.captures.length, 0),
  navigationErrors: results.filter((result) => result.error).length,
  capturesWithPendingReveal: results.flatMap((result) => result.captures).filter((capture) => capture.pendingInViewport > 0).length,
  capturesWithHiddenReveal: results.flatMap((result) => result.captures).filter((capture) => capture.hiddenInViewport > 0).length,
};
await fs.writeFile(path.join(outputRoot, 'section-capture-index.json'), `${JSON.stringify({ metadata: { baseUrl, generatedAt: new Date().toISOString(), widths }, summary, results }, null, 2)}\n`);
const lines = [
  '# Evidências por seção', '',
  `- Casos página × largura: **${summary.routeWidthCases}**`,
  `- Capturas: **${summary.screenshots}**`,
  `- Erros de navegação: **${summary.navigationErrors}**`,
  `- Capturas com reveal pendente na viewport: **${summary.capturesWithPendingReveal}**`,
  `- Capturas com reveal oculto na viewport: **${summary.capturesWithHiddenReveal}**`, '',
];
for (const result of results) {
  lines.push(`## ${result.route.label} · ${result.width}px`, '');
  for (const capture of result.captures) lines.push(`- [${capture.heading}](${capture.file})`);
  lines.push('');
}
await fs.writeFile(path.join(outputRoot, 'README.md'), `${lines.join('\n')}\n`);
console.log(JSON.stringify(summary, null, 2));
