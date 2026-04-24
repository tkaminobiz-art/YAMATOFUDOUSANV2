"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/*
  Header — 2026-04-20 ハウスメーカー王道レイアウト + スマート縮小
  - ロゴ左 / ナビ右寄せ / CTA右端(おしゃれHM/工務店の定番)
  - スクロール80px超で上段タブが消え、下段が縮小、背景に微blur
  - NavItem に children? を予約(将来のメガメニュー/アコーディオン用)
*/

type NavChild = {
  label: string;
  href: string;
  desc?: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const ENTRY_TABS = [
  {
    label: "家を買いたい・建てたい方",
    href: "/",
    match: (path: string) =>
      path === "/" ||
      path.startsWith("/lots") ||
      path.startsWith("/voice") ||
      path.startsWith("/works") ||
      path.startsWith("/staff") ||
      path.startsWith("/money") ||
      path.startsWith("/reserve") ||
      path.startsWith("/contact"),
  },
  {
    label: "土地・家を売りたい方",
    href: "/sell",
    match: (path: string) => path.startsWith("/sell"),
  },
] as const;

const NAV_ITEMS: NavItem[] = [
  { label: "商品紹介", href: "/#product" },
  { label: "資金計画", href: "/money" },
  { label: "物件情報", href: "/lots" },
  { label: "施工事例", href: "/works" },
  { label: "お客様の声", href: "/voice" },
  { label: "スタッフ紹介", href: "/staff" },
];

const SP_NAV_ITEMS: NavItem[] = [
  { label: "やまとの家づくり", href: "/#concept" },
  { label: "商品紹介", href: "/#product" },
  { label: "資金計画", href: "/money" },
  { label: "物件情報", href: "/lots" },
  { label: "施工事例", href: "/works" },
  { label: "お客様の声", href: "/voice" },
  { label: "スタッフ紹介", href: "/staff" },
  { label: "店舗情報", href: "/#access" },
];

function NavLink({ item }: { item: NavItem }) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  return (
    <a
      href={item.href}
      className="relative group whitespace-nowrap text-[13px] xl:text-sm text-text-primary font-normal tracking-[0.04em] transition-colors hover:text-main py-2"
      aria-haspopup={hasChildren ? "menu" : undefined}
    >
      <span>{item.label}</span>
      <span
        aria-hidden
        className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-main transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[backdrop-filter,background-color] duration-300 ${
        scrolled ? "bg-bg-primary/90 backdrop-blur-md" : "bg-bg-primary"
      }`}
    >
      {/* ===== 上段: 買い手 / 売り手(スクロールで非表示) ===== */}
      <div
        aria-hidden={scrolled}
        className={`overflow-hidden border-b border-border bg-bg-secondary transition-[max-height,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-[48px] opacity-100"
        }`}
      >
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

      {/* ===== 下段: ロゴ左 + ナビ右 + CTA ===== */}
      <div className="border-b border-border transition-colors duration-300">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-[var(--page-px)] transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "h-14" : "h-20"
          }`}
        >
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

          {/* Logo (左) */}
          <Link href="/" className="shrink-0" aria-label="やまと不動産 トップ">
            <Image
              src="/images/logo.png"
              alt="やまと不動産"
              width={200}
              height={50}
              className={`w-auto transition-[height] duration-300 ${
                scrolled ? "h-7 md:h-7" : "h-8 md:h-10"
              }`}
              priority
            />
          </Link>

          {/* Desktop nav (右) */}
          <nav
            className="hidden flex-1 items-center justify-end gap-6 xl:gap-9 lg:flex"
            aria-label="メインナビゲーション"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          {/* Desktop CTA (右端) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 ml-2 xl:ml-6">
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
            <Link
              href="/reserve"
              className="group relative inline-flex items-center justify-center overflow-hidden min-h-[40px] px-4 py-2 text-xs xl:text-sm font-bold bg-lime text-lime-darker rounded border-b-[2px] border-lime-hover transition-all duration-[400ms] hover:-translate-y-0.5 hover:bg-lime-hover hover:shadow-[0_8px_24px_-4px_rgba(162,197,35,0.5)] whitespace-nowrap"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
              />
              <span className="relative">来場予約</span>
            </Link>
          </div>

          {/* SP 右端: 来場予約のみ */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/reserve"
              className="inline-flex items-center justify-center min-h-[40px] px-3 py-1.5 text-xs font-bold bg-lime text-lime-darker rounded border-b-[2px] border-lime-hover whitespace-nowrap"
            >
              来場予約
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
                className="block text-center min-h-[48px] px-6 py-3 text-sm font-bold bg-lime text-lime-darker rounded border-b-[2px] border-lime-hover"
                onClick={() => setMenuOpen(false)}
              >
                来場予約
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
