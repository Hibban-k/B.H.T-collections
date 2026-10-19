import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionPageView } from "@/components/collection/CollectionPageView";
import { COLLECTION_CATEGORIES_META, ALL_PRODUCTS } from "@/data/productsData";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const catSlug = category.toLowerCase();
  const product = ALL_PRODUCTS.find(
    (p) => p.category === catSlug || slug.includes(p.id)
  );

  if (product) {
    return {
      title: `${product.nameEn} | BHT Collections`,
      description: product.descriptionEn,
    };
  }

  const meta = COLLECTION_CATEGORIES_META[catSlug];
  return {
    title: meta ? `${meta.nameEn} Collection | BHT Collections` : "BHT Collections",
  };
}

export default async function SubcategoryProductPage({ params }: PageProps) {
  const { category } = await params;
  const catSlug = category.toLowerCase();
  const validCategory: "bedding" | "travel-bags" | "footwear" =
    catSlug === "travel-bags" || catSlug === "travelling"
      ? "travel-bags"
      : catSlug === "footwear"
      ? "footwear"
      : "bedding";

  return (
    <CollectionPageView
      initialCategory={validCategory}
      initialSubcategory="all"
    />
  );
}
