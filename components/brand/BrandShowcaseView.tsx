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
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#0B131F]" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* =========================================================
            1. BREADCRUMBS
        ========================================================= */}
        <div className="border-b border-[#F2EBDC] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-[#64748B] overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                {isAr ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <Link href="/brands" className="hover:text-[#D4AF37] transition-colors">
                {isAr ? "العلامات التجارية" : "Brands"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <span className="text-[#0B131F] font-bold truncate max-w-[200px] sm:max-w-[320px]">
                {brand.name}
              </span>
            </nav>
          </div>
        </div>

        {/* =========================================================
            2. BRAND HERO SHOWROOM BANNER
        ========================================================= */}
        <div className="border-b border-[#F2EBDC] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Brand Info Left */}
              <div className="flex items-start gap-4 sm:gap-6 min-w-0">
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white border border-[#E8DFC8] shadow-sm p-3 overflow-hidden shrink-0">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain p-2"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-lg text-[#0B131F]">
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full">
                      {isAr ? "وكيل وموزع معتمد" : "Official BHT Authorized Brand"}
                    </span>
                    {brand.category && (
                      <span className="text-[10px] font-bold text-[#64748B] bg-[#FAF8F5] border border-[#E8DFC8] px-2 py-0.5 rounded-full capitalize">
                        {brand.category}
                      </span>
                    )}
                  </div>

                  <h1
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B131F] tracking-tight"
                    style={{ fontFamily: "var(--font-playfair-display)" }}
                  >
                    {brand.name}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
                    {brand.description ||
                      (isAr
                        ? `استكشف المنتجات الأصلية عالية الجودة من علامة ${brand.name} الموزعة رسمياً عبر بيت البطانيات للتجارة ذ.م.م في الإمارات والخليج.`
                        : `Explore authentic export-grade products from ${brand.name}, officially distributed by Blanket House Trading LLC across UAE and the GCC.`)}
                  </p>
                </div>
              </div>

              {/* Action Buttons Right (PDF Download + Wholesale Inquiry) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                {/* PDF Catalog Download Button */}
                {brand.pdfUrl ? (
                  <a
                    href={brand.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-5 py-3 bg-[#0B131F] hover:bg-black text-[#D4AF37] border border-[#0B131F] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all text-center"
                  >
                    <FileDown className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isAr ? "تحميل كتالوج العلامة (PDF)" : "Download Brand Catalog (PDF)"}</span>
                  </a>
                ) : (
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-[#FAF8F5] hover:bg-[#F2EBDC] text-[#0B131F] border border-[#E8DFC8] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all text-center"
                  >
                    <FileDown className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isAr ? "طلب الكتالوج بصيغة PDF" : "Request PDF Catalog"}</span>
                  </a>
                )}

                {/* Direct WhatsApp Wholesale Inquiry */}
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all text-center"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isAr ? "استفسار توريد وتوزيع" : "Wholesale Inquiry"}</span>
                </a>
              </div>

            </div>

            {/* Trust Perks Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#F2EBDC]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B131F]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{isAr ? "منتجات أصلية 100%" : "100% Genuine Guaranteed"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B131F]">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{isAr ? "شحن سريع لكافة دول الخليج" : "Express GCC Shipping"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B131F]">
                <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{isAr ? "أسعار جملة وتصدير" : "Wholesale & Container Logistics"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B131F]">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{isAr ? "معايير فندقية راقية" : "Hospitality Grade Quality"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            3. BRAND PRODUCTS GRID
        ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F2EBDC]">
            <h2 className="text-base sm:text-lg font-bold text-[#0B131F] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#D4AF37]" />
              <span>{isAr ? `منتجات ${brand.name}` : `${brand.name} Catalog & Products`}</span>
              <span className="text-xs font-bold text-[#64748B] bg-[#FAF8F5] border border-[#E8DFC8] px-2 py-0.5 rounded-full">
                {products.length > 0
                  ? `${products.length} ${isAr ? "منتج" : "items"}`
                  : (isAr ? "قريباً" : "Launching Soon")}
              </span>
            </h2>

            <Link
              href="/brands"
              className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              <span>{isAr ? "جميع العلامات" : "View All Brands"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 sm:p-16 bg-white rounded-3xl border border-[#E8DFC8] text-center space-y-5 max-w-xl mx-auto shadow-sm">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-[#FAF8F5] to-[#F5EEDC] border border-[#E8DFC8] mx-auto flex items-center justify-center shadow-xs">
                <Package className="w-9 h-9 text-[#D4AF37]" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37]"></span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#0B131F] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isAr ? "إطلاق مرتقب" : "Coming Soon"}</span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-bold text-[#0B131F] tracking-tight"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  {isAr ? "منتجات هذه العلامة ستتوفر قريباً" : "Products Will Launch Soon"}
                </h3>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-md mx-auto">
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isAr ? "استفسار مسبق عن التوفر بالجملة" : "Inquire Advance Wholesale"}</span>
                </a>

                <Link
                  href="/brands"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FAF8F5] hover:bg-[#F2EBDC] text-[#0B131F] border border-[#E8DFC8] rounded-xl text-xs sm:text-sm font-bold transition-all"
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
