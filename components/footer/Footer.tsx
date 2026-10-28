"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="w-full bg-[#111111] text-white pt-10 pb-8 border-t border-neutral-800 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN MINIMAL ROW: BRAND IDENTITY + ESSENTIAL LINKS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800/80">
          {/* Brand Logo & Name Lockup */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-white rounded-lg p-1 shrink-0 shadow-xs">
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
              <span className="text-sm sm:text-base font-extrabold text-white tracking-tight block">
                Blanket House Trading LLC
              </span>
            </div>
          </Link>

          {/* Minimal Essential Navigation Links */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-neutral-400">
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  {language === "ar" ? "التشكيلات" : "Collections"}
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  {language === "ar" ? "علاماتنا التجارية" : "Brands"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {language === "ar" ? "من نحن" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {language === "ar" ? "تواصل معنا" : "Contact"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* BOTTOM MINIMAL LEGAL BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center sm:text-start">
            © {new Date().getFullYear()} Blanket House Trading LLC. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

          <div className="flex items-center gap-4 text-neutral-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <span className="text-neutral-700">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {language === "ar" ? "الشروط والأحكام" : "Terms"}
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
