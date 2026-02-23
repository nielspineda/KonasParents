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
      <div className="flex flex-col items-center text-center max-w-lg mx-auto px-6 py-16">
        <span
          className="text-xs tracking-[0.2em] uppercase text-[#b89a7a] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {entry.date}
        </span>
        <h2
          className={`mb-4 leading-tight ${
            entry.isFuture
              ? "text-4xl md:text-5xl text-[#b89a7a]"
              : "text-3xl md:text-4xl text-[#2c2c2c]"
          }`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {entry.title}
        </h2>
        <p
          className="text-base leading-relaxed text-gray-600 max-w-sm"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
        >
          {entry.story}
        </p>
      </div>
    </div>
  );
}
