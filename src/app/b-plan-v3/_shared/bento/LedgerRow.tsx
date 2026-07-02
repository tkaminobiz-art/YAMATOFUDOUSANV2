import type { ElementType, ReactNode } from "react";

/**
 * LedgerRow / LedgerGroup — 台帳行（S02CostDiagram.AnnotationRow の一般化）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆system §4。
 * - generic な <table> / DataTable は使わない（DESIGN_GUARDRAILS §3）。
 *   建築仕様書の台帳文法: 連番(Oswald tabular)＋用語(dt)＋説明(dd) を
 *   開放罫（divide-y の hairline・左右開放・箱なし）で積む。
 * - 重量差は weight prop（heavy=py-6 / medium=py-5 / light=py-4）。
 *   ゼブラ縞禁止・全行同 padding 禁止（StandardSpec の重量リズムを規範化）。
 * - caveat（景表注記「※自社分譲地が対象です」等）は同一行内に置く（隠すUI禁止）。
 * - 3列比較は LedgerRow.Compare（costCompareRows 用・現 EstimateDisclosure の後継）。
 *   外周 border は張らない（四辺閉じ枠禁止）— gap-px の開放罫のみ。
 *   「一般的には」セルの risk-soft 面はセル内限定＋正方 dot（bg-risk）。
 * - 文言・数値は全て props 供給（モジュール内にコピー・数値リテラルなし）。
 * - サーバーコンポーネント。行の reveal は親 RevealGroup 配下で className="scroll-in"。
 */

type Weight = "heavy" | "medium" | "light";
type Tone = "main" | "risk" | "ink";

const PY: Record<Weight, string> = {
  heavy: "py-6",
  medium: "py-5",
  light: "py-4",
};
const ACCENT: Record<Tone, string> = {
  main: "text-[color:var(--color-main)]",
  risk: "text-[color:var(--color-risk-dark)]",
  ink: "text-[color:var(--color-ink)]",
};

function LedgerRowBase({
  num,
  term,
  description,
  caveat,
  tone = "ink",
  weight = "medium",
  secondary = false,
  className = "",
}: {
  /** 連番（"01" 等・Oswald tabular・装飾なので aria-hidden）。 */
  num?: string;
  /** 用語（dt）。 */
  term: ReactNode;
  /** 説明（dd・t-body・40em measure）。 */
  description?: ReactNode;
  /** 景表注記。説明と同一行内（dd 内）に表示し、隠すUIにしない。 */
  caveat?: ReactNode;
  tone?: Tone;
  weight?: Weight;
  /** true=脇役スケール（連番/用語を一段小さく。S02 AnnotationRow 踏襲）。 */
  secondary?: boolean;
  className?: string;
}) {
  const accent = ACCENT[tone];
  const numCls = secondary
    ? "font-[family-name:var(--font-oswald)] font-semibold tabular-nums tracking-[0.01em] leading-none text-[length:clamp(16px,1.5vw,22px)]"
    : "t-burn-sub tabular-nums";
  const termCls = secondary
    ? "font-[family-name:var(--font-zen-kaku-new)] font-bold tracking-[0.02em] leading-[1.5] [word-break:keep-all] text-[length:clamp(18px,1.5vw,22px)]"
    : "t-h3 [word-break:keep-all]";

  const grid = num
    ? "grid-cols-[2.25rem_1fr] sm:grid-cols-[2.5rem_minmax(0,12rem)_1fr]"
    : "grid-cols-1 sm:grid-cols-[minmax(0,12rem)_1fr]";
  const ddSpan = num ? "col-span-2 sm:col-span-1" : "sm:col-span-1";

  return (
    <div
      className={`grid items-baseline gap-x-4 gap-y-1 sm:gap-x-7 ${grid} ${PY[weight]} ${className}`}
    >
      {num != null && (
        <span aria-hidden="true" className={`${numCls} ${accent}`}>
          {num}
        </span>
      )}
      <dt className={`${termCls} ${accent}`}>{term}</dt>
      {description != null && (
        <dd
          className={`t-body max-w-[40em] text-[color:var(--color-ink-muted)] ${ddSpan}`}
        >
          {description}
          {caveat != null && (
            <span className="mt-1 block text-[0.8em] text-[color:var(--color-ink-muted)]">
              {caveat}
            </span>
          )}
        </dd>
      )}
    </div>
  );
}

/**
 * LedgerRow.Compare — 3列比較行（費用名｜一般的には｜やまとは）。
 * 現 EstimateDisclosure の四辺閉じ枠（border+rounded-sm）をやめ、
 * gap-px の開放罫に統一する後継。外周 border なし。
 * セル内容（ラベル・結論・根拠）は呼び出し側がライブHTMLで組む。
 */
function LedgerCompare({
  term,
  general,
  answer,
  className = "",
}: {
  /** 費用名セル（bg-paper）。 */
  term: ReactNode;
  /** 「一般的には」セル（bg-risk-soft はセル内限定・正方 dot 付き）。 */
  general: ReactNode;
  /** 「やまとは」セル（bg-paper・結論は t-h3 text-main を呼び出し側で）。 */
  answer: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bento-hair grid grid-cols-1 gap-px bg-[color:var(--bento-hair)] md:grid-cols-[200px_1fr_1fr] ${className}`}
    >
      <div className="bg-paper p-[clamp(12px,1.2vw,20px)] [word-break:keep-all]">
        {term}
      </div>
      <div className="bg-risk-soft p-[clamp(12px,1.2vw,20px)]">
        <span aria-hidden className="mb-2 block h-1.5 w-1.5 bg-risk" />
        {general}
      </div>
      <div className="bg-paper p-[clamp(12px,1.2vw,20px)]">{answer}</div>
    </div>
  );
}

const LedgerRow = Object.assign(LedgerRowBase, { Compare: LedgerCompare });
export default LedgerRow;

/**
 * LedgerGroup — 台帳の外殻（dl 既定）。上罫1本＋行間 divide-y の開放罫。
 * 下・左右は開放（四辺閉じ禁止）。rule で上罫のトーンを選ぶ。
 */
export function LedgerGroup({
  as = "dl",
  rule = "rule",
  className = "",
  children,
}: {
  as?: ElementType;
  /** 上罫トーン: rule=標準 / strong=2px 強調 / main=深緑25%（安心台帳用）。 */
  rule?: "rule" | "strong" | "main";
  className?: string;
  children: ReactNode;
}) {
  const Tag = as;
  const top =
    rule === "strong"
      ? "border-t-2 border-t-[color:var(--color-rule-strong)]"
      : rule === "main"
        ? "border-t border-t-main/25"
        : "border-t border-t-[color:var(--color-rule)]";
  return (
    <Tag
      className={`divide-y divide-[color:var(--color-rule-faint)] ${top} ${className}`}
    >
      {children}
    </Tag>
  );
}
