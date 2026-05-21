import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  StandardIncluded — 2026-05-09 v2 (conversion-sales-rulebook 準拠の順序逆転)
  ---------------------------------------------------------------
  v1: Header → 断面図 → 主な標準仕様 8 項目 → 後から発生しない 4 項目 → CTA
      (商品 → 不安解消 の brochure 順序 / sales として逆効果)

  v2: rulebook §1.5「最大の不安は accordion に埋めない」「FAQ は sales
      battleground」と consultant 指摘「後から増えやすい費用の見せ方が弱い」を反映。

      順序を逆転:
       1. Header: 「『建物価格』だけで決めると、後から増えます」(敵 = 構造)
       2. Visual: 断面図 (Standard 全体の anchor visual)
       3. Sub A (恐怖 → 救済): 業界で後から増えやすい 4 項目
          → やまとが最初に解決する 4 項目
       4. Sub B (品質証明): そのうえで、標準仕様 8 項目
       5. CTA: 詳しい仕様を見る / 資金計画を相談する

      狙い: 客の本音 (「2,000 万円台と聞いてもどうせ後で増えるんでしょ」)
      を先に肯定し、その救済として標準仕様の充実を見せる。
      旧順序は「うちはちゃんとしてます」(brochure) で終わっていた。

  クラスタ pattern 完全継承:
   - warm paper #F7F5F0 / 墨黒 / 深緑 #143426
   - FIG.NN eyebrow + Shippori Mincho 見出し
   - ActionLine CTA

  関連: docs/project-context/conversion-sales-rulebook.md
        feedback_frame_change_cheap_to_waste.md (他社が無駄を乗せている)
        feedback_no_over_assertion.md (「〜になりやすい」相対化)
*/

const STANDARD_ITEMS = [
  { category: "キッチン", maker: "クリナップ システムキッチン" },
  { category: "水回り", maker: "TOTO (浴室・洗面・トイレ)" },
  { category: "窓・玄関", maker: "YKK AP APW330 / Venato K4" },
  { category: "外壁", maker: "旭化成 ヘーベルパワーボード" },
  { category: "断熱", maker: "ウレタン吹付 85mm + 屋根 95mm" },
  { category: "制震ダンパー", maker: "MIRAIE (住友ゴム)" },
  { category: "給湯", maker: "エコキュート 460L オール電化" },
  { category: "保証", maker: "地盤 20年 / しろあり 10年" },
] as const;

const NO_HIDDEN_COST = [
  { item: "仲介手数料", market: "¥50万〜100万", resolution: "不要 (当社分譲地)" },
  { item: "つなぎ融資", market: "¥30万〜80万", resolution: "発生しない" },
  { item: "地盤改良費", market: "最大 ¥150万", resolution: "当社負担" },
  { item: "外構一式", market: "〜¥40万", resolution: "標準" },
] as const;

