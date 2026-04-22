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

  2026-04-21 design-critic 指摘 #4 反映:
  - inline fontFamily の繰り返し(13回)を Tailwind v4 の font-shippori / font-inter
    ユーティリティに置換

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
} as const;

export default function MechanismEnhanced() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#FAF8F3] text-text-primary scroll-in"
    >
      {/* ============= OPENING — 21:9 BLEED PHOTO(案A: "中扉"としてキャッチを重ねる) ============= */}
      <div className="relative w-full aspect-[21/9] overflow-hidden bg-text-primary">
        <Image
          src={PHOTOS.opening.src}
          alt={PHOTOS.opening.alt}
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: `${PHOTO_FILTER} brightness(0.78)` }}
        />
        {/* 下部を濃いめに落として白明朝の視認性を確保 */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60 pointer-events-none"
        />

        {/* Page 02 ノンブル — Hero の Page 01 と対で見開きを成立 */}
        <div className="hidden md:block absolute top-8 right-10 lg:right-14 z-10">
          <p
            className="font-inter text-white/75 text-[10px] lg:text-[11px] tracking-[0.32em] uppercase"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            Page 02 / 02
          </p>
        </div>

        {/* 中扉キャッチ — Hero からの"問いの転換" */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[1400px] mx-auto px-[var(--page-px)] pb-10 md:pb-16 lg:pb-20">
            <p
              className="font-shippori text-white leading-[1.25] tracking-[0.01em] max-w-[900px]"
              style={{
                fontWeight: 700,
                fontSize: "clamp(26px, 4vw, 60px)",
                textShadow: "0 3px 22px rgba(0,0,0,0.55)",
              }}
            >
              違うのは、家を届けるまでの
              <br />
              費用です。
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
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              やまとは<span style={{ color: ACCENT_LIME }}>安い</span>？
              <br />
              いいえ、違います。
            </h2>
          </div>

          {/* Right: LEAD with top border — 看板の「問い」に対する「答え」なので、
              1文目は太字大きめで強調。左の看板(8vw/120px)に対し、
              LEAD 1文目 2.2vw/32px、2文目 1.5vw/22px のリズムに調整。 */}
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                大手が使う素材を、<br />うちも使っています。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] tracking-[0.02em] max-w-[480px] text-text-primary/90">
                中間マージンも、
                <br />
                乗せていません。
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
              className="font-shippori text-text-primary leading-[1.18] tracking-[-0.01em] mb-12 md:mb-16"
              style={{
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
              {/* Evidence statement(太字) */}
              <p
                className="font-shippori font-bold mb-8 md:mb-10 max-w-[54ch] text-[clamp(15px,1.1vw,17px)] leading-[1.95]"
              >
                広告費も、展示場の維持費も、仲介マージンも、乗せる会社があります。合計で、見積もりの三〜四割
                <sup className="font-inter text-[0.7em] align-super font-bold inline-block mx-0.5 text-text-secondary">
                  ※1
                </sup>
                にのぼります。
              </p>

              <p className="font-shippori mb-6 max-w-[54ch]">
                やまとは、専用の展示場を持ちません
                <sup className="font-inter text-[0.7em] align-super font-bold inline-block mx-0.5 text-text-secondary">
                  ※2
                </sup>
                。分譲地に建てた家を、そのままモデルハウスにしています。いずれ、販売します。一軒が、二つの役割を果たします。
              </p>

              <p className="font-shippori mb-6 max-w-[54ch]">
                土地の分譲から設計、施工まで、自社で進めます。間に入る会社がないので、仲介マージンも乗りません。
              </p>

              {/* Pull quote with hang */}
              <aside className="relative my-10 md:my-14 py-7 md:py-10 border-y-[3px] border-text-primary lg:-ml-12 lg:pl-12">
                <span
                  aria-hidden
                  className="font-shippori absolute left-1 top-2 leading-none font-black select-none pointer-events-none text-text-primary/20"
                  style={{ fontSize: "clamp(72px, 9vw, 120px)" }}
                >
                  『
                </span>
                <blockquote
                  className="font-shippori pl-14 md:pl-20 text-text-primary leading-[1.5] tracking-[0.01em]"
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(20px, 3vw, 38px)",
                  }}
                >
                  後から削るのではなく、
                  <br />
                  最初から<span style={{ color: ACCENT_LIME }}>含めていません</span>。
                </blockquote>
              </aside>

              <p className="font-shippori mb-6 max-w-[54ch]">
                だから、同じ素材・同じ性能でも、価格は違って見えます
                <sup className="font-inter text-[0.7em] align-super font-bold inline-block mx-0.5 text-text-secondary">
                  ※3
                </sup>
                。家そのものの品質は、変えていません。届けるまでの費用だけを、絞りました。結果が、2,280万円〜です。
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
              <figcaption className="font-inter absolute left-0 bottom-0 max-w-[75%] px-4 py-3 bg-[#FAF8F3] border-t border-r border-text-primary text-[10px] tracking-[0.16em] uppercase text-text-secondary font-medium">
                現場の素材は、ひとつも削りません
              </figcaption>
            </figure>

            {/* Middle: data box */}
            <div
              className="bg-[#FAF8F3] p-6 md:p-7"
              style={{ border: "1.5px solid #1A1411" }}
            >
              <p className="font-inter text-[10px] tracking-[0.28em] uppercase font-black mb-4 pb-3 border-b border-[#CFC5B5] text-text-secondary">
                大手との差
              </p>
              <dl className="font-inter grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-sm tabular-nums">
                <dt className="text-[10px] tracking-[0.16em] uppercase pt-1.5 font-bold text-text-secondary">
                  参考・大手
                </dt>
                <dd
                  className="font-shippori font-bold text-text-primary"
                  style={{ fontSize: "16px" }}
                >
                  4,000<span className="text-[11px] ml-1 text-text-secondary">万円〜</span>
                </dd>

                <dt className="text-[10px] tracking-[0.16em] uppercase pt-1.5 font-bold text-text-secondary">
                  やまと
                </dt>
                <dd
                  className="font-shippori font-bold text-text-primary"
                  style={{ fontSize: "16px" }}
                >
                  2,280<span className="text-[11px] ml-1 text-text-secondary">万円〜</span>
                </dd>

                <dt className="text-[10px] tracking-[0.16em] uppercase pt-1.5 font-bold text-text-secondary">
                  差額
                </dt>
                <dd>
                  <span
                    className="font-inter font-black"
                    style={{
                      color: ACCENT_LIME,
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
            <div className="font-inter bg-[#FAF8F3] px-6 py-5 md:px-7 md:py-6 border-t-2 border-text-primary border-b border-dashed border-[#CFC5B5] grid gap-3.5 text-[12px] leading-[1.8] text-text-secondary">
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
                分譲地のモデルハウスを、販売まで回しています
              </div>
              <div className="pl-6 relative">
                <span
                  aria-hidden
                  className="absolute left-0 top-0.5 text-[11px] font-bold text-text-secondary"
                >
                  ※3
                </span>
                京モデル30坪・4LDKの場合です
              </div>
            </div>
          </aside>
        </div>
      </div>

    </section>
  );
}
