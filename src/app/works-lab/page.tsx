import Link from "next/link";
import { LabDisclaimer } from "@/components/lab/LabDisclaimer";

// /works-lab
// WorksSection コンパクト 4-枚ギャラリー再設計候補 3 案。
// gpt_image_2 / high / 2k で「20 年キャリアの senior editorial designer」framing で生成。
//
// ユーザー指示:
//   - PhotoBreath (terrace 写真) は撤去 (済)
//   - 施工事例セクションを 4 枚のギャラリーに圧縮
//   - 施工事例ページへの動線
//   - コンパクトでいい
//   - クラスタ世界観 (warm paper / Mincho / 深緑 / FIG.NN) 継承
//
// 採用後の実装方針:
//   - mock-up に忠実に layout / typography / spacing 再現
//   - 写真は yamato 既存 works 写真 (case1-3-ext.webp / works-01-05.webp) から 4 枚選定
//   - CTA: 事例をもっと見る → /works
//
// 納品前に削除する (BRAND-TRUTH §9 のラボ削除リスト準拠)。

const OPTIONS = [
  {
    id: "w-01",
    name: "Asymmetric Magazine — 大判+トリオの編集誌組",
    intent:
      "左に大判 1 枚 + 右に上 1 大 / 中 1 / 右下 1 のトリオ。新建築誌 spread 級の art direction。最もエディトリアル・芸術監督的。",
    src: "/works-lab/w-01-asymmetric-magazine.png",
    pros: [
      "magazine spread 級のアートディレクション — 他社サイトと差別化最強",
      "大判 + 異なるサイズの 3 枚で visual hierarchy がある",
      "見出しと写真群のバランスが editorial で美しい",
    ],
    cons: [
      "実装で大判 + トリオの asymmetric grid を綺麗に組むのに微調整が必要",
      "縦の高さがやや嵩む (compact という点でやや不利)",
    ],
    tone: "Magazine spread editorial",
  },
  {
    id: "w-02",
    name: "Horizontal Strip — 4枚同サイズ縦長フィルム",
    intent:
      "上に見出し + 下に 4 枚同サイズ縦長を横一列。フィルムストリップ風で最もコンパクト・整然。各写真下に caption。CTA 右下。",
    src: "/works-lab/w-02-horizontal-strip.png",
    pros: [
      "最もコンパクト — 縦の高さが最小、ユーザー指示の「コンパクト」に最忠実",
      "4 枚同サイズ縦長で整然・filmstrip 美しい rhythm",
      "実装が最も素直 (4 列 grid + caption)",
      "横スワイプ移行も自然 (mobile)",
    ],
    cons: [
      "asymmetric さに欠ける (整然すぎ、芸術監督性は w-01 / w-03 に劣る)",
      "写真の縦長アスペクトが yamato 既存写真と合わない可能性 (要 crop)",
    ],
    tone: "Compact filmstrip",
  },
  {
    id: "w-03",
    name: "Hero + Trio — 大判 + 縦積み 3 枚",
    intent:
      "左に大判 1 枚 (4:5) + 右に縦積み 3 枚 (横長) + 上見出し + 右下 CTA。w-01 の variant で、トリオ部分が縦積み横長アスペクト。",
    src: "/works-lab/w-03-hero-trio.png",
    pros: [
      "Hero 1 枚が主役感強く、施工力をアピール",
      "右の 3 枚縦積み (横長アスペクト) が editorial で品が良い",
      "クラスタ Mincho 見出し + 写真主役で worldview 整合",
    ],
    cons: [
      "大判 1 枚に頼るので、その 1 枚の選定が重要 (特に 1 枚目を間違うと弱くなる)",
      "縦の高さは中 (w-02 より高く、w-01 と同等)",
    ],
    tone: "Hero + supporting trio",
  },
];

export default function WorksLabPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <LabDisclaimer />

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#1a1a1a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9D159]/85">
              Works Lab — Compact Gallery Mock-up 3
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              施工事例セクション 4-枚ギャラリー design 3 案
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
          2026-05-09 / Phase 4: WorksSection Compact Gallery
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          gpt_image_2 + 20 年キャリアの senior editorial designer framing
        </h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/75">
          現状: 横カルーセル (snap-x) で 8 件並列 — スクロール量大・冗長。
          <br />
          改修: 4 枚ギャラリーに圧縮し、編集誌 spread 級の art direction で「やまとが手がけた住まい」
          を一目で示す。詳細は /works ページに誘導。
        </p>
        <p className="mt-3 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
          世界観継承: 暖紙 #F7F5F0 / 墨黒 #1A1815 / 深緑 #143426 単一アクセント /
          Zen Old Mincho 見出し / FIG.NN eyebrow / ActionLine CTA。
          実装では yamato 既存 works 写真 (case1-3-ext.webp / works-01-05.webp) から 4 枚選定。
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
            w-01 / 02 / 03 のうち 1 つを採用
          </h3>
          <p className="mt-4 max-w-[820px] text-[12.5px] leading-relaxed text-white/55">
            僕の所感:
            <br />
            ・<strong>w-02 (Horizontal Strip)</strong> がユーザー指示「コンパクト」に最も忠実。整然と美しい filmstrip。
            <br />
            ・<strong>w-01 (Asymmetric Magazine)</strong> はアートディレクション最強。新建築誌 spread 級。
            <br />
            ・w-03 は w-01 の variant、Hero 1 枚に強く依存する分リスクあり。
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
        Works Lab — 2026-05-09 / gpt_image_2 (high·2k) /{" "}
        <Link href="/" className="text-white/60 hover:text-white">
          本番TOP
        </Link>
      </footer>
    </main>
  );
}
