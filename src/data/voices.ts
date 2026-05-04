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
};

// JSON の photos は旧 CDN URL。ビルド資産は public/images/voices/[id]_[n].webp（npm run download:voice-images）
export const VOICES: Voice[] = (voicesJson as Voice[]).map((v) => ({
  ...v,
  photos: v.photos.map((_, i) => `/images/voices/${v.id}_${i + 1}.webp`),
}));

export function getVoice(id: string): Voice | undefined {
  return VOICES.find((v) => v.id === id);
}

export function getAllVoiceIds(): string[] {
  return VOICES.map((v) => v.id);
}
