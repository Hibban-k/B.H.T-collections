"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ABOUT_CONTENT, ABOUT_CONTENT_AR } from "@/data/aboutContent";
import { PageHeroIntro } from "@/components/hero/PageHeroIntro";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/components/common/useReducedMotion";

interface AboutHighlight {
  id: string;
  title: string;
  image: string;
  isUp: boolean;
}

export const AboutHeroSection: React.FC = () => {
  const { language } = useLanguage();
  const copy = language === "ar" ? ABOUT_CONTENT_AR : ABOUT_CONTENT;
  const highlights: AboutHighlight[] = [
    {
      id: "story", title: language === "ar" ? "قصتنا" : "Our Story",
      image: "/about/principles-integrity.jpg", isUp: true,
    },
    {
      id: "textiles", title: language === "ar" ? "منسوجات منزلية" : "Home Textiles",
      image: "/about/principles-craftsmanship.jpg", isUp: false,
    },
    {
      id: "promise", title: language === "ar" ? "وعدنا بالجودة" : "Our Promise",
      image: "/about/principles-hospitality.jpg", isUp: true,
    },
    {
      id: "presence", title: language === "ar" ? "حضورنا الخليجي" : "Across the GCC",
      image: "/about/principles-heritage-vision.jpg", isUp: false,
    },
  ];
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

  const renderCard = (card: AboutHighlight, isMobile: boolean = false) => {
    return (
      <div key={card.id}
        style={!isMobile ? { transform: getDesktopTransform(card.isUp) } : undefined}
        className="w-full min-w-0 transition-transform duration-300 ease-out motion-reduce:transition-none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100">
          <Image src={card.image} alt={card.title} fill priority
            className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" />
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-white overflow-hidden" aria-label="About Us Hero">
      {/* ============================================================ */}
      {/* 1. LIGHT EDITORIAL HERO BANNER (TOP)                            */}
      {/* ============================================================ */}
      <PageHeroIntro overlappingCards
        title={language === "ar" ? "من نحن" : "About us"}
        eyebrow={copy.welcome}
        description={<>
          <span className="block text-lg sm:text-xl text-bht-charcoal font-medium mb-5">{copy.tagline}</span>
          <span className="block">{copy.intro}</span>
        </>}
      />

      {/* ============================================================ */}
      {/* 2. OVERLAPPING CARDS: CLIENT STORY HIGHLIGHTS        */}
      {/* ============================================================ */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 -mt-28 sm:-mt-36 lg:-mt-44 relative z-10">
        {/* MOBILE & TABLET VIEW: Converges into same alignment on scroll */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:hidden items-start">
          {/* Column 1: Card 1 (UP) & Card 3 (UP) - Glides DOWN on scroll */}
          <div
            style={{ transform: mobileCol1Transform }}
            className="flex min-w-0 flex-col gap-6 sm:gap-10 will-change-transform transition-transform duration-300 ease-out"
          >
            {renderCard(highlights[0], true)}
            {renderCard(highlights[2], true)}
          </div>

          {/* Column 2: Card 2 (DOWN) & Card 4 (DOWN) - Glides UP into same alignment on scroll */}
          <div
            style={{ transform: mobileCol2Transform }}
            className="flex min-w-0 flex-col gap-6 sm:gap-10 will-change-transform transition-transform duration-300 ease-out"
          >
            {renderCard(highlights[1], true)}
            {renderCard(highlights[3], true)}
          </div>
        </div>

        {/* DESKTOP VIEW: 4 Columns with Identical Photo Height - Converges into same alignment on scroll */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 items-start">
          {highlights.map((card) => renderCard(card, false))}
        </div>
      </div>

      {/* Bottom padding to smoothly transition to next section */}
      <div className="w-full pt-14 sm:pt-20 lg:pt-28 pb-6 sm:pb-12" />
    </section>
  );
};
