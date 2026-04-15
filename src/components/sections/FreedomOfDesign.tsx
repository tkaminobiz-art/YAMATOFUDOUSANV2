"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

const STEPS = [
  {
    num: "01",
    title: "初回から、設計士が一緒です。",
    body: "プロの設計士が、最初の打ち合わせから同席します。",
    image: "/images/design/step-01-meeting.webp",
    alt: "設計士と夫婦が打ち合わせしている様子",
  },
  {
    num: "02",
    title: "3ヶ月かけて、何度でもプランを磨き上げます。",
    body: "日々の家事のしやすさも、お子様の将来も、しっかりと考え抜いて。",
    image: "/images/design/step-02-drawing.webp",
    alt: "手描きの間取り図",
  },
  {
    num: "03",
    title: "モデルハウスで、実物を見て選びます。",
    body: "外壁、床、キッチン、浴室。ご家族で、触れて、座って、決めます。",
    image: "/images/design/step-03-modelhouse.webp",
    alt: "モデルハウスのキッチンとリビング",
  },
  {
    num: "04",
    title: "コンセントの位置ひとつまで、ご自由にお選びいただけます。",
    body: "外壁、床、キッチン、窓の形まで。",
    image: "/images/design/step-04-finished.webp",
    alt: "完成したキッチンとダイニング",
  },
] as const;

const EXAMPLES = [
  {
    name: "カフェのような、リビング。",
    detail: "折下天井＋間接照明",
    image: "/images/design/example-coveceiling.webp",
  },
  {
    name: "家族の服、全部入る収納。",
    detail: "大空間収納",
    image: "/images/design/example-storage.webp",
  },
  {
    name: "2階に、もうひとつの部屋を。",
    detail: "バルコニー",
    image: "/images/design/example-balcony.webp",
  },
] as const;

export default function FreedomOfDesign() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="design" className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ===== 見出し ===== */}
        <div className="mb-16 md:mb-20 max-w-[760px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            FREEDOM OF DESIGN
          </p>
          <h2
            className="text-[clamp(22px,3vw,36px)] text-text-primary mb-5 leading-[1.5]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            「これいいな」と思ったプランに、
            <br className="hidden md:inline" />
            「でもうちは子ども2人で…」と諦めていませんか。
          </h2>
          <p
            className="text-text-primary text-[clamp(16px,1.3vw,20px)] leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            花・風・京、どれを選んでも、あなた仕様に組み直します。
          </p>
          <p className="text-text-secondary text-[clamp(14px,1vw,16px)] leading-relaxed mt-6">
            設計士が最初から一緒に、あなたの土地と暮らし方に合わせて、ゼロから組み立てます。
          </p>
        </div>

        {/* ===== 4ステップ（ストーリーテリング型 — 画像＋テキスト非対称） ===== */}
        <div className="space-y-20 md:space-y-28 mb-20 md:mb-28">
          {STEPS.map((step, i) => {
            const isReversed = i % 2 === 1;
            return (
              <div
                key={step.num}
                className={`scroll-in grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
                  isReversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* 画像 */}
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow group">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* テキスト */}
                <div>
                  <span
                    className="text-main/25 font-light text-6xl md:text-7xl lg:text-8xl leading-none block mb-4"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="text-text-primary text-xl md:text-2xl lg:text-[28px] mb-3 leading-[1.5]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== 自由設計の実例 ===== */}
        <div className="mb-16 md:mb-20">
          <div className="mb-10 md:mb-12 max-w-[640px]">
            <p className="font-section-label text-accent text-xs md:text-sm mb-3 tracking-[0.15em]">
              EXAMPLES
            </p>
            <h3
              className="text-[clamp(20px,2.5vw,30px)] text-text-primary mb-3 leading-[1.5]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              ある家族の、こだわり。
            </h3>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              自由設計で、実際に選ばれた仕様の一部です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--card-gap)]">
            {EXAMPLES.map((ex) => (
              <div key={ex.name} className="scroll-in">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 card-shadow group">
                  <Image
                    src={ex.image}
                    alt={ex.name}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p
                  className="text-text-primary text-sm md:text-base mb-1 leading-[1.5]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {ex.name}
                </p>
                <p className="text-accent text-xs tracking-wider">
                  {ex.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CTA ===== */}
        <div className="text-center pt-6 md:pt-10 border-t border-border">
          <p
            className="text-text-primary text-lg md:text-xl mb-2 leading-[1.6] mt-10 md:mt-14"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            まずは、設計士に会ってみませんか。
          </p>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
            あなたの土地と家族の話を、その場で間取りに落としてみます。
          </p>
          <div className="inline-flex">
            <CtaButton
              href="/reserve"
              variant="primary"
              size="md"
              label="設計士との打ち合わせを予約する"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
