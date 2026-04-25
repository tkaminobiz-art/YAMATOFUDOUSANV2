"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import {
  PHASES,
  REPRESENTATIVES,
  THOUGHT_LABELS,
  type Staff,
  type Representative,
  type SignatureKey,
} from "@/data/staff";

/*
  StaffFullDirectory — 2026-04-25 v2 Editorial Magazine Spread
  ----------------------------------------------------------------
  旧 v1: 4-col 均等カード × 縦リスト thoughts × font-light h2
  → 2020年頃のコーポレートテンプレ感が強く「2026年とは思えない」指摘

  v2 構造:
  1. PhaseHero: ゴースト巨大数字(180-320px) + 部門英字 + 大判タイトル
  2. Featured Staff: 各部門の1人目を 7:5 マガジンスプレッド型で大判扱い
  3. Other Staff: 残りを Asymmetric 2-col(写真2:5 + テキスト3:5)で編集誌風
  4. Phase間: 横線ではなく "next phase →" の編集誌記号
  5. Representatives: 全幅見開きスプレッド × 2、Lime左罫
  6. Photo: warm duotone(sepia 0.06 + saturate 0.85)、hover時に色復帰

  タイポ階層:
  - 漢字氏名: Noto Sans Black, 大判
  - 英字: Inter, kicker扱い
  - signature thought: 引用ブロックで大型
  - その他 thoughts: 控えめにgrid配置
*/

// 写真フィルター: warm duotone(やまと=奈良の温度感)
const PHOTO_BASE = "saturate(0.82) contrast(1.06) sepia(0.05) brightness(0.97)";
const PHOTO_HOVER = "saturate(1.05) contrast(1.04) sepia(0) brightness(1.02)";

// ────────────────────────────────────────────────
// Featured Staff Card (各 phase の 1 人目)
// ────────────────────────────────────────────────

