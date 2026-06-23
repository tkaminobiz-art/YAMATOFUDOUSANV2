"use client";

import Link from "next/link";
import { MessageCircle, Calendar } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  HeroVideo — 2026-05-09 conversion-sales-rulebook 準拠版
  ---------------------------------------------------------------
  動画主役の Hero。Seedance 2.0 で生成した 21 秒の左京モデル吹抜俯瞰
  ブランドフィルムをフルブリードで流し、下部に TRACK RECORD (4 指標) を
  あえて重ねる構成。

  2026-05-09 conversion-sales-rulebook 反映:
   - copy: situation-led (anxiety-resolution パターン)
     旧「奈良・京都南部で、土地から考える家づくり」(brochure tone) →
     新「土地も、総額も、まだ見えていないご家族へ。」(situation language)
   - 敵: 「建物 2,000 万円台」だけで決める構造 (named competitor 攻撃ではない)
   - 京 2,280 万円表示は micro caption に降格。Hero 主役は situation + total cost
   - CTA staircase 復活: ① LINEで総額診断 (primary) / ② 見学予約 (secondary)
     旧「導線重複」判断は撤回 — Hero CTA は「次の行動の約束」として必要
     (rulebook §1.6 / §4)

  方針: docs/project-context/conversion-sales-rulebook.md
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
    eyebrow: "常時",
    value: "150",
    unit: "区画",
    label: "程度を保有する自社分譲地",
    caption: "土地の仕入れから、自社で。",
  },
  {
    value: "50",
    unit: "組",
    label: "以上のお客様の声",
    caption: "原文に近い形で掲載しています。",
  },
  {
    eyebrow: "創立",
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
        {/* 2026-05-09 conversion-sales-rulebook: situation-led + CTA staircase */}
        <div className="px-[var(--page-px)] pt-[14vh] md:pt-[16vh]">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-[820px]">
              {/* h1: 約束 + 招待 (お客様の状況断定を避け、やまと側の動詞で寄り添う) */}
              <h1
                className="text-white leading-[1.28] tracking-[0.01em]"
                style={{
                  fontFamily: "var(--font-shippori)",
                  fontWeight: 500,
                  fontSize: "clamp(28px, 4.2vw, 60px)",
                  textShadow: "0 2px 18px rgba(0,0,0,0.55)",
                }}
              >
                土地から総額まで、
                <br />
                はじめにお見せします。
              </h1>

              {/* lead: 事実描写 (建物価格だけでは見えない範囲) → やまとの約束 */}
              <p
                className="mt-6 max-w-[680px] text-white/95 leading-[1.85] tracking-[0.02em]"
                style={{
                  fontFamily: "var(--font-shippori)",
                  fontWeight: 400,
                  fontSize: "clamp(14.5px, 1.25vw, 18px)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.55)",
                }}
              >
                「建物{" "}
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "1.15em",
                    letterSpacing: "-0.01em",
                  }}
                >
                  2,000
                </span>
                万円台」だけでは、暮らしの総額は見えません。
                <br className="hidden md:inline" />
                土地代・付帯工事・諸費用・住宅ローンまで、
                <br className="md:hidden" />
                契約前にまとめてお見せします。
              </p>

              {/* CTA staircase — primary: 総額診断 (LINE) / secondary: 見学 */}
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch gap-3 sm:gap-3.5 max-w-[640px]">
                <a
                  href={LINE_ADD_FRIEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded text-white font-bold tracking-[0.04em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(6,199,85,0.6)]"
                  style={{
                    backgroundColor: "#06C755",
                    fontSize: "clamp(13px, 1.05vw, 15px)",
                  }}
                >
                  <MessageCircle className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={1.75} />
                  <span>LINEで土地込み総額を無料診断</span>
                </a>
                <Link
                  href="/reserve"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded border border-white/55 bg-white/5 text-white font-medium tracking-[0.04em] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/12"
                  style={{ fontSize: "clamp(13px, 1vw, 14.5px)" }}
                >
                  <Calendar className="w-4 h-4 md:w-[17px] md:h-[17px]" strokeWidth={1.75} />
                  <span>モデルハウスで標準仕様を見る</span>
                </Link>
              </div>

              {/* micro caption: 拠点 / 商品最低価格 (SEO + Track Record 整合用) */}
              <p
                className="mt-5 text-white/65 leading-[1.7] tracking-[0.04em]"
                style={{
                  fontFamily: MURECHO,
                  fontWeight: 400,
                  fontSize: "clamp(11px, 0.85vw, 12.5px)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                }}
              >
                奈良・京都南部 / 自社分譲地 / 京モデル{" "}
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "1.2em",
                  }}
                >
                  2,280
                </span>
                {" "}万円〜
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
