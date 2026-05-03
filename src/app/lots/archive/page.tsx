import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import { getArchivedLots } from "@/data/lots";
import { MapPin, ChevronLeft } from "lucide-react";

const FOREST = "#486B00";
const ACCENT = "#A2C523";

export const metadata: Metadata = {
  title: "過去の分譲実績 | やまと不動産",
  description:
    "やまと不動産が奈良・京都南部で過去にお引渡し済みの分譲地一覧。累計の実績として、エリア・規模感の参考にどうぞ。",
};

export default function LotsArchivePage() {
  const archived = getArchivedLots();

  // city でグルーピング
  const byCity: Record<string, typeof archived> = {};
  for (const lot of archived) {
    if (!byCity[lot.city]) byCity[lot.city] = [];
    byCity[lot.city].push(lot);
  }
  const cities = Object.entries(byCity).sort((a, b) => b[1].length - a[1].length);

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* === Photo-led Editorial Soft Hero (2026-05-03 全ページ統一・Archive版) === */}
        <section className="relative w-full overflow-hidden bg-white">
          <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
            <Image
              src="/images/lots-hero/lot-hero-04.webp"
              alt="やまと不動産が過去に手がけた分譲地"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ filter: "saturate(0.92) contrast(1.02)" }}
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
                  <Link
                    href="/lots"
                    className="inline-flex items-center gap-1.5 text-text-secondary hover:text-main text-[12px] md:text-[13px] mb-6 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.6} />
                    販売中の分譲地一覧へ戻る
                  </Link>

                  <p
                    className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase mb-5"
                    style={{ color: FOREST, fontWeight: 600 }}
                  >
                    過去の分譲実績 · Archive
                  </p>

                  <h1
                    className="text-text-primary leading-[1.25] tracking-[-0.005em] mb-7"
                    style={{
                      fontWeight: 500,
                      fontSize: "clamp(26px, 3.6vw, 44px)",
                    }}
                  >
                    過去の分譲実績。
                  </h1>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span
                      className="tabular-nums leading-none"
                      style={{
                        fontFamily: "var(--font-oswald)",
                        fontWeight: 300,
                        fontSize: "clamp(56px, 8vw, 112px)",
                        color: ACCENT,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {archived.length}
                    </span>
                    <span
                      className="text-text-primary text-[14px] md:text-[18px] font-medium leading-none ml-1.5 self-end pb-1 md:pb-2.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      区画 累計実績
                    </span>
                  </div>

                  <p className="text-text-primary/85 text-[13px] md:text-[15px] leading-[1.95] max-w-[520px]">
                    奈良・京都南部で過去にお引渡しを完了した分譲地です。販売は終了していますが、累計実績として、エリア・規模感の参考にどうぞ。販売中の分譲地は{" "}
                    <Link
                      href="/lots"
                      className="text-main hover:opacity-70 underline underline-offset-2"
                    >
                      こちら
                    </Link>{" "}
                    から。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 市町村別カウンター */}
        <section className="py-[clamp(24px,3vw,48px)] bg-white border-b border-border">
          <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
            <p className="text-text-secondary text-xs md:text-sm mb-3">
              対応エリア
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {cities.map(([city, lots]) => (
                <span
                  key={city}
                  className="inline-flex items-baseline gap-1.5 text-sm"
                >
                  <span className="text-text-primary font-medium">{city}</span>
                  <span
                    className="text-main text-xs tabular-nums"
                    style={{ fontFamily: "var(--font-oswald)", fontWeight: 500 }}
                  >
                    {lots.length}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 過去物件グリッド(コンパクト) */}
        <section className="py-[clamp(40px,5vw,96px)] bg-white">
          <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {archived.map((lot) => (
                <Link
                  key={lot.id}
                  href={`/lots/${lot.id}`}
                  className="group block rounded overflow-hidden bg-bg-primary border border-border hover:border-main transition-colors"
                >
                  <div className="relative aspect-[4/3] bg-bg-secondary overflow-hidden">
                    {lot.photos[0] ? (
                      <Image
                        src={lot.photos[0]}
                        alt={lot.title}
                        fill
                        className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                        <MapPin className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-bg-primary/90 backdrop-blur-sm rounded px-1.5 py-0.5">
                      <span className="text-main text-[9px] font-medium tracking-wider">
                        {lot.city}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p
                      className="text-text-primary text-[12px] md:text-[13px] leading-tight line-clamp-2 group-hover:text-main transition-colors"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {lot.title}
                    </p>
                    {lot.fields["所在地"] && (
                      <p className="text-text-secondary text-[10px] mt-1 line-clamp-1">
                        {lot.fields["所在地"]}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-10 text-text-secondary text-[11px] md:text-[12px] leading-[1.85] max-w-[760px]">
              ※ 上記はやまと不動産が過去にお引渡しを完了した分譲地です。販売は終了しています。販売中の分譲地は <Link href="/lots" className="text-main hover:underline">こちら</Link> をご覧ください。
            </p>
          </div>
        </section>

        <section className="bg-white border-t border-border py-[clamp(64px,7vw,140px)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <h2 className="text-[clamp(20px,2.5vw,32px)] text-text-primary mb-4">
              似たエリアの新しい分譲地を探しています。
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-[1.9] mb-8">
              非公開の物件もご案内できる場合があります。お気軽にお問い合わせください。
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
                label="土地のご相談"
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
