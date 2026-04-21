"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

/*
  ZeroDeclaration — 2026-04-21 全面リニューアル(Plan A: カタログ8タイル)
  -----------------------------------------------------------------
  旧: 418行 / ダーク背景 / Hero画像 / 3章分割 / BigProofCard + ReceiptRow
       / PROOF BOARD・EVIDENCE・DECLARATION・CHAPTER Ⅰ・OTHER PROOFS・
         WHY WE CAN PROMISE THIS の英字ラベル6種(雑誌ごっこ)

  新: 約160行 / 暖白背景 #FAF8F3 (Mechanism と連続) /
       非対称ヘッダー(1.4fr:1fr 継承) / 8タイル 4×2 完全フラット /
       1タイル = 番号 + 時期タグ + 項目名 + 1行説明 + ¥0バッジ(右上)

  設計哲学:
  - StandardAndQualitySection と同じ「同粒子で刻む」
  - Mechanism と同じ明朝 + 非対称 + border-top-[3px] のリズム
  - LIME不使用(ページ全体 7箇所ルール遵守)
  - "チャプター" や "PROOF" 等の英字装飾を排し、項目の固有名詞を主役に
*/

type Zero = {
  num: string;
  title: string;
  desc: string;
  phase: "Before" | "During" | "After";
};

/*
  カード色の交互パターン(2026-04-21 ユーザー要望):
  - 奇数(01,03,05,07): bg-white + LIME番号(現状)
  - 偶数(02,04,06,08): bg-LIME + forest-green テキスト
    (forest green = --color-main-dark #2E4600 / ブランドパレット自然系4色の1つ)
  LIMEのコントラスト確保で白文字ではなく深緑を採用。
*/
const LIME = "#A2C523";
const FOREST = "#2E4600";

function ZeroCard({ zero, index }: { zero: Zero; index: number }) {
  const isLime = index % 2 === 1;

  return (
    <article
      className={`group relative flex flex-col p-6 md:p-7 min-h-[280px] md:min-h-[300px] border transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
        isLime
          ? "bg-[#A2C523] border-[#2E4600]/15 hover:border-[#2E4600]/45 hover:shadow-[0_24px_48px_-24px_rgba(46,70,0,0.35)]"
          : "bg-white border-text-primary/10 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]"
      }`}
    >
      {/* ¥0 バッジ — ゼロ連呼というテーマの主役級に昇格 */}
      <span
        className={`font-oswald absolute top-4 right-4 md:top-5 md:right-5 leading-none inline-flex items-center justify-center px-3 py-1.5 md:px-3.5 md:py-2 border-[1.5px] tabular-nums ${
          isLime
            ? "text-[#2E4600] border-[#2E4600]/40 bg-white/35"
            : "text-[#A2C523] border-[#A2C523]/55 bg-white"
        }`}
        style={{
          fontWeight: 500,
          fontSize: "clamp(15px, 1.35vw, 19px)",
          letterSpacing: "-0.01em",
        }}
      >
        ¥0
      </span>

      {/* 番号 — 奇数: LIME / 偶数: forest green */}
      <span
        className="font-oswald leading-[0.85] transition-colors duration-500 tabular-nums"
        style={{
          fontWeight: 300,
          fontSize: "clamp(56px, 6vw, 96px)",
          letterSpacing: "-0.02em",
          color: isLime ? `${FOREST}40` : `${LIME}8C`,
        }}
      >
        {zero.num}
      </span>

      {/* 時期タグ */}
      <p
        className={`font-inter text-[10px] tracking-[0.28em] uppercase font-bold mt-auto pt-6 md:pt-8 ${
          isLime ? "text-[#2E4600]/70" : "text-text-secondary"
        }`}
      >
        {zero.phase}
      </p>

      {/* 項目名 */}
      <h3
        className="font-shippori leading-[1.3] tracking-[0.01em] mt-3"
        style={{
          fontWeight: 700,
          fontSize: "clamp(18px, 1.6vw, 24px)",
          color: isLime ? FOREST : undefined,
        }}
      >
        {zero.title}
      </h3>

      {/* 1行説明 */}
      <p
        className={`font-shippori text-[clamp(13px,1vw,15px)] leading-[2.0] mt-3 ${
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
    title: "つなぎ融資の負担",
    desc: "土地と建物をまとめて進めるので、つなぎ融資の負担を抑えられます。",
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
      className="relative overflow-hidden bg-[#FAF8F3] text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ================= HEADER (非対称・Mechanism 継承) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
          {/* Left: 看板 */}
          <div>
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
              Zero Declaration
            </p>
            <h2
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              八つの、ゼロ。
            </h2>
          </div>

          {/* Right: LEAD(Mechanism と同じ border-t-[3px] リズム) */}
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                契約前・建築中・その後。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] max-w-[480px] text-text-primary/90">
                家づくりで増えがちな費用を、
                <br />
                やまとは八つゼロにしています。
              </p>
            </div>
          </aside>
        </div>

        {/* ================= 8 タイル(白 × LIME 交互) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {ZEROS.map((z, i) => (
            <ZeroCard key={z.num} zero={z} index={i} />
          ))}
        </div>

        {/* ================= 締め ================= */}
        <div className="mt-14 md:mt-20 max-w-[800px]">
          <div className="flex items-start gap-4 md:gap-6 pt-8 border-t border-text-primary/15">
            <span
              aria-hidden
              className="font-oswald shrink-0 leading-none pt-1 text-[#A2C523]"
              style={{
                fontWeight: 300,
                fontSize: "clamp(20px, 1.6vw, 24px)",
              }}
            >
              ¥0
            </span>
            <p className="font-shippori text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[1.95]">
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
