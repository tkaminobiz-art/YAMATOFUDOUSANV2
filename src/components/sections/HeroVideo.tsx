"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  HeroVideo — 2026-05-08
  ---------------------------------------------------------------
  動画主役の Hero。Seedance 2.0 で生成した 21 秒の左京モデル吹抜俯瞰
  ブランドフィルムをフルブリードで流し、下部に TRACK RECORD(4 指標)を
  あえて重ねる構成。CTA は中央下に配置し、CVR 導線は維持。

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

const NOTO = "var(--font-noto), 'Noto Sans JP', sans-serif";
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 18%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.82) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex-1" />

        <div className="px-[var(--page-px)] pb-7 md:pb-10">
          <div className="mx-auto flex max-w-[1400px] flex-col items-end gap-3 sm:flex-row sm:items-stretch sm:justify-end">
            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full flex-col items-center justify-center overflow-hidden rounded border-b-[3px] px-8 py-4 text-center font-bold text-white transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(6,199,85,0.55)] sm:min-w-[260px] sm:flex-1 sm:max-w-[300px]"
              style={{ backgroundColor: "#06C755", borderBottomColor: "#04A346" }}
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
              />
              <span className="relative inline-flex items-center gap-2 leading-tight">
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                LINEで総額の目安を相談する
              </span>
              <span className="relative mt-0.5 text-[11px] font-medium text-white/80">
                友だち追加で気軽にお問い合わせ
              </span>
            </a>
            <CtaButton
              href="/reserve"
              variant="dark-bg-secondary"
              size="md"
              label="モデルハウスを見学する"
              sublabel="ご予約なしでも見学可・無料"
              className="w-full px-8 py-4 sm:min-w-[220px] sm:flex-1 sm:max-w-[260px]"
            />
            <Link
              href="/contact"
              className="hidden self-center text-[12px] tracking-[0.04em] text-white/75 transition-colors hover:text-white sm:inline-flex sm:items-center sm:gap-1.5 md:text-[13px]"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.4)",
                paddingBottom: "2px",
              }}
            >
              フォームで資料請求する
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-3 text-right sm:hidden">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-white/80"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.4)",
                paddingBottom: "2px",
              }}
            >
              フォームで資料請求する
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="px-[var(--page-px)] pb-6 md:pb-8">
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
                style={{ fontFamily: NOTO }}
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
                      style={{ fontFamily: NOTO }}
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
                      style={{ fontFamily: NOTO }}
                    >
                      {m.unit}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[12px] tracking-[0.02em] text-white/95 md:text-[14px]"
                    style={{ fontFamily: NOTO, fontWeight: 500 }}
                  >
                    {m.label}
                  </p>
                  <p
                    className="mt-1 text-[10.5px] leading-relaxed text-white/65 md:text-[12px]"
                    style={{ fontFamily: NOTO }}
                  >
                    {m.caption}
                  </p>
                </li>
              ))}
            </ul>

            <p
              className="mt-4 text-right text-[9.5px] leading-relaxed text-white/55 md:mt-5 md:text-[11px]"
              style={{ fontFamily: NOTO }}
            >
              ※ 公開時点の累計実績です。お引き渡し棟数は関連会社・前身を含む累計値の場合があります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
