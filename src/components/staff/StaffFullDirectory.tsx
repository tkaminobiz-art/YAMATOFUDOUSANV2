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
  StaffFullDirectory — 2026-04-25 v4 Quiet Unified Editorial
  ----------------------------------------------------------------
  v3 (Mixed Scale Rhythm) でユーザー指摘:
    - サイズで役職を区別するのは無礼(全員平等が原則)
    - スタイル自体が気に入らない
    - design-scout を派手な仕掛けに使ってしまった

  v4 = "全員 完全同一カード × 編集誌の品質で支える"
  - Featured/Standard/Spotlight/Compact 4分類を撤廃
  - 縦書きSpotlight 撤廃
  - Banner Break 撤廃
  - "Best Value" "Lead" バッジ撤廃
  - 部門ごとの色違いを罫線アクセントの hue 1段階差のみに(写真不変)

  代わりに、編集誌の品質を支える要素:
  - 完全2-col grid(モバイル1-col)、全員同サイズ
  - 写真 aspect 4:5 全員一致 + 統一warm duotone
  - 名前 = Noto Sans Black 大判
  - 英字 nameEn = Inter Bold tracking-wide kicker
  - signature thought = Noto Serif JP(明朝)+ Lime左罫
  - Phase Divider = タイポグラフィ一行のみ(Banner なし)
  - 番号 01..21 通し(Representatives も含む通し番号)

  21人(19スタッフ + 2代表)を全員同じ尊厳で並べる。
*/

const ACCENT = "#486B00"; // 単一アクセント。部門色は撤廃。

const PHOTO_BASE = "saturate(0.82) contrast(1.06) sepia(0.05) brightness(0.97)";
const PHOTO_HOVER = "saturate(1.05) contrast(1.04) sepia(0) brightness(1.02)";

// ────────────────────────────────────────────────
// Unified Card (Staff も Representative も同じ形状)
// ────────────────────────────────────────────────

type UnifiedItem = {
  id: string;
  name: string;
  nameEn: string;
  deptEn: string;
  role: string;
  career: string;
  quote: string; // signature thought or rep.quote
};

