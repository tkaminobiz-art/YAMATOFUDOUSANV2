"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { MessageCircle, MoveHorizontal } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/* 05 シミュレーション＝家賃逆算。
   心理設計(lp-psych-audit 2026-06-23): 賃貸vs持ち家(手垢・営業臭)をやめ、
   「今の家賃で、やまとならどんな家が持てるか」を自分の数字で見せる。
   植える思考＝「今の家賃と変わらない月々で、資産になる家が持てる」。
   - 入口: 今の家賃をスライダー(自分ごと化)
   - 主役: その月々で持てる やまとの家（建物2,280万〜）と月々。家賃との差を事実で。
   - 支え: 賃貸は手元に残らない/持ち家は資産（煽らず一言）
   - 正直さ: 月々は建物本体＋付帯＋諸費用の概算。土地は別途＝"総額がはっきり"の売りに転換。
   煽り・損失回避フレーム(35年で◯◯万多く払う)は廃止。 */
const RATE = 1.0;
const YEARS = 35;
const EXTRA = 380; // 諸費用込み概算（万）。土地は含まない（別途・脚注で開示）

const PLANS = [
  { id: "kyo", jp: "京", price: 2280, size: "28坪 / 3LDK" },
  { id: "kaze", jp: "風", price: 2480, size: "30坪 / 4LDK" },
  { id: "hana", jp: "花", price: 2480, size: "33坪 / 4LDK" },
] as const;
type PlanId = (typeof PLANS)[number]["id"];

function ownMonthlyYen(priceMan: number): number {
  const principal = (priceMan + EXTRA) * 10000;
  const r = RATE / 100 / 12;
  const n = YEARS * 12;
  const f = Math.pow(1 + r, n);
  return Math.round((principal * r * f) / (f - 1));
}
const toMan1 = (yen: number) => (yen / 10000).toFixed(1);
const roundYen = (yen: number) => Math.round(Math.abs(yen) / 1000) * 1000;

export default function SimWire() {
  const [rent, setRent] = useState(8);
  const [planId, setPlanId] = useState<PlanId>("kyo");
  const plan = PLANS.find((p) => p.id === planId)!;
  const ownYen = useMemo(() => ownMonthlyYen(plan.price), [plan]);

  const diff = rent * 10000 - ownYen; // ＋＝家賃のほうが高い（持ち家がおさえられる）
  const verdict =
    Math.abs(diff) < 3000
      ? { tone: "same", text: "今の家賃と、ほとんど変わりません。" }
      : diff > 0
        ? { tone: "good", text: `今の家賃より、月々 約${roundYen(diff).toLocaleString()}円 おさえられます。` }
        : { tone: "plain", text: `今の家賃に 月々 約${roundYen(diff).toLocaleString()}円 を加えると、手が届きます。` };

  return (
    <div className="border border-hair bg-paper p-6 md:p-8">
      {/* これは動かせるツール、の合図 */}
      <p className="font-mono inline-flex items-center gap-1.5 border border-signal px-2 py-1 text-[10px] tracking-[0.06em] text-signal">
        <MoveHorizontal className="h-3 w-3" strokeWidth={2.2} />
        動かして試算できます
      </p>

      {/* 持ち家モデル＝セグメント型ボタン（選べる感を出す） */}
      <div role="group" aria-label="やまとの家のモデル" className="mt-6">
        <p className="font-mono text-[11px] text-slate">やまとの家を選ぶ（タップで切替）</p>
        <div className="mt-2.5 grid grid-cols-3 gap-px border border-noir bg-noir">
          {PLANS.map((p) => {
            const active = p.id === planId;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPlanId(p.id)}
                className={`min-h-[48px] text-[16px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal ${
                  active ? "bg-signal text-white" : "bg-paper text-slate hover:bg-band hover:text-noir"
                }`}
              >
                {p.jp}
              </button>
            );
          })}
        </div>
      </div>

      {/* 今の家賃＝スライダー（塗りトラック＋大きいツマミ＋手がかり） */}
      <div className="mt-7 flex items-baseline justify-between">
        <label htmlFor="rent-slider" className="text-[13px] font-bold text-noir">
          今の家賃
          <span className="font-mono ml-2 text-[10px] font-normal text-slate">スライドで調整</span>
        </label>
        <span className="flex items-baseline gap-1">
          <span className="num-tnum font-oswald text-[30px] leading-none text-signal">{rent.toFixed(1)}</span>
          <span className="font-mono text-[11px] text-slate">万円</span>
        </span>
      </div>
      <input
        id="rent-slider"
        type="range"
        min={5}
        max={12}
        step={0.5}
        value={rent}
        onChange={(e) => setRent(Number(e.target.value))}
        className="rent-range mt-4 w-full"
        style={{ "--rng-fill": `${((rent - 5) / 7) * 100}%` } as CSSProperties}
      />
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-mist">
        <span>5万</span>
        <span className="text-slate">◀ ドラッグ ▶</span>
        <span>12万</span>
      </div>

      {/* 答え：その月々で、やまとならこの家が持てる */}
      <div className="mt-7 border-t border-noir pt-6">
        <p className="font-mono text-[11px] tracking-[0.06em] text-slate">
          今の家賃で、やまとなら（{plan.jp}モデル・{plan.size}）
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="font-mono text-[10px] text-slate">月々（ローン）</p>
            <p className="mt-1 flex items-baseline gap-1">
              <span className="num-tnum font-oswald text-[clamp(40px,8vw,60px)] font-semibold leading-[0.82] text-noir">
                {toMan1(ownYen)}
              </span>
              <span className="font-mono text-[12px] font-bold text-slate">万円〜</span>
            </p>
          </div>
          <div className="border-l border-hair pl-4">
            <p className="font-mono text-[10px] text-slate">家の総額（建物）</p>
            <p className="mt-1 flex items-baseline gap-1">
              <span className="num-tnum font-oswald text-[clamp(40px,8vw,60px)] font-semibold leading-[0.82] text-noir">
                {plan.price.toLocaleString()}
              </span>
              <span className="font-mono text-[12px] font-bold text-slate">万円〜</span>
            </p>
          </div>
        </div>
        {/* 家賃との差（事実・煽らない） */}
        <p className={`mt-4 text-[14px] font-bold leading-[1.7] ${verdict.tone === "good" ? "text-lime-deep" : "text-noir"}`}>
          {verdict.text}
        </p>
      </div>

      {/* 支え：お支払いが資産になる（やわらかく・煽らない） */}
      <p className="mt-5 text-[13px] leading-[1.85] text-ash">
        毎月のお支払いは、そのままご家族の資産になっていきます。
      </p>
      {/* 土地は別途＝総額がはっきりの売りに転換 */}
      <p className="font-mono mt-3 text-[11px] leading-[1.8] text-signal">
        土地も、やまとの分譲地（500万円台〜）からお選びいただけます。土地と建物をあわせた総額も、はじめにきちんとお伝えします。
      </p>

      <p className="font-mono mt-4 text-[10px] leading-[1.8] text-mist">
        月々は建物本体＋付帯工事＋諸費用の概算です（金利1.0% / 35年 / 頭金0）。土地は別途。金利・条件により変わります。
      </p>

      {/* CTA */}
      <a
        href={LINE_ADD_FRIEND_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 bg-line px-6 text-[14px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.9} fill="currentColor" />
        今の家賃で建てられる家を、LINEでご相談ください
      </a>
    </div>
  );
}
