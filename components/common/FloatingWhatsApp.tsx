"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingWhatsApp: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "971558879237";
  const formattedNumber = "+971 55 887 9237";
  const defaultMessage = encodeURIComponent(
    language === "ar"
      ? "مرحباً بي إتش تي كوليكشنز (بيت البطانيات للتجارة)، أود الاستفسار عن منتجاتكم وتشكيلاتكم."
      : "Hello BHT Collections (Blanket House Trading LLC), I would like to inquire about your collections and products."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="WhatsApp Quick Contact"
      className={`fixed bottom-6 z-50 flex items-center gap-3 select-none pointer-events-auto ${
        isRTL ? "left-6 flex-row-reverse" : "right-6 flex-row"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* EXPANDABLE CHAT PILL / TOOLTIP */}
      <div
        className={`hidden sm:flex items-center gap-2.5 bg-white text-bht-charcoal px-3.5 py-2 rounded-2xl shadow-xl border border-gray-200 transition-all duration-300 transform ${
          isHovered
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-90 translate-y-0 scale-95"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="text-start">
          <span className="text-xs font-black block leading-tight text-bht-charcoal">
            {language === "ar" ? "تحدث معنا عبر واتساب" : "Chat on WhatsApp"}
          </span>
          <span className="text-[10px] text-gray-500 font-semibold block leading-tight dir-ltr">
            {formattedNumber}
          </span>
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with BHT Collections on WhatsApp at ${formattedNumber}`}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Quiet halo keeps the contact action visible without continuous motion. */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-15 group-hover:opacity-25 transition-opacity duration-300 -z-10" />

        {/* Official WhatsApp SVG Glyph */}
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          className="transition-transform duration-300 group-hover:rotate-6 drop-shadow-sm"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Small Active UAE Notification Dot */}
        <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-bht-red border-2 border-white flex items-center justify-center text-[9px] font-black text-white">
          1
        </span>
      </a>
    </aside>
  );
};
