import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

/*
  geocode-lots.mjs — 90件の物件住所を Nominatim で座標に変換
  2026-04-15 神野さん指示で作成

  方針：
  - lots.json の fields.所在地 から住所を取得
  - Nominatim API (https://nominatim.openstreetmap.org) でジオコーディング
  - Nominatim ポリシー遵守: User-Agent 必須、1 req/秒
  - 失敗した区画は null のまま（地図非表示）
  - 結果は src/data/lots-coords.json にキャッシュ（再実行を避ける）
*/

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const INPUT = path.join(REPO_ROOT, "src/data/lots.json");
const OUTPUT = path.join(REPO_ROOT, "src/data/lots-coords.json");

const USER_AGENT = "YamatoFudousanWebsite/1.0 (contact: tanaka@yamatogroup.net)";

async function geocode(address) {
  const normalized = normalizeAddress(address);
  const municipality = extractMunicipality(normalized);
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", normalized);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "3");
  url.searchParams.set("countrycodes", "jp");
  url.searchParams.set("accept-language", "ja");

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return { ok: false, reason: `HTTP ${res.status}` };
  }
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    return { ok: false, reason: "no_result" };
  }
  const first =
    data.find((item) => !municipality || item.display_name?.includes(municipality)) || null;
  if (!first) {
    return { ok: false, reason: `municipality_mismatch:${municipality}` };
  }
  return {
    ok: true,
    lat: parseFloat(first.lat),
    lng: parseFloat(first.lon),
    displayName: first.display_name,
  };
}

function normalizeAddress(address) {
  return address
    .normalize("NFKC")
    .replace(/[‐‑‒–—―ー]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMunicipality(address) {
  const withoutPrefecture = address.replace(/^[^都道府県]+[都道府県]/, "");
  const city = withoutPrefecture.match(/^(.+?市)/);
  if (city) return city[1];

  const countyTown = withoutPrefecture.match(/^.+?郡(.+?[町村])/);
  if (countyTown) return countyTown[1];

  const town = withoutPrefecture.match(/^(.+?[町村])/);
  return town ? town[1] : "";
}

// 住所フォールバック: 町内レベルまで削って再試行
function fallbackAddress(address) {
  const normalized = normalizeAddress(address);

  // 例: "奈良県奈良市あやめ池南6丁目8-14" → "奈良県奈良市あやめ池南6丁目"
  // 丁目は所在地の精度に効くため残し、以降の番地・号だけ削る。
  const chome = normalized.match(/^(.*?\d+丁目)/);
  if (chome) return chome[1];

  // 例: "京都府京田辺市田辺勇田51-2" → "京都府京田辺市田辺勇田"
  return normalized
    .replace(/\d+(-\d+)*番?地?(-\d+)?$/, "")
    .replace(/\d+$/, "")
    .trim();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const raw = JSON.parse(await fs.readFile(INPUT, "utf8"));

  // 既存キャッシュ読み込み（差分実行のため）
  let cache = {};
  try {
    cache = JSON.parse(await fs.readFile(OUTPUT, "utf8"));
  } catch {
    // 存在しないならOK
  }

  const results = { ...cache };
  const targets = raw.filter((l) => l.fields?.所在地 && !cache[l.id]);

  console.log(
    `[geocode] Total ${raw.length} lots, cached ${Object.keys(cache).length}, fetching ${targets.length}`
  );

  let ok = 0;
  let failed = 0;

  for (let i = 0; i < targets.length; i++) {
    const lot = targets[i];
    const address = lot.fields.所在地;
    console.log(`[${i + 1}/${targets.length}] ${lot.id} — ${address}`);

    // 1st try: フル住所
    let result = await geocode(address);

    // 2nd try: 番地を削って町内名まで
    if (!result.ok) {
      const fallback = fallbackAddress(address);
      if (fallback !== address && fallback.length > 5) {
        console.log(`  ↳ fallback: ${fallback}`);
        await sleep(1100);
        result = await geocode(fallback);
      }
    }

    if (result.ok) {
      results[lot.id] = {
        lat: result.lat,
        lng: result.lng,
        source: address,
        matched: result.displayName,
      };
      console.log(`  ✓ ${result.lat}, ${result.lng}`);
      ok++;
    } else {
      results[lot.id] = null;
      console.log(`  ✗ ${result.reason}`);
      failed++;
    }

    // Nominatim ポリシー: 1 req/秒を守る
    await sleep(1100);

    // 進捗で都度保存（途中で止まっても再開可能）
    if (i % 10 === 0) {
      await fs.writeFile(OUTPUT, JSON.stringify(results, null, 2));
    }
  }

  await fs.writeFile(OUTPUT, JSON.stringify(results, null, 2));
  console.log(`\n[geocode] Done. ok=${ok}, failed=${failed}, cached=${Object.keys(cache).length}`);
  console.log(`[geocode] Wrote ${path.relative(REPO_ROOT, OUTPUT)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
