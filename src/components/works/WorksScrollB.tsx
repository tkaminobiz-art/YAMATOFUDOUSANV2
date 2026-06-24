"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WORKS_PARTS } from "@/data/worksParts";

/* 施工事例＝部位ごとに「縦にめくる」スクロール駆動ギャラリー（2026-06-24 改）。
   各部位を tall な section にして sticky でピン留め。スクロール量＝めくり位置に連動し、
   その部位の写真(最大5枚)を順に縦めくり表示。5枚スクロールし切るまで次の部位へ進めない
   （＝勢いよくスクロールしてもセクションを飛ばさない／規定枚数を満たすまで保持）。
   タイマー自動めくりは廃止。横→縦めくり。スパインは「今その部位の何枚目か」を縦に表示。
   reduced-motion では transition を切る（スクロール連動なので閲覧は可能）。
   モバイルは部位ごとの横スワイプ・フィルムストリップ。 */

const EN: Record<string, string> = {
  exterior: "EXTERIOR", entrance: "ENTRANCE", living: "LIVING", kitchen: "KITCHEN",
  bath: "BATH", washroom: "WASHROOM", stairs: "STAIRS", storage: "STORAGE",
  washitsu: "WASHITSU", toilet: "TOILET",
};

const SHOWN = 5; // 1部位あたり めくる枚数
const STEP_VH = 24; // 写真1枚あたりのスクロール量(vh)。大きいほど1枚を長く保持

export default function WorksScrollB() {
  const cats = WORKS_PARTS.categories;
  const [slides, setSlides] = useState<number[]>([]);
  const [reduce, setReduce] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const lastRef = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // スクロール量から「アクティブ部位」と「その部位の何枚目か」を決める（スクロール駆動）
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // 各部位を「自分のスクロール位置」で独立計算（退場側は最後の1枚で固定／未到達は1枚目）
      const next = sectionRefs.current.map((sec, i) => {
        if (!sec) return 0;
        const rect = sec.getBoundingClientRect();
        const len = Math.min(cats[i].gallery.length, SHOWN);
        const total = sec.offsetHeight - vh; // ピン中のスクロール距離
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        return Math.min(len - 1, Math.floor(p * len));
      });
      if (next.length !== lastRef.current.length || next.some((v, i) => v !== lastRef.current[i])) {
        lastRef.current = next;
        setSlides(next);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cats]);

  return (
    <div className="bg-paper">
      {/* デスクトップ＝部位ごとに tall section をピン留め、縦めくり（スクロール駆動） */}
      <div className="hidden lg:block">
        {cats.map((c, i) => {
          const shots = c.gallery.slice(0, Math.min(c.gallery.length, SHOWN));
          const sl = slides[i] ?? 0;
          return (
            <section
              key={c.slug}
              ref={(el) => { sectionRefs.current[i] = el; }}
              style={{ height: `${shots.length * STEP_VH + 100}vh` }}
              className="relative"
            >
              <div className="sticky top-0 grid h-screen grid-cols-[7fr_60px_3fr] overflow-hidden border-t border-hair bg-paper">
                {/* 写真：その部位を1枚ずつ縦めくり */}
                <div className="relative min-w-0 overflow-hidden bg-noir/[0.02]">
                  <div
                    className="flex h-full flex-col"
                    style={{
                      transform: `translateY(-${sl * 100}%)`,
                      transition: reduce ? "none" : "transform 560ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {shots.map((src, k) => (
                      <div key={k} className="relative h-full w-full shrink-0">
                        <Image src={src} alt="" aria-hidden fill priority={i === 0 && k === 0} sizes="70vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="num-tnum font-oswald pointer-events-none absolute left-7 top-6 text-[clamp(56px,6vw,112px)] font-semibold leading-none text-paper mix-blend-difference">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="pointer-events-none absolute bottom-6 left-7 flex items-center gap-3 text-paper mix-blend-difference">
                    <span className="font-mono text-[11px] tracking-[0.18em]">{EN[c.slug]}</span>
                    <span className="num-tnum font-mono text-[11px]">
                      {String(sl + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* 縦帯＝この部位の写真進行（縦ティック） */}
                <div className="relative border-x border-hair bg-band">
                  <div className="flex h-full flex-col items-center justify-center gap-2.5">
                    {shots.map((_, k) => (
                      <span
                        key={k}
                        className={`block w-[2px] transition-all duration-300 ${sl === k ? "h-7 bg-signal" : "h-3 bg-noir/25"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* テキスト */}
                <div className="flex flex-col justify-center gap-5 px-10">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-signal">
                    № {String(i + 1).padStart(2, "0")} ／ {EN[c.slug] ?? c.slug.toUpperCase()}
                  </p>
                  <h2 className="text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.3] text-noir">{c.title}</h2>
                  <p className="whitespace-pre-line text-[14px] leading-[2] text-ash">{c.copy}</p>
                  <p className="font-mono border-t border-hair pt-4 text-[10px] tracking-[0.08em] text-slate">
                    GALLERY {c.gallery.length} PHOTOS ／ {shots.length}枚をスクロールで
                  </p>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* モバイル＝部位ごとに横スワイプのフィルムストリップ（最大5枚） */}
      <div className="lg:hidden">
        {cats.map((c, i) => (
          <section key={c.slug} className="border-t border-hair">
            <div className="relative">
              <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2">
                {c.gallery.slice(0, SHOWN).map((src, k) => (
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
                № {String(i + 1).padStart(2, "0")} ／ {EN[c.slug] ?? c.slug.toUpperCase()} ／ {Math.min(c.gallery.length, SHOWN)}枚 ▶
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
