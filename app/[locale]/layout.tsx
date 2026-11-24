import "../globals.css";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { ScrollReveals } from "@/components/common/ScrollReveals";
import { RegionService } from "@/lib/services/region.service";
import { isStoreMarket, parseStoreLocale } from "@/lib/seo/locales";
import { getRequestLanguage } from "@/lib/seo/request-language";

export default async function RegionalStoreLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!parseStoreLocale(locale)) notFound();
  if (locale !== "en") {
    const region = await RegionService.getRegionByCode(locale);
    if (!region?.isActive) notFound();
  }
  const language = await getRequestLanguage();
  const regions = await RegionService.getRegions().catch(() => []);
  const availableMarkets = [...new Set(regions.filter(r => r.isActive).map(r => r.code).filter(isStoreMarket))];
  return <div dir={language === "ar" ? "rtl" : "ltr"} className="bht-storefront min-h-screen flex flex-col bg-white text-bht-charcoal antialiased">
    <LanguageProvider initialLanguage={language} availableMarkets={availableMarkets}>
      {children}<ScrollReveals /><FloatingWhatsApp />
    </LanguageProvider>
  </div>;
}
