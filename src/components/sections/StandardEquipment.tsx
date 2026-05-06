"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import {
  Home,
  Wind,
  Shield,
  Award,
  Fan,
  Leaf,
  HeartHandshake,
  RectangleHorizontal,
  Building2,
  HardHat,
  ShowerHead,
  Lightbulb,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/*
  StandardEquipment v2 — 2026-05-06 (Bento + 性能ピル統合)
  ---------------------------------------------------------------
  design-critic 2026-05-06 指摘#2「標準装備が2回出て、構成が重い」への対応。
  v1(8カード均等配置)+ PerformanceGrid(16アイコン)の重複を1セクションに統合。

  構成:
    1. Bento (大1+中2): キッチン主役 / 浴室・断熱を従に
    2. 設備チップ行 (小4): 外壁・MIRAIE・構造・洗面・照明
    3. 性能ピル行 (6): 耐震等級3・高気密高断熱・長期優良・第一種換気・自然素材・アフター
       (PerformanceGrid から吸収)
    4. CTA: モデルハウス見学

  page.tsx から PerformanceGrid を撤去すること(同コミット内で対応)。
*/

const FOREST = "#486B00";

type ChipItem = { Icon: LucideIcon; label: string };

const FACILITY_CHIPS: readonly ChipItem[] = [
  { Icon: RectangleHorizontal, label: "外壁材" },
  { Icon: Building2, label: "制震ダンパー MIRAIE" },
  { Icon: HardHat, label: "構造・防蟻対策" },
  { Icon: ShowerHead, label: "洗面・トイレ" },
  { Icon: Lightbulb, label: "オール電化・照明" },
];

const PERFORMANCE_PILLS: readonly { label: string; sub?: string }[] = [
  { label: "耐震等級3", sub: "最高等級" },
  { label: "高気密・高断熱" },
  { label: "長期優良住宅対応" },
  { label: "第一種換気システム" },
  { label: "自然素材を選択可" },
  { label: "アフターサポート" },
];

const PERFORMANCE_ICONS: Record<string, LucideIcon> = {
  "耐震等級3": Shield,
  "高気密・高断熱": Wind,
  "長期優良住宅対応": Award,
  "第一種換気システム": Fan,
  "自然素材を選択可": Leaf,
  "アフターサポート": HeartHandshake,
};

