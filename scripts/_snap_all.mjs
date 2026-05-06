import { chromium } from 'playwright';

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

const sections = [
  { name: 'v2-01-hero', id: null, y: 0, h: 900 },
  { name: 'v2-02-mechanism', text: 'やまとは、安くない', h: 1000 },
  { name: 'v2-03-mechanism-bar', text: 'この差は、3', h: 1000 },
  { name: 'v2-04-zero', text: 'つが、ゼロです', h: 1000 },
  { name: 'v2-05-price', text: '三タイプ、ご用意', h: 1000 },
  { name: 'v2-06-standard', text: 'これが、全部、標準', h: 1000 },
  { name: 'v2-07-standard-tl', text: '20年、続きます', h: 1000 },
  { name: 'v2-08-freedom', text: '間取りも設備', h: 1000 },
  { name: 'v2-09-lots', text: '土地も、やまと', h: 1000 },
  { name: 'v2-10-voice', text: '50組の家族', h: 1000 },
  { name: 'v2-11-works', text: 'やまとが建てた', h: 1000 },
];

for (const s of sections) {
  let y = s.y;
  if (s.text) {
    y = await page.evaluate((needle) => {
      const all = [...document.querySelectorAll('h1,h2,h3')];
      const hit = all.find(h => h.textContent && h.textContent.includes(needle));
      return hit ? hit.getBoundingClientRect().top + window.scrollY - 60 : 0;
    }, s.text);
  }
  await page.setViewportSize({ width: 1440, height: s.h });
  await page.evaluate(py => window.scrollTo(0, py), y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/yamato-critique-snap/${s.name}.png` });
  console.log(`✓ ${s.name} y=${y}`);
}

await browser.close();
