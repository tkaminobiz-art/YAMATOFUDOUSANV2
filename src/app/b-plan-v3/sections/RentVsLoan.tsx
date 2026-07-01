import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import BurnNumber from "../_shared/BurnNumber";
import { paymentCases } from "../_data";

/**
 * RentVsLoan — 新7「家賃とローン」（14セクション新構成）。
 *
 * 現S05分割の後半。前半 Budget.tsx（新6「予算・月々」）から続く、月々の意味づけの受け皿。
 * 現S05の投資哲学エッセンスの「解説」を、刺激的な見出しに頼らない事実系トーンで温存する。
 * 「今の家賃（例）」と「やまとの月々目安」を Open Spec 風の静的比較で1枚示す。
 *
 * surface=base（明面・記事化）／id なし。text-ink / text-ink-muted / text-main。
 *
 * 二度打ち規律: countUp は一切使わない（叫ぶ月々は Budget.tsx に一本化）。
 * 数値は静止（BurnNumber countUp={false}）。そのためサーバーコンポーネントで完結する
 * （client 化しない＝二度打ち構造を発生させない）。
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

export default function RentVsLoan() {
  return (
    <SectionShell surface="base" aria-label="今の家賃と比べて無理のない月々を考える">
      <div className="max-w-[980px]">
        <Eyebrow>rent &amp; loan</Eyebrow>
        <h2 className="t-h2 text-ink">
          今の家賃と比べて、無理のない月々を考える。
        </h2>
        <div className="mt-6 max-w-[820px] space-y-4">
          <p className="t-body text-[16px] leading-[1.95] text-ink-muted">
            家を買うことが、すべてのご家庭にとって正解とは限りません。だからこそ、今の家賃、これからの教育費、車、貯蓄、暮らし方まで含めて、無理のない支払いかどうかを一緒に確認します。
          </p>
          <p className="t-body text-[16px] leading-[1.95] text-ink-muted">
            背伸びして買うのではなく、続けられる総額で考える。
          </p>
          <p className="t-body text-[16px] leading-[1.95] text-ink-muted">
            それが、やまと不動産の資金計画です。
          </p>
        </div>
      </div>

      {/* Open Spec 風の静的比較（上下 hairline・左右開放・均等カードにしない）。数値は静止。 */}
      <div className="mt-12 max-w-[900px] md:mt-16">
        <div className="border-t border-ink/15">
          <div className="grid gap-x-12 gap-y-8 py-8 sm:grid-cols-2">
            {/* 今の家賃（例） */}
            <div>
              <p className="t-eyebrow text-ink-muted">今の家賃（例）</p>
              <p className="mt-3 flex items-baseline gap-2 text-ink">
                <BurnNumber
                  value={RENT_EXAMPLE}
                  countUp={false}
                  burnClassName="!text-[clamp(38px,6vw,60px)] leading-none text-ink"
                  suffix="円 / 月"
                  suffixClassName="text-[14px] font-bold text-ink-muted"
                  aria-label={`今の家賃の一例 ${RENT_EXAMPLE.toLocaleString("ja-JP")}円`}
                />
              </p>
              <p className="t-body mt-3 text-[12px] leading-[1.7] text-ink-muted">
                支払い続けても手元には残らない金額です。金額は説明用の一例です。
              </p>
            </div>

            {/* やまとの月々目安（レンジ・実データ由来） */}
            <div className="sm:border-l sm:border-ink/15 sm:pl-12">
              <p className="t-eyebrow text-main">やまとの月々目安</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-ink">
                <BurnNumber
                  value={monthlyLow}
                  countUp={false}
                  burnClassName="!text-[clamp(38px,6vw,60px)] leading-none text-ink"
                  aria-label={`やまとの月々目安 下限 ${monthlyLow.toLocaleString("ja-JP")}円`}
                />
                <span className="t-body text-[18px] font-bold text-ink-muted" aria-hidden>
                  〜
                </span>
                <BurnNumber
                  value={monthlyHigh}
                  countUp={false}
                  burnClassName="!text-[clamp(38px,6vw,60px)] leading-none text-ink"
                  suffix="円 / 月"
                  suffixClassName="text-[14px] font-bold text-ink-muted"
                  aria-label={`上限 ${monthlyHigh.toLocaleString("ja-JP")}円`}
                />
              </p>
              <p className="t-body mt-3 text-[12px] leading-[1.7] text-ink-muted">
                土地込み総額から試算した、上の事例3件の月々の範囲です。
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-ink/15" />
      </div>

      {/* 投資哲学の解説を事実系トーンで温存（刺激的な見出しは主役に据えない） */}
      <div className="mt-12 max-w-[820px] border-l-2 border-main/40 pl-6">
        <p className="t-body text-[15px] leading-[1.95] text-ink-muted">
          低金利と長期の借入れを賢く使えば、月々の負担を抑えながら、住み続けられる総額に収めることができます。毎月の返済は、暮らしながら住まいを自分のものとして残していく形になります。無理のない月々のなかで、その積み重ねをご一緒に整えていきます。
        </p>
      </div>

      {/* 試算前提注記（必須・景表） */}
      <p className="t-body mt-8 max-w-[920px] text-[11px] leading-[1.85] tracking-[0.06em] text-ink-muted">
        ※月々の目安は試算用に金利1.0%・35年・元利均等・ボーナス払いなしで計算した一例です。実際の適用金利・審査条件・土地条件によって変わります。今の家賃は比較のための説明用の一例です。
      </p>
    </SectionShell>
  );
}
