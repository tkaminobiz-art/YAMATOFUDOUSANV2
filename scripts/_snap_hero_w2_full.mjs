// W2 採用版 Hero の全体 (META STRIP + FRAME + HEADLINE + TITLE BLOCK) を撮る
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("screenshots");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto("http://localhost:3022/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

// Hero セクション(<section aria-labelledby="hero-editorial-heading">)を要素単位で撮る
const handle = await page.$('section[aria-labelledby="hero-editorial-heading"]');
if (!handle) {
  console.log("hero section not found");
  process.exit(1);
}
await handle.screenshot({ path: `${OUT}/hero-w2-full.png` });
console.log(`✓ hero-w2-full → ${OUT}/hero-w2-full.png`);

// もう一枚: スマホ
await page.setViewportSize({ width: 390, height: 1700 });
await page.waitForTimeout(400);
const handle2 = await page.$('section[aria-labelledby="hero-editorial-heading"]');
if (handle2) {
  await handle2.screenshot({ path: `${OUT}/hero-w2-mob.png` });
  console.log(`✓ hero-w2-mob → ${OUT}/hero-w2-mob.png`);
}

await browser.close();
