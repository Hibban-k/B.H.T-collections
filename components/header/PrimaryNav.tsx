"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Menu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface PrimaryNavProps {
  onOpenMegaMenu?: (categoryId?: string) => void;
  onCloseMegaMenu?: () => void;
  isMegaMenuOpen?: boolean;
  activeMegaCategory?: string | null;
  onToggleMobileMenu: () => void;
}

export const PrimaryNav: React.FC<PrimaryNavProps> = ({
  onToggleMobileMenu,
}) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="w-full bg-white border-b border-[#F0F0F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
        {/* LEFT: Brand Logo & Bilingual Company Name */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-bht-red rounded-lg"
          >
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 shrink-0 transition-transform group-hover:scale-102">
              <Image
                src="/logo/logo.png"
                alt="Blanket House Trading LLC Logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 40px, 56px"
              />
            </div>
            <div className="flex flex-col text-start">
              <span className="text-[10px] xs:text-xs sm:text-sm font-bold text-bht-red leading-tight font-arabic truncate max-w-[125px] xs:max-w-[170px] sm:max-w-none">
                بيت البطانيات للتجارة ذ.م.م
              </span>
              <span className="text-[11px] xs:text-xs sm:text-sm font-extrabold tracking-tight text-bht-charcoal leading-tight truncate max-w-[125px] xs:max-w-[170px] sm:max-w-none">
                Blanket House Trading LLC
              </span>
            </div>
          </Link>
        </div>

        {/* MIDDLE / CENTER: Prominent Luxury Search Bar */}
        <div className="hidden sm:flex flex-1 max-w-xl lg:max-w-2xl mx-2 md:mx-6 items-center justify-center">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full relative group"
          >
            <Search className="w-4 h-4 text-neutral-400 group-focus-within:text-bht-charcoal absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "ar"
                  ? "ابحث عن المنتجات، المفروشات، حقائب السفر، الأحذية..."
                  : "Search products, bedding, travel luggage, footwear..."
              }
              className="w-full bg-[#F5F6F7] hover:bg-[#EFEFEF] focus:bg-white text-xs md:text-sm text-bht-charcoal rounded-full ps-11 pe-10 py-2.5 sm:py-3 border border-[#E2E4E8] focus:border-bht-charcoal focus:ring-2 focus:ring-black/5 focus:outline-none transition-all placeholder:text-neutral-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute end-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* RIGHT: High-End Language Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* New Luxury Language Switcher */}
          <LanguageSwitcher />

          {/* Mobile Menu Drawer Toggle */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="p-2 text-bht-charcoal hover:text-bht-red md:hidden rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* MOBILE ONLY SEARCH BAR (Visible below header on small mobile screens) */}
      <div className="sm:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="w-full relative">
          <Search className="w-4 h-4 text-neutral-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === "ar" ? "ابحث عن المنتجات..." : "Search products..."
            }
            className="w-full bg-[#F5F6F7] text-xs text-bht-charcoal rounded-full ps-10 pe-9 py-2 border border-[#E2E4E8] focus:border-bht-charcoal focus:outline-none placeholder:text-neutral-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-neutral-400 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
