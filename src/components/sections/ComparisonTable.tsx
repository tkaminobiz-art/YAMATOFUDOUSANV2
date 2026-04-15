"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { Check, Equal } from "lucide-react";

/*
  大手 vs やまと 比較表
  Mechanism（価格のカラクリ）の直後に配置。
  理屈の次に「具体的な証拠」を見せる役割。

  配色方針：
  - 大手側: text-secondary系（控えめ・地味）
  - やまと側: main/accent（強調）
  - 「同じ」項目には Equal アイコンで視覚的リンク
  - 「違う」項目には Check アイコン + アクセントカラーで強調

  [要確認] 専務に確認が必要な項目：
  - 建物本体価格4,000万〜（大手の同等モデル想定）の根拠
  - 各素材の大手同等品の表記（匿名で「国内大手」でOK？）
*/

type Row = {
  category: string;
  major: string;
  yamato: string;
  diff: "same" | "big-diff"; // same: 同等 / big-diff: 決定的な違い
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

export default function ComparisonTable() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ヘッダー */}
        <div className="mb-10 md:mb-14 max-w-[720px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            COMPARISON
          </p>
          <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
            大手と、やまとで。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
            同じ素材、同じ品質。違うのは、看板代と中間マージンだけ。
          </p>
        </div>

        {/* 比較表 — Desktop */}
        <div className="hidden md:block overflow-hidden rounded-lg border border-border">
          {/* ヘッダー行 */}
          <div className="grid grid-cols-[1.2fr_1.5fr_1.5fr] bg-bg-secondary border-b-2 border-text-primary">
            <div className="px-5 py-4" />
            <div className="px-5 py-4 text-center">
              <p className="text-text-secondary text-xs tracking-wider mb-1">
                大手ハウスメーカー
              </p>
            </div>
            <div className="px-5 py-4 text-center bg-main/10 border-l-2 border-main">
              <p className="text-main text-xs font-medium tracking-wider mb-1">
                やまと不動産
              </p>
            </div>
          </div>

          {/* データ行 */}
          {COMPARISONS.map((row, i) => (
            <div
              key={row.category}
              className={`grid grid-cols-[1.2fr_1.5fr_1.5fr] border-b border-border last:border-b-0 ${
                i % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary/40"
              }`}
            >
              <div className="px-5 py-4 flex items-center">
                <span className="text-text-secondary text-sm font-medium">
                  {row.category}
                </span>
              </div>

              {/* 大手（控えめ） */}
              <div className="px-5 py-4 flex items-center justify-center opacity-75">
                <span className="text-text-secondary text-sm line-through decoration-text-secondary/40">
                  {row.major}
                </span>
              </div>

              {/* やまと（強調） */}
              <div
                className={`px-5 py-4 flex items-center justify-center gap-2 border-l-2 ${
                  row.diff === "big-diff"
                    ? "bg-main/10 border-main"
                    : "bg-bg-primary/50 border-main/30"
                }`}
              >
                {row.diff === "same" ? (
                  <Equal className="w-3.5 h-3.5 text-main/60 shrink-0" strokeWidth={2} />
                ) : (
                  <Check className="w-4 h-4 text-main shrink-0" strokeWidth={2.5} />
                )}
                <span
                  className={`text-sm ${
                    row.diff === "big-diff"
                      ? "text-text-primary font-medium"
                      : "text-text-primary"
                  }`}
                >
                  {row.yamato}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 比較表 — Mobile（縦積み） */}
        <div className="md:hidden space-y-4">
          {COMPARISONS.map((row) => (
            <div
              key={row.category}
              className="bg-bg-secondary rounded-lg p-5 border border-border"
            >
              <p className="text-text-secondary text-xs tracking-wider mb-3 font-medium">
                {row.category}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="opacity-70">
                  <p className="text-[10px] text-text-secondary mb-1">大手</p>
                  <p className="text-sm text-text-secondary line-through decoration-text-secondary/40">
                    {row.major}
                  </p>
                </div>
                <div
                  className={`pl-3 border-l-2 ${
                    row.diff === "big-diff" ? "border-main" : "border-main/30"
                  }`}
                >
                  <p className="text-[10px] text-main mb-1 font-medium">やまと</p>
                  <div className="flex items-start gap-1.5">
                    {row.diff === "same" ? (
                      <Equal className="w-3 h-3 text-main/60 shrink-0 mt-1" strokeWidth={2} />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-main shrink-0 mt-0.5" strokeWidth={2.5} />
                    )}
                    <p
                      className={`text-sm ${
                        row.diff === "big-diff"
                          ? "text-text-primary font-medium"
                          : "text-text-primary"
                      }`}
                    >
                      {row.yamato}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 凡例 */}
        <div className="flex flex-wrap justify-end gap-5 mt-5 mb-8 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <Equal className="w-3 h-3 text-main/60" strokeWidth={2} />
            <span>大手と同等</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-main" strokeWidth={2.5} />
            <span>やまとの優位</span>
          </span>
        </div>

        {/* 核心コピー */}
        <div className="bg-bg-secondary rounded-lg p-[var(--card-p)] mt-10">
          <h3 className="text-text-primary text-base md:text-lg font-medium mb-3">
            素材は同じ。違うのは、看板代と中間マージンだけ。
          </h3>
          <p className="text-text-secondary text-sm md:text-base leading-[1.9] max-w-[720px]">
            旭化成・住友ゴム・クリナップ・TOTO。大手と同じメーカーの素材を、当社でも標準でお使いいただけます。展示場も広告も、中間業者も挟まないから、その分だけお客様に届く価格が変わります。
          </p>
        </div>
      </div>
    </section>
  );
}
