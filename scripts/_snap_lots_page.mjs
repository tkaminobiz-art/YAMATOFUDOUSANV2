import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3333/lots', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/yamato-critique-snap/lots-index-page.png' });
console.log('✓ /lots');

const firstLotHref = await page.evaluate(() => {
  const a = document.querySelector('a[href^="/lots/"]');
  return a ? a.getAttribute('href') : null;
});
console.log('first lot href:', firstLotHref);
if (firstLotHref) {
  await page.goto('http://localhost:3333' + firstLotHref, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/tmp/yamato-critique-snap/lots-detail-page.png' });
  console.log('✓ /lots/[id]');
}
await browser.close();
