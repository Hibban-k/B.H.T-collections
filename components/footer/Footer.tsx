"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { CircularFlag } from "@/components/regional-presence/CircularFlag";
import { useLanguage } from "@/context/LanguageContext";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="w-full bg-bht-charcoal text-white pt-16 pb-10 border-t border-gray-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: 4 MAIN COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          {/* COL 1: Brand Identity & Introduction (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-lg p-1 shrink-0">
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
                <span className="text-sm font-black text-white tracking-tight block">
                  BHT Collections
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm">
              {language === "ar"
                ? "نقدم الراحة والجودة والمنتجات الموثوقة لأسلوب حياتك اليومي. استكشف تشكيلاتنا المختارة بعناية من المفروشات وحقائب السفر والأحذية."
                : "Bringing comfort, quality and trusted products to your everyday lifestyle. Explore our carefully selected collections of bedding, travel bags and footwear."}
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-bht-red flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-bht-red flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-bht-red flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 2: Shop Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold tracking-widest uppercase text-white mb-4">
              {language === "ar" ? "التسوق" : "SHOP"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="/collections/bedding" className="hover:text-white transition-colors">
                  {language === "ar" ? "المفروشات" : "Bedding"}
                </Link>
              </li>

              <li>
                <Link href="/collections/travel-bags" className="hover:text-white transition-colors">
                  {language === "ar" ? "حقائب السفر" : "Travel Bags"}
                </Link>
              </li>
              <li>
                <Link href="/collections/footwear" className="hover:text-white transition-colors">
                  {language === "ar" ? "الأحذية" : "Footwear"}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: Company Navigation (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold tracking-widest uppercase text-white mb-4">
              {language === "ar" ? "عن الشركة" : "ABOUT BHT"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {language === "ar" ? "من نحن" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  {language === "ar" ? "علاماتنا التجارية" : "Our Brands"}
                </Link>
              </li>
              <li>
                <Link href="/distributors" className="hover:text-white transition-colors">
                  {language === "ar" ? "موزعونا المعتمدون" : "Our Distributors"}
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  {language === "ar" ? "العلامات والعملاء" : "Brand & Clients"}
                </Link>
              </li>
              <li>
                <Link href="#regional" className="hover:text-white transition-colors">
                  {language === "ar" ? "تواجدنا الإقليمي" : "Our Regional Presence"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {language === "ar" ? "اتصل بنا" : "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: Customer Support & Schedule (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold tracking-widest uppercase text-white mb-4">
              {language === "ar" ? "خدمة العملاء" : "CUSTOMER SUPPORT"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  {language === "ar" ? "الشحن والتوصيل" : "Shipping & Delivery"}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  {language === "ar" ? "الإرجاع والاستبدال" : "Returns & Exchanges"}
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-white transition-colors">
                  {language === "ar" ? "تتبع الطلبات" : "Order Tracking"}
                </Link>
              </li>
            </ul>

            {/* Confirmed Business Hours */}
            <div className="pt-3 border-t border-gray-800">
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <Clock className="w-4 h-4 text-bht-red shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {language === "ar" ? "أوقات العمل الرسمية:" : "Business Hours:"}
                  </span>
                  <span>
                    {language === "ar"
                      ? "الإثنين - السبت: 10 ص - 6 م بتوقيت الإمارات"
                      : "Mon - Sat: 10 AM - 6 PM UAE Time"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: DIRECT WHATSAPP CONTACT */}
        <div className="py-7 border-b border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Direct WhatsApp Contact Section */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                {language === "ar" ? "تواصل مباشر عبر واتساب" : "Direct WhatsApp Contact"}
              </h5>
              <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{language === "ar" ? "متاح الآن" : "Active Now"}</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-3.5">
              {language === "ar"
                ? "للطلبات الفورية، كتالوج المنتجات، والتواصل المباشر مع فريق المبيعات والتوزيع في الإمارات."
                : "For wholesale orders, catalogs, and instant support, chat directly with our UAE team."}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <a
                href={`https://wa.me/971558879237?text=${encodeURIComponent(
                  language === "ar"
                    ? "مرحباً بي إتش تي كوليكشنز (بيت البطانيات للتجارة)، أود الاستفسار عن منتجاتكم وتشكيلاتكم."
                    : "Hello BHT Collections (Blanket House Trading LLC), I would like to inquire about your collections and products."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-[#25D366]/20 hover:scale-[1.02] active:scale-[0.98] group"
              >
                {/* Official WhatsApp SVG Icon */}
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="transition-transform duration-200 group-hover:scale-110"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>{language === "ar" ? "تواصل عبر واتساب" : "CHAT ON WHATSAPP"}</span>
              </a>

              <a
                href="https://wa.me/971558879237"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="inline-flex items-center justify-center font-mono text-xs font-semibold text-gray-300 hover:text-white bg-gray-900 hover:bg-gray-800 px-3.5 py-2.5 rounded-lg border border-gray-800 transition-colors"
              >
                +971 55 887 9237
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2026 BHT Collections (Blanket House Trading LLC). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <span className="text-gray-700">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>
            <span className="text-gray-700">•</span>
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="hover:text-white font-bold transition-colors"
            >
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
