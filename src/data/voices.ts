import voicesJson from "./voices.json";

/** お客様の声カテゴリタグ — 7種、サイト主要セクションと1:1対応 */
export const VOICE_TAGS = [
  "価格",
  "標準仕様",
  "土地探し",
  "スタッフ対応",
  "間取り設計",
  "資金計画",
  "アフター",
] as const;

export type VoiceTag = (typeof VOICE_TAGS)[number];

export type Voice = {
  id: string;
  title: string;
  area: string;
  familyName: string;
  staff: string;
  staffId: string;
  photos: string[];
  qas: { q: string; a: string }[];
  /** scripts/estimate-voice-tags.cjs で自動推定したタグ。専務確認後に手動修正可。*/
  tags?: VoiceTag[];
  /** 口コミ表紙に使う1枚の絶対パス（VOICES で付与）。*/
  cover?: string;
};

// 各物件の「最も美しい1枚」＝口コミ表紙の写真番号（1始まり / {id}_{N}.webp）。
// 2026-06-24 ビジョン選定（構図・採光・住宅の扉絵としての強さで全195枚から選抜）。写真1枚のみの物件は 1。
const COVER_INDEX: Record<string, number> = {
  "189512": 2, "190536": 4, "190539": 1, "191770": 1, "194874": 3,
  "194878": 2, "194895": 2, "195279": 3, "196894": 1, "196895": 3,
  "199927": 3, "202180": 3, "208786": 3, "208787": 3, "212486": 1,
  "212487": 3, "216803": 4, "216805": 3, "216807": 1, "216808": 3,
  "216809": 3, "225603": 2, "225610": 3, "225612": 4, "237069": 1,
  "237070": 5, "237071": 4, "237073": 1, "237075": 1, "237085": 3,
  "239137": 1, "239226": 1, "239243": 1, "240061": 1, "242157": 4,
  "242954": 4, "251571": 3, "255707": 3, "255712": 3, "256807": 1,
  "256824": 4, "256825": 2, "256834": 3, "262228": 3, "262235": 1,
  "265580": 4, "276846": 3, "276882": 3, "279070": 3, "279076": 4,
};

// JSON の photos は旧 CDN URL。ビルド資産は public/images/voices/[id]_[n].webp（npm run download:voice-images）
export const VOICES: (Voice & { cover: string })[] = (voicesJson as Voice[]).map((v) => ({
  ...v,
  photos: v.photos.map((_, i) => `/images/voices/${v.id}_${i + 1}.webp`),
  cover: `/images/voices/${v.id}_${COVER_INDEX[v.id] ?? 1}.webp`,
}));

export function getVoice(id: string): Voice | undefined {
  return VOICES.find((v) => v.id === id);
}

export function getAllVoiceIds(): string[] {
  return VOICES.map((v) => v.id);
}
