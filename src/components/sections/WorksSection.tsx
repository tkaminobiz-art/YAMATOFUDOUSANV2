"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  FEATURED_WORKS,
  GRID_WORKS,
  TOTAL_WORKS_COUNT,
} from "@/data/works";

/*
  WorksSection — 2026-05-03 v4 (横カルーセル化・参考画像準拠)
  ---------------------------------------------------------------
  v3: Featured 1件 + テキストリスト
  v4: 全件を横カルーセル(snap-x)で並列表示
      - スクロール量を縮減
      - お客様が能動的に横スワイプして見る Progressive Disclosure
      - 詳細は /works に誘導(ヒーローと統一の動線)
*/

const FOREST = "#486B00";

type CardItem = {
  href: string;
  image: string;
  area: string;
  title: string;
  meta?: string;
  priceRange?: string;
};

// 8件を1配列に正規化
// 2026-05-04 (C15): featured には priceRange を表示してトップの価格訴求とつなぐ
const CARDS: readonly CardItem[] = [
  ...FEATURED_WORKS.map((w): CardItem => ({
    href: `/works`,
    image: w.main,
    area: w.title.split(/[市町]/)[0] + (w.title.includes("市") ? "市" : "町"),
    title: w.model + ' "' + w.spec + '"',
    meta: w.family,
    priceRange: w.meta?.priceRange,
  })),
  ...GRID_WORKS.map((w): CardItem => ({
    href: `/works`,
    image: w.image,
    area: w.area,
    title: "やまとの家づくり",
  })),
];

export default function WorksSection() {
  const sectionRef = useScrollIn<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft < max - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByStep = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.85;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      id="works"
      ref={sectionRef}
      className="bg-white text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ヘッダー */}
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-12 flex-wrap">
          <div>
            <p
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-3"
              style={{ color: FOREST, fontWeight: 600 }}
            >
              Works · 施工事例
            </p>
            <h2
              className="text-text-primary leading-[1.3] tracking-[0.005em]"
              style={{
                fontWeight: 500,
                fontSize: "clamp(22px, 2.6vw, 36px)",
              }}
            >
              実際の建築事例。
            </h2>
            <p className="mt-3 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[600px]">
              やまとが建てた、{TOTAL_WORKS_COUNT}件の住まい。事例をスライドしてご覧いただけます。
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={!canPrev}
              aria-label="前の事例"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary transition-all hover:border-main disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={!canNext}
              aria-label="次の事例"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary transition-all hover:border-main disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        {/* カルーセル */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-5 -mx-[var(--page-px)] px-[var(--page-px)] pb-2 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {CARDS.map((c, i) => (
            <Link
              key={`${c.image}-${i}`}
              href={c.href}
              className="group shrink-0 w-[78%] sm:w-[48%] md:w-[32%] lg:w-[24%] snap-start flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary rounded">
                <Image
                  src={c.image}
                  alt={`${c.area} ${c.title}`}
                  fill
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 24vw"
                />
              </div>
              <div className="pt-3.5">
                <p
                  className="text-[11px] tracking-[0.16em] uppercase mb-1.5"
                  style={{ color: FOREST, fontWeight: 600 }}
                >
                  {c.area}
                </p>
                <p className="text-text-primary text-[13px] md:text-[14px] font-medium leading-[1.5] mb-1">
                  {c.title}
                </p>
                {c.meta && (
                  <p className="text-text-secondary text-[11px] leading-[1.7]">
                    {c.meta}
                  </p>
                )}
                {c.priceRange && (
                  <p
                    className="mt-1.5 inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-bg-warm/70 border border-text-primary/10"
                    style={{ color: FOREST }}
                  >
                    {c.priceRange}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* フッター: もっと見る */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-border flex items-center justify-between gap-6 flex-wrap">
          <p className="text-text-secondary text-[11px] md:text-[12px] leading-[1.85] max-w-[44rem]">
            ※ 掲載の事例は実際にやまとが建築した家です。価格・仕様は土地条件により変動します。
          </p>
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-[13px] md:text-[14px] font-medium px-6 py-3 rounded transition-colors"
            style={{ background: FOREST, color: "#fff" }}
          >
            施工事例をもっと見る
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
