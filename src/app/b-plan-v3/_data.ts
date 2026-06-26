/*
  /b-plan-v3 確定データ（0ベース禁止資産・改変禁止）
  ------------------------------------------------------------------
  src/app/b-plan-v2/page.tsx の確定 const 群を verbatim コピーして export。
  本ファイルは「データの単一参照点」。各セクション実装者はここから import する。
  文言・数値は BRAND-TRUTH / b-plan-v2 と一致させること（勝手に書き換えない）。

  Icon 参照（voiceProofs の Icon）は lucide-react のコンポーネント型。
  セクション実装者は VoiceProof.Icon を <Icon className=... /> で描画できる。
*/
import {
  BadgeCheck,
  MapPinned,
  PencilRuler,
  ReceiptText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type VoiceProof = {
  Icon: LucideIcon;
  label: string;
  quote: string;
};

export type HonestFeeling = {
  number: string;
  category: string;
  feeling: string;
  response: string;
};

export type PaymentCase = {
  no: string;
  customer: string;
  concern: string;
  headline: string;
  family: string;
  income: string;
  plan: string;
  total: string;
  breakdown: string[];
  parts: { building: number; land: number; fee: number };
  totalNum: number;
  monthlyNum: number;
  borrowing: string;
  monthly: string;
  ratio: string;
  image: string;
};

export type CostCompareRow = {
  label: string;
  general: string;
  answer: string;
  reason: string;
};

export type GalleryItem = {
  src: string;
  label: string;
  note: string;
  tileClass: string;
  aspectClass: string;
  sizes: string;
};

export const heroStats = [
  {
    number: "01",
    title: "大手品質",
    lead: "素材・装備まで妥協しない",
  },
  {
    number: "02",
    title: "総額提示",
    lead: "土地・建物・諸費用まで見える",
  },
  {
    number: "03",
    title: "自由設計",
    lead: "こだわりを適正価格で足せる",
  },
];

export const voiceProofs: VoiceProof[] = [
  {
    Icon: BadgeCheck,
    label: "標準仕様",
    quote: "「これも標準なんですか？」が口グセになりました。",
  },
  {
    Icon: ReceiptText,
    label: "総額",
    quote: "最初の一枚の見積もりから引渡しまで、本当に増額がありませんでした。",
  },
  {
    Icon: MapPinned,
    label: "土地",
    quote: "土地探しから一本でお願いできた。これが一番ありがたかった。",
  },
  {
    Icon: PencilRuler,
    label: "自由設計",
    quote: "この予算で、ここまでこだわれると思っていなかったです。",
  },
  {
    Icon: ReceiptText,
    label: "価格",
    quote: "「あとで増えるかも」を、ずっと心配しなくてよかった。",
  },
  {
    Icon: BadgeCheck,
    label: "標準仕様",
    quote: "最後の見積もりが、最初とほとんど変わらなかったんです。",
  },
  {
    Icon: PencilRuler,
    label: "間取り",
    quote: "「無理です」じゃなくて、「こうしませんか」が返ってくる。",
  },
  {
    Icon: MapPinned,
    label: "土地",
    quote: "「ここに住みたい」場所で、家の輪郭まで見えてきました。",
  },
  {
    Icon: BadgeCheck,
    label: "設備",
    quote: "大手で一度諦めた理想が、ここで叶いました。",
  },
  {
    Icon: PencilRuler,
    label: "提案",
    quote: "いつの間にか、打合せの日を待つようになっていました。",
  },
  {
    Icon: ReceiptText,
    label: "明瞭",
    quote: "「これは標準、これは追加」が最初から全部わかる。",
  },
  {
    Icon: PencilRuler,
    label: "人",
    quote: "迷っているときに、一緒に悩んでくれた。それがすごく嬉しかった。",
  },
  {
    Icon: MapPinned,
    label: "土地",
    quote: "もっと早く、ここに来ればよかった。",
  },
  {
    Icon: BadgeCheck,
    label: "誇り",
    quote: "遊びに来た友だちから、毎回「いい家だね」って言われます。",
  },
  {
    Icon: ReceiptText,
    label: "建てた後",
    quote: "建てて終わり、じゃなかった。今でも電話するとすぐ来てくれます。",
  },
];

export const featuredVoiceProofs: VoiceProof[] = [
  voiceProofs[0],
  voiceProofs[1],
  voiceProofs[2],
  voiceProofs[3],
  voiceProofs[8],
];

export const honestFeelings: HonestFeeling[] = [
  {
    number: "01",
    category: "自由設計",
    feeling: "注文住宅だから、希望はできるだけ叶えたい。",
    response: "まず希望をすべて聞かせてもらい、残すところと調整するところを総額の中で分けます。",
  },
  {
    number: "02",
    category: "総額",
    feeling: "でも、総額はできるだけ抑えたい。",
    response: "専用展示場を持たず、自社分譲地のモデルハウスを活用。販売運営費を抑えて、家に予算を回します。",
  },
  {
    number: "03",
    category: "追加費用",
    feeling: "見積もりに出ていない追加料金が、あとで増えないか知りたい。",
    response: "外構・登記・ローン費用・追加になりやすい仕様まで、契約前に同じ表で確認します。",
  },
  {
    number: "04",
    category: "標準仕様",
    feeling: "標準仕様は充実していてほしい。必要なら変更もしたい。",
    response: "標準装備を実物で確認してから、変えたい部分だけオプションで選べます。",
  },
  {
    number: "05",
    category: "自社分譲地",
    feeling: "土地探しで、家づくりを止めたくない。",
    response: "自社分譲地も扱い、土地と建物と月々の支払いを一緒に組み立てます。",
  },
];

export const paymentCases: PaymentCase[] = [
  {
    no: "Case01",
    customer: "奈良市 Aさん（35歳・3人家族）",
    concern: "最初は、うちの年収で本当に払っていけるのか分かりませんでした。",
    headline: "土地と建物を合わせた月々が見えて、やっと前向きに考えられました。",
    family: "30代ご夫婦 + お子様1人",
    income: "世帯年収550万円",
    plan: "京モデル 28坪 / 3LDK",
    total: "3,180",
    breakdown: ["建物2,280万円", "土地650万円", "諸費用250万円"],
    parts: { building: 2280, land: 650, fee: 250 },
    totalNum: 3180,
    monthlyNum: 86944,
    borrowing: "3,080万円",
    monthly: "86,944",
    ratio: "19.0%",
    image: "/images/bplan/payment-cases/payment-case-01.png",
  },
  {
    no: "Case02",
    customer: "橿原市 Bさん（38歳・4人家族）",
    concern: "家族4人で暮らすなら、広さを削るしかないと思っていました。",
    headline: "総額を見ながら、残したい希望と調整する部分をひとつずつ決められました。",
    family: "30代ご夫婦 + お子様2人",
    income: "世帯年収680万円",
    plan: "風モデル 30坪 / 4LDK",
    total: "3,580",
    breakdown: ["建物2,480万円", "土地850万円", "諸費用250万円"],
    parts: { building: 2480, land: 850, fee: 250 },
    totalNum: 3580,
    monthlyNum: 95413,
    borrowing: "3,380万円",
    monthly: "95,413",
    ratio: "16.8%",
    image: "/images/bplan/payment-cases/payment-case-02.png",
  },
  {
    no: "Case03",
    customer: "木津川市 Cさん（29歳・2人家族）",
    concern: "20代で注文住宅は、まだ先の話だと思っていました。",
    headline: "土地と建物を合わせて月々を見たら、自分たちにも届くと思えました。",
    family: "20代ご夫婦",
    income: "世帯年収480万円",
    plan: "京モデル 28坪 / 3LDK",
    total: "2,980",
    breakdown: ["建物2,280万円", "土地450万円", "諸費用250万円"],
    parts: { building: 2280, land: 450, fee: 250 },
    totalNum: 2980,
    monthlyNum: 81298,
    borrowing: "2,880万円",
    monthly: "81,298",
    ratio: "20.3%",
    image: "/images/bplan/payment-cases/payment-case-03.png",
  },
];

export const costCompareRows: CostCompareRow[] = [
  {
    label: "地盤改良費",
    general: "追加で見積もりに入ることがあります。",
    answer: "かかりません",
    reason: "自社分譲地は、地盤を整えてからお渡しするためです。",
  },
  {
    label: "つなぎ融資",
    general: "土地を先に買う場合、必要になることがあります。",
    answer: "原則、発生しません",
    reason: "自社分譲地と建物を一体で進めます。",
  },
  {
    label: "土地の仲介手数料",
    general: "土地と建物を別々に進めると、手数料も別でかかることがあります。",
    answer: "自社分譲地なら不要です",
    reason: "土地を直接扱えるため、余計な手間も減らせます。",
  },
  {
    label: "大型展示場の維持費",
    general: "販売経費として、価格に乗りやすい項目です。",
    answer: "価格に乗せません",
    reason: "自社分譲地のモデルハウスを活用します。",
  },
  {
    label: "中間マージン",
    general: "販売・設計・施工が分かれるほど、費用の層も増えます。",
    answer: "重ねません",
    reason: "土地・設計・施工・販売まで自社でつなぎます。",
  },
  {
    label: "見えにくい追加",
    general: "契約後に仕様や工事条件が見え、総額も変わることがあります。",
    answer: "契約前に、ひとつずつ確認します",
    reason: "含まれるものと別途必要なものを、契約前に見せます。",
  },
];

export const costMechanisms: string[] = [
  "自社分譲地と建物を一体で計画",
  "専用展示場に大きく頼らない",
  "土地・設計・施工・販売まで自社でつなぐ",
];

export const zeroItems: string[] = [
  "つなぎ融資",
  "小運搬費",
  "職人駐車場代",
  "地盤改良費",
  "打合せ追加",
  "標準との差額",
];

export const gallery: GalleryItem[] = [
  {
    src: "/images/works-parts/exterior/exterior-05.webp",
    label: "外観",
    note: "街に残る佇まい",
    tileClass: "md:col-span-6 md:row-span-6",
    aspectClass: "aspect-[4/3] md:aspect-auto",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  {
    src: "/images/works-parts/living/living-02.webp",
    label: "LDK",
    note: "家族が集まる広がり",
    tileClass: "md:col-span-6 md:row-span-3",
    aspectClass: "aspect-[16/10] md:aspect-auto",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  {
    src: "/images/bplan/kitchen-premium.webp",
    label: "キッチン",
    note: "毎日触れる質感",
    tileClass: "md:col-span-3 md:row-span-3",
    aspectClass: "aspect-[4/3] md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 100vw",
  },
  {
    src: "/images/works-parts/washroom/washroom-03.webp",
    label: "洗面",
    note: "朝の動線まで美しく",
    tileClass: "md:col-span-3 md:row-span-3",
    aspectClass: "aspect-[4/3] md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 100vw",
  },
  {
    src: "/images/works-parts/bath/bath-03.webp",
    label: "浴室",
    note: "標準の先にある心地よさ",
    tileClass: "md:col-span-4 md:row-span-2",
    aspectClass: "aspect-[16/9] md:aspect-auto",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
  {
    src: "/images/works-parts/entrance/entrance-05.webp",
    label: "玄関",
    note: "最初に伝わる品",
    tileClass: "md:col-span-4 md:row-span-2",
    aspectClass: "aspect-[16/9] md:aspect-auto",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
  {
    src: "/images/works-parts/storage/storage-08.webp",
    label: "収納",
    note: "暮らしを整える余白",
    tileClass: "md:col-span-4 md:row-span-2",
    aspectClass: "aspect-[16/9] md:aspect-auto",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
];

export const customIdeas: [string, string][] = [
  ["間取り", "家族の動きに合わせる"],
  ["収納", "暮らしの散らかりを減らす"],
  ["外観", "周りに誇れる印象へ"],
  ["造作", "好きな場所に予算を使う"],
];
