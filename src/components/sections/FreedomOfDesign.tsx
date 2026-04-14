"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";

const STEPS = [
  {
    num: "01",
    title: "初回から、設計士が一緒です。",
    body: "営業担当だけじゃなく、プロの設計士がはじめの打ち合わせから同席します。あなたの話を、その場で図面に落とせます。",
  },
  {
    num: "02",
    title: "3ヶ月かけて、間取りを組みます。",
    body: "1回じゃ決まりません。平日の動線や子どもの成長を織り込みながら、何度でも描き直します。",
  },
  {
    num: "03",
    title: "ショールームで、1日かけて選びます。",
    body: "LIXIL・TOTO・クリナップ。外壁、床、キッチン、浴室、クロスの色まで。ご家族で、実物に触れながら決めます。",
  },
  {
    num: "04",
    title: "コンセントの位置まで、あなたが決める。",
    body: "外壁・床・キッチン・浴室。コンセントの数、窓の形まで、全部あなたが選びます。",
  },
] as const;

const PLUS_ONE = [
  {
    name: "折下天井＋間接照明",
    desc: "リビングに1段落ちた天井と、柔らかな光。",
  },
  {
    name: "大空間収納",
    desc: "ファミリークローゼットより大きく、全部入る。",
  },
  {
    name: "浄水・還元水素水",
    desc: "キッチンで、いつでも飲める水。",
  },
] as const;

export default function FreedomOfDesign() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="design" className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ===== 見出し ===== */}
        <div className="mb-16 md:mb-20 max-w-[760px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            FREEDOM OF DESIGN
          </p>
          <h2
            className="text-[clamp(22px,3vw,36px)] text-text-primary mb-5 leading-[1.5]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            「これいいな」と思ったプランに、
            <br className="hidden md:inline" />
            「でもうちは子ども2人で…」と諦めていませんか。
          </h2>
          <p
            className="text-text-primary text-[clamp(16px,1.3vw,20px)] leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            花・風・京、どれを選んでも、あなた仕様に組み直します。
          </p>
          <p className="text-text-secondary text-[clamp(14px,1vw,16px)] leading-relaxed mt-6">
            設計士が最初から一緒に、あなたの土地と暮らし方に合わせて、ゼロから組み立てます。
          </p>
        </div>

        {/* ===== 4ステップ（非対称2x2） ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-10 md:gap-y-14 mb-20 md:mb-28">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`scroll-in flex gap-5 md:gap-6 ${
                // 偶数インデックス（02,04）を少し下げて非対称リズム
                i % 2 === 1 ? "md:mt-10" : ""
              }`}
            >
              <span
                className="text-main/25 font-light text-5xl md:text-6xl leading-none shrink-0 pt-1"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {step.num}
              </span>
              <div>
                <h3
                  className="text-text-primary text-lg md:text-xl mb-2 leading-[1.5]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Plus+1 SELECT ===== */}
        <div className="bg-bg-warm rounded-lg p-[clamp(24px,4vw,48px)] mb-16 md:mb-20">
          <p className="font-section-label text-accent text-xs mb-3 tracking-[0.15em]">
            PLUS +1 SELECT
          </p>
          <h3
            className="text-text-primary text-xl md:text-2xl mb-3 leading-[1.5]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            標準にプラスして、&ldquo;うちらしさ&rdquo;をつくる。
          </h3>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
            お客様がよく選ばれるオプションを、3つ紹介します。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--card-gap)]">
            {PLUS_ONE.map((opt) => (
              <div
                key={opt.name}
                className="bg-bg-primary rounded p-5 md:p-6 border-l-2 border-accent/50"
              >
                <p
                  className="text-text-primary text-base md:text-lg mb-2 leading-[1.5]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {opt.name}
                </p>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-text-secondary text-xs mt-6">
            ※ 他にも数十種類から選べます。
          </p>
        </div>

        {/* ===== CTA ===== */}
        <div className="text-center">
          <p
            className="text-text-primary text-lg md:text-xl mb-2 leading-[1.6]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            まずは、設計士に会ってみませんか。
          </p>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
            あなたの土地と家族の話を、その場で間取りに落としてみます。
          </p>
          <Link
            href="/reserve"
            className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3.5 rounded bg-accent text-white text-base font-medium transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(196,112,63,0.35)]"
          >
            設計士との打ち合わせを予約する
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
