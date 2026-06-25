import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import ReversalBridge from "./S04.client";

/**
 * S04 — やまとの逆転（前段）｜建物だけ思考からの転換
 *
 * 確定フレームワーク §S S04 ビルドカード:
 * - 役割/段: ③土地込み総額を先に（宣言）。心の段=④助走。主タイプ=T1/T3。
 * - surface=base（白・記事化）。黒地頂点 S05 への明度コントラスト準備（白→黒の助走）。
 * - 主役: t-h2 逆転宣言＋deep-green 下線（点）。「建物価格だけ」vs「土地込み総額」の対比1枚。
 * - スクショ確定: 相互証明矢印（総額↔月々 / 土地↔建物）を S04→S05 接合の導入図に。
 *   蛍光なし・ink/deep-green/lime 点のみ。
 * - モーション: fade+translateY（Y+12→0/600ms/ease-burn/IO once・叫ばない）→ .scroll-in 流用
 *   （reduced-motion で即表示・useScrollIn が即 .is-visible 付与）。
 * - CTA: なし（S05 へ流す）。
 *
 * 契約: `export default function S04(): JSX.Element`（props 無し・サーバー既定）。
 * モーション（useScrollIn）が要る図だけを子コンポーネント側で 'use client' 化している。
 */
export default function S04() {
  return (
    <SectionShell surface="base" aria-label="やまとの逆転｜土地込み総額を先に">
      <div className="mx-auto max-w-[920px]">
        <Eyebrow>The Reversal</Eyebrow>

        <h2 className="t-h2 text-ink">
          家づくりは、
          <span className="relative mx-0.5 inline-block">
            <span className="relative z-10">建物の価格だけ</span>
            {/* 取り消しの点線ではなく、視線を引き渡す deep-green の下線（点） */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 z-0 h-[0.18em] bg-main/25"
            />
          </span>
          では決まりません。
        </h2>

        <p className="t-body mt-6 max-w-[44ch] text-ink-muted">
          土地、外構、諸費用まで含めた「土地込みの総額」で見て、はじめて毎月の支払いがわかります。やまとは、その総額を先にお見せします。
        </p>

        {/* 対比1枚＋相互証明矢印（S05 接合の導入図） */}
        <ReversalBridge />
      </div>
    </SectionShell>
  );
}
