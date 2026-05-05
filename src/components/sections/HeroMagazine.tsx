"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { LINE_ADD_FRIEND_URL } from "@/data/line";
import {
  FONT_VARIANTS,
  BODY_VARIANTS,
  type HeroFontVariant,
  type HeroBodyVariant,
} from "./HeroMagazine.fonts";

// 後方互換: 既存の import 経路を維持
export { FONT_VARIANTS, BODY_VARIANTS };
export type { HeroFontVariant, HeroBodyVariant };

/*
  HeroMagazine v5 — 2026-04-21
  - 主見出しを事実の核へ: 「同じ素材、同じ性能。」→「家そのものの、価格。」
    (design-critic 指摘#2: 詩的抽象→事実直撃)
  - 主見出しからLIME除去(design-critic 指摘#3: アクセント節約)
  - 縦組「花鳥風月の家」のLIMEのみ残す(ブランドマーク1箇所)
*/

type SlideCategory = "exterior" | "interior";

type HeroSlide = {
  src: string;
  alt: string;
  category: SlideCategory; // exterior=外観(写真主役・オーバーレイ薄く) / interior=室内(雰囲気重視・オーバーレイ厚く)
};

// 2026-05-01 GPT IMG2 でブラッシュアップ済みの外観を slide2/3 に投入
//   - slide2: 三山木フロント(電線・隣家除去/植栽整地)
//   - slide3: 左京フロント(電線・隣家除去/芝生整地)
// slide1(山並み広角)と slide4(内観LDK)は温存
const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/newsozai/hero-miyamaki-mountain.webp",
    alt: "三山木モデルハウス 山並みと青空",
    category: "exterior",
  },
  {
    src: "/images/newsozai/exterior-miyamaki-front.webp",
    alt: "三山木モデルハウス 黒い切妻屋根と赤い玄関ドアの正面外観",
    category: "exterior",
  },
  {
    src: "/images/newsozai/exterior-sakyo-clean.webp",
    alt: "左京モデルハウス 黒外観とガラス手すりバルコニー",
    category: "exterior",
  },
  {
    src: "/images/newsozai/interior-ldk-01.webp",
    alt: "内観 LDK",
    category: "interior",
  },
];

// スライド種別ごとのオーバーレイ
// exterior: HM業界の標準(底35〜40%) / 写真主役・呼吸を確保
// interior: 雰囲気重視で現状維持(底62%) / 編集誌的なドラマ感
function SlideOverlay({ category }: { category: SlideCategory }) {
  if (category === "exterior") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/6 to-transparent"
      />
    );
  }
  // interior(2026-04-24 design-critic: 62→48 暖色性とLimeアクセントの対比を強化)
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/12 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent"
      />
    </>
  );
}

