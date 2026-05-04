// 施工事例データ。トップページの teaser と /works 詳細ページの両方から参照する。
// [要確認] 家族構成・課題・解決・コメント・担当スタッフは仮データ。後日実データに差し替え。
//
// 2026-04-30 専務レビュー反映:
// 「お客さんごとの良い間取りを載せて、ルームツアー動画を流せたり」
// → roomTour フィールドを追加。動画(YouTube/直接URL)があれば各事例に埋め込み可能に。
//   現時点で動画素材が無い場合は省略可(オプショナル)。
//
// 2026-05-04 トップ価格訴求との接続(C15):
// → priceRange / planType / baseSpec / optionDiff を追加。
//   「いくらくらい？花/風/京どれに近い？標準仕様だけ？追加した部分は？」
//   に施工事例側で答えられるようにする。
//   ※全件「想定値」で初期化済み。専務レビュー後に実データに差し替え予定。

export type RoomTourVideo = {
  /** YouTube動画ID(例: "dQw4w9WgXcQ") または 動画ファイルURL(例: "/videos/case1-tour.mp4") */
  src: string;
  /** "youtube" | "mp4" */
  kind: "youtube" | "mp4";
  /** ポスター画像(任意) */
  poster?: string;
  /** 動画尺(秒・任意) */
  durationSec?: number;
  /** 一行説明(任意) */
  caption?: string;
};

/** 施工事例カードに表示する価格帯/プラン/仕様情報 — 全件想定値・要専務確認 */
export type WorkCaseMeta = {
  /** 価格帯(粗め): 例 "2,500万円台" "2,500万円台後半" */
  priceRange?: string;
  /** プラン分類: "花" | "風" | "京" | "自由設計" */
  planType?: "花" | "風" | "京" | "自由設計";
  /** 標準仕様への寄り方 */
  baseSpec?: "標準仕様中心" | "標準仕様+一部オプション" | "オプション中心";
  /** 主な追加・カスタマイズ箇所(0-3件) */
  optionDiff?: readonly string[];
};

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
  roomTour?: RoomTourVideo;
  /** 価格帯・プラン・仕様情報 — 想定値、要専務確認 */
  meta?: WorkCaseMeta;
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
    // [想定値・要専務確認] 花 base 2,480万円 + 33坪 + 大空間収納/LDK拡張 → 2,500万円台後半
    meta: {
      priceRange: "2,500万円台後半",
      planType: "花",
      baseSpec: "標準仕様+一部オプション",
      optionDiff: ["20帖LDK拡張", "大空間収納4帖", "造作収納"],
    },
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
    // [想定値・要専務確認] 風 base 2,480万円 + 30坪 + パントリー/動線設計 → 2,500万円台
    meta: {
      priceRange: "2,500万円台",
      planType: "風",
      baseSpec: "標準仕様中心",
      optionDiff: ["パントリー拡張", "家事ラク動線設計"],
    },
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
    // [想定値・要専務確認] 京 base 2,280万円 + 28坪 + 吹き抜け/開放LDK → 2,300万円台
    meta: {
      priceRange: "2,300万円台",
      planType: "京",
      baseSpec: "標準仕様+一部オプション",
      optionDiff: ["吹き抜け", "開放的LDK"],
    },
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
