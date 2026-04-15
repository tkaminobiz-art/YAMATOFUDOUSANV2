import lotsJson from "./lots.json";
import coordsJson from "./lots-coords.json";

export type Lot = {
  id: string;
  title: string;
  area: string;
  city: string;
  dirName: string;
  fields: Record<string, string>;
  photos: string[];
};

export type Coord = { lat: number; lng: number };

type CoordEntry = { lat: number; lng: number; source?: string; matched?: string } | null;

const COORDS = coordsJson as Record<string, CoordEntry>;

export const LOTS: Lot[] = (lotsJson as Lot[]).map((l) => ({
  ...l,
  photos: l.photos.map((_, i) => `/images/lots/${l.id}_${i + 1}.webp`),
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
    const coord = getCoord(lot.id);
    if (!coord) return [];
    return [{ ...lot, coord }];
  });
}
