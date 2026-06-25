import Link from "next/link";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/**
 * BottomCtaBar — SP下部固定CTAバー（§7.3 / 3分割確定）。
 *
 * 電話 / LINE(中央・最強調) / 見学 の3分割。md:hidden（<768 のみ表示）。
 * - safe-area: padding-bottom: env(safe-area-inset-bottom) を内包。
 * - 各タップ領域 min-height 64px（44px+ 要件を満たす）。
 * - 中央=LINE を bg-line で最強調。電話は tel:、LINE は import URL（ハードコード禁止）。
 * - viewport-fit=cover は page metadata 側で指定（safe-area を効かせるため）。
 * 共有 src/components/FloatingCta.tsx は変更しない（このルートに閉じる）。
 */
export default function BottomCtaBar() {
  return (
    <div
      className="surface-base fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-[color:var(--color-border)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      role="navigation"
      aria-label="お問い合わせ"
    >
      <a
        href="tel:0742361123"
        className="flex min-h-[64px] flex-col items-center justify-center gap-1 text-[11px] font-bold text-ink"
      >
        <Phone className="h-4 w-4" aria-hidden />
        電話
      </a>
      <a
        href={LINE_ADD_FRIEND_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[64px] flex-col items-center justify-center gap-1 bg-line text-[11px] font-bold text-ink"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        LINEで相談
      </a>
      <Link
        href="/reserve"
        className="surface-ink flex min-h-[64px] flex-col items-center justify-center gap-1 text-[11px] font-bold"
      >
        <CalendarDays className="h-4 w-4" aria-hidden />
        見学
      </Link>
    </div>
  );
}
