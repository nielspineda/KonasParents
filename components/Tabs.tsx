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
      <div className="flex border-b border-gray-200 mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-6 py-3 text-sm tracking-wide transition-colors ${
              active === i
                ? "border-b-2 border-[#b89a7a] text-[#b89a7a] font-medium"
                : "text-gray-500 hover:text-gray-800"
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
