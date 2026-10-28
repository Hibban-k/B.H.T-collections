"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Users, Globe, Award } from "lucide-react";

interface HeroCardItem {
  id: string;
  subtitleEn: string;
  subtitleAr: string;
  titleEn: string;
  titleAr: string;
  image: string;
  href: string;
  desktopHeight: string;
  desktopTranslate: string;
}

const ABOUT_HERO_CARDS: HeroCardItem[] = [
  {
    id: "flagship",
    subtitleEn: "Deira Commercial District",
    subtitleAr: "منطقة ديرة التجارية",
    titleEn: "Dubai Flagship Experience",
    titleAr: "تجربة معرض دبي الرئيسي",
    image: "/contact/dubai-flagship.jpg",
    href: "/contact",
    desktopHeight: "lg:h-[410px]",
    desktopTranslate: "lg:translate-y-4",
  },
  {
    id: "bedding",
    subtitleEn: "Damas Gold & Royalon",
    subtitleAr: "داماس جولد ورويالون",
    titleEn: "Luxury Bedding & Quilts",
    titleAr: "المفروشات الفاخرة واللحف",
    image: "/contact/card-bedding.jpg",
    href: "/collections/bedding",
    desktopHeight: "lg:h-[360px]",
    desktopTranslate: "lg:translate-y-16",
  },
  {
    id: "travel",
    subtitleEn: "Infinity & TravelGo Series",
    subtitleAr: "سلسلة إنفينيتي وترافيل جو",
    titleEn: "Travel Luggage & Bags",
    titleAr: "حقائب السفر ومستلزمات الرحلات",
    image: "/navigation/nav-travel.jpg",
    href: "/collections/travel-bags",
    desktopHeight: "lg:h-[450px]",
    desktopTranslate: "lg:-translate-y-6",
  },
  {
    id: "footwear",
    subtitleEn: "MagicWalk Ergonomics",
    subtitleAr: "ماجيك ووك الطبية",
    titleEn: "Comfort Everyday Footwear",
    titleAr: "أحذية الراحة اليومية",
    image: "/contact/card-footwear.jpg",
    href: "/collections/footwear",
    desktopHeight: "lg:h-[360px]",
    desktopTranslate: "lg:translate-y-16",
  },
];

export const AboutHeroSection: React.FC = () => {
  const { language } = useLanguage();

  const renderCard = (card: HeroCardItem, isMobile: boolean = false) => {
    const subtitle = language === "ar" ? card.subtitleAr : card.subtitleEn;
    const title = language === "ar" ? card.titleAr : card.titleEn;

    return (
      <Link
        key={card.id}
        href={card.href}
        className={`group block relative w-full ${
          isMobile
            ? "h-[235px] sm:h-[270px] rounded-2xl"
            : `${card.desktopHeight} ${card.desktopTranslate} rounded-[28px]`
        } overflow-hidden border-2 border-white shadow-xl shadow-black/15 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]`}
      >
        {/* Background Photography */}
        <Image
          src={card.image}
          alt={title}
          fill
          priority
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Dark Vignette / Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* Content Overlay at Bottom */}
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-start z-10">
          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FFC837] mb-0.5 truncate drop-shadow-xs">
            {subtitle}
          </span>
          <h3 className="text-white font-bold text-xs sm:text-sm lg:text-base leading-snug truncate drop-shadow-md">
            {title}
          </h3>
        </div>
      </Link>
    );
  };

  return (
    <section className="w-full bg-white select-none overflow-hidden" aria-label="About Us Hero">
      {/* ============================================================ */}
      {/* 1. VIBRANT RED HERO BANNER (TOP)                            */}
      {/* ============================================================ */}
      <div className="relative w-full bg-[#E52B25] text-white pt-12 sm:pt-18 lg:pt-24 pb-36 sm:pb-44 lg:pb-52 overflow-visible">
        {/* Subtle decorative background watermarks */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title with Playful Sparkle Star Accent */}
          <div className="relative inline-block mb-3 sm:mb-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xs">
              {language === "ar" ? "من نحن" : "About us"}
            </h1>

            {/* Sparkle star icon matching reference */}
            <div
              className="absolute -top-2 sm:-top-3 -end-7 sm:-end-9 pointer-events-none text-white/90"
              aria-hidden="true"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
                <circle cx="19" cy="5" r="1.2" fill="currentColor" stroke="none" />
                <circle cx="5" cy="19" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </div>

          {/* Subtitle brand statement */}
          <p className="text-white/95 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-2xl sm:max-w-3xl mx-auto px-2">
            {language === "ar"
              ? "انطلاقاً من إرث عريق يمتد لعقود في دبي، تقدم شركة بيت البطانيات للتجارة ذ.م.م تشكيلات راقية من مفروشات السرير الفاخرة، وحقائب السفر المتينة، والأحذية المريحة لكافة أرجاء الإمارات والخليج."
              : "Founded on decades of heritage in Dubai, Blanket House Trading LLC (BHT Collections) delivers curated luxury bedding, premium travel luggage, and everyday comfort footwear across the UAE and GCC."}
          </p>
        </div>

        {/* Bottom subtle organic curved wave transitioning into white */}
        <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="relative block w-full h-[28px] sm:h-[40px] lg:h-[55px] text-white fill-current"
          >
            <path d="M0,0 C480,45 960,45 1440,0 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. OVERLAPPING STAGGERED CARDS ROW (MIDDLE)                  */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 -mt-28 sm:-mt-36 lg:-mt-44 relative z-10">
        {/* MOBILE & TABLET VIEW: 2-Column Staggered Masonry (Matching Screenshot) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden items-start">
          {/* Column 1: Card 1 (Flagship) & Card 3 (Travel Bags) */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {renderCard(ABOUT_HERO_CARDS[0], true)}
            {renderCard(ABOUT_HERO_CARDS[2], true)}
          </div>

          {/* Column 2: Card 2 (Bedding) & Card 4 (Footwear) - Offset Downwards */}
          <div className="flex flex-col gap-3 sm:gap-4 pt-12 sm:pt-16">
            {renderCard(ABOUT_HERO_CARDS[1], true)}
            {renderCard(ABOUT_HERO_CARDS[3], true)}
          </div>
        </div>

        {/* DESKTOP VIEW: 4 Columns Staggered in Single Row */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-start">
          {ABOUT_HERO_CARDS.map((card) => renderCard(card, false))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. CREDIBILITY PILLARS & SPACING (BOTTOM)                    */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-18 lg:pt-24 pb-14 sm:pb-18">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-neutral-100">
          {/* Pillar 1 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <ShieldCheck className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "علامة إماراتية معتمدة" : "UAE Certified Brand"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar"
                ? "بيت البطانيات للتجارة ذ.م.م مرخصة رسمياً"
                : "Blanket House Trading LLC official license"}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <Users className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "+100 ألف عائلة" : "100K+ Families"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar"
                ? "ثقة متوارثة في منازل وفنادق الإمارات"
                : "Trusted across UAE homes and luxury hotels"}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <Globe className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "6 دول خليجية" : "6 GCC Nations"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar"
                ? "الإمارات، السعودية، قطر، الكويت، البحرين، عمان"
                : "UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman"}
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <Award className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "توزيع حصري مباشر" : "Direct Distribution"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar"
                ? "موزعون رسميون لكبرى الماركات العالمية"
                : "Certified distributor for international labels"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
