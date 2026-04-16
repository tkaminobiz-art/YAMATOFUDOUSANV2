"use client";

type Props = {
  label: string;
  title: string;
  /**
   * 画面上部に薄く沈める巨大文字（例: MECHANISM / COMPARISON）
   * 省略すると表示しない
   */
  ghostText?: string;
  /**
   * タイトル下の短いリード文。ルール上は任意だが、必要な時だけ付与する。
   */
  lead?: string;
  className?: string;
  /** h2 に追加するクラス（明朝・行間の調整など） */
  titleClassName?: string;
  /** 暗背景セクション用（CONCEPT 等） */
  theme?: "light" | "dark";
  /** 既定は中央。FVブリッジ等は left */
  align?: "center" | "left";
  /** 下マージンを詰める（ヒーロー直下の短い導入など） */
  compact?: boolean;
  /** true のときラッパーの下マージンを付けない（外側で余白を決める） */
  noMargin?: boolean;
};

export default function SectionHeaderCentered({
  label,
  title,
  ghostText,
  lead,
  className = "",
  titleClassName = "",
  theme = "light",
  align = "center",
  compact = false,
  noMargin = false,
}: Props) {
  const isDark = theme === "dark";
  const isLeft = align === "left";
  const mb = noMargin
    ? ""
    : compact
      ? "mb-6 md:mb-8"
      : "mb-10 md:mb-14";
  const layout = isLeft
    ? "flex flex-col items-start text-left"
    : "text-center";

  return (
    <div className={`relative ${mb} ${layout} ${className}`}>
      {ghostText ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute -top-6 select-none text-[clamp(56px,9vw,120px)] font-semibold tracking-[0.22em] md:-top-10 ${
            isLeft ? "left-0 text-left" : "inset-x-0 text-center"
          } ${isDark ? "text-white/[0.06]" : "text-text-primary/5"}`}
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          {ghostText}
        </div>
      ) : null}

      <span
        className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.18em] ${
          isDark
            ? "border border-white/18 bg-white/[0.07] text-white"
            : "bg-main/15 text-main"
        }`}
      >
        {label}
      </span>
      <h2
        className={`mt-6 text-[clamp(28px,4.2vw,56px)] font-semibold tracking-[0.06em] ${
          isDark ? "text-white" : "text-text-primary"
        } ${titleClassName}`}
      >
        {title}
      </h2>

      {lead ? (
        <p
          className={`mt-4 max-w-[720px] text-[clamp(15px,1.1vw,17px)] leading-relaxed ${
            isLeft ? "" : "mx-auto"
          } ${isDark ? "text-white/70" : "text-text-secondary"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
