"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

export default function MidCta() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="bg-bg-secondary py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] text-center scroll-in"
      >
        <p className="text-text-secondary text-sm mb-3">写真では伝わらないものがあります。</p>
        <h2 className="text-[clamp(20px,2.5vw,32px)] text-text-primary mb-8">
          モデルハウスで、<br className="sm:hidden" />
          実物を確かめてください。
        </h2>

        <div className="flex justify-center gap-4">
          <a
            href="/reserve"
            className="flex items-center justify-center min-h-[44px] px-8 py-3 rounded bg-accent text-white text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-0.5"
          >
            来店予約
          </a>
          <a
            href="/contact"
            className="flex items-center justify-center min-h-[44px] px-8 py-3 rounded bg-bg-primary text-text-primary text-sm font-medium card-shadow transition-all hover:-translate-y-0.5"
          >
            資料請求
          </a>
        </div>

        <p className="text-text-secondary text-xs mt-4">
          ご予約不要・見学無料です
        </p>
      </div>
    </section>
  );
}
