import type { ReactNode } from "react";
import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import RevealGroup from "../_shared/RevealGroup";
import { DataBar } from "../_shared/bento";
import { paymentCases } from "../_data";

/**
 * RentVsLoan — 新7「家賃とローン」（14セクション新構成）。
 *
 * Phase A パイロット（CompareBar 検証枠・0.65vp 目標）。
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆compaction §7・◆synthesis
 * （裁定: 消える側を risk にしない＝家賃は中立の ink 系、やまと側だけ main）。
 *
 * 現S05分割の後半。前半 Budget.tsx（新6「予算・月々」）から続く、月々の意味づけの受け皿。
 * 現S05の投資哲学エッセンスの「解説」を、刺激的な見出しに頼らない事実系トーンで温存する。
 * Open Spec テキスト2カラム比較を「同一スケールの水平 CompareBar 1枚」に載せ替え:
 * 家賃 90,000＝ink 単値バー／やまと月々 81,298〜95,413＝main レンジ帯（両端 tick）。
 * 数字は .stat-lead のライブHTML静止表示（旧 !text-[clamp(38px,6vw,60px)] override を正規化）。
 *
 * レイアウト: 左 4/12＝見出し＋p1＋宣言2行（t-h3 格上げ・字句不変）／右 8/12＝比較レール
 * ＋解説段落（40em）＋試算前提注記。DOM順＝読み順（SP: 見出し→p1→比較→宣言→解説→注記）。
 *
 * surface=base（明面・記事化）／id なし。text-ink / text-ink-muted / text-main。
 *
 * 二度打ち規律: countUp は一切使わない（叫ぶ月々は Budget.tsx に一本化）。数値は全静止。
 * バーの伸長は親 RevealGroup の .is-visible 子孫セレクタ（.bento-bar-grow・IO once）
 * のみで駆動＝新規 IO なし。セクション本体はサーバーコンポーネントのまま。
 *
 * 「家賃は、払うほど消えていく。」は主役に据えない（言い換え方針）。「住みながら資産として
 * 残っていく」は柔らかい補助文として温存。試算前提注記を必ず併設（景表）。
 *
 * 契約: `export default function RentVsLoan(): JSX.Element`（props 無し・サーバー既定）。
 */

// やまとの月々目安レンジ（paymentCases の monthlyNum 実データから算出・静止表示）。
const monthlyValues = paymentCases.map((c) => c.monthlyNum);
const monthlyLow = Math.min(...monthlyValues); // 81,298
const monthlyHigh = Math.max(...monthlyValues); // 95,413

// 「今の家賃（例）」＝説明用の一例（実データではなく比較の目安として明示）。
const RENT_EXAMPLE = 90000;

// 比較レールの共通スケール上限（既存定数からのみ算出・%リテラル/数値リテラル禁止）。
const COMPARE_MAX = Math.max(RENT_EXAMPLE, monthlyHigh);

