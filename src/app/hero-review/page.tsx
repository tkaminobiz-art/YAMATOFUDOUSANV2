import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// 納品前に削除する検証用ページ。
// /hero-review : Hero リニューアル A/B/C/E 案の比較ビュー
// 2026-05-08 GPT Image 2 (Nano Banana Pro) で生成した4案 + 現状FV を縦に並べる。
// E 案は「価格訴求型 → 住宅ブランド好感型」への方向転換版（2026-05-08 専務違和感反映）。
// 採用後はこのディレクトリごと削除する。
// Reference-only バナーは <LabDisclaimer /> を最上部に必須表示(BRAND-TRUTH.md §9)。

const PROPOSALS = [
  {
    id: "current",
    label: "現状",
    eyebrow: "Before",
    title: "現状のヒーロー（参考スクショ）",
    summary:
      "暗い外観写真＋大きな価格＋下部CTA。広告LP寄りで、AI生成感・安さ訴求が前面に出ている状態。",
    src: "/hero-review/current.png",
    palette: ["#000000", "#FFFFFF", "#A9D159"],
    cta: "なし",
    notes: [
      "外観が暗く、夜のビル街の電線も入って実在感が弱い",
      "価格 2,280 が画面の主役になり、安売り感が出ている",
      "CTAが下部左寄せで階層が伝わりにくい",
    ],
  },
  {
    id: "A",
    label: "A 案",
    eyebrow: "Direction A",
    title: "住宅カタログ型",
    summary:
      "余白広め・写真主役・編集誌調。最も「住宅ブランドらしい」上品さ。明朝コピーが落ち着いている。",
    src: "/hero-review/hero_A_v2.png",
    legacySrc: "/hero-review/hero_A_catalog.png",
    palette: ["#F7F4EC", "#2F4A2C", "#9A7A3F", "#1D1D18"],
    cta: "詳細を見る ／ 資料請求（※実装時はLINE/見学に差し替え）",
    notes: [
      "見出しは画像内では placeholder（サンプル...）。実装は確定コピーに差し替え",
      "実績4数字: 600棟以上 / 90区画以上 / 50組以上 / 14年（BRAND-TRUTH§2と一致）",
      "ヘッダーナビが少なめ（実装時は現行 Header.tsx の構成に合わせる）",
    ],
  },
  {
    id: "B",
    label: "B 案 ★ 推奨",
    eyebrow: "Direction B",
    title: "価格透明性型",
    summary:
      "「透明な価格で、理想の住まいを叶える。」ピル形式の価格カード（京モデル）が信頼の核として機能。CTA階層もLINE主導線方針と整合。",
    src: "/hero-review/hero_B_v2.png",
    legacySrc: "/hero-review/hero_B_price.png",
    palette: ["#FBF8EE", "#2F4A2C", "#9A7A3F", "#06C755"],
    cta: "無料で総額を相談する ／ モデルハウスを見学する",
    notes: [
      "価格カード: 京モデル / 2,280万円〜 / 税込・建物本体＋付帯工事込み / 注釈一行",
      "実績4数字にラベル付き（棟数／区画／組／年）— BRAND-TRUTH§2と完全一致",
      "推奨理由: 価格訴求が「ディスカウントタグ」ではなく「信頼の核」として置かれている",
    ],
  },
  {
    id: "C",
    label: "C 案",
    eyebrow: "Direction C",
    title: "地域密着・相談型",
    summary:
      "「土地・建物・資金計画、奈良・京都南部のご家族の総額をご相談ください。」相談カード＋地域マップ＋実績数字。人間味と地域密着が強い案。",
    src: "/hero-review/hero_C_v2.png",
    legacySrc: "/hero-review/hero_C_consultation.png",
    palette: ["#F7F4EC", "#2F4A2C", "#9A7A3F", "#C7B98F"],
    cta: "無料で総額を相談する ／ モデルハウスを見学する",
    notes: [
      "consultation note: 土地のご相談 / 資金のご相談 / お見学",
      "地域マップ（奈良＋京都南部）を細い金線で表現",
      "実績4数字のラベル(年間建築実績/地元スタッフ数/創業年数/支店・拠点数)は誤り。実装時はBRAND-TRUTH§2のラベルに修正",
    ],
  },
  {
    id: "E-a",
    label: "E-a 案 ★ 新方向",
    eyebrow: "Direction E (a)",
    title: "住宅ブランド・エディトリアル型",
    summary:
      "A/B/C は「価格がわかる住宅LP」寄りで販促感が残る、という方向への修正案。価格を主役から降ろし、写真と短いコピーで暮らしの空気感を先に伝える。価格は安心材料として静かに添える。実写LDKを右半分に大きく、左は明朝の見出し2行＋細いインライン価格＋スリムな2CTA。",
    src: "/hero-review/hero_E_v1_a.png",
    palette: ["#F7F4EC", "#FBF8EE", "#2F4A2C", "#9A7A3F"],
    cta: "無料で総額を相談する ／ モデルハウスを見学する",
    notes: [
      "見出し（画像内）は placeholder。実装は BRAND-TRUTH §6 を起点に新コピー候補へ差し替え",
      "価格はカードではなく細いインライン表示。京モデル2,280万円〜のみ、ディスカウント感を排除",
      "実績4数字はHero下部の細い帯に小さく。営業資料感を消す（実装時は600棟以上/90区画以上/50組以上/14年）",
      "ヘッダーは日本語ナビ＋右上にLINE相談＋見学。CTAヒエラルキーがLINE主導線方針と整合",
    ],
  },
  {
    id: "E-b",
    label: "E-b 案",
    eyebrow: "Direction E (b)",
    title: "住宅ブランド・エディトリアル型（コピー違い）",
    summary:
      "E-a と同方向だが、見出しのトーンを「心を紡ぐ住まいづくり」寄りに振った別バリエーション。E-a より柔らかく、地域密着の温度感がやや前に出る。",
    src: "/hero-review/hero_E_v1_b.png",
    palette: ["#F7F4EC", "#FBF8EE", "#2F4A2C", "#9A7A3F"],
    cta: "無料でお問い合わせ ／ モデルハウスを見学する",
    notes: [
      "下部4数字も placeholder（創業○○年 / 地域密着 / 累計○○棟 / 自社大工）。実装はBRAND-TRUTH §2 の正規4数字に統一",
      "コピー候補を専務に提示する用の比較バリエーション。E-a と1案だけ採用する想定",
      "プライマリCTA文言は E-a の「無料で総額を相談する」に統一推奨（B案からの一貫性）",
    ],
  },
];

