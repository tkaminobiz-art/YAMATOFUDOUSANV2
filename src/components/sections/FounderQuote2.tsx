"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

export default function FounderQuote2() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="bg-main-light relative">
      <div
        ref={ref}
        className="max-w-[800px] mx-auto px-[var(--page-px)] py-[clamp(64px,calc(32px+6vw),180px)] text-center scroll-in"
      >
        <blockquote>
          <p
            className="text-[clamp(18px,2.8vw,32px)] text-text-primary leading-[1.6] tracking-[0.04em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            契約した日よりも、<br />
            引き渡しの日のほうが、仲がいい。
          </p>
        </blockquote>
      </div>
    </section>
  );
}
