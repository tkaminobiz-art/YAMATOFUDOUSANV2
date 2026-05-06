import { chromium } from 'playwright';

async function shotAt(page, { name, w, h, needle, offset = -40 }) {
  await page.setViewportSize({ width: w, height: h });
  await page.waitForTimeout(300);
  const y = await page.evaluate((n) => {
    const el = [...document.querySelectorAll('h2')].find(x => x.textContent && x.textContent.includes(n));
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  }, needle);
  await page.evaluate(py => window.scrollTo(0, py), y + offset);
  await page.waitForTimeout(900); // 長めに待つ→scroll-in 完了
  await page.screenshot({ path: `/tmp/yamato-critique-snap/${name}.png` });
  console.log(`✓ ${name} ${w}x${h} y=${y + offset}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3333/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
await page.evaluate(async () => {
  const total = document.body.scrollHeight;
  for (let y = 0; y < total; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);

await shotAt(page, { name: 'z-desk-head', w: 1440, h: 1000, needle: '他社にあって', offset: -60 });
await shotAt(page, { name: 'z-desk-mid',  w: 1440, h: 1000, needle: '他社にあって', offset: 360 });
await shotAt(page, { name: 'z-desk-end',  w: 1440, h: 1000, needle: '他社にあって', offset: 820 });
await shotAt(page, { name: 'z-desk-diff', w: 1440, h: 1000, needle: '他社にあって', offset: 1280 });

await shotAt(page, { name: 'z-tablet', w: 900, h: 1100, needle: '他社にあって', offset: -40 });
await shotAt(page, { name: 'z-mobile-head', w: 390, h: 844, needle: '他社にあって', offset: -40 });
await shotAt(page, { name: 'z-mobile-mid',  w: 390, h: 844, needle: '他社にあって', offset: 380 });
await shotAt(page, { name: 'z-mobile-end',  w: 390, h: 844, needle: '他社にあって', offset: 900 });

await browser.close();
