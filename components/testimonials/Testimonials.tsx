"use client";

import React from "react";
import { Star } from "lucide-react";
import { INTRO_TRUST_BOX, TESTIMONIALS_DATA } from "@/data/testimonialData";
import { useLanguage } from "@/context/LanguageContext";

export const Testimonials: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      className="w-full bg-white py-14 md:py-20 border-t border-[#F0F0F0]"
      aria-label="Customer Trust & Reviews"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* NO HEADING - Exactly 5 boxes in horizontal row on desktop with increased height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
          {/* BOX 1: Black Introductory Trust Box */}
          <div className="bg-bht-charcoal text-white rounded-2xl p-7 lg:p-8 flex flex-col justify-between shadow-md min-h-[320px] sm:min-h-[350px] lg:min-h-[360px]">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-bht-red block mb-3">
                {language === "ar" ? "ثقة وأصالة" : "TRUST & CARE"}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-3">
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
            <div className="pt-5 mt-6 border-t border-gray-800">
              <span className="text-[11px] font-bold text-gray-400">
                {language === "ar"
                  ? "بيت البطانيات للتجارة ذ.م.م"
                  : "Blanket House Trading LLC"}
              </span>
            </div>
          </div>

          {/* BOXES 2 - 5: White Testimonial Review Boxes with increased height */}
          {TESTIMONIALS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-bht-border p-7 lg:p-8 flex flex-col justify-between hover:border-[#CCCCCC] hover:shadow-md transition-all duration-300 min-h-[320px] sm:min-h-[350px] lg:min-h-[360px]"
            >
              <div>
                {/* 5 Warm Gold Stars */}
                <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
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
              <div className="pt-5 mt-6 border-t border-[#F2F2F2] flex items-center justify-between">
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
    </section>
  );
};
