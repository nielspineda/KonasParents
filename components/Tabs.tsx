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
      <div className="flex border-b border-[#E5DED6] mb-10">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-6 py-3 text-sm tracking-wide transition-colors ${
              active === i
                ? "border-b-2 border-[#A8B5A2] text-[#A8B5A2] font-medium"
                : "text-[#6F6760] hover:text-[#3A342F]"
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
