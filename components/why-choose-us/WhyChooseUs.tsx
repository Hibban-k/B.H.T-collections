"use client";

import React from "react";
import { Truck, Handshake, ShieldCheck } from "lucide-react";
import { TRUST_FEATURES } from "@/data/trustData";
import { useLanguage } from "@/context/LanguageContext";

export const WhyChooseUs: React.FC = () => {
  const { language } = useLanguage();

  const renderIcon = (iconName: string) => {
    const iconProps = {
      className: "w-9 h-9 text-black stroke-[1.5]",
    };

    switch (iconName) {
      case "truck":
        return <Truck {...iconProps} />;
      case "handshake":
        return <Handshake {...iconProps} />;
      case "shield-check":
        return <ShieldCheck {...iconProps} />;
      default:
        return <ShieldCheck {...iconProps} />;
    }
  };

  return (
    <section
      className="w-full bg-white py-14 sm:py-18 md:py-20 border-t border-[#F0F0F0]"
      aria-label="Core Business Strengths"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 Pillars Grid matching reference design */}
        <div data-reveal-group="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 gap-x-8 lg:gap-x-12">
          {TRUST_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center px-2 sm:px-4"
            >
              {/* Black Outline Icon at Top */}
              <div className="mb-4 flex items-center justify-center h-12 w-12 text-black transition-transform duration-300 hover:scale-110">
                {renderIcon(feature.iconName)}
              </div>

              {/* Bold Title */}
              <h3 className="text-base sm:text-lg font-extrabold text-[#111827] tracking-tight mb-2.5 max-w-xs">
                {language === "ar" ? feature.titleAr : feature.titleEn}
              </h3>

              {/* Concise Description */}
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-sm">
                {language === "ar" ? feature.descAr : feature.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
