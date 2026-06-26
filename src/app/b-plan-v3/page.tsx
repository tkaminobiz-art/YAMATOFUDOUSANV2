import type { Metadata, Viewport } from "next";

import V3Header from "./_shared/V3Header";
import V3Footer from "./_shared/V3Footer";
import BottomCtaBar from "./_shared/BottomCtaBar";
import RepeatCtaBlock from "./_shared/RepeatCtaBlock";

import S01 from "./sections/S01";
import S02 from "./sections/S02";
import S03 from "./sections/S03";
import S04 from "./sections/S04";
import S05 from "./sections/S05";
import S06 from "./sections/S06";
import S07 from "./sections/S07";
import S08 from "./sections/S08";
import S09 from "./sections/S09";
import S10 from "./sections/S10";
import S11 from "./sections/S11";
import S12 from "./sections/S12";

export const metadata: Metadata = {
  title: "やまと不動産｜奈良・京都南部で、土地から考える家づくり",
  description:
    "奈良・京都南部で土地から考える注文住宅。土地・建物・諸費用まで含めた現実の総額を、はじめにわかりやすく。やまと不動産。",
};

// safe-area を効かせるため viewport-fit=cover（§7.3 SP固定CTA）
export const viewport: Viewport = {
  viewportFit: "cover",
};

/**
 * /b-plan-v3 — TOPリブート確定版v2.1 の足場ページ。
 *
 * 本文順序は確定フレームワーク §2:
 *   S01 → S02 → [CTA-1] → S03 → S04 → S05 → [CTA-2] → S06
 *   → S07 → S08 → S09 → S10 → S11 → S12（→ 最終CTA）
 * 反復CTA（§2.3）は page 側で挟む:
 *   [CTA-1] = S02 直後 / [CTA-2] = S05 直後（最強発火点） / final = S12 直後。
 * S01-S12 の中身は ./sections/* に閉じる（各実装者の担当）。
 */
export default function BPlanV3Page() {
  return (
    <div className="v3-scope surface-base min-h-screen overflow-x-hidden">
      <V3Header />

      <main>
        <S01 />
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
