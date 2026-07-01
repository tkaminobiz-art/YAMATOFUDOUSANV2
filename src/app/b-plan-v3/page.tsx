import type { Metadata, Viewport } from "next";

import V3Header from "./_shared/V3Header";
import V3Footer from "./_shared/V3Footer";
import BottomCtaBar from "./_shared/BottomCtaBar";
import RepeatCtaBlock from "./_shared/RepeatCtaBlock";

// 新14セクション（読者が不安になる順）。並べ替えは import 順の入れ替えだけで済む。
import Hero from "./sections/Hero";              // 1  FV（総額透明性ステートメント）
import Anxiety from "./sections/Anxiety";        // 2  不安の代弁
import Promise from "./sections/Promise";        // 3  やまとの約束（暮らしの総額）
import StandardSpec from "./sections/StandardSpec"; // 4  標準仕様
import Estimate from "./sections/Estimate";      // 5  明瞭見積もり
import Budget from "./sections/Budget";          // 6  予算・月々（クライマックス）
import RentVsLoan from "./sections/RentVsLoan";  // 7  家賃とローンの考え方
import Models from "./sections/Models";          // 8  選べる3つのモデル
import Land from "./sections/Land";              // 9  土地の相談
import Mechanism from "./sections/Mechanism";    // 10 安さの理由
import Trust from "./sections/Trust";            // 11 実績・代表・信頼
import Voices from "./sections/Voices";          // 12 お客様の声
import Faq from "./sections/Faq";                // 13 FAQ
import FinalCta from "./sections/FinalCta";      // 14 最終CTA

export const metadata: Metadata = {
  title: "やまと不動産｜土地も、建物も、月々も。見えてから決める家づくり",
  description:
    "奈良・京都南部で、土地・建物・外構・諸費用をまとめた「土地込み総額」を先にお見せします。標準仕様にも妥協しない、やまと不動産の家づくり。",
};

// safe-area を効かせるため viewport-fit=cover（BottomCtaBar の SP固定CTA）
export const viewport: Viewport = {
  viewportFit: "cover",
};

/**
 * /b-plan-v3 — 本番トップ `/`（src/app/page.tsx が再エクスポート）。
 *
 * 主軸（2026-07-01 神野さん確定）: 「土地も、建物も、月々も。見えてから決める家づくり。」
 * 読者が家づくりで不安になる順に14セクションを並べ、重複を減らし、各セクションの役割を1つに絞る。
 *
 * 明度ウェーブ: 黒地(ink)は 1 Hero / 6 Budget / 10 Mechanism / 14 FinalCta の4回のみ（2026-07-01 AD確定）。
 * 反復CTA帯3本は明地(surface-base+上下罫)で黒面に数えない＝緑のLINEボタンで発火点を作る。
 * 反復CTA（低摩擦の早期出口→クライマックス直後の最強発火点→最終）を等価点に挟む。
 * 二度打ち: countUp は 6 Budget（月々）と 11 Trust（600棟）の2箇所のみ。
 */
export default function BPlanV3Page() {
  return (
    <div className="v3-scope surface-base min-h-screen overflow-x-hidden">
      <V3Header />

      <main>
        <Hero />
        <Anxiety />
        <Promise />

        {/* 反復CTA① — 約束の直後・低摩擦の早期出口（明地・上下罫で区切る＝黒面を増やさない） */}
        <section aria-label="LINEで総額を相談する" className="surface-base border-y border-[color:var(--color-border)] px-5 py-12 md:px-10 lg:py-16 xl:px-14">
          <div className="mx-auto max-w-[1380px]">
            <RepeatCtaBlock variant="cta1" tone="light" lineLabel="LINEで総額を相談する" />
          </div>
        </section>

        <StandardSpec />
        <Estimate />
        <Budget />

        {/* 反復CTA② — 予算クライマックス直後の最強発火点（明地・上下罫） */}
        <section aria-label="LINEで総額を相談する" className="surface-base border-y border-[color:var(--color-border)] px-5 py-12 md:px-10 lg:py-16 xl:px-14">
          <div className="mx-auto max-w-[1380px]">
            <RepeatCtaBlock variant="cta2" tone="light" lineLabel="LINEで総額を相談する" />
          </div>
        </section>

        <RentVsLoan />
        <Models />
        <Land />
        <Mechanism />
        <Trust />
        <Voices />
        <Faq />
        <FinalCta />

        {/* 反復CTA最終 — FinalCta の決断階段に添える（明地・上罫） */}
        <section aria-label="LINEで総額を相談する" className="surface-base border-t border-[color:var(--color-border)] px-5 pb-16 pt-12 md:px-10 xl:px-14">
          <div className="mx-auto max-w-[1380px]">
            <RepeatCtaBlock variant="final" tone="light" lineLabel="LINEで総額を相談する" />
          </div>
        </section>
      </main>

      <V3Footer />
      <BottomCtaBar />
    </div>
  );
}
