import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// 納品前に削除する検証用ページ。
// /hero-a : Hero Aアートディレクション (建築誌・エディトリアル) 専用の精度UPページ。
// 2026-05-08 夕、ユーザー判断でA採用確定 → ここでだけ磨き続ける。
// B/C比較や別方向への寄り道は禁止。Aの中で1案に絞り込んで実装に進む。
// 採用後はこのディレクトリごと削除する。
// Reference-only バナーは <LabDisclaimer /> を最上部に必須表示(BRAND-TRUTH.md §9)。

const CONFIRMED_COPY = {
  h1: ["土地を読み、", "暮らしを建てる。"],
  subcopy: [
    "奈良・京都南部で、土地探しから資金計画、建物まで。",
    "総額で見える家づくりを、地域密着で支えます。",
  ],
  priceNote: ["京モデル　2,280万円〜", "税込・建物本体＋標準付帯工事込み"],
  ctas: ["総額の目安を相談する", "モデルハウスを見学する"],
  trustStrip: ["引渡し 600棟以上", "分譲 90区画以上", "お客様の声 50組以上", "業歴 14年"],
};

const CANDIDATES = [
  {
    id: "v2-a",
    label: "A v2-a",
    src: "/hero-a/hero_A_v2_a.png",
    summary:
      "確定コピーが正しく反映されている。実ロゴ・実外観 (三山木モデル)・実績数値 (600棟/90区画/50組/14年) も正規。下部の trust strip がやや重複表示されているのは AI アーティファクト (実装時に1段に整える)。",
    notes: [
      "見出しスケール・余白・写真比率は意図通り",
      "「総額の目安を相談する →」「モデルハウスを見学する →」の2CTAが揃って配置",
      "深緑アクセントは「01 — HOUSES」の細い下線にだけ使用",
      "trust strip 重複は実装時に解消、画像生成側のクセに引きずられない",
    ],
  },
  {
    id: "v2-b",
    label: "A v2-b",
    src: "/hero-a/hero_A_v2_b.png",
    summary:
      "v2-a と同じプロンプトでサンプリング違い。trust strip が1段に綺麗に収まっており、構図全体のバランスは v2-b のほうが安定している。実装時のリファレンスとして v2-b を主、v2-a を補助にする想定。",
    notes: [
      "trust strip が1段で綺麗に揃う",
      "Hero と trust strip の間の余白がやや密 — 実装時はもう少し広げる余地あり",
      "光のトーン・写真の入り方は v2-a より少しだけ控えめ",
      "全体の編集誌感は v2-b のほうがわずかに強い",
    ],
  },
];

const CRITERIA = [
  "見た瞬間に「安売りLP」ではなく「住宅ブランド」に見えるか",
  "写真に実在感があるか (AI生成LDKに見えていないか)",
  "土地・資金・建物の強みが静かに伝わるか",
  "価格 2,280万円〜 が上品に見えるか (ディスカウント感がないか)",
  "自分が「これなら出せる」と思えるか — 一番大事",
];

const ROLE_USAGE = [
  {
    label: "A 建築誌・エディトリアル",
    role: "Hero主軸 (採用)",
    detail: "ペーパー白＋墨黒＋グレージュ＋写真主役。やまとの強みを静かに織り込む。",
    accent: "#A9D159",
  },
  {
    label: "B 不動産×建築プロフェッショナル",
    role: "価格・標準仕様セクションで使用",
    detail: "シャープなグリッド・スペック表組・データ整理が美しい方向。Heroには使わない。",
    accent: "#C5BDB0",
  },
  {
    label: "C 暮らしの実在感・クラフト",
    role: "Aの質感補助として少量混ぜる",
    detail: "プラスター/オーク/紙質/手仕事ライン。施工事例・お客様の声・フッター前で使う。",
    accent: "#B6755A",
  },
];

