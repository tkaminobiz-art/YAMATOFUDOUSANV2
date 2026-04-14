import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const outDir = "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });

await page.evaluate(() => {
  document.querySelectorAll(".scroll-in").forEach((el) => el.classList.add("is-visible"));
});

// ページを下までスクロールして画像ロード
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const timer = setInterval(() => {
      window.scrollBy(0, 400);
      y += 400;
      if (y >= document.body.scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 80);
  });
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2000);

// Standard section へスクロール
const section = page.locator('h2:has-text("これが全部、標準です")').locator('xpath=ancestor::section');
await section.scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);

const box = await section.boundingBox();
if (box) {
  const tmpPath = path.join(outDir, "standard-section-raw.png");
  await page.screenshot({
    path: tmpPath,
    clip: {
      x: 0,
      y: box.y,
      width: 1440,
      height: box.height,
    },
  });
  // 幅1440 にダウンサイズして見やすく
  await sharp(tmpPath)
    .resize({ width: 1200 })
    .toFile(path.join(outDir, "standard-section.png"));
  fs.unlinkSync(tmpPath);
  console.log(`✓ Standard section: ${Math.round(box.height)}px`);
}

await context.close();
await browser.close();
