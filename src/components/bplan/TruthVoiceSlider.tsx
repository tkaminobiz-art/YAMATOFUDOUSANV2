"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReasonReveal from "./ReasonReveal";

export type TruthVoiceCard = {
  number: string;
  category: string;
  feeling: string;
  response: string;
};

type TruthVoiceSliderProps = {
  cards: TruthVoiceCard[];
  lineUrl: string;
};

export default function TruthVoiceSlider({ cards, lineUrl }: TruthVoiceSliderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      root.style.setProperty("--truth-shift", `${(clamped - 0.5) * 130}px`);
      root.style.setProperty("--truth-card-shift", `${(0.5 - clamped) * 42}px`);
      root.style.setProperty("--truth-depth-shift", `${(clamped - 0.5) * 86}px`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".truth-card"));
      const readingPoint = track.scrollLeft + track.clientWidth * 0.5;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const nextDistance = Math.abs(readingPoint - cardCenter);
        if (nextDistance < distance) {
          closest = index;
          distance = nextDistance;
        }
      });

      setActiveIndex(closest);
    };

    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>(".truth-card")[index];
    if (!track || !card) return;

    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const go = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + cards.length) % cards.length;
    scrollToCard(nextIndex);
  };

  const getCardClass = (index: number) => {
    const distance = (index - activeIndex + cards.length) % cards.length;
    if (distance === 0) return "truth-card truth-card--active";
    if (distance === 1) return "truth-card truth-card--next";
    if (distance === cards.length - 1) return "truth-card truth-card--prev";
    return "truth-card truth-card--far";
  };

  return (
    <div ref={rootRef} className="truth-interactive relative">
      <div className="truth-bg" aria-hidden="true" />
      <div className="truth-depth truth-depth-1" aria-hidden="true" />
      <div className="truth-depth truth-depth-2" aria-hidden="true" />

      <ReasonReveal className="truth-stage relative z-10 mx-auto max-w-[1380px]">
        <div className="truth-head">
          <div>
            <p className="truth-kicker">01 / real voice</p>
            <h2 className="truth-title" style={{ fontFamily: "var(--font-zen-old-var)" }}>
              決める前に、知っておきたいこと。
            </h2>
          </div>
          <p className="truth-lead">
            自由設計・総額・追加費用・標準仕様・土地探し。
            住宅会社を決める前に、比べておきたいところを順番に見てください。
          </p>
        </div>

        <div className="truth-slider-wrap">
          <div className="truth-slider-copy">
            <p>REAL VOICE</p>
            <strong>先に見ておくこと</strong>
            <span>総額、土地、追加費用。迷いやすいところから見ていきます。</span>
            <div className="truth-category-rail" aria-label="確認カテゴリ">
              {cards.map((card, index) => (
                <button
                  key={card.category}
                  type="button"
                  className={activeIndex === index ? "is-active" : ""}
                  onClick={() => scrollToCard(index)}
                  aria-label={`${card.number} ${card.category}へ`}
                >
                  <em>{card.number}</em>
                  <b>{card.category}</b>
                </button>
              ))}
            </div>
          </div>

          <div ref={trackRef} className="truth-track" aria-label="家づくりの本音とやまと不動産の解決策">
            {cards.map((card, index) => (
              <article
                key={card.category}
                className={getCardClass(index)}
                aria-current={activeIndex === index}
              >
                <div className="truth-card-top">
                  <span className="truth-number" style={{ fontFamily: "var(--font-oswald)" }}>
                    {card.number}
                  </span>
                  <span className="truth-category">{card.category}</span>
                </div>

                <div className="truth-voice-block">
                  <p>REAL VOICE</p>
                  <h3 style={{ fontFamily: "var(--font-zen-old-var)" }}>{card.feeling}</h3>
                </div>

                <div className="truth-answer-block">
                  <p>YAMATO VOICE</p>
                  <h4>{card.response}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="truth-bottom">
          <div className="truth-controls" aria-label="カード操作">
            <button type="button" onClick={() => go(-1)} aria-label="前のカードへ">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="truth-dots">
              {cards.map((card, index) => (
                <button
                  key={card.category}
                  type="button"
                  className={activeIndex === index ? "is-active" : ""}
                  onClick={() => scrollToCard(index)}
                  aria-label={`${card.number} ${card.category}へ`}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="次のカードへ">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <a href={lineUrl} className="truth-cta">
            土地込み総額を確認する
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </ReasonReveal>
    </div>
  );
}
