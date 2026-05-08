// Hero (HeroEditorial + TrustMetricsEditorial) のスクショを撮る。
// 出力: screenshots/hero-editorial-{desk|tablet|mob}.png
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT_DIR = resolve("screenshots");
mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  ["desk", 1440, 900, 1],
  ["tablet", 1024, 768, 1],
  ["mob", 390, 844, 2],
];

const URL = "http://localhost:3022/";

const browser = await chromium.launch();
for (const [name, width, height, dpr] of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: dpr,
  });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  // Hero + TrustMetrics 範囲だけ収めるよう、Heroセクションが画面上で収まる範囲を撮る
  const fullPath = `${OUT_DIR}/hero-editorial-${name}-full.png`;
  await page.screenshot({ path: fullPath, fullPage: false });
  console.log(`✓ ${name} (above-fold) → ${fullPath}`);

  // Hero+TrustMetrics+その下の少しを含む大きめのスクショ (height: 1100相当でclip)
  const longPath = `${OUT_DIR}/hero-editorial-${name}-long.png`;
  await page.setViewportSize({ width, height: name === "mob" ? 1500 : 1100 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: longPath, fullPage: false });
  console.log(`✓ ${name} (long) → ${longPath}`);

  await page.close();
}
await browser.close();
console.log("\nDone. Open the screenshots/ folder in Finder to inspect.");
