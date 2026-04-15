"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";

/*
  CONCEPT — ダーク帯で「ページの呼吸」を作る
  旧 FounderQuote の二行コピーは CONCEPT に統合済みのため、重複ブロックは削除。
*/

export default function ConceptSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section
      id="concept"
      className="relative overflow-hidden border-y border-white/[0.08] bg-[#2B2B2B] py-[var(--section-py)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />
      <div
        ref={ref}
        className="relative mx-auto max-w-[1200px] px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          theme="dark"
          label="CONCEPT"
          title="「予算オーバーで理想を諦める」そんな必要はありません。"
          ghostText="CONCEPT"
          titleClassName="mx-auto max-w-[min(100%,52rem)] leading-[1.42] tracking-[0.04em] [font-family:var(--font-serif)] font-medium"
        />

        <div className="mx-auto mt-10 max-w-[920px] md:mt-16">
          <div className="mx-auto mb-10 h-px w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent md:mb-12 md:w-32" />

          <p className="text-center text-[clamp(17px,2vw,22px)] font-medium leading-[1.75] text-white/90 md:leading-[1.85]">
            <span className="text-white/55">大手で</span>
            <span className="mx-1 inline-block align-baseline">
              <span
                className="text-[clamp(2rem,6vw,3.75rem)] font-semibold tracking-tight text-white/45"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                4,000
              </span>
              <span className="text-lg font-medium text-white/50 md:text-xl">万円</span>
            </span>
            <span className="text-white/55">と言われた家が、</span>
            <br className="hidden sm:block" />
            <span className="inline-block align-baseline sm:ml-1">
              <span
                className="text-[clamp(2.25rem,7vw,4.25rem)] font-semibold tracking-tight text-main"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                2,480
              </span>
              <span className="text-lg font-semibold text-main md:text-xl">万円</span>
            </span>
            <span className="text-white">で建ちます。</span>
          </p>

          <p
            className="mx-auto mt-10 max-w-[48rem] text-center text-[clamp(15px,1.35vw,18px)] leading-[2] text-white/65 md:mt-12 md:leading-[2.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            使っている素材は同じ。違うのは、
            <span className="font-semibold text-white">
              無駄な広告費や中間マージンがかかっていないことだけ
            </span>
            です。
          </p>
        </div>
      </div>
    </section>
  );
}
