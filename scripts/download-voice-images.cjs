/**
 * voices.json の photos（旧 CDN URL）を取得し、public/images/voices/{id}_{n}.webp に保存する。
 * 再実行時は既存ファイルをスキップ（追加分だけ取り込みたいとき用）。
 *
 * Usage: node scripts/download-voice-images.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const jsonPath = path.join(root, "src/data/voices.json");
const outDir = path.join(root, "public/images/voices");

async function main() {
  await fs.promises.mkdir(outDir, { recursive: true });
  const raw = await fs.promises.readFile(jsonPath, "utf8");
  /** @type {{ id: string; photos?: string[] }[]} */
  const data = JSON.parse(raw);

  let ok = 0;
  let skipped = 0;
  const errors = [];

  for (const v of data) {
    if (!v.photos?.length) continue;
    for (let i = 0; i < v.photos.length; i++) {
      const url = v.photos[i];
      if (typeof url !== "string" || !url.startsWith("http")) continue;

      const filename = `${v.id}_${i + 1}.webp`;
      const outPath = path.join(outDir, filename);

      if (fs.existsSync(outPath)) {
        skipped++;
        continue;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const buf = Buffer.from(await res.arrayBuffer());
        await sharp(buf)
          .webp({ quality: 85 })
          .toFile(outPath);
        console.log("wrote", filename);
        ok++;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        errors.push({ id: v.id, index: i + 1, url, error: msg });
        console.error("FAIL", v.id, i + 1, msg);
      }
    }
  }

  console.log(JSON.stringify({ wrote: ok, skipped, failed: errors.length }, null, 2));
  if (errors.length) {
    await fs.promises.writeFile(
      path.join(outDir, "_download-errors.json"),
      JSON.stringify(errors, null, 2),
      "utf8"
    );
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
