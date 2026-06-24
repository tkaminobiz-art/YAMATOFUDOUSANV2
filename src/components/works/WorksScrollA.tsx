"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { WORKS_PARTS } from "@/data/worksParts";

/* 施工事例リブート 案A＝左右スワップ型（2026-06-24 デモ）。
   7:3（左70%写真／右30%テキスト）。章ごとに order で写真左右を反転し、
   視界に入ると写真が ±6% スライド＋フェードして“入れ替わる”。
   CSSのみで成立する構造を、Turbopack staleness回避のため IntersectionObserver＋
   インラインstyleで再現（reduced-motion 即表示）。 */

type Cat = (typeof WORKS_PARTS.categories)[number];

const EN: Record<string, string> = {
  exterior: "EXTERIOR", entrance: "ENTRANCE", living: "LIVING", kitchen: "KITCHEN",
  bath: "BATH", washroom: "WASHROOM", stairs: "STAIRS", storage: "STORAGE",
  washitsu: "WASHITSU", toilet: "TOILET",
};

function ChapterA({ c, no }: { c: Cat; no: number }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [reduce, setReduce] = useState(false);
  const even = no % 2 === 0; // 偶数章は写真を右へ

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fromX = even ? "6%" : "-6%"; // 反転側は逆向きから入る
  const mediaStyle: CSSProperties = reduce
    ? {}
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateX(${fromX})`,
        transition: "opacity 700ms linear, transform 760ms cubic-bezier(0.16,1,0.3,1)",
      };
  const textStyle: CSSProperties = reduce
    ? {}
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(12px)",
        transition:
          "opacity 600ms linear 140ms, transform 640ms cubic-bezier(0.16,1,0.3,1) 140ms",
      };

  return (
    <section ref={ref} className="border-t border-hair">
      <div className="grid lg:grid-cols-[7fr_3fr]">
        {/* 写真 70% */}
        <div
          className={`relative aspect-[4/3] overflow-hidden border-hair lg:aspect-auto lg:min-h-[82vh] ${
            even ? "lg:order-2 lg:border-l" : "lg:border-r"
          }`}
          style={mediaStyle}
        >
          <Image
            src={c.coverImage}
            alt={c.title}
            fill
            sizes="(max-width:1024px) 100vw, 70vw"
            className="object-cover"
          />
          <span className="num-tnum font-oswald pointer-events-none absolute left-5 top-4 text-[clamp(44px,5.4vw,92px)] font-semibold leading-none text-paper mix-blend-difference">
            {String(no).padStart(2, "0")}
          </span>
        </div>
        {/* テキスト 30% */}
        <div
          className={`flex flex-col justify-center gap-5 px-6 py-12 lg:px-10 ${even ? "lg:order-1" : ""}`}
          style={textStyle}
        >
          <p className="font-mono text-[11px] tracking-[0.18em] text-signal">
            № {String(no).padStart(2, "0")} ／ {EN[c.slug] ?? c.slug.toUpperCase()}
          </p>
          <h2 className="text-[clamp(26px,3vw,40px)] font-bold leading-[1.3] text-noir">{c.title}</h2>
          <p className="whitespace-pre-line text-[14px] leading-[2] text-ash">{c.copy}</p>
          <p className="font-mono border-t border-hair pt-4 text-[10px] tracking-[0.08em] text-slate">
            GALLERY {c.gallery.length} PHOTOS
          </p>
        </div>
      </div>
    </section>
  );
}

export default function WorksScrollA() {
  return (
    <div className="bg-paper">
      {WORKS_PARTS.categories.map((c, i) => (
        <ChapterA key={c.slug} c={c} no={i + 1} />
      ))}
    </div>
  );
}
