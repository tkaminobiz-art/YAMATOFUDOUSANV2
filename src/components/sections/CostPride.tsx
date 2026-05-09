"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

/*
  CostPride — 2026-05-09 v2 (warm paper editorial spread)
  ---------------------------------------------------------------
  v1 (dark bg + white-on-video kinetic typography) は
  クラスタの warm paper トーンを破壊し、AI生成LP感を出してしまったので破棄。

  v2: FIG.01 (cross-section) / FIG.02 (ZeroDecl cinematic) と同じ warm paper
      エディトリアル語彙に揃える。動画にテロップを乗せず、本文は明朝で
      動画の隣に組む。動画は黙って 12 秒のフィルムを見せるだけ。

  メッセージ:
    "ハイクオリティな家が、この価格で建つ理由。
     ・高額な広告 ・専用展示場 ・中間業者 — どれもかけていません。
     → 「安く」ではなく、家本来の金額で建てる。
     それがやまと不動産のプライドです。"

  関連 memory:
    - feedback_comp_generation_worldview_first_visualize_not_tabulate
    - feedback_avoid_ai_generic_natural_housing
    - feedback_frame_change_cheap_to_waste
    - feedback_no_over_assertion
*/

// 2026-05-09: brand-film.mp4 (実物件シネマグラフ) → ZeroDeclaration cinematic
// (Seedance 製・手描きで ¥0 callouts が描かれていく warm paper シーケンス) に差し替え。
// クラスタの warm paper トーンと完全一致 + 「価格に余分が乗っていない」という
// CostPride の主張を抽象シンボルとして補強。元の brand-film.mp4 は public/videos/
// cost-pride/ にアーカイブ保持 (戻す可能性のため)。
const VIDEO_SRC = "/videos/zero-declaration-cinematic/transition.mp4";
const POSTER_SRC = "/zero-declaration-cinematic/start.png";
const REDUCED_MOTION_FALLBACK_SRC = "/zero-declaration-cinematic/goal.png";

type Mechanism = {
  no: string;
  body: string;
};

const MECHANISMS: readonly Mechanism[] = [
  {
    no: "01",
    body: "テレビなどの高額な広告は、出していません。届けたい奈良・京都南部に必要な範囲で。",
  },
  {
    no: "02",
    body: "専用の展示場は、建てていません。販売物件としてのモデルハウスを、そのままご案内します。",
  },
  {
    no: "03",
    body: "中間業者を、入れていません。土地・設計・施工・アフターを自社で一貫します。",
  },
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

  const handleEnded = useCallback(() => setPhase("ended"), []);

  const handleReplay = useCallback(() => {
    if (reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    setPhase("playing");
  }, [reducedMotion]);

  return (
    <section
      id="cost-pride"
      className="relative bg-[#F7F5F0] text-[#1A1815] py-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* eyebrow */}
        <div className="flex items-baseline gap-3 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
          <span>WHY</span>
          <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
          <span>なぜ、この価格で建てられるのか</span>
        </div>

        {/* H2 — reader が抱える「why」を直接代弁 */}
        <h2
          className="mt-5 max-w-[920px] font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
          style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
        >
          なぜ、京モデルは<br className="md:hidden" />
          2,280 万円で建てられるのか。
        </h2>

        {/* editorial 2-column: video (left, ~60%) / body copy (right, ~40%) */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,360px)] gap-x-10 lg:gap-x-14 gap-y-10">
          {/* video stage */}
          <div ref={stageRef} className="order-2 lg:order-1">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--color-rule)] bg-[#F7F5F0]">
              {!reducedMotion && (
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  poster={POSTER_SRC}
                  muted
                  playsInline
                  preload="metadata"
                  onEnded={handleEnded}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {reducedMotion && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={REDUCED_MOTION_FALLBACK_SRC}
                  alt="価格に乗らない費用を ¥0 として書き起こした手描き編集スプレッド — 広告・展示場・中間業者を含む 8 項目"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {renderPhase === "ended" && !reducedMotion && (
                <button
                  type="button"
                  onClick={handleReplay}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-black/45 px-3.5 py-1.5 text-[11px] text-white/90 backdrop-blur transition hover:border-white/70 hover:bg-black/65"
                >
                  <RotateCcw className="w-3 h-3" strokeWidth={1.5} />
                  もう一度再生
                </button>
              )}
            </div>
            <p className="mt-3 text-[11px] leading-[1.7] text-[#1A1815]/45 font-mono tracking-[0.04em]">
              INK · 12 sec / 価格に乗らない費用を、手で書き起こす
            </p>
          </div>

          {/* body copy column — editorial typography */}
          <aside className="order-1 lg:order-2 lg:pt-1">
            <p
              className="text-[#1A1815] font-[var(--font-shippori)] leading-[1.95] tracking-[0.02em]"
              style={{ fontSize: "clamp(15px, 1.05vw, 17.5px)", fontWeight: 500 }}
            >
              建物本来の金額で家を建てるために、やまとは
              <span className="text-[#143426]">3 つの費用</span>
              をかけていません。
            </p>

            <ol className="mt-7 space-y-5 border-t border-[var(--color-rule)] pt-6">
              {MECHANISMS.map((m) => (
                <li key={m.no} className="grid grid-cols-[auto_1fr] gap-x-4">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-[#143426] tabular-nums pt-1">
                    {m.no}
                  </span>
                  <p className="text-[13.5px] md:text-[14px] leading-[1.95] text-[#1A1815]/85">
                    {m.body}
                  </p>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        {/* conclusion — full-width, mincho, large */}
        <div className="mt-16 md:mt-20 border-t border-[var(--color-rule)] pt-10 md:pt-14">
          <p
            className="font-[var(--font-shippori)] text-[#1A1815] leading-[1.5] tracking-[0.01em] max-w-[920px]"
            style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 500 }}
          >
            販売運営にかかる費用を、<br className="md:hidden" />
            最初から乗せていません。
          </p>
          <p
            className="mt-5 max-w-[760px] text-[#1A1815]/75 leading-[1.95] tracking-[0.02em]"
            style={{ fontSize: "clamp(13px, 1vw, 15px)" }}
          >
            広告費・専用展示場の維持費・中間マージンが、価格に乗りやすい構造があります。
            やまとはその 3 つを最初から外している分、ご家族が払う総額のまま家になります。
          </p>

          <div className="mt-10">
            <Link
              href="/money"
              className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
            >
              価格の根拠を確認する
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
