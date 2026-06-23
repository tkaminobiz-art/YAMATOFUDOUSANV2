"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Voice, VoiceTag } from "@/data/voices";

/* お客様の声＝3カラム没入レイアウト（2026-06-24・神野さん指定）。
   左右レール＝実顧客写真をフルカラー・統一トリミング(4:5)で並べ、sticky で固定。
   スクロール連動パララックス(速度差)で左右がゆっくり別速度で流れる（自動再生はしない＝酔わない）。
   中央＝口コミ本体（qas の実回答）をカタログ証言として1件ずつ読ませる。
   設計言語＝Editorial Monochrome（白黒グレー＋赤＋lime / 1px罫線 / mono / Oswald / 影なし角丸なし）。
   prefers-reduced-motion: reduce では transform を当てず静止。 */

type V = Voice & { excerpt?: string };

const FADE =
  "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

function RailPhoto({ src }: { src: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 1024px) 0px, 22vw"
        className="object-cover"
        loading="lazy"
      />
    </div>
  );
}

function Rail({
  photos,
  innerRef,
  side,
}: {
  photos: string[];
  innerRef: RefObject<HTMLDivElement | null>;
  side: "left" | "right";
}) {
  return (
    <aside
      className={`relative hidden lg:block ${side === "left" ? "border-r" : "border-l"} border-hair`}
      aria-hidden
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        <div ref={innerRef} className="flex flex-col gap-2 p-2 will-change-transform">
          {photos.map((src, i) => (
            <RailPhoto key={`${side}-${i}`} src={src} />
          ))}
        </div>
      </div>
    </aside>
  );
}

function VoiceCard({ v, no }: { v: V; no: number }) {
  const lead = v.qas?.[0];
  const body = lead
    ? lead.a.replace(/\s+/g, " ").trim().slice(0, 116) + (lead.a.length > 116 ? "…" : "")
    : v.excerpt ?? "";
  const qLabel = lead ? lead.q.replace(/[「」]/g, "").trim() : "";

  return (
    <article className="scroll-mt-24 border-b border-hair px-5 py-9 md:px-10 md:py-12">
      <div className="flex items-center justify-between">
        <span className="num-tnum font-oswald text-[15px] font-semibold tracking-[0.04em] text-signal">
          № {String(no).padStart(2, "0")}
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {(v.tags ?? []).slice(0, 3).map((t: VoiceTag) => (
            <span
              key={t}
              className="font-mono border border-hair px-1.5 py-0.5 text-[10px] tracking-[0.04em] text-slate"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="font-mono mt-4 text-[11px] tracking-[0.08em] text-slate">
        {v.area} ・ {v.familyName}
      </p>

      {qLabel && (
        <p className="font-mono mt-5 text-[11px] leading-[1.6] tracking-[0.04em] text-signal">
          {qLabel}
        </p>
      )}
      <p className="mt-2 text-[clamp(16px,1.7vw,21px)] font-bold leading-[1.7] text-noir">
        <span className="text-signal">「</span>
        {body}
        <span className="text-signal">」</span>
      </p>

      <Link
        href={`/voice/${v.id}`}
        className="group mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-noir transition-colors hover:text-signal"
      >
        この声を読む
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </article>
  );
}

export default function VoiceImmersive({ voices }: { voices: V[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const L = leftRef.current;
    const R = rightRef.current;
    if (!section || !L || !R) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // section 上端が視点上端を通り過ぎた量（下スクロールで増える）
      const y = -section.getBoundingClientRect().top;
      // 速度差パララックス：左は速く・右は遅く、ともに上へ流れる
      L.style.transform = `translate3d(0, ${(-y * 0.12).toFixed(1)}px, 0)`;
      R.style.transform = `translate3d(0, ${(-y * 0.05).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const all = voices.flatMap((v) => v.photos);
  const leftPhotos = all.filter((_, i) => i % 2 === 0).slice(0, 16);
  const rightPhotos = all.filter((_, i) => i % 2 === 1).slice(0, 16);

  return (
    <div ref={sectionRef} className="bg-paper">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,680px)_1fr]">
        <Rail photos={leftPhotos} innerRef={leftRef} side="left" />

        <div>
          {/* 中央ヘッダー */}
          <div className="border-b border-noir px-5 py-6 md:px-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-signal">
              REVIEWS / 口コミ
            </p>
            <p className="mt-2 text-[14px] leading-[1.8] text-ash">
              花鳥風月で家を建てた
              <span className="num-tnum font-oswald mx-1 text-[18px] font-semibold text-noir">
                {voices.length}
              </span>
              組のご家族の、率直な声です。
            </p>
          </div>

          {voices.map((v, i) => (
            <VoiceCard key={v.id} v={v} no={i + 1} />
          ))}
        </div>

        <Rail photos={rightPhotos} innerRef={rightRef} side="right" />
      </div>
    </div>
  );
}
