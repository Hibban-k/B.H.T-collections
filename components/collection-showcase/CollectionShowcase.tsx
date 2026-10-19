"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SHOWCASE_TABS_DATA } from "@/data/showcaseData";
import { useLanguage } from "@/context/LanguageContext";

export const CollectionShowcase: React.FC = () => {
  const { language } = useLanguage();
  const [activeTabId, setActiveTabId] = useState<"bedding" | "travelling" | "footwear">("bedding");

  const currentTab = SHOWCASE_TABS_DATA.find((tab) => tab.id === activeTabId) || SHOWCASE_TABS_DATA[0];

  return (
    <section
      className="w-full bg-white py-12 md:py-20 border-t border-[#F0F0F0]"
      aria-label="Explore Our Collections"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER & TABS */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-bht-red block mb-1">
              {language === "ar" ? "تشكيلاتنا الحصرية" : "OUR COLLECTION"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-bht-charcoal tracking-tight">
              {language === "ar" ? "استكشف تشكيلاتنا المتميزة" : "Explore Our Collections"}
            </h2>
            <p className="text-xs sm:text-sm text-bht-slate mt-1">
              {language === "ar"
                ? "اكتشف أرقى المنتجات من علاماتنا التجارية المعتمدة."
                : "Discover products from our selected brands."}
            </p>
          </div>

          {/* INTERACTIVE CATEGORY TABS */}
          <div
            role="tablist"
            className="flex items-center gap-1 sm:gap-2 p-1 bg-[#F5F6F7] rounded-xl self-start sm:self-auto border border-[#EBEBEB] max-w-full overflow-x-auto scrollbar-none"
          >
            {SHOWCASE_TABS_DATA.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`shrink-0 px-3 xs:px-4 sm:px-6 py-1.5 sm:py-2 text-[11px] xs:text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${isActive
                    ? "bg-white text-bht-charcoal shadow-xs border-b-2 border-bht-red"
                    : "text-[#666666] hover:text-bht-charcoal hover:bg-white/50"
                    }`}
                >
                  {language === "ar" ? tab.nameAr : tab.nameEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5 LIFESTYLE PHOTO CARDS EXPANDED TO OCCUPY FULL WIDTH HARMONIOUSLY */}
        <div className="overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className="grid grid-flow-col auto-cols-[200px] xs:auto-cols-[230px] sm:auto-cols-[280px] lg:grid-cols-5 lg:auto-cols-auto gap-3 sm:gap-3">
            {currentTab.products.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group flex flex-col rounded-xl overflow-hidden bg-[#ECECEC] border border-[#E2E2E2] hover:border-[#CCCCCC] shadow-xs hover:shadow-xl transition-all duration-300 active:scale-[0.99]"
              >
                {/* 1. TOP: LIFESTYLE PHOTOGRAPHY AREA */}
                <div className="relative w-full h-64 xs:h-72 sm:h-80 md:h-88 lg:h-[410px] overflow-hidden bg-neutral-200">
                  <Image
                    src={product.image}
                    alt={language === "ar" ? product.nameAr : product.nameEn}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-106"
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
                  />

                  {/* Subtle hover gradient and title banner */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                    <span className="text-xs sm:text-sm font-semibold text-white line-clamp-1 drop-shadow-md">
                      {language === "ar" ? product.nameAr : product.nameEn}
                    </span>
                  </div>
                </div>

                {/* 2. BOTTOM: CLEAN LIGHT LOGO FOOTER (EXPANDED PROPORTIONALLY) */}
                <div className="h-18 sm:h-22 bg-[#F2F2F2] group-hover:bg-[#EAEAEA] transition-colors px-4 py-2 flex items-center justify-center border-t border-[#E5E5E5]">
                  {product.brandLogo ? (
                    <div className="relative w-32 sm:w-40 h-10 sm:h-13 flex items-center justify-center">
                      <Image
                        src={product.brandLogo}
                        alt={product.brandName}
                        fill
                        className="object-contain filter contrast-125 transition-transform duration-300 group-hover:scale-105"
                        sizes="200px"
                      />
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm font-black tracking-widest text-bht-charcoal uppercase group-hover:text-bht-red transition-colors text-center">
                      {product.brandName}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
