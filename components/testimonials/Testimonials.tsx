"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { INTRO_TRUST_BOX, TESTIMONIALS_DATA } from "@/data/testimonialData";
import { useLanguage } from "@/context/LanguageContext";
import { ReviewItem, ReviewResponse } from "@/types/review";

// Fallback initial reviews to prevent layout shift
const INITIAL_FALLBACK_REVIEWS: ReviewItem[] = TESTIMONIALS_DATA.map((rev) => ({
  id: rev.id,
  rating: rev.rating,
  text: rev.quoteEn,
  authorName: rev.authorEn,
  location: rev.locationEn,
  relativeTime: "Verified Customer",
  source: "verified",
}));

export const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const [reviewData, setReviewData] = useState<ReviewResponse>({
    rating: 5.0,
    totalReviews: 500,
    reviews: INITIAL_FALLBACK_REVIEWS.slice(0, 4),
    source: "fallback",
  });

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
        console.error("Testimonials: Failed to fetch live reviews", err);
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <section
      className="w-full bg-white py-14 md:py-20 border-t border-[#F0F0F0]"
      aria-label="Customer Trust & Google Reviews"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Exactly 5 boxes in horizontal row on desktop with increased height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
          {/* BOX 1: Black Introductory Trust Box */}
          <div className="bg-bht-charcoal text-white rounded-2xl p-7 lg:p-8 flex flex-col justify-between shadow-md min-h-[320px] sm:min-h-[350px] lg:min-h-[360px]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-bht-red block">
                  {language === "ar" ? "ثقة وأصالة" : "TRUST & CARE"}
                </span>

                {/* Google badge pill */}
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] text-gray-200">
                  <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 24 24">
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
                  <span className="font-semibold">{reviewData.rating.toFixed(1)} ★</span>
                </div>
              </div>

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

            <div className="pt-5 mt-6 border-t border-gray-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400">
                {language === "ar"
                  ? "بيت البطانيات للتجارة ذ.م.م"
                  : "Blanket House Trading LLC"}
              </span>
              <span className="text-[10px] text-gray-400">
                {language === "ar" ? "دبي، الإمارات" : "Dubai, UAE"}
              </span>
            </div>
          </div>

          {/* BOXES 2 - 5: White Testimonial Review Boxes (from Google Profile / Verified) */}
          {reviewData.reviews.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-bht-border p-7 lg:p-8 flex flex-col justify-between hover:border-[#CCCCCC] hover:shadow-md transition-all duration-300 min-h-[320px] sm:min-h-[350px] lg:min-h-[360px]"
            >
              <div>
                {/* 5 Warm Gold Stars + Google Source Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1" aria-label={`${rev.rating} out of 5 stars`}>
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-bht-gold text-bht-gold"
                      />
                    ))}
                  </div>

                  {rev.source === "google" && (
                    <span
                      title="Google Review"
                      className="w-4 h-4 shrink-0 flex items-center justify-center opacity-85"
                    >
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
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#333333] leading-relaxed italic line-clamp-5">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author & Location / Relative Time */}
              <div className="pt-5 mt-6 border-t border-[#F2F2F2] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {rev.authorPhoto ? (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-gray-200">
                      <Image
                        src={rev.authorPhoto}
                        alt={rev.authorName}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                  ) : null}
                  <span className="text-xs font-bold text-bht-charcoal truncate">
                    {rev.authorName}
                  </span>
                </div>

                <span className="text-[11px] text-[#888888] shrink-0">
                  {rev.relativeTime || rev.location || (language === "ar" ? "عميل موثق" : "Verified Customer")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
