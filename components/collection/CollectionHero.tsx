"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CollectionCategoryMeta } from "@/data/productsData";

interface CollectionHeroProps {
  categoryMeta?: CollectionCategoryMeta;
  activeCategoryName?: string;
  totalProducts?: number;
}

export const CollectionHero: React.FC<CollectionHeroProps> = ({
  categoryMeta,
  activeCategoryName,
  totalProducts = 0,
}) => {
  const { language } = useLanguage();

  return (
    <section
      className="relative w-full h-[180px] xs:h-[210px] sm:h-[260px] md:h-[320px] lg:h-[360px] overflow-hidden select-none bg-neutral-900 border-b border-[#E8E8E8]"
      aria-label="Collection Editorial Banner"
    >
      {/* 1. BACKGROUND BANNER IMAGE (FULL BLEED COVER LIKE HOME PAGE) */}
      <Image
        src={categoryMeta?.bannerImage || "/collections/bht-collection-banner.png"}
        alt={categoryMeta?.nameEn || "BHT Collections"}
        fill
        priority
        className="object-cover object-center transition-transform duration-700 hover:scale-101"
        sizes="100vw"
      />

      {/* 2. SUBTLE REFINED VIGNETTE OVERLAY FOR MAXIMUM TYPOGRAPHY CLARITY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

      {/* 3. DYNAMIC CATEGORY HEADER OVERLAY AT BOTTOM (ALIGNED WITH SITE CONTAINER) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white pointer-events-auto">
          <div className="max-w-2xl drop-shadow-md">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-bht-red bg-white/95 px-2.5 py-0.5 rounded-md inline-block mb-1.5 shadow-xs">
              {language === "ar" ? "تشكيلات فاخرة" : "BHT LUXURY COLLECTIONS"}
            </span>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-lg leading-tight">
              {categoryMeta
                ? language === "ar"
                  ? categoryMeta.nameAr
                  : categoryMeta.nameEn
                : activeCategoryName || (language === "ar" ? "جميع التشكيلات" : "All Collections")}
            </h1>
            {categoryMeta && (
              <p className="hidden sm:block text-xs sm:text-sm text-gray-100 font-medium drop-shadow-md mt-1 line-clamp-1">
                {language === "ar" ? categoryMeta.taglineAr : categoryMeta.taglineEn}
              </p>
            )}
          </div>

          {/* PRODUCT COUNT BADGE */}
          {totalProducts > 0 && (
            <div className="self-start sm:self-auto bg-black/70 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-md shrink-0">
              {language === "ar"
                ? `${totalProducts} منتج متوفر`
                : `${totalProducts} Products Available`}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
