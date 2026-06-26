"use client";

import { useEffect, useRef, useState } from "react";
import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import { costMechanisms, costCompareRows } from "../_data";
import { FUNDING_PLANS } from "@/data/brand-facts";

/**
 * S06 — 価格メカニズム3事実｜なぜこの総額か。
 *
 * 契約: `export default function S06(): JSX.Element`（props 無し）。
 * surface=ink（§3.3 暗面4回限定の1つ）。役割=②なぜできるか（抽象化禁止）。
 *
 * このファイルは reveal / 比較バー scaleX のために 'use client'。
 * default export は props 無しのまま。bespoke 図（ピラミッド・非対称比較・価値3円）は
 * すべてこのファイル内に自己完結で実装する（共有ファイルは触らない）。
 *
 * 主役（フレームワーク §S S06）:
 *  - 3事実（costMechanisms）= ①自社分譲地モデルハウス二重利用（最大の差別化）
 *    ②自社一貫体制・中間マージンなし ③広告費必要最小限。
 *  - 非対称比較= 他社=sign-red面 / やまと=deep-green面・scaleX0→1。内訳%は出さない。
 *  - 3根拠ピラミッド図= 土台に①二重利用・上に②自社一貫 ③広告費最小限。
 *  - 価値3円図（deep-green）= S06末に確定配置（S08前には置かない）。
 *
 * 断定OKはこの2つだけ（憲法例外）: つなぎ融資「原則発生しません」/ 地盤改良費「一切かかりません」。
 * 叫ばない（巨大バーンは出さない・1,000件のみ言及）。
 */

/* ── reveal: IntersectionObserver で一度だけ可視化（reduced-motion は即時） ── */
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

/* ── ① 3根拠ピラミッド図 ──
   土台＝二重利用（最大の差別化）／上段＝自社一貫・広告費最小限。
   均等カードに逃げず、土台を主役級に。 */
