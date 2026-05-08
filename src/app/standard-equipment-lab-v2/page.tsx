import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// /standard-equipment-lab-v2
// StandardEquipment セクションのリデザイン候補 4 案。
// gpt_image_2 / high / 2k で生成。ZeroDeclaration cinematic (FIG.02) と連続する FIG.01 の建築誌語彙。
// 納品前に削除する (BRAND-TRUTH.md §9 のラボ削除リスト準拠)。

const OPTIONS = [
  {
    id: "v2-01",
    name: "Cross-Section + 17 Callouts",
    intent:
      "1 枚の建築断面図に 17 callouts 全部。家の中身が透視で見えて「ここに何が入っているか」が一目で掴める。最強の Visualize。",
    src: "/standard-equipment-lab-v2/v2-01-cross-section.png",
    pros: [
      "17 項目すべてを 1 枚で「家の部位 ↔ メーカー」紐付け表示",
      "ZeroDeclaration FIG.02 と同じ立面+注釈の語彙で連続感最強",
      "情報密度が極めて高く、Editorial Authority が立つ",
    ],
    cons: [
      "情報密度高 → モバイルで小さく潰れる懸念 (text recap 必須)",
      "1 枚絵のため将来 17 項目の差し替えで再生成が必要",
    ],
    tone: "断面図 + 全注釈",
  },
  {
    id: "v2-02",
    name: "Spec Schedule (4 Categories)",
    intent:
      "建築仕様書スプレッド調。4 カテゴリ (キッチン水回り/構造/断熱/外構) ごとの mini illustration + maker list。実装で差し替えやすい。",
    src: "/standard-equipment-lab-v2/v2-02-spec-schedule.png",
    pros: [
      "カテゴリ別 4 ブロックが scan しやすい",
      "[STANDARD] スタンプで「すべて含む」が瞬時に伝わる",
      "コード実装側で 4 カラム化しやすく、メーカー差し替えも容易",
    ],
    cons: [
      "1 枚絵としての impact は v2-01 / v2-04 に劣る",
      "「仕様書を読まされる」フォーマットで cold な印象",
    ],
    tone: "仕様書スプレッド",
  },
  {
    id: "v2-03",
    name: "Editorial Spread (新建築 vibe)",
    intent:
      "左ページ 60% に大きなキッチン ink illustration、右ページ 40% に 17 行リスト。住宅特集の雑誌記事レイアウト。",
    src: "/standard-equipment-lab-v2/v2-03-magazine-spread.png",
    pros: [
      "新建築/住宅特集の権威感が立つ。やまとの「建築会社」格を引き上げる",
      "左の illustration がブランド写真として独立して使える",
      "1 ページ目=キッチン, 2 ページ目=他の部位 と pagination で連作にできる",
    ],
    cons: [
      "右ページの 17 行リストが table 並列に近い (visualize 弱め)",
      "セクション 1 つで完結させるには情報量バランスが偏る (左に重み)",
    ],
    tone: "編集誌見開き",
  },
  {
    id: "v2-04",
    name: "Room Walkthrough (4 panels)",
    intent:
      "4 ink-drawn 部屋スケッチ (キッチン / 水回り / 外装 / 構造) を非対称 2×2 に配置。各スケッチに ink callout で 3-5 項目ずつ注釈。",
    src: "/standard-equipment-lab-v2/v2-04-room-walkthrough.png",
    pros: [
      "「部屋ごとに、何が標準か」が体感的に伝わる (cognitive load 最低)",
      "非対称 2×2 で magazine editorial の rhythm が出る",
      "4 panel ごとに将来差し替え可能 (柔軟性高)",
    ],
    cons: [
      "4 sketch を 1 枚絵で生成 → ピクセルレベル位置調整が効かない",
      "コード実装する場合は 4 panel を別画像に分けて再生成する必要あり",
    ],
    tone: "4 部屋スケッチ + 注釈",
  },
];

export default function StandardEquipmentLabV2Page() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Standard Equipment Lab v2 — Design Gacha 4
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              「この価格で、ここまで標準。」 セクション 4 案比較
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-xs text-white/70">
            {OPTIONS.map((o) => (
              <a key={o.id} href={`#${o.id}`} className="hover:text-white">
                {o.id}
              </a>
            ))}
            <span className="text-white/20">/</span>
            <Link href="/zero-declaration-cinematic" className="hover:text-white">
              ZeroDecl Cinematic
            </Link>
            <span className="text-white/20">/</span>
            <Link href="/" className="hover:text-white">
              本番TOP →
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          2026-05-08 / Phase 2: StandardEquipment Redesign
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          ZeroDeclaration FIG.02 と連続する FIG.01 を 4 方向で
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          現行 StandardEquipment は左ヘッダー + 右 4 列 table。dot legend だけ・グレード感ゼロが弱み。
          リデザインは「建築誌の連続スプレッド」コンセプト下で、ZeroDeclaration cinematic (FIG. 02 立面+注釈)
          と同じ語彙で FIG. 01 を構築する 4 方向。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          世界観: 暖紙 #F7F5F0 / 墨黒 #1A1815 / 深緑 #143426 単一アクセント / 手描き ink / 新建築語彙。
          AI smell ゼロ (vector flat / SaaS / lime / 3D / drop shadow すべて不可) を毎回プロンプトで宣言。
          画像内の数字・メーカー名は仮表示で、実装では reference_yamato_standard_spec_canonical.md の
          17 項目を反映します。
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
            01 / 02 / 03 / 04 のうち 1 つを採用
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            採用方向が決まったら StandardEquipment.tsx を該当方向で再実装。
            17 項目 (reference_yamato_standard_spec_canonical) は canonical なのでそのまま反映。
            ハイブリッドや追加ガチャもアリ。
          </p>
          <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
            僕の所感: 01 Cross-Section が「家全体での標準仕様」のメタファーとして最強。
            ZeroDeclaration FIG.02 (立面+8注釈) との連続感も最も高い。ただし 02 Spec Schedule は実装で差し替えやすく、
            17 項目データを更新しても画像再生成不要。03 は雑誌権威で別格、04 は柔軟性で別格。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Standard Equipment Lab v2 — 2026-05-08 / gpt_image_2 (high·2k) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
