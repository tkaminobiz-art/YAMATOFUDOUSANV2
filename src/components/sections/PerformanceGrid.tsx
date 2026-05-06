"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import {
  // 性能アイコン
  Wind,
  Shield,
  Award,
  Leaf,
  Frame,
  Fan,
  HardHat,
  HeartHandshake,
  // 設備アイコン
  ChefHat,
  Bath,
  Droplet,
  DoorOpen,
  Layers,
  RectangleHorizontal,
  Zap,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

/*
  PerformanceGrid — 2026-05-04 v2 (設備+性能の統合グリッド)
  ---------------------------------------------------------------
  v1: 性能8項目のみ
  v2: 重複していた MechanismEnhanced 内の StandardChips を統合。
      設備グループ(8)+ 性能グループ(8)の二段構造に。
      見出し「この価格で、ここまで標準。」で1セクションにまとめる。

  ユーザー指摘(2026-05-04):
  - MechanismEnhanced 内のStandardChips と PerformanceGrid が重複
  - 「断熱・耐震・サッシ」が両方に出ていた
  → 設備系を上、性能系を下に分けて1セクションに集約。
*/

const FOREST = "#486B00";

type Item = {
  Icon: LucideIcon;
  title: string;
  body: string;
};

// 設備グループ — 毎日の暮らしに直結する標準装備
const FACILITY_ITEMS: readonly Item[] = [
  {
    Icon: ChefHat,
    title: "キッチン",
    body: "毎日の家事がしやすい使いやすさと収納力。",
  },
  {
    Icon: Bath,
    title: "浴室",
    body: "くつろぎやすさと、掃除のしやすさ。",
  },
  {
    Icon: Droplet,
    title: "洗面・トイレ",
    body: "収納力と清掃性を考えた設備。",
  },
  {
    Icon: DoorOpen,
    title: "玄関ドア",
    body: "断熱と防犯に配慮した、ご家族の顔となるドア。",
  },
  {
    Icon: Layers,
    title: "床材",
    body: "傷や汚れが目立ちにくく、素足でも心地いい。",
  },
  {
    Icon: RectangleHorizontal,
    title: "室内ドア",
    body: "天井まで伸びるハイドアで、部屋を広く見せる。",
  },
  {
    Icon: Zap,
    title: "制震装置",
    body: "繰り返す揺れから、家の骨組みを守ります。",
  },
  {
    Icon: Lightbulb,
    title: "LED照明",
    body: "電気代と交換の手間を、長く抑えます。",
  },
];

// 性能グループ — 構造的な安心と長く住める家の土台
const PERFORMANCE_ITEMS: readonly Item[] = [
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

function ItemCard({ item }: { item: Item }) {
  const Icon = item.Icon;
  return (
    <li className="scroll-in bg-white p-5 md:p-6 lg:p-7 flex flex-col">
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-4"
        style={{
          background: "rgba(162, 197, 35, 0.12)",
          color: FOREST,
        }}
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
      </span>
      <h3 className="text-text-primary text-[14px] md:text-[15px] font-medium leading-[1.4] mb-2">
        {item.title}
      </h3>
      <p className="text-text-secondary text-[11.5px] md:text-[12.5px] leading-[1.85]">
        {item.body}
      </p>
    </li>
  );
}

export default function PerformanceGrid() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="relative overflow-hidden bg-bg-secondary/40 py-[var(--section-py)]">
      {/* === 装飾: 図面線グリッド + 上部の暖色グラデーション === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #486B00 1px, transparent 1px), linear-gradient(to bottom, #486B00 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(162,197,35,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="relative max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <div className="mb-10 md:mb-14 max-w-[860px]">
          <p
            className="text-[11px] md:text-[12px] tracking-[0.06em] mb-3"
            style={{ color: FOREST, fontWeight: 700 }}
          >
            標準装備
          </p>
          <h2
            className="text-text-primary leading-[1.3] tracking-[0.005em]"
            style={{
              fontWeight: 500,
              fontSize: "clamp(22px, 2.6vw, 36px)",
            }}
          >
            この価格で、ここまで標準。
          </h2>
          <p className="mt-4 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[640px]">
            設備も、性能も。標準装備で、ここまで整えています。
            毎日の使いやすさと、長く住める家の土台、両方を価格に含めています。
          </p>
        </div>

        {/* === 設備グループ === */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5 md:mb-6">
            <p className="font-sans font-bold text-text-primary text-[14px] md:text-[16px]">
              設備の標準
            </p>
            <p className="font-sans text-text-secondary text-[11px] md:text-[12px]">
              クリナップ・TOTO・YKK AP・ニチハ ほか、国内大手メーカー品を採用
            </p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded overflow-hidden">
            {FACILITY_ITEMS.map((item) => (
              <ItemCard key={item.title} item={item} />
            ))}
          </ul>
        </div>

        {/* === 性能グループ === */}
        <div>
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5 md:mb-6">
            <p className="font-sans font-bold text-text-primary text-[14px] md:text-[16px]">
              性能の標準
            </p>
            <p className="font-sans text-text-secondary text-[11px] md:text-[12px]">
              高断熱・耐震等級3・長期優良住宅対応で、長く住める家を
            </p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded overflow-hidden">
            {PERFORMANCE_ITEMS.map((item) => (
              <ItemCard key={item.title} item={item} />
            ))}
          </ul>
        </div>

        <p className="font-sans text-text-secondary text-[11px] md:text-[12px] mt-8 leading-[1.85]">
          ※ 仕様・メーカーはプランや時期により変更となる場合があります。詳細はご来場時にご案内します。
        </p>
      </div>
    </section>
  );
}