function FeaturedStaff({
  staff,
  deptEn,
  num,
}: {
  staff: Staff;
  deptEn: string;
  num: string;
}) {
  return (
    <article className="scroll-in group grid grid-cols-12 gap-5 md:gap-8 lg:gap-12 items-end">
      <figure className="col-span-12 md:col-span-7 relative aspect-[4/5] overflow-hidden bg-bg-secondary">
        <Image
          src={`/images/staff/${staff.id}.webp`}
          alt={`${staff.name} | ${staff.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 60vw"
          style={{ filter: PHOTO_BASE }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_BASE;
          }}
        />
        {/* 番号バッジ: 写真の左上に大きく */}
        <span
          className="absolute top-4 left-4 md:top-6 md:left-6 font-oswald tabular-nums leading-none text-white"
          style={{
            fontWeight: 300,
            fontSize: "clamp(28px, 2.4vw, 40px)",
            letterSpacing: "-0.02em",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {num}
        </span>
      </figure>

      <div className="col-span-12 md:col-span-5">
        <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-lime-deep mb-3">
          {deptEn} · Lead
        </p>

        <h3
          className="font-sans font-black text-text-primary leading-[1.1] tracking-[-0.005em]"
          style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}
        >
          {staff.name}
        </h3>

        <p
          className="mt-2 md:mt-3 font-inter text-text-secondary text-[11px] md:text-[12px] tracking-[0.18em] uppercase"
        >
          {staff.nameEn}
        </p>

        <div className="mt-4 md:mt-5 flex items-center gap-3 text-[12px] md:text-[13px] text-text-primary/85">
          <span className="font-sans">{staff.role}</span>
          {staff.career ? (
            <>
              <span aria-hidden className="w-px h-3 bg-text-primary/20" />
              <span className="font-inter font-bold text-lime-deep tracking-[0.06em]">
                経験 {staff.career}
              </span>
            </>
          ) : null}
        </div>

        {/* signature thought = 引用ブロック大型 */}
        <blockquote
          className="mt-7 md:mt-9 pl-5 md:pl-6 border-l-2 border-lime-deep font-sans text-text-primary leading-[1.85]"
          style={{ fontSize: "clamp(17px, 1.6vw, 22px)", fontWeight: 500 }}
        >
          {staff.thoughts[staff.signature]}
        </blockquote>

        {/* 残り 2 thoughts = control + grid */}
        <dl className="mt-7 md:mt-8 pt-6 border-t border-text-primary/12 grid grid-cols-2 gap-x-6 gap-y-4">
          {(Object.keys(THOUGHT_LABELS) as SignatureKey[])
            .filter((k) => k !== staff.signature)
            .map((key) => (
              <div key={key}>
                <dt className="font-inter font-bold text-[9.5px] md:text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-1.5">
                  {THOUGHT_LABELS[key]}
                </dt>
                <dd className="font-sans text-text-primary/75 text-[12px] md:text-[13px] leading-[1.7]">
                  {staff.thoughts[key]}
                </dd>
              </div>
            ))}
        </dl>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────
// Standard Staff Card (Featured 以外)
// ────────────────────────────────────────────────

function StaffSpread({
  staff,
  deptEn,
  num,
}: {
  staff: Staff;
  deptEn: string;
  num: string;
}) {
  return (
    <article className="scroll-in group grid grid-cols-[2fr_3fr] gap-4 md:gap-6 items-start">
      <figure className="relative aspect-[3/4] overflow-hidden bg-bg-secondary">
        <Image
          src={`/images/staff/${staff.id}.webp`}
          alt={`${staff.name} | ${staff.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 40vw, 25vw"
          style={{ filter: PHOTO_BASE }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_BASE;
          }}
        />
        <span
          className="absolute top-2.5 left-2.5 md:top-3 md:left-3 font-oswald tabular-nums leading-none text-white"
          style={{
            fontWeight: 300,
            fontSize: "clamp(22px, 1.8vw, 32px)",
            letterSpacing: "-0.02em",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          {num}
        </span>
      </figure>

      <div className="min-w-0">
        <p className="font-inter font-bold text-[9.5px] md:text-[10px] tracking-[0.22em] uppercase text-text-secondary mb-1.5">
          {deptEn}
        </p>

        <h3
          className="font-sans font-black text-text-primary leading-[1.2] tracking-[0.005em]"
          style={{ fontSize: "clamp(17px, 1.6vw, 24px)" }}
        >
          {staff.name}
        </h3>

        <p className="mt-1 font-inter text-text-secondary text-[10px] md:text-[11px] tracking-[0.16em] uppercase">
          {staff.nameEn}
        </p>

        <p className="mt-2 text-text-primary/85 text-[12px] md:text-[13px] flex items-center gap-2">
          <span>{staff.role}</span>
          {staff.career ? (
            <>
              <span aria-hidden className="w-px h-3 bg-text-primary/20" />
              <span className="font-inter font-bold text-lime-deep">{staff.career}</span>
            </>
          ) : null}
        </p>

        {/* signature thought のみ表示 */}
        <blockquote
          className="mt-4 pt-4 border-t border-text-primary/12 font-sans text-text-primary leading-[1.8] text-[13px] md:text-[14.5px]"
          style={{ fontWeight: 500 }}
        >
          {staff.thoughts[staff.signature]}
        </blockquote>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────
// Phase Hero (部門ヘッダー)
// ────────────────────────────────────────────────

function PhaseHero({
  num,
  deptEn,
  title,
  subtitle,
}: {
  num: string;
  deptEn: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="relative mb-14 md:mb-20">
      {/* Ghost 巨大数字 */}
      <span
        aria-hidden
        className="absolute -top-6 md:-top-12 right-0 md:right-2 font-oswald tabular-nums leading-[0.8] select-none pointer-events-none"
        style={{
          fontWeight: 200,
          fontSize: "clamp(160px, 22vw, 320px)",
          letterSpacing: "-0.05em",
          color: "rgba(43,43,43,0.06)",
          zIndex: 0,
        }}
      >
        {num}
      </span>

      <div className="relative z-[1] grid grid-cols-12 gap-4 md:gap-6 items-end">
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-lime-deep mb-3 md:mb-4">
            Phase {num} · {deptEn}
          </p>
          <h2
            className="font-sans font-black text-text-primary leading-[1.1] tracking-[-0.005em]"
            style={{ fontSize: "clamp(34px, 5.4vw, 76px)" }}
          >
            {title}
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-secondary text-[clamp(14px,1.05vw,16px)] leading-[1.95] max-w-[520px]">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────
// Representative Spread (全幅見開き)
// ────────────────────────────────────────────────

function RepresentativeSpread({ rep, idx }: { rep: Representative; idx: number }) {
  // 偶数: 写真左 / 奇数: 写真右(交互)
  const photoRight = idx % 2 === 1;

  return (
    <article
      className={`scroll-in group grid grid-cols-12 gap-5 md:gap-10 lg:gap-16 items-stretch py-12 md:py-20 border-b border-text-primary/15 last:border-b-0`}
    >
      <figure
        className={`col-span-12 md:col-span-5 relative aspect-[3/4] overflow-hidden bg-bg-secondary ${
          photoRight ? "md:order-2" : ""
        }`}
      >
        <Image
          src={`/images/staff/${rep.id}.webp`}
          alt={`${rep.role} ${rep.name} | やまと不動産`}
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
      </figure>

      <div
        className={`col-span-12 md:col-span-7 flex flex-col justify-between gap-8 md:gap-10 ${
          photoRight ? "md:order-1 md:pr-2" : "md:pl-2"
        }`}
      >
        <div>
          <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-lime-deep mb-3 md:mb-4">
            Representative · 経験 {rep.career}
          </p>
          <h3
            className="font-sans font-black text-text-primary leading-[1.1] tracking-[-0.005em]"
            style={{ fontSize: "clamp(34px, 4.4vw, 64px)" }}
          >
            {rep.name}
          </h3>
          <p className="mt-3 md:mt-4 font-inter text-text-secondary text-[12px] md:text-[13px] tracking-[0.2em] uppercase">
            {rep.nameEn}
          </p>
          <p className="mt-2 font-sans text-text-primary/85 text-[14px] md:text-[15px]">
            {rep.role}
          </p>
        </div>

        <blockquote
          className="font-sans text-text-primary leading-[2.0] whitespace-pre-line border-l-2 border-lime-deep pl-5 md:pl-7"
          style={{ fontSize: "clamp(15px, 1.4vw, 19px)", fontWeight: 500 }}
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

  // 通し番号(01〜)を割り振る
  let counter = 0;

  return (
    <div ref={sectionRef}>
      <div className="mx-auto max-w-[1400px] bg-bg-primary px-[var(--page-px)] py-[var(--section-py)]">
        <div className="space-y-28 md:space-y-40">
          {PHASES.map((phase, phaseIndex) => {
            const [featured, ...rest] = phase.staff;
            const featuredNum = String(++counter).padStart(2, "0");

            return (
              <section key={phase.num} className="scroll-in relative">
                <PhaseHero
                  num={phase.num}
                  deptEn={phase.deptEn}
                  title={phase.title}
                  subtitle={phase.subtitle}
                />

                {/* Featured: 1人目 */}
                <div className="mb-16 md:mb-24">
                  <FeaturedStaff
                    staff={featured}
                    deptEn={phase.deptEn}
                    num={featuredNum}
                  />
                </div>

                {/* Rest: 2-col asymmetric */}
                {rest.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-12 md:gap-y-16">
                    {rest.map((s) => {
                      const n = String(++counter).padStart(2, "0");
                      return (
                        <StaffSpread
                          key={s.id}
                          staff={s}
                          deptEn={phase.deptEn}
                          num={n}
                        />
                      );
                    })}
                  </div>
                ) : null}

                {/* Phase Divider — 編集誌の "次へ" 記号 */}
                {phaseIndex < PHASES.length - 1 ? (
                  <div className="mt-20 md:mt-28 flex items-center gap-4 md:gap-6">
                    <span aria-hidden className="flex-1 h-px bg-text-primary/15" />
                    <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary">
                      Next · Phase {String(phaseIndex + 2).padStart(2, "0")}
                    </p>
                    <span aria-hidden className="flex-1 h-px bg-text-primary/15" />
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>

        {/* === Representatives Section === */}
        <div className="mt-32 md:mt-48 pt-20 md:pt-28 border-t border-text-primary/15 relative">
          {/* Ghost text "REP" */}
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
            <div className="col-span-12 md:col-span-8">
              <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-lime-deep mb-3 md:mb-4">
                Representatives · 2 People
              </p>
              <h3
                className="font-sans font-black text-text-primary leading-[1.1] tracking-[-0.005em]"
                style={{ fontSize: "clamp(30px, 4.6vw, 64px)" }}
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
