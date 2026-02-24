"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p
        className="text-[#6F6760] text-sm text-center py-12"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* TODO: Add photos to /public/images/gallery/ and update content */}
        Photos coming soon.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="polaroid focus:outline-none focus:ring-2 focus:ring-[#A8B5A2] transition-transform duration-300 hover:-rotate-1 hover:scale-[1.02]"
            style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
            aria-label={`Open photo: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full aspect-square object-cover"
            />
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
