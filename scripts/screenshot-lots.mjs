import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const outDir = "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

// コンソールエラーを全部拾う
const errors = [];
page.on("pageerror", (err) => errors.push(`PAGE ERROR: ${err.message}\n${err.stack || ""}`));
page.on("console", (msg) => {
  if (msg.type() === "error") {
    errors.push(`CONSOLE ERROR: ${msg.text()}`);
  }
});
page.on("requestfailed", (req) => {
  errors.push(`REQUEST FAILED: ${req.url()} — ${req.failure()?.errorText}`);
});

try {
  const url = process.env.TARGET_URL || "http://localhost:3000/lots";
  console.log(`→ Visiting ${url}`);
  await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  // 地図タイル読み込みを待つ
  await page.waitForTimeout(4000);

  await page.screenshot({
    path: path.join(outDir, "lots-full.png"),
    fullPage: true,
  });

  // マップ部分だけ切り出し
  const mapEl = await page.$(".leaflet-container");
  if (mapEl) {
    await mapEl.screenshot({ path: path.join(outDir, "lots-map.png") });
    console.log("✓ Map container found");
  } else {
    console.log("✗ Map container NOT found (.leaflet-container)");
  }
} catch (e) {
  errors.push(`GOTO FAILED: ${e.message}`);
}

await browser.close();

if (errors.length > 0) {
  console.log("\n=== ERRORS ===");
  errors.forEach((e) => console.log(e));
} else {
  console.log("\n=== No errors ===");
}
