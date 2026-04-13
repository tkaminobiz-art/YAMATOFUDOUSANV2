import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import ConceptSection from "@/components/sections/ConceptSection";
import FounderQuote from "@/components/sections/FounderQuote";
import StandardSection from "@/components/sections/StandardSection";
import PriceSection from "@/components/sections/PriceSection";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import QualitySection from "@/components/sections/QualitySection";
import FounderQuote2 from "@/components/sections/FounderQuote2";
import MidCta from "@/components/sections/MidCta";
import VoiceSection from "@/components/sections/VoiceSection";
import WorksSection from "@/components/sections/WorksSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

/*
  感情導線:
  1. Hero        → 「おっ、この価格で？」（驚き）
  2. Concept     → 「諦めてた家が建つ」（共感）
  3. FounderQuote→ 「看板の差だ」（衝撃。ダーク背景で視覚的破り）
  4. Standard    → 「本当にこの設備が標準？」（証明）
  5. Price       → 「具体的にいくら？」（納得）
  6. Zero        → 「追加費用もゼロ」（安心）
  7. Quality     → 「安いだけじゃない」（信頼深化）
  8. Quote2      → 「引き渡しの日のほうが仲がいい」（感情。薄緑背景で呼吸）
  9. MidCTA      → 「見に行ってみようかな」（行動喚起）
  10. Voice      → 「実際に建てた人が言ってる」（社会的証明）
  11. Works      → 「こういう家が建つんだ」（実感）
  12. Access     → 「どこにあるの？」（情報）
  13. FinalCTA   → 「行こう」（決断）

  レイアウトパターンの配列:
  Hero(フル幅) → Concept(非対称) → Quote(フルブリード/ダーク) →
  Standard(Bento) → Price(中央テーブル) → Zero(均等グリッド) →
  Quality(非対称sticky) → Quote2(フルブリード/薄緑) →
  MidCTA(中央) → Voice(2列カード) → Works(非対称交互) →
  Access(2列+テーブル) → FinalCTA(中央)

  → 同一パターンの連続なし。ダーク/薄緑の挿入で視覚リズムに変化。
*/

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCatalog />
        <ConceptSection />
        <FounderQuote />
        <StandardSection />
        <PriceSection />
        <ZeroDeclaration />
        <QualitySection />
        <FounderQuote2 />
        <MidCta />
        <VoiceSection />
        <WorksSection />
        <AccessSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
