// HeroMagazine の見出し+ボディ系フォントバリアント定義。
// "use client" を付けず、サーバ/クライアント両方から import 可能にしている
// (page.tsx が server component のため、HeroMagazine.tsx 内に直接定義すると
//  client export のまま server から呼べず TypeError になる)。

export type HeroFontVariant = {
  id: string;
  label: string;
  description: string;
  fontFamily: string;
  weightSubLines: number;
  weightBigLine: number;
  letterSpacing: string;
};

export const FONT_VARIANTS: HeroFontVariant[] = [
  {
    id: "noto-sans",
    label: "Z. Noto Sans JP (catalog)",
    description: "shukobuild型カタログ / ゴシック太字 / 明朝退役後の本番",
    fontFamily: "var(--font-noto), 'Noto Sans JP', 'Hiragino Sans', sans-serif",
    weightSubLines: 500,
    weightBigLine: 900,
    letterSpacing: "0.01em",
  },
  {
    id: "noto-serif",
    label: "A. Noto Serif JP",
    description: "現行baseline / Web普及型・無難で読みやすい",
    fontFamily: "var(--font-noto-serif), 'Noto Serif JP', 'Hiragino Mincho ProN', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.02em",
  },
  {
    id: "shippori",
    label: "B. Shippori Mincho",
    description: "出版・雑誌系 / 紙面に強い・落ち着いた現代の太明朝",
    fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.02em",
  },
  {
    id: "zen-old",
    label: "C. Zen Old Mincho",
    description: "情緒・伝統 / オールド系で和の格調・文芸的",
    fontFamily: "var(--font-zen-old), 'Zen Old Mincho', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.01em",
  },
  {
    id: "kaisei",
    label: "D. Kaisei Tokumin",
    description: "個性派 / 力強い字面・古い印刷物のような独特の重み",
    fontFamily: "var(--font-kaisei), 'Kaisei Tokumin', serif",
    weightSubLines: 500,
    weightBigLine: 700,
    letterSpacing: "0em",
  },
  {
    id: "tegomin",
    label: "E. New Tegomin",
    description: "筆勢・手書き感 / 情緒重視・雑誌の特集タイトル風",
    fontFamily: "var(--font-tegomin), 'New Tegomin', serif",
    weightSubLines: 400,
    weightBigLine: 400,
    letterSpacing: "0em",
  },
];

export type HeroBodyVariant = {
  id: string;
  label: string;
  description: string;
  numberFontFamily: string;
  numberWeight: number;
  numberLetterSpacing: string;
  jaFontFamily: string;
  jaWeight: number;
};

export const BODY_VARIANTS: HeroBodyVariant[] = [
  {
    id: "modern",
    label: "I. Modern Sans (現行)",
    description: "Inter Light + Noto Sans JP / モダン・ニュートラル",
    numberFontFamily: "var(--font-inter), Inter, sans-serif",
    numberWeight: 300,
    numberLetterSpacing: "-0.04em",
    jaFontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
    jaWeight: 400,
  },
  {
    id: "magazine-serif",
    label: "II. Magazine Serif",
    description: "Bodoni Moda + Noto Serif JP / 高級雑誌のオール明朝・セリフ",
    numberFontFamily: "var(--font-bodoni), 'Bodoni Moda', serif",
    numberWeight: 400,
    numberLetterSpacing: "-0.02em",
    jaFontFamily: "var(--font-noto-serif), 'Noto Serif JP', serif",
    jaWeight: 400,
  },
  {
    id: "editorial-mix",
    label: "III. Editorial Mix",
    description: "Playfair Display + Shippori Mincho / 編集誌の優雅さ",
    numberFontFamily: "var(--font-playfair), 'Playfair Display', serif",
    numberWeight: 400,
    numberLetterSpacing: "-0.02em",
    jaFontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
    jaWeight: 400,
  },
  {
    id: "industrial-bold",
    label: "IV. Industrial",
    description: "Oswald Light + Noto Sans JP 500 / コンデンス・力強い",
    numberFontFamily: "var(--font-oswald), 'Oswald', sans-serif",
    numberWeight: 300,
    numberLetterSpacing: "-0.01em",
    jaFontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
    jaWeight: 500,
  },
];
