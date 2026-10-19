"use client";

import React, { useState, useMemo } from "react";
import { BRAND_CLIENT_ITEMS } from "@/data/brandsData";
import { BrandClientCard } from "./BrandClientCard";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Truck, Award, MessageCircle } from "lucide-react";
import Link from "next/link";

export const BrandClientGrid: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "bedding" | "travel" | "footwear" | "corporate"
  >("all");

  const categories = [
    { id: "all", labelEn: "All Brands & Clients", labelAr: "جميع العلامات والعملاء" },
    { id: "bedding", labelEn: "Bedding & Home", labelAr: "المفروشات والمنسوجات" },
    { id: "travel", labelEn: "Travel & Luggage", labelAr: "حقائب السفر والترولي" },
    { id: "footwear", labelEn: "Footwear & Comfort", labelAr: "الأحذية والراحة" },
    { id: "corporate", labelEn: "Corporate & Wholesale", labelAr: "التوزيع والمؤسسات" },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return BRAND_CLIENT_ITEMS;
    return BRAND_CLIENT_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden bg-[#F8F9FA]">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#C4C8D0 0.8px, transparent 0.8px), radial-gradient(#C4C8D0 0.8px, #F8F9FA 0.8px)`,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-14">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-bht-charcoal text-white shadow-sm"
                    : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 hover:border-neutral-300"
                }`}
              >
                {language === "ar" ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <BrandClientCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-neutral-200/80 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-neutral-200/60 shadow-2xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-bht-red flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-900 mb-1">
              {language === "ar" ? "علامات تجارية معتمدة 100%" : "100% Certified Trademarks"}
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              {language === "ar"
                ? "حقوق توزيع حصرية وتوريد أصلي مضمون لكافة العلامات التجارية والمنتجات."
                : "Exclusive distribution rights and authentic warranties across all product divisions."}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-neutral-200/60 shadow-2xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-bht-blue flex items-center justify-center mb-3">
              <Truck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-900 mb-1">
              {language === "ar" ? "توريد شامل لدول الخليج" : "GCC-Wide Distribution"}
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              {language === "ar"
                ? "لوجستيات سريعة وتوريد بالجملة للفنادق والشركات وتجار التجزئة في 6 دول خليجية."
                : "Fast logistics and wholesale corporate fulfillment across all 6 GCC member states."}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-neutral-200/60 shadow-2xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Award className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-900 mb-1">
              {language === "ar" ? "معايير جودة معتمدة" : "Licensed Quality Standards"}
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              {language === "ar"
                ? "فحص دوري ومطابقة لأعلى مواصفات الراحة والمتانة العالمية."
                : "Continuous testing ensuring maximum durability, ergonomic comfort, and prestige."}
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-start">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-bht-red mb-1.5 block">
              {language === "ar" ? "شراكات التوزيع والمؤسسات" : "PARTNERSHIPS & WHOLESALE"}
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-bht-charcoal font-bold tracking-tight mb-2">
              {language === "ar"
                ? "هل ترغب في أن تصبح شريكاً تجارياً أو موزعاً معتمداً؟"
                : "Interested in Becoming a Commercial Partner or Distributor?"}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {language === "ar"
                ? "يقدم فريقنا المتخصص في دبي حلول التوريد بالجملة، الكتالوجات الحصرية، وعروض الأسعار التنافسية للشركات والفنادق وتجار التجزئة."
                : "Our Dubai wholesale team provides direct catalogs, competitive volume pricing, and institutional fulfillment for retailers and corporate hospitality."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-bht-charcoal hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-lg tracking-wider uppercase transition-colors"
            >
              {language === "ar" ? "تواصل مع فريق المبيعات" : "CONTACT OUR TEAM"}
            </Link>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-semibold rounded-lg tracking-wider uppercase transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === "ar" ? "واتساب مباشر" : "WHATSAPP INQUIRY"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
