// 新5 明瞭見積もり（Estimate）… 現S02の S02CostDiagram ＋ 現S10 の costCompareRows 費用開示表を統合。

import SectionShell from "../_shared/SectionShell";
import KineticHeading from "../_shared/KineticHeading";
import S02Reveal from "./S02.client";
import S02CostDiagram from "./S02CostDiagram";
import EstimateDisclosure from "./Estimate.client";

/**
 * 新5 — 明瞭見積もり（Estimate）
 *
 * 役割: 「契約後に費用が増える」恐怖を先回りし、含まれる／別途必要／発生しないを契約前に一つずつ見せる。
 *        現S02の 2層費用図（S02CostDiagram・無改変）＋ 現S10 の費用開示表（costCompareRows 6件）を統合。
 *        この開示表は Estimate 専管（新10 安さの理由には costCompareRows 開示表を置かない前提）。
 * 構成:
 *   1. 見出し（KineticHeading）: 「契約前に、／増えやすい費用まで見せます。」
 *   2. リード本文（Murecho・逐語）: 含まれるもの／別途必要なもの／発生しないもの、まで。
 *   3. S02CostDiagram（無改変 import）: 別途いただかない実費（層②）＋ 販売運営費の仕組み（層①）。
 *   4. 費用開示表（EstimateDisclosure）: 費用名／一般的には(risk面)／やまとは の3列・役割別・generic table 禁止。
 *   5. 締め＋静かな text-link 1本（/money#costs）。
 * 数字バーンなし。id="costs"（下層 /money#costs へのアンカー整合）。
 * 出所: 現 src/app/b-plan-v3/sections/S02.tsx（S02CostDiagram）＋ S10.tsx（CostDisclosure 表）を統合。
 */

export default function Estimate() {
  return (
    <SectionShell id="costs" surface="base" aria-label="契約前に、増えやすい費用まで見せます">
      <header className="max-w-3xl">
        <KineticHeading
          lines={["契約前に、", "増えやすい費用まで見せます。"]}
          className="t-h2-display text-ink"
        />
        {/* 直書き<br>を廃止。ナレーション／3語／締めを構造で分離（3語は横並び・Phase2で図解チップへ移す）。 */}
        <div
          className="t-body mt-6 max-w-[40em] text-ink-muted"
          style={{ fontFamily: "var(--font-murecho)" }}
        >
          <p>家づくりで怖いのは、契約したあとに費用が増えていくこと。だからやまと不動産では、あとから出やすい項目を小さな注記にせず、契約前に一つずつ確認します。</p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-bold text-ink">
            <span>含まれるもの。</span>
            <span>別途必要なもの。</span>
            <span>発生しないもの。</span>
          </p>
          <p className="mt-4">すべてを見たうえで、納得して進めていただきます。</p>
        </div>
      </header>

      {/* 2層の費用を1枚で（S02CostDiagram 無改変・層②別途いただかない実費／層①総額がふくらむ仕組み）
          S02CostDiagram の .scroll-in は親の reveal で活性化する純表示部品のため、旧S02と同じく S02Reveal で包む。 */}
      <S02Reveal>
        <S02CostDiagram />
      </S02Reveal>

      {/* 費用開示表（現S10 CostDisclosure 移植・費用名／一般的には(risk面)／やまとは の3列） */}
      <div className="mt-16 border-t border-[color:var(--color-border)] pt-12">
        <p className="t-eyebrow text-ink-muted">契約前に、同じ表で確認する費用</p>
        <EstimateDisclosure />

        <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-8 sm:flex-row sm:items-start sm:justify-between">
          <p className="t-body max-w-2xl text-ink-muted">
            地盤改良費はかかりません（自社分譲地が対象です）。つなぎ融資も原則、発生しません。
            そのほかの項目も、ご一緒に一枚の表で整えてからご契約に進みます。
          </p>
          <a
            href="/money#costs"
            className="t-eyebrow inline-flex items-center gap-2 self-start text-main underline decoration-from-font underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
          >
            費用の内訳を見る
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
