"use client";

import React from "react";
import { ABOUT_CONTENT, ABOUT_CONTENT_AR } from "@/data/aboutContent";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const AboutPresentDarkSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = language === "ar" ? ABOUT_CONTENT_AR : ABOUT_CONTENT;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="bht-section w-full bg-[#f7f6f3] text-neutral-900 py-16 sm:py-24 overflow-hidden relative border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div data-reveal-group="split" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT: Angled 3D Modern Flagship Showcase on Elevated Surface */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[560px] aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden group bg-neutral-200">
              <Image
                src="/contact/dubai-shop.png"
                alt="BHT Collections Dubai Flagship Experience"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Modern City Tag */}
              <div className="absolute bottom-5 start-5 text-xs font-medium text-white">
                <span>{language === "ar" ? "دبي، الإمارات العربية المتحدة" : "Dubai, United Arab Emirates"}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: N26-Style Editorial Brand Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Brand Logo / Wordmark */}
            <div className="mb-4">
              <span className="bht-eyebrow uppercase text-neutral-500 inline-block">
                BHT COLLECTIONS
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 font-normal tracking-tight leading-[1.18] mb-4 max-w-xl">
              {copy.portfolioTitle}
            </h2>
            <p className="bht-copy text-neutral-600 mb-8">{copy.portfolioIntro}</p>
            <ul className="space-y-8 mb-10">
              {copy.divisions.map((division) => (
                <li key={division.title} className="border-t border-neutral-300 pt-6">
                  <h3 className="text-lg text-neutral-900 mb-3">{division.title}</h3>
                  <p className="bht-copy text-neutral-600">{division.description}</p>
                </li>
              ))}
            </ul>

            {/* CTA Button Link */}
            <div>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-bht-red group transition-colors"
              >
                <span>{language === "ar" ? "استكشف التشكيلات الحالية" : "EXPLORE THE COLLECTIONS"}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
