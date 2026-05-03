// ────────────────────────────────────────────────
// 型定義
// ────────────────────────────────────────────────

export type SignatureKey = "house" | "customer" | "policy";

export type Thoughts = {
  house: string;
  customer: string;
  policy: string;
};

export type Staff = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  career: string; // 空文字で非表示
  thoughts: Thoughts;
  signature: SignatureKey;
};

export type Phase = {
  num: string;
  deptEn: string;
  title: string;
  subtitle: string;
  staff: Staff[];
};

export type Representative = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  career: string;
  quote: string;
};

// ────────────────────────────────────────────────
// スタッフデータ (17名 — 代表2名を除く)
// 2026-05-03 thoughts リライト: 抽象ポエム→具体行動へ全面書き換え
//   〔要確認〕は創作度高めの箇所。専務レビュー時に直してもらう前提で先行投入。
// ────────────────────────────────────────────────

export const PHASES: Phase[] = [
  {
    num: "01",
    deptEn: "SALES",
    title: "最初に、お話を伺う。",
    subtitle: "営業 — ご相談からご契約まで",
    staff: [
      {
        id: "100104",
        name: "田中 信次",
        nameEn: "Shinji Tanaka",
        role: "営業本部長",
        career: "15年",
        thoughts: {
          house: "契約後の追加で予算が崩れやすい。最初に全部出します。",
          customer: "数字の話も、遠慮せず聞いてください。",
          policy: "曖昧な見積もりは、出さない。",
        },
        signature: "policy",
      },
      {
        id: "157200",
        name: "山岡 洋一",
        nameEn: "Yoichi Yamaoka",
        role: "京都支店長",
        career: "14年",
        thoughts: {
          house: "「土地で7割決まる」と毎回お話しします。",
          customer: "地図だけでは分からない土地の空気まで、現地で確認します。",
          policy: "いい土地は、お客様と見に行く。",
        },
        signature: "customer",
      },
      {
        id: "147195",
        name: "西口・クロフォード・丈",
        nameEn: "Joe N. Crawford",
        role: "営業課長",
        career: "12年",
        thoughts: {
          house: "同じ間取りでも、家族ごとに住み方が違う。",
          customer: "ご要望は、初回で全部書き出します。",
          policy: "提案は、お客様の数だけ変える。",
        },
        signature: "house",
      },
      {
        id: "218450",
        name: "柏崎 修平",
        nameEn: "Shuhei Kashiwazaki",
        role: "本店営業部",
        career: "7年",
        thoughts: {
          house: "30年後も飽きない設備を、最初に決めます。",
          customer: "LINEで聞いてください。すぐ返します。",
          policy: "わからないことは、わからないと答える。",
        },
        signature: "customer",
      },
      {
        id: "258798",
        name: "三野 雄資",
        nameEn: "Yusuke Mino",
        role: "営業部",
        career: "3年",
        thoughts: {
          house: "30代のご家族の悩みは、だいたい似ています。",
          customer: "ベテランに何度も確認してから、お返事します。",
          policy: "ひとつ質問されたら、三つ答える。",
        },
        signature: "policy",
      },
    ],
  },
  {
    num: "02",
    deptEn: "DESIGN",
    title: "理想を、図面にする。",
    subtitle: "設計 — 初回の打ち合わせから同席する、自社設計士",
    staff: [
      {
        id: "126651",
        name: "河野 英宣",
        nameEn: "Hidenobu Kono",
        role: "開発設計部 部長",
        career: "30年",
        thoughts: {
          house: "奈良の土地と、三十年向き合ってきました。",
          customer: "30年後も陳腐化しない素材を、最初に選びます。",
          policy: "外観は控えめに、骨組みは丈夫に。",
        },
        signature: "policy",
      },
      {
        id: "126646",
        name: "栗野 佑也",
        nameEn: "Yuya Kurino",
        role: "住宅設計部 責任者",
        career: "13年",
        thoughts: {
          house: "夕食の時間と、朝の動線。先に決めます。",
          customer: "間取りは、一緒に考えます。",
          policy: "線一本、20年後の暮らしを想像して引く。",
        },
        signature: "policy",
      },
      {
        id: "194526",
        name: "岩佐 篤志",
        nameEn: "Atsushi Iwasa",
        role: "建築設計部",
        career: "13年",
        thoughts: {
          house: "朝の動線、夜の動線。別々に図面を引きます。",
          customer: "ご要望は3回聞いてから、図面に起こします。",
          policy: "模型を作ってから、線を引く。",
        },
        signature: "house",
      },
    ],
  },
  {
    num: "03",
    deptEn: "CONSTRUCTION",
    title: "現場で、形にする。",
    subtitle: "土木・工務 — 土地造成から竣工まで",
    staff: [
      {
        id: "170083",
        name: "森下 嘉久",
        nameEn: "Yoshihisa Morishita",
        role: "本店土木部 部長",
        career: "37年",
        thoughts: {
          house: "家を建てる前に、まず地面を読む。",
          customer: "地盤のことで、後悔させません。",
          policy: "土壌は手で握って判断します。37年やってます。",
        },
        signature: "customer",
      },
      {
        id: "92140",
        name: "入江 将大",
        nameEn: "Masahiro Irie",
        role: "本社工務部 部長",
        career: "20年",
        thoughts: {
          house: "現場で素材に触らない日は、ほぼありません。",
          customer: "見えない部分ほど、丁寧にやります。",
          policy: "現場で木の温度を、手で確かめる。",
        },
        signature: "policy",
      },
      {
        id: "159106",
        name: "稲塚 康員",
        nameEn: "Yasukazu Inatsuka",
        role: "本店工務部",
        career: "6年",
        thoughts: {
          house: "30年後の点検で、恥ずかしくない仕事を。",
          customer: "工事中も、気軽に声をかけてください。",
          policy: "ミリ単位で、合わせる。",
        },
        signature: "policy",
      },
      {
        id: "58990",
        name: "澤 佳純",
        nameEn: "Kasumi Sawa",
        role: "本店工務部",
        career: "2年",
        thoughts: {
          house: "毎日、先輩の手元を見て覚えています。",
          customer: "お名前を覚えて、現場でお会いします。",
          policy: "わからないことは、その日のうちに聞く。",
        },
        signature: "policy",
      },
      {
        id: "258809",
        name: "尾田 洋基",
        nameEn: "Hiroki Oda",
        role: "本社工務部",
        career: "2年",
        thoughts: {
          house: "お引き渡し後、何十年も住み続ける場所。",
          customer: "工期は、きっちり守ります。",
          policy: "新しい工法は、自分で試してから現場に持ち込む。",
        },
        signature: "customer",
      },
      {
        id: "218454",
        name: "イスル サンパツ",
        nameEn: "Isuru Sampath",
        role: "土木部・工務部",
        career: "",
        thoughts: {
          house: "スリランカで学んだ手仕事を、奈良の現場で。",
          customer: "言葉より、仕事で応えます。",
          policy: "目立たない場所こそ、丁寧に。",
        },
        signature: "customer",
      },
    ],
  },
  {
    num: "04",
    deptEn: "MANAGEMENT",
    title: "全体を、支える。",
    subtitle: "経営・管理 — 会社の土台",
    staff: [
      {
        id: "92293",
        name: "多口 典子",
        nameEn: "Noriko Taguchi",
        role: "監査役員",
        career: "15年",
        thoughts: {
          house: "契約書の数字一つに、ご家族の生活がある。",
          customer: "ご相談時の見積もりと、契約書は一致します。",
          policy: "数字に、嘘をつかせない。",
        },
        signature: "policy",
      },
      {
        id: "171880",
        name: "和田 詩織",
        nameEn: "Shiori Wada",
        role: "経理",
        career: "1年",
        thoughts: {
          house: "見積もり一枚、お客様の貯金の重みがあります。",
          customer: "見積もり一枚一枚、丁寧に処理します。",
          policy: "わからないことは、必ず聞く。",
        },
        signature: "customer",
      },
      {
        id: "258745",
        name: "久我 英一",
        nameEn: "Eiichi Kuga",
        role: "顧問",
        career: "",
        thoughts: {
          house: "30年保証は、会社が30年続く前提です。",
          customer: "会社が健全でなければ、保証は守れません。",
          policy: "若手に、経験を渡す。",
        },
        signature: "customer",
      },
    ],
  },
];

