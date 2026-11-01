"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface CustomerItem {
  id: string;
  name: string;
  src: string;
  containerClass?: string;
  imgClass?: string;
}

const CUSTOMERS: CustomerItem[] = [
  {
    id: "al-madina",
    name: "Al Madina Group",
    src: "/clientele/al-madina-logo.png",
    containerClass: "max-w-[170px] sm:max-w-[190px] lg:max-w-[210px] h-14 sm:h-16 lg:h-20",
    imgClass: "scale-105",
  },
  {
    id: "mark-save",
    name: "Mark & Save",
    src: "/clientele/mark&save-logo.png",
    containerClass: "max-w-[200px] sm:max-w-[220px] lg:max-w-[240px] h-12 sm:h-14 lg:h-16",
  },
  {
    id: "shaklan",
    name: "Shaklan Group",
    src: "/clientele/shaklan-logo.png",
    containerClass: "max-w-[190px] sm:max-w-[210px] lg:max-w-[230px] h-12 sm:h-14 lg:h-16",
  },
  {
    id: "talal-group",
    name: "Talal Group",
    src: "/clientele/talal-logo.png",
    containerClass: "max-w-[150px] sm:max-w-[170px] lg:max-w-[190px] h-20 sm:h-24 lg:h-28",
    imgClass: "scale-135 sm:scale-145 lg:scale-155",
  },
];

export const OurCustomers: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      className="bht-section w-full bg-white py-16 sm:py-20 md:py-24 border-t border-[#F0F0F0]"
      aria-label="Our Clientele & Retail Partners"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Header: Left-side Short Powerful Headline + Right-side Tagline */}
        <div
          data-reveal
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10 mb-14 sm:mb-18 pb-8 sm:pb-10 border-b border-[#EBEBEB]"
        >
          {/* LEFT: Eyebrow + Short Powerful Headline */}
          <div className="max-w-xl">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-bht-red block mb-3 font-sans">
              {language === "ar" ? "عملاؤنا المميزون" : "OUR CLIENTELE"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-bht-charcoal tracking-tight leading-[1.15]">
              {language === "ar"
                ? "شريك التوريد لكبرى سلاسل التجزئة."
                : "Supplying Leading Retail Chains."}
            </h2>
          </div>

          {/* RIGHT: Supporting Tagline */}
          <div className="max-w-md md:text-start">
            <p className="text-xs sm:text-sm md:text-[15px] text-bht-slate leading-relaxed font-normal">
              {language === "ar"
                ? "عقود من التوريد الموثوق لمنتجات المفروشات الفاخرة وحقائب السفر والأحذية لأكثر من 500+ وجهة تسوق كبرى عبر دولة الإمارات ودول مجلس التعاون الخليجي."
                : "Decades of trusted wholesale distribution powering 500+ premier commercial shopping destinations across the UAE and GCC with certified quality bedding, luggage, and footwear."}
            </p>
          </div>
        </div>

        {/* Minimal Plain Logos (No Card Container, Pure Logo Display) */}
        <div
          data-reveal-group="stagger"
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 items-center justify-items-center"
        >
          {CUSTOMERS.map((customer) => (
            <div
              key={customer.id}
              className="w-full flex items-center justify-center p-2 group transition-transform duration-300 hover:scale-105"
            >
              <div
                className={`relative w-full flex items-center justify-center ${
                  customer.containerClass || "max-w-[200px] sm:max-w-[220px] h-14 sm:h-16 lg:h-20"
                }`}
              >
                <Image
                  src={customer.src}
                  alt={customer.name}
                  fill
                  className={`object-contain object-center opacity-85 group-hover:opacity-100 transition-all duration-300 ${
                    customer.imgClass || ""
                  }`}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
