"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const AnnouncementTicker: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const tickerItems = [
    {
      id: "brand",
      isBrand: true,
      textEn: "BHT Collections",
      textAr: "بي إتش تي كوليكشنز",
      subEn: "UAE HQ",
      subAr: "المقر الرئيسي للإمارات",
    },
    {
      id: "hours",
      textEn: "Mon - Sat: 10 AM - 6 PM UAE Time",
      textAr: "الإثنين - السبت: 10 صباحاً - 6 مساءً بتوقيت الإمارات",
    },
    {
      id: "lifestyle",
      textEn: "Made for Your Lifestyle",
      textAr: "مصممة لتناسب أسلوب حياتك",
    },
    {
      id: "care",
      textEn: "Care in Every Detail",
      textAr: "عناية فائقة في كل تفصيل",
    },
    {
      id: "trust",
      textEn: "Your Trust, Our Promise",
      textAr: "ثقتكم هي وعدنا الأكيد",
    },
    {
      id: "experience",
      textEn: "A Better Shopping Experience",
      textAr: "تجربة تسوق أكثر تميزاً وسهولة",
    },
    {
      id: "quality",
      textEn: "Care You Can Feel",
      textAr: "جودة واهتمام تشعر بهما",
    },
    {
      id: "standard",
      textEn: "A Standard You Deserve",
      textAr: "معايير راقية تليق باختيارك",
    },
  ];

  const renderTrack = (isDuplicate = false) => (
    <div
      aria-hidden={isDuplicate}
      className="flex items-center shrink-0 space-x-8 rtl:space-x-reverse pe-8"
    >
      {tickerItems.map((item) => (
        <React.Fragment key={`${isDuplicate ? "dup-" : ""}${item.id}`}>
          <div className="flex items-center gap-2.5 whitespace-nowrap text-xs md:text-sm font-medium text-bht-charcoal">
            {item.isBrand && (
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src="/logo/logo.png"
                  alt="BHT Logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className={item.isBrand ? "font-bold" : ""}>
              {language === "ar" ? item.textAr : item.textEn}
            </span>
            {item.isBrand && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-bht-charcoal text-white px-1.5 py-0.5 rounded-sm">
                {language === "ar" ? item.subAr : item.subEn}
              </span>
            )}
          </div>
          <span className="text-[#CCCCCC] text-xxxl select-none">•</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className="w-full overflow-hidden py-1.5 transition-all select-none group"
      role="region"
      aria-label="Brand Announcements"
    >
      <div className="max-w-[1440px] mx-auto px-4">
        <div
          className={`flex w-fit group-hover:[animation-play-state:paused] ${isRTL ? "animate-marquee-rtl" : "animate-marquee"
            }`}
        >
          {renderTrack(false)}
          {renderTrack(true)}
        </div>
      </div>
    </div>
  );
};
