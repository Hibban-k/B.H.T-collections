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
        {/* TOP ROW: LOGO & NAME (WHITE BG + RADIUS) + CATEGORIES & QUICK LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-neutral-800/80 items-start">
          {/* BRAND PILL: White background with rounded border radius */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <Link
              href="/"
              className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 px-4 sm:px-5 shadow-sm inline-flex items-center gap-3 transition-transform hover:scale-[1.02]"
            >
              <div className="relative w-10 h-10 bg-white rounded-lg p-0.5 shrink-0">
                <Image
                  src="/logo/logo.png"
                  alt="Blanket House Trading LLC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-bht-red block font-arabic leading-tight">
                  بيت البطانيات للتجارة ذ.م.م
                </span>
                <span className="text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight block">
                  Blanket House Trading LLC
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mt-1">
              {language === "ar"
                ? "الوجهة الرائدة للمفروشات الفاخرة، وحقائب السفر، وأحذية الراحة في دبي وكافة أنحاء الإمارات."
                : "Premier luxury bedding, travel luggage, and comfort footwear house based in Dubai, UAE."}
            </p>
          </div>

          {/* MAIN CATEGORIES */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              {language === "ar" ? "التشكيلات الرئيسية" : "Main Categories"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
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
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
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
