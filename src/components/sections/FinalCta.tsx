"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

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
          まずは、見にいらしてください。
        </h2>

        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9] max-w-[640px] mx-auto mb-10">
          写真ではお伝えしきれない空気が、ございます。モデルハウスで、お待ちしております。
        </p>

        {/* プライマリCTA群 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <CtaButton
            href="/reserve"
            variant="primary"
            size="lg"
            label="来場予約"
            sublabel="ご予約不要・無料"
          />
          <CtaButton
            href="/contact"
            variant="secondary"
            size="lg"
            label="資料請求"
            sublabel="無料・1分で完了"
          />
        </div>

        {/* LINE CTA — ハードル最低の選択肢 */}
        <div className="flex justify-center mb-8 mt-2">
          <CtaButton
            href="https://line.me/"
            variant="tertiary-line"
            label="LINEでまず質問する"
            external
          />
        </div>

        <p className="text-text-secondary text-xs mb-10">
          強引な勧誘は、一切いたしません。見学・お問い合わせはすべて、無料でございます。
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
