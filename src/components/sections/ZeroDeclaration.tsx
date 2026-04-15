import {
  Handshake,
  Banknote,
  Layers,
  Truck,
  Car,
  FileCheck,
  MessageCircle,
  Home,
  type LucideIcon,
} from "lucide-react";

/*
  ZeroDeclaration — 2026-04-15 Phase 2C 改修
  神野さん/レビュー指摘：
  - 同サイズのカード8個が並列で、スクロール疲労の元になっていた
  - ストーリー仕立てにして、家づくりのフェーズ別に展開

  新構成：3章のストーリー
  - 章1: 契約前の不透明を、ゼロに（3項目）
  - 章2: 建築中の追加請求を、ゼロに（3項目）
  - 章3: 建築後の裏切りを、ゼロに（2項目）
*/

type Zero = {
  num: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

type Chapter = {
  label: string;
  title: string;
  intro: string;
  zeros: Zero[];
};

const CHAPTERS: Chapter[] = [
  {
    label: "Before",
    title: "契約前の不透明を、ゼロに。",
    intro: "土地から建物まで、当社が一貫して扱うから。仲介や別会社を挟まないので、契約前にかかる「見えない費用」がありません。",
    zeros: [
      {
        num: "01",
        title: "仲介手数料",
        desc: "自社分譲だから仲介会社を挟みません。数十万〜百万円単位の仲介手数料が不要です。",
        Icon: Handshake,
      },
      {
        num: "02",
        title: "つなぎ融資の負担",
        desc: "土地と建物をセットで提供するため、つなぎ融資の金利負担がかかりません。",
        Icon: Banknote,
      },
      {
        num: "03",
        title: "地盤改良費",
        desc: "最大150万円かかる地盤改良費を当社が全額負担。お客様の見積もりには入りません。",
        Icon: Layers,
      },
    ],
  },
  {
    label: "During",
    title: "建築中の追加請求を、ゼロに。",
    intro: "自社分譲地と自社施工だから実現できる、現場でのコスト管理。「あとから追加請求」は一切ありません。",
    zeros: [
      {
        num: "04",
        title: "余計な搬入費用",
        desc: "工事車両がスムーズに入れる分譲地をご用意しているため、追加の資材搬入コストはかかりません。",
        Icon: Truck,
      },
      {
        num: "05",
        title: "工事車両の駐車場代",
        desc: "自社分譲地だからこそ、工事車両の駐車スペースも確保できます。お客様に余計な負担は一切おかけしません。",
        Icon: Car,
      },
      {
        num: "06",
        title: "不透明な追加費用",
        desc: "見積もりに載っていない費用が、あとから上乗せされることはありません。お見積もりは超シンプルです。",
        Icon: FileCheck,
      },
    ],
  },
  {
    label: "After",
    title: "建築後の裏切りを、ゼロに。",
    intro: "打ち合わせで決めた内容が、最後までそのまま。見積もりから金額も仕様も変わりません。",
    zeros: [
      {
        num: "07",
        title: "打合せ後の追加費用",
        desc: "初めから全部標準。打合せを重ねても金額が上がっていくことはありません。",
        Icon: MessageCircle,
      },
      {
        num: "08",
        title: "モデルハウスとのギャップ",
        desc: "見学して気に入った豪華な設備。オプションではなく、すべて標準仕様としてついてきます。",
        Icon: Home,
      },
    ],
  },
];

export default function ZeroDeclaration() {
  return (
    <section className="bg-bg-primary py-[var(--section-py)]">
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
        {/* セクションラベル */}
        <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
          ZERO DECLARATION
        </p>

        {/* タイトル */}
        <h2 className="text-[clamp(20px,2.5vw,32px)] text-text-primary mb-4">
          やまとの家づくり
          <span className="text-main ml-2">8つのゼロ</span>宣言
        </h2>

        {/* リード文 */}
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed mb-14 md:mb-20 max-w-[640px]">
          他社では当たり前にかかる費用が、やまとではゼロ。
          「本当に追加費用なしで家が建った」と喜ばれる理由を、家づくりの3つのフェーズに整理しました。
        </p>

        {/* 3章のストーリー */}
        <div className="space-y-16 md:space-y-24">
          {CHAPTERS.map((chapter, chapterIdx) => (
            <div key={chapter.label}>
              {/* 章ヘッダー — 非対称配置 */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-10 mb-8 md:mb-10">
                <div>
                  <p
                    className="font-section-label text-accent text-[11px] mb-2 tracking-[0.2em]"
                  >
                    CHAPTER {chapterIdx + 1} — {chapter.label}
                  </p>
                  <h3
                    className="text-text-primary text-xl md:text-2xl lg:text-[28px] leading-[1.5]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {chapter.title}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm md:text-base leading-[1.9] md:pt-6">
                  {chapter.intro}
                </p>
              </div>

              {/* 章内の zeros — 章ごとの列数で表示 */}
              <div
                className={`grid gap-[var(--card-gap)] ${
                  chapter.zeros.length === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {chapter.zeros.map((item) => (
                  <div
                    key={item.num}
                    className="bg-bg-secondary rounded-lg p-[var(--card-p)] card-shadow transition-all hover:-translate-y-1"
                  >
                    {/* 番号 */}
                    <span
                      className="text-main/20 font-light text-4xl md:text-5xl block mb-3"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {item.num}
                    </span>

                    {/* アイコン */}
                    <item.Icon className="w-7 h-7 text-main mb-3" strokeWidth={1.5} />

                    {/* タイトル + ¥0 */}
                    <h4
                      className="text-text-primary font-medium text-base mb-1"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-main font-medium text-lg mb-3"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      ゼロ
                    </p>

                    {/* 説明文 */}
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 補足 */}
        <div className="mt-16 md:mt-20 bg-main-light rounded-lg p-[var(--card-p)] card-shadow">
          <p
            className="text-text-primary text-sm md:text-base font-medium mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            なぜ、これだけゼロにできるのか。
          </p>
          <p className="text-text-secondary text-sm leading-relaxed max-w-[640px]">
            設計から施工まで完全自社体制。大量仕入れでコストを抑え、間に入る会社を挟まず、卸先まで直接交渉しています。大手との価格差の正体は、ブランド代と広告費。原価は変わりません。
          </p>
        </div>
      </div>
    </section>
  );
}
