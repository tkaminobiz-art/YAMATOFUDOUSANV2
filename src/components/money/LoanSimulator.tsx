"use client";

import { useMemo, useState } from "react";
import { Calculator, Gauge, SlidersHorizontal } from "lucide-react";

const BRAND = {
  lime: "#A9D159",
  deep: "#2F4A2C",
  base: "#F7F4EC",
  ivory: "#FBF8EE",
  text: "#1D1D18",
  muted: "#5E5A50",
  border: "#DED8C8",
  gold: "#9A7A3F",
};

function calcMonthly(principal: number, annualRate: number, years: number): number {
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

function Field({
  id,
  label,
  value,
  suffix,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[13px] font-bold" style={{ color: BRAND.text }}>
          {label}
        </label>
        <span className="font-oswald text-[24px] leading-none tracking-[0]" style={{ color: BRAND.deep, fontWeight: 400 }}>
          {value.toLocaleString("ja-JP")}
          <span className="ml-1 text-[11px] font-bold" style={{ color: BRAND.muted }}>
            {suffix}
          </span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E5DFD0] accent-[#2F4A2C]"
        style={{ accentColor: BRAND.deep }}
      />
      <div className="mt-2 flex justify-between text-[10px]" style={{ color: BRAND.muted }}>
        <span>
          {min.toLocaleString("ja-JP")}
          {suffix}
        </span>
        <span>
          {max.toLocaleString("ja-JP")}
          {suffix}
        </span>
      </div>
    </div>
  );
}

export default function LoanSimulator() {
  const [borrow, setBorrow] = useState(2500);
  const [years, setYears] = useState(35);
  const [rate, setRate] = useState(1.0);
  const [income, setIncome] = useState(500);

  const monthly = useMemo(() => calcMonthly(borrow * 10000, rate, years), [borrow, rate, years]);
  const monthlyMan = monthly / 10000;
  const total = monthly * years * 12;
  const annualPayment = monthly * 12;
  const ratio = (annualPayment / (income * 10000)) * 100;
  const ratioStatus = ratio < 25 ? "safe" : ratio < 30 ? "caution" : "high";
  const ratioColor = ratioStatus === "safe" ? BRAND.deep : ratioStatus === "caution" ? BRAND.gold : "#A7473D";
  const ratioLabel = ratioStatus === "safe" ? "無理のない水準" : ratioStatus === "caution" ? "要確認" : "見直しを推奨";

  return (
    <div className="border bg-white shadow-[0_24px_70px_-44px_rgba(29,29,24,0.55)]" style={{ borderColor: BRAND.border }}>
      <div className="border-b p-6 md:p-8" style={{ borderColor: BRAND.border, background: BRAND.ivory }}>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: BRAND.deep }}>
              Monthly Simulator
            </p>
            <h3 className="mt-3 text-[22px] font-bold leading-[1.4] tracking-[0] md:text-[28px]" style={{ color: BRAND.text }}>
              月々を、その場で確かめる。
            </h3>
          </div>
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px]" style={{ background: "rgba(169,209,89,0.28)", color: BRAND.deep }}>
            <SlidersHorizontal className="h-5 w-5" strokeWidth={1.8} />
          </span>
        </div>
        <p className="mt-4 text-[12px] leading-[1.8]" style={{ color: BRAND.muted }}>
          元利均等・ボーナス払いなしの概算です。固定資産税・修繕費は別途確認します。
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-7 border-b p-6 md:p-8 lg:border-b-0 lg:border-r" style={{ borderColor: BRAND.border }}>
          <Field id="sim-borrow" label="借入額" value={borrow} suffix="万円" min={500} max={5000} step={100} onChange={setBorrow} />
          <Field id="sim-years" label="返済期間" value={years} suffix="年" min={15} max={35} step={1} onChange={setYears} />
          <Field id="sim-rate" label="金利" value={Number(rate.toFixed(1))} suffix="%" min={0.3} max={3.0} step={0.1} onChange={setRate} />

          <div>
            <label htmlFor="sim-income" className="text-[13px] font-bold" style={{ color: BRAND.text }}>
              年収（任意）
            </label>
            <div className="mt-3 flex items-center gap-3">
              <input
                id="sim-income"
                type="number"
                value={income}
                onChange={(event) => setIncome(Math.max(100, Number(event.target.value) || 0))}
                className="min-h-[46px] w-full border bg-white px-3 text-[16px] font-bold tabular-nums focus:outline-none"
                style={{ borderColor: BRAND.border, color: BRAND.text }}
                min={100}
                max={3000}
                step={50}
              />
              <span className="shrink-0 text-[12px] font-bold" style={{ color: BRAND.muted }}>
                万円
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5" style={{ color: BRAND.deep }} strokeWidth={1.7} />
              <p className="text-[12px] font-bold tracking-[0.08em]" style={{ color: BRAND.muted }}>
                月々のお支払い
              </p>
            </div>
            <p className="mt-5 flex items-end gap-2 whitespace-nowrap">
              <span
                className="font-oswald text-[clamp(62px,8vw,112px)] leading-[0.82] tracking-[0]"
                style={{ color: BRAND.deep, fontWeight: 380, wordBreak: "keep-all", overflowWrap: "normal" }}
              >
                {isFinite(monthlyMan) ? monthlyMan.toFixed(1) : "—"}
              </span>
              <span className="pb-2 text-[16px] font-bold" style={{ color: BRAND.text }}>
                万円/月
              </span>
            </p>
            <p className="mt-5 text-[12px] leading-[1.8]" style={{ color: BRAND.muted }}>
              約 {formatJpy(monthly)} 円/月。
              <br />
              総返済額: <span className="font-oswald text-[18px]" style={{ color: BRAND.text, fontWeight: 400 }}>{formatJpy(total / 10000)}</span> 万円
              / うち利息: 約 <span className="font-oswald text-[18px]" style={{ color: BRAND.text, fontWeight: 400 }}>{formatJpy(total / 10000 - borrow)}</span> 万円
            </p>
          </div>

          <div className="mt-10 border-t pt-6" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5" style={{ color: ratioColor }} strokeWidth={1.7} />
                <p className="text-[12px] font-bold tracking-[0.08em]" style={{ color: BRAND.muted }}>
                  返済比率
                </p>
              </div>
              <p className="flex items-baseline gap-1">
                <span className="font-oswald text-[42px] leading-none tracking-[0]" style={{ color: ratioColor, fontWeight: 400 }}>
                  {isFinite(ratio) ? ratio.toFixed(1) : "—"}
                </span>
                <span className="text-[12px] font-bold" style={{ color: BRAND.muted }}>
                  %
                </span>
              </p>
            </div>
            <p className="mt-2 text-[13px] font-bold" style={{ color: ratioColor }}>
              {isFinite(ratio) ? ratioLabel : ""}
            </p>
            <p className="mt-2 text-[11px] leading-[1.8]" style={{ color: BRAND.muted }}>
              25%以下がひとつの目安です。30%を超える場合は、借入額・期間・土地候補を見直します。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
