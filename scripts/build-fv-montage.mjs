// build-fv-montage.mjs — FV案B モンタージュ動画を「高解像度マスターから」再エンコードするビルドスクリプト。
// ------------------------------------------------------------------------------------------------
// 背景: 初版(2026-06-26)は 1280×720 / ~700kbps の一発エンコードで、ビルド手順が未保存だった。
//   神野さん指示(2026-06-29)「PC/スマホとも 1080p に」を受け、承認済みカット順を維持したまま
//   1920×1080 で再構築する。カット順は既存 720p 動画から実フレームを抽出し、知覚ハッシュで
//   許可リスト素材へ機械照合して確定(scratchpad/match.py・RMSE≈0.000〜0.003 の一意一致)。
//   記録ノート docs/notes/2026-06-26-fv-montage-assets.md の「30枚構成」と完全一致を確認済み。
//
// 仕様(初版踏襲): 30フレーム / 2枚/秒(offset 0.5s) / xfade 0.25s / 各 D=0.75s /
//   末尾ヒーロー静止(三山木 夕暮れ)で総尺 18.0s / 30fps / 音声なし。
//   高解像度で本物の 1080p になるのは外観(2752px)＋newsozai内観(2400px)の16枚。
//   works-parts(918px)の14枚は原本がそれ以上にないため 1080p へ拡大(高ビットレートで現状より改善)。
//
// 出典トレーサビリティ(BRAND-TRUTH §1): 下記 MANIFEST が 30 フレームの確定マッピング。
//
// 使い方: `node scripts/build-fv-montage.mjs`  (要 ffmpeg)。出力は public/videos/fv/ に上書き。
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public/videos/fv");
const TMP = join(tmpdir(), "fv-montage-build"); // 2パスログ等(リポジトリ外)

// 確定マッピング(30フレーム・順序＝承認済みカット)。s=screenshots, p=public/images。
const S = (f) => join(ROOT, "screenshots", f);
const P = (f) => join(ROOT, "public/images", f);
const MANIFEST = [
  S("fv-pilot-04-bluehour.png"),        // 01 三山木 夕暮れ
  S("fv-sakyo-03-night.png"),           // 02 左京 夜景
  S("fv-greenhouse-02-bluehour.png"),   // 03 緑の家 夕暮れ
  S("fv-twotone-01-golden.png"),        // 04 二色 黄金光
  S("fv-pilot-05-night.png"),           // 05 三山木 夜景
  S("fv-greenhouse-03-night.png"),      // 06 緑の家 夜景
  S("fv-sakyo-02-bluehour.png"),        // 07 左京 夕暮れ
  S("fv-pilot-02-bluesky.png"),         // 08 三山木 青空
  S("fv-twotone-03-bluehour.png"),      // 09 二色 夕暮れ
  S("fv-greenhouse-01-bluesky.png"),    // 10 緑の家 青空
  P("newsozai/interior-ldk-01.webp"),   // 11 LDK
  P("works-parts/living/living-02.webp"),     // 12
  P("works-parts/kitchen/kitchen-03.webp"),   // 13 シンク寄り
  P("works-parts/living/living-07.webp"),      // 14
  P("newsozai/interior-kitchen-01.webp"),      // 15 キッチン(黒)
  P("works-parts/living/living-11.webp"),      // 16
  P("works-parts/kitchen/kitchen-09.webp"),    // 17
  P("works-parts/living/living-04.webp"),      // 18
  P("works-parts/kitchen/kitchen-12.webp"),    // 19
  P("newsozai/interior-window-detail-01.webp"),// 20 窓辺
  P("works-parts/entrance/entrance-01.webp"),  // 21
  P("works-parts/washroom/washroom-02.webp"),  // 22
  P("works-parts/storage/storage-05.webp"),    // 23
  P("works-parts/bath/bath-03.webp"),          // 24 浴室
  P("works-parts/entrance/entrance-05.webp"),  // 25
  P("newsozai/exterior-terrace-01.webp"),      // 26 テラス
  P("works-parts/storage/storage-08.webp"),    // 27
  P("works-parts/washroom/washroom-05.webp"),  // 28
  S("fv-twotone-02-bluesky.png"),       // 29 二色 青空
  S("fv-pilot-04-bluehour.png"),        // 30 三山木 夕暮れ(=poster・静止着地)
];

