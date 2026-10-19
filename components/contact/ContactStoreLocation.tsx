"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ContactStoreLocation: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="w-full bg-[#FAFAFA] py-14 sm:py-20 border-b border-[#F0F0F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Stylized Dubai Coastline Map Graphic */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[420px] rounded-2xl overflow-hidden border border-[#E5E7EB] bg-white shadow-xs group">
              <Image
                src="/contact/dubai-store-map.jpg"
                alt="BHT Collections Dubai Outlet Store Map Location"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          {/* Right Column: Store Details & Directions Action */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1 mb-2">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-neutral-600">
                <span className="text-bht-red font-black">V</span>ISIT OUR STORE
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-bht-charcoal font-normal tracking-tight mb-4">
              {language === "ar" ? "دبي، الإمارات" : "Dubai, UAE"}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md mb-8 font-normal">
              {language === "ar"
                ? "استمتع بتجربة تشكيلاتنا الفاخرة مباشرة في معرضنا بدبي. سيكون فريقنا المتخصص سعيداً بخدمتك ومساعدتك."
                : "Experience our collections in person at our Dubai outlet. Our team will be happy to assist you."}
            </p>

            {/* Action Outline Button: GET DIRECTIONS */}
            <div>
              <a
                href="https://maps.google.com/?q=Dubai+UAE+Blanket+House+Trading"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-neutral-900 rounded-lg text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-200 group shadow-xs"
              >
                <MapPin className="w-4 h-4 stroke-[2] text-neutral-700 group-hover:text-white transition-colors" />
                <span>
                  {language === "ar" ? "الاتجاهات إلى المتجر" : "GET DIRECTIONS"}
                </span>
                <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
