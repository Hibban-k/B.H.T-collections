"use client";

import React from "react";
import {
  Truck,
  Users,
  Handshake,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
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
      case "users":
        return <Users {...iconProps} />;
      case "handshake":
        return <Handshake {...iconProps} />;
      case "shield-check":
        return <ShieldCheck {...iconProps} />;
      case "warehouse":
        return <Building2 {...iconProps} />;
      case "sparkles":
        return <Sparkles {...iconProps} />;
      default:
        return <ShieldCheck {...iconProps} />;
    }
  };

  return (
    <section
      className="w-full bg-white py-16 md:py-24 border-t border-[#F0F0F0]"
      aria-label="Core Business Strengths"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* NO SECTION HEADING - Straight to the 6-item Grid as explicitly requested */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-16 gap-x-8 lg:gap-x-12">
          {TRUST_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center px-4"
            >
              {/* Black Outline Icon at Top */}
              <div className="mb-4 flex items-center justify-center h-12 w-12 text-black transition-transform duration-300 hover:scale-110">
                {renderIcon(feature.iconName)}
              </div>

              {/* Bold Title */}
              <h3 className="text-base sm:text-lg font-extrabold text-[#171717] tracking-tight mb-2.5 max-w-xs">
                {language === "ar" ? feature.titleAr : feature.titleEn}
              </h3>

              {/* Concise Description */}
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed max-w-sm">
                {language === "ar" ? feature.descAr : feature.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
