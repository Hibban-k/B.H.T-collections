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
  // Duplicate reviews to ensure seamless sliding without trailing whitespace
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
      className="w-full bg-white py-14 md:py-20 border-t border-[#F0F0F0]"
      aria-label="Customer Trust & Reviews"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Grid: Column 1 = Static Content, Column 2 = Sliding Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* COLUMN 1: Static Content Box (Full Height with Black Background) */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="bg-bht-charcoal text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md h-full min-h-[300px]">
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

              {/* Footer info & slider controls */}
              <div className="pt-6 mt-6 border-t border-gray-800/80 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-400">
                  {language === "ar"
                    ? "بيت البطانيات للتجارة ذ.م.م"
                    : "Blanket House Trading LLC"}
                </span>

                {/* Slider Navigation Buttons */}
                <div className="flex items-center gap-1.5" dir="ltr">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors shadow-xs active:scale-95"
                    aria-label="Previous review"
                  >
                    <PrevIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors shadow-xs active:scale-95"
                    aria-label="Next review"
                  >
                    <NextIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Reviews Sliding Column */}
          <div
            className="lg:col-span-8 flex flex-col justify-between overflow-hidden relative"
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
                    className="w-[var(--card-width)] shrink-0 bg-white rounded-2xl border border-bht-border p-6 sm:p-7 flex flex-col justify-between hover:border-[#CCCCCC] hover:shadow-md transition-all duration-300 h-full min-h-[280px]"
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
                    <div className="pt-4 mt-6 border-t border-[#F2F2F2] flex items-center justify-between">
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

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-4">
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
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
