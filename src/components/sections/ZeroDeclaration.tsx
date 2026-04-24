"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

/*
  ZeroDeclaration — 2026-04-24 v5 (案A shukobuild型 カタログ)
  ---------------------------------------------------------------
  v4(v3まで) で残っていた:
  - Shippori Mincho (明朝) のタイル/見出し
  - "Zero Declaration" 英字kicker
  - 非対称 1.4fr:1fr ヘッダー
  を撤去。8 タイルの chess pattern はカタログ原則に合うので維持。

  v5: 一言 heading + 8タイル(Lime/白交互) + 締め
*/

type Zero = {
  num: string;
  title: string;
  desc: string;
  phase: "Before" | "During" | "After";
};

const LIME = "#A2C523";
const FOREST = "#2E4600";

function ZeroCard({ zero, index }: { zero: Zero; index: number }) {
  // 4列グリッドで対角線に同色が並ぶチェス盤
  const isLime = (index + Math.floor(index / 4)) % 2 === 1;

  return (
    <article
      className={`group relative flex flex-col p-6 md:p-7 min-h-[260px] md:min-h-[280px] border transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
        isLime
          ? "bg-[#A2C523] border-[#2E4600]/15 hover:border-[#2E4600]/45 hover:shadow-[0_24px_48px_-24px_rgba(46,70,0,0.35)]"
          : "bg-white border-text-primary/10 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]"
      }`}
    >
      {/* ¥0 バッジ(右上) */}
      <span
        className={`font-oswald absolute top-4 right-4 md:top-5 md:right-5 leading-none inline-flex items-center justify-center px-3 py-1.5 md:px-3.5 md:py-2 border-[1.5px] tabular-nums ${
          isLime
            ? "text-[#2E4600] border-[#2E4600]/40 bg-white/35"
            : "text-[#5C7A10] border-[#5C7A10]/55 bg-white"
        }`}
        style={{
          fontWeight: 500,
          fontSize: "clamp(14px, 1.2vw, 17px)",
          letterSpacing: "-0.01em",
        }}
      >
        ¥0
      </span>

      {/* 番号 — 大きな数字(Oswald Light) */}
      <span
        className="font-oswald leading-[0.85] tabular-nums"
        style={{
          fontWeight: 300,
          fontSize: "clamp(48px, 5.2vw, 84px)",
          letterSpacing: "-0.02em",
          color: isLime ? `${FOREST}40` : `${LIME}8C`,
        }}
      >
        {zero.num}
      </span>

      {/* 時期タグ(Inter uppercase) */}
      <p
        className={`font-inter text-[10px] tracking-[0.24em] uppercase font-bold mt-auto pt-6 md:pt-8 ${
          isLime ? "text-[#2E4600]/75" : "text-text-secondary"
        }`}
      >
        {zero.phase}
      </p>

      {/* 項目名 — Noto Sans 700 */}
      <h3
        className="font-sans leading-[1.4] tracking-[0.01em] mt-3"
        style={{
          fontWeight: 700,
          fontSize: "clamp(15px, 1.2vw, 18px)",
          color: isLime ? FOREST : undefined,
        }}
      >
        {zero.title}
      </h3>

      {/* 1行説明 — Noto Sans 400 */}
      <p
        className={`font-sans text-[clamp(12px,0.95vw,14px)] leading-[1.9] mt-2.5 ${
          isLime ? "text-[#2E4600]/85" : "text-text-primary/70"
        }`}
      >
        {zero.desc}
      </p>
    </article>
  );
}

const ZEROS: readonly Zero[] = [
  {
    num: "01",
    title: "仲介手数料",
    desc: "自社分譲のため、仲介会社を挟みません。",
    phase: "Before",
  },
  {
    num: "02",
    title: "つなぎ融資",
    desc: "土地と建物を自社一貫で進めるため、つなぎ融資は発生しません(30〜80万円分の節約)。",
    phase: "Before",
  },
  {
    num: "03",
    title: "地盤改良費",
    desc: "最大150万円の地盤改良費は、当社が負担します。",
    phase: "Before",
  },
  {
    num: "04",
    title: "余計な搬入費",
    desc: "工事車両がスムーズに入れるよう、分譲地を整えています。",
    phase: "During",
  },
  {
    num: "05",
    title: "工事車両の駐車代",
    desc: "自社分譲地なので、駐車スペースも確保できます。",
    phase: "During",
  },
  {
    num: "06",
    title: "不透明な追加費用",
    desc: "見積もりに載っていない費用が、あとから乗ることはありません。",
    phase: "During",
  },
  {
    num: "07",
    title: "打合せ後の追加費用",
    desc: "はじめから標準仕様を揃えています。打ち合わせで価格は上がりません。",
    phase: "After",
  },
  {
    num: "08",
    title: "モデルハウスとのギャップ",
    desc: "モデルハウスの設備は、そのまま標準仕様です。",
    phase: "After",
  },
] as const;

export default function ZeroDeclaration() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            <span
              className="font-oswald inline-block"
              style={{
                fontWeight: 300,
                letterSpacing: "-0.04em",
                color: "var(--color-lime-deep)",
                marginRight: "0.12em",
              }}
            >
              8
            </span>
            つが、ゼロです。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-secondary text-[clamp(14px,1.05vw,16px)] leading-[1.95] max-w-[620px]">
            契約前から引渡し後まで、費用は動きません。
            <br className="hidden md:inline" />
            家づくりで増えがちな費用を、やまとは八つゼロにしています。
          </p>
        </header>

        {/* ========== 8 タイル(白 × Lime 交互) ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {ZEROS.map((z, i) => (
            <ZeroCard key={z.num} zero={z} index={i} />
          ))}
        </div>

        {/* ========== 締め ========== */}
        <div className="mt-14 md:mt-20 max-w-[800px]">
          <div className="flex items-start gap-4 md:gap-6 pt-8 border-t border-text-primary/15">
            <span
              aria-hidden
              className="font-oswald shrink-0 leading-none pt-1 text-lime-deep"
              style={{
                fontWeight: 300,
                fontSize: "clamp(20px, 1.6vw, 24px)",
              }}
            >
              ¥0
            </span>
            <p className="font-sans text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[1.95]">
              お見積もりは、最終価格です。
              <br className="sm:hidden" />
              追加請求は、いたしません。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
