import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "comparison-desktop", width: 1440, height: 900 },
  { name: "comparison-tablet", width: 768, height: 1024 },
  { name: "comparison-mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3022/#comparison", { waitUntil: "networkidle", timeout: 60000 });

  // Show all scroll-in
  await page.evaluate(() => {
    document.querySelectorAll(".scroll-in").forEach((el) => el.classList.add("is-visible"));
  });

  // Wait for animations (count-up etc) to complete
  await page.waitForTimeout(2500);

  // Capture only the new section
  const section = await page.locator("#comparison").first();
  const box = await section.boundingBox();
  if (!box) {
    console.log(`✗ ${vp.name}: section not found`);
    await context.close();
    continue;
  }

  // Make sure section is in view
  await page.evaluate((y) => window.scrollTo(0, y), box.y - 20);
  await page.waitForTimeout(800);

  await section.screenshot({
    path: path.join(outDir, `${vp.name}.png`),
  });
  console.log(`✓ ${vp.name} saved (${box.width}×${box.height})`);
  await context.close();
}

await browser.close();
console.log("Done.");
