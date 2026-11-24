"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage = "en",
}) => {
  const language = initialLanguage;

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = initialLanguage;
    document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr";
  }, [initialLanguage]);

  const setLanguage = (lang: Language) => {
    const path = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "/" + lang);
    router.push(path + window.location.search);
    if (typeof window !== "undefined") {
      localStorage.setItem("bht_language", lang);
      document.cookie = `bht_language=${lang};path=/;max-age=31536000;SameSite=Lax`;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
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
