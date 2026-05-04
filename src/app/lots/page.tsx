import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import LotsMapWrapper from "@/components/LotsMapWrapper";
import LotsBrowser from "@/components/LotsBrowser";
import LineLandFeedCta from "@/components/LineLandFeedCta";
import {
  getActiveLots,
  getArchivedLots,
  getMappableLots,
} from "@/data/lots";
import { Archive } from "lucide-react";

const FOREST = "#486B00";
const ACCENT = "#A2C523";

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
      <main className="bg-white">
        {/* === Photo-led Editorial Soft Hero (2026-05-03 全ページ統一・参考画像準拠) === */}
        <section className="relative w-full overflow-hidden bg-white">
          <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
            <Image
              src="/images/lots-hero/lot-hero-01.webp"
              alt="やまと不動産の自社分譲地"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ filter: "saturate(0.96) contrast(1.02)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 35%, rgba(255,255,255,0.20) 65%, transparent 95%)",
              }}
            />

            <div className="absolute inset-0 flex items-end md:items-center">
              <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] pb-10 md:pb-0 w-full">
                <div className="max-w-[640px]">
                  <p
                    className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase mb-5"
                    style={{ color: FOREST, fontWeight: 600 }}
                  >
                    分譲地 · Lots
                  </p>

                  <h1
                    className="text-text-primary leading-[1.25] tracking-[-0.005em] mb-7"
                    style={{
                      fontWeight: 500,
                      fontSize: "clamp(26px, 3.6vw, 48px)",
                    }}
                  >
                    土地の価格・駅距離・周辺環境を、
                    <br />
                    まとめて確認できます。
                  </h1>

                  {/* 数字 */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span
                      className="tabular-nums leading-none"
                      style={{
                        fontFamily: "var(--font-oswald)",
                        fontWeight: 300,
                        fontSize: "clamp(64px, 9vw, 128px)",
                        color: ACCENT,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {activeLots.length}
                    </span>
                    <span
                      className="text-text-primary text-[14px] md:text-[18px] font-medium leading-none ml-1.5 self-end pb-1 md:pb-2.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      区画 公開中
                    </span>
                  </div>

                  <p className="text-text-primary/85 text-[13px] md:text-[15px] leading-[1.95] mb-8 max-w-[520px]">
                    価格・駅徒歩・小学校・スーパーまで、暮らしの条件で絞り込めます。土地と建物をまとめることで、費用の見通しも立てやすくなります。
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                    <a
                      href="#map"
                      className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] md:text-[15px] font-medium rounded transition-opacity hover:opacity-90"
                      style={{ background: FOREST, color: "#fff" }}
                    >
                      地図から探す
                    </a>
                    <Link
                      href="/lots/archive"
                      className="inline-flex items-center gap-1.5 text-text-primary text-[13px] md:text-[14px] font-medium hover:opacity-70 transition-opacity"
                    >
                      <Archive className="w-3.5 h-3.5" strokeWidth={1.6} />
                      過去の分譲実績{" "}
                      <span
                        className="tabular-nums"
                        style={{
                          fontFamily: "var(--font-oswald)",
                          fontWeight: 500,
                          color: FOREST,
                        }}
                      >
                        {archivedLots.length}
                      </span>
                      <span className="ml-0.5">区画</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === Map (純白背景に切替) === */}
        <section id="map" className="bg-white py-[clamp(40px,5vw,80px)] border-b border-border scroll-mt-20">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
              <div>
                <p
                  className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-2"
                  style={{
                    color: "#486B00",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                  }}
                >
                  Map
                </p>
                <h2 className="text-text-primary text-lg md:text-xl leading-[1.5]">
                  地図から分譲地を探す
                </h2>
              </div>
              <p className="text-text-secondary text-xs">
                ピンをタップすると物件情報が表示されます
              </p>
            </div>
            <LotsMapWrapper lots={mappableLots} />
            {mappableLots.length < activeLots.length && (
              <p className="text-text-secondary text-[11px] mt-3">
                ※ 地図上に表示されるのは座標取得できた {mappableLots.length} 区画です。販売中 {activeLots.length} 区画の全件は下の一覧をご覧ください。
              </p>
            )}
          </div>
        </section>

        {/* === 一覧 (純白背景) === */}
        <LotsBrowser lots={activeLots} />

        {/* === LINE未公開土地配信導線 (2026-05-03 12棟達成の3欠落動線③) === */}
        <LineLandFeedCta variant="editorial" />

        {/* === 締めCTA === */}
        <section className="bg-white py-[clamp(64px,7vw,140px)] border-t border-border">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <p
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-4"
              style={{
                color: "#486B00",
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
              }}
            >
              Get in touch
            </p>
            <h2 className="text-[clamp(22px,2.8vw,36px)] text-text-primary mb-4 leading-[1.4]">
              気になる分譲地は、ありましたか。
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-[1.9] mb-10">
              非公開でご案内できる物件もございます。お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="モデルハウス見学"
                sublabel="ご予約なしでも見学可・無料"
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
