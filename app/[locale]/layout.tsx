import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-var",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

import { RegionService } from "@/lib/services/region.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Fetch regions for programmatic SEO and Hreflang tags
  const regions = await RegionService.getRegions();
  const currentRegion = regions.find((r) => r.code === locale);
  
  // Base URLs
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  // Build Hreflang alternates dictionary
  const languages: Record<string, string> = {};
  regions.forEach((region) => {
    // Map region code (e.g. 'ae') to URL (e.g. '/ae')
    languages[region.code] = `${baseUrl}/${region.code}`;
  });
  // x-default fallback
  languages["x-default"] = `${baseUrl}/en`;

  // Programmatic Meta Injection
  const regionName = currentRegion?.name || "Global";
  const titleSuffix = currentRegion?.metaTitleSuffix 
    ? currentRegion.metaTitleSuffix.replace(/\{\{region_name\}\}/g, regionName)
    : `| Premium Bedding & Blankets in ${regionName}`;
    
  const defaultDesc = `Shop premium blankets, bed linen, comforters and bedspreads from BHTCOLLECTIONS. Elevate your comfort with quality home textiles delivered across ${regionName}.`;
  let desc = currentRegion?.metaDescriptionTemplate || defaultDesc;
  desc = desc.replace(/\{\{region_name\}\}/g, regionName);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `BHTCOLLECTIONS ${titleSuffix}`,
      template: `%s ${titleSuffix}`,
    },
    description: desc,
    keywords: [
      `premium bedding ${regionName}`,
      "blankets Dubai",
      "bed linen",
      "comforters",
      "bedspreads",
      "SMARTEX blanket",
      "luxury bedding",
      "home textiles",
    ],
    openGraph: {
      type: "website",
      siteName: "BHTCOLLECTIONS",
      title: `BHTCOLLECTIONS ${titleSuffix}`,
      description: desc,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="bg-[#F8F7F4] text-[#25262C] antialiased min-h-screen" style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}>
        {/* Global fixed watermark — single layer for entire site per design spec */}
        <div className="site-watermark" aria-hidden="true" />
        {/* All page content above watermark */}
        <div className="page-content">
          <AuthProvider>
            <StoreLayoutShell>{children}</StoreLayoutShell>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
