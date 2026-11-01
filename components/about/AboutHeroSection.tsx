"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PageHeroIntro } from "@/components/hero/PageHeroIntro";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/components/common/useReducedMotion";

interface HeroPrincipleCardItem {
  id: string;
  tagEn: string;
  tagAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
  isUp: boolean; // Alternates UP / DOWN
}

const ABOUT_HERO_PRINCIPLES: HeroPrincipleCardItem[] = [
  {
    id: "integrity",
    tagEn: "Uncompromising Integrity",
    tagAr: "الأمانة والصدق في المعاملة",
    titleEn: "Founding Father's Core Virtue",
    titleAr: "نهج الوالد المؤسس الأصيل",
    descEn: "Honoring our founding father's core virtue: building lasting relationships based on honesty and transparent ethics.",
    descAr: "وفاءً لنهج الوالد المؤسس: بناء علاقات وثيقة ومستدامة تقوم على الصدق والنزاهة والشفافية التامة مع عملائنا.",
    image: "/about/principles-integrity.jpg",
    isUp: true,
  },
  {
    id: "craftsmanship",
    tagEn: "Generational Craftsmanship",
    tagAr: "إتقان الصنعة والبحث عن الجودة",
    titleEn: "Highest Quality Standards",
    titleAr: "انتقاء أجود الخامات والأقمشة",
    descEn: "Selecting only the highest quality fibers, resilient polycarbonate luggage, and comfortable soles tested to endure everyday life.",
    descAr: "انتقاء أجود خامات النسيج، وحقائب السفر فائقة المتانة، والأحذية المريحة المصممة لتدوم وتوفر أعلى درجات الراحة.",
    image: "/about/principles-craftsmanship.jpg",
    isUp: false,
  },
  {
    id: "hospitality",
    tagEn: "Family Warmth & Hospitality",
    tagAr: "الدفء العائلي وحسن الاستقبال",
    titleEn: "Every Customer is a Valued Guest",
    titleAr: "كل عميل فرد عزيز من العائلة",
    descEn: "Treating every customer who steps into our showrooms or orders online as a valued guest and extended family member.",
    descAr: "معاملة كل عميل يزور معارضنا أو يتواصل معنا كفرد عزيز من العائلة، وتقديم الدعم والاهتمام الصادق دائماً.",
    image: "/about/principles-hospitality.jpg",
    isUp: true,
  },
  {
    id: "heritage-vision",
    tagEn: "UAE Heritage & Modern Vision",
    tagAr: "فخر التراث الإماراتي ورؤية المستقبل",
    titleEn: "Deep Roots in Dubai & GCC",
    titleAr: "جذور راسخة في دبي وتوسع خليجي",
    descEn: "Proud of our deep roots in Dubai while continuously innovating with modern design to serve the dynamic lifestyle of the GCC.",
    descAr: "فخورون بجذورنا الراسخة في دبي، ومستمرون في الابتكار والتوسع لتلبية تطلعات أسلوب الحياة العصري في دول الخليج.",
    image: "/about/principles-heritage-vision.jpg",
    isUp: false,
  },
];

