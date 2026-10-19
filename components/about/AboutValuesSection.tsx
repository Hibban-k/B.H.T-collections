"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Sparkles, HeartHandshake, Compass } from "lucide-react";

export const AboutValuesSection: React.FC = () => {
  const { language } = useLanguage();

  const values = [
    {
      icon: ShieldCheck,
      color: "bg-red-50 text-bht-red",
      titleEn: "Uncompromising Integrity",
      titleAr: "الأمانة والصدق في المعاملة",
      descEn: "Honoring our founding father's core virtue: building lasting relationships based on honesty and transparent ethics.",
      descAr: "وفاءً لنهج الوالد المؤسس: بناء علاقات وثيقة ومستدامة تقوم على الصدق والنزاهة والشفافية التامة مع عملائنا.",
    },
    {
      icon: Sparkles,
      color: "bg-amber-50 text-amber-700",
      titleEn: "Generational Craftsmanship",
      titleAr: "إتقان الصنعة والبحث عن الجودة",
      descEn: "Selecting only the highest quality fibers, resilient polycarbonate luggage, and comfortable soles tested to endure everyday life.",
      descAr: "انتقاء أجود خامات النسيج، وحقائب السفر فائقة المتانة، والأحذية المريحة المصممة لتدوم وتوفر أعلى درجات الراحة.",
    },
    {
      icon: HeartHandshake,
      color: "bg-emerald-50 text-emerald-700",
      titleEn: "Family Warmth & Hospitality",
      titleAr: "الدفء العائلي وحسن الاستقبال",
      descEn: "Treating every customer who steps into our showrooms or orders online as a valued guest and extended family member.",
      descAr: "معاملة كل عميل يزور معارضنا أو يتواصل معنا كفرد عزيز من العائلة، وتقديم الدعم والاهتمام الصادق دائماً.",
    },
    {
      icon: Compass,
      color: "bg-blue-50 text-bht-blue",
      titleEn: "UAE Heritage & Modern Vision",
      titleAr: "فخر التراث الإماراتي ورؤية المستقبل",
      descEn: "Proud of our deep roots in Dubai while continuously innovating with modern design to serve the dynamic lifestyle of the GCC.",
      descAr: "فخورون بجذورنا الراسخة في دبي، ومستمرون في الابتكار والتوسع لتلبية تطلعات أسلوب الحياة العصري في دول الخليج.",
    },
  ];

  return (
    <section className="w-full bg-[#FAF9F6] py-16 sm:py-20 border-b border-[#EAE7E0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400 mb-2 block">
            {language === "ar" ? "ثوابتنا الراسخة" : "OUR TIMELESS VALUES"}
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-bht-charcoal font-normal tracking-tight">
            {language === "ar"
              ? "قيم متوارثة من الوالد إلى الأجيال القادمة"
              : "Principles Passed from Father to the Future"}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/70 hover:border-neutral-300 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${val.color} flex items-center justify-center mb-5 shrink-0`}
                >
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h4 className="text-base font-bold text-neutral-900 mb-2">
                  {language === "ar" ? val.titleAr : val.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {language === "ar" ? val.descAr : val.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
