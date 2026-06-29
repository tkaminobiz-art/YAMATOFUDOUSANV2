/**
 * S02CostDiagram — 「本体価格」以外の費用の “2層構造” を1枚で見せる図版。
 *
 * 採用方向C（建築立面＋引出し線注釈）を DESIGN_GUARDRAILS 準拠で実装。
 * 5レンズ・デザインミーティング（2026-06-29）の統合結論:
 *   - 層①＝価格に内包された販売運営費（家の原価に上乗せ）。立面から外へ引出す Annotation。
 *   - 層②＝やまとが別途いただかない実費。赤を使わず “深緑の静かな対比” で（色衝突事故の回避）。
 *   - 量感は建築図面の言語（寸法線「総額／家の原価」）で示す。棒グラフ（A案）は持ち込まない。
 *
 * a11y（WCAG 2.2 AA）:
 *   - 家＝装飾レイヤ（alt="" / aria-hidden）。意味はラベルの <dl> が持つ。
 *   - 引出し線・接続点・寸法線の SVG は aria-hidden / focusable=false、内部に <text> を置かない。
 *   - DOM は「タイトル→層①→層②」の論理順。視覚配置は CSS（SR 読み上げ順は不変）。
 *   - 赤文字は #8F211B（--color-risk-dark, 7.94:1）。点（非テキスト）のみ #E84336。
 *   - 地盤の限定「※自社分譲地が対象です」は同一行内に残す（限定を隠さない＝景表法対応）。
 *
 * 立面は Recraft 4.1 生成の鉛筆エレベーション（文字なし）。背景 #FDF9F1 はプレートと同色で溶かす。
 * コピーは copywriter 確定版（BRAND-TRUTH §4.2 / §4.4 / §4.4b、過剰断定・翻訳調チェック済）。
 */

import Image from "next/image";

// 層① 価格に内包された販売運営費（家の原価に上乗せ・憲法4.2 具体核・抽象化禁止）。
const overheadParts = [
  { label: "広告費", note: "テレビCM・住宅情報誌・モデルハウスへの集客にかかる費用。" },
  {
    label: "展示場の維持費",
    note: "総合展示場に常設する大型モデルハウスの建設・運営にかかる費用。",
  },
  {
    label: "仲介マージン",
    note: "土地や工事を外部に任せたときに、間に入る分だけ積み上がる費用。",
  },
] as const;

// 層② やまとが別途いただかない実費（BRAND-TRUTH §4.4 / §4.4b・「一切/ゼロ」禁止・請求方針の事実摘示）。
const notBilledParts = [
  {
    label: "地盤改良費",
    note: "やまとの分譲地は、地盤を整えてからお渡しします。だから地盤改良費はかかりません。",
    caveat: "※自社分譲地が対象です",
  },
  {
    label: "運搬費",
    note: "工事に使う資材の運搬にかかる費用は、別途いただきません。総額に含みます。",
    caveat: null,
  },
  {
    label: "工事中の駐車場代",
    note: "工事のあいだに使う駐車スペースの費用も、別途いただきません。総額に含みます。",
    caveat: null,
  },
] as const;

// 立面プレート右辺の接続点（3費目に対応）。点（赤・丸）＋外へ短い墨線で建築 callout を模す。
const leaderTops = ["22%", "50%", "78%"] as const;

