export type StoreLanguage = "en" | "ar";
export const MARKETS = {
  ae: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة", contactId: "uae" },
  sa: { en: "Saudi Arabia", ar: "المملكة العربية السعودية", contactId: "saudi" },
  qa: { en: "Qatar", ar: "قطر", contactId: "qatar" },
  kw: { en: "Kuwait", ar: "الكويت", contactId: "kuwait" },
  bh: { en: "Bahrain", ar: "البحرين", contactId: "bahrain" },
  om: { en: "Oman", ar: "عُمان", contactId: "oman" },
} as const;
export type StoreMarket = keyof typeof MARKETS;

export function isStoreMarket(value: string): value is StoreMarket {
  return Object.hasOwn(MARKETS, value);
}

/** Public paths identify markets. Language is a separate UI preference. */
export function parseStoreLocale(value: string) {
  const code = value.toLowerCase();
  if (code === "en") return { locale: "en", market: null, hreflang: "en" };
  if (!isStoreMarket(code)) return null;
  return { locale: code, market: code, hreflang: "en-" + code.toUpperCase() };
}

export function marketAlternates(path: string, markets: readonly string[]): Record<string, string> {
  const segment = path.split("/")[1] || "en";
  const suffix = path.slice(segment.length + 1);
  return Object.fromEntries([
    ["en", "/en" + suffix],
    ...markets.filter(isStoreMarket).map(code => ["en-" + code.toUpperCase(), "/" + code + suffix]),
    ["x-default", "/en" + suffix],
  ]);
}
