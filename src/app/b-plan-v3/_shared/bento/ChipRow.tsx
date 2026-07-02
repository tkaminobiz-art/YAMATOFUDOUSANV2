import type { CSSProperties, ReactNode } from "react";

/**
 * ChipRow — チップ列。2変種を variant で持つ1コンポーネント（統合裁定2「用途で二分」）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆system §4・◆synthesis 裁定2。
 * - variant="data"  … データ判定チップ（zeroItems 6件・凡例3値 等）。
 *     .bento-chip（角2px・border rule）＋先頭に正方マーク（h-1.5 w-1.5・角）。
 *     マークの意味: lime=「発生しない/含む」の解決印 ／ risk=「増えやすい」警告印。
 *     強調（emphasis: bg-main 塗り）は1列に1個まで — それ以外は線のみ。
 * - variant="quote" … 発言・状況の引用（Anxiety/honestFeelings 等）。
 *     左罫のみ・枠なし（枠に入れると声が「商品」に見えるため）。丸ピル面塗り禁止。
 * - 丸ピル（rounded-full）の新規増殖は禁止。チップは3行以上折返す長リスト化禁止
 *   （6個超は LedgerRow の台帳行へ逃がす）。
 * - 文言は全て props で受ける（コピーのリテラルを持たない）。サーバーコンポーネント。
 * - 逐次 reveal は親 RevealGroup 配下で各チップに .scroll-in を付けたい場合のみ
 *   chipClassName で指定（本体は静的表示が既定）。
 */

type ChipTone = "lime" | "risk" | "main" | "muted";

export type Chip = {
  /** 本文（判定語・引用文）。 */
  label: ReactNode;
  /** quote 用のカテゴリ小ラベル（t-eyebrow）。data では無視される。 */
  category?: string;
  tone?: ChipTone;
  /** data のみ: bg-main 塗りの強調チップ。1列に1個まで。 */
  emphasis?: boolean;
};

/* 正方マーク（丸でなく角・図面の凡例文法）。 */
const MARK: Record<ChipTone, string> = {
  lime: "bg-lime",
  risk: "bg-risk",
  main: "bg-main",
  muted: "bg-[color:var(--color-ink-muted)]",
};
/* quote の左罫トーン。 */
const QUOTE_RULE: Record<ChipTone, string> = {
  lime: "border-lime",
  risk: "border-risk/40",
  main: "border-main/30",
  muted: "border-[color:var(--color-rule)]",
};

export default function ChipRow({
  variant,
  chips,
  tone = "light",
  className = "",
  chipClassName = "",
  "aria-label": ariaLabel,
}: {
  variant: "data" | "quote";
  chips: readonly Chip[];
  /** 置かれる面。dark=ink面（border/text を cream 系に切替）。 */
  tone?: "light" | "dark";
  className?: string;
  /** 各チップ <li> への追記クラス（親 RevealGroup 用の scroll-in 等）。 */
  chipClassName?: string;
  "aria-label"?: string;
}) {
  const dark = tone === "dark";
  const gap = variant === "data" ? "gap-2" : "gap-x-5 gap-y-3";

  return (
    <ul
      aria-label={ariaLabel}
      className={`flex list-none flex-wrap ${gap} ${className}`}
      style={
        dark
          ? ({
              /* .bento-chip は unlayered のため border 色は変数で切替（cream/25 相当）。 */
              "--bento-chip-border":
                "color-mix(in srgb, var(--color-cream) 25%, transparent)",
            } as CSSProperties)
          : undefined
      }
    >
      {chips.map((chip, i) => {
        const chipTone = chip.tone ?? "main";

        if (variant === "data") {
          const emphasis = chip.emphasis === true;
          const face = emphasis
            ? "bg-main text-cream [--bento-chip-border:var(--color-main)]"
            : dark
              ? "text-cream"
              : "text-ink";
          return (
            <li key={i} className={`bento-chip ${face} ${chipClassName}`}>
              <span
                aria-hidden
                className={`h-1.5 w-1.5 shrink-0 ${emphasis ? "bg-cream" : MARK[chipTone]}`}
              />
              <span className="[word-break:keep-all]">{chip.label}</span>
            </li>
          );
        }

        /* quote: 左罫のみ・枠なし。 */
        return (
          <li
            key={i}
            className={`border-l-2 py-1 pl-3 ${dark ? "border-cream/25" : QUOTE_RULE[chipTone]} ${chipClassName}`}
          >
            {chip.category != null && (
              <p
                className={`t-eyebrow ${dark ? "text-cream/60" : "text-main"}`}
              >
                {chip.category}
              </p>
            )}
            <p
              className={`t-body max-w-[40em] ${chip.category != null ? "mt-1.5" : ""} ${dark ? "text-cream" : "text-ink"}`}
            >
              {chip.label}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
