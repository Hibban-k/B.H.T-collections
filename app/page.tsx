// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import TrustBenefits from "@/components/sections/TrustBenefits";
import CategoryGrid from "@/components/sections/CategoryGrid";
import AboutUs from "@/components/sections/AboutUs";
import WhyBHT from "@/components/sections/WhyBHT";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import UAEBanner from "@/components/sections/UAEBanner";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

import ClienteleSection from "@/components/sections/ClienteleSection";

import { constructMetadata } from "@/lib/seo/metadata";
import { generateOrganizationSchema } from "@/lib/seo/schema";
import { ProductService } from "@/lib/services/product.service";

export const metadata: Metadata = constructMetadata({
  title: "BHTCOLLECTIONS | Blanket House Trading L.L.C. Dubai",
  description: "Shop premium blankets, bed linen, comforters, and explore our trading portfolio. Blanket House Trading L.L.C. · Established in Dubai in 2009, serving 500+ clients across 6 GCC countries.",
  path: "/",
});

export const revalidate = 3600; // Cache for 1 hour

export default async function HomePage() {
  const featuredProducts = await ProductService.getProducts({
    showOnHomepage: true,
    status: "published"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />
      <HeroSection />
      <TrustBenefits />
      <CategoryGrid />
      <AboutUs />
      <WhyBHT />
      <FeaturedProducts initialProducts={featuredProducts.slice(0, 6)} />
      <ClienteleSection />
      <UAEBanner />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
