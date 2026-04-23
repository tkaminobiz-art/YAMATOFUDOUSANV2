"use client";

import { useState, useMemo } from "react";

/*
  LoanSimulator — 動的住宅ローンシミュレーター
  3社調査(住友林業・タマホーム・ミサワホーム)で標準装備の機能を吸収。
  - 借入額 × 期間 × 金利 のスライダー入力
  - 月々返済額を即時計算(元利均等返済式)
  - (任意)年収入力 → 返済比率を表示
*/

const FOREST = "#486B00";

function calcMonthly(principal: number, annualRate: number, years: number): number {
  // 元利均等返済式: PMT = P * r * (1+r)^n / ((1+r)^n - 1)
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

function formatJpy(n: number): string {
  if (!isFinite(n)) return "—";
  return Math.round(n).toLocaleString("ja-JP");
}

export default function LoanSimulator() {
  const [borrow, setBorrow] = useState(2500); // 万円
  const [years, setYears] = useState(35);
  const [rate, setRate] = useState(1.0); // %
  const [income, setIncome] = useState(500); // 万円(年収)

  const monthly = useMemo(() => calcMonthly(borrow * 10000, rate, years), [borrow, rate, years]);
  const total = monthly * years * 12;
  const annualPayment = monthly * 12;
  const ratio = (annualPayment / (income * 10000)) * 100;
  const ratioStatus = ratio < 25 ? "safe" : ratio < 30 ? "caution" : "high";
  const ratioColor =
    ratioStatus === "safe" ? FOREST : ratioStatus === "caution" ? "#B8860B" : "#C8463A";
  const ratioLabel =
    ratioStatus === "safe" ? "無理のない範囲" : ratioStatus === "caution" ? "要確認" : "見直しを推奨";

  return (
    <div className="bg-white border border-text-primary/15 p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-3 mb-6">
        <p className="text-[12px] md:text-[13px] tracking-[0.06em] text-text-secondary font-bold">
          シミュレーター（動かしてご確認ください）
        </p>
        <p className="text-[11px] text-text-secondary">元利均等・35年・ボーナス払いなし</p>
      </div>

      {/* 入力スライダー3つ */}
      <div className="space-y-6">
        {/* 借入額 */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="sim-borrow" className="text-[13px] md:text-[14px] text-text-primary font-medium">
              借入額
            </label>
            <span className="font-oswald tabular-nums text-text-primary" style={{ fontWeight: 400, fontSize: "clamp(18px,1.6vw,22px)" }}>
              {borrow.toLocaleString()}<span className="text-text-secondary text-[11px] ml-1">万円</span>
            </span>
          </div>
          <input
            id="sim-borrow"
            type="range"
            min={500}
            max={5000}
            step={100}
            value={borrow}
            onChange={(e) => setBorrow(Number(e.target.value))}
            className="w-full accent-[#486B00] cursor-pointer"
            style={{ accentColor: FOREST }}
          />
          <div className="flex justify-between text-[10px] text-text-secondary mt-1">
            <span>500万</span>
            <span>5,000万</span>
          </div>
        </div>

        {/* 返済期間 */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="sim-years" className="text-[13px] md:text-[14px] text-text-primary font-medium">
              返済期間
            </label>
            <span className="font-oswald tabular-nums text-text-primary" style={{ fontWeight: 400, fontSize: "clamp(18px,1.6vw,22px)" }}>
              {years}<span className="text-text-secondary text-[11px] ml-1">年</span>
            </span>
          </div>
          <input
            id="sim-years"
            type="range"
            min={15}
            max={35}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: FOREST }}
          />
          <div className="flex justify-between text-[10px] text-text-secondary mt-1">
            <span>15年</span>
            <span>35年</span>
          </div>
        </div>

        {/* 金利 */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="sim-rate" className="text-[13px] md:text-[14px] text-text-primary font-medium">
              金利
            </label>
            <span className="font-oswald tabular-nums text-text-primary" style={{ fontWeight: 400, fontSize: "clamp(18px,1.6vw,22px)" }}>
              {rate.toFixed(1)}<span className="text-text-secondary text-[11px] ml-1">%</span>
            </span>
          </div>
          <input
            id="sim-rate"
            type="range"
            min={0.3}
            max={3.0}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: FOREST }}
          />
          <div className="flex justify-between text-[10px] text-text-secondary mt-1">
            <span>0.3%</span>
            <span>3.0%</span>
          </div>
        </div>
      </div>

      {/* 結果表示 */}
      <div className="mt-8 pt-6 border-t border-text-primary/15">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 md:gap-8 items-end">
          <div>
            <p className="text-[11px] md:text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-2">
              月々のお支払い
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className="font-oswald tabular-nums leading-[0.85]"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(56px, 6.4vw, 96px)",
                  letterSpacing: "-0.04em",
                  color: FOREST,
                }}
              >
                {formatJpy(monthly)}
              </span>
              <span className="text-text-primary text-base md:text-lg font-medium">円</span>
              <span className="text-text-secondary text-sm ml-1">/月</span>
            </div>
            <p className="mt-2 text-[12px] text-text-secondary">
              総返済額: <span className="font-oswald tabular-nums" style={{ fontWeight: 400 }}>{formatJpy(total / 10000)}</span> 万円
              （うち利息: 約 <span className="font-oswald tabular-nums" style={{ fontWeight: 400 }}>{formatJpy(total / 10000 - borrow)}</span> 万円）
            </p>
          </div>

          {/* 年収から返済比率 */}
          <div className="md:border-l md:border-text-primary/15 md:pl-8">
            <label htmlFor="sim-income" className="text-[11px] md:text-[12px] tracking-[0.06em] text-text-secondary font-bold block mb-2">
              年収（任意）
            </label>
            <input
              id="sim-income"
              type="number"
              value={income}
              onChange={(e) => setIncome(Math.max(100, Number(e.target.value) || 0))}
              className="w-full border border-text-primary/15 px-3 py-2 text-[15px] font-medium tabular-nums focus:outline-none focus:border-main"
              min={100}
              max={3000}
              step={50}
            />
            <p className="text-[10px] text-text-secondary mt-1">万円（世帯）</p>

            <div className="mt-4 pt-4 border-t border-text-primary/10">
              <p className="text-[11px] text-text-secondary mb-1">返済比率</p>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-oswald tabular-nums"
                  style={{ fontWeight: 400, fontSize: "clamp(28px, 2.8vw, 40px)", color: ratioColor, letterSpacing: "-0.02em" }}
                >
                  {isFinite(ratio) ? ratio.toFixed(1) : "—"}
                </span>
                <span className="text-text-secondary text-sm">%</span>
              </div>
              <p className="mt-1 text-[11px] font-bold" style={{ color: ratioColor }}>
                {isFinite(ratio) ? ratioLabel : ""}
              </p>
              <p className="mt-2 text-[10px] leading-[1.7] text-text-secondary">
                目安: 25%以下が無理なし、30%超は要見直し
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary">
        ※ 元利均等・ボーナス払いなしで試算した目安です。実際の金利は金融機関・商品・審査時期により異なります。月々のお支払いには固定資産税・修繕費が別途かかります。
      </p>
    </div>
  );
}
