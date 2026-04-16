import voicesJson from "./voices.json";

export type Voice = {
  id: string;
  title: string;
  area: string;
  familyName: string;
  staff: string;
  staffId: string;
  photos: string[];
  qas: { q: string; a: string }[];
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
