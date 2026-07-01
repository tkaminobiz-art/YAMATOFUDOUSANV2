import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import KineticHeading from "../_shared/KineticHeading";

/**
 * StandardSpec — 新4「標準仕様」（14セクション新構成 / TOPリブート）
 * ------------------------------------------------------------------
 * 役割: S01（見学した安心）を受け、その安心が“オプション”ではなく
 *   はじめから標準に入っていることを、役割別の縦リズムで証明する。
 *
 * 設計原則（AGENTS.md / DESIGN_GUARDRAILS.md / project memory）:
 *   - surface="ivory"（明面・生成り）。id なし（アンカーにしない）。
 *   - 見出しは KineticHeading（client 子）。それ以外はサーバーコンポーネント。
 *   - メーカー名／型番は src/components/sections/StandardEquipment.tsx の
 *     canonical 17項目を **値だけ逐語コピー**（AI 改変禁止）。他社ロゴ画像は使わない＝plain text。
 *   - 数字バーンは置かない（耐震「3」は plain text。BurnNumber / countUp は使わない＝二度打ち禁止）。
 *   - 耐震は「対応する構造」（「取得」と断言しない＝景表）。
 *   - 均等3カード量産・generic table・四辺閉じ枠・shadow-md 禁止。
 *     3分類（構造→暮らし→保証）を「分類見出し＋上下 hairline＋項目行」で、
 *     構造の安心を最重量・保証を最軽量にする視覚リズムで組む。
 *   - CTA は「実物はモデルハウスで。」の静かな text-link 1本まで（/reserve）。
 *
 * 正本: docs/notes/2026-06-25-top-reboot-framework.md（13→14セクション証拠ラダー）。
 */

/** 分類内の 1 項目行。vendor＝逐語メーカー名 / spec＝逐語仕様・型番 / note＝補足。 */
type SpecRow = {
  label: string; // 区分（キッチン・耐震 等）
  vendor?: string; // 太字メーカー名（StandardEquipment.tsx より逐語）
  spec: string; // 仕様・型番（StandardEquipment.tsx より逐語）
  note?: string; // 補足（（）内・muted）
};

/**
 * 構造の安心（最重量ブロック）
 * 値は StandardEquipment.tsx の canonical 17項目より逐語:
 * - 耐震: 構造 No.11「木造軸組 + 金物ハイブリッド工法」（在来比 約1.5倍強度）＋等級3に対応する構造
 * - 制震: No.12 MIRAIE「制震ダンパー (住友ゴム製)」全モデル標準
 * - 外壁: No.08 旭化成「ヘーベルパワーボード + 窯業系サイディング 16mm」
 * - 断熱: No.10「クレタン吹付 / 外断熱 85mm + 屋根硬質ウレタン 95mm」
 */
const STRUCTURE: SpecRow[] = [
  {
    label: "耐震",
    spec: "等級3に対応する構造",
    note: "木造軸組 + 金物ハイブリッド工法（在来比 約1.5倍強度）",
  },
  {
    label: "制震",
    vendor: "MIRAIE（ミライエ）",
    spec: "制震ダンパー (住友ゴム製)",
    note: "全モデル標準",
  },
  {
    label: "外壁",
    vendor: "旭化成",
    spec: "ヘーベルパワーボード + 窯業系サイディング 16mm",
  },
  {
    label: "断熱・構造躯体",
    spec: "クレタン吹付 / 外断熱 85mm + 屋根硬質ウレタン 95mm",
  },
];

/**
 * 暮らしの品質（中間ブロック）
 * 値は StandardEquipment.tsx の canonical 17項目より逐語:
 * - キッチン: No.01 クリナップ「システムキッチン」（食洗機・IH3口 含む）
 * - 浴室・洗面・トイレ: No.03/04/05 TOTO「ユニットバス 1616」「750mm 三面鏡仕様」「ウォシュレット」
 * - 窓・玄関: No.07/06 YKK AP「APW330 Low-E複層ガラス / 樹脂サッシ」「Venato K4 親子ドア」
 */
const LIVING: SpecRow[] = [
  {
    label: "キッチン",
    vendor: "クリナップ",
    spec: "システムキッチン",
    note: "食洗機・IH3口 含む",
  },
  {
    label: "浴室・洗面・トイレ",
    vendor: "ＴＯＴＯ",
    spec: "ユニットバス 1616 / 洗面台 750mm 三面鏡 / ウォシュレット",
  },
  {
    label: "窓・玄関",
    vendor: "ＹＫＫ ＡＰ",
    spec: "APW330 Low-E複層ガラス 樹脂サッシ / Venato K4 親子ドア",
  },
];

/**
 * 建てた後の安心（最軽量ブロック）
 * 値は StandardEquipment.tsx の canonical 17項目より逐語:
 * - 地盤保証: No.16「20年保証」/ しろあり保証: No.17「10年保証」
 */
const AFTER: SpecRow[] = [
  { label: "地盤保証", spec: "20年" },
  { label: "しろあり保証", spec: "10年" },
];

