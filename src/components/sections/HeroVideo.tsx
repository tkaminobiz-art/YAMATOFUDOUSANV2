"use client";

/*
  HeroVideo — 2026-05-08 / 2026-05-09 mobile rev
  ---------------------------------------------------------------
  動画主役の Hero。Seedance 2.0 で生成した 21 秒の左京モデル吹抜俯瞰
  ブランドフィルムをフルブリードで流し、下部に TRACK RECORD(4 指標)を
  あえて重ねる構成。

  2026-05-09: モバイルでヘッダー(LINE/来場予約)+FloatingCta(LINE/見学予約)が
  常時表示なので、HeroVideo 内 CTA は導線重複だった。動画の視認性を優先し
  CTA ブロックを撤去 → 動画 + TRACK RECORD overlay のみのミニマル構成に。

  方針: memory/project_next_fv_plan_video_overlay.md
  動画資産: memory/project_video_assets_archive.md
*/

type Metric = {
  eyebrow?: string;
  value: string;
  unit: string;
  label: string;
  caption: string;
};

const METRICS: readonly Metric[] = [
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

// 2026-05-08 v5: B案(Editorial Mincho) Phase 2 — 和文を Murecho に切替え
const MURECHO =
  "var(--font-murecho-var), 'Murecho', 'Hiragino Sans', 'Yu Gothic', sans-serif";
const INTER = "var(--font-inter), var(--font-inter-var), Inter, sans-serif";
const OSWALD =
  "var(--font-oswald-var), var(--font-oswald), 'Oswald', sans-serif";

export default function HeroVideo() {
  return (
    <section
      aria-label="やまと不動産 — 動画で見る家づくり"
      className="relative w-full min-h-[100svh] overflow-hidden bg-black"
    >
      <video
        src="/videos/hero/yamato-home-story.mp4"
        poster="/videos/hero/yamato-home-story-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 28%, rgba(0,0,0,0.46) 64%, rgba(0,0,0,0.82) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        {/* 2026-05-09 Step 4: Main Hero copy オーバーレイ — ユーザー指定 */}
        <div className="px-[var(--page-px)] pt-[18vh] md:pt-[20vh]">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-[760px]">
              <h1
                className="text-white leading-[1.32] tracking-[0.01em]"
                style={{
                  fontFamily: "var(--font-shippori)",
                  fontWeight: 500,
                  fontSize: "clamp(26px, 3.8vw, 56px)",
                  textShadow: "0 2px 18px rgba(0,0,0,0.55)",
                }}
              >
                奈良・京都南部で、
                <br className="md:hidden" />
                土地から考える家づくり。
              </h1>
              <p
                className="mt-5 text-white/95 leading-[1.6] tracking-[0.02em]"
                style={{
                  fontFamily: "var(--font-shippori)",
                  fontWeight: 400,
                  fontSize: "clamp(15px, 1.4vw, 20px)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.55)",
                }}
              >
                京モデル{" "}
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "1.35em",
                    letterSpacing: "-0.01em",
                  }}
                >
                  2,280
                </span>
                <span style={{ fontWeight: 400 }}> 万円〜。</span>
              </p>
              <p
                className="mt-3 max-w-[560px] text-white/85 leading-[1.85] tracking-[0.02em]"
                style={{
                  fontFamily: MURECHO,
                  fontWeight: 400,
                  fontSize: "clamp(12.5px, 1vw, 14.5px)",
                  textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                }}
              >
                土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="px-[var(--page-px)] pb-7 md:pb-10">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-3 flex items-center gap-3 md:mb-4 md:gap-4">
              <span
                className="text-[10px] uppercase tracking-[0.28em] text-white/85 md:text-[11px]"
                style={{ fontFamily: INTER }}
              >
                Track Record
              </span>
              <div className="h-px flex-1 bg-white/30" />
              <span
                className="hidden text-[11px] tracking-[0.04em] text-white/70 md:inline"
                style={{ fontFamily: MURECHO }}
              >
                地域で積み重ねてきた実績です。
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-10">
              {METRICS.map((m) => (
                <li key={m.label} className="text-white">
                  {m.eyebrow ? (
                    <span
                      className="block text-[10px] tracking-[0.18em] text-white/60 md:text-[11px]"
                      style={{ fontFamily: MURECHO }}
                    >
                      {m.eyebrow}
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="block h-[14px] md:h-[16px]"
                    />
                  )}
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span
                      className="leading-none"
                      style={{
                        fontFamily: OSWALD,
                        fontWeight: 500,
                        fontSize: "clamp(38px, 5.4vw, 84px)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {m.value}
                    </span>
                    <span
                      className="text-[14px] font-medium md:text-[18px]"
                      style={{ fontFamily: MURECHO }}
                    >
                      {m.unit}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[12px] tracking-[0.02em] text-white/95 md:text-[14px]"
                    style={{ fontFamily: MURECHO, fontWeight: 500 }}
                  >
                    {m.label}
                  </p>
                  <p
                    className="mt-1 text-[10.5px] leading-relaxed text-white/65 md:text-[12px]"
                    style={{ fontFamily: MURECHO }}
                  >
                    {m.caption}
                  </p>
                </li>
              ))}
            </ul>

            <p
              className="mt-4 text-right text-[9.5px] leading-relaxed text-white/55 md:mt-5 md:text-[11px]"
              style={{ fontFamily: MURECHO }}
            >
              ※ 公開時点の累計実績です。お引き渡し棟数は関連会社・前身を含む累計値の場合があります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
