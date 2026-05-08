"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// /zero-declaration-cinematic
// ZeroDeclaration セクションの動画版検証ページ。
// Seedance 2.0 で生成した「callouts が手描きで描かれていく」動画を再生し、
// 動画終了後に gpt_image_2 で生成したゴール静止画にクロスフェードする。
// 動画は loop しない (1 回再生 → 静止画固定)。
// 納品前に削除する (BRAND-TRUTH.md §9 のラボ削除リスト準拠)。

const VIDEO_SRC = "/videos/zero-declaration-cinematic/transition.mp4";
const GOAL_SRC = "/zero-declaration-cinematic/goal.png";
const START_SRC = "/zero-declaration-cinematic/start.png";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ZeroDeclarationCinematicPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<"idle" | "playing" | "ended">("idle");

  // SSR-safe な prefers-reduced-motion 検知 (cascading render 回避)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  // 表示上の phase: reducedMotion なら強制的に ended として描く (state は触らない)
  const renderPhase: "idle" | "playing" | "ended" = reducedMotion ? "ended" : phase;

  // スクロールトリガで再生開始
  useEffect(() => {
    if (reducedMotion) return;
    const node = sectionRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          const v = videoRef.current;
          if (v) {
            v.currentTime = 0;
            v.play().catch(() => {
              // autoplay block 等で失敗したら静止画にフォールバック
              setPhase("ended");
            });
            setPhase("playing");
          }
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [phase, reducedMotion]);

  const handleEnded = useCallback(() => {
    setPhase("ended");
  }, []);

  const handleReplay = useCallback(() => {
    if (reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    setPhase("playing");
  }, [reducedMotion]);

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Zero Declaration · Cinematic v0
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              「後から増えやすい費用を、契約前に見える化します。」 動画再生 → 静止画固定 検証
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-xs text-white/70">
            <Link href="/zero-declaration-lab" className="hover:text-white">
              ← 静止画 6 案ラボ
            </Link>
            <span className="text-white/20">/</span>
            <Link href="/" className="hover:text-white">
              本番TOP →
            </Link>
          </nav>
        </div>
      </header>

      {/* イントロ */}
      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          2026-05-08 / Seedance 2.0 + gpt_image_2 / Cinematic Render
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          Architectural Elevation + 8 Callouts を、動画でドラフトする
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          設計者が手描きで注釈を入れていく時間を、約 8 秒の動画で再現。
          再生終了後は GPT Image 2 で生成したゴール静止画 (PNG) にクロスフェードして固定します。
          動画はループしません — 一度見せて、その後はずっと静止画。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          技術: Seedance 2.0 (start_image=空の家 / end_image=callouts 完成形) で間を補間。
          動画の最終 frame は圧縮で必ず PNG に劣るため、onEnded で 400ms クロスフェードして
          鮮明な PNG に切替。日本語 typography は静止画側で完璧に保持。
        </p>
      </section>

      {/* シネマティック表示 */}
      <section
        ref={sectionRef}
        className="border-t border-white/10 px-6 py-16"
      >
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                Stage · Cinematic Sequence
              </p>
              <h3 className="mt-1 text-xl font-semibold">
                スクロールで自動再生 → 終了で静止画固定
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span
                className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 ${
                  renderPhase === "idle"
                    ? "border-white/30 text-white/65"
                    : renderPhase === "playing"
                    ? "border-[#A9D159]/60 text-[#A9D159]"
                    : "border-white/40 text-white/85"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    renderPhase === "idle"
                      ? "bg-white/40"
                      : renderPhase === "playing"
                      ? "bg-[#A9D159] animate-pulse"
                      : "bg-white/80"
                  }`}
                />
                {renderPhase === "idle" && "待機中 (スクロールで開始)"}
                {renderPhase === "playing" && "再生中…"}
                {renderPhase === "ended" && (reducedMotion ? "静止画モード" : "再生終了 / 静止画固定")}
              </span>
              <button
                type="button"
                onClick={handleReplay}
                disabled={reducedMotion || renderPhase === "playing"}
                className="rounded border border-white/20 bg-white/[0.04] px-3 py-1.5 text-xs text-white/85 transition hover:border-white/40 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ↻ もう一度再生
              </button>
            </div>
          </div>

          {/* ステージ: video と img を重ねてクロスフェード */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-white/10 bg-[#F7F5F0]">
            {/* 動画レイヤー */}
            {!reducedMotion && (
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={START_SRC}
                muted
                playsInline
                preload="auto"
                onEnded={handleEnded}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out ${
                  renderPhase === "ended" ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
            {/* 静止画 (ゴール) レイヤー — onEnded でクロスフェードイン */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GOAL_SRC}
              alt="Zero Declaration goal still: 後から増えやすい費用を、契約前に見える化"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out ${
                renderPhase === "ended" ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <p className="mt-4 text-[12px] leading-relaxed text-white/55">
            動画再生中は seedance_2_0 が描いたフレームを表示。終了で gpt_image_2 製の鮮明な PNG にクロスフェード。
            <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-[11px]">
              prefers-reduced-motion: reduce
            </code>{" "}
            のユーザーには動画を再生せず、最初から静止画を表示します。
          </p>
        </div>
      </section>

      {/* このセクションでユーザーに伝えるべきこと */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            このセクションの戦略的役割
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            Hero の 2,280 万円〜 を、契約前に証拠で支える
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#A9D159]/80">
                伝えるべきこと
              </p>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-white/85">
                <li>
                  <span className="text-white/40">▸</span>
                  業界で「後から増える」と言われる 8 項目すべてを、契約前に開示
                </li>
                <li>
                  <span className="text-white/40">▸</span>
                  仲介手数料・つなぎ融資 → やまとでは <strong>発生しない</strong>
                </li>
                <li>
                  <span className="text-white/40">▸</span>
                  地盤改良 → 当社負担。火災保険・登記 → 含む
                </li>
                <li>
                  <span className="text-white/40">▸</span>
                  追加照明・カーテン・網戸・エアコン・外構一式 → すべて標準
                </li>
                <li>
                  <span className="text-white/40">▸</span>
                  「他社が無駄」フレームの最終証拠 (memory: feedback_frame_change_cheap_to_waste)
                </li>
              </ul>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#A9D159]/80">
                配置上の役割
              </p>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-white/85">
                <li>
                  <span className="text-white/40">▸</span>
                  Hero (2,280万円〜) の <strong>裏付け</strong>として、価格セクションの直前に配置
                </li>
                <li>
                  <span className="text-white/40">▸</span>
                  PriceSection に進む前の <strong>最後の信頼の砦</strong>
                </li>
                <li>
                  <span className="text-white/40">▸</span>
                  動画演出で「設計者が誠実に開示している」という温度感を物語る
                </li>
                <li>
                  <span className="text-white/40">▸</span>
                  終了後は静止画として読み込み続けられる (情報の精度は PNG が担保)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 実装メモ */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            実装メモ
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            動画 → 静止画クロスフェード方式 (採用案 A)
          </h3>
          <ol className="mt-6 space-y-3 text-[13px] leading-relaxed text-white/80">
            <li>
              <span className="text-white/40 mr-2">1.</span>
              ゴール画像を <code className="rounded bg-white/10 px-1 py-0.5 text-[11.5px]">gpt_image_2 / high / 2k</code> で生成 (8 callouts 全表示の最終状態)
            </li>
            <li>
              <span className="text-white/40 mr-2">2.</span>
              ゴールから callouts だけ削除した clean start 画像を 2 枚目で生成 (家のディテール完全一致)
            </li>
            <li>
              <span className="text-white/40 mr-2">3.</span>
              <code className="rounded bg-white/10 px-1 py-0.5 text-[11.5px]">seedance_2_0</code> に start_image + end_image 両方渡して 8 秒の補間動画
            </li>
            <li>
              <span className="text-white/40 mr-2">4.</span>
              IntersectionObserver で section が 35% 見えた時点で video.play()
            </li>
            <li>
              <span className="text-white/40 mr-2">5.</span>
              <code className="rounded bg-white/10 px-1 py-0.5 text-[11.5px]">onEnded</code> で 400ms クロスフェード — video opacity 0 / img opacity 1
            </li>
            <li>
              <span className="text-white/40 mr-2">6.</span>
              <code className="rounded bg-white/10 px-1 py-0.5 text-[11.5px]">prefers-reduced-motion: reduce</code> なら動画スキップで静止画直接表示
            </li>
          </ol>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Zero Declaration Cinematic — 2026-05-08 / Seedance 2.0 (8s) + gpt_image_2 (high·2k) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