export default function StandardEquipment() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-white py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ===== ヘッダー ===== */}
        <div className="relative mb-10 md:mb-14 max-w-[860px]">
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
              fontSize: "clamp(22px, 2.8vw, 38px)",
            }}
          >
            この価格で、ここまで標準。
          </h2>
          <p className="mt-4 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[680px]">
            毎日使う設備から、見えない部分の性能まで。
            住んでからの快適さを支える項目を、価格に含めています。
          </p>
        </div>

        {/* ===== Bento グリッド ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4 auto-rows-[minmax(220px,auto)]">
          {/* キッチン (大: 左 col-span-2 row-span-2) */}
          <article className="group relative md:col-span-2 md:row-span-2 overflow-hidden rounded-[10px] bg-text-primary min-h-[320px] md:min-h-[480px]">
            <Image
              src="/images/standard/facility_img_01.webp"
              alt="やまと不動産の標準仕様 — キッチン・カップボード"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent pointer-events-none"
            />
            <div className="absolute left-5 right-5 bottom-5 md:left-7 md:right-7 md:bottom-7 z-10 text-white">
              <p className="font-sans text-[11px] md:text-[12px] tracking-[0.06em] text-white/80 mb-2 font-bold">
                キッチン・カップボード
              </p>
              <h3
                className="font-sans leading-[1.4] mb-2"
                style={{
                  fontSize: "clamp(20px, 2.2vw, 30px)",
                  fontWeight: 600,
                  textShadow: "0 2px 14px rgba(0,0,0,0.5)",
                }}
              >
                毎日の家事を、丁寧に。
              </h3>
              <p className="text-white/85 text-[12px] md:text-[13px] leading-[1.85] max-w-[460px]">
                使いやすさと収納力に配慮したシステムキッチンを標準で。
                カップボードもセットで含みます。
              </p>
            </div>
          </article>

          {/* 浴室 (中: 右上) */}
          <article className="group relative overflow-hidden rounded-[10px] bg-text-primary min-h-[220px]">
            <Image
              src="/images/standard/facility_img_02.webp"
              alt="やまと不動産の標準仕様 — システムバス"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
            />
            <div className="absolute left-5 right-5 bottom-4 z-10 text-white">
              <p className="text-[11px] tracking-[0.06em] text-white/80 mb-1 font-bold">
                システムバス
              </p>
              <h4 className="text-[15px] md:text-[17px] font-medium leading-[1.4]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
                ゆったり、くつろげる浴室。
              </h4>
            </div>
          </article>

          {/* 断熱 (中: 右下) */}
          <article className="group relative overflow-hidden rounded-[10px] bg-text-primary min-h-[220px]">
            <Image
              src="/images/standard/facility_img_06.webp"
              alt="やまと不動産の標準仕様 — サッシ・断熱材"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
            />
            <div className="absolute left-5 right-5 bottom-4 z-10 text-white">
              <p className="text-[11px] tracking-[0.06em] text-white/80 mb-1 font-bold">
                サッシ・断熱材
              </p>
              <h4 className="text-[15px] md:text-[17px] font-medium leading-[1.4]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
                夏は涼しく、冬は暖かく。
              </h4>
            </div>
          </article>
        </div>

        {/* ===== 設備チップ行(小5) ===== */}
        <ul className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
          {FACILITY_CHIPS.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 px-4 py-3.5 bg-bg-secondary/60 border border-border rounded-[8px] transition-colors hover:border-main"
            >
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                style={{ background: "rgba(162,197,35,0.16)", color: FOREST }}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <span className="text-text-primary text-[12px] md:text-[13px] font-medium leading-[1.35]">
                {label}
              </span>
            </li>
          ))}
        </ul>

        {/* ===== 性能ピル行(PerformanceGrid 吸収) ===== */}
        <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-border">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4 md:mb-5">
            <p className="font-sans font-bold text-text-primary text-[14px] md:text-[16px]">
              見えない部分の標準
            </p>
            <p className="font-sans text-text-secondary text-[11px] md:text-[12px]">
              長く住める家の土台も、標準仕様の中に。
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 md:gap-2.5">
            {PERFORMANCE_PILLS.map(({ label, sub }) => {
              const Icon = PERFORMANCE_ICONS[label];
              return (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] md:text-[13px]"
                  style={{
                    background: "rgba(72,107,0,0.06)",
                    color: FOREST,
                    border: "1px solid rgba(72,107,0,0.18)",
                  }}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.6} />}
                  <span className="font-medium">{label}</span>
                  {sub && (
                    <span className="text-text-secondary text-[10px] md:text-[11px] ml-0.5">
                      {sub}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ===== CTA ストリップ ===== */}
        <div
          className="mt-8 md:mt-12 rounded-[10px] px-5 sm:px-7 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "rgba(245,238,226,0.6)",
            border: "1px solid rgba(245,238,226,1)",
          }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-main shrink-0" strokeWidth={1.5} />
            <p className="text-text-primary text-[13px] sm:text-[14.5px] leading-[1.7]">
              実物の質感や使い勝手は、モデルハウスでご確認いただけます。
            </p>
          </div>
          <Link
            href="/reserve"
            className="inline-flex items-center gap-2 bg-text-primary text-white rounded-full px-6 py-3 text-[13px] sm:text-[14px] font-medium hover:bg-main transition-colors whitespace-nowrap shrink-0"
          >
            モデルハウス見学を予約する
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>

        <p className="mt-5 text-text-secondary text-[11px] md:text-[12px] leading-[1.85]">
          ※ 仕様・メーカーはプランや時期により変更となる場合があります。詳細はご来場時にご案内します。
        </p>
      </div>
    </section>
  );
}
