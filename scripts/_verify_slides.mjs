import { chromium } from 'playwright';

const SHOTS_DIR = '/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/FV用/_verify_v1';
const URL = 'http://localhost:3399/';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForSelector('.hero-slide', { timeout: 30000 });

// 1) Inspect which images Next.js Image rendered for each .hero-slide
const slidesInDom = await page.$$eval('.hero-slide img', (imgs) =>
  imgs.map((img, i) => ({
    index: i,
    src: img.currentSrc || img.src,
    alt: img.alt,
    naturalWidth: img.naturalWidth,
  }))
);
console.log('=== Slides in DOM ===');
console.log(JSON.stringify(slidesInDom, null, 2));

// 2) Wait for full hydration + first paint
await page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
await page.waitForTimeout(500);

// 3) Take screenshots at the peak time of each slide
//    heroFade 28s, animationDelay = i*7 - 1, peak from delay+1 to delay+7
const peaks = [
  { i: 1, t: 3000 },   // slide 1 peak ~ 3s into cycle
  { i: 2, t: 10000 },  // slide 2 peak ~ 10s
  { i: 3, t: 17000 },  // slide 3 peak ~ 17s
  { i: 4, t: 24000 },  // slide 4 peak ~ 24s
];

const start = Date.now();
for (const p of peaks) {
  const wait = p.t - (Date.now() - start);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  // Read live opacity values to confirm which slide is active right now
  const opacities = await page.$$eval('.hero-slide', (els) =>
    els.map((el) => parseFloat(getComputedStyle(el).opacity))
  );
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`slide${p.i} @ ${elapsed}s opacity=[${opacities.map((o) => o.toFixed(2)).join(', ')}]`);
  await page.screenshot({ path: `${SHOTS_DIR}/slide${p.i}_at${elapsed.replace('.', '_')}s.png` });
}

await browser.close();
console.log('done');
