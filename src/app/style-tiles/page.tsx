import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// 納品前に削除する検証用ページ。
// /style-tiles : アートディレクション再設計フェーズ (2026-05-08) のスタイルタイル比較ビュー。
// /hero-review の A/B/C/E 案がすべて「AI生成っぽい無難な住宅サイト平均値」と判断されたため、
// Hero単体に戻る前に、色 / タイポ / 写真トーン / ボタン / 罫線 / 余白 / 装飾 だけを 3 方向で
// 比較するためのページ。「好きな方向」を 1 つ選んでから Hero を作る順番に変更。
// 採用後はこのディレクトリごと削除する (BRAND-TRUTH §9 同等)。

const NG_LIST = [
  "生成り×深緑×明朝のよくあるナチュラル住宅サイト",
  "葉っぱアイコン・家アイコンでやさしさを出すデザイン",
  "AI生成っぽい完璧なLDK写真",
  "左テキスト＋右写真の普通すぎる分割Hero",
  "大きな価格カードを中央要素にするLP風デザイン",
  "実績数字を大きく並べる営業資料風の帯",
  "「心地よい暮らし」「自然と調和」系の抽象コピー",
  "角丸カード＋薄い影で整えたテンプレUI",
  "SaaS風の量産インターフェース",
  "きれいだけど記憶に残らない住宅カタログ風",
];

const TILES = [
  {
    id: "A",
    label: "Tile A",
    title: "建築誌・エディトリアル",
    src: "/style-tiles/tile_A_editorial.png",
    summary:
      "CASA BRUTUS / GA HOUSES / Wallpaper / Aesop の系譜。住宅LPではなく、建築事例を見せる雑誌・ポートフォリオに近い方向。写真大きめ・文字少なめ・余白広く・色数を絞る。",
    palette: [
      { hex: "#1A1815", name: "墨黒" },
      { hex: "#C5BDB0", name: "グレージュ" },
      { hex: "#6E4F32", name: "ウォルナット" },
      { hex: "#F4EFE6", name: "ペーパー白" },
      { hex: "#3E5538", name: "深緑 (5%以下)" },
    ],
    typography: "明朝大見出し＋ラテン系セリフ。価格より見出しが主役。",
    photography: "建築ディテールのモノクロ・クローズアップ (窓辺・木組み・屋根角)。AIショールーム不可。",
    button: "テキストリンク＋ヘアライン下線 / 細い直角アウトライン / インラインcaret。角丸SaaSピル禁止。",
    fitsCopy: "「家づくりは、土地を読むところから始まる。」「奈良で、余白のある暮らしを建てる。」のような余白のある一文。",
    risks: "写真素材の質に依存。安易に撮ると単に地味で終わる。",
    notes: [
      "やまとの『土地から提案』『資金計画』の知性を最も品よく出せる方向",
      "BRAND-TRUTH §1 の生成り背景・深緑メインから一旦離れる (墨黒＋グレージュ＋木の色を主軸に)",
      "ただし深緑は完全に消さず、小さな差し色 (5% 以下) として残す案",
    ],
  },
  {
    id: "B",
    label: "Tile B",
    title: "不動産×建築プロフェッショナル",
    src: "/style-tiles/tile_B_professional.png",
    summary:
      "KKAA / Foster + Partners / Sou Fujimoto の事務所サイトの系譜。土地・資金・建物を扱う『総合コンサル感』。シャープなグリッド・データの見せ方・整列。地元工務店のやさしさより、ちゃんと任せられる会社感。",
    palette: [
      { hex: "#FFFFFF", name: "純白" },
      { hex: "#0E0E0D", name: "墨黒" },
      { hex: "#B3B0AA", name: "ライトグレー" },
      { hex: "#4F4F4D", name: "スレートグレー" },
      { hex: "#2E4A36", name: "深緑 (5%以下)" },
    ],
    typography: "和文ゴシック / 明朝600・直線的。Latin sans (Inter / Helvetica Now)。装飾なし。",
    photography: "建築図面・断面・外観ディテール・図表。ショールーム内観は使わない。",
    button: "直角コーナー・PRIMARY (墨黒地に白文字) / SECONDARY アウトライン / テキストリンク+矢印。",
    fitsCopy: "「土地・建物・資金。三位一体で見える家づくり。」のような構造的な一文。",
    risks: "冷たく見えやすい。やまとの人間味・地域密着の温度感とは距離が出る。",
    notes: [
      "数字の見せ方 (棟数・区画・組・年・1,000件資金計画) が最も美しく見せられる",
      "やまとの『土地・建物・資金を一社で扱える』強みと最も相性が良い",
      "クライアント (専務) の年齢層・嗜好と合うか要検証 (温度感が低い)",
    ],
  },
  {
    id: "C",
    label: "Tile C",
    title: "暮らしの実在感・クラフト",
    src: "/style-tiles/tile_C_craft.png",
    summary:
      "Kinfolk / BRUTUS CASA / MUJI 素材本 / Aesop in-store の系譜。完璧なLDK写真ではなく、素材・手元・現場・木の質感・窓辺の光を主役にする。AI感を消すには最強。ただし素材撮影への投資が前提。",
    palette: [
      { hex: "#EFE9DD", name: "プラスター白" },
      { hex: "#B0926A", name: "生オーク" },
      { hex: "#2A2622", name: "チャコール" },
      { hex: "#36443F", name: "ハンドプリント藍" },
      { hex: "#B6755A", name: "テラコッタ" },
    ],
    typography: "わずかに不完全な明朝＋ラテン古典セリフ (Caslon / Bembo)。インクの質感を残す。",
    photography: "素材コラージュ — 木目・手元・道具・窓辺の光・端材。スタジオ撮りLDKは禁止。",
    button: "手書き下線ラベル / 微妙に不完全な線のボーダー / 素材タグ風チップ。",
    fitsCopy: "「奈良の木と、奈良の家と。」「土地の声を、家にする。」のような触感のある言葉。",
    risks: "写真素材を新規に撮影しないと再現できない。既存素材だけだと弱い。",
    notes: [
      "AI 生成感を最も殺せる方向。3案中もっとも『他社と被らない』",
      "ただし素材写真 (木目・手元・現場) を撮影しないと成立しない",
      "やまとの『地元密着・自社一貫体制』の温度感を最大化できる",
    ],
  },
];

