"use client";

/*
  共通CTAボタン（折衷案B：視認性と品格の両立）
  2026-04-15 更新：神野さんの方針転換
  - Primary : 緑ソリッド + シマー（CVR最優先・ブランドアクセント）
  - Secondary : 黒線 → 黒フィル（品格保持）
  住宅サイトのゴール＝問い合わせCV のため、Primary は視認性を優先。
  落ち着いたトーンは Secondary・セクション背景・フォントで守る。

  variant:
    - primary   : 緑ソリッド + シマー（来場予約など最重要CTA）
    - secondary : 黒線 → 黒フィル（資料請求・サブCTA）
    - tertiary  : ピル型 + ブランド色（LINE/電話/メール等）
    - dark-bg   : ダーク背景上で使うprimary（白ボタン版）

  size:
    - sm : 44px / 本文リンク
    - md : 56px / 標準
    - lg : 64px / Hero / FinalCta
*/

import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  type LucideIcon,
} from "lucide-react";

type Variant = "primary" | "secondary" | "tertiary-line" | "tertiary-phone" | "tertiary-mail" | "dark-bg-primary" | "dark-bg-secondary";
type Size = "sm" | "md" | "lg";

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  label: string;
  sublabel?: string;
  icon?: "arrow" | "calendar" | "none";
  external?: boolean;
  className?: string;
};

const SIZE_MAP: Record<Size, string> = {
  sm: "min-h-[44px] px-5 py-2.5 text-sm",
  md: "min-h-[56px] px-8 py-4 text-base",
  lg: "min-h-[64px] px-10 py-4 text-lg",
};

const ICON_SIZE: Record<Size, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const SUBLABEL_TEXT_SIZE: Record<Size, string> = {
  sm: "text-[10px]",
  md: "text-[11px]",
  lg: "text-xs",
};

