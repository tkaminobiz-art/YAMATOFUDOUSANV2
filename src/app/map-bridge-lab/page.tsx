import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// /map-bridge-lab v5
// MapBridge セクション全体の design direction mock-up 候補 3 案。
//
// v5 の役割: gpt_image_2 にセクション全体のデザインをディレクションしてもらい、
// それを忠実に code 実装する流れ。
// テキスト内容は実装側 canonical (区画数等の変動対応):
//   ・"Lots & Land." (header)
//   ・"27区画 公開中。奈良・京都南部、地域を知り尽くした家づくり。" (subhead)
//   ・"自社で土地を仕入れ、自社で分譲します。土地探しから建物まで、まとめてご相談ください。" (lead)
// マップ部分は実装で interactive Leaflet (CartoDB Positron + 深緑ピン) をそのまま使用。
//
// 納品前に削除する (BRAND-TRUTH §9 のラボ削除リスト準拠)。

const OPTIONS = [
  {
    id: "v5-01",
    name: "Centered Elegance — 上品な縦フロー",
    intent:
      "上から: italic 'Lots & Land.' 中央 → Mincho subhead → 小さい lead → 大判 grayscale 地図 (フル幅) → ActionLine 右下。最も classic で editorial。流れが clean。",
    src: "/map-bridge-lab/v5-01-centered-elegance.png",
    pros: [
      "最も上品で classic editorial — Apple comparison page のような格式",
      "縦フローが読みやすく、cluster (FIG.01 / FIG.02) との整合性も高い",
      "実装が最もストレートフォワード",
    ],
    cons: [
      "他 2 案より「冒険」が少なく、retreat な印象になる可能性",
      "中央揃えが「centered」すぎてやまと固有性が薄まる懸念",
    ],
    tone: "Centered editorial elegance",
  },
  {
    id: "v5-02",
    name: "Asymmetric Stacked — 縦積み italic + 大判地図",
    intent:
      "左 40% に「Lots / & Land.」縦積み italic、右 60% に大判 grayscale 地図。マガジン spread の art-directed 構成。最も差別化が強い。",
    src: "/map-bridge-lab/v5-02-asymmetric-stacked.png",
    pros: [
      "「Lots / & Land.」縦積み italic がマガジン芸術監督的 — 他社サイトでまず見ない",
      "asymmetric 構成で動きが出る ('スピード感')",
      "右の大判地図がドキュメンタリー風で土地感を物語る",
      "PC で圧倒的なインパクト",
    ],
    cons: [
      "縦積み英字 italic は読み順を意識した実装が必要",
      "モバイルでは縦並び化で印象が変わる",
    ],
    tone: "Asymmetric magazine spread",
  },
  {
    id: "v5-03",
    name: "Overlay Card — 地図全面 + テキスト card overlay",
    intent:
      "全面に大判地図、左下に warm paper card で 'Lots & Land.' + Mincho subhead + body + CTA を overlay。最もアートディレクション色が強い。",
    src: "/map-bridge-lab/v5-03-overlay-card.png",
    pros: [
      "地図がセクション最大のオブジェクトとして君臨 — 「ニュルニュル動く」を最大化",
      "card overlay の編集誌的レイヤリングが上品",
      "右上 meta strip と組み合わせて magazine art-direction",
    ],
    cons: [
      "card overlay 実装は absolute positioning + 地図との重なりで微調整必要",
      "モバイルで card が地図の半分を覆う可能性",
      "card 内の文字密度が高め",
    ],
    tone: "Map-dominant with overlay card",
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
              Map Bridge Lab v5 — Design Direction Mock-up
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              MapBridge セクション デザイン方向性 3 案 (テキスト不問・レイアウト/タイポ集中)
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
          2026-05-09 / Phase 3 v5: Design Direction (text agnostic)
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          gpt_image_2 にセクション全体のデザイン方向性を依頼
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          v5 の役割は「**デザインディレクション**」。区画数等の数字が変わる前提なので、
          mock-up 内のテキストは参考表示。実装は以下の canonical テキストを使う:
        </p>
        <ul className="mt-4 max-w-[820px] text-[13px] leading-relaxed text-white/85 space-y-2 pl-4 border-l-2 border-white/15">
          <li>
            <strong>Header:</strong> Lots &amp; Land.
          </li>
          <li>
            <strong>Subhead:</strong> 27区画 公開中。奈良・京都南部、地域を知り尽くした家づくり。
          </li>
          <li>
            <strong>Lead:</strong> 自社で土地を仕入れ、自社で分譲します。土地探しから建物まで、まとめてご相談ください。
          </li>
        </ul>
        <p className="mt-4 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          実装で参考にするのは「レイアウト・タイポグラフィ・余白・オーナメント・全体の格」。
          interactive Leaflet (CartoDB Positron + 深緑ピン) を中央に配置し、ヘッダー/フッター
          typography を mock-up に忠実に再現する。
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
            v5-01 / 02 / 03 のうち 1 つを採用 → 忠実に code 実装
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            採用後、MapBridge.tsx 全体を mock-up に忠実に再実装。canonical テキスト 3 つ
            (header / subhead / lead) を埋め込み、interactive Leaflet を mock-up の地図位置に
            配置する。
          </p>
          <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
            僕の所感:
            <br />
            ・<strong>v5-02 (Asymmetric Stacked)</strong> が最もインパクト強・差別化最強。「Lots / & Land.」 縦積み italic がマガジン芸術監督的。
            <br />
            ・<strong>v5-01 (Centered Elegance)</strong> は安全策・cluster との整合性最強。
            <br />
            ・v5-03 はアートディレクション色は強いが実装難度と読みやすさで僅かに劣る。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Map Bridge Lab v5 — 2026-05-09 / gpt_image_2 (high·2k) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
