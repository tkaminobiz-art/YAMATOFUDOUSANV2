"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import { Check, Equal } from "lucide-react";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";

/*
  COMPARISON — 全力版（2026-04）
  Mechanism の直後：「理屈」の次に「一枚の証拠ボード」で納得させる。

  構成:
  1. 章扉（SectionHeaderCentered）
  2. ブリッジ文のみ（MECHANISM と同じ「価格の左右図」は出さない）
  3. 決定的差（big-diff）— カードグリッド（建物本体価格を含む全項目）
  4. 同等仕様（same）— 編集テーブル風の一枚パネル
  5. 締めコピー＋出典

  価格根拠・要確認コメントは従来どおりファイル末尾コメントに保持。
*/

type Row = {
  category: string;
  major: string;
  yamato: string;
  diff: "same" | "big-diff";
};

const COMPARISONS: Row[] = [
  {
    category: "建物本体価格",
    major: "4,000万円〜",
    yamato: "2,480万円〜",
    diff: "big-diff",
  },
  {
    category: "外壁",
    major: "各社独自の高耐久外壁（ALC/タイル/セラミック等）",
    yamato: "旭化成建材 パワーボード（外壁）",
    diff: "same",
  },
  {
    category: "断熱材",
    major: "高性能グラスウール・ロックウール等（各社仕様）",
    yamato: "ウレタン吹付（断熱）",
    diff: "same",
  },
  {
    category: "制震装置",
    major: "各社独自開発の制震装置（各社仕様）",
    yamato: "住友ゴム MIRAIE（制震）",
    diff: "same",
  },
  {
    category: "キッチン",
    major: "国内主要メーカー（シリーズは各社仕様）",
    yamato: "クリナップ（シリーズはプランで確定）",
    diff: "same",
  },
  {
    category: "浴室",
    major: "国内主要メーカー（シリーズは各社仕様）",
    yamato: "TOTO（シリーズはプランで確定）",
    diff: "same",
  },
  {
    category: "地盤改良費",
    major: "別途 100〜200万円",
    yamato: "¥0（当社負担）",
    diff: "big-diff",
  },
  {
    category: "契約後の増額",
    major: "業界8割で発生",
    yamato: "¥0（見積もりから変わらず）",
    diff: "big-diff",
  },
  { category: "住宅性能保証", major: "あり", yamato: "あり", diff: "same" },
];

const BIG_DIFF = COMPARISONS.filter((r) => r.diff === "big-diff");
const SAME_ONLY = COMPARISONS.filter((r) => r.diff === "same").filter((r) =>
  ["キッチン", "浴室", "住宅性能保証"].includes(r.category),
);

