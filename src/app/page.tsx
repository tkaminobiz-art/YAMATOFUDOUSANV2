import Header from "@/components/Header";
import HeroVideo from "@/components/sections/HeroVideo";
import TrustStrip from "@/components/sections/TrustStrip";
// 2026-05-08 v4: Hero を動画ブランドフィルム + TRACK RECORD オーバーレイ に刷新。
//   - HeroMagazine(写真スライドショー + 価格 + CTA)を HeroVideo に差し替え
//   - ScaleBanner(4実績バーン)は HeroVideo の overlay に統合済み → 撤去
//   - HeroMagazine.tsx / ScaleBanner.tsx は残置(納品時削除候補、戻す可能性のため保持)
//   memory: project_next_fv_plan_video_overlay.md / project_video_assets_archive.md
// 2026-05-09: StandardComparisonBlueprint (花/風/京 比較 table) を TOP から撤去。
//   理由: PriceSection と同じ製品ラインを 2 セクションで紹介する構造重複 + placeholder
//   嘘データ問題 (LIXIL 系等)。PriceSection を Hero/Trust 直下に昇格させ、
//   それが「3 プランの導入 + 詳細」を 1 本で担う構造に再編。
//   StandardComparisonBlueprint.tsx ファイル本体は撤去候補メモリで保持 (戻す可能性のため)。
// 2026-05-09: StickyMechanismPin (3 photo + text panels) を撤去し、
//   CostPride (実写ブランドフィルム + キネティックタイポ) に差し替え。
//   理由: FIG.01 cross-section / FIG.02 ZeroDecl の手描き ink との同型反復回避、
//   かつ「同品質を、適正価格で」のストーリーを 1 本の動画で物語る。
//   StickyMechanismPin.tsx ファイル本体は撤去候補メモリで保持 (戻す可能性のため)。
import CostPride from "@/components/sections/CostPride";
// 2026-05-09 Step 5: StandardCrossSection + StandardEquipment + ZeroDeclaration を
//   1 つの StandardIncluded セクションに統合 (TOP 軽量化)。
//   旧 3 ファイルは保持 (戻す可能性 / 詳細ページで再利用)。
import StandardIncluded from "@/components/sections/StandardIncluded";
// 2026-05-09: RepresentativeMessage (古谷社長+小林専務 portrait+quote) を TOP から撤去。
//   理由: ユーザー判断で TOP では不要。/staff 配下に主役配置するか判断保留。
//   RepresentativeMessage.tsx ファイル本体は戻す可能性のため保持 (撤去候補メモリ)。
import PriceSection from "@/components/sections/PriceSection";
// 2026-05-09: ZeroDeclaration 直下に MapBridge (ARM オマージュの物件情報入口) を新設。
//   MiniSimulator (かんたん試算) と LotsSection (対応エリア) は TOP から撤去。
//   理由: 「物件情報ページへの動線をおしゃれに」(ユーザー判断)。試算と対応エリアは
//   /money / /lots で詳細対応する。MiniSimulator.tsx / LotsSection.tsx ファイル本体は
//   戻す可能性のため保持 (撤去候補メモリ管理)。
import MapBridge from "@/components/sections/MapBridge";
// 2026-05-09: PhotoBreath を TOP から撤去 (ユーザー判断・冗長)。
//   ファイル本体は他ページで使う可能性があるため保持。
// 2026-05-09 Phase 1: BreathStrip (parallax 装飾) 導入。
//   ① TrustStrip↘Price 間に "Brand Whisper" (golden hour exterior 写真)
//   詳細は BreathStrip.tsx 参照。
import BreathStrip from "@/components/sections/BreathStrip";
// 2026-05-09 Step 6: WorksSection + VoiceSection を 1 つの SocialProof セクションに統合。
//   旧 2 ファイルは保持 (戻す可能性 / 詳細ページで再利用)。
import SocialProof from "@/components/sections/SocialProof";
// 2026-05-09 Step 6: WorksSection / VoiceSection は SocialProof に統合済み。
//   GoogleReviewBridge は env で off の状態を維持 (★4.5+ 達成後再公開予定)。
// 2026-05-09 Step 3: MidCta を TOP から撤去 (FinalCta に統合)。
//   ファイル本体は他ページで使う可能性のため保持。
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

        {/* 2026-05-09: BreathStrip (Brand Whisper) を Hero/Trust 直下から
            SocialProof → FaqSection の間に移動。理由: Hero (動画100vh) で既に
            最大強度の atmospheric setup が完了しているのに、直後に同温度の
            golden hour 写真を入れると Hero の効きを薄め、scroll momentum も
            2 度止まる。新位置では「家族3組の物語(感情) → FAQ(機能)」の
            切り替えクッションとして文脈を持つ。 */}

        {/* 商品の導入 + 詳細 — 2026-05-09 から PriceSection を Hero/Trust 直下に昇格。
            旧 StandardComparisonBlueprint (比較 table) は撤去し、PriceSection cover-card
            edition が 3 プランの「導入 + 詳細」を 1 セクションで担う。 */}
        <PriceSection />

        {/* 理屈・証拠 — なぜこの価格で建てられるのか / 同品質と追加費用ゼロを 1 セクションで */}
        <CostPride />
        <StandardIncluded />

        {/* 2026-05-09 Step 1: ② Quiet Pause BreathStrip を撤去 (TOP 軽量化方針)。
            BreathStrip は最大 1 本 (① Brand Whisper) のみ残す。 */}

        {/* 物件情報への動線 — ARM オマージュのおしゃれなマップで /lots へ橋渡し
            (旧 MiniSimulator + LotsSection は撤去) */}
        <MapBridge />

        {/* 社会的証明 — 2026-05-09 Step 6: Works + Voice を SocialProof に統合
            (建てた家 3 + 暮らしている人の声 3 を 1 セクションで) */}
        <SocialProof />

        {/* Brand Whisper — 家族3組の物語(感情) → FAQ(機能) への切り替えクッション。
            golden hour の家+山並み写真を parallax で見せ、感情の余韻を伸ばしてから
            機能的 Q&A へ着地させる。 */}
        <BreathStrip
          variant="photo"
          src="/images/breath/brand-whisper.png"
          alt="奈良の山並みを背景に佇む、当社が手がけた住まい — golden hour"
          heightClass="h-[55vh] md:h-[60vh]"
          parallaxStrength={0.25}
        />

        {/* 行動 — 2026-05-09 Step 3: MidCta を撤去し FinalCta に統合。
            FinalCta が既に総額診断 + 4 特徴アイコン + stats + LINE/見学/資料請求 の
            包括 CTA を持つため単独で十分。MidCta.tsx ファイル本体は保持 (戻す可能性)。 */}
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
