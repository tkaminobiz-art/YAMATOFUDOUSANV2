"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

// Instagram 公式風アイコン（インラインSVG）
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

// 現場・日常の写真を6枚（高画質モデルハウス写真で代用）
const RECENT_POSTS = [
  { image: "/images/works/case1-ext.webp", caption: "T様邸 外観" },
  { image: "/images/works/case2-living.webp", caption: "S様邸 リビング" },
  { image: "/images/works/case3-kitchen.webp", caption: "M様邸 キッチン" },
  { image: "/images/works/case1-kitchen.webp", caption: "T様邸 キッチン" },
  { image: "/images/works/case2-ext.webp", caption: "S様邸 外観" },
  { image: "/images/works/case3-ext.webp", caption: "M様邸 外観" },
] as const;

export default function InstagramSection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
          <div className="max-w-[640px]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              INSTAGRAM
            </p>
            <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
              現場の今日を、載せています。
            </h2>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
              最新の施工現場・完成見学会・スタッフの日常を、Instagramで発信中です。
            </p>
          </div>
          <a
            href="https://instagram.com/yamatonoie"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded border border-border hover:border-main text-text-primary text-sm transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            @yamatonoie
          </a>
        </div>

        {/* 6枚グリッド */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {RECENT_POSTS.map((p, i) => (
            <a
              key={i}
              href="https://instagram.com/yamatonoie"
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-in relative aspect-square rounded overflow-hidden group"
            >
              <Image
                src={p.image}
                alt={p.caption}
                fill
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <InstagramIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
