// 新2 不安の代弁（Anxiety）… 現S02の honestFeelings 状況グリッドを核に共感を主役化。S02CostDiagram は持ち込まない。

import SectionShell from "../_shared/SectionShell";
import KineticHeading from "../_shared/KineticHeading";
import { honestFeelings } from "../_data";
import S02Reveal from "./S02.client";

/**
 * 新2 — 不安の代弁（Anxiety）
 *
 * 役割: 家づくりの不安＝「総額が見えない」を名指しして共感を主役化。心の段=②関連性。
 *        現S02の honestFeelings(5) 状況グリッドを核に据え、S02CostDiagram / 数字バーン / CTA は持たない。
 * 構成:
 *   1. 見出し（KineticHeading）: 「家づくりが不安なのは、／総額が見えないから。」
 *   2. リード本文（Murecho・逐語）: 不安を残したまま契約へ進んでほしくない、まで。
 *   3. 状況グリッド: honestFeelings 5件（左罫線グリッド・feeling 原文不変・感情断定NG）。
 * モーション: 現S02の S02Reveal（./S02.client 流用）で row順次 reveal（.scroll-in ＋ useScrollIn stagger）。
 * 契約: props 無し・サーバーコンポーネント既定。reveal の IO だけ子（S02.client）で client 化。
 * 出所: 現 src/app/b-plan-v3/sections/S02.tsx（honestFeelings グリッド部分）を分割・共感前出し。
 */

// 状況提示＝5タイプを読者の状況語で（honestFeelings.feeling＝原文不変・感情断定NG）。
const situations = honestFeelings;

export default function Anxiety() {
  return (
    <SectionShell surface="base" aria-label="家づくりが不安なのは、総額が見えないから">
      <S02Reveal>
        <div className="max-w-3xl">
          <KineticHeading
            lines={["家づくりが不安なのは、", "総額が見えないから。"]}
            className="t-h2-display text-ink"
          />
          <p
            className="t-body mt-6 text-ink-muted"
            style={{ fontFamily: "var(--font-murecho)" }}
          >
            展示場で聞いた建物価格に、あとから土地代や諸費用が加わる。
            <br />
            標準だと思っていたものが、実はオプションだった。
            <br />
            土地が決まらないまま、間取りや予算の話だけが進んでいく。
            <br />
            そんな不安を残したまま、契約へ進んでほしくありません。
          </p>
        </div>

        {/* 5タイプの状況語（共感を主役化・honestFeelings 原文不変・左罫線グリッド） */}
        <div className="mt-14 border-t border-[color:var(--color-border)] pt-10">
          <p className="t-eyebrow text-ink-muted">家を考えるとき、こんな状況が重なります</p>
          <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {situations.map((s) => (
              <li
                key={s.number}
                className="scroll-in flex gap-5 border-l-2 border-main/30 pl-5"
              >
                <span className="t-burn-sub mt-0.5 shrink-0 text-main/50" aria-hidden="true">
                  {s.number}
                </span>
                <div>
                  <p className="t-eyebrow text-main">{s.category}</p>
                  <p className="t-body mt-2 text-ink">{s.feeling}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </S02Reveal>
    </SectionShell>
  );
}
