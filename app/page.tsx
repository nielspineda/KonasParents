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
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center px-6 py-4">
        <p
          className="text-lg text-[#6F6760]"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Bess &amp; Niels
        </p>
      </header>

      {/* Timeline scroll */}
      <main>
        {/* Intro spacer */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <p
            className="frost px-6 py-2 text-2xl md:text-3xl tracking-[0.15em] uppercase text-[#A8B5A2] mb-6"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            A Love Story
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
            Scroll for our story or jump straight to{" "}
            <button
              onClick={() => setShowModal(true)}
              className="text-[#A8B5A2] hover:text-[#8F9A86] underline underline-offset-2 transition-colors"
            >
              details
            </button>
          </p>
        </section>

        {/* Timeline cards */}
        {timelineData.map((entry) => (
          <TimelineCard
            key={entry.id}
            entry={entry}
          />
        ))}

        {/* Bottom CTA */}
        <section className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6 pb-32">
          <p
            className="text-3xl text-[#3A342F] mb-8"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Ready to celebrate?
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
