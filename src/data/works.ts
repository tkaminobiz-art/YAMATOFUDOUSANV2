// 施工事例データ。トップページの teaser と /works 詳細ページの両方から参照する。
// [要確認] 家族構成・課題・解決・コメント・担当スタッフは仮データ。後日実データに差し替え。

export type FeaturedWork = {
  id: string;
  title: string;
  model: string;
  spec: string;
  family: string;
  challenge: string;
  solution: string;
  comment: string;
  staffSales: string;
  staffDesign: string;
  main: string;
  subs: readonly string[];
};

export type GridWork = {
  area: string;
  image: string;
};

export const FEATURED_WORKS: readonly FeaturedWork[] = [
  {
    id: "case1",
    title: "奈良市 T様邸",
    model: "花モデル",
    spec: "33坪 / 4LDK",
    family: "ご夫婦 + お子様2人",
    challenge: "広めの家族空間と、収納の両立",
    solution: "20帖LDK + 大空間収納4帖",
    comment:
      "打ち合わせに行くたびに「今日は誰に会うの？」と子どもが楽しみにしていました。",
    staffSales: "西口・クロフォード・丈",
    staffDesign: "栗野 佑也",
    main: "/images/works/case1-ext.webp",
    subs: ["/images/works/case1-living.webp", "/images/works/case1-kitchen.webp"],
  },
  {
    id: "case2",
    title: "大和郡山市 S様邸",
    model: "風モデル",
    spec: "30坪 / 4LDK",
    family: "ご夫婦 + お子様1人",
    challenge: "共働きでも、効率的に家事をこなしたい",
    solution: "家事ラク動線 + 広めのパントリー",
    comment:
      "帰宅後の家事動線が劇的に楽になりました。共働きにはありがたいです。",
    staffSales: "山岡 洋一",
    staffDesign: "河野 英宣",
    main: "/images/works/case2-ext.webp",
    subs: ["/images/works/case2-living.webp", "/images/works/case2-kitchen.webp"],
  },
  {
    id: "case3",
    title: "生駒市 M様邸",
    model: "京モデル",
    spec: "28坪 / 3LDK",
    family: "ご夫婦",
    challenge: "コンパクトな土地でも、ゆとりある空間に",
    solution: "吹き抜け + 開放的なLDK",
    comment: "狭い土地だったけど、吹き抜けで広々暮らせています。",
    staffSales: "田中 信次",
    staffDesign: "岩佐 篤志",
    main: "/images/works/case3-ext.webp",
    subs: ["/images/works/case3-living.webp", "/images/works/case3-entrance.webp"],
  },
];

export const GRID_WORKS: readonly GridWork[] = [
  { area: "奈良市", image: "/images/works/works-01.webp" },
  { area: "京田辺市", image: "/images/works/works-02.webp" },
  { area: "橿原市", image: "/images/works/works-03.webp" },
  { area: "天理市", image: "/images/works/works-04.webp" },
  { area: "斑鳩町", image: "/images/works/works-05.webp" },
];

export const TOTAL_WORKS_COUNT =
  FEATURED_WORKS.length + GRID_WORKS.length;
