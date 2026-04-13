import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
