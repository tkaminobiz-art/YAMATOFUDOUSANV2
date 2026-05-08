"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Wrench,
  Layers,
  Handshake,
  PencilRuler,
  Calculator,
  Sprout,
  FileText,
  Fence,
  Sofa,
  MessageCircle,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";
import BlueprintMorphVideo from "./BlueprintMorphVideo";

/*
  StandardComparisonBlueprint — 2026-05-08
  ---------------------------------------------------------------
  「価格だけでなく、標準仕様まで比べてください。」セクションの再設計版。
  建築図面エディトリアル(W2 系)で、立面図・ink-line house illustration を
  軸に、大手 4,000万円 と やまと京モデル 2,280万円 を横並びで比較。
  含まれるもの 6 項目 / 別途となるもの 4 項目を二大カードで提示し、
  下部に LINE / 来場 / カタログの 3 アクションを集約する。

  画像は Higgsfield Nano Banana Pro で生成済(public/images/sections/):
    - blueprint-elevation.png   立面図(右上のメインビジュアル)
    - house-generic.webp         大手プレースホルダー(generic builder elevation, ink line)
    - house-yamato.webp          やまと左京モデル(PDF 立面図ベース, ink line)
    - catalog-booklet.png        無料カタログのサムネ
*/

const INK = "#1D1D18";
const CREAM = "#F7F4EC";
const DEEP_GREEN = "#2F4A2C";
const RULE = "rgba(28,27,24,0.16)";
const RULE_FAINT = "rgba(28,27,24,0.08)";

type IconKind =
  | "house"
  | "tools"
  | "ground"
  | "shake"
  | "design"
  | "tax"
  | "land"
  | "doc"
  | "fence"
  | "sofa";

const ICON_MAP = {
  house: Building2,
  tools: Wrench,
  ground: Layers,
  shake: Handshake,
  design: PencilRuler,
  tax: Calculator,
  land: Sprout,
  doc: FileText,
  fence: Fence,
  sofa: Sofa,
} as const satisfies Record<IconKind, LucideIcon>;

type IncludedItem = {
  icon: IconKind;
  title: string;
  desc: string;
  badge?: string;
};

const INCLUDED: readonly IncludedItem[] = [
  {
    icon: "house",
    title: "建物本体",
    desc: "構造・断熱・外装・内装すべて含みます",
  },
  {
    icon: "tools",
    title: "標準付帯工事",
    desc: "屋内給排水・電気工事・ガス工事など",
  },
  {
    icon: "ground",
    title: "地盤改良費",
    desc: "当社負担分まで含みます",
    badge: "最大150万円まで",
  },
  {
    icon: "shake",
    title: "仲介手数料",
    desc: "当社分譲地の場合",
  },
  {
    icon: "design",
    title: "設計・申請費用",
    desc: "確認申請・各種申請費用を含みます",
  },
  {
    icon: "tax",
    title: "消費税",
    desc: "建物本体・付帯工事にかかる消費税",
  },
] as const;

const EXCLUDED: readonly { icon: IconKind; title: string; desc: string }[] = [
  {
    icon: "land",
    title: "土地代",
    desc: "土地の購入費用",
  },
  {
    icon: "doc",
    title: "登記費用・印紙税・ローン手数料",
    desc: "各種登記・住宅ローン関連費用",
  },
  {
    icon: "fence",
    title: "外構工事",
    desc: "カーポート・フェンス・庭など",
  },
  {
    icon: "sofa",
    title: "引越し費用・家具家電",
    desc: "お引越し・家具・家電の購入費用",
  },
] as const;

// ────────────────────────────────────────────────
// 数字の遅延カウントアップ(視認に入ったら 0 → target)
// ────────────────────────────────────────────────
function useCountUp<T extends HTMLElement = HTMLDivElement>(target: number, durationMs = 1200) {
  const ref = useRef<T | null>(null);
  // SSR/初期表示は target を直接表示し、ハイドレーション後に reduced-motion を満たさない
  // 場合のみ 0 から再開してアニメさせる(setState-in-effect 警告回避)。
  const [value, setValue] = useState<number>(target);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setValue(0);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);
  return [ref, value] as const;
}