const W = 1920, H = 1080, FPS = 30, XF = 0.25, STEP = 0.5;
const HOLD = 3.5;                 // 末尾静止(s)
const BASE = STEP + XF;           // 各フレーム尺 D=0.75

const n = MANIFEST.length;
for (const f of MANIFEST) if (!existsSync(f)) { console.error("MISSING:", f); process.exit(1); }
if (!existsSync(TMP)) mkdirSync(TMP, { recursive: true });

// 入力(-loop image)。最後だけ HOLD ぶん長く。
const inputs = [];
MANIFEST.forEach((f, i) => {
  const dur = i === n - 1 ? BASE + (HOLD - XF) : BASE;
  inputs.push("-loop", "1", "-t", dur.toFixed(3), "-i", f);
});

// 各入力を 1920×1080 cover-crop / 30fps / yuv420p に正規化。
const norm = MANIFEST.map(
  (_, i) =>
    `[${i}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${FPS},format=yuv420p[v${i}]`
);
// xfade チェーン: offset_k = STEP*k。
let chain = "", prev = "v0";
for (let k = 1; k < n; k++) {
  const off = (STEP * k).toFixed(3);
  const out = k === n - 1 ? "vout" : `x${k}`;
  chain += `[${prev}][v${k}]xfade=transition=fade:duration=${XF}:offset=${off}[${out}];`;
  prev = out;
}
const filter = norm.join(";") + ";" + chain.replace(/;$/, "");

const webm = join(OUT, "yamato-fv-montage.webm");
const mp4 = join(OUT, "yamato-fv-montage.mp4");
const poster = join(OUT, "yamato-fv-montage-poster.webp");
const passlog = join(TMP, "vp9pass");

const run = (args) => {
  process.stdout.write("ffmpeg " + args.slice(0, 6).join(" ") + " …\n");
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], { stdio: "inherit" });
};

// SKIP_VP9=1 で webm パスを飛ばし mp4+poster のみ再生成(エンコード調整の高速反復用)。
const x264log = join(TMP, "x264pass");
if (process.env.SKIP_VP9 !== "1") {
  console.log(`[1/4] VP9 webm pass1 …`);
  run([...inputs, "-filter_complex", filter, "-map", "[vout]",
    "-c:v", "libvpx-vp9", "-b:v", "1800k", "-crf", "31", "-row-mt", "1", "-cpu-used", "1",
    "-pass", "1", "-passlogfile", passlog, "-an", "-f", "null", "/dev/null"]);
  console.log(`[2/4] VP9 webm pass2 …`);
  run([...inputs, "-filter_complex", filter, "-map", "[vout]",
    "-c:v", "libvpx-vp9", "-b:v", "1800k", "-crf", "31", "-row-mt", "1", "-cpu-used", "1",
    "-pass", "2", "-passlogfile", passlog, "-an", webm]);
}

// H.264 は Safari/iOS が使う唯一の経路。VP9 より多ビット要するが 2パスで ~2.2Mbps に抑える
// (1080p クロスフェードを CRF 任せにすると ~9MB に膨らむため)。
console.log(`[3/4] H.264 mp4 pass1 …`);
run([...inputs, "-filter_complex", filter, "-map", "[vout]",
  "-c:v", "libx264", "-b:v", "2200k", "-preset", "slow", "-pix_fmt", "yuv420p",
  "-pass", "1", "-passlogfile", x264log, "-an", "-f", "null", "/dev/null"]);
console.log(`[3/4] H.264 mp4 pass2 …`);
run([...inputs, "-filter_complex", filter, "-map", "[vout]",
  "-c:v", "libx264", "-b:v", "2200k", "-preset", "slow", "-pix_fmt", "yuv420p",
  "-pass", "2", "-passlogfile", x264log, "-movflags", "+faststart", "-an", mp4]);

// poster は ImageMagick で生成(この ffmpeg ビルドは webp エンコーダ無効のため)。
console.log(`[4/4] poster (1920×1080 webp from 三山木 夕暮れ master) …`);
execFileSync("magick", [MANIFEST[n - 1], "-resize", `${W}x${H}^`,
  "-gravity", "center", "-extent", `${W}x${H}`, "-quality", "82", poster], { stdio: "inherit" });

console.log("done:", { webm, mp4, poster });
