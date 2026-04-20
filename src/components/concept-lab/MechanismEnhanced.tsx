"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  MechanismEnhanced — Plan B 用(ASAGIRI / C-2 Magazine Editorial 適用版)
  -----------------------------------------------------------------
  ASAGIRI 9原則の適用:
  1. 非対称構造 (1.4fr:1fr / 1.3fr:1fr)
  2. 階層: 看板タイトル「家は、原価が九割。」
  3. 呼応: ACCENT_LIME #A2C523 を 7+箇所に分散
  4. 写真統合: 21:9 ブリード / 4:5 sidecar / 16:10 detail / トーン統一フィルター
  5. 密疎リズム: opening疎 → manifesto密 → closing疎
  6. 間の能動性: ブリード・ハング・オーバーレイ
  7. 位置ローテーション: 写真位置を交互(L→R)
  8. キャンバス単位配置: 12列構造
  9. サイドカー禁止: 右列は stretch分散(photo+data+notes)

  ルールセット適用:
  - B(テキスト幅): standard / drop cap / hang quote / margin notes
  - C(改行リズム): 意味改行 + orphan 排除
  - D(キャプション): 写真overlay / margin notes / sidecar内
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
      {/* ============= TOP RUNNING HEAD ============= */}
      <div className="px-[var(--page-px)] pt-12 md:pt-16 pb-6 max-w-[1400px] mx-auto">
        <div
          className="flex justify-between items-baseline text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-text-secondary"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          <span>
            ISSUE <span style={{ color: ACCENT_LIME }}>014</span>
            <span className="mx-3 text-text-secondary/40">/</span>
            NARA
          </span>
          <span>
            MECHANISM <span style={{ color: ACCENT_LIME }}>01</span>
          </span>
        </div>
      </div>

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

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 px-[var(--page-px)] pb-8 md:pb-12 pointer-events-none">
          <div className="max-w-[1400px] mx-auto flex justify-between items-end gap-6">
            {/* Kicker (左下) */}
            <p
              className="text-[#F5F0E6]/90 text-[10px] md:text-[11px] font-black tracking-[0.32em] uppercase flex items-center gap-3"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              MECHANISM
              <span aria-hidden className="inline-block w-12 h-[1.5px] bg-[#F5F0E6]/80" />
            </p>
            {/* Byline (右下) */}
            <p
              className="text-[#F5F0E6]/70 text-[10px] md:text-[11px] tracking-[0.18em] text-right leading-[1.8]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              YAMATO FUDOSAN
              <br />
              EST. 2011 / NARA
            </p>
          </div>
        </div>
      </div>

      {/* ============= OPENING BODY — Asymmetric ============= */}
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)] pt-16 md:pt-24 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-start">
          {/* Left: 看板タイトル */}
          <div>
            <h2
              className="text-text-primary leading-[1.0] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: "clamp(48px, 9vw, 140px)",
              }}
            >
              家は、原価が
              <br />
              <span style={{ color: ACCENT_LIME }}>九</span>割。
            </h2>
            <p
              className="mt-6 md:mt-10 text-text-secondary text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-bold"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              WHY YAMATO PRICE — 価格の本当の理由
            </p>
          </div>

          {/* Right: LEAD with top border */}
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p
                className="text-[10px] tracking-[0.28em] font-black uppercase mb-4"
                style={{
                  color: ACCENT_LIME,
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                LEAD
              </p>
              <p
                className="text-[clamp(15px,1.2vw,18px)] leading-[2.0] tracking-[0.02em] max-w-[420px]"
                style={{
                  fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                  fontWeight: 500,
                }}
              >
                素材も性能も、大手と変わりません。
              </p>
              <p
                className="mt-3 text-[clamp(15px,1.2vw,18px)] leading-[2.0] tracking-[0.02em] max-w-[420px]"
                style={{
                  fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                  fontWeight: 500,
                }}
              >
                違うのは、<br />
                お家の周りにある費用です。
              </p>

              {/* brand mark */}
              <p
                className="mt-10 text-[11px] tracking-[0.22em] uppercase font-bold text-text-secondary flex items-center gap-3"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span aria-hidden style={{ color: ACCENT_LIME }}>◉</span>
                Yamato Editorial
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
            {/* Section label */}
            <p
              className="font-black uppercase text-[11px] tracking-[0.32em] mb-6 md:mb-10 inline-flex items-center gap-3"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              <span
                aria-hidden
                className="inline-block w-9 h-[2.5px]"
                style={{ background: ACCENT_LIME }}
              />
              MECHANISM <span style={{ color: ACCENT_LIME }}>·</span> やまとの考え方
            </p>

            {/* Manifesto title */}
            <h3
              className="text-text-primary leading-[1.18] tracking-[-0.01em] mb-12 md:mb-16"
              style={{
                fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: "clamp(28px, 5vw, 64px)",
              }}
            >
              お家そのものの原価は、
              <br />
              <span style={{ color: ACCENT_LIME }}>削りません。</span>
            </h3>

            {/* Article body */}
            <div className="text-[14px] md:text-[15px] leading-[2.0] tracking-[0.03em] text-text-primary">
              {/* Drop cap paragraph */}
              <p
                className="mb-6 max-w-[54ch]"
                style={{ fontFamily: "var(--font-shippori), 'Shippori Mincho', serif" }}
              >
                <span
                  className="float-left text-[3.2em] leading-[0.85] pr-2.5 pt-1 font-black"
                  style={{
                    color: ACCENT_LIME,
                    fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                  }}
                >
                  住
                </span>
                宅会社の費用が高いのは、家そのものが高いからではありません
                <sup
                  className="text-[0.7em] align-super font-black inline-block mx-0.5"
                  style={{
                    color: ACCENT_LIME,
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  ※1
                </sup>
                。ブランド広告にかける費用、巨大な展示場の維持費、仲介を挟む手数料。お家には関係のないお金が、見積もりの三〜四割を占めることがあります。
              </p>

              <p
                className="mb-6 max-w-[54ch]"
                style={{ fontFamily: "var(--font-shippori), 'Shippori Mincho', serif" }}
              >
                やまとは、自社で土地を分譲し、自社設計、自社施工で家を建てます
                <sup
                  className="text-[0.7em] align-super font-black inline-block mx-0.5"
                  style={{
                    color: ACCENT_LIME,
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  ※2
                </sup>
                。間に他社が入らない分、お家以外のお金は、ほとんどかかりません。
              </p>

              {/* Pull quote with hang */}
              <aside
                className="relative my-10 md:my-14 py-7 md:py-10 border-y-[3px] border-text-primary lg:-ml-12 lg:pl-12"
              >
                <span
                  aria-hidden
                  className="absolute left-1 top-2 leading-none font-black select-none pointer-events-none"
                  style={{
                    color: ACCENT_LIME,
                    fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                    fontSize: "clamp(72px, 9vw, 120px)",
                    opacity: 0.85,
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
                  家に関係のないお金を、
                  <br />
                  家のお金から削る。
                </blockquote>
                <p
                  className="mt-4 pl-14 md:pl-20 text-[10px] md:text-[11px] tracking-[0.24em] uppercase font-medium text-text-secondary"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span style={{ color: ACCENT_LIME }}>—</span> Yamato Founder's Note
                </p>
              </aside>

              <p
                className="mb-6 max-w-[54ch]"
                style={{ fontFamily: "var(--font-shippori), 'Shippori Mincho', serif" }}
              >
                だから、同じ素材・同じ性能でも、価格は違って見えます
                <sup
                  className="text-[0.7em] align-super font-black inline-block mx-0.5"
                  style={{
                    color: ACCENT_LIME,
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  ※3
                </sup>
                。素材を落とすのでも、職人の手間を削るのでもなく、家の周りにある費用を削ったのが、私たちの2,280万円〜です。
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
                現場の素材ひとつ、<span style={{ color: ACCENT_LIME }}>削らない</span>
              </figcaption>
            </figure>

            {/* Middle: data box */}
            <div
              className="bg-[#FAF8F3] p-6 md:p-7"
              style={{ border: "1.5px solid #1A1411" }}
            >
              <p
                className="text-[10px] tracking-[0.28em] uppercase font-black mb-4 pb-3 border-b border-[#CFC5B5]"
                style={{
                  color: ACCENT_LIME,
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                PRICE DIFFERENCE — 大手との差
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
                  2,480<span className="text-[11px] ml-1 text-text-secondary">万円〜</span>
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
                    -1,520
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
                  className="absolute left-0 top-0.5 text-[11px] font-black"
                  style={{ color: ACCENT_LIME }}
                >
                  ※1
                </span>
                業界平均の費用構造試算による
              </div>
              <div className="pl-6 relative">
                <span
                  aria-hidden
                  className="absolute left-0 top-0.5 text-[11px] font-black"
                  style={{ color: ACCENT_LIME }}
                >
                  ※2
                </span>
                土地分譲・設計・施工を一気通貫
              </div>
              <div className="pl-6 relative">
                <span
                  aria-hidden
                  className="absolute left-0 top-0.5 text-[11px] font-black"
                  style={{ color: ACCENT_LIME }}
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
              className="text-[clamp(28px,5vw,72px)] leading-[1.3] tracking-[-0.01em] text-text-primary"
              style={{
                fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
                fontWeight: 900,
              }}
            >
              やまとは、<br />
              家そのものに、
              <br />
              <span style={{ color: ACCENT_LIME }}>お金を使う。</span>
            </p>
            <p
              className="mt-6 md:mt-10 text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-bold text-text-secondary flex items-center gap-3"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              <span aria-hidden style={{ color: ACCENT_LIME }}>◉</span>
              END OF MECHANISM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
