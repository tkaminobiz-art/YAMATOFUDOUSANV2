import type { CSSProperties, ReactNode } from "react";

/**
 * FlowRail — 横スクロール工程レール（SP/タブレットの折り畳み装置）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆system §6・◆synthesis 裁定5/6。
 * - 【工程系専用】Budget 冒頭の工程チップ・Voices の Before/葛藤/決め手 dl・
 *   BuildFlowSteps 等の「連続する工程・ステップ」にのみ使う。
 *   Anxiety の状況5件・Models の3モデル比較には使わない（裁定5/6:
 *   選択肢・不安の代弁は読み順が命＝縦積み常時可視が正）。
 * - 純CSS: scroll-snap-type x mandatory＋端フェード mask（globals.css .flow-rail）。
 *   手動スクロールのみ — auto-advance / 自動送り / カルーセルUI（ドット・矢印・
 *   ループJS）の実装は禁止。ユーザー駆動が唯一の駆動源。
 * - フォールバック（CSS メディア特性で判定・client 検知不要＝サーバーコンポーネント）:
 *   非タッチ（hover:hover and pointer:fine）／prefers-reduced-motion／lg 以上では
 *   grid（--flow-cols 列）へ解除し全項目常時表示。コンテンツを隠さない。
 * - tabIndex=0 + role="group" + aria-label でキーボード横スクロール可。
 *   スクロールバーは消さない（scrollbar-width: thin・a11y）。
 * - 入場アニメはレール全体1回（親 RevealGroup 配下で className="scroll-in"）。
 *   ステップ個別 stagger はしない（◆motion 表）。
 * - 工程連結は寸法線文法: 各 Item の上罫 hairline（connect）＋上端 tick（.flow-tick）。
 *   カードを枠で閉じない。
 */

function FlowRailBase({
  ariaLabel,
  cols = 3,
  className = "",
  children,
}: {
  /** レール全体の説明（role="group" のラベル・必須）。 */
  ariaLabel: string;
  /** フォールバック grid の列数（項目数に合わせる。既定3）。 */
  cols?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      tabIndex={0}
      className={`flow-rail -mx-5 px-5 ${className}`}
      style={{ "--flow-cols": cols } as CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * FlowRail.Item — レールの1工程。上罫（connect）＋tick＋連番の寸法線文法。
 * 幅・snap は globals.css の .flow-rail > * が持つ（SP: w-78vw/max-340px）。
 */
function FlowRailItem({
  num,
  connect = true,
  tick = true,
  className = "",
  children,
}: {
  /** 連番（"01" 等・Oswald tabular・装飾）。 */
  num?: string;
  /** 工程連結の上罫 hairline。 */
  connect?: boolean;
  /** 上端の寸法線 tick。 */
  tick?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${connect ? "border-t border-[color:var(--color-rule)]" : ""} ${className}`}
    >
      {tick && <span aria-hidden className="flow-tick block" />}
      {num != null && (
        <span
          aria-hidden
          className="t-burn-sub mt-3 block tabular-nums text-[color:var(--color-ink-muted)]"
        >
          {num}
        </span>
      )}
      <div className={num != null ? "mt-3" : "mt-4"}>{children}</div>
    </div>
  );
}

const FlowRail = Object.assign(FlowRailBase, { Item: FlowRailItem });
export default FlowRail;
