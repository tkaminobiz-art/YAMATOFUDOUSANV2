"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

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

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <CtaButton
            href="/reserve"
            variant="primary"
            size="md"
            label="来場予約"
            sublabel="ご予約不要・無料"
          />
          <CtaButton
            href="/contact"
            variant="secondary"
            size="md"
            label="資料請求"
            sublabel="無料・1分で完了"
          />
        </div>

        <p className="text-text-secondary text-xs mt-6">
          ご予約不要・見学無料です
        </p>
      </div>
    </section>
  );
}
