"use client";

import React from "react";
import { Star } from "lucide-react";
import { INTRO_TRUST_BOX, TESTIMONIALS_DATA } from "@/data/testimonialData";
import { useLanguage } from "@/context/LanguageContext";

export const Testimonials: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      className="relative w-full border-t border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden"
      aria-label="Customer Trust & Reviews"
    >
      <div className="max-w-[1760px] mx-auto">
        {/* Split Grid: Left Column is FULL-SECTION BLACK from top to bottom, Right is full height light */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px]">
          
          {/* LEFT COLUMN: Static Content - Full section black from top to bottom */}
          <div className="lg:col-span-3 xl:col-span-3 relative bg-bht-charcoal text-white flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-8 xl:px-10 z-10">
            {/* Full-bleed black backdrop extending from column edge to screen boundary */}
            <div className="absolute inset-y-0 end-0 -start-[100vw] bg-bht-charcoal -z-10 hidden lg:block pointer-events-none" />

            {/* Static Content Copy */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase text-bht-red block mb-2.5">
                {language === "ar" ? "ثقة وأصالة" : "TRUST & CARE"}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
                {language === "ar"
                  ? INTRO_TRUST_BOX.titleAr
                  : INTRO_TRUST_BOX.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {language === "ar"
                  ? INTRO_TRUST_BOX.contentAr
                  : INTRO_TRUST_BOX.contentEn}
              </p>
            </div>

            {/* Brand LLC Footer */}
            <div className="pt-6 mt-6 border-t border-gray-800">
              <span className="text-[11px] font-bold text-gray-400">
                {language === "ar"
                  ? "بيت البطانيات للتجارة ذ.م.م"
                  : "Blanket House Trading LLC"}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Full-Height Light Color with the 4 Same Review Cards as Old */}
          <div className="lg:col-span-9 xl:col-span-9 relative bg-[#FAFAFA] flex items-center py-10 sm:py-14 lg:py-16 px-4 sm:px-6 xl:px-8 z-10">
            {/* Full-bleed light backdrop extending to right screen boundary */}
            <div className="absolute inset-y-0 start-0 -end-[100vw] bg-[#FAFAFA] -z-10 hidden lg:block pointer-events-none" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 items-stretch">
              {TESTIMONIALS_DATA.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl border border-bht-border p-6 flex flex-col justify-between hover:border-[#CCCCCC] hover:shadow-md transition-all duration-300 h-full min-h-[220px]"
                >
                  <div>
                    {/* 5 Warm Gold Stars */}
                    <div
                      className="flex items-center gap-1 mb-4"
                      aria-label="5 out of 5 stars"
                    >
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-bht-gold text-bht-gold"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-xs sm:text-sm text-[#333333] leading-relaxed italic">
                      &ldquo;{language === "ar" ? rev.quoteAr : rev.quoteEn}&rdquo;
                    </p>
                  </div>

                  {/* Verified Author & UAE Location */}
                  <div className="pt-4 mt-4 border-t border-[#F2F2F2] flex items-center justify-between">
                    <span className="text-xs font-bold text-bht-charcoal">
                      {language === "ar" ? rev.authorAr : rev.authorEn}
                    </span>
                    <span className="text-[11px] text-[#888888]">
                      {language === "ar" ? rev.locationAr : rev.locationEn}
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
