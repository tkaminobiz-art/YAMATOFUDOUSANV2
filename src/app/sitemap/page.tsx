import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

export const metadata: Metadata = {
  title: "サイトマップ | やまと不動産",
  description: "やまと不動産ウェブサイトの主要ページ一覧です。",
};

const GROUPS = [
  {
    title: "家を買いたい・建てたい方",
    links: [
      { label: "トップ", href: "/" },
      { label: "商品紹介", href: "/#product" },
      { label: "標準仕様", href: "/standard" },
      { label: "資金計画", href: "/money" },
      { label: "物件情報", href: "/lots" },
      { label: "施工事例", href: "/works" },
      { label: "お客様の声", href: "/voice" },
      { label: "スタッフ紹介", href: "/staff" },
    ],
  },
  {
    title: "お問い合わせ",
    links: [
      { label: "来場予約", href: "/reserve" },
      { label: "資料請求・お問い合わせ", href: "/contact" },
      { label: "店舗情報", href: "/#access" },
    ],
  },
  {
    title: "その他",
    links: [
      { label: "家・土地を売りたい方", href: "/sell" },
      { label: "プライバシーポリシー", href: "/privacy" },
      { label: "サイトマップ", href: "/sitemap" },
    ],
  },
] as const;

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="bg-white py-[clamp(72px,8vw,140px)]">
        <div className="mx-auto max-w-[1100px] px-[var(--page-px)]">
          <p className="font-section-label mb-4 text-xs tracking-[0.18em] text-main">
            SITEMAP
          </p>
          <h1 className="font-zen-old text-[clamp(28px,4vw,48px)] font-semibold leading-[1.35] text-text-primary">
            サイトマップ
          </h1>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {GROUPS.map((group) => (
              <section key={group.title}>
                <h2 className="border-b border-border pb-4 text-sm font-bold tracking-[0.08em] text-text-primary">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-4">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary transition-colors hover:text-main"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
