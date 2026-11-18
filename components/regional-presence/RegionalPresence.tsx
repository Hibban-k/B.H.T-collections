"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mb-6 max-w-xl">
              {language === "ar"
                ? REGIONAL_PRESENCE_DATA.supportingAr
                : REGIONAL_PRESENCE_DATA.supportingEn}
            </p>

            {/* 6 Circular Country Flags (3 Columns x 2 Rows) - Interactive Regional Presence Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-[#F0F0F0]">
              {REGIONAL_PRESENCE_DATA.countries.map((country) => (
                <Link
                  key={country.id}
                  href={`/contact?region=${country.id}#store-location`}
                  className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-[#FAF9F7] border border-transparent hover:border-neutral-200 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  {/* Circular Flag with subtle hover scale */}
                  <div className="mb-2.5 transition-transform duration-300 group-hover:scale-110">
                    <CircularFlag
                      country={country.flagColors.type}
                      size={58}
                    />
                  </div>

                  {/* Country Name */}
                  <div className="text-xs font-extrabold tracking-wider text-bht-charcoal group-hover:text-bht-red uppercase transition-colors">
                    <span>
                      {language === "ar" ? country.nameAr : country.nameEn}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
