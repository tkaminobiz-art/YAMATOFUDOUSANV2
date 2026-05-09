import lotsJson from "./lots.json";
import coordsJson from "./lots-coords.json";
import amenitiesJson from "./lots-amenities.json";
import pricesJson from "./lots-prices.json";

/**
 * 学校・スーパー等の最寄り施設情報。
 * scripts/fetch-lot-amenities.mjs で OpenStreetMap Overpass API から自動取得。
 * 直線距離(haversine)を80m/分換算した目安値で、徒歩実距離はやや前後する。
 * 個別の正確な学区は教育委員会に要確認(UIで注記)。
 */
export type Amenity = {
  name: string;
  walkMin: number;
  meters: number;
};

export type LotAmenities = {
  primarySchool?: Amenity | null;
  juniorHighSchool?: Amenity | null;
  supermarket?: Amenity | null;
  error?: string;
};

/**
 * 価格情報。複数区画ある場合は from(最低価格)〜表記。
 * 2026-04-30: 専務指示でデータ整備中。データ未投入の物件は priceFrom undefined。
 */
export type LotPrice = {
  /** 最低価格(万円単位) */
  from: number;
  /** 最高価格(万円単位・任意) */
  to?: number;
};

export type Lot = {
  id: string;
  title: string;
  area: string;
  city: string;
  dirName: string;
  fields: Record<string, string>;
  photos: string[];
  coord?: Coord;
  price?: LotPrice;
  amenities?: LotAmenities;
};

export type Coord = { lat: number; lng: number };

type CoordEntry = { lat: number; lng: number; source?: string; matched?: string } | null;

const COORDS = coordsJson as Record<string, CoordEntry>;
const AMENITIES = amenitiesJson as Record<string, LotAmenities>;
const PRICES = pricesJson as Record<string, LotPrice | { _comment?: string }>;

function resolvePrice(id: string): LotPrice | undefined {
  const v = PRICES[id];
  if (!v || typeof v !== "object") return undefined;
  if ("from" in v && typeof v.from === "number") {
    return { from: v.from, to: "to" in v && typeof v.to === "number" ? v.to : undefined };
  }
  return undefined;
}

export const LOTS: Lot[] = (lotsJson as Lot[]).map((l) => ({
  ...l,
  photos: l.photos.map((_, i) => `/images/lots/${l.id}_${i + 1}.webp`),
  coord: getCoord(l.id) || undefined,
  amenities: AMENITIES[l.id] || undefined,
  price: resolvePrice(l.id),
}));

export function getLot(id: string): Lot | undefined {
  return LOTS.find((l) => l.id === id);
}

export function getAllLotIds(): string[] {
  return LOTS.map((l) => l.id);
}

export function getCities(): { city: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const lot of LOTS) {
    counts[lot.city] = (counts[lot.city] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 座標データ取得（ジオコーディング済みのもののみ）
 */
export function getCoord(id: string): Coord | null {
  const entry = COORDS[id];
  if (!entry) return null;
  return { lat: entry.lat, lng: entry.lng };
}

/**
 * 地図に表示できる物件（座標ありのもの）を返す
 */
export function getMappableLots(): (Lot & { coord: Coord })[] {
  return LOTS.flatMap((lot) => {
    const coord = lot.coord || getCoord(lot.id);
    if (!coord) return [];
    return [{ ...lot, coord }];
  });
}

/**
 * 販売中の物件 = 価格情報があるもの。
 * 旧サイト yamatogroup.net/subdivision/ に掲載されている物件と同等。
 */
export function getActiveLots(): Lot[] {
  return LOTS.filter((l) => Boolean(l.price));
}

/**
 * 過去の分譲実績 = 価格情報がない(旧サイトに掲載されていない)もの。
 * "累計90区画以上の分譲実績" の根拠資産として保持する。
 */
export function getArchivedLots(): Lot[] {
  return LOTS.filter((l) => !l.price);
}
