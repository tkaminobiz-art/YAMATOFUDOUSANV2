import { chromium } from 'playwright';

async function captureAt(page, { name, w, h, scrollToId }) {
  await page.setViewportSize({ width: w, height: h });
  await page.waitForTimeout(300);
  // Re-measure after resize
  const y = await page.evaluate((id) => {
    const el = document.getElementById(id) || [...document.querySelectorAll('h3')].find(h => h.textContent && h.textContent.includes(id));
    if (!el) return 0;
    return el.getBoundingClientRect().top + window.scrollY - 40;
  }, scrollToId);
  await page.evaluate(py => window.scrollTo(0, py), y);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `/tmp/yamato-critique-snap/${name}.png` });
  console.log(`✓ ${name} (${w}x${h} @ y=${y})`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);

// Trigger all lazy content first
await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  for (let y = 0; y < total; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);

await captureAt(page, { name: 'tl-desk-head', w: 1440, h: 1000, scrollToId: '20年' });
await captureAt(page, { name: 'tl-desk-bars', w: 1440, h: 1000, scrollToId: '20年' });

// scroll below heading
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(300);
const tlY = await page.evaluate(() => {
  const h3 = [...document.querySelectorAll('h3')].find(h => h.textContent && h.textContent.includes('20年'));
  return h3 ? h3.getBoundingClientRect().top + window.scrollY : 0;
});
await page.evaluate(py => window.scrollTo(0, py + 260), tlY);
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/yamato-critique-snap/tl-desk-chart-bottom.png' });

await captureAt(page, { name: 'tl-tablet', w: 900, h: 1200, scrollToId: '20年' });
await captureAt(page, { name: 'tl-mobile-head', w: 390, h: 844, scrollToId: '20年' });

// mobile chart: scroll down from heading
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
const mobY = await page.evaluate(() => {
  const h3 = [...document.querySelectorAll('h3')].find(h => h.textContent && h.textContent.includes('20年'));
  return h3 ? h3.getBoundingClientRect().top + window.scrollY : 0;
});
await page.evaluate(py => window.scrollTo(0, py + 240), mobY);
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/yamato-critique-snap/tl-mobile-chart.png' });

await page.evaluate(py => window.scrollTo(0, py + 520), mobY);
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/yamato-critique-snap/tl-mobile-chart2.png' });

await browser.close();
