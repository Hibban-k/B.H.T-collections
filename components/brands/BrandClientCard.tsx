"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandClientItem } from "@/data/brandsData";
import { useLanguage } from "@/context/LanguageContext";

interface BrandClientCardProps {
  item: BrandClientItem;
}

export const BrandClientCard: React.FC<BrandClientCardProps> = ({ item }) => {
  const { language } = useLanguage();

  return (
    <Link
      href={item.href}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 hover:border-neutral-400 p-6 sm:p-8 flex items-center justify-center h-32 sm:h-36 md:h-40 w-full shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      aria-label={`${item.nameEn} - ${language === "ar" ? item.nameAr : item.nameEn}`}
    >
      <div className="relative w-full h-full max-h-16 sm:max-h-20 max-w-[82%] flex items-center justify-center transition-transform duration-300 group-hover:scale-106">
        <Image
          src={item.logo}
          alt={item.nameEn}
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-bht-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};
