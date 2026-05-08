"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

/*
  CostPride — 2026-05-09 v1
  ---------------------------------------------------------------
  StickyMechanismPin (3 photo + text panels) を撤去し、その位置に
  実写ブランドフィルム + キネティックタイポを配置する。

  視覚モード: FIG.01 cross-section / FIG.02 cinematic (どちらも手描き ink)
              との連続反復を避けて、ここだけ実写映画 + 文字レイヤーで緩急。

  メッセージ:
    "ハイクオリティな家が、この価格で建つ理由。
     ・高額な広告を出さない / 専用展示場を建てない / 中間業者を入れない
     → 「安く」ではなく、家本来の金額で建てる。
     それがやまと不動産のプライドです。"

  関連 memory:
    - feedback_frame_change_cheap_to_waste (「安い」否定→「他社が無駄」frame)
    - feedback_no_over_assertion (「大手は」一括り化禁止 → 「業界平均」表記)
*/

const VIDEO_SRC = "/videos/cost-pride/brand-film.mp4";
const POSTER_SRC = "/images/newsozai/hero-day-green-exterior.webp";

type NarrationCue = {
  id: string;
  start: number;
  end: number;
  size: "h2" | "body" | "caption";
  text: string;
};

const NARRATION: readonly NarrationCue[] = [
  { id: "q", start: 0.2, end: 3.0, size: "h2", text: "ハイクオリティな家が、この価格で建つ理由。" },
  { id: "n1", start: 3.6, end: 5.5, size: "body", text: "テレビなどの高額な広告は、出していません。" },
  { id: "n2", start: 5.6, end: 7.5, size: "body", text: "専用展示場は、建てていません。" },
  { id: "n3", start: 7.6, end: 9.5, size: "body", text: "中間業者を入れず、自社一貫で施工します。" },
  { id: "f", start: 9.7, end: 14.0, size: "h2", text: "「安く」ではなく、家本来の金額で建てる。" },
] as const;

const MECHANISMS = [
  { no: "01", subject: "高額な広告", verb: "出していません" },
  { no: "02", subject: "専用展示場", verb: "建てていません" },
  { no: "03", subject: "中間業者", verb: "入れていません" },
] as const;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CostPride() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<"idle" | "playing" | "ended">("idle");
  const [currentTime, setCurrentTime] = useState(0);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const renderPhase: "idle" | "playing" | "ended" = reducedMotion ? "ended" : phase;

  useEffect(() => {
    if (reducedMotion) return;
    const node = stageRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          const v = videoRef.current;
          if (v) {
            v.currentTime = 0;
            v.play().catch(() => setPhase("ended"));
            setPhase("playing");
          }
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [phase, reducedMotion]);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
  }, []);

  const handleEnded = useCallback(() => setPhase("ended"), []);

  const handleReplay = useCallback(() => {
    if (reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    setCurrentTime(0);
    setPhase("playing");
  }, [reducedMotion]);

  return (
    <section
      id="cost-pride"
      className="relative bg-[#0E0D0B] text-white py-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* eyebrow */}
        <div className="flex items-baseline gap-3 text-[10.5px] tracking-[0.22em] uppercase text-white/55 font-mono">
          <span>WHY</span>
          <span aria-hidden className="h-px w-8 bg-white/20" />
          <span>なぜ、この価格で建てられるのか</span>
        </div>

        {/* cinematic stage */}
        <div ref={stageRef} className="mt-8 md:mt-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0E0D0B]">
            {/* video layer */}
            {!reducedMotion && (
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                muted
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {reducedMotion && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={POSTER_SRC}
                alt="やまと不動産が手がけた家 — 山並みを背景にした外観"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* gradient overlay for text contrast */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40"
            />

            {/* kinetic narration during play */}
            {renderPhase !== "ended" &&
              NARRATION.map((cue) => {
                const isActive = currentTime >= cue.start && currentTime <= cue.end;
                return (
                  <p
                    key={cue.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 flex items-center justify-center px-6 md:px-12 text-center transition-opacity duration-700 ease-out ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    } ${cueSizeClass(cue)}`}
                  >
                    {cue.text}
                  </p>
                );
              })}

            {/* ended state: stacked final lines */}
            {renderPhase === "ended" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 text-center">
                <p
                  className="font-[var(--font-shippori)] text-white leading-[1.4] tracking-[0.02em] font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                  style={{ fontSize: "clamp(22px, 3.4vw, 46px)" }}
                >
                  「安く」ではなく、
                  <br />
                  家本来の金額で建てる。
                </p>
                <p
                  className="mt-6 text-white/85 leading-[1.6] tracking-[0.06em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  style={{ fontSize: "clamp(13px, 1.2vw, 17px)" }}
                >
                  ── やまと不動産のプライドです。
                </p>
              </div>
            )}

            {/* replay button */}
            {renderPhase === "ended" && !reducedMotion && (
              <button
                type="button"
                onClick={handleReplay}
                className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-xs text-white/85 backdrop-blur transition hover:border-white/60 hover:bg-black/70"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                もう一度再生
              </button>
            )}
          </div>

          {/* SR-only narration for accessibility */}
          <p className="sr-only">
            ハイクオリティな家が、この価格で建つ理由。テレビなどの高額な広告は出していません。
            専用展示場は建てていません。中間業者を入れず、自社一貫で施工します。「安く」ではなく、
            家本来の金額で建てる。それがやまと不動産のプライドです。
          </p>
        </div>

        {/* 3 mechanism list — モバイル可読性 + アクセシビリティ */}
        <ul className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 border-t border-white/12 pt-10">
          {MECHANISMS.map((m) => (
            <li key={m.no} className="flex flex-col">
              <span className="font-mono text-[11px] tracking-[0.06em] text-white/45 tabular-nums">
                {m.no}
              </span>
              <p className="mt-2 text-[15px] md:text-[16px] font-medium text-white/95 leading-[1.55]">
                {m.subject}は、
                <span className="text-white/60 font-normal">{m.verb}</span>。
              </p>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex items-start gap-5">
          <Link
            href="/money"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-white border-b border-white/30 hover:border-white py-1 transition-colors"
          >
            価格の根拠を確認する
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function cueSizeClass(cue: NarrationCue): string {
  switch (cue.size) {
    case "h2":
      return "font-[var(--font-shippori)] text-white leading-[1.4] tracking-[0.02em] text-[clamp(22px,3.4vw,46px)] font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]";
    case "body":
      return "text-white/95 leading-[1.7] tracking-[0.04em] text-[clamp(15px,1.6vw,22px)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]";
    case "caption":
      return "text-white/85 leading-[1.6] tracking-[0.06em] text-[clamp(13px,1.2vw,17px)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]";
  }
}
