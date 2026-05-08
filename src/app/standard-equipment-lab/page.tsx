import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// 納品前に削除する検証用ページ。
// /standard-equipment-lab : 標準装備セクション (「この価格で、ここまで標準。」)
// のリデザイン候補 5 案を Higgsfield (nano_banana_2 / GPT Image 2 同等) で
// 生成して並べる。1 案選定後に StandardEquipment.tsx を再実装する。

const OPTIONS = [
  {
    id: "01",
    name: "Editorial Magazine Spread",
    intent:
      "Casa BRUTUS / Brutus 系の 2 ページ印刷誌スプレッド。左ページ大見出し + 右ページ大写真 + 下部に 3 章立てチャプターリスト。",
    src: "/standard-equipment-lab/01-editorial.png",
    pros: [
      "編集誌の品。住宅会社らしさを保ちつつ知性が出る",
      "実LDK写真が主役 (片面)・コピーが主役 (片面) でバランスが良い",
      "下部の 3 章 (Kitchen&Bath / Performance / Structure&Support) で 80+項目の量を表現できる",
    ],
    cons: [
      "「住んでからの快適さ」のような感情に響くコピーは置きづらい",
      "Bento 系 (#02) より情報密度は低い",
    ],
    tone: "編集誌・上品",
  },
  {
    id: "02",
    name: "Bento Editorial Catalog",
    intent:
      "1 大写真 + 中小写真複数 + ミニスペック表 を asymmetric Bento で組む 2026 編集モダン。Casa BRUTUS の shop spread 系。",
    src: "/standard-equipment-lab/02-bento.png",
    pros: [
      "情報密度が高く、80+項目の量感が一目で伝わる",
      "中小カードに材料・図面・スペック等を散らせる (アクセント多回散布)",
      "視覚リッチでスクロール疲労を和らげる",
    ],
    cons: [
      "AI smell check 該当リスク (Bento 量産化に堕ちる可能性)",
      "実装時に均等カードに見えないよう asymmetry を厳守する必要",
    ],
    tone: "モダン編集・カタログ",
  },
  {
    id: "03",
    name: "Architectural Specification Schedule",
    intent:
      "建築事務所のスペック・スケジュール書類調。No. / 区分 / 仕様 / STANDARD の 4 列構造、写真ゼロ、純白ベース。Kengo Kuma / SANAA 系。",
    src: "/standard-equipment-lab/03-schedule.png",
    pros: [
      "「80+ items」の網羅性を最も明確に示せる",
      "Apple specs より architectural で住宅会社向き",
      "情報の信頼性・誠実さが立つ (営業 LP 感ゼロ)",
    ],
    cons: [
      "冷たい・無機質。住宅会社の温度感は出ない",
      "前後セクション (StandardComparisonBlueprint も spec 系) と性格が被る",
      "コンバージョンへの感情駆動は弱い",
    ],
    tone: "建築事務所・無機質",
  },
  {
    id: "04",
    name: "Documentary Photo Catalog",
    intent:
      "MUJI 素材本 / Kinfolk 系の 6 枚写真グリッド。クローズアップ・ディテール・素材で 80+項目の質感を伝える。",
    src: "/standard-equipment-lab/04-catalog.png",
    pros: [
      "素材感・実物感が圧倒的に強い (AI生成感ゼロ)",
      "「住んでからの快適さ」を具体的なディテールで伝えられる",
      "印刷カタログの質感で高級感が出る",
    ],
    cons: [
      "実写素材を 5-6 枚揃える必要 (現状 LDK 1 枚のみ)",
      "テキスト密度は低く、80+項目の網羅性は #03 より弱い",
      "撮影投資が前提 (現時点では完全実装しづらい)",
    ],
    tone: "ドキュメンタリー・カタログ",
  },
  {
    id: "05",
    name: "Apple Tech Specs Page",
    intent:
      "apple.com/iphone/specs 系。左カテゴリーナビ + 右スペックリストの 2 カラム、純白、高密度タイポ。",
    src: "/standard-equipment-lab/05-apple-specs.png",
    pros: [
      "情報整理が最も精密、情報量を全て収められる",
      "Apple ブランドの信頼感を借りられる",
      "前セクション (StandardComparisonBlueprint = Apple 比較ページ調) と完全コヒーレント",
    ],
    cons: [
      "前セクションと視覚的に近すぎる (差別化が弱い・連続するとくどい)",
      "建築・住宅らしい温度感は出ない",
      "感情訴求は #01 #02 #04 より弱い",
    ],
    tone: "Apple specs・精密",
  },
];

export default function StandardEquipmentLabPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Standard Equipment Lab — Design Gacha
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              「この価格で、ここまで標準。」 セクション 5 案比較
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
          2026-05-08 / Phase: Standard Equipment Redesign
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          現行 StandardEquipment「ダサい」判断を受けて 5 方向を生成
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          Higgsfield (nano_banana_2 / GPT Image 2 同等) で 5 方向のデザイン
          リファレンスを生成。実ロゴ + 実 LDK 写真を media reference として
          渡しているため、ロゴ捏造・写真捏造の事故はゼロ。1 案を採用して
          StandardEquipment.tsx を再実装します。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          画像内の文言・数字はすべて placeholder。実装時は BRAND-TRUTH §2 / §6 と
          実データ (LIXIL 設備型番等) で差し替えます。
        </p>
      </section>

      {/* 5 案 */}
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
            01 / 02 / 03 / 04 / 05 のうち、どれを採用するか
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            採用案を指定してもらえれば StandardEquipment.tsx を該当方向で再実装します。
            ハイブリッド (例: 01 のチャプター構成 + 04 のディテール写真) も可能。
            「もう 5 案ガチャしたい」「特定の方向だけ追加 3 案」もアリ。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Standard Equipment Lab — 2026-05-08 / nano_banana_2 (Higgsfield) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
