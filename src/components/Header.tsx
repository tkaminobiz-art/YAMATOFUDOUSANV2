"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/*
  Header — 2段構成（2026-04-15 リニューアル）
  神野さん決定：案α（2段構成）
  - 上段：買い手 / 売り手 の2入口タブ（公式トップとして必須の導線）
  - 下段：ロゴ + メインナビ + CTA

  CTAは緑Primary + 黒線Secondary（選択肢B）
*/

const ENTRY_TABS = [
  { label: "家を買いたい・建てたい方", href: "/", match: (path: string) => path === "/" || path.startsWith("/lots") || path.startsWith("/voice") || path.startsWith("/reserve") || path.startsWith("/contact") },
  { label: "土地・家を売りたい方", href: "/sell", match: (path: string) => path.startsWith("/sell") },
] as const;

// Desktop 用メインナビ（4項目）
const NAV_ITEMS = [
  { label: "商品紹介", href: "/#product" },
  { label: "物件情報", href: "/lots" },
  { label: "施工事例", href: "/#works" },
  { label: "お客様の声", href: "/voice" },
] as const;

// SP メニュー用（全項目）
const SP_NAV_ITEMS = [
  { label: "やまとの家づくり", href: "/#concept" },
  { label: "商品紹介", href: "/#product" },
  { label: "物件情報", href: "/lots" },
  { label: "施工事例", href: "/#works" },
  { label: "お客様の声", href: "/voice" },
  { label: "店舗情報", href: "/#access" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-primary">
      {/* ===== 上段：買い手 / 売り手の2入口タブ ===== */}
      <div className="border-b border-border bg-bg-secondary">
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
          <nav className="flex" aria-label="訪問目的ナビゲーション">
            {ENTRY_TABS.map((tab) => {
              const active = tab.match(pathname);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center justify-center min-h-[40px] md:min-h-[44px] px-4 md:px-6 text-[11px] md:text-xs font-medium transition-colors ${
                    active
                      ? "text-text-primary bg-bg-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-primary/60"
                  }`}
                >
                  {tab.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-main"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ===== 下段：ロゴ + ナビ + CTA ===== */}
      <div className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-[var(--page-px)] gap-4">
          {/* SP: hamburger */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded lg:hidden shrink-0"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="やまと不動産"
              width={160}
              height={40}
              className="h-8 md:h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav (center) */}
          <nav
            className="hidden flex-1 items-center justify-center gap-5 xl:gap-8 lg:flex"
            aria-label="メインナビゲーション"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-normal text-text-primary transition-colors hover:text-main"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Secondary 資料請求（黒線） */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden min-h-[40px] px-4 py-2 text-xs xl:text-sm font-medium border border-text-primary text-text-primary rounded transition-colors duration-[400ms] hover:text-white whitespace-nowrap"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-text-primary transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative">資料請求</span>
            </Link>

            {/* Primary 来店予約（緑solid + シマー） */}
            <Link
              href="/reserve"
              className="group relative inline-flex items-center justify-center overflow-hidden min-h-[40px] px-4 py-2 text-xs xl:text-sm font-medium bg-main text-white rounded transition-all duration-[400ms] hover:-translate-y-0.5 hover:bg-main-dark hover:shadow-[0_8px_24px_-4px_rgba(90,138,74,0.45)] whitespace-nowrap"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
              />
              <span className="relative">来店予約</span>
            </Link>
          </div>

          {/* SP 右端: 来店予約CTA のみ */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/reserve"
              className="inline-flex items-center justify-center min-h-[40px] px-3 py-1.5 text-xs font-medium bg-main text-white rounded whitespace-nowrap"
            >
              来店予約
            </Link>
          </div>
        </div>
      </div>

      {/* SP menu overlay */}
      {menuOpen && (
        <nav
          className="border-t border-border bg-bg-primary lg:hidden"
          aria-label="モバイルナビゲーション"
        >
          <ul className="flex flex-col py-2">
            {SP_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block px-6 py-3 text-sm font-normal text-text-primary transition-colors hover:bg-bg-secondary hover:text-main"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {/* SP メニュー内のCTA */}
            <li className="border-t border-border px-6 py-4 space-y-2">
              <Link
                href="/contact"
                className="block text-center min-h-[48px] px-6 py-3 text-sm font-medium border border-text-primary text-text-primary rounded"
                onClick={() => setMenuOpen(false)}
              >
                資料請求
              </Link>
              <Link
                href="/reserve"
                className="block text-center min-h-[48px] px-6 py-3 text-sm font-medium bg-main text-white rounded"
                onClick={() => setMenuOpen(false)}
              >
                来店予約
              </Link>
            </li>
            <li className="border-t border-border px-6 py-4">
              <a
                href="tel:0742361123"
                className="flex items-center gap-2 text-sm font-normal text-text-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                0742-36-1123
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
