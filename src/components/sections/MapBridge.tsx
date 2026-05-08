"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActiveLots } from "@/data/lots";

/*
  MapBridge — 2026-05-09 v1
  ---------------------------------------------------------------
  ZeroDeclaration (FIG.02) の直下に置く、物件情報ページへのおしゃれな動線セクション。
  ARM (arm-a.com) の Model House セクションをオマージュ:
    - ARM ライクな grayscale tile (CartoDB Positron)
    - 細身ピン (深緑 #143426 + 白枠の小円)
    - 大きな italic serif (Fraunces) で英字 section marker
    - Mincho 明朝 で日本語見出し
    - 編集誌的な余白とリズム

  撤去:
    - MiniSimulator (かんたん試算) — TOP からは外し、/money で詳細対応
    - LotsSection (対応エリア) — 内容は /lots で詳細対応、ここはおしゃれな入口

  関連 memory: project_yamato_lots_data (矢田町・全76区画・最安500万円台〜)
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

const STATS = [
  { num: "27", unit: "区画", label: "公開中" },
  { num: "90", unit: "区画", label: "累計分譲実績" },
  { num: "12", unit: "エリア", label: "主な対応" },
] as const;

export default function MapBridge() {
  // active count を data から取って 27 と差分があれば動的に表示
  const activeCount = getActiveLots().length;
  const displayedCount = activeCount > 0 ? activeCount : 27;

  return (
    <section
      id="map-bridge"
      className="relative bg-[#F7F5F0] text-[#1A1815] py-[var(--section-py)]"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ヘッダー: ARM 風 italic serif + Mincho 明朝 */}
        <header className="mb-12 md:mb-16 max-w-[920px]">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono mb-6">
            <span>Map</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>奈良 · 京都南部</span>
          </div>

          {/* 大きな italic serif (Fraunces) — ARM の Model House / Examples オマージュ */}
          <p
            className="font-[var(--font-fraunces)] italic text-[#1A1815] leading-[0.95] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(48px, 7.2vw, 116px)",
              fontWeight: 300,
            }}
          >
            Lots &amp; Land.
          </p>

          {/* 明朝サブ見出し */}
          <h2
            className="mt-7 md:mt-9 font-zen-old text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(20px, 2.4vw, 32px)", fontWeight: 500 }}
          >
            <span className="font-[var(--font-oswald)] tabular-nums text-[1.4em] mr-1.5 align-baseline">
              {displayedCount}
            </span>
            区画 公開中。
            <br className="md:hidden" />
            奈良・京都南部、地域を知り尽くした家づくり。
          </h2>

          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            自社で土地を仕入れ、自社で分譲します。
            土地探しから建物まで、まとめてご相談ください。
          </p>
        </header>

        {/* 大きなマップステージ — 21:9 で広がりを出す */}
        <figure className="relative">
          <div
            className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden border border-[var(--color-rule)] bg-[#EDEAE3]"
            style={{ isolation: "isolate" }}
          >
            <InteractiveMap />
          </div>
          <figcaption className="mt-3 text-[11px] leading-[1.7] text-[#1A1815]/45 font-mono tracking-[0.04em]">
            MAP · {displayedCount} active lots in Nara / South Kyoto · Tap pins
            to focus / 詳細は次頁にて
          </figcaption>
        </figure>

        {/* 下段: 数字 3 つ + CTA — エディトリアルなフッターライン */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-12 gap-y-10 items-end border-t border-[var(--color-rule)] pt-10">
          <dl className="grid grid-cols-3 gap-x-6 md:gap-x-12 gap-y-2 max-w-[640px]">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="text-[10.5px] tracking-[0.18em] uppercase text-[#1A1815]/55 font-mono mb-2">
                  {s.label}
                </dt>
                <dd>
                  <span
                    className="font-[var(--font-oswald)] tabular-nums text-[#1A1815]"
                    style={{
                      fontSize: "clamp(36px, 4.4vw, 64px)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.95,
                    }}
                  >
                    {s.num}
                  </span>
                  <span className="ml-1.5 text-[12px] md:text-[13px] text-[#1A1815]/70 font-zen-old">
                    {s.unit}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/lots"
            className="group inline-flex items-center gap-3 self-start lg:self-end whitespace-nowrap text-[14px] md:text-[16px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1.5 transition-colors"
          >
            物件情報を見る
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
