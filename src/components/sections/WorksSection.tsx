"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import {
  FEATURED_WORKS,
  GRID_WORKS,
  TOTAL_WORKS_COUNT,
} from "@/data/works";

/*
  WorksSection — 2026-04-24 v3 (案A shukobuild型 カタログ)
  ---------------------------------------------------------------
  v2 で残っていた:
  - Shippori Mincho (明朝) 見出し/邸名/引用
  - "Works" 英字kicker
  - 非対称 1.4fr:1fr ヘッダー + 件数別アイキャッチ + border-t-[3px] LEAD
  - PHOTO_FILTER saturate/contrast(編集誌の色調)
  を撤去。Featured 1件 + テキストリストの構造は維持。
*/

export default function WorksSection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  const featured = FEATURED_WORKS[0];
  const otherFeatured = FEATURED_WORKS.slice(1);

  return (
    <section
      id="works"
      ref={ref}
      className="bg-bg-secondary text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            やまとが建てた、<br className="sm:hidden" />実際の家です。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[680px]">
            <span className="font-bold text-lime-deep nowrap">{TOTAL_WORKS_COUNT}件</span>
            の完成事例を、写真で紹介しています。
            <br />
            価格はすべて、付帯工事まで込みです。
          </p>
        </header>

        {/* ========== Featured Work (大判1件) ========== */}
        <Link
          href="/works"
          className="scroll-in group block overflow-hidden bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_32px_64px_-28px_rgba(0,0,0,0.14)] mb-4 md:mb-5"
        >
          {/* 大判写真 */}
          <div className="relative aspect-[16/9] overflow-hidden bg-bg-secondary">
            <Image
              src={featured.main}
              alt={`${featured.title} 外観`}
              fill
              className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          </div>

          {/* 詳細(下部) */}
          <div className="p-7 md:p-9 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start">
              {/* 番号 + 邸名 */}
              <div className="flex items-start gap-5">
                <span
                  className="font-oswald text-lime-deep leading-none tabular-nums shrink-0"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(32px, 3vw, 48px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  01
                </span>
                <div className="pt-1">
                  <p className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold mb-2">
                    {featured.model}
                  </p>
                  <h3
                    className="font-sans text-text-primary leading-[1.4] tracking-[0.01em]"
                    style={{
                      fontWeight: 900,
                      fontSize: "clamp(20px, 2vw, 28px)",
                    }}
                  >
                    {featured.title}
                  </h3>
                  <p className="font-sans mt-3 text-text-primary/75 text-[clamp(13px,1vw,15px)] leading-[1.85]">
                    {featured.spec} / {featured.family}
                  </p>
                </div>
              </div>

              {/* コメント引用(中央) */}
              <blockquote className="font-sans lg:border-l lg:border-text-primary/15 lg:pl-10 text-text-primary/80 text-[clamp(13px,1.05vw,15px)] leading-[2.0] max-w-[28em]">
                「{featured.comment}」
              </blockquote>

              {/* 詳しく読む */}
              <div className="lg:pt-2">
                <span className="font-inter text-[11px] md:text-[12px] tracking-[0.24em] uppercase text-text-primary font-bold group-hover:text-lime-deep transition-colors whitespace-nowrap">
                  詳しく見る →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ========== 他の事例 テキストリスト ========== */}
        <div className="border-t border-text-primary/15">
          {/* 章見出し */}
          <div className="flex items-baseline gap-5 py-6 md:py-8">
            <span
              className="font-sans font-bold text-text-primary leading-none"
              style={{ fontSize: "clamp(15px, 1.15vw, 18px)" }}
            >
              他の事例
            </span>
            <span className="flex-1 h-px bg-text-primary/15" />
            <span className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold">
              {TOTAL_WORKS_COUNT - 1} works
            </span>
          </div>

          {/* 詳細ありの他2件 */}
          {otherFeatured.map((work, i) => (
            <Link
              key={work.id}
              href="/works"
              className="group grid grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-baseline py-5 md:py-6 border-t border-text-primary/10 hover:bg-white/60 transition-colors px-2"
            >
              <span
                className="font-oswald text-text-primary/45 leading-none tabular-nums group-hover:text-lime-deep transition-colors shrink-0"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(18px, 1.5vw, 22px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {String(i + 2).padStart(2, "0")}
              </span>
              <div>
                <p
                  className="font-sans text-text-primary leading-[1.5]"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(15px, 1.1vw, 17px)",
                  }}
                >
                  {work.title}
                </p>
                <p className="font-sans mt-1.5 text-text-primary/70 text-[clamp(12px,0.9vw,14px)] leading-[1.85]">
                  {work.model} / {work.spec} / {work.family}
                </p>
              </div>
              <span className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold group-hover:text-text-primary transition-colors shrink-0">
                →
              </span>
            </Link>
          ))}

          {/* GRID_WORKS 5件(詳細なし・地域のみ) */}
          {GRID_WORKS.map((work, i) => {
            const indexNum = otherFeatured.length + 2 + i;
            return (
              <Link
                key={`grid-${i}`}
                href="/works"
                className="group grid grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-baseline py-4 md:py-5 border-t border-text-primary/10 hover:bg-white/60 transition-colors px-2"
              >
                <span
                  className="font-oswald text-text-primary/40 leading-none tabular-nums group-hover:text-lime-deep transition-colors shrink-0"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(16px, 1.3vw, 20px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(indexNum).padStart(2, "0")}
                </span>
                <p
                  className="font-sans text-text-primary/85 leading-[1.5]"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(13px, 1vw, 15px)",
                  }}
                >
                  {work.area}
                </p>
                <span className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold group-hover:text-text-primary transition-colors shrink-0">
                  →
                </span>
              </Link>
            );
          })}
        </div>

        {/* ========== CTA ========== */}
        <div className="mt-12 md:mt-16 pt-10 border-t border-text-primary/15 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="font-sans max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
            ※ 掲載の事例は、実際にやまとが建築した家です。
            <br />
            価格は目安であり、土地条件・仕様により変動します。
          </p>
          <Link
            href="/works"
            className="group relative inline-flex items-center gap-3 min-h-[48px] px-7 py-3 text-sm md:text-base font-medium border border-text-primary text-text-primary transition-colors duration-[400ms] hover:text-white overflow-hidden shrink-0"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-text-primary transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            />
            <span className="relative">施工事例をすべて見る</span>
            <span
              aria-hidden
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
