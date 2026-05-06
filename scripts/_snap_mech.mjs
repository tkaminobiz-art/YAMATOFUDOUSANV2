import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1200);
await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  for (let y = 0; y < total; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);

const y = await page.evaluate(() => {
  const h = [...document.querySelectorAll('h3')].find(x => x.textContent && x.textContent.includes('この差は'));
  return h ? h.getBoundingClientRect().top + window.scrollY - 80 : 0;
});
await page.evaluate(py => window.scrollTo(0, py), y);
await page.waitForTimeout(1200);
await page.screenshot({ path: '/tmp/yamato-critique-snap/mech-fix-desk.png' });
console.log('✓ desk y=' + y);

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
const ym = await page.evaluate(() => {
  const h = [...document.querySelectorAll('h3')].find(x => x.textContent && x.textContent.includes('この差は'));
  return h ? h.getBoundingClientRect().top + window.scrollY - 40 : 0;
});
await page.evaluate(py => window.scrollTo(0, py), ym);
await page.waitForTimeout(1000);
await page.screenshot({ path: '/tmp/yamato-critique-snap/mech-fix-mob.png' });
console.log('✓ mob y=' + ym);

await browser.close();
