"use client";

import { useState } from "react";
import { useScrollIn } from "@/hooks/useScrollIn";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "本当にコミコミ価格ですか？後から追加が出ませんか？",
    a: "建物本体と付帯工事、すべてを含んだお値段です。地盤改良費（最大百五十万円）、仲介手数料、つなぎ融資は、すべて当社が負担いたします。お客様にご用意いただくのは、土地代、登記費用、引越し代のみでございます。",
  },
  {
    q: "この価格で、品質は大丈夫ですか？",
    a: "お使いする素材は、大手と同じでございます。クリナップ、TOTO、YKK AP、ニチハ——いずれも、名の通った一流メーカーを標準でご用意しております。展示場を持たず、広告費もかけず、設計から施工まで自社で手がけることで、余分を削ぎ落としたお値段をお届けしております。",
  },
  {
    q: "モデルハウスと標準仕様は本当に同じですか？",
    a: "同じでございます。モデルハウスでご覧になった設備を、オプションではなくすべて標準仕様でご用意しております。お打ち合わせを重ねても、お値段が上がっていくことはございません。",
  },
  {
    q: "自由設計とありますが、どのくらい自由ですか？",
    a: "間取り、設備、素材は、すべて自由にお選びいただけます。お客様のお暮らしに合わせて、設計いたします。構造上、動かせない箇所（耐力壁の位置など）については、ご相談のうえで決めてまいります。",
  },
  {
    q: "打合せはどのくらいかかりますか？",
    a: "ご契約から着工まで、平均で三ヶ月ほどでございます。共働きのご家族が多いため、お休みの日に少しずつ進められるよう、スケジュールをお組みいたします。",
  },
  {
    q: "保証・アフターサービスはどうなっていますか？",
    a: "地盤保証は二十年、しろあり保証は十年。お建てしたあとも、お電話ひとつで、すぐにお伺いいたします。",
  },
  {
    q: "土地を持っていません。土地探しもお願いできますか？",
    a: "お任せください。当社の土地分譲実績は九十区画以上。奈良・京都エリアで、自社保有の分譲地をご紹介いたします。土地と建物をまとめてご提案いたしますので、つなぎ融資のご負担もございません。",
  },
  {
    q: "住宅ローンの相談はできますか？",
    a: "住宅ローンアドバイザーの資格を持つ者が、当社におります。複数の金融機関から、もっとも合うローンをお選びいたします。大和信用金庫、奈良中央信用金庫、南都銀行、りそな銀行など、地元の主要銀行とお取引がございます。",
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
          よくお寄せいただくご質問に、まとめてお答えいたします。
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
          より、お気軽にお寄せください。
        </p>
      </div>
    </section>
  );
}
