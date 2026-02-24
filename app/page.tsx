"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import timelineData from "@/content/timeline.json";
import TimelineCard from "@/components/TimelineCard";
import HorizontalBanner from "@/components/HorizontalBanner";

const PasswordModal = dynamic(() => import("@/components/PasswordModal"), {
  ssr: false,
});

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleActivate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <>
      <HorizontalBanner activeIndex={activeIndex} total={timelineData.length} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <p
          className="text-sm tracking-[0.05em] text-[#6F6760]"
          style={{ fontFamily: "var(--font-script)", fontWeight: 600 }}
        >
          Niels &amp; Bess
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs tracking-[0.2em] uppercase text-[#A8B5A2] hover:text-[#8F9A86] border border-[#A8B5A2] hover:border-[#8F9A86] rounded-full px-4 py-1.5 transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Details?
        </button>
      </header>

      {/* Timeline scroll */}
      <main>
        {/* Intro spacer */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <p className="divider-leaf mb-6" style={{ fontFamily: "var(--font-sans)" }}>
            a love story
          </p>
          <h1
            className="text-6xl md:text-8xl leading-tight text-[#3A342F] mb-4"
            style={{ fontFamily: "var(--font-script)", fontWeight: 700 }}
          >
            Niels &amp; Bess
          </h1>
          <p
            className="text-sm text-[#6F6760] tracking-wide"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Scroll to explore our story ↓
          </p>
        </section>

        {/* Timeline cards */}
        {timelineData.map((entry, i) => (
          <TimelineCard
            key={entry.id}
            entry={entry}
            index={i}
            onActivate={handleActivate}
          />
        ))}

        {/* Bottom CTA */}
        <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6 pb-32">
          <p
            className="text-lg text-[#6F6760] mb-8"
            style={{ fontFamily: "var(--font-script)", fontWeight: 500 }}
          >
            Want to see the wedding details?
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#A8B5A2] hover:bg-[#8F9A86] text-white rounded-full px-8 py-3 text-sm tracking-wide transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            View Details →
          </button>
        </section>
      </main>

      {showModal && <PasswordModal onClose={() => setShowModal(false)} />}
    </>
  );
}
