import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// /voice-lab
// VoiceSection (お客様の声) リニューアル design direction 3 案。
// gpt_image_2 / high / 2k で 20 年キャリアの senior editorial designer framing で生成。
//
// ユーザー指示 (本丸):
//   - 動画で 3 つの好印象口コミだけを上質におしゃれに
//   - 暖かい温度感のあるセクション
//   - ミニマルでとてもおしゃれ
//   - モバイルは工夫が必要
//   - 口コミページ /voice への動線
//
// 採用後の実装方針:
//   - mock-up に忠実に layout / typography / spacing 再現
//   - 3 つの voice 動画は Seedance 2.0 で yamato 既存 LDK 写真から温度感ある cinemagraph 生成
//     (顔出しなし・hands/家具/暖色光が主役)
//   - 1 動画 = 4-6 sec 静か motion (subtle camera move + 暖色 grade)
//   - 各動画下に Mincho italic 引用 + 家族名/モデル名 caption
//   - mobile: 縦積み (各動画 portrait 4:5 が縦に 3 つ並ぶ)
//
// 納品前に削除する (BRAND-TRUTH §9 のラボ削除リスト準拠)。

const OPTIONS = [
  {
    id: "v-01",
    name: "Minimal Triptych — 3 portrait 動画を横並び",
    intent:
      "3 縦長 (4:5) の portrait 動画を等サイズで横一列。各動画下に italic mincho 引用 + 家族名 caption。最もミニマル・整然・暖かい光のリズム。",
    src: "/voice-lab/v-01-triptych.png",
    pros: [
      "最もミニマル・お洒落 (ユーザー指示直撃)",
      "3 動画が等サイズで rhythm が美しい",
      "横並びで scan しやすい — 一目で 3 voice 把握",
      "モバイル縦積みでも 3 portrait の連続として自然",
    ],
    cons: [
      "voice 間に hierarchy がない (全部 equal)",
      "1 voice の重みが分散しがち",
    ],
    tone: "Minimal triptych",
  },
  {
    id: "v-02",
    name: "Editorial Stack — 3 行のスプレッド (動画左 + 引用右)",
    intent:
      "3 行スタック。各行: 動画 (左 40% landscape) + Mincho italic 引用 (右 60%) + 家族名/モデル/エリア caption。各行間 hairline 罫線。新建築誌記事の連作風。",
    src: "/voice-lab/v-02-editorial-stack.png",
    pros: [
      "1 voice がしっかり読める (引用に分量を割ける)",
      "編集誌 spread 級の格 (新建築の連作記事風)",
      "暖かさを文字 + 動画の組合せで sustain できる",
      "モバイル: 各行を独立カードとして縦積み自然",
    ],
    cons: [
      "縦に高さが嵩む (3 行 × 行高さ) → 「コンパクト」優先度に対しやや不利",
      "横幅 40/60 分割が mobile で崩れる調整必要",
    ],
    tone: "Editorial stack rows",
  },
  {
    id: "v-03",
    name: "Asymmetric Featured — 1 hero voice + 2 supporting",
    intent:
      "左に大判 featured 動画 (3:2 landscape) + その下に substantial な引用、右に supporting 2 voice (動画 small + 引用 short) を縦積み。1 voice を主役にした感情アンカー型。",
    src: "/voice-lab/v-03-asymmetric-featured.png",
    pros: [
      "1 voice が圧倒的な存在感 → 感情アンカーとして強い",
      "WorksSection v6 と asymmetric 構造が呼応 (cluster 整合)",
      "featured 引用に分量を割けて『代表の物語』が刺さる",
    ],
    cons: [
      "supporting 2 が小さすぎる懸念 (3 voice 等価に見せたい場合は不利)",
      "実装で featured 動画 file size が支配的になる (重い)",
      "モバイル縦積みで featured と supporting の関係性が崩れる",
    ],
    tone: "Hero featured + supporting",
  },
];

export default function VoiceLabPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Voice Lab — Compact Video Gallery 3
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              お客様の声セクション 動画ギャラリー design 3 案
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
          2026-05-09 / Phase 5: VoiceSection 本丸リニューアル
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          gpt_image_2 + 20 年キャリアの senior editorial designer framing
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          ユーザー指示「動画で 3 つの好印象口コミだけを上質におしゃれに / 暖かい温度感 /
          ミニマル / モバイル工夫 / 口コミページ動線」を満たす design direction を 3 方向で。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          採用後の実装方針:
          <br />
          ・3 つの voice 動画は <strong>Seedance 2.0</strong> で yamato 既存 LDK 写真から
          subtle motion な cinemagraph 生成 (顔出しなし・hands/光/家具が主役)
          <br />
          ・各動画は 4-6 sec の calm camera move + amber/sepia warm grade
          <br />
          ・典拠 (canonical): voices.ts の好印象 voice 3 つ抜粋 +
          引用は実 voice 短文を mincho italic で
          <br />
          ・モバイル: 縦積み (portrait 動画なら自然・landscape は 16:9 維持で stack)
          <br />
          ・CTA: 「全ての声を見る →」 → /voice
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
            v-01 / 02 / 03 のうち 1 つを採用
          </h3>
          <p className="mt-4 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
            僕の所感:
            <br />
            ・<strong>v-01 Triptych</strong> がユーザー指示「ミニマル・おしゃれ」に最も忠実。3 動画 equal で美しいリズム
            <br />
            ・<strong>v-02 Editorial Stack</strong> は 1 voice の重みをしっかり乗せたい場合に強い (新建築誌連作風)
            <br />
            ・<strong>v-03 Asymmetric Featured</strong> は 1 voice を主役にした感情アンカー (cluster の WorksSection asymmetric と呼応)
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Voice Lab — 2026-05-09 / gpt_image_2 (high·2k) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
