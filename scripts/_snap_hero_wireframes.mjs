// /hero-wireframes の各 W1/W2/W3 セクションを個別スクショで保存。
// 出力: screenshots/hero-wireframe-{W1|W2|W3}-{desk|mob}.png
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("screenshots");
mkdirSync(OUT, { recursive: true });

const URL = "http://localhost:3022/hero-wireframes";

const browser = await chromium.launch();

for (const [name, w, h, dpr] of [
  ["desk", 1440, 1100, 1],
  ["mob", 390, 1700, 2],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  for (const id of ["W1", "W2", "W3"]) {
    // セクションのヘッダー部分は実物の上に「ラボUI」が乗っているので、
    // ラボUIではなく「実物ワイヤフレーム本体」(border-y border-white/10 でラップした要素) を撮る。
    // page.evaluate でセクション#W1 直下の border-y div を狙う
    const handle = await page.evaluateHandle((sectionId) => {
      const sec = document.getElementById(sectionId);
      if (!sec) return null;
      // section 直下の最初の border-y 要素 (実ワイヤフレームのコンテナ)
      const target = sec.querySelector(".border-y");
      return target;
    }, id);
    const el = handle.asElement();
    if (!el) {
      console.log(`! ${id} not found`);
      continue;
    }
    const out = `${OUT}/hero-wireframe-${id}-${name}.png`;
    await el.screenshot({ path: out });
    console.log(`✓ ${id} ${name} → ${out}`);
  }

  await page.close();
}

await browser.close();
console.log("\nDone.");