export default function HeroAPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Hero A — Architectural Editorial / Polishing
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              Hero A 方向 — 精度UP / 確定コピー反映版
            </h1>
          </div>
          <nav className="flex items-center gap-3 text-xs text-white/70">
            <a href="#candidates" className="hover:text-white">候補</a>
            <a href="#copy" className="hover:text-white">確定コピー</a>
            <a href="#criteria" className="hover:text-white">5項目チェック</a>
            <span className="text-white/20">/</span>
            <Link href="/style-tiles" className="hover:text-white">
              ← /style-tiles
            </Link>
            <Link href="/" className="hover:text-white">本番TOP →</Link>
          </nav>
        </div>
      </header>

      {/* 決定の前提 */}
      <section className="mx-auto max-w-[1100px] px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          2026-05-08 / Decision: A direction adopted
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          A だけ磨く。比較に戻らない。
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          A / B / C のスタイルタイル比較と Hero 視覚化を経て、Hero の主軸は{" "}
          <span className="text-white">A 建築誌・エディトリアル</span>{" "}
          に確定しました。今フェーズの目的は方向性探しではなく、A の精度を上げて
          実装に渡すことです。3案比較・別方向への寄り道はしません。違和感は A
          の中で微調整します。
        </p>

        {/* 役割の使い分け */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ROLE_USAGE.map((r) => (
            <div
              key={r.label}
              className="rounded border border-white/10 bg-white/[0.03] p-5"
              style={{ borderLeftColor: r.accent, borderLeftWidth: 2 }}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                {r.label}
              </p>
              <p className="mt-2 text-[12.5px] text-white/85">{r.role}</p>
              <p className="mt-2 text-[11.5px] leading-relaxed text-white/60">
                {r.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 候補2案 */}
      <section
        id="candidates"
        className="border-t border-white/10 bg-white/[0.02] px-6 py-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            生成候補 — A 方向 / 同一プロンプトのサンプリング違い
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            確定コピー反映版 v2 — 2 サンプル
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            Higgsfield (nano_banana_2) に確定コピー＋実ロゴ＋三山木モデル外観の
            media reference を渡して生成。3 案比較ではなく、同じプロンプトの
            サンプリング違い 2 枚です。実装時はどちらかを主リファレンスにします。
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {CANDIDATES.map((c) => (
              <figure
                key={c.id}
                className="overflow-hidden rounded border border-white/10 bg-white/[0.02]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={`Hero A — ${c.label}`}
                  className="block h-auto w-full"
                />
                <figcaption className="border-t border-white/10 p-5 text-[12.5px] leading-relaxed text-white/75">
                  <p className="text-white/85 text-[11px] uppercase tracking-[0.18em]">
                    {c.label}
                  </p>
                  <p className="mt-2 text-white/80">{c.summary}</p>
                  <ul className="mt-4 space-y-1.5">
                    {c.notes.map((n, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-white/30">・</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 確定コピー */}
      <section
        id="copy"
        className="border-t border-white/10 px-6 py-16"
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            確定コピー — 実装はこの値を起点にする
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            Hero に入れる文言（HTMLで実装。画像内の文字は信用しない）
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded border border-white/10 bg-white/[0.03] p-5">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                H1 — 明朝大見出し (2 行)
              </p>
              <p className="mt-3 text-2xl leading-relaxed text-white">
                {CONFIRMED_COPY.h1[0]}
                <br />
                {CONFIRMED_COPY.h1[1]}
              </p>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.03] p-5">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                Subcopy — 2 行 / muted gray
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                {CONFIRMED_COPY.subcopy[0]}
                <br />
                {CONFIRMED_COPY.subcopy[1]}
              </p>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.03] p-5">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                Price note — カードにしない / 細い情報として
              </p>
              <p className="mt-3 text-sm text-white/85">
                {CONFIRMED_COPY.priceNote[0]}
                <br />
                <span className="text-white/55 text-[12.5px]">
                  {CONFIRMED_COPY.priceNote[1]}
                </span>
              </p>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.03] p-5">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                CTA — 2 つまで / 直角コーナー / 緑NG
              </p>
              <p className="mt-3 text-sm text-white/85">
                Primary：「{CONFIRMED_COPY.ctas[0]} →」
                <br />
                Secondary：「{CONFIRMED_COPY.ctas[1]} →」
              </p>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.18em]">
                Trust strip — Hero下の細い帯 / monospace / 営業資料感を消す
              </p>
              <p className="mt-3 font-mono text-sm text-white/85">
                {CONFIRMED_COPY.trustStrip.join("　·　")}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded border border-white/10 bg-white/[0.03] p-5 text-[12.5px] leading-relaxed text-white/75">
            <p className="text-white/45 text-[11px] uppercase tracking-[0.18em]">
              レイアウト条件 (実装時の必達)
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-1.5 md:grid-cols-2">
              <li className="flex gap-2"><span className="text-white/30">・</span>Headerは正規ロゴ＋日本語ナビ、英語ナビ禁止</li>
              <li className="flex gap-2"><span className="text-white/30">・</span>右上は LINE 緑ピル禁止、テキストリンクのみ</li>
              <li className="flex gap-2"><span className="text-white/30">・</span>Hero canvas はペーパー白 #F4EFE6、純白NG</li>
              <li className="flex gap-2"><span className="text-white/30">・</span>写真は実物 (三山木モデル / 左京モデル等) のみ、AI生成LDK禁止</li>
              <li className="flex gap-2"><span className="text-white/30">・</span>価格はカードにしない、細い情報として配置</li>
              <li className="flex gap-2"><span className="text-white/30">・</span>CTA は2つまで、直角コーナー、影なし、緑なし</li>
              <li className="flex gap-2"><span className="text-white/30">・</span>実績数字は Hero下の静かな細帯、営業資料風NG</li>
              <li className="flex gap-2"><span className="text-white/30">・</span>大きな角丸カード／白カード量産禁止、葉アイコン禁止</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5項目チェック */}
      <section
        id="criteria"
        className="border-t border-white/10 bg-white/[0.02] px-6 py-16"
      >
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            専務に出す前 / 実装後の判断基準
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            5 項目チェック
          </h3>
          <ol className="mt-6 space-y-3 text-sm leading-relaxed text-white/85">
            {CRITERIA.map((c, i) => (
              <li
                key={i}
                className="flex gap-4 rounded border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="font-mono text-[11px] text-white/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={i === 4 ? "text-[#A9D159]" : ""}>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 次の一手 */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            次の一手
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            v2-a / v2-b のどちらをリファレンスに、Claude Code が Hero を実装するか
          </h3>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
            実装は src/components/hero/HeroEditorial.tsx (仮) として、ペーパー白
            背景・明朝大見出し・実外観写真・スリムCTA2つ・下部に細い trust strip
            の構成で組みます。BRAND-TRUTH §1 のトークン (生成り×深緑×明朝) は
            この A 方向に合わせて一部見直し (例: 背景は #F4EFE6 のペーパー白に、
            見出しはより編集誌寄りの Mincho にチューニング)。BRAND-TRUTH への
            修正は本実装と同じコミットに含めます。
          </p>
          <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/55">
            「v2-b ベースで実装して」と言ってもらえれば、実装に進みます。
            v2 でも違和感があれば、v3 を A の中だけで再生成します
            (3案比較・別方向には戻りません)。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Hero A — Polishing — 2026-05-08 / nano_banana_2 (Higgsfield) /{" "}
        <Link href="/style-tiles" className="text-white/55 hover:text-white">
          /style-tiles
        </Link>{" "}
        /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
