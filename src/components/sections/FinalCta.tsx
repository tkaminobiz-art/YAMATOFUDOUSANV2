"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

export default function FinalCta() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[800px] mx-auto px-[var(--page-px)] text-center scroll-in"
      >
        <p className="font-section-label text-main text-xs md:text-sm mb-6 tracking-[0.15em]">
          CONTACT
        </p>

        <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
          まずは、見に来てください。
        </h2>

        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9] max-w-[640px] mx-auto mb-10">
          写真やスペックでは伝わらないものがあります。
          モデルハウスで標準仕様を体感してください。
        </p>

        {/* CTA群 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a
            href="#reservation"
            className="flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded bg-accent text-white text-base font-medium transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(196,133,31,0.3)]"
          >
            来店予約（無料）
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded bg-main text-white text-base font-medium transition-all hover:bg-main-dark hover:-translate-y-0.5"
          >
            資料請求（無料）
          </a>
        </div>

        <p className="text-text-secondary text-xs mb-8">
          ご予約不要での見学も歓迎です。お気軽にお越しください。
        </p>

        {/* 電話 */}
        <div className="border-t border-border pt-8">
          <p className="text-text-secondary text-xs mb-2">お電話でのお問い合わせ</p>
          <a
            href="tel:0742361123"
            className="text-text-primary text-2xl md:text-3xl font-light hover:text-main transition-colors"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            0742-36-1123
          </a>
          <p className="text-text-secondary text-xs mt-2">
            営業時間 10:00〜18:00（水曜定休）
          </p>
        </div>
      </div>
    </section>
  );
}
