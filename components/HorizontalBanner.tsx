"use client";

import { useEffect, useRef } from "react";

interface HorizontalBannerProps {
  activeIndex: number;
  total: number;
}

export default function HorizontalBanner({
  activeIndex,
  total,
}: HorizontalBannerProps) {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stripRef.current) return;
    const progress = total > 1 ? activeIndex / (total - 1) : 0;
    // Move 0% at index 0 to -60% at last index (leaves visible portion always in view)
    const offset = -progress * 60;
    stripRef.current.style.transform = `translateX(${offset}%)`;
  }, [activeIndex, total]);

  // Build a series of decorative gradient blocks to simulate a horizontal panorama
  const blocks = Array.from({ length: 8 });
  const colors = [
    "#E5DED6",
    "#ddd0c2",
    "#d4c4b0",
    "#cbb89e",
    "#C2C9BE",
    "#B5BDB0",
    "#A8B5A2",
    "#9BAD94",
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-[#F4EFE8]/75 z-10" />
      {/* Horizontal strip */}
      <div
        ref={stripRef}
        className="absolute top-0 bottom-0 flex"
        style={{
          width: "180%",
          transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {blocks.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${colors[i]} 0%, ${
                colors[(i + 1) % colors.length]
              } 100%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
