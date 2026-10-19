"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Bed, Luggage, Footprints } from "lucide-react";
import { MEGA_MENU_CATEGORIES } from "@/data/navigationData";
import { useLanguage } from "@/context/LanguageContext";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory?: string | null;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Product Categories Mega Menu"
      className="absolute top-full left-0 right-0 w-full z-50 pt-2 pb-6 px-4 md:px-8 animate-fade-in"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl border border-bht-border shadow-xl p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-[#EFEFEF]">
          {MEGA_MENU_CATEGORIES.map((category) => {
            const isBedding = category.id === "bedding";
            const isTravelling = category.id === "travelling";
            const isFootwear = category.id === "footwear";

            const accentColorClass = isBedding
              ? "text-bht-red"
              : isTravelling
              ? "text-bht-blue"
              : "text-bht-green";

            const circleBgClass = isBedding
              ? "bg-bht-red text-white"
              : isTravelling
              ? "bg-bht-blue text-white"
              : "bg-bht-green text-white";

            return (
              <div
                key={category.id}
                className="px-4 lg:px-6 py-4 md:py-0 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header with Circle Icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-xs ${circleBgClass}`}
                    >
                      {isBedding && <Bed className="w-5 h-5 stroke-[2]" />}
                      {isTravelling && <Luggage className="w-5 h-5 stroke-[2]" />}
                      {isFootwear && <Footprints className="w-5 h-5 stroke-[2]" />}
                    </div>
                    <Link
                      href={category.href}
                      onClick={onClose}
                      className="text-lg font-bold text-bht-charcoal hover:text-bht-red transition-colors"
                    >
                      {language === "ar" ? category.nameAr : category.nameEn}
                    </Link>
                  </div>

                  {/* Subcategories and Product Image side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center min-h-[220px]">
                    {/* Subcategories Link List */}
                    <ul className="space-y-2.5">
                      {category.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.href}
                            onClick={onClose}
                            className="group flex items-center justify-between text-sm text-[#444444] hover:text-bht-charcoal font-medium transition-colors py-1"
                          >
                            <span>
                              {language === "ar" ? sub.nameAr : sub.nameEn}
                            </span>
                            <ArrowIcon className="w-3.5 h-3.5 text-[#AAAAAA] group-hover:text-bht-charcoal group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all" />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Category Product Image with subtle hover zoom */}
                    <div className="relative w-full h-[180px] lg:h-[200px] flex items-center justify-center group overflow-hidden rounded-xl bg-gradient-to-b from-[#FAFAFA] to-white/20 p-2">
                      <Image
                        src={category.image}
                        alt={category.imageAlt}
                        fill
                        className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 250px"
                      />
                    </div>
                  </div>
                </div>

                {/* View All Link */}
                <div className="mt-6 pt-4 border-t border-[#F2F2F2]">
                  <Link
                    href={category.href}
                    onClick={onClose}
                    className={`inline-flex items-center gap-1.5 text-sm font-bold ${accentColorClass} hover:opacity-80 transition-opacity`}
                  >
                    <span>
                      {language === "ar"
                        ? category.viewAllTextAr
                        : category.viewAllTextEn}
                    </span>
                    <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
