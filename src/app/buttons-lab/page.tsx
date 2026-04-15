"use client";

/*
  ボタン・デモンストレーション・ページ
  神野さん用：全パターンをホバーして触って選ぶための実験室

  カテゴリ：
  ① 本命3案（やまと提案）
  ② 2026年トレンド5パターン
  ③ 角丸バリエーション
  ④ テキスト階層化バリエーション
  ⑤ サイズバリエーション
*/

import { ArrowRight, MessageCircle, Phone, Mail, Calendar } from "lucide-react";

// ─── 共通：セクションラッパー ───
function LabSection({
  num,
  title,
  desc,
  children,
}: {
  num: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-24 md:mb-32">
      <div className="mb-8 md:mb-10 max-w-[720px]">
        <p className="font-section-label text-accent text-xs md:text-sm mb-3 tracking-[0.15em]">
          {num}
        </p>
        <h2 className="text-[clamp(22px,2.8vw,32px)] text-text-primary mb-2 leading-[1.5]">
          {title}
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          {desc}
        </p>
      </div>
      {children}
    </section>
  );
}

// ─── 共通：ボタン1つを陳列するセル ───
function Cell({
  label,
  bg = "bg-bg-primary",
  children,
}: {
  label: string;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${bg} rounded-lg p-6 md:p-8 border border-border`}>
      <p className="text-text-secondary text-[11px] tracking-wider mb-5 font-medium uppercase">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default function ButtonsLab() {
  return (
    <main className="bg-bg-primary min-h-screen pb-32">
      {/* ===== ヘッダー ===== */}
      <div className="bg-text-primary text-white">
        <div className="max-w-[1200px] mx-auto px-[var(--page-px)] py-12 md:py-16">
          <p className="font-section-label text-accent text-xs md:text-sm mb-3 tracking-[0.2em]">
            BUTTONS LAB
          </p>
          <h1 className="text-[clamp(28px,4vw,52px)] mb-4 leading-[1.3]">
            ボタン実験室
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[640px]">
            やまと不動産HPで使うボタンの全パターンを並べました。実際にホバーして、好きなものを選んでください。
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-[var(--page-px)] pt-16 md:pt-20">
        {/* ===== ① 本命3案 ===== */}
        <LabSection
          num="01 — RECOMMENDED"
          title="やまと用・本命3案"
          desc="Primary（来場予約）/ Secondary（資料請求）/ Tertiary（LINE）の階層を統一した推奨デザイン。"
        >
          <Cell label="Primary — シマー × アロー × 2層テキスト">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center min-h-[56px] px-8 py-4 overflow-hidden bg-accent text-white rounded transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(196,112,63,0.45)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
              />
              <span className="relative flex flex-col items-start mr-3">
                <span className="text-base font-medium leading-tight">
                  来場予約
                </span>
                <span className="text-[11px] text-white/75 leading-tight mt-0.5">
                  ご予約不要・無料
                </span>
              </span>
              <span className="relative transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </span>
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="Secondary — アウトライン → フィル × アロー">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center min-h-[56px] px-8 py-4 overflow-hidden border border-text-primary text-text-primary rounded transition-colors duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-text-primary transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative text-base font-medium mr-3">
                資料請求（無料）
              </span>
              <span className="relative transition-transform duration-[400ms] group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </span>
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="Tertiary — ピル × LINEブランド色 × アイコン">
            <a
              href="#"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#06C755] text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_24px_-4px_rgba(6,199,85,0.4)]"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              LINEで聞く
            </a>
          </Cell>
        </LabSection>

        {/* ===== ② 2026年トレンド5パターン ===== */}
        <LabSection
          num="02 — TRENDS 2026"
          title="2026年のボタン・5大パターン"
          desc="リサーチで抽出した、トップデザイナーが現在採用している主流のボタンスタイル。"
        >
          <Cell label="A. アウトライン → フィル（住宅・高級系◎）">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center min-h-[52px] px-8 py-3 overflow-hidden border border-accent text-accent rounded transition-colors duration-[400ms] hover:text-white"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative text-base font-medium">
                来場予約する
              </span>
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="B. シマー（光が斜めに走る）">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center min-h-[52px] px-8 py-3 overflow-hidden bg-main text-white rounded transition-all duration-[400ms] hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[800ms] ease-out group-hover:translate-x-full"
              />
              <span className="relative text-base font-medium">
                来場予約する
              </span>
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="C. アロー連動（テキストと矢印が一緒に動く）">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-3 bg-accent text-white rounded transition-all duration-300 hover:gap-4"
            >
              <span className="text-base font-medium">来場予約する</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="D. 3D Press（押される物理感）" bg="bg-bg-secondary">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-accent text-white text-base font-medium rounded transition-all duration-150 shadow-[0_6px_0_0_#9C5424] hover:translate-y-1 hover:shadow-[0_2px_0_0_#9C5424] active:translate-y-1.5 active:shadow-[0_0px_0_0_#9C5424]"
            >
              来場予約する
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="E. グラスモーフィズム（ダーク背景でのみ機能）" bg="bg-text-primary">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 text-white text-base font-medium rounded transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              来場予約する
            </a>
          </Cell>
        </LabSection>

        {/* ===== ③ 角丸バリエーション ===== */}
        <LabSection
          num="03 — RADIUS"
          title="角丸の比較"
          desc="同じデザインで角丸だけを変えた比較。住宅サイトには 0px もしくは 2px が品格を出すと推奨。"
        >
          <Cell label="角丸 0px（直角・最も建築的）">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-accent text-white text-base font-medium rounded-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              来場予約する
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 border border-text-primary text-text-primary text-base font-medium rounded-none transition-colors duration-300 hover:bg-text-primary hover:text-white"
            >
              資料請求
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="角丸 2px（ごく僅か・繊細）">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-accent text-white text-base font-medium rounded-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              来場予約する
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 border border-text-primary text-text-primary text-base font-medium rounded-[2px] transition-colors duration-300 hover:bg-text-primary hover:text-white"
            >
              資料請求
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="角丸 4px（現状・無難）">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-accent text-white text-base font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              来場予約する
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 border border-text-primary text-text-primary text-base font-medium rounded transition-colors duration-300 hover:bg-text-primary hover:text-white"
            >
              資料請求
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="角丸 8px（柔らかい）">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-accent text-white text-base font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              来場予約する
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 border border-text-primary text-text-primary text-base font-medium rounded-lg transition-colors duration-300 hover:bg-text-primary hover:text-white"
            >
              資料請求
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="角丸 999px（フル丸・ピル）">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-accent text-white text-base font-medium rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              来場予約する
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 border border-text-primary text-text-primary text-base font-medium rounded-full transition-colors duration-300 hover:bg-text-primary hover:text-white"
            >
              資料請求
            </a>
          </Cell>
        </LabSection>

        {/* ===== ④ テキスト階層化バリエーション ===== */}
        <LabSection
          num="04 — TEXT LAYERS"
          title="テキストの階層化バリエーション"
          desc="ボタン内のコピーを「メインラベル＋サブテキスト」で2層化することで、行動のハードルを下げる。"
        >
          <Cell label="1行（シンプル）">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[52px] px-8 py-3 bg-accent text-white text-base font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              来場予約する
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="2行（縦積み・標準）">
            <a
              href="#"
              className="inline-flex flex-col items-center justify-center min-h-[60px] px-8 py-3 bg-accent text-white rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-base font-medium leading-tight">
                来場予約
              </span>
              <span className="text-[11px] text-white/75 leading-tight mt-0.5">
                ご予約不要・無料
              </span>
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="2行 + アロー（左テキスト・右矢印）">
            <a
              href="#"
              className="group inline-flex items-center justify-center min-h-[60px] px-8 py-3 bg-accent text-white rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="flex flex-col items-start mr-4">
                <span className="text-base font-medium leading-tight">
                  来場予約
                </span>
                <span className="text-[11px] text-white/75 leading-tight mt-0.5">
                  ご予約不要・無料
                </span>
              </span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="アイコン左 + 2行（カレンダー）">
            <a
              href="#"
              className="inline-flex items-center justify-center min-h-[60px] px-7 py-3 bg-accent text-white rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Calendar className="w-5 h-5 mr-3" strokeWidth={1.5} />
              <span className="flex flex-col items-start">
                <span className="text-base font-medium leading-tight">
                  来場予約
                </span>
                <span className="text-[11px] text-white/75 leading-tight mt-0.5">
                  ご予約不要・無料
                </span>
              </span>
            </a>
          </Cell>
        </LabSection>

        {/* ===== ⑤ サイズバリエーション ===== */}
        <LabSection
          num="05 — SIZE"
          title="サイズの比較"
          desc="セクションの重みに応じてボタンサイズを使い分け。Hero・FinalCtaは大、本文中は中、リンク的な誘導は小。"
        >
          <Cell label="Small（44px・本文リンク）">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-accent text-white text-sm font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              詳しく見る
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="Medium（52px・標準）">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 bg-accent text-white text-base font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              来場予約する
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="Large（60px・Hero / FinalCta）">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 min-h-[60px] px-10 py-4 bg-accent text-white text-lg font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              来場予約する
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="X-Large（72px・最重要CTA）">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-3 min-h-[72px] px-12 py-5 bg-accent text-white text-xl font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              来場予約する
              <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
            </a>
          </Cell>
        </LabSection>

        {/* ===== ⑥ Tertiary・補助CTAバリエーション ===== */}
        <LabSection
          num="06 — TERTIARY / UTILITY"
          title="補助系・連絡手段ボタン"
          desc="LINE・電話・メールなど、メインCTA以外の連絡手段。ピル型 + ブランド色で軽やかに。"
        >
          <Cell label="LINE / 電話 / メール — ピル型横並び">
            <a
              href="#"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#06C755] text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              LINEで聞く
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-text-primary text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              電話で相談
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 border border-text-primary text-text-primary text-sm font-medium rounded-full transition-all duration-300 hover:bg-text-primary hover:text-white"
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
              メールで相談
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="LINE — 角丸4px（フォーマル版）">
            <a
              href="#"
              className="inline-flex items-center gap-2 min-h-[52px] px-7 py-3 bg-[#06C755] text-white text-base font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              LINEで聞く
              <span className="text-[11px] text-white/75 ml-1">（最短10秒）</span>
            </a>
          </Cell>
        </LabSection>

        {/* ===== ⑦ 並列セットの比較 ===== */}
        <LabSection
          num="07 — SET"
          title="Hero / CTAセクションの2ボタン並列パターン"
          desc="実際のサイトで2つ並んだ時の印象。Primary / Secondary の階層感を確認してください。"
        >
          <Cell label="A. シマー × アウトライン（本命）">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center min-h-[56px] px-8 py-4 overflow-hidden bg-accent text-white rounded transition-all duration-[400ms] hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
              />
              <span className="relative flex flex-col items-start mr-3">
                <span className="text-base font-medium leading-tight">
                  来場予約
                </span>
                <span className="text-[11px] text-white/75 leading-tight mt-0.5">
                  ご予約不要・無料
                </span>
              </span>
              <ArrowRight
                className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
            <a
              href="#"
              className="group relative inline-flex items-center justify-center min-h-[56px] px-8 py-4 overflow-hidden border border-text-primary text-text-primary rounded transition-colors duration-[400ms] hover:text-white"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-text-primary transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative text-base font-medium mr-3">
                資料請求（無料）
              </span>
              <ArrowRight
                className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="B. 両方Solid（accent + main）">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-4 bg-accent text-white text-base font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              来場予約する
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-4 bg-main text-white text-base font-medium rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              資料請求する
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </Cell>

          <div className="h-4" />

          <Cell label="C. 直角 × 大胆（建築的）">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-3 min-h-[60px] px-10 py-4 bg-accent text-white text-base font-medium rounded-none transition-all duration-300 hover:bg-[#9C5424]"
            >
              来場予約する
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-3 min-h-[60px] px-10 py-4 border border-text-primary text-text-primary text-base font-medium rounded-none transition-all duration-300 hover:bg-text-primary hover:text-white"
            >
              資料請求する
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </Cell>
        </LabSection>

        {/* ===== 凡例 ===== */}
        <div className="bg-bg-secondary rounded-lg p-6 md:p-8 mt-16">
          <p className="font-section-label text-text-secondary text-xs mb-3 tracking-[0.15em]">
            HOW TO USE
          </p>
          <h3 className="text-text-primary text-lg md:text-xl mb-3">
            選び方
          </h3>
          <ul className="text-text-secondary text-sm md:text-base leading-[1.9] list-disc ml-5 space-y-1">
            <li>各パターンに実際にホバーして、動きを確認してください</li>
            <li>Primary / Secondary / Tertiary の3階層を選んでください（同じデザイン言語で揃えます）</li>
            <li>選んだパターンを共通コンポーネント化して、15ファイル全部に適用します</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
