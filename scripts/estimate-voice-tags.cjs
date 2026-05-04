#!/usr/bin/env node
/*
  estimate-voice-tags.cjs — voices の Q&A 本文からタグを自動推定。
  対応タグ(7種): 価格 / 標準仕様 / 土地探し / スタッフ対応 / 間取り設計 / 資金計画 / アフター
  - 全 Q+A を連結した本文を正規表現でスキャン
  - 確度の低いマッチは付与しない(false negative寄り)
  - 結果を src/data/voices.json に "tags": [...] フィールドとしてマージ書込み
  - 想定値の扱い: 行コメントは JSON に書けないので、各 voice の estimatedTags に
    なる。専務確認後に手動修正してOK
*/
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "src/data/voices.json");
const data = JSON.parse(fs.readFileSync(SRC, "utf-8"));

// タグ定義: 各タグに対して「マッチすべきパターン」を複数指定。1つでも当たれば付与。
// パターンは false-negative 寄り(精度優先)。曖昧な語は除外。
const TAG_RULES = [
  {
    tag: "価格",
    patterns: [
      /(価格|費用|お値段|金額)(が|に|の|を|も|で|について)?.{0,15}(分か|わか|納得|安心|明確|オープン|信頼|提示)/,
      /(分か|わか).{0,5}やす(い|く|さ).{0,15}(価格|費用|料金|金額|お値段)/,
      /コミコミ/,
      /(価格|料金).?設定/,
      /追加(費用|料金).{0,10}(無|なし|ない|出ない|発生しな|かから)/,
      /(見積|お見積).{0,15}(明確|細かく|分かりやす|わかりやす|信頼|納得|見える|オープン|細か)/,
      /リーズナブル|コスパ|コストパフォーマンス/,
      /予算.{0,10}(範囲|内|相談|オーバーしな|抑え)/,
      /他社(と|より|に比べて).{0,15}(安|手頃|お得|リーズナブル|コスト)/,
      /実際の(費用|金額|価格).{0,15}(提示|分か|わか|オープン|細か)/,
      /明朗会計|オープンプライス/,
    ],
  },
  {
    tag: "標準仕様",
    patterns: [
      /標準(設備|仕様|装備)/,
      /ハイグレード/,
      /設備.*?(良|よ|充実|豊富|ハイ|グレード高|標準で)/,
      /断熱.*?(性能|高い|充実|標準)/,
      /(キッチン|浴室|サッシ|断熱材|床暖|オール電化).*?(標準|優秀|高性能|よかっ|よくて|ハイ)/,
      /他社.*?標準/,
    ],
  },
  {
    tag: "土地探し",
    patterns: [
      /土地(探し|の選定|の相談|を探|探す|から|の紹介)/,
      /分譲(地)?.*?(紹介|相談|提案|公開)/,
      /建売.*?(土地|候補)/,
      /(矢田|分譲地|公開区画|エリア).*?(紹介|提案|案内)/,
    ],
  },
  {
    tag: "スタッフ対応",
    patterns: [
      /(担当|営業|設計|スタッフ|工務|現場監督).*?(誠実|丁寧|親切|信頼|レスポンス|早|迅速|安心|頼り|熱心|相談しやす|親身|分かりやす|明るく|フレンドリ|誠意)/,
      /(担当|営業|設計).*?(の方|さん|者).*?(良|よか|素晴|親切|丁寧)/,
      /(対応|応対).*?(早|速|親切|丁寧|誠実|的確|安心|柔軟)/,
      /人柄/,
      /誠実(さ|な対応)/,
      /親身(に|で|な)/,
      /寄り?添(っ|い|う)/,
      /気にかけ/,
      /(細やか|きめ細か|細かやか)/,
    ],
  },
  {
    tag: "間取り設計",
    patterns: [
      /(間取り|プラン).*?(自由|提案|工夫|考え|相談|柔軟|納得|希望|要望|理想)/,
      /自由設計/,
      /設計.*?(柔軟|自由|提案|工夫|綿密|細かく)/,
      /(リビング|LDK|キッチン|玄関|お風呂|浴室|和室|書斎|収納|パントリー|吹き抜け|ウッドデッキ).*?(広|大|工夫|こだわ)/,
      /家事動線/,
    ],
  },
  {
    tag: "資金計画",
    patterns: [
      /資金計画/,
      /住宅ローン/,
      /(月々|月額|月の).*?(返済|支払|負担)/,
      /(つなぎ融資|つなぎローン)/,
      /FP|ファイナンシャルプランナ/,
      /予算.*?(相談|範囲|内|オーバー|心配|不安)/,
    ],
  },
  {
    tag: "アフター",
    patterns: [
      /アフター(サービス|対応|フォロー|メンテナンス)/,
      /(引(き)?渡し|入居).*?(後|の後|してから).*?(対応|連絡|フォロー|メンテ|相談|安心)/,
      /(保証|定期点検|10年|20年|長期).*?(安心|充実|しっかり|丁寧|対応)/,
      /(住み始めて|住んでから|建ててから).*?(問題|トラブル|相談).*?(対応|フォロー|連絡)/,
    ],
  },
];

let totalTags = 0;
const tagCounts = Object.fromEntries(TAG_RULES.map(r => [r.tag, 0]));
const sampleByTag = Object.fromEntries(TAG_RULES.map(r => [r.tag, []]));

const out = data.map((v) => {
  // 全 Q + A を連結
  const text = (v.qas || []).map(qa => `${qa.q || ""} ${qa.a || ""}`).join("\n");
  const matched = [];
  for (const rule of TAG_RULES) {
    for (const re of rule.patterns) {
      if (re.test(text)) {
        matched.push(rule.tag);
        tagCounts[rule.tag]++;
        if (sampleByTag[rule.tag].length < 2) sampleByTag[rule.tag].push(v.id);
        break;
      }
    }
  }
  if (matched.length > 0) totalTags += matched.length;
  return { ...v, tags: matched };
});

fs.writeFileSync(SRC, JSON.stringify(out, null, 2) + "\n", "utf-8");

console.log(`Total voices: ${out.length}`);
console.log(`Total tag assignments: ${totalTags}`);
console.log(`Avg tags per voice: ${(totalTags / out.length).toFixed(2)}`);
console.log("\nTag distribution:");
for (const [tag, count] of Object.entries(tagCounts)) {
  const samples = sampleByTag[tag].slice(0, 2).join(", ");
  console.log(`  ${tag.padEnd(8)} ${String(count).padStart(3)}/${out.length}  (sample: ${samples})`);
}
const noTag = out.filter(v => !v.tags || v.tags.length === 0);
console.log(`\nVoices with NO tags: ${noTag.length}`);
if (noTag.length > 0 && noTag.length <= 10) {
  console.log("  IDs:", noTag.map(v => v.id).join(", "));
}
