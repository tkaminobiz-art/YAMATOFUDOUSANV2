/**
 * S02CostDiagram — 「本体価格」以外の費用の “2層構造” を1枚で見せる図版。
 *
 * 2026-06-29 リビルド（design-scout 案3・P1）: 旧版の「量感ゲージ／宙に浮く引出し線」を撤去。
 * 採集した建築図面/編集誌の文法に置換:
 *   - 技法A 連番アノテーション（ACOR / Thierry Chopain）: 01–03＋名称＋注記をベースライン罫線に揃える。
 *     引出し線でなく番号で図と注釈を繋ぐ → “宙に浮く線” を解消。
 *   - 立面は背景透過ではなく mix-blend-multiply で地に溶かす → “枠に貼った感” を解消（線画は墨だけ残る）。
 *   - 量感は偽の塗りバーでなく「総額 ＝ 本体価格 ＋ 販売運営費」の関係式＋本体価格の寸法線で示す。
 *
 * 2026-06-29 再構成（安心先出し）: 見出しが“安心”を約束するのに合わせ、層②（やまとが別途
 *   いただかない実費＝安心の証拠）を先頭へ昇格、層①（総額がふくらむ仕組み＝販売運営費）を後ろへ。
 *   結びの「総額が崩れにくい」は仕組み説明のあとに置き、セクションの締めにする。
 *
 * 構成: 層② やまとが別途いただかない実費 → 層① 総額をふくらませる販売運営費。
 *
 * a11y（WCAG 2.2 AA）: 立面は装飾（alt=""/aria-hidden、意味は dl が持つ）。赤文字は #8F211B（7.94:1）。
 *   地盤の限定「※自社分譲地が対象です」は同一行内に残す（景表法対応）。DOM は論理順、SP は素直な縦積み。
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

// 連番アノテーション 1 行（技法A）。num は Oswald・色で層①/層②を分ける。
function AnnotationRow({
  num,
  label,
  note,
  caveat,
  tone,
}: {
  num: string;
  label: string;
  note: string;
  caveat?: string | null;
  tone: "risk" | "main";
}) {
  const accent =
    tone === "risk"
      ? "text-[color:var(--color-risk-dark)]"
      : "text-[color:var(--color-main)]";
  return (
    <div className="scroll-in grid grid-cols-[2.25rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-[color:var(--color-rule-faint)] py-5 sm:grid-cols-[2.5rem_12rem_1fr] sm:gap-x-7 sm:py-6">
      <span
        aria-hidden="true"
        className={`t-burn-sub tabular-nums ${accent}`}
      >
        {num}
      </span>
      <dt className={`t-h3 [word-break:keep-all] ${accent}`}>{label}</dt>
      <dd className="col-span-2 t-body text-[color:var(--color-ink-muted)] sm:col-span-1">
        {note}
        {caveat ? (
          <span className="mt-1 block text-[0.8em] text-[color:var(--color-ink-muted)]/85">
            {caveat}
          </span>
        ) : null}
      </dd>
    </div>
  );
}

export default function S02CostDiagram() {
  return (
    <div className="mt-12 sm:mt-16">
      {/* 層②（昇格）＝ 安心の証拠: やまとが別途いただかない実費。赤を使わず深緑の連番で。 */}
      <div className="scroll-in max-w-2xl">
        <p className="t-eyebrow text-[color:var(--color-main)]">
          やまとが別途いただかない費用
        </p>
        <p className="t-body mt-3 text-[color:var(--color-ink)]">
          他社では、見積もりのあとから別途請求されることがあります。やまとは、これらを別途いただきません。
        </p>
      </div>

      <dl className="mt-8 border-t border-[color:var(--color-main)]/25">
        {notBilledParts.map((part, i) => (
          <AnnotationRow
            key={part.label}
            num={String(i + 1).padStart(2, "0")}
            label={part.label}
            note={part.note}
            caveat={part.caveat}
            tone="main"
          />
        ))}
      </dl>

      {/* 層①（降格）＝ 仕組みの説明: 総額をふくらませる販売運営費。立面＋関係式＋連番（赤）。 */}
      <div className="mt-10 border-t border-[color:var(--color-border)] pt-8">
        <div className="scroll-in max-w-2xl">
          <p className="t-eyebrow text-[color:var(--color-ink-muted)]">
            家の原価に上乗せされる費用
          </p>
          <p className="t-body mt-3 text-[color:var(--color-ink)]">
            総額をふくらませているのは、家そのものの原価ではありません。
            家の原価に含まれない、販売運営のための費用です。
          </p>
        </div>

        {/* 立面（地に溶かす）＋連番アノテーション。引出し線・ゲージは使わない。 */}
        <div className="mt-10 grid items-center gap-x-14 gap-y-10 lg:grid-cols-[0.92fr_1.08fr]">
          {/* 立面プレート: mix-blend-multiply で生成りを地に溶かし、墨線だけ残す（枠なし）。家＝本体価格。 */}
          <figure className="scroll-in">
            <div className="relative">
              <Image
                src="/images/bplan/s02-house-elevation-v2.webp"
                alt=""
                aria-hidden="true"
                width={1500}
                height={985}
                sizes="(max-width: 1024px) 90vw, 560px"
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

          {/* 連番アノテーション（技法A）＝意味の正本。総額の関係式を見出しに。 */}
          <div>
            <p className="scroll-in t-h3 text-[color:var(--color-ink)]">
              総額 ＝ 本体価格 ＋{" "}
              <span className="text-[color:var(--color-risk-dark)]">販売運営費</span>
            </p>
            <dl className="mt-6 border-t border-[color:var(--color-rule)]">
              {overheadParts.map((part, i) => (
                <AnnotationRow
                  key={part.label}
                  num={String(i + 1).padStart(2, "0")}
                  label={part.label}
                  note={part.note}
                  tone="risk"
                />
              ))}
            </dl>
          </div>
        </div>

        {/* 締め＝ 安心の結論（仕組み説明のあとに置く） */}
        <p className="scroll-in t-body mt-12 max-w-2xl text-[color:var(--color-ink)]">
          あとから別途いただく費用がないぶん、契約前に見た総額の見通しが、あとで崩れにくくなります。
        </p>
      </div>
    </div>
  );
}
