"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WORKS_PARTS } from "@/data/worksParts";

/* 施工事例＝B案（sticky差し替え）＋部位ごとの横スライド（2026-06-24）。
   左70%＝写真ステージを sticky 固定。右30%テキストのアクティブ章を
   IntersectionObserver(rootMargin -45%) で検出し、左ステージに「その部位の
   ギャラリー全枚を横にどんどん流すマーキー」を出す（複数枚＝3枚前後が見え、
   連続スライド）。中央に縦帯の索引スパイン。
   横スライドは既存 .gallery-marquee-left（translateX -50%・GPU・reduced-motion
   で停止）を再利用。カテゴリ枚数に応じて速度(animationDuration)だけ可変。
   モバイルは 7:3 不可のため、部位ごとに横スワイプのフィルムストリップ＋テキスト。 */

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

  const activeCat = cats[active];
  // 1枚あたり約4.5秒で流れる速度。1セット(複製前)の枚数 × 4.5s。
  const slideDur = `${Math.max(28, activeCat.gallery.length * 4.5)}s`;

  return (
    <div className="bg-paper">
      {/* デスクトップ＝7:3 sticky写真ステージ ／ 縦帯 ／ テキスト列 */}
      <div className="hidden lg:grid lg:grid-cols-[7fr_60px_3fr]">
        {/* min-w-0 必須：横長マーキー(w-max)が grid 列を肥大化させ右列を画面外へ押し出すのを防ぐ */}
        <div className="relative min-w-0">
          <div className="sticky top-0 h-screen overflow-hidden bg-noir/[0.02]">
            {/* アクティブ部位の写真を横スライド（key で切替時に流し直し） */}
            <div
              key={active}
              className="gallery-marquee-left flex h-full w-max"
              style={{ animationDuration: slideDur }}
            >
              {[...activeCat.gallery, ...activeCat.gallery].map((src, k) => (
                <div key={k} className="relative h-full w-[26vw] shrink-0 border-r border-paper/20">
                  <Image src={src} alt="" aria-hidden fill sizes="26vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="num-tnum font-oswald pointer-events-none absolute left-7 top-6 text-[clamp(56px,6vw,112px)] font-semibold leading-none text-paper mix-blend-difference">
              {String(active + 1).padStart(2, "0")}
            </div>
            <div className="pointer-events-none absolute bottom-6 left-7 font-mono text-[11px] tracking-[0.18em] text-paper mix-blend-difference">
              {EN[activeCat.slug]} ／ {activeCat.gallery.length} PHOTOS ▶▶
            </div>
          </div>
        </div>

        {/* 縦の帯＝部位インデックスのスパイン */}
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
              {EN[activeCat.slug]}
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

      {/* モバイル＝部位ごとに横スワイプのフィルムストリップ＋テキスト */}
      <div className="lg:hidden">
        {cats.map((c, i) => (
          <section key={c.slug} className="border-t border-hair">
            <div className="relative">
              <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2">
                {c.gallery.map((src, k) => (
                  <div key={k} className="relative aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden">
                    <Image src={src} alt={c.title} fill sizes="86vw" className="object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <span className="num-tnum font-oswald pointer-events-none absolute left-4 top-3 text-[40px] font-semibold leading-none text-paper mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-4 px-6 py-9">
              <p className="font-mono text-[11px] tracking-[0.18em] text-signal">
                № {String(i + 1).padStart(2, "0")} ／ {EN[c.slug] ?? c.slug.toUpperCase()} ／ {c.gallery.length}枚 ▶
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
