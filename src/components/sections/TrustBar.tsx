"use client";

/*
  TrustBar — LIQUID GLASS 型（2026 iOS26級ガラスモーフィズム）
  神野さんと相談の上、案I で採用。専務レビュー後に案H（COLOR POP）へ
  差し替え可能。

  コピー方針（神野さんが 2026-04-14 に精査）:
  - 業界用語排除（「ふかし請求」「小運搬費」等NG）
  - 顧客視点（「職人の駐車場代」のような内部事情NG）
  - 対比で刺さる（他社では発生、うちでは¥0）

  [要確認] マーク項目は、実装前に下記を専務に確認する必要あり:
  - 設計料: 工事費に完全に含まれる？
  - プラン変更料: 回数無制限？
  - 確認申請費: コミコミに含まれる？
  - 契約後の増額: 本当にゼロ？（業界の8割が100〜300万増額）
  - 展示場仕様の追加料金: 展示場=標準で追加なしの意味
*/

const ZEROS = [
  { label: "仲介手数料" },
  { label: "つなぎ融資の金利" },
  { label: "地盤改良費" },
  { label: "設計料" /* [要確認] 工事費に完全含有 */ },
  { label: "プラン変更料" /* [要確認] 回数無制限 */ },
  { label: "確認申請費" /* [要確認] コミコミ含有 */ },
  { label: "契約後の増額" /* [要確認] 業界8割は100-300万増額 */ },
  { label: "展示場仕様の追加料金" /* [要確認] 展示=標準 */ },
  { label: "不透明な管理費" },
] as const;

export default function TrustBar() {
  const items = [...ZEROS, ...ZEROS];

  return (
    <section
      className="relative overflow-hidden"
      aria-label="やまと不動産の9つの¥0"
      style={{
        background:
          "radial-gradient(at 20% 50%, #5A8A4A 0%, transparent 50%), radial-gradient(at 80% 50%, #C4703F 0%, transparent 50%), radial-gradient(at 50% 100%, #3D6B32 0%, transparent 60%), #1C1C1C",
      }}
    >
      <div
        className="flex gap-5 md:gap-7 whitespace-nowrap py-10 md:py-16 px-5"
        style={{
          animation: "marquee 60s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="shrink-0 flex flex-col gap-2 px-8 md:px-12 py-6 md:py-8 rounded-2xl"
            style={{
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
              minWidth: "220px",
            }}
            aria-hidden={i >= ZEROS.length ? "true" : undefined}
          >
            <span
              className="text-white font-semibold leading-none"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "clamp(48px, 6vw, 88px)",
                letterSpacing: "-0.04em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ¥0
            </span>
            <span
              className="text-white/75 text-xs md:text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
