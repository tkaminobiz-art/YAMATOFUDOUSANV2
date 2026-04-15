import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import { VOICES, getVoice, getAllVoiceIds } from "@/data/voices";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Static generation
export async function generateStaticParams() {
  return getAllVoiceIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const voice = getVoice(id);
  if (!voice) return { title: "お客様の声 | やまと不動産" };

  const last = voice.qas[voice.qas.length - 1];
  const excerpt = last ? last.a.slice(0, 100) : "";

  return {
    title: `${voice.title} | お客様の声 | やまと不動産 花鳥風月`,
    description: excerpt,
  };
}

export default async function VoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const voice = getVoice(id);
  if (!voice) notFound();

  // 前後のページ
  const idx = VOICES.findIndex((v) => v.id === id);
  const prev = idx > 0 ? VOICES[idx - 1] : null;
  const next = idx < VOICES.length - 1 ? VOICES[idx + 1] : null;

  return (
    <>
      <Header />
      <main>
        {/* === メイン画像 === */}
        {voice.photos[0] && (
          <div className="relative w-full aspect-[3/2] md:aspect-[16/7] max-h-[600px] bg-bg-secondary overflow-hidden">
            <Image
              src={voice.photos[0]}
              alt={voice.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        {/* === ヘッダー === */}
        <section className="py-[clamp(40px,5vw,96px)]">
          <div className="max-w-[900px] mx-auto px-[var(--page-px)]">
            <nav className="mb-6">
              <Link
                href="/voice"
                className="inline-flex items-center gap-1 text-text-secondary text-sm hover:text-main transition-colors"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                お客様の声一覧
              </Link>
            </nav>

            <div className="flex items-baseline gap-3 mb-3">
              {voice.area && (
                <span className="text-main text-sm font-medium tracking-wider">
                  {voice.area}
                </span>
              )}
            </div>

            <h1
              className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {voice.title}
            </h1>

            {voice.staff && (
              <p className="text-text-secondary text-sm mb-8">
                担当:{" "}
                <span className="text-text-primary font-medium">
                  {voice.staff}
                </span>
              </p>
            )}

            {/* Q&A */}
            <div className="space-y-10 md:space-y-12 mt-10">
              {voice.qas.map((qa, i) => (
                <div key={i}>
                  <h2
                    className="text-main text-base md:text-lg font-medium mb-3 flex items-start gap-3"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <span
                      className="text-main/60 font-light shrink-0 mt-0.5"
                      style={{
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                      }}
                    >
                      Q.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{qa.q}</span>
                  </h2>
                  <div className="pl-[calc(1rem+3em)] md:pl-[calc(1rem+3.5em)]">
                    <p className="text-text-primary text-[clamp(15px,1.1vw,17px)] leading-[1.9] whitespace-pre-line">
                      {qa.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 追加写真ギャラリー === */}
        {voice.photos.length > 1 && (
          <section className="bg-bg-secondary py-[clamp(40px,5vw,96px)]">
            <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
              <p className="font-section-label text-main text-xs md:text-sm mb-6 tracking-[0.15em]">
                GALLERY
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {voice.photos.slice(1).map((p, i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/2] rounded overflow-hidden bg-bg-primary"
                  >
                    <Image
                      src={p}
                      alt={`${voice.title} 写真 ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* === 前後ナビ === */}
        <section className="py-10 md:py-14 border-t border-border">
          <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
            <div className="grid grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/voice/${prev.id}`}
                  className="group flex items-center gap-3 py-4 hover:bg-bg-secondary rounded px-3 transition-colors"
                >
                  <ArrowLeft
                    className="w-5 h-5 text-text-secondary group-hover:text-main transition-colors shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="min-w-0">
                    <p className="text-text-secondary text-[10px] uppercase tracking-wider mb-0.5">
                      Prev
                    </p>
                    <p className="text-text-primary text-sm font-medium truncate group-hover:text-main transition-colors">
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/voice/${next.id}`}
                  className="group flex items-center gap-3 justify-end py-4 hover:bg-bg-secondary rounded px-3 transition-colors text-right"
                >
                  <div className="min-w-0">
                    <p className="text-text-secondary text-[10px] uppercase tracking-wider mb-0.5">
                      Next
                    </p>
                    <p className="text-text-primary text-sm font-medium truncate group-hover:text-main transition-colors">
                      {next.title}
                    </p>
                  </div>
                  <ArrowRight
                    className="w-5 h-5 text-text-secondary group-hover:text-main transition-colors shrink-0"
                    strokeWidth={1.5}
                  />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </section>

        {/* === CTA === */}
        <section className="bg-bg-warm py-[clamp(48px,6vw,120px)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <h2 className="text-[clamp(20px,2.5vw,32px)] text-text-primary mb-4">
              あなたのご家族も、<br className="sm:hidden" />
              同じ感想を持ちませんか。
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-[1.9] mb-8">
              まずはモデルハウスで、標準仕様をご覧ください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="来場予約"
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
