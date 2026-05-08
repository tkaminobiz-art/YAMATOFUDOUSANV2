import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// 納品前に削除する検証用ページ。
// /font-lab : フォント/タイポグラフィ 5 案 (A〜E) を同じサンプルコピーで並べて
// 視覚比較するためのラボページ。最終 1 案を選定後にフォント差し替え実装に進む。
// 採用後はこのディレクトリごと削除する。

// ───────────────────────────────────────────────────────────
// 共通サンプル — 5 案ですべて同じ文字列を表示する
// ───────────────────────────────────────────────────────────
const SAMPLE = {
  eyebrow: "01 — STANDARD",
  h2: "標準仕様まで、しっかり比べてください。",
  h3: "家そのものに、しっかり費用をかけています。",
  body:
    "やまと不動産は、奈良・京都南部で土地探しから建物・資金計画までをまとめてご相談いただけます。総額で見える家づくりを、地域密着で支えています。",
  price: {
    label: "京モデル",
    value: "2,280",
    unit: "万円〜",
    note: "税込・建物本体＋標準付帯工事込み",
  },
  metrics: [
    { value: "600", unit: "棟以上", label: "施工実績" },
    { value: "90", unit: "区画以上", label: "分譲・土地" },
    { value: "50", unit: "組以上", label: "お客様の声" },
    { value: "14", unit: "年", label: "業歴" },
  ],
  primaryCta: "総額の目安を相談する",
  secondaryCta: "モデルハウスを見学する",
  englishSample: "Yamato Real Estate · Nara — Land · House · Plan / 0123456789",
} as const;

// ───────────────────────────────────────────────────────────
// 5 案の font stack 定義
// ───────────────────────────────────────────────────────────
type Option = {
  id: "A" | "B" | "C" | "D" | "E";
  name: string;
  intent: string;
  refs: string;
  pairs: { role: string; font: string }[];
  pros: string[];
  cons: string[];
  styles: {
    eyebrow: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    body: React.CSSProperties;
    priceLabel: React.CSSProperties;
    priceValue: React.CSSProperties;
    priceUnit: React.CSSProperties;
    priceNote: React.CSSProperties;
    metricValue: React.CSSProperties;
    metricUnit: React.CSSProperties;
    metricLabel: React.CSSProperties;
    cta: React.CSSProperties;
    english: React.CSSProperties;
  };
};

// 主要フォント (Google Fonts CDN ロード)
const F = {
  zenKaku: "'Zen Kaku Gothic Antique', sans-serif",
  zenOld: "'Zen Old Mincho', serif",
  zenMaru: "'Zen Maru Gothic', sans-serif",
  murecho: "'Murecho', sans-serif",
  klee: "'Klee One', cursive",
  bizUDP: "'BIZ UDPGothic', sans-serif",
  mplus1: "'M PLUS 1', sans-serif",
  noto: "'Noto Sans JP', sans-serif",
  shippori: "'Shippori Mincho', serif",
  // Latin
  interTight: "'Inter Tight', sans-serif",
  inter: "'Inter', sans-serif",
  fraunces: "'Fraunces', serif",
  cormorant: "'Cormorant Garamond', serif",
  dmSerif: "'DM Serif Display', serif",
  dmSans: "'DM Sans', sans-serif",
  dmMono: "'DM Mono', monospace",
  plexMono: "'IBM Plex Mono', monospace",
} as const;

