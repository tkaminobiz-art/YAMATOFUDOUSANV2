import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
// 全ページをプリロードするため末端までスクロール
await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  for (let y = 0; y < total; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);

const total = await page.evaluate(() => document.body.scrollHeight);
console.log('total body height =', total);

// 400px ずつスクロールしてスクリーンショット連打
const stepSize = 600;
const steps = Math.ceil(total / stepSize);
for (let i = 0; i < steps; i++) {
  const y = i * stepSize;
  await page.evaluate(py => window.scrollTo(0, py), y);
  await page.waitForTimeout(400);
  const name = `m-scroll-${String(i).padStart(2, '0')}.png`;
  await page.screenshot({ path: `/tmp/yamato-critique-snap/${name}` });
  console.log(`✓ ${name} y=${y}`);
}

await browser.close();
