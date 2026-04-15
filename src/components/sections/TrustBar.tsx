"use client";

/*
  TrustBar — ピュアダーク × Liquid Glass × 極細タイポ（2026リファイン版）

  改善ポイント（2026-04-15）:
  - 背景を緑＋茶のラジアル混色 → ピュアダーク + 微細ダークラジアルに純化
  - ¥0 フォントを Inter semibold → weight 200（極細）に変更して品格UP
  - ¥と0のサイズ比を変えて、数字が主役になるように
  - ラベルのトラッキングを広げて呼吸感を出す

  コピー方針（2026-04-14精査）:
  - 業界用語排除（「ふかし請求」「小運搬費」等NG）
  - 顧客視点（「職人の駐車場代」のような内部事情NG）
  - 対比で刺さる（他社では発生、うちでは¥0）

  [要確認] マーク項目は、実装前に下記を専務に確認する必要あり:
  - 設計料: 工事費に完全に含まれる？
  - プラン変更料: 回数無制限？
  - 確認申請費: コミコミに含まれる？
  - 契約後の増額: 本当にゼロ？
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
        // ピュアダーク基調 + ごく控えめなダークラジアルで深みだけ演出
        background:
          "radial-gradient(at 15% 50%, rgba(90,138,74,0.12) 0%, transparent 55%), radial-gradient(at 85% 50%, rgba(196,112,63,0.10) 0%, transparent 55%), #0A0A0A",
      }}
    >
      {/* ノイズテクスチャ層（AIっぽさ回避） */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="flex gap-5 md:gap-7 whitespace-nowrap py-12 md:py-20 px-5 relative z-[1]"
        style={{
          animation: "marquee 60s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="shrink-0 flex flex-col gap-3 px-8 md:px-12 py-7 md:py-9 rounded-2xl"
            style={{
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
              minWidth: "220px",
            }}
            aria-hidden={i >= ZEROS.length ? "true" : undefined}
          >
            {/* ¥0 — ¥を小さく、0を大きく（高級ブランド風） */}
            <span className="text-white leading-none flex items-baseline">
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 200,
                  fontSize: "clamp(28px, 3vw, 44px)",
                  letterSpacing: "-0.01em",
                  opacity: 0.75,
                  marginRight: "0.05em",
                }}
              >
                ¥
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 200,
                  fontSize: "clamp(56px, 7vw, 96px)",
                  letterSpacing: "-0.03em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                0
              </span>
            </span>

            {/* ラベル — 広めのトラッキングで呼吸感 */}
            <span
              className="text-white/65"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "clamp(12px, 0.9vw, 13px)",
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
