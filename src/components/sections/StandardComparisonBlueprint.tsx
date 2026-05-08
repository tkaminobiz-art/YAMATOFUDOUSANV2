"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MessageCircle, Calendar, BookOpen } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  StandardComparisonBlueprint — 2026-05-08 v2 (Apple comparison-page tone)
  ---------------------------------------------------------------
  ユーザー判断 (2026-05-08): 旧版は「ダサい」。Apple 製品比較ページの
  トーン (余白・罫線・タイポグラフィで見せる、装飾は抑制) で再実装。

  方針:
  - 背景: paper #F7F5F0 (warmer than bg-primary)
  - アクセント: 深緑 #183528 / 比較表ヘッダー #143426
  - 数字: Inter / system-ui (Hero の Oswald とは別系統)
  - 本文: Hiragino Sans / Noto Sans JP / system-ui (B案 Murecho ではなく
    システム寄りで Apple 比較ページに近い清潔感を出す)
  - 比較表は <table> セマンティクス + sticky 左カラムで mobile 対応

  データはすべて配列で管理。価格・仕様の差し替えは MODELS / SPEC_ROWS で。

  DESIGN_GUARDRAILS 準拠:
  - 角丸 4px 以下 / 影は box-shadow なし (hairline 罫線のみ)
  - card-padding 同一禁止 (項目セルと値セルで密度を変える)
  - icon 量産禁止 (項目列にアイコンは入れない / 文字のみ)
*/

// ───────────────────────────────────────────
// データ — モデル / 比較項目
// 商品ラインは「花・風・京」3モデル (canonical: PriceSection.tsx PLANS 順序)
// memory: reference_product_line_hana_kaze_miyako.md
// ───────────────────────────────────────────
const MODELS = [
  {
    id: "hana",
    name: "花",
    reading: "HANA",
    subtitle: "広さと仕様にゆとりを持たせたいご家族へ。",
    price: "2,480",
    image: "/images/fv/plan-hana.webp",
    alt: "花モデルの邸宅外観イメージ — 山並みと整った前庭",
  },
  {
    id: "kaze",
    name: "風",
    reading: "KAZE",
    subtitle: "暮らしやすさと価格のバランスを大切にしたいご家族へ。",
    price: "2,480",
    image: "/images/fv/plan-kaze.webp",
    alt: "風モデルの邸宅外観イメージ — 整った正面と芝生のアプローチ",
  },
  {
    id: "miyako",
    name: "京",
    reading: "MIYAKO",
    subtitle: "必要な広さに絞り、総額を抑えやすい標準プラン。",
    price: "2,280",
    image: "/images/fv/plan-miyako.webp",
    alt: "京モデルの端正な玄関まわり — 木目スリットと石畳のアプローチ",
    badge: "いちばん選ばれています",
  },
] as const;

type SpecRow = {
  label: string;
  values: [string, string, string]; // [花, 風, 京]
  highlight?: boolean; // 価格行は強調
};

// ※ 仕様詳細 (UA値・LIXIL設備型番等) は実データ確定までの placeholder。
//    確定後にこの SPEC_ROWS を上書きすれば全表に反映される。
const SPEC_ROWS: SpecRow[] = [
  {
    label: "本体価格",
    values: ["2,480万円〜", "2,480万円〜", "2,280万円〜"],
    highlight: true,
  },
  {
    label: "間取り",
    values: ["4LDK", "4LDK", "3LDK"],
  },
  {
    label: "延床面積",
    values: ["33坪 (109㎡)", "30坪 (99㎡)", "28坪 (92㎡)"],
  },
  {
    label: "耐震等級",
    values: ["耐震等級3 (最高等級)", "耐震等級3 (最高等級)", "耐震等級3 (最高等級)"],
  },
  {
    label: "断熱性能 (UA値)",
    values: ["0.34 W/㎡·K", "0.42 W/㎡·K", "0.46 W/㎡·K"],
  },
  {
    label: "窓仕様",
    values: [
      "樹脂サッシ Low-E トリプルガラス",
      "樹脂サッシ Low-E トリプルガラス",
      "樹脂サッシ Low-E 複層ガラス",
    ],
  },
  {
    label: "キッチン",
    values: ["LIXIL リシェルSI", "LIXIL ノクト", "LIXIL シエラS"],
  },
  {
    label: "浴室",
    values: ["LIXIL スパージュ", "LIXIL スパージュ", "LIXIL リデア"],
  },
  {
    label: "洗面",
    values: ["LIXIL ルミシス", "LIXIL ピアラ", "LIXIL ベーシアハーモL"],
  },
  {
    label: "トイレ",
    values: ["LIXIL サティスG", "LIXIL サティスS", "LIXIL ベーシア"],
  },
  {
    label: "保証・アフターサポート",
    values: [
      "最長60年保証 (構造・防水30年/設備10年)",
      "最長60年保証 (構造・防水30年/設備10年)",
      "最長60年保証 (構造・防水30年/設備10年)",
    ],
  },
];

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

