"use client";

import { useEffect, useState } from "react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none"
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={() =>
            setCurrent((c) => (c - 1 + images.length) % images.length)
          }
          className="absolute left-4 text-white/80 hover:text-white text-4xl leading-none px-2"
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <img
        src={images[current].src}
        alt={images[current].alt}
        className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl object-contain"
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={() => setCurrent((c) => (c + 1) % images.length)}
          className="absolute right-4 text-white/80 hover:text-white text-4xl leading-none px-2"
          aria-label="Next photo"
        >
          ›
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-4 text-white/60 text-sm">
        {current + 1} / {images.length}
      </p>
    </div>
  );
}
