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

// JSON の photos フィールドは外部 URL。新サイトでは /images/voices/[id]_[n].webp を参照
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
