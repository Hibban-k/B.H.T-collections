"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface CustomerItem {
  id: string;
  name: string;
  nameAr: string;
  src: string;
}

const CUSTOMERS: CustomerItem[] = [
  {
    id: "lulu",
    name: "LuLu Hypermarket",
    nameAr: "لولو هايبرماركت",
    src: "/clientele/lulu-lot.png",
  },
  {
    id: "mark-save",
    name: "Mark & Save",
    nameAr: "مارك آند سيف",
    src: "/clientele/mark-and-save.png",
  },
  {
    id: "al-madina",
    name: "Al Madina Group",
    nameAr: "مجموعة المدينة",
    src: "/clientele/al-madina.png",
  },
  {
    id: "talal-group",
    name: "Talal Group",
    nameAr: "مجموعة طلال",
    src: "/clientele/talal-group.png",
  },
  {
    id: "shaklan",
    name: "Shaklan Group",
    nameAr: "مجموعة شعلان",
    src: "/clientele/shaklan.png",
  },
];

export const OurCustomers: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section
      className="w-full bg-white py-12 sm:py-16 md:py-20 border-t border-[#F0F0F0]"
      aria-label="Our Clientele & Retail Partners"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888888] block mb-2">
            {language === "ar" ? "عملاؤنا المميزون" : "OUR CLIENTELE"}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111827] tracking-tight">
            {language === "ar"
              ? "توريد موثوق لكبرى سلاسل الهايبرماركت ومراكز التسوق"
              : "Trusted by Leading Hypermarkets & Retail Chains"}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-2 leading-relaxed">
            {language === "ar"
              ? "نفخر بتوريد منتجاتنا لأكثر من 500+ مركز تجاري عبر دولة الإمارات ودول مجلس التعاون الخليجي."
              : "Proudly serving a distinguished portfolio of 500+ hypermarkets and retail partners across UAE & GCC."}
          </p>
        </div>

        {/* Minimal Customer Logos Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 items-center justify-items-center">
          {CUSTOMERS.map((customer) => (
            <div
              key={customer.id}
              className="w-full flex flex-col items-center justify-center p-3 sm:p-4 group transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Logo with subtle hover scale */}
              <div className="relative w-full max-w-[170px] h-14 sm:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100">
                <Image
                  src={customer.src}
                  alt={customer.name}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                />
              </div>

              {/* Minimal Clean Typography */}
              <h3 className="text-xs sm:text-sm font-semibold text-[#374151] group-hover:text-black transition-colors text-center mt-3 tracking-tight">
                {language === "ar" ? customer.nameAr : customer.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
