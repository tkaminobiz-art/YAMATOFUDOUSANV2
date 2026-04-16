"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  【KEY PEOPLE】セクション ─ 2026-04-16 大型リデザイン
  方針:
  - 代表2名は「最後に」「控えめに」配置(序列ではなく支える側)
  - スタッフ17名が主役。各自に 家/お客様/信条 の3つの思いを持たせる
  - 統一モノクロ化 + カタログ積層型の視覚言語

  構造:
    INTRO → PHASE 01〜04 (17名) → LEADERSHIP (代表2名)

  コピーは Claude による一次稿。後日、各本人に確認 → 本番反映。
*/

// ────────────────────────────────────────────────
// 型定義
// ────────────────────────────────────────────────

type Thoughts = {
  house: string; // 家とは
  customer: string; // お客様へ
  policy: string; // 信条
};

type SignatureKey = "house" | "customer" | "policy";

type Staff = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  career: string; // "15年" / "" (空文字で非表示)
  thoughts: Thoughts;
  signature: SignatureKey;
};

type Phase = {
  num: string;
  deptEn: string; // "SALES" "DESIGN" etc.
  title: string;
  subtitle: string;
  staff: Staff[];
};

type Representative = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  career: string;
  quote: string;
};

// ────────────────────────────────────────────────
// スタッフデータ (17名 — 代表2名を除く)
// ────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    num: "01",
    deptEn: "SALES",
    title: "最初に、お話を伺う。",
    subtitle: "営業 — ご相談からご契約まで",
    staff: [
      {
        id: "100104",
        name: "田中 信次",
        nameEn: "Shinji Tanaka",
        role: "営業本部長",
        career: "15年",
        thoughts: {
          house: "一生で、一番大きな買い物です。",
          customer: "数字の話も、遠慮せず聞いてください。",
          policy: "良い家より、納得できる家を。",
        },
        signature: "policy",
      },
      {
        id: "147195",
        name: "西口・クロフォード・丈",
        nameEn: "Joe N. Crawford",
        role: "営業課長",
        career: "12年",
        thoughts: {
          house: "家族の空気が、一番濃くなる場所。",
          customer: "最初の打ち合わせから、全力で考えます。",
          policy: "提案は、お客様の数だけ変える。",
        },
        signature: "house",
      },
      {
        id: "157200",
        name: "山岡 洋一",
        nameEn: "Yoichi Yamaoka",
        role: "京都支店長",
        career: "14年",
        thoughts: {
          house: "土地選びから、もう始まっています。",
          customer: "京都の土地は、足で歩いて探します。",
          policy: "いい土地は、お客様と見に行く。",
        },
        signature: "customer",
      },
      {
        id: "218450",
        name: "柏崎 修平",
        nameEn: "Shuhei Kashiwazaki",
        role: "本店営業部",
        career: "7年",
        thoughts: {
          house: "家族が、今日帰ってくる場所です。",
          customer: "LINEで聞いてください。すぐ返します。",
          policy: "わかりやすく、正直に話す。",
        },
        signature: "customer",
      },
      {
        id: "258798",
        name: "三野 雄資",
        nameEn: "Yusuke Mino",
        role: "営業部",
        career: "3年",
        thoughts: {
          house: "家族の未来が、決まる場所。",
          customer: "若手だからこそ、真剣に聞きます。",
          policy: "ひとつ質問されたら、三つ答える。",
        },
        signature: "policy",
      },
    ],
  },
  {
    num: "02",
    deptEn: "DESIGN",
    title: "理想を、図面にする。",
    subtitle: "設計 — 初回の打ち合わせから同席する、自社設計士",
    staff: [
      {
        id: "126651",
        name: "河野 英宣",
        nameEn: "Hidenobu Kono",
        role: "開発設計部 部長",
        career: "30年",
        thoughts: {
          house: "奈良の土地と、三十年向き合ってきました。",
          customer: "古くならない家を、設計します。",
          policy: "流行に流されず、骨をつくる。",
        },
        signature: "policy",
      },
      {
        id: "126646",
        name: "栗野 佑也",
        nameEn: "Yuya Kurino",
        role: "住宅設計部 責任者",
        career: "13年",
        thoughts: {
          house: "家族の時間の、器です。",
          customer: "間取りは、一緒に考えます。",
          policy: "一本の線に、二十年分の重み。",
        },
        signature: "policy",
      },
      {
        id: "194526",
        name: "岩佐 篤志",
        nameEn: "Atsushi Iwasa",
        role: "建築設計部",
        career: "13年",
        thoughts: {
          house: "図面の向こうに、家族の朝晩が見える。",
          customer: "ご要望を、一度で理解しようとしません。",
          policy: "模型を作ってから、線を引く。",
        },
        signature: "house",
      },
    ],
  },
  {
    num: "03",
    deptEn: "CONSTRUCTION",
    title: "現場で、形にする。",
    subtitle: "土木・工務 — 土地造成から竣工まで",
    staff: [
      {
        id: "170083",
        name: "森下 嘉久",
        nameEn: "Yoshihisa Morishita",
        role: "本店土木部 部長",
        career: "37年",
        thoughts: {
          house: "地面があって、初めて建つものです。",
          customer: "地盤のことで、後悔させません。",
          policy: "土を見て、水の流れを読む。",
        },
        signature: "customer",
      },
      {
        id: "92140",
        name: "入江 将大",
        nameEn: "Masahiro Irie",
        role: "本社工務部 部長",
        career: "20年",
        thoughts: {
          house: "毎日、現場で触れている素材の集まり。",
          customer: "見えない部分ほど、丁寧にやります。",
          policy: "現場で木の温度を、手で確かめる。",
        },
        signature: "policy",
      },
      {
        id: "159106",
        name: "稲塚 康員",
        nameEn: "Yasukazu Inatsuka",
        role: "本店工務部",
        career: "6年",
        thoughts: {
          house: "二十年、三十年、残るもの。",
          customer: "工事中も、気軽に声をかけてください。",
          policy: "ミリ単位で、合わせる。",
        },
        signature: "policy",
      },
      {
        id: "58990",
        name: "澤 佳純",
        nameEn: "Kasumi Sawa",
        role: "本店工務部",
        career: "2年",
        thoughts: {
          house: "先輩から学んだ、技の積み重ね。",
          customer: "お名前を覚えて、現場でお会いします。",
          policy: "まだ学ぶことだらけ、毎日真剣です。",
        },
        signature: "policy",
      },
      {
        id: "258809",
        name: "尾田 洋基",
        nameEn: "Hiroki Oda",
        role: "本社工務部",
        career: "2年",
        thoughts: {
          house: "誰かの生活の、これからが入る空間。",
          customer: "工期は、きっちり守ります。",
          policy: "新しいことを、恐れない。",
        },
        signature: "customer",
      },
      {
        id: "218454",
        name: "イスル サンパツ",
        nameEn: "Isuru Sampath",
        role: "土木部・工務部",
        career: "",
        thoughts: {
          house: "日本で学んだ、家づくりの丁寧さ。",
          customer: "言葉より、仕事で応えます。",
          policy: "どんな小さな作業も、手を抜かない。",
        },
        signature: "customer",
      },
    ],
  },
  {
    num: "04",
    deptEn: "MANAGEMENT",
    title: "全体を、支える。",
    subtitle: "経営・管理 — 会社の土台",
    staff: [
      {
        id: "92293",
        name: "多口 典子",
        nameEn: "Noriko Taguchi",
        role: "監査役員",
        career: "15年",
        thoughts: {
          house: "家族の資産、そのものです。",
          customer: "経理の透明性は、当社の信頼です。",
          policy: "数字に、嘘をつかせない。",
        },
        signature: "policy",
      },
      {
        id: "171880",
        name: "和田 詩織",
        nameEn: "Shiori Wada",
        role: "経理",
        career: "1年",
        thoughts: {
          house: "お客様から預かった、大切なお金の行き先。",
          customer: "見積もり一枚一枚、丁寧に処理します。",
          policy: "わからないことは、必ず聞く。",
        },
        signature: "customer",
      },
      {
        id: "258745",
        name: "久我 英一",
        nameEn: "Eiichi Kuga",
        role: "顧問",
        career: "",
        thoughts: {
          house: "企業が世代を超えて関わる、長い仕事。",
          customer: "会社の健全さで、お客様をお守りします。",
          policy: "若手に、経験を渡す。",
        },
        signature: "customer",
      },
    ],
  },
];

