"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Star } from "lucide-react";

export const AboutPresentDarkSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="w-full bg-[#111111] text-white py-16 sm:py-24 overflow-hidden relative border-b border-neutral-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal-group="split" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Angled 3D Modern Flagship Showcase on Elevated Surface */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[560px] aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl group bg-neutral-900">
              <Image
                src="/contact/dubai-flagship.jpg"
                alt="BHT Collections Dubai Flagship Experience"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Modern City Tag */}
              <div className="absolute bottom-5 start-5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-bold text-gray-200">
                <span>📍 Dubai, United Arab Emirates</span>
              </div>
            </div>
          </div>

          {/* RIGHT: N26-Style Editorial Brand Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Brand Logo / Wordmark */}
            <div className="mb-4">
              <span className="text-xl sm:text-2xl font-black tracking-widest uppercase text-white font-mono inline-block border-b-2 border-bht-red pb-1">
                BHT COLLECTIONS
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-normal tracking-tight leading-[1.18] mb-4 max-w-xl">
              {language === "ar"
                ? "صناعة الراحة والفخامة لأكثر من 100,000 منزل وعائلة."
                : "Designing a lifestyle of comfort for +100,000 homes and travelers."}
            </h2>

            {/* Star Rating Strip */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>
              <span className="text-xs text-neutral-400 font-semibold">
                {language === "ar" ? "4.9/5 تقييم الجودة ورضا العملاء" : "4.9/5 Verified Quality Rating"}
              </span>
            </div>

            {/* Narrative Paragraph */}
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed max-w-lg mb-8 font-normal">
              {language === "ar"
                ? "تعتبر بي إتش تي كوليكشنز الوجهة المفضلة في دولة الإمارات لأسلوب الحياة الراقي، حيث يثق بنا آلاف العملاء والفنادق الكبرى. رسالتنا اليوم هي منحك الراحة المتكاملة، المتانة العالية، والتصميم العصري الأنيق عبر تشكيلاتنا المبتكرة من المفروشات الفاخرة وحقائب السفر والأحذية المريحة."
                : "BHT Collections is the Emirates' premier destination for everyday luxury. Trusted by more than 100,000 customers, our modern collections give you complete control of comfort, resilience, and style across fine bedding, travel luggage, and footwear."}
            </p>

            {/* CTA Button Link */}
            <div>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-white hover:text-bht-red group transition-colors"
              >
                <span>{language === "ar" ? "استكشف التشكيلات الحالية" : "EXPLORE THE COLLECTIONS"}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
