import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [w, h, name] of [[1440, 900, 'lots-v4-desk'], [390, 844, 'lots-v4-mob']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: w === 1440 ? 1 : 2 });
  await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const y = await page.evaluate(() => {
    const el = document.getElementById('lots');
    return el ? el.offsetTop - 60 : 0;
  });
  await page.evaluate(py => window.scrollTo(0, py), y);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `/tmp/yamato-critique-snap/${name}.png` });
  console.log(`✓ ${name}`);
  await page.close();
}
await browser.close();
