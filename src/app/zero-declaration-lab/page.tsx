import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// 納品前に削除する検証用ページ。
// /zero-declaration-lab : ZeroDeclaration セクション
// 「後から増えやすい費用を、契約前に見える化します。」のリデザイン候補 6 案。

const OPTIONS = [
  {
    id: "v2-01",
    name: "Annotated Real Photo",
    intent:
      "実写の三山木モデル外観に、建築家が手描きで注釈を入れたような ink callouts を 8 個。番号 01-08 で各費用を引き出し線でマーキング。実写 + アナログ感で AI 臭ゼロ。",
    src: "/zero-declaration-lab/v2-01-photo-annotated.png",
    pros: [
      "実写ベースで AI らしさが構造的にゼロ",
      "やまとの実モデル (三山木) を主役に置ける",
      "建築家のマークアップ風で「誠実 / 透明」イメージが強い",
    ],
    cons: [
      "実装で写真 + SVG annotation overlay が必要 (8本の引き出し線手作業)",
      "TOP の HeroMagazine も写真主役なので連続性に注意",
    ],
    tone: "実写 + 手描き注釈",
  },
  {
    id: "v2-02",
    name: "Two Houses Compared",
    intent:
      "「一般的な家づくり」(× 赤いタグが家の周りに散乱) vs 「やまとの家づくり」(○ 緑のタグが整然と並ぶ) の 2 軒並列。視覚で混乱→秩序の対比が一瞬で伝わる。",
    src: "/zero-declaration-lab/v2-02-two-houses.png",
    pros: [
      "見た瞬間に "混沌 vs 整理" が一目で伝わる最強の visual",
      "8 項目すべて両軒に表示されるので情報量も担保",
      "新建築誌風の手描きトーンで AI らしさゼロ",
    ],
    cons: [
      "「他社 vs 当社」フレーミングが強い (memory: 安い→他社が無駄 frame と要整合)",
      "実装で SVG / illustration をどう作るか課題 (生成画像をそのまま使うか、SVG化するか)",
    ],
    tone: "2軒比較・対比最大",
  },
  {
    id: "v2-03",
    name: "Process Timeline (5 phases)",
    intent:
      "土地探し→設計→契約→施工→引渡しの 5 フェーズに 8 項目の費用を時系列で配置。各フェーズに小さな手描きアイコン (測量杭、製図コンパス、印鑑、足場、鍵)。",
    src: "/zero-declaration-lab/v2-03-timeline.png",
    pros: [
      "「いつ発生する費用か」が時系列で理解できる (理屈派に最適)",
      "5 つの手描き ink イラストが画面全体に温度感を与える",
      "前セクション (StickyMechanismPin) との連動性が高い",
    ],
    cons: [
      "情報密度が高く、scan しづらい可能性",
      "5 フェーズのアイコンが SVG 化必要 (実装ハードル中)",
    ],
    tone: "プロセス・時系列",
  },
  {
    id: "v2-04",
    name: "Architectural Elevation + 8 Callouts",
    intent:
      "建築事務所の立面詳細図のように、家のイラスト中心 + 8 本の引き出し線で fee callouts を配置。新建築・建築知識の本物の建築図面アートに近い。",
    src: "/zero-declaration-lab/v2-04-elevation.png",
    pros: [
      "前セクション (StandardEquipment Schedule) との視覚連続性が最も高い",
      "建築誌の上品さ、住宅会社らしさが立つ",
      "8 項目すべてが家の各部位と紐づいて見える",
    ],
    cons: [
      "実は費用は家の「部位」とは紐づかない (営業フェーズの問題)",
      "イラスト + annotation を SVG で作る実装コストが高い",
    ],
    tone: "建築立面図 + 注釈",
  },
];

export default function ZeroDeclarationLabPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Zero Declaration Lab — Design Gacha 6
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              「後から増えやすい費用を、契約前に見える化します。」 セクション 6 案比較
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-xs text-white/70">
            {OPTIONS.map((o) => (
              <a key={o.id} href={`#${o.id}`} className="hover:text-white">
                {o.id}
              </a>
            ))}
            <span className="text-white/20">/</span>
            <Link href="/" className="hover:text-white">本番TOP →</Link>
          </nav>
        </div>
      </header>

      {/* イントロ */}
      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          2026-05-08 / Phase: ZeroDeclaration Redesign
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          GPT Image 2 (nano_banana_2) で 6 方向ガチャ
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          現行 ZeroDeclaration (8 項目縦並び二列領収書) に対する代案を 6 方向で生成。
          BEFORE/DURING の 2 フェーズ × 4 項目 = 計 8 項目の構造はすべて維持。
          実ロゴを media reference として渡しているため、ロゴ捏造はゼロ。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          画像内テキスト (¥50万〜100万 等) は仮表記。実装時は ZeroDeclaration.tsx
          の FEES_BEFORE / FEES_DURING に既に入っている canonical 値を反映します。
        </p>
      </section>

      {/* 6 案 */}
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

      {/* 次の一手 */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            次の一手
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            01 / 02 / 03 / 04 / 05 / 06 のうち 1 つを採用
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            採用後 ZeroDeclaration.tsx を該当方向で再実装。FEES_BEFORE / FEES_DURING
            のデータは既に canonical (仲介手数料 ¥50万〜100万 / つなぎ融資 ¥30万〜80万 /
            地盤改良 最大150万 当社負担 / 等) なのでそのまま反映。ハイブリッドや追加ガチャもアリ。
          </p>
          <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
            僕の所感: 01 Receipt が「契約前透明性」のメタファーとして最強で住宅 LP 定型からも外れる。
            ただし 03 Ledger も伝統的信頼感があり古谷社長の「正直な職人」声と相性が良い。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Zero Declaration Lab — 2026-05-08 / nano_banana_2 (Higgsfield) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">本番TOP</Link>
      </footer>
    </main>
  );
}
