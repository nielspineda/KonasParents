"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Lightbox from "@/components/Lightbox";
import galleryData from "@/content/gallery.json";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const ALL_TAGS = ["Bess", "Niels", "Family", "Friends", "Kona"] as const;
type Tag = (typeof ALL_TAGS)[number];

interface GalleryImage {
  src: string;
  alt: string;
  tags: string[];
}

export default function GalleryPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTags, setActiveTags] = useState<Set<Tag>>(new Set(ALL_TAGS));
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const access = localStorage.getItem("kp_access");
    if (access === "true") {
      setAuthorized(true);
    } else {
      router.replace(`${BASE_PATH}/`);
    }
  }, [router]);

  const handleTagClick = useCallback(
    (tag: Tag) => {
      setActiveTags((prev) => {
        if (!hasInteracted) {
          // First interaction: select only this tag
          setHasInteracted(true);
          return new Set([tag]);
        }
        const next = new Set(prev);
        if (next.has(tag)) {
          // Don't allow deselecting the last active tag
          if (next.size > 1) next.delete(tag);
        } else {
          next.add(tag);
        }
        return next;
      });
    },
    [hasInteracted]
  );

  const images: GalleryImage[] = galleryData as GalleryImage[];

  const filtered = useMemo(
    () =>
      images.filter(
        (img) => img.src && img.tags.some((t) => activeTags.has(t as Tag))
      ),
    [images, activeTags]
  );

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#F4EFE8]">
      {/* Header */}
      <section className="pt-16 pb-8 text-center px-6">
        <h1
          className="text-4xl md:text-5xl text-[#3A342F] mb-2"
          style={{ fontFamily: "'Nothing You Could Do', cursive" }}
        >
          Gallery
        </h1>
        <p className="divider-leaf mb-0" style={{ fontFamily: "var(--font-sans)" }}>
          ✦
        </p>
      </section>

      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 px-6 pb-10">
        {ALL_TAGS.map((tag) => {
          const isOn = activeTags.has(tag);
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-5 py-2 text-sm rounded-full transition-all duration-200 ${
                isOn
                  ? "bg-[#A8B5A2] text-white shadow-sm"
                  : "bg-[#E5DED6]/50 text-[#6F6760] hover:bg-[#E5DED6]"
              }`}
              style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
            >
              #{tag}
            </button>
          );
        })}
      </div>

      {/* Gallery grid */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <p
            className="text-[#6F6760] text-sm text-center py-12"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Photos coming soon.
          </p>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <button
                key={`${img.src}-${i}`}
                onClick={() => setLightboxIndex(i)}
                className="block w-full polaroid break-inside-avoid focus:outline-none focus:ring-2 focus:ring-[#A8B5A2] transition-transform duration-300 hover:scale-[1.02]"
                style={{ transform: `rotate(${i % 3 === 0 ? -0.5 : i % 3 === 1 ? 0.5 : 0}deg)` }}
                aria-label={`Open photo: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href={`${BASE_PATH}/details`}
          className="bg-white/80 backdrop-blur-sm text-[#6F6760] hover:text-[#3A342F] rounded-full px-5 py-2 text-sm shadow-md transition-colors inline-block"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          ← Details
        </a>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
