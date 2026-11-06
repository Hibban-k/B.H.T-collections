"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  Phone,
  Share2,
  Copy,
  Check,
  ChevronRight,
  Layers,
  Tag,
  Box,
  Sparkles,
  Plus,
  Heart,
  Eye,
  SlidersHorizontal,
  PackageCheck,
  BadgeCheck,
  Building2,
  HelpCircle,
} from "lucide-react";

interface ProductVariant {
  name: string;
  sku?: string;
  size?: string;
  color?: string;
  price?: number;
  salePrice?: number;
  stock?: number;
  image?: string;
}

interface ProductData {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  category: string;
  categorySlug: string;
  subcategoryId?: string | null;
  subcategorySlug?: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  sizes: string[];
  colors: string[];
  materials: string[];
  variants?: ProductVariant[];
  stock: number;
  badge?: string;
  featured: boolean;
  bestseller: boolean;
  crossSellSlugs?: string[];
  brand?: any;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

interface ProductDetailViewProps {
  product: ProductData;
  crossSellProducts?: ProductData[];
  relatedProducts?: ProductData[];
  brand?: any;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  crossSellProducts = [],
  relatedProducts = [],
  brand,
}) => {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  // Build full gallery array with primary image first
  const allImages = useMemo(() => {
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list.length > 0 ? list : ["/collections/korean-super-soft-blanket.png"];
  }, [product.image, product.images]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "shipping">("overview");
  const [copiedLink, setCopiedLink] = useState(false);

  // Cross-sell selection state (all checked by default)
  const [bundleChecked, setBundleChecked] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    crossSellProducts.forEach((p) => {
      initial[p.slug] = true;
    });
    return initial;
  });

  // Calculate active price and stock based on selected variant or base product
  const activeVariant =
    selectedVariantIndex !== null && product.variants && product.variants[selectedVariantIndex]
      ? product.variants[selectedVariantIndex]
      : null;

  const currentPrice = activeVariant?.salePrice || activeVariant?.price || product.salePrice || product.price;
  const originalPrice =
    activeVariant?.price && activeVariant?.salePrice
      ? activeVariant.price
      : product.originalPrice || (product.salePrice ? product.price : undefined);
  const discountPercent =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null;

  const currentSku = activeVariant?.sku || product.sku || `BHT-${product.slug.slice(0, 6).toUpperCase()}`;
  const currentStock = activeVariant?.stock !== undefined ? activeVariant.stock : product.stock;
  const isOutOfStock = currentStock <= 0;

  // Handle variant selection
  const handleSelectVariant = (index: number) => {
    setSelectedVariantIndex(index);
    const variant = product.variants?.[index];
    if (variant?.size) setSelectedSize(variant.size);
    if (variant?.color) setSelectedColor(variant.color);
    if (variant?.image) {
      const imgIdx = allImages.findIndex((img) => img === variant.image);
      if (imgIdx >= 0) {
        setActiveImageIndex(imgIdx);
      }
    }
  };

  // WhatsApp order builder
  const buildWhatsAppLink = (customText?: string) => {
    const phoneNumber = "971558879237";
    const currentUrl = typeof window !== "undefined" ? window.location.href : `https://www.blankethouse.ae/products/${product.slug}`;
    const text =
      customText ||
      `Hello BHT Collections! I am interested in ordering:
*${product.name}*
- SKU: ${currentSku}
- Price: AED ${currentPrice}
${selectedSize ? `- Size: ${selectedSize}` : ""}
${selectedColor ? `- Color: ${selectedColor}` : ""}
- Quantity: ${quantity}
- URL: ${currentUrl}

Please confirm availability and delivery timeframe across UAE/GCC.`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  // Bundle pricing calculation
  const bundleTotalPrice = useMemo(() => {
    let total = currentPrice;
    crossSellProducts.forEach((item) => {
      if (bundleChecked[item.slug]) {
        total += item.salePrice || item.price;
      }
    });
    return total;
  }, [currentPrice, crossSellProducts, bundleChecked]);

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription || product.description?.slice(0, 100),
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const brandName = brand?.name || (typeof product.brand === "object" ? product.brand?.name : product.brand) || "BHT Collections";
  const brandLogo = brand?.logo || (typeof product.brand === "object" ? product.brand?.logo : null);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#0B131F]" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* =========================================================
            1. BREADCRUMBS ROW (Amazon / Flipkart Style)
        ========================================================= */}
        <div className="border-b border-[#F2EBDC] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-[#64748B] overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                {isAr ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <Link href="/collections" className="hover:text-[#D4AF37] transition-colors">
                {isAr ? "المجموعات" : "Collections"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <Link
                href={`/collections/${product.categorySlug || "bedding"}`}
                className="hover:text-[#D4AF37] transition-colors capitalize font-medium text-[#0B131F]"
              >
                {product.category}
              </Link>
              {product.subcategorySlug && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span className="capitalize">{product.subcategorySlug.replace(/-/g, " ")}</span>
                </>
              )}
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <span className="text-[#0B131F] font-bold truncate max-w-[200px] sm:max-w-[320px]">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* =========================================================
            2. PRODUCT HERO: GALLERY (LEFT) + BUY BOX (RIGHT)
        ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* ----------------- LEFT: GALLERY ----------------- */}
            <div className="lg:col-span-6 space-y-4">
              <div className="sticky top-24 space-y-3">
                {/* Main Preview Box */}
                <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl bg-white border border-[#E8DFC8] overflow-hidden shadow-xs group">
                  <Image
                    src={allImages[activeImageIndex] || "/collections/korean-super-soft-blanket.png"}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {discountPercent && (
                      <span className="bg-[#D4AF37] text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-sm">
                        {isAr ? `خصم ${discountPercent}%` : `${discountPercent}% OFF`}
                      </span>
                    )}
                    {product.featured && (
                      <span className="bg-[#0B131F] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>{isAr ? "مميز" : "BHT Featured"}</span>
                      </span>
                    )}
                    {product.bestseller && (
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                        {isAr ? "الأكثر مبيعاً" : "Bestseller"}
                      </span>
                    )}
                  </div>

                  {/* Top Right Share & Wishlist */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="p-2 bg-white/90 backdrop-blur-xs hover:bg-[#FAF8F5] border border-[#E8DFC8] rounded-full text-[#0B131F] shadow-xs transition-colors"
                      title={isAr ? "مشاركة الرابط" : "Share Product"}
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Authenticity Watermark Strip */}
                  <div className="absolute bottom-3 inset-x-4 bg-white/90 backdrop-blur-xs border border-[#E8DFC8] px-3 py-1.5 rounded-xl flex items-center justify-between text-[11px] font-semibold text-[#0B131F]">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      <span>{isAr ? "منتج أصلي موثق من BHT" : "100% Certified BHT Authentic"}</span>
                    </span>
                    <span className="text-[#64748B] text-[10px]">{currentSku}</span>
                  </div>
                </div>

                {/* Thumbnails Row */}
                {allImages.length > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border-2 overflow-hidden shrink-0 transition-all ${
                          activeImageIndex === idx
                            ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-xs"
                            : "border-[#E8DFC8] hover:border-gray-400 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`${product.name} - ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ----------------- RIGHT: PRODUCT SPECS & BUY BOX ----------------- */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Brand, Title & Rating Header */}
              <div className="space-y-2.5 pb-4 border-b border-[#F2EBDC]">
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href={`/brands`}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#D4AF37] text-xs font-bold text-[#0B131F] transition-colors"
                  >
                    {brandLogo && (
                      <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                        <Image src={brandLogo} alt={brandName} fill className="object-contain" />
                      </div>
                    )}
                    <span>{brandName}</span>
                    <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
                  </Link>

                  {/* Stock Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      isOutOfStock
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : currentStock < 15
                        ? "bg-amber-50 text-amber-800 border border-amber-300 animate-pulse"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-red-500" : currentStock < 15 ? "bg-amber-500" : "bg-emerald-500"}`} />
                    {isOutOfStock
                      ? isAr ? "غير متوفر حالياً" : "Out of Stock"
                      : currentStock < 15
                      ? isAr ? `متبقي ${currentStock} فقط!` : `Only ${currentStock} left in stock!`
                      : isAr ? "متوفر بالمخزون" : "In Stock"}
                  </span>
                </div>

                <h1
                  className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#0B131F] leading-tight"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  {product.name}
                </h1>

                {/* Rating & Reviews line (Amazon style) */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-amber-400/30 text-amber-400"
                        }`}
                      />
                    ))}
                    <span className="font-extrabold text-[#0B131F] ml-1">{product.rating || 5.0}</span>
                  </div>
                  <span className="text-[#64748B]">&bull;</span>
                  <span className="text-[#64748B] font-medium underline cursor-pointer">
                    {product.reviewCount || 12} {isAr ? "تقييم عملاء موثق" : "verified customer ratings"}
                  </span>
                  <span className="text-[#64748B]">&bull;</span>
                  <span className="font-mono text-[11px] text-[#64748B]">SKU: {currentSku}</span>
                </div>
              </div>

              {/* Price Block (Amazon / Flipkart Style) */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8DFC8] shadow-xs space-y-1.5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-[#0B131F] tracking-tight">
                    AED {currentPrice.toFixed(2)}
                  </span>
                  {originalPrice && originalPrice > currentPrice && (
                    <span className="text-sm sm:text-base text-[#64748B] line-through">
                      AED {originalPrice.toFixed(2)}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      {isAr ? `وفر ${discountPercent}%` : `Save ${discountPercent}%`}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  {isAr
                    ? "السعر شامل ضريبة القيمة المضافة. متاح خيارات التوزيع بالجملة والتصدير لدول الخليج."
                    : "Inclusive of 5% UAE VAT. Wholesale & export logistics available across GCC."}
                </p>
              </div>

              {/* Variants Selector (if present) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3 p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0B131F] uppercase tracking-wider text-[11px]">
                      {isAr ? "خيارات المنتج (المقاس / اللون)" : "Select Variant / Option"}
                    </span>
                    {activeVariant && (
                      <span className="text-[11px] text-[#D4AF37] font-semibold">
                        {activeVariant.name}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.variants.map((v, idx) => {
                      const isSelected = selectedVariantIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectVariant(idx)}
                          className={`p-2.5 rounded-xl border text-left transition-all relative ${
                            isSelected
                              ? "bg-white border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-xs"
                              : "bg-white/80 border-[#E8DFC8] hover:border-gray-400"
                          }`}
                        >
                          <p className="font-bold text-xs text-[#0B131F] truncate">{v.name}</p>
                          <p className="text-[11px] text-[#D4AF37] font-semibold mt-0.5">
                            AED {v.salePrice || v.price || product.price}
                          </p>
                          {v.stock !== undefined && v.stock <= 5 && (
                            <span className="text-[9px] text-amber-700 font-bold block mt-0.5">
                              {v.stock} left
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes & Colors Chips */}
              <div className="space-y-3">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                      {isAr ? "المقاسات المتوفرة" : "Available Sizes"}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            selectedSize === sz
                              ? "bg-[#0B131F] text-white border-[#0B131F] shadow-xs"
                              : "bg-white text-[#0B131F] border-[#E8DFC8] hover:border-gray-400"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                      {isAr ? "الألوان المتوفرة" : "Available Colors"}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => setSelectedColor(col)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                            selectedColor === col
                              ? "bg-[#0B131F] text-white border-[#0B131F] shadow-xs"
                              : "bg-white text-[#0B131F] border-[#E8DFC8] hover:border-gray-400"
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full border border-gray-300 bg-amber-700/80" />
                          <span>{col}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.materials && product.materials.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                      {isAr ? "الخامة والمواصفات" : "Fabric & Material"}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {product.materials.map((mat) => (
                        <span
                          key={mat}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] text-[11px] font-medium text-[#0B131F]"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity & High-Converting Order Buttons */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-[#E8DFC8] bg-white rounded-xl overflow-hidden shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-[#0B131F] hover:bg-[#FAF8F5] font-bold text-sm transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-2.5 text-xs font-bold text-[#0B131F] min-w-9 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2.5 text-[#0B131F] hover:bg-[#FAF8F5] font-bold text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary WhatsApp Order Button */}
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{isAr ? "طلب فوري عبر واتساب" : "Order via WhatsApp"}</span>
                  </a>
                </div>

                {/* Secondary Wholesale / Inquire Row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="tel:+971558879237"
                    className="py-2.5 px-3 bg-white hover:bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs font-bold text-[#0B131F] text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{isAr ? "اتصال بالمبيعات" : "Call Sales Desk"}</span>
                  </a>

                  <a
                    href={buildWhatsAppLink(
                      `Hello BHT Collections! We would like to request a Wholesale / B2B bulk quotation for: *${product.name}* (SKU: ${currentSku}). Please share your tier pricing and container shipping schedule.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-[#0B131F] hover:bg-black text-[#D4AF37] border border-[#0B131F] rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{isAr ? "طلب سعر بالجملة" : "B2B Wholesale Quote"}</span>
                  </a>
                </div>
              </div>

              {/* Flipkart / Amazon Trust Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#F2EBDC]">
                <div className="p-2.5 bg-white rounded-xl border border-[#E8DFC8] text-center space-y-1">
                  <Truck className="w-4 h-4 mx-auto text-[#D4AF37]" />
                  <p className="text-[10px] font-bold text-[#0B131F]">{isAr ? "توصيل سريع" : "Fast Delivery"}</p>
                  <p className="text-[9px] text-[#64748B]">{isAr ? "الإمارات والخليج" : "UAE & GCC Wide"}</p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#E8DFC8] text-center space-y-1">
                  <ShieldCheck className="w-4 h-4 mx-auto text-[#D4AF37]" />
                  <p className="text-[10px] font-bold text-[#0B131F]">{isAr ? "جودة مضمونة" : "100% Certified"}</p>
                  <p className="text-[9px] text-[#64748B]">{isAr ? "أصلية من المصنع" : "Factory Direct"}</p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#E8DFC8] text-center space-y-1">
                  <RotateCcw className="w-4 h-4 mx-auto text-[#D4AF37]" />
                  <p className="text-[10px] font-bold text-[#0B131F]">{isAr ? "استبدال سهل" : "7-Day Exchange"}</p>
                  <p className="text-[9px] text-[#64748B]">{isAr ? "ضمان الرضا" : "Quality Backed"}</p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-[#E8DFC8] text-center space-y-1">
                  <MessageCircle className="w-4 h-4 mx-auto text-[#D4AF37]" />
                  <p className="text-[10px] font-bold text-[#0B131F]">{isAr ? "دعم مستمر" : "Concierge"}</p>
                  <p className="text-[9px] text-[#64748B]">{isAr ? "واتساب على مدار الساعة" : "24/7 WhatsApp"}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* =========================================================
            3. FREQUENTLY BOUGHT TOGETHER / CROSS-SELL SECTION
               (Amazon / Flipkart Bundle Style powered by crossSellSlugs)
        ========================================================= */}
        {crossSellProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E8DFC8] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  {isAr ? "عروض مكملة حصرية" : "FREQUENTLY BOUGHT TOGETHER"}
                </span>
                <h2
                  className="text-lg sm:text-2xl font-bold text-[#0B131F] mt-1"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  {isAr ? "المجموعة الموصى بها مع هذا المنتج" : "Complete the Set & Save on Shipping"}
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  {isAr
                    ? "اختر المنتجات المكملة للحصول على شحنة واحدة وتنسيق فندقي متكامل."
                    : "Pair this product with curated complementary items for coordinated luxury and combined logistics."}
                </p>
              </div>

              {/* Items Flex Row with '+' signs */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pt-2">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-1">
                  {/* Main Product Card */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] w-full sm:w-auto sm:max-w-xs">
                    <div className="relative w-16 h-16 rounded-xl bg-white border border-[#E8DFC8] overflow-hidden shrink-0">
                      <Image src={product.image || allImages[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold uppercase text-[#D4AF37] block">
                        {isAr ? "المنتج الحالي" : "This Item"}
                      </span>
                      <p className="text-xs font-bold text-[#0B131F] truncate">{product.name}</p>
                      <p className="text-xs font-black text-[#0B131F]">AED {currentPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Cross-Sell Cards */}
                  {crossSellProducts.map((item, idx) => {
                    const isChecked = bundleChecked[item.slug];
                    const itemPrice = item.salePrice || item.price;
                    return (
                      <React.Fragment key={item.slug}>
                        <span className="text-xl font-bold text-[#D4AF37] self-center">+</span>
                        <div
                          className={`flex items-center gap-3 p-3 rounded-2xl border transition-all w-full sm:w-auto sm:max-w-xs cursor-pointer ${
                            isChecked ? "bg-[#FAF8F5] border-[#D4AF37]" : "bg-white border-[#E8DFC8] opacity-60"
                          }`}
                          onClick={() => setBundleChecked({ ...bundleChecked, [item.slug]: !isChecked })}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // handled by parent onClick
                            className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4"
                          />
                          <div className="relative w-16 h-16 rounded-xl bg-white border border-[#E8DFC8] overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#0B131F] truncate">{item.name}</p>
                            <p className="text-xs font-black text-[#D4AF37]">AED {itemPrice.toFixed(2)}</p>
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] text-[#64748B] hover:underline"
                            >
                              {isAr ? "عرض التفاصيل" : "View details"}
                            </Link>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Bundle Buy Box */}
                <div className="lg:w-72 p-5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-2xl flex flex-col justify-between space-y-4 shrink-0">
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                      {isAr ? "إجمالي المجموعة" : "Total Bundle Price"}
                    </span>
                    <span className="text-2xl font-black text-[#0B131F]">
                      AED {bundleTotalPrice.toFixed(2)}
                    </span>
                    <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                      {isAr ? "جاهز للشحن في طرد موحد" : "Ready for single combined dispatch"}
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppLink(
                      `Hello BHT Collections! I would like to order the curated bundle package:\n1. *${product.name}* (AED ${currentPrice})\n${crossSellProducts
                        .filter((p) => bundleChecked[p.slug])
                        .map((p, i) => `${i + 2}. *${p.name}* (AED ${p.salePrice || p.price})`)
                        .join("\n")}\n\n*Total Bundle Price: AED ${bundleTotalPrice.toFixed(2)}*\nPlease confirm dispatch schedule!`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>{isAr ? "طلب المجموعة عبر واتساب" : "Inquire Bundle via WhatsApp"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            4. DEEP DETAILS & TECHNICAL SPECIFICATIONS TABS
               (Amazon A+ / Flipkart Specifications Table)
        ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden shadow-xs">
            {/* Tab Navigation */}
            <div className="flex border-b border-[#F2EBDC] bg-[#FAF8F5] px-4 sm:px-8 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-[#D4AF37] text-[#0B131F] bg-white rounded-t-xl"
                    : "border-transparent text-[#64748B] hover:text-[#0B131F]"
                }`}
              >
                {isAr ? "نظرة عامة ووصف المنتج" : "Product Overview & Description"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === "specs"
                    ? "border-[#D4AF37] text-[#0B131F] bg-white rounded-t-xl"
                    : "border-transparent text-[#64748B] hover:text-[#0B131F]"
                }`}
              >
                {isAr ? "جدول المواصفات الفنية الكاملة" : "Complete Technical Specifications"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === "shipping"
                    ? "border-[#D4AF37] text-[#0B131F] bg-white rounded-t-xl"
                    : "border-transparent text-[#64748B] hover:text-[#0B131F]"
                }`}
              >
                {isAr ? "الشحن وضمان BHT" : "Logistics, Warranty & Brand"}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-10">
              {activeTab === "overview" && (
                <div className="space-y-6 max-w-4xl">
                  {product.shortDescription && (
                    <div className="p-4 bg-[#FAF8F5] border-l-4 border-[#D4AF37] rounded-r-2xl text-xs sm:text-sm text-[#0B131F] leading-relaxed font-medium">
                      {product.shortDescription}
                    </div>
                  )}

                  <div className="prose prose-sm max-w-none text-[#64748B] leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                    {product.description || "Certified luxury product distributed by Blanket House Trading LLC Dubai."}
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F2EBDC]">
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8]">
                      <PackageCheck className="w-5 h-5 text-[#D4AF37] mb-2" />
                      <h4 className="text-xs font-bold text-[#0B131F] mb-1">
                        {isAr ? "معايير تصدير عالمية" : "Verified Export Standard"}
                      </h4>
                      <p className="text-[11px] text-[#64748B]">
                        {isAr
                          ? "خامات مختارة بعناية فائقة تلبي مقاييس الفنادق الفاخرة."
                          : "Manufactured using premium textile fibers suited for high durability and luxury hospitality."}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8]">
                      <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-2" />
                      <h4 className="text-xs font-bold text-[#0B131F] mb-1">
                        {isAr ? "ضمان الوكيل الرسمي" : "Official BHT Assurance"}
                      </h4>
                      <p className="text-[11px] text-[#64748B]">
                        {isAr
                          ? "توزيع مباشر من المستودعات المركزية في دبي بدون وسطاء."
                          : "Direct distribution from our central Dubai flagship warehouse with zero intermediaries."}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8]">
                      <SlidersHorizontal className="w-5 h-5 text-[#D4AF37] mb-2" />
                      <h4 className="text-xs font-bold text-[#0B131F] mb-1">
                        {isAr ? "سهولة العناية والغسيل" : "Easy Maintenance"}
                      </h4>
                      <p className="text-[11px] text-[#64748B]">
                        {isAr
                          ? "مقاوم للانكماش والبهتان ويحتفظ بنعومته ورونقه بعد الغسيل."
                          : "Resistant to shrinkage, linting, and color fading under standard wash cycles."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="max-w-4xl space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B131F]">
                    {isAr ? "المواصفات التقنية والمصنعية" : "Technical & Manufacturing Specifications"}
                  </h3>

                  {/* Amazon / Flipkart Style Key-Value Table */}
                  <div className="border border-[#E8DFC8] rounded-2xl overflow-hidden divide-y divide-[#F2EBDC] text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#FAF8F5]">
                      <span className="font-bold text-[#64748B]">{isAr ? "الاسم التجاري" : "Product Title"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#0B131F]">{product.name}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#64748B]">{isAr ? "رمز الموديل / SKU" : "SKU / Model Number"}</span>
                      <span className="sm:col-span-2 font-mono font-bold text-[#0B131F]">{currentSku}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#FAF8F5]">
                      <span className="font-bold text-[#64748B]">{isAr ? "العلامة التجارية" : "Brand / Distributor"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#0B131F]">{brandName}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#64748B]">{isAr ? "القسم الرئيسي" : "Category"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#0B131F] capitalize">{product.category}</span>
                    </div>

                    {product.subcategorySlug && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#FAF8F5]">
                        <span className="font-bold text-[#64748B]">{isAr ? "التصنيف الفرعي" : "Subcategory"}</span>
                        <span className="sm:col-span-2 font-semibold text-[#0B131F] capitalize">
                          {product.subcategorySlug.replace(/-/g, " ")}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#64748B]">{isAr ? "الخامة الأساسية" : "Primary Material"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#0B131F]">
                        {product.materials?.join(", ") || "100% Premium Material"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#FAF8F5]">
                      <span className="font-bold text-[#64748B]">{isAr ? "المقاسات المتاحة" : "Available Sizes"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#0B131F]">
                        {product.sizes?.join(", ") || "Standard Size"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#64748B]">{isAr ? "الألوان" : "Color Variations"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#0B131F]">
                        {product.colors?.join(", ") || "Classic"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#FAF8F5]">
                      <span className="font-bold text-[#64748B]">{isAr ? "حالة المنتج" : "Item Condition"}</span>
                      <span className="sm:col-span-2 font-semibold text-emerald-700">
                        {isAr ? "جديد تماماً - درجة أولى للتصدير" : "Brand New - Grade A Export Quality"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#64748B]">{isAr ? "بلد التوزيع" : "Distribution Origin"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#0B131F]">
                        Dubai, United Arab Emirates (Blanket House Trading LLC)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="max-w-4xl space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-2">
                      <Truck className="w-5 h-5 text-[#D4AF37]" />
                      <h4 className="text-sm font-bold text-[#0B131F]">{isAr ? "سياسة التوصيل والشحن" : "Shipping & Delivery Policy"}</h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {isAr
                          ? "توصيل خلال 24-48 ساعة لجميع مدن الإمارات (دبي، أبوظبي، الشارقة، عجمان). شحن سريع بري وجوي لجميع دول الخليج خلال 2-4 أيام عمل."
                          : "Orders across Dubai, Abu Dhabi, and Sharjah are delivered within 24-48 hours. GCC express road and air logistics delivered within 2-4 business days."}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] space-y-2">
                      <RotateCcw className="w-5 h-5 text-[#D4AF37]" />
                      <h4 className="text-sm font-bold text-[#0B131F]">{isAr ? "سياسة الاستبدال والضمان" : "Warranty & Exchange Terms"}</h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {isAr
                          ? "استبدال فوري خلال 7 أيام في حال وجود أي عيب مصنعي أو اختلاف في المواصفات. تخضع جميع البضائع لفحص جودة ثلاثي قبل الإرسال."
                          : "7-day replacement guaranteed for manufacturing discrepancies. Every item passes our 3-stage quality inspection prior to packaging."}
                      </p>
                    </div>
                  </div>

                  {/* Brand Profile Box */}
                  {brand && (
                    <div className="p-6 bg-white rounded-2xl border border-[#E8DFC8] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {brandLogo && (
                          <div className="relative w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] p-2 overflow-hidden shrink-0">
                            <Image src={brandLogo} alt={brandName} fill className="object-contain" />
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-[#0B131F]">{brandName}</h4>
                          <p className="text-xs text-[#64748B] line-clamp-2 max-w-md mt-0.5">
                            {brand.description || "Official brand partner of Blanket House Trading LLC."}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/brands"
                        className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#F2EBDC] border border-[#E8DFC8] rounded-xl text-xs font-bold text-[#0B131F] whitespace-nowrap transition-colors"
                      >
                        {isAr ? "جميع المنتجات" : "View All Products"}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================
            5. RELATED PRODUCTS FROM THIS COLLECTION
        ========================================================= */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  {isAr ? "استكشف المزيد" : "EXPLORE MORE"}
                </span>
                <h2
                  className="text-lg sm:text-2xl font-bold text-[#0B131F] mt-1"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  {isAr ? `منتجات أخرى من قسم ${product.category}` : `More from the ${product.category} Collection`}
                </h2>
              </div>
              <Link
                href={`/collections/${product.categorySlug || "bedding"}`}
                className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>{isAr ? "عرض المجموعة الكاملة" : "View Full Collection"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((item) => (
                <Link
                  key={item._id}
                  href={`/products/${item.slug}`}
                  className="group bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-[#FAF8F5] overflow-hidden">
                    <Image
                      src={item.image || "/collections/korean-super-soft-blanket.png"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.featured && (
                      <span className="absolute top-2 left-2 bg-[#0B131F] text-[#D4AF37] text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#64748B] block truncate">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#0B131F] group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                        {item.name}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-[#F2EBDC] flex items-baseline justify-between">
                      <span className="text-xs sm:text-sm font-black text-[#0B131F]">
                        AED {item.salePrice || item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-[#64748B] line-through">
                          AED {item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* =========================================================
          6. MOBILE STICKY BOTTOM BAR (Amazon / Flipkart Style)
      ========================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFC8] p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-[#0B131F] truncate">{product.name}</p>
          <p className="text-sm font-black text-[#D4AF37]">AED {currentPrice.toFixed(2)}</p>
        </div>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-4 bg-[#25D366] text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>{isAr ? "طلب واتساب" : "WhatsApp"}</span>
        </a>
      </div>

      <Footer />
    </div>
  );
};
