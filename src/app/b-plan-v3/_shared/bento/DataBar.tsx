import type { ReactNode } from "react";

/**
 * DataBar — 純CSSデータビジュアル（単棒 / 積み上げ / 比較バー）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆system §3・◆motion 表。
 * - チャートライブラリ禁止（recharts/Chart.js 等不使用）。軸箱・目盛・ツールチップ・
 *   円/ドーナツ禁止。hairline 1本＋ライブHTMLの数字で読ませる。
 * - 幅%は必ず props の数値から算出する（% リテラル直書き禁止＝数値ドリフト封じ）。
 *   数値・文言は _data.ts / brand-facts から props で供給（モジュール内リテラルなし）。
 * - 色は main濃淡3値（bg-main-dark / bg-main / bg-main-light）＋ ink。
 *   risk は面で塗らない — 斜線ハッチ（.bento-hatch-risk = repeating-linear-gradient）と
 *   点（正方マーク）のみで「不確かさ」を表現する。
 * - モーション: transform:scaleX のみ（width 直アニメ禁止=M10）。IO once。
 *   個別 IO は新設せず、親 RevealGroup の .is-visible 子孫セレクタで
 *   .bento-bar-grow（980ms / --ease-bar）を駆動する。
 *   ※必ず RevealGroup（または .is-visible を付与する既存 reveal）配下に置くこと。
 *     非配下では paused のまま伸長しない（animate=false で静的表示に切替可）。
 *   reduced-motion / JS無効（scripting:none）は globals.css 側で静止全表示。
 * - サーバーコンポーネント（JS 0KB・"use client" 不要）。
 * - 数字ラベルはバーの外に静止配置（transform でラベルが動かない構造）。
 *   stack の内側に出すのはセグメント名のみ（ratio>0.13 のとき）。
 */

type FillTone = "main-dark" | "main" | "main-light" | "ink";
export type BarTone = FillTone | "risk";

const FILL: Record<FillTone, string> = {
  "main-dark": "bg-main-dark",
  main: "bg-main",
  "main-light": "bg-main-light",
  ink: "bg-ink/70",
};
/* main-light 上は lime-darker、濃面は cream（◆system §3 StackBar）。 */
const INLINE_LABEL: Record<FillTone, string> = {
  "main-dark": "text-cream",
  main: "text-cream",
  "main-light": "text-lime-darker",
  ink: "text-cream",
};

function fillClass(tone: BarTone): string {
  return tone === "risk" ? "bento-hatch-risk" : FILL[tone];
}

function widthPct(value: number, total: number): string {
  if (total <= 0 || value <= 0) return "0%";
  return `${((value / total) * 100).toFixed(3)}%`;
}

export type StackSegment = {
  label: string;
  /** 実数値（万円等）。幅%はここから算出する。 */
  value: number;
  tone: BarTone;
};

export type CompareItem = {
  /** 行ラベル（バーの外・ライブHTML）。 */
  label: ReactNode;
  /** 単値バー（家賃90,000 等）。range と排他で指定。 */
  value?: number;
  /** レンジ帯（月々 81,298〜95,413 等）。left/width % を算出し両端 tick を打つ。 */
  range?: readonly [number, number];
  tone?: BarTone;
  /** 数字表示（バーの外・呼び出し側で整形したライブHTML）。 */
  valueText?: ReactNode;
};

type BaseProps = {
  className?: string;
  /** false で伸長アニメなしの静的表示（RevealGroup 非配下で使う場合は必須）。 */
  animate?: boolean;
  "aria-label"?: string;
};

type SingleProps = BaseProps & {
  variant?: "bar";
  value: number;
  /** 共通スケール上限（明示必須・値から%算出）。 */
  max: number;
  tone?: BarTone;
};

type StackProps = BaseProps & {
  variant: "stack";
  segments: readonly StackSegment[];
  /** ratio>0.13 のセグメントだけ名前を内側表示（数字は出さない）。既定 true。 */
  showInlineLabels?: boolean;
};

type CompareProps = BaseProps & {
  variant: "compare";
  /** 全行共通のスケール上限（共通基線・明示必須）。 */
  max: number;
  items: readonly CompareItem[];
};

export type DataBarProps = SingleProps | StackProps | CompareProps;

export default function DataBar(props: DataBarProps) {
  const { className = "", animate = true } = props;
  const ariaLabel = props["aria-label"];
  const grow = animate ? "bento-bar-grow" : "";

  /* ── 積み上げ（Budget SEG_META の一般化）: ラッパー1本ごと伸長（比率が読める） ── */
  if (props.variant === "stack") {
    const { segments, showInlineLabels = true } = props;
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    return (
      <div
        className={className}
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
      >
        <div className={`flex h-9 w-full overflow-hidden rounded-[4px] ${grow}`}>
          {segments.map((s) => {
            const ratio = total > 0 ? s.value / total : 0;
            return (
              <div
                key={s.label}
                style={{ width: widthPct(s.value, total) }}
                className={`flex items-center justify-center ${fillClass(s.tone)}`}
              >
                {showInlineLabels && ratio > 0.13 && s.tone !== "risk" && (
                  <span
                    /* ◆motion 表: バー完了後にセグメント名 opacity 0→1（240ms・delay 720ms） */
                    className={`truncate px-1 text-[11px] font-bold tracking-[0.02em] ${INLINE_LABEL[s.tone]} ${
                      animate
                        ? "opacity-0 transition-opacity duration-[240ms] delay-[720ms] [.is-visible_&]:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none"
                        : ""
                    }`}
                  >
                    {s.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── 比較（家賃 vs 月々レンジ等）: 共通スケール・行ごと hairline 基線1本のみ ── */
  if (props.variant === "compare") {
    const { items, max } = props;
    return (
      <div
        className={`flex flex-col gap-5 ${className}`}
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
      >
        {items.map((item, i) => {
          const tone = item.tone ?? "main";
          const isRange = item.range != null;
          const left = isRange ? widthPct(item.range![0], max) : "0%";
          const width = isRange
            ? widthPct(item.range![1] - item.range![0], max)
            : widthPct(item.value ?? 0, max);
          return (
            <div key={i}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="t-eyebrow text-[color:var(--color-ink-muted)]">
                  {item.label}
                </span>
                {item.valueText != null && (
                  <span className="t-burn-sub">{item.valueText}</span>
                )}
              </div>
              {/* 軸箱なし。バー下に hairline 1本のみ（共通基線）。 */}
              <div className="relative mt-2 h-3 w-full border-b border-[color:var(--color-rule-faint)]">
                <div
                  style={{ left, width }}
                  className={`absolute top-0 h-3 ${fillClass(tone)} ${grow}`}
                />
                {isRange && tone !== "risk" && (
                  <>
                    <span
                      aria-hidden
                      style={{ left }}
                      className={`absolute -top-0.5 h-4 w-px ${FILL[tone]}`}
                    />
                    <span
                      aria-hidden
                      style={{ left: widthPct(item.range![1], max) }}
                      className={`absolute -top-0.5 h-4 w-px ${FILL[tone]}`}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /* ── 単棒 ── */
  const tone = props.tone ?? "main";
  return (
    <div
      className={className}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      <div className="relative h-3 w-full border-b border-[color:var(--color-rule-faint)]">
        <div
          style={{ width: widthPct(props.value, props.max) }}
          className={`absolute left-0 top-0 h-3 ${fillClass(tone)} ${grow}`}
        />
      </div>
    </div>
  );
}
