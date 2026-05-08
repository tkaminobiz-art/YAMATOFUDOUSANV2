// StandardComparisonBlueprint + StandardEquipment 2セクションを撮影
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("screenshots");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

const page = await browser.newPage({
  viewport: { width: 1440, height: 1100 },
  deviceScaleFactor: 1,
});
await page.goto("http://localhost:3022/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

const compSec = await page.$('section[aria-labelledby="comparison-heading"]');
if (compSec) {
  await compSec.screenshot({ path: `${OUT}/comparison-desk.png` });
  console.log("✓ comparison-desk");
}

const eqSec = await page.$('section[aria-labelledby="standard-equipment-heading"]');
if (eqSec) {
  await eqSec.screenshot({ path: `${OUT}/equipment-desk.png` });
  console.log("✓ equipment-desk");
}

await browser.close();
console.log("Done.");
