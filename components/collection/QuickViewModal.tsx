"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Check, Star, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Product } from "@/data/productsData";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const { language } = useLanguage();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // WhatsApp order link with pre-filled message
  const whatsappMsg = encodeURIComponent(
    `Hello Blanket House Trading LLC, I am interested in inquiring about: ${product.nameEn} (AED ${product.price}, Brand: ${product.brand}).`
  );
  const whatsappUrl = `https://wa.me/971558879237?text=${whatsappMsg}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 animate-scale-up border border-[#E0E0E0] my-auto max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black shadow-md flex items-center justify-center transition-colors border border-gray-200"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* 1. LEFT: PRODUCT IMAGE */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[300px] md:min-h-[460px] bg-[#F7F7F7]">
          <Image
            src={product.image}
            alt={language === "ar" ? product.nameAr : product.nameEn}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 500px"
          />

          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-bht-red text-white text-xs font-black uppercase px-2.5 py-1 rounded-md shadow-md">
              {language === "ar" ? `خصم ${discountPercentage}%` : `SAVE ${discountPercentage}%`}
            </div>
          )}
        </div>

        {/* 2. RIGHT: PRODUCT DETAILS & INQUIRY */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-none">
          <div>
            {/* Brand Logo & Name */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-bht-red">
                {product.brand}
              </span>

              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                <span className="text-xs font-bold text-gray-800">
                  {product.rating}
                </span>
                <span className="text-[11px] text-gray-400">
                  ({product.reviewsCount} {language === "ar" ? "تقييم" : "reviews"})
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="text-lg sm:text-xl font-extrabold text-bht-charcoal leading-snug mb-3">
              {language === "ar" ? product.nameAr : product.nameEn}
            </h2>

            {/* Pricing */}
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-2xl font-black text-bht-charcoal">
                AED {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  AED {product.originalPrice}
                </span>
              )}
              <span className="text-xs text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">
                {language === "ar" ? "شامل ضريبة القيمة المضافة" : "VAT Included"}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-bht-slate leading-relaxed mb-4">
              {language === "ar" ? product.descriptionAr : product.descriptionEn}
            </p>

            {/* Sizes (if available) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <span className="text-xs font-bold text-bht-charcoal block mb-2">
                  {language === "ar" ? "المقاس / الحجم المتاح:" : "Available Sizes / Dimensions:"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                        selectedSize === s || (!selectedSize && idx === 0)
                          ? "bg-bht-charcoal text-white border-bht-charcoal"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features Checklist */}
            <div className="mb-5 bg-[#FAFAFA] p-3 rounded-xl border border-bht-border space-y-1.5">
              {(language === "ar" ? product.featuresAr : product.featuresEn).map(
                (f, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <Check className="w-3.5 h-3.5 text-green-600 stroke-[2.5] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-[#EBEBEB] space-y-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded"
                >
                  +
                </button>
              </div>

              {/* Inquiry / WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>
                  {language === "ar" ? "طلب استفسار عبر واتساب" : "WhatsApp Inquiry / Order"}
                </span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-semibold pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-bht-blue" />
                {language === "ar" ? "منتج أصلي 100%" : "100% Genuine Guarantee"}
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-bht-red" />
                {language === "ar" ? "توصيل سريع داخل الإمارات" : "Fast UAE & GCC Delivery"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
