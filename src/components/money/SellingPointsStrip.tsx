"use client";

import { Wallet, MapPin, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
  SellingPointsStrip — /money のすぐ下「やまとが、できること」3つ
  v4: アイコン追加(視覚記号化) + ホバーリフトで触感。
      短いカード(各1〜2文)で、詳細はアコーディオンに任せる。

  【フォント方針】和文ゴシック / 数字 font-oswald のみ。明朝禁止。
*/

const FOREST = "#486B00";
const ACCENT = "#A2C523";

type Point = {
  no: string;
  icon: LucideIcon;
  label: string;
  headline: string;
  sub: string;
  href: string;
};

const POINTS: readonly Point[] = [
  {
    no: "01",
    icon: Wallet,
    label: "つなぎ融資",
    headline: "ゼロ円",
    sub: "30〜80万円が、家計に戻ります",
    href: "#ch-questions",
  },
  {
    no: "02",
    icon: MapPin,
    label: "自社の土地",
    headline: "500万円台〜",
    sub: "大和郡山市矢田町ほか、奈良・京都で76区画の実績",
    href: "#ch-questions",
  },
  {
    no: "03",
    icon: Users,
    label: "FP相談",
    headline: "中立",
    sub: "やまと社内ではなく、提携先のFP事務所",
    href: "#ch-questions",
  },
] as const;

export default function SellingPointsStrip() {
  return (
    <section className="relative bg-bg-primary border-y border-text-primary/10 py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <p
          className="text-[12px] md:text-[13px] tracking-[0.06em] font-bold mb-6 md:mb-8"
          style={{ color: FOREST }}
        >
          やまとが、できること。お金の売りは3つ。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.no}
                href={p.href}
                className="group relative bg-white border border-text-primary/15 p-6 md:p-8 flex flex-col transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:shadow-[0_18px_40px_-20px_rgba(43,43,43,0.18)] hover:border-text-primary/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-oswald tabular-nums leading-none"
                      style={{
                        fontWeight: 300,
                        fontSize: "clamp(24px, 2.2vw, 32px)",
                        color: "rgba(43,43,43,0.4)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {p.no}
                    </span>
                    <span className="text-[13px] md:text-[14px] tracking-[0.06em] text-text-secondary font-medium">
                      {p.label}
                    </span>
                  </div>
                  {/* アイコン — ライムバッジ */}
                  <span
                    className="inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center transition-transform duration-[400ms] group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    style={{ background: "#EDF2D5", color: FOREST }}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.6} />
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span
                    className="font-oswald tabular-nums leading-none"
                    style={{
                      fontWeight: 300,
                      fontSize: "clamp(44px, 5vw, 72px)",
                      letterSpacing: "-0.03em",
                      color: FOREST,
                    }}
                  >
                    {p.headline}
                  </span>
                </div>

                <p className="mt-3 text-text-primary text-[13px] md:text-[15px] leading-[1.6]">
                  {p.sub}
                </p>

                <span
                  className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium transition-colors"
                  style={{ color: FOREST }}
                >
                  詳しく
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                    style={{ color: ACCENT }}
                  >
                    →
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
