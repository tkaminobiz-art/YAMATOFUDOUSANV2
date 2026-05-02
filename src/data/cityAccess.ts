/*
  cityAccess.ts — 2026-04-30
  ---------------------------------------------------------------
  小林専務レビュー(2026-04-28)反映:
  「他府県の人は住所だけ言われても場所がわからへん」
  「大阪や京都から奈良に越してくる人は多い」

  各市町村→大阪/京都までの所要時間目安。
  鉄道公式の所要時間ベース(乗換含む概算/平日昼間/最短ルート)。
  ※ 個別物件で変動するため "市町村の代表駅" の値を採用。
  ※ サイトでは "目安" と明示する。
*/

export type CityAccess = {
  city: string;
  representativeStation: string;
  toOsaka?: { station: string; minutes: number };
  toKyoto?: { station: string; minutes: number };
  toNara?: { station: string; minutes: number };
  vibe?: string; // ひとこと
};

export const CITY_ACCESS: Record<string, CityAccess> = {
  奈良市: {
    city: "奈良市",
    representativeStation: "近鉄奈良",
    toOsaka: { station: "大阪難波", minutes: 35 },
    toKyoto: { station: "京都", minutes: 35 },
    vibe: "歴史と文化、子育て世代に人気のエリア。",
  },
  大和郡山市: {
    city: "大和郡山市",
    representativeStation: "近鉄郡山",
    toOsaka: { station: "大阪難波", minutes: 40 },
    toKyoto: { station: "京都", minutes: 50 },
    vibe: "金魚と城下町。奈良中心部までも近い。",
  },
  天理市: {
    city: "天理市",
    representativeStation: "天理",
    toOsaka: { station: "大阪鶴橋", minutes: 45 },
    toKyoto: { station: "京都", minutes: 60 },
    vibe: "落ち着いた住宅環境と、確かな生活インフラ。",
  },
  桜井市: {
    city: "桜井市",
    representativeStation: "桜井",
    toOsaka: { station: "大阪上本町", minutes: 50 },
    toKyoto: { station: "京都", minutes: 75 },
    vibe: "万葉の里。奈良南部のゆったりした時間。",
  },
  橿原市: {
    city: "橿原市",
    representativeStation: "大和八木",
    toOsaka: { station: "大阪上本町", minutes: 35 },
    toKyoto: { station: "京都", minutes: 55 },
    vibe: "大阪・京都どちらにも乗換少なく出やすい結節点。",
  },
  生駒市: {
    city: "生駒市",
    representativeStation: "生駒",
    toOsaka: { station: "大阪難波", minutes: 20 },
    toKyoto: { station: "京都", minutes: 60 },
    vibe: "大阪通勤に最強。奈良で一番近い大阪圏。",
  },
  生駒郡斑鳩町: {
    city: "生駒郡斑鳩町",
    representativeStation: "法隆寺",
    toOsaka: { station: "大阪天王寺", minutes: 35 },
    toKyoto: { station: "京都", minutes: 50 },
    vibe: "法隆寺のお膝元、子育てに穏やかなエリア。",
  },
  斑鳩町: {
    city: "斑鳩町",
    representativeStation: "法隆寺",
    toOsaka: { station: "大阪天王寺", minutes: 35 },
    toKyoto: { station: "京都", minutes: 50 },
    vibe: "法隆寺のお膝元、子育てに穏やかなエリア。",
  },
  磯城郡田原本町: {
    city: "磯城郡田原本町",
    representativeStation: "田原本",
    toOsaka: { station: "大阪上本町", minutes: 40 },
    toKyoto: { station: "京都", minutes: 65 },
    vibe: "奈良の真ん中。生活コストが抑えやすい。",
  },
  田原本町: {
    city: "田原本町",
    representativeStation: "田原本",
    toOsaka: { station: "大阪上本町", minutes: 40 },
    toKyoto: { station: "京都", minutes: 65 },
    vibe: "奈良の真ん中。生活コストが抑えやすい。",
  },
  京田辺市: {
    city: "京田辺市",
    representativeStation: "新田辺",
    toOsaka: { station: "大阪難波", minutes: 45 },
    toKyoto: { station: "京都", minutes: 25 },
    vibe: "京都市内に約25分。京阪神どこも視野に。",
  },
  京都市: {
    city: "京都市",
    representativeStation: "桃山南口",
    toOsaka: { station: "大阪淀屋橋", minutes: 50 },
    toKyoto: { station: "京都", minutes: 12 },
    vibe: "京都市内、暮らしの利便性は折り紙付き。",
  },
  木津川市: {
    city: "木津川市",
    representativeStation: "木津",
    toOsaka: { station: "大阪天王寺", minutes: 60 },
    toKyoto: { station: "京都", minutes: 35 },
    toNara: { station: "近鉄奈良", minutes: 15 },
    vibe: "京都・奈良どちらも30分圏。学術文化都市。",
  },
  長岡京市: {
    city: "長岡京市",
    representativeStation: "長岡京",
    toOsaka: { station: "大阪", minutes: 30 },
    toKyoto: { station: "京都", minutes: 12 },
    vibe: "京都・大阪のちょうど中間、両方が近い。",
  },
};

/**
 * 物件のfields.交通から駅徒歩◯分を抽出
 * 例: "近鉄京都線「新田辺」駅 徒歩6分 ..." → 6
 *     "関西本線「大和小泉」駅 徒歩26分" → 26
 */
export function extractWalkMinutes(transport: string | undefined): number | null {
  if (!transport) return null;
  const match = transport.match(/徒歩(\d+)分/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

/**
 * 物件のfields.交通から最寄駅名を抽出
 * 例: "近鉄京都線「新田辺」駅 徒歩6分" → "新田辺"
 */
export function extractStation(transport: string | undefined): string | null {
  if (!transport) return null;
  const match = transport.match(/「([^」]+)」/);
  if (!match) return null;
  return match[1];
}

/**
 * 暮らし方タグの自動推論(物件単位)
 */
export function inferLifestyleTags(
  city: string,
  transport: string | undefined
): string[] {
  const tags: string[] = [];
  const walk = extractWalkMinutes(transport);

  if (walk !== null) {
    if (walk <= 7) tags.push("駅近");
    else if (walk <= 15) tags.push("駅徒歩圏");
  }

  const access = CITY_ACCESS[city];
  if (access?.toOsaka && access.toOsaka.minutes <= 30) {
    tags.push("大阪通勤圏");
  }
  if (access?.toKyoto && access.toKyoto.minutes <= 25) {
    tags.push("京都通勤圏");
  }

  return tags;
}
