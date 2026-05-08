"use client";

import { useEffect, useRef, useState } from "react";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

/*
  /seedance-lab — Seedance 2.0 で生成した Hero 候補(吹抜俯瞰×子ども)を確認する検証ページ。
  納品前に削除する(BRAND-TRUTH §9 のラボ削除リスト準拠)。
  ベース写真: 写真素材/.../左京モデル/共有部分/吹抜/20230327-203.jpg
*/

type Clip = {
  id: string;
  label: string;
  cast: string;
  motion: string;
  src: string;
  rating: string;
  note: string;
};

const CLIPS: Clip[] = [
  {
    id: "g1",
    label: "Gacha 1",
    cast: "子ども 1人 / ソファで絵本",
    motion: "静",
    src: "/videos/seedance-lab/gacha1_1child_reading.mp4",
    rating: "★★★★★",
    note: "本命。俯瞰が綺麗に維持されFV用に最も安定。",
  },
  {
    id: "g5",
    label: "Gacha 5",
    cast: "子ども 2人 / 床で積み木",
    motion: "中",
    src: "/videos/seedance-lab/gacha5_startimage_2children.mp4",
    rating: "★★★★",
    note: "start_image ロール採用で建築忠実度が最高。",
  },
  {
    id: "g3",
    label: "Gacha 3",
    cast: "子ども 3人 / 走り回る",
    motion: "動",
    src: "/videos/seedance-lab/gacha3_3children_running.mp4",
    rating: "★★★★",
    note: "ピーク。動きが多くFVには情報量過多の可能性。",
  },
  {
    id: "g4",
    label: "Gacha 4",
    cast: "親子 / ソファで折り紙",
    motion: "静",
    src: "/videos/seedance-lab/gacha4_grandma_origami.mp4",
    rating: "★★★★",
    note: "家族の親密感。ストーリー結びに向く。",
  },
];

const SEQUENCE_SRC = "/videos/seedance-lab/sequence_v1.mp4";
const SEQUENCE_ORDER = "Gacha 1 → 5 → 3 → 4";
const SEQUENCE_DURATION = "18.2秒";

type ViewMode = "grid" | "stack" | "sequence";

export default function SeedanceLabPage() {
  const [mode, setMode] = useState<ViewMode>("grid");
  const [muted, setMuted] = useState(true);
  const [activeId, setActiveId] = useState<string>(CLIPS[0].id);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // stack モードでは1本ずつ再生
  useEffect(() => {
    if (mode !== "stack") return;
    Object.entries(videoRefs.current).forEach(([id, el]) => {
      if (!el) return;
      if (id === activeId) {
        el.currentTime = 0;
        el.play().catch(() => undefined);
      } else {
        el.pause();
      }
    });
  }, [mode, activeId]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <LabDisclaimer />

      {/* タブバー */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-6 py-3">
          <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
            View
          </span>
          {(["grid", "stack", "sequence"] as ViewMode[]).map((m) => {
            const labelMap: Record<ViewMode, string> = {
              grid: "4-Up Grid",
              stack: "1本ずつ",
              sequence: "つなぎ動画",
            };
            const active = m === mode;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded px-3 py-1.5 text-[12px] tracking-[0.04em] transition ${
                  active
                    ? "bg-white text-neutral-950"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {labelMap[m]}
              </button>
            );
          })}
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="rounded border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/80 hover:bg-white/10"
            >
              {muted ? "🔇 Muted" : "🔊 Sound"}
            </button>
          </div>
        </div>
      </div>

      {/* ヘッダ */}
      <header className="mx-auto max-w-[1400px] px-6 pb-2 pt-10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
          Seedance 2.0 / FV候補レビュー
        </p>
        <h1 className="mt-2 text-[28px] font-semibold tracking-tight text-white md:text-[34px]">
          吹抜俯瞰 × 子ども 4テイク + つなぎ案
        </h1>
        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-white/60">
          ベース写真は左京モデルハウス共有部分/吹抜の俯瞰ショット。
          Higgsfield 経由で Seedance 2.0(1080p / 16:9 / 5秒 / std)で生成。
          Gacha 5 のみ <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px]">start_image</code> ロール、
          他は <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px]">image</code> ロール。
        </p>
      </header>

      {/* === Grid: 4本同時再生 === */}
      {mode === "grid" && (
        <section className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="grid gap-5 md:grid-cols-2">
            {CLIPS.map((clip) => (
              <ClipCard key={clip.id} clip={clip} muted={muted} autoPlay />
            ))}
          </div>
        </section>
      )}

      {/* === Stack: 1本ずつフルサイズ === */}
      {mode === "stack" && (
        <section className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="mb-6 flex flex-wrap gap-2">
            {CLIPS.map((clip) => {
              const active = clip.id === activeId;
              return (
                <button
                  key={clip.id}
                  type="button"
                  onClick={() => setActiveId(clip.id)}
                  className={`rounded-md border px-4 py-2 text-[12px] transition ${
                    active
                      ? "border-white bg-white text-neutral-950"
                      : "border-white/15 bg-white/[0.03] text-white/75 hover:bg-white/10"
                  }`}
                >
                  <span className="block font-medium">{clip.label}</span>
                  <span className="block text-[10px] tracking-[0.04em] opacity-70">
                    {clip.cast}
                  </span>
                </button>
              );
            })}
          </div>
          {CLIPS.map((clip) => (
            <div
              key={clip.id}
              className={clip.id === activeId ? "block" : "hidden"}
            >
              <FullViewer
                clip={clip}
                muted={muted}
                videoRef={(el) => {
                  videoRefs.current[clip.id] = el;
                }}
              />
            </div>
          ))}
        </section>
      )}

      {/* === Sequence: つなぎ動画 === */}
      {mode === "sequence" && (
        <section className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="mb-5 rounded-md border border-amber-300/30 bg-amber-100/[0.06] px-4 py-3 text-[12px] leading-relaxed text-amber-100/80">
            <p>
              <span className="font-medium text-amber-100">DRAFT:</span>{" "}
              {SEQUENCE_ORDER}({SEQUENCE_DURATION})。
              0.6秒のクロスフェードで4テイクを連結。シーン間で別の家族に見えても問題ない構成
              (=同一家族の連続性を主張しない)。
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
            <video
              key="sequence"
              src={SEQUENCE_SRC}
              className="block aspect-video w-full"
              controls
              autoPlay
              loop
              muted={muted}
              playsInline
            />
          </div>
          <SequenceTimeline />
        </section>
      )}
    </main>
  );
}

