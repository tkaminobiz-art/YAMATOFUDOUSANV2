"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Download } from "lucide-react";

type InquiryType = "buy" | "sell" | "valuation" | "other";

type FormData = {
  name: string;
  contact: string;
  contactType: "email" | "phone";
  inquiryType: InquiryType;
};

const INITIAL: FormData = {
  name: "",
  contact: "",
  contactType: "email",
  inquiryType: "buy",
};

const INQUIRY_LABELS: Record<InquiryType, { label: string; desc: string }> = {
  buy: { label: "家を買いたい（資料請求・ご相談）", desc: "花鳥風月シリーズの資料をお届けします" },
  sell: { label: "家・土地を売りたい", desc: "売却のご相談・ご質問を承ります" },
  valuation: { label: "無料査定を依頼したい", desc: "ご所有の不動産の査定を無料で実施します" },
  other: { label: "その他のお問い合わせ", desc: "上記以外のご相談はこちらから" },
};

export default function ContactPage() {
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canSubmit =
    data.name.trim().length > 0 &&
    (data.contactType === "email"
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact)
      : /^\d{2,4}-?\d{2,4}-?\d{3,4}$/.test(data.contact.replace(/\s/g, "")));

  const submit = async () => {
    setSubmitting(true);
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
              お問い合わせを承りました
            </h1>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9] mb-8">
              {data.name}様、ありがとうございます。<br />
              {data.contactType === "email" ? "ご登録のメールアドレス" : "お電話"}
              へ、2営業日以内にご連絡いたします。
            </p>
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
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            CONTACT
          </p>
          <h1 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-3">
            お問い合わせ（無料）
          </h1>
          <p className="text-text-secondary text-sm mb-8">
            ご相談内容を選択して、お名前・連絡先をご記入ください。
          </p>

          {/* フォーム */}
          <div className="space-y-6">
            {/* ご相談内容ドロップダウン */}
            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                ご相談内容 <span className="text-accent">*</span>
              </label>
              <div className="space-y-2">
                {(Object.keys(INQUIRY_LABELS) as InquiryType[]).map((key) => {
                  const item = INQUIRY_LABELS[key];
                  const selected = data.inquiryType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => update("inquiryType", key)}
                      className={`w-full text-left min-h-[64px] px-4 py-3 rounded border transition-all ${
                        selected
                          ? "border-main bg-main-light"
                          : "border-border bg-bg-primary hover:border-main"
                      }`}
                    >
                      <p className={`text-sm font-medium mb-0.5 ${selected ? "text-main" : "text-text-primary"}`}>
                        {item.label}
                      </p>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 資料請求の場合のみ資料内容プレビュー */}
            {data.inquiryType === "buy" && (
              <div className="bg-bg-secondary rounded-lg p-[var(--card-p)]">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="w-5 h-5 text-main" strokeWidth={1.5} />
                  <p className="text-text-primary font-medium text-sm">
                    お届けする資料
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex gap-2">
                    <span className="text-main">•</span>
                    花鳥風月シリーズ 詳細パンフレット
                  </li>
                  <li className="flex gap-2">
                    <span className="text-main">•</span>
                    標準仕様一覧（全ブランド・品番付き）
                  </li>
                  <li className="flex gap-2">
                    <span className="text-main">•</span>
                    コミコミ価格の内訳（隠れた費用なしの証明）
                  </li>
                  <li className="flex gap-2">
                    <span className="text-main">•</span>
                    施工事例集（過去の建築実例）
                  </li>
                  <li className="flex gap-2">
                    <span className="text-main">•</span>
                    家づくり 1〜10の流れガイド
                  </li>
                </ul>
              </div>
            )}

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
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="山田 太郎"
                className="w-full min-h-[48px] px-4 py-3 rounded border border-border bg-bg-primary text-text-primary text-base focus:outline-none focus:border-main transition-colors"
              />
            </div>

            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                お届け方法
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(["email", "phone"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      update("contactType", t);
                      update("contact", "");
                    }}
                    className={`min-h-[44px] px-4 py-2 rounded border text-sm transition-all ${
                      data.contactType === t
                        ? "border-main bg-main-light text-main font-medium"
                        : "border-border bg-bg-primary text-text-primary hover:border-main"
                    }`}
                  >
                    {t === "email" ? "メール" : "お電話"}
                  </button>
                ))}
              </div>
              <input
                type={data.contactType === "email" ? "email" : "tel"}
                inputMode={data.contactType === "phone" ? "tel" : undefined}
                autoComplete={data.contactType === "email" ? "email" : "tel"}
                value={data.contact}
                onChange={(e) => update("contact", e.target.value)}
                placeholder={
                  data.contactType === "email"
                    ? "yamada@example.com"
                    : "090-1234-5678"
                }
                className="w-full min-h-[48px] px-4 py-3 rounded border border-border bg-bg-primary text-text-primary text-base focus:outline-none focus:border-main transition-colors"
                style={
                  data.contactType === "phone"
                    ? { fontFamily: "var(--font-inter), Inter, sans-serif" }
                    : undefined
                }
              />
            </div>

            <button
              type="button"
              disabled={!canSubmit || submitting}
              onClick={submit}
              className="w-full flex items-center justify-center gap-2 min-h-[52px] px-8 py-3.5 rounded bg-text-primary text-white text-base font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg"
            >
              {submitting
                ? "送信中..."
                : data.inquiryType === "buy"
                ? "無料で資料を受け取る"
                : data.inquiryType === "sell"
                ? "売却の相談を送信する"
                : data.inquiryType === "valuation"
                ? "無料査定を依頼する"
                : "お問い合わせを送信する"}
            </button>

            <p className="text-text-secondary text-xs leading-relaxed text-center">
              強引な営業電話や訪問はいたしません。ご相談のみもOKです。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
