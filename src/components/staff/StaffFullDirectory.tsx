"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import {
  PHASES,
  REPRESENTATIVES,
  type Staff,
  type Representative,
} from "@/data/staff";

/*
  StaffFullDirectory — 2026-04-25 v3 Quiet Editorial Chapter
  ----------------------------------------------------------------
  v2 (Editorial Magazine Spread) でも単調と指摘 → 全員均等扱いの構造を捨てる。
  design-scout の研究結果を反映:
    - Stripe式: 大型引用 + 書体混植
    - ShukoBuild式: 章番号巨大 + 英日混合タイトル
    - PFN式: Alternating layout + Banner Break
    - 編集誌系: Mixed scale rhythm + 縦書きSpotlight

  v3 構造 (1人1人を"章"扱いする"余白勝負"):
  1. PhaseHero: ゴースト数字 + 部門カラー kicker + 大判タイトル
  2. FeaturedChapter: 各部門1人目 — フルブリード章扱い、portrait巨大、quote大型Mincho
  3. StandardSpread: 2人目 — 写真左右alternating、中スケール
  4. CompactCard: 残り — 3-col grid 圧縮、最小情報のみ
  5. VerticalSpotlight: 全社1人だけ縦書き引用ブロック (栗野 = 設計2人目を置換)
  6. PhaseBanner: 部門間に full-width 写真1枚 (呼吸帯)
  7. Representatives: 全幅見開きスプレッド
  8. 部門カラー: 罫線・kicker・番号バッジにのみ反映 (写真は不変)

  Decisions:
  - 名前 = Noto Sans Black, 引用 = Noto Serif JP (書体混植で重みを出す)
  - 縦書き = writing-mode: vertical-rl のみ (text-orientation 触らず日本語自然)
  - 番号 01..19 通し
*/

// ────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────

// 部門ごとのアクセントカラー(kicker / 罫線 / 番号バッジに使用、写真には不適用)
const PHASE_ACCENT: Record<string, string> = {
  "01": "#486B00", // SALES = lime-deep
  "02": "#A2C523", // DESIGN = lime
  "03": "#7D4427", // CONSTRUCTION = earth
  "04": "#5A6B5A", // MANAGEMENT = moss
};

// 全社で1人だけ縦書きSpotlight扱い(栗野 佑也 / 設計責任者)
const SPOTLIGHT_STAFF_ID = "126646";

// 部門間の Banner Break (3枚)
const PHASE_BANNERS: Record<string, { src: string; alt: string }> = {
  "01-02": {
    src: "/images/fv/hero-03-living.webp",
    alt: "やまとが建てた家のリビング",
  },
  "02-03": {
    src: "/images/newsozai/exterior-texture-detail-01.webp",
    alt: "外壁の素材ディテール",
  },
  "03-04": {
    src: "/images/fv/hero-05-washitsu.webp",
    alt: "やまとが建てた家の和室",
  },
};

// 写真フィルター: warm duotone
const PHOTO_BASE = "saturate(0.82) contrast(1.06) sepia(0.05) brightness(0.97)";
const PHOTO_HOVER = "saturate(1.05) contrast(1.04) sepia(0) brightness(1.02)";

// ────────────────────────────────────────────────
// PhaseHero
// ────────────────────────────────────────────────