/** 数字表示（バーの外・ライブHTML静止）。suffix は現行の「円 / 月」表記を維持。 */
function LeadFigure({
  children,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  "aria-label": string;
}) {
  return (
    <span
      className="inline-flex flex-wrap items-baseline justify-end gap-x-2 gap-y-1"
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
}

export default function RentVsLoan() {
  return (
    <SectionShell surface="base" aria-label="今の家賃と比べて無理のない月々を考える">
      <RevealGroup>
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-[clamp(48px,5vw,88px)] lg:gap-y-12">
          {/* 左上 4/12 — 見出し＋p1 */}
          <div className="scroll-in lg:col-span-4">
            <Eyebrow>rent &amp; loan</Eyebrow>
            <h2 className="t-h2 text-ink">
              今の家賃と比べて、無理のない月々を考える。
            </h2>
            <p className="t-body mt-6 max-w-[40em] text-[16px] leading-[1.95] text-ink-muted">
              家を買うことが、すべてのご家庭にとって正解とは限りません。だからこそ、今の家賃、これからの教育費、車、貯蓄、暮らし方まで含めて、無理のない支払いかどうかを一緒に確認します。
            </p>
          </div>

          {/* 右上 8/12 — 同一スケールの水平 CompareBar（家賃=ink 単値バー／やまと=main レンジ帯） */}
          <div className="scroll-in lg:col-span-8">
            <DataBar
              variant="compare"
              max={COMPARE_MAX}
              items={[
                {
                  label: "今の家賃（例）",
                  value: RENT_EXAMPLE,
                  tone: "ink",
                  valueText: (
                    <LeadFigure
                      aria-label={`今の家賃の一例 ${RENT_EXAMPLE.toLocaleString("ja-JP")}円`}
                    >
                      <span className="stat-lead text-ink" aria-hidden>
                        {RENT_EXAMPLE.toLocaleString("ja-JP")}
                      </span>
                      <span
                        className="text-[14px] font-bold text-ink-muted"
                        aria-hidden
                      >
                        円 / 月
                      </span>
                    </LeadFigure>
                  ),
                },
                {
                  label: <span className="text-main">やまとの月々目安</span>,
                  range: [monthlyLow, monthlyHigh],
                  tone: "main",
                  valueText: (
                    <LeadFigure
                      aria-label={`やまとの月々目安 下限 ${monthlyLow.toLocaleString("ja-JP")}円 上限 ${monthlyHigh.toLocaleString("ja-JP")}円`}
                    >
                      <span className="stat-lead text-ink" aria-hidden>
                        {monthlyLow.toLocaleString("ja-JP")}
                      </span>
                      <span
                        className="text-[18px] font-bold text-ink-muted"
                        aria-hidden
                      >
                        〜
                      </span>
                      <span className="stat-lead text-ink" aria-hidden>
                        {monthlyHigh.toLocaleString("ja-JP")}
                      </span>
                      <span
                        className="text-[14px] font-bold text-ink-muted"
                        aria-hidden
                      >
                        円 / 月
                      </span>
                    </LeadFigure>
                  ),
                },
              ]}
            />
            {/* 各バーの読み（現行キャプション・字句不変・バー順） */}
            <div className="mt-4 max-w-[40em] space-y-1.5">
              <p className="t-body text-[12px] leading-[1.7] text-ink-muted">
                支払い続けても手元には残らない金額です。金額は説明用の一例です。
              </p>
              <p className="t-body text-[12px] leading-[1.7] text-ink-muted">
                土地込み総額から試算した、上の事例3件の月々の範囲です。
              </p>
            </div>
          </div>

          {/* 左下 4/12 — 宣言2行（t-h3 格上げ・字句不変） */}
          <div className="scroll-in space-y-2 lg:col-span-4">
            <p className="t-h3 text-ink">
              背伸びして買うのではなく、続けられる総額で考える。
            </p>
            <p className="t-h3 text-ink">それが、やまと不動産の資金計画です。</p>
          </div>

          {/* 右下 8/12 — 投資哲学の解説（事実系トーンで温存）＋試算前提注記 */}
          <div className="scroll-in lg:col-span-8">
            <div className="max-w-[40em] border-l-2 border-main/40 pl-6">
              <p className="t-body text-[15px] leading-[1.95] text-ink-muted">
                低金利と長期の借入れを賢く使えば、月々の負担を抑えながら、住み続けられる総額に収めることができます。毎月の返済は、暮らしながら住まいを自分のものとして残していく形になります。無理のない月々のなかで、その積み重ねをご一緒に整えていきます。
              </p>
            </div>

            {/* 試算前提注記（必須・景表・常設） */}
            <p className="t-body mt-6 max-w-[920px] text-[11px] leading-[1.85] tracking-[0.06em] text-ink-muted">
              ※月々の目安は試算用に金利1.0%・35年・元利均等・ボーナス払いなしで計算した一例です。実際の適用金利・審査条件・土地条件によって変わります。今の家賃は比較のための説明用の一例です。
            </p>
          </div>
        </div>
      </RevealGroup>
    </SectionShell>
  );
}
