import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [w, h, name] of [[1440, 900, 'fv-v3-desk'], [390, 844, 'fv-v3-mob']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: w === 1440 ? 1 : 2 });
  await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `/tmp/yamato-critique-snap/${name}.png` });
  console.log(`✓ ${name}`);
  await page.close();
}
await browser.close();
