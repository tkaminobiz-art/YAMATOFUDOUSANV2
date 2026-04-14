"use client";

import { useState } from "react";
import { useScrollIn } from "@/hooks/useScrollIn";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "本当にコミコミ価格ですか？後から追加が出ませんか？",
    a: "建物本体＋付帯工事、すべて含んだ価格です。地盤改良費は当社が全額負担（最大150万円相当）、仲介手数料・つなぎ融資の負担もゼロです。含まれないのは、土地代・登記費用・引越し代のみです。",
  },
  {
    q: "安いのは、手抜きではないですか？",
    a: "使っている素材は大手と同じです。クリナップ・TOTO・YKK AP・ニチハといった一流メーカーの製品を標準採用しています。価格差の正体はブランド名と広告費。展示場を持たず、中間マージンをカットしているから、この価格で建てられます。",
  },
  {
    q: "モデルハウスと標準仕様は本当に同じですか？",
    a: "同じです。モデルハウスで「素敵だな」と感じた設備が、オプションではなく全邸標準です。打合せを重ねても金額が上がっていくことはありません。",
  },
  {
    q: "自由設計とありますが、どのくらい自由ですか？",
    a: "間取り・設備・素材は全邸フルオーダーです。お客様のライフスタイルに合わせて設計します。ただし構造上変更できない箇所（耐力壁の位置等）はご相談しながら決めさせていただきます。",
  },
  {
    q: "打合せはどのくらいかかりますか？",
    a: "契約から着工まで、平均3ヶ月ほどです。共働きのご家族が多いため、休日に少しずつ進められるようスケジュールをご提案します。",
  },
  {
    q: "保証・アフターサービスはどうなっていますか？",
    a: "地盤保証20年、しろあり保証10年がついています。建てた後も、電話一本で駆けつけます。",
  },
  {
    q: "土地を持っていません。土地探しもお願いできますか？",
    a: "できます。当社は土地の分譲実績が90区画以上あり、奈良・京都エリアで自社保有の分譲地をご紹介できます。土地と建物をセットでご提案するため、つなぎ融資の負担もかかりません。",
  },
  {
    q: "住宅ローンの相談はできますか？",
    a: "住宅ローンアドバイザー資格保有のスタッフが在籍しています。複数の金融機関から最適なローンをご提案します。大和信用金庫・奈良中央信用金庫・南都銀行・りそな銀行など、地元の主要銀行と取引があります。",
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
          よくあるご質問
        </h2>
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed mb-10 md:mb-14 max-w-[640px]">
          よくいただくご質問を、まとめました。
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
          でお気軽にどうぞ
        </p>
      </div>
    </section>
  );
}
