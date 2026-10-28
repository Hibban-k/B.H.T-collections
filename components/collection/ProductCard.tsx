"use client";

import React from "react";
import Image from "next/image";
import { Eye, Star, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Product } from "@/data/productsData";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const { language } = useLanguage();

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#E8E8E8] hover:border-[#CCCCCC] shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* 1. PRODUCT PHOTOGRAPHY FRAME */}
      <div className="relative w-full aspect-square sm:aspect-[4/5] bg-[#F7F7F7] overflow-hidden">
        <Image
          src={product.image}
          alt={language === "ar" ? product.nameAr : product.nameEn}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-106"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between gap-1 pointer-events-none z-10">
          <div className="flex flex-col gap-1 items-start">
            {discountPercentage > 0 && (
              <span className="bg-bht-red text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                {language === "ar" ? `خصم ${discountPercentage}%` : `-${discountPercentage}% OFF`}
              </span>
            )}
            {product.isNew && (
              <span className="bg-bht-charcoal text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                {language === "ar" ? "جديد" : "NEW"}
              </span>
            )}
          </div>

          {/* In Stock Badge */}
          {product.inStock && (
            <span className="bg-white/90 backdrop-blur-xs text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs border border-green-200 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span className="hidden xs:inline">{language === "ar" ? "متوفر" : "In Stock"}</span>
            </span>
          )}
        </div>

        {/* Quick View Hover Button */}
        <div className="product-quick-view absolute inset-x-0 bottom-3 px-3 flex justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="w-full py-2 px-3 bg-white/95 hover:bg-bht-charcoal text-bht-charcoal hover:text-white rounded-xl text-xs font-bold shadow-md backdrop-blur-xs border border-gray-200 transition-colors flex items-center justify-center gap-1.5"
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
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-bht-slate truncate max-w-[65%]">
              {product.brand}
            </span>

            {/* Stars */}
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
              <span className="text-[10px] font-bold text-gray-700">
                {product.rating}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-bold text-bht-charcoal hover:text-bht-red transition-colors line-clamp-2 leading-snug mb-2">
            {language === "ar" ? product.nameAr : product.nameEn}
          </h3>
        </div>

        {/* 3. PRICE & COLOR SWATCHES ROW */}
        <div className="pt-2 border-t border-[#F2F2F2] flex flex-wrap items-center justify-between gap-2 mt-auto">
          {/* Price */}
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-sm sm:text-base font-black text-bht-charcoal tracking-tight">
              AED {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                AED {product.originalPrice}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colorVariants.slice(0, 3).map((hex, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-gray-300"
                  style={{ backgroundColor: hex }}
                  title="Color option"
                />
              ))}
              {product.colorVariants.length > 3 && (
                <span className="text-[9px] font-bold text-gray-400">
                  +{product.colorVariants.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
