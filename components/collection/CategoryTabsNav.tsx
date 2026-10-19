"use client";

import React from "react";
import Link from "next/link";
import { Bed, Luggage, Footprints } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryTabsNavProps {
  activeCategory: "bedding" | "travel-bags" | "footwear" | "all";
  onSelectCategory?: (category: "bedding" | "travel-bags" | "footwear" | "all") => void;
}

export const CategoryTabsNav: React.FC<CategoryTabsNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const { language } = useLanguage();

  const tabs: {
    id: "all" | "bedding" | "travel-bags" | "footwear";
    nameEn: string;
    nameAr: string;
    href: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
      {
        id: "bedding",
        nameEn: "Bedding",
        nameAr: "المفروشات",
        href: "/collections/bedding",
        icon: <Bed className="w-4 h-4 stroke-[2]" />,
        color: "text-bht-red",
      },
      {
        id: "travel-bags",
        nameEn: "Travel Bags",
        nameAr: "حقائب السفر",
        href: "/collections/travel-bags",
        icon: <Luggage className="w-4 h-4 stroke-[2]" />,
        color: "text-bht-blue",
      },
      {
        id: "footwear",
        nameEn: "Footwear",
        nameAr: "الأحذية",
        href: "/collections/footwear",
        icon: <Footprints className="w-4 h-4 stroke-[2]" />,
        color: "text-bht-green",
      },
    ];

  return (
    <div className="w-full bg-white border-b border-[#EBEBEB] py-3 sticky top-[108px] sm:top-[128px] z-30 shadow-2xs backdrop-blur-md bg-white/95">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none py-1">
          {/* Segmented Category Buttons */}
          <div
            role="tablist"
            className="flex items-center gap-1.5 sm:gap-2 p-1 bg-[#F5F6F7] rounded-xl border border-[#E5E5E5] shrink-0"
          >
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  role="tab"
                  aria-selected={isActive}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory(tab.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 select-none ${isActive
                      ? "bg-white text-bht-charcoal shadow-xs border border-[#DFDFDF] border-b-2 border-b-bht-red"
                      : "text-[#666666] hover:text-bht-charcoal hover:bg-white/60"
                    }`}
                >
                  <span className={isActive ? tab.color : "text-gray-400"}>
                    {tab.icon}
                  </span>
                  <span>{language === "ar" ? tab.nameAr : tab.nameEn}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick wholesale inquiry indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-bht-slate font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>
              {language === "ar"
                ? "متوفر للبيع بالجملة والتجزئة في دول الخليج"
                : "Wholesale & Retail Available Across GCC"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
