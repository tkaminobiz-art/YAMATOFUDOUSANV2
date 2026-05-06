import { chromium } from 'playwright';

const URLS = [
  ['home-desktop', 'http://localhost:3333/', 1440, 900, false],
  ['home-mobile',  'http://localhost:3333/', 390, 844, false],
  ['home-full-desktop', 'http://localhost:3333/', 1440, 900, true],
];

const browser = await chromium.launch();
for (const [name, url, w, h, full] of URLS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/tmp/yamato-critique-snap/${name}.png`, fullPage: full });
  await ctx.close();
  console.log(`✓ ${name}`);
}
await browser.close();
