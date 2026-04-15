import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import ConceptSection from "@/components/sections/ConceptSection";
import FounderQuote from "@/components/sections/FounderQuote";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import MechanismSection from "@/components/sections/MechanismSection";
import StandardSection from "@/components/sections/StandardSection";
import FreedomOfDesign from "@/components/sections/FreedomOfDesign";
import PriceSection from "@/components/sections/PriceSection";
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
  19セクション構成（感情導線 / 2026-04-15 TrustBar削除）:

  【① フック — 3秒で興味】
  1. Hero           驚き（2,480万〜・権威バッジ込み）

  【② 共感 — 自分の話だと感じさせる】
  2. Concept        共感（諦めていた家が）
  3. FounderQuote   代表の問いかけ

  【③ 解決の仕組み — なぜ可能なのか】
  4. Mechanism      価格の構造（大手 vs やまと）
  5. Zero           追加費用もゼロ（9つの¥0）
  6. FreedomOfDesign 完全自由設計（花・風・京は出発点）
  7. Standard       設備が標準（Bento — 自由設計の中の標準仕様として）
  8. Price          参考プランと価格帯

  【④ 信頼の裏付け — ちゃんとした会社】
  9. Quality        品質の裏付け
  10. Guarantee     建てた後の安心
  11. StaffStory    19人の職人（以降の実例に温度を宿す）

  【⑤ 実例 — 共感×視覚のピーク】
  12. Voice         お客様の声
  13. Works         施工事例

  【⑥ 行動喚起①】
  14. MidCta        「ここまで読んでいただいたあなたへ」（感情ピーク直後）

  【⑦ 選択肢の提示】
  15. Lots          分譲地（土地の武器）

  【⑧ 行動直前の導線】
  16. Flow          家づくりの流れ（行動直前のイメージ可能化）
  17. FAQ           残存不安

  【⑨ クロージング】
  18. Access        会社情報
  19. FinalCta      決断
*/

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCatalog />
        <ConceptSection />
        <FounderQuote />
        <MechanismSection />
        <ZeroDeclaration />
        <FreedomOfDesign />
        <StandardSection />
        <PriceSection />
        <QualitySection />
        <GuaranteeSection />
        <StaffStory />
        <VoiceSection />
        <WorksSection />
        <MidCta />
        <LotsSection />
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
