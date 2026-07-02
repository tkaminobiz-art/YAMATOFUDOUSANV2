/**
 * S02CostDiagram — 「本体価格」以外の費用の “2層構造” を担うゾーン部品群。
 *
 * 2026-07-02 台帳ダッシュボード化（Phase A パイロット・◆compaction §5）:
 *   旧 default export（縦積み1枚図）を解体し、Estimate の BentoBoard 各ゾーンに座る
 *   3つの named export に再構成。連番アノテーション文法（規範実装）は
 *   _shared/bento/LedgerRow（AnnotationRow の一般化・weight="light" で低身長化）で温存。
 *   - CostReassuranceLedger … Z3 上段: やまとが別途いただかない費用（層②・安心の主役）
 *   - CostMechanismPanel   … Z2: 立面＋「本体価格」寸法線＋関係式＋上乗せ3行（層①）
 *   - CostVerdictLine      … Z4: 判定行「契約前に見た総額のまま、家が建ちます。」
 *
 * 2026-06-29 リビルド（design-scout 案3・P1）の文法は不変:
 *   - 技法A 連番アノテーション: 01–03＋名称＋注記をベースライン罫線に揃える。
 *   - 立面は mix-blend-multiply で地に溶かす（線画は墨だけ残る）。
 *   - 量感は「総額 ＝ 本体価格 ＋ 販売運営費」の関係式＋本体価格の寸法線で示す。
 *
 * a11y（WCAG 2.2 AA）: 立面は装飾（alt=""/aria-hidden、意味は dl が持つ）。赤文字は #8F211B（7.94:1）。
 *   地盤の限定「※自社分譲地が対象です」は同一行内に残す（景表法対応・LedgerRow caveat＝dd 内表示）。
 *   DOM は論理順、SP は素直な縦積み。reveal は親 RevealGroup の .is-visible 駆動（個別IOなし）。
 * コピーは copywriter 確定版（BRAND-TRUTH §4.2 / §4.4 / §4.4b、過剰断定・翻訳調チェック済・逐語不変）。
 */

import Image from "next/image";
import { LedgerGroup, LedgerRow } from "../_shared/bento";

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

/**
 * Z3 上段 — 安心台帳（層②・昇格のまま）: やまとが別途いただかない実費。
 * 赤を使わず深緑の連番で。台帳行は LedgerRow（tone="main"・weight="light" 低身長）。
 */
export function CostReassuranceLedger() {
  return (
    <div>
      <div className="scroll-in max-w-[40em]">
        <p className="t-eyebrow text-[color:var(--color-main)]">
          やまとが別途いただかない費用
        </p>
        <p className="t-body mt-3 text-[color:var(--color-ink)]">
          他社では、見積もりのあとから別途請求されることがあります。やまとは、これらを別途いただきません。
        </p>
      </div>

      <LedgerGroup rule="main" className="mt-6">
        {notBilledParts.map((part, i) => (
          <LedgerRow
            key={part.label}
            className="scroll-in"
            num={String(i + 1).padStart(2, "0")}
            term={part.label}
            description={part.note}
            caveat={part.caveat}
            tone="main"
            weight="light"
          />
        ))}
      </LedgerGroup>
    </div>
  );
}

/**
 * Z2 — 仕組み図パネル（層①・降格のまま）: 総額をふくらませる販売運営費。
 * 立面（mix-blend-multiply）＋「本体価格」寸法線＋関係式＋上乗せ3行（LedgerRow secondary）。
 */
export function CostMechanismPanel() {
  return (
    <div>
      <div className="scroll-in max-w-[40em]">
        <p className="t-eyebrow text-[color:var(--color-ink-muted)]">
          家の原価に上乗せされる費用
        </p>
        <p className="t-body mt-3 text-[color:var(--color-ink)]">
          総額をふくらませているのは、家そのものの原価ではありません。
          家の原価に含まれない、販売運営のための費用です。
        </p>
      </div>

      {/* 立面プレート: 生成りを地に溶かし墨線だけ残す（枠なし）。SP は幅70%（◆compaction §5(e)）。 */}
      <figure className="scroll-in mx-auto mt-8 w-[70%] lg:mx-0 lg:w-full">
        <div className="relative">
          <Image
            src="/images/bplan/s02-house-elevation-v2.webp"
            alt=""
            aria-hidden="true"
            width={1500}
            height={985}
            sizes="(max-width: 1024px) 70vw, 480px"
            className="h-auto w-full mix-blend-multiply"
          />
        </div>
        {/* 本体価格（横寸法線・建築図面の文法。端tick＋細線＋値中央） */}
        <figcaption
          aria-hidden="true"
          className="-mt-2 flex items-center gap-2 text-[color:var(--color-ink-muted)]"
        >
          <span className="h-2 w-px bg-[color:var(--color-rule)]" />
          <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
          <span className="t-eyebrow shrink-0">本体価格</span>
          <span className="h-px flex-1 bg-[color:var(--color-rule)]" />
          <span className="h-2 w-px bg-[color:var(--color-rule)]" />
        </figcaption>
      </figure>

      {/* 総額の関係式（現行の色構造のまま）。 */}
      <p className="scroll-in t-h3 mt-8 text-[color:var(--color-ink)]">
        総額 ＝ 本体価格 ＋{" "}
        <span className="text-[color:var(--color-risk-dark)]">販売運営費</span>
      </p>

      <LedgerGroup className="mt-5">
        {overheadParts.map((part, i) => (
          <LedgerRow
            key={part.label}
            className="scroll-in"
            num={String(i + 1).padStart(2, "0")}
            term={part.label}
            description={part.note}
            tone="risk"
            weight="light"
            secondary
          />
        ))}
      </LedgerGroup>
    </div>
  );
}

/**
 * Z4 — 判定行: 安心の結論。台帳の全幅帯として置く（t-h3・鍵句を解決色の緑で）。
 */
export function CostVerdictLine() {
  return (
    <p className="scroll-in t-h3 text-[color:var(--color-ink)]">
      契約前に見た
      <span className="text-[color:var(--color-main)]">総額のまま</span>
      、家が建ちます。
    </p>
  );
}