export default function S02CostDiagram() {
  return (
    <div className="mt-12 sm:mt-16">
      {/* ── 層①: 建築立面＋引出し線注釈（販売運営費が家の原価に上乗せ） ── */}
      {/* リード文は図の上に全幅で出す（引出し線が下の3ラベルと素直に対応するように） */}
      <div className="scroll-in max-w-2xl">
        <p className="t-eyebrow text-[color:var(--color-ink-muted)]">
          家の原価に上乗せされる費用
        </p>
        <p className="t-body mt-3 text-[color:var(--color-ink)]">
          総額をふくらませているのは、家そのものの原価ではありません。
          家の原価に含まれない、販売運営のための費用です。
        </p>
      </div>

      <div className="mt-8 grid items-center gap-x-12 gap-y-8 lg:grid-cols-[1.08fr_0.92fr]">
        {/* 立面プレート（家＝装飾・写真は最後）。左の寸法線「総額／家の原価」で量感を建築図面の言語で示す。 */}
        <figure className="scroll-in relative">
          {/* 量感を建築図面の言語で: 総額ゲージ（緑ボディ＝本体価格／赤キャップ＝販売運営費が屋根の上に乗る）＋立面＋引出し線。 */}
          <div className="flex items-end gap-3 sm:gap-4">
            {/* 総額ラベル（縦・全高） */}
            <span
              aria-hidden="true"
              className="t-eyebrow flex shrink-0 items-center self-stretch text-[color:var(--color-ink-muted)] [writing-mode:vertical-rl]"
            >
              総額
            </span>

            {/* 量感ゲージ: 赤キャップ＝販売運営費（家の上に乗る）／緑ボディ＝本体価格。割合は示唆のみ・数値は出さない。 */}
            <div aria-hidden="true" className="flex shrink-0 flex-col">
              <span className="h-24 w-4 border-t-2 border-[color:var(--color-risk)]/60 bg-[color:var(--color-risk)]/18 sm:h-28" />
              <span className="h-[300px] w-4 bg-[color:var(--color-main)]/12 sm:h-[380px] lg:h-[440px]" />
            </div>

            {/* 家の鉛筆立面（Recraft 生成・文字なし）。高さ＝ゲージの本体価格ボディと一致＝本体価格。 */}
            {/* 家＝装飾レイヤ（意味は右の dl が持つ）→ alt=""・aria-hidden で読み上げ対象外。 */}
            <div className="relative h-[300px] flex-1 bg-[#FDF9F1] sm:h-[380px] lg:h-[440px]">
              <Image
                src="/images/bplan/s02-house-elevation.webp"
                alt=""
                aria-hidden="true"
                width={1500}
                height={1216}
                sizes="(max-width: 1024px) 90vw, 620px"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* 引出し線＋接続点（CSS・純装飾）。点のみ赤・丸／線は墨細。右辺から外へ短く引く。 */}
              {leaderTops.map((top, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute left-full flex -translate-y-1/2 items-center"
                  style={{ top }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-risk)]" />
                  <span className="h-px w-6 bg-[color:var(--color-rule-strong)] sm:w-8" />
                </span>
              ))}
            </div>
          </div>
          {/* 本体価格（横寸法線・立面の幅に対応） */}
          <figcaption
            aria-hidden="true"
            className="mt-2 flex items-center gap-2 pl-[3.75rem] text-[color:var(--color-ink-muted)] sm:pl-[4.5rem]"
          >
            <span className="h-2 w-px bg-[color:var(--color-rule)]" />
            <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
            <span className="t-eyebrow shrink-0">本体価格</span>
            <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
            <span className="h-2 w-px bg-[color:var(--color-rule)]" />
          </figcaption>
        </figure>

        {/* 層① ラベル群＝意味の正本（Open Spec・上下罫線のみ・均等カード禁止）。赤文字は #8F211B。 */}
        <div className="scroll-in">
          <dl className="divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
            {overheadParts.map((part, i) => (
              <div
                key={part.label}
                className="grid grid-cols-[2rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 sm:grid-cols-[2.25rem_max-content_1fr] sm:gap-x-6"
              >
                <span
                  aria-hidden="true"
                  className="t-eyebrow tabular-nums text-[color:var(--color-risk-dark)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="t-h3 whitespace-nowrap text-[color:var(--color-risk-dark)]">
                  {part.label}
                </dt>
                <dd className="col-span-2 t-body text-[color:var(--color-ink-muted)] sm:col-span-1">
                  {part.note}
                </dd>
              </div>
            ))}
          </dl>

          <p className="t-eyebrow mt-4 text-[color:var(--color-risk-dark)]">
            ＝ 販売運営費
          </p>
        </div>
      </div>

      {/* ── 層②: やまとが別途いただかない実費（赤を使わない・深緑の静かな対比） ── */}
      <div className="mt-14 border-t border-[color:var(--color-border)] pt-10 sm:mt-16">
        <p className="t-eyebrow text-[color:var(--color-main)]">
          やまとが別途いただかない費用
        </p>
        <p className="t-body mt-3 max-w-2xl text-[color:var(--color-ink)]">
          他社では、見積もりのあとから別途請求されることがあります。やまとは、これらを別途いただきません。
        </p>

        <dl className="mt-8 grid gap-x-10 gap-y-8 border-t border-[color:var(--color-main)]/25 pt-8 md:grid-cols-3">
          {notBilledParts.map((part) => (
            <div key={part.label} className="scroll-in flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-6 w-px shrink-0 bg-[color:var(--color-main)]/60"
              />
              <div>
                <dt className="t-h3 text-[color:var(--color-main)]">{part.label}</dt>
                <dd className="t-body mt-2 text-[color:var(--color-ink-muted)]">
                  {part.note}
                  {part.caveat ? (
                    <span className="mt-1 block text-[0.8em] text-[color:var(--color-ink-muted)]/85">
                      {part.caveat}
                    </span>
                  ) : null}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="t-body mt-8 max-w-2xl text-[color:var(--color-ink)]">
          あとから別途いただく費用がないぶん、契約前に見た総額の見通しが、あとで崩れにくくなります。
        </p>
      </div>
    </div>
  );
}
