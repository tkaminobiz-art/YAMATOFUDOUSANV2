import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PROJECT_ROOT = path.resolve(import.meta.dirname, '../../');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'YAMATOFUDOUSANV2/public/images/hero');

const SIZES = {
  pc: 2560,
  tablet: 1920,
  sp: 1200,
};

const QUALITY = 82;

const SLIDES = [
  {
    id: 'slide-01',
    sources: {
      pc: path.join(PROJECT_ROOT, 'FV用/オプション2改_PC用_高精度版.png'),
      tablet: path.join(PROJECT_ROOT, 'FV用/オプション2改_タブレット用_高精度版.png'),
      sp: path.join(PROJECT_ROOT, 'FV用/オプション2改_SP用_高精度版.png'),
    },
    alt: '奈良の里山を背景に立つ、やまと不動産の注文住宅 花鳥風月・花モデル外観',
  },
  {
    id: 'slide-02',
    sources: {
      pc: path.join(PROJECT_ROOT, '写真素材/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9194.jpg'),
      tablet: null,
      sp: null,
    },
    alt: '三山木モデルハウスのダイニング、一枚板テーブルと窓外の景色',
  },
  {
    id: 'slide-03',
    sources: {
      pc: path.join(PROJECT_ROOT, '写真素材/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9198.jpg'),
      tablet: null,
      sp: null,
    },
    alt: '三山木モデルハウスの吹抜リビング、自然光の入る開放的な空間',
  },
  {
    id: 'slide-04',
    sources: {
      pc: path.join(PROJECT_ROOT, '写真素材/05_モデルハウス高画質/左京モデルハウス（高画質） 2/リビング・ダイニング/20230327-001.jpg'),
      tablet: null,
      sp: null,
    },
    alt: '左京モデルハウスのリビング、一枚板カウンターと間接照明',
  },
];

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  console.log(`Output directory: ${OUTPUT_DIR}`);

  for (const slide of SLIDES) {
    console.log(`\n[${slide.id}] 処理開始`);

    for (const [device, width] of Object.entries(SIZES)) {
      const sourcePath = slide.sources[device] ?? slide.sources.pc;
      const outputPath = path.join(OUTPUT_DIR, `${slide.id}-${device}.webp`);

      try {
        const resizeOptions = device === 'sp'
          ? { width, height: Math.round(width * 1.25), fit: 'cover', position: 'centre' }
          : { width, withoutEnlargement: true };

        await sharp(sourcePath)
          .resize(resizeOptions)
          .webp({ quality: QUALITY, effort: 5 })
          .toFile(outputPath);

        const stat = await fs.stat(outputPath);
        const sizeKB = Math.round(stat.size / 1024);
        console.log(`  ✓ ${device.padEnd(6)} → ${path.basename(outputPath)} (${sizeKB}KB)`);
      } catch (err) {
        console.error(`  ✗ ${device} 失敗: ${err.message}`);
        throw err;
      }
    }
  }

  console.log('\n全スライド処理完了');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
