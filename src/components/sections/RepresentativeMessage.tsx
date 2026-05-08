"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { ArrowRight } from "lucide-react";
import { REPRESENTATIVES, PHOTO_FILTER, TOTAL_PEOPLE } from "@/data/staff";

/*
  RepresentativeMessage — 2026-05-06
  ---------------------------------------------------------------
  design-critic 2026-05-06 指摘#5「人の顔・メッセージを追加」への対応。
  TOP の "理屈・証拠" 群の中に、本人の顔と署名級メッセージを1つ挟むことで、
  スペック羅列だけでは伝わらない「これを守る人がいる」という空気を出す。

  ルール:
  - 代表2名は完全同格表示(memory: スタッフ表示は全員平等 / 役職でサイズ差NG)。
  - 引用文は memory: 代表2名の正規メッセージ を一字一句変えずに使う(改変禁止)。
  - PHOTO_FILTER で軽くモノクロ寄りにし、編集誌的な落ち着き。
  - スタッフ全員ページへの導線を1本だけ添える。
*/

export default function RepresentativeMessage() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="font-murecho bg-white py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1180px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* === ヘッダー === */}
        <div className="mb-10 md:mb-14 max-w-[820px]">
          <p
            className="text-[11px] md:text-[12px] tracking-[0.06em] mb-3"
            style={{ color: "#486B00", fontWeight: 700 }}
          >
            代表からのご挨拶
          </p>
          <h2
            className="font-zen-old text-text-primary leading-[1.4] tracking-[0.02em]"
            style={{
              fontWeight: 600,
              fontSize: "clamp(22px, 2.6vw, 36px)",
            }}
          >
            この価格と仕様を、現場で守る人がいます。
          </h2>
        </div>

        {/* === 2人ポートレート(完全同格) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14">
          {REPRESENTATIVES.map((rep) => (
            <article
              key={rep.id}
              className="flex flex-col"
            >
              {/* 写真 — 正方形・モノクロ寄り */}
              <div className="relative aspect-square w-full max-w-[420px] mx-auto md:mx-0 overflow-hidden bg-bg-secondary rounded">
                <Image
                  src={`/images/staff/${rep.id}.webp`}
                  alt={`${rep.role} ${rep.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                  style={{ filter: PHOTO_FILTER }}
                />
              </div>

              {/* 名前・役職 */}
              <div className="mt-5 md:mt-6 flex items-baseline flex-wrap gap-x-3 gap-y-1">
                <h3
                  className="text-text-primary leading-[1.35]"
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(18px, 1.8vw, 22px)",
                    fontFamily: "var(--font-murecho-var)",
                  }}
                >
                  {rep.name}
                </h3>
                <span className="text-text-secondary text-[12px] md:text-[13px]">
                  {rep.role}
                </span>
              </div>
              <p className="mt-1 text-text-secondary text-[11px] md:text-[12px] tracking-[0.04em]">
                経営・現場 {rep.career}
              </p>

              {/* 引用文 — 改変禁止(memory) */}
              <blockquote
                className="mt-5 md:mt-6 pl-4 border-l-2"
                style={{ borderColor: "rgba(72,107,0,0.35)" }}
              >
                <p
                  className="text-text-primary text-[13px] md:text-[14px] leading-[2.0] whitespace-pre-line"
                  style={{ fontWeight: 400 }}
                >
                  {rep.quote}
                </p>
              </blockquote>
            </article>
          ))}
        </div>

        {/* === スタッフ全員導線 === */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <Link
            href="/staff"
            className="group inline-flex items-center gap-2 text-text-primary text-[13px] md:text-[14px] font-medium border-b border-text-primary/30 pb-1 hover:border-main hover:text-main transition-colors"
          >
            ご相談を担当する{TOTAL_PEOPLE}名のスタッフを見る
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </section>
  );
}