// ────────────────────────────────────────────────
// 代表2名データ
// ────────────────────────────────────────────────

const REPRESENTATIVES: readonly Representative[] = [
  {
    id: "92289",
    name: "古谷 泰彦",
    nameEn: "Yasuhiko Furutani",
    role: "代表取締役社長",
    roleEn: "Representative Director, President",
    career: "38年",
    quote: "お引き渡しの日からが、本当のお付き合いの始まりです。",
  },
  {
    id: "92290",
    name: "小林 敬昌",
    nameEn: "Takamasa Kobayashi",
    role: "代表取締役専務",
    roleEn: "Representative Director, Executive",
    career: "25年",
    quote: "見積もりから、一度も金額を上げません。",
  },
] as const;

// ────────────────────────────────────────────────
// 思いの日本語ラベル
// ────────────────────────────────────────────────

const THOUGHT_LABELS: Record<SignatureKey, string> = {
  house: "家とは",
  customer: "お客様へ",
  policy: "信条",
};

// ────────────────────────────────────────────────
// 写真フィルター (統一グレーディング)
// ────────────────────────────────────────────────

const PHOTO_FILTER = "grayscale(0.7) saturate(1.1) contrast(1.04)";
const PHOTO_FILTER_HOVER = "grayscale(0.3) saturate(1.15) contrast(1.05)";