export default function StyleTilesPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
              Style Tiles — Art Direction Reset
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              アートディレクション 3 方向比較
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-xs text-white/70">
            <a href="#A" className="hover:text-white">A 建築誌</a>
            <a href="#B" className="hover:text-white">B プロフェッショナル</a>
            <a href="#C" className="hover:text-white">C クラフト</a>
            <span className="text-white/20">/</span>
            <Link href="/hero-review" className="hover:text-white">
              Hero NGサンプル ↗
            </Link>
            <Link href="/" className="hover:text-white">本番TOP →</Link>
          </nav>
        </div>
      </header>

      {/* イントロ */}
      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/80">
          2026-05-08 / Phase: Art Direction Reset
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          Hero に戻る前に、まず方向性を選ぶ
        </h2>
        <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-white/75">
          /hero-review の A/B/C/E 案はすべて「整っているが、AI が考える品のいい
          ナチュラル住宅サイトの平均値」に着地しており、不採用となりました。
          ここで Hero 単体を磨いてもアートディレクションが合っていない以上、
          ずっと「なんか違う」が残ります。
          <br />
          <br />
          そこで Hero 制作を一旦凍結し、色 / 写真トーン / 見出し / ボタン /
          罫線 / カード / 余白 / 装飾 だけを 3 方向で出しました。
          このページの目的は、Web ページを完成させることではなく
          「好きな方向を 1 つ選ぶ」ことです。選んだあと、その方向でだけ
          Hero を 1 案作り、Claude Code で実装に進みます。
        </p>

        {/* NG パネル */}
        <div className="mt-8 rounded border border-red-400/30 bg-red-400/[0.05] p-5 text-[12.5px] leading-relaxed text-white/80">
          <p className="text-red-300/90 text-[11px] uppercase tracking-[0.2em]">
            NG / 共通ガード
          </p>
          <p className="mt-2 text-white/70">
            以下のパターンが画像生成・実装プロンプトに混じった時点で AI 平均値に
            戻ります。次フェーズで Hero / セクションを生成する際、毎回プロンプトに
            明示的に NG を書きます。
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-1.5 md:grid-cols-2">
            {NG_LIST.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="text-red-300/60">×</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 タイル */}
      {TILES.map((t) => (
        <section
          key={t.id}
          id={t.id}
          className="border-t border-white/10 px-6 py-16"
        >
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                {t.label}
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {t.title}
              </h3>
              <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-white/75">
                {t.summary}
              </p>
              <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.src}
                  alt={`${t.label} ${t.title} — Style tile`}
                  className="block h-auto w-full"
                />
              </div>

              {/* タイル内補足 */}
              <div className="mt-6 grid grid-cols-1 gap-4 text-[12.5px] leading-relaxed md:grid-cols-2">
                <div className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                    タイポグラフィ
                  </p>
                  <p className="mt-2 text-white/85">{t.typography}</p>
                </div>
                <div className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                    写真トーン
                  </p>
                  <p className="mt-2 text-white/85">{t.photography}</p>
                </div>
                <div className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                    ボタン
                  </p>
                  <p className="mt-2 text-white/85">{t.button}</p>
                </div>
                <div className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                    合うコピー (例)
                  </p>
                  <p className="mt-2 text-white/85">{t.fitsCopy}</p>
                </div>
              </div>
            </div>

            <aside className="space-y-6 text-xs leading-relaxed text-white/75">
              <div>
                <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                  カラーパレット
                </p>
                <ul className="mt-3 space-y-1.5">
                  {t.palette.map((c) => (
                    <li
                      key={c.hex}
                      className="flex items-center gap-3 rounded border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                      <span
                        className="inline-block h-5 w-5 rounded-sm border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="font-mono text-[11px] text-white/65">
                        {c.hex}
                      </span>
                      <span className="ml-auto text-[11px] text-white/55">
                        {c.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                  リスク
                </p>
                <p className="mt-2 text-white/85">{t.risks}</p>
              </div>
              <div>
                <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                  所感メモ
                </p>
                <ul className="mt-2 space-y-1.5">
                  {t.notes.map((n, i) => (
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

      {/* 次の一手 */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            次の一手
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            A / B / C のうち、どれが「自信を持ってクライアントに出せる」方向か
          </h3>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-white/75">
            選んだ方向でだけ Hero を 1 案生成し、その上で Claude Code が実装に進みます。
            複数選ぶ・ハイブリッドにする・もう 1 方向追加する、いずれもアリ。
            「全部ピンと来ない」ならスタイルタイル側をもう一段振り直しますので、
            そう言ってください。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Style Tiles — 2026-05-08 / nano_banana_2 (Higgsfield) /{" "}
        <Link href="/hero-review" className="text-white/55 hover:text-white">
          Hero NGサンプル
        </Link>{" "}
        /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
