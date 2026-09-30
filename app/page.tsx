import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import MainCategories from "@/components/sections/MainCategories";
import ExclusiveProducts from "@/components/sections/ExclusiveProducts";
import AboutSummary from "@/components/sections/AboutSummary";
import WhyUs from "@/components/sections/WhyUs";
import ClientReviews from "@/components/sections/ClientReviews";
import FeaturedRegion from "@/components/sections/FeaturedRegion";
import FinalCTA from "@/components/sections/FinalCTA";

import { constructMetadata } from "@/lib/seo/metadata";
import { generateOrganizationSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "B.H.T. Collections | Blanket House Trading L.L.C. Dubai",
  description: "B.H.T. Collections is a trusted supplier of premium textiles, bedding, travel accessories and footwear, serving global markets with quality, reliability and excellence.",
  path: "/",
});

export const revalidate = 3600; // Cache for 1 hour

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />
      <HeroSection />
      <MainCategories />
      <ExclusiveProducts />
      <AboutSummary />
      <WhyUs />
      <ClientReviews />
      <FeaturedRegion />
      <FinalCTA />
    </>
  );
}
