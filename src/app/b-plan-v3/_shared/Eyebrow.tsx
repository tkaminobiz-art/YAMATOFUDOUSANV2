import type { ReactNode } from "react";

/**
 * Eyebrow — 欧文 caps の小ラベル（.t-eyebrow / Inter 600 / tracking）。
 * 色: 明面=text-main(深緑) / 暗面(light)=cream を 70% で。
 * canonical 標準語のみ（動詞+人型・疑問形・感情断定の短ラベル禁止）。
 */
export default function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`t-eyebrow mb-5 ${light ? "text-cream/70" : "text-main"} ${className}`}
    >
      {children}
    </p>
  );
}
