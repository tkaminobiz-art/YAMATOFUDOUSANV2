"use client";

import { useEffect, useRef, useState } from "react";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

/*
  /seedance-lab — Seedance 2.0 で生成した Hero 候補(吹抜俯瞰×子ども)を確認する検証ページ。
  納品前に削除する(BRAND-TRUTH §9 のラボ削除リスト準拠)。
  ベース写真: 左京モデル 吹抜 20230327-203.jpg(俯瞰) と 20230327-184.jpg(3/4 view)
*/

type AngleTag = "overhead" | "elevated";

type Clip = {
  id: string;
  label: string;
  cast: string;
  motion: string;
  angle: AngleTag;
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
    angle: "overhead",
    src: "/videos/seedance-lab/gacha1_1child_reading.mp4",
    rating: "★★★★★",
    note: "本命。俯瞰が綺麗に維持されFV用に最も安定。",
  },
  {
    id: "g6",
    label: "Gacha 6",
    cast: "親子 / 朝食シーン",
    motion: "中",
    angle: "elevated",
    src: "/videos/seedance-lab/gacha6_morning_breakfast.mp4",
    rating: "★★★★★",
    note: "184アングル(elevated 3/4)。階段+ダイニングが映る別の語り口。",
  },
  {
    id: "g5",
    label: "Gacha 5",
    cast: "子ども 2人 / 床で積み木",
    motion: "中",
    angle: "overhead",
    src: "/videos/seedance-lab/gacha5_startimage_2children.mp4",
    rating: "★★★★",
    note: "start_image ロール採用で建築忠実度が最高。",
  },
  {
    id: "g3",
    label: "Gacha 3",
    cast: "子ども 3人 / 走り回る",
    motion: "動",
    angle: "overhead",
    src: "/videos/seedance-lab/gacha3_3children_running.mp4",
    rating: "★★★★",
    note: "ピーク。動きが多くFVには情報量過多の可能性。",
  },
  {
    id: "g7",
    label: "Gacha 7",
    cast: "子ども 1人 / お絵かき",
    motion: "静",
    angle: "elevated",
    src: "/videos/seedance-lab/gacha7_1child_drawing.mp4",
    rating: "★★★★★",
    note: "184アングル。光のビームが入る詩的なカット。",
  },
  {
    id: "g4",
    label: "Gacha 4",
    cast: "親子 / ソファで折り紙",
    motion: "静",
    angle: "overhead",
    src: "/videos/seedance-lab/gacha4_grandma_origami.mp4",
    rating: "★★★★",
    note: "家族の親密感。ストーリー結びに向く。",
  },
];

type SequenceVersion = {
  id: string;
  label: string;
  src: string;
  duration: string;
  order: string;
  description: string;
  beats: { label: string; phase: string; time: string }[];
};

const SEQUENCES: SequenceVersion[] = [
  {
    id: "v2",
    label: "Sequence v2 — 6カット 21秒",
    src: "/videos/seedance-lab/sequence_v2.mp4",
    duration: "21.0秒",
    order: "Gacha 1 → 6 → 5 → 3 → 7 → 4",
    description:
      "本命。俯瞰(203)と3/4(184)の2アングルを交互に挟み、朝→昼→夕の時間軸ストーリー。0.6秒クロスフェード × 5回 + 全体フェードイン/アウト。",
    beats: [
      { label: "Gacha 1 (203)", phase: "Open: 朝の静寂", time: "0.0–4.0s" },
      { label: "Gacha 6 (184)", phase: "Morning: 親子朝食", time: "3.4–7.9s" },
      { label: "Gacha 5 (203)", phase: "Build: 兄弟登場", time: "7.3–10.8s" },
      { label: "Gacha 3 (203)", phase: "Peak: 走る", time: "10.2–13.7s" },
      { label: "Gacha 7 (184)", phase: "Wind down: 集中", time: "13.1–17.1s" },
      { label: "Gacha 4 (203)", phase: "Resolve: 家族の時間", time: "16.5–21.0s" },
    ],
  },
  {
    id: "v1",
    label: "Sequence v1 — 4カット 18秒",
    src: "/videos/seedance-lab/sequence_v1.mp4",
    duration: "18.2秒",
    order: "Gacha 1 → 5 → 3 → 4",
    description: "初回案。俯瞰のみ4本で構成。アングルは統一されているが画面の変化が少ない。",
    beats: [
      { label: "Gacha 1", phase: "Open: 静寂", time: "0.0–4.4s" },
      { label: "Gacha 5", phase: "Build: 兄弟登場", time: "4.4–8.8s" },
      { label: "Gacha 3", phase: "Peak: 走り回る", time: "8.8–13.2s" },
      { label: "Gacha 4", phase: "Resolve: 親子の時間", time: "13.2–18.2s" },
    ],
  },
];

