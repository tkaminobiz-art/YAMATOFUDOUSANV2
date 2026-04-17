"use client";

/**
 * HeroVoiceMagazine — タイポグラフィ・ジャングル版（v8）
 * ----------------------------------------------------------------------
 * 参考: マクドナルド "マックデリバリー 小腹、別腹、いろんな腹に" 広告式の
 *       "文字の洪水" デザイン。1画面にカオティックに文字が散らばる。
 *
 * 2026-04-17 ユーザー承認済:
 *   - ビビッド Neo Japan 5色（メイン Electric Red #FF2D2D）
 *   - サイズ階層 5段（極大/大/中/小/極小）
 *   - 縦書き 2〜3箇所混ぜる
 *   - 絶対位置でカオス配置
 *   - 家写真アバター 2〜3個を左に縦並び
 *   - 1画面（100svh）制約維持
 *   - 単語ハイライト方式：キーワードだけに色をつける
 *
 * データ: @/data/voiceHome.ts の MAGAZINE_FIGURES（8件）
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "@/components/ui/CtaButton";
import { getVoice } from "@/data/voices";
import { MAGAZINE_FIGURES } from "@/data/voiceHome";

/* ---------- prefers-reduced-motion ---------- */
const PREFERS_REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(PREFERS_REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getReducedMotionSnapshot() {
  return window.matchMedia(PREFERS_REDUCED_QUERY).matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

/* ---------- reveal hook ---------- */
function useRevealContainer() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return { ref, visible: reduced || visible };
}

/* ---------- 型 ---------- */
type Size = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
type Color = "black" | "red" | "blue" | "pink" | "yellow" | "green";

const SIZE: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  xxl: { fontSize: "clamp(34px, 5vw, 80px)",   weight: 900, lh: 0.98, ls: "-0.04em" },
  xl:  { fontSize: "clamp(24px, 3.6vw, 56px)", weight: 900, lh: 1.04, ls: "-0.03em" },
  lg:  { fontSize: "clamp(18px, 2.4vw, 36px)", weight: 900, lh: 1.1,  ls: "-0.02em" },
  md:  { fontSize: "clamp(13px, 1.3vw, 18px)", weight: 700, lh: 1.5,  ls: "0em" },
  sm:  { fontSize: "clamp(11px, 1vw, 14px)",   weight: 500, lh: 1.65, ls: "0.02em" },
  xs:  { fontSize: "10.5px",                    weight: 700, lh: 1.4,  ls: "0.22em" },
};

const COLOR: Record<Color, string> = {
  black: "#0A0A0A",
  red: "#FF2D2D",
  blue: "#002FA7",
  pink: "#FF0080",
  yellow: "#FFD600",
  green: "#00A870",
};

type BlockPos = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

type TextBlock = {
  key: string;
  text: string;
  size: Size;
  color?: Color;
  vertical?: boolean;
  rotate?: number;
  uppercase?: boolean;
  pos: BlockPos;
  /** アニメ stagger（ms） */
  delay?: number;
  /** ハイパーリンク（voiceId があれば /voice/[id] へ） */
  voiceId?: string;
  zIndex?: number;
};

type AvatarBlock = {
  key: string;
  voiceId: string;
  sizePx: number;
  pos: BlockPos;
  rotate?: number;
  delay?: number;
  zIndex?: number;
};

type WatermarkBlock = {
  key: string;
  text: string;
  fontSize: string;
  color: Color;
  opacity: number;
  pos: BlockPos;
  zIndex?: number;
};

/* ---------- レイアウト定義 ----------
   画面（100svh × container幅）を下記の仮想ブロックに分割:

   [1400 × 100svh の Desktop レイアウト]
   Row A (top  0-12%): セクションラベル + 大見出し
   Row B (top 12-42%): 左に avatar01 + 01 ANXIETY 群（左半分） / 02 STANDARD 群（右半分）
   Row C (top 42-70%): 03 COMPARISON + 04 RESCUE + 05 DISCOVERY + 縦書きラベル
   Row D (top 70-88%): 06-08 ＋ avatar02, avatar03
   Row E (top 88-100%): CTA
*/

