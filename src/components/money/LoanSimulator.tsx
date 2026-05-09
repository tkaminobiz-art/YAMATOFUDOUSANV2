"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Home,
  MapPinned,
  MessageCircle,
  Minus,
  Plus,
  Send,
  WalletCards,
} from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

const BRAND = {
  red: "#16A34A",
  redDark: "#116832",
  redSoft: "#ECFDF3",
  green: "#16A34A",
  greenSoft: "#ECFDF3",
  alert: "#DC2626",
  paper: "#F4F5F7",
  ivory: "#FAFAFA",
  text: "#0F1115",
  muted: "#5B6470",
  border: "#E5E7EB",
  dark: "#111418",
  line: "#16A34A",
};

const RATE = 1.0;
const YEARS = 35;
const EXTRA_COSTS = 300;
const MOVING_COSTS = 80;

const PLAN_OPTIONS = [
  {
    id: "hana",
    jp: "花",
    en: "HANA",
    price: 2480,
    size: "33坪 / 4LDK",
    body: "収納とLDKにゆとりを持たせたいご家族へ。",
    badge: "専務一押し",
  },
  {
    id: "kaze",
    jp: "風",
    en: "KAZE",
    price: 2480,
    size: "30坪 / 4LDK",
    body: "広さと総額のバランスを取りたいご家族へ。",
    badge: "バランス型",
  },
  {
    id: "miyako",
    jp: "京",
    en: "KYO",
    price: 2280,
    size: "28坪 / 3LDK",
    body: "土地込み総額を抑えやすい入口です。",
    badge: "総額重視",
  },
] as const;

const LAND_MODES = [
  { id: "none", label: "土地なし", note: "土地候補から見る" },
  { id: "candidate", label: "候補あり", note: "価格を入れて確認" },
  { id: "owned", label: "土地あり", note: "建物中心で見る" },
] as const;

type PlanId = (typeof PLAN_OPTIONS)[number]["id"];
type LandMode = (typeof LAND_MODES)[number]["id"];

function calcMonthlyPayment(principalMan: number, annualRate: number, years: number): number {
  const principal = Math.max(principalMan, 0) * 10000;
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (r === 0) return Math.round(principal / n);
  const factor = Math.pow(1 + r, n);
  return Math.round((principal * r * factor) / (factor - 1));
}

function formatMan(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return Math.round(value).toLocaleString("ja-JP");
}

function StepLabel({ no, label }: { no: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        className="inline-flex h-8 min-w-8 items-center justify-center rounded-[8px] text-[12px] font-black text-white"
        style={{ background: BRAND.text }}
      >
        {no}
      </span>
      <p className="money-eyebrow" style={{ color: BRAND.red }}>
        {label}
      </p>
    </div>
  );
}

