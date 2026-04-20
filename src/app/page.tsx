import Header from "@/components/Header";
import HeroMagazine from "@/components/sections/HeroMagazine";
import {
  FONT_VARIANTS,
  BODY_VARIANTS,
} from "@/components/sections/HeroMagazine.fonts";
import HeroVoiceMagazine from "@/components/sections/HeroVoiceMagazine";

// 確定組合せ: B(Shippori Mincho) + IV(Industrial: Oswald + Noto Sans JP 500)
const HERO_HEADLINE_VARIANT =
  FONT_VARIANTS.find((v) => v.id === "shippori") ?? FONT_VARIANTS[0];
const HERO_BODY_VARIANT =
  BODY_VARIANTS.find((v) => v.id === "industrial-bold") ?? BODY_VARIANTS[0];
import ConceptSection from "@/components/sections/ConceptSection";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import MechanismSection from "@/components/sections/MechanismSection";
import EditorialPhotoGallery from "@/components/sections/EditorialPhotoGallery";
import StandardSection from "@/components/sections/StandardSection";
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

/*
  22セクション構成（PRICING〜MoneyTalk間に編集ギャラリー帯を追加）

  家を買う人の思考順に寄り添う構造：
  土地 → お金 → 比較 → やまとならなんとかなるかも。

  【① フック】
  1. Hero              C-2 Magazine Editorial（諦めたもの…標準になる家。 + 2,280万〜・権威バッジ込み）

  【② 共感 — 諦めかけたあなたへ】
  2. Concept          核メッセージ（ダーク帯・旧FounderQuoteの重複コピーは統合のため削除）

  【③ 比較と納得 — 大手と何が違うか】
  3. Mechanism        価格のカラクリ（理屈）
  4. Comparison(新)   大手 vs やまと（証拠）
  （ギャラリー帯）    竣工写真の流れ（Zero の直前）
  5. Zero             追加費用ゼロ

  【④ 実現可能性 — 払えるのか】
  7. Price            料金目安（2,480万〜バーン）
  （ギャラリー帯）    PRICING直後・編集写真（紙が語るトーン／ダーク帯）
  8. MoneyTalk(新)    お金の話、まず気軽に（FP・つなぎ融資なし）

  【⑤ 土地の安心 — 最初の悩み】
  9. Lots(前倒し)     まず、土地の話から（土地＋建物セット提案）

  【⑥ 商品の魅力】
  10. FreedomOfDesign 完全自由設計
  11. Standard        標準仕様

  【⑦ 信頼の裏付け】
  12. Quality         品質
  13. Guarantee       保証
  14. StaffStory      19人の職人

  【⑧ 実例】
  15. Voice           お客様の声
  16. Works           施工事例

  【⑨ 行動喚起①】
  17. MidCta          ここまで読んで

  【⑩ 行動直前】
  18. Flow            家づくりの流れ
  19. FAQ             残存不安

  【⑪ クロージング】
  20. Access          会社概要
  21. FinalCta        決断
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
        <HeroVoiceMagazine />
        <ConceptSection />
        <MechanismSection />
        <EditorialPhotoGallery />
        <ZeroDeclaration />
        <PriceSection />
        <PostPricingEditorialGallery />
        <MoneyTalkSection />
        <LotsSection />
        <FreedomOfDesign />
        <StandardAndQualitySection />
        <StaffStory />
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
