import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
await page.mouse.move(-100, -100);

// 各スライドは 6s 周期。1s, 7s, 13s, 19s, 25s でそれぞれ別のスライドが真ん中にある
for (let i = 0; i < 5; i++) {
  const waitTime = i === 0 ? 3000 : 6000;
  await page.waitForTimeout(waitTime);
  await page.screenshot({
    path: path.join(outDir, `hero-slide-${i + 1}.png`),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log(`✓ slide ${i + 1} captured`);
}

await context.close();
await browser.close();
