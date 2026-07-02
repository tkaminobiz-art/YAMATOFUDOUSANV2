// 新5 明瞭見積もり（Estimate）… 費用台帳ダッシュボード（Phase A パイロット・◆compaction §5）。

import SectionShell from "../_shared/SectionShell";
import KineticHeading from "../_shared/KineticHeading";
import RevealGroup from "../_shared/RevealGroup";
import {
  BentoBoard,
  BentoCell,
  ChipRow,
  LedgerGroup,
  LedgerRow,
} from "../_shared/bento";
import type { Chip } from "../_shared/bento";
import { costCompareRows } from "../_data";
import {
  CostMechanismPanel,
  CostReassuranceLedger,
  CostVerdictLine,
} from "./S02CostDiagram";

/**
 * 新5 — 明瞭見積もり（Estimate）
 *
 * 役割: 「契約後に費用が増える」恐怖を先回りし、含まれる／別途必要／発生しないを契約前に一つずつ見せる。
 *        旧「S02CostDiagram → 開示表」の縦流し（同じ費用の白黒が図と表で二度流れる冗長）を、
 *        1枚の費用台帳ダッシュボード（BentoBoard・外周開放・gap-px hairline）へ統合。
 * 構成（◆compaction §5 の4ゾーン）:
 *   Z1 ヘッダーレール … 見出し（KineticHeading）＋リード（左）／3語の凡例チップ＋確認文（右）。
 *      凡例は ChipRow variant="data"（裁定2: 角2px正方マーク）。3値の色は技法11の規約
 *      （含まれる=main／別途=muted／発生しない・他社なら増える=risk 系）。
 *   Z2 仕組み図パネル（左 5/12・2行ぶち抜き） … S02CostDiagram.CostMechanismPanel
 *      （立面＋「本体価格」寸法線＋関係式＋上乗せ3行）。
 *   Z3 安心台帳（右 7/12） … 上段=CostReassuranceLedger（別途いただかない3行・連番01–03）、
 *      下段=開示台帳（costCompareRows 6件・LedgerRow.Compare 開放罫・連番04–09で同一台帳に縦連結）。
 *   Z4 判定行（全幅） … CostVerdictLine ＋ 締め段落・「費用の内訳を見る」リンク。
 * モーション: reveal は単一 RevealGroup（.is-visible 駆動・ローカル useReveal / S02Reveal 廃止）。
 * 数字バーンなし・countUp なし。id="costs"（下層 /money#costs へのアンカー整合）。
 * コピーは全て逐語不変（座席の移動のみ）。caveat「※自社分譲地が対象です」は同一行内表示（景表）。
 */

// Z1 凡例チップ（コピー逐語・句点ごと1チップ・font-bold は .bento-chip が持つ）。
const legendChips: readonly Chip[] = [
  { label: "含まれるもの。", tone: "main" },
  { label: "別途必要なもの。", tone: "muted" },
  { label: "発生しないもの。", tone: "risk" },
];

export default function Estimate() {
  return (
    <SectionShell id="costs" surface="base" aria-label="契約前に、増えやすい費用まで見せます">
      <RevealGroup>
        {/* Z1 ヘッダーレール: 見出し＋リード（左7）／凡例チップ＋確認文（右5） */}
        <header className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <KineticHeading
              lines={["契約前に、", "増えやすい費用まで見せます。"]}
              className="t-h2-display text-ink"
            />
            <p
              className="scroll-in t-body mt-6 max-w-[40em] text-ink-muted"
              style={{ fontFamily: "var(--font-murecho)" }}
            >
              家づくりで怖いのは、契約したあとに費用が増えていくこと。だからやまと不動産では、あとから出やすい項目を小さな注記にせず、契約前に一つずつ確認します。
            </p>
          </div>
          <div className="lg:col-span-5">
            <ChipRow
              variant="data"
              chips={legendChips}
              chipClassName="scroll-in"
              aria-label="費用台帳の凡例"
            />
            <p
              className="scroll-in t-body mt-4 text-ink-muted"
              style={{ fontFamily: "var(--font-murecho)" }}
            >
              すべてを見たうえで、納得して進めていただきます。
            </p>
          </div>
        </header>

        {/* 費用台帳ダッシュボード（1セクション1ボード・外周は上下罫のみ・四辺閉じなし） */}
        <BentoBoard mode="rule" frame="both" className="mt-[clamp(48px,5vw,80px)]">
          {/* Z3 上段 — 安心台帳（右 7/12・主役セル） */}
          <BentoCell span={7} pad="heavy" className="lg:col-start-6">
            <CostReassuranceLedger />
          </BentoCell>

          {/* Z2 — 仕組み図パネル（左 5/12・2行ぶち抜き） */}
          <BentoCell
            span={5}
            rowSpan={2}
            pad="medium"
            className="lg:col-start-1 lg:row-start-1"
          >
            <CostMechanismPanel />
          </BentoCell>

          {/* Z3 下段 — 開示台帳（同一台帳に縦連結・連番04–09） */}
          <BentoCell span={7} pad="medium" className="lg:col-start-6">
            <p className="scroll-in t-eyebrow text-ink-muted">
              契約前に、同じ表で確認する費用
            </p>
            <LedgerGroup as="ul" className="mt-5">
              {costCompareRows.map((row, i) => (
                <li key={row.label} className="scroll-in">
                  <LedgerRow.Compare
                    term={
                      /* 連番は見出しの上に積む（200px セル内で横 flex にすると
                         幅詰まりで overflow-wrap:anywhere が発火し「0/4」「中間マー/ジン」の
                         語中折れが起きる＝字詰め規約違反）。 */
                      <div>
                        <span
                          aria-hidden
                          className="t-eyebrow whitespace-nowrap tabular-nums text-ink-muted/70"
                        >
                          {String(i + 4).padStart(2, "0")}
                        </span>
                        <h3 className="t-h3 mt-1.5 text-[1.08rem] text-ink md:text-[1.15rem]">
                          {row.label}
                        </h3>
                      </div>
                    }
                    general={
                      <div>
                        <p className="t-eyebrow text-risk-dark">一般的には</p>
                        <p className="t-body mt-2 text-ink/80">{row.general}</p>
                      </div>
                    }
                    answer={
                      <div>
                        <p className="t-eyebrow text-main">やまとは</p>
                        <p className="t-h3 mt-2 text-[1.15rem] leading-snug text-main md:text-[1.25rem]">
                          {row.answer}
                        </p>
                        <p className="mt-1.5 text-[12px] leading-[1.7] text-ink-muted">
                          {row.reason}
                        </p>
                      </div>
                    }
                  />
                </li>
              ))}
            </LedgerGroup>
          </BentoCell>

          {/* Z4 — 判定行（台帳の全幅帯） */}
          <BentoCell span={12} pad="medium">
            <CostVerdictLine />
          </BentoCell>

          {/* Z4 最終行 — 締め段落＋下層リンク */}
          <BentoCell span={12} pad="light">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <p className="scroll-in t-body max-w-[40em] text-ink-muted">
                地盤改良費はかかりません（自社分譲地が対象です）。つなぎ融資も原則、発生しません。
                そのほかの項目も、ご一緒に一枚の表で整えてからご契約に進みます。
              </p>
              <a
                href="/money#costs"
                className="scroll-in t-eyebrow inline-flex items-center gap-2 self-start text-main underline decoration-from-font underline-offset-4 transition-colors hover:text-main-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
              >
                費用の内訳を見る
                <span aria-hidden>→</span>
              </a>
            </div>
          </BentoCell>
        </BentoBoard>
      </RevealGroup>
    </SectionShell>
  );
}
