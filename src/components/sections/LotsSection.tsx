"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import { LOTS, getCities } from "@/data/lots";

/*
  LotsSection — 2026-04-21 全面リニューアル(Plan A 継承)
  -----------------------------------------------------------------
  旧: 211行 / 左 01/02/03 リスト(「このセクションで分かること」)+
       右 6カード + エリアピル(独立ブロック)+ gridline 背景 /
       CTA 3個(分譲地一覧 / 予約 / 設計自由度を見る)

  新: 約140行 / 暖白#FAF8F3 (Mechanism〜Freedom と連続) /
       非対称ヘッダー(1.4fr:1fr) / 90区画の数字を右カラム上に組込 /
       6カード写真ドミナント 3×2 / エリアは注記テキスト化 / CTA 2個

  ユーザー心理: 「奈良のどこ? 学校・通勤は?」への回答

  神野さん方針(継承):
  - 「土地と建物、セットでお任せください」が真のUSP
  - 「土地だけ相談OK」は訴求しない
  - 学校区検索はデータ依存のため柔らかい訴求(通学範囲・通勤経路)
  - 「時期により広告に出していない物件も」注記
*/

export default function LotsSection() {
  const ref = useScrollIn<HTMLDivElement>(true);
  const cities = getCities().slice(0, 8);
  // トップで紹介する6件(写真がある順)
  const featured = LOTS.filter((l) => l.photos.length > 0).slice(0, 6);

  return (
    <section
      id="lots"
      ref={ref}
      className="relative overflow-hidden bg-[#FAF8F3] text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ================= HEADER (非対称) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
          {/* Left: 看板 */}
          <div>
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
              Lots
            </p>
            <h2
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              土地も、
              <br />
              やまとでお探しします。
            </h2>
          </div>

          {/* Right: 90区画 数字 + LEAD */}
          <aside className="lg:pt-4">
            {/* 区画数アイキャッチ */}
            <div className="flex items-baseline gap-3 mb-7 md:mb-9">
              <span
                className="font-oswald text-text-primary leading-[0.85] tabular-nums"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(56px, 7vw, 100px)",
                  letterSpacing: "-0.03em",
                }}
              >
                {LOTS.length}
              </span>
              <span
                className="font-shippori text-text-primary/75 pb-2"
                style={{ fontWeight: 500, fontSize: "clamp(14px, 1.1vw, 17px)" }}
              >
                区画の分譲実績
              </span>
            </div>

            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                奈良・京都で、90区画を<br />分譲してきました。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] max-w-[480px] text-text-primary/90">
                通学・通勤・ご実家距離まで、
                <br />
                一緒に考えます。
              </p>
            </div>
          </aside>
        </div>

        {/* ================= 6カード 写真ドミナント 3×2 ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {featured.map((lot) => (
            <Link
              key={lot.id}
              href={`/lots/${lot.id}`}
              className="group relative aspect-[4/3] overflow-hidden border border-text-primary/10 bg-text-primary transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.15)]"
            >
              <Image
                src={lot.photos[0]}
                alt={lot.title}
                fill
                className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 50vw, 33vw"
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
                  className="font-shippori text-white line-clamp-2 leading-[1.4]"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(14px, 1.05vw, 17px)",
                  }}
                >
                  {lot.title.replace(/[〜～].*$/, "")}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ================= 対応エリア 注記化 ================= */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-text-primary/15">
          <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6">
            <p className="font-inter shrink-0 text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary font-bold">
              主な対応エリア
            </p>
            <p className="font-shippori text-text-primary/85 text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[62rem]">
              {cities.map((c, i) => (
                <span key={c.city}>
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
          <p className="font-shippori text-[11px] md:text-[12px] leading-[1.9] text-text-secondary mt-4">
            ※ 時期により、広告に出していない物件もあります。
          </p>
        </div>

        {/* ================= 注記 + CTA ================= */}
        <div className="mt-14 md:mt-20 flex flex-col gap-8 pt-10 border-t border-text-primary/15 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-12">
          <p className="font-shippori max-w-[44rem] text-[clamp(13px,1vw,15px)] leading-[1.95] text-text-secondary">
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
