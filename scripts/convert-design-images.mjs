import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const PROJECT_ROOT = path.resolve(REPO_ROOT, "..");

// 4ステップ（打ち合わせ〜完成）と 自由設計の実例4点
const sources = [
  // --- 4ステップ ---
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/旧サイト整理/07_strength_強み/copy_reasonImg_02.jpg"
    ),
    name: "step-01-meeting",
    aspect: "3/2",
  },
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/旧サイト整理/07_strength_強み/copy_reasonImg_01.jpg"
    ),
    name: "step-02-drawing",
    aspect: "3/2",
  },
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/05_モデルハウス高画質/三山木モデル①/_MG_9214.jpg"
    ),
    name: "step-03-modelhouse",
    aspect: "3/2",
  },
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/06_YAMATO撮影/_DSC7044.JPG"
    ),
    name: "step-04-finished",
    aspect: "3/2",
  },
  // --- 自由設計の実例 3点（左京モデルハウス高画質に差し替え） ---
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/05_モデルハウス高画質/左京モデルハウス（高画質） 2/リビング・ダイニング/20230327-001.jpg"
    ),
    name: "example-coveceiling",
    aspect: "4/3",
  },
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/05_モデルハウス高画質/左京モデルハウス（高画質） 2/大空間収納/20230327-170.jpg"
    ),
    name: "example-storage",
    aspect: "4/3",
  },
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/05_モデルハウス高画質/左京モデルハウス（高画質） 2/外観・外部/バルコニー/20230327-177.jpg"
    ),
    name: "example-balcony",
    aspect: "4/3",
  },
];

const outDir = path.join(REPO_ROOT, "public/images/design");

async function convertOne(inputPath, baseName) {
  const buf = await fs.readFile(inputPath);
  const variants = [
    { width: 1600, suffix: "" },
    { width: 900, suffix: "-tablet" },
    { width: 600, suffix: "-sp" },
  ];
  for (const { width, suffix } of variants) {
    const outPath = path.join(outDir, `${baseName}${suffix}.webp`);
    await sharp(buf)
      .rotate() // EXIF情報による回転を適用
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath);
    console.log("Wrote", path.relative(REPO_ROOT, outPath));
  }
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  for (const { input, name } of sources) {
    await convertOne(input, name);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
