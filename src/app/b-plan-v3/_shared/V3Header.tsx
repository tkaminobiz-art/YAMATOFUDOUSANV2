import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

/**
 * V3Header — /b-plan-v3 ルート専用ヘッダー。
 *
 * 共有 src/components/Header.tsx は変更しない（このルートに閉じる）。
 * nav は canonical 標準語のみ（BRAND-TRUTH §6 / AGENTS.md コピー憲法）。
 * ゴシック（font-zen-kaku-new 系）。ロゴは既存 /images/logo.png（再描画禁止）。
 */
const NAV = [
  { href: "/#product", label: "商品紹介" },
  { href: "/money", label: "資金計画" },
  { href: "/lots", label: "自社分譲地" },
  { href: "/works", label: "施工事例" },
  { href: "/voice", label: "お客様の声" },
  { href: "/staff", label: "スタッフ" },
];

export default function V3Header() {
  return (
    <header className="surface-ink sticky top-0 z-40 border-b border-cream/15">
      <div className="mx-auto flex h-16 max-w-[1520px] items-center justify-between px-4 md:h-[72px] md:px-8 xl:px-12">
        <Link href="/b-plan-v3" className="flex items-center gap-3" aria-label="やまと不動産 トップ（v3プレビュー）">
          <Image
            src="/images/logo.png"
            alt="やまと不動産"
            width={190}
            height={42}
            className="h-7 w-auto bg-white/90 px-2 py-1 md:h-8"
            priority
          />
          <span className="hidden text-[11px] font-bold tracking-[0.22em] text-cream/70 md:block">
            BPLAN V3
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="主要ナビゲーション">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="t-h3 text-[13px] font-bold text-cream/75 transition-colors hover:text-cream"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/reserve"
          className="inline-flex h-11 items-center gap-2 border border-cream/35 px-4 text-[13px] font-bold text-cream"
        >
          <CalendarDays className="h-4 w-4" aria-hidden />
          見学
        </Link>
      </div>
    </header>
  );
}
