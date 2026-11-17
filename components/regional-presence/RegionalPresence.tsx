"use client";

import React from "react";
import Image from "next/image";
import { REGIONAL_PRESENCE_DATA } from "@/data/regionalData";
import { CircularFlag } from "./CircularFlag";
import { useLanguage } from "@/context/LanguageContext";

export const RegionalPresence: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      className="bht-section w-full bg-white py-16 md:py-24 border-t border-[#F0F0F0]"
      aria-label="Our Regional Presence"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal-group="split" className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-bht-border bg-white shadow-xs">
          {/* LEFT: Authentic Dubai Skyline & BHT Collections Showcase (~45% / 5 Cols on desktop) */}
          <div className="lg:col-span-5 relative w-full min-h-[260px] sm:min-h-[380px] lg:min-h-[580px] bg-slate-900 overflow-hidden">
            <Image
              data-parallax
              src="/regional-presence.jpg"
              alt="BHT Collections Luxury Bedding, Luggage and Footwear in Dubai overlooking the Skyline - Regional Presence"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          {/* RIGHT: Regional Content & 6 Country Flags (~55% / 7 Cols on desktop) */}
          <div className="lg:col-span-7 p-5 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#888888]">
                {language === "ar"
                  ? REGIONAL_PRESENCE_DATA.eyebrowAr
                  : REGIONAL_PRESENCE_DATA.eyebrowEn}
              </span>
              <span className="w-10 h-[1px] bg-[#CCCCCC]" />
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-bht-charcoal tracking-tight mb-5">
              {language === "ar"
                ? REGIONAL_PRESENCE_DATA.headingAr
                : REGIONAL_PRESENCE_DATA.headingEn}
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-bht-slate leading-relaxed mb-4 max-w-xl">
              {language === "ar"
                ? REGIONAL_PRESENCE_DATA.descriptionAr
                : REGIONAL_PRESENCE_DATA.descriptionEn}
            </p>

            {/* Supporting Paragraph */}
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mb-8 max-w-xl">
              {language === "ar"
                ? REGIONAL_PRESENCE_DATA.supportingAr
                : REGIONAL_PRESENCE_DATA.supportingEn}
            </p>

            {/* 6 Circular Country Flags (3 Columns x 2 Rows) - Informational Presence Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-4 border-t border-[#F0F0F0]">
              {REGIONAL_PRESENCE_DATA.countries.map((country) => (
                <div
                  key={country.id}
                  className="flex flex-col items-center text-center p-2 rounded-xl"
                >
                  {/* Circular Flag with subtle hover scale */}
                  <div className="mb-3 transition-transform duration-300 hover:scale-106">
                    <CircularFlag
                      country={country.flagColors.type}
                      size={60}
                    />
                  </div>

                  {/* Country Name */}
                  <div className="text-xs font-extrabold tracking-wider text-bht-charcoal uppercase">
                    <span>
                      {language === "ar" ? country.nameAr : country.nameEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
