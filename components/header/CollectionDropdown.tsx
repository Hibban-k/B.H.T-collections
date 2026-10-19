"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Bed, Luggage, Footprints } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CollectionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface DropdownCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  href: string;
  iconBg: string;
  linkColor: string;
  icon: "bed" | "luggage" | "footprints";
  lifestyleImage: string;
  imageAlt: string;
  subcategories: {
    id: string;
    nameEn: string;
    nameAr: string;
    href: string;
  }[];
  viewAllTextEn: string;
  viewAllTextAr: string;
}

const DROPDOWN_CATEGORIES: DropdownCategory[] = [
  {
    id: "bedding",
    nameEn: "Bedding",
    nameAr: "المفروشات",
    href: "/collections/bedding",
    iconBg: "bg-[#E52B25]",
    linkColor: "text-[#E52B25]",
    icon: "bed",
    lifestyleImage: "/navigation/nav-bedding.jpg",
    imageAlt: "Luxury Bedding Collection",
    subcategories: [
      { id: "bed-sheets", nameEn: "Bed Sheets", nameAr: "ملاءات السرير", href: "/collections/bed-sheets" },
      { id: "duvet-covers", nameEn: "Duvet Covers", nameAr: "أغطية اللحاف", href: "/collections/duvet-covers" },
      { id: "pillows", nameEn: "Pillows", nameAr: "الوسائد", href: "/collections/pillows" },
      { id: "comforters", nameEn: "Comforters", nameAr: "الألحفة الفاخرة", href: "/collections/comforters" },
      { id: "blankets", nameEn: "Blankets", nameAr: "البطانيات", href: "/collections/blankets" },
      { id: "towels", nameEn: "Towels", nameAr: "المناشف", href: "/collections/towels" },
    ],
    viewAllTextEn: "View All Bedding",
    viewAllTextAr: "عرض كل المفروشات",
  },
  {
    id: "travel-bags",
    nameEn: "Travel Bags",
    nameAr: "حقائب السفر",
    href: "/collections/travel-bags",
    iconBg: "bg-[#258CCB]",
    linkColor: "text-[#258CCB]",
    icon: "luggage",
    lifestyleImage: "/navigation/nav-travel.jpg",
    imageAlt: "Travel Bags & Luggage Collection",
    subcategories: [
      { id: "trolleys", nameEn: "Trolleys & Suitcases", nameAr: "حقائب السفر والترولي", href: "/collections/trolleys" },
      { id: "travel-bags", nameEn: "Travel Bags", nameAr: "حقائب الرحلات", href: "/collections/travel-bags" },
      { id: "backpacks", nameEn: "Backpacks", nameAr: "حقائب الظهر", href: "/collections/backpacks" },
      { id: "accessories", nameEn: "Travel Accessories", nameAr: "إكسسوارات السفر", href: "/collections/travel-accessories" },
      { id: "luggage-sets", nameEn: "Luggage Sets", nameAr: "أطقم الحقائب الكاملة", href: "/collections/luggage-sets" },
    ],
    viewAllTextEn: "View All Travel Bags",
    viewAllTextAr: "عرض كل حقائب السفر",
  },
  {
    id: "footwear",
    nameEn: "Footwear",
    nameAr: "الأحذية",
    href: "/collections/footwear",
    iconBg: "bg-[#26964B]",
    linkColor: "text-[#26964B]",
    icon: "footprints",
    lifestyleImage: "/navigation/nav-footwear.jpg",
    imageAlt: "Footwear Collection",
    subcategories: [
      { id: "mens", nameEn: "Men's Footwear", nameAr: "أحذية رجالية", href: "/collections/mens-footwear" },
      { id: "womens", nameEn: "Women's Footwear", nameAr: "أحذية نسائية", href: "/collections/womens-footwear" },
      { id: "kids", nameEn: "Kids' Footwear", nameAr: "أحذية أطفال", href: "/collections/kids-footwear" },
      { id: "sports", nameEn: "Sports Shoes", nameAr: "أحذية رياضية", href: "/collections/sports-shoes" },
      { id: "casual", nameEn: "Casual Shoes", nameAr: "أحذية كاجوال", href: "/collections/casual-shoes" },
    ],
    viewAllTextEn: "View All Footwear",
    viewAllTextAr: "عرض كل الأحذية",
  },
];

export const CollectionDropdown: React.FC<CollectionDropdownProps> = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;

  const renderIcon = (type: "bed" | "luggage" | "footprints") => {
    switch (type) {
      case "bed":
        return <Bed className="w-5 h-5 stroke-[2.2]" />;
      case "luggage":
        return <Luggage className="w-5 h-5 stroke-[2.2]" />;
      case "footprints":
        return <Footprints className="w-5 h-5 stroke-[2.2]" />;
    }
  };

  return (
    <div
      role="region"
      aria-label="Collection Navigation Menu"
      id="collection-mega-menu-overlay"
      className={`absolute top-full left-0 right-0 w-full flex justify-center z-50 pt-2 pb-6 px-4 transition-all duration-200 ease-out ${
        isOpen
          ? "opacity-100 pointer-events-auto visible translate-y-0"
          : "opacity-0 pointer-events-none invisible -translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-[1240px] max-w-[96vw] bg-white rounded-3xl border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-neutral-200">
          {DROPDOWN_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="px-4 lg:px-7 py-3 md:py-1 flex flex-col justify-between"
            >
              <div>
                {/* Category Header with Circle Icon */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white shadow-xs ${category.iconBg}`}
                  >
                    {renderIcon(category.icon)}
                  </div>
                  <Link
                    href={category.href}
                    onClick={onClose}
                    className="text-xl font-bold text-neutral-900 hover:text-neutral-700 transition-colors tracking-tight"
                  >
                    {language === "ar" ? category.nameAr : category.nameEn}
                  </Link>
                </div>

                {/* Subcategories Link List & Lifestyle Image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center min-h-[190px]">
                  {/* Subcategories Link List */}
                  <ul className="space-y-2">
                    {category.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={sub.href}
                          onClick={onClose}
                          className="group/link flex items-center justify-between text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors py-0.5"
                        >
                          <span>
                            {language === "ar" ? sub.nameAr : sub.nameEn}
                          </span>
                          <ArrowIcon className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-neutral-900 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Lifestyle Image Card */}
                  <Link
                    href={category.href}
                    onClick={onClose}
                    className="relative w-full h-[135px] lg:h-[145px] rounded-2xl overflow-hidden shadow-xs border border-neutral-100 group/img block bg-neutral-100"
                  >
                    <Image
                      src={category.lifestyleImage}
                      alt={category.imageAlt}
                      fill
                      className="object-cover group-hover/img:scale-106 transition-transform duration-500 ease-out"
                      sizes="220px"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover/img:bg-transparent transition-colors" />
                  </Link>
                </div>
              </div>

              {/* View All Category Link */}
              <div className="mt-6 pt-3">
                <Link
                  href={category.href}
                  onClick={onClose}
                  className={`inline-flex items-center gap-1.5 text-sm font-bold ${category.linkColor} hover:opacity-85 transition-opacity group/viewall`}
                >
                  <span>
                    {language === "ar"
                      ? category.viewAllTextAr
                      : category.viewAllTextEn}
                  </span>
                  <ArrowIcon className="w-4 h-4 stroke-[2.5] group-viewall:translate-x-0.5 rtl:group-viewall:-translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
