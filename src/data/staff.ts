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
          house: "一生で、一番大きな買い物です。",
          customer: "数字の話も、遠慮せず聞いてください。",
          policy: "良い家より、納得できる家を。",
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
          house: "土地選びから、もう始まっています。",
          customer: "京都の土地は、足で歩いて探します。",
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
          house: "家族の空気が、一番濃くなる場所。",
          customer: "最初の打ち合わせから、全力で考えます。",
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
          house: "家族が、今日帰ってくる場所です。",
          customer: "LINEで聞いてください。すぐ返します。",
          policy: "わかりやすく、正直に話す。",
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
          house: "家族の未来が、決まる場所。",
          customer: "若手だからこそ、真剣に聞きます。",
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
          customer: "古くならない家を、設計します。",
          policy: "流行に流されず、骨をつくる。",
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
          house: "家族の時間の、器です。",
          customer: "間取りは、一緒に考えます。",
          policy: "一本の線に、二十年分の重み。",
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
          house: "図面の向こうに、家族の朝晩が見える。",
          customer: "ご要望を、一度で理解しようとしません。",
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
          house: "地面があって、初めて建つものです。",
          customer: "地盤のことで、後悔させません。",
          policy: "土を見て、水の流れを読む。",
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
          house: "毎日、現場で触れている素材の集まり。",
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
          house: "二十年、三十年、残るもの。",
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
          house: "先輩から学んだ、技の積み重ね。",
          customer: "お名前を覚えて、現場でお会いします。",
          policy: "まだ学ぶことだらけ、毎日真剣です。",
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
          house: "誰かの生活の、これからが入る空間。",
          customer: "工期は、きっちり守ります。",
          policy: "新しいことを、恐れない。",
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
          house: "日本で学んだ、家づくりの丁寧さ。",
          customer: "言葉より、仕事で応えます。",
          policy: "どんな小さな作業も、手を抜かない。",
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
          house: "家族の資産、そのものです。",
          customer: "経理の透明性は、当社の信頼です。",
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
          house: "お客様から預かった、大切なお金の行き先。",
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
          house: "企業が世代を超えて関わる、長い仕事。",
          customer: "会社の健全さで、お客様をお守りします。",
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
    quote: "値段を守ることは、職人を守ること。この順番は、変えません。",
  },
  {
    id: "92290",
    name: "小林 敬昌",
    nameEn: "Takamasa Kobayashi",
    role: "代表取締役専務",
    roleEn: "Representative Director, Executive",
    career: "25年",
    quote: "仕様書に書ける品質は、半分だけ。残り半分は、現場で作る。",
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
