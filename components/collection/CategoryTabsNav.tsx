"use client";

import React from "react";
import Link from "next/link";
import { Bed, Luggage, Footprints, LayoutGrid } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface DynamicCategoryTab {
  id: string;
  slug: string;
  nameEn: string;
  nameAr?: string;
}

interface CategoryTabsNavProps {
  activeCategory: string;
  onSelectCategory?: (category: string) => void;
  categories?: DynamicCategoryTab[];
}

export const CategoryTabsNav: React.FC<CategoryTabsNavProps> = ({
  activeCategory,
  onSelectCategory,
  categories = [],
}) => {
  const { language } = useLanguage();

  const getCategoryIcon = (slug: string) => {
    const s = slug.toLowerCase();
    if (s.includes("bed") || s.includes("blanket") || s.includes("sheet")) {
      return { icon: <Bed className="w-4 h-4 stroke-[2]" />, color: "text-bht-red" };
    }
    if (s.includes("travel") || s.includes("bag") || s.includes("trolley") || s.includes("luggage")) {
      return { icon: <Luggage className="w-4 h-4 stroke-[2]" />, color: "text-bht-blue" };
    }
    if (s.includes("foot") || s.includes("shoe") || s.includes("slipper") || s.includes("clog")) {
      return { icon: <Footprints className="w-4 h-4 stroke-[2]" />, color: "text-bht-green" };
    }
    return { icon: <LayoutGrid className="w-4 h-4 stroke-[2]" />, color: "text-bht-charcoal" };
  };

  const tabs = categories.map((cat) => {
    const { icon, color } = getCategoryIcon(cat.slug);
    return {
      id: cat.slug,
      nameEn: cat.nameEn,
      nameAr: cat.nameAr || cat.nameEn,
      href: `/${cat.slug}`,
      icon,
      color,
    };
  });

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-2 sm:py-3 sticky top-[72px] sm:top-[98px] lg:top-[116px] z-30 pointer-events-none select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start">
        {/* ONLY THIS SEGMENTED PILL SECTION IS STICKY & INTERACTIVE */}
        <div
          role="tablist"
          className="pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-2xl border border-[#DFDFDF] shadow-md shrink-0 overflow-x-auto scrollbar-none max-w-full"
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
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-[#F5F6F7] text-bht-charcoal shadow-2xs border border-[#DFDFDF] border-b-2 border-b-bht-red"
                    : "text-[#666666] hover:text-bht-charcoal hover:bg-neutral-100/70"
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
      </div>
    </div>
  );
};
