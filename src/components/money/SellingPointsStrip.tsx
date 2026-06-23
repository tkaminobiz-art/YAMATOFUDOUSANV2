"use client";

import { Wallet, MapPin, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
  SellingPointsStrip — /money「やまとが、できること」3つ
  v5: スクショ指摘対応 — 折返し回避・カードに奥行き・ライム戦略
    - 全カードに lime top stripe 4px(やまとの売り signal)
    - 数字 Oswald 400 (太め) + whitespace-nowrap
    - カードホバーで -translate-y-1 + 影濃く
    - prefix/num/unit を分離し折返しを防ぐ

  【フォント方針】和文ゴシック / 数字 font-oswald のみ。明朝禁止。
*/

const FOREST = "#486B00";
const ACCENT = "#A2C523";

type Point = {
  no: string;
  icon: LucideIcon;
  label: string;
  /** 大きく表示する数値部分(Oswald) */
  num: string;
  /** 数値の後に小さく付く単位(和文) */
  unit: string;
  sub: string;
  href: string;
};

const POINTS: readonly Point[] = [
  {
    no: "01",
    icon: Wallet,
    label: "つなぎ融資",
    num: "0",
    unit: "円",
    sub: "土地と建物をまとめて進めれば、30〜80万円程度の負担を抑えられます。",
    href: "#ch-questions",
  },
  {
    no: "02",
    icon: MapPin,
    label: "自社の土地",
    num: "500",
    unit: "万円〜",
    sub: "大和郡山市矢田町ほか、現在27区画公開中(常時150区画程度を保有)。",
    href: "#ch-questions",
  },
  {
    no: "03",
    icon: Users,
    label: "FP相談",
    num: "独立",
    unit: "",
    sub: "当社内ではなく、独立した立場の提携先FP事務所にご相談いただけます。",
    href: "#ch-questions",
  },
] as const;

export default function SellingPointsStrip() {
  return (
    <section className="relative bg-bg-primary border-y border-text-primary/10 py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <div className="flex items-baseline justify-between gap-4 mb-6 md:mb-8">
          <p
            className="text-[12px] md:text-[13px] tracking-[0.06em] font-bold"
            style={{ color: FOREST }}
          >
            資金計画で安心いただける3つのポイント。
          </p>
          <p className="font-oswald text-[10px] md:text-[11px] tracking-[0.18em] text-text-secondary uppercase">
            3つの強み
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {POINTS.map((p) => {
            const Icon = p.icon;
            // 数字 vs 漢字「独立」で表示の太さ・サイズを微調整
            const isKanjiValue = p.num === "独立";
            return (
              <a
                key={p.no}
                href={p.href}
                className="group relative bg-white border border-text-primary/12 p-6 md:p-7 pt-7 md:pt-8 flex flex-col transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:shadow-[0_22px_44px_-22px_rgba(43,43,43,0.22)] hover:border-text-primary/25 overflow-hidden"
              >
                {/* Lime top stripe — やまとの売りシグナル */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-1 transition-[height] duration-300 group-hover:h-1.5 motion-reduce:group-hover:h-1"
                  style={{ background: ACCENT }}
                />

                {/* Top row: 番号 + ラベル + アイコン */}
                <div className="flex items-start justify-between mb-5 md:mb-6">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-oswald tabular-nums leading-none"
                      style={{
                        fontWeight: 400,
                        fontSize: "clamp(20px, 1.8vw, 26px)",
                        color: "rgba(43,43,43,0.35)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.no}
                    </span>
                    <span className="text-[13px] md:text-[14px] tracking-[0.04em] text-text-secondary font-bold">
                      {p.label}
                    </span>
                  </div>
                  {/* Icon — 控えめなサイズで右上 */}
                  <span
                    className="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center transition-transform duration-[400ms] group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    style={{ background: ACCENT, color: FOREST }}
                    aria-hidden
                  >
                    <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
                  </span>
                </div>

                {/* 数値 — whitespace-nowrap で折返し防止 */}
                <div className="whitespace-nowrap leading-none">
                  {isKanjiValue ? (
                    <span
                      className="text-text-primary"
                      style={{
                        fontWeight: 700,
                        fontSize: "clamp(40px, 4.4vw, 64px)",
                        letterSpacing: "0.08em",
                        color: FOREST,
                      }}
                    >
                      {p.num}
                    </span>
                  ) : (
                    <>
                      <span
                        className="font-oswald tabular-nums"
                        style={{
                          fontWeight: 400,
                          fontSize: "clamp(48px, 5.4vw, 76px)",
                          letterSpacing: "-0.03em",
                          color: FOREST,
                        }}
                      >
                        {p.num}
                      </span>
                      {p.unit && (
                        <span
                          className="ml-1 text-text-primary font-bold"
                          style={{ fontSize: "clamp(18px, 1.6vw, 22px)" }}
                        >
                          {p.unit}
                        </span>
                      )}
                    </>
                  )}
                </div>

                <p className="mt-5 text-text-primary text-[13px] md:text-[14px] leading-[1.7] flex-1">
                  {p.sub}
                </p>

                <span
                  className="mt-5 inline-flex items-center gap-1 text-[12px] md:text-[13px] font-bold transition-colors"
                  style={{ color: FOREST }}
                >
                  詳しく
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    aria-hidden
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
