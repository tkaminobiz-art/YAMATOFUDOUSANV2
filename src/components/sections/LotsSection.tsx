"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import { LOTS, getCities } from "@/data/lots";

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
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
          <div className="max-w-[640px]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              LOTS
            </p>
            <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
              土地も、当社がご用意しています。
            </h2>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
              奈良・京都エリアで自社分譲を続けて14年。土地探しから家づくりまで、ワンストップでご提案します。
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

        {/* 対応エリアピル */}
        <div className="flex flex-wrap gap-2 mb-8">
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

        {/* 代表6件グリッド */}
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

        <div className="text-center">
          <div className="inline-flex">
            <CtaButton
              href="/lots"
              variant="secondary"
              size="md"
              label={`分譲地一覧を見る（${LOTS.length}件）`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