export const AboutHeroSection: React.FC = () => {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion = useReducedMotion();

  // Smooth scroll listener for opposite alignment animation
  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;

    const handleScroll = () => {
      if (window.scrollY < 1200) {
        setScrollY(window.scrollY);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  // Alignment progress: 0 at top -> 1 at 380px scroll
  // As user scrolls down, UP cards glide down and DOWN cards glide up into the SAME alignment!
  const alignProgress = Math.min(Math.max(scrollY / 380, 0), 1);

  // Desktop offsets: UP and DOWN cards converge to +16px
  const getDesktopTransform = (isUp: boolean) => {
    if (reducedMotion) return "none";
    if (isUp) {
      const offset = -16 + alignProgress * 32;
      return `translate3d(0, ${offset}px, 0)`;
    } else {
      const offset = 48 - alignProgress * 32;
      return `translate3d(0, ${offset}px, 0)`;
    }
  };

  // Mobile column offsets: Left and Right columns converge to +24px
  const mobileCol1Transform = reducedMotion ? "none" : `translate3d(0, ${alignProgress * 24}px, 0)`;
  const mobileCol2Transform = reducedMotion ? "none" : `translate3d(0, ${48 - alignProgress * 24}px, 0)`;

  const renderCard = (card: HeroPrincipleCardItem, isMobile: boolean = false) => {
    const tag = language === "ar" ? card.tagAr : card.tagEn;
    const title = language === "ar" ? card.titleAr : card.titleEn;
    const desc = language === "ar" ? card.descAr : card.descEn;

    return (
      <div
        key={card.id}
        style={!isMobile ? { transform: getDesktopTransform(card.isUp) } : undefined}
        className={`bht-photo-card group flex items-end relative w-full min-h-[320px] sm:min-h-[360px] lg:min-h-[420px] ${
          isMobile ? "rounded-2xl" : "rounded-[28px]"
        } overflow-hidden border-2 border-white shadow-xl shadow-black/15 will-change-transform transition-transform duration-300 ease-out hover:shadow-2xl hover:scale-[1.02]`}
      >
        {/* Background Photography - Exact same height across all 4 cards */}
        <Image
          src={card.image}
          alt={tag}
          fill
          priority
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Deep Vignette Gradient for High Contrast */}
        <div className="bht-photo-shade absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-transparent pointer-events-none" />

        {/* Content Overlay: 4 Principles Passed from Father to the Future */}
        <div className="relative pt-32 px-4 pb-5 sm:px-5 sm:pt-44 text-start z-10">
          {/* Principle Name / Amber Eyebrow */}
          <span className="block text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white/75 mb-1 drop-shadow-xs">
            {tag}
          </span>

          {/* Sub-Headline */}
          <h3 className="text-white font-bold text-xs sm:text-sm lg:text-base leading-snug drop-shadow-md mb-1.5 ">
            {title}
          </h3>

          {/* Detailed Narrative from Father to Future */}
          <p className="text-[11px] sm:text-xs text-white/85 leading-relaxed font-normal  transition-all duration-300 drop-shadow-xs">
            {desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-white select-none overflow-hidden" aria-label="About Us Hero">
      {/* ============================================================ */}
      {/* 1. LIGHT EDITORIAL HERO BANNER (TOP)                            */}
      {/* ============================================================ */}
      <PageHeroIntro overlappingCards
        title={language === "ar" ? "من نحن" : "About us"}
        description={language === "ar"
              ? "انطلاقاً من إرث عريق يمتد لعقود في دبي، تقدم شركة بيت البطانيات للتجارة ذ.م.م تشكيلات راقية من مفروشات السرير الفاخرة، وحقائب السفر المتينة، والأحذية المريحة لكافة أرجاء الإمارات والخليج."
              : "Founded on decades of heritage in Dubai, Blanket House Trading LLC (BHT Collections) delivers curated luxury bedding, premium travel luggage, and everyday comfort footwear across the UAE and GCC."}
      />

      {/* ============================================================ */}
      {/* 2. OVERLAPPING CARDS: 4 PRINCIPLES PASSED FROM FATHER        */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 -mt-28 sm:-mt-36 lg:-mt-44 relative z-10">
        {/* MOBILE & TABLET VIEW: Converges into same alignment on scroll */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden items-start">
          {/* Column 1: Card 1 (UP) & Card 3 (UP) - Glides DOWN on scroll */}
          <div
            style={{ transform: mobileCol1Transform }}
            className="flex flex-col gap-3 sm:gap-4 will-change-transform transition-transform duration-300 ease-out"
          >
            {renderCard(ABOUT_HERO_PRINCIPLES[0], true)}
            {renderCard(ABOUT_HERO_PRINCIPLES[2], true)}
          </div>

          {/* Column 2: Card 2 (DOWN) & Card 4 (DOWN) - Glides UP into same alignment on scroll */}
          <div
            style={{ transform: mobileCol2Transform }}
            className="flex flex-col gap-3 sm:gap-4 will-change-transform transition-transform duration-300 ease-out"
          >
            {renderCard(ABOUT_HERO_PRINCIPLES[1], true)}
            {renderCard(ABOUT_HERO_PRINCIPLES[3], true)}
          </div>
        </div>

        {/* DESKTOP VIEW: 4 Columns with Identical Photo Height - Converges into same alignment on scroll */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-start">
          {ABOUT_HERO_PRINCIPLES.map((card) => renderCard(card, false))}
        </div>
      </div>

      {/* Bottom padding to smoothly transition to next section */}
      <div className="w-full pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16" />
    </section>
  );
};
