/**
 * LabDisclaimer — /b-plan-v3 はプレビュー（差し替え未決）であることの明示帯。
 *
 * BRAND-TRUTH の §1タイポ / §6コピー / §1色 の正式更新は「昇格時」。
 * 本ルートはその昇格前の比較用候補なので、誤って本番扱いしないための注意書き。
 * 画面最上部・固定ヘッダーの上に出す（sticky でなく通常フロー）。
 */
export default function LabDisclaimer() {
  return (
    <div
      role="note"
      className="surface-ink border-b border-cream/15 px-5 py-2.5 text-center md:px-10"
    >
      <p className="t-body text-[11px] leading-relaxed text-cream/75 md:text-[12px]">
        これはTOPリブート候補プレビューです。差し替えは未決。BRAND-TRUTH
        §1タイポ／§6コピー／§1色の正式更新は昇格時に行います。
      </p>
    </div>
  );
}
