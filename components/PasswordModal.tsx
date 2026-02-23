"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface PasswordModalProps {
  onClose: () => void;
}

export default function PasswordModal({ onClose }: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    if (password === "bess&niels") {
      localStorage.setItem("kp_access", "true");
      router.push(`${BASE_PATH}/details`);
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Password required"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
        <h2
          className="text-2xl mb-1 text-center"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Details &amp; Itinerary
        </h2>
        <p
          className="text-center text-sm text-gray-500 mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Enter the password to continue.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#b89a7a] transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
            autoComplete="current-password"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">
              Incorrect password. Try again.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="bg-[#b89a7a] hover:bg-[#a38568] text-white rounded-lg px-4 py-3 text-sm font-medium transition-colors disabled:opacity-50"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {loading ? "Checking…" : "Enter"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
