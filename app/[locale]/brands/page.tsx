import { Metadata } from "next";
import { BrandClientPageView } from "@/components/brands/BrandClientPageView";

export const metadata: Metadata = {
  title: "Brand & Clients | BHT Collections — Blanket House Trading LLC Dubai",
  description:
    "Explore BHT Collections authorized trademarks, certified international brands, and regional corporate client network across the UAE and GCC.",
};

export default function BrandsPage() {
  return <BrandClientPageView />;
}
