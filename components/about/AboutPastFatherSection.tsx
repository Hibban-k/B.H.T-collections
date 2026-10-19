"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Star, Quote } from "lucide-react";

export const AboutPastFatherSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="w-full bg-white py-16 sm:py-24 overflow-hidden border-b border-[#F0F0F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Worldpackers-Style Narrative & Father's Wisdom */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Heritage Monogram Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-bht-red flex items-center justify-center font-black text-xs border border-red-100 shadow-2xs">
                <span>BHT</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-arabic">
                بيت البطانيات للتجارة ذ.م.م
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-bht-charcoal font-normal tracking-tight leading-[1.18] mb-3 max-w-xl">
              {language === "ar"
                ? "حكاية البدايات: مسيرة الوالد المؤسس وتراث الأصالة."
                : "The Father's Story: Where It All Began in Dubai."}
            </h2>

            {/* Heritage Stars */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                ))}
              </div>
              <span className="text-xs text-neutral-500 font-semibold">
                {language === "ar" ? "تراث عائلي أصيل • عقود من الثقة" : "Multi-Decade Heritage • Family Trust"}
              </span>
            </div>

            {/* Narrative Paragraph */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed max-w-lg mb-6 font-normal">
              {language === "ar"
                ? "بدأت القصة قبل عقود في أسواق دبي التاريخية على يد الوالد المؤسس، الذي آمن بأن التجارة الحقيقية ليست مجرد بيع بضاعة، بل هي بناء ثقة مقدسة تدوم لأجيال. كان يتفقد خيوط كل بطانية وينتقي أجود الأقمشة بنفسه، لتصل الدفء والراحة إلى كل بيت في الإمارات."
                : "Decades ago in the historic trading souqs of Dubai, our journey began with our founding father. He believed that genuine trade is built on sacred handshake trust and honorable service. Inspecting every woven textile himself, he dedicated his life to bringing authentic warmth and comfort to every family."}
            </p>

            {/* Father's Quote Callout */}
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80 relative">
              <Quote className="w-6 h-6 text-neutral-300 absolute top-3 end-3" />
              <p className="text-xs sm:text-sm font-serif italic text-neutral-800 leading-relaxed pe-5">
                {language === "ar"
                  ? "«الجودة أمانة وعهد نقطعه مع كل عائلة تدخل منتجاتنا إلى بيتها لتنعم بالدفء والراحة.»"
                  : "“Quality is never an accident; it is the sacred promise we make to every family that invites our blankets into their home.”"}
              </p>
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mt-2">
                {language === "ar" ? "— وصية الوالد المؤسس" : "— Words of the Founding Father"}
              </span>
            </div>

            {/* Link to Brands */}
            <div>
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-bht-charcoal hover:text-bht-red group transition-colors"
              >
                <span>{language === "ar" ? "تعرف على علاماتنا وشركائنا" : "VIEW OUR AUTHORIZED BRANDS"}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Framed Archival Vintage Father Image */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-900 group">
              <Image
                src="/about/founder-father-heritage.jpg"
                alt="Founding Father in Historic Dubai Textile Shop"
                fill
                className="object-cover object-center filter sepia-[0.15] transition-transform duration-700 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

              {/* Archival Tag */}
              <div className="absolute bottom-5 inset-x-5 text-white">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-300 block mb-1">
                  {language === "ar" ? "الأرشيف التاريخي للتأسيس" : "HISTORIC FOUNDING ARCHIVE"}
                </span>
                <p className="text-xs sm:text-sm font-serif font-bold text-white">
                  {language === "ar"
                    ? "الوالد المؤسس في متجر البطانيات الأول — دبي"
                    : "The Founding Father in the First Blanket House Shop — Dubai"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
