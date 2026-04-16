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
    <section className="relative overflow-hidden bg-bg-secondary py-[var(--section-py)]">
      {/* 紙面のような極薄グリッド（A案：装飾より編集） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.33]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,43,43,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,43,43,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
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
              土地から建物、その先のお手入れまで。すべて、当社が承ります。
            </p>
            <p className="text-text-secondary text-[clamp(14px,1vw,16px)] leading-relaxed">
              通学範囲、通勤経路、ご実家との距離。気がかりなことを、すべてお聞かせください。
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

        {/* ===== A案：編集の見開き（同型3カードを捨てる） ===== */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-main">
                FEATURE
              </p>
              <p
                className="mt-4 text-[clamp(22px,2.8vw,34px)] font-semibold leading-[1.45] tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                土地から、暮らしまで。
              </p>
              <p className="mt-4 text-[13px] leading-[1.95] text-text-secondary md:text-[14px]">
                「このあたりで建てたい」を、現地の感触から一緒に詰めていきます。気に入った土地が見つかったら、建物の段取りまで一気に繋げます。
              </p>

              <div className="mt-7 border-y border-border py-6">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                  このセクションで分かること
                </p>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-text-secondary md:text-[15px]">
                  {[
                    "奈良・京都の分譲地を、写真付きでざっと見渡せます。",
                    "ご希望のエリア条件（学校・駅・実家距離など）を前提に探せます。",
                    "土地と建物をまとめて進められるため、条件次第で余計な金融コストを抑えられることがあります。",
                  ].map((t, i) => (
                    <li key={t} className="flex gap-4">
                      <span
                        className="mt-0.5 shrink-0 font-medium tabular-nums text-main/80"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[11px] leading-relaxed text-text-secondary">
                  ※ 時期により、広告に出していない物件もあります。
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {featured.map((lot) => (
                  <Link
                    key={lot.id}
                    href={`/lots/${lot.id}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-primary card-shadow"
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

              <div className="mt-6 rounded-2xl border border-border bg-bg-primary p-5 md:p-6">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                  主な対応エリア
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <span
                      key={c.city}
                      className="inline-flex items-baseline gap-1.5 rounded-full border border-border bg-bg-secondary/60 px-4 py-2 text-sm"
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
                  <span className="inline-flex items-center px-2 py-2 text-text-secondary text-sm">
                    ほか
                  </span>
                </div>
              </div>
            </div>
          </div>
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
