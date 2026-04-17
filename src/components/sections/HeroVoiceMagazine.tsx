"use client";

/**
 * HeroVoiceMagazine — 1画面 Bento 誌面（最終形）
 * ----------------------------------------------------------------------
 * 参考: https://torichoapp.jp の「撮る、終わる。」式 極太タイポ
 *       + 雑誌の巻頭グラフの "目次ページ" 的 Bento 構成
 *
 * 2026-04-17 最終方針（ユーザー承認済）:
 *   - 1 viewport（100svh）に ヘッダ + 8 Figures + CTA を収める
 *   - スクロール不要で全体を俯瞰できる誌面
 *   - 01 ANXIETY を主役（2x2）、02-03 を中、04-08 を小の Bento
 *   - 極太ゴシック Noto Sans JP 900
 *   - 純白 × ほぼ真黒 × 深紅 #B91C1C
 *   - 各カードは viewport 進入時に stagger で reveal
 *
 * データ: @/data/voiceHome.ts の MAGAZINE_FIGURES / MAGAZINE_FIGURES_HEADER
 */

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import {
  MAGAZINE_FIGURES,
  MAGAZINE_FIGURES_HEADER,
  type MagazineFigure,
} from "@/data/voiceHome";

/* -----------------------------------------------------------------------
   prefers-reduced-motion
   -------------------------------------------------------------------- */
