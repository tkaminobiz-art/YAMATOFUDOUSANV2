"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  MidCta — ダーク化版（2026-04-15 Phase 2B）
  淡色連続の中にダーク背景の「山」を作り、視覚的起伏を生む。
  Voice → Works の感情ピーク直後で、「ここまで読んで」の重みを強調。
*/

export default function MidCta() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="relative bg-text-primary text-white overflow-hidden py-[var(--section-py)]">
      {/* ノイズテクスチャ（AIっぽさ回避） */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />
      {/* ダークラジアル — 2026-04-24 design-critic: earth brown 撤廃、Lime両サイドで呼吸 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(at 18% 50%, rgba(162,197,35,0.18) 0%, transparent 55%), radial-gradient(at 82% 50%, rgba(162,197,35,0.12) 0%, transparent 55%)",
        }}
      />

      <div
        ref={ref}
        className="relative max-w-[1200px] mx-auto px-[var(--page-px)] text-center scroll-in"
      >
        <h2
          className="text-[clamp(22px,3vw,36px)] text-white mb-5 leading-[1.5]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          気になることがあれば、<br />実物を見ながらご相談ください。
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-[1.9] max-w-[560px] mx-auto mb-10">
          広さ・素材感・標準仕様を、実物でご確認いただけます。
          <br className="sm:hidden" />
          質問だけでも、歓迎しています。
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <CtaButton
            href="/reserve"
            variant="dark-bg-primary"
            size="md"
            label="モデルハウス見学"
            sublabel="ご予約なしでも見学可・無料"
          />
          <CtaButton
            href="/contact"
            variant="dark-bg-secondary"
            size="md"
            label="資料請求"
            sublabel="無料・1分で完了"
          />
        </div>

        <p className="text-white/50 text-xs mt-6">
          強引な勧誘は、しません。
        </p>
      </div>
    </section>
  );
}
