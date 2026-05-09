"use client";

import { useState } from "react";
import { useScrollIn } from "@/hooks/useScrollIn";
import { Plus, Minus } from "lucide-react";

/*
  FaqSection — 2026-05-04 v3 (参考LP準拠・10件1列リスト構造へ)
  ---------------------------------------------------------------
  v2(8件2列カード) → v3(10件1列ライン)
  参考: やまと家計設計LP「気になるところから、どうぞ。」の長尺FAQ。
  目的: 不安要素を網羅的に並べ、潔さで信頼を出す。1列にすることで
       スキャン時の読みやすさを優先(読者の網羅圧)。

  追加2件:
    Q.09 つなぎ融資 — メモリ"やまとの売り"準拠で「発生しません」断定訴求。
    Q.10 見学・相談だけOK — 「来場ノルマなし」相当の事前回答。
*/

// 2026-05-09 Step 2: TOP では 5 問に絞る (「初見ユーザーの不安に直撃」する 5 つ)。
// 撤去した 5 問 (モデルハウス vs 標準 / 自由設計 / 打合せ期間 / 保証・アフター / つなぎ融資 単独)
// は詳細ページ (/money / /faq) で対応する想定。
const FAQS = [
  {
    q: "本当にコミコミ価格ですか？後から追加が出ませんか？",
    a: "建物本体と付帯工事までを含めた目安です。地盤改良費（最大150万円）と仲介手数料は当社が負担します。つなぎ融資は、やまとの土地+建物セットなら原則発生しません(独自にお持ちの土地で建てる場合は別途ご相談)。別途になるのは、土地代・登記費用・引越し費用・外構工事です。",
  },
  {
    q: "この価格で、品質は大丈夫ですか？",
    a: "使う素材は、大手と同じです。クリナップ、TOTO、YKK AP、ニチハ。国内メーカーを標準で揃えています。価格の理由は、専用の展示場を持たず自社分譲地のモデルハウスで兼ねていること、設計から施工まで自社で進めていることにあります。",
  },
  {
    q: "土地を持っていません。土地探しもお願いできますか？",
    a: "はい。奈良・京都エリアで自社分譲の実績があります。土地と建物をまとめてご提案できるので、段取りを一本化できます。やまとの土地+建物セットなら、つなぎ融資も発生しません(一般に30〜80万円分の節約)。",
  },
  {
    q: "住宅ローンの相談はできますか？",
    a: "はい。住宅ローンアドバイザー資格を持つスタッフが在籍しています。複数の金融機関の中から、ご状況に合う形を一緒に整理します（大和信用金庫、奈良中央信用金庫、南都銀行、りそな銀行など）。",
  },
  {
    q: "見学だけ・ご相談だけでも、対応してもらえますか？",
    a: "はい、ご見学だけでも、ご相談だけでも構いません。何度ご来場いただいても費用はかかりません。ご希望のない営業電話や訪問はいたしません。",
  },
] as const;

function FaqItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group w-full flex items-center gap-4 sm:gap-6 py-5 sm:py-6 text-left transition-colors hover:bg-bg-secondary/40"
      >
        <span
          className="shrink-0 text-main text-[13px] sm:text-[14px] tabular-nums tracking-[0.04em] w-7 sm:w-9"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontWeight: 600 }}
        >
          {num}
        </span>
        <span
          className="flex-1 min-w-0 text-text-primary text-[14px] sm:text-[15px] leading-[1.6]"
          style={{ fontFamily: "var(--font-murecho-var)", fontWeight: 500 }}
        >
          {q}
        </span>
        <span
          aria-hidden
          className="shrink-0 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-main transition-colors group-hover:bg-main group-hover:text-white"
        >
          {open ? (
            <Minus className="w-4 h-4" strokeWidth={1.75} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={1.75} />
          )}
        </span>
      </button>
      {open && (
        <div className="pl-[calc(1.75rem+1rem)] sm:pl-[calc(2.25rem+1.5rem)] pr-4 sm:pr-12 pb-6">
          <p className="text-text-secondary text-[13px] sm:text-[14px] leading-[1.95]">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const sectionRef = useScrollIn<HTMLDivElement>();

  return (
    <section id="faq" className="font-murecho bg-white py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[920px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* 装飾: 小さな葉ドット(参考LPの三角ドット相当) */}
        <div
          aria-hidden
          className="flex items-end justify-center gap-1.5 mb-6 text-main/70"
        >
          <span className="block w-1 h-1 rounded-full bg-current" />
          <span className="block w-1.5 h-1.5 rounded-full bg-current opacity-80" />
          <span className="block w-1 h-1 rounded-full bg-current" />
        </div>

        <p
          className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-center mb-3"
          style={{ color: "#486B00", fontWeight: 600, fontFamily: "var(--font-inter)" }}
        >
          FAQ
        </p>
        <h2
          className="font-zen-old text-[clamp(22px,3vw,36px)] text-text-primary text-center mb-3 leading-[1.4] tracking-[0.02em]"
          style={{ fontWeight: 600 }}
        >
          気になるところから、どうぞ。
        </h2>
        <p className="text-text-secondary text-[13px] sm:text-sm leading-[1.85] text-center max-w-[600px] mx-auto mb-12 md:mb-16">
          家づくり・お金・土地・契約まわりのよくあるご質問をまとめました。
        </p>

        {/* 10件1列リスト */}
        <div className="border-t border-border">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <p className="text-text-secondary text-xs sm:text-sm mt-10 sm:mt-14 text-center leading-[1.85]">
          その他のご質問は、
          <a href="/contact" className="text-main underline mx-1">資料請求</a>
          または
          <a
            href="https://line.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-main underline mx-1"
          >
            LINE
          </a>
          からお気軽にどうぞ。
        </p>
      </div>
    </section>
  );
}
