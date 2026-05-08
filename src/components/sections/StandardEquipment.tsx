"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Calendar } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  StandardEquipment — 2026-05-08 v3 (Apple 比較ページ調・StandardComparisonBlueprint と統一)
  ---------------------------------------------------------------
  ユーザー判断: 旧 v2 (Bento + 性能ピル + 設備チップ) は重く、
  StandardComparisonBlueprint (新版) との視覚的整合がない。
  本セクションも同じ Apple 比較ページ調 (#F7F5F0 paper / #143426 dark green /
  hairline 罫線 / Hiragino + Inter) に揃えて、

    「この価格で、ここまで標準」を 4 カテゴリのチェックリストで見せる

  方針:
  - 上部に eyebrow + 大見出し + リード + 1 枚の hero photo
  - 下に 4 カテゴリ (設備 / 性能 / 構造 / サポート) のリスト
    各カテゴリ: 番号 eyebrow + カテゴリ名 + hairline + アイテム行 (✓ + 名称 + 詳細)
  - CTA バー: モデルハウス見学 + LINE
  - 注意書き: 仕様変更可能性

  カラー / フォントは StandardComparisonBlueprint と同一 (PALETTE / fontFamily)。
*/

const PALETTE = {
  bg: "#F7F5F0",
  card: "#FBFAF7",
  text: "#111111",
  textSub: "#6E6A63",
  green: "#183528",
  greenDeep: "#143426",
  rule: "#D8D2C8",
  ruleStrong: "#BDB7AB",
} as const;

const HERO_PHOTO = {
  src: "/images/standard/facility_img_01.webp",
  alt: "やまと不動産の標準装備 — システムキッチン",
  caption: "FIG. 01 — KITCHEN & DINING / STANDARD",
};

type Item = { name: string; detail?: string };
type Category = {
  no: string;
  en: string;
  ja: string;
  items: Item[];
};

const CATEGORIES: Category[] = [
  {
    no: "01",
    en: "KITCHEN & BATH",
    ja: "毎日使う設備",
    items: [
      { name: "システムキッチン", detail: "LIXIL シエラS / カップボード標準付属" },
      { name: "システムバス", detail: "LIXIL リデア / ゆとりサイズ・浴室乾燥機付" },
      { name: "洗面化粧台", detail: "LIXIL ベーシアハーモL / 三面鏡・引き出し収納" },
      { name: "タンクレストイレ", detail: "LIXIL ベーシア / 手洗い・温水洗浄便座付" },
      { name: "給湯設備", detail: "エコキュート (オール電化対応)" },
    ],
  },
  {
    no: "02",
    en: "PERFORMANCE",
    ja: "見えない性能",
    items: [
      { name: "耐震等級3", detail: "建築基準法の1.5倍 / 最高等級" },
      { name: "高気密・高断熱", detail: "UA値 0.42 W/㎡·K (風モデル相当)" },
      { name: "第一種換気システム", detail: "全熱交換型 / 省エネと空気質を両立" },
      { name: "Low-E トリプルガラス", detail: "樹脂サッシ / 結露と熱損失を抑制" },
      { name: "長期優良住宅対応", detail: "標準仕様で認定基準をクリア" },
    ],
  },
  {
    no: "03",
    en: "STRUCTURE & SAFETY",
    ja: "構造と安心",
    items: [
      { name: "制震ダンパー MIRAIE", detail: "余震を含む繰返し地震に強い構造補強" },
      { name: "ベタ基礎", detail: "鉄筋コンクリート / シロアリ・湿気対策" },
      { name: "防蟻処理", detail: "ホウ酸系 / 10年保証" },
      { name: "JAS 構造材", detail: "規格適合材を使用" },
      { name: "外壁材", detail: "サイディング / 30年メンテナンスフリー対応品" },
    ],
  },
  {
    no: "04",
    en: "SUPPORT",
    ja: "アフターサポート",
    items: [
      { name: "60年長期保証", detail: "構造・防水 30年 / 設備 10年" },
      { name: "定期点検", detail: "3ヶ月・1年・2年・5年・10年・以降5年毎" },
      { name: "24時間対応", detail: "水漏れ・設備トラブルの初動対応" },
      { name: "資金計画相談", detail: "土地探し・住宅ローンまでワンストップ" },
    ],
  },
];

