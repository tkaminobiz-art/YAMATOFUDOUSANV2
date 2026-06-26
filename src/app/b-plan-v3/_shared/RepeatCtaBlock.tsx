import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/**
 * RepeatCtaBlock — 反復CTAブロック（§2.3 / 3点+最終1）。
 *
 * 摩擦除去マイクロコピー常設 + LINE(primary) / 見学(secondary)。
 * variant で配置点を分け、デフォルト文言は §2.3 を反映:
 *   cta1  : S03後  「相談無料・しつこいご連絡はしません」
 *   cta2  : S05後  「予算未定OK・土地なしOK・約60分」（最強発火点）
 *   final : S12     「子連れOK・オンライン可」
 *
 * CTA階層: Primary LINE > Secondary 見学（BRAND-TRUTH §5）。
 * LINE URL は src/data/line.ts から import（ハードコード禁止）。
 * ラベルは canonical default（「LINEで相談」「モデルハウスを見学する」）。
 * tone="ink" は暗面用に文字を反転。
 */
type Variant = "cta1" | "cta2" | "final";

const MICRO: Record<Variant, string> = {
  cta1: "ご相談は無料です。こちらから何度もご連絡することはありません。",
  cta2: "予算が固まっていなくても、土地がなくても大丈夫です。",
  final: "ご相談はおよそ60分が目安です。お子様連れでも、オンラインでもどうぞ。",
};

export default function RepeatCtaBlock({
  variant = "cta1",
  tone = "ink",
  lineLabel = "LINEで相談する",
  visitLabel = "モデルハウスを見学する",
  microcopy,
  showVisit = true,
  className = "",
}: {
  variant?: Variant;
  tone?: "ink" | "light";
  lineLabel?: string;
  visitLabel?: string;
  microcopy?: string;
  showVisit?: boolean;
  className?: string;
}) {
  const micro = microcopy ?? MICRO[variant];
  const onInk = tone === "ink";

  return (
    <div className={`flex flex-col items-start gap-4 ${className}`}>
      <p className={`t-body text-[13px] ${onInk ? "text-cream/70" : "text-ink-muted"}`}>
        {micro}
      </p>
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <a
          href={LINE_ADD_FRIEND_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-[56px] items-center justify-center gap-3 bg-line px-7 text-[15px] font-bold text-ink"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          {lineLabel}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
        </a>
        {showVisit && (
          <Link
            href="/reserve"
            className={`inline-flex min-h-[56px] items-center justify-center gap-3 border px-7 text-[15px] font-bold ${
              onInk
                ? "border-cream/40 text-cream"
                : "border-main text-main"
            }`}
          >
            <CalendarDays className="h-5 w-5" aria-hidden />
            {visitLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
