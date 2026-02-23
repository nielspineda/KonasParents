"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tabs from "@/components/Tabs";
import Gallery from "@/components/Gallery";
import itineraryData from "@/content/itinerary.json";
import faqsData from "@/content/faqs.json";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// TODO: Replace with your actual Google Form URL
const RSVP_URL = "https://forms.google.com/TODO";

// TODO: Replace with actual gallery images
const galleryImages: { src: string; alt: string }[] = [];

export default function DetailsPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("kp_access");
    if (access === "true") {
      setAuthorized(true);
    } else {
      router.replace(`${BASE_PATH}/`);
    }
  }, [router]);

  if (!authorized) {
    return null;
  }

  const tabs = [
    {
      label: "RSVP",
      content: (
        <div className="text-center py-8 max-w-lg mx-auto">
          <p
            className="text-base leading-relaxed text-gray-600 mb-8"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
          >
            Given how tight-knit this wedding is, we&apos;ve likely already spoken
            to you and confirmed your attendance! But please fill out this RSVP
            still!
          </p>
          <a
            href={RSVP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#b89a7a] hover:bg-[#a38568] text-white rounded-full px-8 py-3 text-sm tracking-wide transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Fill Out RSVP Form →
          </a>
        </div>
      ),
    },
    {
      label: "FAQs",
      content: (
        <div className="max-w-2xl mx-auto space-y-6">
          {faqsData.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 pb-6">
              <h3
                className="text-lg mb-2 text-[#2c2c2c]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {faq.question}
              </h3>
              <p
                className="text-sm leading-relaxed text-gray-600"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Photos",
      content: <Gallery images={galleryImages} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Hero */}
      <section className="relative flex items-center justify-center h-[60vh] bg-gradient-to-br from-[#e8ddd1] to-[#cbb89e] overflow-hidden">
        {/* TODO: Replace the gradient with an actual hero image:
            <img src={`${BASE_PATH}/images/hero.jpg`} alt="Niels and Bess" className="absolute inset-0 w-full h-full object-cover" />
        */}
        <div className="relative z-10 text-center px-6">
          <p
            className="text-xs tracking-[0.3em] uppercase text-white/70 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            We&apos;re getting married
          </p>
          <h1
            className="text-5xl md:text-7xl text-white leading-tight"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
          >
            Niels &amp; Bess
          </h1>
          {/* TODO: Add actual wedding date */}
          <p
            className="mt-4 text-white/80 text-sm tracking-wide"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {/* TODO: Wedding date, e.g. "October 12, 2025 · San Francisco, CA" */}
            Date &amp; Location TBD
          </p>
        </div>
      </section>

      {/* Itinerary */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2
          className="text-3xl text-center mb-10 text-[#2c2c2c]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The Day
        </h2>
        <ol className="space-y-6">
          {itineraryData.map((item, i) => (
            <li key={i} className="flex gap-6">
              <span
                className="w-20 shrink-0 text-xs pt-1 tracking-wide text-[#b89a7a] font-medium text-right"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item.time}
              </span>
              <div className="border-l border-gray-200 pl-6">
                <p
                  className="text-base text-[#2c2c2c] mb-0.5"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.event}
                </p>
                <p
                  className="text-sm text-gray-500"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                >
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Tabs */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <Tabs tabs={tabs} />
      </section>
    </div>
  );
}
