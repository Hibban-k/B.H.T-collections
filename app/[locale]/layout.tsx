import type { Metadata } from "next";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { RegionService } from "@/lib/services/region.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  let regions: any[] = [];
  try {
    regions = await RegionService.getRegions();
  } catch {
    regions = [];
  }
  const currentRegion = regions.find((r) => r.code === locale);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blankethouse.ae";

  const languages: Record<string, string> = {};
  regions.forEach((region) => {
    languages[region.code] = `${baseUrl}/${region.code}`;
  });
  languages["x-default"] = `${baseUrl}/en`;

  const regionName = currentRegion?.name || (locale === "ae" ? "United Arab Emirates" : "Dubai & GCC");
  const titleSuffix = currentRegion?.metaTitleSuffix 
    ? currentRegion.metaTitleSuffix.replace(/\{\{region_name\}\}/g, regionName)
    : `| Blanket House Trading LLC — BHT Collections ${regionName}`;

  const defaultDesc = `Discover luxury bedding, comforters, travel luggage, trolleys, and high-performance footwear from BHT Collections across ${regionName}.`;
  let desc = currentRegion?.metaDescriptionTemplate || defaultDesc;
  desc = desc.replace(/\{\{region_name\}\}/g, regionName);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `BHT Collections ${titleSuffix}`,
      template: `%s ${titleSuffix}`,
    },
    description: desc,
    icons: {
      icon: "/logo/logo.png",
    },
    openGraph: {
      type: "website",
      siteName: "BHT Collections",
      title: `BHT Collections ${titleSuffix}`,
      description: desc,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function RegionalStoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return (
    <html lang={locale} dir={isArabic ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white text-bht-charcoal antialiased">
        <LanguageProvider>
          {children}
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
