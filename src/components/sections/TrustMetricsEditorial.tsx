import { Home, MapPin, Users, Calendar } from "lucide-react";

/*
  TrustMetricsEditorial — 2026-05-08 v1
  ---------------------------------------------------------------
  Hero 直下の「静かな実績帯」。営業資料風にしない。
  - 高さ目安 112〜132px
  - 背景は Hero と同系色 (ペーパー白 #F4EFE6)
  - 4 カラム / 細い区切り線
  - 数字は上品に大きく / Oswald
  - アイコンは小さく薄く / 装飾的に主張しない
  - 数値は BRAND-TRUTH §2 に準拠 (引渡し 600棟以上 / 分譲 90区画以上 /
    お客様の声 50組以上 / 業歴 14年)

  従来の ScaleBanner との違い:
  - ScaleBanner は背景バーン演出 + アイコン + ラベル付きの主役級ビジュアル
  - 本コンポーネントは Hero 直下の "余韻" を作る静かな帯。Hero の世界観を切らない
*/

type Metric = {
  Icon: typeof Home;
  value: string;
  unit: string;
  label: string;
};

const METRICS: readonly Metric[] = [
  { Icon: Home,     value: "600", unit: "棟以上",   label: "地域で積み重ねた施工実績" },
  { Icon: MapPin,   value: "90",  unit: "区画以上", label: "分譲地・土地探しにも対応" },
  { Icon: Users,    value: "50",  unit: "組以上",   label: "お客様の声を掲載" },
  { Icon: Calendar, value: "14",  unit: "年",       label: "奈良・京都南部での家づくり" },
];

export default function TrustMetricsEditorial() {
  return (
    <section
      aria-label="やまと不動産の実績"
      className="bg-[#F4EFE6] border-y border-[#DED8C8]/80"
    >
      <div className="mx-auto max-w-[1400px] px-[var(--page-px)]">
        <ul className="grid grid-cols-2 md:grid-cols-4">
          {METRICS.map((m, i) => {
            const Icon = m.Icon;
            const isFirstCol = i % 2 === 0;
            const isTopRow = i < 2;
            return (
              <li
                key={m.label}
                className={[
                  "flex items-center gap-4 py-7 md:py-8 px-2 md:px-6",
                  // md+ は左境界線を 2 番目以降に
                  i > 0 ? "md:border-l md:border-[#DED8C8]/70" : "",
                  // mobile 2x2 グリッドの境界線
                  isFirstCol ? "border-r border-[#DED8C8]/70 md:border-r-0" : "",
                  isTopRow ? "border-b border-[#DED8C8]/70 md:border-b-0" : "",
                ].join(" ")}
              >
                <Icon
                  className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] text-[#5E5A50]/70 shrink-0"
                  strokeWidth={1.5}
                />
                <div>
                  <div className="flex items-baseline gap-1 text-[#1A1815]">
                    <span
                      className="font-light leading-none"
                      style={{
                        fontFamily: "var(--font-oswald)",
                        fontSize: "clamp(24px, 2.6vw, 32px)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {m.value}
                    </span>
                    <span className="text-[12.5px] md:text-[13px]">{m.unit}</span>
                  </div>
                  <p className="mt-1 text-[11px] md:text-[11.5px] tracking-[0.02em] text-[#5E5A50] leading-relaxed">
                    {m.label}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
