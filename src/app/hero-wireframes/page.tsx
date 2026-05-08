import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// 納品前に削除する検証用ページ。
// /hero-wireframes : 写真なし・グレープレースホルダーで Hero 構造のみを検証する。
// 2026-05-08 夜、ユーザー判断: HeroEditorial v1 は LDK 写真の強さに救われていただけで
// 構造そのものは住宅 LP 定型 (ヘッダー/見出し/価格/CTA/実績) に戻っていた。
// 写真を抜いてもデザインで勝つ Hero を作るため、グレーボックステスト先行に切替。
// (memory: feedback_design_first_photo_last_grey_box_test.md)
//
// 共通コンテンツは固定。違いは「構造」と「やまと固有のデザイン言語の落とし込み方」のみ:
// W1 測量図      = 土地区画線・座標・寸法線で「土地から考える」を表す
// W2 建築図面    = elevation frame + title block で「建築の精度」を表す
// W3 雑誌マスト  = 縦組ロゴ・フォリオ・走り頭で「編集誌の品」を表す
//
// 採用後はこのディレクトリごと削除する。

const SHARED = {
  h1: ["土地を読み、", "暮らしを建てる。"],
  subcopy: [
    "奈良・京都南部で、土地探しから資金計画、建物まで。",
    "総額で見える家づくりを、地域密着で支えます。",
  ],
  priceLabel: "京モデル",
  priceValue: "2,280",
  priceUnit: "万円〜",
  priceFootnote: "税込・建物本体＋標準付帯工事込み",
  primaryCta: "総額の目安を相談する",
  secondaryCta: "モデルハウスを見学する",
  metrics: [
    { label: "施工実績", value: "600", unit: "棟以上" },
    { label: "分譲・土地", value: "90", unit: "区画以上" },
    { label: "お客様の声", value: "50", unit: "組以上" },
    { label: "業歴", value: "14", unit: "年" },
  ],
} as const;

const PAPER = "#F4EFE6";
const SUMI = "#1A1815";
const GREIGE = "#C5BDB0";
const FOREST = "#3E5538";
const MUTED = "#5E5A50";
const HAIRLINE = "#DED8C8";
const PHOTO_BG = "#C5C0B5";
const PHOTO_BG_DARK = "#A8A399";

/* ========================================================================
   W1 — 測量図 / The Land Surveyor's Hero
   "土地から考える"を design language に落とす。
   - 上部に座標 / フォリオ
   - グリッド地紋 (5% opacity)
   - 写真は L 字クロップマーク + 寸法線で「敷地」として扱う
   - 価格は「SPEC ラベル」として小さくインライン
   - 実績は寸法線アノテーションで Hero 下部に配置
   ======================================================================== */
