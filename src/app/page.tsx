import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import ConceptSection from "@/components/sections/ConceptSection";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import MechanismSection from "@/components/sections/MechanismSection";
import ComparisonTable from "@/components/sections/ComparisonTable";
import EditorialPhotoGallery from "@/components/sections/EditorialPhotoGallery";
import StandardSection from "@/components/sections/StandardSection";
import FreedomOfDesign from "@/components/sections/FreedomOfDesign";
import PriceSection from "@/components/sections/PriceSection";
import MoneyTalkSection from "@/components/sections/MoneyTalkSection";
import QualitySection from "@/components/sections/QualitySection";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import MidCta from "@/components/sections/MidCta";
import VoiceSection from "@/components/sections/VoiceSection";
import WorksSection from "@/components/sections/WorksSection";
import FlowSection from "@/components/sections/FlowSection";
import LotsSection from "@/components/sections/LotsSection";
import StaffStory from "@/components/sections/StaffStory";
import FaqSection from "@/components/sections/FaqSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

/*
  21セクション構成（Phase 1リファクタ / 2026-04-16・FounderQuote統合 + ギャラリー帯）

  家を買う人の思考順に寄り添う構造：
  土地 → お金 → 比較 → やまとならなんとかなるかも。

  【① フック】
  1. Hero              驚き（2,480万〜・権威バッジ込み）

  【② 共感 — 諦めかけたあなたへ】
  2. Concept          核メッセージ（ダーク帯・旧FounderQuoteの重複コピーは統合のため削除）

  【③ 比較と納得 — 大手と何が違うか】
  3. Mechanism        価格のカラクリ（理屈）
  4. Comparison(新)   大手 vs やまと（証拠）
  （ギャラリー帯）    竣工写真の流れ（Zero の直前）
  5. Zero             追加費用ゼロ

  【④ 実現可能性 — 払えるのか】
  7. Price            料金目安（2,480万〜バーン）
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
        <HeroCatalog />
        <ConceptSection />
        <MechanismSection />
        <ComparisonTable />
        <EditorialPhotoGallery />
        <ZeroDeclaration />
        <PriceSection />
        <MoneyTalkSection />
        <LotsSection />
        <FreedomOfDesign />
        <StandardSection />
        <QualitySection />
        <GuaranteeSection />
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
