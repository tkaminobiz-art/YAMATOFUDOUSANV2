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
  { src: "/images/newsozai/interior-ldk-01.webp", alt: "内観 LDK" },
  { src: "/images/newsozai/interior-kitchen-01.webp", alt: "内観 キッチン" },
  { src: "/images/newsozai/interior-window-detail-01.webp", alt: "内観 ディテール" },
  { src: "/images/newsozai/exterior-porch-01.webp", alt: "外観 玄関ポーチ" },
  { src: "/images/newsozai/exterior-texture-detail-01.webp", alt: "外観 質感ディテール" },
  { src: "/images/newsozai/exterior-terrace-02.webp", alt: "外観 テラス" },
] as const;

const ROW_B = [
  { src: "/images/newsozai/exterior-entrance-01.webp", alt: "外観 玄関アプローチ" },
  { src: "/images/newsozai/exterior-terrace-01.webp", alt: "外観 テラス" },
  { src: "/images/newsozai/exterior-night-01.webp", alt: "外観 夜景" },
  { src: "/images/newsozai/interior-ldk-01.webp", alt: "内観 LDK" },
  { src: "/images/newsozai/interior-kitchen-01.webp", alt: "内観 キッチン" },
  { src: "/images/newsozai/exterior-porch-01.webp", alt: "外観 玄関ポーチ" },
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
            className={`group/fig relative ${heightClass} w-[min(72vw,340px)] shrink-0 overflow-hidden rounded-md bg-black/40 shadow-[0_12px_40px_-14px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.08] md:w-[min(42vw,440px)]`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover opacity-[0.92] transition duration-[1.4s] ease-out group-hover/fig:scale-[1.04] group-hover/fig:opacity-100"
              sizes="(max-width: 768px) 72vw, 440px"
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

export default function EditorialPhotoGallery() {
  return (
    <section
      className="relative border-y border-white/[0.08] bg-[#171717] py-11 md:py-14"
      aria-label="竣工・内観のフォトギャラリー"
    >
      {/* 紙の筋：極薄い対角シーム */} 
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 1px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0.06) 2px)",
          backgroundSize: "100% 100%",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="relative mx-auto mb-7 max-w-[1400px] px-[var(--page-px)] text-center md:mb-9">
        <p
          className="font-section-label text-[11px] tracking-[0.26em] text-white/45 md:text-xs"
        >
          GALLERY
        </p>
        <p
          className="mx-auto mt-3 max-w-[520px] text-base leading-[1.75] text-white/88 md:text-lg"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          まずは、写真で。空気感だけ受け取ってください。
        </p>
        <p className="mx-auto mt-2 max-w-[28rem] text-[13px] leading-relaxed text-white/55 md:text-sm">
          数字の比較のあとは、実際の施工事例をじっくりご覧ください。
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
        <MarqueeTrack items={ROW_A} direction="left" heightClass="h-[168px] md:h-[228px]" />
        <MarqueeTrack items={ROW_B} direction="right" heightClass="h-[148px] md:h-[200px]" />
      </div>
    </section>
  );
}
