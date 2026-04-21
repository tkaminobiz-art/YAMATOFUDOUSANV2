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
  WorksSection — 2026-04-21 再リニューアル v2
  -----------------------------------------------------------------
  ユーザー懸念: 「Lots→Voice→Works で写真カードが連続、飽きてないか」

  解決: 写真カード連打から脱却
  - Voice(直前) = 言葉主役の Bento 見開き
  - Works(本節) = 大判1件 + テキストリスト(網羅感)

  構造:
  1. ヘッダー(非対称 + 全件数 8)
  2. Featured Work 1件: 16:9 大判写真 + 詳細(番号/地域/モデル/コメント)
  3. 他の事例 テキストリスト(7件): 番号/地域/モデル/仕様の罫線行
  4. CTA: /works へ
*/

const PHOTO_FILTER = "saturate(0.92) contrast(1.02)";

export default function WorksSection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  const featured = FEATURED_WORKS[0];
  const otherFeatured = FEATURED_WORKS.slice(1);

  return (
    <section
      id="works"
      ref={ref}
      className="bg-[#FAF8F3] text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ================= HEADER (非対称) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
          {/* Left: 看板 */}
          <div>
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
              Works
            </p>
            <h2
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              建てた、
              <br />
              家たち。
            </h2>
          </div>

          {/* Right: 件数 + LEAD */}
          <aside className="lg:pt-4">
            {/* 件数アイキャッチ */}
            <div className="flex items-baseline gap-3 mb-7 md:mb-9">
              <span
                className="font-oswald text-text-primary leading-[0.85] tabular-nums"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(56px, 7vw, 100px)",
                  letterSpacing: "-0.03em",
                }}
              >
                {TOTAL_WORKS_COUNT}
              </span>
              <span
                className="font-shippori text-text-primary/75 pb-2"
                style={{ fontWeight: 500, fontSize: "clamp(14px, 1.1vw, 17px)" }}
              >
                件の事例
              </span>
            </div>

            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                やまとで建てた、実際の家。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] max-w-[480px] text-text-primary/90">
                価格はいずれも、
                <br />
                すべて込みで。
              </p>
            </div>
          </aside>
        </div>

        {/* ================= Featured Work (大判1件) ================= */}
        <Link
          href="/works"
          className="scroll-in group block overflow-hidden bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_32px_64px_-28px_rgba(0,0,0,0.14)] mb-5 md:mb-6"
        >
          {/* 大判写真 */}
          <div className="relative aspect-[16/9] overflow-hidden bg-text-primary/5">
            <Image
              src={featured.main}
              alt={`${featured.title} 外観`}
              fill
              className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 1400px) 100vw, 1400px"
              style={{ filter: PHOTO_FILTER }}
            />
          </div>

          {/* 詳細(下部) */}
          <div className="p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-12 items-start">
              {/* 番号 + 地域・邸名 */}
              <div className="flex items-start gap-5">
                <span
                  className="font-oswald text-text-primary leading-none tabular-nums shrink-0"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(40px, 4vw, 64px)",
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
                    className="font-shippori text-text-primary leading-[1.25] tracking-[0.01em]"
                    style={{
                      fontWeight: 900,
                      fontSize: "clamp(24px, 2.4vw, 36px)",
                    }}
                  >
                    {featured.title}
                  </h3>
                  <p className="font-shippori mt-3 text-text-primary/75 text-[clamp(13px,1vw,15px)] leading-[1.85]">
                    {featured.spec} / {featured.family}
                  </p>
                </div>
              </div>

              {/* コメント引用(中央) */}
              <blockquote className="font-shippori lg:border-l lg:border-text-primary/15 lg:pl-12 text-text-primary/80 text-[clamp(14px,1.1vw,16px)] leading-[2.0] max-w-[28em]">
                「{featured.comment}」
              </blockquote>

              {/* 詳しく読む */}
              <div className="lg:pt-2">
                <span className="font-inter text-[11px] md:text-[12px] tracking-[0.24em] uppercase text-text-primary font-bold group-hover:text-[#A2C523] transition-colors whitespace-nowrap">
                  詳しく見る →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ================= 他の事例 テキストリスト ================= */}
        <div className="border-t border-text-primary/15">
          {/* 章見出し */}
          <div className="flex items-baseline gap-5 py-6 md:py-8">
            <span
              className="font-oswald text-text-primary/80 leading-none"
              style={{
                fontWeight: 300,
                fontSize: "clamp(22px, 2vw, 28px)",
                letterSpacing: "-0.02em",
              }}
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
              className="group grid grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-baseline py-5 md:py-6 border-t border-text-primary/10 hover:bg-white/50 transition-colors px-2"
            >
              <span
                className="font-oswald text-text-primary/40 leading-none tabular-nums group-hover:text-text-primary transition-colors shrink-0"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(20px, 1.8vw, 26px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {String(i + 2).padStart(2, "0")}
              </span>
              <div>
                <p
                  className="font-shippori text-text-primary leading-[1.35]"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(16px, 1.2vw, 19px)",
                  }}
                >
                  {work.title}
                </p>
                <p className="font-shippori mt-1.5 text-text-primary/70 text-[clamp(12px,0.9vw,14px)] leading-[1.85]">
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
                className="group grid grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-baseline py-4 md:py-5 border-t border-text-primary/10 hover:bg-white/50 transition-colors px-2"
              >
                <span
                  className="font-oswald text-text-primary/35 leading-none tabular-nums group-hover:text-text-primary/80 transition-colors shrink-0"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(18px, 1.5vw, 22px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(indexNum).padStart(2, "0")}
                </span>
                <p
                  className="font-shippori text-text-primary/85 leading-[1.4]"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(14px, 1vw, 16px)",
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

        {/* ================= CTA ================= */}
        <div className="mt-14 md:mt-20 pt-10 border-t border-text-primary/15 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="font-shippori max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
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
            <span className="relative">施工事例を、すべて見る</span>
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
