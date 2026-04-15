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
};

export default function SectionHeaderCentered({
  label,
  title,
  ghostText,
  lead,
  className = "",
  titleClassName = "",
  theme = "light",
}: Props) {
  const isDark = theme === "dark";

  return (
    <div className={`relative mb-10 md:mb-14 text-center ${className}`}>
      {ghostText ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 -top-6 md:-top-10 select-none text-[clamp(56px,9vw,120px)] font-semibold tracking-[0.22em] ${
            isDark ? "text-white/[0.06]" : "text-text-primary/5"
          }`}
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
          className={`mx-auto mt-4 max-w-[720px] text-[clamp(15px,1.1vw,17px)] leading-relaxed ${
            isDark ? "text-white/70" : "text-text-secondary"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

