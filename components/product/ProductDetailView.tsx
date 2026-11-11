"use client";

import React, { useState, useMemo } from "react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import styles from "./ProductDetailView.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Truck, RotateCcw, MessageCircle, Phone, Share2, Check, ChevronRight, Sparkles, Building2 } from "lucide-react";

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
  brand?: { name?: string; logo?: string; description?: string } | string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

interface ProductDetailViewProps {
  product: ProductData;
  crossSellProducts?: ProductData[];
  relatedProducts?: ProductData[];
  brand?: { name?: string; logo?: string; description?: string } | string;
}

// Retry the original asset when the image optimizer cannot fetch a catalog image.
function ProductImage(props: ImageProps) {
  const [retrySource, setRetrySource] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  if (unavailable) return <div role="img" aria-label={props.alt} className="absolute inset-0 flex items-center justify-center bg-neutral-100 p-2 text-center text-xs text-neutral-500">{props.alt}</div>;
  return <Image {...props} alt={props.alt} unoptimized={retrySource} onError={() => retrySource ? setUnavailable(true) : setRetrySource(true)} />;
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
    product.variants?.forEach((variant) => { if (variant.image && !list.includes(variant.image)) list.push(variant.image); });
    return list.length > 0 ? list : ["/collections/korean-super-soft-blanket.png"];
  }, [product.image, product.images, product.variants]);

  const [activeImageIndex, setActiveImageIndex] = useState(() => Math.max(0, allImages.indexOf(product.variants?.[0]?.image || product.image)));
  const productUrl = `https://www.blankethouse.ae/products/${product.slug}`;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(product.variants?.length ? 0 : null);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants?.length ? product.variants[0].size || "" : product.sizes?.[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants?.length ? product.variants[0].color || "" : product.colors?.[0] || ""
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

  const currentPrice = activeVariant ? activeVariant.salePrice ?? activeVariant.price ?? product.salePrice ?? product.price : product.salePrice ?? product.price;
  const originalPrice =
    activeVariant
      ? (activeVariant.salePrice != null ? activeVariant.price : undefined)
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
    setSelectedSize(variant?.size || "");
    setSelectedColor(variant?.color || "");
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
    const currentUrl = productUrl;
    const text =
      customText ||
      `Hello BHT Collections! I am interested in ordering:
*${product.name}*
- SKU: ${currentSku}
${activeVariant ? `- Variant: ${activeVariant.name}` : ""}
- Price: AED ${currentPrice}
${selectedSize ? `- Size: ${selectedSize}` : ""}
${selectedColor ? `- Color: ${selectedColor}` : ""}
- Quantity: ${quantity}
- URL: ${currentUrl}

Please confirm availability and delivery timeframe across UAE/GCC.`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  const bulkInquiryLink = buildWhatsAppLink(`Hello BHT Collections! Please send a bulk quotation for:\n${product.name}\nSKU: ${currentSku}\n${activeVariant ? `Variant: ${activeVariant.name}\n` : ""}${selectedSize ? `Size: ${selectedSize}\n` : ""}${selectedColor ? `Color: ${selectedColor}\n` : ""}Requested quantity: ${quantity}\nProduct: ${productUrl}\nPlease confirm wholesale pricing, availability and delivery options.`);

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

  const resolvedBrand = typeof brand === "object" ? brand : null;
  const brandName = resolvedBrand?.name || (typeof product.brand === "object" ? product.brand?.name : product.brand) || "BHT Collections";
  const brandLogo = resolvedBrand?.logo || (typeof product.brand === "object" ? product.brand?.logo : null);

  return (
    <div className={`${styles.page} flex flex-col min-h-screen bg-white text-neutral-900`} dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <main className="flex-1 pb-28 sm:pb-24">
        {/* =========================================================
            1. BREADCRUMBS ROW (Amazon / Flipkart Style)
        ========================================================= */}
        <div className="border-b border-[#ededeb] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-[#737373] overflow-x-auto whitespace-nowrap scrollbar-none">
              <Link href="/" className="hover:text-[#b32025] transition-colors">
                {isAr ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <Link href="/collections" className="hover:text-[#b32025] transition-colors">
                {isAr ? "المجموعات" : "Collections"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <Link
                href={`/collections/${product.categorySlug || "bedding"}`}
                className="hover:text-[#b32025] transition-colors capitalize font-medium text-[#171717]"
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
              <span className="text-[#171717] font-bold truncate max-w-[200px] sm:max-w-[320px]">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* =========================================================
            2. PRODUCT HERO: GALLERY (LEFT) + BUY BOX (RIGHT)
        ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* ----------------- LEFT: GALLERY ----------------- */}
            <div className="lg:col-span-6 space-y-4">
              <div className="lg:sticky lg:top-32 space-y-3">
                {/* Main Preview Box */}
                <div className="relative aspect-square w-full rounded-3xl bg-[#f7f6f3] overflow-hidden group">
                  <ProductImage
                    key={allImages[activeImageIndex]}
                    src={allImages[activeImageIndex] || "/collections/korean-super-soft-blanket.png"}
                    alt={product.name}
                    fill
                    priority
                    className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {discountPercent && (
                      <span className="bg-[#b32025] text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-sm">
                        {isAr ? `خصم ${discountPercent}%` : `${discountPercent}% OFF`}
                      </span>
                    )}
                    {product.featured && (
                      <span className="bg-[#171717] text-[#b32025] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
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
                      className="p-2 bg-white/90 backdrop-blur-xs hover:bg-[#f7f6f3] border border-[#e5e5e5] rounded-full text-[#171717] shadow-xs transition-colors"
                      title={isAr ? "مشاركة الرابط" : "Share Product"}
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>


                </div>

                {/* Thumbnails Row */}
                {allImages.length > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`${isAr ? "عرض الصورة" : "View image"} ${idx + 1}`}
                        aria-pressed={activeImageIndex === idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border-2 overflow-hidden shrink-0 transition-all ${
                          activeImageIndex === idx
                            ? "border-[#b32025] ring-2 ring-[#b32025]/20 shadow-xs"
                            : "border-[#e5e5e5] hover:border-gray-400 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <ProductImage src={img} alt={`${product.name} - ${idx + 1}`} fill sizes="80px" className="object-contain p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ----------------- RIGHT: PRODUCT SPECS & BUY BOX ----------------- */}
            <div className="lg:col-span-6 min-w-0 space-y-7">

              {/* Brand, Title & Rating Header */}
              <div className="space-y-2.5 pb-4 border-b border-[#ededeb]">
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href={`/brands`}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#f7f6f3] border border-[#e5e5e5] hover:border-[#b32025] text-xs font-bold text-[#171717] transition-colors"
                  >
                    {brandLogo && (
                      <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                        <ProductImage src={brandLogo} alt={brandName} fill className="object-contain" />
                      </div>
                    )}
                    <span>{brandName}</span>
                    <ChevronRight className="w-3 h-3 text-[#b32025]" />
                  </Link>

                  {/* Stock Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      isOutOfStock
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : currentStock < 15
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-red-500" : currentStock < 15 ? "bg-amber-500" : "bg-emerald-500"}`} />
                    {isOutOfStock
                      ? isAr ? "غير متوفر حالياً" : "Out of Stock"
                      : currentStock < 15
                      ? isAr ? `متبقي ${currentStock} فقط!` : `In stock · ${currentStock} available`
                      : isAr ? "متوفر بالمخزون" : "In Stock"}
                  </span>
                </div>

                <h1
                  className="text-3xl sm:text-4xl font-medium tracking-tight text-[#171717] leading-tight"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  {product.name}
                </h1>

                <p className="text-xs text-neutral-500">{isAr ? "رمز المنتج" : "Product code"}: {currentSku}</p>
                {product.shortDescription && <p className="text-base leading-7 text-neutral-600 pt-3">{product.shortDescription}</p>}
              </div>


              {/* Price Block (Amazon / Flipkart Style) */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#171717] tracking-tight">
                    AED {currentPrice.toFixed(2)}
                  </span>
                  {originalPrice && originalPrice > currentPrice && (
                    <span className="text-sm sm:text-base text-[#737373] line-through">
                      AED {originalPrice.toFixed(2)}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      {isAr ? `وفر ${discountPercent}%` : `Save ${discountPercent}%`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#737373] leading-relaxed">
                  {isAr
                    ? "السعر شامل ضريبة القيمة المضافة. متاح خيارات التوزيع بالجملة والتصدير لدول الخليج."
                    : "Inclusive of 5% UAE VAT. Wholesale & export logistics available across GCC."}
                </p>
              </div>

              {/* Variants Selector (if present) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#171717] uppercase tracking-wider text-[11px]">
                      {isAr ? "خيارات المنتج (المقاس / اللون)" : "Select Variant / Option"}
                    </span>
                    {activeVariant && (
                      <span className="text-[11px] text-[#b32025] font-semibold">
                        {[activeVariant.color, activeVariant.size].filter(Boolean).join(" / ") || activeVariant.name}
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
                          aria-pressed={selectedVariantIndex === idx}
                          onClick={() => handleSelectVariant(idx)}
                          className={`p-2.5 rounded-xl border text-start transition-all relative ${
                            isSelected
                              ? "bg-white border-[#b32025] ring-2 ring-[#b32025]/20 shadow-xs"
                              : "bg-white/80 border-[#e5e5e5] hover:border-gray-400"
                          }`}
                        >
                          <p className="font-bold text-xs text-[#171717] truncate">{[v.color, v.size].filter(Boolean).join(" / ") || v.name}</p>
                          <p className="text-[11px] text-[#b32025] font-semibold mt-0.5">
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
                {!product.variants?.length && product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737373] mb-1.5">
                      {isAr ? "المقاسات المتوفرة" : "Available Sizes"}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          aria-pressed={selectedSize === sz}
                          onClick={() => { setSelectedSize(sz); setSelectedVariantIndex(null); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            selectedSize === sz
                              ? "bg-[#171717] text-white border-[#171717] shadow-xs"
                              : "bg-white text-[#171717] border-[#e5e5e5] hover:border-gray-400"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!product.variants?.length && product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737373] mb-1.5">
                      {isAr ? "الألوان المتوفرة" : "Available Colors"}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((col) => (
                        <button
                          key={col}
                          type="button"
                          aria-pressed={selectedColor === col}
                          onClick={() => { setSelectedColor(col); setSelectedVariantIndex(null); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                            selectedColor === col
                              ? "bg-[#171717] text-white border-[#171717] shadow-xs"
                              : "bg-white text-[#171717] border-[#e5e5e5] hover:border-gray-400"
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
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#737373] mb-1.5">
                      {isAr ? "الخامة والمواصفات" : "Fabric & Material"}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {product.materials.map((mat) => (
                        <span
                          key={mat}
                          className="px-2.5 py-1 rounded-lg bg-[#f7f6f3] border border-[#e5e5e5] text-[11px] font-medium text-[#171717]"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-[#f7f6f3] p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="product-quantity" className="text-sm font-medium">{isAr ? "الكمية المطلوبة" : "Requested quantity"}</label>
                  <div className="flex items-center rounded-xl border border-neutral-300 bg-white overflow-hidden">
                    <button type="button" aria-label={isAr ? "تقليل الكمية" : "Decrease quantity"} disabled={quantity <= 1} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 disabled:opacity-30">−</button>
                    <input id="product-quantity" type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.floor(Number(e.target.value) || 1)))} className="w-14 h-11 text-center bg-transparent text-base" />
                    <button type="button" aria-label={isAr ? "زيادة الكمية" : "Increase quantity"} onClick={() => setQuantity(quantity + 1)} className="w-11 h-11">+</button>
                  </div>
                </div>
                <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>
                  <MessageCircle className="w-5 h-5" />{isAr ? "اطلب عبر واتساب" : "Order via WhatsApp"}
                </a>
                <a href={bulkInquiryLink} target="_blank" rel="noopener noreferrer" className={styles.secondaryAction}>
                  <Building2 className="w-5 h-5" />{isAr ? "طلب عرض سعر بالجملة" : "Request a bulk quote"}
                </a>
                <p className="text-sm leading-6 text-neutral-500">{isAr ? "تواصل مع فريقنا لتأكيد التوفر والسعر النهائي وترتيبات التوصيل." : "Speak with our team to confirm availability, final pricing and delivery arrangements."}</p>
              </div>
              <a href="tel:+971558879237" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-bht-red"><Phone className="w-4 h-4" />{isAr ? "تحدث مع فريق المبيعات" : "Prefer to call? Speak with our sales team"}</a>

            </div>
          </div>
        </div>

        {/* =========================================================
            3. COMPLEMENTARY PRODUCTS / CROSS-SELL SECTION
               (Amazon / Flipkart Bundle Style powered by crossSellSlugs)
        ========================================================= */}
        {crossSellProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#e5e5e5] shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#b32025]">
                  {isAr ? "عروض مكملة حصرية" : "COMPLEMENTARY PRODUCTS"}
                </span>
                <h2
                  className="text-lg sm:text-2xl font-bold text-[#171717] mt-1"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  {isAr ? "المجموعة الموصى بها مع هذا المنتج" : "Build your product inquiry"}
                </h2>
                <p className="text-xs text-[#737373] mt-1">
                  {isAr
                    ? "اختر المنتجات المكملة للحصول على شحنة واحدة وتنسيق فندقي متكامل."
                    : "Pair this product with curated complementary items for coordinated luxury and combined logistics."}
                </p>
              </div>

              {/* Items Flex Row with '+' signs */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pt-2">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-1">
                  {/* Main Product Card */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#f7f6f3] border border-[#e5e5e5] w-full sm:w-auto sm:max-w-xs">
                    <div className="relative w-16 h-16 rounded-xl bg-white border border-[#e5e5e5] overflow-hidden shrink-0">
                      <ProductImage src={product.image || allImages[0]} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold uppercase text-[#b32025] block">
                        {isAr ? "المنتج الحالي" : "This Item"}
                      </span>
                      <p className="text-xs font-bold text-[#171717] truncate">{product.name}</p>
                      <p className="text-xs font-black text-[#171717]">AED {currentPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Cross-Sell Cards */}
                  {crossSellProducts.map((item) => {
                    const isChecked = bundleChecked[item.slug];
                    const itemPrice = item.salePrice || item.price;
                    return (
                      <React.Fragment key={item.slug}>
                        <span className="text-xl font-bold text-[#b32025] self-center">+</span>
                        <div
                          className={`flex items-center gap-3 p-3 rounded-2xl border transition-all w-full sm:w-auto sm:max-w-xs cursor-pointer ${
                            isChecked ? "bg-[#f7f6f3] border-[#b32025]" : "bg-white border-[#e5e5e5] opacity-60"
                          }`}

                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            aria-label={`${isAr ? "تضمين" : "Include"} ${item.name}`}
                            onChange={() => setBundleChecked({ ...bundleChecked, [item.slug]: !isChecked })}
                            className="rounded text-[#b32025] focus:ring-[#b32025] w-4 h-4"
                          />
                          <div className="relative w-16 h-16 rounded-xl bg-white border border-[#e5e5e5] overflow-hidden shrink-0">
                            <ProductImage src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#171717] truncate">{item.name}</p>
                            <p className="text-xs font-black text-[#b32025]">AED {itemPrice.toFixed(2)}</p>
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] text-[#737373] hover:underline"
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
                <div className="lg:w-72 p-5 bg-[#f7f6f3] border border-[#e5e5e5] rounded-2xl flex flex-col justify-between space-y-4 shrink-0">
                  <div>
                    <span className="text-[10px] font-bold text-[#737373] uppercase tracking-wider block">
                      {isAr ? "إجمالي المجموعة" : "Indicative combined price"}
                    </span>
                    <span className="text-2xl font-black text-[#171717]">
                      AED {bundleTotalPrice.toFixed(2)}
                    </span>
                    <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                      {isAr ? "جاهز للشحن في طرد موحد" : "Availability and delivery confirmed by our team"}
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppLink(
                      `Hello BHT Collections! Please quote these products together:\n1. *${product.name}* (AED ${currentPrice})\n${crossSellProducts
                        .filter((p) => bundleChecked[p.slug])
                        .map((p, i) => `${i + 2}. *${p.name}* (AED ${p.salePrice || p.price})`)
                        .join("\n")}\n\n*Indicative combined price: AED ${bundleTotalPrice.toFixed(2)}*\nPlease confirm availability, final pricing and delivery options.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#166534] hover:bg-[#14532d] text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>{isAr ? "طلب المجموعة عبر واتساب" : "Request a combined quote"}</span>
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
          <div className="bg-white rounded-3xl border border-[#e5e5e5] overflow-hidden shadow-xs">
            {/* Tab Navigation */}
            <div className="flex border-b border-[#ededeb] bg-[#f7f6f3] px-4 sm:px-8 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-[#b32025] text-[#171717] bg-white rounded-t-xl"
                    : "border-transparent text-[#737373] hover:text-[#171717]"
                }`}
              >
                {isAr ? "نظرة عامة ووصف المنتج" : "Overview"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === "specs"
                    ? "border-[#b32025] text-[#171717] bg-white rounded-t-xl"
                    : "border-transparent text-[#737373] hover:text-[#171717]"
                }`}
              >
                {isAr ? "جدول المواصفات الفنية الكاملة" : "Specifications"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={`py-4 px-4 sm:px-6 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === "shipping"
                    ? "border-[#b32025] text-[#171717] bg-white rounded-t-xl"
                    : "border-transparent text-[#737373] hover:text-[#171717]"
                }`}
              >
                {isAr ? "الشحن وضمان BHT" : "Delivery & support"}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-10">
              {activeTab === "overview" && (
                <div className="space-y-6 max-w-4xl">
                  <div className="prose prose-sm max-w-none text-[#737373] leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {product.description || "Certified luxury product distributed by Blanket House Trading LLC Dubai."}
                  </div>

                </div>
              )}


              {activeTab === "specs" && (
                <div className="max-w-4xl space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                    {isAr ? "المواصفات التقنية والمصنعية" : "Technical & Manufacturing Specifications"}
                  </h3>

                  {/* Amazon / Flipkart Style Key-Value Table */}
                  <div className="border border-[#e5e5e5] rounded-2xl overflow-hidden divide-y divide-[#ededeb] text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#f7f6f3]">
                      <span className="font-bold text-[#737373]">{isAr ? "الاسم التجاري" : "Product Title"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#171717]">{product.name}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#737373]">{isAr ? "رمز الموديل / SKU" : "SKU / Model Number"}</span>
                      <span className="sm:col-span-2 font-mono font-bold text-[#171717]">{currentSku}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#f7f6f3]">
                      <span className="font-bold text-[#737373]">{isAr ? "العلامة التجارية" : "Brand / Distributor"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#171717]">{brandName}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#737373]">{isAr ? "القسم الرئيسي" : "Category"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#171717] capitalize">{product.category}</span>
                    </div>

                    {product.subcategorySlug && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#f7f6f3]">
                        <span className="font-bold text-[#737373]">{isAr ? "التصنيف الفرعي" : "Subcategory"}</span>
                        <span className="sm:col-span-2 font-semibold text-[#171717] capitalize">
                          {product.subcategorySlug.replace(/-/g, " ")}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#737373]">{isAr ? "الخامة الأساسية" : "Primary Material"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#171717]">
                        {product.materials?.join(", ") || "100% Premium Material"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#f7f6f3]">
                      <span className="font-bold text-[#737373]">{isAr ? "المقاسات المتاحة" : "Available Sizes"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#171717]">
                        {product.sizes?.join(", ") || "Standard Size"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#737373]">{isAr ? "الألوان" : "Color Variations"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#171717]">
                        {product.colors?.join(", ") || "Classic"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-[#f7f6f3]">
                      <span className="font-bold text-[#737373]">{isAr ? "حالة المنتج" : "Item Condition"}</span>
                      <span className="sm:col-span-2 font-semibold text-emerald-700">
                        {isAr ? "جديد تماماً - درجة أولى للتصدير" : "Brand New - Grade A Export Quality"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 bg-white">
                      <span className="font-bold text-[#737373]">{isAr ? "بلد التوزيع" : "Distribution Origin"}</span>
                      <span className="sm:col-span-2 font-semibold text-[#171717]">
                        Dubai, United Arab Emirates (Blanket House Trading LLC)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="max-w-4xl space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-[#f7f6f3] border border-[#e5e5e5] space-y-2">
                      <Truck className="w-5 h-5 text-[#b32025]" />
                      <h4 className="text-sm font-bold text-[#171717]">{isAr ? "سياسة التوصيل والشحن" : "Shipping & Delivery Policy"}</h4>
                      <p className="text-xs text-[#737373] leading-relaxed">
                        {isAr
                          ? "توصيل خلال 24-48 ساعة لجميع مدن الإمارات (دبي، أبوظبي، الشارقة، عجمان). شحن سريع بري وجوي لجميع دول الخليج خلال 2-4 أيام عمل."
                          : "Orders across Dubai, Abu Dhabi, and Sharjah are delivered within 24-48 hours. GCC express road and air logistics delivered within 2-4 business days."}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#f7f6f3] border border-[#e5e5e5] space-y-2">
                      <RotateCcw className="w-5 h-5 text-[#b32025]" />
                      <h4 className="text-sm font-bold text-[#171717]">{isAr ? "سياسة الاستبدال والضمان" : "Warranty & Exchange Terms"}</h4>
                      <p className="text-xs text-[#737373] leading-relaxed">
                        {isAr
                          ? "استبدال فوري خلال 7 أيام في حال وجود أي عيب مصنعي أو اختلاف في المواصفات. تخضع جميع البضائع لفحص جودة ثلاثي قبل الإرسال."
                          : "7-day replacement guaranteed for manufacturing discrepancies. Every item passes our 3-stage quality inspection prior to packaging."}
                      </p>
                    </div>
                  </div>

                  {/* Brand Profile Box */}
                  {brand && (
                    <div className="p-6 bg-white rounded-2xl border border-[#e5e5e5] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {brandLogo && (
                          <div className="relative w-14 h-14 rounded-2xl bg-[#f7f6f3] border border-[#e5e5e5] p-2 overflow-hidden shrink-0">
                            <ProductImage src={brandLogo} alt={brandName} fill className="object-contain" />
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-[#171717]">{brandName}</h4>
                          <p className="text-xs text-[#737373] line-clamp-2 max-w-md mt-0.5">
                            {resolvedBrand?.description || "Official brand partner of Blanket House Trading LLC."}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/brands"
                        className="px-4 py-2 bg-[#f7f6f3] hover:bg-[#ededeb] border border-[#e5e5e5] rounded-xl text-xs font-bold text-[#171717] whitespace-nowrap transition-colors"
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
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#b32025]">
                  {isAr ? "استكشف المزيد" : "EXPLORE MORE"}
                </span>
                <h2
                  className="text-lg sm:text-2xl font-bold text-[#171717] mt-1"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  {isAr ? `منتجات أخرى من قسم ${product.category}` : `More from the ${product.category} Collection`}
                </h2>
              </div>
              <Link
                href={`/collections/${product.categorySlug || "bedding"}`}
                className="text-xs font-bold text-[#b32025] hover:underline flex items-center gap-1"
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
                  className="group bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-[#f7f6f3] overflow-hidden">
                    <ProductImage
                      src={item.image || "/collections/korean-super-soft-blanket.png"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.featured && (
                      <span className="absolute top-2 left-2 bg-[#171717] text-[#b32025] text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#737373] block truncate">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#171717] group-hover:text-[#b32025] transition-colors line-clamp-2">
                        {item.name}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-[#ededeb] flex items-baseline justify-between">
                      <span className="text-xs sm:text-sm font-black text-[#171717]">
                        AED {item.salePrice || item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-[#737373] line-through">
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
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden grid grid-cols-2 gap-3">
        <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}><MessageCircle className="w-4 h-4" />{isAr ? "طلب واتساب" : "WhatsApp order"}</a>
        <a href={bulkInquiryLink} target="_blank" rel="noopener noreferrer" className={styles.secondaryAction}>{isAr ? "عرض سعر بالجملة" : "Bulk inquiry"}</a>
      </div>

      <Footer />
    </div>
  );
};
