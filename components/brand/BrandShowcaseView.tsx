"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ProductCard } from "@/components/collection/ProductCard";
import { QuickViewModal } from "@/components/collection/QuickViewModal";
import { useLanguage } from "@/context/LanguageContext";
import { Product } from "@/data/productsData";
import {
  FileDown,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Truck,
  Building2,
  Package,
  Sparkles,
} from "lucide-react";

interface BrandData {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  logo?: string;
  image?: string;
  pdfUrl?: string;
  description?: string;
}

interface BrandShowcaseViewProps {
  brand: BrandData;
  products: Product[];
}

export const BrandShowcaseView: React.FC<BrandShowcaseViewProps> = ({ brand, products }) => {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const whatsappInquiryUrl = `https://wa.me/971558879237?text=${encodeURIComponent(
    `Hello BHT Collections! I am inquiring about products and wholesale distribution for: *${brand.name}*. Please share your catalog and bulk export pricing.`
  )}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#171717]" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* =========================================================
            1. BREADCRUMBS
        ========================================================= */}
        <div className="border-b border-[#ededeb] bg-white">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-3">
            <nav aria-label={isAr ? "مسار التنقل" : "Breadcrumb"} className="flex items-center gap-1.5 text-xs text-[#737373] overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link href="/" className="hover:text-[#b32025] transition-colors">
                {isAr ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight className="rtl:rotate-180 w-3.5 h-3.5 shrink-0 text-gray-400" />
              <Link href="/brands" className="hover:text-[#b32025] transition-colors">
                {isAr ? "العلامات التجارية" : "Brands"}
              </Link>
              <ChevronRight className="rtl:rotate-180 w-3.5 h-3.5 shrink-0 text-gray-400" />
              <span className="text-[#171717] font-bold truncate max-w-[200px] sm:max-w-[320px]">
                {brand.name}
              </span>
            </nav>
          </div>
        </div>

        {/* =========================================================
            2. BRAND HERO SHOWROOM BANNER
        ========================================================= */}
        <div className="border-b border-[#ededeb] bg-[#f7f6f3]">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] items-center gap-8 lg:gap-14">
              
              {/* Brand Info Left */}
              <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 min-w-0">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl bg-white border border-[#e5e5e5] p-3 overflow-hidden shrink-0">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain p-4"
                      sizes="128px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-lg text-[#171717]">
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                      {isAr ? "وكيل وموزع معتمد" : "Official BHT Authorized Brand"}
                    </span>
                    {brand.category && (
                      <span className="text-xs text-neutral-500 border-s border-neutral-300 ps-3 capitalize">
                        {brand.category}
                      </span>
                    )}
                  </div>

                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#171717] tracking-tight break-words"
                  >
                    {brand.name}
                  </h1>

                  <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-7 whitespace-pre-line">
                    {brand.description ||
                      (isAr
                        ? `استكشف المنتجات الأصلية عالية الجودة من علامة ${brand.name} الموزعة رسمياً عبر بيت البطانيات للتجارة ذ.م.م في الإمارات والخليج.`
                        : `Explore authentic export-grade products from ${brand.name}, officially distributed by Blanket House Trading LLC across UAE and the GCC.`)}
                  </p>
                </div>
              </div>

              {/* Action Buttons Right (PDF Download + Wholesale Inquiry) */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 w-full lg:w-60">
                {/* PDF Catalog Download Button */}
                {brand.pdfUrl ? (
                  <a
                    href={brand.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-5 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-colors text-center"
                  >
                    <FileDown className="w-4 h-4 text-[#b32025]" />
                    <span>{isAr ? "تحميل كتالوج العلامة (PDF)" : "Download Brand Catalog (PDF)"}</span>
                  </a>
                ) : (
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-[#f7f6f3] hover:bg-[#ededeb] text-[#171717] border border-[#e5e5e5] rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-all text-center"
                  >
                    <FileDown className="w-4 h-4 text-[#b32025]" />
                    <span>{isAr ? "طلب الكتالوج بصيغة PDF" : "Request PDF Catalog"}</span>
                  </a>
                )}

                {/* Direct WhatsApp Wholesale Inquiry */}
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#166534] hover:bg-[#14532d] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "استفسار توريد وتوزيع" : "Wholesale Inquiry"}</span>
                </a>
              </div>

            </div>

            {/* Trust Perks Strip */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 pt-7 mt-10 sm:mt-12 border-t border-[#ededeb]">
              <div className="flex items-center gap-2 text-xs font-normal text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-[#b32025] shrink-0" />
                <span>{isAr ? "منتجات أصلية 100%" : "100% Genuine Guaranteed"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-normal text-neutral-600">
                <Truck className="w-4 h-4 text-[#b32025] shrink-0" />
                <span>{isAr ? "شحن سريع لكافة دول الخليج" : "Express GCC Shipping"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-normal text-neutral-600">
                <Building2 className="w-4 h-4 text-[#b32025] shrink-0" />
                <span>{isAr ? "أسعار جملة وتصدير" : "Wholesale & Container Logistics"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-normal text-neutral-600">
                <Sparkles className="w-4 h-4 text-[#b32025] shrink-0" />
                <span>{isAr ? "معايير فندقية راقية" : "Hospitality Grade Quality"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. BRAND PRODUCTS GRID
        ========================================================= */}
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 pb-6 border-b border-[#ededeb]">
            <h2 className="text-2xl sm:text-3xl font-medium text-neutral-900 flex flex-wrap items-center gap-x-4 gap-y-3">
              <span>{isAr ? `منتجات ${brand.name}` : `${brand.name} Catalog & Products`}</span>
              <span className="text-xs font-normal text-neutral-500 whitespace-nowrap">
                {products.length > 0
                  ? `${products.length} ${isAr ? "منتج" : "items"}`
                  : (isAr ? "قريباً" : "Launching Soon")}
              </span>
            </h2>

            <Link
              href="/brands"
              className="text-sm font-medium text-neutral-600 hover:text-bht-red flex shrink-0 items-center gap-1"
            >
              <span>{isAr ? "جميع العلامات" : "View All Brands"}</span>
              <ChevronRight className="rtl:rotate-180 w-3.5 h-3.5" />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-14 bg-[#f7f6f3] rounded-2xl sm:rounded-3xl text-center space-y-6 max-w-2xl mx-auto">
              <div className="relative w-20 h-20 rounded-2xl bg-white border border-[#e5e5e5] mx-auto flex items-center justify-center">
                <Package className="w-9 h-9 text-[#b32025]" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-neutral-500 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#b32025]" />
                  <span>{isAr ? "إطلاق مرتقب" : "Coming Soon"}</span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-bold text-[#171717] tracking-tight"
                >
                  {isAr ? "منتجات هذه العلامة ستتوفر قريباً" : "Products Will Launch Soon"}
                </h3>

                <p className="text-sm sm:text-base text-neutral-600 leading-7 max-w-lg mx-auto">
                  {isAr
                    ? `نعمل حالياً على تجهيز وإضافة التشكيلة الرسمية والكتالوج الكامل لمنتجات علامة ${brand.name}. يمكنكم التواصل المباشر معنا لتأكيد التوفر المسبق وقوائم أسعار الجملة والتصدير.`
                    : `We are currently curating and preparing the official product collection for ${brand.name}. Products will launch soon. Contact our distribution team for advance wholesale bookings and catalog requests.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#166534] hover:bg-[#14532d] text-white rounded-xl text-sm font-medium shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? "استفسار مسبق عن التوفر بالجملة" : "Inquire Advance Wholesale"}</span>
                </a>

                <Link
                  href="/brands"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#f7f6f3] hover:bg-[#ededeb] text-[#171717] border border-[#e5e5e5] rounded-xl text-sm font-medium transition-all"
                >
                  <span>{isAr ? "استكشاف العلامات الأخرى" : "Explore Other Brands"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
