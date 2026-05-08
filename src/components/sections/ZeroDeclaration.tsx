"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";

/*
  ZeroDeclaration — 2026-05-08 v8 (Cinematic Architectural Elevation)
  ---------------------------------------------------------------
  v7: 8項目縦長 table + 結論カード + 3 仕組み + photo CTA (情報過多)
  v8: 建築立面図 + 8 ink callouts のシネマティック動画 → 静止画固定。
      動画が「視覚的な見える化」を担い、コンポーネント本体は
      eyebrow / headline / lead / 動画ステージ / 8項目 fact list / CTA のみ。
      勝負どころ:
        - 動画で「設計者が手描きで開示している」温度感を物語る
        - 動画は loop しない (一度再生 → onEnded で 400ms 静止画クロスフェード)
        - PNG が日本語 typography の最終精度を担保
        - prefers-reduced-motion: reduce では動画スキップで静止画直接表示
        - モバイルでは動画下に 8 項目 fact list を 2 列で表示し可読性を担保
      関連 memory:
        - feedback_comp_generation_worldview_first_visualize_not_tabulate
        - project_yamato_tsunagi_yusi (つなぎ融資 → 発生しない訴求 OK)
        - feedback_frame_change_cheap_to_waste (他社が無駄 frame)
*/

const VIDEO_SRC = "/videos/zero-declaration-cinematic/transition.mp4";
const GOAL_SRC = "/zero-declaration-cinematic/goal.png";
const START_SRC = "/zero-declaration-cinematic/start.png";

type FeeFact = {
  no: string;
  label: string;
  market: string;
  resolution: string;
};

const FEES_BEFORE: readonly FeeFact[] = [
  { no: "01", label: "仲介手数料", market: "¥50万〜100万", resolution: "当社分譲地なら不要" },
  { no: "02", label: "つなぎ融資", market: "¥30万〜80万", resolution: "発生しない" },
  { no: "03", label: "地盤改良費", market: "最大 ¥150万", resolution: "当社が負担" },
  { no: "04", label: "火災保険・登記費", market: "〜¥30万", resolution: "総額に含む" },
] as const;

const FEES_DURING: readonly FeeFact[] = [
  { no: "05", label: "追加照明", market: "〜¥20万", resolution: "標準で完備" },
  { no: "06", label: "カーテン・網戸", market: "〜¥30万", resolution: "標準で完備" },
  { no: "07", label: "エアコン (LDK)", market: "〜¥15万", resolution: "標準で完備" },
  { no: "08", label: "外構一式", market: "〜¥40万", resolution: "標準で完備" },
] as const;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ZeroDeclaration() {
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

  return (
    <section
      id="zero"
      className="relative bg-[#F7F5F0] text-[#1A1815] py-[var(--section-py)]"
    >
      <div className="relative max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* eyebrow + headline + lead */}
        <header className="max-w-[860px]">
          <div className="flex items-baseline gap-3 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
            <span>FIG. 02</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>Zero Declaration</span>
          </div>
          <h2
            className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
          >
            後から増えやすい費用を、<br className="md:hidden" />
            契約前に見える化します。
          </h2>
          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            建物価格のほかにも、家づくりでは費用が増えがちです。やまと不動産では
            業界で「後から増える」と言われる 8 項目すべてを、契約前に開示・吸収します。
          </p>
        </header>

        {/* cinematic stage */}
        <div ref={stageRef} className="mt-12 md:mt-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--color-rule)] bg-[#F7F5F0]">
            {!reducedMotion && (
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={START_SRC}
                muted
                playsInline
                preload="metadata"
                onEnded={handleEnded}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out ${
                  renderPhase === "ended" ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GOAL_SRC}
              alt="やまと不動産が契約前に見える化する 8 項目の費用 — 建築立面図に手描き注釈"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out ${
                renderPhase === "ended" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          <p className="mt-3 text-[11px] leading-[1.7] text-[#1A1815]/45 font-mono tracking-[0.04em]">
            FIG. 02 · Elevation drawing with 8 fee callouts · ペン入れの注釈で各費用を契約前に開示
          </p>
        </div>

        {/* 8 fact list — モバイル可読性 + アクセシビリティ */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          <FactColumn
            kicker="Before contract"
            heading="土地購入・契約前の 4 項目"
            items={FEES_BEFORE}
          />
          <FactColumn
            kicker="During build"
            heading="建築工事中の 4 項目"
            items={FEES_DURING}
          />
        </div>

        <p className="mt-10 max-w-[820px] text-[12px] leading-[1.95] text-[#1A1815]/55">
          ※ 一般的な目安は当社調べ。地域・業者・条件により金額は異なります。
          仲介手数料は当社分譲地のご購入時、地盤改良は当社規定の範囲内で適用されます。
        </p>

        {/* CTA */}
        <div className="mt-14 md:mt-16 flex flex-col items-start gap-4 border-t border-[var(--color-rule)] pt-10">
          <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#1A1815]">
            「自分たちの場合はいくらになるか」を、契約前に整理します。
          </p>
          <Link
            href="/money"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            資金計画を相談する
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

function FactColumn({
  kicker,
  heading,
  items,
}: {
  kicker: string;
  heading: string;
  items: readonly FeeFact[];
}) {
  return (
    <div>
      <p className="text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
        {kicker}
      </p>
      <h3
        className="mt-2 font-[var(--font-shippori)] text-[#1A1815] leading-[1.4]"
        style={{ fontSize: "clamp(17px, 1.5vw, 21px)", fontWeight: 500 }}
      >
        {heading}
      </h3>
      <dl className="mt-5 divide-y divide-[var(--color-rule-faint)]">
        {items.map((it) => (
          <div
            key={it.no}
            className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 py-4"
          >
            <dt className="contents">
              <span className="font-mono text-[11px] tracking-[0.06em] text-[#1A1815]/45 tabular-nums">
                {it.no}
              </span>
              <span className="text-[14px] md:text-[15px] font-medium text-[#1A1815] leading-[1.55]">
                {it.label}
              </span>
            </dt>
            <dd className="text-right">
              <p className="font-mono text-[11px] text-[#1A1815]/55 line-through decoration-[#B91C1C] decoration-[1.5px] tabular-nums">
                {it.market}
              </p>
              <p className="mt-0.5 text-[12.5px] md:text-[13px] font-medium text-[#143426] leading-[1.45]">
                {it.resolution}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
