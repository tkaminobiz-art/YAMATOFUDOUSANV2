import type { Metadata, Viewport } from "next";

import LabDisclaimer from "../b-plan-v3/_shared/LabDisclaimer";
import V3Header from "../b-plan-v3/_shared/V3Header";
import V3Footer from "../b-plan-v3/_shared/V3Footer";
import BottomCtaBar from "../b-plan-v3/_shared/BottomCtaBar";
import RepeatCtaBlock from "../b-plan-v3/_shared/RepeatCtaBlock";

import S01 from "../b-plan-v3/sections/S01";
import S02 from "../b-plan-v3/sections/S02";
import S03 from "../b-plan-v3/sections/S03";
import S04 from "../b-plan-v3/sections/S04";
import S05 from "../b-plan-v3/sections/S05";
import S06 from "../b-plan-v3/sections/S06";
import S07 from "../b-plan-v3/sections/S07";
import S08 from "../b-plan-v3/sections/S08";
import S09 from "../b-plan-v3/sections/S09";
import S10 from "../b-plan-v3/sections/S10";
import S11 from "../b-plan-v3/sections/S11";
import S12 from "../b-plan-v3/sections/S12";

export const metadata: Metadata = {
  title: "やまと不動産 | TOPリブート候補プレビュー（v3 / A: 静止背景）",
  description:
    "FV案 A/B 比較用。A=FV背景が静止画。B(/b-plan-v3)=ループ動画。前景は完全同一。",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

/**
 * /b-plan-v3-a — FV案 A/B 比較の「A（静止背景）」ルート。
 *
 * /b-plan-v3（B=ループ動画）と本文・前景は完全同一。**唯一の差は S01 の背景**:
 *   B: variant 既定（ループ動画モンタージュ） / A: variant="a"（同一ポスターの静止背景）。
 * これで「動画背景 vs 静止背景」を1変数で比較できる（FV案B計画 §5/§7 の並走A/B）。
 * 本文順序・反復CTA配置は /b-plan-v3 と同一（§2 / §2.3）。
 */
export default function BPlanV3APage() {
  return (
    <div className="v3-scope surface-base min-h-screen overflow-x-hidden">
      <LabDisclaimer />
      <V3Header />

      <main>
        <S01 variant="a" />
        <S02 />

        {/* [CTA-1] S02直後 — 低摩擦の早期出口（ink地） */}
        <section aria-label="LINEで相談" className="surface-ink px-5 py-12 md:px-10 lg:py-16 xl:px-14">
          <div className="mx-auto max-w-[1380px]">
            <RepeatCtaBlock variant="cta1" tone="ink" />
          </div>
        </section>

        <S03 />
        <S04 />
        <S05 />

        {/* [CTA-2] S05直後 — クライマックス直後の最強発火点（ink地） */}
        <section aria-label="LINEで相談" className="surface-ink px-5 py-12 md:px-10 lg:py-16 xl:px-14">
          <div className="mx-auto max-w-[1380px]">
            <RepeatCtaBlock variant="cta2" tone="ink" />
          </div>
        </section>

        <S06 />
        <S07 />
        <S08 />
        <S09 />
        <S10 />
        <S11 />
        <S12 />

        {/* 最終反復CTA — S12 の決断階段に添える（ink地） */}
        <section aria-label="LINEで相談" className="surface-ink px-5 pb-16 pt-4 md:px-10 xl:px-14">
          <div className="mx-auto max-w-[1380px]">
            <RepeatCtaBlock variant="final" tone="ink" />
          </div>
        </section>
      </main>

      <V3Footer />
      <BottomCtaBar />
    </div>
  );
}
