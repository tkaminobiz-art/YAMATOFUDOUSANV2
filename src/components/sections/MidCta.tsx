"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

export default function MidCta() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="bg-bg-warm py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] text-center scroll-in"
      >
        <h2 className="text-[clamp(20px,2.5vw,32px)] text-text-primary mb-8">
          ここまで読んでいただいたあなたへ。モデルハウスでお会いしませんか。
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
