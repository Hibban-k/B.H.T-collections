"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { HERO_SLIDES, HeroSlide } from "@/data/heroData";
import { useLanguage } from "@/context/LanguageContext";

export const HeroCarousel: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [slides, setSlides] = useState<HeroSlide[]>(HERO_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex] || slides[0];
  const NextArrow = isRTL ? ChevronLeft : ChevronRight;
  const PrevArrow = isRTL ? ChevronRight : ChevronLeft;
  const CtaArrow = isRTL ? ArrowLeft : ArrowRight;

  // Dynamically fetch hero category images from database
  useEffect(() => {
    let isMounted = true;

    const loadCategoryImages = async () => {
      try {
        const res = await fetch("/api/store/categories");
        if (res.ok) {
          const data = await res.json();
          const categories: any[] = data.categories || [];

          if (categories.length > 0 && isMounted) {
            setSlides((prevSlides) =>
              prevSlides.map((slide) => {
                const matched = categories.find((c) => {
                  const cSlug = (c.slug || "").toLowerCase();
                  const cName = (c.name || "").toLowerCase();
                  const dest = slide.destination.toLowerCase();
                  const slideCat = slide.category.toLowerCase();

                  return (
                    dest.includes(cSlug) ||
                    slideCat.includes(cName) ||
                    (slideCat === "blankets" && (cSlug === "bedding" || cSlug === "blankets" || cName === "bedding")) ||
                    (slideCat === "trolleys" && (cSlug === "travel-bags" || cSlug === "trolly" || cSlug === "trolleys" || cName === "travel bags")) ||
                    (slideCat === "footwear" && (cSlug === "footwear" || cName === "footwear"))
                  );
                });

                if (matched && matched.image && matched.image.trim()) {
                  return {
                    ...slide,
                    image: matched.image,
                  };
                }
                return slide;
              })
            );
          }
        }
      } catch (err) {
        console.error("HeroCarousel: failed to load category images from DB", err);
      }
    };

    loadCategoryImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  // 2.5 second autoplay timer
  useEffect(() => {
    if (isPlaying && !isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 2500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, nextSlide]);

  return (
    <section
      className="relative w-full h-[460px] xs:h-[500px] sm:h-[600px] md:h-[660px] lg:h-[720px] overflow-hidden select-none bg-black"
      aria-label="Editorial Featured Collections Carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* FULL-WIDTH SLIDES */}
      {slides.map((slide, index) => {
        const isCurrent = index === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              isCurrent
                ? "opacity-100 scale-100 pointer-events-auto z-10"
                : "opacity-0 scale-105 pointer-events-none z-0"
            }`}
            aria-hidden={!isCurrent}
          >
            {/* FULL WIDTH BACKGROUND IMAGE FROM DATABASE CATEGORY */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />

              {/* REFINED EDITORIAL GRADIENT OVERLAYS */}
              <div
                className={`absolute inset-0 ${
                  isRTL
                    ? "bg-gradient-to-l from-black/85 via-black/55 to-black/20 md:w-3/4 lg:w-3/5"
                    : "bg-gradient-to-r from-black/85 via-black/55 to-black/20 md:w-3/4 lg:w-3/5"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            {/* EDITORIAL CONTENT OVERLAY */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl lg:max-w-2xl text-start space-y-4 sm:space-y-6">
                  {/* Eyebrow */}
                  <div className="inline-flex items-center gap-2.5">
                    <span className="w-8 h-[2.5px] bg-bht-red" />
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-bht-red bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded">
                      {language === "ar" ? slide.eyebrowAr : slide.eyebrowEn}
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] sm:leading-[1.1] tracking-tight drop-shadow-md">
                    {language === "ar" ? slide.headingAr : slide.headingEn}
                  </h1>

                  {/* Description */}
                  <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-200 font-normal leading-relaxed drop-shadow-sm max-w-lg line-clamp-2 sm:line-clamp-none">
                    {language === "ar" ? slide.descriptionAr : slide.descriptionEn}
                  </p>

                  {/* CTA Button */}
                  <div className="pt-1.5 sm:pt-4">
                    <Link
                      href={slide.destination}
                      className="inline-flex items-center gap-2 sm:gap-3 bg-bht-red hover:bg-bht-red-hover text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase px-5 sm:px-9 py-2.5 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:gap-4 active:scale-95"
                    >
                      <span>
                        {language === "ar" ? slide.ctaTextAr : slide.ctaTextEn}
                      </span>
                      <CtaArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* FLOATING SIDE ARROWS (DESKTOP) */}
      <button
        type="button"
        onClick={prevSlide}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 start-4 lg:start-8 z-30 w-11 h-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-xs border border-white/20 transition-all duration-200 shadow-lg hover:scale-105"
        aria-label="Previous slide"
      >
        <PrevArrow className="w-5 h-5 stroke-[2]" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 end-4 lg:end-8 z-30 w-11 h-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-xs border border-white/20 transition-all duration-200 shadow-lg hover:scale-105"
        aria-label="Next slide"
      >
        <NextArrow className="w-5 h-5 stroke-[2]" />
      </button>

      {/* BOTTOM CONTROLS BAR: Pagination Dots + Play/Pause */}
      <div className="absolute bottom-6 inset-x-0 z-30 pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlideIndex
                    ? "w-8 bg-bht-red"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Autoplay Toggle & Mobile Nav Arrows */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 text-white">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Nav Arrows */}
            <div className="flex items-center md:hidden border-s border-white/20 ps-1">
              <button
                type="button"
                onClick={prevSlide}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Previous slide"
              >
                <PrevArrow className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Next slide"
              >
                <NextArrow className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
