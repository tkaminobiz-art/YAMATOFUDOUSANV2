"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

/**
 * KineticHeading — 特大キネティック見出し（技法C / scroll-triggered 行マスク・リビール）。
 *
 * 各行を overflow:hidden のマスクで包み、ビューポート入射で translateY(115%→0)。叫ばない
 * （820ms・行ごと 90ms stagger・既存 ease と同系）。TOP 共通の h2 見出し規格。
 *
 * a11y: reduced-motion / scripting:none では即表示（globals.css フォールバック）。
 *   useScrollIn は reduced-motion 時に即 .is-visible を付与。JS 無効時は CSS で transform を解除。
 *
 * lines: マスク単位の行配列（複数行は要素ごとに分割して渡す）。
 * className: サイズ/色（既定 "t-h2-display"。色や surface は呼び出し側で付与）。
 */
export default function KineticHeading({
  lines,
  className = "t-h2-display",
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useScrollIn<HTMLHeadingElement>(false);
  return (
    <h2 ref={ref} className={`kin-head ${className}`}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="kin-mask">
          <span className="kin-line" style={{ transitionDelay: `${i * 90}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}