export default function StandardIncluded() {
  return (
    <section
      id="standard"
      className="relative bg-[#F7F5F0] text-[#1A1815] py-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* Header */}
        <header className="max-w-[860px]">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
            <span>FIG. 01</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>Standard</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)] hidden md:inline-block" />
            <span className="hidden md:inline">What&apos;s Included</span>
          </div>
          <h2
            className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
          >
            「建物価格」だけで決めると、<br className="md:hidden" />
            後から増えやすい。
          </h2>
          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            家づくりの総額は、「建物本体」に含まれない費用が後から重なりがちです。
            やまとは、増えやすい 4 項目を契約前に解決し、
            その上で国内メーカーの標準仕様を組み込んでいます。
          </p>
        </header>

        {/* Visual: 断面図 */}
        <figure className="mt-12 md:mt-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--color-rule)] bg-[#F7F5F0]">
            <Image
              src="/standard-equipment-lab-v2/v2-01-cross-section.png"
              alt="やまと不動産の標準仕様 17 項目を建築断面図に注釈表示 — キッチン (クリナップ)、水回り (TOTO)、サッシ (YKK AP)、外壁 (旭化成ヘーベル)、制震 (MIRAIE)、構造、断熱、保証まで"
              fill
              sizes="(max-width: 1280px) 100vw, 1240px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-[11px] leading-[1.7] text-[#1A1815]/45 font-mono tracking-[0.04em]">
            FIG. 01 · Cross-section with 17 callouts · 各仕様の納まり位置と採用メーカーを記載 / 詳細仕様は詳細ページへ
          </figcaption>
        </figure>

        {/* Sub A (恐怖 → 救済): 業界で後から増えやすい 4 項目 — 上に昇格 */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono mb-5">
            <span>FIG. 02</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>Hidden Costs</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)] hidden md:inline-block" />
            <span className="hidden md:inline">後から増えやすい 4 項目</span>
          </div>
          <h3
            className="font-[var(--font-shippori)] text-[#1A1815] leading-[1.4]"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 500 }}
          >
            「建物 2,000 万円台」から、<br className="md:hidden" />
            後から重なりやすい 4 項目。
          </h3>
          <p className="mt-5 max-w-[760px] text-[clamp(13px,0.95vw,14.5px)] leading-[1.95] text-[#1A1815]/75">
            他社で「建物 2,000 万円台」と提示されても、土地・地盤・つなぎ融資・外構などで
            合計 200〜400 万円が後から重なることが少なくありません。
            やまとは、この 4 項目を最初に解決します。
          </p>
          <dl className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 max-w-[1000px]">
            {NO_HIDDEN_COST.map((row) => (
              <div
                key={row.item}
                className="grid grid-cols-[auto_1fr_auto] gap-x-4 items-baseline py-3.5 border-b border-[var(--color-rule-faint)]"
              >
                <dt className="text-[12.5px] md:text-[13px] text-[#1A1815]/85 font-medium tracking-[0.02em]">
                  {row.item}
                </dt>
                <dd className="text-right">
                  <span className="block font-mono text-[10.5px] text-[#1A1815]/55 line-through decoration-[#B91C1C] decoration-[1.5px] tabular-nums">
                    {row.market}
                  </span>
                </dd>
                <dd className="text-[12.5px] md:text-[13px] font-medium text-[#143426] leading-[1.55] whitespace-nowrap">
                  {row.resolution}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[11.5px] leading-[1.85] text-[#1A1815]/55">
            ※ 業界平均は当社調べ。地域・業者・条件により金額は異なります。
          </p>
        </div>

        {/* Sub B (品質証明): そのうえで、国内メーカーの標準仕様 8 項目 — 下に降格 */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono mb-5">
            <span>Standard Spec</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>主な標準仕様 8 項目</span>
          </div>
          <h3
            className="font-[var(--font-shippori)] text-[#1A1815] leading-[1.4]"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 500 }}
          >
            そのうえで、<br className="md:hidden" />
            国内メーカーを標準でご用意しています。
          </h3>
          <ul className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 max-w-[1000px]">
            {STANDARD_ITEMS.map((item) => (
              <li
                key={item.category}
                className="grid grid-cols-[auto_1fr] gap-x-5 items-baseline py-3.5 border-b border-[var(--color-rule-faint)]"
              >
                <span className="text-[12.5px] md:text-[13px] text-[#1A1815]/85 font-medium tracking-[0.02em] min-w-[5em]">
                  {item.category}
                </span>
                <span className="text-[12.5px] md:text-[13.5px] text-[#1A1815] leading-[1.55]">
                  {item.maker}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[11.5px] leading-[1.85] text-[#1A1815]/55">
            ※ 花モデル基準。風・京モデルは一部仕様が異なります。詳しくは詳細仕様ページへ。
          </p>
        </div>

        {/* CTA: 2 つの ActionLine */}
        <div className="mt-14 md:mt-16 flex flex-col md:flex-row md:justify-end items-end gap-6 md:gap-10 border-t border-[var(--color-rule)] pt-10">
          <Link
            href="/standard"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815]/70 border-b border-[#1A1815]/20 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            詳しい仕様を見る
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
          <Link
            href="/money"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            資金計画を相談する
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
