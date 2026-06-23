import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { Reveal, CountUp } from "@/components/money/MoneyAnim";
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
const HATCH: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(45deg, var(--color-signal) 0, var(--color-signal) 1px, transparent 1px, transparent 9px)",
};

/* ───────────── FV ── 見せる画像のみ（コピー・CTAなし／最初の文章は 01） ───────────── */
function Hero() {
  return (
    <section className="relative bg-noir">
      <div className="relative h-[clamp(480px,86vh,900px)] w-full overflow-hidden">
        <Image
          src="/images/newsozai/money-fv.webp"
          alt="やまと不動産が建てた住まいの内観"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent" />
      </div>
    </section>
  );
}

/* ───────────── 01 標準仕様 ───────────── */
const SPEC = [
  ["外壁", "旭化成 パワーボード"],
  ["制振", "住友ゴム MIRAIE（揺れ最大70%低減）"],
  ["断熱", "ウレタン吹付（隙間ゼロ）"],
  ["キッチン", "クリナップ ステディア"],
  ["浴室", "TOTO サザナ"],
  ["床暖房", "大阪ガス ヌック"],
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
        <Reveal stagger className="mt-10 grid gap-px border-t border-hair sm:grid-cols-2">
          {SPEC.map(([label, value]) => (
            <div key={label} className="scroll-in flex items-baseline gap-4 border-b border-hair py-4">
              <span className="font-mono w-[64px] shrink-0 text-[12px] tracking-[0.08em] text-slate">{label}</span>
              <span className="text-[14.5px] font-bold text-noir">{value}</span>
            </div>
          ))}
        </Reveal>
        <p className="font-mono mt-6 text-[12px] tracking-[0.06em] text-slate">標準仕様 ── ほか17項目</p>
      </Container>
    </section>
  );
}

/* ───────────── 02 価格のしくみ（比較バー＝下から立ち上がる／赤が横に伸びる） ───────────── */
const WASTE = ["広告費", "展示場の維持費", "中間マージン"] as const;
const FACTS = [
  ["展示場を持ちません", "分譲地に建てた家を、そのままモデルハウスにしています。その家は、いずれ販売します。"],
  ["土地から自社で一貫します", "土地の分譲から設計・施工まで自社です。仲介マージンが乗りません。"],
  ["広告は必要な分だけです", "SNSや物件サイトは使いますが、テレビCMや大型広告は出していません。"],
] as const;

function CostBars() {
  // 家の本体は同じ高さ。大手はその上に赤い無駄が乗って“総額が高くなる”。下揃えで差を見せる。
  const vars = { "--cb-house": "clamp(150px,26vw,188px)", "--cb-waste": "clamp(92px,16vw,116px)" } as CSSProperties;
  const houseLabel = <span className="text-[12px] font-bold text-noir">家の本体・標準仕様</span>;
  return (
    <div>
      <div className="flex items-end gap-5 md:gap-12" style={vars}>
        {/* 一般的な大手：家の本体 ＋ 赤い無駄（高い） */}
        <figure className="m-0 flex-1">
          <div className="flex flex-col border border-noir" style={{ height: "calc(var(--cb-house) + var(--cb-waste))" }}>
            <div className="flex flex-col" style={{ height: "var(--cb-waste)" }}>
              {WASTE.map((w, i) => (
                <div
                  key={w}
                  className={`relative flex flex-1 items-center px-2 ${i < WASTE.length - 1 ? "border-b border-paper" : ""}`}
                >
                  <span className="cost-wedge absolute inset-0" style={HATCH} aria-hidden />
                  <span className="font-mono relative bg-paper px-1 text-[10px] text-noir">{w}</span>
                </div>
              ))}
            </div>
            <div className="cost-rise flex items-end border-t-2 border-noir px-2 pb-2" style={{ height: "var(--cb-house)" }}>
              {houseLabel}
            </div>
          </div>
          <figcaption className="mt-3 flex items-baseline gap-2">
            <span className="text-[13px] font-bold text-noir">一般的な大手</span>
            <span className="font-mono text-[10px] text-signal">家＋無駄</span>
          </figcaption>
        </figure>

        {/* やまと：家の本体だけ（低い＝総額が下がる） */}
        <figure className="m-0 flex-1">
          <div className="flex flex-col border border-noir" style={{ height: "var(--cb-house)" }}>
            <div className="cost-rise flex items-end px-2 pb-2" style={{ height: "var(--cb-house)" }}>
              {houseLabel}
            </div>
          </div>
          <figcaption className="mt-3 flex items-baseline gap-2">
            <span className="text-[13px] font-bold text-noir">やまと</span>
            <span className="font-mono text-[10px] text-slate">家だけ</span>
          </figcaption>
        </figure>
      </div>
      <p className="font-mono mt-4 text-[10px] leading-[1.7] text-slate">
        家の本体は同じ。<span className="text-signal">赤い部分が、やまとには乗りません</span>。その分、完成までの費用が下がります。（金額は当社試算・参考値）
      </p>
    </div>
  );
}

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
  { jp: "花", en: "HANA", price: "2,480", size: "33坪 / 4LDK", featured: true },
  { jp: "風", en: "KAZE", price: "2,480", size: "30坪 / 4LDK", featured: false },
  { jp: "京", en: "KYO", price: "2,280", size: "28坪 / 3LDK", featured: false },
] as const;

