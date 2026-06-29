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
 * 構成（2026-06-29 リデザイン・方向C／安心先出しへ再構成）:
 *   1. 導入: Eyebrow「No late add-ons」＋ h2「明瞭見積もり」＋ サブ（約束のみ）
 *      ＝ 見出しで“安心”を約束。具体3費目は層②へ一本化し重複を排除。
 *   2. S02CostDiagram: 安心→仕組みの順で2層を1枚に
 *      - 層②（昇格）やまとが別途いただかない実費（地盤改良費〔自社分譲地〕／運搬費／工事中の駐車場代）
 *      - 層①（降格）なぜ総額はふくらむか＝販売運営費（立面＋関係式＋連番）
 *   3. 状況グリッド: honestFeelings 5件（共感を2番手へ前出し・原文不変）
 * 文言: 「発生しない／ゼロ」は使わない。運搬費・駐車場代は総額に含む実費のため
 *   「別途いただかない／総額に含む」で訴求（BRAND-TRUTH §4.4b・景表法対応）。
 * モーション: row順次 reveal（Y+→0/ease-burn/IO once/stagger）。叫ばない。
 * CTA: なし（直後に page 側 [CTA-1]）。
 *
 * 契約: props 無し・サーバーコンポーネント既定。reveal の IO だけ子（S02.client）で client 化。
 */

// 状況提示＝5タイプを読者の状況語で（honestFeelings.feeling＝原文不変・感情断定NG）。
const situations = honestFeelings;

export default function S02() {
  return (
    <SectionShell surface="base" aria-label="あとから別途請求しない費用と、総額がふくらむ理由">
      <S02Reveal>
        <div className="max-w-3xl">
          <Eyebrow>No late add-ons</Eyebrow>
          <h2 className="t-h2 text-ink">
            明瞭見積もり
          </h2>
          <p className="t-body mt-6 text-ink">
            見積りのあとから、別途請求することはありません。
          </p>
        </div>

        {/* 2層の費用を1枚で（層②やまとが別途いただかない実費を先に／層①総額がふくらむ仕組みを後に） */}
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
