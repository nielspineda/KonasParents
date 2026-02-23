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
        className="text-gray-400 text-sm text-center py-12"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* TODO: Add photos to /public/images/gallery/ and update content */}
        Photos coming soon.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b89a7a]"
            aria-label={`Open photo: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
