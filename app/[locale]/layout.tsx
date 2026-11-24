import "../globals.css";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { ScrollReveals } from "@/components/common/ScrollReveals";
import { RegionService } from "@/lib/services/region.service";

export default async function RegionalStoreLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ar") {
    const region = await RegionService.getRegionByCode(locale);
    if (!region?.isActive) notFound();
  }
  return <div dir={locale === "ar" ? "rtl" : "ltr"} className="bht-storefront min-h-screen flex flex-col bg-white text-bht-charcoal antialiased">
    <LanguageProvider initialLanguage={locale === "ar" ? "ar" : "en"}>
      {children}<ScrollReveals /><FloatingWhatsApp />
    </LanguageProvider>
  </div>;
}
