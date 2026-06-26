"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

/**
 * S04ReversalBridge — S04 専用 bespoke 図（このセクションに自己完結）。
 *
 * 「建物価格だけ」vs「土地込み総額」の対比1枚＋相互証明矢印（総額↔月々 / 土地↔建物）。
 * これが S04→S05 の接合導入図になり、白→黒（S05 ink 頂点）への明度コントラスト助走を作る。
 *
 * モーション: fade+translateY（Y+12→0/IO once）。叫ばない。
 * - useScrollIn で .is-visible を IO once 付与。reduced-motion 時は即 .is-visible（即表示）。
 * - 色は @theme トークンのみ（ink/deep-green=main/lime）。蛍光・新 hex 直書きなし。
 *
 * S04.tsx の default export を props 無しサーバーコンポーネントに保つため、
 * client 化が要るこの図だけを子コンポーネント（Sxx.client.tsx 規約）に切り出している。
 */
export default function S04ReversalBridge() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <div
      ref={ref}
      className="scroll-in mt-12 rounded-2xl border border-[color:var(--color-border)] bg-cream/40 p-6 md:mt-14 md:p-9"
    >
      {/* 対比1枚: 建物価格だけ（やせた見方）→ 土地込み総額（やまとの見方） */}
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        {/* before: 建物価格だけ思考 */}
        <div className="scroll-in flex flex-col justify-center rounded-xl bg-paper px-5 py-6 ring-1 ring-[color:var(--color-border)]">
          <p className="t-eyebrow text-ink-muted">一般的な見方</p>
          <p className="t-h3 mt-2 text-ink-muted">建物の価格だけ</p>
          <p className="t-body mt-2 text-ink-muted">
            あとから土地や諸費用が乗り、毎月の支払いが見えないまま進む。
          </p>
        </div>

        {/* 接合矢印（点・deep-green）: before → after */}
        <div className="flex items-center justify-center" aria-hidden>
          <span className="hidden text-main md:inline-block">
            <ArrowGlyph direction="right" />
          </span>
          <span className="text-main md:hidden">
            <ArrowGlyph direction="down" />
          </span>
        </div>

        {/* after: 土地込み総額（やまとの見方） */}
        <div className="scroll-in flex flex-col justify-center rounded-xl bg-paper px-5 py-6 ring-1 ring-main/30">
          <p className="t-eyebrow text-main">やまとの見方</p>
          <p className="t-h3 mt-2 text-ink">土地込みの総額</p>
          <p className="t-body mt-2 text-ink">
            土地・外構・諸費用まで含めた総額を先に。だから毎月の支払いまで見えます。
          </p>
        </div>
      </div>

      {/* 相互証明矢印（S05 接合の導入図・蛍光なし・ink/deep-green/lime 点） */}
      <div className="scroll-in mt-7 border-t border-[color:var(--color-border)] pt-6 md:mt-8 md:pt-7">
        <p className="t-eyebrow mb-4 text-ink-muted">互いに支え合う</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <ProofPair left="土地" right="建物" />
          <span className="t-body text-ink-muted" aria-hidden>
            ＋
          </span>
          <ProofPair left="総額" right="月々" emphasize />
        </div>
        <p className="t-body mt-4 max-w-[46ch] text-ink-muted">
          土地と建物を合わせて、はじめて「総額」になります。だから、別々ではなく一緒にお見せします。
        </p>
      </div>
    </div>
  );
}

/** 相互証明の双方向矢印ペア（A ↔ B）。蛍光なし・deep-green / lime 点。 */
function ProofPair({
  left,
  right,
  emphasize = false,
}: {
  left: string;
  right: string;
  emphasize?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 ${
        emphasize
          ? "bg-main/10 ring-1 ring-main/30"
          : "bg-paper ring-1 ring-[color:var(--color-border)]"
      }`}
    >
      <span className="t-h3 text-ink" style={{ fontSize: "clamp(15px, 1.2vw, 19px)" }}>
        {left}
      </span>
      <span
        aria-hidden
        className={emphasize ? "text-main" : "text-ink-muted"}
        style={{ display: "inline-flex" }}
      >
        <BidirGlyph />
      </span>
      <span className="t-h3 text-ink" style={{ fontSize: "clamp(15px, 1.2vw, 19px)" }}>
        {right}
      </span>
      {/* lime 点（到達/肯定の証明・面塗りでなく点） */}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-lime"
      />
    </span>
  );
}

/** 一方向矢印（before→after 接合）。 */
function ArrowGlyph({ direction }: { direction: "right" | "down" }) {
  if (direction === "down") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="6 13 12 19 18 13" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

/** 双方向矢印（相互証明 ↔）。 */
function BidirGlyph() {
  return (
    <svg width="20" height="14" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="4" y1="8" x2="24" y2="8" />
      <polyline points="8 4 4 8 8 12" />
      <polyline points="20 4 24 8 20 12" />
    </svg>
  );
}
