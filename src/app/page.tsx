import Header from "@/components/Header";
import HeroVideo from "@/components/sections/HeroVideo";
import TrustStrip from "@/components/sections/TrustStrip";
// 2026-05-08 v4: Hero を動画ブランドフィルム + TRACK RECORD オーバーレイ に刷新。
//   - HeroMagazine(写真スライドショー + 価格 + CTA)を HeroVideo に差し替え
//   - ScaleBanner(4実績バーン)は HeroVideo の overlay に統合済み → 撤去
//   - HeroMagazine.tsx / ScaleBanner.tsx は残置(納品時削除候補、戻す可能性のため保持)
//   memory: project_next_fv_plan_video_overlay.md / project_video_assets_archive.md
import StandardComparisonBlueprint from "@/components/sections/StandardComparisonBlueprint";
import StickyMechanismPin from "@/components/sections/StickyMechanismPin";
import StandardCrossSection from "@/components/sections/StandardCrossSection";
import StandardEquipment from "@/components/sections/StandardEquipment";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import RepresentativeMessage from "@/components/sections/RepresentativeMessage";
import PriceSection from "@/components/sections/PriceSection";
import PhotoBreath from "@/components/sections/PhotoBreath";
import MiniSimulator from "@/components/sections/MiniSimulator";
import LotsSection from "@/components/sections/LotsSection";
import WorksSection from "@/components/sections/WorksSection";
import GoogleReviewBridge from "@/components/sections/GoogleReviewBridge";
import { GOOGLE_BRIDGE_ENABLED } from "@/data/google";
import VoiceSection from "@/components/sections/VoiceSection";
import MidCta from "@/components/sections/MidCta";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

/*
  TOP 構成 — 2026-05-08 v4 (動画FV + TrackRecord overlay)

  【フック・権威】
  1. HeroVideo             21秒のブランドフィルム + TRACK RECORD overlay + CTA
  ※ ScaleBanner は HeroVideo の overlay に統合済みのため撤去

  【理屈・証拠】
  3. MechanismEnhanced     坪単価比較 + 3つの仕組み
  4. ZeroDeclaration       8項目¥0テーブル(既に整理済み)
  5. PriceSection          3プラン価格

  【商品魅力(縮減・能動性)】
  6. MiniSimulator         3項目入力で概算建築費(新規・自分ごと化)
  7. LotsSection           AREAマップ+チップ(刷新・対応エリア訴求)
  ---
  ※ 2026-05-06: PerformanceGrid を撤去。同情報は StandardEquipment v2 の
    Bento + 性能ピル行に統合(design-critic 指摘#2 「標準装備が2回出る」)。

  【社会的証明(カルーセル化)】
  9. WorksSection          施工事例カルーセル
  10. VoiceSection         お客様の声カルーセル(シネマグラフ含む)

  【行動】
  11. MidCta               中間CTA
  12. FaqSection           2列折りたたみFAQ
  13. FinalCta             3カード締め(来場/資料/電話)

  --- 削除済(段階3で整理) ---
  - PhotoBreath ×2: 呼吸帯、現状のスクロール量を考えると過剰
  - StandardAndQualitySection: PerformanceGrid に役割吸収(12商品グリッドは
    別途別ページに移管予定 or 将来の /standards ページ)
  - FreedomOfDesign: PerformanceGrid に統合
  - FlowSection: /money の Q.08 に同等情報あり、TOPからは外す
  - AccessSection: フッターに本社住所があり、TOPでの再掲は dilution
*/

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-[72px] md:pb-0">
        {/* フック・権威 */}
        <HeroVideo />
        <TrustStrip />

        {/* 理屈・証拠 */}
        {/* 2026-05-08: 比較セクションを建築図面エディトリアル(StandardComparisonBlueprint) に
            刷新。立面図 + ink-line house illustration + 緑/サンドの二大カードで再構成。
            旧 MechanismEnhanced の bridge + 3 reasons は StickyMechanismPin に直結。 */}
        <StandardComparisonBlueprint />
        <StickyMechanismPin />
        <StandardCrossSection />
        <StandardEquipment />
        <ZeroDeclaration />
        {/* 代表 + 専務の顔と署名級メッセージ — 仕様/¥0 と価格の間に「これを守る人」を1呼吸 */}
        <RepresentativeMessage />
        <PriceSection />

        {/* 写真ブレイク — 価格ダッシュボードと能動UIの間に呼吸帯を1枚 */}
        <PhotoBreath
          src="/images/newsozai/exterior-terrace-01.webp"
          alt="やまと不動産が手がけた住まいの外観 — テラスのある夕景"
          aspectMobile="aspect-[4/3]"
          aspectDesktop="md:aspect-[21/8]"
        />

        {/* 商品魅力(能動性) */}
        <MiniSimulator />
        <LotsSection />

        {/* 社会的証明(カルーセル) */}
        <WorksSection />
        {/* 信頼ブリッジ(★4.5+ 達成後に再公開) —
            2026-05-07: 現状 ★3.6/51件で目標 ★4.5以上×30件超 未達のため env で off。
            Vercel に NEXT_PUBLIC_GOOGLE_BRIDGE_ENABLED=true を入れると復活する。 */}
        {GOOGLE_BRIDGE_ENABLED && <GoogleReviewBridge />}
        <VoiceSection />

        {/* 行動 */}
        <MidCta />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
