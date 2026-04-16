"use client";

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
  { category: "外壁", major: "旭化成パワーボード", yamato: "旭化成パワーボード", diff: "same" },
  { category: "断熱材", major: "ウレタン吹付", yamato: "ウレタン吹付", diff: "same" },
  { category: "制震装置", major: "制震ダンパー", yamato: "住友ゴムMIRAIE", diff: "same" },
  { category: "キッチン", major: "国内大手メーカー", yamato: "クリナップ", diff: "same" },
  { category: "浴室", major: "国内大手メーカー", yamato: "TOTO", diff: "same" },
  {
    category: "地盤改良費",
    major: "別途 100〜200万円",
    yamato: "¥0（当社負担）",
    diff: "big-diff",
  },
  {
    category: "設計自由度",
    major: "規格プランから選択",
    yamato: "完全自由設計",
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
const SAME_ONLY = COMPARISONS.filter((r) => r.diff === "same");

export default function ComparisonTable() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="comparison" className="bg-bg-warm py-[var(--section-py)]">
      <div
        ref={ref}
        className="mx-auto max-w-[1400px] px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          label="COMPARISON"
          title="大手と、やまとで。"
          ghostText="COMPARISON"
          lead="同じ素材、同じ品質。違うのは、看板代と中間マージンだけ。"
          className="scroll-in"
        />

        {/* ── ① ブリッジ（価格の“同じ図”は使わない） ── */}
        <div className="scroll-in mx-auto mb-10 max-w-[720px] text-center md:mb-14">
          <p className="text-sm leading-relaxed text-text-secondary md:text-base">
            ひとつ上の <span className="font-semibold text-text-primary">MECHANISM</span>{" "}
            で「なぜ差が出るか」を示したうえで、ここでは{" "}
            <span className="font-semibold text-text-primary">項目ごとの事実</span>
            を並べます。価格の図解の繰り返しはしません。
          </p>
        </div>

        {/* ── ② 決定的差（big-diff）全件 ── */}
        <div className="scroll-in mb-4 md:mb-6">
          <p className="text-center font-section-label text-xs tracking-[0.2em] text-main md:text-sm">
            DECISIVE DIFFERENCES
          </p>
          <p className="mt-2 text-center text-sm text-text-secondary md:text-base">
            ここが違うから、最後まで安心して選べます。
          </p>
        </div>

        <div className="scroll-in grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {BIG_DIFF.map((row) => (
            <article
              key={row.category}
              className="relative overflow-hidden rounded-xl border border-main/25 bg-bg-primary card-shadow"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-main md:w-1.5" aria-hidden />
              <div className="grid gap-5 p-6 pl-5 md:grid-cols-2 md:p-8 md:pl-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                    項目
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-wide text-text-primary md:text-xl">
                    {row.category}
                  </h3>
                  <div className="mt-5 rounded-lg bg-bg-secondary/80 px-4 py-3">
                    <p className="text-[10px] font-medium tracking-wider text-text-secondary">
                      大手側
                    </p>
                    <p
                      className={`mt-1 text-sm md:text-base ${
                        row.category === "建物本体価格"
                          ? "font-medium text-text-secondary"
                          : "text-text-secondary line-through decoration-text-secondary/35"
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
                <div className="flex flex-col justify-between gap-4 rounded-lg bg-main px-5 py-5 text-white md:min-h-[200px]">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                      やまと
                    </p>
                    <div className="mt-2 flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.5} />
                      <p className="text-base font-semibold leading-snug md:text-lg">
                        {row.yamato}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-white/70">
                    {row.category === "建物本体価格"
                      ? "内訳の差が、そのまま体感できる最重要項目です。"
                      : "見積もりの透明性と、土地〜建物までの一貫体制が効いてくる部分です。"}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── ③ 同等仕様（same）— 編集テーブル1枚 ── */}
        <div className="scroll-in mt-12 md:mt-16">
          <div className="mb-5 text-center md:mb-6">
            <p className="font-section-label text-xs tracking-[0.2em] text-main md:text-sm">
              SAME GRADE SPECS
            </p>
            <p className="mt-2 text-sm text-text-secondary md:text-base">
              素材・メーカーは大手と肩を並べます。
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-bg-primary card-shadow">
            <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border bg-bg-secondary/80">
              <div className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-text-secondary md:px-6 md:py-4 md:text-xs">
                項目
              </div>
              <div className="border-l border-border px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-text-secondary md:px-6 md:py-4 md:text-xs">
                大手
              </div>
              <div className="border-l border-border bg-main/10 px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-main md:px-6 md:py-4 md:text-xs">
                やまと
              </div>
            </div>
            {SAME_ONLY.map((row, i) => (
              <div
                key={row.category}
                className={`grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border last:border-b-0 ${
                  i % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary/35"
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
                  <Equal className="h-4 w-4 shrink-0 text-main md:h-[18px] md:w-[18px]" strokeWidth={2} />
                  <span className="text-center text-xs font-medium text-text-primary md:text-sm">
                    {row.yamato}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 凡例（コンパクト） */}
        <div className="scroll-in mt-5 flex flex-wrap items-center justify-center gap-6 text-[11px] text-text-secondary md:mt-6 md:text-xs">
          <span className="inline-flex items-center gap-2">
            <Equal className="h-3.5 w-3.5 text-main/70" strokeWidth={2} />
            大手と同等の仕様
          </span>
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-main" strokeWidth={2.5} />
            やまとが優位な条件
          </span>
        </div>

        {/* ── ④ 締め ── */}
        <div className="scroll-in mt-10 rounded-xl bg-bg-secondary px-6 py-6 text-center card-shadow md:mt-14 md:px-12 md:py-8">
          <p className="text-[clamp(17px,1.9vw,22px)] font-semibold tracking-[0.05em] text-text-primary">
            素材は同じ。違うのは、看板代と中間マージンだけ。
          </p>
          <p className="mx-auto mt-4 max-w-[720px] text-sm leading-[1.85] text-text-secondary md:text-base">
            旭化成・住友ゴム・クリナップ・TOTO。大手と同じメーカーの素材を、当社でも標準でお使いいただけます。展示場も広告も、中間業者も挟まないから、その分だけお客様に届く価格が変わります。
          </p>
        </div>

        <p className="scroll-in mx-auto mt-5 max-w-[900px] text-center text-[11px] leading-[1.85] text-text-secondary md:mt-6">
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
