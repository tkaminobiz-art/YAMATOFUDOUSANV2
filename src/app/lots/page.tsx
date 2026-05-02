import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import LotsMapWrapper from "@/components/LotsMapWrapper";
import LotsBrowser from "@/components/LotsBrowser";
import {
  getActiveLots,
  getArchivedLots,
  getMappableLots,
} from "@/data/lots";
import { Archive } from "lucide-react";

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
        {/* === Editorial Black Hero ===
            2026-04-30 design-scout AT-001 (JP クラフト小ブランドテンプレ) 回避:
            ベージュ背景 + 二段ラベル + earth色巨大数字 を全面廃棄。
            黒背景 + Oswald 280px super-thin Lime + メタタグ群で
            "実績を静かに、しかし確実に見せる" ヒーローへ。 */}
        <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
          {/* 背景の極細グリッド線(現代的アクセント、AT-006 Swiss テンプレを破る) */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] py-[clamp(80px,12vw,200px)]">
            {/* 上部メタ行 — Linear系の極細キャプション */}
            <div className="flex items-center gap-3 mb-12 md:mb-20 text-[11px] md:text-[12px] tracking-[0.22em] uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#A2C523" }}
              />
              <span style={{ color: "#A2C523", fontWeight: 600 }}>
                Lots / for sale
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">奈良 · 京都南部</span>
            </div>

            {/* メイン: 巨大数字 + メタ */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-end">
              <div>
                <span
                  className="block tabular-nums leading-[0.85]"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 200,
                    fontSize: "clamp(140px, 22vw, 320px)",
                    color: "#A2C523",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {activeLots.length}
                </span>
                <p
                  className="mt-3 text-white/80 text-[12px] md:text-[13px] tracking-[0.16em] uppercase"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  Active Listings · 販売中
                </p>
              </div>

              <div className="md:pb-8">
                <h1
                  className="text-white leading-[1.15] tracking-[-0.005em] max-w-[680px]"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(22px, 2.6vw, 36px)",
                  }}
                >
                  土地のかたち、価格、最寄駅。
                  <br />
                  暮らしの距離を、一画面で。
                </h1>
                <p className="mt-5 text-white/65 text-[13px] md:text-[14px] leading-[1.95] max-w-[600px]">
                  価格・駅徒歩・小学校・スーパーまで、ご家族の暮らしに合わせて絞り込めます。
                  土地と建物をまとめれば、余計な金融コストも抑えられます。
                </p>

                {/* 過去実績への動線 — ヒーロー内に統合 */}
                <Link
                  href="/lots/archive"
                  className="group inline-flex items-center gap-3 mt-8 text-white/70 hover:text-white transition-colors text-[12px] md:text-[13px]"
                >
                  <Archive className="w-4 h-4" strokeWidth={1.4} />
                  <span>
                    過去の分譲実績{" "}
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-oswald)",
                        fontWeight: 500,
                        color: "#A2C523",
                      }}
                    >
                      {archivedLots.length}
                    </span>
                    <span className="ml-0.5">区画</span>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* 下端: 細い ライム ライン(ヒーローの "終わり" を明示) */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "#A2C523" }}
          />
        </section>

        {/* === Map (純白背景に切替) === */}
        <section className="bg-white py-[clamp(40px,5vw,80px)] border-b border-border">
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
