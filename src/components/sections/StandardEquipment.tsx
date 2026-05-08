import Link from "next/link";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  StandardEquipment — 2026-05-08 v4 (Architectural Specification Schedule)
  ---------------------------------------------------------------
  ユーザー判断: /standard-equipment-lab で **Option 03 Architectural
  Specification Schedule** を採用。建築事務所のスペック・スケジュール書類調。

  方針:
  - 純白 #FFFFFF 背景、写真ゼロ
  - 上部メタストリップ (mono): SCHEDULE / FIG.01 / SCALE 1:50 / NARA·KYOTO
  - 左 ~40%: Mincho 大見出し「この価格で、ここまで標準。」+ 短いリード
  - 右 ~60%: 4 列スペック表 (NO. / 区分 / 仕様 / STANDARD)
    各行 hairline 区切り、メーカー名は bold、詳細は muted slate

  整合性 (memory: reference_yamato_standard_spec_canonical.md):
  - 17 項目すべて旧サイト (yamatogroup.net/standardplan/) と
    プロジェクト文書 指示書/15_standard_quality.md の canonical を反映
  - LIXIL系は誤り → クリナップ / TOTO / YKK AP / 旭化成 / MIRAIE 等
  - 「80+ items」誇張は撤回。17 項目を honest に表示
  - 花モデル基準である旨を Disclaimer に明示
*/

const PALETTE = {
  bg: "#FFFFFF",
  paperWarm: "#F8F7F4",
  text: "#0E0E0D",
  textSub: "#4F4F4D",
  textMuted: "#8B8780",
  green: "#143426",
  rule: "#D8D2C8",
  ruleFaint: "#ECE8DF",
} as const;

type Spec = {
  no: string;
  category: string;
  vendor?: string; // 太字メーカー名
  detail: string;
  note?: string;
};

// 17 項目 — memory: reference_yamato_standard_spec_canonical.md
const SPECS: Spec[] = [
  { no: "01", category: "キッチン",     vendor: "クリナップ",  detail: "システムキッチン",                          note: "食洗機・IH3口 含む" },
  { no: "02", category: "食洗機",       vendor: "Miele / Panasonic", detail: "ビルトイン" },
  { no: "03", category: "浴室",         vendor: "TOTO",        detail: "ユニットバス 1616 / 保温浴槽 / 浴室暖房乾燥機" },
  { no: "04", category: "洗面台",       vendor: "TOTO",        detail: "750mm 三面鏡仕様" },
  { no: "05", category: "トイレ",       vendor: "TOTO",        detail: "ウォシュレット" },
  { no: "06", category: "玄関ドア",     vendor: "YKK AP",      detail: "Venato K4 親子ドア",                       note: "花モデルのみ顔認証付" },
  { no: "07", category: "窓サッシ",     vendor: "YKK AP",      detail: "APW330 Low-E複層ガラス / 樹脂サッシ" },
  { no: "08", category: "外壁",         vendor: "旭化成",      detail: "ヘーベルパワーボード + 窯業系サイディング 16mm" },
  { no: "09", category: "屋根",         detail: "軽量瓦 全6色 / 遮音・遮熱対応" },
  { no: "10", category: "断熱",         detail: "クレタン吹付 / 外断熱 85mm + 屋根硬質ウレタン 95mm" },
  { no: "11", category: "構造",         detail: "木造軸組 + 金物ハイブリッド工法",                                  note: "在来比 約1.5倍強度" },
  { no: "12", category: "制震",         vendor: "MIRAIE",      detail: "制震ダンパー (住友ゴム製)" },
  { no: "13", category: "給湯",         detail: "エコキュート 460L / オール電化" },
  { no: "14", category: "空調・照明",   detail: "リビング1台標準 / LED照明 / カーテン付" },
  { no: "15", category: "外構",         detail: "門柱・ポスト・表札一式 / 網戸標準" },
  { no: "16", category: "地盤保証",     detail: "20年保証" },
  { no: "17", category: "しろあり保証", detail: "10年保証" },
];

