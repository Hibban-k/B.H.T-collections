"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("bht_language") as Language | null;
    if (saved === "en" || saved === "ar") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("bht_language", lang);
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
