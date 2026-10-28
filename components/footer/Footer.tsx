"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Smartphone, Printer, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="w-full bg-[#111111] text-white pt-12 pb-8 border-t border-neutral-800 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: CORPORATE BUSINESS CARD + CATEGORIES & QUICK LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-neutral-800/80 items-stretch">
          {/* BRAND PILL / OFFICIAL BUSINESS CARD SECTION */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col items-start w-full">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-sm border border-neutral-200/60 w-full relative overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-4 items-center">
                {/* LEFT / BRANDING COLUMN */}
                <div className="sm:col-span-6 flex flex-col justify-between">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-3.5 sm:gap-4 group transition-transform hover:scale-[1.01]"
                  >
                    {/* Official Butterfly Logo */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0">
                      <Image
                        src="/logo/logo.png"
                        alt="Blanket House Trading LLC Logo"
                        fill
                        className="object-contain transition-transform group-hover:scale-105"
                      />
                    </div>

                    {/* Official Arabic & English Company Titles */}
                    <div className="flex flex-col text-start">
                      <span className="text-xs sm:text-sm font-bold text-bht-red block font-arabic leading-tight">
                        بيت البطانيات للتجارة (ذ.م.م.)
                      </span>
                      <span className="text-base sm:text-lg lg:text-xl font-black text-neutral-900 tracking-tight block leading-tight mt-1">
                        Blanket House Trading LLC
                      </span>
                    </div>
                  </Link>

                  {/* Concise Description */}
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal pt-4 mt-2 border-t border-neutral-100">
                    {language === "ar"
                      ? "الوجهة الرائدة للمفروشات الفاخرة، وحقائب السفر، وأحذية الراحة في دبي وكافة أنحاء الإمارات."
                      : "Premier luxury bedding, travel luggage, and comfort footwear house based in Dubai, UAE."}
                  </p>
                </div>

                {/* MIDDLE TRI-COLOR SEPARATOR (Green | Red | Blue from the BHT Petals) */}
                {/* Desktop / Tablet Vertical Stripe */}
                <div className="hidden sm:flex sm:col-span-1 justify-center py-2" aria-hidden="true">
                  <div className="flex flex-col w-[2.5px] h-32 rounded-full overflow-hidden">
                    <span className="h-1/3 bg-[#26964B]" />
                    <span className="h-1/3 bg-[#E52B25]" />
                    <span className="h-1/3 bg-[#258CCB]" />
                  </div>
                </div>

                {/* Mobile Horizontal Stripe */}
                <div className="sm:hidden w-full flex h-[2.5px] rounded-full overflow-hidden" aria-hidden="true">
                  <span className="w-1/3 bg-[#26964B]" />
                  <span className="w-1/3 bg-[#E52B25]" />
                  <span className="w-1/3 bg-[#258CCB]" />
                </div>

                {/* RIGHT / OFFICIAL CARD CONTACT DETAILS & REPRESENTATIVE */}
                <div className="sm:col-span-5 flex flex-col justify-center space-y-3">
                  {/* Representative Info */}
                  <div className="border-b border-neutral-100 pb-2">
                    <h4 className="text-sm sm:text-base font-bold text-bht-red leading-tight">
                      Syed Mohamed Umais
                    </h4>
                    <p className="text-xs text-neutral-800 font-semibold mt-0.5">
                      Sales & Marketing
                    </p>
                  </div>

                  {/* Direct Contact Details with Red Icons Matching Physical Card */}
                  <div className="space-y-1.5 text-xs text-neutral-700 font-medium">
                    <a
                      href="tel:+971558879237"
                      className="flex items-center gap-2.5 hover:text-bht-red transition-colors group/item"
                      title="Mobile"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-bht-red shrink-0" />
                      <span dir="ltr" className="tracking-wide group-hover/item:underline">+971 55 887 9237</span>
                    </a>

                    <a
                      href="tel:+97142266095"
                      className="flex items-center gap-2.5 hover:text-bht-red transition-colors group/item"
                      title="Telephone"
                    >
                      <Phone className="w-3.5 h-3.5 text-bht-red shrink-0" />
                      <span dir="ltr" className="tracking-wide group-hover/item:underline">+971 4 226 6095</span>
                    </a>

                    <div className="flex items-center gap-2.5 text-neutral-600" title="Fax">
                      <Printer className="w-3.5 h-3.5 text-bht-red shrink-0" />
                      <span dir="ltr" className="tracking-wide">+971 4 226 6195</span>
                    </div>

                    <a
                      href="mailto:bhtrdg@eim.ae"
                      className="flex items-center gap-2.5 hover:text-bht-red transition-colors group/item"
                      title="Email"
                    >
                      <Mail className="w-3.5 h-3.5 text-bht-red shrink-0" />
                      <span dir="ltr" className="tracking-wide group-hover/item:underline">bhtrdg@eim.ae</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CATEGORIES */}
          <div className="md:col-span-3 lg:col-span-3 space-y-3.5 pt-2">
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
          <div className="md:col-span-2 lg:col-span-2 space-y-3.5 pt-2">
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