export default function StandardSpec() {
  return (
    <SectionShell surface="ivory" aria-label="標準仕様｜見学した安心を、そのまま標準に。">
      <div className="mx-auto max-w-[1080px]">
        <Eyebrow>standard, not optional</Eyebrow>

        <KineticHeading
          className="t-h2 text-ink"
          lines={["見学した安心を、", "そのまま標準仕様に。"]}
        />

        {/* リード（Murecho 逐語・3センテンス／読みやすさのため句点で改段） */}
        <p className="t-body mt-6 max-w-[62ch] text-ink-muted">
          「これはオプションです」と後から増えるのではなく、家族が長く安心して暮らすために必要な仕様を、はじめから標準に。
          <br className="hidden md:block" />
          耐震等級3に対応する構造、制震ダンパー、外壁、キッチン、浴室、洗面、トイレ、窓、玄関、保証まで。
          <br className="hidden md:block" />
          見た目だけではなく、住んでからの安心まで含めて整えています。
        </p>

        {/* 本体＝3分類（均等カードにしない。構造=最重量／暮らし=中間／保証=最軽量の視覚リズム） */}
        <div className="mt-14 md:mt-16">
          {/* ── 1. 構造の安心（最重量：太い上罫＋大きめ余白＋主役ラベル） ── */}
          <SpecGroup
            index="01"
            heading="構造の安心"
            caption="見えない部分こそ、家族の安全を支えます。"
            rows={STRUCTURE}
            weight="heavy"
          />

          {/* ── 2. 暮らしの品質（中間） ── */}
          <SpecGroup
            index="02"
            heading="暮らしの品質"
            caption="毎日ふれる設備を、実績のあるメーカーで。"
            rows={LIVING}
            weight="medium"
          />

          {/* ── 3. 建てた後の安心（最軽量：細い罫＋コンパクトな行） ── */}
          <SpecGroup
            index="03"
            heading="建てた後の安心"
            caption="お引き渡しのあとも、長く見守ります。"
            rows={AFTER}
            weight="light"
          />
        </div>

        {/* 注記（景表・全モデル共通） */}
        <p className="mt-10 max-w-[70ch] text-[12px] leading-[1.7] tracking-[0.02em] text-ink-muted/80">
          ※標準仕様は全モデル共通項目を掲載。花・風・京で一部仕様が異なります。
        </p>

        {/* CTA — 静かな text-link 1本（数字バーンなし） */}
        <div className="mt-6">
          <Link
            href="/reserve"
            className="t-body inline-flex items-center gap-1.5 text-[14px] text-main underline-offset-4 hover:text-main-dark hover:underline"
          >
            実物はモデルハウスで。
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

/**
 * SpecGroup — 分類ブロック（分類見出し＋上下 hairline＋項目行の縦リズム）。
 * weight で「重さ」を出し分ける（heavy=構造 → light=保証）。均等カード化はしない。
 *
 * - 見出し行: 連番（欧文 caps）＋分類名（t-h3）＋一言キャプション。上罫の太さで重量差。
 * - 項目行: 左＝区分ラベル（sticky 幅）／右＝メーカー名（太字）＋仕様＋補足。行間 hairline のみ。
 */
function SpecGroup({
  index,
  heading,
  caption,
  rows,
  weight,
}: {
  index: string;
  heading: string;
  caption: string;
  rows: SpecRow[];
  weight: "heavy" | "medium" | "light";
}) {
  // 重量リズム: 構造=最重量（太上罫・大余白）→ 保証=最軽量（細罫・コンパクト）
  const topRule =
    weight === "heavy"
      ? "border-t-2 border-ink/80"
      : weight === "medium"
        ? "border-t border-ink/40"
        : "border-t border-ink/20";
  const blockGap =
    weight === "heavy" ? "mt-0 pt-8 md:pt-10" : "mt-14 pt-7 md:mt-16 md:pt-8";
  const rowPad =
    weight === "light" ? "py-4 md:py-5" : "py-5 md:py-6";
  const headingCls =
    weight === "heavy" ? "t-h3 text-ink" : weight === "medium" ? "t-h3 text-ink" : "t-h3 text-ink/90";

  return (
    <section className={`${topRule} ${blockGap}`} aria-label={heading}>
      {/* 分類見出し行 */}
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span
          aria-hidden
          className="t-eyebrow text-main"
          style={{ letterSpacing: "0.22em" }}
        >
          {index}
        </span>
        <h3 className={headingCls}>{heading}</h3>
        <p className="t-body w-full text-[13px] text-ink-muted md:w-auto md:flex-1 md:text-right">
          {caption}
        </p>
      </header>

      {/* 項目行（上下 hairline の縦リズム。四辺閉じ枠・shadow なし） */}
      <dl className="mt-6 border-t border-ink/10">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`grid grid-cols-1 gap-x-6 gap-y-1.5 border-b border-ink/10 ${rowPad} md:grid-cols-[160px_1fr]`}
          >
            <dt className="t-h3 text-[16px] text-ink md:text-[17px]" style={{ wordBreak: "keep-all" }}>
              {row.label}
            </dt>
            <dd className="text-ink-muted">
              <p
                className="text-ink"
                style={{
                  fontFamily: "var(--font-murecho)",
                  fontSize: "clamp(15px, 1.15vw, 18px)",
                  lineHeight: 1.7,
                  letterSpacing: "0.02em",
                }}
              >
                {row.vendor && (
                  <span
                    className="mr-2 font-bold text-ink"
                    style={{ fontFamily: "var(--font-zen-kaku-new)" }}
                  >
                    {row.vendor}
                  </span>
                )}
                <span>{row.spec}</span>
              </p>
              {row.note && (
                <p className="mt-1 text-[13px] leading-[1.7] text-ink-muted/85">
                  {row.note}
                </p>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
