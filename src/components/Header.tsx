"use client";

import { useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "やまとの家づくり", href: "/#concept" },
  { label: "商品紹介", href: "/#product" },
  { label: "物件情報", href: "/lots" },
  { label: "施工事例", href: "/#works" },
  { label: "お客様の声", href: "/voice" },
  { label: "店舗情報", href: "/#access" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg-primary">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-[var(--page-px)]">
        {/* SP: hamburger (left) */}
        <button
          type="button"
          className="mr-2 flex h-11 w-11 items-center justify-center rounded lg:hidden"
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
        <a href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="やまと不動産"
            width={160}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </a>

        {/* Desktop nav (center) */}
        <nav
          className="hidden flex-1 items-center justify-center gap-4 lg:gap-6 xl:gap-8 lg:flex"
          aria-label="メインナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-xs lg:text-sm font-normal text-text-primary transition-colors hover:text-main"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons — min-h-[44px] for touch target */}
        <div className="flex items-center gap-2">
          <a
            href="/contact"
            className="flex items-center justify-center rounded bg-main min-h-[44px] px-4 py-2.5 text-xs font-medium text-white transition-all hover:bg-main-dark hover:-translate-y-0.5 md:px-5 md:text-sm"
          >
            資料請求
          </a>
          <a
            href="/reserve"
            className="flex items-center justify-center rounded bg-accent min-h-[44px] px-4 py-2.5 text-xs font-medium text-white transition-all hover:opacity-90 hover:-translate-y-0.5 md:px-5 md:text-sm"
          >
            来店予約
          </a>
        </div>
      </div>

      {/* SP menu overlay */}
      {menuOpen && (
        <nav
          className="border-t border-border bg-bg-primary lg:hidden"
          aria-label="モバイルナビゲーション"
        >
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
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
