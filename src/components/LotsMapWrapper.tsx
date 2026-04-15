"use client";

import dynamic from "next/dynamic";
import type { Lot, Coord } from "@/data/lots";

/*
  LotsMapWrapper — /lots ページで地図を SSR 無効で読み込むためのラッパー
  Next.js 16: dynamic({ ssr: false }) は Client Component 内でのみ使用可
*/

const LotsMap = dynamic(() => import("./LotsMap"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden border border-border bg-bg-secondary flex items-center justify-center">
      <p className="text-text-secondary text-sm">地図を読み込み中...</p>
    </div>
  ),
});

export default function LotsMapWrapper({
  lots,
}: {
  lots: (Lot & { coord: Coord })[];
}) {
  return <LotsMap lots={lots} />;
}
