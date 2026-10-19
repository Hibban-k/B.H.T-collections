"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Bed, Luggage, Footprints } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryCardItem {
  id: "footwear" | "bedding" | "travel-bags";
  nameEn: string;
  nameAr: string;
  labelEn: string;
  labelAr: string;
  image: string;
  href: string;
  icon: "footprints" | "bed" | "luggage";
  accentColor: string;
}

const CATEGORY_CARD_ITEMS: CategoryCardItem[] = [
  {
    id: "footwear",
    nameEn: "Footwear",
    nameAr: "الأحذية الفاخرة",
    labelEn: "Explore Footwear",
    labelAr: "استكشف الأحذية",
    image: "/contact/card-footwear.jpg",
    href: "/collections/footwear",
    icon: "footprints",
    accentColor: "#26964B",
  },
  {
    id: "bedding",
    nameEn: "Bedding",
    nameAr: "المفروشات واللحف",
    labelEn: "Explore Bedding",
    labelAr: "استكشف المفروشات",
    image: "/contact/card-bedding.jpg",
    href: "/collections/bedding",
    icon: "bed",
    accentColor: "#E52B25",
  },
  {
    id: "travel-bags",
    nameEn: "Travel Bags",
    nameAr: "حقائب السفر",
    labelEn: "Explore Travel Bags",
    labelAr: "استكشف حقائب السفر",
    image: "/navigation/nav-travel.jpg",
    href: "/collections/travel-bags",
    icon: "luggage",
    accentColor: "#258CCB",
  },
];

export const ContactHero: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentCategory = CATEGORY_CARD_ITEMS[activeCategoryIndex];

  // Auto-cycle categories every 4.5s unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveCategoryIndex((prev) => (prev + 1) % CATEGORY_CARD_ITEMS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollToContactForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="w-full bg-white py-4 sm:py-6 lg:py-8 select-none"
      aria-label="Contact Us Hero Showcase"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO BANNER CONTAINER WITH WARM STUDIO LIFESTYLE BACKDROP */}
        <div className="relative w-full min-h-[500px] sm:min-h-[540px] md:min-h-[600px] lg:min-h-[640px] rounded-3xl sm:rounded-4xl overflow-hidden shadow-xl bg-[#C8A882] flex items-center">
          {/* Top-Left Signature Rounded Cutout Accent (Matching Reference Design) */}
          <div
            className="absolute top-0 start-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white rounded-ee-3xl sm:rounded-ee-4xl z-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Full-Bleed Lifestyle Editorial Photography Background */}
          <Image
            src="/contact/contact-hero-lifestyle.jpg"
            alt="BHT Collections Luxury Lifestyle Footwear and Fashion"
            fill
            priority
            className="object-cover object-[center_65%] sm:object-center transition-transform duration-1000 ease-out"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />

          {/* Dark / Warm Vignette Gradient Overlay for Maximum Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-black/70 via-black/35 to-black/15 pointer-events-none" />

          {/* INNER CONTENT GRID */}
          <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-12 sm:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
            {/* LEFT: BOLD HEADLINE & PILL ACTION BUTTONS (MATCHING REFERENCE) */}
            <div className="max-w-xl text-white">
              <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-white/85 mb-3 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                {language === "ar" ? "بيت البطانيات للتجارة ذ.م.م" : "BLANKET HOUSE TRADING LLC"}
              </span>

              {/* Bold 3-line Stacked Headline matching reference */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-md">
                {language === "ar" ? (
                  <>
                    تواصل <br />
                    مع نخبة <br />
                    <span className="text-white/95">تشكيلاتنا</span>
                  </>
                ) : (
                  <>
                    Explore <br />
                    Premium <br />
                    <span className="text-white/95">Collections</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium max-w-md mb-8 drop-shadow-xs">
                {language === "ar"
                  ? "يسعدنا دائماً تواصلكم معنا للاستفسارات، التوزيع، وزيارة معرضنا الرئيسي في دبي."
                  : "We're here to assist you. Contact our Dubai headquarters or explore certified collections across the UAE & GCC."}
              </p>

              {/* TWO PILL BUTTONS (Matching Reference: Solid White + Frosted Glass) */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {/* 1. White Solid Pill Button */}
                <button
                  type="button"
                  onClick={scrollToContactForm}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white text-neutral-900 text-xs sm:text-sm font-bold shadow-lg hover:bg-neutral-100 hover:scale-103 active:scale-98 transition-all duration-200 cursor-pointer"
                >
                  <span>{language === "ar" ? "تواصل معنا" : "Contact Now"}</span>
                  <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* 2. Frosted Glass Translucent Pill Button */}
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/30 shadow-md hover:scale-103 active:scale-98 transition-all duration-200"
                >
                  <span>{language === "ar" ? "جميع الأقسام" : "Categories"}</span>
                  <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* RIGHT: FLOATING 3-CATEGORY CONTAINER (MATCHING REFERENCE DESIGN) */}
            <div
              className="self-center lg:self-auto shrink-0 w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[340px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-3 sm:p-4 border border-white/80 transition-all duration-300 hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
                {/* Category Selector Tabs inside Container */}
                <div className="flex items-center justify-between gap-1 p-1 bg-[#F5F5F5] rounded-xl mb-3 border border-neutral-200/60">
                  {CATEGORY_CARD_ITEMS.map((item, idx) => {
                    const isActive = idx === activeCategoryIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveCategoryIndex(idx)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] xs:text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer ${
                          isActive
                            ? "bg-white text-neutral-900 shadow-xs font-extrabold"
                            : "text-neutral-500 hover:text-neutral-900 hover:bg-white/60"
                        }`}
                      >
                        {item.icon === "footprints" && <Footprints className="w-3 h-3" />}
                        {item.icon === "bed" && <Bed className="w-3 h-3" />}
                        {item.icon === "luggage" && <Luggage className="w-3 h-3" />}
                        <span className="truncate">
                          {language === "ar" ? item.nameAr : item.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Floating Category Product Image Area */}
                <Link
                  href={currentCategory.href}
                  className="group block relative w-full h-[220px] xs:h-[240px] sm:h-[270px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#ECE8E3] border border-neutral-100"
                >
                  <Image
                    src={currentCategory.image}
                    alt={language === "ar" ? currentCategory.nameAr : currentCategory.nameEn}
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                    sizes="340px"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </Link>

                {/* Card Bottom Link (Matching "Explore New Arrivals ->" in Reference) */}
                <div className="pt-3 px-1 flex items-center justify-between">
                  <Link
                    href={currentCategory.href}
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-neutral-900 hover:text-bht-red transition-colors"
                  >
                    <span>
                      {language === "ar"
                        ? currentCategory.labelAr
                        : currentCategory.labelEn}
                    </span>
                    <ArrowIcon className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5">
                    {CATEGORY_CARD_ITEMS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveCategoryIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeCategoryIndex
                            ? "w-4 bg-neutral-900"
                            : "w-1.5 bg-neutral-300 hover:bg-neutral-500"
                        }`}
                        aria-label={`Category slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
