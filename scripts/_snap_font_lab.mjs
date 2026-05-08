// /font-lab の各案 (A-E) の SampleCard を個別撮影
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("screenshots");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 1100 },
  deviceScaleFactor: 1,
});

await page.goto("http://localhost:3022/font-lab", { waitUntil: "networkidle", timeout: 60000 });
// Google Fonts ロード待ち
await page.waitForTimeout(3000);

for (const id of ["A", "B", "C", "D", "E"]) {
  const sec = await page.$(`section#${id}`);
  if (!sec) {
    console.log(`! ${id} not found`);
    continue;
  }
  const out = `${OUT}/font-lab-${id}.png`;
  await sec.screenshot({ path: out });
  console.log(`✓ ${id} → ${out}`);
}

await browser.close();
console.log("Done.");
