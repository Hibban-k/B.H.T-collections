"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface CustomerLogo {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
}

const CUSTOMERS: CustomerLogo[] = [
  {
    id: "lulu",
    name: "Lulu on the Move (LOT)",
    src: "/clientele/lulu-lot.png",
    width: 170,
    height: 70,
  },
  {
    id: "mark-save",
    name: "Mark & Save",
    src: "/clientele/mark-and-save.png",
    width: 160,
    height: 70,
  },
  {
    id: "al-madina",
    name: "Al Madina Group of Hypermarkets",
    src: "/clientele/al-madina.png",
    width: 170,
    height: 70,
  },
  {
    id: "talal-group",
    name: "Talal Group of Hypermarkets",
    src: "/clientele/talal-group.png",
    width: 170,
    height: 70,
  },
  {
    id: "shaklan",
    name: "Shaklan Hypermarket",
    src: "/clientele/shaklan.png",
    width: 160,
    height: 70,
  },
];

export const OurCustomers: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden border-t border-[#EAEAEA] bg-slate-900"
      aria-label="Our Clientele & Customers"
    >
      {/* 1. DUBAI SKYLINE CITY BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/travallingbag/dubai-portfolio-circle.jpg"
          alt="Dubai Skyline Background"
          fill
          className="object-cover object-center brightness-105"
          sizes="100vw"
        />
        {/* Soft, bright daylight haze overlay matching reference image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-sky-50/88 to-white/95 backdrop-blur-[1px]" />
      </div>

      {/* Decorative navy corner accent (matching reference image) */}
      <div className="absolute bottom-0 left-0 z-10 w-16 sm:w-28 h-16 sm:h-28 border-b-[18px] sm:border-b-[30px] border-l-[18px] sm:border-l-[30px] border-[#1B365D] pointer-events-none opacity-90" />

      {/* 2. SECTION CONTENT */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Top Navy Blue Header Badge */}
        <div className="mb-6 sm:mb-8">
          <div className="px-8 sm:px-12 py-2.5 sm:py-3 bg-[#1B365D] text-white font-black uppercase tracking-[0.2em] text-sm sm:text-base md:text-lg rounded-sm shadow-md text-center">
            {language === "ar" ? "عملائنا المميزون" : "OUR CLIENTELE"}
          </div>
        </div>

        {/* Pure White Container with Customer Logos */}
        <div className="w-full max-w-[1140px] bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-white/80 p-5 sm:p-7 md:p-9 transition-all duration-300 hover:shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center justify-items-center gap-6 sm:gap-8 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x lg:divide-gray-200/80">
            {CUSTOMERS.map((customer, idx) => (
              <div
                key={customer.id}
                className={`w-full flex items-center justify-center p-3 sm:p-4 group ${
                  idx > 0 ? "pt-6 sm:pt-4" : ""
                }`}
              >
                <div className="relative w-36 sm:w-44 lg:w-48 h-14 sm:h-16 lg:h-18 flex items-center justify-center transition-transform duration-300 group-hover:scale-108">
                  <Image
                    src={customer.src}
                    alt={customer.name}
                    fill
                    className="object-contain filter contrast-105"
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Quote */}
        <div className="mt-8 sm:mt-10 max-w-3xl text-center px-4">
          <p className="text-base sm:text-xl md:text-2xl font-black text-[#1E293B] leading-relaxed drop-shadow-2xs">
            “
            {language === "ar"
              ? "نخدم محفظة متميزة تضم أكثر من 500+ عميل عبر دولة الإمارات ودول مجلس التعاون الخليجي."
              : "We serve a distinguished portfolio of over 500+ customers across the UAE & GCC countries."}
            ”
          </p>
        </div>

        {/* Decorative Row of Customer Silhouettes (as in reference image) */}
        <div className="mt-6 sm:mt-7 flex items-center justify-center gap-1.5 sm:gap-2 text-[#0284C7] opacity-90 overflow-x-hidden max-w-full px-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <svg
              key={i}
              className="w-5 h-6 sm:w-6 sm:h-7 shrink-0 fill-current"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
};
