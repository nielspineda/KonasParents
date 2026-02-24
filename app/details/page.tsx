"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import itineraryData from "@/content/itinerary.json";
import faqsData from "@/content/faqs.json";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type ActiveTab = "FAQs" | "RSVP" | null;

export default function DetailsPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const handleTabClick = (tab: "FAQs" | "RSVP" | "Photos") => {
    if (tab === "Photos") {
      router.push(`${BASE_PATH}/gallery`);
      return;
    }
    setActiveTab((prev) => (prev === tab ? null : tab));
    if (tab !== "FAQs") setOpenFaq(null);
  };

  return (
    <div className="min-h-screen bg-[#F4EFE8]">
      {/* Hero — compact text header */}
      <section className="pt-16 pb-10 text-center px-6">
        <p
          className="text-lg md:text-xl text-[#A8B5A2] mb-2"
          style={{ fontFamily: "'Nothing You Could Do', cursive" }}
        >
          Let&apos;s Celebrate!
        </p>
        <h1
          className="text-5xl md:text-7xl text-[#3A342F] leading-tight"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Bess &amp; Niels
        </h1>
        <p
          className="mt-3 text-[#6F6760] text-base md:text-lg tracking-wide"
          style={{ fontFamily: "'Nothing You Could Do', cursive" }}
        >
          08.08.26 | Napa, CA
        </p>
        <p className="divider-leaf mt-6 mb-0" style={{ fontFamily: "var(--font-sans)" }}>✦</p>
      </section>

      {/* Itinerary */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2
          className="text-4xl text-center mb-10 text-[#3A342F]"
          style={{ fontFamily: "'Nothing You Could Do', cursive" }}
        >
          The Weekend
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Photo */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <div className="polaroid">
              <img
                src="https://res.cloudinary.com/dgv13hqfw/image/upload/v1771913440/B0F579D3-9816-454A-AF2E-44C833EE05F3_1_105_c_eseppx.jpg"
                alt="Bess and Niels"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </div>
          {/* Itinerary */}
          <div className="w-full md:w-1/2">
            <div className="paper-card px-8 py-10">
              {itineraryData.map((day, di) => (
                <div key={di} className={di > 0 ? "mt-8 pt-8 border-t border-[#E5DED6]" : ""}>
                  <h3
                    className="text-2xl text-[#3A342F] mb-5"
                    style={{ fontFamily: "'Nothing You Could Do', cursive" }}
                  >
                    {day.day}
                  </h3>
                  <ol className="space-y-5">
                    {day.events.map((item, i) => (
                      <li key={i} className="flex gap-5">
                        <span
                          className="w-20 shrink-0 text-xs pt-1 tracking-wide text-[#A8B5A2] font-medium text-right"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {item.time}
                        </span>
                        <div className="border-l border-[#E5DED6] pl-5">
                          <p
                            className="text-lg text-[#3A342F] mb-0.5"
                            style={{ fontFamily: "'Nothing You Could Do', cursive" }}
                          >
                            {item.event}
                            {item.venue && (
                              <span className="text-sm text-[#A8B5A2] ml-2" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                                ({item.venue})
                              </span>
                            )}
                          </p>
                          <p
                            className="text-sm text-[#6F6760]"
                            style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
              <p
                className="mt-8 text-xs text-[#6F6760] italic"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
              >
                * The time ranges are set, but we&apos;re still finalizing venues outside of Charter Oak. These will be confirmed in March and April.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab pills row */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <div className="flex justify-center gap-3 mb-10">
          {(["FAQs", "RSVP", "Photos"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-6 py-2 text-lg tracking-wide rounded-full transition-colors ${
                activeTab === tab
                  ? "bg-[#A8B5A2]/15 text-[#A8B5A2]"
                  : "text-[#6F6760] hover:text-[#3A342F] hover:bg-[#E5DED6]/40"
              }`}
              style={{ fontFamily: "'Nothing You Could Do', cursive", fontWeight: 700 }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQs content */}
        {activeTab === "FAQs" && (
          <div className="max-w-2xl mx-auto">
            {faqsData.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border-b border-[#E5DED6]">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span
                      className="text-lg text-[#3A342F] group-hover:text-[#A8B5A2] transition-colors"
                      style={{ fontFamily: "'Nothing You Could Do', cursive" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`text-[#A8B5A2] text-xl ml-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 pb-5" : "max-h-0"}`}
                  >
                    <p
                      className="text-sm leading-relaxed text-[#6F6760] whitespace-pre-line"
                      style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* RSVP content */}
        {activeTab === "RSVP" && (
          <div className="text-center py-10 max-w-lg mx-auto">
            <p
              className="text-base leading-relaxed text-[#6F6760]"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
            >
              Given how tight-knit this wedding will be, no need for an RSVP! However, if you do have any concerns (i.e. dietary restrictions, timing, etc.) or last minute changes, please let us know directly!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