function ControlField({
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
  const update = (next: number) => onChange(Math.min(max, Math.max(min, next)));

  return (
    <div className="rounded-[8px] border bg-white p-4 shadow-[0_1px_2px_rgba(15,17,21,0.04)]" style={{ borderColor: BRAND.border }}>
      <div className="mb-4 flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-[13px] font-bold" style={{ color: BRAND.text }}>
          {label}
        </label>
        <span className="font-oswald money-number-sm" style={{ color: accent }}>
          {value.toLocaleString("ja-JP")}
          <span className="ml-1 text-[11px] font-bold" style={{ color: BRAND.muted }}>
            {suffix}
          </span>
        </span>
      </div>
      <div className="grid grid-cols-[38px_1fr_38px] items-center gap-3">
        <button
          type="button"
          onClick={() => update(value - step)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border transition hover:bg-[#0F1115] hover:text-white"
          style={{ borderColor: BRAND.border, color: BRAND.text }}
          aria-label={`${label}を下げる`}
        >
          <Minus className="h-4 w-4" strokeWidth={2} />
        </button>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => update(Number(event.target.value))}
          className="money-range h-3 w-full cursor-pointer appearance-none rounded-full bg-[#D8DEE6]"
          style={{ accentColor: accent, color: accent }}
        />
        <button
          type="button"
          onClick={() => update(value + step)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border transition hover:bg-[#0F1115] hover:text-white"
          style={{ borderColor: BRAND.border, color: BRAND.text }}
          aria-label={`${label}を上げる`}
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
      <div className="mt-3 flex justify-between text-[10px] font-bold" style={{ color: BRAND.muted }}>
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
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("miyako");
  const [monthlyCap, setMonthlyCap] = useState(9);
  const [income, setIncome] = useState(550);
  const [savings, setSavings] = useState(200);
  const [landMode, setLandMode] = useState<LandMode>("none");
  const [landCost, setLandCost] = useState(650);

  const result = useMemo(() => {
    const selectedPlan = PLAN_OPTIONS.find((plan) => plan.id === selectedPlanId) ?? PLAN_OPTIONS[2];
    const effectiveLandCost = landMode === "owned" ? 0 : landCost;
    const totalCost = selectedPlan.price + effectiveLandCost + EXTRA_COSTS + MOVING_COSTS;
    const borrowingMan = Math.max(totalCost - savings, 0);
    const monthlyPayment = calcMonthlyPayment(borrowingMan, RATE, YEARS);
    const monthlyPaymentMan = monthlyPayment / 10000;
    const annualPayment = monthlyPayment * 12;
    const ratio = (annualPayment / (income * 10000)) * 100;
    const monthlyGap = monthlyPaymentMan - monthlyCap;

    let verdict = "月々上限内で検討しやすい状態";
    let lead = "この前提なら、次は土地候補と標準仕様の範囲を一緒に確認できます。";
    if (monthlyGap > 1 || ratio > 28) {
      verdict = "土地価格か自己資金を見直したい状態";
      lead = "建物を変える前に、土地条件・自己資金・諸費用の置き方を確認しましょう。";
    } else if (monthlyGap > 0 || ratio > 25) {
      verdict = "あと少し条件調整したい状態";
      lead = "月々上限に近いので、土地候補と外構目安を先に詰めると判断しやすくなります。";
    }

    return {
      selectedPlan,
      effectiveLandCost,
      totalCost,
      borrowingMan,
      monthlyPayment,
      monthlyPaymentMan,
      monthlyGap,
      ratio,
      verdict,
      lead,
    };
  }, [income, landCost, landMode, monthlyCap, savings, selectedPlanId]);

  const ratioTone =
    result.ratio <= 25 && result.monthlyGap <= 0 ? BRAND.green : result.ratio <= 28 && result.monthlyGap <= 1 ? "#64748B" : BRAND.alert;
  const ratioLabel =
    result.ratio <= 25 && result.monthlyGap <= 0 ? "月々上限内" : result.ratio <= 28 && result.monthlyGap <= 1 ? "条件調整で検討圏" : "見直し推奨";

  return (
    <section
      id="diagnosis"
      aria-label="土地込み総額の診断"
      className="scroll-mt-24 overflow-hidden rounded-[8px] border bg-white shadow-[0_1px_2px_rgba(15,17,21,0.04),0_12px_32px_-26px_rgba(15,17,21,0.22)]"
      style={{ borderColor: BRAND.border }}
    >
      <div className="border-b p-5 md:p-7" style={{ borderColor: BRAND.border, background: BRAND.ivory }}>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="money-eyebrow" style={{ color: BRAND.red }}>
              Total cost workbench
            </p>
            <h2 className="money-tool-title mt-3" style={{ color: BRAND.text }}>
              まず建物を選び、土地込みの月々を見る。
            </h2>
            <p className="money-body-sm mt-3 max-w-[720px]" style={{ color: BRAND.muted }}>
              花・風・京は建物価格が決まっています。だから最初にモデルを置き、土地代・諸費用・自己資金を重ねて、月々返済まで見ます。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[8px] border bg-white" style={{ borderColor: BRAND.border }}>
            {[
              ["建物", `${formatMan(result.selectedPlan.price)}万円`],
              ["土地", landMode === "owned" ? "0万円" : `${formatMan(result.effectiveLandCost)}万円`],
              ["諸費用", `${EXTRA_COSTS + MOVING_COSTS}万円`],
            ].map(([label, value]) => (
              <div key={label} className="min-w-[92px] p-3">
                <p className="text-[10px] font-bold" style={{ color: BRAND.muted }}>{label}</p>
                <p className="mt-1 text-[13px] font-black" style={{ color: BRAND.text }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="grid gap-5 border-b p-5 md:p-7 xl:border-b-0 xl:border-r" style={{ borderColor: BRAND.border }}>
          <article>
            <StepLabel no="01" label="Building model" />
            <div className="grid gap-3 md:grid-cols-3">
              {PLAN_OPTIONS.map((plan) => {
                const active = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    aria-label={`${plan.jp}モデルを選ぶ`}
                    aria-pressed={active}
                    className="min-h-[188px] rounded-[8px] border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-22px_rgba(15,17,21,0.26)]"
                    style={{
                      borderColor: active ? BRAND.red : BRAND.border,
                      background: active ? BRAND.redSoft : "#F8F9FA",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="money-eyebrow" style={{ color: active ? BRAND.red : BRAND.muted }}>
                          {plan.en}
                        </p>
                        <p className="mt-2 text-[32px] font-black leading-none" style={{ color: BRAND.text }}>
                          {plan.jp}
                        </p>
                      </div>
                      {active && <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: BRAND.red }} strokeWidth={2} />}
                    </div>
                    <p className="mt-5 flex items-baseline gap-1 whitespace-nowrap">
                      <span className="font-oswald text-[34px] leading-none" style={{ color: BRAND.red }}>
                        {formatMan(plan.price)}
                      </span>
                      <span className="text-[12px] font-bold" style={{ color: BRAND.text }}>
                        万円〜
                      </span>
                    </p>
                    <p className="mt-3 text-[12px] font-bold" style={{ color: BRAND.muted }}>
                      {plan.size} / {plan.badge}
                    </p>
                    <p className="mt-2 text-[12px] leading-[1.65]" style={{ color: BRAND.muted }}>
                      {plan.body}
                    </p>
                  </button>
                );
              })}
            </div>
          </article>

          <article>
            <StepLabel no="02" label="Land condition" />
            <div className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
              <div className="grid grid-cols-3 gap-2">
                {LAND_MODES.map((mode) => {
                  const active = landMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setLandMode(mode.id)}
                      aria-label={`${mode.label}で計算する`}
                      aria-pressed={active}
                      className="min-h-[86px] rounded-[8px] border px-3 py-3 text-left transition duration-200 hover:bg-white"
                      style={{
                        borderColor: active ? BRAND.red : BRAND.border,
                        background: active ? BRAND.redSoft : "#F8F9FA",
                        color: active ? BRAND.redDark : BRAND.text,
                      }}
                    >
                      <span className="block text-[13px] font-black leading-[1.35]">{mode.label}</span>
                      <span className="mt-2 block text-[11px] leading-[1.45]" style={{ color: active ? BRAND.redDark : BRAND.muted }}>
                        {mode.note}
                      </span>
                    </button>
                  );
                })}
              </div>
              {landMode !== "owned" ? (
                <ControlField
                  id="money-land-cost"
                  label="土地予算"
                  value={landCost}
                  suffix="万円"
                  min={500}
                  max={2500}
                  step={50}
                  onChange={setLandCost}
                />
              ) : (
                <div className="rounded-[8px] border bg-[#F8F9FA] p-4" style={{ borderColor: BRAND.border }}>
                  <div className="flex items-center gap-3">
                    <MapPinned className="h-5 w-5" style={{ color: BRAND.green }} strokeWidth={1.9} />
                    <p className="money-card-title" style={{ color: BRAND.text }}>
                      土地代を0円で計算
                    </p>
                  </div>
                  <p className="money-body-sm mt-3" style={{ color: BRAND.muted }}>
                    建物・諸費用・外構の範囲を中心に確認します。
                  </p>
                </div>
              )}
            </div>
          </article>

          <article>
            <StepLabel no="03" label="Household line" />
            <div className="grid gap-3 lg:grid-cols-3">
              <ControlField
                id="money-monthly-cap"
                label="月々上限"
                value={monthlyCap}
                suffix="万円"
                min={5}
                max={14}
                step={0.5}
                onChange={setMonthlyCap}
              />
              <ControlField
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
              <ControlField
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
            </div>
          </article>
        </div>

        <aside className="bg-[#111418] p-5 text-white md:p-7 xl:sticky xl:top-24 xl:self-start">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5" style={{ color: BRAND.red }} strokeWidth={1.9} />
            <p className="money-eyebrow text-white/48">
              Your total cost
            </p>
          </div>
          <p className="mt-5 text-[13px] font-bold text-white/58">
            {result.selectedPlan.jp}モデル + {landMode === "owned" ? "土地あり" : `土地${formatMan(result.effectiveLandCost)}万円`}
          </p>
          <p className="mt-3 flex items-end gap-2 whitespace-nowrap">
            <span className="font-oswald money-diagnosis-number" style={{ color: BRAND.red }}>
              {formatMan(result.totalCost)}
            </span>
            <span className="pb-2 text-[16px] font-bold text-white">
              万円
            </span>
          </p>

          <div className="mt-6 grid gap-px overflow-hidden rounded-[8px] border" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.14)" }}>
            {[
              ["建物", `${formatMan(result.selectedPlan.price)}万円`],
              ["土地", landMode === "owned" ? "0万円" : `${formatMan(result.effectiveLandCost)}万円`],
              ["諸費用・引越し", `${EXTRA_COSTS + MOVING_COSTS}万円`],
              ["自己資金", `-${formatMan(savings)}万円`],
              ["借入目安", `${formatMan(result.borrowingMan)}万円`],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[1fr_auto] gap-4 bg-white/7 px-4 py-3">
                <p className="text-[12px] font-bold text-white/52">{label}</p>
                <p className="text-right text-[13px] font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="money-eyebrow text-white/48">
                  Monthly payment
                </p>
                <p className="mt-2 text-[12px] font-bold text-white/56">
                  試算用金利{RATE.toFixed(1)}% / {YEARS}年元利均等 / ボーナス払いなし
                </p>
              </div>
              <WalletCards className="h-5 w-5" style={{ color: BRAND.red }} strokeWidth={1.9} />
            </div>
            <p className="mt-4 flex items-end gap-2 whitespace-nowrap">
              <span className="font-oswald text-[58px] leading-none md:text-[64px]" style={{ color: ratioTone }}>
                {result.monthlyPayment.toLocaleString("ja-JP")}
              </span>
              <span className="pb-2 text-[16px] font-bold text-white">円 / 月</span>
            </p>
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.14)" }}>
              <div className="bg-white/7 p-4">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" style={{ color: ratioTone }} strokeWidth={1.8} />
                  <p className="money-eyebrow text-white/48">返済比率</p>
                </div>
                <p className="mt-2 font-oswald text-[34px] leading-none" style={{ color: ratioTone }}>
                  {result.ratio.toFixed(1)}%
                </p>
              </div>
              <div className="bg-white/7 p-4">
                <p className="money-eyebrow text-white/48">月々上限との差</p>
                <p className="mt-2 font-oswald text-[34px] leading-none" style={{ color: result.monthlyGap <= 0 ? BRAND.green : BRAND.alert }}>
                  {result.monthlyGap <= 0 ? "-" : "+"}
                  {Math.abs(result.monthlyGap).toFixed(1)}
                  <span className="ml-1 text-[11px] font-bold text-white">万円</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[8px] border-l-[4px] p-4" style={{ borderColor: ratioTone, background: "rgba(255,255,255,0.08)" }}>
            <p className="text-[12px] font-bold" style={{ color: ratioTone }}>
              {ratioLabel}
            </p>
            <p className="money-card-title mt-2 text-white">
              {result.verdict}
            </p>
            <p className="money-body-sm mt-2 text-white/62">
              {result.lead}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(22,163,74,0.7)]"
              style={{ background: BRAND.line }}
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.9} fill="currentColor" />
              この条件で診断を頼む
            </a>
            <a
              href="/reserve"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[8px] border px-5 py-3 text-[14px] font-black text-white transition duration-300 hover:bg-white hover:text-[#0F1115]"
              style={{ borderColor: "rgba(255,255,255,0.5)" }}
            >
              相談枠を見る
              <Send className="h-4 w-4" strokeWidth={1.9} />
            </a>
          </div>
          <p className="money-body-sm mt-5 flex gap-2 text-white/54">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BRAND.alert }} strokeWidth={1.8} />
            表示額は概算です。外構、登記、火災保険、金融機関条件、土地条件は個別に確認します。
          </p>
        </aside>
      </div>
    </section>
  );
}
