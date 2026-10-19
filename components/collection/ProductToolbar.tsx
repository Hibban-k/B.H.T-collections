"use client";

import React from "react";
import {
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  X,
  ArrowUpDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating"
  | "name";

interface ActiveFilterItem {
  id: string;
  label: string;
  onRemove: () => void;
}

interface ProductToolbarProps {
  productCount: number;
  totalCount: number;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  gridColumns: 3 | 4;
  onGridColumnsChange: (cols: 3 | 4) => void;
  activeFilters: ActiveFilterItem[];
  onClearAllFilters: () => void;
}

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  productCount,
  totalCount,
  sortBy,
  onSortChange,
  isFilterOpen,
  onToggleFilter,
  gridColumns,
  onGridColumnsChange,
  activeFilters,
  onClearAllFilters,
}) => {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-white border-b border-[#EAEAEA] py-3.5 mb-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Side: Product Count & Active Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Toggle Button */}
          <button
            type="button"
            onClick={onToggleFilter}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
              isFilterOpen
                ? "bg-bht-charcoal text-white border-bht-charcoal"
                : "bg-white text-bht-charcoal border-[#D5D5D5] hover:bg-[#F5F5F5]"
            }`}
            aria-label="Toggle Filter Panel"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2]" />
            <span>{language === "ar" ? "الفلاتر" : "Filters"}</span>
            {activeFilters.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-bht-red text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>

          <span className="text-xs text-gray-500 font-medium">
            {language === "ar"
              ? `عرض ${productCount} من ${totalCount} منتج`
              : `Showing ${productCount} of ${totalCount} products`}
          </span>

          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 ml-2 rtl:ml-0 rtl:mr-2">
              {activeFilters.map((chip) => (
                <span
                  key={chip.id}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#F0F2F5] text-bht-charcoal border border-[#E0E0E0] px-2 py-0.5 rounded-md"
                >
                  <span>{chip.label}</span>
                  <button
                    type="button"
                    onClick={chip.onRemove}
                    className="hover:text-bht-red transition-colors"
                    aria-label={`Remove filter ${chip.label}`}
                  >
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={onClearAllFilters}
                className="text-[11px] font-bold text-bht-red hover:underline ml-1 rtl:ml-0 rtl:mr-1"
              >
                {language === "ar" ? "مسح الكل" : "Clear all"}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Sorting & Grid Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-gray-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 stroke-[2] hidden sm:block" />
            <label htmlFor="collection-sort" className="font-semibold text-gray-500 hidden sm:inline">
              {language === "ar" ? "ترتيب حسب:" : "Sort by:"}
            </label>
            <select
              id="collection-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-white border border-[#D5D5D5] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-bht-charcoal focus:outline-hidden focus:border-bht-charcoal cursor-pointer shadow-2xs"
            >
              <option value="featured">
                {language === "ar" ? "المميزة أولاً" : "Featured"}
              </option>
              <option value="price-low">
                {language === "ar" ? "السعر: من الأقل إلى الأعلى" : "Price: Low to High"}
              </option>
              <option value="price-high">
                {language === "ar" ? "السعر: من الأعلى إلى الأقل" : "Price: High to Low"}
              </option>
              <option value="rating">
                {language === "ar" ? "الأعلى تقييماً" : "Highest Rated"}
              </option>
              <option value="name">
                {language === "ar" ? "الاسم: أبجدياً" : "Alphabetical (A-Z)"}
              </option>
            </select>
          </div>

          {/* Desktop Grid Layout Switcher */}
          <div className="hidden lg:flex items-center gap-1 border border-[#D5D5D5] p-0.5 rounded-lg bg-[#FAFAFA]">
            <button
              type="button"
              onClick={() => onGridColumnsChange(3)}
              className={`p-1.5 rounded transition-colors ${
                gridColumns === 3
                  ? "bg-white text-bht-charcoal shadow-2xs"
                  : "text-gray-400 hover:text-bht-charcoal"
              }`}
              title="3 Columns"
              aria-label="3 Columns View"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onGridColumnsChange(4)}
              className={`p-1.5 rounded transition-colors ${
                gridColumns === 4
                  ? "bg-white text-bht-charcoal shadow-2xs"
                  : "text-gray-400 hover:text-bht-charcoal"
              }`}
              title="4 Columns"
              aria-label="4 Columns View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
