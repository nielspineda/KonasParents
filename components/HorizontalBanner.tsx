"use client";

import { useEffect, useRef } from "react";

interface BannerImage {
  src: string;
  alt: string;
}

interface HorizontalBannerProps {
  activeIndex: number;
  total: number;
  images: BannerImage[];
}

export default function HorizontalBanner({
  activeIndex,
  total,
  images,
}: HorizontalBannerProps) {
  const stripRef = useRef<HTMLDivElement>(null);

  // Each image gets 50vw width so landscape photos aren't overly cropped
  const stripWidth = Math.max(180, images.length * 50);

  useEffect(() => {
    if (!stripRef.current) return;
    const progress = total > 1 ? activeIndex / (total - 1) : 0;
    // Scroll from 0% to -(stripWidth - 100)% so the full strip is traversed
    const maxOffset = stripWidth - 100;
    const offset = -progress * maxOffset;
    stripRef.current.style.transform = `translateX(${offset}%)`;
  }, [activeIndex, total, stripWidth]);

  // Gradient fallback colors for images without a src
  const fallbackColors = [
    "#E5DED6", "#ddd0c2", "#d4c4b0", "#cbb89e",
    "#C2C9BE", "#B5BDB0", "#A8B5A2", "#9BAD94",
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Warm linen overlay */}
      <div className="absolute inset-0 bg-[#F4EFE8]/75 z-10" />
      {/* Horizontal strip */}
      <div
        ref={stripRef}
        className="absolute top-0 bottom-0 flex"
        style={{
          width: `${stripWidth}%`,
          transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative h-full"
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${
                fallbackColors[i % fallbackColors.length]
              } 0%, ${
                fallbackColors[(i + 1) % fallbackColors.length]
              } 100%)`,
            }}
          >
            {img.src && (
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
