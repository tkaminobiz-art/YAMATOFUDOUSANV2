"use client";

import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { MapPin } from "lucide-react";
import { LOTS, getActiveLots } from "@/data/lots";

/*
  LotsSection — 2026-05-03 v5 (AREAマップ + チップ型・参考画像準拠)
  ---------------------------------------------------------------
  v4: 6カード写真ドミナントグリッド + エリア注記
  v5: 左にコピー、右にエリアチップ群(主な対応エリア)
      → 「奈良・京都南部一帯で動いている会社」感を1画面で俯瞰
      → 詳細物件は /lots ページに誘導(Progressive Disclosure)
      → 旧6カードは /lots ページの最上部で十分

  AREA_GROUPS は手動で整理:
   - 奈良市・大和郡山市等の主要市町村を上位
   - 「ほか周辺エリア」で誘導
*/

const FOREST = "#486B00";

const AREA_GROUPS: readonly string[] = [
  "奈良市",
  "大和郡山市",
  "生駒市",
  "橿原市",
  "天理市",
  "桜井市",
  "斑鳩町",
  "田原本町",
  "京田辺市",
  "京都市",
  "木津川市",
  "長岡京市",
];

export default function LotsSection() {
  const ref = useScrollIn<HTMLDivElement>(true);
  const activeCount = getActiveLots().length;

  return (
    <section
      id="lots"
      ref={ref}
      className="relative bg-white text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 lg:gap-20 items-start">
          {/* 左: コピー + 説明 + CTA */}
          <div>
            <p
              className="text-[11px] md:text-[12px] tracking-[0.06em] mb-3"
              style={{ color: FOREST, fontWeight: 700 }}
            >
              対応エリア
            </p>
            <h2
              className="text-text-primary leading-[1.3] tracking-[0.005em]"
              style={{
                fontWeight: 500,
                fontSize: "clamp(22px, 2.8vw, 38px)",
              }}
            >
              奈良県を中心に、
              <br className="hidden md:block" />
              幅広いエリアで対応。
            </h2>
            <p className="mt-5 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[480px]">
              地域を知り尽くした家づくり。土地探しから建物まで、まとめてご相談ください。
            </p>

            <div className="flex items-baseline gap-2 mt-8 mb-6">
              <span
                className="tabular-nums leading-none"
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontWeight: 300,
                  fontSize: "clamp(48px, 6vw, 84px)",
                  color: "#A2C523",
                  letterSpacing: "-0.03em",
                }}
              >
                {activeCount}
              </span>
              <span
                className="text-text-primary text-[14px] md:text-[16px] font-medium"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                区画 公開中
              </span>
              <span className="text-text-secondary text-[11px] ml-2">
                / 常時150区画程度を保有
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
              <Link
                href="/lots"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] md:text-[15px] font-medium rounded transition-opacity hover:opacity-90"
                style={{ background: FOREST, color: "#fff" }}
              >
                対応エリアを詳しく見る
              </Link>
              <Link
                href="/lots#map"
                className="inline-flex items-center gap-1.5 text-text-primary text-[13px] md:text-[14px] font-medium hover:opacity-70 transition-opacity"
              >
                地図から探す
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* 右: エリアチップ群 + ヒント */}
          <div>
            <div
              className="rounded-lg border border-border p-6 md:p-8 lg:p-10"
              style={{ background: "rgba(162, 197, 35, 0.05)" }}
            >
              <p
                className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-5"
                style={{ color: FOREST, fontWeight: 600 }}
              >
                主な対応エリア
              </p>
              <div className="flex flex-wrap gap-2 md:gap-2.5">
                {AREA_GROUPS.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white border border-border rounded-full text-[12px] md:text-[13px] text-text-primary"
                  >
                    <MapPin
                      className="w-3 h-3"
                      style={{ color: FOREST }}
                      strokeWidth={1.6}
                    />
                    {area}
                  </span>
                ))}
                <span className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 text-text-secondary text-[12px] md:text-[13px]">
                  ほか周辺エリア
                </span>
              </div>
              <p className="text-text-secondary text-[11px] md:text-[12px] mt-6 leading-[1.85]">
                ※ エリア外でも対応可能な場合がございます。お気軽にご相談ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
