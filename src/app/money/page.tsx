import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import { Reveal } from "@/components/money/MoneyAnim";
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

/** 連番の索引ヘッダー（mono・赤番号・1px罫線） */
function SectionIndex({ no, jp, en }: { no: string; jp: string; en: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-hair pb-4">
      <p className="font-mono text-[12px] tracking-[0.14em]">
        <span className="text-signal">{no}</span>
        <span className="text-slate"> / {jp}</span>
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
      className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 bg-line px-7 text-[14px] font-bold text-white transition duration-200 hover:brightness-[0.94] ${className}`.trim()}
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
      className="group inline-flex min-h-[52px] items-center justify-center gap-2 border border-noir px-7 text-[14px] font-bold text-noir transition duration-200 hover:bg-noir hover:text-paper"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
    </Link>
  );
}

const SECTION = "py-[clamp(64px,calc(40px+5vw),140px)]";

/* ───────────── FV ── B: 暮らし主役 ───────────── */
function Hero() {
  return (
    <section className="relative bg-noir">
      <div className="relative h-[clamp(520px,82vh,860px)] w-full overflow-hidden">
        <Image
          src="/images/newsozai/interior-ldk-01.webp"
          alt="やまと不動産が手がけた、奈良の住まいの暮らし"
          fill
          priority
          sizes="100vw"
          className="object-cover saturate-[0.92] contrast-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="pb-9 md:pb-14">
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/85">YAMATO &nbsp;/&nbsp; 資金計画</p>
            <span aria-hidden className="mt-3 block h-[3px] w-12 bg-signal" />
            <h1 className="head-fv mt-4 text-white">後悔しない家づくり</h1>
            <div className="mt-7">
              <LineCta>LINEで相談する</LineCta>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

/* ───────────── こだわり3宣言（赤ドット帯） ───────────── */
const KODAWARI = [
  "これ、ぜんぶ標準です",
  "素材も性能も、大手と変わりません",
  "広告費を抑えた、結果の価格です",
] as const;

function Kodawari() {
  return (
    <section className="bg-paper py-[clamp(40px,6vw,72px)]">
      <Container>
        <Reveal stagger className="border-t border-hair">
          {KODAWARI.map((line) => (
            <p
              key={line}
              className="scroll-in flex items-center gap-4 border-b border-hair py-5 text-[clamp(16px,3.4vw,22px)] font-bold text-noir md:py-6"
            >
              <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-signal" />
              {line}
            </p>
          ))}
        </Reveal>
      </Container>
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
            大手と同じ素材が、標準で揃います。追加費用はかかりません。
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

/* ───────────── 02 価格のしくみ ───────────── */
const LOADED = ["広告宣伝費", "展示場の維持費", "中間マージン"] as const;
const FACTS = [
  ["展示場を、持ちません", "分譲地に建てた家を、そのままモデルハウスにしています。その家は、いずれ販売します。"],
  ["土地から、自社で一貫", "土地の分譲から設計・施工まで自社です。仲介マージンが乗りません。"],
  ["広告は、必要な分だけ", "SNSや物件サイトは使いますが、テレビCMや大型広告は出していません。"],
] as const;

function Mechanism() {
  return (
    <section id="mechanism" className={`scroll-mt-24 bg-band ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="02" jp="価格のしくみ" en="MECHANISM" />
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-20">
          <Reveal>
            <h2 className="head-1line text-noir">完成までの費用を比較</h2>
            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.95] text-ash">
              素材も性能も、大手と同じです。違うのは、家を届けるまでの費用です。
            </p>
          </Reveal>
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.1em] text-slate">大手の見積もりに乗るもの</p>
            <dl className="mt-3 border-t border-noir">
              {LOADED.map((label) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-hair py-3.5">
                  <dt className="text-[15px] font-bold text-noir">{label}</dt>
                  <dd className="font-mono text-[12px] tracking-[0.06em] text-signal">＋ 上乗せ</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 py-3.5">
                <dt className="text-[15px] font-bold text-noir">やまと</dt>
                <dd className="font-mono text-[12px] tracking-[0.06em] text-noir">家の値段だけ</dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <Reveal stagger className="mt-14 grid gap-px border-t border-hair pt-px md:grid-cols-3">
          {FACTS.map(([title, body], i) => (
            <div key={title} className="scroll-in pt-7 md:border-l md:border-hair md:pl-7 md:first:border-l-0 md:first:pl-0">
              <p className="font-mono text-[12px] tracking-[0.1em] text-signal">0{i + 1}</p>
              <h3 className="head-1line-sm mt-3 text-noir">{title}</h3>
              <p className="mt-3 text-[13.5px] leading-[1.85] text-ash">{body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────── 03 総額 ───────────── */
const RECEIPT = [
  ["建物本体（京モデル）", "2,280万円〜", false],
  ["付帯工事", "込み", false],
  ["つなぎ融資", "原則発生しません", true],
  ["地盤改良費", "かかりません", true],
] as const;

function Price() {
  return (
    <section id="price" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="03" jp="総額" en="PRICE" />
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <Reveal>
            <h2 className="head-1line text-noir">2,280万円から建てられます</h2>
            <p className="mt-5 flex items-end gap-3 whitespace-nowrap">
              <span className="font-oswald text-[clamp(64px,13vw,150px)] font-semibold leading-[0.82] text-noir">2,280</span>
              <span className="font-mono pb-3 text-[13px] tracking-[0.06em] text-signal">万円〜</span>
            </p>
            <p className="mt-5 max-w-[420px] text-[14px] leading-[1.95] text-ash">
              素材は大手と同じ。展示場と広告の費用を、乗せていません。
            </p>
          </Reveal>
          <Reveal>
            <dl className="border-t border-noir">
              {RECEIPT.map(([label, value, strong]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 border-b border-hair py-4">
                  <dt className="text-[14px] font-bold text-noir">{label}</dt>
                  <dd className={`font-mono text-[13px] tracking-[0.04em] ${strong ? "text-signal" : "text-noir"}`}>{value}</dd>
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
          <h2 className="head-1line text-noir">間取りも設備も自由に選べます</h2>
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

/* ───────────── 05 支払いの実例 ───────────── */
const CASES = [
  { no: "01", plan: "京モデル", family: "30代ご夫婦＋お子様1人", total: "3,180万円", monthly: "86,944", image: "/images/works/case3-living.webp" },
  { no: "02", plan: "風モデル", family: "30代ご夫婦＋お子様2人", total: "3,580万円", monthly: "95,413", image: "/images/works/case2-kitchen.webp" },
  { no: "03", plan: "京モデル", family: "20代ご夫婦", total: "2,980万円", monthly: "81,298", image: "/images/works/case1-living.webp" },
] as const;

function Cases() {
  return (
    <section id="cases" className={`scroll-mt-24 bg-band ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="05" jp="支払いの実例" en="CASE" />
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

/* ───────────── 06 お客様の声 ───────────── */
const VOICES = [
  { id: "208786", family: "Ｙ様", area: "天理市", quote: "標準仕様の設備と金額が明確でわかりやすく、資金のイメージがしやすかったです。", image: "/images/voices/208786_1.webp" },
  { id: "190536", family: "Ｎ様", area: "奈良市", quote: "オプション工事も一つ一つ値段設定表があったので、資金計画がしやすい点も良かったです。", image: "/images/voices/190536_1.webp" },
  { id: "196895", family: "Ｍ様", area: "天理市", quote: "標準設備のグレードが高く、予算を抑えて気に入る家づくりができると思いました。", image: "/images/voices/196895_1.webp" },
] as const;

function Voices() {
  return (
    <section id="voice" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="06" jp="お客様の声" en="VOICE" />
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

/* ───────────── 07 ご相談 ───────────── */
function Contact() {
  return (
    <section id="contact" className={`scroll-mt-24 bg-paper ${SECTION}`}>
      <Container>
        <Reveal>
          <SectionIndex no="07" jp="ご相談" en="CONTACT" />
        </Reveal>
        <Reveal className="mt-12 max-w-[820px]">
          <h2 className="head-1line text-noir">気になることから どうぞ</h2>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[12px] tracking-[0.04em] text-slate">
            <span>相談無料</span>
            <span>営業電話はしません</span>
            <span>急かしません</span>
            <span>土曜も対応</span>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LineCta>LINEで相談する</LineCta>
            <OutlineCta href="/reserve">モデルハウスを見学する</OutlineCta>
            <Link href="/contact" className="inline-flex min-h-[52px] items-center justify-center px-4 text-[13px] font-bold text-slate underline-offset-4 transition hover:text-noir hover:underline">
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
        <Hero />
        <Kodawari />
        <Standard />
        <Mechanism />
        <Price />
        <Plans />
        <Cases />
        <Voices />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
