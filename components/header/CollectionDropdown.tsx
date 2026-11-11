"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bed,
  Luggage,
  Footprints,
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CollectionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface DropdownCategory {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  href: string;
  iconBg: string;
  linkColor: string;
  icon: "bed" | "luggage" | "footprints" | "grid";
  lifestyleImage: string;
  imageAlt: string;
  subcategories: {
    id: string;
    slug: string;
    nameEn: string;
    nameAr: string;
    href: string;
  }[];
  viewAllTextEn: string;
  viewAllTextAr: string;
}

export const CollectionDropdown: React.FC<CollectionDropdownProps> = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ChevronLeft : ChevronRight;
  const [categories, setCategories] = useState<DropdownCategory[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const res = await fetch("/api/store/categories");
        if (res.ok) {
          const data = await res.json();
          const allCats: any[] = data.categories || [];

          const topCats = allCats.filter((c) => !c.parentId && !c.parentSlug);
          const mapped: DropdownCategory[] = topCats.map((cat) => {
            const catId = String(cat._id);
            const normSlug = (cat.slug || "").toLowerCase();

            const subs = allCats
              .filter((c) => {
                const pId = c.parentId ? String(c.parentId) : "";
                const pSlug = (c.parentSlug || "").toLowerCase();
                return (pId && pId === catId) || (pSlug && pSlug === normSlug);
              })
              .map((s) => ({
                id: s._id || s.slug,
                slug: s.slug,
                nameEn: s.name,
                nameAr: s.name,
                href: `/${normSlug}?subcategory=${s.slug}`,
              }));

            let icon: "bed" | "luggage" | "footprints" | "grid" = "grid";
            let iconBg = "bg-neutral-800";
            let linkColor = "text-neutral-800";

            if (normSlug.includes("bed") || normSlug.includes("blanket")) {
              icon = "bed";
              iconBg = "bg-[#E52B25]";
              linkColor = "text-[#E52B25]";
            } else if (normSlug.includes("travel") || normSlug.includes("bag") || normSlug.includes("trolly")) {
              icon = "luggage";
              iconBg = "bg-[#258CCB]";
              linkColor = "text-[#258CCB]";
            } else if (normSlug.includes("foot") || normSlug.includes("shoe")) {
              icon = "footprints";
              iconBg = "bg-[#26964B]";
              linkColor = "text-[#26964B]";
            }

            return {
              id: catId,
              slug: normSlug,
              nameEn: cat.name,
              nameAr: cat.name,
              href: `/${normSlug}`,
              iconBg,
              linkColor,
              icon,
              lifestyleImage: cat.image || "/collections/bht-collection-banner.png",
              imageAlt: `${cat.name} Collection`,
              subcategories: subs,
              viewAllTextEn: `View All ${cat.name}`,
              viewAllTextAr: `عرض كل ${cat.name}`,
            };
          });

          if (isMounted) {
            setCategories(mapped);
          }
        }
      } catch (e) {
        console.error("Failed to load dropdown categories:", e);
      }
    };

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const renderIcon = (type: "bed" | "luggage" | "footprints" | "grid") => {
    switch (type) {
      case "bed":
        return <Bed className="w-5 h-5 stroke-[2.2]" />;
      case "luggage":
        return <Luggage className="w-5 h-5 stroke-[2.2]" />;
      case "footprints":
        return <Footprints className="w-5 h-5 stroke-[2.2]" />;
      default:
        return <LayoutGrid className="w-5 h-5 stroke-[2.2]" />;
    }
  };

  if (categories.length === 0) {
    return null;
  }

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
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(categories.length, 3)} divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-neutral-200`}>
          {categories.map((category) => (
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
                    className="text-xl font-bold text-neutral-900 hover:text-neutral-700 transition-colors tracking-tight capitalize"
                  >
                    {language === "ar" ? category.nameAr : category.nameEn}
                  </Link>
                </div>

                {/* Subcategories Link List & Lifestyle Image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center min-h-[190px]">
                  {/* Subcategories Link List */}
                  <ul className="space-y-2">
                    {category.subcategories.length > 0 ? (
                      category.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.href}
                            onClick={onClose}
                            className="group/link flex items-center justify-between text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors py-0.5 capitalize"
                          >
                            <span>
                              {language === "ar" ? sub.nameAr : sub.nameEn}
                            </span>
                            <ArrowIcon className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-neutral-900 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5 transition-all" />
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-neutral-400 italic">
                        {language === "ar" ? "لا توجد أقسام فرعية" : "No subcategories"}
                      </li>
                    )}
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
                  className={`inline-flex items-center gap-1.5 text-sm font-bold ${category.linkColor} hover:opacity-85 transition-opacity group/viewall capitalize`}
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
