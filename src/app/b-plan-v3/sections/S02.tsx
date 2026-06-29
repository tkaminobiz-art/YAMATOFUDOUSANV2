import Image from "next/image";
import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import { honestFeelings } from "../_data";
import S02Reveal from "./S02.client";

/**
 * S02 — 敵＝不透明な総額｜共感（§S ビルドカード）
 *
 * 役割: 敵の名指し（競合でなく「後出し費用・建物価格だけの判断」）。段=1・心の段=②関連性。
 *        主タイプ=T1見積落差 / T3ローン不安 / T4土地迷子（共感を2番手へ前出し）。
 * 主役要素: t-h2（敵の名指し）＋ t-body。敵側に sign-red 点のみ。surface-base（記事化・休止）。
 * コピー: 敵の正体＝広告費・展示場の維持費・仲介マージン＝家の原価に含まれない販売運営のための費用
 *        （憲法4.2具体核・抽象化禁止）。疑問形/感情断定NG。
 * モーション: row順次 reveal（Y+16→0/760ms/ease-burn/IO once/stagger）。叫ばない。
 * CTA: なし（直後に page 側 [CTA-1]）。
 *
 * 契約: props 無し・サーバーコンポーネント既定。reveal の IO だけ子（S02.client）で client 化。
 */

// 敵の正体＝後出し費用の具体核（憲法4.2・抽象化禁止・名指し競合なし・過剰断定なし）。
// sign-red は「点」のみで運ぶ（面塗り/赤文字でない）。
const enemyParts = [
  {
    label: "広告費",
    note: "テレビCM・住宅情報誌・モデルハウスへの集客にかかる費用。",
  },
  {
    label: "展示場の維持費",
    note: "総合展示場に常設する大型モデルハウスの建設・運営にかかる費用。",
  },
  {
    label: "仲介マージン",
    note: "土地や工事を外部に任せたときに、間に入る分だけ積み上がる費用。",
  },
] as const;

// 状況提示＝5タイプを読者の状況語で（honestFeelings.feeling＝原文不変・感情断定NG）。
// T1見積落差 / T2ブランド憧れ / T3ローン不安 / T4土地迷子 / T5妥協回避 を honestFeelings 5件で受ける。
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

        {/* 構造図: 販売運営費が家の価格に上乗せされる関係を1枚で（枠なし・角丸なし＝図版が地に溶ける） */}
        <figure className="scroll-in mt-12 sm:mt-16">
          <Image
            src="/images/bplan/s02-cost-structure.webp"
            alt="広告費・展示場の維持費・仲介マージンという販売運営費が、家そのものの価格に上乗せされていく構造を示した図"
            width={1600}
            height={1194}
            sizes="(max-width: 768px) 100vw, 720px"
            className="mx-auto h-auto w-full max-w-[720px]"
          />
        </figure>

        {/* 敵の正体＝後出し費用（Open Spec・箱に入れない／上下罫線のみ／均等カード禁止） */}
        <div className="mt-16 max-w-4xl sm:mt-20">
          <p className="t-eyebrow text-ink-muted">あとから効いてくる費用</p>
          <p className="t-body mt-4 max-w-2xl text-ink">
            総額をふくらませているのは、家そのものの原価ではありません。
            家の原価に含まれない、販売運営のための費用です。
          </p>

          <dl className="mt-10 divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
            {enemyParts.map((part, i) => (
              <div
                key={part.label}
                className="scroll-in grid grid-cols-[2.25rem_1fr] items-baseline gap-x-5 gap-y-1.5 py-6 sm:grid-cols-[2.75rem_max-content_1fr] sm:gap-x-10 sm:py-7"
              >
                <span
                  className="t-eyebrow tabular-nums text-risk"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="t-h3 whitespace-nowrap text-ink">{part.label}</dt>
                <dd className="col-span-2 t-body text-ink-muted sm:col-span-1">
                  {part.note}
                </dd>
              </div>
            ))}
          </dl>
        </div>

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
