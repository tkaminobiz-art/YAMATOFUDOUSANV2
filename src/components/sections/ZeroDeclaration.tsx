import {
  Handshake,
  Banknote,
  Layers,
  Truck,
  Car,
  FileCheck,
  MessageCircle,
  Home,
} from "lucide-react";

const ZEROS = [
  {
    num: "01",
    title: "仲介手数料",
    zero: "ゼロ",
    desc: "自社分譲だから仲介会社を挟みません。数十万〜百万円単位の仲介手数料が不要です。",
    Icon: Handshake,
  },
  {
    num: "02",
    title: "つなぎ融資の負担",
    zero: "ゼロ",
    desc: "土地と建物をセットで提供するため、つなぎ融資の金利負担がかかりません。",
    Icon: Banknote,
  },
  {
    num: "03",
    title: "地盤改良費",
    zero: "ゼロ",
    desc: "最大150万円かかる地盤改良費を全額会社負担。お客様の見積もりには入りません。",
    Icon: Layers,
  },
  {
    num: "04",
    title: "小運搬費",
    zero: "ゼロ",
    desc: "大型トラックが入れる分譲地を厳選しているため、小運搬・手上げ費用が不要です。",
    Icon: Truck,
  },
  {
    num: "05",
    title: "職人の駐車場代",
    zero: "ゼロ",
    desc: "分譲地に作業スペースを確保済み。職人の駐車場代をお客様に請求しません。",
    Icon: Car,
  },
  {
    num: "06",
    title: "ふかし請求",
    zero: "ゼロ",
    desc: "不透明な現場管理費の上乗せは一切ありません。見積もりは超シンプルです。",
    Icon: FileCheck,
  },
  {
    num: "07",
    title: "打合せ後の追加費用",
    zero: "ゼロ",
    desc: "初めから全部標準。打合せを重ねても金額が上がっていくことはありません。",
    Icon: MessageCircle,
  },
  {
    num: "08",
    title: "モデルハウスとの落差",
    zero: "ゼロ",
    desc: "モデルハウス＝標準仕様。見て感動した家が、そのまま届きます。",
    Icon: Home,
  },
] as const;

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
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed mb-10 md:mb-14 max-w-[640px]">
          他社では当たり前にかかる費用が、やまとではゼロ。
          「追加費用なく家が建った」──その約束を、8つの項目でお伝えします。
        </p>

        {/* 8カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--card-gap)]">
          {ZEROS.map((item) => (
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

              {/* タイトル + ゼロ */}
              <h3 className="text-text-primary font-medium text-base mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                {item.title}
              </h3>
              <p className="text-main font-medium text-lg mb-3" style={{ fontFamily: "var(--font-sans)" }}>
                {item.zero}
              </p>

              {/* 説明文 */}
              <p className="text-text-secondary text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 補足 */}
        <div className="mt-10 md:mt-14 bg-main-light rounded-lg p-[var(--card-p)] card-shadow">
          <p className="text-text-primary text-sm md:text-base font-medium mb-2" style={{ fontFamily: "var(--font-sans)" }}>
            なぜ、これだけゼロにできるのか。
          </p>
          <p className="text-text-secondary text-sm leading-relaxed max-w-[640px]">
            設計から施工まで完全自社体制。大量仕入れによるコスト圧縮。中間マージンを徹底的にカットし、卸先まで直接交渉しています。大手ハウスメーカーとの価格差の正体は、ブランド代と中間マージン。原価は変わりません。
          </p>
        </div>
      </div>
    </section>
  );
}
