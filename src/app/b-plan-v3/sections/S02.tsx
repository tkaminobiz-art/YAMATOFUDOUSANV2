import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import { honestFeelings } from "../_data";
import S02CostDiagram from "./S02CostDiagram";
import S02Reveal from "./S02.client";

/**
 * S02 — 敵＝不透明な総額｜共感（§S ビルドカード）
 *
 * 役割: 敵の名指し（競合でなく「後出し費用・建物価格だけの判断」）。段=1・心の段=②関連性。
 *        主タイプ=T1見積落差 / T3ローン不安 / T4土地迷子（共感を2番手へ前出し）。
 * 構成（2026-06-29 リデザイン・方向C＋2層化）:
 *   1. 導入: Eyebrow「The opaque total」＋ h2「本体価格」以外の費用 ＋ リード文
 *   2. S02CostDiagram: 建築立面＋引出し線注釈で「2層の費用」を1枚に
 *      - 層① 価格に内包された販売運営費（広告費／展示場の維持費／仲介マージン）
 *      - 層② やまとが別途いただかない実費（地盤改良費〔自社分譲地〕／運搬費／工事中の駐車場代）
 *   3. 状況グリッド: honestFeelings 5件（共感を2番手へ前出し・原文不変）
 * モーション: row順次 reveal（Y+→0/ease-burn/IO once/stagger）。叫ばない。
 * CTA: なし（直後に page 側 [CTA-1]）。
 *
 * 契約: props 無し・サーバーコンポーネント既定。reveal の IO だけ子（S02.client）で client 化。
 */

// 状況提示＝5タイプを読者の状況語で（honestFeelings.feeling＝原文不変・感情断定NG）。
const situations = honestFeelings;

export default function S02() {
  return (
    <SectionShell surface="base" aria-label="不透明な総額という、家づくりでいちばん見えにくいもの">
      <S02Reveal>
        <div className="max-w-3xl">
          <Eyebrow>The opaque total</Eyebrow>
          <h2 className="t-h2 text-ink">
            「本体価格」以外の費用
          </h2>
          <p className="t-body mt-6 text-ink-muted">
            いちばん見えにくいのは、土地・建物・諸費用を合わせた「ほんとうの総額」。そして、あとから効いてくる費用です。
          </p>
        </div>

        {/* 2層の費用を1枚で（層①販売運営費＝家の原価に上乗せ／層②やまとが別途いただかない実費） */}
        <S02CostDiagram />

        {/* 5タイプの状況語（共感を2番手へ前出し・honestFeelings 原文不変） */}
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
