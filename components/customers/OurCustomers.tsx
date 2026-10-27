"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Building2, CheckCircle2 } from "lucide-react";

interface CustomerItem {
  id: string;
  name: string;
  nameAr: string;
  categoryEn: string;
  categoryAr: string;
  src: string;
}

const CUSTOMERS: CustomerItem[] = [
  {
    id: "lulu",
    name: "LuLu Hypermarket",
    nameAr: "لولو هايبرماركت",
    categoryEn: "Hypermarkets & Superstores",
    categoryAr: "هايبرماركت ومراكز تسوق",
    src: "/clientele/lulu-lot.png",
  },
  {
    id: "mark-save",
    name: "Mark & Save",
    nameAr: "مارك آند سيف",
    categoryEn: "Department Stores",
    categoryAr: "مراكز تجزئة متعددة الأقسام",
    src: "/clientele/mark-and-save.png",
  },
  {
    id: "al-madina",
    name: "Al Madina Group",
    nameAr: "مجموعة المدينة",
    categoryEn: "Hypermarkets & Retail",
    categoryAr: "هايبرماركت وتجارة تجزئة",
    src: "/clientele/al-madina.png",
  },
  {
    id: "talal-group",
    name: "Talal Group",
    nameAr: "مجموعة طلال",
    categoryEn: "Hypermarkets & Supermarkets",
    categoryAr: "سلسلة هايبرماركت ومتاجر",
    src: "/clientele/talal-group.png",
  },
  {
    id: "shaklan",
    name: "Shaklan Group",
    nameAr: "مجموعة شعلان",
    categoryEn: "Markets & Department Stores",
    categoryAr: "أسواق ومتاجر استهلاكية",
    src: "/clientele/shaklan.png",
  },
];

export const OurCustomers: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      className="w-full bg-[#FAFAFA] py-14 sm:py-18 md:py-20 border-t border-[#EDEDED]"
      aria-label="Our Clientele & Retail Partners"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching website layout standard */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#888888]">
              {language === "ar" ? "عملاؤنا المميزون" : "OUR CLIENTELE"}
            </span>
            <span className="w-8 h-[1px] bg-[#CCCCCC]" />
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-bht-charcoal tracking-tight mb-3">
            {language === "ar"
              ? "نخدم كبرى سلاسل الهايبرماركت ومراكز التسوق"
              : "Trusted by Leading Retail & Hypermarket Chains"}
          </h2>

          {/* Subtitle with the 500+ client portfolio statement */}
          <p className="text-xs sm:text-sm text-bht-slate max-w-2xl leading-relaxed">
            {language === "ar"
              ? "نفخر بخدمة محفظة متميزة تضم أكثر من 500+ عميل ومؤسسة تجارية عبر دولة الإمارات ودول مجلس التعاون الخليجي."
              : "We proudly serve a distinguished portfolio of over 500+ customers, hypermarket chains, and institutional retailers across the UAE & GCC countries."}
          </p>
        </div>

        {/* 5-Column Customer Cards Grid matching other section layouts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-stretch">
          {CUSTOMERS.map((customer) => (
            <div
              key={customer.id}
              className="group relative bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-400 p-5 sm:p-6 flex flex-col items-center justify-between shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Logo Area */}
              <div className="relative w-full h-16 sm:h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 my-auto">
                <Image
                  src={customer.src}
                  alt={customer.name}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                />
              </div>

              {/* Customer Name & Department Tag */}
              <div className="w-full text-center pt-3 mt-3 border-t border-[#F0F0F0]">
                <h3 className="text-xs sm:text-sm font-extrabold text-bht-charcoal group-hover:text-bht-red transition-colors truncate">
                  {language === "ar" ? customer.nameAr : customer.name}
                </h3>
                <span className="text-[11px] text-[#888888] font-medium block truncate mt-0.5">
                  {language === "ar" ? customer.categoryAr : customer.categoryEn}
                </span>
              </div>

              {/* Red Hover Accent Bar matching BrandClientCard pattern */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-bht-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom Trust Highlight Banner */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-bht-red flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-bht-charcoal">
                {language === "ar"
                  ? "توريد مباشر وشراكات توريد تجارية طويلة الأمد"
                  : "Direct Wholesale Supply & Long-term Corporate Partnerships"}
              </p>
              <p className="text-[11px] sm:text-xs text-[#666666]">
                {language === "ar"
                  ? "معايير موثوقة في التوصيل، الأسعار التنافسية، والالتزام الكامل بالجودة."
                  : "Reliable schedules, competitive volume pricing, and guaranteed quality assurance."}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === "ar" ? "500+ عميل نشط" : "500+ Active Clients"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