// ────────────────────────────────────────────────
// 代表2名
// ────────────────────────────────────────────────

export const REPRESENTATIVES: readonly Representative[] = [
  {
    id: "92289",
    name: "古谷 泰彦",
    nameEn: "Yasuhiko Furutani",
    role: "代表取締役社長",
    roleEn: "Representative Director, President",
    career: "38年",
    quote:
      "家づくりで一番大切なのは、価格を分かりやすくし、お客様が納得して前に進めることです。\nその納得を守るために、私たちは土地、設計、施工、そして現場で働く人の力まで、ひとつずつ丁寧に整えてきました。",
  },
  {
    id: "92290",
    name: "小林 敬昌",
    nameEn: "Takamasa Kobayashi",
    role: "代表取締役専務",
    roleEn: "Representative Director, Executive",
    career: "25年",
    quote:
      "図面や仕様書に書かれた内容を、現場で確かな形にする。\nその積み重ねが、住んでからの安心につながると考えています。",
  },
] as const;

// ────────────────────────────────────────────────
// ラベル・フィルター
// ────────────────────────────────────────────────

export const THOUGHT_LABELS: Record<SignatureKey, string> = {
  house: "家とは",
  customer: "お客様へ",
  policy: "信条",
};

export const PHOTO_FILTER = "grayscale(0.7) saturate(1.1) contrast(1.04)";
export const PHOTO_FILTER_HOVER = "grayscale(0.3) saturate(1.15) contrast(1.05)";

// 17人のスタッフをフラットに取得(モザイク用)
export const FLAT_STAFF: Staff[] = PHASES.flatMap((p) => p.staff);
export const TOTAL_PEOPLE = FLAT_STAFF.length + REPRESENTATIVES.length;
