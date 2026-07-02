import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * BentoBoard / BentoCell — 非対称グリッド基盤（編集的データダッシュボードの土台）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆system §1。
 * 「ベント」を SaaS 文法（角丸カード・影・グロー）ではなく、建築仕様書＋
 * データジャーナリズム（hairline・非対称スパン・外周開放）として実装する器。
 *
 * - グリッド: SP4 / md8 / lg12 列。gap=0、セル境界は gap-px＋地色透かし
 *   （board 側 `bg-[color:var(--bento-hair)]`、各セルが surface 色を持つ）で
 *   hairline を共有する（Estimate.client の `gap-px md:bg-border` と同系）。
 * - 外周は上下罫のみ・左右開放（四辺閉じ禁止・radius 0・影なし）。
 * - span 比率は必ず非対称（許可レシピ: 7+5 / 8+4 / 7+5+下段4+4+4 / 5+4+3。
 *   禁止: 6+6、4+4+4 の2段以上連続、3×4 均等）。主役セルは col-span-7 以上。
 * - padding は heavy / medium / light の3段のみ（均等 padding の機械適用禁止）。
 * - 1セクション1ボード上限。ボード連続禁止（間に編集の呼吸を挟む）。
 *
 * AI-smell 回避（レビュー項目）: 同型セル3連禁止（隣接セルは内容型を2種以上
 * 混在）／shadow-* 不使用／グレーボックステスト（写真セルをグレーにしても
 * span 比率だけで階層が読めること）。
 */

type Tone = "light" | "dark";
type Mode = "rule" | "air";
type Pad = "heavy" | "medium" | "light";

/* Tailwind は静的クラス名しか拾えないため、span 指定は全てリテラル表で持つ。 */
const COLS_LG: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};
const COLS_MD: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
};
const COLS_SP: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};
const ROWS_LG: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
  3: "lg:row-span-3",
  4: "lg:row-span-4",
};
/* padding 3段（◆system §1: セル内は --card-p より一段圧縮＝ダッシュボード密度）。 */
const PAD: Record<Pad, string> = {
  heavy: "p-[clamp(24px,2.4vw,40px)]",
  medium: "p-[clamp(16px,1.6vw,28px)]",
  light: "p-[clamp(12px,1.2vw,20px)]",
};

export default function BentoBoard({
  tone = "light",
  mode = "rule",
  frame = "both",
  as = "div",
  className = "",
  children,
  "aria-label": ariaLabel,
}: {
  /** hairline と既定セル地色の切替。dark=ink面（hair=cream14%）。 */
  tone?: Tone;
  /** rule=gap-px 透かし罫（高密度）／air=罫なし・編集呼吸の gap。 */
  mode?: Mode;
  /** 外周罫。both=上罫2px＋下 hairline／top=上罫のみ／none=なし。左右は常に開放。 */
  frame?: "both" | "top" | "none";
  as?: "div" | "dl" | "ul" | "ol";
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const Tag = as as ElementType;

  const hairTone = tone === "dark" ? "bento-hair bento-hair-dark" : "bento-hair";
  const modeCls =
    mode === "rule"
      ? "gap-px bg-[color:var(--bento-hair)]"
      : "gap-[clamp(16px,2vw,28px)]";

  const frameTop =
    tone === "dark"
      ? "border-t-2 border-t-cream/40"
      : "border-t-2 border-t-[color:var(--color-rule-strong)]";
  const frameBottom =
    tone === "dark"
      ? "border-b border-b-cream/15"
      : "border-b border-b-[color:var(--color-rule)]";
  const frameCls =
    frame === "both" ? `${frameTop} ${frameBottom}` : frame === "top" ? frameTop : "";

  /* セル地色は CSS 変数で配る（mode=air は透明＝親 surface を継承）。 */
  const cellBg =
    mode === "air"
      ? "transparent"
      : tone === "dark"
        ? "var(--color-ink)"
        : "var(--color-paper)";

  return (
    <Tag
      aria-label={ariaLabel}
      className={`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 ${hairTone} ${modeCls} ${frameCls} ${className}`}
      style={{ "--bento-cell-bg": cellBg } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * BentoCell — BentoBoard 直下のセル。radius 0・影なし・箱を重ねない。
 * span は lg12列基準（spanMd=md8列・spanSp=SP4列。省略時は各段で全幅）。
 * 主役セルは span>=7 かつ pad="heavy" で重量差を作る（均等禁止）。
 */
export function BentoCell({
  span = 12,
  spanMd = 8,
  spanSp = 4,
  rowSpan,
  pad = "medium",
  as = "div",
  className = "",
  children,
}: {
  /** lg（12列）での col-span。1〜12。 */
  span?: number;
  /** md（8列）での col-span。1〜8。省略時 8（全幅）。 */
  spanMd?: number;
  /** SP（4列）での col-span。1〜4。省略時 4（全幅）。 */
  spanSp?: number;
  /** lg での row-span。1〜4。 */
  rowSpan?: number;
  pad?: Pad;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}) {
  const Tag = as;
  const cls = [
    COLS_SP[spanSp] ?? COLS_SP[4],
    COLS_MD[spanMd] ?? COLS_MD[8],
    COLS_LG[span] ?? COLS_LG[12],
    rowSpan ? (ROWS_LG[rowSpan] ?? "") : "",
    PAD[pad],
    "bg-[color:var(--bento-cell-bg)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={cls}>{children}</Tag>;
}
