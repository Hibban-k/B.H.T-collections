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

interface HeroCarouselProps {
  slides?: HeroSlide[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides = HERO_SLIDES,
}) => {
  const { language, isRTL } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex] || slides[0];
  const NextArrow = isRTL ? ChevronLeft : ChevronRight;
  const PrevArrow = isRTL ? ChevronRight : ChevronLeft;
  const CtaArrow = isRTL ? ArrowLeft : ArrowRight;

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
      className="relative w-full h-[480px] xs:h-[520px] sm:h-[600px] md:h-[660px] lg:h-[calc(100vh-128px)] lg:min-h-[660px] overflow-hidden select-none bg-black"
      aria-label="Editorial Featured Collections Carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* FULL-WIDTH SLIDES (SERVER-RENDERED WITH DATABASE BACKGROUND IMAGES) */}
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

              {/* SEAMLESS FULL-WIDTH GRADIENT OVERLAY (NO HARD SEAM OR DIVIDER LINE) */}
              <div
                className={`absolute inset-0 pointer-events-none ${
                  isRTL
                    ? "bg-gradient-to-l from-black/85 via-black/45 via-50% to-transparent"
                    : "bg-gradient-to-r from-black/85 via-black/45 via-50% to-transparent"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
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
