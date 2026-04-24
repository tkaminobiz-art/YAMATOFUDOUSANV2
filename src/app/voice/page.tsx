import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
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
      <main>
        {/* === ヘッダー === */}
        <section className="bg-bg-warm py-[clamp(64px,calc(32px+5vw),160px)]">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              VOICE
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="max-w-[640px]">
                <h1 className="text-[clamp(28px,4vw,56px)] text-text-primary mb-4">
                  お客様の声
                </h1>
                <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
                  花鳥風月で家を建てた方々の、率直な感想です。決め手・こだわり・満足度まで、そのままの言葉で掲載しています。
                </p>
              </div>
              <div
                className="text-right"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="text-accent font-light text-6xl md:text-8xl block leading-none">
                  {VOICES.length}
                </span>
                <span className="text-text-secondary text-xs md:text-sm">
                  組のご家族
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* === 一覧 === */}
        <section className="py-[var(--section-py)] bg-bg-primary">
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

        {/* === 締めCTA === */}
        <section className="bg-bg-warm py-[clamp(48px,6vw,120px)]">
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
                sublabel="予約不要・無料でOK"
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
