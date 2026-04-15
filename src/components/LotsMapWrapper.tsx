import LotsMap from "./LotsMap";
import type { Lot, Coord } from "@/data/lots";

/*
  LotsMapWrapper — 互換用ラッパー。
  LotsMap 自体が useEffect で動的 import するようになったため、
  dynamic({ ssr:false }) のラップは不要。
*/

export default function LotsMapWrapper({
  lots,
}: {
  lots: (Lot & { coord: Coord })[];
}) {
  return <LotsMap lots={lots} />;
}
