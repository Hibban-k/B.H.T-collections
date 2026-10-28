"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { INTRO_TRUST_BOX, TESTIMONIALS_DATA } from "@/data/testimonialData";
import { useLanguage } from "@/context/LanguageContext";

export const Testimonials: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalReviews = TESTIMONIALS_DATA.length; // 4
  // Duplicate reviews to ensure continuous seamless sliding without trailing whitespace
  const slidingReviews = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Auto-play sliding interval (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNext, 4500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section
      className="relative w-full border-t border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden"
      aria-label="Customer Trust & Reviews"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* 2-Column Grid: Left Column is FULL SECTION BLACK from top to bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px]">
          
          {/* COLUMN 1: Full-Height Solid Black Static Content Column */}
          <div className="lg:col-span-4 xl:col-span-4 relative bg-bht-charcoal text-white flex flex-col justify-between py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12 z-10">
            {/* Seamless full-bleed black backdrop extending from column edge all the way to screen boundary */}
            <div className="absolute inset-y-0 end-0 -start-[100vw] bg-bht-charcoal z-[-1] hidden lg:block pointer-events-none" />

            {/* Static Content */}
            <div className="relative z-10">
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase text-bht-red block mb-3">
                {language === "ar" ? "ثقة وأصالة" : "TRUST & CARE"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
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

            {/* Bottom Brand Name & Slider Navigation Arrows */}
            <div className="relative z-10 pt-8 mt-8 border-t border-gray-800/80 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400">
                {language === "ar"
                  ? "بيت البطانيات للتجارة ذ.م.م"
                  : "Blanket House Trading LLC"}
              </span>

              {/* Slider Navigation Controls */}
              <div className="flex items-center gap-2" dir="ltr">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-all active:scale-95 border border-neutral-700/80"
                  aria-label="Previous review"
                >
                  <PrevIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-all active:scale-95 border border-neutral-700/80"
                  aria-label="Next review"
                >
                  <NextIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Reviews Sliding Column */}
          <div
            className="lg:col-span-8 xl:col-span-8 bg-[#FAFAFA] flex flex-col justify-between py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 overflow-hidden relative z-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Sliding Track Viewport */}
            <div className="overflow-hidden w-full h-full rounded-2xl">
              <div
                className="flex gap-4 sm:gap-5 transition-transform duration-500 ease-in-out h-full [--card-width:100%] [--card-gap:16px] sm:[--card-width:calc(50%-10px)] sm:[--card-gap:20px]"
                style={{
                  transform: `translateX(calc(${isRTL ? 1 : -1} * ${currentIndex} * (var(--card-width) + var(--card-gap))))`,
                }}
              >
                {slidingReviews.map((rev, idx) => (
                  <div
                    key={`${rev.id}-${idx}`}
                    className="w-[var(--card-width)] shrink-0 bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full min-h-[280px]"
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
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                        &ldquo;{language === "ar" ? rev.quoteAr : rev.quoteEn}&rdquo;
                      </p>
                    </div>

                    {/* Verified Author & UAE Location */}
                    <div className="pt-4 mt-6 border-t border-[#F2F2F2] flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">
                        {language === "ar" ? rev.authorAr : rev.authorEn}
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        {language === "ar" ? rev.locationAr : rev.locationEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-6">
              {TESTIMONIALS_DATA.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex % totalReviews === dotIdx
                      ? "w-6 bg-bht-charcoal"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to review ${dotIdx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
