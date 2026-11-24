import { constructRegionalMetadata as constructMetadata } from "@/lib/seo/regional-metadata";
import { BrandClientPageView } from "@/components/brands/BrandClientPageView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return constructMetadata({
    path: `/${locale}/brands`,
  title: "Brand & Clients | BHT Collections — Blanket House Trading LLC Dubai",
  description:
    "Explore BHT Collections authorized trademarks, certified international brands, and regional corporate client network across the UAE and GCC.",
  });
}

export default function BrandsPage() {
  return <BrandClientPageView />;
}
