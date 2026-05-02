import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

/*
  fetch-lot-amenities.mjs — 各物件座標から最寄りの公立小・中・スーパーを取得
  2026-04-30 専務指示「学校・スーパーが近いか」を物件カードに表示するため

  方針:
  - lots-coords.json から座標を取得
  - Overpass API で半径1.5km内の amenity=school + shop=supermarket を検索
  - 直線距離(haversine)を算出 → 徒歩分(80m/min)に換算
  - 最寄り1件ずつを保存
  - 結果は src/data/lots-amenities.json にキャッシュ
*/

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const COORDS_INPUT = path.join(REPO_ROOT, "src/data/lots-coords.json");
const AMENITIES_OUTPUT = path.join(REPO_ROOT, "src/data/lots-amenities.json");

const USER_AGENT =
  "YamatoFudousanWebsite/1.0 (contact: tanaka@yamatogroup.net)";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const SEARCH_RADIUS_M = 1500; // 1.5km
const WALK_SPEED_M_PER_MIN = 80; // 一般的な徒歩速度

function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function metersToWalkMin(m) {
  return Math.max(1, Math.round(m / WALK_SPEED_M_PER_MIN));
}

/**
 * Overpass QL クエリを実行して配列を返す
 */
async function overpassQuery(query) {
  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!res.ok) {
    throw new Error(`Overpass API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.elements || [];
}

/**
 * 1座標分: 最寄りの 小学校 / 中学校 / スーパー を取得
 */
async function fetchNearby(lat, lng) {
  // 学校(public school)
  // ISCED 1 = 小学校, ISCED 2 = 中学校
  // 日本の学校は isced:level がない場合も多いので、ja-name から判別する補助も使う
  const query = `
[out:json][timeout:25];
(
  node["amenity"="school"](around:${SEARCH_RADIUS_M},${lat},${lng});
  way["amenity"="school"](around:${SEARCH_RADIUS_M},${lat},${lng});
  relation["amenity"="school"](around:${SEARCH_RADIUS_M},${lat},${lng});
  node["shop"="supermarket"](around:${SEARCH_RADIUS_M},${lat},${lng});
  way["shop"="supermarket"](around:${SEARCH_RADIUS_M},${lat},${lng});
);
out center tags;
`;

  const elements = await overpassQuery(query);

  // way/relation には center があるので、正規化
  const points = elements
    .map((el) => {
      const center = el.type === "node" ? { lat: el.lat, lon: el.lon } : el.center;
      if (!center) return null;
      return {
        id: el.id,
        type: el.type,
        lat: center.lat,
        lng: center.lon,
        tags: el.tags || {},
      };
    })
    .filter(Boolean);

  // 種別判定
  const schools = [];
  const supermarkets = [];
  for (const p of points) {
    const t = p.tags;
    const dist = haversineMeters(lat, lng, p.lat, p.lng);
    const walkMin = metersToWalkMin(dist);
    const name = t["name:ja"] || t.name || "";
    if (!name) continue;

    if (t.amenity === "school") {
      // 公立判定: operator/operator:type で判定可能なら除外
      // 国立/私立を除いた "公立小学校 / 公立中学校" にフィルター
      const opType = (t["operator:type"] || "").toLowerCase();
      const isPrivate =
        opType === "private" ||
        /私立|学校法人|附属/.test(name) ||
        opType === "religious";
      if (isPrivate) continue;

      // 小学校/中学校 判定
      const isPrimary = /小学校|elementary/i.test(name);
      const isJunior = /中学校|junior/i.test(name);
      // 義務教育学校(小中一貫): 両方
      const isCompulsory = /義務教育学校/.test(name);

      schools.push({
        name,
        walkMin,
        meters: Math.round(dist),
        kind: isCompulsory
          ? "compulsory"
          : isPrimary
          ? "primary"
          : isJunior
          ? "junior"
          : "other",
      });
    } else if (t.shop === "supermarket") {
      supermarkets.push({
        name,
        walkMin,
        meters: Math.round(dist),
        brand: t.brand || null,
      });
    }
  }

  // 最寄りソート
  schools.sort((a, b) => a.meters - b.meters);
  supermarkets.sort((a, b) => a.meters - b.meters);

  // 種別ごとに最寄り1件
  const primary =
    schools.find((s) => s.kind === "primary" || s.kind === "compulsory") ||
    null;
  const junior =
    schools.find((s) => s.kind === "junior" || s.kind === "compulsory") ||
    null;
  const supermarket = supermarkets[0] || null;

  return {
    primarySchool: primary
      ? { name: primary.name, walkMin: primary.walkMin, meters: primary.meters }
      : null,
    juniorHighSchool: junior
      ? { name: junior.name, walkMin: junior.walkMin, meters: junior.meters }
      : null,
    supermarket: supermarket
      ? {
          name: supermarket.name,
          walkMin: supermarket.walkMin,
          meters: supermarket.meters,
        }
      : null,
  };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const coordsRaw = await fs.readFile(COORDS_INPUT, "utf-8");
  const coords = JSON.parse(coordsRaw);

  // 既存キャッシュがあれば読み込み(再実行で重複処理を避ける)
  let existing = {};
  try {
    existing = JSON.parse(await fs.readFile(AMENITIES_OUTPUT, "utf-8"));
  } catch {
    // 初回
  }

  const out = { ...existing };
  const ids = Object.keys(coords).filter((id) => {
    const c = coords[id];
    if (!c || c.lat == null) return false;
    if (existing[id]) return false; // 既にデータある
    return true;
  });

  console.log(`Processing ${ids.length} coords (skipping ${Object.keys(existing).length} cached)...`);

  let count = 0;
  for (const id of ids) {
    const c = coords[id];
    count++;
    try {
      console.log(`[${count}/${ids.length}] ${id} (${c.lat}, ${c.lng})`);
      const data = await fetchNearby(c.lat, c.lng);
      out[id] = data;
      await fs.writeFile(AMENITIES_OUTPUT, JSON.stringify(out, null, 2), "utf-8");
      // Overpass の rate limit を尊重して 2秒待つ
      await sleep(2000);
    } catch (e) {
      console.error(`  ERROR for ${id}:`, e.message);
      out[id] = { error: e.message };
      await sleep(5000); // エラー時は長めに待つ
    }
  }

  console.log(`Done. Wrote ${AMENITIES_OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
