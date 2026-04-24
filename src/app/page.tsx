import Header from "@/components/Header";
import HeroMagazine from "@/components/sections/HeroMagazine";
import {
  FONT_VARIANTS,
  BODY_VARIANTS,
} from "@/components/sections/HeroMagazine.fonts";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import MechanismEnhanced from "@/components/sections/MechanismEnhanced";
import FreedomOfDesign from "@/components/sections/FreedomOfDesign";
import PriceSection from "@/components/sections/PriceSection";
import MidCta from "@/components/sections/MidCta";
import VoiceSection from "@/components/sections/VoiceSection";
import WorksSection from "@/components/sections/WorksSection";
import FlowSection from "@/components/sections/FlowSection";
import LotsSection from "@/components/sections/LotsSection";
import FaqSection from "@/components/sections/FaqSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import StandardAndQualitySection from "@/components/sections/StandardAndQualitySection";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

// 2026-04-24 確定: Z(Noto Sans JP catalog) + IV(Industrial: Oswald + Noto Sans JP 500)
// 明朝(Shippori)は退役、shukobuild型カタログ方針に統一
const HERO_HEADLINE_VARIANT =
  FONT_VARIANTS.find((v) => v.id === "noto-sans") ?? FONT_VARIANTS[0];
const HERO_BODY_VARIANT =
  BODY_VARIANTS.find((v) => v.id === "industrial-bold") ?? BODY_VARIANTS[0];

/*
  18セクション構成 — 2026-04-20 情報整理(audit) reorder

  読者像: ① 他社見積もりで諦めかけ ② 「ハウスメーカー奈良」検索流入
  目的: 来場予約 / 資料請求 / LINE の問い合わせ獲得

  【①フック】
  1. HeroMagazine        C-2 Magazine Editorial「諦めたもの…標準になる家。」+ 2,280万〜

  【②理屈】
  2. MechanismEnhanced   なぜ安いか(ASAGIRI/C-2 Magazine Editorial + ConceptSection吸収)
                         2026-04-20: strong catch「やまとは安い？いいえ、違います。」

  【③証拠】
  3. ZeroDeclaration     追加費用ゼロ
  4. PriceSection        3プラン価格(三つの、家。)

  【④商品の魅力】
     2026-04-21 reorder: 商品(ラインナップ) → 中身 → 可変性 → 置く場所
     の論理順に整理(従来: 土地→自由→標準で商品魅力の流れが途切れていた)
  5. StandardAndQualitySection  標準仕様(商品の中身)
  6. FreedomOfDesign     完全自由設計(商品の可変性)
  7. LotsSection         土地6件 teaser → /lots (商品を置く場所)

  【⑤社会的証明(信頼)】
  2026-04-21: StaffStory をトップから撤去(/staff へ完全移譲)
              "人"の存在感は Voice(50組の声) + Works(施工事例)で担保
  9. VoiceSection        3件 teaser → /voice
  10. WorksSection       3件 teaser → /works

  【⑥行動喚起①】
  13. MidCta             ここまで読んで

  【⑦行動直前】
  14. FlowSection        家づくりの流れ
  15. FaqSection         残不安
  ※ 2026-04-22: MoneyTalk teaser を撤去。資金計画は独立ページ /money に集約。
                ヘッダーNAVに「資金計画」を追加し、TOPでは PriceSection + ZeroDeclaration
                でお金は2回触れている(三度目は dilution)ため。

  【⑧クロージング】
  17. AccessSection      会社概要
  18. FinalCta           決断

  --- 削除済 ---
  - HeroVoiceMagazine: Hero直後の二度打ちで dilution(声は Voice で見せる)
  - EditorialPhotoGallery(前): PostPricing と同種で重複
  - PostPricingEditorialGallery (2026-04-21 design-critic #7):
    周囲の白基調と暗背景マーキーが断絶し呼吸帯として機能せず
  - StaffStory (2026-04-21 ユーザー判断): 別ページ /staff で詳細を読ませる構造に
    (ファイル自体は保持し再利用可能)
*/

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroMagazine
          variant={HERO_HEADLINE_VARIANT}
          bodyVariant={HERO_BODY_VARIANT}
        />
        <MechanismEnhanced />
        <ZeroDeclaration />
        <PriceSection />
        <StandardAndQualitySection />
        <FreedomOfDesign />
        <LotsSection />
        <VoiceSection />
        <WorksSection />
        <MidCta />
        <FlowSection />
        <FaqSection />
        <AccessSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
