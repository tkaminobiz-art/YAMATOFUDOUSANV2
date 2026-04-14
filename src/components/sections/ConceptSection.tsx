"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

export default function ConceptSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section id="concept" className="bg-bg-warm py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* 非対称レイアウト: 左にコンセプト / 右に3つの約束 */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">
          {/* 左: コンセプト */}
          <div>
            <p className="font-section-label text-main text-xs md:text-sm mb-6 tracking-[0.15em]">
              CONCEPT
            </p>
            <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-6 leading-[1.3]">
              「うちの年収じゃ無理」と思っていませんか。
            </h2>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9] max-w-[640px]">
              大手で<span className="nowrap">4,000万円</span>と言われた家が、<span className="nowrap">2,480万円</span>で建ちます。使っている素材は同じ。違うのは、ブランド名と広告費だけです。
            </p>
          </div>

          {/* 右: 3つの約束 */}
          <div className="flex flex-col gap-6 lg:mt-16">
            <div className="border-l-2 border-accent/60 pl-5">
              <p className="text-text-primary text-sm leading-[1.8]">
                見積もりから金額は変わりません。
              </p>
            </div>
            <div className="border-l-2 border-accent/60 pl-5">
              <p className="text-text-primary text-sm leading-[1.8]">
                展示場で見た仕様が、全邸標準です。
              </p>
            </div>
            <div className="border-l-2 border-accent/60 pl-5">
              <p className="text-text-primary text-sm leading-[1.8]">
                建てた後も、電話一本で駆けつけます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