function ClipCard({
  clip,
  muted,
  autoPlay,
}: {
  clip: Clip;
  muted: boolean;
  autoPlay: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-black">
      <div className="relative">
        <video
          src={clip.src}
          className="block aspect-video w-full"
          autoPlay={autoPlay}
          loop
          muted={muted}
          playsInline
        />
        <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          {clip.label}
        </span>
        <span className="absolute right-3 top-3 rounded bg-amber-300/15 px-2 py-1 text-[10px] tracking-[0.05em] text-amber-100">
          {clip.rating}
        </span>
      </div>
      <div className="space-y-1.5 px-4 py-4">
        <p className="text-[13px] font-medium text-white">{clip.cast}</p>
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
          動き: {clip.motion}
        </p>
        <p className="text-[12px] leading-relaxed text-white/60">{clip.note}</p>
      </div>
    </article>
  );
}

function FullViewer({
  clip,
  muted,
  videoRef,
}: {
  clip: Clip;
  muted: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
      <video
        ref={videoRef}
        src={clip.src}
        className="block aspect-video w-full"
        controls
        loop
        muted={muted}
        playsInline
      />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 text-[12px]">
        <span className="text-white">{clip.label}</span>
        <span className="text-white/70">{clip.cast}</span>
        <span className="text-white/45">動き: {clip.motion}</span>
        <span className="ml-auto text-amber-100">{clip.rating}</span>
      </div>
      <p className="px-5 pb-5 text-[12px] leading-relaxed text-white/55">
        {clip.note}
      </p>
    </div>
  );
}

function SequenceTimeline() {
  const beats = [
    { label: "Gacha 1", phase: "Open: 静寂", time: "0.0 – 4.4s" },
    { label: "Gacha 5", phase: "Build: 兄弟登場", time: "4.4 – 8.8s" },
    { label: "Gacha 3", phase: "Peak: 走り回る", time: "8.8 – 13.2s" },
    { label: "Gacha 4", phase: "Resolve: 親子の時間", time: "13.2 – 18.2s" },
  ];
  return (
    <div className="mt-6 grid gap-2 md:grid-cols-4">
      {beats.map((beat) => (
        <div
          key={beat.label}
          className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-3"
        >
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            {beat.label}
          </p>
          <p className="mt-1.5 text-[13px] font-medium text-white">
            {beat.phase}
          </p>
          <p className="mt-1 text-[11px] text-white/50">{beat.time}</p>
        </div>
      ))}
    </div>
  );
}
