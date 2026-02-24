"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import timelineData from "@/content/timeline.json";
import bannerImages from "@/content/banner.json";
import TimelineCard from "@/components/TimelineCard";
import HorizontalBanner from "@/components/HorizontalBanner";

const PasswordModal = dynamic(() => import("@/components/PasswordModal"), {
  ssr: false,
});

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HorizontalBanner images={bannerImages} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <p
          className="text-lg text-[#6F6760]"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Bess &amp; Niels
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs tracking-[0.2em] uppercase text-[#A8B5A2] hover:text-[#8F9A86] border border-[#A8B5A2] hover:border-[#8F9A86] rounded-full px-4 py-1.5 transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          View Details
        </button>
      </header>

      {/* Timeline scroll */}
      <main>
        {/* Intro spacer */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <p
            className="text-2xl md:text-3xl tracking-[0.15em] uppercase text-[#4A6741] mb-6"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 400, textShadow: "0 1px 8px rgba(244, 239, 232, 0.8)" }}
          >
            Our Story
          </p>
          <h1
            className="text-6xl md:text-8xl leading-tight text-[#3A342F] mb-6"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Bess &amp; Niels
          </h1>
          <p
            className="text-sm text-[#6F6760] tracking-wide"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Scroll to explore our story ↓
          </p>
        </section>

        {/* Timeline cards */}
        {timelineData.map((entry) => (
          <TimelineCard
            key={entry.id}
            entry={entry}
          />
        ))}

        {/* Envelope CTA */}
        <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6 pb-32">
          <p
            className="text-3xl text-[#3A342F] mb-10"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Ready to celebrate?
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="group relative w-32 h-24 focus:outline-none"
            aria-label="Open envelope to view details"
          >
            {/* Envelope body */}
            <div className="absolute inset-0 bg-[#F4EFE8] border-2 border-[#A8B5A2] rounded-md shadow-md group-hover:shadow-lg transition-shadow" />
            {/* Envelope flap */}
            <div
              className="absolute top-0 left-0 right-0 h-12 origin-top transition-transform duration-500 ease-in-out group-hover:[transform:rotateX(180deg)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 128 48" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M0,0 L64,40 L128,0 L128,0 L0,0 Z"
                  fill="#F4EFE8"
                  stroke="#A8B5A2"
                  strokeWidth="2"
                />
              </svg>
            </div>
            {/* Card peeking out */}
            <div className="absolute left-3 right-3 top-2 h-10 bg-white border border-[#E5DED6] rounded-sm transition-transform duration-500 ease-in-out group-hover:-translate-y-4 flex items-center justify-center">
              <span
                className="text-xs text-[#A8B5A2] tracking-wider"
                style={{ fontFamily: "'Nothing You Could Do', cursive" }}
              >
                View Details
              </span>
            </div>
          </button>
        </section>
      </main>

      {showModal && <PasswordModal onClose={() => setShowModal(false)} />}
    </>
  );
}
