import { webkit } from 'playwright';
const browser = await webkit.launch();
// iPhone 15 相当: 390×844, DPR2
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
});
const page = await context.newPage();
await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);

// 全ページを一度走査
await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  for (let y = 0; y < total; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);

const total = await page.evaluate(() => document.body.scrollHeight);
console.log('total height=', total);
const step = 560;
for (let i = 0; i * step < total; i++) {
  await page.evaluate(y => window.scrollTo(0, y), i * step);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `/tmp/yamato-critique-snap/safari-m-${String(i).padStart(2,'0')}.png` });
  console.log(`✓ safari-m-${i} y=${i*step}`);
}
await browser.close();
