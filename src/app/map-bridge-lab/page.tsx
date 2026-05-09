import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// /map-bridge-lab
// MapBridge セクション全体の design mock-up 候補 3 案 (v4)。
// gpt_image_2 / high / 2k で生成。warm paper クラスタ世界観を完全継承し、
// マップ部分は CartoDB Positron 風の grayscale rectangle として描画
// (前回 v3 で発生した「手描き地図 vs 実装の interactive 地図」の二重描画問題を回避)。
//
// 採用後: ヘッダー/フッターのタイポグラフィ + レイアウトを忠実に実装し、
// マップは既存の interactive Leaflet (CartoDB Positron + 深緑ピン) をそのまま使用。
//
// 納品前に削除する (BRAND-TRUTH §9 のラボ削除リスト準拠)。

const OPTIONS = [
  {
    id: "v4-01",
    name: "Centered Editorial Flow — 縦の編集誌フロー",
    intent:
      "上から: meta strip → Mincho h2 1行 → lead 1行 → wide map (21:9) → divider → inline 統計 + ActionLine CTA。ZeroDecl の編集誌パターンと完全整合。最も読みやすく rhythm がある。",
    src: "/map-bridge-lab/v4-01-centered-flow.png",
    pros: [
      "ZeroDecl / CrossSection / Equipment と全く同じ縦フローでクラスタ完全整合",
      "Mincho h2 + lead が決定的、map が visual centerpiece",
      "下段 inline stats + ActionLine が編集誌の column footer として完成度高い",
      "実装が最も素直 (既存パターンの応用)",
    ],
    cons: [
      "他案より「冒険」が少なく、retreat な印象",
      "ARM オマージュとしては control が薄い",
    ],
    tone: "縦フロー・編集誌正統",
  },
  {
    id: "v4-02",
    name: "Asymmetric 2-Column — 縦組み + 大判地図",
    intent:
      "左 38% に縦組み Mincho 「土地を、自社で。」 + 統計 + CTA、右 62% にフル高さの大判 grayscale 地図。建築誌見開きスプレッド調で最もインパクト。",
    src: "/map-bridge-lab/v4-02-asymmetric-2col.png",
    pros: [
      "左の縦組み Mincho が日本建築誌的で他社サイトと差別化最強",
      "右の大判地図がドキュメンタリー風で土地の広がりを物語る",
      "asymmetric 構成で動きが出る ('スピード感')",
      "PC で圧倒的なインパクト",
    ],
    cons: [
      "縦組み実装は writing-mode + 文字数調整が必要 (実装ハードル中)",
      "モバイル縦並びでは縦組み効果が落ちる",
      "縦組み copy 「土地を、自社で。」 が短く意味は強いが説明不足の可能性",
    ],
    tone: "縦組み + 大判地図",
  },
  {
    id: "v4-03",
    name: "Map-First Hero — シネマティック",
    intent:
      "上薄ストリップに meta + 統計、中央 65% にフル幅 grayscale 大判地図、下にh2 + 統計 + CTA。地図がドミナント、文字は前後に分散される。",
    src: "/map-bridge-lab/v4-03-map-first-hero.png",
    pros: [
      "地図がセクション最大のオブジェクトとして君臨",
      "上下に分散した typographic frame でテロップが落ち着いている",
      "「ニュルニュル動く」マップを最大限主役化できる",
    ],
    cons: [
      "上下分散構成で読み順がやや散漫になりがち",
      "h2 が下段に来るので「最初に何を伝えるか」が曖昧化",
      "実装で上下バランスを取るのが意外に難しい",
    ],
    tone: "シネマティック・地図ドミナント",
  },
];

export default function MapBridgeLabPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Map Bridge Lab v4 — Full Section Mock-up
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              MapBridge セクション全体デザイン候補 3 案 (世界観継承)
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-xs text-white/70">
            {OPTIONS.map((o) => (
              <a key={o.id} href={`#${o.id}`} className="hover:text-white">
                {o.id}
              </a>
            ))}
            <span className="text-white/20">/</span>
            <Link href="/" className="hover:text-white">
              本番TOP →
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          2026-05-09 / Phase 3 v4: Full Section Design (Worldview-Inherited)
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          GPT Image 2 にセクション全体のデザイン見本を依頼
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          v3 のヘッダー単独再設計では「手描き地図 vs 実装の interactive 地図」の二重描画
          問題が発生。v4 では セクション全体 (header + map + footer) の design mock-up
          として生成し、マップ部分は CartoDB Positron 風の grayscale rectangle で描画して
          実装と整合させた。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          世界観継承: 暖紙 #F7F5F0 / 墨黒 #1A1815 / 深緑 #143426 単一アクセント /
          Zen Old Mincho (見出し) + Fraunces italic (数字) / FIG.NN 編集誌語彙 /
          ActionLine CTA。
          採用後の実装では、interactive Leaflet (CartoDB Positron + 深緑ピン) を
          そのまま使用し、ヘッダー/フッター typography を mock-up に忠実に再現する。
        </p>
      </section>

      {OPTIONS.map((o) => (
        <section
          key={o.id}
          id={o.id}
          className="border-t border-white/10 px-6 py-12"
        >
          <div className="mx-auto max-w-[1300px]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                  Option {o.id} &nbsp;·&nbsp; {o.tone}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{o.name}</h3>
                <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-white/75">
                  {o.intent}
                </p>
                <div className="mt-6 overflow-hidden rounded border border-white/10 bg-white/[0.02]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={o.src}
                    alt={`${o.name} mock-up`}
                    className="block h-auto w-full"
                  />
                </div>
              </div>

              <aside className="space-y-5 text-[12.5px] leading-relaxed">
                <div className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[#A9D159]/80 text-[10.5px] uppercase tracking-[0.2em] mb-2">
                    Strengths
                  </p>
                  <ul className="space-y-1.5 text-white/85">
                    {o.pros.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-white/35">＋</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-red-300/80 text-[10.5px] uppercase tracking-[0.2em] mb-2">
                    Risks
                  </p>
                  <ul className="space-y-1.5 text-white/85">
                    {o.cons.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-white/35">−</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            次の一手
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            v4-01 / 02 / 03 のうち 1 つを採用
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            採用後 MapBridge.tsx 全体を mock-up に忠実に実装。マップは既存の interactive
            Leaflet (CartoDB Positron + 深緑ピン) をそのまま使用。
          </p>
          <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
            僕の所感: <strong>v4-01 (縦の編集誌フロー)</strong> がクラスタ
            (FIG.01 / FIG.02 / ZeroDecl) との整合性最強で、世界観継承の観点では最有力。
            <br />
            <strong>v4-02 (縦組み + 大判地図)</strong> はインパクトと差別化で別格。
            <br />
            v4-03 (シネマティック) は地図主役を最大化したい場合の選択肢。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Map Bridge Lab v4 — 2026-05-09 / gpt_image_2 (high·2k) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
