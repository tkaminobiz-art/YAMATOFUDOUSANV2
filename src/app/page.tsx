import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import TrustBar from "@/components/sections/TrustBar";
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
  20セクション構成（感情導線に沿った再編成）:

  【① フック — 3秒で興味】
  1. Hero           驚き（2,480万〜）
  2. TrustBar       信頼の数字（マーキー）

  【② 共感 — 自分の話だと感じさせる】
  3. Concept        共感（諦めていた家が）
  4. FounderQuote   代表の問いかけ

  【③ 解決の仕組み — なぜ可能なのか】
  5. Mechanism      価格の構造（大手 vs やまと）
  6. Zero           追加費用もゼロ
  7. Standard       設備が標準（Bento）
  8. FreedomOfDesign 完全自由設計（花・風・京は出発点）
  9. Price          参考プランと価格帯

  【④ 信頼の裏付け — ちゃんとした会社】
  10. Quality       品質の裏付け
  11. Guarantee     建てた後の安心
  12. StaffStory    19人の職人（← 前倒し。以降の実例に温度を宿す）

  【⑤ 実例 — 共感×視覚のピーク】
  13. Voice         お客様の声
  14. Works         施工事例

  【⑥ 行動喚起①】
  15. MidCta        「ここまで読んでいただいたあなたへ」（← 感情ピーク直後に移動）

  【⑦ 選択肢の提示】
  16. Lots          分譲地（土地の武器）

  【⑧ 行動直前の導線】
  17. Flow          家づくりの流れ（← 行動直前のイメージ可能化）
  18. FAQ           残存不安

  【⑨ クロージング】
  19. Access        会社情報
  20. FinalCta      決断
*/

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCatalog />
        <TrustBar />
        <ConceptSection />
        <FounderQuote />
        <MechanismSection />
        <ZeroDeclaration />
        <StandardSection />
        <FreedomOfDesign />
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