const OPTIONS: Option[] = [
  // ─── A. Quiet Modernist ──────────────────────────────────
  {
    id: "A",
    name: "Quiet Modernist",
    intent: "装飾を削ぎ落とした静かな現代主義。明朝を捨ててゴシックの良いものに振る方向。",
    refs: "Aesop / 隈研吾事務所 / SANAA portfolio",
    pairs: [
      { role: "見出し", font: "Zen Kaku Gothic Antique 500" },
      { role: "本文", font: "Zen Kaku Gothic Antique 400" },
      { role: "欧文/数字", font: "Inter Tight 350–500 / tabular-nums" },
      { role: "補助欧文", font: "Cormorant Garamond 300 italic" },
    ],
    pros: ["Hero (Noto Sans) と完全コヒーレント", "禁欲的で上品", "ゴシックの質を上げる"],
    cons: ["和の温度が薄い", "住宅会社らしさは弱まる"],
    styles: {
      eyebrow: { fontFamily: F.interTight, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase" },
      h2: { fontFamily: F.zenKaku, fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1.45 },
      h3: { fontFamily: F.zenKaku, fontWeight: 500, letterSpacing: "0.03em", lineHeight: 1.45 },
      body: { fontFamily: F.zenKaku, fontWeight: 400, letterSpacing: "0.03em", lineHeight: 2 },
      priceLabel: { fontFamily: F.zenKaku, fontWeight: 500 },
      priceValue: { fontFamily: F.interTight, fontWeight: 300, letterSpacing: "0.02em", fontVariantNumeric: "tabular-nums" },
      priceUnit: { fontFamily: F.zenKaku, fontWeight: 500 },
      priceNote: { fontFamily: F.zenKaku, fontWeight: 400 },
      metricValue: { fontFamily: F.interTight, fontWeight: 300, fontVariantNumeric: "tabular-nums" },
      metricUnit: { fontFamily: F.zenKaku, fontWeight: 500 },
      metricLabel: { fontFamily: F.interTight, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" },
      cta: { fontFamily: F.zenKaku, fontWeight: 500, letterSpacing: "0.04em" },
      english: { fontFamily: F.cormorant, fontWeight: 300, fontStyle: "italic", letterSpacing: "0.04em" },
    },
  },

  // ─── B. Editorial Mincho ─────────────────────────────────
  {
    id: "B",
    name: "Editorial Mincho",
    intent: "太い明朝 + 細サンセリフ + Latin display で品ある対比を作る編集誌型。",
    refs: "Casa Brutus / Brutus / 暮らしの手帖",
    pairs: [
      { role: "見出し", font: "Zen Old Mincho 700" },
      { role: "小見出し", font: "Murecho 500" },
      { role: "本文", font: "Murecho 400" },
      { role: "欧文 display", font: "Fraunces (variable, opsz 144) 400" },
      { role: "数字", font: "Inter 400 / tabular-nums" },
    ],
    pros: ["最も編集誌的", "Hero との重みコントラストが立つ", "知性が出る"],
    cons: ["多書体運用が高難度", "Smell check 必須"],
    styles: {
      eyebrow: { fontFamily: F.fraunces, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", fontVariationSettings: "'opsz' 9" },
      h2: { fontFamily: F.zenOld, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.45 },
      h3: { fontFamily: F.murecho, fontWeight: 500, letterSpacing: "0.03em", lineHeight: 1.55 },
      body: { fontFamily: F.murecho, fontWeight: 400, letterSpacing: "0.03em", lineHeight: 2 },
      priceLabel: { fontFamily: F.murecho, fontWeight: 500 },
      priceValue: { fontFamily: F.fraunces, fontWeight: 400, letterSpacing: "0", fontVariationSettings: "'opsz' 144", fontVariantNumeric: "tabular-nums" },
      priceUnit: { fontFamily: F.murecho, fontWeight: 500 },
      priceNote: { fontFamily: F.murecho, fontWeight: 400 },
      metricValue: { fontFamily: F.inter, fontWeight: 400, fontVariantNumeric: "tabular-nums" },
      metricUnit: { fontFamily: F.murecho, fontWeight: 500 },
      metricLabel: { fontFamily: F.fraunces, fontWeight: 400, letterSpacing: "0.06em", fontVariationSettings: "'opsz' 9" },
      cta: { fontFamily: F.murecho, fontWeight: 500, letterSpacing: "0.04em" },
      english: { fontFamily: F.fraunces, fontWeight: 300, fontStyle: "italic", fontVariationSettings: "'opsz' 144", letterSpacing: "0.04em" },
    },
  },

  // ─── C. Architectural Sans ───────────────────────────────
  {
    id: "C",
    name: "Architectural Sans",
    intent: "明朝撤廃でゴシック純度を上げる硬派モダン。情報密度の高いセクション向き。",
    refs: "隈研吾事務所 / SANAA / KKAA",
    pairs: [
      { role: "見出し", font: "BIZ UDPGothic 700 (or M PLUS 1 700)" },
      { role: "本文", font: "Noto Sans JP 400 (現状維持)" },
      { role: "欧文/数字", font: "Inter Tight 400–600" },
      { role: "数字専用", font: "IBM Plex Mono 300 (Oswald を非Hero で撤退)" },
    ],
    pros: ["数字・仕様セクションが最も美しい", "建築事務所感が強い", "Hero と並立しても違和感少"],
    cons: ["温度感が下がる", "古谷社長の声と若干ズレる"],
    styles: {
      eyebrow: { fontFamily: F.plexMono, fontWeight: 400, letterSpacing: "0.24em", textTransform: "uppercase" },
      h2: { fontFamily: F.bizUDP, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.4 },
      h3: { fontFamily: F.mplus1, fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1.5 },
      body: { fontFamily: F.noto, fontWeight: 400, letterSpacing: "0.03em", lineHeight: 2 },
      priceLabel: { fontFamily: F.bizUDP, fontWeight: 700 },
      priceValue: { fontFamily: F.plexMono, fontWeight: 300, letterSpacing: "0", fontVariantNumeric: "tabular-nums" },
      priceUnit: { fontFamily: F.bizUDP, fontWeight: 700 },
      priceNote: { fontFamily: F.noto, fontWeight: 400 },
      metricValue: { fontFamily: F.plexMono, fontWeight: 300, fontVariantNumeric: "tabular-nums" },
      metricUnit: { fontFamily: F.bizUDP, fontWeight: 700 },
      metricLabel: { fontFamily: F.plexMono, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase" },
      cta: { fontFamily: F.bizUDP, fontWeight: 700, letterSpacing: "0.04em" },
      english: { fontFamily: F.plexMono, fontWeight: 300, letterSpacing: "0.06em" },
    },
  },

  // ─── D. Cultivated Tradition ─────────────────────────────
  {
    id: "D",
    name: "Cultivated Tradition",
    intent: "現状の延長で品を一段上げる。日本らしさを残したまま冷たさを抑える。",
    refs: "住友林業 / 無印良品の家 / 暮らしの手帖",
    pairs: [
      { role: "見出し", font: "Klee One 600 (教科書体ベース)" },
      { role: "小見出し", font: "Zen Old Mincho 500" },
      { role: "本文", font: "Zen Maru Gothic 400" },
      { role: "欧文 display", font: "DM Serif Display 400" },
      { role: "本文欧文", font: "DM Sans 400" },
      { role: "数字", font: "DM Mono 400 / tabular-nums" },
    ],
    pros: ["古谷社長の「正直な職人」声と最も合う", "和の温度が高い", "刷新感は弱いが安全"],
    cons: ["かっこよさより温かさ寄り", "刷新インパクト最小"],
    styles: {
      eyebrow: { fontFamily: F.dmMono, fontWeight: 400, letterSpacing: "0.24em", textTransform: "uppercase" },
      h2: { fontFamily: F.klee, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.45 },
      h3: { fontFamily: F.zenOld, fontWeight: 500, letterSpacing: "0.03em", lineHeight: 1.5 },
      body: { fontFamily: F.zenMaru, fontWeight: 400, letterSpacing: "0.04em", lineHeight: 2 },
      priceLabel: { fontFamily: F.klee, fontWeight: 600 },
      priceValue: { fontFamily: F.dmSerif, fontWeight: 400, letterSpacing: "0.01em", fontVariantNumeric: "tabular-nums" },
      priceUnit: { fontFamily: F.klee, fontWeight: 600 },
      priceNote: { fontFamily: F.zenMaru, fontWeight: 400 },
      metricValue: { fontFamily: F.dmSerif, fontWeight: 400, fontVariantNumeric: "tabular-nums" },
      metricUnit: { fontFamily: F.klee, fontWeight: 600 },
      metricLabel: { fontFamily: F.dmMono, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase" },
      cta: { fontFamily: F.klee, fontWeight: 600, letterSpacing: "0.04em" },
      english: { fontFamily: F.dmSerif, fontWeight: 400, letterSpacing: "0.04em" },
    },
  },

  // ─── E. Variable Contrast ────────────────────────────────
  {
    id: "E",
    name: "Variable Contrast",
    intent: "Variable font で極細↔極太の対比を演出する 2026 トレンド先取り型。",
    refs: "Awwwards SOTD'26 / 海外建築事務所新世代",
    pairs: [
      { role: "和文 (全担当)", font: "Murecho variable 100–900" },
      { role: "欧文 display", font: "Fraunces (variable, opsz 144) 200–500" },
      { role: "本文欧文", font: "Inter (variable) 350" },
      { role: "数字", font: "Inter Tight (variable) 300 / tabular-nums" },
    ],
    pros: ["最も今っぽい", "デザインアワード受け", "強弱演出で動的に見せられる"],
    cons: ["住宅会社らしさから最も離れる", "スタートアップ的になる懸念"],
    styles: {
      eyebrow: { fontFamily: F.fraunces, fontWeight: 200, letterSpacing: "0.32em", textTransform: "uppercase", fontVariationSettings: "'opsz' 9" },
      h2: { fontFamily: F.murecho, fontWeight: 200, letterSpacing: "0.04em", lineHeight: 1.4 },
      h3: { fontFamily: F.murecho, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1.5 },
      body: { fontFamily: F.murecho, fontWeight: 400, letterSpacing: "0.03em", lineHeight: 2 },
      priceLabel: { fontFamily: F.murecho, fontWeight: 700 },
      priceValue: { fontFamily: F.fraunces, fontWeight: 200, letterSpacing: "0", fontVariationSettings: "'opsz' 144", fontVariantNumeric: "tabular-nums" },
      priceUnit: { fontFamily: F.murecho, fontWeight: 700 },
      priceNote: { fontFamily: F.murecho, fontWeight: 400 },
      metricValue: { fontFamily: F.interTight, fontWeight: 300, fontVariantNumeric: "tabular-nums" },
      metricUnit: { fontFamily: F.murecho, fontWeight: 700 },
      metricLabel: { fontFamily: F.fraunces, fontWeight: 400, letterSpacing: "0.06em", fontVariationSettings: "'opsz' 9" },
      cta: { fontFamily: F.murecho, fontWeight: 700, letterSpacing: "0.04em" },
      english: { fontFamily: F.fraunces, fontWeight: 200, fontStyle: "italic", fontVariationSettings: "'opsz' 144", letterSpacing: "0.04em" },
    },
  },
];

// ───────────────────────────────────────────────────────────
// Sample card — 各案で同じレイアウト、違うフォントだけを差し替える
// ───────────────────────────────────────────────────────────
function SampleCard({ option }: { option: Option }) {
  const s = option.styles;
  return (
    <article className="rounded border border-[#1A1815]/10 bg-[#FAFAF7] text-[#1A1815]">
      <div className="px-8 md:px-12 lg:px-16 py-10 md:py-14">
        {/* eyebrow */}
        <p className="text-[10.5px] text-[#5E5A50]" style={s.eyebrow}>
          {SAMPLE.eyebrow}
        </p>

        {/* H2 (large) */}
        <h2
          className="mt-5 text-[#1A1815]"
          style={{ ...s.h2, fontSize: "clamp(28px, 3.4vw, 44px)" }}
        >
          {SAMPLE.h2}
        </h2>

        {/* H3 (medium) */}
        <h3
          className="mt-3 text-[#1A1815]/85"
          style={{ ...s.h3, fontSize: "clamp(18px, 1.8vw, 22px)" }}
        >
          {SAMPLE.h3}
        </h3>

        {/* Body */}
        <p
          className="mt-6 max-w-[640px] text-[#5E5A50]"
          style={{ ...s.body, fontSize: "clamp(14px, 1vw, 15px)" }}
        >
          {SAMPLE.body}
        </p>

        {/* Price block — Open Spec 風 */}
        <div className="mt-9 max-w-[560px] py-5 border-y border-[#1A1815]/15">
          <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
            <span className="text-[13px]" style={s.priceLabel}>
              {SAMPLE.price.label}
            </span>
            <span
              style={{
                ...s.priceValue,
                fontSize: "clamp(40px, 5.2vw, 64px)",
                lineHeight: 0.95,
              }}
            >
              {SAMPLE.price.value}
            </span>
            <span className="text-[15px]" style={s.priceUnit}>
              {SAMPLE.price.unit}
            </span>
          </div>
          <p
            className="mt-2 text-[11.5px] text-[#5E5A50]"
            style={s.priceNote}
          >
            {SAMPLE.price.note}
          </p>
        </div>

        {/* CTA 2 つ */}
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            href="/money"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 px-6 bg-[#1A1815] text-white text-[13px] transition-colors hover:bg-black"
            style={s.cta}
          >
            {SAMPLE.primaryCta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
          <Link
            href="/reserve"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 px-6 border border-[#1A1815] text-[#1A1815] text-[13px] transition-colors hover:bg-[#1A1815] hover:text-white"
            style={s.cta}
          >
            {SAMPLE.secondaryCta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Metrics */}
        <div className="mt-10 pt-5 border-t border-[#1A1815]/10">
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2.5">
            {SAMPLE.metrics.map((m) => (
              <span key={m.label} className="inline-flex items-baseline gap-1.5">
                <span style={{ ...s.metricValue, fontSize: 22, lineHeight: 1 }}>
                  {m.value}
                </span>
                <span className="text-[11.5px]" style={s.metricUnit}>
                  {m.unit}
                </span>
                <span className="text-[10px] ml-0.5 text-[#5E5A50]" style={s.metricLabel}>
                  / {m.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* English sample */}
        <p
          className="mt-7 text-[12.5px] text-[#5E5A50]"
          style={s.english}
        >
          {SAMPLE.englishSample}
        </p>
      </div>

      {/* spec table */}
      <div className="border-t border-[#1A1815]/10 bg-[#1A1815]/[0.03] px-8 md:px-12 lg:px-16 py-6">
        <p className="text-[10px] tracking-[0.24em] uppercase text-[#5E5A50] mb-3" style={{ fontFamily: F.interTight, fontWeight: 500 }}>
          Font Stack
        </p>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-[120px_1fr] text-[12.5px]">
          {option.pairs.map((p) => (
            <div key={p.role} className="contents">
              <dt className="text-[#5E5A50]" style={{ fontFamily: F.interTight, fontWeight: 400 }}>
                {p.role}
              </dt>
              <dd className="text-[#1A1815]" style={{ fontFamily: F.interTight, fontWeight: 500 }}>
                {p.font}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

// ───────────────────────────────────────────────────────────
// Page
// ───────────────────────────────────────────────────────────
const FONT_HREF =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700",
    "family=Zen+Old+Mincho:wght@400;500;600;700;900",
    "family=Zen+Maru+Gothic:wght@300;400;500;700;900",
    "family=Murecho:wght@100..900",
    "family=Klee+One:wght@400;600",
    "family=BIZ+UDPGothic:wght@400;700",
    "family=M+PLUS+1:wght@100..900",
    "family=Noto+Sans+JP:wght@300;400;500;700",
    "family=Inter+Tight:wght@200..700",
    "family=Inter:wght@300..700",
    "family=Fraunces:opsz,wght@9..144,200..700",
    "family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400",
    "family=DM+Serif+Display:ital@0;1",
    "family=DM+Sans:wght@400;500;700",
    "family=DM+Mono:wght@300;400;500",
    "family=IBM+Plex+Mono:wght@200;300;400;500",
    "display=swap",
  ].join("&");

export default function FontLabPage() {
  return (
    <>
      {/* Google Fonts CDN — このページのみで使用 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONT_HREF} />

      <main className="min-h-screen bg-[#1a1a1a] text-white">
        <LabDisclaimer />

        {/* レビュー UI ヘッダー */}
        <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85" style={{ fontFamily: F.interTight, fontWeight: 500 }}>
                Font Lab — Typography Comparison
              </p>
              <h1 className="mt-1 text-lg font-semibold">
                フォント方向性 5 案比較 (A / B / C / D / E)
              </h1>
            </div>
            <nav className="flex items-center gap-3 text-xs text-white/70">
              {OPTIONS.map((o) => (
                <a key={o.id} href={`#${o.id}`} className="hover:text-white">
                  {o.id} {o.name.split(" ")[0]}
                </a>
              ))}
              <span className="text-white/20">/</span>
              <Link href="/" className="hover:text-white">本番TOP →</Link>
            </nav>
          </div>
        </header>

        {/* イントロ */}
        <section className="mx-auto max-w-[1100px] px-6 py-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: F.interTight, fontWeight: 500 }}>
            2026-05-08 / Phase: Font Direction
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            5 案を同じサンプルコピーで並べて視覚比較
          </h2>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            Hero (HeroMagazine.tsx / Noto Sans JP + Oswald) は確定済み・変更しない。
            本ラボでは Hero 以外の各セクション (h2 / h3 / 本文 / 価格 / 数字 / CTA) で
            使うフォントを 5 方向で並べ、視覚比較したうえで 1 つを採用する。
            すべて Google Fonts (無料 / Adobe Fonts 不要) で構成。
          </p>

          {/* 比較サマリ */}
          <div className="mt-8 rounded border border-white/10 bg-white/[0.03] overflow-hidden text-[12.5px]">
            <table className="w-full" style={{ fontFamily: F.interTight }}>
              <thead className="bg-white/5 text-white/55 text-[10.5px] tracking-[0.2em] uppercase">
                <tr>
                  <th className="text-left px-4 py-2.5 font-medium">観点</th>
                  <th className="px-3 py-2.5 font-medium">A 静現代</th>
                  <th className="px-3 py-2.5 font-medium">B 編集誌</th>
                  <th className="px-3 py-2.5 font-medium">C 建築</th>
                  <th className="px-3 py-2.5 font-medium">D 伝統</th>
                  <th className="px-3 py-2.5 font-medium">E Variable</th>
                </tr>
              </thead>
              <tbody className="text-white/85">
                {[
                  ["和の温度", "弱", "中", "弱", "強", "中"],
                  ["編集誌感", "中", "強", "中", "中", "弱"],
                  ["かっこよさ", "強", "強", "強", "中", "強"],
                  ["住宅会社らしさ", "中", "中", "弱", "強", "弱"],
                  ["Hero 整合", "完全", "良好", "完全", "並立", "並立"],
                  ["運用難度", "低", "高", "低", "中", "高"],
                  ["刷新感", "中", "強", "強", "弱", "最強"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-white/10">
                    <td className="px-4 py-2 text-white/55">{row[0]}</td>
                    {row.slice(1).map((v, i) => (
                      <td key={i} className="px-3 py-2 text-center">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5 案 */}
        {OPTIONS.map((o) => (
          <section key={o.id} id={o.id} className="border-t border-white/10 px-6 py-12">
            <div className="mx-auto max-w-[1180px]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: F.interTight, fontWeight: 500 }}>
                Option {o.id}
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {o.name}
              </h3>
              <p className="mt-2 max-w-[820px] text-sm text-white/75 leading-relaxed">
                {o.intent}
              </p>
              <p className="mt-1 text-[12px] text-white/45" style={{ fontFamily: F.interTight }}>
                Reference: {o.refs}
              </p>

              <div className="mt-6">
                <SampleCard option={o} />
              </div>

              {/* Pros / Cons */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-[12.5px]">
                <div className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[#A9D159]/80 text-[10.5px] uppercase tracking-[0.2em] mb-2" style={{ fontFamily: F.interTight, fontWeight: 500 }}>
                    Strengths
                  </p>
                  <ul className="space-y-1.5 text-white/85 leading-relaxed">
                    {o.pros.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-white/35">＋</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-red-300/80 text-[10.5px] uppercase tracking-[0.2em] mb-2" style={{ fontFamily: F.interTight, fontWeight: 500 }}>
                    Risks
                  </p>
                  <ul className="space-y-1.5 text-white/85 leading-relaxed">
                    {o.cons.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-white/35">−</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* 次の一手 */}
        <section className="border-t border-white/10 px-6 py-16">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: F.interTight, fontWeight: 500 }}>
              次の一手
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              A / B / C / D / E のうち 1 つを採用 → 全セクション差し替え実装へ
            </h3>
            <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
              採用後は Hero (HeroMagazine.tsx) を除く全セクションの h2 / h3 / 本文 /
              価格 / 数字 / CTA に当該フォントスタックを反映します。
              `globals.css` のフォント変数を更新し、必要な Google Fonts を
              `next/font/google` で正規ロードする方針 (本ラボは CDN ロード)。
            </p>
            <p className="mt-3 max-w-[820px] text-sm leading-relaxed text-white/55">
              ハイブリッド (例: A の見出し + D の本文) もアリ。決まった方向を
              指定してもらえれば実装に進みます。
            </p>
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40" style={{ fontFamily: F.interTight }}>
          Font Lab — 2026-05-08 / Google Fonts /{" "}
          <Link href="/" className="text-white/60 hover:text-white">本番TOP</Link>
        </footer>
      </main>
    </>
  );
}
