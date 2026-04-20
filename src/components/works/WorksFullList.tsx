"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import { FEATURED_WORKS, GRID_WORKS } from "@/data/works";

/*
  WorksFullList — /works ページ用の完全版
  Featured 3件(非対称レイアウト) + その他5件(コンパクトグリッド) を網羅。
  TOPページの WorksSection は teaser 化(Featured 3件のみ)。
*/

export default function WorksFullList() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <div ref={sectionRef} className="scroll-in">
      {/* ===== Featured 3件 — SPカルーセル / PC非対称レイアウト ===== */}

      {/* SP: 横スワイプ */}
      <div className="md:hidden">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-[var(--page-px)] pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {FEATURED_WORKS.map((work) => (
            <article
              key={work.id}
              className="shrink-0 w-[85%] snap-center flex flex-col gap-3"
            >
              <div className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow">
                <Image
                  src={work.main}
                  alt={`${work.title} 外観`}
                  fill
                  className="object-cover"
                  sizes="85vw"
                />
              </div>
              <div>
                <p className="text-accent text-xs font-medium tracking-wider mb-1">
                  {work.model}
                </p>
                <h2
                  className="text-text-primary text-lg mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {work.title}
                </h2>
                <p className="text-text-secondary text-sm mb-3">{work.spec}</p>
                <div className="inline-flex items-center gap-1.5 text-text-secondary text-xs">
                  <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{work.family}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {work.subs.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow"
                  >
                    <Image
                      src={src}
                      alt={`${work.title} 内観 ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="40vw"
                    />
                  </div>
                ))}
              </div>
              <div className="bg-bg-secondary rounded p-4">
                <p className="text-text-secondary text-[11px] mb-1 tracking-wider">
                  お悩み
                </p>
                <p className="text-text-primary text-sm mb-3 leading-relaxed">
                  {work.challenge}
                </p>
                <p className="text-main text-[11px] mb-1 tracking-wider">
                  設計での工夫
                </p>
                <p className="text-text-primary text-sm leading-relaxed">
                  {work.solution}
                </p>
              </div>
              <blockquote className="border-l-2 border-accent/40 pl-4 py-1">
                <p className="text-text-primary text-sm leading-[1.9]">
                  「{work.comment}」
                </p>
              </blockquote>
              <p className="text-text-secondary text-[11px]">
                担当 : {work.staffSales}（営業） / {work.staffDesign}（設計）
              </p>
            </article>
          ))}
        </div>
        <p className="text-center text-text-secondary text-xs mt-2 tracking-wider">
          ← 横にスワイプできます →
        </p>
      </div>

      {/* PC: 非対称レイアウト */}
      <div className="hidden md:block max-w-[1400px] mx-auto px-[var(--page-px)]">
        <div className="flex flex-col gap-16 lg:gap-20 mb-16 md:mb-20">
          {FEATURED_WORKS.map((work, index) => (
            <div
              key={work.id}
              className="scroll-in grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[var(--card-gap)] items-start"
              style={index % 2 === 1 ? { direction: "rtl" } : undefined}
            >
              <div
                className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow group"
                style={{ direction: "ltr" }}
              >
                <Image
                  src={work.main}
                  alt={`${work.title} 外観`}
                  fill
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              <div className="flex flex-col gap-5" style={{ direction: "ltr" }}>
                <div>
                  <p className="text-accent text-xs font-medium tracking-wider mb-1">
                    {work.model}
                  </p>
                  <h2
                    className="text-text-primary text-lg md:text-xl mb-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {work.title}
                  </h2>
                  <p className="text-text-secondary text-sm mb-3">{work.spec}</p>
                  <div className="inline-flex items-center gap-1.5 text-text-secondary text-xs">
                    <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{work.family}</span>
                  </div>
                </div>

                <div className="bg-bg-secondary rounded-lg p-4 md:p-5">
                  <p className="text-text-secondary text-[11px] mb-1 tracking-wider">
                    お悩み
                  </p>
                  <p className="text-text-primary text-sm mb-3 leading-relaxed">
                    {work.challenge}
                  </p>
                  <p className="text-main text-[11px] mb-1 tracking-wider">
                    設計での工夫
                  </p>
                  <p className="text-text-primary text-sm leading-relaxed">
                    {work.solution}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {work.subs.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow group"
                    >
                      <Image
                        src={src}
                        alt={`${work.title} 内観 ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 25vw, 15vw"
                      />
                    </div>
                  ))}
                </div>

                <blockquote className="border-l-2 border-accent/40 pl-4 py-1">
                  <p className="text-text-primary text-sm leading-[1.9]">
                    「{work.comment}」
                  </p>
                </blockquote>

                <p className="text-text-secondary text-[11px]">
                  担当 : {work.staffSales}（営業） / {work.staffDesign}（設計）
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== その他5件 — SPカルーセル / PCコンパクトグリッド ===== */}
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)] mt-8 md:mt-0">
        <p className="text-text-secondary text-sm mb-6">その他の施工事例</p>

        {/* SP: 横スワイプ */}
        <div className="md:hidden">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-[var(--page-px)] px-[var(--page-px)] pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {GRID_WORKS.map((w, i) => (
              <div
                key={i}
                className="shrink-0 w-[55%] snap-center relative aspect-square rounded overflow-hidden"
              >
                <Image
                  src={w.image}
                  alt={`${w.area} 施工事例`}
                  fill
                  className="object-cover"
                  sizes="55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-medium">
                  {w.area}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PC: 5列グリッド */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {GRID_WORKS.map((w, i) => (
            <div
              key={i}
              className="scroll-in relative aspect-square rounded overflow-hidden group"
            >
              <Image
                src={w.image}
                alt={`${w.area} 施工事例`}
                fill
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-2 left-3 text-white text-xs font-medium">
                {w.area}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
