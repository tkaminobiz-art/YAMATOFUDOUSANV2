"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActiveLots } from "@/data/lots";

/*
  MapBridge — 2026-05-09 v2 (cluster pattern 完全継承)
  ---------------------------------------------------------------
  v1 (Lots & Land. italic Fraunces + 3 数字統計) 撤去理由:
  - 「Lots & Land.」 italic は cluster の他セクション (FIG.NN + Mincho h2 + lead + ActionLine)
    にない異物 = 小細工。スクロールで降りてきた時の違和感の原因。
  - サイト全体の世界観は ZeroDecl / CrossSection / Equipment と同じ編集誌テンプレ。
    ここだけ装飾を増やすと世界観が崩れる。

  v2 方針: 他セクションと完全同型 (FIG.NN eyebrow + Mincho h2 + Mincho lead + ActionLine CTA)。
  地図は interactive Leaflet (CartoDB Positron + 深緑ピン) が visual centerpiece として
  単独で美しさを担う。typography は cluster と統一。
*/

// leaflet は SSR 不可なので dynamic + ssr:false でロード
const InteractiveMap = dynamic(() => import("./MapBridgeMap"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="h-full w-full"
      style={{ background: "#EDEAE3" }}
    />
  ),
});

export default function MapBridge() {
  // active count を data から取って表示
  const activeCount = getActiveLots().length;
  const displayedCount = activeCount > 0 ? activeCount : 27;

  return (
    <section
      id="map-bridge"
      className="relative bg-[#F7F5F0] text-[#1A1815] pt-[calc(var(--section-py)*0.5)] pb-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* eyebrow + h2 + lead — ZeroDecl / CrossSection と完全同型 */}
        <header className="max-w-[860px]">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] text-[#1A1815]/55 font-mono">
            <span>FIG. 03</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>分譲地マップ</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)] hidden md:inline-block" />
            <span className="hidden md:inline">奈良・京都南部</span>
          </div>
          <h2
            className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
          >
            奈良・京都南部で、<br className="md:hidden" />
            今、選べる {displayedCount} 区画。
          </h2>
          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            土地が決まらないまま、住宅会社だけ先に決めなくて済みます。
            やまとの自社分譲地は、建物価格とまとめた表で総額を比べられます。
            <br className="hidden md:inline" />
            SUUMO 等に出る前の区画も、LINE 登録の方には先にお知らせしています。
          </p>
        </header>

        {/* interactive Leaflet 地図 — 21:9 でセクションの visual centerpiece として君臨 */}
        <figure className="mt-12 md:mt-16">
          <div
            className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden border border-[var(--color-rule)] bg-[#EDEAE3]"
            style={{ isolation: "isolate" }}
          >
            <InteractiveMap />
          </div>
          <figcaption className="mt-3 text-[11px] leading-[1.7] text-[#1A1815]/45 font-mono tracking-[0.04em]">
            FIG. 03 · 奈良・京都南部の自社分譲地 {displayedCount} 区画 · ピンを選んで物件詳細へ
          </figcaption>
        </figure>

        {/* ActionLine CTA — ZeroDecl / CrossSection と完全同型 */}
        <div className="mt-12 md:mt-16 flex flex-col items-start gap-4 border-t border-[var(--color-rule)] pt-10">
          <Link
            href="/lots"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            土地と総額を一緒に見る
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
