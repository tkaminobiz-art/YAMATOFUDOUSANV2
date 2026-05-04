"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { useCountUp } from "@/hooks/useCountUp";
import { Building2, MapPin, Users, Calendar, type LucideIcon } from "lucide-react";

/*
  ScaleBanner — 2026-04-30
  ---------------------------------------------------------------
  小林専務レビュー(2026-04-28)反映:
  「うちは600棟以上引き渡してる。実績が毎月増えていくのが見えたら絶対いい」
  「めちゃめちゃ量産やってはんねんな、って伝わるやん」

  方針:
  - "バーン" 配置 = 単独で大きく主役級。心拍ダッシュボード化はしない
  - 4つの数字を独立カードで並列(600棟/90区画/50組/14年)
  - HeroMagazine 直下に置き、Mechanism(理屈)に入る前に量産規模を刷り込む

  数字の出典:
  - 600棟以上: 専務発言(2026-04-28). 公式データ(memory/reference_yamato_official_data.md)に
    棟数記載なし。グループ会社/前身を含む累計の可能性あり。要内部確認。
  - 90区画以上: 公式(reference_yamato_official_data.md / 旧サイト companyinfo)
  - 50組以上: customer_voices_full.json と整合
  - 14年: 創立2011年11月30日(公式)。引継書の"1991年創業"は宅建免許(1)更新回数と
    矛盾するため、関連会社/前身の創業年と推測。実機の14年を維持。
*/

type Stat = {
  Icon: LucideIcon;
  value: string;
  unit: string;
  prefix?: string;
  label: string;
  sub?: string;
};

const STATS: readonly Stat[] = [
  {
    Icon: Building2,
    value: "600",
    unit: "棟",
    prefix: "累計",
    label: "以上のお引き渡し",
    sub: "奈良・京都南部で積み重ねた家づくり",
  },
  {
    Icon: MapPin,
    value: "90",
    unit: "区画",
    prefix: "累計分譲",
    label: "以上の自社分譲実績",
    sub: "土地の仕入れから、自社で。",
  },
  {
    Icon: Users,
    value: "50",
    unit: "組",
    prefix: "",
    label: "以上のお客様の声",
    sub: "原文に近い形で掲載しています。",
  },
  {
    Icon: Calendar,
    value: "14",
    unit: "年",
    prefix: "",
    label: "の家づくり実績",
    sub: "2011年創立、奈良・京都南部一筋。",
  },
];

function CountUpNumber({ value }: { value: string }) {
  // value は "600" 等の数値文字列を想定。3桁ごとカンマ区切りで表示。
  const target = Number(value.replace(/[,\s]/g, ""));
  const { value: current, ref } = useCountUp(target, { duration: 1800 });
  return (
    <span
      ref={ref}
      // aria-label に target を固定 — カウント中の中間値(45, 89, ...)を
      // 連呼せず、screen reader は target を一度だけ読む。
      // 周囲のテキスト(prefix/unit/label)が文脈を補う。
      aria-label={target.toLocaleString()}
      className="text-text-primary tabular-nums"
      style={{
        fontFamily: "var(--font-oswald)",
        fontWeight: 500,
        fontSize: "clamp(64px, 9vw, 132px)",
        letterSpacing: "-0.02em",
        lineHeight: 0.85,
      }}
    >
      {current.toLocaleString()}
    </span>
  );
}

export default function ScaleBanner() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      aria-label="やまと不動産の実績"
      className="relative w-full bg-bg-primary border-y border-[var(--color-border)]"
    >
      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto px-[var(--page-px)] py-14 md:py-20 lg:py-24 scroll-in"
      >
        {/* セクションラベル — 英語は装飾、意味は右側の日本語が持つ */}
        <div className="flex items-baseline gap-3 mb-10 md:mb-14">
          <p
            aria-hidden="true"
            className="font-section-label text-lime-deep text-xs md:text-sm tracking-[0.18em]"
          >
            TRACK RECORD
          </p>
          <span aria-hidden className="flex-1 h-px bg-[var(--color-border)]" />
          <p className="text-text-secondary text-[11px] md:text-xs tracking-[0.08em]">
            地域で積み重ねてきた実績です。
          </p>
        </div>

        {/* 4つの数字 — アイコン付きカード */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-8 lg:gap-x-10">
          {STATS.map((stat) => {
            const Icon = stat.Icon;
            return (
              <li
                key={stat.label}
                className="flex flex-col items-start scroll-in"
              >
                {/* アイコン — 小さく、タイトル前に */}
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full mb-4"
                  style={{
                    background: "rgba(162, 197, 35, 0.12)",
                    color: "#486B00",
                  }}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.6} />
                </span>

                {stat.prefix && (
                  <span className="text-text-secondary text-[10px] md:text-xs tracking-[0.12em] mb-2">
                    {stat.prefix}
                  </span>
                )}

                {/* 巨大数字 — Oswald で立たせる + 画面入域でカウントアップ
                    数字span に aria-label="600" を固定、unit は別 span として
                    そのまま読み上げ可。screen reader は「累計 600 棟 以上のお引き渡し」と読む。 */}
                <div className="flex items-baseline gap-2 leading-none mb-3">
                  <CountUpNumber value={stat.value} />
                  <span
                    className="text-text-primary"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "clamp(18px, 2vw, 26px)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {stat.unit}
                  </span>
                </div>

                {/* 説明 */}
                <p
                  className="text-text-primary text-[13px] md:text-sm leading-relaxed mb-1.5"
                  style={{ fontWeight: 500 }}
                >
                  {stat.label}
                </p>
                {stat.sub && (
                  <p className="text-text-secondary text-[11px] md:text-xs leading-relaxed">
                    {stat.sub}
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        {/* 締めの一行 — 「会社案内じゃなく、実績で語る」トーン */}
        <p className="mt-14 md:mt-20 text-text-secondary text-[12px] md:text-sm tracking-[0.04em] text-right">
          ※ 公開時点の累計実績です。お引き渡し棟数は関連会社・前身を含む累計値の場合があります。
        </p>
      </div>
    </section>
  );
}
