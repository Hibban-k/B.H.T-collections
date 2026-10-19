"use client";

import React from "react";
import { CircularFlag } from "@/components/regional-presence/CircularFlag";
import { useLanguage } from "@/context/LanguageContext";

interface CountryItem {
  id: "uae" | "ksa" | "qatar" | "bahrain" | "kuwait" | "oman";
  nameEn: string;
  nameAr: string;
}

const REGIONAL_COUNTRIES: CountryItem[] = [
  { id: "uae", nameEn: "UAE", nameAr: "الإمارات" },
  { id: "ksa", nameEn: "SAUDI ARABIA", nameAr: "السعودية" },
  { id: "qatar", nameEn: "QATAR", nameAr: "قطر" },
  { id: "bahrain", nameEn: "BAHRAIN", nameAr: "البحرين" },
  { id: "kuwait", nameEn: "KUWAIT", nameAr: "الكويت" },
  { id: "oman", nameEn: "OMAN", nameAr: "عُمان" },
];

export const ContactRegionalStrip: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-white py-8 sm:py-10 border-b border-[#EAEAEA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Left: Regional Identity Label */}
          <div className="flex flex-col text-center lg:text-start shrink-0">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
              {language === "ar"
                ? "فخر الصناعة والريادة الإماراتية"
                : "Proudly based in the UAE"}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              {language === "ar"
                ? "نخدم عملاءنا في جميع دول مجلس التعاون الخليجي والمنطقة"
                : "Serving customers across the region"}
            </p>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-[1px] h-10 bg-neutral-200 shrink-0" />

          {/* Right: 6 Circular Flags with Labels Below */}
          <div className="flex items-center justify-center flex-wrap gap-5 sm:gap-8 lg:gap-10">
            {REGIONAL_COUNTRIES.map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center justify-center text-center group"
              >
                <div className="transition-transform duration-200 group-hover:scale-110 mb-1.5 shadow-xs rounded-full">
                  <CircularFlag country={c.id} size={38} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-neutral-700 group-hover:text-neutral-900 transition-colors">
                  {language === "ar" ? c.nameAr : c.nameEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