export default function HeroReviewPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
              Hero Review
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              Hero リニューアル A / B / C / E 案比較
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-xs text-white/70">
            <a href="#current" className="hover:text-white">現状</a>
            <span className="text-white/20">/</span>
            <a href="#A" className="hover:text-white">A</a>
            <a href="#B" className="hover:text-white">B</a>
            <a href="#C" className="hover:text-white">C</a>
            <span className="text-white/20">/</span>
            <a href="#E-a" className="text-[#A9D159] hover:text-white">E-a ★</a>
            <a href="#E-b" className="hover:text-white">E-b</a>
            <span className="text-white/20">/</span>
            <Link href="/" className="hover:text-white">本番TOP →</Link>
          </nav>
        </div>
      </header>

      {/* イントロ */}
      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="max-w-[760px] text-sm leading-relaxed text-white/70">
          2026-05-08 のリニューアル方針に沿って、Hero（ファーストビュー）を複数方向で
          試作しています。GPT Image 2 で生成したデザインリファレンスで、最終UIは
          コードで実装するため、画像内の文字や写真はあくまで方向性の確認用です。
        </p>
        <p className="mt-3 max-w-[760px] text-[12px] leading-relaxed text-white/50">
          v2 更新: 各案を{" "}
          <span className="text-white/75">正規ロゴ（/images/logo.png）</span>＋{" "}
          <span className="text-white/75">実写LDK（exterior/interior の元素材）</span>
          を Higgsfield に media reference として渡して再生成しています。ロゴが偽
          YAMATO に変わったり、写真がAI捏造されたりする失敗を構造的に防いでいます
          （BRAND-TRUTH §7.1）。
        </p>
        <p className="mt-3 max-w-[760px] rounded border border-[#A9D159]/30 bg-[#A9D159]/[0.06] p-4 text-[12px] leading-relaxed text-white/80">
          <span className="text-[#A9D159]/90">★ 方向転換（2026-05-08）</span>{" "}
          A/B/C は「価格がわかる住宅LP」としては合っているが、専務が違和感を示した通り
          「おしゃれで好印象なハウスメーカーのHero」としては販促LP感が強い。E 案では
          価格を主役から降ろし、暮らしの空気感とブランド好感を先に伝え、価格は安心材料
          として静かに添える方向へ修正。E-a / E-b はその試作。
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/60 md:grid-cols-5">
          <div className="rounded border border-white/10 bg-white/[0.03] p-3">
            <p className="text-white/40">A 住宅カタログ</p>
            <p className="mt-1 text-white/75">余白・写真・上品さ</p>
          </div>
          <div className="rounded border border-white/10 bg-white/[0.03] p-3">
            <p className="text-white/40">B 価格透明性</p>
            <p className="mt-1 text-white/75">価格カード主軸</p>
          </div>
          <div className="rounded border border-white/10 bg-white/[0.03] p-3">
            <p className="text-white/40">C 地域密着相談</p>
            <p className="mt-1 text-white/75">相談カード＋地域マップ</p>
          </div>
          <div className="rounded border border-[#A9D159]/40 bg-[#A9D159]/[0.08] p-3">
            <p className="text-[#A9D159]/85">E-a ★ 新方向</p>
            <p className="mt-1 text-white/85">編集誌調・暮らし主役</p>
          </div>
          <div className="rounded border border-[#A9D159]/20 bg-[#A9D159]/[0.04] p-3">
            <p className="text-[#A9D159]/70">E-b コピー違い</p>
            <p className="mt-1 text-white/75">心を紡ぐトーン</p>
          </div>
        </div>
      </section>

      {/* 各案 */}
      {PROPOSALS.map((p) => (
        <section
          id={p.id}
          key={p.id}
          className="border-t border-white/10 px-6 py-16"
        >
          <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                {p.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {p.label} — {p.title}
              </h2>
              <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-white/70">
                {p.summary}
              </p>
              <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                {/* 画像は plain <img> でそのまま等倍表示。Next/Image にすると
                    ラボ用途で過剰最適化が走るためここでは使わない。 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={`${p.label} ${p.title} — Hero design comp`}
                  className="block h-auto w-full"
                />
              </div>
            </div>

            <aside className="space-y-5 text-xs text-white/70">
              <div>
                <p className="text-white/40">CTA 構成</p>
                <p className="mt-1 text-white/85">{p.cta}</p>
              </div>
              <div>
                <p className="text-white/40">主要カラー（参考抽出）</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.palette.map((c) => (
                    <div
                      key={c}
                      className="flex items-center gap-2 rounded border border-white/10 bg-white/[0.03] px-2 py-1"
                    >
                      <span
                        className="inline-block h-3 w-3 rounded-sm border border-white/20"
                        style={{ backgroundColor: c }}
                      />
                      <span className="font-mono text-[10px] text-white/70">
                        {c}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/40">所感メモ</p>
                <ul className="mt-2 space-y-1.5 leading-relaxed text-white/80">
                  {p.notes.map((n, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-white/30">・</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      ))}

      {/* フッター */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Hero Review — 2026-05-08 / GPT Image 2 (Nano Banana Pro) /
        {" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
