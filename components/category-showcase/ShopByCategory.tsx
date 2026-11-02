"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/components/common/useReducedMotion";

export interface BrandSlide {
  name: string;
  slug: string;
  logo: string;
  banner: string;
}

export interface CategoryWithSlidingBrands {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  href: string;
  subtitleEn: string;
  subtitleAr: string;
  brands: BrandSlide[];
}

// Fallback categories used ONLY if database is empty/unreachable
export const DEFAULT_CATEGORIES: CategoryWithSlidingBrands[] = [
  {
    id: "bedding",
    slug: "bedding",
    nameEn: "BEDDING",
    nameAr: "المفروشات",
    href: "/collections/bedding",
    subtitleEn: "Hanaa • Damas Gold • Royalon",
    subtitleAr: "هناء • داماس جولد • رويالون",
    brands: [
      {
        name: "ROYALON",
        slug: "royalon",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792213225/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792213225275.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792213227/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792213227623.jpg",
      },
      {
        name: "DAMAS GOLD",
        slug: "damas-gold",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792213459/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792213459140.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792213462/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792213462442.jpg",
      },
      {
        name: "HANA",
        slug: "hana",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792213648/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792213648290.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792213651/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792213651461.jpg",
      },
    ],
  },
  {
    id: "travel-bags",
    slug: "travel-bags",
    nameEn: "TRAVEL BAGS",
    nameAr: "حقائب السفر",
    href: "/collections/travel-bags",
    subtitleEn: "Infinity Paris • TravelGo",
    subtitleAr: "إنفينيتي باريس • ترافل جو",
    brands: [
      {
        name: "INFINITY PARIS",
        slug: "infinity-paris",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792213839/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792213839931.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792213860/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792213860411.jpg",
      },
      {
        name: "TRAVEL GO",
        slug: "travel-go",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792214055/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792214055034.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792214058/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792214058226.jpg",
      },
    ],
  },
  {
    id: "footwear",
    slug: "footwear",
    nameEn: "FOOTWEAR",
    nameAr: "الأحذية",
    href: "/collections/footwear",
    subtitleEn: "MagicWalk • Adda",
    subtitleAr: "ماجيك ووك • أدا",
    brands: [
      {
        name: "MAGIC WALK",
        slug: "magic-walk",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792214289/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792214289162.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792214293/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792214293893.jpg",
      },
      {
        name: "ADDA",
        slug: "adda",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792214511/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792214511513.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792484589/bht-collections/brands/banners/images_1792484588998.jpg",
      },
    ],
  },
];

// Helper to construct categories with brands directly from DB (used for SSR)
export function buildShowcaseCategories(
  dbCategories: any[],
  dbBrands: any[]
): CategoryWithSlidingBrands[] {
  if (!dbCategories || dbCategories.length === 0) {
    return DEFAULT_CATEGORIES;
  }

  const topCategories = dbCategories.filter((cat) => !cat.parentId && !cat.parentSlug);
  const activeBrands = (dbBrands || []).filter((b) => b.isActive !== false);

  const mapped = topCategories.map((cat) => {
    const normCatSlug = (cat.slug || "").toLowerCase();
    const catNameLower = (cat.name || "").toLowerCase();

    const matchedBrands = activeBrands.filter((b) => {
      const bSlug = (b.categorySlug || "").toLowerCase();
      const bCat = (b.category || "").toLowerCase();
      const bCatId = b.categoryId ? String(b.categoryId) : "";
      const catId = cat._id ? String(cat._id) : "";

      return (
        (catId && bCatId === catId) ||
        bSlug === normCatSlug ||
        bCat === catNameLower ||
        (normCatSlug === "travel-bags" && (bSlug === "travelling" || bCat === "travel bags" || bSlug === "travel-bags")) ||
        (normCatSlug === "bedding" && (bSlug === "bedding" || bCat === "bedding" || bSlug === "blankets")) ||
        (normCatSlug === "footwear" && (bSlug === "footwear" || bCat === "footwear"))
      );
    });

    const fallbackMatch = DEFAULT_CATEGORIES.find(
      (def) => def.slug === normCatSlug
    );

    const brandSlides: BrandSlide[] =
      matchedBrands.length > 0
        ? matchedBrands.map((b) => ({
            name: b.name,
            slug: b.slug || b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            logo: b.logo || "",
            banner: b.image || fallbackMatch?.brands[0]?.banner || "/collections/bht-collection-banner.png",
          }))
        : fallbackMatch?.brands || [];

    const subtitleEn =
      brandSlides.length > 0
        ? brandSlides.map((b) => b.name).join(" • ")
        : fallbackMatch?.subtitleEn || "Exclusive Collections";

    return {
      id: cat._id ? String(cat._id) : cat.slug,
      slug: normCatSlug,
      nameEn: cat.name.toUpperCase(),
      nameAr: fallbackMatch?.nameAr || cat.name,
      href: `/collections/${normCatSlug}`,
      subtitleEn,
      subtitleAr: fallbackMatch?.subtitleAr || subtitleEn,
      brands: brandSlides,
    };
  });

  return mapped.length > 0 ? mapped : DEFAULT_CATEGORIES;
}

