"use client";

import React from "react";
import { PageHeroIntro } from "@/components/hero/PageHeroIntro";
import { useLanguage } from "@/context/LanguageContext";

export const BrandClientHero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section aria-label="Brands and clients hero">
      <PageHeroIntro eyebrow="BHT COLLECTIONS · BRAND & CLIENT NETWORK"
        title={language === "ar" ? "العلامات التجارية والعملاء" : "Brands & Clients"}
        description={language === "ar"
            ? "نفخر بتوزيع أشهر العلامات التجارية العالمية والإقليمية، وتوفير حلول المفروشات وحقائب السفر والأحذية لكبرى المؤسسات والعملاء في دولة الإمارات والخليج العربي."
            : "Proudly distributing leading trademarks and partnering with premier commercial retailers and corporate clients across the UAE and GCC region."}
      />
    </section>
  );
};