export default function CtaButton({
  href,
  variant = "primary",
  size = "md",
  label,
  sublabel,
  icon = "arrow",
  external = false,
  className = "",
}: Props) {
  const sizeClass = SIZE_MAP[size];
  const iconSize = ICON_SIZE[size];
  const sublabelSize = SUBLABEL_TEXT_SIZE[size];

  const IconComponent: LucideIcon | null =
    icon === "arrow"
      ? ArrowRight
      : icon === "calendar"
      ? Calendar
      : null;

  // ─── Primary（緑ソリッド + シマー）— CVR最優先 ───
  if (variant === "primary") {
    return (
      <Anchor href={href} external={external}
        className={`group relative inline-flex items-center justify-center overflow-hidden bg-main text-white rounded transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-main-dark hover:shadow-[0_16px_40px_-8px_rgba(90,138,74,0.45)] ${sizeClass} ${className}`}
      >
        {/* シマー層 */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
        />

        {sublabel ? (
          <>
            <span className="relative flex flex-col items-start mr-3">
              <span className="font-medium leading-tight">{label}</span>
              <span className={`${sublabelSize} text-white/65 leading-tight mt-0.5`}>
                {sublabel}
              </span>
            </span>
            {IconComponent && (
              <IconComponent
                className={`relative ${iconSize} transition-transform duration-[400ms] group-hover:translate-x-1`}
                strokeWidth={1.5}
              />
            )}
          </>
        ) : (
          <span className="relative flex items-center gap-2 font-medium">
            {label}
            {IconComponent && (
              <IconComponent
                className={`${iconSize} transition-transform duration-[400ms] group-hover:translate-x-1`}
                strokeWidth={1.5}
              />
            )}
          </span>
        )}
      </Anchor>
    );
  }

  // ─── Secondary（黒線 → 黒フィル） ───
  if (variant === "secondary") {
    return (
      <Anchor href={href} external={external}
        className={`group relative inline-flex items-center justify-center overflow-hidden border border-text-primary text-text-primary rounded transition-colors duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white ${sizeClass} ${className}`}
      >
        {/* スライドフィル層 */}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-text-primary transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
        />

        {sublabel ? (
          <>
            <span className="relative flex flex-col items-start mr-3">
              <span className="font-medium leading-tight">{label}</span>
              <span className={`${sublabelSize} text-text-secondary leading-tight mt-0.5 group-hover:text-white/65 transition-colors duration-[400ms]`}>
                {sublabel}
              </span>
            </span>
            {IconComponent && (
              <IconComponent
                className={`relative ${iconSize} transition-transform duration-[400ms] group-hover:translate-x-1`}
                strokeWidth={1.5}
              />
            )}
          </>
        ) : (
          <span className="relative flex items-center gap-2 font-medium">
            {label}
            {IconComponent && (
              <IconComponent
                className={`${iconSize} transition-transform duration-[400ms] group-hover:translate-x-1`}
                strokeWidth={1.5}
              />
            )}
          </span>
        )}
      </Anchor>
    );
  }

  // ─── Tertiary - LINE ───
  if (variant === "tertiary-line") {
    return (
      <Anchor href={href} external={external}
        className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#06C755] text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_24px_-4px_rgba(6,199,85,0.4)] ${className}`}
      >
        <MessageCircle className="w-4 h-4" strokeWidth={2} />
        {label}
        {sublabel && (
          <span className="text-[11px] text-white/75 ml-1">{sublabel}</span>
        )}
      </Anchor>
    );
  }

  // ─── Tertiary - 電話 ───
  if (variant === "tertiary-phone") {
    return (
      <Anchor href={href} external={external}
        className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-text-primary text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg ${className}`}
      >
        <Phone className="w-4 h-4" strokeWidth={2} />
        {label}
      </Anchor>
    );
  }

  // ─── Tertiary - メール ───
  if (variant === "tertiary-mail") {
    return (
      <Anchor href={href} external={external}
        className={`inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 border border-text-primary text-text-primary text-sm font-medium rounded-full transition-all duration-300 hover:bg-text-primary hover:text-white ${className}`}
      >
        <Mail className="w-4 h-4" strokeWidth={1.5} />
        {label}
      </Anchor>
    );
  }

  // ─── Dark background - Primary（茶系を許容）─── ※基本は使わない、必要時のみ
  if (variant === "dark-bg-primary") {
    return (
      <Anchor href={href} external={external}
        className={`group relative inline-flex items-center justify-center overflow-hidden bg-white text-text-primary rounded transition-all duration-[400ms] hover:-translate-y-0.5 hover:shadow-lg ${sizeClass} ${className}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-text-primary/10 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
        />
        {sublabel ? (
          <>
            <span className="relative flex flex-col items-start mr-3">
              <span className="font-medium leading-tight">{label}</span>
              <span className={`${sublabelSize} text-text-secondary leading-tight mt-0.5`}>
                {sublabel}
              </span>
            </span>
            {IconComponent && (
              <IconComponent className={`relative ${iconSize} transition-transform duration-[400ms] group-hover:translate-x-1`} strokeWidth={1.5} />
            )}
          </>
        ) : (
          <span className="relative flex items-center gap-2 font-medium">
            {label}
            {IconComponent && <IconComponent className={`${iconSize} transition-transform duration-[400ms] group-hover:translate-x-1`} strokeWidth={1.5} />}
          </span>
        )}
      </Anchor>
    );
  }

  // ─── Dark background - Secondary（白線→白フィル） ───
  if (variant === "dark-bg-secondary") {
    return (
      <Anchor href={href} external={external}
        className={`group relative inline-flex items-center justify-center overflow-hidden border border-white text-white rounded transition-colors duration-[400ms] hover:text-text-primary ${sizeClass} ${className}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-white transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
        />
        {sublabel ? (
          <>
            <span className="relative flex flex-col items-start mr-3">
              <span className="font-medium leading-tight">{label}</span>
              <span className={`${sublabelSize} text-white/65 leading-tight mt-0.5 group-hover:text-text-secondary transition-colors duration-[400ms]`}>
                {sublabel}
              </span>
            </span>
            {IconComponent && (
              <IconComponent className={`relative ${iconSize} transition-transform duration-[400ms] group-hover:translate-x-1`} strokeWidth={1.5} />
            )}
          </>
        ) : (
          <span className="relative flex items-center gap-2 font-medium">
            {label}
            {IconComponent && <IconComponent className={`${iconSize} transition-transform duration-[400ms] group-hover:translate-x-1`} strokeWidth={1.5} />}
          </span>
        )}
      </Anchor>
    );
  }

  return null;
}

// ─── 内部：a / Link を切り替えるラッパー ───
function Anchor({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
