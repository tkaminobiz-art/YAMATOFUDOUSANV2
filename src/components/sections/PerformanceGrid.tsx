"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import {
  Wind,
  Shield,
  Award,
  Leaf,
  Frame,
  Fan,
  HardHat,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

/*
  PerformanceGrid — 2026-05-03 (4×2 アイコングリッド・参考画像準拠)
  ---------------------------------------------------------------
  「素材にも、性能にも、妥協しない家づくり。」
  8項目を1画面に俯瞰できるアイコン+1-2行説明グリッド。
  StandardAndQualitySection の "保証タイムライン" 段階を吸収/置換し、
  情報密度を約2倍に。
*/

const FOREST = "#486B00";

type Item = {
  Icon: LucideIcon;
  title: string;
  body: string;
};

const ITEMS: readonly Item[] = [
  {
    Icon: Wind,
    title: "高気密・高断熱",
    body: "一年中、室温が安定。冷暖房効率も上がります。",
  },
  {
    Icon: Shield,
    title: "耐震等級3",
    body: "最高等級の耐震性能。地震に強い構造で建てます。",
  },
  {
    Icon: Award,
    title: "長期優良住宅対応",
    body: "税制優遇やローン優遇が受けられる、国認定の住宅基準。",
  },
  {
    Icon: Leaf,
    title: "自然素材",
    body: "無垢材や漆喰など、体にやさしい素材を選んでいます。",
  },
  {
    Icon: Frame,
    title: "高性能サッシ",
    body: "断熱性の高い窓で、快適性と省エネを両立します。",
  },
  {
    Icon: Fan,
    title: "第一種換気システム",
    body: "きれいな空気を、24時間。",
  },
  {
    Icon: HardHat,
    title: "施工品質",
    body: "自社施工と現場管理で、品質を一定に。",
  },
  {
    Icon: HeartHandshake,
    title: "アフターサポート",
    body: "引き渡し後も、長く点検とサポート。",
  },
];

export default function PerformanceGrid() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-secondary/40 py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <div className="mb-10 md:mb-14 max-w-[760px]">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-3"
            style={{ color: FOREST, fontWeight: 600 }}
          >
            Materials · 素材と性能
          </p>
          <h2
            className="text-text-primary leading-[1.3] tracking-[0.005em]"
            style={{
              fontWeight: 500,
              fontSize: "clamp(22px, 2.6vw, 36px)",
            }}
          >
            素材にも、性能にも、
            <br className="sm:hidden" />
            妥協しない家づくり。
          </h2>
          <p className="mt-4 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[600px]">
            長く快適に暮らせるよう、素材も住宅性能も妥協せずに選んでいます。
          </p>
        </div>

        {/* 4×2 アイコングリッド */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded overflow-hidden">
          {ITEMS.map((item) => {
            const Icon = item.Icon;
            return (
              <li
                key={item.title}
                className="bg-white p-5 md:p-6 lg:p-7 flex flex-col"
              >
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-4"
                  style={{
                    background: "rgba(162, 197, 35, 0.12)",
                    color: FOREST,
                  }}
                >
                  <Icon
                    className="w-5 h-5 md:w-6 md:h-6"
                    strokeWidth={1.5}
                  />
                </span>
                <h3 className="text-text-primary text-[14px] md:text-[15px] font-medium leading-[1.4] mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-[11.5px] md:text-[12.5px] leading-[1.85]">
                  {item.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
