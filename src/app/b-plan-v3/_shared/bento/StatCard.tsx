import type { ReactNode } from "react";
import BurnNumber from "../BurnNumber";

/**
 * StatCard — 数字主役モジュール（600 / 1,000 / 150 / 月々3値 等を同一ルールで置く器）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆system §2。
 * - ラベル位置固定（上→下: t-eyebrow ラベル → 数字+単位(baseline揃え) → 注記(mono小)）。
 * - 3階級のみ（これ以外のサイズ禁止）:
 *     tier="hero" = 既存 .t-burn（BurnNumber を内包ラップ・再実装しない）。
 *                   使用は Trust600 と Budget月々の2箇所のみ。lime 下線はこの階級専用。
 *     tier="lead" = .stat-lead（Oswald 600 / clamp(40px,5vw,72px)）。Land 150・RentVsLoan レンジ等。
 *     tier="rail" = 既存 .t-burn-sub。Trust の 15/1,000/50、保証 20/10、Models 価格等。
 * - countUp 規律: `countUp` は tier="hero" のときだけ型で許可（discriminated union）。
 *   tier="lead"/"rail" に countUp を渡すと TS エラー（新規 countUp 使用を型レベルで封じる）。
 *   ※本モジュール新設に伴う countUp の新規使用は禁止（既存2箇所の移植のみ）。
 * - 注記スロット（note）: 定義・出所・景表注記（「〜以上」「程度」）はここに置く。
 * - AI-smell 回避: アイコン props は存在させない（icon+number+text 量産UIの禁止・裁定8
 *   A-09不採用）。StatCard 自体は背景・枠を持たず、置かれたセルの面に直接立つ。
 * - 文言・数値はすべて props で受ける（モジュール内にコピー・数値リテラルを持たない）。
 */

type Tone = "light" | "dark";

type CommonProps = {
  /** 上段の英字小ラベル（例: "Track Record" / "Parcels Held"）。t-eyebrow。 */
  label: string;
  /** 単位（棟以上/区画程度/円 等）。数字と baseline 揃え。 */
  unit?: ReactNode;
  /** 定義・出所・景表注記スロット（mono 小・40em measure）。 */
  note?: ReactNode;
  /** 置かれる面。dark=ink面（ラベル/注記を cream 系に）。数字色は面から継承。 */
  tone?: Tone;
  className?: string;
  /** 数字＋単位をまとめて読み上げる場合に指定（内部は aria-hidden 化）。 */
  "aria-label"?: string;
};

type HeroProps = CommonProps & {
  tier: "hero";
  value: number;
  /** countUp は hero 専用（既存2箇所: Budget月々 / Trust600 の移植のみ）。既定 false。 */
  countUp?: boolean;
  /** BurnNumber の duration（countUp 時のみ意味を持つ）。 */
  countUpDuration?: number;
  /** lime 下線（6px solid lime）。hero 階級専用。 */
  limeRule?: boolean;
  /** .t-burn への追記クラス（サイズの場当たり override は禁止・位置調整のみ）。 */
  burnClassName?: string;
};

type StaticProps = CommonProps & {
  tier: "lead" | "rail";
  value: number | string;
  /** 型レベルで封じる: hero 以外で countUp は渡せない。 */
  countUp?: never;
  countUpDuration?: never;
  limeRule?: never;
  burnClassName?: never;
};

export type StatCardProps = HeroProps | StaticProps;

export default function StatCard(props: StatCardProps) {
  const { label, unit, note, tone = "light", className = "" } = props;
  const ariaLabel = props["aria-label"];
  const muted =
    tone === "dark" ? "text-cream/60" : "text-[color:var(--color-ink-muted)]";

  let figure: ReactNode;
  if (props.tier === "hero") {
    figure = (
      <BurnNumber
        value={props.value}
        countUp={props.countUp}
        duration={props.countUpDuration}
        suffix={unit}
        aria-label={ariaLabel}
        burnClassName={`${props.limeRule ? "border-b-[6px] border-lime" : ""} ${props.burnClassName ?? ""}`}
      />
    );
  } else {
    const text =
      typeof props.value === "number"
        ? props.value.toLocaleString("ja-JP")
        : props.value;
    const numCls = props.tier === "lead" ? "stat-lead" : "t-burn-sub";
    const unitCls =
      props.tier === "lead"
        ? "t-burn-sub"
        : "text-[13px] font-semibold leading-none tracking-[0.01em]";
    figure = (
      <span
        className="inline-flex items-baseline gap-2"
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
      >
        <span className={numCls} aria-hidden={ariaLabel ? true : undefined}>
          {text}
        </span>
        {unit != null && (
          <span className={unitCls} aria-hidden={ariaLabel ? true : undefined}>
            {unit}
          </span>
        )}
      </span>
    );
  }

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <p className={`t-eyebrow ${muted}`}>{label}</p>
      <div className="mt-3">{figure}</div>
      {note != null && (
        <p
          className={`mt-3 max-w-[40em] font-mono text-[11px] leading-relaxed tracking-[0.04em] ${muted}`}
        >
          {note}
        </p>
      )}
    </div>
  );
}
