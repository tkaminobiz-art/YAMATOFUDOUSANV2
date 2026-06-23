/* 補償パネル — 賃貸 vs 持ち家(SimWire)の隣に置く「万が一の備え」。
   素材＝公式逐語 + パンフ p.11 逐語(docs/project-context/yamato-words-bank.md §4・§8-1)。
   確定(2026-06-23 神野さん裁定)：
     - 地盤保証 20年（JHS提携。パンフの10年は基本/旧product、実際は20年）
     - 建物保証 原則10年（JIOわが家の保険・国土交通大臣指定の第三者機関）
     - しろあり保証 10年（BRAND-TRUTH §2）
     - 機関名(JIO/JHS)を明記する／図解を入れる
     - 点検回数・団信・火災保険は無記載
   図解はパンフ断面図の複製ではなく、概念を伝えるオリジナルの線画SVG。
   デザインは SimWire と同言語：1px罫線・mono明細・Oswald数字・影なし・vivid red。 */

const WARRANTIES = [
  {
    name: "地盤保証",
    prefix: "",
    years: "20",
    unit: "年",
    desc: "不同沈下があっても、修理費と仮住まいの費用を保証。調査・解析は専門のJHS（ジャパンホームシールド）と提携しています。",
  },
  {
    name: "しろあり保証",
    prefix: "",
    years: "10",
    unit: "年",
    desc: "土台と、その1メートル上まで、防蟻処理をしています。",
  },
  {
    name: "建物保証",
    prefix: "原則",
    years: "10",
    unit: "年",
    desc: "JIOわが家の保険（国土交通大臣指定の第三者機関）。構造と防水の瑕疵を、保険でカバーします。",
  },
] as const;

const AFTER_ITEMS =
  "蛇口の水漏れ・網戸の張替え・鍵・畳・水栓・クリーニング ほか";

export default function WarrantyPanel() {
  return (
    <div className="border border-hair bg-paper p-6 md:p-8">
      <p className="font-mono text-[11px] tracking-wide text-slate">RISK COVER</p>
      <h3 className="mt-2 text-[18px] font-bold leading-[1.5] text-noir">
        引き渡したあとも、続きます
      </h3>

      {/* 3つの保証 */}
      <div className="mt-6 border-t border-noir">
        {WARRANTIES.map((w) => (
          <div
            key={w.name}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-hair py-4"
          >
            <div>
              <p className="text-[14px] font-bold text-noir">{w.name}</p>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-slate">{w.desc}</p>
            </div>
            <p className="flex items-baseline gap-0.5 whitespace-nowrap">
              {w.prefix && (
                <span className="font-mono mr-0.5 text-[10px] text-slate">{w.prefix}</span>
              )}
              <span className="num-tnum font-oswald text-[34px] leading-none text-noir">
                {w.years}
              </span>
              <span className="font-mono text-[11px] text-slate">{w.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* 図解：保険でカバーされる部位（構造／防水） */}
      <figure className="mt-6 border border-hair p-4">
        <figcaption className="font-mono text-[10px] tracking-wide text-slate">
          建物保証でカバーする部位
        </figcaption>
        <svg
          viewBox="0 0 220 150"
          className="mt-2 h-auto w-full"
          role="img"
          aria-label="家の断面図。屋根・外壁・開口部が雨水の浸入を防ぐ部分、柱・横架材・斜材・土台・基礎が構造耐力上主要な部分。"
        >
          {/* 雨水の浸入を防ぐ部分：屋根・外壁・開口部（vivid red） */}
          <g fill="none" style={{ stroke: "var(--color-signal)" }} strokeWidth="2" strokeLinejoin="round">
            <path d="M26 60 L110 16 L194 60" />
            <line x1="44" y1="60" x2="44" y2="120" />
            <line x1="176" y1="60" x2="176" y2="120" />
          </g>
          <rect x="150" y="82" width="16" height="22" fill="none" style={{ stroke: "var(--color-signal)" }} strokeWidth="1.5" />
          {/* 構造耐力上主要な部分：柱・横架材・斜材・土台・基礎（noir） */}
          <g fill="none" style={{ stroke: "var(--color-noir)" }} strokeWidth="1.3">
            <line x1="44" y1="60" x2="176" y2="60" />
            <line x1="82" y1="60" x2="82" y2="120" />
            <line x1="118" y1="60" x2="118" y2="120" />
            <line x1="82" y1="88" x2="118" y2="88" />
            <line x1="82" y1="120" x2="118" y2="88" />
            <line x1="44" y1="120" x2="176" y2="120" />
          </g>
          {/* 基礎 */}
          <rect x="44" y="120" width="132" height="13" fill="none" style={{ stroke: "var(--color-noir)" }} strokeWidth="1" />
          <g style={{ stroke: "var(--color-noir)" }} strokeWidth="0.6" opacity="0.5">
            <line x1="56" y1="133" x2="64" y2="120" />
            <line x1="76" y1="133" x2="84" y2="120" />
            <line x1="96" y1="133" x2="104" y2="120" />
            <line x1="116" y1="133" x2="124" y2="120" />
            <line x1="136" y1="133" x2="144" y2="120" />
            <line x1="156" y1="133" x2="164" y2="120" />
          </g>
        </svg>
        {/* 凡例 */}
        <div className="mt-3 grid gap-1.5 border-t border-hair pt-3">
          <span className="flex items-center gap-2 text-[11px] text-noir">
            <span className="h-2.5 w-2.5 shrink-0" style={{ background: "var(--color-signal)" }} />
            雨水の浸入を防ぐ部分（屋根・外壁・開口部）
          </span>
          <span className="flex items-center gap-2 text-[11px] text-noir">
            <span className="h-2.5 w-2.5 shrink-0" style={{ background: "var(--color-noir)" }} />
            構造耐力上主要な部分（柱・土台・基礎ほか）
          </span>
        </div>
      </figure>

      {/* 入居後のアフター */}
      <p className="mt-6 text-[13px] font-bold text-noir">住んでからの困りごとも、電話一本で。</p>
      <p className="mt-2 text-[12px] leading-[1.9] text-slate">{AFTER_ITEMS}</p>

      {/* 当社がなくなっても続く（JIO＝第三者機関の裏付け） */}
      <p className="font-mono mt-5 border-t border-hair pt-4 text-[11px] leading-[1.8] text-mist">
        万が一、当社がなくなっても、保証は続きます。
      </p>
    </div>
  );
}