// ───────────────────────────────────────────
// 簡易 SVG 線画 (右上の薄い装飾)
// ───────────────────────────────────────────
function HouseDrawing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      className={className}
      aria-hidden
    >
      <path d="M40 170 L40 90 L160 30 L280 90 L280 170 Z" />
      <path d="M40 170 L280 170" strokeWidth="0.8" />
      <path d="M40 90 L160 30 L280 90" />
      <rect x="70" y="110" width="40" height="40" />
      <rect x="80" y="110" width="20" height="40" strokeDasharray="2 2" />
      <rect x="140" y="110" width="40" height="40" />
      <rect x="210" y="110" width="40" height="40" />
      <rect x="220" y="110" width="20" height="40" strokeDasharray="2 2" />
      <rect x="146" y="130" width="28" height="40" />
      <path d="M30 178 L290 178" strokeWidth="0.4" />
      <path d="M30 174 L30 182 M290 174 L290 182" strokeWidth="0.4" />
      <text x="160" y="194" textAnchor="middle" fontSize="6" fill="currentColor" stroke="none">
        12,000
      </text>
      <path d="M16 30 L16 170" strokeWidth="0.4" />
      <path d="M12 30 L20 30 M12 170 L20 170" strokeWidth="0.4" />
    </svg>
  );
}

