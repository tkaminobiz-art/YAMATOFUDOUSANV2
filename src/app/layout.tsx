import type { Metadata } from "next";
import { Shippori_Mincho, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "やまと不動産 | 奈良の注文住宅 花鳥風月",
  description:
    "奈良で注文住宅をお考えなら、やまと不動産の花鳥風月シリーズ。見せたものと届くものが一致する家。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${shipporiMincho.variable} ${notoSansJP.variable}`}>
      <body>{children}</body>
    </html>
  );
}
