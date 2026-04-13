import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

const SRC = path.join(ROOT, '写真素材/05_モデルハウス高画質/三山木（家具あり）高画質/_MG_9321.jpg');
const OUT_DIR = path.join(__dirname, '../public/images/fv');

// PC版（横長クロップ 16:7）
await sharp(SRC)
  .resize(1440, 630, { fit: 'cover', position: 'center' })
  .webp({ quality: 85 })
  .toFile(path.join(OUT_DIR, 'hero-pc.webp'));

// タブレット版
await sharp(SRC)
  .resize(900, 500, { fit: 'cover', position: 'center' })
  .webp({ quality: 82 })
  .toFile(path.join(OUT_DIR, 'hero-tablet.webp'));

// SP版（4:3寄り）
await sharp(SRC)
  .resize(750, 560, { fit: 'cover', position: 'center' })
  .webp({ quality: 80 })
  .toFile(path.join(OUT_DIR, 'hero-sp.webp'));

// フォールバック JPG（PC）
await sharp(SRC)
  .resize(1440, 630, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 82 })
  .toFile(path.join(OUT_DIR, 'hero-pc.jpg'));

console.log('FV images converted.');
