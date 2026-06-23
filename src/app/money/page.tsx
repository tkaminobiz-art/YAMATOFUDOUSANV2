import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { Reveal, CountUp } from "@/components/money/MoneyAnim";
import CostBars from "@/components/money/CostBars";
import SimWire from "@/components/money/SimWire";
import WarrantyPanel from "@/components/money/WarrantyPanel";
import ExteriorBreath from "@/components/money/ExteriorBreath";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

export const metadata: Metadata = {
  title: "資金計画 | 後悔しない家づくり | やまと不動産",
  description:
    "奈良・京都南部の注文住宅やまと不動産。高水準の標準装備で、自由に設計。土地込みの総額を最初にお見せします。",
};

/* ───────────────────────── 共通パーツ ───────────────────────── */
function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-[min(100%-32px,1200px)] ${className}`.trim()}>{children}</div>;
}

/** 連番の索引ヘッダー（mono・赤番号・1px罫線。dark=墨地用） */
function SectionIndex({ no, jp, en, dark = false }: { no: string; jp: string; en: string; dark?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between border-b pb-4 ${dark ? "border-paper/20" : "border-hair"}`}>
      <p className="font-mono text-[12px] tracking-[0.14em]">
        <span className="text-signal">{no}</span>
        <span className={dark ? "text-mist" : "text-slate"}> / {jp}</span>
      </p>
      <p className="font-mono text-[11px] tracking-[0.18em] text-mist">{en}</p>
    </div>
  );
}

