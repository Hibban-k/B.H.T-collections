// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import TrustBenefits from "@/components/sections/TrustBenefits";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import AboutUs from "@/components/sections/AboutUs";
import WhyBHT from "@/components/sections/WhyBHT";
import ClienteleSection from "@/components/sections/ClienteleSection";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

import { constructMetadata } from "@/lib/seo/metadata";
import { generateOrganizationSchema } from "@/lib/seo/schema";
import { ProductService } from "@/lib/services/product.service";

export const metadata: Metadata = constructMetadata({
  title: "BHTCOLLECTIONS | Blanket House Trading L.L.C. Dubai",
  description: "Shop premium blankets, bed linen, comforters, and home textiles. Blanket House Trading L.L.C. — established in Dubai 2009, serving 500+ clients across 6 GCC countries.",
  path: "/",
});

export const revalidate = 3600;

export default async function HomePage() {
  const featuredProducts = await ProductService.getProducts({
    showOnHomepage: true,
    status: "published",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />
      {/* Design-patch section order: Hero → Proof → Categories → Products → Heritage → B2B → Testimonials → CTA */}
      <HeroSection />
      <TrustBenefits />
      <CategoryGrid />
      <FeaturedProducts initialProducts={featuredProducts.slice(0, 8)} />
      <AboutUs />
      <WhyBHT />
      <ClienteleSection />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
