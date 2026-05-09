import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import LotsMapWrapper from "@/components/LotsMapWrapper";
import LotsBrowser from "@/components/LotsBrowser";
import LineLandFeedCta from "@/components/LineLandFeedCta";
import {
  getActiveLots,
  getArchivedLots,
  getMappableLots,
} from "@/data/lots";
import { Archive, ArrowDown, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "分譲地一覧 | やまと不動産",
  description:
    "やまと不動産が奈良・京都エリアで展開する自社分譲地の一覧。価格・駅徒歩・学校・スーパーまで一画面で検討できます。",
};

export default function LotsIndexPage() {
  const activeLots = getActiveLots();
  const archivedLots = getArchivedLots();
  const mappableLots = getMappableLots().filter((l) => Boolean(l.price));

  return (
    <>
      <Header />
      <main className="bg-[#F8F7F2]">
        <section className="relative overflow-hidden border-b border-[#DCD8CC] bg-[#F8F7F2]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.42]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,32,27,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,32,27,0.06) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="relative max-w-[1500px] mx-auto px-[var(--page-px)] pt-[clamp(72px,8vw,128px)] pb-[clamp(28px,5vw,72px)]">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div className="max-w-[640px]">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-main">
                  Lots / Nara / Kyoto South
                </p>
                <h1 className="mb-6 text-[clamp(34px,4.7vw,72px)] leading-[1.12] text-[#191A16] [font-family:var(--font-zen-old)]">
                  奈良で、
                  <br />
                  暮らしから選ぶ
                  <br />
                  分譲地。
                </h1>
                <p className="mb-7 max-w-[520px] text-[14px] leading-[2] text-[#4D4B43] md:text-[15px]">
                  価格だけで決めない。駅までの距離、学校、買い物、通勤時間まで並べて、
                  家族の毎日から土地を選ぶための一覧です。
                </p>
                <div className="mb-7 grid grid-cols-2 border-y border-[#25251E]/15">
                  {[
                    ["公開中", activeLots.length, "区画"],
                    ["地図表示", mappableLots.length, "件"],
                  ].map(([label, value, unit]) => (
                    <div key={label} className="py-4 pr-4">
                      <p className="mb-1 text-[10px] font-semibold tracking-[0.12em] text-[#747064]">
                        {label}
                      </p>
                      <p className="flex items-baseline gap-1 text-[#191A16]">
                        <span className="tabular-nums text-[clamp(30px,4vw,52px)] leading-none [font-family:var(--font-oswald)]">
                          {value}
                        </span>
                        <span className="text-[11px]">{unit}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#lots-browser"
                    className="inline-flex items-center justify-center gap-2 rounded bg-[#1F2D14] px-6 py-3.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    条件から探す
                    <ArrowDown className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                  <a
                    href="#map"
                    className="inline-flex items-center justify-center gap-2 rounded border border-[#1F2D14]/25 bg-white/55 px-6 py-3.5 text-[13px] font-semibold text-[#1F2D14] transition-colors hover:bg-white"
                  >
                    <MapPin className="h-4 w-4" strokeWidth={1.8} />
                    地図を見る
                  </a>
                </div>
              </div>

              <div id="map" className="scroll-mt-24">
                <div className="rounded-[8px] border border-[#2B2B24]/15 bg-[#FCFBF7] p-2 shadow-[0_24px_80px_rgba(31,29,22,0.12)]">
                  <div className="mb-2 flex items-center justify-between gap-3 px-3 pt-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-main">
                        Live Map
                      </p>
                      <h2 className="text-[15px] leading-[1.5] text-[#191A16]">
                        地図から候補地を比較
                      </h2>
                    </div>
                    <Link
                      href="/lots/archive"
                      className="hidden items-center gap-1.5 text-[12px] font-medium text-[#4D4B43] transition-opacity hover:opacity-70 sm:inline-flex"
                    >
                      <Archive className="h-3.5 w-3.5" strokeWidth={1.6} />
                      実績 {archivedLots.length}区画
                    </Link>
                  </div>
                  <LotsMapWrapper lots={mappableLots} />
                </div>
                {mappableLots.length < activeLots.length && (
                  <p className="mt-3 text-[11px] leading-[1.7] text-[#747064]">
                    地図上に表示されるのは座標取得できた {mappableLots.length} 件です。販売中 {activeLots.length} 件の全件は下の一覧で確認できます。
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <LotsBrowser lots={activeLots} />

        <div id="line-land-feed">
          <LineLandFeedCta variant="editorial" />
        </div>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
