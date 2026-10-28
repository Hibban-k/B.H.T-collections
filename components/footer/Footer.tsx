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
          {/* BRAND CARD: Designed exactly like the official corporate business card */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col items-start w-full">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-sm border border-neutral-200/70 w-full relative overflow-hidden flex flex-col justify-between">
              
              {/* TOP ROW: Contact & Representative on Left, Official Logo on Right */}
              <div className="flex items-start justify-between gap-4">
                {/* Person & Contact Details */}
                <div className="flex flex-col text-start">
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-bht-red leading-tight">
                    Syed Mohamed Umais
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-900 font-semibold mt-0.5 mb-2">
                    Sales & Marketing
                  </span>

                  {/* Direct Mobile */}
                  <a
                    href="tel:+971558879237"
                    className="flex items-center gap-2 text-xs sm:text-[13px] text-neutral-800 font-medium hover:text-bht-red transition-colors mb-2 group"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-bht-red shrink-0" />
                    <span dir="ltr" className="tracking-wide group-hover:underline">+971 55 887 9237</span>
                  </a>

                  {/* Office Phone, Fax, Email */}
                  <div className="space-y-1 text-xs sm:text-[13px] text-neutral-800 font-medium">
                    <a
                      href="tel:+97142266095"
                      className="flex items-center gap-2 hover:text-bht-red transition-colors group"
                    >
                      <Phone className="w-3.5 h-3.5 text-bht-red shrink-0" />
                      <span dir="ltr" className="tracking-wide group-hover:underline">+971 4 226 6095</span>
                    </a>

                    <div className="flex items-center gap-2 text-neutral-700">
                      <Printer className="w-3.5 h-3.5 text-bht-red shrink-0" />
                      <span dir="ltr" className="tracking-wide">+971 4 226 6195</span>
                    </div>

                    <a
                      href="mailto:bhtrdg@eim.ae"
                      className="flex items-center gap-2 hover:text-bht-red transition-colors group"
                    >
                      <Mail className="w-3.5 h-3.5 text-bht-red shrink-0" />
                      <span dir="ltr" className="tracking-wide group-hover:underline">bhtrdg@eim.ae</span>
                    </a>
                  </div>
                </div>

                {/* Official Butterfly Logo on Top Right */}
                <Link
                  href="/"
                  className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 shrink-0 transition-transform hover:scale-105"
                  title="Blanket House Trading LLC"
                >
                  <Image
                    src="/logo/logo.png"
                    alt="Blanket House Trading LLC Logo"
                    fill
                    className="object-contain"
                  />
                </Link>
              </div>

              {/* HORIZONTAL MULTI-COLOR DIVIDER (Green | Red | Blue | Charcoal) */}
              <div className="w-full flex h-[2.5px] rounded-full overflow-hidden my-5" aria-hidden="true">
                <span className="w-1/4 bg-[#26964B]" />
                <span className="w-1/4 bg-[#E52B25]" />
                <span className="w-1/4 bg-[#258CCB]" />
                <span className="w-1/4 bg-[#1F2937]" />
              </div>

              {/* BOTTOM ROW: Centered Arabic & English Company Titles */}
              <div className="flex flex-col items-center justify-center text-center">
                <Link href="/" className="group inline-flex flex-col items-center">
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-bht-red font-arabic leading-snug">
                    بيت البطانيات للتجارة (ذ.م.م.)
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl font-black text-neutral-900 tracking-wide leading-snug mt-0.5">
                    Blanket House Trading LLC
                  </span>
                </Link>
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