// ────────────────────────────────────────────────
// スタッフカード
// ────────────────────────────────────────────────

function StaffCard({ staff, deptEn }: { staff: Staff; deptEn: string }) {
  return (
    <article className="scroll-in group">
      {/* 写真 */}
      <div className="relative aspect-[4/5] overflow-hidden rounded bg-bg-secondary mb-4">
        <Image
          src={`/images/staff/${staff.id}.webp`}
          alt={`${staff.name} | ${staff.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter] duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ filter: PHOTO_FILTER }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_FILTER_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_FILTER;
          }}
        />
      </div>

      {/* カテゴリ + 経歴年 */}
      <p
        className="text-[10px] md:text-[11px] tracking-[0.2em] text-text-secondary mb-2"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {deptEn}
        {staff.career ? <span className="mx-2">·</span> : null}
        {staff.career ? <span>{staff.career}</span> : null}
      </p>

      {/* 氏名(日) */}
      <h4
        className="text-text-primary text-lg md:text-xl font-light leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {staff.name}
      </h4>

      {/* 氏名(英) */}
      <p
        className="text-text-secondary text-[11px] tracking-[0.08em] mt-0.5"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {staff.nameEn}
      </p>

      {/* 役職 */}
      <p className="text-text-secondary text-[12px] md:text-[13px] mt-1">
        {staff.role}
      </p>

      {/* 区切り */}
      <div className="h-px bg-border my-4" />

      {/* 3つの思い */}
      <dl className="space-y-3">
        {(Object.keys(THOUGHT_LABELS) as SignatureKey[]).map((key) => {
          const isSignature = staff.signature === key;
          return (
            <div key={key}>
              <dt
                className={`text-[10px] md:text-[11px] tracking-[0.18em] mb-0.5 ${
                  isSignature ? "text-main" : "text-text-secondary"
                }`}
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {THOUGHT_LABELS[key]}
                {isSignature ? (
                  <span className="ml-1.5 text-main">●</span>
                ) : null}
              </dt>
              <dd
                className={`leading-[1.75] ${
                  isSignature
                    ? "text-text-primary text-[14px] md:text-[15px]"
                    : "text-text-secondary text-[13px] md:text-[14px]"
                }`}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: isSignature ? 500 : 400,
                }}
              >
                {staff.thoughts[key]}
              </dd>
            </div>
          );
        })}
      </dl>
    </article>
  );
}

// ────────────────────────────────────────────────
// 代表カード(最後 · 控えめ)
// ────────────────────────────────────────────────

function RepresentativeCard({ rep }: { rep: Representative }) {
  return (
    <article className="scroll-in group">
      {/* 写真 */}
      <div className="relative aspect-[4/5] overflow-hidden rounded bg-bg-secondary mb-5">
        <Image
          src={`/images/staff/${rep.id}.webp`}
          alt={`${rep.role} ${rep.name} | やまと不動産`}
          fill
          className="object-cover transition-[filter] duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ filter: PHOTO_FILTER }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_FILTER_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_FILTER;
          }}
        />
      </div>

      {/* 役職 (英) */}
      <p
        className="text-[10px] md:text-[11px] tracking-[0.2em] text-text-secondary mb-1"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {rep.roleEn.toUpperCase()}
      </p>

      {/* 役職 (日) */}
      <p className="text-text-secondary text-[13px] md:text-sm mb-3">
        {rep.role} · 在任 {rep.career}
      </p>

      {/* 氏名 (日) */}
      <h3
        className="text-text-primary text-[clamp(22px,2.4vw,32px)] font-light leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {rep.name}
      </h3>

      {/* 氏名 (英) */}
      <p
        className="text-text-secondary text-[11px] md:text-xs tracking-[0.15em] mt-1 mb-5"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {rep.nameEn}
      </p>

      {/* 引用 */}
      <blockquote
        className="text-text-primary text-[clamp(16px,1.6vw,20px)] leading-[1.8]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        「{rep.quote}」
      </blockquote>
    </article>
  );
}

// ────────────────────────────────────────────────
// メインセクション
// ────────────────────────────────────────────────

export default function StaffStory() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="staff" className="bg-bg-primary">
      {/* === イントロブリッジ: チーム全体への紹介 === */}
      <div className="bg-main-light relative">
        <div className="max-w-[900px] mx-auto px-[var(--page-px)] py-[clamp(64px,calc(32px+6vw),180px)] text-center">
          <p
            className="font-section-label text-main text-xs md:text-sm tracking-[0.2em] mb-5"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            THE TEAM
          </p>
          <h2
            className="text-[clamp(22px,3vw,38px)] text-text-primary leading-[1.5] tracking-[0.03em] mb-6 font-light"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            家を建てるのは、この十九人です。
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
            営業・設計・工務・経営。
            <br />
            それぞれの手が重なって、一軒の家になります。
          </p>
        </div>
      </div>

      {/* === スタッフ17人 (フェーズ構造) === */}
      <div ref={sectionRef}>
        <div className="mx-auto max-w-[1400px] bg-bg-primary px-[var(--page-px)] py-[var(--section-py)]">
          {/* 各フェーズ */}
          <div className="space-y-20 md:space-y-28">
            {PHASES.map((phase, phaseIndex) => (
              <div key={phase.num} className="scroll-in">
                {/* フェーズヘッダ */}
                <div className="mb-10 md:mb-14 flex items-baseline gap-5 md:gap-6">
                  <span
                    className="text-main/40 font-light text-4xl md:text-6xl leading-none shrink-0"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {phase.num}
                  </span>
                  <span className="flex-1 h-px bg-border" />
                  <div className="text-right">
                    <p
                      className="text-main text-[10px] md:text-[11px] tracking-[0.2em] mb-0.5"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {phase.deptEn}
                    </p>
                    <h3
                      className="text-text-primary text-base md:text-xl font-light"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {phase.title}
                    </h3>
                    <p className="text-text-secondary text-[11px] md:text-xs mt-1">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                {/* スタッフグリッド */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                  {phase.staff.map((s) => (
                    <StaffCard key={s.id} staff={s} deptEn={phase.deptEn} />
                  ))}
                </div>

                {/* フェーズ間のブリッジコピー */}
                {phaseIndex < PHASES.length - 1 ? (
                  <div className="mt-12 md:mt-16 text-center">
                    <span className="inline-block w-px h-10 md:h-14 bg-border" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* === 代表2名 (最後・控えめ) === */}
          <div className="mt-28 md:mt-40 pt-16 md:pt-24 border-t border-border">
            <div className="mb-12 md:mb-16 max-w-[640px]">
              <p
                className="font-section-label text-main text-xs md:text-sm tracking-[0.2em] mb-4"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                REPRESENTATIVES
              </p>
              <h3
                className="text-[clamp(22px,2.8vw,32px)] text-text-primary leading-[1.5] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                そして、この二人で会社を背負っています。
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-[1000px]">
              {REPRESENTATIVES.map((rep) => (
                <RepresentativeCard key={rep.id} rep={rep} />
              ))}
            </div>
          </div>

          {/* 締め */}
          <div className="mt-20 md:mt-28 pt-10 border-t border-border text-center">
            <p className="text-text-secondary text-sm md:text-base leading-[1.9] max-w-[640px] mx-auto">
              ご契約からお引き渡しまで、そしてその先も。この十九人で、お供いたします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