const TEXT_BLOCKS: TextBlock[] = [
  // ============ ヘッダ ============
  {
    key: "section-label",
    text: "VOICE / VOL.01 / 2026",
    size: "xs",
    color: "red",
    uppercase: true,
    pos: { top: "3%", left: "3%" },
    delay: 0,
  },
  {
    key: "figures-label",
    text: "FIGURES / 08",
    size: "xs",
    color: "black",
    uppercase: true,
    pos: { top: "3%", right: "3%" },
    delay: 50,
  },
  // 大見出し（3行）
  {
    key: "h1-a",
    text: "「諦めかけていた」から、",
    size: "xxl",
    color: "black",
    pos: { top: "8%", left: "3%" },
    delay: 100,
    zIndex: 2,
  },
  {
    key: "h1-b",
    text: "「やまとでよかった」",
    size: "xxl",
    color: "red",
    pos: { top: "18%", left: "8%" },
    delay: 150,
    zIndex: 2,
  },
  {
    key: "h1-c",
    text: "まで。",
    size: "xxl",
    color: "black",
    pos: { top: "18%", right: "8%" },
    delay: 200,
    zIndex: 2,
  },

  // ============ 01 ANXIETY（主役・左） ============
  {
    key: "01-vert",
    text: "第一幕",
    size: "xs",
    color: "red",
    vertical: true,
    pos: { top: "32%", left: "3%" },
    delay: 250,
  },
  {
    key: "01-s1",
    text: "2年近く土地が",
    size: "xl",
    color: "black",
    pos: { top: "32%", left: "18%" },
    delay: 300,
  },
  {
    key: "01-s2",
    text: "見つからなかった。",
    size: "xl",
    color: "red",
    pos: { top: "39%", left: "22%" },
    delay: 350,
  },
  {
    key: "01-meta",
    text: "やっと納得できたのが、やまとの分譲地でした。",
    size: "md",
    color: "black",
    pos: { top: "49%", left: "18%" },
    delay: 400,
    voiceId: "199927",
  },
  {
    key: "01-id",
    text: "No.199927 ／ 奈良市 Ｍ様邸",
    size: "xs",
    color: "red",
    uppercase: true,
    pos: { top: "53%", left: "18%" },
    delay: 450,
    voiceId: "199927",
  },

  // ============ 02 STANDARD（右上） ============
  {
    key: "02-tag",
    text: "#02 STANDARD",
    size: "xs",
    color: "blue",
    uppercase: true,
    pos: { top: "30%", right: "4%" },
    delay: 500,
  },
  {
    key: "02-s1",
    text: "他社のオプションが、",
    size: "lg",
    color: "black",
    pos: { top: "33%", right: "4%" },
    delay: 550,
  },
  {
    key: "02-s2",
    text: "やまとでは、標準。",
    size: "lg",
    color: "blue",
    pos: { top: "38%", right: "4%" },
    delay: 600,
  },
  {
    key: "02-soft",
    text: "追加費用は、必要なかった。",
    size: "sm",
    color: "black",
    pos: { top: "44%", right: "4%" },
    delay: 650,
    voiceId: "208787",
  },
  {
    key: "02-id",
    text: "No.208787 ／ 奈良市 Ｉ様邸",
    size: "xs",
    color: "blue",
    uppercase: true,
    pos: { top: "47%", right: "4%" },
    delay: 700,
    voiceId: "208787",
  },

  // ============ 03 COMPARISON（左下段） ============
  {
    key: "03-tag",
    text: "#03 COMPARISON",
    size: "xs",
    color: "green",
    uppercase: true,
    pos: { top: "60%", left: "18%" },
    delay: 750,
  },
  {
    key: "03-s1",
    text: "他社の標準仕様は、",
    size: "md",
    color: "black",
    pos: { top: "63%", left: "18%" },
    delay: 800,
  },
  {
    key: "03-s2",
    text: "グレードが低い。",
    size: "lg",
    color: "green",
    pos: { top: "66%", left: "18%" },
    delay: 850,
    voiceId: "279070",
  },
  {
    key: "03-id",
    text: "No.279070 ／ 斑鳩町 Ｉ様邸",
    size: "xs",
    color: "green",
    uppercase: true,
    pos: { top: "72%", left: "18%" },
    delay: 900,
    voiceId: "279070",
  },

  // ============ 04 RESCUE（中央下） ============
  {
    key: "04-tag",
    text: "#04 RESCUE",
    size: "xs",
    color: "pink",
    uppercase: true,
    pos: { top: "58%", left: "42%" },
    delay: 950,
  },
  {
    key: "04-s1",
    text: "諦めかけた時に、",
    size: "lg",
    color: "black",
    pos: { top: "61%", left: "42%" },
    delay: 1000,
  },
  {
    key: "04-s2",
    text: "出会えた。",
    size: "xl",
    color: "pink",
    pos: { top: "65%", left: "42%" },
    delay: 1050,
    voiceId: "216803",
  },
  {
    key: "04-id",
    text: "No.216803 ／ 生駒市 Ｉ様邸",
    size: "xs",
    color: "pink",
    uppercase: true,
    pos: { top: "72%", left: "42%" },
    delay: 1100,
    voiceId: "216803",
  },

  // ============ 05 DISCOVERY（右下段） ============
  {
    key: "05-vert",
    text: "非公開",
    size: "lg",
    color: "yellow",
    vertical: true,
    pos: { top: "58%", right: "14%" },
    delay: 1150,
    zIndex: 1,
  },
  {
    key: "05-s1",
    text: "ドンピシャを、",
    size: "md",
    color: "black",
    pos: { top: "62%", right: "4%" },
    delay: 1200,
  },
  {
    key: "05-s2",
    text: "紹介してくれた。",
    size: "lg",
    color: "black",
    pos: { top: "66%", right: "4%" },
    delay: 1250,
    voiceId: "240061",
  },
  {
    key: "05-id",
    text: "No.240061 ／ 奈良市 H様邸",
    size: "xs",
    color: "red",
    uppercase: true,
    pos: { top: "72%", right: "4%" },
    delay: 1300,
    voiceId: "240061",
  },

  // ============ 06 LAND / 07 ENCOUNTER / 08 AFTER（下段小） ============
  {
    key: "06-s",
    text: "やまとの土地は、どこも住みやすい。",
    size: "sm",
    color: "black",
    pos: { top: "80%", left: "18%" },
    delay: 1350,
    voiceId: "276882",
  },
  {
    key: "06-id",
    text: "06 LAND ／ No.276882",
    size: "xs",
    color: "green",
    uppercase: true,
    pos: { top: "83%", left: "18%" },
    delay: 1400,
  },
  {
    key: "07-s",
    text: "「ここに建てたい」土地に、旗が立っていた。",
    size: "sm",
    color: "black",
    pos: { top: "80%", left: "42%" },
    delay: 1450,
    voiceId: "202180",
  },
  {
    key: "07-id",
    text: "07 ENCOUNTER ／ No.202180",
    size: "xs",
    color: "blue",
    uppercase: true,
    pos: { top: "83%", left: "42%" },
    delay: 1500,
  },
  {
    key: "08-s",
    text: "建てた後も、すぐ駆けつけてくれる。",
    size: "sm",
    color: "black",
    pos: { top: "80%", right: "4%" },
    delay: 1550,
    voiceId: "256807",
  },
  {
    key: "08-id",
    text: "08 AFTER ／ No.256807",
    size: "xs",
    color: "red",
    uppercase: true,
    pos: { top: "83%", right: "4%" },
    delay: 1600,
  },

  // ============ 縦書きアクセント ============
  {
    key: "vert-voice",
    text: "VOICE / 50",
    size: "xs",
    color: "black",
    vertical: true,
    pos: { top: "32%", right: "1.5%" },
    delay: 350,
  },
];

