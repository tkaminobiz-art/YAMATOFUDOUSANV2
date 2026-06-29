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
    img: "/images/bplan/s02-cost-ad.webp",
  },
  {
    label: "展示場の維持費",
    note: "総合展示場に常設する大型モデルハウスの建設・運営にかかる費用。",
    img: "/images/bplan/s02-cost-showroom.webp",
  },
  {
    label: "仲介マージン",
    note: "土地や工事を外部に任せたときに、間に入る分だけ積み上がる費用。",
    img: "/images/bplan/s02-cost-margin.webp",
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

        {/* 構造図: 広告費・展示場の維持費・仲介マージンが家の価格に積み上がる（方向①B 説明イラスト） */}
        <figure className="scroll-in mx-auto mt-12 max-w-3xl overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-cream)]">
          <Image
            src="/images/bplan/s02-cost-structure.webp"
            alt="広告費・展示場の維持費・仲介マージンという販売運営費が、家そのものの価格に上乗せされていく構造を示した図"
            width={1600}
            height={1194}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full"
          />
        </figure>

        {/* 敵の正体＝後出し費用の3列（各費用を説明イラストで可視化） */}
        <div className="mt-14 border-t border-[color:var(--color-border)] pt-10">
          <p className="t-eyebrow text-ink-muted">あとから効いてくる費用</p>
          <p className="t-body mt-4 max-w-2xl text-ink">
            総額をふくらませているのは、家そのものの原価ではありません。
            家の原価に含まれない、販売運営のための費用です。
          </p>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-3">
            {enemyParts.map((part) => (
              <li
                key={part.label}
                className="scroll-in flex flex-col bg-paper"
              >
                <div className="relative aspect-[4/3] w-full bg-[color:var(--color-cream)]">
                  <Image
                    src={part.img}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 p-6 sm:p-7">
                  <h3 className="t-h3 text-ink">{part.label}</h3>
                  <p className="t-body text-ink-muted">{part.note}</p>
                </div>
              </li>
            ))}
          </ul>
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
