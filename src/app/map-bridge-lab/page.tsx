import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// /map-bridge-lab
// MapBridge セクションのヘッダー再設計候補 4 案。
// gpt_image_2 / high / 2k で生成。warm paper クラスタ統一 + 編集誌語彙。
// 旧 "Lots & Land." 英字 italic + mono eyebrow を脱却。
// 納品前に削除する (BRAND-TRUTH §9 のラボ削除リスト準拠)。

const OPTIONS = [
  {
    id: "v3-01",
    name: "Vertical Mincho Lead — 縦組み主役",
    intent:
      "左 40% に大胆な縦組み Mincho 「土地と、家を。」、右 60% に手描き地図 + 深緑ピン + 町名ラベル。新建築誌スプレッドそのもの。",
    src: "/map-bridge-lab/v3-01-vertical-mincho.png",
    pros: [
      "縦組み Mincho が最も日本建築誌的・他社サイトと差別化最強",
      "地図と文字が物理的に左右分離 → 認知負荷低い",
      "「土地と、家を。」が短く詩的でやまとの正直さに合う",
    ],
    cons: [
      "縦組み実装は writing-mode: vertical-rl + 文字数調整が必要 (実装ハードル中)",
      "モバイル縦並びでは縦組み効果が落ちる懸念",
    ],
    tone: "縦組み主役・新建築調",
  },
  {
    id: "v3-02",
    name: "Architect's Site Plan — 建築家の site plan",
    intent:
      "中央に大きな手描き地図 (山稜・川・町名) + 上に「その土地を、記憶にする。」中央配置。下段に 27/90 caption + body copy。建築家の現地調査図風。",
    src: "/map-bridge-lab/v3-02-architect-siteplan.png",
    pros: [
      "地図が最大化され、奈良・京都南部の土地感が前に出る",
      "中央タイトル配置が安定感 (映画ポスター調)",
      "山と川の hatching が建築家のドラフティング感",
    ],
    cons: [
      "「その土地を、記憶にする。」が抽象的で意味を読み取りにくい",
      "中央 alignment は editorial としてはやや一般的",
    ],
    tone: "建築家の site plan",
  },
  {
    id: "v3-03",
    name: "Big Italic 27 — 数字主役",
    intent:
      "左に巨大な italic 27 (Bodoni/Didone) + 右に「奈良・京都南部 / 土地探しからの家づくり。」。ARM の「1,475」が美しく浮く感覚を継承。",
    src: "/map-bridge-lab/v3-03-big-number.png",
    pros: [
      "ARM オマージュが最も忠実 (italic 数字 + 編集誌タイポ)",
      "「27 区画」を visual anchor 化 → 数字が物語を引っ張る",
      "右側 body copy が編集誌の本文として読める",
    ],
    cons: [
      "本物の Bodoni italic ≠ Fraunces italic — フォント実装で微妙な差が出る可能性",
      "地図 ornament が小さく、「マップセクション」としての視覚弱め",
    ],
    tone: "ARM オマージュ・数字主役",
  },
  {
    id: "v3-04",
    name: "Philosophical Title + Faded Map — 哲学的タイトル",
    intent:
      "巨大 Mincho 「土地は、つくる前の、家。」 + 背景に薄い手描き地図 + 深緑ドット。新建築の特集記事 opening 風。",
    src: "/map-bridge-lab/v3-04-philosophical.png",
    pros: [
      "コピーの concept が最強 (やまとの哲学を一文で物語る)",
      "faded 背景地図 → 文字が浮いて編集誌の格上感",
      "やまと不動産バイライン付きで brand 訴求も含む",
    ],
    cons: [
      "「土地は、つくる前の、家。」は抽象度が高く、読み手によっては deep すぎる",
      "faded 背景の実装でブラウザ間差が出る可能性 (CSS opacity/blend mix)",
    ],
    tone: "哲学的タイトル・特集 opening",
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
              Map Bridge Lab — Design Gacha 4
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              「Lots &amp; Land.」 脱却 / MapBridge ヘッダー再設計 4 案
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
          2026-05-09 / Phase 3: MapBridge Header Redesign
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          「Lots &amp; Land.」 がダサい問題への 4 方向回答
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          現状: 小さい mono eyebrow 「Map · 奈良 · 京都南部」 + 大きな英字 italic
          「Lots &amp; Land.」 — どこの設計事務所サイトでも見るテンプレ的な編集誌っぽさで、
          やまと固有の世界観に乗らない。 4 方向で再設計を試行。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          世界観: 暖紙 #F7F5F0 / 墨黒 #1A1815 / 深緑 #143426 単一アクセント /
          手描き ink / 新建築語彙。AI smell ゼロ。
          画像内の数字・テキストは仮表示で、実装では reference_yamato_lots_data
          / canonical コピーを反映します。
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
                    alt={`${o.name} comp`}
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
            v3-01 / 02 / 03 / 04 のうち 1 つを採用
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            採用後 MapBridge.tsx のヘッダー部分を該当方向で再実装。地図本体 (CartoDB
            Positron + 深緑ピン) はそのまま保持。
          </p>
          <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
            僕の所感: <strong>v3-01 (縦組み Mincho)</strong> が最も日本建築誌的で、ARM
            的な編集誌感を超えてやまと固有の世界観を立てる。実装ハードルは中だが、 PC
            では圧倒的なインパクト。
            <br />
            次点は <strong>v3-04 (哲学的タイトル)</strong> — コピーが強い。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Map Bridge Lab — 2026-05-09 / gpt_image_2 (high·2k) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
