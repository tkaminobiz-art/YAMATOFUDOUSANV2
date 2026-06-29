import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import ProductCatalog from "./S08.client";

/**
 * S08 — 商品ライン｜花→風→京（カタログの潔さ）
 *
 * 確定フレームワーク §S S08 ビルドカード:
 * - 役割/段: ①大手と同品質の素材・装備。段=5。surface=ivory（白・カタログ）。主タイプ=T2/T5。
 * - 主役: t-h2（モデル名見出し）＋3 cover card（t-burn-sub の静止価格）。
 *   花=lime tint・価格 lime 強調／京=white・lime tint なし。順序固定 花→風→京。
 *   カタログの潔さ＝均等3カードでなく花にバッジで非対称。
 * - モーション: M6 3カード reveal stagger（Y+16→0/IO once/120ms）。
 *   M7 花バッジ fade-in（パルス/発光禁止/M6+300ms）。価格はカウントアップしない。
 * - コピー: 花2,480万円〜（33坪/4LDK）「いちばん選ばれています」バッジ／風2,480万円〜（30坪/4LDK）／
 *   京2,280万円〜（28坪/3LDK）。表記 KYO（MIYAKO 禁止）。京=entry 役（廉価版表現禁止）。
 *   価格は BRAND-TRUTH §2.1 canonical 厳守。価値3円図は S08 前には置かない（S06 末に配置済み）。
 * - CTA: 各カードに静かな tertiary（text-link → /money）。
 *
 * 契約: `export default function S08(): JSX.Element`（props 無し・サーバー既定）。
 * モーション（useScrollIn）が要る図だけを子コンポーネント（S08.client.tsx）に切り出している。
 */
export default function S08() {
  return (
    <SectionShell surface="ivory" aria-label="商品ライン｜花・風・京">
      <div className="max-w-[760px]">
        <Eyebrow>Product Line</Eyebrow>

        <h2 className="t-h2 text-ink">
          選べる3つのモデル
        </h2>

        <p className="t-body mt-6 text-ink-muted">
          花・風・京。どのモデルも、大手と同じ品質の素材と装備を標準にしています。広さと間取りで選んでも、価格はそのまま土地込みの総額でお見せします。
        </p>
      </div>

      {/* 3 cover card（花→風→京・花バッジで非対称・価格静止） */}
      <ProductCatalog />

      <p className="t-body mt-8 text-[13px] text-ink-muted">
        ※価格は税込・建物本体＋付帯工事込みの目安です。標準仕様の詳細は
        <a href="/money" className="font-bold text-main underline-offset-2 hover:underline">
          資金計画
        </a>
        でご確認いただけます。
      </p>
    </SectionShell>
  );
}
