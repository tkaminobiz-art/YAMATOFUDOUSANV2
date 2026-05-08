import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// 納品前に削除する検証用ページ。
// /zero-declaration-lab : ZeroDeclaration セクション
// 「後から増えやすい費用を、契約前に見える化します。」のリデザイン候補 6 案。

const OPTIONS = [
  {
    id: "01",
    name: "Printed Receipt",
    intent:
      "紙の領収書 / 紙レシート風。strikethrough red + green 注釈、最後に hanko 印。AI生成感ゼロで一番 honest に見える。",
    src: "/zero-declaration-lab/01-receipt.png",
    pros: [
      "「契約前見える化」のメタファーとして領収書はド直球",
      "cream paper + 紙感で住宅 LP テンプレ感を完全回避",
      "strikethrough red と green 注釈の対比で 8 項目が一瞬で読める",
    ],
    cons: [
      "情報密度は中程度 (印刷物感を保つため大幅に増やせない)",
      "実装で印鑑 SVG とレシート行を再現する手間がやや多い",
    ],
    tone: "領収書・印刷物・温度高",
  },
  {
    id: "02",
    name: "Two-Column Comparison",
    intent:
      "「一般の相場 / GENERAL MARKET」 vs 「やまと不動産 / YAMATO」の 2 列。strikethrough red + 緑¥0 / 不要 / 事前説明 で対比を最大化。",
    src: "/zero-declaration-lab/02-comparison.png",
    pros: [
      "対比が最も明快、誰が見ても 2 秒で理解できる",
      "実装が容易 (table + strike-through CSS のみ)",
      "数字の strikethrough が金額メリットを最大限にビジュアル化",
    ],
    cons: [
      "「他社 vs 当社」感が強く出すぎると広告 LP 寄り (memory: feedback_frame_change_cheap_to_waste と要整合)",
      "前セクション (StandardEquipment Schedule) と純白系で似て見える可能性",
    ],
    tone: "編集誌コンパリ・直球",
  },
  {
    id: "03",
    name: "Traditional Ledger",
    intent:
      "古紙テクスチャ + 「土地購入時 / BEFORE BUILD」「建築工事中 / DURING BUILD」の 2 セクション帳簿。右下に「透明保証」hanko 印。フォーマルで温度感が最も高い。",
    src: "/zero-declaration-lab/03-ledger.png",
    pros: [
      "8項目を BEFORE/DURING の 2 セクション分割で構造的に表現",
      "古紙 + 印鑑で誠実さ・伝統的な信頼感が立つ",
      "hanko の赤が単独 spot color として効く",
    ],
    cons: [
      "古紙テクスチャが web で安っぽくなりやすい (実装に注意)",
      "古典的すぎて若年層には退屈に映る可能性",
    ],
    tone: "帳簿・伝統・温度高",
  },
  {
    id: "04",
    name: "Bento Editorial",
    intent:
      "8 項目を asymmetric Bento で配置。仲介手数料 (¥50万〜100万 → 不要) を最大カードに、残り 7 項目を中小カードで散らす。",
    src: "/zero-declaration-lab/04-bento.png",
    pros: [
      "8 項目を視覚的に強弱つけて見せられる",
      "仲介手数料の最大インパクトを大カードで主役化",
      "DESIGN_GUARDRAILS の「asymmetric Bento」推奨パターンに沿う",
    ],
    cons: [
      "Bento は前セクションでも潜在使用、続くと UI トレンド頼みに見える",
      "実装で配置を asymmetric に保つガード必要 (均等化リスク)",
    ],
    tone: "Bento 編集・モダン",
  },
  {
    id: "05",
    name: "Bold Editorial Poster",
    intent:
      "巨大 ¥500,000 / ¥1,500,000 のストライク背景 + 小さい Mincho 見出しオーバーレイ。右側に 8 項目のサイドバーリスト。最もポスター的インパクト。",
    src: "/zero-declaration-lab/05-poster.png",
    pros: [
      "視線誘導力が最も強い。スクロール中で目に止まる",
      "「払わなくていい金額の総量」を巨大ビジュアルで体感させる",
      "編集誌的 + 広告ポスター的で住宅 LP 定型から最も外れる",
    ],
    cons: [
      "派手寄りで「安売り訴求」と紙一重 (memory: feedback_frame_change_cheap_to_waste 抵触リスク)",
      "見出しが小さく見える、可読性に注意",
      "前後セクション (Schedule + 次セクション) と温度差が大きい",
    ],
    tone: "ポスター・派手",
  },
  {
    id: "06",
    name: "Mechanism Diagram",
    intent:
      "「当社分譲地 → ワンストップ → 事前明確化」の 3 メカニズム ダイアグラム + 下に 8 項目の薄いフッター。なぜ費用が抑えられるかの『理屈』を視覚化。",
    src: "/zero-declaration-lab/06-diagram.png",
    pros: [
      "金額のインパクトより理屈・誠実さで説得 (memory: feedback_mechanism_fact_core 準拠)",
      "前セクション StickyMechanismPin との連動性が高い",
      "「3つの仕組み」をビジュアルで明快に",
    ],
    cons: [
      "8 項目の量感が弱い (フッター strip にしか出ない)",
      "Diagram 系は SaaS 的に見えやすく、慎重実装が必要",
    ],
    tone: "ダイアグラム・論理",
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
