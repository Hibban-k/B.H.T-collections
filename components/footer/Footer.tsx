"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="w-full bg-[#111111] text-white pt-12 pb-8 border-t border-neutral-800 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: BRAND CARD (ELEVATED WHITE CONTAINER WITH INCREASED HEIGHT) + CATEGORIES & QUICK LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-neutral-800/80 items-stretch">
          {/* BRAND PILL: Full white section with increased height, generous padding, and prominent branding */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-7 sm:p-8 lg:p-9 shadow-sm border border-neutral-200/40 w-full max-w-md min-h-[230px] sm:min-h-[260px] lg:min-h-[280px] flex flex-col justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-4 sm:gap-5 group mb-4 transition-transform hover:scale-[1.01]"
              >
                {/* Prominent Logo */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                  <Image
                    src="/logo/logo.png"
                    alt="Blanket House Trading LLC Logo"
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Prominent Name Typography */}
                <div className="flex flex-col text-start">
                  <span className="text-xs sm:text-sm font-bold text-bht-red block font-arabic leading-tight">
                    بيت البطانيات للتجارة ذ.م.م
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight block leading-tight mt-1">
                    Blanket House Trading LLC
                  </span>
                </div>
              </Link>

              {/* Tagline nested inside with generous vertical spacing */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal pt-4 border-t border-neutral-100">
                {language === "ar"
                  ? "الوجهة الرائدة للمفروشات الفاخرة، وحقائب السفر، وأحذية الراحة في دبي وكافة أنحاء الإمارات."
                  : "Premier luxury bedding, travel luggage, and comfort footwear house based in Dubai, UAE."}
              </p>
            </div>
          </div>

          {/* MAIN CATEGORIES */}
          <div className="md:col-span-4 space-y-3.5 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              {language === "ar" ? "التشكيلات الرئيسية" : "Main Categories"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link href="/collections/bedding" className="hover:text-white transition-colors">
                  {language === "ar" ? "المفروشات الفاخرة واللحف" : "Luxury Bedding & Quilts"}
                </Link>
              </li>
              <li>
                <Link href="/collections/travel-bags" className="hover:text-white transition-colors">
                  {language === "ar" ? "حقائب السفر ومستلزمات الرحلات" : "Travel Bags & Luggage"}
                </Link>
              </li>
              <li>
                <Link href="/collections/footwear" className="hover:text-white transition-colors">
                  {language === "ar" ? "أحذية الراحة اليومية" : "Comfort Everyday Footwear"}
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3 space-y-3.5 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  {language === "ar" ? "كافة التشكيلات" : "All Collections"}
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  {language === "ar" ? "العلامات التجارية" : "Our Brands"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {language === "ar" ? "من نحن" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {language === "ar" ? "تواصل معنا" : "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT + LEGAL PAGES (Privacy Policy, Refund Policy, Terms) */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center md:text-start">
            © {new Date().getFullYear()} Blanket House Trading LLC. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

          {/* Legal Pages & Language Toggle */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-neutral-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <span className="text-neutral-700">•</span>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              {language === "ar" ? "سياسة الاسترجاع والاسترداد" : "Refund & Return Policy"}
            </Link>
            <span className="text-neutral-700">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>
            <span className="text-neutral-700">•</span>
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="hover:text-white font-bold transition-colors cursor-pointer"
            >
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
