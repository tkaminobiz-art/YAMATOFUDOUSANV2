"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

const FLOW_STEPS = [
  {
    num: "01",
    title: "ご相談・ご来店",
    desc: "モデルハウスで、理想のお家をお聞かせください。",
    duration: "30分〜",
  },
  {
    num: "02",
    title: "土地探し",
    desc: "当社の分譲地90区画以上から、希望に合う土地をご提案。",
    duration: "1〜2週間",
  },
  {
    num: "03",
    title: "プラン・見積もり",
    desc: "ご予算内で、間取り・仕様をご提案。金額は明確に。",
    duration: "2〜3週間",
  },
  {
    num: "04",
    title: "ご契約",
    desc: "ご納得いただけた時点でご契約。以後の金額は変わりません。",
    duration: "1日",
  },
  {
    num: "05",
    title: "詳細打合せ",
    desc: "間取り・設備・素材を決定。自由設計だから、こだわり放題。",
    duration: "1〜2ヶ月",
  },
  {
    num: "06",
    title: "着工",
    desc: "地盤改良（必要時は当社負担）後、基礎工事から始まります。",
    duration: "1日",
  },
  {
    num: "07",
    title: "上棟",
    desc: "棟上げ後、建物の全体像が見えてきます。現場もご見学可能です。",
    duration: "1日",
  },
  {
    num: "08",
    title: "内装・仕上げ",
    desc: "内装・設備の設置、最終の塗装。竣工検査を経て完成へ。",
    duration: "2〜3ヶ月",
  },
  {
    num: "09",
    title: "お引渡し",
    desc: "お引き渡し。ここからが、お客様との本当の長〜いお付き合いの始まりです。",
    duration: "半日",
  },
  {
    num: "10",
    title: "アフターフォロー",
    desc: "半年・1年・2年・5年・10年の定期点検。電話一本で駆けつけます。",
    duration: "ずっと",
  },
] as const;

export default function FlowSection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <div className="mb-10 md:mb-14 max-w-[640px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            FLOW
          </p>
          <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
            ご相談から完成まで、10ステップ。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
            土地探しから引渡し後のフォローまで、すべて当社で完結します。
          </p>
        </div>

        {/* 2列に振り分け（左: 01-05、右: 06-10） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 lg:gap-x-24">
          {[FLOW_STEPS.slice(0, 5), FLOW_STEPS.slice(5)].map((col, colIdx) => (
            <div key={colIdx} className="relative">
              {/* 縦ライン */}
              <div className="absolute left-[20px] top-6 bottom-6 w-px bg-border hidden lg:block" />

              {col.map((step, i) => (
                <div
                  key={step.num}
                  className="scroll-in relative flex gap-4 md:gap-6 py-5 md:py-6 border-b border-border last:border-b-0 lg:border-b-0"
                >
                  {/* 番号 */}
                  <div className="shrink-0 w-10 flex items-start">
                    <span
                      className="text-main font-light text-2xl md:text-3xl leading-none bg-bg-primary relative z-10"
                      style={{
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                      <h3
                        className="text-text-primary font-medium text-base md:text-lg"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {step.title}
                      </h3>
                      <span
                        className="text-accent text-[10px] md:text-xs font-medium tracking-wider"
                        style={{
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                        }}
                      >
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
