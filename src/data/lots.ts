import lotsJson from "./lots.json";

export type Lot = {
  id: string;
  title: string;
  area: string;
  city: string;
  dirName: string;
  fields: Record<string, string>;
  photos: string[];
};

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