// Single Category Card Component with Sliding DB Brands
const CategorySlidingCard: React.FC<{
  category: CategoryWithSlidingBrands;
  language: string;
  isRTL: boolean;
}> = ({ category, language, isRTL }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const brands = category.brands || [];
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (brands.length <= 1 || reducedMotion || isHovered || isFocused) return;
    const timer = setInterval(() => {
      if (!document.hidden) setCurrentSlide((prev) => (prev + 1) % brands.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [brands.length, reducedMotion, isHovered, isFocused]);

  return (
    <Link
      href={category.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
      className="group relative block h-[180px] xs:h-[210px] sm:h-[280px] md:h-[360px] lg:h-[440px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 active:scale-[0.98] select-none"
    >
      {/* 1. SLIDING BANNER IMAGES FROM DATABASE */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        {brands.map((brand, idx) => {
          const isActive = idx === currentSlide;
          const bannerUrl = brand.banner || "/collections/bht-collection-banner.png";

          return (
            <div
              key={`${brand.name}-${idx}-banner`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={bannerUrl}
                alt={`${category.nameEn} - ${brand.name} Banner`}
                fill
                priority={idx === 0}
                className={`object-cover object-center transition-transform duration-1000 ease-out ${
                  isActive ? "scale-100 group-hover:scale-106" : "scale-105"
                }`}
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 550px"
              />
            </div>
          );
        })}

        {/* 2. REFINED GRADIENT VIGNETTE OVERLAY */}
        <div className="absolute inset-0 z-2 bg-gradient-to-t from-black/90 via-black/40 to-black/25 group-hover:from-black/80 transition-all duration-500" />
      </div>

      {/* 3. SLIDE PROGRESS INDICATOR PILLS (Top Right) */}
      {brands.length > 1 && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex items-center gap-1 sm:gap-1.5">
          {brands.map((b, idx) => (
            <button
              key={`${b.name}-${idx}-dot`}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "w-3 sm:w-5 bg-white shadow-xs"
                  : "w-1 sm:w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide to ${b.name}`}
            />
          ))}
        </div>
      )}

      {/* 4. CENTER: FLOATING BRAND LOGO DIRECT FROM DATABASE (FULL COLOR, TRANSPARENT BG) */}
      <div className="absolute inset-x-0 top-3 sm:top-0 sm:inset-0 z-10 flex flex-col items-center justify-start sm:justify-center p-2 sm:p-4 md:p-6 text-center pointer-events-none">
        {brands.map((brand, idx) => {
          const isActive = idx === currentSlide;
          const logoUrl = brand.logo;

          if (!logoUrl) return null;

          return (
            <div
              key={`${brand.name}-${idx}-logo`}
              className={`absolute transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="relative w-20 xs:w-28 sm:w-40 md:w-52 lg:w-60 h-10 xs:h-14 sm:h-18 md:h-24 lg:h-28 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] flex items-center justify-center">
                <Image
                  src={logoUrl}
                  alt={`${brand.name} Logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 200px, 260px"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. BOTTOM: CATEGORY TITLE, BRANDS SUBTITLE & ARROW */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-2 sm:p-4 md:p-6 lg:p-8 flex items-end justify-between gap-1">
        <div className="min-w-0 w-full sm:w-auto text-center sm:text-start">
          <h3 className="text-[11px] xs:text-xs sm:text-base md:text-xl lg:text-2xl font-black text-white tracking-tight sm:tracking-wider uppercase drop-shadow-md leading-tight">
            {language === "ar" ? category.nameAr : category.nameEn}
          </h3>
          {category.subtitleEn && (
            <p className="hidden sm:block text-xs md:text-sm text-gray-200 font-medium drop-shadow-sm mt-0.5 truncate">
              {language === "ar" ? category.subtitleAr : category.subtitleEn}
            </p>
          )}
        </div>

        {/* Circular Action Arrow Button */}
        <div className="hidden sm:flex w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 group-hover:bg-bht-red text-white backdrop-blur-md items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110 shrink-0">
          <ArrowIcon className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
};

export interface ShopByCategoryProps {
  initialCategories?: CategoryWithSlidingBrands[];
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ initialCategories }) => {
  const { language, isRTL } = useLanguage();
  const [categories, setCategories] = useState<CategoryWithSlidingBrands[]>(
    initialCategories && initialCategories.length > 0 ? initialCategories : DEFAULT_CATEGORIES
  );

  // If initialCategories was not provided (fallback), fetch client-side
  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) return;

    let isMounted = true;
    const loadDbBrandsAndCategories = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          fetch("/api/store/categories?topOnly=true"),
          fetch("/api/store/brands"),
        ]);

        if (categoriesRes.ok && brandsRes.ok) {
          const catData = await categoriesRes.json();
          const brandData = await brandsRes.json();

          const dbCategories: any[] = catData.categories || [];
          const dbBrands: any[] = brandData.brands || [];

          if (dbCategories.length > 0 && dbBrands.length > 0 && isMounted) {
            const mapped = buildShowcaseCategories(dbCategories, dbBrands);
            setCategories(mapped);
          }
        }
      } catch (err) {
        console.error("ShopByCategory: failed to load DB brands", err);
      }
    };

    loadDbBrandsAndCategories();

    return () => {
      isMounted = false;
    };
  }, [initialCategories]);

  return (
    <section
      className="w-full bg-white py-5 sm:py-10 md:py-16 lg:py-20"
      aria-label="Shop by Category & Brands"
    >
      <div className="max-w-[1760px] mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* 3 COLUMNS IN A SINGLE HORIZONTAL ROW ACROSS ALL SCREENS (MOBILE INCLUDED) */}
        <div data-reveal-group="stagger" className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategorySlidingCard
              key={category.id}
              category={category}
              language={language}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
