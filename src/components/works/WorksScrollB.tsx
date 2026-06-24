"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WORKS_PARTS } from "@/data/worksParts";

/* 施工事例リブート 案B＝sticky差し替え型（2026-06-24 デモ）。
   左70%＝写真ステージを sticky で固定。スクロールに同期して、右30%テキストの
   アクティブ章を IntersectionObserver(rootMargin -45%) で検出し、
   左の写真を clip-path クロスフェードで差し替える（pinned media crossfade）。
   モバイルは 7:3 不可のため写真＋テキストの縦積みへ転換。reduced-motion でも閲覧可。 */

const EN: Record<string, string> = {
  exterior: "EXTERIOR", entrance: "ENTRANCE", living: "LIVING", kitchen: "KITCHEN",
  bath: "BATH", washroom: "WASHROOM", stairs: "STAIRS", storage: "STORAGE",
  washitsu: "WASHITSU", toilet: "TOILET",
};

export default function WorksScrollB() {
  const cats = WORKS_PARTS.categories;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-paper">
      {/* デスクトップ＝7:3 sticky写真ステージ ＋ テキスト列 */}
      <div className="hidden lg:grid lg:grid-cols-[7fr_60px_3fr]">
        <div className="relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            {cats.map((c, i) => (
              <Image
                key={c.slug}
                src={c.coverImage}
                alt=""
                aria-hidden
                fill
                sizes="70vw"
                className="object-cover"
                style={{
                  opacity: active === i ? 1 : 0,
                  clipPath: active === i ? "inset(0 0 0 0)" : "inset(8% 5% 8% 5%)",
                  transition:
                    "opacity 720ms linear, clip-path 720ms cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
            <div className="num-tnum font-oswald pointer-events-none absolute left-7 top-6 text-[clamp(56px,6vw,112px)] font-semibold leading-none text-paper mix-blend-difference">
              {String(active + 1).padStart(2, "0")}
            </div>
            <div className="pointer-events-none absolute bottom-6 left-7 font-mono text-[11px] tracking-[0.18em] text-paper mix-blend-difference">
              {EN[cats[active].slug]} ／ GALLERY {cats[active].gallery.length}
            </div>
          </div>
        </div>

        {/* 縦の帯＝部位インデックスのスパイン（仕切りのメリハリ＋進行表示） */}
        <div className="relative border-x border-hair bg-band">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2.5">
              {cats.map((_, i) => (
                <span
                  key={i}
                  className={`block h-[2px] transition-all duration-300 ${active === i ? "w-7 bg-signal" : "w-3 bg-noir/25"}`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-slate [writing-mode:vertical-rl]">
              {EN[cats[active].slug]}
            </span>
          </div>
        </div>

        <div>
          {cats.map((c, i) => (
            <section
              key={c.slug}
              ref={(el) => { refs.current[i] = el; }}
              data-i={i}
              className="flex min-h-screen flex-col justify-center gap-5 border-t border-hair px-10 first:border-t-0"
            >
              <p className="font-mono text-[11px] tracking-[0.18em] text-signal">
                № {String(i + 1).padStart(2, "0")} ／ {EN[c.slug] ?? c.slug.toUpperCase()}
              </p>
              <h2 className="text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.3] text-noir">{c.title}</h2>
              <p className="whitespace-pre-line text-[14px] leading-[2] text-ash">{c.copy}</p>
              <p className="font-mono border-t border-hair pt-4 text-[10px] tracking-[0.08em] text-slate">
                GALLERY {c.gallery.length} PHOTOS
              </p>
            </section>
          ))}
        </div>
      </div>

      {/* モバイル＝写真＋テキストの縦積み */}
      <div className="lg:hidden">
        {cats.map((c, i) => (
          <section key={c.slug} className="border-t border-hair">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={c.coverImage} alt={c.title} fill sizes="100vw" className="object-cover" />
              <span className="num-tnum font-oswald pointer-events-none absolute left-4 top-3 text-[44px] font-semibold leading-none text-paper mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-4 px-6 py-10">
              <p className="font-mono text-[11px] tracking-[0.18em] text-signal">
                № {String(i + 1).padStart(2, "0")} ／ {EN[c.slug] ?? c.slug.toUpperCase()}
              </p>
              <h2 className="text-[26px] font-bold leading-[1.3] text-noir">{c.title}</h2>
              <p className="whitespace-pre-line text-[14px] leading-[2] text-ash">{c.copy}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
