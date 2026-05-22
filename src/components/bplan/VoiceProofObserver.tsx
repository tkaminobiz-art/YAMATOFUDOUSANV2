"use client";

import { useEffect } from "react";

export default function VoiceProofObserver() {
  useEffect(() => {
    const board = document.querySelector<HTMLElement>(".voice-proof-board");
    if (!board) return;

    const reveal = () => board.classList.add("is-visible");

    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -22% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(board);

    return () => observer.disconnect();
  }, []);

  return null;
}
