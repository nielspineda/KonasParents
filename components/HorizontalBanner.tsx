"use client";

import { useEffect, useRef, useMemo } from "react";

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

  // Split images into two staggered rows
  const { topRow, bottomRow } = useMemo(() => {
    const top: BannerImage[] = [];
    const bottom: BannerImage[] = [];
    images.forEach((img, i) => {
      if (i % 2 === 0) top.push(img);
      else bottom.push(img);
    });
    return { topRow: top, bottomRow: bottom };
  }, [images]);

  // Each image ~35vw wide; columns = larger row count
  const columns = Math.max(topRow.length, bottomRow.length);
  const stripWidth = Math.max(180, columns * 35);

  useEffect(() => {
    if (!stripRef.current) return;
    const progress = total > 1 ? activeIndex / (total - 1) : 0;
    const maxOffset = stripWidth - 100;
    const offset = -progress * maxOffset;
    stripRef.current.style.transform = `translateX(${offset}%)`;
  }, [activeIndex, total, stripWidth]);

  const fallbackColors = [
    "#E5DED6", "#ddd0c2", "#d4c4b0", "#cbb89e",
    "#C2C9BE", "#B5BDB0", "#A8B5A2", "#9BAD94",
  ];

  const renderCell = (img: BannerImage, i: number) => (
    <div
      key={i}
      className="relative"
      style={{
        flex: "0 0 35vw",
        height: "100%",
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
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Warm linen overlay */}
      <div className="absolute inset-0 bg-[#F4EFE8]/75 z-10" />
      {/* Two-row staggered strip */}
      <div
        ref={stripRef}
        className="absolute top-0 bottom-0"
        style={{
          width: `${stripWidth}%`,
          transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Top row */}
        <div className="flex h-1/2">
          {topRow.map(renderCell)}
        </div>
        {/* Bottom row — offset by half a column for brick pattern */}
        <div className="flex h-1/2" style={{ marginLeft: "17.5vw" }}>
          {bottomRow.map(renderCell)}
        </div>
      </div>
    </div>
  );
}
