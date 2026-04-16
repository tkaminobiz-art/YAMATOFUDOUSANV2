"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import { getVoice } from "@/data/voices";
import {
  CHAPTERS,
  WALL_LINES,
  SECTION_HEADER,
  type ChapterConfig,
  type VoiceCardConfig,
  type WallLine,
} from "@/data/voiceHome";

/*
  VoiceSection — Phase 3 (Voices Book)
  -------------------------------------
  50件の声を「4章構成（土地／標準／打ち合わせ／建てたあと）」で提示。
  データ: src/data/voiceHome.ts（キュレーション）
       + src/data/voices.json（一次情報: 写真URL・家名・エリア）

  設計方針:
  - 章カード: 2枚写真＋原文引用（Serif）＋タグ。担当者名は非表示（全50件共通方針）
  - 統一フィルタ（grayscale 0.35 / saturate 1.05 / contrast 1.04）で 50枚の写真を1つのシリーズに
  - 最後に 50件のワンライナー "声の壁"。id でソートはせずキュレーション順
*/

const PHOTO_FILTER =
  "grayscale(0.35) saturate(1.05) contrast(1.04)";

/* =============================================================================
   Section Header
   ========================================================================== */

function SectionHeader() {
  return (
    <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[640px] scroll-in">
          <p className="font-section-label mb-4 text-xs tracking-[0.15em] text-main md:text-sm">
            {SECTION_HEADER.label}
          </p>
          <h2
            className="mb-6 text-[clamp(28px,4vw,52px)] font-light leading-[1.35] text-text-primary"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {SECTION_HEADER.headline}
          </h2>
          <p className="text-[clamp(15px,1.1vw,17px)] leading-[1.95] text-text-secondary">
            {SECTION_HEADER.lead}
          </p>
        </div>
        <div
          className="scroll-in text-right"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          <span className="block text-7xl font-extralight leading-none text-accent md:text-8xl">
            {SECTION_HEADER.bigNumber}
          </span>
          <span className="text-xs tracking-wider text-text-secondary md:text-sm">
            {SECTION_HEADER.bigNumberCaption}
          </span>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Voice Card（章の中の個別カード）
   ========================================================================== */

function VoiceCard({ config }: { config: VoiceCardConfig }) {
  const voice = getVoice(config.id);
  if (!voice) {
    // 万が一 id が無い場合も壊さない
    return null;
  }

  const indices = config.photoIndices ?? [0];
  const photos = indices
    .map((i) => voice.photos[i])
    .filter((p): p is string => Boolean(p));
  const [mainPhoto, subPhoto] = photos;

  return (
    <Link
      href={`/voice/${voice.id}`}
      className="scroll-in group block"
      aria-label={`${voice.area} ${voice.familyName}邸の詳細を見る`}
    >
      <article className="grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-7">
        {/* 写真（1〜2枚） */}
        <div className="relative flex flex-col gap-3 md:gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bg-secondary">
            {mainPhoto && (
              <Image
                src={mainPhoto}
                alt={`${voice.area} ${voice.familyName}邸の室内写真`}
                fill
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 48vw, 560px"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                style={{ filter: PHOTO_FILTER }}
              />
            )}
          </div>
          {subPhoto && (
            <div className="relative hidden aspect-[16/10] overflow-hidden rounded-sm bg-bg-secondary md:block">
              <Image
                src={subPhoto}
                alt={`${voice.area} ${voice.familyName}邸の別角度`}
                fill
                sizes="(max-width: 1200px) 48vw, 560px"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                style={{ filter: PHOTO_FILTER }}
              />
            </div>
          )}
        </div>

        {/* 本文 */}
        <div className="flex flex-col justify-center">
          {/* メタ（エリア・家名） */}
          <div
            className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-text-secondary md:mb-5"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <span className="tracking-[0.12em] text-main">
              {voice.area || "奈良"}
            </span>
            <span className="text-text-secondary/50">/</span>
            <span
              className="text-sm text-text-primary"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {voice.familyName}邸
            </span>
          </div>

          {/* 引用（原文ママ） */}
          <blockquote
            className="mb-6 text-[clamp(17px,1.5vw,22px)] font-light leading-[1.9] text-text-primary md:mb-7"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span aria-hidden className="pr-0.5 text-accent/60">「</span>
            {config.quote}
            <span aria-hidden className="pl-0.5 text-accent/60">」</span>
          </blockquote>

          {/* タグ */}
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {config.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] tracking-wider text-accent"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

/* =============================================================================
   Chapter（章ヘッダ + 4カード + 章フッタ）
   ========================================================================== */

function Chapter({ chapter }: { chapter: ChapterConfig }) {
  const chapterRef = useScrollIn<HTMLDivElement>(true);

  return (
    <div ref={chapterRef} className="max-w-[1400px] mx-auto px-[var(--page-px)]">
      {/* === 章ヘッダ === */}
      <header className="scroll-in border-t border-border pt-10 md:pt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="max-w-[760px]">
            <p
              className="mb-5 text-[11px] tracking-[0.22em] text-text-secondary md:text-xs"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              <span className="mr-2">{chapter.ordinal}</span>
              <span className="inline-block w-10 border-t border-accent-soft align-middle" />
              <span className="ml-2">{chapter.label}</span>
            </p>
            <h3
              className="mb-6 text-[clamp(26px,3.6vw,46px)] font-light leading-[1.4] text-text-primary md:mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {chapter.headline}
            </h3>
            <p
              className="text-[clamp(14px,1.05vw,16px)] leading-[2] text-text-secondary"
              style={{ maxWidth: "52ch" }}
            >
              {chapter.lead}
            </p>
          </div>

          {/* 章の統計（accent） */}
          <div className="flex-shrink-0 md:text-right">
            <p
              className="mb-1 text-[11px] tracking-[0.18em] text-text-secondary"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              DATA
            </p>
            <p
              className="text-[clamp(13px,1vw,15px)] font-light tracking-wide text-accent"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {chapter.stat}
            </p>
          </div>
        </div>
      </header>

      {/* === カード × 4 === */}
      <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
        {chapter.voices.map((v) => (
          <VoiceCard key={`${chapter.key}-${v.id}`} config={v} />
        ))}
      </div>

      {/* === 章フッタ（内訳） === */}
      <footer className="scroll-in mt-16 md:mt-24">
        <div className="flex flex-wrap items-end gap-x-12 gap-y-6 border-t border-border pt-8 md:pt-10">
          {chapter.breakdown.map((b) => (
            <div key={b.label}>
              <span
                className="block text-[28px] font-extralight leading-none text-text-primary md:text-[40px]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {b.count}
              </span>
              <span className="mt-2 block text-[11px] tracking-wider text-text-secondary md:text-xs">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

/* =============================================================================
   Voice Wall — 50件のワンライナー壁
   ========================================================================== */

const SIZE_CLASS: Record<NonNullable<WallLine["emphasis"]>, string> = {
  lg: "text-[clamp(16px,1.7vw,22px)] md:text-[clamp(18px,1.9vw,24px)]",
  md: "text-[clamp(14px,1.25vw,17px)] md:text-[clamp(15px,1.4vw,18px)]",
  sm: "text-[clamp(12px,1vw,14px)] md:text-[clamp(13px,1.15vw,15px)]",
};

function VoiceWall() {
  const wallRef = useScrollIn<HTMLDivElement>(true);

  return (
    <div ref={wallRef} className="max-w-[1400px] mx-auto px-[var(--page-px)]">
      <div className="scroll-in border-t border-border pt-12 md:pt-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div>
            <p
              className="mb-4 text-[11px] tracking-[0.22em] text-text-secondary md:text-xs"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              ALL 50 VOICES
            </p>
            <h3
              className="text-[clamp(22px,2.8vw,36px)] font-light leading-[1.4] text-text-primary"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              50組の、ひとことずつ。
            </h3>
          </div>
          <p className="max-w-[28ch] text-xs leading-relaxed text-text-secondary md:text-sm">
            お客様ご自身の言葉から、一言ずつ。クリックすると、その声の全文が読めます。
          </p>
        </div>
      </div>

      {/* ワンライナーの壁 */}
      <div className="scroll-in flex flex-wrap gap-x-7 gap-y-5 md:gap-x-10 md:gap-y-7">
        {WALL_LINES.map((w) => {
          const size = SIZE_CLASS[w.emphasis ?? "md"];
          return (
            <Link
              key={w.id}
              href={`/voice/${w.id}`}
              className={`group inline-flex items-baseline whitespace-nowrap font-light leading-[1.7] text-text-primary transition-colors hover:text-accent ${size}`}
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="text-accent/50 group-hover:text-accent">
                {w.line}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* =============================================================================
   Section
   ========================================================================== */

export default function VoiceSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(false);

  return (
    <section className="bg-bg-warm py-[var(--section-py)]">
      <div ref={sectionRef}>
        <SectionHeader />

        {/* 4章 */}
        <div className="mt-24 flex flex-col gap-24 md:mt-40 md:gap-40">
          {CHAPTERS.map((chapter) => (
            <Chapter key={chapter.key} chapter={chapter} />
          ))}
        </div>

        {/* 50件ワンライナー壁 */}
        <div className="mt-24 md:mt-40">
          <VoiceWall />
        </div>

        {/* 締めCTA */}
        <div className="mt-20 md:mt-32">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <div className="scroll-in flex flex-col items-center gap-6 border-t border-border pt-12 text-center md:pt-16">
              <p
                className="max-w-[36ch] text-[clamp(16px,1.4vw,20px)] font-light leading-[1.95] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                一人でも多くの方に、同じ感想を持っていただきたい。
                <br />
                それが、やまと不動産の目標です。
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaButton
                  href="/voice"
                  variant="secondary"
                  size="md"
                  label="すべてのお客様の声を読む"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
