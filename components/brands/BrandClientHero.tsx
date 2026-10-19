"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const BrandClientHero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-white pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-[#F0F0F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1 mb-3">
          <span className="text-xs font-bold tracking-[0.22em] uppercase text-neutral-600">
            <span className="text-bht-red font-black">B</span>RAND &amp; CLIENT NETWORK
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-bht-charcoal font-normal tracking-tight mb-4">
          {language === "ar" ? "العلامات التجارية والعملاء" : "Brands & Clients"}
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto font-normal">
          {language === "ar"
            ? "نفخر بتوزيع أشهر العلامات التجارية العالمية والإقليمية، وتوفير حلول المفروشات وحقائب السفر والأحذية لكبرى المؤسسات والعملاء في دولة الإمارات والخليج العربي."
            : "Proudly distributing leading trademarks and partnering with premier commercial retailers and corporate clients across the UAE and GCC region."}
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="w-8 h-[1.5px] bg-neutral-300" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-neutral-700">
            BHT COLLECTIONS
          </span>
          <span className="w-8 h-[1.5px] bg-neutral-300" />
        </div>
      </div>
    </section>
  );
};
