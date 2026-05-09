import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  SocialProof — 2026-05-09 v2 (rulebook §1.4: Before → Trigger → After 構造)
  ---------------------------------------------------------------
  v1 (2026-05-09): 各 column 1 行の "after" 引用 (「理想通り」「快適」)
                   → rulebook §1.4「testimonial は緊張を持った時のみ使う」
                   違反。平和な称賛は primary proof にしない。

  v2: voices.json 実音声から「Before (状況・不安) → Trigger (やまとが解決した
      決め手) → After (結果)」の 3 段で再構成。声本体は編集せず verbatim
      引用 (kobayashi §7「99.9% そのまま」哲学準拠)。

  選定 3 ペア (photo は維持、引用は voices.json 実音声から):
   Col 1 (works-02 / N 様):「予算」型 — 標準/オプション境目への不安
   Col 2 (works-01 / S 様):「総額の誠実さ」型 — 自由設計+追加費用ゼロ
   Col 3 (works-05 / O 様):「土地探し 2 年」型 — なかなか見つからない

  クラスタ pattern 完全継承:
   - warm paper #F7F5F0 / 墨黒 / 深緑 #143426
   - FIG.NN eyebrow + Shippori Mincho 見出し
   - ActionLine CTA (右下)
*/

type Voice = {
  src: string;
  alt: string;
  family: string;
  area: string;
  spec: string;
  /** Before: お客様の状況・不安 (voices.json から状況描写を verbatim 引用) */
  before: string;
  /** Trigger: やまとを選んだ決め手 (voices.json Q1「決め手」の verbatim) */
  trigger: string;
  /** After: 結果・気に入った点 (voices.json Q3 等の verbatim) */
  after: string;
};

const VOICES: readonly Voice[] = [
  {
    src: "/images/works/works-02.webp",
    alt: "京田辺市の住まい — 黒外観に赤い玄関ドア",
    family: "Ｎ様 ご家族",
    area: "京田辺市",
    spec: "4LDK / 30坪",
    before:
      "数年以内に家を建てれたら…と何気なく検索していたところ、偶然発見したのがきっかけです。",
    trigger:
      "モデルルームの設備や仕様について、どれが標準仕様 OR オプションなのか、はっきり教えてくれたのが好印象でした。標準仕様のグレードが高く、自分たちの予算内で家が建てれそうだったので、お願いすることにしました。",
    after:
      "オプションの価格は一覧表になっており、予算と相談しながら決めることが出来た。追加を無理に勧められることはなく、こちらの事情を考えながら提案してくださり感謝しています。",
  },
  {
    src: "/images/works/works-01.webp",
    alt: "奈良市の住まい — 鋭い片流れ屋根と青空",
    family: "Ｓ様 ご家族",
    area: "奈良市",
    spec: "花モデル · 33坪 / 4LDK",
    before:
      "土地探しから始まり、複数の住宅会社を比較していました。",
    trigger:
      "自由設計であること、追加費用なしでハイグレードな標準設備が設定されていること、実際の費用を提示してくれること、担当者の誠実さと信頼感が決め手でした。",
    after:
      "理想通りの家となり、とても気に入っています。引き渡し後も気づいた場所があれば是正工事等、しっかりと対応してくれるので安心です。",
  },
  {
    src: "/images/works/works-05.webp",
    alt: "斑鳩町の住まい — 木目スリットアクセントの立体的外観",
    family: "Ｏ様 ご家族",
    area: "斑鳩町",
    spec: "5LDK / 36坪",
    before:
      "2 年近く土地を探していたのですが、なかなか思うような土地が見つかりませんでした。",
    trigger:
      "やっと見つけた納得のいく土地が、やまと不動産の分譲地でした。モデルルームも見学し、標準設備でも素敵なお家がたちそうだなぁと思い、やまと不動産に決めました。",
    after:
      "限られた土地ではありましたが、私達のあらゆる要望を聞いて形にしていただけました。非常に信頼のおける会社であると思います。",
  },
];

export default function SocialProof() {
  return (
    <section
      id="works"
      className="relative bg-[#F7F5F0] text-[#1A1815] py-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* Header */}
        <header className="max-w-[860px]">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
            <span>FIG. 04</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>Works &amp; Voices</span>
          </div>
          <h2
            className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
          >
            建てた家と、<br className="md:hidden" />
            暮らしている人の声。
          </h2>
          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            「土地が見つからない」「予算内で本当に建てられるのか」
            ── 3 組のご家族が、最初の不安をどのように解消したか。
            実際の声を、編集せずに掲載しています。
          </p>
        </header>

        {/* 3 column pairs — Before → Trigger → After 構造 */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-14 items-start">
          {VOICES.map((v) => (
            <article key={v.src} className="flex flex-col">
              <figure className="flex flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDEAE3]">
                  <Image
                    src={v.src}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-2.5 text-[11px] leading-[1.6] text-[#1A1815]/60 font-mono tracking-[0.04em]">
                  <span className="text-[#1A1815]/85">{v.area}</span>
                  <span aria-hidden className="text-[#1A1815]/30">/</span>
                  <span>{v.spec}</span>
                </figcaption>
              </figure>

              {/* 3 段構造: Before / Trigger / After */}
              <div className="mt-6 space-y-4 border-l border-[var(--color-rule)] pl-4">
                {/* Before: 状況・不安 */}
                <div>
                  <span className="block text-[10px] tracking-[0.22em] uppercase text-[#1A1815]/45 font-mono mb-1.5">
                    Before
                  </span>
                  <p
                    className="font-[var(--font-shippori)] text-[#1A1815]/80 leading-[1.85] tracking-[0.02em]"
                    style={{ fontSize: "clamp(12.5px, 0.92vw, 14px)", fontWeight: 400 }}
                  >
                    {v.before}
                  </p>
                </div>

                {/* Trigger: やまとを選んだ決め手 */}
                <div>
                  <span className="block text-[10px] tracking-[0.22em] uppercase text-[#143426]/75 font-mono mb-1.5">
                    Trigger — 決め手
                  </span>
                  <p
                    className="font-[var(--font-shippori)] italic text-[#1A1815] leading-[1.85] tracking-[0.02em]"
                    style={{ fontSize: "clamp(13px, 0.95vw, 14.5px)", fontWeight: 400 }}
                  >
                    <span className="text-[#1A1815]/40 mr-0.5">「</span>
                    {v.trigger}
                    <span className="text-[#1A1815]/40 ml-0.5">」</span>
                  </p>
                </div>

                {/* After: 結果 */}
                <div>
                  <span className="block text-[10px] tracking-[0.22em] uppercase text-[#1A1815]/45 font-mono mb-1.5">
                    After
                  </span>
                  <p
                    className="font-[var(--font-shippori)] text-[#1A1815]/80 leading-[1.85] tracking-[0.02em]"
                    style={{ fontSize: "clamp(12.5px, 0.92vw, 14px)", fontWeight: 400 }}
                  >
                    {v.after}
                  </p>
                </div>

                <footer className="pt-2 text-[11px] text-[#1A1815]/55 font-mono tracking-[0.04em]">
                  — {v.family}
                </footer>
              </div>
            </article>
          ))}
        </div>

        {/* CTA: 2 ActionLine */}
        <div className="mt-14 md:mt-16 flex flex-col md:flex-row md:justify-end items-end gap-6 md:gap-10 border-t border-[var(--color-rule)] pt-10">
          <Link
            href="/works"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815]/70 border-b border-[#1A1815]/20 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            施工事例をもっと見る
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
          <Link
            href="/voice"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            お客様の声をもっと見る
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
