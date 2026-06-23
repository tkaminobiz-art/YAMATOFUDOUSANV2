"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/* ワイヤー用・賃貸 vs 持ち家の比較ツール。
   今の家賃をスライダーで入れ、賃貸を払い続けた総額と、
   やまとの家を持った場合の総額を、毎月／年間／35年で対置する。
   前提＝持ち家：土地込み概算（諸費用込み）を当社実例の試算（金利1.0%/35年/頭金0）。
        賃貸：更新料（2年ごと家賃1ヶ月・約17回）を加算。
   煽らず事実のみ（感情断定NG）。 */
const RATE = 1.0;
const YEARS = 35;
const EXTRA = 380; // 諸費用込み概算（万）
const RENEWALS = 17; // 2年ごと家賃1ヶ月 ≒ 35年で約17回

const PLANS = [
  { id: "kyo", jp: "京", price: 2280 },
  { id: "kaze", jp: "風", price: 2480 },
  { id: "hana", jp: "花", price: 2480 },
] as const;
type PlanId = (typeof PLANS)[number]["id"];

function ownMonthlyYen(priceMan: number): number {
  const principal = (priceMan + EXTRA) * 10000;
  const r = RATE / 100 / 12;
  const n = YEARS * 12;
  const f = Math.pow(1 + r, n);
  return Math.round((principal * r * f) / (f - 1));
}
const toMan = (yen: number) => Math.round(yen / 10000);
const toMan1 = (yen: number) => (yen / 10000).toFixed(1);

export default function SimWire() {
  const [rent, setRent] = useState(8);
  const [planId, setPlanId] = useState<PlanId>("kyo");
  const plan = PLANS.find((p) => p.id === planId)!;

  const c = useMemo(() => {
    const rentYen = rent * 10000;
    const ownYen = ownMonthlyYen(plan.price);
    const rent35 = toMan(rentYen * 12 * YEARS + rentYen * RENEWALS);
    const own35 = toMan(ownYen * 12 * YEARS);
    return { rentYen, ownYen, rent35, own35, diff: rent35 - own35 };
  }, [rent, plan]);

  return (
    <div className="border border-hair bg-paper p-6 md:p-8">
      {/* 持ち家の比較モデル */}
      <div role="group" aria-label="持ち家のモデル" className="flex items-center gap-1">
        <span className="font-mono mr-2 text-[11px] text-slate">持ち家のモデル</span>
        {PLANS.map((p) => {
          const active = p.id === planId;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={active}
              onClick={() => setPlanId(p.id)}
              className={`min-h-[44px] border-b-2 px-3 text-[15px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${
                active ? "border-signal text-noir" : "border-transparent text-slate"
              }`}
            >
              {p.jp}
            </button>
          );
        })}
      </div>

      {/* 今の家賃 */}
      <div className="mt-6 flex items-baseline justify-between">
        <label htmlFor="rent-slider" className="text-[13px] font-bold text-noir">今の家賃</label>
        <span className="flex items-baseline gap-1">
          <span className="font-oswald text-[28px] leading-none text-noir">{rent.toFixed(1)}</span>
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
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-mist">
        <span>5万</span>
        <span>12万</span>
      </div>

      {/* 比較テーブル */}
      <div className="mt-7 border-t border-noir">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-hair py-2">
          <span />
          <span className="font-mono text-right text-[11px] text-slate">賃貸</span>
          <span className="font-mono text-right text-[11px] text-noir">持ち家・{plan.jp}</span>
        </div>
        {[
          ["毎月", `${rent.toFixed(1)}万`, `${toMan1(c.ownYen)}万`],
          ["年間", `${toMan(c.rentYen * 12).toLocaleString()}万`, `${toMan(c.ownYen * 12).toLocaleString()}万`],
          ["35年で払う総額", `${c.rent35.toLocaleString()}万`, `${c.own35.toLocaleString()}万`],
        ].map(([label, a, b]) => (
          <div key={label} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 border-b border-hair py-3">
            <span className="text-[12px] font-bold text-noir">{label}</span>
            <span className="font-oswald text-right text-[16px] text-slate">{a}</span>
            <span className="font-oswald text-right text-[16px] text-noir">{b}</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 py-3">
          <span className="text-[12px] font-bold text-noir">手元に残るもの</span>
          <span className="font-mono text-right text-[12px] text-slate">なし</span>
          <span className="font-mono text-right text-[12px] text-signal">家（資産）</span>
        </div>
      </div>

      {/* まとめ（事実・煽らない） */}
      <p className="mt-5 text-[13px] font-bold leading-[1.75] text-noir">
        {c.diff > 0
          ? `35年では、賃貸のほうが約${c.diff.toLocaleString()}万円多く払います。`
          : c.diff < 0
          ? `35年の総額は、持ち家が約${Math.abs(c.diff).toLocaleString()}万円多めです。`
          : "35年の総額は、ほぼ同じです。"}
        持ち家は、家が資産として残ります。
      </p>
      <p className="font-mono mt-2 text-[11px] text-signal">つなぎ融資 0円 ・ 地盤改良費 0円</p>
      <p className="font-mono mt-4 text-[10px] leading-[1.8] text-mist">
        賃貸＝更新料込み（2年ごと家賃1ヶ月）。持ち家＝土地込み概算（諸費用込み）を当社実例の試算（金利1.0% / 35年 / 頭金0）で算出。金利・条件により変動します。
      </p>

      {/* CTA */}
      <a
        href={LINE_ADD_FRIEND_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 bg-line px-6 text-[14px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.9} fill="currentColor" />
        この比較をLINEで相談する
      </a>
    </div>
  );
}
