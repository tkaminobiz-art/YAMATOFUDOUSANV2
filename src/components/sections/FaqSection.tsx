"use client";

import { useState } from "react";
import { useScrollIn } from "@/hooks/useScrollIn";
import { Plus, Minus } from "lucide-react";

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
    q: "モデルハウスと標準仕様は本当に同じですか？",
    a: "はい、同じです。モデルハウスでご覧になった設備を、オプションではなく標準仕様として揃えています。打ち合わせを重ねるほど価格が膨らむ、ということはありません。",
  },
  {
    q: "自由設計とありますが、どのくらい自由ですか？",
    a: "間取り・設備・素材は、暮らし方に合わせて選べます。一方で、構造上動かせない箇所（耐力壁の位置など）もあるため、できること／できないことを整理しながら決めていきます。",
  },
  {
    q: "打合せはどのくらいかかりますか？",
    a: "ご契約から着工まで、平均で3ヶ月ほどです。共働きのご家族も多いため、お休みの日に少しずつ進められるようスケジュールを組みます。",
  },
  {
    q: "保証・アフターサービスはどうなっていますか？",
    a: "地盤保証は20年、しろあり保証は10年。お引き渡し後も、お電話ひとつで対応します。",
  },
  {
    q: "土地を持っていません。土地探しもお願いできますか？",
    a: "はい。奈良・京都エリアで自社分譲の実績があります。土地と建物をまとめてご提案できるので、段取りを一本化できます。やまとの土地+建物セットなら、つなぎ融資も発生しません(一般に30〜80万円分の節約)。",
  },
  {
    q: "住宅ローンの相談はできますか？",
    a: "はい。住宅ローンアドバイザー資格を持つスタッフが在籍しています。複数の金融機関の中から、ご状況に合う形を一緒に整理します（大和信用金庫、奈良中央信用金庫、南都銀行、りそな銀行など）。",
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
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left hover:bg-bg-secondary/50 transition-colors px-2"
      >
        <span className="flex items-start gap-4 flex-1">
          <span
            className="text-main text-sm md:text-base font-medium mt-0.5 shrink-0"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Q.{String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-text-primary text-sm md:text-base font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {q}
          </span>
        </span>
        <span className="shrink-0 text-main">
          {open ? (
            <Minus className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Plus className="w-5 h-5" strokeWidth={1.5} />
          )}
        </span>
      </button>
      {open && (
        <div className="pl-[calc(1rem+3.5em)] pr-2 pb-6 -mt-1">
          <p className="text-text-secondary text-sm leading-[1.9] max-w-[640px]">
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
    <section id="faq" className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1000px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
          FAQ
        </p>
        <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
          よくある質問。
        </h2>
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed mb-10 md:mb-14 max-w-[640px]">
          よくお寄せいただく質問を、まとめて。
        </p>

        <div>
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <p className="text-text-secondary text-xs mt-8 text-center">
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
          からお寄せください。
        </p>
      </div>
    </section>
  );
}
