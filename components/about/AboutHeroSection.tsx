"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Users, Globe, Award } from "lucide-react";

export const AboutHeroSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-white pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-[#F0F0F0] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: EDITORIAL HEADLINE (LEFT) + HIGH-CONTRAST PORTRAIT (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Large Editorial Statement & Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-bht-charcoal font-normal tracking-tight leading-[1.12] mb-6 max-w-2xl">
              {language === "ar" ? (
                <>
                  بيت البطانيات للتجارة ذ.م.م هي الوجهة الرائدة للراحة والأناقة في دبي والإمارات.
                </>
              ) : (
                <>
                  Blanket House Trading LLC is the Premier Home, Travel &amp; Footwear House in Dubai.
                </>
              )}
            </h1>

            {/* Sub-links with dashes matching reference */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-500 font-medium mb-12">
              <Link href="/collections/bedding" className="hover:text-bht-red transition-colors">
                {language === "ar" ? "المفروشات الفاخرة" : "Bedding"}
              </Link>
              <span>—</span>
              <Link href="/collections/travel-bags" className="hover:text-bht-red transition-colors">
                {language === "ar" ? "حقائب السفر" : "Travel Bags"}
              </Link>
              <span>—</span>
              <Link href="/collections/footwear" className="hover:text-bht-red transition-colors">
                {language === "ar" ? "الأحذية والراحة" : "Footwear"}
              </Link>
              <span>—</span>
              <Link href="/contact" className="hover:text-bht-red transition-colors">
                {language === "ar" ? "معرض دبي الرئيسي" : "Dubai Flagship"}
              </Link>
            </div>

            {/* BOTTOM 4 MICRO CREDIBILITY PILLARS (Matching Reference 4 Icon Row) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-neutral-100">
              {/* Accolade 1 */}
              <div className="space-y-1.5">
                <div className="text-neutral-900">
                  <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
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

              {/* Accolade 2 */}
              <div className="space-y-1.5">
                <div className="text-neutral-900">
                  <Users className="w-5 h-5 stroke-[1.8]" />
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

              {/* Accolade 3 */}
              <div className="space-y-1.5">
                <div className="text-neutral-900">
                  <Globe className="w-5 h-5 stroke-[1.8]" />
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

              {/* Accolade 4 */}
              <div className="space-y-1.5">
                <div className="text-neutral-900">
                  <Award className="w-5 h-5 stroke-[1.8]" />
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

          {/* RIGHT: High-Contrast Editorial Portrait on Pure White Background */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] overflow-hidden">
              <Image
                src="/about/leadership-portrait.jpg"
                alt="Leadership of Blanket House Trading LLC Dubai"
                fill
                priority
                className="object-contain object-bottom select-none filter contrast-[1.05]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
