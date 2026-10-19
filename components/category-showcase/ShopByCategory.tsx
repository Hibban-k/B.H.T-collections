"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { CATEGORY_SHOWCASE_ITEMS } from "@/data/categoryData";
import { useLanguage } from "@/context/LanguageContext";

export const ShopByCategory: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      className="w-full bg-white py-5 sm:py-10 md:py-16 lg:py-20"
      aria-label="Shop by Category & Brands"
    >
      <div className="max-w-[1760px] mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* 3 COLUMNS IN A SINGLE HORIZONTAL ROW ACROSS ALL SCREENS (MOBILE INCLUDED) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {CATEGORY_SHOWCASE_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative block h-[175px] xs:h-[195px] sm:h-[260px] md:h-[340px] lg:h-[420px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 active:scale-[0.98]"
            >
              {/* 1. FULL BACKGROUND LIFESTYLE IMAGE */}
              <div className="absolute inset-0 w-full h-full bg-neutral-900">
                <Image
                  src={item.productImage}
                  alt={language === "ar" ? item.categoryNameAr : item.categoryNameEn}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 450px"
                />

                {/* 2. REFINED DARK/WARM VIGNETTE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 group-hover:from-black/80 transition-all duration-500" />
              </div>

              {/* 3. CENTER / UPPER: BOLD WHITE BRAND LOGO FLOATING OVER IMAGE */}
              <div className="absolute inset-x-0 top-3 sm:top-0 sm:inset-0 z-10 flex flex-col items-center justify-start sm:justify-center p-1 sm:p-4 md:p-6 text-center pointer-events-none">
                <div className="relative w-16 xs:w-20 sm:w-36 md:w-48 lg:w-56 h-8 xs:h-10 sm:h-16 md:h-24 lg:h-28 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] flex items-center justify-center">
                  <Image
                    src={item.brandLogo}
                    alt={item.brandName}
                    fill
                    className="object-contain filter brightness-100 drop-shadow-md"
                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 180px, 240px"
                  />
                </div>
              </div>

              {/* 4. BOTTOM: CATEGORY TITLE & CALL TO ACTION */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-2 sm:p-4 md:p-6 lg:p-8 flex items-end justify-between gap-1">
                <div className="min-w-0 w-full sm:w-auto text-center sm:text-start">
                  <h3 className="text-[11px] xs:text-xs sm:text-base md:text-xl lg:text-2xl font-black text-white tracking-tight sm:tracking-wider uppercase drop-shadow-md leading-tight">
                    {language === "ar"
                      ? item.categoryNameAr
                      : item.categoryNameEn}
                  </h3>
                  {item.subtitleEn && (
                    <p className="hidden sm:block text-xs md:text-sm text-gray-200 font-medium drop-shadow-sm mt-0.5 truncate">
                      {language === "ar" ? item.subtitleAr : item.subtitleEn}
                    </p>
                  )}
                </div>

                {/* Circular Action Arrow Button (Desktop / Tablet) */}
                <div className="hidden sm:flex w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 group-hover:bg-bht-red text-white backdrop-blur-md items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110 shrink-0">
                  <ArrowIcon className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