const AVATAR_BLOCKS: AvatarBlock[] = [
  {
    key: "av-01",
    voiceId: "199927",
    sizePx: 120,
    pos: { top: "28%", left: "3%" },
    rotate: -2,
    delay: 250,
    zIndex: 1,
  },
  {
    key: "av-02",
    voiceId: "208787",
    sizePx: 68,
    pos: { top: "68%", left: "4%" },
    rotate: 2,
    delay: 1000,
    zIndex: 1,
  },
  {
    key: "av-03",
    voiceId: "256807",
    sizePx: 60,
    pos: { top: "82%", left: "9%" },
    rotate: -1,
    delay: 1500,
    zIndex: 1,
  },
];

const WATERMARKS: WatermarkBlock[] = [
  {
    key: "wm-01",
    text: "01",
    fontSize: "clamp(180px, 22vw, 340px)",
    color: "red",
    opacity: 0.06,
    pos: { top: "22%", left: "22%" },
    zIndex: 0,
  },
  {
    key: "wm-08",
    text: "08",
    fontSize: "clamp(140px, 18vw, 260px)",
    color: "yellow",
    opacity: 0.1,
    pos: { bottom: "2%", right: "22%" },
    zIndex: 0,
  },
];

/* ---------- Block コンポーネント ---------- */

