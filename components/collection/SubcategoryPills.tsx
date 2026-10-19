"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SubcategoryPillsProps {
  subcategories: { id: string; nameEn: string; nameAr: string }[];
  activeSubcategory: string;
  onSelectSubcategory: (id: string) => void;
  productCountBySubcategory?: Record<string, number>;
}

export const SubcategoryPills: React.FC<SubcategoryPillsProps> = ({
  subcategories,
  activeSubcategory,
  onSelectSubcategory,
  productCountBySubcategory = {},
}) => {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-[#FAFAFA] border-b border-[#EBEBEB] py-3 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {subcategories.map((sub) => {
            const isActive = activeSubcategory === sub.id;
            const count = productCountBySubcategory[sub.id];

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSelectSubcategory(sub.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-bht-charcoal text-white border-bht-charcoal shadow-xs"
                    : "bg-white text-[#555555] border-[#E0E0E0] hover:text-bht-charcoal hover:border-[#CCCCCC] hover:bg-[#F2F2F2]"
                }`}
              >
                <span>{language === "ar" ? sub.nameAr : sub.nameEn}</span>
                {typeof count === "number" && count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
