import Link from "next/link";

const NAV_GROUPS = [
  {
    title: "家を買いたい方",
    items: [
      { label: "やまとの家づくり", href: "/#concept" },
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
      { label: "来店予約", href: "/reserve" },
      { label: "資料請求", href: "/contact" },
      { label: "店舗情報", href: "/#access" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)] py-12 md:py-16">
        {/* ===== ナビグループ ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <p
                className="text-white/50 text-[11px] tracking-[0.15em] mb-4 font-medium uppercase"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/80 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== 会社情報 + SNS ===== */}
        <div className="border-t border-white/10 pt-8 md:pt-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-white font-medium text-sm mb-2">
              株式会社やまと不動産
            </p>
            <p className="text-white/60 text-xs leading-[1.8]">
              〒630-8115 奈良県奈良市大宮町1丁目6番21<br />
              TEL: 0742-36-1123 / FAX: 0742-36-1888<br />
              営業時間 9:00〜19:00（火・水定休）
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-white/50 text-[11px] tracking-[0.15em] mb-3 font-medium uppercase">
              Follow
            </p>
            <div className="flex md:justify-end gap-5">
              <a
                href="https://instagram.com/yamatonoie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 text-xs hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@yamatofudosan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 text-xs hover:text-white transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://www.youtube.com/@user-ed2cw4tx9o"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 text-xs hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* ===== コピーライト ===== */}
        <p
          className="text-white/40 text-xs tracking-wider text-center md:text-left border-t border-white/10 pt-6"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          &copy; {new Date().getFullYear()} Yamato Fudousan Co., Ltd.
        </p>
      </div>
    </footer>
  );
}