function LineCta({ children = "LINEで相談する", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <a
      href={LINE_ADD_FRIEND_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 bg-line px-7 text-[14px] font-bold text-white transition duration-200 hover:brightness-[0.94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${className}`.trim()}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.9} fill="currentColor" />
      {children}
    </a>
  );
}

function OutlineCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-[52px] items-center justify-center gap-2 border border-noir px-7 text-[14px] font-bold text-noir transition duration-200 hover:bg-noir hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
    </Link>
  );
}

const SECTION = "py-[clamp(64px,calc(40px+5vw),140px)]";

/* ───────────── 導入 ── コピー先導（FV写真は撤去。お金ページはまず約束を１行で） ───────────── */
function Intro() {
  return (
    <section className="bg-paper">
      <Container>
        <div className="pt-[clamp(52px,9vw,100px)] pb-[clamp(44px,7vw,84px)]">
          <p className="font-mono text-[12px] tracking-[0.16em] text-signal">資金計画 / MONEY</p>
          <h1 className="head-hero mt-5 text-noir">
            「あれもこれも」を、予算のなかで。
          </h1>
          <p className="mt-6 max-w-[clamp(274px,78vw,723px)] text-[15px] leading-[1.9] text-ash">
            あこがれのマイホーム。我慢や妥協は、したくないですよね。やまとは高水準の設備をぜんぶ標準にして、予算のなかでかたちにします。資金計画を、順にご覧ください。
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ───────────── 01 標準仕様 ───────────── */
const SPEC_GALLERY = [
  { img: "/images/works/case2-kitchen.webp", cat: "キッチン", label: "クリナップ ステディア", alt: "標準仕様のキッチン（クリナップ ステディア）" },
  { img: "/images/works/case2-wash.webp", cat: "洗面", label: "三面鏡が標準", alt: "標準仕様の洗面化粧台" },
  { img: "/images/works/case2-ext.webp", cat: "リビング", label: "自由設計の住まい", alt: "自由設計で仕上げたリビング" },
] as const;
const SPEC_ICONS = [
  { icon: "/images/newsozai/spec/icon-kitchen.webp", cat: "キッチン", maker: "クリナップ ステディア" },
  { icon: "/images/newsozai/spec/icon-bath.webp", cat: "浴室", maker: "TOTO サザナ" },
  { icon: "/images/newsozai/spec/icon-wash.webp", cat: "洗面", maker: "三面鏡が標準" },
  { icon: "/images/newsozai/spec/icon-wall.webp", cat: "外壁", maker: "旭化成 パワーボード" },
  { icon: "/images/newsozai/spec/icon-damper.webp", cat: "制振", maker: "住友ゴム MIRAIE" },
  { icon: "/images/newsozai/spec/icon-insulation.webp", cat: "断熱", maker: "ウレタン吹付" },
  { icon: "/images/newsozai/spec/icon-floor.webp", cat: "床暖房", maker: "大阪ガス ヌック" },
  { icon: "/images/newsozai/spec/icon-window.webp", cat: "窓", maker: "Low-E複層ガラス" },
] as const;

function Standard() {
  return (
    <section id="standard" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="01" jp="標準仕様" en="STANDARD" />
        </Reveal>
        <Reveal className="mt-10">
          <h2 className="head-1line text-noir">標準で 自由に設計できます</h2>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.85] text-ash">
            クリナップ・TOTO・MIRAIE など、設備は標準で揃います。追加費用はかかりません。
          </p>
        </Reveal>
        {/* 標準設備の実写真ギャラリー＝「高水準装備」を見せて白を埋める */}
        <Reveal stagger className="mt-10 grid gap-px bg-hair sm:grid-cols-3">
          {SPEC_GALLERY.map((g) => (
            <figure key={g.cat} className="scroll-in m-0 bg-paper">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={g.img} alt={g.alt} fill sizes="(max-width:640px) 100vw, 320px" className="object-cover" />
              </div>
              <figcaption className="flex items-baseline gap-2 px-1 py-3">
                <span className="font-mono text-[11px] text-slate">{g.cat}</span>
                <span className="text-[13px] font-bold text-noir">{g.label}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
        {/* 全標準装備を統一アイコンで（生成・スタイリッシュ）。撮れない設備も網羅 */}
        <Reveal stagger className="mt-10 grid grid-cols-2 gap-px border border-hair bg-hair sm:grid-cols-4">
          {SPEC_ICONS.map((s) => (
            <div key={s.cat} className="scroll-in flex flex-col items-center gap-1.5 bg-paper px-3 py-5 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.icon} alt="" className="h-12 w-12 object-contain mix-blend-multiply" loading="lazy" decoding="async" />
              <p className="font-mono mt-1 text-[10px] tracking-[0.04em] text-slate">{s.cat}</p>
              <p className="text-[12px] font-bold leading-[1.45] text-noir">{s.maker}</p>
            </div>
          ))}
        </Reveal>
        <p className="font-mono mt-6 text-[12px] tracking-[0.06em] text-slate">標準仕様 ── ほか17項目</p>
      </Container>
    </section>
  );
}

/* ───────────── 02 価格のしくみ（比較バー＝下から立ち上がる／赤が横に伸びる） ───────────── */
const FACTS = [
  ["展示場を持ちません", "分譲地に建てた家を、そのままモデルハウスにしています。その家は、いずれ販売します。"],
  ["土地から自社で一貫します", "土地の分譲から設計・施工まで自社です。仲介マージンが乗りません。"],
  ["広告は必要な分だけです", "SNSや物件サイトは使いますが、テレビCMや大型広告は出していません。"],
] as const;

function Mechanism() {
  return (
    <section id="mechanism" className={`scroll-mt-24 bg-band ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="02" jp="価格のしくみ" en="MECHANISM" />
        </Reveal>
        <Reveal className="mt-10 max-w-[560px]">
          <h2 className="head-1line text-noir">完成までの費用を比較</h2>
          <p className="mt-5 text-[15px] leading-[1.9] text-ash">
            素材も性能も大手と同じです。完成までにかかる費用だけが違います。
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <CostBars />
        </Reveal>
        <Reveal stagger className="mt-14 grid gap-px border-t border-hair pt-px md:grid-cols-3">
          {FACTS.map(([title, body], i) => (
            <div key={title} className="scroll-in pt-7 md:border-l md:border-hair md:pl-7 md:first:border-l-0 md:first:pl-0">
              <p className="font-mono text-[12px] tracking-[0.1em] text-signal">0{i + 1}</p>
              <h3 className="mt-3 text-[16px] font-bold leading-[1.5] text-noir">{title}</h3>
              <p className="mt-3 text-[13.5px] leading-[1.85] text-ash">{body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────── 03 総額（墨反転ダークバンド＋カウントアップ＋内訳） ───────────── */
const RECEIPT = [
  ["建物本体（京モデル）", "2,280万円〜", false],
  ["付帯工事", "込み", false],
  ["つなぎ融資", "原則発生しません", true],
  ["地盤改良費", "かかりません", true],
] as const;

function Price() {
  return (
    <section id="price" className={`scroll-mt-24 bg-noir text-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="03" jp="総額" en="PRICE" dark />
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <Reveal>
            <h2 className="head-1line text-paper">2,280万円から建てられます</h2>
            <p className="mt-6 flex items-end gap-3 whitespace-nowrap">
              <CountUp
                value={2280}
                className="num-tnum font-oswald inline-block min-w-[2.6em] text-right text-[clamp(64px,13vw,150px)] font-semibold leading-[0.82] text-paper"
              />
              <span className="font-mono pb-3 text-[13px] tracking-[0.06em] text-signal">万円〜</span>
            </p>
            <p className="mt-5 max-w-[420px] text-[14px] leading-[1.95] text-mist">
              素材は大手と同じです。展示場と広告の費用を乗せていません。
            </p>
          </Reveal>
          <Reveal>
            {/* 総額の内訳（100%スタックバー） */}
            <div className="mb-2 flex font-mono text-[11px] text-mist">
              <span className="w-[70%]">本体 70%</span>
              <span className="w-[20%]">付帯 20%</span>
              <span className="w-[10%]">諸費 10%</span>
            </div>
            <div className="flex h-11 w-full border border-paper/40">
              <div className="w-[70%] bg-paper/80" />
              <div className="w-[20%] border-l border-noir bg-paper/45" />
              <div className="w-[10%] border-l border-noir bg-paper/20" />
            </div>
            <dl className="mt-7 border-t border-paper/30">
              {RECEIPT.map(([label, value, strong]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 border-b border-paper/15 py-4">
                  <dt className="text-[14px] font-bold text-paper">{label}</dt>
                  <dd className={`font-mono text-[13px] tracking-[0.04em] ${strong ? "text-signal" : "text-paper"}`}>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <LineCta>総額をLINEで相談する</LineCta>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* 外観パララックス（中盤の視覚休符）は client コンポーネントへ分離: @/components/money/ExteriorBreath */

/* ───────────── 04 商品ライン ───────────── */
const PLANS = [
  { jp: "花", en: "HANA", price: "2,480", size: "33坪 / 4LDK", img: "/images/fv/plan-hana.webp", note: "家族が増えても、ゆとりのある広さ。収納も部屋数も、余裕をもって。" },
  { jp: "風", en: "KAZE", price: "2,480", size: "30坪 / 4LDK", img: "/images/fv/plan-kaze.webp", note: "暮らしやすさを、まんなかに。ちょうどいい広さの4LDK。" },
  { jp: "京", en: "KYO", price: "2,280", size: "28坪 / 3LDK", img: "/images/fv/plan-miyako.webp", note: "必要なものを、コンパクトに。はじめやすい広さの3LDK。" },
] as const;
const PLAN_EQUIP = ["クリナップ ステディア", "TOTO サザナ 1.25坪", "旭化成 パワーボード", "住友ゴム MIRAIE 制震", "アクアフォーム断熱", "Low-E複層ガラス", "木造軸組＋金物工法"] as const;

function PlanMeta({ p, big = false }: { p: (typeof PLANS)[number]; big?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 p-5 md:p-6">
      <div className="min-w-0">
        <div className="flex items-baseline gap-3">
          <span className={`font-black leading-none text-noir ${big ? "text-[clamp(40px,8vw,56px)]" : "text-[clamp(32px,6vw,40px)]"}`}>{p.jp}</span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-slate">{p.en}</span>
        </div>
        <p className={`mt-3 leading-[1.8] text-ash ${big ? "max-w-[440px] text-[14px]" : "text-[13px]"}`}>{p.note}</p>
        <p className="font-mono mt-2 text-[12px] tracking-[0.06em] text-slate">{p.size}</p>
      </div>
      <p className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span className={`font-oswald leading-none text-noir ${big ? "text-[clamp(36px,7vw,52px)]" : "text-[clamp(30px,6vw,40px)]"}`}>{p.price}</span>
        <span className="font-mono text-[11px] text-slate">万円〜</span>
      </p>
    </div>
  );
}

function Plans() {
  const [hero, ...rest] = PLANS;
  return (
    <section id="plans" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="04" jp="商品ライン" en="PRODUCT" />
        </Reveal>
        <Reveal className="mt-10 max-w-[560px]">
          <h2 className="head-1line text-noir">高水準標準装備＋自由設計</h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-ash">どのモデルも、高水準の設備が標準です。あとは、ご家族の暮らしに合わせて、自由に設計します。</p>
        </Reveal>

        {/* 花＝ヒーロー（実邸写真・大） */}
        <Reveal className="mt-8">
          <div className="border border-hair">
            <figure className="relative m-0 aspect-[16/9] overflow-hidden">
              <Image src={hero.img} alt={`${hero.jp}モデルの外観`} fill sizes="(max-width:1024px) 100vw, 1100px" className="object-cover" />
              <span className="font-mono absolute left-0 top-0 bg-signal px-3 py-1.5 text-[11px] font-bold tracking-[0.04em] text-white">いちばん選ばれています</span>
            </figure>
            <PlanMeta p={hero} big />
          </div>
        </Reveal>

        {/* 風・京＝サブ（実邸写真・2列） */}
        <Reveal stagger className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <div key={p.en} className="scroll-in border border-hair">
              <figure className="relative m-0 aspect-[4/3] overflow-hidden">
                <Image src={p.img} alt={`${p.jp}モデルの外観`} fill sizes="(max-width:768px) 100vw, 540px" className="object-cover" />
              </figure>
              <PlanMeta p={p} />
            </div>
          ))}
        </Reveal>

        {/* 全モデル標準の高水準装備＝価値の証明 */}
        <Reveal className="mt-6 border border-hair bg-band p-5 md:p-6">
          <p className="font-mono text-[11px] tracking-[0.08em] text-signal">全モデル標準</p>
          <p className="mt-2 text-[15px] font-bold text-noir">どのモデルも、この高水準装備が標準です。</p>
          <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2.5">
            {PLAN_EQUIP.map((e) => (
              <li key={e} className="font-mono flex items-center gap-1.5 text-[11.5px] text-noir">
                <span aria-hidden className="font-bold text-lime-deep">✓</span>
                {e}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-8">
          <OutlineCta href="/reserve">モデルハウスで、実物を見る</OutlineCta>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────── 05 シミュレーション（賃貸 vs 持ち家） ───────────── */
function SimSection() {
  return (
    <section id="sim" className={`scroll-mt-24 bg-band ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="05" jp="シミュレーション" en="SIMULATOR" />
        </Reveal>
        <Reveal className="mt-10">
          <h2 className="head-1line max-w-[13em] text-noir" style={{ whiteSpace: "normal", lineHeight: 1.25, textWrap: "balance" }}>今の家賃のままで、あこがれのマイホームを。</h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-ash">今の家賃を入れてみてください。やまとなら、どんな住まいになるか、毎月のお支払いとあわせてご覧いただけます。</p>
        </Reveal>
        {/* 賃貸vs持ち家(左) + 補償パネル(右・案A)。lg未満は縦積み。 */}
        <Reveal className="mt-9">
          <div className="grid max-w-[1100px] items-start gap-6 lg:grid-cols-[1fr_360px]">
            <SimWire />
            <WarrantyPanel />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────── 06 支払いの実例 ───────────── */
const CASES = [
  { no: "01", plan: "京モデル", family: "30代ご夫婦＋お子様1人", total: "3,180万円", monthly: "86,944", image: "/images/works/case3-living.webp" },
  { no: "02", plan: "風モデル", family: "30代ご夫婦＋お子様2人", total: "3,580万円", monthly: "95,413", image: "/images/works/case2-kitchen.webp" },
  { no: "03", plan: "京モデル", family: "20代ご夫婦", total: "2,980万円", monthly: "81,298", image: "/images/works/case1-living.webp" },
] as const;

function Cases() {
  return (
    <section id="cases" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="06" jp="支払いの実例" en="CASE" />
          <p className="font-mono mt-4 text-[11px] tracking-[0.06em] text-slate">
            試算用金利1.0% / 35年 / ボーナス払いなしの例です
          </p>
        </Reveal>
        <Reveal className="mt-8">
          <h2 className="head-1line text-noir">実際の支払い例</h2>
        </Reveal>
        <Reveal stagger className="mt-8 border-t border-hair">
          {CASES.map((c) => (
            <div key={c.no} className="scroll-in grid items-center gap-5 border-b border-hair py-6 md:grid-cols-[40px_104px_1fr_auto] md:gap-8">
              <span className="font-oswald text-[24px] leading-none text-signal">{c.no}</span>
              <figure className="relative aspect-[4/3] w-[104px] overflow-hidden">
                <Image src={c.image} alt={`${c.plan}の施工事例`} fill sizes="104px" className="object-cover saturate-[0.92]" />
              </figure>
              <div>
                <p className="text-[14px] font-bold text-noir">{c.plan}</p>
                <p className="font-mono mt-1 text-[11px] tracking-[0.04em] text-slate">{c.family}・総額 {c.total}</p>
              </div>
              <p className="flex items-baseline gap-1.5 whitespace-nowrap md:justify-self-end">
                <span className="font-mono text-[11px] text-slate">月々</span>
                <span className="font-oswald text-[clamp(30px,4vw,44px)] leading-none text-noir">{c.monthly}</span>
                <span className="font-mono text-[11px] text-slate">円</span>
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────── 07 お客様の声 ───────────── */
const VOICES = [
  { id: "208786", family: "Ｙ様", area: "天理市", quote: "標準仕様の設備と金額が明確でわかりやすく、資金のイメージがしやすかったです。", image: "/images/voices/208786_1.webp" },
  { id: "190536", family: "Ｎ様", area: "奈良市", quote: "オプション工事も一つ一つ値段設定表があったので、資金計画がしやすい点も良かったです。", image: "/images/voices/190536_1.webp" },
  { id: "196895", family: "Ｍ様", area: "天理市", quote: "標準設備のグレードが高く、予算を抑えて気に入る家づくりができると思いました。", image: "/images/voices/196895_1.webp" },
] as const;

function Voices() {
  return (
    <section id="voice" className={`scroll-mt-24 bg-band ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="07" jp="お客様の声" en="VOICE" />
        </Reveal>
        <Reveal className="mt-10">
          <h2 className="head-1line text-noir">建てたご家族に聞きました</h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-ash">50組をこえるご家族の声から、資金の話を選びました。</p>
        </Reveal>
        <Reveal stagger className="mt-10 grid gap-px border-t border-hair md:grid-cols-3">
          {VOICES.map((v) => (
            <Link
              key={v.id}
              href={`/voice/${v.id}`}
              className="scroll-in group block pt-8 md:border-l md:border-hair md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <figure className="relative mb-5 aspect-[4/3] overflow-hidden">
                <Image src={v.image} alt={`${v.area}・${v.family}が建てたやまとの家`} fill sizes="(max-width:768px) 90vw, 360px" className="object-cover saturate-[0.92] transition duration-500 group-hover:scale-[1.03]" />
              </figure>
              <p className="text-[14px] font-bold leading-[1.85] text-noir">「{v.quote}」</p>
              <p className="font-mono mt-4 flex items-center gap-2 text-[12px] tracking-[0.04em] text-slate">
                <span className="text-noir">{v.area}・{v.family}</span>
                <ArrowRight className="ml-auto h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </p>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────── 08 ご相談 ───────────── */
const CONTACT_CHIPS = ["相談無料", "営業電話はしません", "急かしません", "土曜も対応"] as const;

function Contact() {
  return (
    <section id="contact" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="08" jp="ご相談" en="CONTACT" />
        </Reveal>
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-12">
          {/* 親しみのある相談イラスト（ライム淡色パネル） */}
          <Reveal>
            <figure className="m-0 border border-hair bg-lime-light p-6 sm:p-8">
              <img
                src="/images/newsozai/contact-consult.webp"
                alt="テーブルを囲んで、やまとのスタッフに気軽に相談できる様子のイラスト"
                className="mx-auto block w-full max-w-[320px] mix-blend-multiply"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>

          {/* 招き＋安心＋CTA */}
          <Reveal>
            <h2 className="head-1line text-noir">気になることから どうぞ</h2>
            <p className="mt-5 max-w-[460px] text-[15px] leading-[1.9] text-ash">
              総額のことも、土地のことも、お金のことも。むずかしい言葉は使いません。思いついた順で、気軽に聞いてください。
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
              {CONTACT_CHIPS.map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-[13px] font-bold text-noir">
                  <span aria-hidden className="font-bold text-lime-deep">✓</span>
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-7 border border-hair bg-lime-light p-4">
              <p className="font-mono text-[11px] tracking-[0.06em] text-slate">LINEで届くもの</p>
              <p className="mt-1.5 text-[14px] font-bold leading-[1.7] text-noir">① あなたの総額目安　② 資金計画相談1,000件超の実例集</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LineCta>LINEで相談する</LineCta>
              <OutlineCta href="/reserve">モデルハウスを見学する</OutlineCta>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center px-4 text-[13px] font-bold text-slate underline-offset-4 transition hover:text-noir hover:underline"
              >
                資料を請求する
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main className="money-page bg-paper text-noir">
        <Intro />
        <Standard />
        <Mechanism />
        <Price />
        <ExteriorBreath />
        <Plans />
        <SimSection />
        <Cases />
        <Voices />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
