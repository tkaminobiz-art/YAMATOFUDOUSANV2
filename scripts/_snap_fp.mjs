import { chromium } from 'playwright';
const browser = await chromium.launch();

for (const [w, h, tag] of [[1440, 900, 'desk'], [390, 844, 'mob']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: w === 1440 ? 1 : 2 });
  await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  for (const target of [
    { name: `fp-price-${tag}`, needle: 'こんな間取りが実現' },
    { name: `fp-freedom-${tag}`, needle: 'こんな間取りが、設計' },
  ]) {
    const y = await page.evaluate((n) => {
      const el = [...document.querySelectorAll('h3')].find(x => x.textContent && x.textContent.includes(n));
      return el ? el.getBoundingClientRect().top + window.scrollY - 80 : 0;
    }, target.needle);
    await page.evaluate(py => window.scrollTo(0, py), y);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `/tmp/yamato-critique-snap/${target.name}.png` });
    console.log(`✓ ${target.name} y=${y}`);
  }
  await page.close();
}
await browser.close();
