"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, ChevronRight } from "lucide-react";

type Step = 1 | 2 | 3;

type FormData = {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  branch: "本社" | "京都支店";
  message: string;
};

const INITIAL: FormData = {
  name: "",
  phone: "",
  preferredDate: "",
  preferredTime: "午前",
  branch: "本社",
  message: "",
};

export default function ReservePage() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canNext1 = data.name.trim().length > 0 && /^\d{2,4}-?\d{2,4}-?\d{3,4}$/.test(data.phone.replace(/\s/g, ""));
  const canNext2 = data.preferredDate.length > 0;

  const submit = async () => {
    setSubmitting(true);
    // 実運用では API エンドポイントへ POST
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-[80vh] py-[var(--section-py)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-main-light mb-6">
              <Check className="w-8 h-8 text-main" strokeWidth={2} />
            </div>
            <h1 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
              ご予約を承りました
            </h1>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9] mb-8">
              {data.name}様、ご予約ありがとうございます。<br />
              1営業日以内に担当より{data.phone}までご連絡いたします。
            </p>
            <div className="bg-bg-secondary rounded-lg p-[var(--card-p)] text-left mb-8">
              <p className="text-text-secondary text-xs mb-2">ご予約内容</p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-text-secondary">お名前</dt>
                <dd className="text-text-primary">{data.name}様</dd>
                <dt className="text-text-secondary">お電話</dt>
                <dd className="text-text-primary">{data.phone}</dd>
                <dt className="text-text-secondary">ご希望日</dt>
                <dd className="text-text-primary">{data.preferredDate}（{data.preferredTime}）</dd>
                <dt className="text-text-secondary">店舗</dt>
                <dd className="text-text-primary">{data.branch}</dd>
              </dl>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 rounded bg-main text-white text-sm font-medium hover:bg-main-dark transition-all"
            >
              トップに戻る
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-[80vh] py-[clamp(48px,6vw,96px)] bg-bg-primary">
        <div className="max-w-[640px] mx-auto px-[var(--page-px)]">
          {/* ヘッダー */}
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            RESERVATION
          </p>
          <h1 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-3">
            来場予約
          </h1>
          <p className="text-text-secondary text-sm mb-8">
            見学予約は無料です。ご希望日時とご連絡先をご入力ください。ご希望のない営業訪問や強引なご案内は行いません。
          </p>

          {/* プログレスバー */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                    step >= s
                      ? "bg-main text-white"
                      : "bg-bg-secondary text-text-secondary"
                  }`}
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-px transition-colors ${
                      step > s ? "bg-main" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* === Step 1: 基本情報 === */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-text-primary text-sm font-medium mb-2"
                >
                  お名前 <span className="text-accent">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="山田 太郎"
                  className="w-full min-h-[48px] px-4 py-3 rounded border border-border bg-bg-primary text-text-primary text-base focus:outline-none focus:border-main transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-text-primary text-sm font-medium mb-2"
                >
                  お電話番号 <span className="text-accent">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="090-1234-5678"
                  className="w-full min-h-[48px] px-4 py-3 rounded border border-border bg-bg-primary text-text-primary text-base focus:outline-none focus:border-main transition-colors"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                />
                <p className="text-text-secondary text-xs mt-1">
                  日程確認のため、必要な場合のみご連絡します。
                </p>
              </div>

              <button
                type="button"
                disabled={!canNext1}
                onClick={() => setStep(2)}
                className="flex items-center justify-center gap-2 w-full min-h-[52px] px-8 py-3.5 rounded bg-main text-white text-base font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-main-dark hover:-translate-y-0.5"
              >
                次へ <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          )}

          {/* === Step 2: 日時 === */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-text-primary text-sm font-medium mb-2"
                >
                  ご希望日 <span className="text-accent">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  autoFocus
                  value={data.preferredDate}
                  onChange={(e) => update("preferredDate", e.target.value)}
                  min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                  className="w-full min-h-[48px] px-4 py-3 rounded border border-border bg-bg-primary text-text-primary text-base focus:outline-none focus:border-main transition-colors"
                />
                <p className="text-text-secondary text-xs mt-1">
                  定休日: 火曜・水曜 / 営業時間: 9:00〜19:00
                </p>
              </div>

              <div>
                <label className="block text-text-primary text-sm font-medium mb-2">
                  ご希望時間帯
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["午前", "午後", "夕方"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("preferredTime", t)}
                      className={`min-h-[44px] px-4 py-2 rounded border text-sm transition-all ${
                        data.preferredTime === t
                          ? "border-main bg-main-light text-main font-medium"
                          : "border-border bg-bg-primary text-text-primary hover:border-main"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-text-primary text-sm font-medium mb-2">
                  ご希望店舗
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["本社", "京都支店"] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => update("branch", b)}
                      className={`min-h-[44px] px-4 py-2 rounded border text-sm transition-all ${
                        data.branch === b
                          ? "border-main bg-main-light text-main font-medium"
                          : "border-border bg-bg-primary text-text-primary hover:border-main"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <p className="text-text-secondary text-xs mt-1">
                  {data.branch === "本社"
                    ? "奈良県奈良市大宮町1-6-21"
                    : "京都府宇治市小倉町西山67-5"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center min-h-[52px] px-6 py-3.5 rounded border border-border text-text-primary text-base hover:bg-bg-secondary transition-colors"
                >
                  戻る
                </button>
                <button
                  type="button"
                  disabled={!canNext2}
                  onClick={() => setStep(3)}
                  className="flex-1 flex items-center justify-center gap-2 min-h-[52px] px-8 py-3.5 rounded bg-main text-white text-base font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-main-dark hover:-translate-y-0.5"
                >
                  次へ <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

          {/* === Step 3: 確認 === */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-bg-secondary rounded-lg p-[var(--card-p)]">
                <p className="text-text-primary font-medium text-sm mb-4">
                  ご予約内容の確認
                </p>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
                  <dt className="text-text-secondary">お名前</dt>
                  <dd className="text-text-primary">{data.name}様</dd>
                  <dt className="text-text-secondary">お電話</dt>
                  <dd className="text-text-primary" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{data.phone}</dd>
                  <dt className="text-text-secondary">ご希望日</dt>
                  <dd className="text-text-primary">{data.preferredDate}</dd>
                  <dt className="text-text-secondary">時間帯</dt>
                  <dd className="text-text-primary">{data.preferredTime}</dd>
                  <dt className="text-text-secondary">店舗</dt>
                  <dd className="text-text-primary">{data.branch}</dd>
                </dl>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-text-primary text-sm font-medium mb-2"
                >
                  ご質問・ご要望（任意）
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="土地探しもお願いしたい、など"
                  className="w-full px-4 py-3 rounded border border-border bg-bg-primary text-text-primary text-sm focus:outline-none focus:border-main transition-colors resize-none"
                />
              </div>

              <p className="text-text-secondary text-xs leading-relaxed">
                送信後、1営業日以内に担当より確認のご連絡をいたします。お電話でご希望の場合は{" "}
                <a href="tel:0742361123" className="text-main underline">
                  0742-36-1123
                </a>{" "}
                へ直接ご連絡ください。
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center justify-center min-h-[52px] px-6 py-3.5 rounded border border-border text-text-primary text-base hover:bg-bg-secondary transition-colors"
                >
                  戻る
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={submit}
                  className="flex-1 flex items-center justify-center gap-2 min-h-[52px] px-8 py-3.5 rounded bg-accent text-white text-base font-medium transition-all disabled:opacity-40 hover:opacity-90 hover:-translate-y-0.5"
                >
                  {submitting ? "送信中..." : "予約を確定する"}
                </button>
              </div>
            </div>
          )}

          {/* プライバシー */}
          <p className="text-text-secondary text-xs text-center mt-10 leading-relaxed">
            お預かりした個人情報は、予約確認のご連絡とその後のご案内にのみ使用し、第三者への提供はいたしません。
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
