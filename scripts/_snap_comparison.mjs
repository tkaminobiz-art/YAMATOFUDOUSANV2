// StandardComparisonBlueprint セクションを撮影
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("screenshots");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

for (const [name, w, h, dpr] of [
  ["desk", 1440, 1100, 1],
  ["mob", 390, 1700, 2],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  await page.goto("http://localhost:3022/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);

  const sec = await page.$('section[aria-labelledby="comparison-heading"]');
  if (!sec) {
    console.log("section not found");
    continue;
  }
  const out = `${OUT}/comparison-${name}.png`;
  await sec.screenshot({ path: out });
  console.log(`✓ ${name} → ${out}`);
  await page.close();
}

await browser.close();
console.log("Done.");
