"use client";

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import { FEATURED_WORKS, TOTAL_WORKS_COUNT } from "@/data/works";

/*
  WorksSection — 2026-04-20 teaser 化
  Featured 3件のみ + /works への導線。詳細(Featured + GRID 8件)は /works へ。
*/

export default function WorksSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="works" className="bg-bg-primary py-[var(--section-py)]">
      <div ref={sectionRef} className="max-w-[1400px] mx-auto scroll-in">
        {/* ヘッダー */}
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
            <div className="max-w-[640px]">
              <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
                WORKS
              </p>
              <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
                実際にお建てしたお家を、ご覧ください。
              </h2>
              <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
                ここでは代表3件をご紹介します。価格はいずれも、すべて込みで。
              </p>
            </div>
            <div
              className="text-right"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              <span className="text-main font-light text-6xl md:text-7xl block leading-none">
                {TOTAL_WORKS_COUNT}
              </span>
              <span className="text-text-secondary text-xs md:text-sm">
                件の事例
              </span>
            </div>
          </div>
        </div>

        {/* === Featured 3件(コンパクト・統一グリッド) === */}
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURED_WORKS.map((work) => (
              <Link
                key={work.id}
                href="/works"
                className="scroll-in group block"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden card-shadow mb-4">
                  <Image
                    src={work.main}
                    alt={`${work.title} 外観`}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-accent text-xs font-medium tracking-wider mb-1">
                  {work.model}
                </p>
                <h3
                  className="text-text-primary text-lg mb-1 group-hover:text-main transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {work.title}
                </h3>
                <p className="text-text-secondary text-sm mb-2">{work.spec}</p>
                <div className="inline-flex items-center gap-1.5 text-text-secondary text-xs mb-3">
                  <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{work.family}</span>
                </div>
                <p className="text-text-primary text-sm leading-[1.8] line-clamp-2">
                  「{work.comment}」
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* === CTA: /works へ === */}
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)] mt-14 md:mt-20 text-center">
          <p className="text-text-secondary text-sm md:text-base leading-[1.9] mb-6 max-w-[520px] mx-auto">
            その他の事例(全{TOTAL_WORKS_COUNT}件)は、別ページで詳しくご覧いただけます。
          </p>
          <Link
            href="/works"
            className="group relative inline-flex items-center gap-3 min-h-[48px] px-7 py-3 text-sm md:text-base font-medium border border-text-primary text-text-primary rounded transition-colors duration-[400ms] hover:text-white overflow-hidden"
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