// ────────────────────────────────────────────────
// 罫線・寸法ティック
// ────────────────────────────────────────────────
function RulerEdge({ position }: { position: "top" | "bottom" }) {
  // 細かい刻みを SVG で描画(architectural tick)
  return (
    <div
      aria-hidden
      className={`absolute left-0 right-0 ${position === "top" ? "top-0" : "bottom-0"} h-[14px] overflow-hidden`}
      style={{ color: "rgba(28,27,24,0.30)" }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 14"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* main rule */}
        <line
          x1="0"
          y1={position === "top" ? "13" : "1"}
          x2="1000"
          y2={position === "top" ? "13" : "1"}
          stroke="currentColor"
          strokeWidth="0.5"
        />
        {/* ticks every 10 units */}
        {Array.from({ length: 100 }, (_, i) => i * 10).map((x) => (
          <line
            key={x}
            x1={x}
            y1={position === "top" ? "13" : "1"}
            x2={x}
            y2={position === "top" ? (x % 50 === 0 ? "5" : "9") : x % 50 === 0 ? "9" : "5"}
            stroke="currentColor"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────
// 寸法ライン(両端 ┤├ + 中央ラベル) — 建築図面の寸法アロー風
// ────────────────────────────────────────────────
function DimTick({ color }: { color: string }) {
  return (
    <svg
      width="6"
      height="11"
      viewBox="0 0 6 11"
      aria-hidden
      style={{ flexShrink: 0, color }}
    >
      <line x1="3" y1="0" x2="3" y2="11" stroke="currentColor" strokeWidth="0.7" />
      <line x1="0" y1="5.5" x2="6" y2="5.5" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

function DimensionRule({
  label,
  color = "rgba(28,27,24,0.42)",
  className = "",
}: {
  label: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 md:gap-3 font-inter text-[10px] md:text-[10.5px] tracking-[0.18em] uppercase font-semibold ${className}`}
      style={{ color }}
    >
      <DimTick color={color} />
      <span aria-hidden className="flex-1 h-px" style={{ background: color, opacity: 0.7 }} />
      <span className="px-1 whitespace-nowrap">{label}</span>
      <span aria-hidden className="flex-1 h-px" style={{ background: color, opacity: 0.7 }} />
      <DimTick color={color} />
    </div>
  );
}

// ────────────────────────────────────────────────
// メイン
// ────────────────────────────────────────────────
export default function StandardComparisonBlueprint() {
  const [diffRef, diff] = useCountUp<HTMLDivElement>(1720);
  const [yamatoRef, yamato] = useCountUp<HTMLSpanElement>(2280);
  const [otherRef, other] = useCountUp<HTMLSpanElement>(4000);

  return (
    <section
      id="comparison"
      aria-labelledby="comparison-heading"
      className="relative scroll-mt-20 md:scroll-mt-24 py-[var(--section-py)] overflow-hidden"
      style={{ background: CREAM, color: INK }}
    >
      {/* 上下の建築ルーラー */}
      <RulerEdge position="top" />
      <RulerEdge position="bottom" />

      {/* 左サイドの 01 / COMPARISON 縦書きマーク (PC のみ) */}
      <div
        aria-hidden
        className="hidden lg:flex absolute top-0 left-0 h-full w-[var(--page-px)] items-stretch justify-center pointer-events-none"
      >
        <div className="flex flex-col items-center justify-between py-12">
          <span
            className="font-inter text-[11px] tracking-[0.3em]"
            style={{ color: "rgba(28,27,24,0.45)" }}
          >
            01
          </span>
          <span
            className="font-inter text-[10px] tracking-[0.45em] uppercase"
            style={{
              color: "rgba(28,27,24,0.35)",
              writingMode: "vertical-rl",
            }}
          >
            COMPARISON
          </span>
          <span
            className="font-inter text-[10px] tracking-[0.3em]"
            style={{ color: "rgba(28,27,24,0.35)" }}
          >
            01
          </span>
        </div>
      </div>

      <div className="relative max-w-[1340px] mx-auto px-[var(--page-px)]">
        {/* ============ 1. ヘッダー: 見出し + 立面図 ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 md:gap-12 lg:gap-16 items-start">
          {/* 左: 見出しとボディ */}
          <header className="lg:pt-2">
            <p
              className="font-inter text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-semibold mb-5 md:mb-7"
              style={{ color: "rgba(28,27,24,0.55)" }}
            >
              <span className="mr-3" style={{ color: "rgba(28,27,24,0.35)" }}>
                01
              </span>
              Price &amp; Standard Comparison
            </p>
            <h2
              id="comparison-heading"
              className="font-zen-old text-[clamp(28px,4.4vw,56px)] leading-[1.32] tracking-[0.02em]"
              style={{ color: INK, fontWeight: 700 }}
            >
              価格だけでなく、
              <br />
              標準仕様まで比べてください。
            </h2>
            <p
              className="mt-6 md:mt-8 font-murecho text-[14px] md:text-[15.5px] leading-[2.0]"
              style={{ color: "rgba(28,27,24,0.78)" }}
            >
              キッチン・浴室・窓・外壁・断熱・耐震性能まで、
              <br className="hidden md:block" />
              暮らしの快適さと安心に関わる部分を、標準仕様として大切にしています。
            </p>
            <p
              className="mt-4 md:mt-5 font-murecho text-[14px] md:text-[15.5px] leading-[2.0]"
              style={{ color: "rgba(28,27,24,0.78)" }}
            >
              見直しているのは、家そのものではなく、
              <br className="hidden md:block" />
              <span className="font-bold" style={{ color: INK }}>
                広告費・展示場維持費・中間コストです。
              </span>
            </p>

            {/* 比較条件チップ */}
            <dl
              className="mt-8 md:mt-10 inline-flex flex-wrap items-center gap-2 md:gap-3 font-inter text-[11px] md:text-[12px]"
              style={{ color: "rgba(28,27,24,0.7)" }}
            >
              <dt className="font-bold tracking-[0.04em]" aria-label="比較条件">
                <span aria-hidden className="mr-1.5">▼</span>比較条件
              </dt>
              <dd
                className="px-3 py-1.5 font-bold tracking-[0.04em]"
                style={{ background: "rgba(28,27,24,0.05)", borderRadius: 2 }}
              >
                30坪・4LDK
              </dd>
              <dd
                className="px-3 py-1.5 font-bold tracking-[0.04em]"
                style={{ background: "rgba(28,27,24,0.05)", borderRadius: 2 }}
              >
                建物本体＋標準付帯工事
              </dd>
            </dl>
          </header>

          {/* 右: 立面図 → 3D ビジュアライズの morph 動画
              poster は静止 PNG、視認時のみ再生、reduced-motion 時は静止画のみ
              lg+ では eyebrow + 見出し1行目分を pt で押し下げ、見出し2行目
              「標準仕様まで〜」と動画の上端を揃える(eyebrow ≈ 44px + 1行目 ≈ 80px) */}
          <figure className="relative lg:-mr-2 xl:-mr-4 lg:pt-[clamp(100px,8.5vw,132px)]">
            <BlueprintMorphVideo
              videoSrc="/videos/blueprint-to-render.mp4"
              posterSrc="/images/sections/blueprint-elevation.webp"
              alt="やまと不動産・左京モデルの設計図から完成までを見る — 立面図のモーフ動画"
            />
            <figcaption
              className="mt-2 font-inter text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-right"
              style={{ color: "rgba(28,27,24,0.4)" }}
            >
              South Elevation — Sakyo Model · Design to Build
            </figcaption>
          </figure>
        </div>

        {/* ============ 2. 比較バー: 大手 vs やまと vs 差額 ============
            旧: やまと列が bg + border のパネル(card 気味)
            新: 全 3 列を「左罫線 + FIG ラベル + 寸法ティック」の建築 marginalia に統一。
                やまと列だけ罫線を 3px の deep-green にしてヒエラルキを担保する。
        */}
        <div className="mt-14 md:mt-20">
          {/* 寸法ベンチマーク(全比較行の上に張る) */}
          <DimensionRule
            className="mb-8 md:mb-10"
            label="Benchmark · 30坪 / 4LDK · 建物本体 + 標準付帯工事"
          />

          <div
            ref={diffRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_minmax(200px,0.95fr)] gap-y-10 md:gap-x-8 lg:gap-x-10 items-stretch"
          >
            {/* 大手 — REF.01 (薄いグレーレール) */}
            <article
              className="relative pt-1 md:pl-5 lg:pl-6"
              style={{ borderLeft: `1px solid rgba(28,27,24,0.18)` }}
            >
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span
                  className="font-inter font-semibold tracking-[0.32em] uppercase text-[10px] md:text-[10.5px]"
                  style={{ color: "rgba(28,27,24,0.55)" }}
                >
                  Ref. 01
                </span>
                <span aria-hidden className="w-3 h-px" style={{ background: "rgba(28,27,24,0.3)" }} />
                <span
                  className="font-murecho font-bold tracking-[0.02em] text-[12px] md:text-[12.5px]"
                  style={{ color: "rgba(28,27,24,0.65)" }}
                >
                  大手ハウスメーカー
                </span>
              </div>
              <p
                className="font-murecho text-[11px] md:text-[11.5px] tracking-[0.04em] mb-3"
                style={{ color: "rgba(28,27,24,0.55)" }}
              >
                参考価格
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span ref={otherRef} className="sr-only" />
                <span
                  className="font-oswald tabular-nums leading-[0.85]"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(40px,5.5vw,72px)",
                    color: "rgba(28,27,24,0.55)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {other.toLocaleString()}
                </span>
                <span
                  className="font-murecho font-medium pb-1.5"
                  style={{ color: "rgba(28,27,24,0.6)", fontSize: "clamp(13px,1.1vw,16px)" }}
                >
                  万円〜
                </span>
              </div>
              <div className="relative aspect-square w-full max-w-[260px]">
                <Image
                  src="/images/sections/house-generic.webp"
                  alt="大手ハウスメーカーの参考立面イメージ — 没個性な総二階の建売タイプ"
                  fill
                  sizes="(max-width: 768px) 60vw, 240px"
                  className="object-contain"
                />
              </div>
              <p
                className="mt-3 font-murecho text-[10.5px] md:text-[11px] leading-[1.7]"
                style={{ color: "rgba(28,27,24,0.5)" }}
              >
                ※ 大手ハウスメーカーの坪単価をもとにした参考価格です。
              </p>
            </article>

            {/* VS 区切り */}
            <div className="hidden lg:flex items-center justify-center">
              <span
                className="font-inter font-light text-[18px] tracking-[0.2em]"
                style={{ color: "rgba(28,27,24,0.4)" }}
              >
                VS
              </span>
            </div>

            {/* やまと京モデル — FIG.── (3px deep-green レール、主役) */}
            <article
              className="relative pt-1 md:pl-5 lg:pl-6"
              style={{ borderLeft: `3px solid ${DEEP_GREEN}` }}
            >
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span
                  className="font-inter font-semibold tracking-[0.32em] uppercase text-[10px] md:text-[10.5px]"
                  style={{ color: DEEP_GREEN }}
                >
                  Fig.
                </span>
                <span aria-hidden className="w-3 h-px" style={{ background: DEEP_GREEN, opacity: 0.5 }} />
                <span
                  className="font-murecho font-bold tracking-[0.02em] text-[12px] md:text-[12.5px]"
                  style={{ color: DEEP_GREEN }}
                >
                  やまと不動産・京モデル
                </span>
              </div>
              <p
                className="font-murecho font-bold text-[11px] md:text-[11.5px] tracking-[0.04em] mb-3"
                style={{ color: DEEP_GREEN }}
              >
                建物本体 ＋ 標準付帯工事 込み・税込
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span ref={yamatoRef} className="sr-only" />
                <span
                  className="font-oswald tabular-nums leading-[0.85]"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(48px,6.4vw,84px)",
                    color: DEEP_GREEN,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {yamato.toLocaleString()}
                </span>
                <span
                  className="font-murecho font-bold pb-1.5"
                  style={{ color: DEEP_GREEN, fontSize: "clamp(13px,1.2vw,17px)" }}
                >
                  万円〜
                </span>
              </div>
              <div className="relative aspect-square w-full max-w-[260px]">
                <Image
                  src="/images/sections/house-yamato.webp"
                  alt="やまと不動産・京モデルの立面イメージ — 左京モデル南側立面図ベース"
                  fill
                  sizes="(max-width: 768px) 60vw, 240px"
                  className="object-contain"
                />
              </div>
              <p
                className="mt-3 font-murecho text-[10.5px] md:text-[11px] leading-[1.7]"
                style={{ color: "rgba(28,27,24,0.55)" }}
              >
                ※ 京モデル30坪・4LDKの目安です。仕様・敷地により異なります。
              </p>
            </article>

            {/* = 区切り */}
            <div className="hidden lg:flex items-center justify-center">
              <span
                className="font-inter font-light text-[18px]"
                style={{ color: "rgba(28,27,24,0.4)" }}
              >
                =
              </span>
            </div>

            {/* 参考差額 — Δ (1px dashed レール) */}
            <article
              className="relative pt-1 md:col-span-2 md:pl-5 lg:col-span-1 lg:pl-6"
              style={{ borderLeft: "1px dashed rgba(28,27,24,0.30)" }}
            >
              <div className="md:flex md:items-center md:justify-between md:gap-10 lg:block lg:gap-0">
                <div className="md:shrink-0">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <span
                      aria-hidden
                      className="font-inter font-semibold text-[12px] md:text-[12.5px]"
                      style={{ color: "rgba(28,27,24,0.7)" }}
                    >
                      Δ
                    </span>
                    <span aria-hidden className="w-3 h-px" style={{ background: "rgba(28,27,24,0.3)" }} />
                    <span
                      className="font-fraunces italic text-[14px] md:text-[15px] tracking-[0.01em]"
                      style={{
                        color: "rgba(28,27,24,0.7)",
                        fontWeight: 400,
                        fontVariationSettings: "'opsz' 144",
                      }}
                    >
                      Difference
                    </span>
                  </div>
                  <p
                    className="font-murecho text-[11px] md:text-[11.5px] tracking-[0.04em] mb-3"
                    style={{ color: "rgba(28,27,24,0.6)" }}
                  >
                    参考差額
                  </p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="font-murecho font-bold pb-2"
                      style={{ color: INK, fontSize: "clamp(13px,1.1vw,16px)" }}
                    >
                      約
                    </span>
                    <span
                      className="font-oswald tabular-nums leading-[0.82]"
                      style={{
                        fontWeight: 400,
                        fontSize: "clamp(56px,7.4vw,108px)",
                        color: INK,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {diff.toLocaleString()}
                    </span>
                    <span
                      className="font-murecho font-bold pb-2"
                      style={{ color: INK, fontSize: "clamp(14px,1.2vw,18px)" }}
                    >
                      万円
                    </span>
                  </div>
                </div>

                <div className="md:flex-1 md:min-w-0">
                  <div
                    className="mt-3 md:mt-0 h-[1px] w-full"
                    style={{ background: "rgba(47,74,44,0.4)" }}
                  />
                  <p
                    className="mt-3 font-murecho text-[10.5px] md:text-[11px] leading-[1.7]"
                    style={{ color: "rgba(28,27,24,0.55)" }}
                  >
                    同条件30坪・4LDKでの当社試算による参考差額です。
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* 寸法サマリ(下) — 4,000 - 2,280 = 1,720 を建築寸法風に */}
          <DimensionRule
            className="mt-10 md:mt-12 hidden lg:flex"
            color={DEEP_GREEN}
            label={
              <>
                4,000 万円 <span className="mx-1.5 opacity-60">−</span> 2,280 万円{" "}
                <span className="mx-1.5 opacity-60">=</span>{" "}
                <span className="text-[12px] tracking-[0.16em]">
                  Δ 1,720 万円
                </span>
              </>
            }
          />
        </div>

        {/* ============ 3. 含まれるもの / 別途となるもの — 建築ノーテーション ============
            旧: 緑/サンドヘッダ + bg-white カードの二段重ね(Tailwind の card 量産で AI 臭が抜けない)
            新: カード矩形を撤廃 → FIG.01 / FIG.02 の細罫線見出し + 番号レール + 破線セパレータで
                上の立面図と同じ「建築図面 marginalia」の世界観に統一する。
        */}
        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] gap-x-8 lg:gap-x-14 gap-y-14 md:gap-y-0">
            {/* ─── 列 1: 含まれるもの ─── */}
            <section aria-labelledby="fig-01-included" className="md:pr-2">
              <header
                className="flex items-center gap-3 md:gap-4 pb-3"
                style={{ borderBottom: `1px solid rgba(47,74,44,0.45)` }}
              >
                <DimTick color={DEEP_GREEN} />
                <span
                  className="font-inter font-semibold tracking-[0.32em] uppercase text-[10px] md:text-[10.5px]"
                  style={{ color: DEEP_GREEN }}
                >
                  Fig. 01
                </span>
                <span
                  className="font-inter font-semibold tracking-[0.16em] uppercase text-[10px] md:text-[10.5px]"
                  style={{ color: "rgba(47,74,44,0.65)" }}
                >
                  Included
                </span>
                <span
                  aria-hidden
                  className="flex-1 h-px"
                  style={{ background: "rgba(47,74,44,0.22)" }}
                />
                <span
                  className="font-inter tabular-nums tracking-[0.12em] text-[10px] md:text-[10.5px]"
                  style={{ color: "rgba(47,74,44,0.55)" }}
                >
                  06 ITEMS
                </span>
                <DimTick color="rgba(47,74,44,0.55)" />
              </header>
              <h3
                id="fig-01-included"
                className="mt-4 md:mt-5 font-murecho font-bold leading-[1.55]"
                style={{ color: DEEP_GREEN, fontSize: "clamp(15px,1.35vw,18px)" }}
              >
                京モデル{" "}
                <span
                  className="font-oswald tabular-nums mx-0.5"
                  style={{ fontWeight: 500, fontSize: "clamp(20px,1.8vw,26px)", letterSpacing: "-0.01em" }}
                >
                  2,280
                </span>
                <span className="text-[12px] md:text-[13px] font-medium">万円</span>
                に、すでに入っているもの。
              </h3>

              <ol className="mt-3 md:mt-4">
                {INCLUDED.map((item, i) => {
                  const Icon = ICON_MAP[item.icon];
                  return (
                    <li
                      key={item.title}
                      className="grid grid-cols-[34px_minmax(0,1fr)_28px] md:grid-cols-[44px_minmax(0,1fr)_32px] gap-3 md:gap-5 py-5 md:py-6"
                      style={{
                        borderTop: i === 0 ? "none" : `1px dashed rgba(28,27,24,0.16)`,
                      }}
                    >
                      <span
                        className="font-oswald tabular-nums leading-none mt-[2px]"
                        style={{
                          color: DEEP_GREEN,
                          fontWeight: 400,
                          fontSize: "clamp(18px,1.6vw,22px)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                          <span
                            className="font-murecho font-bold tracking-[0.02em] text-[15px] md:text-[16px] leading-[1.45]"
                            style={{ color: INK }}
                          >
                            {item.title}
                          </span>
                          {item.badge && (
                            <span
                              className="font-inter inline-flex items-center px-2 py-[2px] text-[10px] md:text-[10.5px] font-semibold tracking-[0.04em]"
                              style={{
                                color: DEEP_GREEN,
                                background: "rgba(47,74,44,0.10)",
                                borderRadius: 2,
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className="mt-1.5 font-murecho text-[12px] md:text-[12.5px] leading-[1.7]"
                          style={{ color: "rgba(28,27,24,0.62)" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                      <Icon
                        className="w-[22px] h-[22px] mt-[2px] justify-self-end"
                        strokeWidth={1.2}
                        color={DEEP_GREEN}
                      />
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* ─── 縦罫線(PC のみ) ─── */}
            <div
              aria-hidden
              className="hidden md:block w-px self-stretch"
              style={{ background: "rgba(28,27,24,0.16)" }}
            />

            {/* ─── 列 2: 別途となるもの ─── */}
            <section aria-labelledby="fig-02-others" className="md:pl-2">
              <header
                className="flex items-center gap-3 md:gap-4 pb-3"
                style={{ borderBottom: `1px solid rgba(28,27,24,0.40)` }}
              >
                <DimTick color="rgba(28,27,24,0.55)" />
                <span
                  className="font-inter font-semibold tracking-[0.32em] uppercase text-[10px] md:text-[10.5px]"
                  style={{ color: "rgba(28,27,24,0.7)" }}
                >
                  Fig. 02
                </span>
                <span
                  className="font-inter font-semibold tracking-[0.16em] uppercase text-[10px] md:text-[10.5px]"
                  style={{ color: "rgba(28,27,24,0.55)" }}
                >
                  Other Costs
                </span>
                <span
                  aria-hidden
                  className="flex-1 h-px"
                  style={{ background: "rgba(28,27,24,0.18)" }}
                />
                <span
                  className="font-inter tabular-nums tracking-[0.12em] text-[10px] md:text-[10.5px]"
                  style={{ color: "rgba(28,27,24,0.5)" }}
                >
                  04 ITEMS
                </span>
                <DimTick color="rgba(28,27,24,0.5)" />
              </header>
              <h3
                id="fig-02-others"
                className="mt-4 md:mt-5 font-murecho font-bold leading-[1.55]"
                style={{ color: INK, fontSize: "clamp(15px,1.35vw,18px)" }}
              >
                この価格には含まれず、
                <br className="hidden md:block" />
                別途となるもの。
              </h3>

              <ol className="mt-3 md:mt-4">
                {EXCLUDED.map((item, i) => {
                  const Icon = ICON_MAP[item.icon];
                  return (
                    <li
                      key={item.title}
                      className="grid grid-cols-[34px_minmax(0,1fr)_28px] md:grid-cols-[44px_minmax(0,1fr)_32px] gap-3 md:gap-5 py-5 md:py-6"
                      style={{
                        borderTop: i === 0 ? "none" : `1px dashed rgba(28,27,24,0.16)`,
                      }}
                    >
                      <span
                        className="font-oswald tabular-nums leading-none mt-[2px]"
                        style={{
                          color: "rgba(28,27,24,0.5)",
                          fontWeight: 400,
                          fontSize: "clamp(18px,1.6vw,22px)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <span
                          className="block font-murecho font-bold tracking-[0.02em] text-[15px] md:text-[16px] leading-[1.45]"
                          style={{ color: INK }}
                        >
                          {item.title}
                        </span>
                        <p
                          className="mt-1.5 font-murecho text-[12px] md:text-[12.5px] leading-[1.7]"
                          style={{ color: "rgba(28,27,24,0.62)" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                      <Icon
                        className="w-[22px] h-[22px] mt-[2px] justify-self-end"
                        strokeWidth={1.2}
                        color="rgba(28,27,24,0.55)"
                      />
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>

          {/* 共通フッター(両列下) */}
          <div
            className="mt-2 md:mt-4 pt-4 flex items-baseline gap-3"
            style={{ borderTop: `1px solid rgba(28,27,24,0.18)` }}
          >
            <span
              className="font-inter tracking-[0.16em] uppercase text-[10px] font-semibold shrink-0"
              style={{ color: "rgba(28,27,24,0.45)" }}
            >
              Note
            </span>
            <p
              className="font-murecho text-[11px] md:text-[12px] leading-[1.85]"
              style={{ color: "rgba(28,27,24,0.55)" }}
            >
              上記は一般的な内容です。詳細は資金計画時にご案内します。
            </p>
          </div>
        </div>

        {/* ============ 4. アクションストリップ(CTA) ============ */}
        <div
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1fr] gap-3 md:gap-4"
        >
          {/* リード文 */}
          <div
            className="px-6 py-6 md:px-7 md:py-7 flex items-center"
            style={{
              background: "rgba(47,74,44,0.05)",
              border: `1px solid rgba(47,74,44,0.14)`,
              borderRadius: 2,
            }}
          >
            <p
              className="font-murecho text-[13px] md:text-[14px] leading-[1.85] font-medium"
              style={{ color: INK }}
            >
              標準仕様の詳細や、暮らし方に合わせた
              <br className="hidden lg:block" />
              最適なプランをご提案します。
            </p>
          </div>

          {/* LINE で相談 */}
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 px-5 py-5 md:py-6 bg-white transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(28,27,24,0.25)]"
            style={{ border: `1px solid ${RULE}`, borderRadius: 2 }}
          >
            <span
              aria-hidden
              className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full"
              style={{ background: "rgba(6,199,85,0.12)", color: "#06C755" }}
            >
              <MessageCircle className="w-[20px] h-[20px]" strokeWidth={1.6} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-murecho font-bold text-[14px] md:text-[15px]" style={{ color: INK }}>
                LINEで相談する
              </span>
              <span
                className="block mt-1 font-murecho text-[11px] md:text-[12px] leading-[1.55]"
                style={{ color: "rgba(28,27,24,0.6)" }}
              >
                気軽にご相談いただけます
              </span>
            </span>
            <ArrowUpRight
              className="shrink-0 w-[18px] h-[18px] transition-transform duration-[400ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              style={{ color: INK }}
            />
          </a>

          {/* モデルハウス見学 */}
          <Link
            href="/reserve"
            className="group relative flex items-center gap-4 px-5 py-5 md:py-6 bg-white transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(28,27,24,0.25)]"
            style={{ border: `1px solid ${RULE}`, borderRadius: 2 }}
          >
            <span
              aria-hidden
              className="shrink-0 inline-flex items-center justify-center w-11 h-11"
              style={{
                background: DEEP_GREEN,
                color: "#FFFFFF",
                borderRadius: 999,
              }}
            >
              <Calendar className="w-[20px] h-[20px]" strokeWidth={1.6} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-murecho font-bold text-[14px] md:text-[15px]" style={{ color: INK }}>
                モデルハウスを見学する
              </span>
              <span
                className="block mt-1 font-murecho text-[11px] md:text-[12px] leading-[1.55]"
                style={{ color: "rgba(28,27,24,0.6)" }}
              >
                実際のサイズ感や仕様を体感できます
              </span>
            </span>
            <ArrowUpRight
              className="shrink-0 w-[18px] h-[18px] transition-transform duration-[400ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              style={{ color: INK }}
            />
          </Link>

          {/* カタログ */}
          <Link
            href="/refer"
            className="group relative flex items-center gap-4 px-5 py-5 md:py-6 bg-white transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(28,27,24,0.25)]"
            style={{ border: `1px solid ${RULE}`, borderRadius: 2 }}
          >
            <span
              aria-hidden
              className="relative shrink-0 w-12 h-14 overflow-hidden"
              style={{ borderRadius: 2 }}
            >
              <Image
                src="/images/sections/catalog-booklet.png"
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-murecho font-bold text-[14px] md:text-[15px]" style={{ color: INK }}>
                標準仕様・設備カタログ
              </span>
              <span
                className="block mt-1 font-murecho text-[11px] md:text-[12px] leading-[1.55]"
                style={{ color: "rgba(28,27,24,0.6)" }}
              >
                無料プレゼント中
              </span>
            </span>
            <ArrowUpRight
              className="shrink-0 w-[18px] h-[18px] transition-transform duration-[400ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              style={{ color: INK }}
            />
          </Link>
        </div>

        {/* ============ 5. ボトムルーラー(YAMATO REAL ESTATE | KYOTO/NARA AREA | SINCE 2011) ============ */}
        <div
          className="mt-14 md:mt-20 flex items-center gap-4 md:gap-6 pt-5 md:pt-6"
          style={{ borderTop: `1px solid ${RULE_FAINT}` }}
        >
          <span
            className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-semibold shrink-0"
            style={{ color: "rgba(28,27,24,0.55)" }}
          >
            Yamato Real Estate
          </span>
          <span
            aria-hidden
            className="flex-1 h-[10px] overflow-hidden"
            style={{ color: "rgba(28,27,24,0.25)" }}
          >
            <svg viewBox="0 0 600 10" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="9" x2="600" y2="9" stroke="currentColor" strokeWidth="0.5" />
              {Array.from({ length: 60 }, (_, i) => i * 10).map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1="9"
                  x2={x}
                  y2={x % 50 === 0 ? "3" : "6"}
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </span>
          <span
            className="hidden md:inline-block font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-semibold shrink-0"
            style={{ color: "rgba(28,27,24,0.55)" }}
          >
            Kyoto / Nara Area
          </span>
          <span
            aria-hidden
            className="hidden md:flex flex-1 h-[10px] overflow-hidden"
            style={{ color: "rgba(28,27,24,0.25)" }}
          >
            <svg viewBox="0 0 600 10" preserveAspectRatio="none" className="w-full h-full">
              <line x1="0" y1="9" x2="600" y2="9" stroke="currentColor" strokeWidth="0.5" />
              {Array.from({ length: 60 }, (_, i) => i * 10).map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1="9"
                  x2={x}
                  y2={x % 50 === 0 ? "3" : "6"}
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </span>
          <span
            className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-semibold shrink-0"
            style={{ color: "rgba(28,27,24,0.55)" }}
          >
            Since 2011
          </span>
        </div>
      </div>
    </section>
  );
}
