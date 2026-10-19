"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BreadcrumbItem {
  labelEn: string;
  labelAr: string;
  href?: string;
  active?: boolean;
}

interface CollectionBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const CollectionBreadcrumbs: React.FC<CollectionBreadcrumbsProps> = ({
  items,
}) => {
  const { language, isRTL } = useLanguage();
  const Separator = isRTL ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-white border-b border-[#F0F0F0] py-3 select-none"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs text-gray-500 font-medium">
          {/* Home Link */}
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-bht-red transition-colors"
            >
              <Home className="w-3.5 h-3.5 stroke-[2]" />
              <span>{language === "ar" ? "الرئيسية" : "Home"}</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
                <Separator className="w-3 h-3 text-gray-300 stroke-[2] shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-bht-red transition-colors truncate max-w-[160px] sm:max-w-none"
                  >
                    {language === "ar" ? item.labelAr : item.labelEn}
                  </Link>
                ) : (
                  <span
                    className="font-bold text-bht-charcoal truncate max-w-[200px] sm:max-w-none"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {language === "ar" ? item.labelAr : item.labelEn}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
