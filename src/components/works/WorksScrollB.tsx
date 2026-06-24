"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WORKS_PARTS } from "@/data/worksParts";

/* 施工事例＝部位ごとに「縦にめくる」スクロール駆動ギャラリー（2026-06-24・lerp版）。
   各部位を tall section にして sticky でピン留め。スクロール量＝めくり位置。
   5枚スクロールし切るまで次の部位に進めない（飛ばさない）。
   カクつき対策：CSSトランジションをやめ、毎フレーム lerp で「次の1枚」へ滑らかに寄せる
   ＝スクロールに追従しつつ各写真にスッと収まる（ヌルヌル＋小気味よく）。
   rAF はスクロール中＋収束までだけ回す（アイドル時は止める）。
   reduced-motion では補間せず即時。モバイルは部位ごとの横スワイプ。 */

const EN: Record<string, string> = {
  exterior: "EXTERIOR", entrance: "ENTRANCE", living: "LIVING", kitchen: "KITCHEN",
  bath: "BATH", washroom: "WASHROOM", stairs: "STAIRS", storage: "STORAGE",
  washitsu: "WASHITSU", toilet: "TOILET",
};

const SHOWN = 5; // 1部位あたり めくる枚数
const STEP_VH = 22; // 写真1枚あたりのスクロール量(vh)
const LERP = 0.16; // 補間係数（大きいほど速く収束＝小気味よい）

export default function WorksScrollB() {
  const cats = WORKS_PARTS.categories;
  const [slides, setSlides] = useState<number[]>([]); // インジケータ/ティック用（離散・低頻度更新）
  const [reduce, setReduce] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef<number[]>([]); // 各部位の現在のtranslateY(%)
  const slidesRef = useRef<number[]>([]);
  const reduceRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => { setReduce(mq.matches); reduceRef.current = mq.matches; };
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const tick = () => {
      const vh = window.innerHeight;
      let moving = false;
      const step: number[] = [];
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const sec = sectionRefs.current[i];
        const track = trackRefs.current[i];
        const len = Math.min(cats[i].gallery.length, SHOWN);
        if (!sec || !track) { step[i] = 0; continue; }
        const rect = sec.getBoundingClientRect();
        const total = sec.offsetHeight - vh;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        const cur = Math.min(len - 1, Math.floor(p * len));
        step[i] = cur;
        const target = cur * 100; // %（縦に len 枚積んだ track を 100%/枚 で送る）
        const now = offsets.current[i] ?? 0;
        let nxt = reduceRef.current ? target : now + (target - now) * LERP;
        if (Math.abs(target - nxt) < 0.05) nxt = target;
        else moving = true;
        offsets.current[i] = nxt;
        track.style.transform = `translate3d(0, -${nxt}%, 0)`;
      }
      if (step.length !== slidesRef.current.length || step.some((v, i) => v !== slidesRef.current[i])) {
        slidesRef.current = step;
        setSlides(step);
      }
      rafRef.current = moving ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => { if (!rafRef.current) rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cats]);

  return (
    <div className="bg-paper">
      {/* デスクトップ＝部位ごとに tall section をピン留め、縦めくり（スクロール駆動・lerp） */}
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
                {/* 写真：その部位を1枚ずつ縦めくり（transform は rAF で直接適用） */}
                <div className="relative min-w-0 overflow-hidden bg-noir/[0.02]">
                  <div
                    ref={(el) => { trackRefs.current[i] = el; }}
                    className="flex h-full flex-col will-change-transform"
                  >
                    {shots.map((src, k) => (
                      <div key={k} className="relative h-full w-full shrink-0">
                        <Image src={src} alt="" aria-hidden fill priority={i === 0 && k === 0} sizes="70vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                  {/* sticky Header(約65px)の裏に潜らないよう top をHeader下へ */}
                  <div className="num-tnum font-oswald pointer-events-none absolute left-7 top-[clamp(84px,12vh,128px)] text-[clamp(56px,6vw,112px)] font-semibold leading-none text-paper mix-blend-difference">
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
