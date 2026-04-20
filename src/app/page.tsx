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
import PostPricingEditorialGallery from "@/components/sections/PostPricingEditorialGallery";
import MoneyTalkSection from "@/components/sections/MoneyTalkSection";
import MidCta from "@/components/sections/MidCta";
import VoiceSection from "@/components/sections/VoiceSection";
import WorksSection from "@/components/sections/WorksSection";
import FlowSection from "@/components/sections/FlowSection";
import LotsSection from "@/components/sections/LotsSection";
import StaffStory from "@/components/sections/StaffStory";
import FaqSection from "@/components/sections/FaqSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import StandardAndQualitySection from "@/components/sections/StandardAndQualitySection";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

// 確定組合せ: B(Shippori Mincho) + IV(Industrial: Oswald + Noto Sans JP 500)
const HERO_HEADLINE_VARIANT =
  FONT_VARIANTS.find((v) => v.id === "shippori") ?? FONT_VARIANTS[0];
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
  4. ZeroDeclaration     追加費用ゼロ
  5. PriceSection        3プラン価格
  6. PostPricingEditorialGallery  呼吸帯(写真マルキー)

  【④商品の魅力】
  7. LotsSection         土地6件 teaser → /lots
  8. FreedomOfDesign     完全自由設計
  9. StandardAndQualitySection  標準仕様

  【⑤社会的証明(信頼)】
  10. StaffStory         19人 teaser → /staff
  11. VoiceSection       3件 teaser → /voice (※近日 teaser 化予定)
  12. WorksSection       3件 teaser → /works (※新ページ作成予定)

  【⑥行動喚起①】
  13. MidCta             ここまで読んで

  【⑦行動直前】
  14. FlowSection        家づくりの流れ
  15. MoneyTalkSection   お金の話 teaser → /money (※新ページ作成予定)
  16. FaqSection         残不安

  【⑧クロージング】
  17. AccessSection      会社概要
  18. FinalCta           決断

  --- 削除済 ---
  - HeroVoiceMagazine: Hero直後の二度打ちで dilution(声は #11 で見せる)
  - EditorialPhotoGallery(前): #6 の PostPricing と同種で重複
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
        <PostPricingEditorialGallery />
        <LotsSection />
        <FreedomOfDesign />
        <StandardAndQualitySection />
        <StaffStory />
        <VoiceSection />
        <WorksSection />
        <MidCta />
        <FlowSection />
        <MoneyTalkSection />
        <FaqSection />
        <AccessSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
