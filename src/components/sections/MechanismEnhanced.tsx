"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  MechanismEnhanced — 価格メカニズム
  -----------------------------------------------------------------
  2026-04-21 design-critic 指摘 #1 反映:
  - 「雑誌ごっこ」(ISSUE/MECHANISM kicker/Yamato Editorial/Founder's Note/
     END OF MECHANISM/◉記号) を全削除
  - 残すのは版面(21:9ブリード/非対称グリッド/pull quote/sidecar)のみ
  - ACCENT_LIME は主見出し1ワード × 4 + 金額(-1,720) の 5箇所に制限

  構造:
  1. 非対称グリッド (1.4fr:1fr / 1.3fr:1fr)
  2. 写真統合: 21:9 ブリード / 4:5 sidecar / 16:10 detail
  3. 密疎リズム: opening疎 → manifesto密 → closing疎
  4. サイドカー: photo + data + notes の stretch分散
*/

const ACCENT_LIME = "#A2C523";

// 全写真共通フィルター(編集誌の印刷感)
const PHOTO_FILTER = "saturate(0.95) contrast(1.05) sepia(0.04)";

const PHOTOS = {
  opening: {
    src: "/images/newsozai/hero-day-green-exterior.webp",
    alt: "外観 — 緑と空気の重み",
  },
  sidecar: {
    src: "/images/newsozai/interior-ldk-01.webp",
    alt: "現場の素材ひとつ、削らない",
  },
  detail: {
    src: "/images/newsozai/exterior-texture-detail-01.webp",
    alt: "素材のディテール",
  },
} as const;

