"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RelatedCollectionsProps {
  currentCategory: "bedding" | "travel-bags" | "footwear" | "all";
}

export const RelatedCollections: React.FC<RelatedCollectionsProps> = ({
  currentCategory,
}) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const categories = [
    {
      id: "bedding",
      nameEn: "Bedding & Blankets",
      nameAr: "المفروشات والبطانيات",
      href: "/collections/bedding",
      image: "/badding/bht-comforters.jpg",
      count: "Hana • Damas Gold • Royalon 3D",
    },
    {
      id: "travel-bags",
      nameEn: "Travel Bags & Luggage",
      nameAr: "حقائب السفر والترولي",
      href: "/collections/travel-bags",
      image: "/herosection/travel-luggage.png",
      count: "Infinity Paris • TravelGo",
    },
    {
      id: "footwear",
      nameEn: "Footwear & Sports",
      nameAr: "الأحذية والرياضة",
      href: "/collections/footwear",
      image: "/fotware/footwear.png",
      count: "Adda • MagicWalk",
    },
  ];

  const related = categories.filter((c) => c.id !== currentCategory);

  return (
    <section className="w-full bg-[#FAFAFA] py-12 border-t border-[#EBEBEB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-bht-red block mb-1">
              {language === "ar" ? "استكشف أيضاً" : "EXPLORE MORE"}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-bht-charcoal">
              {language === "ar" ? "تشكيلات أخرى تهمك" : "Related Collections"}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {related.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 border border-[#E5E5E5]"
            >
              <Image
                src={cat.image}
                alt={language === "ar" ? cat.nameAr : cat.nameEn}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest block mb-0.5">
                    {cat.count}
                  </span>
                  <h4 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-bht-red transition-colors">
                    {language === "ar" ? cat.nameAr : cat.nameEn}
                  </h4>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-bht-red text-white flex items-center justify-center transition-all group-hover:scale-110">
                  <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
