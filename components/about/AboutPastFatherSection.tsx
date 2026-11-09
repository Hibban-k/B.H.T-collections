"use client";

import React from "react";
import { ABOUT_CONTENT, ABOUT_CONTENT_AR } from "@/data/aboutContent";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const AboutPastFatherSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const copy = language === "ar" ? ABOUT_CONTENT_AR : ABOUT_CONTENT;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="bht-section w-full bg-white py-16 sm:py-24 overflow-hidden border-b border-[#F0F0F0]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div data-reveal-group="split" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT: History & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="bht-eyebrow text-neutral-500 mb-5">BHT COLLECTIONS</p>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-bht-charcoal font-normal tracking-tight leading-[1.18] mb-3 max-w-xl">
              {copy.storyTitle}
            </h2>

            <p className="text-xs text-neutral-500 mt-3 mb-8">
              {language === "ar" ? "تأسست في دبي عام 2009 • التزام بالجودة" : "Established in Dubai (2009) • Proven Quality"}
            </p>

            <div className="space-y-5 bht-copy text-neutral-600 max-w-xl mb-8">
              {copy.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            {/* Trust-Building Quality & Verification Card */}
            <div className="mb-8 py-6 border-y border-neutral-200">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                      {language === "ar"
                        ? "عهد الجودة والأمانة المعتمدة"
                        : "Certified Quality & Handshake Trust"}
                    </h4>
                    <span className="text-xs text-neutral-500">
                      {language === "ar" ? "معايير معتمدة" : "UAE Verified"}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {language === "ar"
                      ? "كل قطعة تمر بفحص يدوي دقيق للأقمشة والدرزات والمتانة، لضمان أعلى مستويات الراحة والأصالة التي توارثتها عائلات الإمارات عبر العقود."
                      : "Every textile, luggage seam, and sole undergoes rigorous hands-on inspection to guarantee the enduring comfort and authentic reliability trusted by UAE families for decades."}
                  </p>
                </div>
              </div>
            </div>

            {/* Link to Brands */}
            <div>
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 text-sm font-medium text-bht-charcoal hover:text-bht-red group transition-colors"
              >
                <span>{language === "ar" ? "تعرف على علاماتنا وشركائنا" : "VIEW OUR AUTHORIZED BRANDS"}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Framed Archival Vintage Image */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[560px] aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 group">
              <Image
                src="/about/founder-father-portrait.jpg"
                alt="Founding of Blanket House Trading LLC Dubai"
                fill
                className="object-cover object-top sm:object-center transition-transform duration-700 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

              {/* Archival Tag */}
              <div className="absolute bottom-5 inset-x-5 text-white">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/80 block mb-1">
                  {language === "ar" ? "الأرشيف التاريخي للتأسيس" : "HISTORIC FOUNDING ARCHIVE"}
                </span>
                <p className="text-xs sm:text-sm font-serif font-bold text-white">
                  {language === "ar"
                    ? "بدايات بيت البطانيات للتجارة ذ.م.م — دبي (2009)"
                    : "The Founding Journey of Blanket House Trading LLC — Dubai (2009)"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 p-6 sm:p-10 lg:p-14 rounded-2xl sm:rounded-3xl bg-[#f7f6f3] grid lg:grid-cols-12 gap-8 lg:gap-16">
          <h2 className="lg:col-span-5 text-bht-charcoal">{copy.promiseTitle}</h2>
          <div className="lg:col-span-7 space-y-6 bht-copy text-neutral-600">
            <p className="font-medium text-bht-charcoal">{copy.philosophy}</p>
            <p>{copy.promise}</p>
            <p className="text-bht-charcoal border-s-2 border-bht-red ps-5">{copy.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
