"use client";

import { MessageCircle } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  MidCta — ダーク化版（2026-04-15 Phase 2B / 2026-05-06 LINE主導線化）
  淡色連続の中にダーク背景の「山」を作り、視覚的起伏を生む。
  Voice → Works の感情ピーク直後で、「ここまで読んで」の重みを強調。
  CTAは LINE主 + 見学副 の2軸。資料請求は補助テキストへ降格。
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
          気になることは、LINEでも、<br />実物を見ながらでも確認できます。
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-[1.9] max-w-[560px] mx-auto mb-10">
          広さ・素材感・標準仕様、月々のご返済まで。
          <br className="sm:hidden" />
          質問だけでも、歓迎しています。
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* 主CTA: LINE — サービス色で即認識 */}
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-4 rounded text-white font-bold text-[14px] md:text-[15px] tracking-[0.04em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(6,199,85,0.55)]"
            style={{ backgroundColor: "#06C755" }}
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2} fill="currentColor" />
            LINEで気になる点を相談する
          </a>
          {/* 副CTA: 見学 */}
          <CtaButton
            href="/reserve"
            variant="dark-bg-secondary"
            size="md"
            label="モデルハウスを見学する"
            sublabel="ご予約なしでも見学可・無料"
          />
        </div>

        {/* 補助: フォーム派 */}
        <p className="text-white/55 text-xs mt-5">
          フォームで送りたい方は、
          <a href="/contact" className="text-white/85 underline underline-offset-2 hover:text-white">
            資料請求はこちら
          </a>
          。
        </p>
        <p className="text-white/50 text-xs mt-2">
          ご希望のない営業電話や訪問はいたしません。
        </p>
      </div>
    </section>
  );
}
