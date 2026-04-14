"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { MessageCircle } from "lucide-react";

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
          写真では伝わらないものがあります。モデルハウスで、標準仕様を体感してください。
        </p>

        {/* プライマリCTA群 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <a
            href="/reserve"
            className="flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded bg-accent text-white text-base font-medium transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(196,112,63,0.3)]"
          >
            来店予約（無料）
          </a>
          <a
            href="/contact"
            className="flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded bg-main text-white text-base font-medium transition-all hover:bg-main-dark hover:-translate-y-0.5"
          >
            資料請求（無料）
          </a>
        </div>

        {/* LINE CTA — ハードル最低の選択肢 */}
        <a
          href="https://line.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded text-white text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-0.5 mb-8"
          style={{ backgroundColor: "#06C755" }}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
          LINEでまず質問する
        </a>

        <p className="text-text-secondary text-xs mb-10">
          強引な勧誘は一切いたしません。見学・お問い合わせすべて無料です。
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
            営業時間 9:00〜19:00（火・水定休）
          </p>
        </div>
      </div>
    </section>
  );
}
