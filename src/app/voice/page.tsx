import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import GoogleReviewCta from "@/components/GoogleReviewCta";
import { VOICES } from "@/data/voices";

const FOREST = "#486B00";
const ACCENT = "#A2C523";

export const metadata: Metadata = {
  title: "お客様の声 | やまと不動産 花鳥風月",
  description:
    "花鳥風月で家を建てた30組以上のお客様の声。決め手・こだわり・満足度まで、率直な感想を掲載しています。",
};

export default function VoiceIndexPage() {
  // 一言抜粋（最後のQ&Aの最初の数十字を使う）
  const voicesWithExcerpt = VOICES.map((v) => {
    const last = v.qas[v.qas.length - 1];
    const excerpt = last
      ? last.a.replace(/\n/g, " ").slice(0, 60) + (last.a.length > 60 ? "…" : "")
      : "";
    return { ...v, excerpt };
  });

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* === Photo-led Editorial Soft Hero (2026-05-03 全ページ統一) === */}
        <section className="relative w-full overflow-hidden bg-white">
          <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
            <Image
              src="/images/works/case1-living.webp"
              alt="お客様の暮らし"
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
                    お客様の声 · Voice
                  </p>

                  <h1
                    className="text-text-primary leading-[1.25] tracking-[-0.005em] mb-7"
                    style={{
                      fontWeight: 500,
                      fontSize: "clamp(28px, 4vw, 52px)",
                    }}
                  >
                    本音のまま、お聞きください。
                  </h1>

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
                      {VOICES.length}
                    </span>
                    <span
                      className="text-text-primary text-[14px] md:text-[18px] font-medium leading-none ml-1.5 self-end pb-1 md:pb-2.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      組のご家族
                    </span>
                  </div>

                  <p className="text-text-primary/85 text-[13px] md:text-[15px] leading-[1.95] mb-8 max-w-[520px]">
                    花鳥風月で家を建てた方々の、率直な感想です。決め手・こだわり・満足度まで、できる限り原文に近い形で掲載しています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 一覧 === */}
        <section className="py-[var(--section-py)] bg-white">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
              {voicesWithExcerpt.map((v) => (
                <Link
                  key={v.id}
                  href={`/voice/${v.id}`}
                  className="group block bg-bg-primary rounded-lg overflow-hidden card-shadow transition-all hover:-translate-y-1"
                >
                  {/* カバー画像 */}
                  <div className="relative aspect-[3/2] bg-bg-secondary overflow-hidden">
                    {v.photos[0] ? (
                      <Image
                        src={v.photos[0]}
                        alt={v.title}
                        fill
                        className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-xs">
                        写真なし
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-bg-primary/95 backdrop-blur-sm rounded px-2.5 py-1">
                      <span className="text-main text-[10px] font-medium tracking-wider">
                        {v.area || "—"}
                      </span>
                    </div>
                  </div>

                  {/* 本文 */}
                  <div className="p-5 md:p-6">
                    <h2
                      className="text-text-primary text-base md:text-lg mb-3 group-hover:text-main transition-colors"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {v.title}
                    </h2>
                    <p className="text-text-secondary text-xs leading-[1.8] mb-4 line-clamp-3">
                      {v.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      {v.staff ? (
                        <span className="text-text-secondary text-[10px]">
                          担当: {v.staff}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="text-main text-xs font-medium">
                        続きを読む →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* === OB向け Google 口コミ動線 (2026-05-03 GBP整備 - 12棟達成の3欠落動線①) === */}
        <section className="bg-white py-[clamp(40px,5vw,80px)]">
          <div className="max-w-[960px] mx-auto px-[var(--page-px)]">
            <GoogleReviewCta
              headline="やまとで建てた方へ、Googleで口コミを書きませんか。"
              description="これから家を考える方にとって、率直な感想ほど参考になります。短いひと言で構いません。"
            />
          </div>
        </section>

        {/* === 締めCTA === */}
        <section className="bg-white border-t border-border py-[clamp(64px,7vw,140px)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <p className="text-text-primary text-base md:text-lg leading-[1.9] mb-8">
              一人でも多くの方に、同じ感想を持っていただきたい。<br />
              それが、やまと不動産の目標です。
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
