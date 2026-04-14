import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "screenshots";
const files = [
  { input: "desktop-full.png", prefix: "desktop", sliceHeight: 1800 },
  { input: "mobile-full.png", prefix: "mobile", sliceHeight: 1688 },
];

for (const f of files) {
  const inputPath = path.join(dir, f.input);
  const img = sharp(inputPath);
  const meta = await img.metadata();
  const { width, height } = meta;
  console.log(`${f.input}: ${width}x${height}`);

  const slices = Math.ceil(height / f.sliceHeight);
  for (let i = 0; i < slices; i++) {
    const top = i * f.sliceHeight;
    const h = Math.min(f.sliceHeight, height - top);
    const outPath = path.join(dir, `${f.prefix}-${String(i + 1).padStart(2, "0")}.png`);
    await sharp(inputPath)
      .extract({ left: 0, top, width, height: h })
      // 見やすさのため幅を抑える
      .resize({ width: Math.min(width, 1440) })
      .toFile(outPath);
  }
  console.log(`  → split into ${slices} slices`);
}
console.log("Done.");
