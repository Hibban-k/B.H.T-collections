"use client";
import type { StoreMarket } from "@/lib/seo/locales";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  availableMarkets: StoreMarket[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language; availableMarkets?: StoreMarket[] }> = ({
  children,
  initialLanguage = "en",
  availableMarkets = [],
}) => {
  const language = initialLanguage;

  const router = useRouter();
  useEffect(() => {
    document.documentElement.lang = initialLanguage;
    document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr";
  }, [initialLanguage]);

  const setLanguage = (lang: Language) => {
    if (typeof window !== "undefined") {
      // Cookie is read on the server too; the market URL stays unchanged.
      document.cookie = `bht_language=${lang};path=/;max-age=31536000;SameSite=Lax`;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      router.refresh();
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const direction: Direction = language === "ar" ? "rtl" : "ltr";
  const isRTL = direction === "rtl";

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        isRTL,
        availableMarkets,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
