import Image from "next/image";

/*
  StandardCrossSection — 2026-05-09 v1
  ---------------------------------------------------------------
  StandardComparisonBlueprint (花/風/京 3 写真) と StandardEquipment
  (FIG.01 FACILITY SCHEDULE 1:50) の間に挟む建築断面図ヒーロー。
  ZeroDeclaration cinematic (FIG.02) と連続する FIG.01 の建築誌語彙。

  画像: /standard-equipment-lab-v2/v2-01-cross-section.png
        (gpt_image_2 / high / 2k / 16:9 / 17 callouts 全表示)

  関連 memory:
    - reference_yamato_standard_spec_canonical (花モデル基準 17 項目)
    - feedback_comp_generation_worldview_first_visualize_not_tabulate
*/

export default function StandardCrossSection() {
  return (
    <section
      id="standard-cross-section"
      className="relative bg-[#F7F5F0] text-[#1A1815] py-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        <header className="max-w-[860px]">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
            <span>FIG. 01</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>Cross-Section</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)] hidden md:inline-block" />
            <span className="hidden md:inline">Scale 1 : 80</span>
          </div>
          <h2
            className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
          >
            家のすべての部位に、<br className="md:hidden" />
            メーカー指定の標準仕様を。
          </h2>
          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            キッチンはクリナップ、浴室・洗面・トイレは TOTO、窓と玄関は YKK AP、
            外壁は旭化成ヘーベル、制震ダンパーは MIRAIE。家の各部位に
            「どのメーカーの何が標準か」を、断面図で先に開示します。
          </p>
        </header>

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
            FIG. 01 · Cross-section with 17 callouts · 各仕様の納まり位置と採用メーカーを記載 / 詳細仕様は次頁スケジュール参照
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
