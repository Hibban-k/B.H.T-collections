"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneCall, MapPin, Clock, Mail } from "lucide-react";

interface ContactHeroCardItem {
  id: string;
  subtitleEn: string;
  subtitleAr: string;
  titleEn: string;
  titleAr: string;
  image: string;
  targetId?: string;
  href?: string;
  isUp: boolean; // Alternates UP / DOWN
}

const CONTACT_HERO_CARDS: ContactHeroCardItem[] = [
  {
    id: "showroom",
    subtitleEn: "Deira Commercial District",
    subtitleAr: "منطقة ديرة، دبي",
    titleEn: "Visit Flagship Showroom",
    titleAr: "زيارة صالة العرض الرئيسية",
    image: "/contact/dubai-flagship.jpg",
    targetId: "store-location",
    isUp: true,
  },
  {
    id: "concierge",
    subtitleEn: "7 Days Direct Support",
    subtitleAr: "دعم مباشر طوال الأسبوع",
    titleEn: "Instant Concierge & Chat",
    titleAr: "المحادثة الفورية والكونسيرج",
    image: "/contact/contact-hero-lifestyle.jpg",
    targetId: "contact-form-section",
    isUp: false,
  },
  {
    id: "wholesale",
    subtitleEn: "UAE & GCC Distribution",
    subtitleAr: "التوزيع في الإمارات والخليج",
    titleEn: "Wholesale & B2B Orders",
    titleAr: "طلبات الجملة والمشاريع",
    image: "/contact/dubai-regional.jpg",
    targetId: "contact-form-section",
    isUp: true,
  },
  {
    id: "message",
    subtitleEn: "Fast Direct Reply",
    subtitleAr: "رد سريع ومباشر",
    titleEn: "Send Direct Inquiry",
    titleAr: "إرسال استفسار مباشر",
    image: "/contact/dubai-store-map.jpg",
    targetId: "contact-form-section",
    isUp: false,
  },
];

export const ContactHero: React.FC = () => {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  // Smooth scroll listener for up-down animation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // Only track within hero section range
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
  }, []);

  // Clamped scroll offset for parallax
  const clampedScroll = Math.min(Math.max(scrollY, 0), 800);

  // Desktop offsets: UP cards glide upwards, DOWN cards glide downwards
  const getDesktopTransform = (isUp: boolean) => {
    if (isUp) {
      const offset = -16 - clampedScroll * 0.08;
      return `translate3d(0, ${offset}px, 0)`;
    } else {
      const offset = 48 + clampedScroll * 0.08;
      return `translate3d(0, ${offset}px, 0)`;
    }
  };

  // Mobile column offsets
  const mobileCol1Transform = `translate3d(0, ${-clampedScroll * 0.05}px, 0)`;
  const mobileCol2Transform = `translate3d(0, ${48 + clampedScroll * 0.05}px, 0)`;

  const handleCardClick = (card: ContactHeroCardItem) => {
    if (card.targetId) {
      const el = document.getElementById(card.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderCard = (card: ContactHeroCardItem, isMobile: boolean = false) => {
    const subtitle = language === "ar" ? card.subtitleAr : card.subtitleEn;
    const title = language === "ar" ? card.titleAr : card.titleEn;

    return (
      <button
        key={card.id}
        type="button"
        onClick={() => handleCardClick(card)}
        style={!isMobile ? { transform: getDesktopTransform(card.isUp) } : undefined}
        className={`group block text-start relative w-full h-[240px] sm:h-[280px] lg:h-[420px] ${
          isMobile ? "rounded-2xl" : "rounded-[28px]"
        } overflow-hidden border-2 border-white shadow-xl shadow-black/15 will-change-transform transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02] cursor-pointer`}
      >
        {/* Background Photography - Exact same height on all cards */}
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
        <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5 text-start z-10">
          <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#FFC837] mb-0.5 truncate drop-shadow-xs">
            {subtitle}
          </span>
          <h3 className="text-white font-bold text-xs sm:text-sm lg:text-base leading-snug truncate drop-shadow-md">
            {title}
          </h3>
        </div>
      </button>
    );
  };

  return (
    <section className="w-full bg-white select-none overflow-hidden" aria-label="Contact Us Hero">
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
              {language === "ar" ? "تواصل معنا" : "Contact us"}
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

          {/* Subtitle statement */}
          <p className="text-white/95 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-2xl sm:max-w-3xl mx-auto px-2">
            {language === "ar"
              ? "تواصل مع شركة بيت البطانيات للتجارة ذ.م.م في دبي. تفضل بزيارة صالة عرضنا في ديرة، أو ناقش طلبات التوزيع والجملة، أو تحدث مباشرة مع فريق خدمة العملاء."
              : "Connect with Blanket House Trading LLC in Dubai. Visit our flagship showroom in Deira, discuss corporate & wholesale partnerships, or speak directly with our concierge team."}
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
        {/* MOBILE & TABLET VIEW: 2-Column Staggered Masonry with Scroll Up-Down Animation */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden items-start">
          {/* Column 1: Card 1 (UP) & Card 3 (UP) */}
          <div
            style={{ transform: mobileCol1Transform }}
            className="flex flex-col gap-3 sm:gap-4 will-change-transform transition-transform duration-300 ease-out"
          >
            {renderCard(CONTACT_HERO_CARDS[0], true)}
            {renderCard(CONTACT_HERO_CARDS[2], true)}
          </div>

          {/* Column 2: Card 2 (DOWN) & Card 4 (DOWN) - Glides downward on scroll */}
          <div
            style={{ transform: mobileCol2Transform }}
            className="flex flex-col gap-3 sm:gap-4 will-change-transform transition-transform duration-300 ease-out"
          >
            {renderCard(CONTACT_HERO_CARDS[1], true)}
            {renderCard(CONTACT_HERO_CARDS[3], true)}
          </div>
        </div>

        {/* DESKTOP VIEW: 4 Columns with Identical Photo Height & Alternating Up/Down Scroll Animation */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-start">
          {CONTACT_HERO_CARDS.map((card) => renderCard(card, false))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. QUICK CONTACT HIGHLIGHT PILLARS (BOTTOM)                  */}
      {/* ============================================================ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28 pb-14 sm:pb-18">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-neutral-100">
          {/* Item 1 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <PhoneCall className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "الهاتف والواتساب" : "Call & WhatsApp"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug dir-ltr">
              +971 4 226 8838
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <MapPin className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "معرض دبي الرئيسي" : "Dubai Flagship"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar" ? "منطقة ديرة، دبي، الإمارات" : "Al Ras, Deira, Dubai, UAE"}
            </p>
          </div>

          {/* Item 3 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <Clock className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "ساعات العمل" : "Opening Hours"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar" ? "السبت – الخميس: 9ص – 9م" : "Sat – Thu: 9:00 AM – 9:00 PM"}
            </p>
          </div>

          {/* Item 4 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <Mail className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "البريد الإلكتروني" : "Direct Email"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              info@blankethouse.ae
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
