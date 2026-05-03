import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import GoogleReviewCta from "@/components/GoogleReviewCta";
import { VOICES } from "@/data/voices";

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
        {/* === Editorial Black Hero (2026-05-03 /lots /money /works と統一) === */}
        <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
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
            <div className="flex items-center gap-3 mb-12 md:mb-20 text-[11px] md:text-[12px] tracking-[0.22em] uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#A2C523" }}
              />
              <span style={{ color: "#A2C523", fontWeight: 600 }}>
                Voice / お客様の声
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">99.9%、そのまま</span>
            </div>

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
                  {VOICES.length}
                </span>
                <p
                  className="mt-3 text-white/80 text-[12px] md:text-[13px] tracking-[0.16em] uppercase"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  Families · 組のご家族
                </p>
              </div>

              <div className="md:pb-8">
                <h1
                  className="text-white leading-[1.25] tracking-[-0.005em] max-w-[680px]"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(24px, 2.8vw, 40px)",
                  }}
                >
                  本音のまま、お聞きください。
                </h1>
                <p className="mt-5 text-white/65 text-[13px] md:text-[14px] leading-[1.95] max-w-[600px]">
                  花鳥風月で家を建てた方々の、率直な感想です。決め手・こだわり・満足度まで、できる限り原文に近い形で掲載しています。読みやすさのため、一部表記のみ整えています。
                </p>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "#A2C523" }}
          />
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
              headline="やまとで建てた方へ。Googleで口コミを書いていただけませんか。"
              description="ご家族の率直な体験は、これから家を考える方にとって何よりの参考になります。短い一言でも、率直なご感想で構いません。"
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
