"use client";

import { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex justify-center gap-2 mb-10">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-5 py-2 text-sm tracking-wide rounded-full transition-colors ${
              active === i
                ? "bg-[#A8B5A2]/15 text-[#A8B5A2] font-medium"
                : "text-[#6F6760] hover:text-[#3A342F] hover:bg-[#E5DED6]/40"
            }`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab content */}
      <div>{tabs[active]?.content}</div>
    </div>
  );
}
