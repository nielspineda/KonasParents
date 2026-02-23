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
          className="text-xs tracking-[0.25em] uppercase text-gray-400"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Niels &amp; Bess
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs tracking-[0.2em] uppercase text-[#b89a7a] hover:text-[#a38568] border border-[#b89a7a] hover:border-[#a38568] rounded-full px-4 py-1.5 transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Details?
        </button>
      </header>

      {/* Timeline scroll */}
      <main>
        {/* Intro spacer */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <p
            className="text-xs tracking-[0.3em] uppercase text-[#b89a7a] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A love story
          </p>
          <h1
            className="text-5xl md:text-7xl leading-tight text-[#2c2c2c] mb-6"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
          >
            Niels &amp; Bess
          </h1>
          <p
            className="text-sm text-gray-500 tracking-wide"
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
        <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6 pb-24">
          <p
            className="text-sm text-gray-500 mb-6"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Want to see the wedding details?
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#b89a7a] hover:bg-[#a38568] text-white rounded-full px-8 py-3 text-sm tracking-wide transition-colors"
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
