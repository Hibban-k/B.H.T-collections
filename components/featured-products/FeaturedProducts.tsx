"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Eye, Star, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { QuickViewModal } from "@/components/collection/QuickViewModal";
import { ALL_PRODUCTS, Product } from "@/data/productsData";

interface DbProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  stock?: number;
  image: string;
  images?: string[];
  category: string;
  categorySlug: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  shortDescription?: string;
  featured?: boolean;
  showOnHomepage?: boolean;
}

export const FeaturedProducts: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProductsAndBrands = async () => {
      try {
        const [productsRes, brandsRes] = await Promise.all([
          fetch("/api/store/products?homepage=true"),
          fetch("/api/store/brands"),
        ]);

        if (productsRes.ok) {
          const pData = await productsRes.json();
          const rawProducts: DbProduct[] = pData.products || [];

          let brandsList: any[] = [];
          if (brandsRes.ok) {
            const bData = await brandsRes.json();
            brandsList = bData.brands || [];
          }

          if (rawProducts.length > 0 && isMounted) {
            const mapped: Product[] = rawProducts.map((p) => {
              const brandObj = brandsList.find(
                (b) => b._id === p.brand || b.name === p.brand
              );
              const brandName = brandObj?.name || p.brand || "BHT Collections";
              const brandLogo = brandObj?.logo || "";

              const normalizedCategory: "bedding" | "travel-bags" | "footwear" =
                p.categorySlug === "travel-bags" ||
                p.categorySlug === "travelling" ||
                p.category?.toLowerCase() === "travel bags"
                  ? "travel-bags"
                  : p.categorySlug === "footwear" ||
                    p.category?.toLowerCase() === "footwear"
                  ? "footwear"
                  : "bedding";

              return {
                id: p._id || p.slug,
                nameEn: p.name,
                nameAr: p.name,
                category: normalizedCategory,
                subcategory: p.categorySlug || "general",
                subcategoryEn: p.category || "General",
                subcategoryAr: p.category || "عام",
                brand: brandName,
                brandLogo: brandLogo,
                price: p.salePrice || p.price,
                originalPrice:
                  p.originalPrice || (p.salePrice ? p.price : undefined),
                image:
                  p.image ||
                  (p.images && p.images[0]) ||
                  "/collections/korean-super-soft-blanket.png",
                inStock: p.stock === undefined || p.stock > 0,
                isNew: true,
                isFeatured: Boolean(p.featured || p.showOnHomepage),
                rating: p.rating || 5.0,
                reviewsCount: p.reviewCount || 1,
                descriptionEn: p.description || p.shortDescription || "",
                descriptionAr: p.description || p.shortDescription || "",
                featuresEn: [
                  "Authentic Export Quality",
                  "Ultra-Durable Craftsmanship",
                  "Verified BHT Certified",
                ],
                featuresAr: [
                  "جودة تصدير أصلية",
                  "حرفية عالية والمتانة",
                  "معتمد من بي إتش تي",
                ],
              };
            });

            setDbProducts(mapped);
          }
        }
      } catch (err) {
        console.error("FeaturedProducts: failed to fetch DB products", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductsAndBrands();

    return () => {
      isMounted = false;
    };
  }, []);

  // Combined product pool: DB products prioritized, backed by curated catalog
  const allProductsPool = useMemo(() => {
    if (dbProducts.length > 0) {
      const existingIds = new Set(dbProducts.map((p) => p.nameEn.toLowerCase()));
      const fillers = ALL_PRODUCTS.filter(
        (p) => !existingIds.has(p.nameEn.toLowerCase())
      );
      return [...dbProducts, ...fillers];
    }
    return ALL_PRODUCTS;
  }, [dbProducts]);

  // Display exactly 4 products organized category-wise (no tabs)
  const displayedProducts = useMemo(() => {
    const bedding = allProductsPool.filter((p) => p.category === "bedding");
    const travel = allProductsPool.filter((p) => p.category === "travel-bags");
    const footwear = allProductsPool.filter((p) => p.category === "footwear");

    const selected: Product[] = [];
    if (bedding[0]) selected.push(bedding[0]);
    if (travel[0]) selected.push(travel[0]);
    if (footwear[0]) selected.push(footwear[0]);
    if (bedding[1]) selected.push(bedding[1]);
    else if (travel[1]) selected.push(travel[1]);
    else if (footwear[1]) selected.push(footwear[1]);

    // Safety fallback: if fewer than 4, fill from remaining pool
    const seenIds = new Set(selected.map((p) => p.id));
    for (const p of allProductsPool) {
      if (selected.length >= 4) break;
      if (!seenIds.has(p.id)) {
        selected.push(p);
        seenIds.add(p.id);
      }
    }

    return selected.slice(0, 4);
  }, [allProductsPool]);

  return (
    <section
      className="w-full bg-[#FAFAFA] py-12 md:py-20 border-t border-[#EDEDED]"
      aria-label="Product Showcase"
    >
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER ROW */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-bht-charcoal tracking-tight">
              {language === "ar"
                ? "أحدث وأرقى المنتجات المختارة"
                : "Handpicked Premium Selections"}
            </h2>
            <p className="text-xs sm:text-sm text-bht-slate mt-1 max-w-xl">
              {language === "ar"
                ? "اكتشف تشكيلتنا الفاخرة من البطانيات، حقائب السفر الدوارة، والأحذية المريحة المباشرة من مصانعنا."
                : "Explore top-rated blankets, durable luggage, and comfortable footwear crafted for everyday luxury."}
            </p>
          </div>

          {/* VIEW ALL LINK */}
          <div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-bht-charcoal text-bht-charcoal hover:text-white border border-[#E0E0E0] text-xs font-bold transition-all duration-200 shadow-2xs group"
            >
              <span>{language === "ar" ? "عرض جميع المنتجات" : "View All Products"}</span>
              <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* PRODUCTS GRID (EXACTLY 4 PRODUCTS) */}
        {loading && displayedProducts.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 sm:h-96 rounded-2xl bg-white border border-[#E8E8E8] animate-pulse p-4 flex flex-col justify-between"
              >
                <div className="w-full h-48 bg-neutral-200 rounded-xl" />
                <div className="space-y-2 mt-4">
                  <div className="w-1/3 h-3 bg-neutral-200 rounded" />
                  <div className="w-3/4 h-4 bg-neutral-200 rounded" />
                  <div className="w-1/2 h-4 bg-neutral-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {displayedProducts.map((product) => {
              const discountPercentage = product.originalPrice
                ? Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )
                : 0;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-[#E8E8E8] hover:border-[#D0D0D0] shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* 1. PRODUCT PHOTOGRAPHY FRAME */}
                  <div className="relative w-full aspect-square sm:aspect-[4/5] bg-[#F7F7F7] overflow-hidden">
                    <Link
                      href={`/collections/${product.category}/${product.id}`}
                      className="absolute inset-0 block"
                    >
                      <Image
                        src={product.image}
                        alt={language === "ar" ? product.nameAr : product.nameEn}
                        fill
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-106"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </Link>

                    {/* Badges Overlay */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between gap-1 pointer-events-none z-10">
                      <div className="flex flex-col gap-1 items-start">
                        {discountPercentage > 0 && (
                          <span className="bg-bht-red text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                            {language === "ar"
                              ? `خصم ${discountPercentage}%`
                              : `-${discountPercentage}% OFF`}
                          </span>
                        )}
                      </div>

                      {/* In Stock Badge */}
                      {product.inStock && (
                        <span className="bg-white/95 backdrop-blur-xs text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span className="hidden xs:inline">
                            {language === "ar" ? "متوفر" : "In Stock"}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-x-0 bottom-3 px-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        type="button"
                        onClick={() => setQuickViewProduct(product)}
                        className="w-full py-2 px-3 bg-white/95 hover:bg-bht-charcoal text-bht-charcoal hover:text-white rounded-xl text-xs font-bold shadow-md backdrop-blur-xs border border-gray-200 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                        aria-label={`Quick View ${product.nameEn}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{language === "ar" ? "معاينة سريعة" : "Quick View"}</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. CARD CONTENT AREA */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand, Category & Rating Row */}
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-1 truncate max-w-[70%]">
                          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-bht-red truncate">
                            {product.brand}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-[10px] text-gray-500 font-medium truncate capitalize">
                            {product.category === "bedding"
                              ? (language === "ar" ? "المفروشات" : "Bedding")
                              : product.category === "travel-bags"
                              ? (language === "ar" ? "حقائب السفر" : "Travel Bags")
                              : (language === "ar" ? "الأحذية" : "Footwear")}
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                          <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                          <span className="text-[10px] font-bold text-gray-700">
                            {product.rating}
                          </span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <Link href={`/collections/${product.category}/${product.id}`}>
                        <h3 className="text-xs sm:text-sm font-bold text-bht-charcoal hover:text-bht-red transition-colors line-clamp-2 leading-snug mb-2">
                          {language === "ar" ? product.nameAr : product.nameEn}
                        </h3>
                      </Link>
                    </div>

                    {/* 3. PRICE & INQUIRY FOOTER */}
                    <div className="pt-2 border-t border-[#F2F2F2] flex items-center justify-between gap-2 mt-auto">
                      {/* Price */}
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-black text-bht-charcoal tracking-tight">
                          AED {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through">
                            AED {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Quick Details Link */}
                      <Link
                        href={`/collections/${product.category}/${product.id}`}
                        className="text-[11px] font-bold text-bht-slate hover:text-bht-charcoal flex items-center gap-0.5 transition-colors"
                      >
                        <span>{language === "ar" ? "التفاصيل" : "Details"}</span>
                        <ArrowIcon className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
