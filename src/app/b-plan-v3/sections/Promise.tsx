import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import ReversalBridge from "./S04.client";

/**
 * Promise — 新3「やまとの約束」（14セクション新構成 / TOPリブート）
 * ------------------------------------------------------------------
 * 役割: 現 S04（逆転宣言＋相互証明 ReversalBridge 図）を再利用し、
 *   「家の値段」ではなく「暮らしの総額」を先に見せる、というやまとの約束を宣言する。
 *
 * 設計原則（AGENTS.md / project memory）:
 *   - surface="ivory"（明面・生成り）。id なし。
 *   - ReversalBridge（土地↔建物 / 総額↔月々 の相互証明図）を S04.client から default import で再利用。
 *     export 名は S04ReversalBridge（default）。図の deep-green 下線などの装飾はそのまま踏襲。
 *   - 見出しだけを新構成のコピーへ差し替え（BRAND-TRUTH / §総額思想）。
 *   - 数字バーンなし・CTA なし・背景 ivory（現 S04 は surface="base"。ここは ivory に振替）。
 *   - 「安い/低価格」語は使わない（憲法4.1）。敵＝建物価格だけ思考・不透明な総額。
 *
 * 正本: docs/notes/2026-06-25-top-reboot-framework.md。
 */
export default function Promise() {
  return (
    <SectionShell
      surface="ivory"
      aria-label="やまとの約束｜最初に見せるのは、暮らしの総額です。"
    >
      <div className="mx-auto max-w-[920px]">
        <Eyebrow>Our Promise</Eyebrow>

        {/* 現 S04 の t-h2 逆転宣言を新構成コピーへ差し替え。deep-green 下線（点）は踏襲。 */}
        <h2 className="t-h2 text-ink">
          最初に見せるのは、家の値段ではなく、
          <span className="relative mx-0.5 inline-block">
            <span className="relative z-10">暮らしの総額</span>
            {/* 視線を「暮らしの総額」へ引き渡す deep-green の下線（点） */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 z-0 h-[0.18em] bg-main/25"
            />
          </span>
          です。
        </h2>

        {/* 本文（Murecho 逐語・2段落） */}
        <p className="t-body mt-6 max-w-[52ch] text-ink-muted">
          建物価格だけでは、毎月の支払いはわかりません。土地、建物、外構、諸費用まで合わせて、はじめて家づくりの現実的な予算が見えてきます。
        </p>
        <p className="t-body mt-4 max-w-[52ch] text-ink-muted">
          やまと不動産では、土地と建物を切り離さず、最初から一つの総額としてご提案します。
        </p>

        {/* 現 S04 の相互証明図（土地↔建物 / 総額↔月々）を再利用。装飾そのまま踏襲。 */}
        <ReversalBridge />
      </div>
    </SectionShell>
  );
}
