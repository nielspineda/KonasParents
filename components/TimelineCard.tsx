"use client";

import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  story: string;
  isFuture?: boolean;
}

interface TimelineCardProps {
  entry: TimelineEntry;
  index: number;
  onActivate: (index: number) => void;
}

export default function TimelineCard({
  entry,
  index,
  onActivate,
}: TimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          onActivate(index);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, onActivate]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex flex-col items-center text-center max-w-lg mx-auto px-6 py-24">
        <span
          className="text-base md:text-lg tracking-[0.2em] uppercase text-[#A8B5A2] mb-4"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
        >
          {entry.date}
        </span>
        <h2
          className={`mb-5 leading-tight ${
            entry.isFuture
              ? "text-5xl md:text-6xl text-[#A8B5A2]"
              : "text-4xl md:text-5xl text-[#3A342F]"
          }`}
          style={{ fontFamily: "var(--font-script)" }}
        >
          {entry.title}
        </h2>
        <div className="paper-card px-6 py-5 max-w-sm">
          <p
            className="text-base leading-relaxed text-[#6F6760]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontStyle: "italic" }}
          >
            {entry.story}
          </p>
        </div>
      </div>
    </div>
  );
}
