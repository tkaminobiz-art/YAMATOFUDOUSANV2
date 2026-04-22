"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

const FLOW_STEPS = [
  {
    num: "01",
    title: "ご相談・ご来店",
    desc: "モデルハウスで、ご家族の暮らしをゆっくりとお聞かせください。",
    duration: "30分〜",
  },
  {
    num: "02",
    title: "土地探し",
    desc: "自社分譲90区画から、ぴったりな土地を選びます。",
    duration: "1〜2週間",
  },
  {
    num: "03",
    title: "プラン・見積もり",
    desc: "ご予算の範囲で、間取りと仕様をご提案します。価格は、最後まで動きません。",
    duration: "2〜3週間",
  },
  {
    num: "04",
    title: "ご契約",
    desc: "ご納得のうえで、ご契約いただきます。そこから先、価格は動きません。",
    duration: "1日",
  },
  {
    num: "05",
    title: "詳細打合せ",
    desc: "間取りも設備も素材も、ここで決めます。自由設計なので、細部までご家族に合わせます。",
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
    desc: "内装と設備を設置し、最終の塗装に入ります。竣工検査を経て、完成します。",
    duration: "2〜3ヶ月",
  },
  {
    num: "09",
    title: "お引渡し",
    desc: "お引き渡しの日から、本当のお付き合いが始まります。半年・1年・5年ごとに、やまとが伺います。",
    duration: "半日",
  },
  {
    num: "10",
    title: "アフターフォロー",
    desc: "半年から10年まで、5回の定期点検があります。電話ひとつで、すぐに伺います。",
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
            ご相談から完成まで、10段階でご案内します。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
            土地探しから手入れまで、やまとが担当します。
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