const PREFERS_REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(PREFERS_REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getReducedMotionSnapshot() {
  return window.matchMedia(PREFERS_REDUCED_QUERY).matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

/* -----------------------------------------------------------------------
   reveal hook
   -------------------------------------------------------------------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return { ref, visible: reduced || visible };
}

/* -----------------------------------------------------------------------
   Figure カード（Bento 1枚）
   -------------------------------------------------------------------- */

type FigureSize = "lg" | "md" | "sm";

const FONT_SIZE: Record<FigureSize, { strong: string; soft: string; meta: string; no: string; caption: string }> = {
  lg: {
    strong: "clamp(22px, 2.4vw, 38px)",
    soft: "clamp(13px, 1.2vw, 17px)",
    meta: "11px",
    no: "10px",
    caption: "10px",
  },
  md: {
    strong: "clamp(17px, 1.8vw, 26px)",
    soft: "clamp(11px, 1.05vw, 14px)",
    meta: "10px",
    no: "9.5px",
    caption: "9.5px",
  },
  sm: {
    strong: "clamp(13px, 1.3vw, 18px)",
    soft: "clamp(10px, 0.92vw, 12px)",
    meta: "9.5px",
    no: "9px",
    caption: "9px",
  },
};

function FigureCard({
  figure,
  size,
  staggerIdx,
  gridClass,
}: {
  figure: MagazineFigure;
  size: FigureSize;
  staggerIdx: number;
  gridClass: string;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const fs = FONT_SIZE[size];

  return (
    <Link
      href={`/voice/${figure.voiceId}`}
      className={`group ${gridClass} relative flex flex-col justify-between overflow-hidden border transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--voice-accent)] hover:shadow-[0_6px_30px_rgba(10,10,10,0.12)]`}
      style={{
        borderColor: "var(--voice-rule-soft)",
        backgroundColor: "var(--voice-bg)",
        padding:
          size === "lg"
            ? "clamp(20px, 2.2vw, 36px)"
            : size === "md"
              ? "clamp(14px, 1.6vw, 24px)"
              : "clamp(12px, 1.3vw, 18px)",
      }}
      aria-label={`${figure.chapterEn} — ${figure.headlineStrong.replace(/\n/g, " ")}`}
    >
      <article
        ref={ref}
        className={`flex h-full flex-col justify-between transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        style={{ transitionDelay: `${staggerIdx * 60}ms` }}
      >
        {/* キャプション（FIGURE NO ／ CHAPTER） */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="inline-block h-px w-5"
            style={{ backgroundColor: "var(--voice-accent)" }}
            aria-hidden
          />
          <span
            className="uppercase"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 500,
              fontSize: fs.caption,
              letterSpacing: "0.2em",
              color: "var(--voice-accent)",
            }}
          >
            #{figure.figureNo} ／ {figure.chapterEn}
          </span>
        </div>

        {/* 強調行 */}
        <h3
          className="whitespace-pre-line"
          style={{
            fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
            fontWeight: 900,
            fontSize: fs.strong,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "var(--voice-text)",
            wordBreak: "keep-all",
          }}
        >
          {figure.headlineStrong}
        </h3>

        {/* 補足行（sm サイズでは省略、md/lg だけ表示） */}
        {size !== "sm" && (
          <p
            className="mt-2 whitespace-pre-line"
            style={{
              fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
              fontWeight: 500,
              fontSize: fs.soft,
              lineHeight: 1.55,
              color: "var(--voice-text-sub)",
              wordBreak: "keep-all",
            }}
          >
            {figure.headlineSoft}
          </p>
        )}

        {/* メタ行 */}
        <div
          className="mt-auto flex items-end justify-between gap-2 pt-3"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          <span
            className="flex flex-col gap-0.5"
            style={{ fontSize: fs.meta, letterSpacing: "0.1em" }}
          >
            <span style={{ color: "var(--voice-accent)", fontWeight: 500, fontSize: fs.no }}>
              No.{figure.voiceId}
            </span>
            <span
              style={{
                fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
                color: "var(--voice-text)",
                fontWeight: 500,
              }}
            >
              {figure.attribution}
            </span>
          </span>
          <ArrowUpRight
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
            size={size === "lg" ? 20 : size === "md" ? 16 : 14}
            style={{ color: "var(--voice-text)" }}
          />
        </div>
      </article>

      {/* ウォーターマーク（lg のみ右下に薄く） */}
      {size === "lg" && (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -right-2 select-none"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(120px, 16vw, 220px)",
            color: "var(--voice-accent)",
            opacity: 0.05,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          {figure.figureNo}
        </span>
      )}
    </Link>
  );
}

/* -----------------------------------------------------------------------
   メイン
   -------------------------------------------------------------------- */

export default function HeroVoiceMagazine() {
  const h = MAGAZINE_FIGURES_HEADER;
  const { ref: headerRef, visible: headerVisible } = useReveal<HTMLElement>();

  // Bento 配置の定義（12 カラム × 任意行のグリッド）
  // デスクトップ: 01 大 (6×2), 02-03 中 (3×2, 3×2), 04-08 小 (12列を均等5分割は難しいので 6列 + 下段 6列)
  // 実装: 01は左列 6カラム × 2行、上段右に 02-03 を 3+3、下段残り 04-08 を 6 列均等
  // 12列×3行のBento配置:
  //   行1: [01 大 6x2  ][02 3x1][03 3x1]
  //   行2: [   (01)    ][04 3x1][05 3x1]
  //   行3: [06 4x1     ][07 4x1][08 4x1]
  const layouts: { figure: MagazineFigure; size: FigureSize; grid: string; stagger: number }[] = [
    {
      figure: MAGAZINE_FIGURES[0], // 01 ANXIETY 主役
      size: "lg",
      grid: "md:col-span-6 md:row-span-2",
      stagger: 0,
    },
    {
      figure: MAGAZINE_FIGURES[1], // 02 STANDARD
      size: "md",
      grid: "md:col-span-3",
      stagger: 1,
    },
    {
      figure: MAGAZINE_FIGURES[2], // 03 COMPARISON
      size: "md",
      grid: "md:col-span-3",
      stagger: 2,
    },
    {
      figure: MAGAZINE_FIGURES[3], // 04 RESCUE
      size: "md",
      grid: "md:col-span-3",
      stagger: 3,
    },
    {
      figure: MAGAZINE_FIGURES[4], // 05 DISCOVERY
      size: "md",
      grid: "md:col-span-3",
      stagger: 4,
    },
    {
      figure: MAGAZINE_FIGURES[5], // 06 LAND
      size: "sm",
      grid: "md:col-span-4",
      stagger: 5,
    },
    {
      figure: MAGAZINE_FIGURES[6], // 07 ENCOUNTER
      size: "sm",
      grid: "md:col-span-4",
      stagger: 6,
    },
    {
      figure: MAGAZINE_FIGURES[7], // 08 AFTER
      size: "sm",
      grid: "md:col-span-4",
      stagger: 7,
    },
  ];

  return (
    <section
      aria-label="VOICE — 五十組のお客様の声"
      className="relative w-full"
      style={{
        backgroundColor: "var(--voice-bg)",
        color: "var(--voice-text)",
      }}
    >
      <div
        className="mx-auto flex w-full max-w-[1600px] flex-col gap-[clamp(16px,2vw,28px)] px-[var(--page-px)] py-[clamp(32px,4vw,56px)] md:h-[100svh] md:min-h-[680px]"
      >
        {/* ===== ヘッダ ===== */}
        <header
          ref={headerRef}
          className="flex flex-col gap-[clamp(12px,1.5vw,24px)]"
        >
          {/* キャプション */}
          <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-1 transition-all duration-[700ms] ease-out ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span
              className="inline-block h-px w-10"
              style={{ backgroundColor: "var(--voice-accent)" }}
              aria-hidden
            />
            <span
              className="uppercase"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.22em",
                color: "var(--voice-accent)",
              }}
            >
              {h.captionEn}
            </span>
            <span style={{ color: "var(--voice-rule-soft)" }}>／</span>
            <span
              style={{
                fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
                fontSize: "12px",
                color: "var(--voice-text-sub)",
                letterSpacing: "0.16em",
              }}
            >
              {h.captionJa}
            </span>
            <span className="ml-auto hidden md:inline-flex items-center gap-2" aria-hidden>
              <span
                className="inline-block h-px w-10"
                style={{ backgroundColor: "var(--voice-text)" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  color: "var(--voice-text)",
                }}
              >
                {h.figuresLabel} / {h.figuresCount}
              </span>
            </span>
          </div>

          {/* 大見出し（1画面に収めるためコンパクト化、2行で改行） */}
          <h2
            className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{
              fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(22px, 3vw, 44px)",
              lineHeight: 1.2,
              letterSpacing: "-0.04em",
              color: "var(--voice-text)",
              transitionDelay: "100ms",
              wordBreak: "keep-all",
            }}
          >
            <span className="block">「諦めかけていた」から、</span>
            <span className="block" style={{ color: "var(--voice-accent)" }}>
              「やまとでよかった」
              <span style={{ color: "var(--voice-text)" }}>まで。</span>
            </span>
          </h2>

          {/* リード（コンパクト） */}
          <p
            className={`max-w-[56ch] transition-all duration-[800ms] ease-out ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{
              fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
              fontSize: "clamp(12px, 1vw, 14px)",
              lineHeight: 1.85,
              color: "var(--voice-text-sub)",
              transitionDelay: "250ms",
            }}
          >
            やまと不動産で家を建てた方々の、決定的な一言だけを集めました。
            ここにあるのは、他社ではまず聞かない言葉ばかりです。
          </p>
        </header>

        {/* ===== Bento グリッド（flex-1 で残り空間を取り、内部で 12 列 3 行分割） ===== */}
        <div
          className="grid min-h-0 flex-1 grid-cols-1 gap-[clamp(8px,0.8vw,14px)] md:grid-cols-12 md:grid-rows-3"
        >
          {layouts.map((l) => (
            <FigureCard
              key={l.figure.voiceId + l.figure.figureNo}
              figure={l.figure}
              size={l.size}
              staggerIdx={l.stagger}
              gridClass={l.grid}
            />
          ))}
        </div>

        {/* ===== フッター CTA ===== */}
        <footer className="flex flex-col items-start justify-between gap-4 pt-[clamp(8px,1vw,16px)] md:flex-row md:items-center">
          <p
            className="max-w-[48ch]"
            style={{
              fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
              fontSize: "clamp(12px, 1vw, 14px)",
              color: "var(--voice-text-sub)",
              lineHeight: 1.75,
            }}
          >
            <span style={{ color: "var(--voice-accent)", fontWeight: 500 }}>— FIN —</span>
            八件は代表。残り 42 組の声も、すべて読めます。
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <CtaButton
              href="/reserve"
              variant="primary"
              size="md"
              label="モデルハウスを予約する"
              sublabel="無料・10秒で完了"
            />
            <CtaButton
              href="/voice"
              variant="secondary"
              size="md"
              label="すべての声を読む"
            />
          </div>
        </footer>
      </div>
    </section>
  );
}
