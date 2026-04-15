"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";

/*
  CONCEPT — 核メッセージのみを一枚で突き刺す
  右列の短い約束文（見積・展示場・電話）は本セクションから削除（他章で担保）。
*/

export default function ConceptSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section id="concept" className="border-y border-border/50 bg-bg-warm py-[var(--section-py)]">
      <div
        ref={ref}
        className="mx-auto max-w-[1200px] px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          label="CONCEPT"
          title="「予算オーバーで理想を諦める」そんな必要はありません。"
          ghostText="CONCEPT"
          titleClassName="mx-auto max-w-[min(100%,52rem)] leading-[1.42] tracking-[0.04em] [font-family:var(--font-serif)]"
        />

        <div className="mx-auto mt-10 max-w-[920px] md:mt-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-main/50 to-transparent md:w-32 mx-auto mb-10 md:mb-12" />

          {/* 価格の一撃 — 数字で視線を奪う */}
          <p className="text-center text-[clamp(17px,2vw,22px)] font-medium leading-[1.75] text-text-primary md:leading-[1.85]">
            <span className="text-text-secondary">大手で</span>
            <span className="mx-1 inline-block align-baseline">
              <span
                className="text-[clamp(2rem,6vw,3.75rem)] font-semibold tracking-tight text-text-secondary/75"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                4,000
              </span>
              <span className="text-lg font-medium text-text-secondary/80 md:text-xl">
                万円
              </span>
            </span>
            <span className="text-text-secondary">と言われた家が、</span>
            <br className="hidden sm:block" />
            <span className="sm:ml-1 inline-block align-baseline">
              <span
                className="text-[clamp(2.25rem,7vw,4.25rem)] font-semibold tracking-tight text-main"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                2,480
              </span>
              <span className="text-lg font-semibold text-main md:text-xl">
                万円
              </span>
            </span>
            <span className="text-text-primary">で建ちます。</span>
          </p>

          <p
            className="mx-auto mt-10 max-w-[48rem] text-center text-[clamp(15px,1.35vw,18px)] leading-[2] text-text-secondary md:mt-12 md:leading-[2.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            使っている素材は同じ。違うのは、
            <span className="font-semibold text-text-primary">
              無駄な広告費や中間マージンがかかっていないことだけ
            </span>
            です。
          </p>
        </div>
      </div>
    </section>
  );
}
