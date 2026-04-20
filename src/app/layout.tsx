import type { Metadata } from "next";
import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  Inter,
  Shippori_Mincho,
  Zen_Old_Mincho,
  Kaisei_Tokumin,
  New_Tegomin,
  Bodoni_Moda,
  Playfair_Display,
  Oswald,
} from "next/font/google";
import "./globals.css";
// Leaflet の base CSS（/lots の地図用・グローバル読み込みで確実に適用）
import "leaflet/dist/leaflet.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  // 900 は HeroVoiceMagazine の TORICHO 型超巨大タイポのみで使用
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  // 700 は HeroMagazine の太明朝見出し用
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

// === /hero-lab のフォント比較用 ===
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-shippori",
  display: "swap",
});

const zenOldMincho = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-zen-old",
  display: "swap",
});

const kaiseiTokumin = Kaisei_Tokumin({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-kaisei",
  display: "swap",
});

const newTegomin = New_Tegomin({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tegomin",
  display: "swap",
});

// === /hero-lab ボディ系フォント比較用 ===
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-bodoni",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-playfair",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "やまと不動産 | 奈良の注文住宅 花鳥風月",
  description:
    "奈良の注文住宅やまと不動産。花鳥風月シリーズ2,280万円〜。建物＋付帯工事コミコミ、見積もりから増額なし。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${notoSerifJP.variable} ${shipporiMincho.variable} ${zenOldMincho.variable} ${kaiseiTokumin.variable} ${newTegomin.variable} ${bodoniModa.variable} ${playfairDisplay.variable} ${oswald.variable} ${inter.variable}`}
    >
      <body className="relative min-h-svh">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        {/* 和紙・砂壁のような微細ノイズ（全面・操作は透過） */}
        <span
          aria-hidden
          className="grain-overlay pointer-events-none fixed inset-0 z-[40] opacity-[0.028] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
      </body>
    </html>
  );
}