export default function StandardEquipment() {
  return (
    <section
      aria-labelledby="standard-equipment-heading"
      style={{
        background: PALETTE.bg,
        color: PALETTE.text,
        fontFamily:
          '"Hiragino Sans", "Noto Sans JP", system-ui, -apple-system, sans-serif',
        fontFeatureSettings: '"palt"',
      }}
    >
      <div className="relative mx-auto max-w-[1320px] px-[var(--page-px)] py-[clamp(72px,10vw,140px)]">
        {/* ─── ヘッダー ─── */}
        <header className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-x-12 lg:gap-x-16 gap-y-10 items-end">
          <div className="max-w-[640px]">
            <p
              className="text-[10.5px] tracking-[0.32em] uppercase"
              style={{
                color: PALETTE.textSub,
                fontFamily: '"Inter", system-ui, sans-serif',
                fontWeight: 500,
              }}
            >
              Standard Equipment
            </p>
            <h2
              id="standard-equipment-heading"
              className="mt-5"
              style={{
                fontSize: "clamp(28px, 3.6vw, 46px)",
                fontWeight: 500,
                lineHeight: 1.45,
                letterSpacing: "0.04em",
                color: PALETTE.text,
              }}
            >
              この価格で、
              <br />
              ここまで標準。
            </h2>
            <p
              className="mt-6"
              style={{
                color: PALETTE.textSub,
                fontSize: "clamp(14px, 1vw, 15px)",
                lineHeight: 2,
              }}
            >
              毎日使う設備から、見えない部分の性能まで。
              住んでからの快適さを支える項目を、価格に含めています。
            </p>
            <p
              className="mt-5 inline-flex items-center gap-2 text-[12px]"
              style={{
                color: PALETTE.green,
                fontFamily: '"Inter", system-ui, sans-serif',
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
            >
              <span
                className="inline-block w-3 h-px"
                style={{ background: PALETTE.green }}
                aria-hidden
              />
              INCLUDED &nbsp;·&nbsp; 80+ ITEMS
            </p>
          </div>

          {/* hero photo (右) */}
          <figure className="relative w-full">
            <div
              className="relative w-full"
              style={{ aspectRatio: "16 / 10", background: PALETTE.rule }}
            >
              <Image
                src={HERO_PHOTO.src}
                alt={HERO_PHOTO.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
            </div>
            <figcaption
              className="mt-3 text-right text-[10.5px] tracking-[0.22em] uppercase"
              style={{
                color: PALETTE.textSub,
                fontFamily: '"Inter", system-ui, sans-serif',
              }}
            >
              ─── {HERO_PHOTO.caption}
            </figcaption>
          </figure>
        </header>

        {/* ─── 4 カテゴリ・チェックリスト ─── */}
        <div className="mt-16 md:mt-20" style={{ borderTop: `1px solid ${PALETTE.rule}` }}>
          {CATEGORIES.map((cat) => (
            <CategoryBlock key={cat.no} category={cat} />
          ))}
        </div>

        {/* ─── CTA バー (StandardComparisonBlueprint と同型) ─── */}
        <div
          className="mt-12 md:mt-14"
          style={{
            background: PALETTE.card,
            border: `1px solid ${PALETTE.rule}`,
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-px"
            style={{ background: PALETTE.rule }}
          >
            <div className="p-6 md:p-8" style={{ background: PALETTE.card }}>
              <p
                className="text-[10.5px] tracking-[0.32em] uppercase"
                style={{
                  color: PALETTE.textSub,
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontWeight: 500,
                }}
              >
                Next Step
              </p>
              <p
                className="mt-3 text-[14px] md:text-[15px]"
                style={{ color: PALETTE.text, lineHeight: 1.85 }}
              >
                実物の質感や使い勝手は、モデルハウスでご確認いただけます。
              </p>
            </div>
            <CtaCard
              href={LINE_ADD_FRIEND_URL}
              external
              icon={<MessageCircle className="w-4 h-4" strokeWidth={1.5} />}
              label="LINEで相談する"
              sub="気軽にご質問いただけます"
            />
            <CtaCard
              href="/reserve"
              icon={<Calendar className="w-4 h-4" strokeWidth={1.5} />}
              label="モデルハウスを見学する"
              sub="標準仕様を体感できます"
            />
          </div>
        </div>

        {/* ─── 注意書き ─── */}
        <p
          className="mt-7 md:mt-9 text-[11px] md:text-[11.5px]"
          style={{ color: PALETTE.textSub, lineHeight: 1.85 }}
        >
          ※ 仕様・メーカーはプランや時期により変更となる場合があります。詳細はご来場時にご案内します。
        </p>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// CategoryBlock — 番号 eyebrow + カテゴリ名 + チェックリスト
// ───────────────────────────────────────────
function CategoryBlock({ category }: { category: Category }) {
  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-10 gap-y-5 py-7 md:py-9"
      style={{ borderBottom: `1px solid ${PALETTE.rule}` }}
    >
      {/* 左: 番号 + カテゴリ名 */}
      <header>
        <p
          className="text-[10.5px] tracking-[0.32em] uppercase"
          style={{
            color: PALETTE.green,
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 500,
          }}
        >
          {category.no} &nbsp;—&nbsp; {category.en}
        </p>
        <h3
          className="mt-2 text-[16px] md:text-[17px]"
          style={{ color: PALETTE.text, fontWeight: 500, letterSpacing: "0.02em" }}
        >
          {category.ja}
        </h3>
      </header>

      {/* 右: チェックリスト */}
      <ul className="space-y-3.5">
        {category.items.map((item) => (
          <li
            key={item.name}
            className="grid grid-cols-[20px_minmax(140px,1fr)_2fr] sm:grid-cols-[20px_180px_1fr] gap-x-4 gap-y-1 items-baseline"
          >
            <span
              className="inline-flex items-center justify-center w-[18px] h-[18px] mt-0.5"
              style={{ color: PALETTE.green }}
              aria-hidden
            >
              <Check className="w-4 h-4" strokeWidth={2} />
            </span>
            <span
              className="text-[13.5px] md:text-[14px]"
              style={{ color: PALETTE.text, fontWeight: 500 }}
            >
              {item.name}
            </span>
            {item.detail && (
              <span
                className="text-[12.5px] md:text-[13px] col-span-2 sm:col-span-1 ml-[34px] sm:ml-0"
                style={{ color: PALETTE.textSub, lineHeight: 1.7 }}
              >
                {item.detail}
              </span>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

// ───────────────────────────────────────────
// CtaCard (StandardComparisonBlueprint と同型)
// ───────────────────────────────────────────
function CtaCard({
  href,
  external,
  icon,
  label,
  sub,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  const content = (
    <>
      <span
        className="inline-flex items-center justify-center w-9 h-9 shrink-0 rounded-full"
        style={{ background: PALETTE.green, color: "#ffffff" }}
        aria-hidden
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13.5px] md:text-[14.5px]"
          style={{ color: PALETTE.text, fontWeight: 500, letterSpacing: "0.02em" }}
        >
          {label}
        </p>
        <p
          className="mt-0.5 text-[11.5px]"
          style={{ color: PALETTE.textSub, lineHeight: 1.6 }}
        >
          {sub}
        </p>
      </div>
      <ArrowRight
        className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0"
        strokeWidth={1.5}
        style={{ color: PALETTE.green }}
      />
    </>
  );

  const className = "group flex items-center gap-4 p-6 md:p-7 transition-colors";
  const style = { background: PALETTE.card };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {content}
    </Link>
  );
}
