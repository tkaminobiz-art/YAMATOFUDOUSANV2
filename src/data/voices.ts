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

/**
 * 旧サイト（ASP / cdn.img-asp.jp）と同一の代表写真（JSON の 1 枚目）。
 * 自社ホストの `/images/voices/*` が未配置でもトップ等で正しい写真を表示するために使う。
 */
export function getVoiceLegacyCoverUrl(voiceId: string): string | undefined {
  const raw = (voicesJson as Voice[]).find((v) => v.id === voiceId);
  const first = raw?.photos?.[0];
  return typeof first === "string" && first.startsWith("http") ? first : undefined;
}
