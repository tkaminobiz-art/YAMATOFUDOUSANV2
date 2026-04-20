import type { Metadata } from "next";
import HeroMagazine from "@/components/sections/HeroMagazine";

export const metadata: Metadata = {
  title: "Hero Lab | やまと不動産",
  description: "FV(ファーストビュー) C-2 Magazine Editorial 検証用",
  robots: { index: false, follow: false },
};

// 納品前に削除する検証用ページ(本番 page.tsx からは独立)
export default function HeroLabPage() {
  return (
    <main>
      {/* ラボ用の小さな説明バー(スクロールで消える) */}
      <div className="fixed top-2 left-2 z-[100] bg-black/80 text-white text-[10px] px-3 py-1.5 rounded font-mono pointer-events-none">
        /hero-lab — C-2 Magazine Editorial 検証
      </div>

      <HeroMagazine />

      {/* 下方セクション(視覚的な余白確認用) */}
      <section className="bg-bg-primary py-24 md:py-40 px-[var(--page-px)]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-4">
            Scroll Test
          </p>
          <p className="text-text-primary text-base md:text-lg leading-[1.9]">
            FV 直下の繋がり検証用。実際の本番ページでは
            <br className="hidden md:inline" />
            HeroVoiceMagazine(現状のまま)が続きます。
          </p>
        </div>
      </section>
    </main>
  );
}