function W1_Surveyor() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: PAPER, minHeight: 720 }}
    >
      {/* 地紋: 100m メッシュ風の点グリッド */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${SUMI}1f 0.5px, transparent 0.5px)`,
          backgroundSize: "32px 32px",
          opacity: 0.18,
        }}
      />

      {/* 上部メタストリップ */}
      <div
        className="relative border-b"
        style={{ borderColor: HAIRLINE }}
      >
        <div
          className="mx-auto max-w-[1400px] flex items-center justify-between px-[var(--page-px)] py-3 text-[10px] tracking-[0.2em]"
          style={{ fontFamily: "var(--font-inter)", color: MUTED }}
        >
          <span>N 34.681° &nbsp;·&nbsp; E 135.832° &nbsp;·&nbsp; NARA-KYOTO</span>
          <span style={{ color: SUMI }}>SHEET&nbsp;01 / 04</span>
        </div>
      </div>

      {/* 本体 */}
      <div className="relative mx-auto max-w-[1400px] px-[var(--page-px)] py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* 左 — 見出し / コピー / SPEC */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <p
              className="text-[10px] tracking-[0.32em] uppercase pb-1 inline-block border-b"
              style={{ fontFamily: "var(--font-inter)", color: FOREST, borderColor: FOREST }}
            >
              01 — HOUSES
            </p>

            <h1
              className="mt-8"
              style={{
                fontFamily: "var(--font-shippori)",
                fontSize: "clamp(38px, 5vw, 58px)",
                fontWeight: 500,
                lineHeight: 1.35,
                letterSpacing: "0.02em",
                color: SUMI,
              }}
            >
              {SHARED.h1[0]}
              <br />
              {SHARED.h1[1]}
            </h1>

            <div aria-hidden className="mt-7 h-px w-full" style={{ background: HAIRLINE }} />

            <p
              className="mt-6 text-[14px] md:text-[14.5px]"
              style={{ color: MUTED, lineHeight: 2 }}
            >
              {SHARED.subcopy[0]}
              <br />
              {SHARED.subcopy[1]}
            </p>

            {/* SPEC ラベル — 価格を仕様として扱う (キャンペーン感を排除) */}
            <div className="mt-9 inline-flex items-stretch border" style={{ borderColor: SUMI }}>
              <span
                className="inline-flex items-center px-2.5 text-[10px] tracking-[0.2em] text-white"
                style={{ background: SUMI, fontFamily: "var(--font-inter)" }}
              >
                SPEC
              </span>
              <span
                className="inline-flex items-baseline gap-2 px-3.5 py-2"
                style={{ color: SUMI }}
              >
                <span className="text-[12px] tracking-[0.04em]">{SHARED.priceLabel}</span>
                <span
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontSize: 22,
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                  }}
                >
                  {SHARED.priceValue}
                </span>
                <span className="text-[12px]">{SHARED.priceUnit}</span>
              </span>
            </div>
            <p
              className="mt-1.5 text-[10.5px] tracking-[0.04em]"
              style={{ color: MUTED, fontFamily: "var(--font-inter)" }}
            >
              {SHARED.priceFootnote}
            </p>

            {/* CTA — 寸法線型・控えめ */}
            <div className="mt-9 flex flex-col sm:flex-row gap-2.5">
              <Link
                href="/money"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 px-6 text-[13px] tracking-[0.04em] font-medium text-white transition-colors"
                style={{ background: SUMI }}
              >
                {SHARED.primaryCta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
              <Link
                href="/reserve"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 px-6 border text-[13px] tracking-[0.04em] font-medium transition-colors"
                style={{ borderColor: SUMI, color: SUMI }}
              >
                {SHARED.secondaryCta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* 右 — 写真プレースホルダー (L字クロップマーク + 寸法線) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 relative">
            {/* 寸法線 (上) */}
            <div
              aria-hidden
              className="hidden md:flex items-center justify-between mb-2 text-[9.5px] tracking-[0.18em]"
              style={{ fontFamily: "var(--font-inter)", color: MUTED }}
            >
              <span>0</span>
              <span className="flex-1 mx-2 border-t" style={{ borderColor: SUMI }} />
              <span>5</span>
              <span className="flex-1 mx-2 border-t" style={{ borderColor: SUMI }} />
              <span>10</span>
              <span className="flex-1 mx-2 border-t" style={{ borderColor: SUMI }} />
              <span>15 m</span>
            </div>

            {/* グレー写真プレースホルダー + L字クロップマーク */}
            <div className="relative aspect-[4/3]">
              {/* placeholder body */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${PHOTO_BG} 0%, ${PHOTO_BG_DARK} 100%)`,
                }}
              />
              {/* corner marks (4隅) */}
              {(["tl", "tr", "bl", "br"] as const).map((c) => {
                const map = {
                  tl: "left-[-4px] top-[-4px]",
                  tr: "right-[-4px] top-[-4px]",
                  bl: "left-[-4px] bottom-[-4px]",
                  br: "right-[-4px] bottom-[-4px]",
                };
                return (
                  <div
                    key={c}
                    aria-hidden
                    className={`absolute w-5 h-5 ${map[c]}`}
                    style={{
                      borderColor: SUMI,
                      borderTopWidth: c.startsWith("t") ? 1 : 0,
                      borderBottomWidth: c.startsWith("b") ? 1 : 0,
                      borderLeftWidth: c.endsWith("l") ? 1 : 0,
                      borderRightWidth: c.endsWith("r") ? 1 : 0,
                    }}
                  />
                );
              })}
              {/* photo label */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] tracking-[0.32em]"
                style={{ fontFamily: "var(--font-inter)", color: SUMI, opacity: 0.55 }}
              >
                [ PHOTO 1080 × 720 ]
              </div>
            </div>

            {/* 寸法線 (下) — 敷地スペック (placeholder) */}
            <div
              aria-hidden
              className="hidden md:grid grid-cols-3 gap-6 mt-3 text-[10px] tracking-[0.06em]"
              style={{ fontFamily: "var(--font-inter)", color: MUTED }}
            >
              <span className="border-t pt-1.5" style={{ borderColor: HAIRLINE }}>敷地 ─── m²</span>
              <span className="border-t pt-1.5" style={{ borderColor: HAIRLINE }}>建ぺい ── %</span>
              <span className="border-t pt-1.5" style={{ borderColor: HAIRLINE }}>容積 ── %</span>
            </div>
          </div>
        </div>
      </div>

      {/* 下部 — 寸法線アノテーションとして実績を置く */}
      <div className="relative border-t" style={{ borderColor: HAIRLINE, background: PAPER }}>
        <div
          className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 px-[var(--page-px)]"
        >
          {SHARED.metrics.map((m, i) => (
            <div
              key={m.label}
              className="py-5 md:py-6 px-2 md:px-4"
              style={{
                borderRight: i < SHARED.metrics.length - 1 ? `1px solid ${HAIRLINE}` : undefined,
              }}
            >
              <div
                className="flex items-center gap-2 text-[9.5px] tracking-[0.18em]"
                style={{ fontFamily: "var(--font-inter)", color: MUTED }}
              >
                <span className="inline-block w-3 border-t" style={{ borderColor: SUMI }} />
                <span>{m.label}</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5" style={{ color: SUMI }}>
                <span
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontSize: 26,
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </span>
                <span className="text-[12px]">{m.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   W2 — 建築図面 / The Drawing-frame Hero
   "建築の精度"を design language に落とす。
   - 上部に ELEVATION メタ
   - 写真は中央にダブルヘアラインで囲んだ「elevation frame」
   - 周囲にスケールチック (定規目盛り)
   - 見出しは frame の下、タイトルブロック型のコンテンツ整理
   - 実績/価格/CTAは「TITLE BLOCK」風の表組
   ======================================================================== */
function W2_DrawingFrame() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: "#FFFFFF", minHeight: 720 }}
    >
      {/* 上部メタ */}
      <div className="relative border-b" style={{ borderColor: HAIRLINE }}>
        <div
          className="mx-auto max-w-[1400px] flex items-center justify-between px-[var(--page-px)] py-3 text-[10px] tracking-[0.22em]"
          style={{ fontFamily: "var(--font-inter)", color: MUTED }}
        >
          <span>ELEVATION&nbsp;01 &nbsp;·&nbsp; SOUTH</span>
          <span style={{ color: SUMI }}>SCALE 1 : 200</span>
          <span>NARA / KYOTO</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1100px] px-[var(--page-px)] pt-12 md:pt-16 pb-16">
        {/* スケールチック (上) */}
        <div
          aria-hidden
          className="hidden md:flex items-end justify-between mb-1"
          style={{ height: 12 }}
        >
          {Array.from({ length: 21 }).map((_, i) => (
            <span
              key={i}
              className="block w-px"
              style={{
                background: SUMI,
                height: i % 5 === 0 ? 12 : 5,
                opacity: i % 5 === 0 ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        {/* 写真 elevation frame: ダブルヘアライン */}
        <div
          className="relative"
          style={{
            border: `1px solid ${SUMI}`,
            padding: 6,
          }}
        >
          <div
            className="relative aspect-[16/9]"
            style={{ outline: `1px solid ${SUMI}` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(45deg, ${PHOTO_BG} 0 12px, ${PHOTO_BG_DARK} 12px 13px)`,
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] tracking-[0.32em]"
              style={{ fontFamily: "var(--font-inter)", color: SUMI, opacity: 0.6 }}
            >
              ELEVATION&nbsp;[&nbsp;PHOTO&nbsp;]
            </div>
          </div>
        </div>

        {/* スケールチック (下) */}
        <div
          aria-hidden
          className="hidden md:flex items-start justify-between mt-1"
          style={{ height: 12 }}
        >
          {Array.from({ length: 21 }).map((_, i) => (
            <span
              key={i}
              className="block w-px"
              style={{
                background: SUMI,
                height: i % 5 === 0 ? 12 : 5,
                opacity: i % 5 === 0 ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        {/* 見出し — frame の下、垂直リーディング */}
        <h1
          className="mt-12 md:mt-14"
          style={{
            fontFamily: "var(--font-shippori)",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: "0.02em",
            color: SUMI,
          }}
        >
          {SHARED.h1[0]}
          {SHARED.h1[1]}
        </h1>
        <p
          className="mt-5 max-w-[640px] text-[14px] md:text-[15px]"
          style={{ color: MUTED, lineHeight: 1.95 }}
        >
          {SHARED.subcopy[0]}
          {SHARED.subcopy[1]}
        </p>

        {/* TITLE BLOCK — 建築タイトルブロック風 */}
        <div className="mt-12 border" style={{ borderColor: SUMI }}>
          <div
            className="grid grid-cols-1 md:grid-cols-[120px_1fr] text-[12.5px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {/* PRICE */}
            <div className="px-4 py-3 border-b md:border-b border-r" style={{ borderColor: HAIRLINE, background: "#F8F7F4", color: MUTED, letterSpacing: "0.18em" }}>
              PRICE
            </div>
            <div className="px-4 py-3 border-b" style={{ borderColor: HAIRLINE, color: SUMI }}>
              <span className="inline-flex items-baseline gap-2">
                <span className="tracking-[0.04em]">{SHARED.priceLabel}</span>
                <span style={{ fontFamily: "var(--font-oswald)", fontSize: 20, fontWeight: 300 }}>
                  {SHARED.priceValue}
                </span>
                <span>{SHARED.priceUnit}</span>
                <span className="ml-3 text-[11px]" style={{ color: MUTED }}>
                  {SHARED.priceFootnote}
                </span>
              </span>
            </div>
            {/* RECORDS */}
            <div className="px-4 py-3 border-b md:border-b border-r" style={{ borderColor: HAIRLINE, background: "#F8F7F4", color: MUTED, letterSpacing: "0.18em" }}>
              RECORDS
            </div>
            <div className="px-4 py-3 border-b flex flex-wrap gap-x-6 gap-y-1" style={{ borderColor: HAIRLINE }}>
              {SHARED.metrics.map((m) => (
                <span key={m.label} style={{ color: SUMI }} className="inline-flex items-baseline gap-1.5 text-[12.5px]">
                  <span style={{ fontFamily: "var(--font-oswald)", fontSize: 18, fontWeight: 300 }}>{m.value}</span>
                  <span className="text-[11.5px]">{m.unit}</span>
                  <span className="text-[10.5px] tracking-[0.06em]" style={{ color: MUTED }}>
                    / {m.label}
                  </span>
                </span>
              ))}
            </div>
            {/* ACTION */}
            <div className="px-4 py-3 border-r" style={{ borderColor: HAIRLINE, background: "#F8F7F4", color: MUTED, letterSpacing: "0.18em" }}>
              ACTION
            </div>
            <div className="px-4 py-3 flex flex-col sm:flex-row gap-2.5">
              <Link
                href="/money"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 px-5 text-[12.5px] tracking-[0.04em] font-medium text-white"
                style={{ background: SUMI }}
              >
                {SHARED.primaryCta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
              <Link
                href="/reserve"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 px-5 border text-[12.5px] tracking-[0.04em] font-medium"
                style={{ borderColor: SUMI, color: SUMI }}
              >
                {SHARED.secondaryCta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   W3 — 雑誌マスト / The Magazine-cover Hero
   "編集誌の品" を design language に落とす。
   - 上部 issue strip (VOL / 季節 / 地域)
   - 左に縦組マスト ("YAMATO 不動産" 縦書き)
   - 主役は本のカバー的構図 (見出しと写真の関係)
   - 下に走り頭 (running foot) で実績/価格を編集誌風に流す
   ======================================================================== */
function W3_MagazineCover() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: PAPER, minHeight: 720 }}>
      {/* 上部 issue strip */}
      <div className="relative border-b" style={{ borderColor: HAIRLINE }}>
        <div
          className="mx-auto max-w-[1400px] flex items-center justify-between px-[var(--page-px)] py-3 text-[10px] tracking-[0.28em]"
          style={{ fontFamily: "var(--font-inter)", color: MUTED }}
        >
          <span>VOL.&nbsp;01</span>
          <span>SPRING&nbsp;2026</span>
          <span style={{ color: SUMI }}>NARA &nbsp;·&nbsp; KYOTO</span>
          <span>HOUSING&nbsp;&amp;&nbsp;LAND</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-[var(--page-px)] py-14 md:py-20">
        <div className="grid grid-cols-12 gap-6">
          {/* 縦組マスト */}
          <aside className="hidden md:block md:col-span-2 lg:col-span-2">
            <div
              className="text-[34px] lg:text-[42px] tracking-[0.18em] leading-[1.1] [writing-mode:vertical-rl]"
              style={{
                fontFamily: "var(--font-shippori)",
                fontWeight: 500,
                color: SUMI,
              }}
            >
              やまと不動産
            </div>
            <div
              className="mt-6 text-[10px] tracking-[0.32em] uppercase"
              style={{ fontFamily: "var(--font-inter)", color: FOREST }}
            >
              <span className="inline-block border-b pb-1" style={{ borderColor: FOREST }}>
                FEATURE&nbsp;01
              </span>
            </div>
            <div
              className="mt-3 text-[12px] tracking-[0.18em] [writing-mode:vertical-rl]"
              style={{ color: MUTED, fontFamily: "var(--font-shippori)" }}
            >
              特集 ─ 土地を読む
            </div>
          </aside>

          {/* メイン: 写真 + 見出し */}
          <div className="col-span-12 md:col-span-10 lg:col-span-10">
            <div className="grid grid-cols-12 gap-6">
              {/* 写真プレースホルダー (左寄せ・編集誌的位置) */}
              <div className="col-span-12 lg:col-span-7">
                <div
                  className="relative aspect-[5/4] lg:aspect-[4/3]"
                  style={{
                    background: `linear-gradient(180deg, ${PHOTO_BG} 0%, ${PHOTO_BG_DARK} 100%)`,
                  }}
                >
                  <div
                    className="absolute left-3 top-3 text-[10px] tracking-[0.28em]"
                    style={{ fontFamily: "var(--font-inter)", color: SUMI, opacity: 0.55 }}
                  >
                    COVER&nbsp;PHOTO
                  </div>
                  <div
                    className="absolute right-3 bottom-3 text-[10px] tracking-[0.18em]"
                    style={{ fontFamily: "var(--font-inter)", color: SUMI, opacity: 0.55 }}
                  >
                    p. 01
                  </div>
                </div>
                {/* 写真キャプション (編集誌の写真注釈風) */}
                <p
                  className="mt-3 text-[11px]"
                  style={{ color: MUTED, fontFamily: "var(--font-shippori)" }}
                >
                  ── やまと不動産が手がけた、奈良市内の住まい。施工 / 自社一貫体制
                </p>
              </div>

              {/* 見出し + サブ */}
              <div className="col-span-12 lg:col-span-5 lg:pl-2">
                <h1
                  style={{
                    fontFamily: "var(--font-shippori)",
                    fontSize: "clamp(34px, 4.4vw, 52px)",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    letterSpacing: "0.02em",
                    color: SUMI,
                  }}
                >
                  {SHARED.h1[0]}
                  <br />
                  {SHARED.h1[1]}
                </h1>

                {/* drop cap っぽい欧文セリフのリード */}
                <p
                  className="mt-7 text-[14px]"
                  style={{ color: SUMI, lineHeight: 2, fontFamily: "var(--font-shippori)" }}
                >
                  <span
                    className="float-left mr-1.5 text-[44px] leading-[0.85]"
                    style={{ fontFamily: "var(--font-shippori)", fontWeight: 500 }}
                  >
                    奈
                  </span>
                  良・京都南部で、土地探しから資金計画、建物まで。
                  総額で見える家づくりを、地域密着で支えます。
                </p>

                {/* 価格 — フォリオ風脚注 */}
                <div
                  className="mt-7 pt-3 border-t"
                  style={{ borderColor: HAIRLINE }}
                >
                  <div className="flex items-baseline gap-2 text-[12.5px]" style={{ color: SUMI }}>
                    <span className="tracking-[0.18em]" style={{ fontFamily: "var(--font-inter)", color: MUTED }}>
                      ¥
                    </span>
                    <span className="text-[11.5px] tracking-[0.04em]">{SHARED.priceLabel}</span>
                    <span style={{ fontFamily: "var(--font-oswald)", fontSize: 20, fontWeight: 300 }}>
                      {SHARED.priceValue}
                    </span>
                    <span className="text-[12px]">{SHARED.priceUnit}</span>
                    <span className="ml-2 text-[10.5px]" style={{ color: MUTED }}>
                      {SHARED.priceFootnote}
                    </span>
                  </div>
                </div>

                {/* CTA — 控えめ */}
                <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                  <Link
                    href="/money"
                    className="group inline-flex min-h-[44px] items-center justify-center gap-2 px-5 text-[12.5px] tracking-[0.04em] font-medium text-white"
                    style={{ background: SUMI }}
                  >
                    {SHARED.primaryCta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </Link>
                  <Link
                    href="/reserve"
                    className="group inline-flex min-h-[44px] items-center justify-center gap-2 px-5 border text-[12.5px] tracking-[0.04em] font-medium"
                    style={{ borderColor: SUMI, color: SUMI }}
                  >
                    {SHARED.secondaryCta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 走り頭 (running foot) — 編集誌的に実績を流す */}
      <div className="relative border-t" style={{ borderColor: HAIRLINE }}>
        <div
          className="mx-auto max-w-[1400px] flex flex-wrap items-baseline gap-x-6 gap-y-2 px-[var(--page-px)] py-4 text-[11px] tracking-[0.18em]"
          style={{ fontFamily: "var(--font-inter)", color: MUTED }}
        >
          <span style={{ color: SUMI }}>p. 01</span>
          {SHARED.metrics.map((m) => (
            <span key={m.label}>
              <span style={{ color: SUMI, fontFamily: "var(--font-oswald)", fontSize: 14, fontWeight: 300 }}>
                {m.value}
              </span>
              <span style={{ marginLeft: 4 }}>{m.unit}</span>
              <span style={{ marginLeft: 6, opacity: 0.7 }}>{m.label}</span>
            </span>
          ))}
          <span className="ml-auto" style={{ color: SUMI }}>
            HOUSING&nbsp;&amp;&nbsp;LAND&nbsp;·&nbsp;やまと不動産
          </span>
        </div>
      </div>
    </div>
  );
}

const WIREFRAMES = [
  {
    id: "W1",
    label: "W1 — 測量図",
    direction: "土地から考える / The Land Surveyor",
    rationale:
      "土地区画線・座標・寸法線で「土地から考える家づくり」を design language に落とす。価格はキャンペーンタグでなく SPEC ラベル。実績は寸法線アノテーションで Hero 下に流す。",
    pros: [
      "やまと固有の「土地」要素がデザイン構造に出ている",
      "写真を抜いてもグリッド・座標・寸法線でレイアウトが成立する",
      "価格 SPEC ラベルが営業 LP 文法から外れている",
    ],
    cons: [
      "情報密度がやや高め。住宅好印象の「呼吸感」は W3 に劣る",
      "クロップマーク・座標などが「ギミック」として強く出る (やりすぎ判定があり得る)",
    ],
    Component: W1_Surveyor,
  },
  {
    id: "W2",
    label: "W2 — 建築図面",
    direction: "建築の精度 / The Drawing-frame",
    rationale:
      "写真を「elevation frame」として中央に配置し、ダブルヘアラインの図面枠 + スケールチックで囲む。コンテンツは下に配置し、価格・実績・CTA は建築タイトルブロック表組として整理する。",
    pros: [
      "写真の有無に関わらず figure frame と title block で構造が立つ",
      "情報の出し方が建築事務所のポートフォリオに最も近い (B 方向との親和性)",
      "数値や仕様が「営業資料」でなく「建築仕様」として読める",
    ],
    cons: [
      "図面感が強く、住宅ブランドの温度感はやや低い",
      "コピー (情緒系) の居場所がやや窮屈",
    ],
    Component: W2_DrawingFrame,
  },
  {
    id: "W3",
    label: "W3 — 雑誌マスト",
    direction: "編集誌の品 / The Magazine Cover",
    rationale:
      "縦組マスト「やまと不動産」+ FEATURE 01「土地を読む」の編集誌仕立て。写真は誌面のカバー画像として扱い、走り頭で実績を編集誌風に流す。価格はフォリオ風脚注。",
    pros: [
      "やまと不動産のブランドが design として誌面の主役になる (会社名差し替えで成立しない)",
      "編集誌の文法 (VOL / FEATURE / drop cap / running foot) が住宅 LP 定型から完全に外れる",
      "「これは住宅サイトでなく、住宅と土地のジャーナル」という第一印象を作れる",
    ],
    cons: [
      "情報設計が誌面寄りで、CTA が控えめになりすぎる懸念",
      "縦組マストが小さい画面で崩れやすい (md+ だけ表示)",
    ],
    Component: W3_MagazineCover,
  },
] as const;

export default function HeroWireframesPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      {/* レビュー UI ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Hero Wireframes — Design First, Photo Last
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              Hero ワイヤフレーム 3 案 (写真なし / グレーボックステスト)
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-xs text-white/70">
            <a href="#W1" className="hover:text-white">W1 測量図</a>
            <a href="#W2" className="hover:text-white">W2 建築図面</a>
            <a href="#W3" className="hover:text-white">W3 雑誌マスト</a>
            <span className="text-white/20">/</span>
            <Link href="/" className="hover:text-white">本番TOP →</Link>
            <Link href="/hero-a" className="hover:text-white">/hero-a ↗</Link>
          </nav>
        </div>
      </header>

      {/* イントロ */}
      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          2026-05-08 夜 / Phase: Wireframe before photo
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          写真を最後に入れる。先に構造で勝つ。
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/80">
          HeroEditorial v1 は「LDK 写真の質に救われていただけ」と判断されたため、
          一度写真を抜いて構造のみで Hero を 3 案実装しました。
          写真は <span className="text-white">グレーのプレースホルダー</span>{" "}
          に置き換えています。判断軸は次の 6 項目:
        </p>
        <ol className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2 text-[13px] leading-relaxed text-white/85">
          {[
            "写真を抜いても良いデザインに見えるか",
            "一般的な住宅 LP の型 (左コピー＋右写真＋価格＋CTA＋実績) から抜け出しているか",
            "やまと不動産らしい「土地から考える家づくり」が表現されているか",
            "価格・CTA・実績が営業っぽく見えないか",
            "建築誌のような余白と緊張感があるか",
            "会社名を変えても成立する汎用デザインになっていないか",
          ].map((c, i) => (
            <li
              key={c}
              className="flex gap-3 rounded border border-white/10 bg-white/[0.03] p-3"
            >
              <span className="font-mono text-[11px] text-white/45 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          選んだ 1 案にだけ実写を入れて完成させ、その後で色・質感・CTA
          を最後に調整します。3 案比較に戻らない (役割分担メモリ準拠)。
        </p>
      </section>

      {/* 3 ワイヤ */}
      {WIREFRAMES.map(({ id, label, direction, rationale, pros, cons, Component }) => (
        <section
          key={id}
          id={id}
          className="border-t border-white/10"
        >
          <div className="mx-auto max-w-[1400px] px-6 py-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
              {label}
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{direction}</h3>
            <p className="mt-3 max-w-[840px] text-sm leading-relaxed text-white/75">
              {rationale}
            </p>
          </div>

          {/* 実物ワイヤ — 全幅で見せる */}
          <div className="border-y border-white/10">
            <Component />
          </div>

          {/* 良し悪し */}
          <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-5 px-6 py-10 text-[13px] leading-relaxed">
            <div className="rounded border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[#A9D159]/80 text-[11px] uppercase tracking-[0.18em]">
                Strengths
              </p>
              <ul className="mt-3 space-y-1.5 text-white/85">
                {pros.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-white/35">＋</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.03] p-5">
              <p className="text-red-300/80 text-[11px] uppercase tracking-[0.18em]">
                Risks
              </p>
              <ul className="mt-3 space-y-1.5 text-white/85">
                {cons.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-white/35">−</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* 次の一手 */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            次の一手
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            W1 / W2 / W3 のうち、構造として一番強いものを選ぶ
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            選んだ 1 案にだけ写真を入れて HeroEditorial v2 として実装します。
            写真は BRAND-TRUTH §1 の Photo allowlist 内から選定 (実写施工写真優先)。
            違和感があれば選んだ案の中で構造を磨きます。3 案比較・別構造への寄り道
            には戻りません。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Hero Wireframes — 2026-05-08 / no photo, structure only /{" "}
        <Link href="/" className="text-white/60 hover:text-white">本番TOP</Link>
      </footer>
    </main>
  );
}
