"use client";

import { useEffect, useRef, useState } from "react";
import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import { costMechanisms } from "../_data";
import { FUNDING_PLANS } from "@/data/brand-facts";

/**
 * Mechanism — 新10「安さの理由」｜価格メカニズム（現S06ベース）。
 *
 * 契約: `export default function Mechanism(): JSX.Element`（props 無し）。
 * surface=ink（暗面4回限定の1つ）。役割=②なぜできるか（抽象化禁止）。
 *
 * このファイルは reveal のために 'use client'。bespoke 図（ピラミッド・価値3円）は
 * すべてこのファイル内に自己完結で実装する（共有ファイルは触らない）。
 *
 * 見出しは「安く見せるのではなく、余計な費用を重ねない。」（新10）。
 * 導入本文は §10-10 逐語に寄せる（品質を削らず、土地〜販売を自社でつなぎ、価格に乗りやすい
 * 費用を抑える。その分を構造・外壁・設備・保証など標準仕様に回す）。
 *
 * 主役:
 *  - 3事実（costMechanisms）= ①自社分譲地モデルハウス二重利用（最大の差別化）
 *    ②自社一貫体制・中間マージンなし ③広告費必要最小限（3根拠ピラミッド）。
 *  - 価値3円図（deep-green）= 末尾に確定配置。
 *
 * 非対称比較（costCompareRows の費用開示表）はこのセクションから撤去済み。
 *   費用開示は 新5 Estimate に一本化（二度出し回避）。他社=sign-red/やまと=deep-green の
 *   色役割は3根拠側で残す。
 *
 * 断定OKはこの2つだけ（憲法例外）: つなぎ融資「原則発生しません」/ 地盤改良費「かかりません（自社分譲地対象）」。
 * 叫ばない（巨大バーンは出さない・countUp は使わない・1,000件のみ言及）。
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

      <p className="t-body mt-8 text-cream/50">
        つなぎ融資は「原則、発生しません」。土地を先に買う場合の30〜80万円ほどを、抱えずに済みます。
        地盤改良費はかかりません（自社分譲地が対象です）。
      </p>
    </div>
  );
}

/* ── ② 価値3円図 ── deep-green の円。セクション末尾に確定配置。 */
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

export default function Mechanism() {
  return (
    <SectionShell id="mechanism" surface="ink" aria-label="安さの理由">
      <header className="max-w-3xl">
        <Eyebrow light>Cost Logic</Eyebrow>
        <h2 className="t-h2">
          安く見せるのではなく、余計な費用を重ねない。
        </h2>
        <p className="t-body mt-6 text-cream/80">
          総額を抑えられる理由は、家の品質を削るからではありません。
          土地、設計、施工、販売をばらばらにせず、自社でつなぐ。
          大型展示場や中間マージンに頼りすぎず、価格に乗りやすい費用を抑える。
        </p>
        <p className="t-body mt-4 text-cream/80">
          その分、構造、外壁、設備、保証など、家そのものに必要な部分を標準仕様として整えています。
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
      <ValueCircles />
    </SectionShell>
  );
}