function UnifiedCard({ item, num }: { item: UnifiedItem; num: string }) {
  return (
    <article className="scroll-in group">
      {/* 上段: 番号 + 部門ラベル */}
      <div className="flex items-baseline justify-between gap-3 mb-5 md:mb-6">
        <p
          className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase"
          style={{ color: ACCENT }}
        >
          {item.deptEn}
        </p>
        <span
          className="font-oswald tabular-nums leading-none text-text-secondary/65"
          style={{
            fontWeight: 300,
            fontSize: "clamp(20px, 1.6vw, 28px)",
            letterSpacing: "-0.02em",
          }}
        >
          {num}
        </span>
      </div>

      {/* Portrait */}
      <figure className="relative aspect-[4/5] overflow-hidden bg-bg-secondary mb-7 md:mb-9">
        <Image
          src={`/images/staff/${item.id}.webp`}
          alt={`${item.name} | ${item.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ filter: PHOTO_BASE }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_BASE;
          }}
        />
      </figure>

      {/* 名前 */}
      <h3
        className="font-sans font-black text-text-primary leading-[1.18] tracking-[-0.005em]"
        style={{ fontSize: "clamp(24px, 2.4vw, 36px)" }}
      >
        {item.name}
      </h3>

      {/* 英字 */}
      <p className="mt-2 md:mt-2.5 font-inter font-bold text-text-secondary text-[11px] md:text-[12px] tracking-[0.22em] uppercase">
        {item.nameEn}
      </p>

      {/* 役職 + 経験 */}
      <div className="mt-4 md:mt-5 flex items-center gap-3 text-[12px] md:text-[13.5px] text-text-primary/85">
        <span>{item.role}</span>
        {item.career ? (
          <>
            <span aria-hidden className="w-px h-3 bg-text-primary/25" />
            <span
              className="font-inter font-bold tracking-[0.04em]"
              style={{ color: ACCENT }}
            >
              {item.career}
            </span>
          </>
        ) : null}
      </div>

      {/* signature thought / quote — 明朝 + Lime左罫 */}
      <blockquote
        className="mt-6 md:mt-7 pl-5 md:pl-6 leading-[1.95] whitespace-pre-line"
        style={{
          borderLeft: `2px solid ${ACCENT}`,
          fontFamily: "var(--font-serif), 'Noto Serif JP', serif",
          fontSize: "clamp(14.5px, 1.35vw, 18px)",
          fontWeight: 500,
        }}
      >
        {item.quote}
      </blockquote>
    </article>
  );
}

// ────────────────────────────────────────────────
// Phase Divider (タイポグラフィ一行のみ)
// ────────────────────────────────────────────────

function PhaseDivider({
  num,
  deptEn,
  title,
  subtitle,
  isFirst = false,
}: {
  num: string; // 空文字なら "Phase XX" は表示しない
  deptEn: string;
  title: string;
  subtitle: string;
  isFirst?: boolean;
}) {
  return (
    <header
      className={`grid grid-cols-12 gap-4 md:gap-6 items-baseline ${
        isFirst ? "mb-14 md:mb-20" : "mt-32 md:mt-44 mb-14 md:mb-20"
      }`}
    >
      <div className="col-span-12 md:col-span-3 lg:col-span-2">
        {num ? (
          <p
            className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.32em] uppercase"
            style={{ color: ACCENT }}
          >
            Phase {num}
          </p>
        ) : null}
        <p
          className={`font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase ${
            num ? "mt-1 md:mt-1.5 text-text-secondary" : ""
          }`}
          style={!num ? { color: ACCENT } : undefined}
        >
          {deptEn}
        </p>
      </div>

      <div className="col-span-12 md:col-span-9 lg:col-span-10">
        <div className="border-t border-text-primary/15 pt-5 md:pt-7 flex items-baseline justify-between flex-wrap gap-3">
          <h2
            className="font-sans font-black text-text-primary leading-[1.15] tracking-[-0.005em]"
            style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
          >
            {title}
          </h2>
          <p className="font-sans text-text-secondary text-[12px] md:text-[13px] tracking-[0.04em]">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────
// Adapters: Staff/Representative → UnifiedItem
// ────────────────────────────────────────────────

function staffToItem(staff: Staff, deptEn: string): UnifiedItem {
  return {
    id: staff.id,
    name: staff.name,
    nameEn: staff.nameEn,
    deptEn,
    role: staff.role,
    career: staff.career ? `経験 ${staff.career}` : "",
    quote: staff.thoughts[staff.signature],
  };
}

function repToItem(rep: Representative): UnifiedItem {
  return {
    id: rep.id,
    name: rep.name,
    nameEn: rep.nameEn,
    deptEn: "Representative",
    role: rep.role,
    career: rep.career ? `経験 ${rep.career}` : "",
    quote: rep.quote,
  };
}

// ────────────────────────────────────────────────
// メイン
// ────────────────────────────────────────────────

export default function StaffFullDirectory() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  let counter = 0;

  return (
    <div ref={sectionRef}>
      <div className="mx-auto max-w-[1400px] bg-bg-primary px-[var(--page-px)] py-[var(--section-py)]">
        {PHASES.map((phase, phaseIndex) => (
          <section key={phase.num}>
            <PhaseDivider
              num={phase.num}
              deptEn={phase.deptEn}
              title={phase.title}
              subtitle={phase.subtitle}
              isFirst={phaseIndex === 0}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-14 lg:gap-x-20 gap-y-16 md:gap-y-24">
              {phase.staff.map((s) => {
                const n = String(++counter).padStart(2, "0");
                return (
                  <UnifiedCard
                    key={s.id}
                    item={staffToItem(s, phase.deptEn)}
                    num={n}
                  />
                );
              })}
            </div>
          </section>
        ))}

        {/* === Representatives === 同じカード形状で並べる */}
        <section>
          <PhaseDivider
            num=""
            deptEn="Representatives"
            title="会社を背負う、二人。"
            subtitle="REPRESENTATIVE DIRECTORS"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-14 lg:gap-x-20 gap-y-16 md:gap-y-24">
            {REPRESENTATIVES.map((rep) => {
              const n = String(++counter).padStart(2, "0");
              return <UnifiedCard key={rep.id} item={repToItem(rep)} num={n} />;
            })}
          </div>
        </section>

        {/* === Closing === */}
        <div className="mt-32 md:mt-44 pt-12 md:pt-16 border-t border-text-primary/15">
          <p
            className="font-sans font-black text-text-primary leading-[1.4] max-w-[820px]"
            style={{ fontSize: "clamp(20px, 2.2vw, 32px)" }}
          >
            ご契約からお引き渡しまで、そしてその先も。<br />
            この十九人で、お供いたします。
          </p>
        </div>
      </div>
    </div>
  );
}
