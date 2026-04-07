import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const PROJECT_ROOT = path.resolve(REPO_ROOT, "..");

const sources = [
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9185.jpg"
    ),
    name: "hope-living",
  },
  {
    input: path.join(
      PROJECT_ROOT,
      "写真素材/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9321.jpg"
    ),
    name: "quality-exterior",
  },
];

const outDir = path.join(REPO_ROOT, "public/images/sections");

async function convertOne(inputPath, baseName) {
  const buf = await fs.readFile(inputPath);
  const variants = [
    { width: 1600, suffix: "" },
    { width: 1024, suffix: "-tablet" },
    { width: 640, suffix: "-sp" },
  ];
  for (const { width, suffix } of variants) {
    const outPath = path.join(outDir, `${baseName}${suffix}.webp`);
    await sharp(buf)
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
