"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_GROUPS = [
  {
    title: "家を買いたい方",
    items: [
      { label: "やまとの家づくり", href: "/#cost-pride" },
      { label: "商品紹介", href: "/#product" },
      { label: "物件情報", href: "/lots" },
      { label: "施工事例", href: "/works" },
      { label: "お客様の声", href: "/voice" },
      { label: "スタッフ紹介", href: "/staff" },
    ],
  },
  {
    title: "家を売りたい方",
    items: [
      { label: "売却のご相談", href: "/sell" },
      { label: "無料査定を依頼する", href: "/contact" },
    ],
  },
  {
    title: "お問い合わせ",
    items: [
      { label: "来場予約", href: "/reserve" },
      { label: "資料請求", href: "/contact" },
      { label: "お金のお話", href: "/money" },
      { label: "店舗情報", href: "/#access" },
    ],
  },
];

const SNS = [
  {
    label: "Instagram",
    href: "https://instagram.com/yamatonoie",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-[18px] h-[18px]">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@yamatofudosan",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M16.5 3h-2.7v12.2c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.3 0 .6 0 .9.1V9.6c-.3 0-.6-.1-.9-.1-3.2 0-5.7 2.6-5.7 5.7s2.6 5.7 5.7 5.7 5.7-2.6 5.7-5.7V9.5c1.1.7 2.4 1.1 3.8 1.1V7.9c-2.1 0-3.9-1.7-3.9-3.9V3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@user-ed2cw4tx9o",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
        <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const handleScrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="access"
      className="relative overflow-hidden text-[#D9CFB7]"
      style={{ backgroundColor: "#1A1714", fontFamily: "var(--font-zen-old-var)" }}
    >
      {/* ===== 木目（年輪）テクスチャ - 右側 ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-20%] w-[80%] opacity-[0.12]"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 60% 110% at 100% 50%, transparent 0 18%, rgba(212,189,168,0.55) 18.4% 18.6%, transparent 19% 24%, rgba(212,189,168,0.45) 24.4% 24.6%, transparent 25% 31%, rgba(212,189,168,0.5) 31.4% 31.6%, transparent 32% 39%, rgba(212,189,168,0.45) 39.4% 39.6%, transparent 40% 48%, rgba(212,189,168,0.4) 48.4% 48.6%, transparent 49% 58%, rgba(212,189,168,0.35) 58.4% 58.6%, transparent 59% 68%, rgba(212,189,168,0.3) 68.4% 68.6%, transparent 69%)",
            "radial-gradient(ellipse 55% 100% at 95% 50%, transparent 0 14%, rgba(212,189,168,0.3) 14.3% 14.5%, transparent 15% 22%, rgba(212,189,168,0.25) 22.3% 22.5%, transparent 23% 33%, rgba(212,189,168,0.22) 33.3% 33.5%, transparent 34% 45%, rgba(212,189,168,0.2) 45.3% 45.5%, transparent 46%)",
          ].join(","),
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-[var(--page-px)] pt-20 md:pt-24 pb-10">
        {/* ===== ナビグループ（3列） ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 mb-20 md:mb-24">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="flex items-center gap-3 text-[12px] tracking-[0.2em] mb-7 text-[#9C927B]">
                <span aria-hidden className="inline-block w-5 h-px bg-[#9C927B]" />
                {group.title}
              </p>
              <ul className="space-y-5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[15px] tracking-[0.12em] text-[#E0D6BE] hover:text-white transition-colors"
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden
                        className="text-[#9C927B] text-[13px] translate-y-[-1px] group-hover:text-white transition-colors"
                      >
                        ›
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== 区切り線 ===== */}
        <div className="h-px bg-[#3A342B]" />

        {/* ===== 会社情報 + SNS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 pt-10 md:pt-12 pb-10">
          {/* 左: ロゴ + 会社情報 */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-5 group"
              aria-label="やまと不動産 トップ"
            >
              {/* やまと不動産 公式ロゴ(ヘッダーと統一・ダーク背景に白プレートで載せる) */}
              <span
                aria-hidden
                className="inline-flex items-center justify-center px-3 py-2 rounded bg-white/95 transition-colors group-hover:bg-white"
              >
                <Image
                  src="/images/logo.png"
                  alt="やまと不動産"
                  width={293}
                  height={65}
                  className="h-7 md:h-8 w-auto"
                />
              </span>
              <span
                className="text-[15px] md:text-[16px] tracking-[0.08em] text-[#E0D6BE] group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-murecho-var)" }}
              >
                株式会社やまと不動産
              </span>
            </Link>
            <p
              className="text-[12.5px] leading-[2] tracking-[0.06em] text-[#A89E85]"
              style={{ fontFamily: "var(--font-murecho-var)" }}
            >
              〒630-8115 奈良県奈良市大宮町1丁目6番21
              <br />
              TEL: 0742-36-1123 / FAX: 0742-36-1888
              <br />
              営業時間 9:00〜19:00（火・水定休）
            </p>
          </div>

          {/* 右: SNS公式アカウント（縦線で左にセパレート） */}
          <div className="md:pl-12 md:border-l md:border-[#3A342B]">
            <p
              className="text-[12px] tracking-[0.06em] mb-5 text-[#9C927B] font-bold"
              style={{ fontFamily: "var(--font-murecho-var)" }}
            >
              SNS公式アカウント
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {SNS.map((sns) => (
                <a
                  key={sns.label}
                  href={sns.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[#E0D6BE] hover:text-white transition-colors"
                >
                  <span className="text-[#D6C9A8] group-hover:text-white transition-colors">
                    {sns.icon}
                  </span>
                  <span
                    className="text-[13px] tracking-[0.15em]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {sns.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 区切り線 ===== */}
        <div className="h-px bg-[#3A342B]" />

        {/* ===== 最下段: コピーライト + 規約リンク ===== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-7">
          <p
            className="text-[12px] tracking-[0.12em] text-[#7E7460]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            &copy; {new Date().getFullYear()} Yamato Fudousan Co., Ltd.
          </p>
          <div className="flex items-center gap-6 text-[12px] tracking-[0.12em] text-[#A89E85]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              プライバシーポリシー
            </Link>
            <span aria-hidden className="text-[#3A342B]">|</span>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              サイトマップ
            </Link>
          </div>
        </div>
      </div>

      {/* ===== スクロールトップ ボタン（右下フロート） ===== */}
      <button
        type="button"
        onClick={handleScrollTop}
        aria-label="ページトップへ戻る"
        className="absolute right-6 md:right-10 bottom-6 md:bottom-8 w-12 h-12 rounded-full border border-[#5C5444] flex items-center justify-center text-[#D6C9A8] hover:border-[#D6C9A8] hover:text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </footer>
  );
}
