import { MARKETS, parseStoreLocale, type StoreLanguage, type StoreMarket } from "./locales";

export interface RegionalCopy {
  title: string;
  heading: string;
  description: string;
}

/** Add researched, fact-checked page copy here; these are not search-volume estimates. */
export const REGIONAL_SEO_OVERRIDES: Partial<Record<StoreMarket, Record<string, Partial<Record<StoreLanguage, RegionalCopy>>>>> = {};

const TOPICS: Record<string, { en: string; ar: string }> = {
  "": { en: "Bedding, Footwear & Travel Bags", ar: "المفروشات والأحذية وحقائب السفر" },
  bedding: { en: "Blankets & Bedding", ar: "البطانيات والمفروشات" },
  footwear: { en: "Footwear & Sandals", ar: "الأحذية والصنادل" },
  "travel-bags": { en: "Travel Bags & Luggage", ar: "حقائب السفر والأمتعة" },
};

export function getRegionalCopy(locale: string, page: string, language: StoreLanguage): RegionalCopy | null {
  const market = parseStoreLocale(locale)?.market;
  if (!market) return null;
  const override = REGIONAL_SEO_OVERRIDES[market]?.[page]?.[language];
  if (override) return override;
  const topic = TOPICS[page];
  if (!topic) return null;
  const country = MARKETS[market][language];
  const heading = language === "ar" ? `${topic.ar} في ${country}` : `${topic.en} in ${country}`;
  return {
    heading,
    title: `${heading} | BHT Collections`,
    description: language === "ar"
      ? `استفسر عن ${topic.ar} في ${country}. تواصل مع جهة الاتصال الإقليمية لتأكيد التوفر والأسعار وترتيبات التوصيل.`
      : `Explore ${topic.en.toLowerCase()} for ${country}. Contact our regional team to confirm availability, pricing and delivery arrangements.`,
  };
}
