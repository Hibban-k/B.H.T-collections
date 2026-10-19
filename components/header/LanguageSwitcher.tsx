"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = (newLang: "en" | "ar") => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <div className="relative select-none" ref={containerRef}>
      {/* Luxury Minimal Language Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-neutral-200 hover:border-neutral-900 bg-white hover:bg-neutral-50/80 transition-all duration-200 text-xs font-medium text-neutral-800 shadow-2xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900 transition-colors stroke-[1.8]" />
        <span className="font-semibold tracking-wide">
          {language === "en" ? "English" : "العربية"}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-700 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-neutral-900" : ""
          }`}
        />
      </button>

      {/* Luxury Floating Dropdown Menu */}
      {isOpen && (
        <div className="absolute end-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-neutral-100 py-1.5 z-50 animate-scale-up origin-top-right">
          {/* Option: English */}
          <button
            type="button"
            onClick={() => handleSelectLanguage("en")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-start transition-colors hover:bg-neutral-50 ${
              language === "en"
                ? "font-bold text-neutral-900 bg-neutral-50/60"
                : "font-normal text-neutral-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🇬🇧</span>
              <span>English</span>
            </div>
            {language === "en" && (
              <Check className="w-3.5 h-3.5 text-bht-red stroke-[2.5]" />
            )}
          </button>

          {/* Option: Arabic */}
          <button
            type="button"
            onClick={() => handleSelectLanguage("ar")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-start transition-colors hover:bg-neutral-50 font-arabic ${
              language === "ar"
                ? "font-bold text-neutral-900 bg-neutral-50/60"
                : "font-normal text-neutral-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🇦🇪</span>
              <span>العربية</span>
            </div>
            {language === "ar" && (
              <Check className="w-3.5 h-3.5 text-bht-red stroke-[2.5]" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