export default function MechanismEnhanced() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FAF8F3] text-text-primary scroll-in"
    >
      {/* ============= OPENING — 21:9 BLEED PHOTO ============= */}
      <div className="relative w-full aspect-[21/9] overflow-hidden bg-text-primary">
        <Image
          src={PHOTOS.opening.src}
          alt={PHOTOS.opening.alt}
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: `${PHOTO_FILTER} brightness(0.85)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* ============= OPENING BODY — Asymmetric ============= */}
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)] pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-start">
          {/* Left: 看板タイトル */}
          <div>
            <h2
              className="text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              やまとは<span style={{ color: ACCENT_LIME }}>安い</span>？
              <br />
              いいえ、違います。
            </h2>
          </div>

          {/* Right: LEAD with top border */}
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p
                className="text-[clamp(15px,1.2vw,18px)] leading-[2.0] tracking-[0.02em] max-w-[420px]"
                style={{
                  fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                  fontWeight: 500,
                }}
              >
                同じ素材、同じ性能。
              </p>
              <p
                className="mt-3 text-[clamp(15px,1.2vw,18px)] leading-[2.0] tracking-[0.02em] max-w-[420px]"
                style={{
                  fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                  fontWeight: 500,
                }}
              >
                違うのは、家を
                <br />
                届けるまでの費用です。
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* ============= MANIFESTO — 編集記事 (paper-alt 背景・密) ============= */}
      <div className="bg-[#F0EBE0] border-y border-[#CFC5B5] py-20 md:py-32 px-[var(--page-px)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-24 items-stretch">
          {/* === LEFT: Article === */}
          <div>
            {/* Manifesto title */}
            <h3
              className="text-text-primary leading-[1.18] tracking-[-0.01em] mb-12 md:mb-16"
              style={{
                fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: "clamp(28px, 5vw, 64px)",
              }}
            >
              だから、やまとの価格は
              <br />
              <span style={{ color: ACCENT_LIME }}>家そのものの価格</span>です。
            </h3>

            {/* Article body */}
            <div className="text-[14px] md:text-[15px] leading-[2.0] tracking-[0.03em] text-text-primary">
              {/* Evidence statement(太字) — drop cap 廃止・エビデンス文として強調 */}
              <p
                className="mb-8 md:mb-10 max-w-[54ch] text-[clamp(15px,1.1vw,17px)] leading-[1.95]"
                style={{
                  fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                  fontWeight: 700,
                }}
              >
                広告費、展示場の維持費、仲介マージン。これら家を届けるまでの費用が、見積もりの三割から四割を占める会社もあります
                <sup
                  className="text-[0.7em] align-super font-bold inline-block mx-0.5 text-text-secondary"
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  ※1
                </sup>
                。
              </p>

              <p
                className="mb-6 max-w-[54ch]"
                style={{ fontFamily: "var(--font-shippori), 'Shippori Mincho', serif" }}
              >
                やまとは、専用の展示場を持ちません
                <sup
                  className="text-[0.7em] align-super font-bold inline-block mx-0.5 text-text-secondary"
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  ※2
                </sup>
                。自社の分譲地に建てた家を、そのままモデルハウスとして使い、いずれお客様にお譲りしています。一軒の家が、展示と販売の二つの役割を果たします。
              </p>

              <p
                className="mb-6 max-w-[54ch]"
                style={{ fontFamily: "var(--font-shippori), 'Shippori Mincho', serif" }}
              >
                土地の分譲から設計、施工まで、自社で進めています。間に入る会社がないので、仲介のマージンも乗りません。
              </p>

              {/* Pull quote with hang */}
              <aside
                className="relative my-10 md:my-14 py-7 md:py-10 border-y-[3px] border-text-primary lg:-ml-12 lg:pl-12"
              >
                <span
                  aria-hidden
                  className="absolute left-1 top-2 leading-none font-black select-none pointer-events-none text-text-primary/20"
                  style={{
                    fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                    fontSize: "clamp(72px, 9vw, 120px)",
                  }}
                >
                  『
                </span>
                <blockquote
                  className="pl-14 md:pl-20 text-text-primary leading-[1.5] tracking-[0.01em]"
                  style={{
                    fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                    fontWeight: 900,
                    fontSize: "clamp(20px, 3vw, 38px)",
                  }}
                >
                  削るのではなく、<span style={{ color: ACCENT_LIME }}>含めない</span>。
                  <br />
                  それだけなんです。
                </blockquote>
              </aside>

              <p
                className="mb-6 max-w-[54ch]"
                style={{ fontFamily: "var(--font-shippori), 'Shippori Mincho', serif" }}
              >
                だから、同じ素材・同じ性能でも、価格は違って見えます
                <sup
                  className="text-[0.7em] align-super font-bold inline-block mx-0.5 text-text-secondary"
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  ※3
                </sup>
                。家そのものの品質は、変えていません。家を届けるまでの費用を最小限にした結果が、2,280万円〜という価格です。
              </p>
            </div>
          </div>

          {/* === RIGHT: Sidecar — stretch分散(photo + data + notes) === */}
          <aside className="flex flex-col justify-between gap-10 md:gap-14 min-h-full">
            {/* Top: photo with caption overlay */}
            <figure className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={PHOTOS.sidecar.src}
                alt={PHOTOS.sidecar.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 30vw"
                style={{ filter: PHOTO_FILTER }}
              />
              <figcaption
                className="absolute left-0 bottom-0 max-w-[75%] px-4 py-3 bg-[#FAF8F3] border-t border-r border-text-primary text-[10px] tracking-[0.16em] uppercase text-text-secondary font-medium"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                現場の素材ひとつ、削らない
              </figcaption>
            </figure>

            {/* Middle: data box */}
            <div
              className="bg-[#FAF8F3] p-6 md:p-7"
              style={{ border: "1.5px solid #1A1411" }}
            >
              <p
                className="text-[10px] tracking-[0.28em] uppercase font-black mb-4 pb-3 border-b border-[#CFC5B5] text-text-secondary"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                大手との差
              </p>
              <dl
                className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm tabular-nums"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <dt
                  className="text-[10px] tracking-[0.16em] uppercase pt-1.5 font-bold text-text-secondary"
                >
                  参考・大手
                </dt>
                <dd
                  className="font-bold text-text-primary"
                  style={{ fontFamily: "var(--font-shippori), 'Shippori Mincho', serif", fontSize: "16px" }}
                >
                  4,000<span className="text-[11px] ml-1 text-text-secondary">万円〜</span>
                </dd>

                <dt
                  className="text-[10px] tracking-[0.16em] uppercase pt-1.5 font-bold text-text-secondary"
                >
                  やまと
                </dt>
                <dd
                  className="font-bold text-text-primary"
                  style={{ fontFamily: "var(--font-shippori), 'Shippori Mincho', serif", fontSize: "16px" }}
                >
                  2,280<span className="text-[11px] ml-1 text-text-secondary">万円〜</span>
                </dd>

                <dt
                  className="text-[10px] tracking-[0.16em] uppercase pt-1.5 font-bold text-text-secondary"
                >
                  差額
                </dt>
                <dd>
                  <span
                    className="font-black"
                    style={{
                      color: ACCENT_LIME,
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "20px",
                    }}
                  >
                    -1,720
                  </span>
                  <span className="text-[11px] ml-1 text-text-secondary">万円</span>
                </dd>
              </dl>
            </div>

            {/* Bottom: margin notes */}
            <div
              className="bg-[#FAF8F3] px-6 py-5 md:px-7 md:py-6 border-t-2 border-text-primary border-b border-dashed border-[#CFC5B5] grid gap-3.5 text-[12px] leading-[1.8] text-text-secondary"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              <div className="pl-6 relative">
                <span
                  aria-hidden
                  className="absolute left-0 top-0.5 text-[11px] font-bold text-text-secondary"
                >
                  ※1
                </span>
                業界平均の費用構造試算による
              </div>
              <div className="pl-6 relative">
                <span
                  aria-hidden
                  className="absolute left-0 top-0.5 text-[11px] font-bold text-text-secondary"
                >
                  ※2
                </span>
                分譲地のモデルハウスを、販売まで回す方式
              </div>
              <div className="pl-6 relative">
                <span
                  aria-hidden
                  className="absolute left-0 top-0.5 text-[11px] font-bold text-text-secondary"
                >
                  ※3
                </span>
                京モデル30坪 4LDK の場合
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ============= CLOSING — 12列キャンバス + 大宣言 ============= */}
      <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] pt-20 md:pt-32 pb-24 md:pb-40">
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-end">
          {/* Detail photo (left, smaller) */}
          <figure className="col-span-12 md:col-span-5 relative aspect-[16/10] overflow-hidden">
            <Image
              src={PHOTOS.detail.src}
              alt="素材のディテール"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              style={{ filter: PHOTO_FILTER }}
            />
          </figure>

          {/* Big closing statement (right) */}
          <div className="col-span-12 md:col-span-7 md:pl-8">
            <p
              className="text-[clamp(26px,4.5vw,64px)] leading-[1.35] tracking-[-0.01em] text-text-primary"
              style={{
                fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                fontWeight: 900,
              }}
            >
              家を建てるのに必要な
              <br />
              <span style={{ color: ACCENT_LIME }}>費用しか</span>、<br />
              やまとはいただきません。
            </p>
            {/* (サブ) 当たり前を、きちんとやっているだけです — 封印+謙虚 */}
            <p
              className="mt-5 md:mt-7 text-text-primary/85 text-[clamp(15px,1.2vw,18px)] leading-[1.8] max-w-[520px]"
              style={{
                fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                fontWeight: 500,
              }}
            >
              当たり前を、
              <br className="hidden md:inline" />
              きちんとやっているだけです。
            </p>
            {/* (最後) 確信しています — 想いで結ぶ */}
            <p
              className="mt-4 md:mt-6 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[480px]"
              style={{
                fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                fontWeight: 400,
              }}
            >
              それが、お客様のためになると、
              <br className="hidden md:inline" />
              私たちは確信しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
