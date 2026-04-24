"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

/*
  ZeroDeclaration — 2026-04-24 v6 (案A: 二列領収書・Comparison Receipt)
  ---------------------------------------------------------------------
  v5 までのチェス盤 8 タイル均等グリッドを全廃。
  理由: タイル均等 = 8項目全部が等価に見え、"¥0 連打"のインパクトが潰れる。
  読者は「またある feature grid」で目が滑る。

  v6 = "他社の見えない請求書 vs やまと" の 二列領収書:
  - 左列(他社): 実費の目安金額を灰色で並べる → 読者は無意識に自分の見積と照合
  - 右列(やまと): 8 回の "¥0" を Lime-deep で連打 → 繰り返しの視覚リズム
  - 合計行で "およそ ¥4,300,000 の差"(=合計 vs 合計 ¥0)を叩き込む
  - 全体は 1 枚の document = 領収書 / 請求書

  哲学: 小林専務「事実で語る」。数字が仕事をする。装飾ゼロ。
  数字の出典: 業界平均試算に基づく参考値(注釈で開示)。
*/

type Phase = "契約前" | "施工中" | "入居後";

type Fee = {
  num: string;
  label: string;
  phase: Phase;
  marketAmount: string;  // "¥500,000 〜 ¥1,000,000" or "最大 ¥1,500,000" or "—"
  marketNote?: string;   // "土地 1,500万〜3,000万円の場合" 等
};

const FEES: readonly Fee[] = [
  {
    num: "01",
    label: "仲介手数料",
    phase: "契約前",
    marketAmount: "¥500,000 〜 ¥1,000,000",
    marketNote: "土地 1,500万〜3,000万円の場合",
  },
  {
    num: "02",
    label: "つなぎ融資",
    phase: "契約前",
    marketAmount: "¥300,000 〜 ¥800,000",
    marketNote: "土地先行融資の金利負担",
  },
  {
    num: "03",
    label: "地盤改良費",
    phase: "契約前",
    marketAmount: "最大 ¥1,500,000",
    marketNote: "やまとは当社が負担",
  },
  {
    num: "04",
    label: "余計な搬入費",
    phase: "施工中",
    marketAmount: "¥100,000 〜 ¥300,000",
    marketNote: "小運搬費としての計上分",
  },
  {
    num: "05",
    label: "工事車両の駐車代",
    phase: "施工中",
    marketAmount: "¥100,000 〜 ¥200,000",
    marketNote: "工期中の近隣駐車場代",
  },
  {
    num: "06",
    label: "不透明な追加費用",
    phase: "施工中",
    marketAmount: "—",
    marketNote: "見積書に載っていない費用",
  },
  {
    num: "07",
    label: "打合せ後の追加費用",
    phase: "入居後",
    marketAmount: "¥200,000 〜 ¥500,000",
    marketNote: "標準外の仕様変更分",
  },
  {
    num: "08",
    label: "モデルハウスとの差額",
    phase: "入居後",
    marketAmount: "—",
    marketNote: "設備ダウングレード分",
  },
] as const;

const TOTAL_MARKET_MAX = "およそ ¥4,300,000";
const TOTAL_YAMATO = "¥0";

// ────────────────────────────────────────────────
// Row
// ────────────────────────────────────────────────

