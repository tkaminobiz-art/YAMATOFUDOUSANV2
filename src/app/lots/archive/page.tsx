import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import { getArchivedLots } from "@/data/lots";
import { MapPin, ChevronLeft } from "lucide-react";

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
        {/* === Editorial Black Hero (Archive版・少しサイズを抑える) === */}
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

          <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] py-[clamp(60px,9vw,140px)]">
            <Link
              href="/lots"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-[12px] md:text-[13px] mb-10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.6} />
              販売中の分譲地一覧へ戻る
            </Link>
            <div className="flex items-center gap-3 mb-10 md:mb-14 text-[11px] md:text-[12px] tracking-[0.22em] uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#A2C523" }}
              />
              <span style={{ color: "#A2C523", fontWeight: 600 }}>
                Archive / 過去の分譲実績
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">引渡し完了</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-end">
              <div>
                <span
                  className="block tabular-nums leading-[0.85]"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 200,
                    fontSize: "clamp(120px, 18vw, 260px)",
                    color: "#A2C523",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {archived.length}
                </span>
                <p
                  className="mt-3 text-white/80 text-[12px] md:text-[13px] tracking-[0.16em] uppercase"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  Past Lots · 区画の累計実績
                </p>
              </div>

              <div className="md:pb-8">
                <h1
                  className="text-white leading-[1.25] tracking-[-0.005em] max-w-[680px]"
                  style={{ fontWeight: 400, fontSize: "clamp(22px, 2.4vw, 32px)" }}
                >
                  過去の分譲実績。
                </h1>
                <p className="mt-5 text-white/65 text-[13px] md:text-[14px] leading-[1.95] max-w-[600px]">
                  やまと不動産が奈良・京都南部で過去にお引渡しを完了した分譲地です。販売は終了していますが、累計実績として、エリア・規模感の参考にどうぞ。
                  <br />
                  販売中の分譲地は{" "}
                  <Link href="/lots" className="text-white hover:opacity-70 underline underline-offset-2">
                    こちら
                  </Link>{" "}
                  から。
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
