// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import BrandCarousel from "@/components/sections/BrandCarousel";
import WhoWeAre from "@/components/sections/WhoWeAre";
import PortfolioSection from "@/components/sections/PortfolioSection";
import StrengthsGrid from "@/components/sections/StrengthsGrid";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import RegionalOffices from "@/components/sections/RegionalOffices";
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
      
      {/* 1. Primary Hero Section */}
      <HeroSection />

      {/* 2. Brands We Represent Slider */}
      <BrandCarousel />

      {/* 3. Who We Are & Mission Quadrants */}
      <WhoWeAre />

      {/* 4. Beyond Textiles / Other Product Portfolio */}
      <PortfolioSection />

      {/* 5. Our Strengths 6-Card Strip */}
      <StrengthsGrid />

      {/* 6. Our Collections Showcase */}
      <CollectionShowcase />

      {/* 7. Our Regional Offices */}
      <RegionalOffices />

      {/* 8. Final High-Impact Navy CTA Banner */}
      <FinalCTA />
    </>
  );
}
