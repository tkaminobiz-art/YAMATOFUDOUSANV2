"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { GOOGLE_MAPS_URL } from "@/data/google";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  GoogleReviewBridge — 2026-05-07
  ---------------------------------------------------------------
  TOP の WorksSection(施工事例) と VoiceSection(お客様の声) の間に置く
  "信頼ブリッジ"。「実例 → 第三者評価 → 詳しい声」 の流れで信頼を積み上げる。

  Note(memory: 断定は守れる範囲を超えない):
  - Google での実数(★4.8/5.0、口コミ100件 等)は現時点で未達のため、固定値は出さない。
  - 既存の GoogleReviewCta(default/inline/footer) は OB に "書く" を促す目的で別物。
    こちらは検討者に "読む" 入口を出す目的で完全に別コンポーネント。
*/

// 公式の "G" ロゴ(色付き、SVG inline)
function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#FBBC04"
        >
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 17.8 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviewBridge() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-white py-[clamp(56px,6vw,100px)]">
      <div
        ref={ref}
        className="max-w-[1180px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <article className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] bg-bg-secondary/40 border border-border rounded-2xl overflow-hidden">
          {/* 写真(右に出す。順序を md:order で逆転) */}
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[300px] md:order-2">
            <Image
              src="/images/newsozai/interior-ldk-01.webp"
              alt="やまと不動産が手がけた住まいのLDK"
              fill
              sizes="(max-width: 768px) 100vw, 540px"
              className="object-cover"
            />
          </div>

          {/* コンテンツ */}
          <div className="p-7 sm:p-9 md:p-10 lg:p-12 md:order-1 flex flex-col justify-center">
            {/* G ロゴ + ★ */}
            <div className="flex items-center gap-3 mb-5">
              <GoogleGlyph className="w-6 h-6" />
              <StarRow />
            </div>

            {/* eyebrow */}
            <p className="text-text-secondary text-[12px] md:text-[13px] tracking-[0.04em] mb-2">
              実際にご相談・建築いただいた方の声を
            </p>

            {/* h2 */}
            <h2
              className="text-text-primary leading-[1.4] tracking-[0.005em] mb-4"
              style={{
                fontWeight: 500,
                fontSize: "clamp(20px, 2.4vw, 30px)",
              }}
            >
              Googleの口コミでもご覧いただけます。
            </h2>

            {/* body */}
            <p className="text-text-secondary text-[13px] md:text-[14px] leading-[1.95] mb-6 max-w-[480px]">
              公式サイトに掲載しているお客様の声とあわせて、
              <br className="hidden md:inline" />
              検討材料としてご確認いただけます。
            </p>

            {/* CTA */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 self-start px-6 py-3 bg-main text-white rounded-full text-[13px] md:text-[14px] font-medium transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(72,107,0,0.45)]"
            >
              <GoogleGlyph className="w-4 h-4" />
              Googleの口コミを見る
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </a>

            {/* 補助文 */}
            <p className="text-text-secondary text-[11px] md:text-[12px] tracking-[0.04em] mt-4">
              ご相談前に、第三者の評価も確認できます。
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