function TextBlockEl({ block, visible }: { block: TextBlock; visible: boolean }) {
  const s = SIZE[block.size];
  const color = COLOR[block.color ?? "black"];

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    ...block.pos,
    fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
    fontSize: s.fontSize,
    fontWeight: s.weight,
    lineHeight: s.lh,
    letterSpacing: s.ls,
    color,
    wordBreak: "keep-all",
    whiteSpace: "nowrap",
    zIndex: block.zIndex ?? 1,
    pointerEvents: block.voiceId ? "auto" : "none",
    transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
    transitionDelay: `${block.delay ?? 0}ms`,
    opacity: visible ? 1 : 0,
    transform: visible
      ? block.vertical
        ? `translateY(0) rotate(${block.rotate ?? 0}deg)`
        : `translateY(0) rotate(${block.rotate ?? 0}deg)`
      : block.vertical
        ? "translateY(20px)"
        : "translateY(20px)",
  };

  if (block.vertical) {
    baseStyle.writingMode = "vertical-rl";
    baseStyle.textOrientation = "mixed";
  }
  if (block.uppercase) {
    baseStyle.textTransform = "uppercase";
    baseStyle.fontFamily = "var(--font-inter), Inter, sans-serif";
  }

  const content = block.text;

  if (block.voiceId) {
    return (
      <Link
        href={`/voice/${block.voiceId}`}
        style={baseStyle}
        className="hover:underline hover:decoration-2 hover:underline-offset-4"
      >
        {content}
      </Link>
    );
  }

  return <span style={baseStyle}>{content}</span>;
}

