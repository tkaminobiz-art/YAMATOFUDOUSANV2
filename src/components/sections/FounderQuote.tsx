"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

export default function FounderQuote() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="bg-text-primary relative overflow-hidden">
      {/* ノイズテクスチャ */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        ref={ref}
        className="relative max-w-[1000px] mx-auto px-[var(--page-px)] py-[clamp(80px,calc(40px+8vw),240px)] scroll-in"
      >
        <blockquote>
          <p
            className="text-[clamp(24px,4vw,48px)] text-bg-primary leading-[1.4] tracking-[0.04em] mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            坪60万と120万の差は、<br className="hidden md:inline" />
            家の差じゃない。<br />
            看板の差だ。
          </p>
          <footer className="flex items-center gap-3">
            <span className="w-8 h-px bg-bg-primary/30" />
            <cite
              className="text-bg-primary/60 text-sm not-italic"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              代表取締役専務　小林 敬昌
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
