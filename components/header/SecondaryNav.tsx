"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  User,
  ShieldCheck,
  Mail,
  ChevronDown,
} from "lucide-react";
import { SECONDARY_NAV_ITEMS } from "@/data/navigationData";
import { useLanguage } from "@/context/LanguageContext";
import { CollectionDropdown } from "./CollectionDropdown";

export const SecondaryNav: React.FC = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsCollectionOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsCollectionOpen(false);
    }, 200);
  };

  const handleToggleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsCollectionOpen((prev) => !prev);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4 stroke-[1.8]" />;
      case "grid":
        return <LayoutGrid className="w-4 h-4 stroke-[1.8]" />;
      case "user":
        return <User className="w-4 h-4 stroke-[1.8]" />;
      case "shield":
        return <ShieldCheck className="w-4 h-4 stroke-[1.8]" />;
      case "mail":
        return <Mail className="w-4 h-4 stroke-[1.8]" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="hidden md:block w-full bg-[#171717] border-b border-[#2A2A2A] relative text-white"
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-center gap-7 lg:gap-11"
          aria-label="Secondary Navigation"
        >
          {SECONDARY_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            // SPECIAL CASE: Brand & Clients as a Red Parallelogram Box
            if (item.id === "brands") {
              return (
                <div
                  key={item.id}
                  className="relative py-2.5"
                  onMouseEnter={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="relative inline-flex items-center justify-center px-4 sm:px-5 py-1.5 group transition-transform duration-200 hover:scale-105"
                  >
                    {/* Red Parallelogram Background */}
                    <span
                      className="absolute inset-0 bg-bht-red group-hover:bg-bht-red-hover rounded-[3px] shadow-md transform -skew-x-12 rtl:skew-x-12 transition-all duration-200"
                      aria-hidden="true"
                    />

                    {/* Content inside (straight, crisp white text & icon) */}
                    <span className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-white tracking-wide drop-shadow-xs">
                      {getIcon(item.icon)}
                      <span>{language === "ar" ? item.nameAr : item.nameEn}</span>
                    </span>
                  </Link>
                </div>
              );
            }

            // Collection with Dropdown
            if (item.hasDropdown) {
              return (
                <div
                  key={item.id}
                  className="py-3.5 group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    id="secondary-nav-collection"
                    onClick={handleToggleClick}
                    className={`relative inline-flex items-center gap-2 text-sm font-medium transition-colors py-1 cursor-pointer ${
                      isActive || isCollectionOpen
                        ? "text-white font-semibold"
                        : "text-gray-300 hover:text-white"
                    }`}
                    aria-expanded={isCollectionOpen}
                  >
                    {getIcon(item.icon)}
                    <span>{language === "ar" ? item.nameAr : item.nameEn}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 ${
                        isCollectionOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>
                </div>
              );
            }

            // Regular items (Home, About Us, Contact Us)
            return (
              <div
                key={item.id}
                className="relative py-3.5"
                onMouseEnter={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`relative inline-flex items-center gap-2 text-sm font-medium transition-colors py-1 ${
                    isActive
                      ? "text-white font-bold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {getIcon(item.icon)}
                  <span>{language === "ar" ? item.nameAr : item.nameEn}</span>
                </Link>

                {/* Brand Red Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-bht-red rounded-full" />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Luxury Mega Dropdown matching user reference image */}
      <CollectionDropdown
        isOpen={isCollectionOpen}
        onClose={() => setIsCollectionOpen(false)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};