// ───────────────────────────────────────────
// メインコンポーネント
// ───────────────────────────────────────────
export default function StandardComparisonBlueprint() {
  const [tab, setTab] = useState<"price" | "standard">("standard");

  return (
    <section
      aria-labelledby="comparison-heading"
      className="ycb-section"
      style={{
        background: PALETTE.bg,
        color: PALETTE.text,
        fontFamily:
          '"Hiragino Sans", "Noto Sans JP", system-ui, -apple-system, sans-serif',
        fontFeatureSettings: '"palt"',
      }}
    >
      <div className="ycb-container relative mx-auto max-w-[1320px] px-[var(--page-px)] py-[clamp(72px,10vw,140px)]">
        {/* 装飾線画 (右上) */}
        <div
          aria-hidden
          className="hidden lg:block absolute top-[clamp(48px,6vw,100px)] right-[clamp(40px,6vw,120px)] w-[280px] xl:w-[340px] pointer-events-none"
          style={{ color: PALETTE.green, opacity: 0.16 }}
        >
          <HouseDrawing />
        </div>

        {/* ─── ヘッダー (上部ラベル + 見出し + リード + tabs) ─── */}
        <header className="relative">
          <div className="flex flex-wrap items-start justify-between gap-y-6 gap-x-8">
            <div className="flex-1 min-w-[280px] max-w-[820px]">
              <p
                className="text-[10.5px] tracking-[0.32em] uppercase"
                style={{
                  color: PALETTE.textSub,
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontWeight: 500,
                }}
              >
                Price &amp; Standard Comparison
              </p>
              <h2
                id="comparison-heading"
                className="mt-5"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 46px)",
                  fontWeight: 500,
                  lineHeight: 1.45,
                  letterSpacing: "0.04em",
                  color: PALETTE.text,
                }}
              >
                価格だけでなく、
                <br />
                標準仕様まで比べてください。
              </h2>
              <p
                className="mt-7 max-w-[640px]"
                style={{
                  color: PALETTE.textSub,
                  fontSize: "clamp(14px, 1vw, 15px)",
                  lineHeight: 2,
                }}
              >
                やまと不動産では、価格の違いだけでなく、標準で含まれる仕様・性能・設備までわかりやすく比較できます。
                後からの「想定外」を防ぎ、納得して選べる住まいをご提案します。
              </p>
            </div>

            {/* tabs */}
            <nav
              aria-label="比較切替"
              className="flex items-center gap-6 text-[13px]"
              style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
            >
              <button
                type="button"
                onClick={() => setTab("price")}
                className="inline-flex items-baseline gap-1.5 transition-colors"
                style={{
                  color: tab === "price" ? PALETTE.text : PALETTE.textSub,
                  fontWeight: tab === "price" ? 500 : 400,
                  borderBottom: tab === "price" ? `1px solid ${PALETTE.text}` : "1px solid transparent",
                  paddingBottom: 4,
                }}
                aria-pressed={tab === "price"}
              >
                <span className="text-[11px] tracking-[0.18em] uppercase">01</span>
                <span>価格比較</span>
              </button>
              <button
                type="button"
                onClick={() => setTab("standard")}
                className="inline-flex items-baseline gap-1.5 transition-colors"
                style={{
                  color: tab === "standard" ? PALETTE.text : PALETTE.textSub,
                  fontWeight: tab === "standard" ? 500 : 400,
                  borderBottom: tab === "standard" ? `1px solid ${PALETTE.text}` : "1px solid transparent",
                  paddingBottom: 4,
                }}
                aria-pressed={tab === "standard"}
              >
                <span className="text-[11px] tracking-[0.18em] uppercase">02</span>
                <span>標準仕様比較</span>
              </button>
            </nav>
          </div>
        </header>

        {/* ─── モデル写真ヘッダー (PC) ─── */}
        <div className="mt-12 md:mt-16 hidden lg:grid lg:grid-cols-[200px_repeat(3,1fr)] lg:gap-x-5">
          <div />
          {MODELS.map((m) => (
            <ModelHead key={m.id} model={m} />
          ))}
        </div>

        {/* ─── 比較表 ─── */}
        <div
          className="mt-8 lg:mt-6 overflow-x-auto"
          style={{ borderTop: `1px solid ${PALETTE.rule}` }}
        >
          <table
            className="ycb-table w-full"
            style={{
              borderCollapse: "collapse",
              minWidth: 720,
            }}
          >
            <caption className="sr-only">京・奈良・プレミアム 3 モデルの仕様比較</caption>

            {/* mobile / tablet 用: thead でモデル写真ヘッダー */}
            <thead className="lg:hidden">
              <tr>
                <th scope="col" className="sr-only">項目</th>
                {MODELS.map((m) => (
                  <th
                    key={m.id}
                    scope="col"
                    className="text-left p-0 align-bottom"
                    style={{ minWidth: 220 }}
                  >
                    <ModelHead model={m} compact />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {SPEC_ROWS.map((row, idx) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="ycb-th-row sticky left-0 z-[1] align-middle text-left"
                    style={{
                      background: PALETTE.greenDeep,
                      color: "#ffffff",
                      padding: "clamp(14px,1.6vw,20px) clamp(14px,1.4vw,20px)",
                      fontSize: "12.5px",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      width: "200px",
                      minWidth: "180px",
                      borderTop: idx === 0 ? "none" : `1px solid rgba(255,255,255,0.08)`,
                    }}
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, vi) => (
                    <td
                      key={vi}
                      className="align-middle"
                      style={{
                        background: vi === 0 && row.highlight ? "#FFFFFF" : PALETTE.card,
                        color: PALETTE.text,
                        padding: "clamp(14px,1.6vw,20px) clamp(16px,1.8vw,28px)",
                        borderTop: idx === 0 ? "none" : `1px solid ${PALETTE.rule}`,
                        borderLeft: vi === 0 ? "none" : `1px solid ${PALETTE.rule}`,
                        fontSize: row.highlight ? "clamp(14px,1.2vw,17px)" : "clamp(13px,1vw,14.5px)",
                        fontWeight: row.highlight ? 500 : 400,
                        lineHeight: 1.65,
                        verticalAlign: "middle",
                        minWidth: "200px",
                      }}
                    >
                      {row.highlight ? (
                        <PriceCell value={value} />
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── CTA バー ─── */}
        <div
          className="mt-12 md:mt-14"
          style={{
            background: PALETTE.card,
            border: `1px solid ${PALETTE.rule}`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-px" style={{ background: PALETTE.rule }}>
            {/* 左: 補助文 */}
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
                標準仕様の詳細や、暮らし方に合わせた最適なプランをご提案します。
              </p>
            </div>

            {/* CTA 1: LINE */}
            <CtaCard
              href={LINE_ADD_FRIEND_URL}
              external
              icon={<MessageCircle className="w-4 h-4" strokeWidth={1.5} />}
              label="LINEで相談する"
              sub="気軽にご相談いただけます"
            />

            {/* CTA 2: 見学 */}
            <CtaCard
              href="/reserve"
              icon={<Calendar className="w-4 h-4" strokeWidth={1.5} />}
              label="モデルハウスを見学する"
              sub="実際のサイズ感や仕様を体感できます"
            />
          </div>

          {/* カタログ別枠 */}
          <Link
            href="/contact?mode=catalog"
            className="ycb-catalog group flex items-center justify-between gap-4 px-6 md:px-8 py-5 transition-colors"
            style={{
              borderTop: `1px solid ${PALETTE.rule}`,
              background: PALETTE.card,
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="inline-flex items-center justify-center w-10 h-10 shrink-0"
                style={{ background: PALETTE.green, color: "#ffffff" }}
                aria-hidden
              >
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <div>
                <p
                  className="text-[10.5px] tracking-[0.32em] uppercase"
                  style={{
                    color: PALETTE.textSub,
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Catalog
                </p>
                <p
                  className="mt-1 text-[14px] md:text-[15px]"
                  style={{ color: PALETTE.text, fontWeight: 500 }}
                >
                  標準仕様・設備カタログ
                  <span
                    className="ml-2 text-[12px]"
                    style={{ color: PALETTE.textSub, fontWeight: 400 }}
                  >
                    無料プレゼント中
                  </span>
                </p>
              </div>
            </div>
            <ArrowRight
              className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0"
              strokeWidth={1.5}
              style={{ color: PALETTE.green }}
            />
          </Link>
        </div>

        {/* ─── 注意書き ─── */}
        <div
          className="mt-7 md:mt-9 text-[11px] md:text-[11.5px] space-y-1"
          style={{ color: PALETTE.textSub, lineHeight: 1.85 }}
        >
          <p>※ 価格は目安です。仕様・設備は予告なく変更となる場合があります。</p>
          <p>※ UA値・性能値はプランや条件により異なる場合があります。</p>
          <p>※ 掲載写真はイメージです。詳しくはスタッフまでお問い合わせください。</p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// 子コンポーネント
// ───────────────────────────────────────────
function ModelHead({
  model,
  compact = false,
}: {
  model: (typeof MODELS)[number];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "p-3" : ""}>
      <div
        className="relative w-full"
        style={{ aspectRatio: "16 / 10", background: PALETTE.rule }}
      >
        <Image
          src={model.image}
          alt={model.alt}
          fill
          sizes="(max-width: 1024px) 80vw, 380px"
          className="object-cover"
        />
      </div>
      <div className="mt-3 md:mt-4">
        <p
          className="text-[15px] md:text-[16px]"
          style={{
            color: PALETTE.text,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {model.name}
        </p>
        <p
          className="mt-1 text-[12px] md:text-[12.5px]"
          style={{ color: PALETTE.textSub, lineHeight: 1.7 }}
        >
          {model.subtitle}
        </p>
      </div>
    </div>
  );
}

function PriceCell({ value }: { value: string }) {
  // 値の例: "2,280万円〜"
  const m = value.match(/^([\d,]+)(万円〜?.*)$/);
  if (!m) return <>{value}</>;
  const [, num, rest] = m;
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: "clamp(28px, 2.4vw, 36px)",
          fontWeight: 300,
          letterSpacing: "0",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          color: PALETTE.text,
        }}
      >
        {num}
      </span>
      <span className="text-[13px]" style={{ color: PALETTE.text, fontWeight: 500 }}>
        {rest}
      </span>
    </div>
  );
}

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

  const className = "ycb-cta group flex items-center gap-4 p-6 md:p-7 transition-colors";
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