// グレイン: baseFrequency 0.9→0.7 で粒子を少し大きく(印刷物風)
// numOctaves 2→3 で粒子の自然さを増す
const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/>
    </svg>`
  );

// 2026-04-20 ブランドパレット刷新: lime を #A2C523 に統一
const ACCENT_LIME = "#A2C523";

export default function HeroMagazine({
  variant = FONT_VARIANTS[0],
  bodyVariant = BODY_VARIANTS[0],
}: {
  variant?: HeroFontVariant;
  bodyVariant?: HeroBodyVariant;
}) {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-text-primary">
      {/* ===== 背景: スライドショー(オーバーレイは各スライドに内包) ===== */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="hero-slide absolute inset-0"
            style={{ animationDelay: `${i * 7 - 1}s` }}
          >
            <div className="hero-ken-burns absolute inset-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
            {/* スライド種別ごとに濃度を変える(exterior=薄/interior=現状) */}
            <SlideOverlay category={slide.category} />
          </div>
        ))}
      </div>

      {/* グレイン: 全スライド共通(オーバーレイの上に乗せて印刷感を出す) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.07] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
      />

      {/* ===== コンテンツ ===== */}
      <div className="relative z-10 min-h-[100svh] flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-[var(--page-px)] pt-24 md:pt-28 lg:pt-32 pb-10">
          <div className="max-w-[1400px] mx-auto w-full text-right">
            {/* 主見出し(右寄せ) */}
            <h1
              className="text-white font-normal mb-10 md:mb-14"
              style={{
                fontFamily: variant.fontFamily,
                letterSpacing: variant.letterSpacing,
                lineHeight: 1.15,
              }}
            >
              {/* 2026-04-24 v3: VP-4工房 Voice でリライト
                  旧メイン「家そのものを、届けています。」は "何言ってるかわからん" との指摘
                  サブ = 保証(中身は同じ) / メイン = 仕組み(何が違うか) の役割分担 */}
              <span
                className="block text-white/90 text-left"
                style={{
                  fontSize: "clamp(26px, 2.6vw, 32px)",
                  fontWeight: variant.weightSubLines,
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                  lineHeight: 1.5,
                  letterSpacing: "0.04em",
                  textTransform: "none",
                }}
              >
                標準仕様まで、しっかり比べてください。
              </span>
              <span
                className="block text-white"
                style={{
                  fontSize: "clamp(26px, 4.2vw, 60px)",
                  fontWeight: variant.weightBigLine,
                  textShadow: "0 3px 22px rgba(0,0,0,0.6)",
                  marginTop: "0.5em",
                  lineHeight: 1.35,
                  letterSpacing: "0.02em",
                }}
              >
                家そのものに、<br className="md:hidden" />しっかり費用をかけています。
              </span>
            </h1>

            {/* 価格(右寄せ) — 2026-04-24 v2: デカタイポ廃盤で 200→120px
                商品が主役・価格は静かに据える */}
            <div className="flex items-end gap-2 md:gap-3 leading-none justify-end">
              <span
                className="text-white font-light whitespace-nowrap"
                style={{
                  fontFamily: bodyVariant.numberFontFamily,
                  fontWeight: bodyVariant.numberWeight,
                  fontSize: "clamp(44px, 8vw, 120px)",
                  letterSpacing: bodyVariant.numberLetterSpacing,
                  lineHeight: 0.85,
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
              >
                2,280
              </span>
              <div className="flex flex-col gap-1 pb-1.5 md:pb-2.5 lg:pb-3 text-left">
                <span
                  className="text-white/90 text-lg md:text-2xl lg:text-3xl font-normal leading-none [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]"
                  style={{
                    fontFamily: bodyVariant.jaFontFamily,
                    fontWeight: bodyVariant.jaWeight,
                  }}
                >
                  万円〜
                  <span
                    className="ml-1.5 text-[11px] md:text-sm align-baseline text-white/70 font-normal tracking-[0.04em]"
                    style={{ fontFamily: bodyVariant.jaFontFamily }}
                  >
                    （京モデル）
                  </span>
                </span>
                <span
                  className="text-white/65 text-[10px] md:text-xs leading-tight tracking-[0.05em] [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]"
                  style={{ fontFamily: bodyVariant.jaFontFamily }}
                >
                  税込・建物本体と付帯工事まで含みます
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 下段: CTA(2026-05-05 v7: LINE主導線化)
            主=LINEで総額相談 / 副=モデルハウス見学 / 補助=資料請求(テキストリンク)
            LINEはサービス色(#06C755)で即認識を狙い、Lime は副CTAに譲る。 */}
        <div className="pb-8 md:pb-14 px-[var(--page-px)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-stretch max-w-2xl ml-auto">
              {/* 主CTA: LINE — サービス色で「相談の入口」を即認識 */}
              <a
                href={LINE_ADD_FRIEND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex flex-1 sm:min-w-[240px] flex-col items-center justify-center overflow-hidden rounded text-white text-center font-bold min-h-[56px] px-8 py-4 border-b-[3px] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(6,199,85,0.55)]"
                style={{ backgroundColor: "#06C755", borderBottomColor: "#04A346" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
                />
                <span className="relative inline-flex items-center gap-2 leading-tight">
                  <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  LINEで総額の目安を相談する
                </span>
                <span className="relative mt-0.5 text-[11px] font-medium text-white/80">
                  友だち追加で気軽にお問い合わせ
                </span>
              </a>
              {/* 副CTA: モデルハウス見学 */}
              <CtaButton
                href="/reserve"
                variant="dark-bg-secondary"
                size="md"
                label="モデルハウスを見学する"
                sublabel="ご予約なしでも見学可・無料"
                className="flex-1 sm:min-w-[200px] px-8 py-4"
              />
            </div>
            {/* 補助: フォーム資料請求 — 控えめなテキストリンクで残す */}
            <div className="mt-4 text-right">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-[12px] md:text-[13px] text-white/75 hover:text-white tracking-[0.04em] transition-colors"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "2px" }}
              >
                フォームで資料請求する
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ノンブル — 編集誌の表紙ページ番号(案A 表紙→中扉 連続構成) */}
        <aside
          aria-hidden
          className="hidden md:block absolute left-8 lg:left-14 top-24 z-20"
        >
          <p
            className="font-inter text-white/70 text-[10px] lg:text-[11px] tracking-[0.32em] uppercase"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            Page 01 / 02
          </p>
        </aside>

        {/* 縦組キャプション — ブランドマーク(ページ内Lime唯一の装飾色)
            2026-04-24 v2: Noto Sans(ゴシック)に変更、サイズも縮小 */}
        <aside
          aria-hidden="false"
          className="hidden md:flex absolute left-6 lg:left-12 top-[42%] -translate-y-1/2 z-20 flex-col items-center gap-5"
        >
          <span aria-hidden className="block w-px h-14 bg-white/55" />
          <p
            className="text-[20px] lg:text-[24px] tracking-[0.22em] [writing-mode:vertical-rl]"
            style={{
              fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
              fontWeight: 700,
              color: ACCENT_LIME,
              textShadow:
                "0 2px 14px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.55)",
            }}
          >
            花鳥風月の家
          </p>
        </aside>

        {/* === 権威バッジ === 2026-05-03: 600棟以上の実績(MCP生成)
            FV 右上に配置。AI 生成のゴージャスな金エンブレム。
            黒背景はFV写真と自然に溶け、放射状ハロウで浮き上がる構成。
            sm 以下では小さく表示, md 以上で本サイズ */}
        <aside
          aria-label="累計600棟以上の建築実績"
          className="absolute right-4 sm:right-6 md:right-10 lg:right-14 top-20 sm:top-24 md:top-[18%] z-20 pointer-events-none"
        >
          <div
            className="relative"
            style={{
              width: "clamp(96px, 13vw, 168px)",
              aspectRatio: "1 / 1",
              filter:
                "drop-shadow(0 18px 40px rgba(0,0,0,0.55)) drop-shadow(0 4px 12px rgba(180,140,40,0.18))",
            }}
          >
            <Image
              src="/images/badges/yamato-600-badge.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 130px, 168px"
              className="object-contain"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