function Plans() {
  return (
    <section id="plans" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="04" jp="商品ライン" en="PRODUCT" />
        </Reveal>
        <Reveal className="mt-10">
          <h2 className="head-1line text-noir">高水準標準装備＋自由設計</h2>
        </Reveal>
        <Reveal stagger className="mt-8 border-t border-hair">
          {PLANS.map((p) => (
            <div key={p.en} className="scroll-in border-b border-hair py-6">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-[clamp(34px,8vw,44px)] font-black leading-none text-noir">{p.jp}</span>
                  <span className="font-mono text-[11px] tracking-[0.14em] text-slate">{p.en}</span>
                </div>
                <p className="flex items-baseline gap-1.5 whitespace-nowrap">
                  <span className="font-oswald text-[clamp(32px,7vw,46px)] leading-none text-noir">{p.price}</span>
                  <span className="font-mono text-[11px] text-slate">万円〜</span>
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="font-mono text-[12px] tracking-[0.06em] text-slate">{p.size}</p>
                {p.featured && (
                  <span className="inline-block whitespace-nowrap bg-signal px-2 py-0.5 text-[10.5px] font-bold tracking-[0.04em] text-white">
                    いちばん選ばれています
                  </span>
                )}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-8">
          <OutlineCta href="/reserve">モデルハウスで標準仕様を見る</OutlineCta>
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
          <h2 className="head-1line text-noir">賃貸と持ち家を比較</h2>
          <p className="mt-5 text-[15px] leading-[1.85] text-ash">今の家賃を入れて、払い続けた場合と持ち家を持った場合を見比べてください。</p>
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
function Contact() {
  return (
    <section id="contact" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="08" jp="ご相談" en="CONTACT" />
        </Reveal>
        <Reveal className="mt-12 max-w-[820px]">
          <h2 className="head-1line text-noir">気になることから どうぞ</h2>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[12px] tracking-[0.04em] text-slate">
            <span>相談無料</span>
            <span>営業電話はしません</span>
            <span>急かしません</span>
            <span>土曜も対応</span>
          </div>
          <div className="mt-7 border border-hair p-4">
            <p className="font-mono text-[11px] tracking-[0.06em] text-slate">LINEで届くもの</p>
            <p className="mt-1.5 text-[14px] font-bold text-noir">① あなたの総額目安　② 資金計画相談1,000件超の実例集</p>
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
      </Container>
    </section>
  );
}

export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main className="money-page bg-paper text-noir">
        <h1 className="sr-only">資金計画｜やまと不動産</h1>
        <Hero />
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
