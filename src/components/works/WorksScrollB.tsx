"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WORKS_PARTS } from "@/data/worksParts";

/* 施工事例＝GSAP pin+snap の「上質なページめくり」（2026-06-25・案A）。
   部位ごとに左写真ステージ(行ごと)を pin し、その区間内だけ写真を縦に送る。
   snap(snapTo=1/(n-1), ease, duration) で1枚ずつ確実に止まり、scrub で滑らかに追従＝
   “溜め”のある上質なめくり。部位末で pin 解除＝写真とテキストが一緒に通常スクロール。
   gsap.matchMedia で PC(≥1024)かつ no-reduced-motion のときだけ作動。
   モバイル／reduced-motion は素の縦スクロール（モバイルは横スワイプ・フィルムストリップ）。 */

const EN: Record<string, string> = {
  exterior: "EXTERIOR", entrance: "ENTRANCE", living: "LIVING", kitchen: "KITCHEN",
  bath: "BATH", washroom: "WASHROOM", stairs: "STAIRS", storage: "STORAGE",
  washitsu: "WASHITSU", toilet: "TOILET",
};

const SHOWN = 5; // 1部位あたり めくる枚数

export default function WorksScrollB() {
  const cats = WORKS_PARTS.categories;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const sections = gsap.utils.toArray<HTMLElement>(".wp");
        sections.forEach((sec) => {
          const film = sec.querySelector<HTMLElement>(".wp-film");
          const pin = sec.querySelector<HTMLElement>(".wp-pin");
          if (!film || !pin) return;
          const pages = film.children.length;
          if (pages <= 1) return;

          const idxEl = sec.querySelector<HTMLElement>(".wp-idx");
          const ticks = gsap.utils.toArray<HTMLElement>(".wp-tick", sec);
          const setIdx = (idx: number) => {
            if (idxEl) idxEl.textContent = String(idx + 1).padStart(2, "0");
            ticks.forEach((t, k) => {
              t.style.height = k === idx ? "28px" : "12px";
              t.style.backgroundColor = k === idx ? "var(--color-signal)" : "rgba(10,10,10,0.25)";
            });
          };
          setIdx(0);

          gsap.to(film, {
            yPercent: -100 * (pages - 1),
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              pin, // 左写真＋帯＋テキストの行を pin（区間内はめくり）
              start: "top top",
              end: "+=" + pages * 52 + "%", // 送り距離（1枚あたり約 52% ÷ (n-1)）
              scrub: 1, // 1秒の追従＝ヌルヌル
              snap: {
                snapTo: 1 / (pages - 1), // 1枚ずつ確定
                duration: { min: 0.25, max: 0.6 }, // 上質な“溜め”
                delay: 0.04,
                ease: "power2.inOut",
                directional: true, // スクロール方向へ送る
              },
              onUpdate: (self) => setIdx(Math.round(self.progress * (pages - 1))),
            },
          });
        });
      });

      // 画像ロードでレイアウト確定後に位置を再計算（pin のズレ防止）
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        window.removeEventListener("load", onLoad);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-paper">
      {/* デスクトップ＝部位ごとに pin+snap でめくり、部位末で通常スクロールへ */}
      <div className="hidden lg:block">
        {cats.map((c, i) => {
          const shots = c.gallery.slice(0, Math.min(c.gallery.length, SHOWN));
          return (
            <section key={c.slug} className="wp">
              <div className="wp-pin grid h-screen grid-cols-[7fr_60px_3fr] overflow-hidden border-t border-hair bg-paper">
                {/* 写真：縦フィルムストリップ（GSAPが yPercent を駆動） */}
                <div className="relative min-w-0 overflow-hidden bg-noir/[0.02]">
                  <div className="wp-film flex h-full flex-col">
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
                      <span className="wp-idx">01</span> / {String(shots.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* 縦帯＝この部位の写真進行（縦ティック・GSAPが高さ/色を駆動） */}
                <div className="relative border-x border-hair bg-band">
                  <div className="flex h-full flex-col items-center justify-center gap-2.5">
                    {shots.map((_, k) => (
                      <span
                        key={k}
                        className="wp-tick block w-[2px] transition-all duration-300"
                        style={{ height: "12px", backgroundColor: "rgba(10,10,10,0.25)" }}
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
