"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * PRICING → MONEY TALK の間に挟む「紙が語る」系の写真帯。
 * EditorialPhotoGallery（比較〜Zero前）とはトーン・画像セットを差別化。
 */

const ROW_A = [
  { src: "/images/newsozai/exterior-night-01.webp", alt: "外観 夜景" },
  { src: "/images/newsozai/exterior-entrance-01.webp", alt: "外観 玄関アプローチ" },
  { src: "/images/newsozai/exterior-porch-01.webp", alt: "外観 玄関ポーチ" },
  { src: "/images/newsozai/interior-kitchen-01.webp", alt: "内観 キッチン" },
  { src: "/images/newsozai/interior-ldk-01.webp", alt: "内観 LDK" },
  { src: "/images/newsozai/exterior-texture-detail-01.webp", alt: "外観 質感ディテール" },
] as const;

const ROW_B = [
  { src: "/images/newsozai/exterior-terrace-01.webp", alt: "外観 テラス" },
  { src: "/images/newsozai/exterior-terrace-02.webp", alt: "外観 テラス" },
  { src: "/images/newsozai/interior-window-detail-01.webp", alt: "内観 ディテール" },
  { src: "/images/newsozai/interior-ldk-01.webp", alt: "内観 LDK" },
  { src: "/images/newsozai/interior-kitchen-01.webp", alt: "内観 キッチン" },
  { src: "/images/newsozai/exterior-night-01.webp", alt: "外観 夜景" },
] as const;

function MarqueeTrack({
  items,
  direction,
  heightClass,
}: {
  items: readonly { src: string; alt: string }[];
  direction: "left" | "right";
  heightClass: string;
}) {
  const doubled = [...items, ...items];
  const animClass =
    direction === "left" ? "gallery-marquee-left" : "gallery-marquee-right";

  return (
    <div className="relative w-full overflow-hidden py-1.5 md:py-2">
      <div
        className={`flex w-max gap-3 md:gap-4 ${animClass} hover:[animation-play-state:paused]`}
      >
        {doubled.map((img, i) => (
          <figure
            key={`${img.src}-${i}`}
            className={`group/fig relative ${heightClass} w-[min(74vw,360px)] shrink-0 overflow-hidden rounded-md bg-black/40 shadow-[0_12px_40px_-14px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.08] md:w-[min(44vw,460px)]`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover opacity-[0.92] transition duration-[1.4s] ease-out group-hover/fig:scale-[1.04] group-hover/fig:opacity-100"
              sizes="(max-width: 768px) 74vw, 460px"
              draggable={false}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function PostPricingEditorialGallery() {
  return (
    <section
      className="relative border-y border-white/[0.08] bg-[#1a1a1a] py-11 md:py-14"
      aria-label="住まいの質感を伝えるフォトギャラリー"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 1px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0.06) 2px)",
          backgroundSize: "100% 100%",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative mx-auto mb-7 max-w-[1400px] px-[var(--page-px)] text-center md:mb-9">
        <p
          className="font-section-label text-[11px] tracking-[0.26em] text-white/45 md:text-xs"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          EDITORIAL
        </p>
        <p
          className="mx-auto mt-3 max-w-[34rem] text-base leading-[1.75] text-white/88 md:text-lg"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          写真だから伝わる、素材の質感と、光の入り方。
        </p>
        <p className="mx-auto mt-2 max-w-[28rem] text-[13px] leading-relaxed text-white/55 md:text-sm">
          価格だけでなく、実物の雰囲気も、どうぞ。
        </p>
        <p className="mt-4 text-[11px] text-white/45 md:text-xs">
          <Link
            href="/#works"
            className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
          >
            施工事例で詳しく見る
          </Link>
        </p>
      </div>

      <div
        className="relative w-full [mask-image:linear-gradient(90deg,transparent_0%,black_5%,black_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_5%,black_95%,transparent_100%)]"
      >
        <MarqueeTrack
          items={ROW_A}
          direction="left"
          heightClass="h-[182px] md:h-[248px]"
        />
        <MarqueeTrack
          items={ROW_B}
          direction="right"
          heightClass="h-[158px] md:h-[212px]"
        />
      </div>
    </section>
  );
}
