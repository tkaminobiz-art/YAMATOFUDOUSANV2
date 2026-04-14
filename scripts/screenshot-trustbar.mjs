import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of [
  { name: "desktop", w: 1440, h: 900 },
  { name: "mobile", w: 390, h: 844 },
]) {
  const context = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
  await page.mouse.move(-100, -100);

  // Hero直下の TrustBar に移動
  const loc = page.locator('[aria-label="やまと不動産の9つの¥0"]');
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);

  const box = await loc.boundingBox();
  if (box) {
    await page.screenshot({
      path: path.join(outDir, `trustbar-new-${vp.name}.png`),
      clip: {
        x: 0,
        y: box.y - 20,
        width: vp.w,
        height: box.height + 40,
      },
    });
    console.log(`✓ ${vp.name}:`, Math.round(box.height), "px");
  }

  await context.close();
}

await browser.close();