export default function ComparisonTable() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="comparison"
      className="relative overflow-hidden bg-[#FBF8F2] py-[var(--section-py)]"
    >
      {/* 紙面トーン（MECHANISMと連続させつつ、背景差は“微妙”に） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_50%_at_18%_-10%,rgba(90,138,74,0.12)_0%,transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(43,43,43,0.02), rgba(43,43,43,0.02) 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div
        ref={ref}
        className="relative mx-auto max-w-[1320px] px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          label="COMPARISON"
          title="違うのは、価格の構造。お家そのものの品質は、落としません。"
          ghostText="COMPARISON"
          lead="比較は三つだけ。読み切れる量に絞って、要点のみを並べました。"
          className="scroll-in"
          align="left"
        />

        {/* ブリッジ（短く・左揃え） */}
        <div className="scroll-in mb-10 max-w-[840px] md:mb-12">
          <p className="text-[13px] leading-[1.9] text-text-secondary md:text-[14px]">
            まずは、緑色のチェックが付いた項目から、ご覧ください。
          </p>
        </div>

        {/* ── ① 証拠シート（結論先出し：決定的差を上で固定） ── */}
        <div className="scroll-in rounded-2xl border border-border bg-white/70 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.16)]">
          <div className="flex flex-col gap-3 border-b border-border bg-white/55 px-6 py-6 md:flex-row md:items-end md:justify-between md:px-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-text-secondary">
                EVIDENCE SHEET
              </p>
              <p
                className="mt-2 text-[clamp(18px,2.1vw,26px)] font-semibold tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                決定的に違うのは、この一点でございます。
              </p>
            </div>
            <p className="text-[12px] leading-relaxed text-text-secondary">
              まずは、緑の項目からどうぞ。
            </p>
          </div>

          <div className="px-6 py-6 md:px-8 md:py-8">
            {/* 重要行（big-diff） */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {BIG_DIFF.map((row) => (
                <div
                  key={row.category}
                  className="rounded-xl border border-main/25 bg-main/10 px-5 py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-main">
                        {row.category}
                      </p>
                      <p
                        className="mt-2 text-[15px] font-semibold leading-relaxed text-text-primary md:text-base"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {row.yamato}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-main/25 bg-white/70 px-3 py-1 text-[11px] font-semibold text-main">
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                      やまと優位
                    </span>
                  </div>

                  <div className="mt-4 rounded-lg border border-border/80 bg-white/65 px-4 py-3">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-text-secondary">
                      大手側（参考）
                    </p>
                    <p
                      className={`mt-1 text-[13px] text-text-secondary md:text-sm ${
                        row.category === "建物本体価格"
                          ? ""
                          : "line-through decoration-text-secondary/35"
                      }`}
                    >
                      {row.major}
                    </p>
                    {row.category === "建物本体価格" ? (
                      <p className="mt-2 text-[10px] leading-relaxed text-text-secondary">
                        5社平均・33坪4LDK試算（参考）
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {/* 差し込み写真（“同等仕様”へ繋ぐ証拠としての間） */}
            <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-white/60 md:mt-12">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/images/newsozai/exterior-texture-detail-01.webp"
                  alt="外壁の質感ディテール — 同等仕様の証拠"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-white/10 to-transparent"
                />
              </div>
              <figcaption className="px-6 py-5 md:px-8 md:py-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-text-secondary">
                  PHOTO EVIDENCE
                </p>
                <p
                  className="mt-2 text-[15px] font-semibold leading-relaxed tracking-[0.04em] text-text-primary md:text-base"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  素材・設備は、信頼のある国内メーカー品を、標準でご用意しております。
                </p>
                <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary md:text-[14px]">
                  この先は、項目ごとに、内容をご覧いただけます。
                </p>
              </figcaption>
            </figure>

            {/* 同等仕様（same）— ひとまとめで“静かに強い” */}
            <div className="mt-10 md:mt-12">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-text-secondary">
                    EQUIPMENT (REFERENCE)
                  </p>
                  <p
                    className="mt-2 text-lg font-semibold tracking-[0.05em] text-text-primary md:text-xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    水回りの設備メーカー（参考）
                  </p>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-border bg-white/65">
                <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border bg-white/55">
                  <div className="px-4 py-3 text-left text-[10px] font-semibold tracking-[0.18em] text-text-secondary md:px-6 md:py-4">
                    項目
                  </div>
                  <div className="border-l border-border px-4 py-3 text-center text-[10px] font-semibold tracking-[0.18em] text-text-secondary md:px-6 md:py-4">
                    参考（一般）
                  </div>
                  <div className="border-l border-border bg-main/10 px-4 py-3 text-center text-[10px] font-semibold tracking-[0.18em] text-main md:px-6 md:py-4">
                    やまと
                  </div>
                </div>
                {SAME_ONLY.map((row, i) => (
                  <div
                    key={row.category}
                    className={`grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border last:border-b-0 ${
                      i % 2 === 0 ? "bg-white/55" : "bg-white/35"
                    }`}
                  >
                    <div className="flex items-center px-4 py-3.5 md:px-6 md:py-4">
                      <span className="text-xs font-medium text-text-primary md:text-sm">
                        {row.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-center border-l border-border px-3 py-3.5 md:px-5 md:py-4">
                      <span className="text-center text-xs text-text-secondary md:text-sm">
                        {row.major}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 border-l border-main/20 bg-main/5 px-3 py-3.5 md:gap-2.5 md:px-5 md:py-4">
                      <span className="text-center text-xs font-medium text-text-primary md:text-sm">
                        {row.yamato}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-[11px] leading-[1.85] text-text-secondary">
                ※ メーカーやシリーズは、プランにより異なります。詳細はご来場時に、一覧でご説明いたします。
              </p>
            </div>
          </div>
        </div>

        {/* 締め（文章量を減らして余韻を残す） */}
        <div className="scroll-in mt-10 rounded-2xl border border-border bg-white/55 px-6 py-6 md:mt-12 md:px-10 md:py-8">
          <p className="text-[clamp(17px,1.9vw,22px)] font-semibold tracking-[0.05em] text-text-primary">
            素材は同じ。違うのは、看板代と中間マージンだけ。
          </p>
          <p className="mt-4 max-w-[820px] text-[13px] leading-[1.9] text-text-secondary md:text-[14px]">
            旭化成建材、住友ゴム、クリナップ、TOTO。いずれも、業界で広く信頼される国内メーカーでございます。
            同じ部材・設備を、当社でもお使いいただけます。看板代や中間マージンを差し引いた分、“お家そのもの”に、お金が戻ります。
          </p>
        </div>

        <p className="scroll-in mx-auto mt-5 max-w-[980px] text-left text-[11px] leading-[1.85] text-text-secondary md:mt-6">
          ※ 大手ハウスメーカー建物本体価格は、2026年時点の公表坪単価（積水ハウス・ヘーベルハウス・パナソニックホームズ・大和ハウス・住友林業の5社平均）から、33坪4LDKで試算した参考値です。実際の価格は仕様・地域・商品ラインにより異なります。
        </p>
      </div>
    </section>
  );
}

/*
  価格根拠（2026-04-15 調査）:
  - 大手5社（積水ハウス・ヘーベルハウス・パナソニックホームズ・大和ハウス・住友林業）の
    2026年時点の公表坪単価から、33坪4LDKで算出。
  [要確認] 専務に確認が必要な項目：
  - 各素材の大手同等品の表記（匿名で「国内大手」でOK？）
*/
