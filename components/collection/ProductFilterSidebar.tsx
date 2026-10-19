"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface FilterState {
  subcategory: string;
  selectedBrands: string[];
  maxPrice: number;
  inStockOnly: boolean;
}

interface ProductFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (newFilters: FilterState) => void;
  availableBrands: string[];
  availableSubcategories: { id: string; nameEn: string; nameAr: string }[];
  highestPrice: number;
  onResetFilters: () => void;
}

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  availableBrands,
  availableSubcategories,
  highestPrice,
  onResetFilters,
}) => {
  const { language } = useLanguage();

  const handleBrandToggle = (brand: string) => {
    const isSelected = filters.selectedBrands.includes(brand);
    const updated = isSelected
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onFiltersChange({ ...filters, selectedBrands: updated });
  };

  const handleSubcategoryChange = (subId: string) => {
    onFiltersChange({
      ...filters,
      subcategory: filters.subcategory === subId ? "all" : subId,
    });
  };

  const content = (
    <div className="space-y-6 text-sm">
      {/* 1. SUBCATEGORY FILTER */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-bht-charcoal mb-3">
          {language === "ar" ? "الأقسام الفرعية" : "Subcategory"}
        </h4>
        <div className="space-y-1.5">
          {availableSubcategories.map((sub) => {
            const isSelected =
              filters.subcategory === sub.id ||
              (sub.id === "all" && filters.subcategory === "all");

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleSubcategoryChange(sub.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-start ${
                  isSelected
                    ? "bg-[#EFEFEF] text-bht-charcoal font-bold"
                    : "text-gray-600 hover:bg-[#F8F8F8] hover:text-bht-charcoal"
                }`}
              >
                <span>{language === "ar" ? sub.nameAr : sub.nameEn}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-bht-red stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full h-px bg-[#EBEBEB]" />

      {/* 2. BRAND FILTER */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-bht-charcoal mb-3">
          {language === "ar" ? "العلامة التجارية" : "Brand"}
        </h4>
        <div className="space-y-2">
          {availableBrands.map((brand) => {
            const isChecked = filters.selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-bht-charcoal select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 rounded border-gray-300 text-bht-red focus:ring-bht-red cursor-pointer"
                />
                <span className={isChecked ? "font-bold text-bht-charcoal" : "font-normal"}>
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full h-px bg-[#EBEBEB]" />

      {/* 3. PRICE RANGE SLIDER */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-bht-charcoal">
            {language === "ar" ? "نطاق السعر (درهم)" : "Price Range (AED)"}
          </h4>
          <span className="text-xs font-bold text-bht-red">
            AED {filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max={highestPrice || 700}
          step="10"
          value={filters.maxPrice}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              maxPrice: Number(e.target.value),
            })
          }
          className="w-full accent-bht-charcoal cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-semibold">
          <span>AED 50</span>
          <span>AED {highestPrice || 700}</span>
        </div>
      </div>

      <div className="w-full h-px bg-[#EBEBEB]" />

      {/* 4. IN STOCK TOGGLE */}
      <div>
        <label className="flex items-center justify-between cursor-pointer select-none">
          <span className="text-xs font-bold text-bht-charcoal">
            {language === "ar" ? "المتوفر في المخزون فقط" : "In Stock Only"}
          </span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFiltersChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="w-4 h-4 rounded border-gray-300 text-bht-red focus:ring-bht-red cursor-pointer"
          />
        </label>
      </div>

      {/* 5. RESET BUTTON */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full py-2 px-3 text-xs font-bold text-gray-600 bg-[#F5F5F5] hover:bg-[#EAEAEA] hover:text-bht-charcoal rounded-lg transition-colors border border-[#E0E0E0]"
        >
          {language === "ar" ? "إعادة ضبط الفلاتر" : "Reset All Filters"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR PANEL */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-300 overflow-hidden ${
          isOpen ? "w-64 opacity-100 mr-6 rtl:mr-0 rtl:ml-6" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-64 bg-white p-5 rounded-2xl border border-bht-border shadow-xs sticky top-[180px]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EBEBEB]">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-bht-charcoal">
              {language === "ar" ? "تصفية المنتجات" : "Filter Products"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-bht-charcoal"
              title="Close Filter Sidebar"
              aria-label="Close Filter Sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {content}
        </div>
      </aside>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={onClose}
          />

          {/* Drawer Box */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col p-5 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EBEBEB]">
              <h3 className="font-black text-base uppercase tracking-wider text-bht-charcoal">
                {language === "ar" ? "تصفية المنتجات" : "Filter Products"}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-bht-charcoal"
                aria-label="Close Filter Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">{content}</div>

            <div className="pt-4 border-t border-[#EBEBEB] mt-4 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-bht-charcoal text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                {language === "ar" ? "تطبيق الفلاتر" : "Apply Filters"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
