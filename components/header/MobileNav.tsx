"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  Bed,
  Luggage,
  Footprints,
} from "lucide-react";
import { MEGA_MENU_CATEGORIES, SECONDARY_NAV_ITEMS } from "@/data/navigationData";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { language, isRTL } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-[85vw] max-w-[380px] h-full bg-white flex flex-col shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src="/logo/logo.png"
                alt="Blanket House Trading LLC Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-start">
              <span className="text-[11px] font-bold text-bht-red font-arabic leading-tight">
                بيت البطانيات للتجارة ذ.م.م
              </span>
              <span className="text-sm font-extrabold text-bht-charcoal leading-tight">
                Blanket House Trading LLC
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-bht-charcoal hover:bg-bht-offwhite rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-[#F0F0F0]">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-[#888888] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "ar" ? "ابحث عن المنتجات..." : "Search products..."
              }
              className="w-full bg-[#F5F6F7] text-xs text-bht-charcoal rounded-full ps-9 pe-3 py-2 border border-transparent focus:border-bht-charcoal/30 focus:bg-white focus:outline-hidden"
            />
          </form>
        </div>

        {/* Product Categories (Accordions) */}
        <div className="p-4 space-y-2 border-b border-[#F0F0F0]">
          <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block mb-2">
            {language === "ar" ? "أقسام المنتجات" : "Product Categories"}
          </span>

          {MEGA_MENU_CATEGORIES.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const isBedding = category.id === "bedding";
            const isTravelling = category.id === "travelling";
            const isFootwear = category.id === "footwear";

            const circleClass = isBedding
              ? "bg-bht-red text-white"
              : isTravelling
              ? "bg-bht-blue text-white"
              : "bg-bht-green text-white";

            return (
              <div
                key={category.id}
                className="border border-[#EFEFEF] rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-3 bg-white hover:bg-bht-offwhite transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${circleClass}`}
                    >
                      {isBedding && <Bed className="w-4 h-4" />}
                      {isTravelling && <Luggage className="w-4 h-4" />}
                      {isFootwear && <Footprints className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-bold text-bht-charcoal">
                      {language === "ar" ? category.nameAr : category.nameEn}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="bg-[#FAFAFA] px-4 py-3 border-t border-[#EFEFEF] space-y-2">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-1 text-xs text-[#555555] hover:text-bht-charcoal font-medium"
                      >
                        <span>
                          {language === "ar" ? sub.nameAr : sub.nameEn}
                        </span>
                        <ArrowIcon className="w-3 h-3 text-[#AAAAAA]" />
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-[#EEEEEE]">
                      <Link
                        href={category.href}
                        onClick={onClose}
                        className="flex items-center gap-1 text-xs font-bold text-bht-red"
                      >
                        <span>
                          {language === "ar"
                            ? category.viewAllTextAr
                            : category.viewAllTextEn}
                        </span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Secondary Navigation Links */}
        <div className="p-4 space-y-1 border-b border-[#F0F0F0]">
          <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block mb-2">
            {language === "ar" ? "الصفحات الرئيسية" : "Main Navigation"}
          </span>
          {SECONDARY_NAV_ITEMS.map((item) => {
            const isBrands = item.id === "brands";
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                  isBrands
                    ? "bg-bht-red text-white hover:bg-bht-red-hover shadow-xs"
                    : "text-bht-charcoal hover:bg-bht-offwhite"
                }`}
              >
                <span>{language === "ar" ? item.nameAr : item.nameEn}</span>
                <ArrowIcon
                  className={`w-3.5 h-3.5 ${
                    isBrands ? "text-white" : "text-[#AAAAAA]"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Footer info & Language switcher */}
        <div className="p-4 mt-auto bg-[#FBFBFB] flex items-center justify-between">
          <span className="text-xs text-[#666666]">
            {language === "ar" ? "اللغة:" : "Language:"}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};
