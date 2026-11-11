"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { INTRO_TRUST_BOX, TESTIMONIALS_DATA } from "@/data/testimonialData";
import { useLanguage } from "@/context/LanguageContext";
import { ReviewItem, ReviewResponse } from "@/types/review";

const INITIAL_FALLBACK_REVIEWS: ReviewItem[] = TESTIMONIALS_DATA.map((rev) => ({
  id: rev.id,
  rating: rev.rating,
  text: rev.quoteEn,
  authorName: rev.authorEn,
  location: rev.locationEn,
  relativeTime: "Google Verified",
  source: "google",
}));

export const Testimonials: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [reviewData, setReviewData] = useState<ReviewResponse>({
    rating: 5.0,
    totalReviews: 120,
    reviews: INITIAL_FALLBACK_REVIEWS,
    source: "google",
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/store/reviews?lang=${language}`);
        if (res.ok) {
          const data: ReviewResponse = await res.json();
          if (isMounted && data.reviews && data.reviews.length > 0) {
            setReviewData(data);
          }
        }
      } catch (err) {
        console.error("Testimonials: Failed to fetch reviews", err);
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 350;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({
      left: isRTL ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="bht-section w-full bg-[#FAF9F7] py-8 sm:py-12 border-t border-[#F0EDE8] overflow-hidden"
      aria-label="Customer Trust & Google Reviews"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-6">
          {/* =========================================================
              LEFT ANCHOR: Black Trust & Care Card (STAYS IN PLACE)
          ========================================================= */}
          <div className="w-full lg:w-[310px] xl:w-[330px] shrink-0 bg-bht-charcoal text-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-bht-red block">
                  {language === "ar" ? "ثقة وأصالة" : "TRUST & CARE"}
                </span>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] text-gray-200">
                  <span className="font-semibold">{reviewData.rating.toFixed(1)} ★</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white tracking-tight mb-2">
                {language === "ar"
                  ? INTRO_TRUST_BOX.titleAr
                  : INTRO_TRUST_BOX.titleEn}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                {language === "ar"
                  ? INTRO_TRUST_BOX.contentAr
                  : INTRO_TRUST_BOX.contentEn}
              </p>
            </div>

            <div className="pt-3.5 mt-4 border-t border-gray-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-300">
                {language === "ar"
                  ? "بيت البطانيات للتجارة ذ.م.م"
                  : "Blanket House Trading LLC"}
              </span>
              <span className="text-[10px] text-gray-400">
                {language === "ar" ? "دبي، الإمارات" : "Dubai, UAE"}
              </span>
            </div>
          </div>

          {/* =========================================================
              RIGHT: Customer Reviews Carousel Track (SCROLLS HORIZONTALLY)
          ========================================================= */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* Carousel Header Controls */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-600">
                  {language === "ar" ? "تقييمات غوغل المعتمدة" : "GOOGLE VERIFIED REVIEWS"}
                </span>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-neutral-200 text-[11px] font-bold text-neutral-800 shadow-2xs">
                  <span className="text-[#FBBC05]">★</span>
                  <span>5.0</span>
                </div>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Previous review"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Next review"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 flex items-center justify-center text-neutral-700 transition-colors shadow-2xs cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Scrollable Reviews List */}
            <div
              ref={scrollContainerRef}
              className="flex items-stretch gap-4 overflow-x-auto pb-2 pt-0.5 snap-x snap-mandatory scrollbar-none scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {reviewData.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="snap-start shrink-0 w-[280px] xs:w-[310px] sm:w-[340px] md:w-[350px] bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-300 hover:shadow-md transition-all duration-300 shadow-2xs"
                >
                  <div>
                    {/* Stars + Google Icon */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1" aria-label={`${rev.rating} out of 5 stars`}>
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-bht-gold text-bht-gold"
                          />
                        ))}
                      </div>

                      <span title="Google Review" className="w-4 h-4 shrink-0 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                      </span>
                    </div>

                    {/* Complete Review Text without Truncation */}
                    <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed italic whitespace-normal">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>

                  {/* Full Author Name & Google Verified Badge */}
                  <div className="pt-3 mt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[10px] font-bold text-bht-charcoal shrink-0">
                        {rev.authorName ? rev.authorName.charAt(0).toUpperCase() : "G"}
                      </div>
                      <span className="text-xs font-bold text-bht-charcoal whitespace-normal">
                        {rev.authorName}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full shrink-0">
                      {language === "ar" ? "تقييم غوغل موثق" : "Google Verified"}
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
