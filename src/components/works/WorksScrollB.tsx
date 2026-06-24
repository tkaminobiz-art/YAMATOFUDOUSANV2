"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WORKS_PARTS } from "@/data/worksParts";

/* 施工事例＝B案（sticky差し替え）＋部位ごとの「1枚ずつめくる」オートカルーセル（2026-06-24）。
   左70%＝写真ステージを sticky 固定。右30%テキストのアクティブ章を
   IntersectionObserver(rootMargin -45%) で検出。左ステージはその部位の写真を
   1枚フル表示し、約3.6秒ごとに横スライドで次の1枚へ“めくる”（各部位 最大5枚を巡回）。
   中央に縦帯の索引スパイン。prefers-reduced-motion では自動めくりを止め1枚目を表示。
   モバイルは部位ごとに横スワイプのフィルムストリップ。 */

const EN: Record<string, string> = {
  exterior: "EXTERIOR", entrance: "ENTRANCE", living: "LIVING", kitchen: "KITCHEN",
  bath: "BATH", washroom: "WASHROOM", stairs: "STAIRS", storage: "STORAGE",
  washitsu: "WASHITSU", toilet: "TOILET",
};

const SHOWN = 5; // 1部位あたりめくる枚数の上限

export default function WorksScrollB() {
  const cats = WORKS_PARTS.categories;
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  // アクティブ章の検出
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

  // 部位が変わったら 1枚目に戻し、オートめくり開始
  useEffect(() => {
    setSlide(0);
    const len = Math.min(cats[active].gallery.length, SHOWN);
    if (len <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % len), 3600);
    return () => window.clearInterval(id);
  }, [active, cats]);

  const activeCat = cats[active];
  const shots = activeCat.gallery.slice(0, Math.min(activeCat.gallery.length, SHOWN));

  return (
    <div className="bg-paper">
      {/* デスクトップ＝7:3 sticky写真ステージ ／ 縦帯 ／ テキスト列 */}
      <div className="hidden lg:grid lg:grid-cols-[7fr_60px_3fr]">
        {/* min-w-0 必須：横スライドの track が grid 列を肥大化させ右列を画面外へ押し出すのを防ぐ */}
        <div className="relative min-w-0">
          <div className="sticky top-0 h-screen overflow-hidden bg-noir/[0.02]">
            {/* その部位の写真を1枚ずつ表示し、横スライドで次へ“めくる”（key で章切替時にリセット） */}
            <div
              key={active}
              className="flex h-full"
              style={{
                transform: `translateX(-${slide * 100}%)`,
                transition: "transform 760ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {shots.map((src, k) => (
                <div key={k} className="relative h-full w-full shrink-0">
                  <Image src={src} alt="" aria-hidden fill priority={k === 0} sizes="70vw" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="num-tnum font-oswald pointer-events-none absolute left-7 top-6 text-[clamp(56px,6vw,112px)] font-semibold leading-none text-paper mix-blend-difference">
              {String(active + 1).padStart(2, "0")}
            </div>

            {/* めくり位置インジケータ */}
            <div className="pointer-events-none absolute bottom-6 left-7 flex items-center gap-3 text-paper mix-blend-difference">
              <span className="font-mono text-[11px] tracking-[0.18em]">{EN[activeCat.slug]}</span>
              <span className="flex items-center gap-1.5">
                {shots.map((_, k) => (
                  <span
                    key={k}
                    className={`block h-[2px] transition-all duration-300 ${slide === k ? "w-5 bg-paper" : "w-2 bg-paper/40"}`}
                  />
                ))}
              </span>
              <span className="num-tnum font-mono text-[11px]">
                {String(slide + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
              </span>
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
