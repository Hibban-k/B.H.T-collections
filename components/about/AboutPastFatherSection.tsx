"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Star, ShieldCheck, CheckCircle2 } from "lucide-react";

export const AboutPastFatherSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="w-full bg-white py-16 sm:py-24 overflow-hidden border-b border-[#F0F0F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal-group="split" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: History & Trust-Building Narrative */}
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

            {/* Trust-Building Quality & Verification Card */}
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF9F6] to-white border border-[#E8E5DF] shadow-sm relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-bht-red flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                  <ShieldCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                      {language === "ar"
                        ? "عهد الجودة والأمانة المعتمدة"
                        : "Certified Quality & Handshake Trust"}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      {language === "ar" ? "معايير معتمدة" : "UAE Verified"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
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
