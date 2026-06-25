import type { CSSProperties, ReactNode } from "react";

/**
 * SectionShell — 全セクション共通の外殻。
 *
 * surface（明度ウェーブ §3.3）と水平 padding / max-width / scroll-mt を統一する。
 * - surface: "ink" | "base" | "ivory" → .surface-* ユーティリティ（色は @theme トークン）。
 *   暗面 ink は §3.3 で 4回限定（S01/S05/S06/S12）。
 * - 内側コンテナは max-w-[1380px] 中央寄せ。bleed したいセクションは inner={false} で自前に。
 * - id を渡すとアンカー（scroll-mt-24 で固定ヘッダー分オフセット）。
 */
export default function SectionShell({
  id,
  surface = "base",
  inner = true,
  className = "",
  innerClassName = "",
  style,
  children,
  "aria-label": ariaLabel,
}: {
  id?: string;
  surface?: "ink" | "base" | "ivory";
  inner?: boolean;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const surfaceClass =
    surface === "ink"
      ? "surface-ink"
      : surface === "ivory"
        ? "surface-ivory"
        : "surface-base";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${surfaceClass} relative overflow-hidden px-5 py-20 md:px-10 lg:py-28 xl:px-14 ${id ? "scroll-mt-24 md:scroll-mt-28" : ""} ${className}`}
      style={style}
    >
      {inner ? (
        <div className={`relative mx-auto max-w-[1380px] ${innerClassName}`}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
