"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Gauge,
  Home,
  MessageCircle,
  Send,
  SlidersHorizontal,
} from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

const BRAND = {
  red: "#E84336",
  redDark: "#8F211B",
  redSoft: "#FFF0EE",
  green: "#2F4A2C",
  greenSoft: "#EAF2E8",
  paper: "#E8ECEF",
  ivory: "#F8F9FA",
  text: "#111315",
  muted: "#5F666C",
  border: "#D1D7DD",
  line: "#06C755",
};

const RATE = 1.0;
const YEARS = 35;
const EXTRA_COSTS = 300;
const MOVING_COSTS = 80;

const LAND_MODES = [
  { id: "none", label: "土地なし", note: "候補探しから" },
  { id: "candidate", label: "候補あり", note: "総額を再計算" },
  { id: "owned", label: "土地あり", note: "建物中心で確認" },
] as const;

type LandMode = (typeof LAND_MODES)[number]["id"];

function calcBorrowingFromMonthly(monthly: number, annualRate: number, years: number): number {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (r === 0) return monthly * n;
  const factor = Math.pow(1 + r, n);
  return (monthly * (factor - 1)) / (r * factor);
}

function formatMan(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return Math.round(value).toLocaleString("ja-JP");
}

function Field({
  id,
  label,
  value,
  suffix,
  min,
  max,
  step,
  accent = BRAND.red,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  accent?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[13px] font-bold" style={{ color: BRAND.text }}>
          {label}
        </label>
        <span
          className="font-oswald money-number-sm"
          style={{ color: accent }}
        >
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
        className="h-2 w-full cursor-pointer appearance-none rounded-[6px] bg-[#D9DEE3]"
        style={{ accentColor: accent }}
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
  const [monthlyTarget, setMonthlyTarget] = useState(8.5);
  const [income, setIncome] = useState(550);
  const [savings, setSavings] = useState(100);
  const [landMode, setLandMode] = useState<LandMode>("none");
  const [landCost, setLandCost] = useState(1200);

  const result = useMemo(() => {
    const monthlyYen = monthlyTarget * 10000;
    const borrowing = calcBorrowingFromMonthly(monthlyYen, RATE, YEARS);
    const borrowingMan = borrowing / 10000;
    const totalBudget = borrowingMan + savings;
    const effectiveLandCost = landMode === "owned" ? 0 : landCost;
    const visibleTotal = totalBudget;
    const buildingCapacity = visibleTotal - effectiveLandCost - EXTRA_COSTS - MOVING_COSTS;
    const annualPayment = monthlyYen * 12;
    const ratio = (annualPayment / (income * 10000)) * 100;

    let verdict = "土地候補から見直す段階";
    let lead = "月々・土地価格・自己資金のどこを動かすと現実的か、先に確認しましょう。";
    if (buildingCapacity >= 2480) {
      verdict = "花・風モデルまで検討圏";
      lead = "土地条件を絞りすぎなければ、ゆとりある4LDKまで視野に入ります。";
    } else if (buildingCapacity >= 2280) {
      verdict = "京モデル中心に検討圏";
      lead = "総額を抑えやすい土地候補と組み合わせて、現実的なラインを探せます。";
    }

    return {
      borrowingMan,
      visibleTotal,
      effectiveLandCost,
      buildingCapacity,
      ratio,
      verdict,
      lead,
    };
  }, [income, landCost, landMode, monthlyTarget, savings]);

  const ratioTone =
    result.ratio <= 25 ? BRAND.green : result.ratio <= 30 ? "#9A7A3F" : BRAND.red;
  const ratioLabel =
    result.ratio <= 25 ? "家計に余白を残しやすい水準" : result.ratio <= 30 ? "要確認" : "見直し推奨";

  return (
    <section
      id="diagnosis"
      aria-label="土地込み総額の30秒診断"
      className="scroll-mt-24 border bg-white shadow-[0_32px_90px_-54px_rgba(23,20,17,0.65)]"
      style={{ borderColor: "rgba(23,20,17,0.2)" }}
    >
      <div className="border-b p-5 md:p-7" style={{ borderColor: BRAND.border, background: BRAND.ivory }}>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p
              className="money-eyebrow"
              style={{ color: BRAND.red }}
            >
              30 sec total diagnosis
            </p>
            <h2 className="money-tool-title mt-3" style={{ color: BRAND.text }}>
              月々から、土地込み総額を逆算。
            </h2>
          </div>
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px]"
            style={{ background: BRAND.redSoft, color: BRAND.red }}
            aria-hidden
          >
            <SlidersHorizontal className="h-5 w-5" strokeWidth={1.9} />
          </span>
        </div>
        <p className="money-body-sm mt-4" style={{ color: BRAND.muted }}>
          金利1.0%・35年・ボーナス払いなしの概算。実際の条件は金融機関審査、土地、時期で変わります。
        </p>
      </div>

      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6 border-b p-5 md:p-7 lg:border-b-0 lg:border-r" style={{ borderColor: BRAND.border }}>
          <Field
            id="money-monthly-target"
            label="希望する月々"
            value={monthlyTarget}
            suffix="万円"
            min={5}
            max={14}
            step={0.5}
            onChange={setMonthlyTarget}
          />
          <Field
            id="money-income"
            label="世帯年収"
            value={income}
            suffix="万円"
            min={300}
            max={1000}
            step={50}
            accent={BRAND.green}
            onChange={setIncome}
          />
          <Field
            id="money-savings"
            label="自己資金"
            value={savings}
            suffix="万円"
            min={0}
            max={800}
            step={50}
            accent={BRAND.green}
            onChange={setSavings}
          />

          <div>
            <p className="mb-3 text-[13px] font-bold" style={{ color: BRAND.text }}>
              土地の状況
            </p>
            <div className="grid grid-cols-3 gap-2">
              {LAND_MODES.map((mode) => {
                const active = landMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setLandMode(mode.id)}
                    className="min-h-[62px] border px-2 py-2 text-left transition duration-200"
                    style={{
                      borderColor: active ? BRAND.red : BRAND.border,
                      background: active ? BRAND.redSoft : "white",
                      color: active ? BRAND.redDark : BRAND.text,
                    }}
                  >
                    <span className="block text-[12px] font-black leading-[1.35]">{mode.label}</span>
                    <span className="mt-1 block text-[10px] leading-[1.45]" style={{ color: active ? BRAND.redDark : BRAND.muted }}>
                      {mode.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {landMode !== "owned" && (
            <Field
              id="money-land-cost"
              label="土地予算"
              value={landCost}
              suffix="万円"
              min={500}
              max={2500}
              step={100}
              onChange={setLandCost}
            />
          )}
        </div>

        <div className="flex flex-col justify-between p-5 md:p-7">
          <div>
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5" style={{ color: BRAND.red }} strokeWidth={1.9} />
              <p className="money-eyebrow" style={{ color: BRAND.muted }}>
                あなたの場合の総額目安
              </p>
            </div>
            <p className="mt-5 flex items-end gap-2 whitespace-nowrap">
              <span
                className="font-oswald money-diagnosis-number"
                style={{ color: BRAND.red, wordBreak: "keep-all", overflowWrap: "normal" }}
              >
                {formatMan(result.visibleTotal)}
              </span>
              <span className="pb-2 text-[16px] font-bold" style={{ color: BRAND.text }}>
                万円
              </span>
            </p>

            <div className="mt-6 grid gap-px overflow-hidden border md:grid-cols-3" style={{ borderColor: BRAND.border, background: BRAND.border }}>
              {[
                ["借入目安", `${formatMan(result.borrowingMan)}万円`],
                ["土地", landMode === "owned" ? "所有済み" : `${formatMan(result.effectiveLandCost)}万円`],
                ["建物に回せる目安", `${formatMan(result.buildingCapacity)}万円`],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#F8F9FA] p-4">
                  <p className="money-eyebrow text-[10px]" style={{ color: BRAND.muted }}>
                    {label}
                  </p>
                  <p className="money-body-sm mt-2 font-bold" style={{ color: BRAND.text }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-l-[5px] p-4" style={{ borderColor: BRAND.green, background: BRAND.greenSoft }}>
              <p className="money-card-title" style={{ color: BRAND.green }}>
                {result.verdict}
              </p>
              <p className="money-body-sm mt-2" style={{ color: BRAND.muted }}>
                {result.lead}
              </p>
            </div>
          </div>

          <div className="mt-7 border-t pt-6" style={{ borderColor: BRAND.border }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5" style={{ color: ratioTone }} strokeWidth={1.8} />
                <p className="money-eyebrow" style={{ color: BRAND.muted }}>
                  返済比率
                </p>
              </div>
              <p className="flex items-baseline gap-1">
                <span className="font-oswald money-number-lg" style={{ color: ratioTone }}>
                  {result.ratio.toFixed(1)}
                </span>
                <span className="text-[12px] font-bold" style={{ color: BRAND.muted }}>
                  %
                </span>
              </p>
            </div>
            <p className="money-body-sm mt-2 font-bold" style={{ color: ratioTone }}>
              {ratioLabel}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={LINE_ADD_FRIEND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[6px] px-5 py-3 text-[14px] font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-20px_rgba(6,199,85,0.82)]"
                style={{ background: BRAND.line }}
              >
                <MessageCircle className="h-5 w-5" strokeWidth={1.9} fill="currentColor" />
                この条件で診断を頼む
              </a>
              <a
                href="/reserve"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[6px] border px-5 py-3 text-[14px] font-black transition duration-300 hover:bg-[#171411] hover:text-white"
                style={{ borderColor: BRAND.text, color: BRAND.text }}
              >
                相談枠を見る
                <Send className="h-4 w-4" strokeWidth={1.9} />
              </a>
            </div>
            <p className="money-body-sm mt-4 flex gap-2" style={{ color: BRAND.muted }}>
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BRAND.red }} strokeWidth={1.8} />
              表示額は概算です。外構、登記、火災保険、金融機関条件、土地条件は個別に確認します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
