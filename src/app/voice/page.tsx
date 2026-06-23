import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import GoogleReviewCta from "@/components/GoogleReviewCta";
import VoiceImmersive from "@/components/voice/VoiceImmersive";
import { VOICES } from "@/data/voices";

export const metadata: Metadata = {
  title: "お客様の声 | やまと不動産 花鳥風月",
  description:
    "花鳥風月で家を建てた50組のご家族の声。決め手・こだわり・満足度まで、できる限り原文に近い形で掲載しています。",
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
      <main className="bg-paper">
        {/* === 3カラム没入＝ヒーロー(章扉)を中央上段に内包し、左右の写真レールを最上端から流す＝継ぎ目ゼロ(C案/2026-06-24) === */}
        <section className="bg-paper">
          <VoiceImmersive voices={voicesWithExcerpt} />
        </section>

        {/* === OB向け Google 口コミ動線 (2026-05-03 GBP整備 - 12棟達成の3欠落動線①) === */}
        <section className="bg-white py-[clamp(40px,5vw,80px)]">
          <div className="max-w-[960px] mx-auto px-[var(--page-px)]">
            <GoogleReviewCta
              headline="当社で建てた方へ、Googleで口コミを書きませんか。"
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
