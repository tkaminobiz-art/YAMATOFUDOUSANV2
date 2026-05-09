import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// /voice-lab v2
// VoiceSection 静止画 design direction 6 案 (動画案 廃止)。
// gpt_image_2 / high / 2k で「25 年キャリアの TOP editorial designer」 framing で生成。
//
// ユーザー指示:
//   - 動画案 廃止 (3 動画 + 連結も不採用)
//   - 25 年キャリアのトップデザイナーと扮した君ならどう作るか
//   - 6 パターンほどのガチャ
//
// 採用後の実装方針:
//   - mock-up に忠実に layout / typography / spacing 再現
//   - 引用は voices.json から canonical 抜粋
//   - 写真は yamato 既存 LDK 写真から流用 (顔出しなし)
//
// 納品前に削除する (BRAND-TRUTH §9 のラボ削除リスト準拠)。

const OPTIONS = [
  {
    id: "v2-01",
    name: "Pull-Quote Hero — タイポ主役の編集誌",
    intent:
      "中央に巨大な Mincho italic 引用、右に小さな detail 写真。下段に 2 supporting 引用 + 細部 photo。typography が主役、写真は支援。",
    src: "/voice-lab/v2-01-pull-quote.png",
    pros: [
      "1 引用の重みが圧倒的 — 「最も刺さる声」を fully feature",
      "ミニマル、編集誌の格・タイポ主導",
      "実装が素直 (h1 + 3 quote block + photo)",
    ],
    cons: [
      "1 voice 偏重で 3 voice の equal 表現は弱い",
      "メインの 1 引用に何を選ぶかの canonical 判断が重要",
    ],
    tone: "Typography-led pull quote",
  },
  {
    id: "v2-02",
    name: "Polaroid Memory Wall — スクラップブック調",
    intent:
      "3 つの polaroid 風 photo を傾き付き (-3°/+2°/-1°) で scrapbook composition。各 polaroid の白帯に手書き調引用。最も「暖かい」「個人的」。",
    src: "/voice-lab/v2-02-polaroid.png",
    pros: [
      "「暖かい温度感」最強 — まるで家族のアルバムを見ているよう",
      "polaroid のカジュアルさが他社サイトと完全差別化",
      "傾きで scrapbook 感 = 編集 + 個人 + intimate",
    ],
    cons: [
      "polaroid の傾き実装で transform / shadow 微調整必要",
      "real photo を polaroid 加工する CSS 工夫要",
      "クラスタの編集誌 restraint からやや外れる (温度感とトレードオフ)",
    ],
    tone: "Scrapbook polaroid",
  },
  {
    id: "v2-03",
    name: "Letter Composition — 個人手紙風",
    intent:
      "3 つの「手紙」 card。日付スタンプ + Mincho italic 本文 + 署名 + 印章ornament。写真ゼロ、typography のみで個人性を演出。",
    src: "/voice-lab/v2-03-letter.png",
    pros: [
      "最もミニマル (写真なし)",
      "手紙という intimacy の枠組みで「個人の声」が立つ",
      "印章 + 日付 + 署名で informal warmth + 編集誌格",
    ],
    cons: [
      "写真ゼロでセクションが「テキストだけ」に見えるリスク",
      "クラスタ全体に photo が多い中で quiet すぎる懸念",
      "印章の実装で SVG / 画像が必要",
    ],
    tone: "Personal letter typography",
  },
  {
    id: "v2-04",
    name: "Annotated Portrait — 1 photo + margin notes",
    intent:
      "中央に 1 LDK 大判 photo (4:5)、周囲の余白に 3 引用が手描き leader 線で結ばれて配置。建築家の annotated drawing スタイル。",
    src: "/voice-lab/v2-04-annotated.png",
    pros: [
      "クラスタ FIG.01 cross-section / FIG.02 ZeroDecl と同じ「注釈」語彙で世界観整合性最強",
      "1 photo + 3 quote の hierarchy が明確",
      "ink leader 線 ornament で warm + architectural",
    ],
    cons: [
      "leader 線の position 実装は精密 (絶対配置 + 微調整)",
      "余白に文字を散らすのでモバイル対応で再構成必要",
      "1 photo に依存 → photo 選定が決定的",
    ],
    tone: "Annotated architectural portrait",
  },
  {
    id: "v2-05",
    name: "Newspaper Column — 3 narrow column 連作",
    intent:
      "3 narrow column を vertical hairline で分け、各 column に caption + 4-5 行 italic mincho 引用 + 1 small photo + drop cap。新聞の特集記事風。",
    src: "/voice-lab/v2-05-newspaper.png",
    pros: [
      "3 voice equal で各 voice にしっかり読ませられる (1 voice あたり 4-5 行)",
      "newspaper feature の格 = quality publication 感",
      "モバイル: 各 column を独立カードとして縦積み自然",
    ],
    cons: [
      "情報密度高 → minimum でない",
      "drop cap の Japanese 「 治療実装が要工夫",
      "3 column が hairline で硬く見えるリスク",
    ],
    tone: "Newspaper feature column",
  },
  {
    id: "v2-06",
    name: "Vertical Mincho Calligraphy — 縦組み 明朝の和の格",
    intent:
      "3 つの縦組み (writing-mode vertical-rl) Mincho italic 引用が水平に並ぶ。下に小さい印章 + 横書き署名。和の calligraphy 格。",
    src: "/voice-lab/v2-06-vertical-mincho.png",
    pros: [
      "最も「日本的」で他社との差別化最強 — 縦組み 明朝が美しい",
      "和の calligraphy 格 + 印章 ornament で温かさと格調",
      "ミニマル + poetic restraint",
    ],
    cons: [
      "縦組み実装は writing-mode + 文字数調整 (縦書き対応 font 必要)",
      "モバイル縦並びで縦組み効果が落ちる懸念",
      "西欧読みの読者には scan しづらい可能性",
    ],
    tone: "Japanese vertical calligraphy",
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
              Voice Lab v2 — Static (No Video) Gallery 6
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              お客様の声 セクション 静止画 design 6 案 (動画案 廃止)
            </h1>
          </div>
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/70">
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
          2026-05-09 / Phase 5 v2: VoiceSection 本丸 (静止画リブート)
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          gpt_image_2 + 25 年キャリア TOP editorial designer framing
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          動画案 (cinemagraph + 連結) を廃止し、トップデザイナー扮した僕が静止画 6 方向で
          ガチャ。「暖かい温度感 + ミニマル + おしゃれ + 3 voice + 口コミページ動線」を
          異なる構造で表現。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          世界観継承: 暖紙 #F7F5F0 / 墨黒 #1A1815 / 深緑 #143426 単一アクセント /
          Zen Old Mincho 見出し / FIG.06 eyebrow / ActionLine CTA。
          採用後の実装では voices.json canonical + yamato 既存 LDK 写真を使用。
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
            v2-01 〜 v2-06 のうち 1 つを採用
          </h3>
          <p className="mt-4 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
            僕の所感:
            <br />
            ・<strong>v2-02 Polaroid Memory Wall</strong> が「暖かい温度感」最強。スクラップブックの個人的・温かさで他社差別化最強
            <br />
            ・<strong>v2-04 Annotated Portrait</strong> はクラスタ FIG 注釈語彙と最整合 (FIG.01 / FIG.02 と同型)
            <br />
            ・<strong>v2-06 Vertical Mincho</strong> は最も「日本的」で和の calligraphy 格
            <br />
            ・v2-01 はミニマル、v2-03 は手紙の intimacy、v2-05 は新聞の格
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Voice Lab v2 — 2026-05-09 / gpt_image_2 (high·2k) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
