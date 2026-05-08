import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = "screenshots/fontlab";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto("http://localhost:3022/font-lab", { waitUntil: "networkidle", timeout: 60000 });
// Wait for Google Fonts CDN to load
await page.waitForTimeout(4000);

for (const id of ["A", "B", "C", "D", "E"]) {
  const section = page.locator(`section#${id}`);
  const box = await section.boundingBox();
  if (!box) {
    console.log(`✗ ${id}: not found`);
    continue;
  }
  await page.evaluate((y) => window.scrollTo(0, y), box.y - 20);
  await page.waitForTimeout(800);
  await section.screenshot({ path: path.join(outDir, `option-${id}.png`) });
  console.log(`✓ option-${id}.png saved`);
}

await context.close();
await browser.close();
console.log("Done.");
