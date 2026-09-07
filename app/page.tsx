// app/page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import TrustBenefits from "@/components/sections/TrustBenefits";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyBHT from "@/components/sections/WhyBHT";
import UAEBanner from "@/components/sections/UAEBanner";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

import ClienteleSection from "@/components/sections/ClienteleSection";
import ServicesSection from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "BHTCOLLECTIONS | Blanket House Trading L.L.C. Dubai",
  description:
    "Shop premium blankets, bed linen, comforters, and explore our trading portfolio. Blanket House Trading L.L.C. — Established in Dubai in 2009, serving 500+ clients across 6 GCC countries.",
  openGraph: {
    title: "BHTCOLLECTIONS | Blanket House Trading L.L.C. Dubai",
    description:
      "Built on Quality. Delivered with Care. We are more than just a blanket brand. Serving homes, hotels and retailers across the UAE & GCC.",
    url: "https://blankethouse.ae",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBenefits />
      <CategoryGrid />
      <FeaturedProducts />
      <ClienteleSection />
      <WhyBHT />
      <ServicesSection />
      <UAEBanner />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