function SupportPyramid({ items }: { items: string[] }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  // costMechanisms = [一体計画(=二重利用の核), 専用展示場に頼らない(=広告費最小限), 自社でつなぐ(=自社一貫)]
  const base = items[0];
  const upper = [items[2], items[1]];

  return (
    <div ref={ref} className="mt-12">
      <p className="t-eyebrow text-cream/55 mb-6">3 Reasons</p>
      <div className="flex flex-col items-center gap-3">
        {/* 上段2枚 = 自社一貫 / 広告費最小限 */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:w-[78%]">
          {upper.map((text, i) => (
            <div
              key={text}
              className="rounded-sm border border-cream/15 bg-cream/[0.04] px-5 py-5 text-center transition-all duration-700 ease-out"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${280 + i * 140}ms`,
              }}
            >
              <span className="t-eyebrow text-lime block mb-2">
                {i === 0 ? "0" : "0"}
                {i + 2}
              </span>
              <span className="t-h3 text-cream">{text}</span>
            </div>
          ))}
        </div>
        {/* 土台 = 二重利用（最大の差別化） */}
        <div
          className="w-full rounded-sm border border-lime/40 bg-main-dark px-6 py-7 text-center transition-all duration-700 ease-out"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "140ms",
          }}
        >
          <span className="t-eyebrow text-lime block mb-2">
            01 ・ 最大の差別化
          </span>
          <span className="t-h3 text-cream">{base}</span>
          <p className="t-body mt-3 text-cream/70">
            専用展示場を建てて維持する代わりに、自社分譲地のモデルハウスをそのまま見ていただく。
            販売運営費を価格に乗せない、いちばん大きな理由です。
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── ② 非対称比較 ──
   他社=sign-red面 / やまと=deep-green面・scaleX 0→1（width 直アニメ禁止・980ms）。
   両者とも大手を貶めない。内訳%は出さない。answer 列を太く（結論＝視線停止点）。 */
function AsymmetricCompare({
  rows,
}: {
  rows: { label: string; general: string; answer: string; reason: string }[];
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="mt-16">
      <p className="t-eyebrow text-cream/55 mb-6">General vs Yamato</p>
      <div className="flex flex-col gap-px overflow-hidden rounded-sm border border-cream/12">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-px bg-cream/12 md:grid-cols-[180px_1fr_1fr]"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            {/* 項目名 */}
            <div className="flex items-center bg-ink px-5 py-5">
              <span className="t-h3 text-cream text-[1.05rem] md:text-[1.1rem]">
                {row.label}
              </span>
            </div>

            {/* 一般的には（sign-red 面・後出し費用） */}
            <div className="bg-ink px-5 py-5">
              <span className="t-eyebrow text-risk mb-3 block">一般的には</span>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-cream/8">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-risk"
                  style={{
                    transform: shown ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 980ms cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: `${i * 120 + 120}ms`,
                  }}
                />
              </div>
              <p className="t-body mt-3 text-cream/65">{row.general}</p>
            </div>

            {/* やまと（deep-green 面・結論を太く） */}
            <div className="bg-main-dark px-5 py-5">
              <span className="t-eyebrow text-lime mb-3 block">やまと</span>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-cream/8">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-lime"
                  style={{
                    transform: shown ? "scaleX(0.4)" : "scaleX(0)",
                    transition: "transform 980ms cubic-bezier(0.16,1,0.3,1)",
                    transitionDelay: `${i * 120 + 200}ms`,
                  }}
                />
              </div>
              <p className="t-h3 mt-3 text-cream text-[1.15rem] md:text-[1.25rem]">
                {row.answer}
              </p>
              <p className="t-body mt-1 text-cream/70">{row.reason}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="t-body mt-5 text-cream/50">
        つなぎ融資は「原則、発生しません」。土地を先に買う場合の30〜80万円ほどを、抱えずに済みます。
        地盤改良費は、自社分譲地なら地盤を整えてからお渡しするため、かかりません。
      </p>
    </div>
  );
}

/* ── ③ 価値3円図 ── deep-green の円。S06末に確定配置（S08前には置かない）。 */
function ValueCircles() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const values: { head: string; sub: string }[] = [
    { head: "モデルハウスが、\nそのまま標準仕様", sub: "「見学した家と、建てられる家が違う」を、なくしました。外壁は旭化成「ヘーベルパワーボード」。耐震等級3に対応する構造に、制震ダンパー「ミライエ」を全モデル標準で採用しています。" },
    { head: "土地込みの総額が、\n見える", sub: "土地・建物・諸費用まで、一枚の表でお示しします。" },
    { head: "建てたあとも、\n近くで支える", sub: "引渡しのあとも、地域で長くお付き合いします。" },
  ];

  return (
    <div ref={ref} className="mt-20 border-t border-cream/12 pt-14">
      <p className="t-eyebrow text-cream/55 mb-3">やまとが選ばれる理由</p>
      <p className="t-h3 text-cream max-w-2xl">
        総額を整えても、手放さないもの。
      </p>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {values.map((v, i) => (
          <div
            key={v.head}
            className="flex flex-col items-center text-center transition-all duration-700 ease-out"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 160}ms`,
            }}
          >
            <div className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-full border-2 border-lime/45 bg-main-dark px-6">
              <span className="t-h3 whitespace-pre-line text-cream leading-snug">
                {v.head}
              </span>
            </div>
            <p className="t-body mt-5 text-cream/70 max-w-[18rem]">{v.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function S06() {
  return (
    <SectionShell id="mechanism" surface="ink" aria-label="価格メカニズム">
      <header className="max-w-3xl">
        <Eyebrow light>Cost Logic</Eyebrow>
        <h2 className="t-h2">
          「安い」のではなく、
          <br className="hidden sm:block" />
          他社が無駄を乗せていない。
        </h2>
        <p className="t-body mt-6 text-cream/80">
          同じ品質の素材・装備で総額が変わるのは、品質を削るからではありません。
          土地から販売まで自社でつなぎ、価格に乗りやすい費用そのものを持たない。
          だから家にかける予算を、そのまま家に回せます。
        </p>
        <p className="t-body mt-4 text-cream/55">
          資金計画は
          <span className="t-burn-sub mx-1 align-baseline text-lime">
            {FUNDING_PLANS.toLocaleString()}
          </span>
          件以上を作成してきました。総額の組み立ては、その積み重ねでお見せします。
        </p>
      </header>

      <SupportPyramid items={costMechanisms} />
      <AsymmetricCompare rows={costCompareRows} />
      <ValueCircles />
    </SectionShell>
  );
}
