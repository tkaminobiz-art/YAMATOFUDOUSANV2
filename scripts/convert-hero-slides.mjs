import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const base = path.resolve("..", "写真素材");
const outDir = "public/images/fv";
fs.mkdirSync(outDir, { recursive: true });

// Hero スライドショー5枚
const slides = [
  {
    src: `${base}/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9321.jpg`,
    name: "hero-01-exterior-miyamaki.webp",
    label: "三山木モデル外観（黒・赤ドア）",
  },
  {
    src: `${base}/05_モデルハウス高画質/左京モデルハウス（高画質） 2/外観・外部/外観/20230327-243.jpg`,
    name: "hero-02-exterior-sakyo.webp",
    label: "左京モデル外観（青空）",
  },
  {
    src: `${base}/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9185.jpg`,
    name: "hero-03-living.webp",
    label: "リビング・ダイニング",
  },
  {
    src: `${base}/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9210.jpg`,
    name: "hero-04-kitchen.webp",
    label: "キッチン",
  },
  {
    src: `${base}/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9237.jpg`,
    name: "hero-05-washitsu.webp",
    label: "和室",
  },
];

for (const slide of slides) {
  if (!fs.existsSync(slide.src)) {
    console.log("❌ Missing:", slide.src);
    continue;
  }
  // 16:9 に近い比率で、高解像度（2400x1350）に統一
  await sharp(slide.src)
    .rotate() // EXIF自動回転
    .resize(2400, 1350, { fit: "cover" })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, slide.name));
  console.log("✓", slide.name, "—", slide.label);
}

console.log("Done.");