export default function StandardEquipment() {
  return (
    <section
      aria-labelledby="standard-equipment-heading"
      style={{
        background: PALETTE.bg,
        color: PALETTE.text,
        fontFamily:
          '"Hiragino Sans", "Noto Sans JP", system-ui, -apple-system, sans-serif',
        fontFeatureSettings: '"palt"',
      }}
    >
      <div className="mx-auto max-w-[1320px] px-[var(--page-px)] py-[clamp(72px,10vw,140px)]">
        {/* ─── META STRIP ─── */}
        <div
          className="border-b"
          style={{ borderColor: PALETTE.rule }}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 py-3 text-[10px] tracking-[0.22em]"
            style={{
              fontFamily: '"Inter", system-ui, sans-serif',
              color: PALETTE.textSub,
              fontWeight: 500,
            }}
          >
            <span style={{ color: PALETTE.text }}>
              やまと不動産 ─ STANDARD SPECIFICATION SCHEDULE
            </span>
            <span className="hidden md:inline">FIG. 01 &nbsp;·&nbsp; FACILITY</span>
            <span className="hidden lg:inline" style={{ color: PALETTE.text }}>
              SCALE 1 : 50
            </span>
            <span>NARA &nbsp;·&nbsp; KYOTO</span>
          </div>
        </div>

        {/* ─── 本体: 左ヘッダー + 右テーブル ─── */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-x-12 lg:gap-x-16 gap-y-12 items-start">
          {/* LEFT: 見出し + リード */}
          <div className="lg:sticky lg:top-24">
            <h2
              id="standard-equipment-heading"
              style={{
                fontFamily: '"Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif',
                fontSize: "clamp(28px, 3.6vw, 46px)",
                fontWeight: 600,
                lineHeight: 1.45,
                letterSpacing: "0.04em",
                color: PALETTE.text,
              }}
            >
              この価格で、
              <br />
              ここまで標準。
            </h2>
            <p
              className="mt-7 max-w-[460px]"
              style={{
                color: PALETTE.textSub,
                fontSize: "clamp(14px, 1vw, 15px)",
                lineHeight: 2,
              }}
            >
              毎日使う設備から、見えない部分の性能まで。
              <br />
              住んでからの快適さを支える項目を、価格に含めています。
            </p>

            {/* 凡例 */}
            <div
              className="mt-10 pt-5 inline-flex items-center gap-2.5 text-[11px]"
              style={{
                color: PALETTE.textSub,
                fontFamily: '"Inter", system-ui, sans-serif',
                letterSpacing: "0.18em",
                borderTop: `1px solid ${PALETTE.rule}`,
              }}
            >
              <span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: PALETTE.green }}
              />
              <span style={{ color: PALETTE.text, fontWeight: 500 }}>STANDARD</span>
              <span>—</span>
              <span>標準仕様に含まれる</span>
            </div>
          </div>

          {/* RIGHT: スペック表 */}
          <div>
            <table
              className="w-full"
              style={{
                borderCollapse: "collapse",
                fontFamily: '"Hiragino Sans", "Noto Sans JP", system-ui, sans-serif',
              }}
            >
              <caption className="sr-only">
                やまと不動産 標準仕様スケジュール (花モデル基準・17項目)
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-left pb-3 pr-3"
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: "10px",
                      letterSpacing: "0.24em",
                      color: PALETTE.textMuted,
                      fontWeight: 500,
                      width: "44px",
                      borderBottom: `1px solid ${PALETTE.text}`,
                    }}
                  >
                    NO.
                  </th>
                  <th
                    scope="col"
                    className="text-left pb-3 pr-3"
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: "10px",
                      letterSpacing: "0.24em",
                      color: PALETTE.textMuted,
                      fontWeight: 500,
                      width: "120px",
                      borderBottom: `1px solid ${PALETTE.text}`,
                    }}
                  >
                    区分 / CATEGORY
                  </th>
                  <th
                    scope="col"
                    className="text-left pb-3 pr-3"
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: "10px",
                      letterSpacing: "0.24em",
                      color: PALETTE.textMuted,
                      fontWeight: 500,
                      borderBottom: `1px solid ${PALETTE.text}`,
                    }}
                  >
                    仕様 / SPEC
                  </th>
                  <th
                    scope="col"
                    className="text-right pb-3"
                    style={{
                      fontFamily: '"Inter", system-ui, sans-serif',
                      fontSize: "10px",
                      letterSpacing: "0.24em",
                      color: PALETTE.textMuted,
                      fontWeight: 500,
                      width: "80px",
                      borderBottom: `1px solid ${PALETTE.text}`,
                    }}
                  >
                    STANDARD
                  </th>
                </tr>
              </thead>
              <tbody>
                {SPECS.map((spec, i) => (
                  <tr
                    key={spec.no}
                    style={{
                      borderBottom: `1px solid ${i === SPECS.length - 1 ? PALETTE.text : PALETTE.rule}`,
                    }}
                  >
                    <td
                      className="py-4 pr-3 align-top"
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: "12px",
                        color: PALETTE.textMuted,
                        fontWeight: 400,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {spec.no}
                    </td>
                    <td
                      className="py-4 pr-3 align-top"
                      style={{
                        fontSize: "13px",
                        color: PALETTE.text,
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {spec.category}
                    </td>
                    <td
                      className="py-4 pr-3 align-top"
                      style={{
                        fontSize: "13px",
                        color: PALETTE.textSub,
                        lineHeight: 1.7,
                      }}
                    >
                      {spec.vendor && (
                        <span
                          className="inline-block mr-1.5"
                          style={{ color: PALETTE.text, fontWeight: 600 }}
                        >
                          {spec.vendor}
                        </span>
                      )}
                      <span>{spec.detail}</span>
                      {spec.note && (
                        <span
                          className="block mt-1 text-[11.5px]"
                          style={{ color: PALETTE.textMuted, letterSpacing: "0.02em" }}
                        >
                          ({spec.note})
                        </span>
                      )}
                    </td>
                    <td
                      className="py-4 text-right align-top"
                      style={{ color: PALETTE.green }}
                    >
                      <span
                        aria-hidden
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: PALETTE.green }}
                      />
                      <span className="sr-only">標準仕様に含まれる</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 表フッター */}
            <p
              className="mt-6 text-center text-[10.5px] tracking-[0.32em] uppercase"
              style={{
                color: PALETTE.textMuted,
                fontFamily: '"Inter", system-ui, sans-serif',
                fontWeight: 500,
              }}
            >
              ─── End of schedule &nbsp;·&nbsp; 17 items ───
            </p>
          </div>
        </div>

        {/* ─── CTA バー (StandardComparisonBlueprint と同型・縦リズム維持) ─── */}
        <div
          className="mt-14 md:mt-16"
          style={{
            background: PALETTE.paperWarm,
            border: `1px solid ${PALETTE.rule}`,
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-px"
            style={{ background: PALETTE.rule }}
          >
            <div
              className="p-6 md:p-8"
              style={{ background: PALETTE.paperWarm }}
            >
              <p
                className="text-[10.5px] tracking-[0.32em] uppercase"
                style={{
                  color: PALETTE.textSub,
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontWeight: 500,
                }}
              >
                Next Step
              </p>
              <p
                className="mt-3 text-[14px] md:text-[15px]"
                style={{ color: PALETTE.text, lineHeight: 1.85 }}
              >
                実物の質感や使い勝手は、モデルハウスでご確認いただけます。
              </p>
            </div>
            <CtaCard
              href={LINE_ADD_FRIEND_URL}
              external
              icon={<MessageCircle className="w-4 h-4" strokeWidth={1.5} />}
              label="LINEで相談する"
              sub="気軽にご質問いただけます"
            />
            <CtaCard
              href="/reserve"
              icon={<Calendar className="w-4 h-4" strokeWidth={1.5} />}
              label="モデルハウスを見学する"
              sub="標準仕様を体感できます"
            />
          </div>
        </div>

        {/* ─── 注意書き ─── */}
        <div
          className="mt-7 md:mt-9 text-[11px] md:text-[11.5px] space-y-1"
          style={{ color: PALETTE.textSub, lineHeight: 1.85 }}
        >
          <p>※ 上記は花モデル (2,480万円〜) を基準とした標準仕様です。風・京モデルは一部仕様が異なります。</p>
          <p>※ 仕様・メーカー・型番はプランや時期により変更となる場合があります。詳細はご来場時にご案内します。</p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// CtaCard (StandardComparisonBlueprint と同型)
// ───────────────────────────────────────────
function CtaCard({
  href,
  external,
  icon,
  label,
  sub,
}: {
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  const content = (
    <>
      <span
        className="inline-flex items-center justify-center w-9 h-9 shrink-0 rounded-full"
        style={{ background: PALETTE.green, color: "#ffffff" }}
        aria-hidden
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13.5px] md:text-[14.5px]"
          style={{ color: PALETTE.text, fontWeight: 500, letterSpacing: "0.02em" }}
        >
          {label}
        </p>
        <p
          className="mt-0.5 text-[11.5px]"
          style={{ color: PALETTE.textSub, lineHeight: 1.6 }}
        >
          {sub}
        </p>
      </div>
      <ArrowRight
        className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0"
        strokeWidth={1.5}
        style={{ color: PALETTE.green }}
      />
    </>
  );

  const className = "group flex items-center gap-4 p-6 md:p-7 transition-colors";
  const style = { background: PALETTE.paperWarm };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {content}
    </Link>
  );
}
