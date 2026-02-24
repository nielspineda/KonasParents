"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  story: string;
  icon?: string;
  isFuture?: boolean;
}

interface TimelineCardProps {
  entry: TimelineEntry;
}

// Split text into sentences, keeping the delimiter attached
function splitSentences(text: string): string[] {
  const result: string[] = [];
  const regex = /[^.!?]*[.!?]+\s*/g;
  let match;
  let lastIndex = 0;
  while ((match = regex.exec(text)) !== null) {
    result.push(match[0]);
    lastIndex = regex.lastIndex;
  }
  // Grab any trailing text without punctuation
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }
  return result.filter((s) => s.trim().length > 0);
}

// Reading pause: 2s for short sentences, up to 4s for long ones
function readingPause(sentence: string): number {
  const len = sentence.trim().length;
  // Clamp between 2000ms and 4000ms based on length (30-150 chars)
  const t = Math.min(1, Math.max(0, (len - 30) / 120));
  return 2000 + t * 2000;
}

export default function TimelineCard({ entry }: TimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);
  const hasStarted = useRef(false);

  const sentences = useMemo(() => splitSentences(entry.story), [entry.story]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const startReveal = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let i = 0;
    const reveal = () => {
      i++;
      setVisibleCount(i);
      if (i < sentences.length) {
        setTimeout(reveal, readingPause(sentences[i - 1]));
      } else {
        setDone(true);
      }
    };
    // Initial pause before first sentence appears
    setTimeout(reveal, 800);
  }, [sentences]);

  useEffect(() => {
    if (visible) startReveal();
  }, [visible, startReveal]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex flex-col items-center text-center max-w-xl mx-auto px-6 py-24">
        {entry.icon && (
          <img
            src={entry.icon}
            alt=""
            className="w-10 h-10 mb-4 opacity-60"
            aria-hidden="true"
          />
        )}
        <span
          className="text-base md:text-lg tracking-[0.2em] uppercase text-[#4A6741] mb-4"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 400, textShadow: "0 1px 8px rgba(244, 239, 232, 0.8)" }}
        >
          {entry.date}
        </span>
        <h2
          className={`mb-5 leading-tight whitespace-pre-line ${
            entry.isFuture
              ? "text-5xl md:text-6xl text-[#3A342F]"
              : "text-4xl md:text-5xl text-[#3A342F]"
          }`}
          style={{ fontFamily: "var(--font-script)" }}
        >
          {entry.title}
        </h2>
        <div className="paper-card px-8 py-5 max-w-md overflow-hidden transition-all duration-500 ease-out">
          <p
            className="text-xl leading-relaxed text-[#6F6760]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontStyle: "italic" }}
          >
            {sentences.map((sentence, i) => (
              <span
                key={i}
                className={`inline transition-all duration-500 ease-out ${
                  i < visibleCount
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  display: i < visibleCount || done ? "inline" : "none",
                }}
              >
                {sentence}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
