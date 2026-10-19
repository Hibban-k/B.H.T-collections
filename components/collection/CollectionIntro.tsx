"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CollectionCategoryMeta } from "@/data/productsData";

interface CollectionIntroProps {
  categoryMeta: CollectionCategoryMeta;
  productCount: number;
}

export const CollectionIntro: React.FC<CollectionIntroProps> = ({
  categoryMeta,
  productCount,
}) => {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-white py-6 border-b border-[#F0F0F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Heading and Description */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-bht-red">
                {language === "ar" ? "تشكيلة معتمدة" : "CERTIFIED COLLECTION"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-500 font-semibold">
                {language === "ar" ? `${productCount} منتج` : `${productCount} Items`}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-bht-charcoal tracking-tight">
              {language === "ar" ? categoryMeta.nameAr : categoryMeta.nameEn}
            </h2>
            <p className="text-xs sm:text-sm text-bht-slate leading-relaxed mt-1.5">
              {language === "ar" ? categoryMeta.descriptionAr : categoryMeta.descriptionEn}
            </p>
          </div>

          {/* Right: Verified Distributor Brand Logos */}
          <div className="shrink-0 bg-[#FAFAFA] p-3 sm:p-4 rounded-xl border border-bht-border">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#888888] block mb-2 text-center sm:text-start">
              {language === "ar" ? "العلامات المتوفرة في هذا القسم:" : "Available Brands in this Category:"}
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
              {categoryMeta.distributorLogos.map((brand, idx) => (
                <div
                  key={idx}
                  className="w-24 sm:w-28 h-11 bg-white rounded-lg border border-[#E5E5E5] px-2 py-1 flex items-center justify-center shadow-2xs hover:border-[#CCCCCC] transition-colors"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain filter contrast-110"
                      sizes="110px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