function PhaseHero({
  num,
  deptEn,
  title,
  subtitle,
  accent,
}: {
  num: string;
  deptEn: string;
  title: string;
  subtitle: string;
  accent: string;
}) {
  return (
    <header className="relative mb-20 md:mb-28">
      {/* Ghost 巨大数字 */}
      <span
        aria-hidden
        className="absolute -top-8 md:-top-16 right-0 md:right-2 font-oswald tabular-nums leading-[0.78] select-none pointer-events-none"
        style={{
          fontWeight: 200,
          fontSize: "clamp(180px, 24vw, 360px)",
          letterSpacing: "-0.05em",
          color: "rgba(43,43,43,0.05)",
          zIndex: 0,
        }}
      >
        {num}
      </span>

      <div className="relative z-[1] grid grid-cols-12 gap-4 md:gap-6 items-end">
        <div className="col-span-12 md:col-span-9">
          {/* 英日混合 kicker */}
          <div className="flex items-baseline gap-3 mb-4 md:mb-5">
            <p
              className="font-inter font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase"
              style={{ color: accent }}
            >
              Phase {num} · {deptEn}
            </p>
            <span aria-hidden className="w-12 md:w-20 h-px" style={{ background: accent, opacity: 0.5 }} />
          </div>
          <h2
            className="font-sans font-black text-text-primary leading-[1.08] tracking-[-0.01em]"
            style={{ fontSize: "clamp(38px, 6vw, 88px)" }}
          >
            {title}
          </h2>
          <p className="mt-6 md:mt-8 font-sans text-text-secondary text-[clamp(14px,1.05vw,16px)] leading-[2.0] max-w-[540px]">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────
// Featured Chapter (各 phase の 1 人目 — フルブリード章扱い)
// ────────────────────────────────────────────────

function FeaturedChapter({
  staff,
  deptEn,
  num,
  accent,
}: {
  staff: Staff;
  deptEn: string;
  num: string;
  accent: string;
}) {
  return (
    <article className="scroll-in group relative grid grid-cols-12 gap-6 md:gap-12 lg:gap-20 items-end py-12 md:py-20">
      {/* 写真 — 大判 portrait */}
      <figure className="col-span-12 md:col-span-7 relative aspect-[4/5] overflow-hidden bg-bg-secondary">
        <Image
          src={`/images/staff/${staff.id}.webp`}
          alt={`${staff.name} | ${staff.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter,transform] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
          sizes="(max-width: 768px) 100vw, 60vw"
          style={{ filter: PHOTO_BASE }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_BASE;
          }}
        />
        {/* 番号バッジ — 写真の上に巨大 */}
        <span
          className="absolute top-5 left-5 md:top-7 md:left-7 font-oswald tabular-nums leading-none text-white"
          style={{
            fontWeight: 300,
            fontSize: "clamp(40px, 4vw, 64px)",
            letterSpacing: "-0.03em",
            textShadow: "0 4px 24px rgba(0,0,0,0.5)",
          }}
        >
          {num}
        </span>
      </figure>

      {/* テキスト */}
      <div className="col-span-12 md:col-span-5 md:pb-2 lg:pb-4">
        <p
          className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase mb-4 md:mb-5"
          style={{ color: accent }}
        >
          {deptEn} · Lead
        </p>

        <h3
          className="font-sans font-black text-text-primary leading-[1.08] tracking-[-0.005em]"
          style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
        >
          {staff.name}
        </h3>

        <p className="mt-3 md:mt-4 font-inter text-text-secondary text-[12px] md:text-[13px] tracking-[0.2em] uppercase">
          {staff.nameEn}
        </p>

        <div className="mt-5 md:mt-6 flex items-center gap-3 text-[13px] md:text-[14px] text-text-primary/85">
          <span className="font-sans">{staff.role}</span>
          {staff.career ? (
            <>
              <span aria-hidden className="w-px h-3 bg-text-primary/20" />
              <span
                className="font-inter font-bold tracking-[0.06em]"
                style={{ color: accent }}
              >
                経験 {staff.career}
              </span>
            </>
          ) : null}
        </div>

        {/* signature thought = 大型 Mincho 引用 */}
        <blockquote
          className="mt-9 md:mt-12 pl-5 md:pl-7 leading-[1.85]"
          style={{
            borderLeft: `2px solid ${accent}`,
            fontFamily: "var(--font-serif), 'Noto Serif JP', serif",
            fontSize: "clamp(19px, 2vw, 28px)",
            fontWeight: 500,
            color: "var(--color-text-primary, #2B2B2B)",
          }}
        >
          {staff.thoughts[staff.signature]}
        </blockquote>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────
// Standard Spread (2人目 — 写真左右 alternating、中スケール)
// ────────────────────────────────────────────────

function StandardSpread({
  staff,
  deptEn,
  num,
  accent,
  photoRight,
}: {
  staff: Staff;
  deptEn: string;
  num: string;
  accent: string;
  photoRight: boolean;
}) {
  return (
    <article
      className={`scroll-in group grid grid-cols-12 gap-5 md:gap-10 lg:gap-14 items-center py-10 md:py-16`}
    >
      <figure
        className={`col-span-12 md:col-span-5 relative aspect-[3/4] overflow-hidden bg-bg-secondary ${
          photoRight ? "md:order-2" : ""
        }`}
      >
        <Image
          src={`/images/staff/${staff.id}.webp`}
          alt={`${staff.name} | ${staff.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 40vw"
          style={{ filter: PHOTO_BASE }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_BASE;
          }}
        />
        <span
          className="absolute top-4 left-4 md:top-5 md:left-5 font-oswald tabular-nums leading-none text-white"
          style={{
            fontWeight: 300,
            fontSize: "clamp(28px, 2.4vw, 44px)",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          {num}
        </span>
      </figure>

      <div
        className={`col-span-12 md:col-span-7 ${
          photoRight ? "md:order-1 md:pr-4" : "md:pl-4"
        }`}
      >
        <p
          className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.26em] uppercase mb-3"
          style={{ color: accent }}
        >
          {deptEn}
        </p>

        <h3
          className="font-sans font-black text-text-primary leading-[1.15] tracking-[-0.005em]"
          style={{ fontSize: "clamp(24px, 2.6vw, 38px)" }}
        >
          {staff.name}
        </h3>

        <p className="mt-2 md:mt-2.5 font-inter text-text-secondary text-[11px] md:text-[12px] tracking-[0.18em] uppercase">
          {staff.nameEn}
        </p>

        <div className="mt-4 md:mt-5 flex items-center gap-3 text-[12px] md:text-[13px] text-text-primary/85">
          <span>{staff.role}</span>
          {staff.career ? (
            <>
              <span aria-hidden className="w-px h-3 bg-text-primary/20" />
              <span className="font-inter font-bold" style={{ color: accent }}>
                {staff.career}
              </span>
            </>
          ) : null}
        </div>

        <blockquote
          className="mt-6 md:mt-8 pl-5 md:pl-6 leading-[1.85]"
          style={{
            borderLeft: `2px solid ${accent}`,
            fontFamily: "var(--font-serif), 'Noto Serif JP', serif",
            fontSize: "clamp(15px, 1.5vw, 20px)",
            fontWeight: 500,
          }}
        >
          {staff.thoughts[staff.signature]}
        </blockquote>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────
// Vertical Spotlight (全社1人だけ — 縦書き引用)
// ────────────────────────────────────────────────

function VerticalSpotlight({
  staff,
  deptEn,
  num,
  accent,
}: {
  staff: Staff;
  deptEn: string;
  num: string;
  accent: string;
}) {
  return (
    <article className="scroll-in group relative grid grid-cols-12 gap-5 md:gap-10 lg:gap-16 items-stretch py-16 md:py-24 my-4 md:my-8 bg-bg-secondary/40">
      {/* 写真 */}
      <figure className="col-span-12 md:col-span-5 md:col-start-2 relative aspect-[3/4] overflow-hidden bg-bg-secondary">
        <Image
          src={`/images/staff/${staff.id}.webp`}
          alt={`${staff.name} | ${staff.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter,transform] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
          sizes="(max-width: 768px) 100vw, 40vw"
          style={{ filter: PHOTO_BASE }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_BASE;
          }}
        />
        <span
          className="absolute top-5 left-5 font-oswald tabular-nums leading-none text-white"
          style={{
            fontWeight: 300,
            fontSize: "clamp(32px, 3vw, 50px)",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 18px rgba(0,0,0,0.5)",
          }}
        >
          {num}
        </span>
        <span
          className="absolute top-5 right-5 font-inter font-bold text-[9px] md:text-[10px] tracking-[0.24em] uppercase px-2.5 py-1 border"
          style={{
            color: "white",
            borderColor: "rgba(255,255,255,0.5)",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(4px)",
          }}
        >
          Spotlight
        </span>
      </figure>

      {/* 縦書き引用 + メタ情報 */}
      <div className="col-span-12 md:col-span-5 flex flex-col md:flex-row items-start md:items-stretch gap-8 md:gap-12 md:py-4">
        {/* 縦書きquote — Spotlight の主役 */}
        <blockquote
          className="font-serif text-text-primary"
          style={{
            writingMode: "vertical-rl",
            fontFamily: "var(--font-serif), 'Noto Serif JP', serif",
            fontSize: "clamp(28px, 3vw, 48px)",
            fontWeight: 500,
            lineHeight: "1.6",
            letterSpacing: "0.08em",
            maxHeight: "min(60vh, 480px)",
          }}
        >
          {staff.thoughts[staff.signature]}
        </blockquote>

        {/* メタ情報 */}
        <div className="md:pt-2">
          <p
            className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase mb-3"
            style={{ color: accent }}
          >
            {deptEn} · Spotlight
          </p>
          <h3
            className="font-sans font-black text-text-primary leading-[1.15] tracking-[-0.005em]"
            style={{ fontSize: "clamp(22px, 2.4vw, 36px)" }}
          >
            {staff.name}
          </h3>
          <p className="mt-2 font-inter text-text-secondary text-[11px] md:text-[12px] tracking-[0.18em] uppercase">
            {staff.nameEn}
          </p>
          <div className="mt-4 text-[12px] md:text-[13px] text-text-primary/85 space-y-1">
            <p>{staff.role}</p>
            {staff.career ? (
              <p className="font-inter font-bold" style={{ color: accent }}>
                経験 {staff.career}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────
// Compact Card (3-col grid 圧縮、最小情報のみ)
// ────────────────────────────────────────────────

function CompactCard({
  staff,
  deptEn,
  num,
  accent,
}: {
  staff: Staff;
  deptEn: string;
  num: string;
  accent: string;
}) {
  return (
    <article className="scroll-in group">
      <figure className="relative aspect-[3/4] overflow-hidden bg-bg-secondary mb-4 md:mb-5">
        <Image
          src={`/images/staff/${staff.id}.webp`}
          alt={`${staff.name} | ${staff.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 30vw"
          style={{ filter: PHOTO_BASE }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_BASE;
          }}
        />
        <span
          className="absolute top-3 left-3 font-oswald tabular-nums leading-none text-white"
          style={{
            fontWeight: 300,
            fontSize: "clamp(20px, 1.8vw, 28px)",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          {num}
        </span>
      </figure>

      <p
        className="font-inter font-bold text-[9.5px] md:text-[10px] tracking-[0.22em] uppercase mb-1.5"
        style={{ color: accent }}
      >
        {deptEn}
      </p>

      <h3
        className="font-sans font-black text-text-primary leading-[1.2] tracking-[0.005em]"
        style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
      >
        {staff.name}
      </h3>

      <p className="mt-1 font-inter text-text-secondary text-[10px] tracking-[0.16em] uppercase">
        {staff.nameEn}
      </p>

      <p className="mt-2 text-text-primary/85 text-[12px] md:text-[13px] flex items-center gap-2">
        <span>{staff.role}</span>
        {staff.career ? (
          <>
            <span aria-hidden className="w-px h-2.5 bg-text-primary/20" />
            <span className="font-inter font-bold" style={{ color: accent }}>
              {staff.career}
            </span>
          </>
        ) : null}
      </p>

      <blockquote
        className="mt-3 pt-3 leading-[1.8]"
        style={{
          borderTop: "1px solid rgba(43,43,43,0.12)",
          fontFamily: "var(--font-serif), 'Noto Serif JP', serif",
          fontSize: "13px",
          fontWeight: 500,
          color: "rgba(43,43,43,0.85)",
        }}
      >
        {staff.thoughts[staff.signature]}
      </blockquote>
    </article>
  );
}

// ────────────────────────────────────────────────
// Phase Banner (部門間の呼吸帯)
// ────────────────────────────────────────────────

function PhaseBanner({
  src,
  alt,
  nextNum,
}: {
  src: string;
  alt: string;
  nextNum: string;
}) {
  return (
    <div className="relative my-20 md:my-32">
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bg-secondary">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: PHOTO_BASE }}
        />
      </div>
      <p className="mt-5 md:mt-7 text-right font-inter font-bold text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-text-secondary">
        Next · Phase {nextNum}
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────
// Representative Spread
// ────────────────────────────────────────────────

function RepresentativeSpread({
  rep,
  idx,
}: {
  rep: Representative;
  idx: number;
}) {
  const photoRight = idx % 2 === 1;
  const accent = "#486B00"; // Representatives 共通 lime-deep

  return (
    <article className="scroll-in group grid grid-cols-12 gap-5 md:gap-12 lg:gap-20 items-stretch py-14 md:py-24 border-b border-text-primary/15 last:border-b-0">
      <figure
        className={`col-span-12 md:col-span-5 relative aspect-[3/4] overflow-hidden bg-bg-secondary ${
          photoRight ? "md:order-2" : ""
        }`}
      >
        <Image
          src={`/images/staff/${rep.id}.webp`}
          alt={`${rep.role} ${rep.name} | やまと不動産`}
          fill
          className="object-cover transition-[filter,transform] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 40vw"
          style={{ filter: PHOTO_BASE }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_BASE;
          }}
        />
      </figure>

      <div
        className={`col-span-12 md:col-span-7 flex flex-col justify-between gap-8 md:gap-12 ${
          photoRight ? "md:order-1" : ""
        }`}
      >
        <div>
          <p
            className="font-inter font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 md:mb-5"
            style={{ color: accent }}
          >
            Representative · 経験 {rep.career}
          </p>
          <h3
            className="font-sans font-black text-text-primary leading-[1.08] tracking-[-0.01em]"
            style={{ fontSize: "clamp(36px, 4.8vw, 72px)" }}
          >
            {rep.name}
          </h3>
          <p className="mt-3 md:mt-4 font-inter text-text-secondary text-[12px] md:text-[13px] tracking-[0.22em] uppercase">
            {rep.nameEn}
          </p>
          <p className="mt-2 font-sans text-text-primary/85 text-[14px] md:text-[15px]">
            {rep.role}
          </p>
        </div>

        <blockquote
          className="leading-[2.0] whitespace-pre-line pl-6 md:pl-8"
          style={{
            borderLeft: `2px solid ${accent}`,
            fontFamily: "var(--font-serif), 'Noto Serif JP', serif",
            fontSize: "clamp(15px, 1.5vw, 20px)",
            fontWeight: 500,
            color: "var(--color-text-primary, #2B2B2B)",
          }}
        >
          {rep.quote}
        </blockquote>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────
// メイン
// ────────────────────────────────────────────────

export default function StaffFullDirectory() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  // 通し番号 01〜
  let counter = 0;

  return (
    <div ref={sectionRef}>
      <div className="mx-auto max-w-[1400px] bg-bg-primary px-[var(--page-px)] py-[var(--section-py)]">
        {PHASES.map((phase, phaseIndex) => {
          const accent = PHASE_ACCENT[phase.num] ?? "#486B00";
          const [featured, ...rest] = phase.staff;
          const featuredNum = String(++counter).padStart(2, "0");

          // Standard 候補(2人目): featured 以外で SPOTLIGHT_STAFF_ID でない最初の人
          const standardIdx = rest.findIndex((s) => s.id !== SPOTLIGHT_STAFF_ID);
          const standard = standardIdx >= 0 ? rest[standardIdx] : null;
          // Spotlight: rest の中に SPOTLIGHT_STAFF_ID がいれば抽出
          const spotlight = rest.find((s) => s.id === SPOTLIGHT_STAFF_ID) ?? null;
          // Compact: featured / standard / spotlight 以外
          const compactStaff = rest.filter(
            (s) => s.id !== (standard?.id ?? "") && s.id !== SPOTLIGHT_STAFF_ID,
          );

          // Standard を交互配置するため、phase index で photoRight を決める
          const standardPhotoRight = phaseIndex % 2 === 0;

          // banner key
          const nextPhaseNum = String(phaseIndex + 2).padStart(2, "0");
          const bannerKey = `${phase.num}-${nextPhaseNum}` as keyof typeof PHASE_BANNERS;
          const banner = PHASE_BANNERS[bannerKey] ?? null;

          return (
            <section key={phase.num} className="scroll-in relative">
              <PhaseHero
                num={phase.num}
                deptEn={phase.deptEn}
                title={phase.title}
                subtitle={phase.subtitle}
                accent={accent}
              />

              {/* Featured */}
              <FeaturedChapter
                staff={featured}
                deptEn={phase.deptEn}
                num={featuredNum}
                accent={accent}
              />

              {/* Standard (任意) */}
              {standard ? (
                <>
                  {(() => {
                    const n = String(++counter).padStart(2, "0");
                    return (
                      <StandardSpread
                        staff={standard}
                        deptEn={phase.deptEn}
                        num={n}
                        accent={accent}
                        photoRight={standardPhotoRight}
                      />
                    );
                  })()}
                </>
              ) : null}

              {/* Vertical Spotlight (栗野のみ) */}
              {spotlight ? (
                <>
                  {(() => {
                    const n = String(++counter).padStart(2, "0");
                    return (
                      <VerticalSpotlight
                        staff={spotlight}
                        deptEn={phase.deptEn}
                        num={n}
                        accent={accent}
                      />
                    );
                  })()}
                </>
              ) : null}

              {/* Compact (残り) */}
              {compactStaff.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 md:gap-x-8 gap-y-10 md:gap-y-14 mt-10 md:mt-14">
                  {compactStaff.map((s) => {
                    const n = String(++counter).padStart(2, "0");
                    return (
                      <CompactCard
                        key={s.id}
                        staff={s}
                        deptEn={phase.deptEn}
                        num={n}
                        accent={accent}
                      />
                    );
                  })}
                </div>
              ) : null}

              {/* Banner Break (Phase 末尾) */}
              {phaseIndex < PHASES.length - 1 && banner ? (
                <PhaseBanner
                  src={banner.src}
                  alt={banner.alt}
                  nextNum={nextPhaseNum}
                />
              ) : null}
            </section>
          );
        })}

        {/* === Representatives === */}
        <div className="mt-32 md:mt-48 pt-20 md:pt-28 border-t border-text-primary/15 relative">
          <span
            aria-hidden
            className="absolute -top-6 md:-top-14 right-0 font-oswald leading-none select-none pointer-events-none"
            style={{
              fontWeight: 200,
              fontSize: "clamp(120px, 16vw, 240px)",
              letterSpacing: "-0.04em",
              color: "rgba(72,107,0,0.06)",
            }}
          >
            REP
          </span>

          <header className="relative z-[1] mb-16 md:mb-24 grid grid-cols-12 gap-4 md:gap-6 items-end">
            <div className="col-span-12 md:col-span-9">
              <p
                className="font-inter font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-4 md:mb-5"
                style={{ color: "#486B00" }}
              >
                Representatives · 2 People
              </p>
              <h3
                className="font-sans font-black text-text-primary leading-[1.08] tracking-[-0.01em]"
                style={{ fontSize: "clamp(34px, 5.4vw, 76px)" }}
              >
                そして、この二人で<br className="md:hidden" />会社を背負っています。
              </h3>
            </div>
          </header>

          <div className="relative z-[1]">
            {REPRESENTATIVES.map((rep, i) => (
              <RepresentativeSpread key={rep.id} rep={rep} idx={i} />
            ))}
          </div>
        </div>

        {/* === Closing === */}
        <div className="mt-24 md:mt-32 pt-12 md:pt-16 border-t border-text-primary/15">
          <p
            className="font-sans font-black text-text-primary leading-[1.4] max-w-[820px]"
            style={{ fontSize: "clamp(20px, 2.4vw, 36px)" }}
          >
            ご契約からお引き渡しまで、そしてその先も。<br />
            この十九人で、お供いたします。
          </p>
        </div>
      </div>
    </div>
  );
}
