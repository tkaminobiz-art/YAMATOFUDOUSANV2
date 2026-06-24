"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Voice, VoiceTag } from "@/data/voices";

/* お客様の声＝3カラム没入レイアウト（2026-06-24・神野さん指定）。
   左右レール＝実顧客写真をフルカラー・統一トリミング(4:5)で並べ、sticky で固定。
   スクロール連動パララックス(速度差)で左右がゆっくり別速度で流れる（自動再生はしない＝酔わない）。
   中央＝口コミ本体（qas の実回答）をカタログ証言として1件ずつ読ませる。
   設計言語＝Editorial Monochrome（白黒グレー＋赤＋lime / 1px罫線 / mono / Oswald / 影なし角丸なし）。
   prefers-reduced-motion: reduce では transform を当てず静止。 */

type V = Voice & { excerpt?: string; cover: string };

const FADE =
  "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

// チューニング用：パララックス速度（大きいほど速い）
const SPEED_LEFT = 0.2;
const SPEED_RIGHT = 0.1;

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
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [reduce, setReduce] = useState(false);

  // 視界に入ったら1回だけリビール（罫線ドロー→中身スタガー）。reduced-motion は即表示。
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lead = v.qas?.[0];
  const body = lead
    ? lead.a.replace(/\s+/g, " ").trim().slice(0, 116) + (lead.a.length > 116 ? "…" : "")
    : v.excerpt ?? "";
  const qLabel = lead ? lead.q.replace(/[「」]/g, "").trim() : "";

  // 罫線が引かれた(≈200ms)あとに中身を 70ms 間隔でスタガー
  const item = (i: number): CSSProperties =>
    reduce
      ? {}
      : {
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 460ms ease, transform 460ms cubic-bezier(0.16,1,0.3,1)",
          transitionDelay: `${200 + i * 70}ms`,
        };
  const ruleStyle: CSSProperties = reduce
    ? {}
    : {
        transformOrigin: "left center",
        transform: shown ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 280ms cubic-bezier(0.16,1,0.3,1)",
      };
  const photoStyle: CSSProperties = reduce
    ? {}
    : { opacity: shown ? 1 : 0, transition: "opacity 600ms ease", transitionDelay: "60ms" };

  const photo = v.cover ?? v.photos[0];

  const text = (
    <div className="py-7 pl-4 pr-4 md:pl-6 md:pr-6 md:py-9 lg:px-10 lg:py-12">
      <div className="flex items-center justify-between gap-2" style={item(0)}>
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

      <p className="font-mono mt-4 text-[11px] tracking-[0.08em] text-slate" style={item(1)}>
        {v.area} ・ {v.familyName}
      </p>

      {qLabel && (
        <p
          className="font-mono mt-5 text-[11px] leading-[1.6] tracking-[0.04em] text-signal"
          style={item(2)}
        >
          {qLabel}
        </p>
      )}
      <p className="mt-2 text-[clamp(16px,1.7vw,21px)] font-bold leading-[1.7] text-noir" style={item(3)}>
        <span className="text-signal">「</span>
        {body}
        <span className="text-signal">」</span>
      </p>

      <div style={item(4)}>
        <Link
          href={`/voice/${v.id}`}
          className="group mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-noir transition-colors hover:text-signal"
        >
          この声を読む
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <article ref={ref} className="relative scroll-mt-24">
      {/* カード上端の1px罫線が左から引かれる（先頭は章扉の墨罫が境界なので不要） */}
      {no > 1 && <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-px bg-hair" style={ruleStyle} />}

      {/* モバイル＝2カラム(左:実邸写真スパイン 3 / 右:テキスト 7)。デスクトップは左右レールが写真を担うので text のみ。 */}
      {photo ? (
        <div className="grid grid-cols-[3fr_7fr] lg:block">
          <div className="relative overflow-hidden border-r border-hair lg:hidden" style={photoStyle}>
            <Image
              src={photo}
              alt=""
              aria-hidden
              fill
              sizes="(max-width:1024px) 34vw, 1px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          {text}
        </div>
      ) : (
        text
      )}
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
      L.style.transform = `translate3d(0, ${(-y * SPEED_LEFT).toFixed(1)}px, 0)`;
      R.style.transform = `translate3d(0, ${(-y * SPEED_RIGHT).toFixed(1)}px, 0)`;
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

  // レール＝各物件のベスト1枚（口コミ表紙）50枚を、左右で別物件に振り分けて流す。
  const covers = voices.map((v) => v.cover);
  const leftPhotos = covers.filter((_, i) => i % 2 === 0);
  const rightPhotos = covers.filter((_, i) => i % 2 === 1);

  return (
    <div ref={sectionRef} className="bg-paper">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,680px)_1fr]">
        <Rail photos={leftPhotos} innerRef={leftRef} side="left" />

        <div>
          {/* 中央上段＝章扉ヒーロー（連番カタログ言語・左右の写真レールに挟まれて始まる＝継ぎ目ゼロ） */}
          <header className="border-b border-noir px-5 pt-12 pb-10 md:px-10 md:pt-16 md:pb-12">
            <p className="font-mono text-[11px] tracking-[0.18em] text-signal">№ 00 ／ VOICE</p>
            <h1 className="mt-5 text-[clamp(26px,4.2vw,44px)] font-bold leading-[1.34] tracking-[-0.01em] text-noir">
              本音のまま、お聞きください。
            </h1>
            <div className="mt-8 flex items-baseline gap-2.5">
              <span className="num-tnum font-oswald text-[clamp(56px,9vw,100px)] font-semibold leading-[0.78] tracking-[-0.03em] text-noir">
                {voices.length}
              </span>
              <span className="pb-1.5 text-[14px] font-bold text-noir">組のご家族</span>
            </div>
            <p className="font-mono mt-3 text-[10px] tracking-[0.1em] text-slate">
              REVIEWS FROM {voices.length} FAMILIES
            </p>
            <p className="mt-6 max-w-[460px] text-[14px] leading-[1.95] text-ash">
              花鳥風月で家を建てた方々の、率直な感想です。決め手・こだわり・満足度まで、できる限り原文に近い形で。
            </p>
          </header>

          {voices.map((v, i) => (
            <VoiceCard key={v.id} v={v} no={i + 1} />
          ))}
        </div>

        <Rail photos={rightPhotos} innerRef={rightRef} side="right" />
      </div>
    </div>
  );
}
