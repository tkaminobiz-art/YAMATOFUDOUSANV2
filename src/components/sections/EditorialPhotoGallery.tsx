"use client";

import Image from "next/image";
import Link from "next/link";

/*
  EditorialPhotoGallery — Comparison と Zero の間に置く「流れる憧れ」
  - 二層マルquee（逆方向）でリズムを作る
  - 端はマスクでフェード（安っぽい直角カットを避ける）
  - ホバーで一時停止（内容を確かめたい人向け）
*/

const ROW_A = [
  { src: "/images/fv/hero-03-living.webp", alt: "花鳥風月 リビング" },
  { src: "/images/fv/hero-04-kitchen.webp", alt: "花鳥風月 キッチン" },
  { src: "/images/works/case1-living.webp", alt: "施工事例 リビング" },
  { src: "/images/works/case2-kitchen.webp", alt: "施工事例 キッチン" },
  { src: "/images/fv/hero-05-washitsu.webp", alt: "花鳥風月 和室" },
  { src: "/images/works/case3-entrance.webp", alt: "施工事例 玄関" },
] as const;

const ROW_B = [
  { src: "/images/fv/hero-01-exterior-miyamaki.webp", alt: "三山木モデル 外観" },
  { src: "/images/works/case1-ext.webp", alt: "施工事例 外観" },
  { src: "/images/fv/hero-02-exterior-sakyo.webp", alt: "左京モデル 外観" },
  { src: "/images/works/works-02.webp", alt: "施工事例" },
  { src: "/images/works/case2-living.webp", alt: "施工事例 リビング" },
  { src: "/images/works/works-04.webp", alt: "施工事例" },
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
            className={`group/fig relative ${heightClass} w-[min(72vw,340px)] shrink-0 overflow-hidden rounded-lg bg-bg-secondary shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04] md:w-[min(42vw,440px)]`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition duration-[1.4s] ease-out group-hover/fig:scale-[1.03]"
              sizes="(max-width: 768px) 72vw, 440px"
              draggable={false}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function EditorialPhotoGallery() {
  return (
    <section
      className="border-y border-border/70 bg-bg-secondary py-10 md:py-14"
      aria-label="竣工・内観のフォトギャラリー"
    >
      <div className="mx-auto mb-6 max-w-[1400px] px-[var(--page-px)] text-center md:mb-8">
        <p
          className="font-section-label text-main text-[11px] tracking-[0.22em] md:text-xs"
        >
          GALLERY
        </p>
        <p
          className="mx-auto mt-2 max-w-[520px] text-sm leading-relaxed text-text-secondary md:text-base"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          紙のカタログでは伝わらない、光と素材の温度。
        </p>
        <p className="mt-3 text-[11px] text-text-secondary md:text-xs">
          <Link href="/#works" className="underline decoration-main/40 underline-offset-4 transition-colors hover:text-main">
            施工事例で詳しく見る
          </Link>
        </p>
      </div>

      <div
        className="relative w-full [mask-image:linear-gradient(90deg,transparent_0%,black_4%,black_96%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_4%,black_96%,transparent_100%)]"
      >
        <MarqueeTrack items={ROW_A} direction="left" heightClass="h-[168px] md:h-[228px]" />
        <MarqueeTrack items={ROW_B} direction="right" heightClass="h-[148px] md:h-[200px]" />
      </div>
    </section>
  );
}