function AvatarBlockEl({ block, visible }: { block: AvatarBlock; visible: boolean }) {
  const v = getVoice(block.voiceId);
  const photo = v?.photos?.[0];
  if (!photo) return null;

  return (
    <Link
      href={`/voice/${block.voiceId}`}
      style={{
        position: "absolute",
        ...block.pos,
        width: `${block.sizePx}px`,
        height: `${block.sizePx}px`,
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: block.zIndex ?? 1,
        border: "2px solid #0A0A0A",
        boxShadow: "0 4px 20px rgba(10,10,10,0.15)",
        transition:
          "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${block.delay ?? 0}ms`,
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 20}px) rotate(${block.rotate ?? 0}deg)`,
      }}
      className="hover:!rotate-0 hover:scale-[1.04]"
      aria-label={`${v?.area} ${v?.familyName}邸`}
    >
      <Image
        src={photo}
        alt=""
        fill
        sizes={`${block.sizePx}px`}
        className="object-cover"
        style={{ filter: "saturate(0.95) contrast(1.05)" }}
      />
    </Link>
  );
}

function WatermarkEl({ block, visible }: { block: WatermarkBlock; visible: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        ...block.pos,
        fontFamily: "var(--font-inter), Inter, sans-serif",
        fontWeight: 900,
        fontSize: block.fontSize,
        color: COLOR[block.color],
        opacity: visible ? block.opacity : 0,
        letterSpacing: "-0.05em",
        lineHeight: 1,
        pointerEvents: "none",
        transition: "opacity 1200ms ease-out",
        zIndex: block.zIndex ?? 0,
        userSelect: "none",
      }}
    >
      {block.text}
    </span>
  );
}

/* ---------- モバイル用：元の Bento に近い縦並び ---------- */

function MobileFallback() {
  return (
    <div className="flex flex-col gap-4 px-[var(--page-px)] py-12 md:hidden">
      <p
        className="uppercase"
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          color: COLOR.red,
          fontSize: "10.5px",
          letterSpacing: "0.22em",
          fontWeight: 700,
        }}
      >
        VOICE / VOL.01 / 2026
      </p>
      <h2
        style={{
          fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(28px, 8vw, 40px)",
          lineHeight: 1.15,
          letterSpacing: "-0.04em",
          color: COLOR.black,
          wordBreak: "keep-all",
        }}
      >
        <span className="block">「諦めかけていた」から、</span>
        <span className="block" style={{ color: COLOR.red }}>
          「やまとでよかった」
          <span style={{ color: COLOR.black }}>まで。</span>
        </span>
      </h2>

      <div className="mt-6 flex flex-col gap-8">
        {MAGAZINE_FIGURES.map((f, i) => {
          const colors: Color[] = ["red", "blue", "green", "pink", "yellow", "black", "black", "black"];
          const c = COLOR[colors[i] ?? "black"];
          return (
            <Link
              key={f.voiceId + f.figureNo}
              href={`/voice/${f.voiceId}`}
              className="flex flex-col gap-2"
            >
              <span
                className="uppercase"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  color: c,
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                }}
              >
                #{f.figureNo} ／ {f.chapterEn}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(20px, 5.4vw, 28px)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.03em",
                  color: c,
                  whiteSpace: "pre-line",
                  wordBreak: "keep-all",
                }}
              >
                {f.headlineStrong}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: COLOR.black,
                  whiteSpace: "pre-line",
                }}
              >
                {f.headlineSoft}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: c,
                  fontWeight: 700,
                }}
              >
                No.{f.voiceId} ／ {f.attribution}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <CtaButton
          href="/reserve"
          variant="primary"
          size="md"
          label="モデルハウスを予約する"
          sublabel="無料・10秒で完了"
        />
        <CtaButton
          href="/voice"
          variant="secondary"
          size="md"
          label="すべての声を読む"
        />
      </div>
    </div>
  );
}

/* ---------- メイン ---------- */

export default function HeroVoiceMagazine() {
  const { ref, visible } = useRevealContainer();

  return (
    <section
      aria-label="VOICE — やまと不動産 お客様の声"
      className="relative w-full md:pt-[110px]"
      style={{ backgroundColor: "var(--voice-bg)", color: "var(--voice-text)" }}
    >
      {/* ===== Desktop: タイポジャングル（絶対配置） =====
          section の pt-[110px] で sticky header を避ける。
          container 高は viewport から header 分引いた領域。
          container 内の絶対配置 top: 0 は header 直下 */}
      <div
        ref={ref}
        className="relative mx-auto hidden h-[calc(100svh-110px)] min-h-[640px] w-full max-w-[1600px] overflow-hidden px-[clamp(20px,2.4vw,48px)] py-[clamp(12px,1.5vw,24px)] md:block"
      >
        {WATERMARKS.map((w) => (
          <WatermarkEl key={w.key} block={w} visible={visible} />
        ))}
        {AVATAR_BLOCKS.map((a) => (
          <AvatarBlockEl key={a.key} block={a} visible={visible} />
        ))}
        {TEXT_BLOCKS.map((b) => (
          <TextBlockEl key={b.key} block={b} visible={visible} />
        ))}

        {/* CTA（右下） */}
        <div
          className="absolute bottom-[3%] right-[3%] flex items-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: `translateY(${visible ? 0 : 10}px)`,
            transition:
              "opacity 700ms ease-out 1700ms, transform 700ms ease-out 1700ms",
          }}
        >
          <Link
            href="/voice"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: COLOR.black,
              textTransform: "uppercase",
              borderBottom: `2px solid ${COLOR.red}`,
              paddingBottom: "2px",
            }}
          >
            すべての声を読む →
          </Link>
          <span
            style={{
              display: "inline-block",
              padding: "12px 20px",
              backgroundColor: COLOR.red,
              color: "#FFFFFF",
              fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            <Link href="/reserve" style={{ color: "inherit" }}>
              モデルハウスを予約する →
            </Link>
          </span>
        </div>

        {/* 左下 FIN */}
        <span
          className="absolute bottom-[3%] left-[3%]"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: COLOR.black,
            textTransform: "uppercase",
            opacity: visible ? 0.6 : 0,
            transition: "opacity 700ms ease-out 1700ms",
          }}
        >
          — 8 Voices of 50 ／ FIN
        </span>
      </div>

      {/* ===== Mobile: 縦並び ===== */}
      <MobileFallback />
    </section>
  );
}