type ViewMode = "grid" | "stack" | "sequence" | "fv";

type Metric = {
  eyebrow?: string;
  value: string;
  unit: string;
  label: string;
  caption: string;
};

const FV_METRICS: readonly Metric[] = [
  {
    eyebrow: "累計",
    value: "600",
    unit: "棟",
    label: "以上のお引き渡し",
    caption: "奈良・京都南部で積み重ねた家づくり",
  },
  {
    eyebrow: "累計分譲",
    value: "90",
    unit: "区画",
    label: "以上の自社分譲実績",
    caption: "土地の仕入れから、自社で。",
  },
  {
    value: "50",
    unit: "組",
    label: "以上のお客様の声",
    caption: "原文に近い形で掲載しています。",
  },
  {
    value: "14",
    unit: "年",
    label: "の家づくり実績",
    caption: "2011年創立、奈良・京都南部一筋。",
  },
];

export default function SeedanceLabPage() {
  const [mode, setMode] = useState<ViewMode>("fv");
  const [muted, setMuted] = useState(true);
  const [activeId, setActiveId] = useState<string>(CLIPS[0].id);
  const [activeSeq, setActiveSeq] = useState<string>(SEQUENCES[0].id);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

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

  const sequence = SEQUENCES.find((s) => s.id === activeSeq) ?? SEQUENCES[0];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <LabDisclaimer />

      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-6 py-3">
          <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
            View
          </span>
          {(["fv", "sequence", "grid", "stack"] as ViewMode[]).map((m) => {
            const labelMap: Record<ViewMode, string> = {
              fv: "FV合成プレビュー",
              sequence: "つなぎ動画",
              grid: "6-Up Grid",
              stack: "1本ずつ",
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

      <header className="mx-auto max-w-[1400px] px-6 pb-2 pt-10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
          Seedance 2.0 / FV候補レビュー(v2)
        </p>
        <h1 className="mt-2 text-[28px] font-semibold tracking-tight text-white md:text-[34px]">
          吹抜俯瞰 × 子ども 6テイク + 21秒シーケンス
        </h1>
        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-white/60">
          ベース写真は左京モデルハウス共有部分/吹抜の <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px]">203</code>(俯瞰)
          と <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11px]">184</code>(elevated 3/4 view)。
          全クリップ Seedance 2.0 / 1080p / 16:9 / 5秒 / std で生成、
          v2では2アングルを交互に挟んで朝→昼→夕の時間軸を構成しています。
        </p>
      </header>

      {mode === "fv" && (
        <section className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
          <div className="mb-4 rounded-md border border-emerald-300/30 bg-emerald-100/[0.06] px-4 py-3 text-[12px] leading-relaxed text-emerald-100/80">
            <p>
              <span className="font-medium text-emerald-100">FV合成プレビュー:</span>{" "}
              sequence_v2 をフルブリードで流し、TRACK RECORD を動画下部にあえてかぶせて配置。
              テキストのみ・ゴシック体(Noto Sans JP + Oswald)・白〜クリーム系。
              実 Hero への差し替えはまだ未着手、これは決定形のレイアウト確認用。
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black">
            <video
              key="fv-preview"
              src={SEQUENCES[0].src}
              className="block aspect-video w-full"
              autoPlay
              loop
              muted
              playsInline
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 18%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.78) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 px-4 pb-5 md:px-10 md:pb-8">
              <div className="mx-auto max-w-[1400px]">
                <div className="mb-4 flex items-center gap-4 md:mb-5">
                  <span
                    className="text-[10px] uppercase tracking-[0.28em] text-white/85 md:text-[11px]"
                    style={{
                      fontFamily: "var(--font-inter), var(--font-inter-var), Inter, sans-serif",
                    }}
                  >
                    Track Record
                  </span>
                  <div className="h-px flex-1 bg-white/30" />
                  <span
                    className="hidden text-[11px] tracking-[0.04em] text-white/65 md:inline"
                    style={{
                      fontFamily:
                        "var(--font-noto), 'Noto Sans JP', sans-serif",
                    }}
                  >
                    地域で積み重ねてきた実績です。
                  </span>
                </div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4 md:gap-x-10">
                  {FV_METRICS.map((m) => (
                    <li key={m.label} className="text-white">
                      {m.eyebrow ? (
                        <span
                          className="block text-[10px] tracking-[0.18em] text-white/60 md:text-[11px]"
                          style={{
                            fontFamily:
                              "var(--font-noto), 'Noto Sans JP', sans-serif",
                          }}
                        >
                          {m.eyebrow}
                        </span>
                      ) : (
                        <span className="block h-[14px] md:h-[16px]" aria-hidden />
                      )}
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span
                          className="leading-none"
                          style={{
                            fontFamily:
                              "var(--font-oswald-var), var(--font-oswald), 'Oswald', sans-serif",
                            fontWeight: 500,
                            fontSize: "clamp(40px, 5.6vw, 92px)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {m.value}
                        </span>
                        <span
                          className="text-[14px] font-medium md:text-[18px]"
                          style={{
                            fontFamily:
                              "var(--font-noto), 'Noto Sans JP', sans-serif",
                          }}
                        >
                          {m.unit}
                        </span>
                      </div>
                      <p
                        className="mt-1 text-[12px] tracking-[0.02em] text-white/95 md:text-[14px]"
                        style={{
                          fontFamily:
                            "var(--font-noto), 'Noto Sans JP', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {m.label}
                      </p>
                      <p
                        className="mt-1 text-[10.5px] leading-relaxed text-white/65 md:text-[12px]"
                        style={{
                          fontFamily:
                            "var(--font-noto), 'Noto Sans JP', sans-serif",
                        }}
                      >
                        {m.caption}
                      </p>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-5 text-right text-[9.5px] leading-relaxed text-white/55 md:mt-6 md:text-[11px]"
                  style={{
                    fontFamily:
                      "var(--font-noto), 'Noto Sans JP', sans-serif",
                  }}
                >
                  ※ 公開時点の累計実績です。お引き渡し棟数は関連会社・前身を含む累計値の場合があります。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Layout</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/75">
                動画 16:9 フルブリード、下部 58% にグラデーション。コンテンツは下端 padding 32-44px 内に収める。
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Type</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/75">
                数字 = Oswald 500 / 和文 = Noto Sans JP 400-500 / Latin = Inter。明朝・ロゴ書体は使わない。
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Color</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/75">
                数字・主見出しは pure white、サブは white/65-95、罫線 30%。動画上に乗せる前提で彩度を入れない。
              </p>
            </div>
          </div>
        </section>
      )}

      {mode === "sequence" && (
        <section className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {SEQUENCES.map((s) => {
              const active = s.id === activeSeq;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSeq(s.id)}
                  className={`rounded-md border px-4 py-2 text-[12px] transition ${
                    active
                      ? "border-white bg-white text-neutral-950"
                      : "border-white/15 bg-white/[0.03] text-white/75 hover:bg-white/10"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
          <div className="mb-5 rounded-md border border-amber-300/30 bg-amber-100/[0.06] px-4 py-3 text-[12px] leading-relaxed text-amber-100/80">
            <p>
              <span className="font-medium text-amber-100">{sequence.order}</span>{" "}
              ({sequence.duration}). {sequence.description}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
            <video
              key={sequence.id}
              src={sequence.src}
              className="block aspect-video w-full"
              controls
              autoPlay
              loop
              muted={muted}
              playsInline
            />
          </div>
          <div className="mt-6 grid gap-2 md:grid-cols-3 lg:grid-cols-6">
            {sequence.beats.map((beat) => (
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
        </section>
      )}

      {mode === "grid" && (
        <section className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {CLIPS.map((clip) => (
              <ClipCard key={clip.id} clip={clip} muted={muted} autoPlay />
            ))}
          </div>
        </section>
      )}

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
        <span
          className={`absolute right-3 top-3 rounded px-2 py-1 text-[10px] tracking-[0.05em] ${
            clip.angle === "overhead"
              ? "bg-sky-300/15 text-sky-100"
              : "bg-emerald-300/15 text-emerald-100"
          }`}
        >
          {clip.angle === "overhead" ? "203 俯瞰" : "184 3/4"}
        </span>
      </div>
      <div className="space-y-1.5 px-4 py-4">
        <p className="text-[13px] font-medium text-white">{clip.cast}</p>
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
          動き: {clip.motion} / 評価: <span className="text-amber-100">{clip.rating}</span>
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
        <span
          className={`rounded px-2 py-0.5 text-[10px] ${
            clip.angle === "overhead"
              ? "bg-sky-300/15 text-sky-100"
              : "bg-emerald-300/15 text-emerald-100"
          }`}
        >
          {clip.angle === "overhead" ? "203 俯瞰" : "184 3/4"}
        </span>
        <span className="ml-auto text-amber-100">{clip.rating}</span>
      </div>
      <p className="px-5 pb-5 text-[12px] leading-relaxed text-white/55">
        {clip.note}
      </p>
    </div>
  );
}
