import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import WorksScrollB from "@/components/works/WorksScrollB";
import { WORKS_PARTS } from "@/data/worksParts";

export const metadata: Metadata = {
  title: "施工事例 | やまと不動産 花鳥風月",
  description:
    "奈良・京都で建てた花鳥風月の施工事例。外観・リビング・キッチン・収納まで、部位ごとに暮らしのディテールをご紹介します。",
};

export default function WorksIndexPage() {
  return (
    <>
      <Header />
      <main className="bg-paper text-noir">
        {/* 章扉ヒーロー（Editorial Monochrome・コンパクト。写真は下の部位ギャラリーに任せる） */}
        <section className="border-b border-noir">
          <div className="mx-auto w-[min(100%-32px,1200px)] pb-[clamp(40px,6vw,72px)] pt-[clamp(56px,9vw,110px)]">
            <p className="font-mono text-[12px] tracking-[0.18em] text-signal">施工事例 / WORKS</p>
            <h1 className="mt-5 text-[clamp(28px,4.6vw,52px)] font-bold leading-[1.3] tracking-[-0.01em]">
              人の数だけ、暮らしがある。
            </h1>
            <p className="mt-6 max-w-[640px] text-[15px] leading-[1.95] text-ash">
              当社が手がけた住まいを、外観からキッチン、収納まで、部位ごとにご覧いただけます。暮らしのディテールに、設計の考え方が表れます。
            </p>
            <p className="font-mono mt-6 flex items-baseline gap-3 text-[11px] tracking-[0.1em] text-slate">
              <span>
                <span className="num-tnum font-oswald text-[16px] text-noir">{WORKS_PARTS.totalCategories}</span> PARTS
              </span>
              <span className="text-mist">／</span>
              <span>
                <span className="num-tnum font-oswald text-[16px] text-noir">{WORKS_PARTS.totalGalleryImages}</span> PHOTOS
              </span>
            </p>
          </div>
        </section>

        {/* 部位ごとに“めくる”施工ギャラリー（sticky差し替え＋縦帯索引） */}
        <WorksScrollB />

        {/* 締めCTA */}
        <section className="border-t border-hair bg-paper py-[clamp(64px,7vw,140px)]">
          <div className="mx-auto max-w-[640px] px-[var(--page-px)] text-center">
            <p className="mb-8 text-base leading-[1.9] text-noir md:text-lg">
              ご家族の暮らしから、家づくりは始まります。
              <br />
              まずはモデルハウスで、お話を聞かせてください。
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <CtaButton href="/reserve" variant="primary" size="md" label="モデルハウス見学" sublabel="ご予約なしでも見学可・無料" />
              <CtaButton href="/contact" variant="secondary" size="md" label="資料請求" sublabel="無料・1分で完了" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
