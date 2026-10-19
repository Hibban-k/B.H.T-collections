import { Metadata } from "next";
import { CollectionPageView } from "@/components/collection/CollectionPageView";

export const metadata: Metadata = {
  title: "All Collections | BHT Collections — Blanket House Trading LLC",
  description:
    "Explore our complete range of certified luxury bedding, travel bags, trolleys, and high-performance footwear across the UAE and GCC.",
};

interface CollectionsPageProps {
  searchParams?: Promise<{
    category?: string;
    sub?: string;
  }>;
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const catParam = resolvedParams?.category?.toLowerCase();
  let category: "bedding" | "travel-bags" | "footwear" = "bedding";

  if (catParam === "travel-bags" || catParam === "travelling" || catParam === "trolleys") {
    category = "travel-bags";
  } else if (catParam === "footwear" || catParam === "shoes") {
    category = "footwear";
  } else if (catParam === "bedding" || catParam === "blankets") {
    category = "bedding";
  }

  return (
    <CollectionPageView
      initialCategory={category}
      initialSubcategory={resolvedParams?.sub || "all"}
    />
  );
}
