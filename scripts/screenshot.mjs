import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });

  // scroll-in を全て表示
  await page.evaluate(() => {
    document.querySelectorAll(".scroll-in").forEach((el) => el.classList.add("is-visible"));
  });

  // 下までスクロールして全lazy画像をロード
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 80);
    });
    window.scrollTo(0, 0);
  });

  // 画像ロード待ち（networkidleは長引くのでfixed wait）
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: path.join(outDir, `${vp.name}-full.png`),
    fullPage: true,
  });
  console.log(`✓ ${vp.name} full-page saved`);
  await context.close();
}

await browser.close();
console.log("Done.");
