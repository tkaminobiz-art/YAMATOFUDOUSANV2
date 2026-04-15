import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import LotsMapWrapper from "@/components/LotsMapWrapper";
import { LOTS, getCities, getMappableLots } from "@/data/lots";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "分譲地一覧 | やまと不動産",
  description:
    "やまと不動産が奈良・京都エリアで展開する自社分譲地の一覧。土地と建物をセットでご提案します。",
};

export default function LotsIndexPage() {
  const cities = getCities();
  const mappableLots = getMappableLots();

  return (
    <>
      <Header />
      <main>
        <section className="bg-bg-warm py-[clamp(64px,calc(32px+5vw),160px)]">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              LOTS
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="max-w-[640px]">
                <h1 className="text-[clamp(28px,4vw,56px)] text-text-primary mb-4">
                  自社分譲地
                </h1>
                <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
                  奈良・京都エリアで、当社が開発・分譲した土地の実績です。土地と建物をセットでご提案しているので、つなぎ融資の負担もかかりません。
                </p>
              </div>
              <div
                className="text-right"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="text-accent font-light text-6xl md:text-8xl block leading-none">
                  {LOTS.length}
                </span>
                <span className="text-text-secondary text-xs md:text-sm">
                  区画の実績
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* インタラクティブマップ */}
        <section className="py-[clamp(32px,4vw,64px)] bg-bg-primary border-b border-border">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
              <div>
                <p className="font-section-label text-main text-xs md:text-sm mb-2 tracking-[0.15em]">
                  MAP
                </p>
                <h2 className="text-text-primary text-lg md:text-xl leading-[1.5]">
                  地図で見る、分譲地の場所。
                </h2>
              </div>
              <p className="text-text-secondary text-xs">
                ピンをタップすると物件情報が表示されます
              </p>
            </div>
            <LotsMapWrapper lots={mappableLots} />
            {mappableLots.length < LOTS.length && (
              <p className="text-text-secondary text-[11px] mt-3">
                ※ 地図上に表示されるのは座標取得できた {mappableLots.length} 区画です。全 {LOTS.length} 区画は下の一覧をご覧ください。
              </p>
            )}
          </div>
        </section>

        {/* 市町村別カウンター */}
        <section className="py-[clamp(32px,4vw,64px)] bg-bg-primary border-b border-border">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <p className="text-text-secondary text-xs md:text-sm mb-4">
              対応エリア
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {cities.map((c) => (
                <span
                  key={c.city}
                  className="inline-flex items-baseline gap-1.5 text-sm"
                >
                  <span className="text-text-primary font-medium">
                    {c.city}
                  </span>
                  <span
                    className="text-main text-xs"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                    }}
                  >
                    {c.count}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 一覧グリッド */}
        <section className="py-[var(--section-py)] bg-bg-primary">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
              {LOTS.map((lot) => (
                <Link
                  key={lot.id}
                  href={`/lots/${lot.id}`}
                  className="group block bg-bg-primary rounded-lg overflow-hidden card-shadow transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] bg-bg-secondary overflow-hidden">
                    {lot.photos[0] ? (
                      <Image
                        src={lot.photos[0]}
                        alt={lot.title}
                        fill
                        className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                        <MapPin className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-bg-primary/95 backdrop-blur-sm rounded px-2.5 py-1">
                      <span className="text-main text-[10px] font-medium tracking-wider">
                        {lot.city}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <h2
                      className="text-text-primary text-base md:text-lg mb-2 group-hover:text-main transition-colors line-clamp-2"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {lot.title}
                    </h2>
                    {lot.fields["所在地"] && (
                      <p className="text-text-secondary text-xs leading-relaxed mb-2 line-clamp-1">
                        {lot.fields["所在地"]}
                      </p>
                    )}
                    {lot.fields["交通"] && (
                      <p className="text-text-secondary text-xs leading-relaxed line-clamp-1">
                        {lot.fields["交通"]}
                      </p>
                    )}
                    <p className="text-main text-xs font-medium mt-3">
                      詳細を見る →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg-warm py-[clamp(48px,6vw,120px)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <h2 className="text-[clamp(20px,2.5vw,32px)] text-text-primary mb-4">
              気になる分譲地はありましたか。
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-[1.9] mb-8">
              現在販売中の分譲地については、お問い合わせください。非公開物件のご案内もあります。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="来店予約"
                sublabel="ご予約不要・無料"
              />
              <CtaButton
                href="/contact"
                variant="secondary"
                size="md"
                label="資料請求"
                sublabel="無料・1分で完了"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
