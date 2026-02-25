"use client";

import { useEffect, useRef, useMemo } from "react";

interface BannerImage {
  src: string;
  alt: string;
}

interface HorizontalBannerProps {
  images: BannerImage[];
}

export default function HorizontalBanner({ images }: HorizontalBannerProps) {
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

  // Scroll-driven: translate based on page scroll progress
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const onScroll = () => {
      // Start scrolling halfway between intro and first timeline card
      const scrollStart = window.innerHeight * 0.5;
      const scrollTop = Math.max(0, window.scrollY - scrollStart);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight - scrollStart;
      if (maxScroll <= 0) return;
      const progress = Math.min(scrollTop / maxScroll, 1);
      const stripW = strip.scrollWidth;
      const viewW = window.innerWidth;
      const maxTranslate = Math.max(0, stripW - viewW);
      strip.style.transform = `translateX(${-progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fallbackColors = [
    "#E5DED6", "#ddd0c2", "#d4c4b0", "#cbb89e",
    "#C2C9BE", "#B5BDB0", "#A8B5A2", "#9BAD94",
  ];

  const renderCell = (img: BannerImage, i: number) => (
    <div
      key={i}
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: "42vw",
        aspectRatio: "3 / 2",
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
          className="w-full h-full object-cover"
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
          display: "inline-block",
          transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Top row */}
        <div className="flex items-end h-1/2">
          {topRow.map(renderCell)}
        </div>
        {/* Bottom row — offset by half a column for brick pattern */}
        <div className="flex items-start h-1/2" style={{ marginLeft: "21vw" }}>
          {bottomRow.map(renderCell)}
        </div>
      </div>
    </div>
  );
}
