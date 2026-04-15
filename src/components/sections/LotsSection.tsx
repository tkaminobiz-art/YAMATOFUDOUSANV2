"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import { LOTS, getCities } from "@/data/lots";

/*
  Lots セクション — 2026-04-15 リニューアル版
  神野さんの方針:
  - 「土地と建物、セットでお任せください」をやまとの真のUSPに
  - 「土地だけ相談OK」は訴求しない（やまとは土地セットの会社として認識されたい）
  - 学校区検索は地図データ依存のため、柔らかい訴求（通学範囲・通勤経路）に留める
  - 「時期により広告に出していない物件も」を注記
  - 「つなぎ融資なし」の伏線もここで張る
*/

export default function LotsSection() {
  const ref = useScrollIn<HTMLDivElement>(true);
  const cities = getCities().slice(0, 8);
  // トップで紹介する6件（写真がある順）
  const featured = LOTS.filter((l) => l.photos.length > 0).slice(0, 6);

  return (
    <section className="bg-bg-secondary py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ===== ヘッダー ===== */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
          <div className="max-w-[720px]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              LOTS
            </p>
            <h2
              className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-5 leading-[1.5]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              まず、土地の話から。
            </h2>
            <p className="text-text-primary text-[clamp(16px,1.2vw,19px)] leading-relaxed mb-3">
              土地探しから建物まで、ひとつの窓口でご相談ください。
            </p>
            <p className="text-text-secondary text-[clamp(14px,1vw,16px)] leading-relaxed">
              通学範囲・通勤経路・実家との距離。気になること、全部お聞かせください。
            </p>
          </div>
          <div
            className="text-right"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <span className="text-main font-light text-6xl md:text-7xl block leading-none">
              {LOTS.length}
            </span>
            <span className="text-text-secondary text-xs md:text-sm">
              区画の分譲実績
            </span>
          </div>
        </div>

        {/* ===== 3つの訴求 ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--card-gap)] mb-12 md:mb-16">
          <div className="scroll-in bg-bg-primary rounded-lg p-[clamp(20px,2.5vw,32px)] card-shadow">
            <p className="font-section-label text-main text-[10px] mb-3 tracking-[0.15em]">
              01
            </p>
            <h3
              className="text-text-primary text-base md:text-lg mb-3 leading-[1.5] font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              奈良・京都で、常時ご案内できる土地。
            </h3>
            <p className="text-text-secondary text-sm leading-[1.9]">
              自社分譲90区画以上の実績。時期により、広告に出していない土地もあります。
            </p>
          </div>

          <div className="scroll-in bg-bg-primary rounded-lg p-[clamp(20px,2.5vw,32px)] card-shadow">
            <p className="font-section-label text-main text-[10px] mb-3 tracking-[0.15em]">
              02
            </p>
            <h3
              className="text-text-primary text-base md:text-lg mb-3 leading-[1.5] font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              ご希望エリアから、一緒にお探しします。
            </h3>
            <p className="text-text-secondary text-sm leading-[1.9]">
              「この小学校の近くで」「駅徒歩◯分以内で」。具体的なご要望、お聞かせください。
            </p>
          </div>

          <div className="scroll-in bg-bg-primary rounded-lg p-[clamp(20px,2.5vw,32px)] card-shadow border-l-2 border-main">
            <p className="font-section-label text-main text-[10px] mb-3 tracking-[0.15em]">
              03
            </p>
            <h3
              className="text-text-primary text-base md:text-lg mb-3 leading-[1.5] font-medium"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              土地と建物、一社完結。
            </h3>
            <p className="text-text-secondary text-sm leading-[1.9]">
              つなぎ融資の負担なし。手続きも、打ち合わせも、ひとつの窓口で完結します。
            </p>
          </div>
        </div>

        {/* ===== 対応エリアピル ===== */}
        <div className="mb-8">
          <p className="text-text-secondary text-xs mb-3 tracking-wider">
            主な対応エリア
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <span
                key={c.city}
                className="inline-flex items-baseline gap-1.5 bg-bg-primary rounded-full px-4 py-2 text-sm"
              >
                <span className="text-text-primary">{c.city}</span>
                <span
                  className="text-main text-[10px]"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {c.count}
                </span>
              </span>
            ))}
            <span className="inline-flex items-center px-4 py-2 text-text-secondary text-sm">
              ほか
            </span>
          </div>
        </div>

        {/* ===== 代表6件グリッド ===== */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
          {featured.map((lot) => (
            <Link
              key={lot.id}
              href={`/lots/${lot.id}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden card-shadow block"
            >
              <Image
                src={lot.photos[0]}
                alt={lot.title}
                fill
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin
                    className="w-3 h-3 text-white/80 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-white/80 text-[10px] md:text-xs font-medium">
                    {lot.city}
                  </span>
                </div>
                <p className="text-white text-xs md:text-sm font-medium line-clamp-2">
                  {lot.title.replace(/[〜～].*$/, "")}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== CTA ===== */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <CtaButton
            href="/lots"
            variant="secondary"
            size="md"
            label={`分譲地一覧を見る（${LOTS.length}件）`}
          />
          <CtaButton
            href="/reserve"
            variant="primary"
            size="md"
            label="土地の相談を予約する"
          />
        </div>
      </div>
    </section>
  );
}
