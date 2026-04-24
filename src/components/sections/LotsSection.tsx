"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import { LOTS, getCities } from "@/data/lots";

/*
  LotsSection — 2026-04-24 v4 (TOP 限定ブランディング画像)
  ---------------------------------------------------------------
  v3 までは lots.json の実物件写真 lot.photos[0] を TOP カードにそのまま使用。
  実物件写真は生活感が強く、TOP の見栄えがばらつく課題があった。

  v4: TOP の 6 カードのみ、専用のブランディング画像 HERO_PHOTOS に差し替え。
  - /lots 一覧ページ / /lots/[id] 詳細ページは従来の実物件写真を維持
  - 画像は /public/images/lots-hero/lot-hero-01〜06.webp (1200×900 WebP / 4:3)
  - city ラベルと link 先は従来通り実物件データから生成
*/

// TOP セクション専用のブランディング画像 (6 枚、4:3 固定)
// 各画像の alt は画面内の city ラベルと補完関係。誇大表記を避けるため
// "分譲地イメージ" と明示して、実物件写真と区別する
const HERO_PHOTOS: readonly string[] = [
  "/images/lots-hero/lot-hero-01.webp",
  "/images/lots-hero/lot-hero-02.webp",
  "/images/lots-hero/lot-hero-03.webp",
  "/images/lots-hero/lot-hero-04.webp",
  "/images/lots-hero/lot-hero-05.webp",
  "/images/lots-hero/lot-hero-06.webp",
] as const;

export default function LotsSection() {
  const ref = useScrollIn<HTMLDivElement>(true);
  const cities = getCities().slice(0, 8);
  const featured = LOTS.filter((l) => l.photos.length > 0).slice(0, 6);

  return (
    <section
      id="lots"
      ref={ref}
      className="relative overflow-hidden bg-bg-secondary text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            土地も、<br className="sm:hidden" />やまとでお探しします。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[680px]">
            奈良・京都で、
            <span className="font-bold text-lime-deep nowrap">{LOTS.length}区画</span>
            を分譲してきました。
            <br />
            通学・通勤・ご実家距離まで、一緒に考えます。
          </p>
        </header>

        {/* ========== 6カード 写真ドミナント 3×2
            画像は HERO_PHOTOS(TOPブランディング専用)、テキストは lot データから */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {featured.map((lot, i) => (
            <Link
              key={lot.id}
              href={`/lots/${lot.id}`}
              className="group relative aspect-[4/3] overflow-hidden border border-text-primary/10 bg-text-primary transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.15)]"
            >
              <Image
                src={HERO_PHOTOS[i % HERO_PHOTOS.length]}
                alt={`${lot.city}の分譲地イメージ`}
                fill
                className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 50vw, 33vw"
                priority={i < 2}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MapPin
                    className="w-3.5 h-3.5 text-white/80 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-inter text-white/80 text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-bold">
                    {lot.city}
                  </span>
                </div>
                <p
                  className="font-sans text-white line-clamp-2 leading-[1.4]"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(13px, 1vw, 16px)",
                  }}
                >
                  {lot.title.replace(/[〜～].*$/, "")}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ========== 対応エリア 注記化 ========== */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-text-primary/15">
          <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6">
            <p className="font-inter shrink-0 text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-lime-deep font-bold">
              Areas · 主な対応エリア
            </p>
            <p className="font-sans text-text-primary/85 text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[62rem]">
              {cities.map((c, i) => (
                <span key={c.city} className="nowrap">
                  {c.city}
                  <span className="font-inter text-text-secondary/70 text-[0.85em] mx-[3px]">
                    {c.count}
                  </span>
                  {i < cities.length - 1 && (
                    <span className="text-text-primary/25 mx-1">／</span>
                  )}
                </span>
              ))}
              <span className="text-text-secondary"> ほか</span>
            </p>
          </div>
          <p className="font-sans text-[11px] md:text-[12px] leading-[1.9] text-text-secondary mt-4">
            ※ 時期により、広告に出していない物件もあります。
          </p>
        </div>

        {/* ========== 注記 + CTA ========== */}
        <div className="mt-12 md:mt-16 flex flex-col gap-8 pt-10 border-t border-text-primary/15 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-12">
          <p className="font-sans max-w-[44rem] text-[clamp(13px,1vw,15px)] leading-[1.95] text-text-secondary">
            土地が決まれば、次は「どう暮らすか」を考えます。
            <br />
            土地と建物をまとめれば、余計な金融コストも抑えられます。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end shrink-0">
            <CtaButton
              href="/lots"
              variant="secondary"
              size="md"
              label={`分譲地一覧を見る(${LOTS.length}件)`}
              sublabel="写真付きで全件"
            />
            <CtaButton
              href="/reserve"
              variant="primary"
              size="md"
              label="土地の相談を予約"
              sublabel="初回のご相談は無料です"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
