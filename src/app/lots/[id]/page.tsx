import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { LOTS, getLot, getAllLotIds } from "@/data/lots";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

export async function generateStaticParams() {
  return getAllLotIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const lot = getLot(id);
  if (!lot) return { title: "分譲地 | やまと不動産" };

  return {
    title: `${lot.title} | やまと不動産`,
    description: lot.fields["所在地"] || lot.title,
  };
}

// 表示優先度の高いフィールド順
const FIELD_ORDER = [
  "所在地",
  "交通",
  "総区画数",
  "坪数",
  "土地面積",
  "開発面積",
  "坪単価",
  "価格",
  "種別",
  "地目/地勢",
  "都市計画",
  "用途地域",
  "建ぺい率",
  "容積率",
  "道路",
  "設備",
  "引渡",
  "取引態様",
];

export default async function LotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lot = getLot(id);
  if (!lot) notFound();

  const idx = LOTS.findIndex((l) => l.id === id);
  const prev = idx > 0 ? LOTS[idx - 1] : null;
  const next = idx < LOTS.length - 1 ? LOTS[idx + 1] : null;

  // 表示フィールド（順序付け）
  const orderedFields = FIELD_ORDER.filter((f) => lot.fields[f]).map((f) => ({
    label: f,
    value: lot.fields[f],
  }));
  // 順序外のフィールドも後ろに（取扱会社等は除く）
  const EXCLUDE = ["取扱会社", "担当者"];
  const restFields = Object.entries(lot.fields)
    .filter(
      ([k]) => !FIELD_ORDER.includes(k) && !EXCLUDE.includes(k)
    )
    .map(([label, value]) => ({ label, value }));

  const allFields = [...orderedFields, ...restFields];

  return (
    <>
      <Header />
      <main>
        {lot.photos[0] && (
          <div className="relative w-full aspect-[4/3] md:aspect-[16/7] max-h-[600px] bg-bg-secondary overflow-hidden">
            <Image
              src={lot.photos[0]}
              alt={lot.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        <section className="py-[clamp(40px,5vw,96px)]">
          <div className="max-w-[1000px] mx-auto px-[var(--page-px)]">
            <nav className="mb-6">
              <Link
                href="/lots"
                className="inline-flex items-center gap-1 text-text-secondary text-sm hover:text-main transition-colors"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                分譲地一覧
              </Link>
            </nav>

            <div className="flex items-baseline gap-3 mb-3">
              {lot.city && (
                <span className="text-main text-sm font-medium tracking-wider">
                  {lot.city}
                </span>
              )}
              <span className="text-text-secondary text-xs">
                （過去掲載物件）
              </span>
            </div>

            <h1
              className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-8"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {lot.title}
            </h1>

            {/* 所在地と交通を強調表示 */}
            <div className="bg-bg-secondary rounded-lg p-[var(--card-p)] mb-10">
              {lot.fields["所在地"] && (
                <div className="flex items-start gap-3 mb-3">
                  <MapPin
                    className="w-5 h-5 text-main shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-text-secondary text-xs mb-1">所在地</p>
                    <p className="text-text-primary text-sm md:text-base">
                      {lot.fields["所在地"]}
                    </p>
                  </div>
                </div>
              )}
              {lot.fields["交通"] && (
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="text-text-secondary text-xs mb-1">交通</p>
                    <p className="text-text-primary text-sm md:text-base">
                      {lot.fields["交通"]}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 物件情報テーブル */}
            <h2 className="font-section-label text-main text-xs mb-4 tracking-[0.15em]">
              DETAILS
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-10">
              {allFields.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-3 py-2 border-b border-border"
                >
                  <dt className="text-text-secondary text-xs md:text-sm">
                    {f.label}
                  </dt>
                  <dd className="text-text-primary text-xs md:text-sm">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 追加写真 */}
        {lot.photos.length > 1 && (
          <section className="bg-bg-secondary py-[clamp(40px,5vw,96px)]">
            <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
              <p className="font-section-label text-main text-xs md:text-sm mb-6 tracking-[0.15em]">
                PHOTOS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {lot.photos.slice(1).map((p, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded overflow-hidden bg-bg-primary"
                  >
                    <Image
                      src={p}
                      alt={`${lot.title} 写真 ${i + 2}`}
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

        {/* 前後ナビ */}
        <section className="py-10 md:py-14 border-t border-border">
          <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
            <div className="grid grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/lots/${prev.id}`}
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
                  href={`/lots/${next.id}`}
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

        {/* CTA */}
        <section className="bg-bg-warm py-[clamp(48px,6vw,120px)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <h2 className="text-[clamp(20px,2.5vw,32px)] text-text-primary mb-4">
              現在の販売情報をお聞きください。
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-[1.9] mb-8">
              非公開物件のご案内もあります。お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/reserve"
                className="flex items-center justify-center min-h-[52px] px-8 py-3.5 rounded bg-accent text-white text-base font-medium transition-all hover:opacity-90 hover:-translate-y-0.5"
              >
                来店予約（無料）
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center min-h-[52px] px-8 py-3.5 rounded bg-main text-white text-base font-medium transition-all hover:bg-main-dark hover:-translate-y-0.5"
              >
                資料請求（無料）
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