function FeeRow({ fee }: { fee: Fee }) {
  const hasAmount = fee.marketAmount !== "—";

  return (
    <div
      role="row"
      className="scroll-in grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto] gap-x-4 md:gap-x-8 lg:gap-x-10 items-baseline py-6 md:py-7 border-b border-text-primary/10"
    >
      {/* Number */}
      <span
        role="cell"
        className="font-oswald leading-none tabular-nums text-text-primary/40 shrink-0"
        style={{
          fontWeight: 300,
          fontSize: "clamp(18px, 1.5vw, 22px)",
          letterSpacing: "-0.02em",
        }}
      >
        {fee.num}
      </span>

      {/* Label(+ phase tag + mobile note) */}
      <div role="cell" className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-sans font-bold text-text-primary text-[clamp(15px,1.2vw,18px)] leading-[1.5] tracking-[0.01em]">
            {fee.label}
          </span>
          <span className="font-inter text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-text-secondary font-bold">
            {fee.phase}
          </span>
        </div>
        {/* mobile 用: 他社金額を label 直下に表示 */}
        <div className="md:hidden mt-2">
          <p className="font-sans text-[11px] text-text-secondary leading-[1.7]">
            <span className="font-inter text-[9px] tracking-[0.2em] uppercase mr-2">他社</span>
            <span className={`font-oswald font-medium tabular-nums text-[13px] ${hasAmount ? "text-text-primary/80" : "text-text-primary/35"}`}>
              {fee.marketAmount}
            </span>
          </p>
          {fee.marketNote ? (
            <p className="font-sans text-[10px] text-text-secondary/80 leading-[1.7] mt-0.5">
              {fee.marketNote}
            </p>
          ) : null}
        </div>
      </div>

      {/* Desktop: 他社の目安 */}
      <div role="cell" className="hidden md:block text-right">
        <span
          className={`font-oswald tabular-nums whitespace-nowrap ${
            hasAmount ? "text-text-primary/80" : "text-text-primary/35"
          }`}
          style={{
            fontWeight: 400,
            fontSize: "clamp(16px, 1.4vw, 22px)",
            letterSpacing: "-0.02em",
          }}
        >
          {fee.marketAmount}
        </span>
        {fee.marketNote ? (
          <p className="font-sans text-[10px] md:text-[11px] text-text-secondary/80 leading-[1.7] mt-1">
            {fee.marketNote}
          </p>
        ) : null}
      </div>

      {/* やまと ¥0 — 主役 */}
      <span
        role="cell"
        className="font-oswald tabular-nums text-lime-deep text-right leading-none shrink-0"
        style={{
          fontWeight: 300,
          fontSize: "clamp(32px, 3.6vw, 56px)",
          letterSpacing: "-0.03em",
        }}
      >
        {TOTAL_YAMATO}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────
// メイン
// ────────────────────────────────────────────────

export default function ZeroDeclaration() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="zero"
      className="relative overflow-hidden bg-white text-text-primary py-[var(--section-py)]"
    >
      <div
        ref={ref}
        className="relative max-w-[1100px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[900px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            他社にあって、やまとにない ８ つ。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[680px]">
            家づくりで乗りがちな費用を並べると、
            <span className="font-bold text-lime-deep">およそ ¥4,300,000</span>
            の差になります。
          </p>
        </header>

        {/* ========== 領収書テーブル ========== */}
        <div role="table" aria-label="他社とやまとの費用比較">
          {/* ヘッダー行 */}
          <div
            role="row"
            className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-x-8 lg:gap-x-10 items-baseline pb-4 md:pb-5 border-b-2 border-text-primary/25"
          >
            <span role="columnheader" aria-hidden="true" />
            <span role="columnheader" aria-hidden="true" />
            <span
              role="columnheader"
              className="font-inter text-right text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-text-secondary font-bold"
            >
              他社の目安
            </span>
            <span
              role="columnheader"
              className="font-inter text-right text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-lime-deep font-bold"
            >
              やまと
            </span>
          </div>

          {/* モバイル用ヘッダー(簡素) */}
          <div className="md:hidden flex justify-end pb-3 border-b-2 border-text-primary/25">
            <span className="font-inter text-right text-[10px] tracking-[0.24em] uppercase text-lime-deep font-bold">
              やまと
            </span>
          </div>

          {/* 8 行 */}
          {FEES.map((fee) => (
            <FeeRow key={fee.num} fee={fee} />
          ))}

          {/* 合計行 — 二本線で強調 */}
          <div
            role="row"
            className="scroll-in grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto] gap-x-4 md:gap-x-8 lg:gap-x-10 items-baseline pt-8 md:pt-10 mt-1 border-t-2 border-text-primary/60"
          >
            <span role="cell" className="hidden md:block" aria-hidden="true" />

            <span
              role="cell"
              className="font-sans font-black text-text-primary leading-none tracking-[0.02em]"
              style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
            >
              合計
            </span>

            {/* Desktop: 他社合計 */}
            <span
              role="cell"
              className="hidden md:block text-right font-oswald tabular-nums text-text-primary/85 whitespace-nowrap"
              style={{
                fontWeight: 400,
                fontSize: "clamp(22px, 2.2vw, 36px)",
                letterSpacing: "-0.02em",
              }}
            >
              {TOTAL_MARKET_MAX}
            </span>

            {/* やまと合計 ¥0 - セクション全体のクライマックス */}
            <span
              role="cell"
              className="font-oswald tabular-nums text-lime-deep text-right leading-none"
              style={{
                fontWeight: 300,
                fontSize: "clamp(48px, 5.5vw, 88px)",
                letterSpacing: "-0.03em",
              }}
            >
              {TOTAL_YAMATO}
            </span>
          </div>

          {/* Mobile 用 他社合計 */}
          <div className="md:hidden mt-4 flex justify-end">
            <p className="font-sans text-[11px] text-text-secondary leading-[1.7]">
              <span className="font-inter text-[9px] tracking-[0.2em] uppercase mr-2">他社合計</span>
              <span className="font-oswald font-medium tabular-nums text-[16px] text-text-primary/85">
                {TOTAL_MARKET_MAX}
              </span>
            </p>
          </div>

          {/* 差額強調 */}
          <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-text-primary/15">
            <div className="flex items-baseline justify-end gap-3 md:gap-4 flex-wrap">
              <span className="font-inter text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-text-secondary font-bold">
                差額
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-oswald tabular-nums text-lime-deep leading-none"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(36px, 4.5vw, 72px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  −¥4,300,000
                </span>
              </div>
            </div>
            <p className="mt-3 md:mt-4 font-sans text-text-primary/70 text-[clamp(13px,1vw,15px)] leading-[1.95] text-right max-w-[44rem] ml-auto">
              広告費も、展示場維持費も、仲介マージンも、乗せる会社があります。
              やまとはそれを、最初から乗せていません。
            </p>
          </div>
        </div>

        {/* ========== 注記 ========== */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-text-primary/15 font-sans text-text-secondary text-[11px] md:text-[12px] leading-[1.95] space-y-1">
          <p>※ 他社金額は業界平均試算に基づく参考値です。土地条件・工法・エリアにより大きく変動します。</p>
          <p>※ やまとの金額は対応エリア・仕様により異なります。詳細は来場時にご案内します。</p>
          <p>※ 06 不透明な追加費用 / 08 モデルハウスとの差額 は、個別条件の差が大きいため金額表示を控えています。</p>
        </div>
      </div>
    </section>
  );
}
