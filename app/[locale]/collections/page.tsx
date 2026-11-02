import { Metadata } from "next";
import { CollectionPageView } from "@/components/collection/CollectionPageView";
import { CategoryService } from "@/lib/services/category.service";
import { ProductService } from "@/lib/services/product.service";
import { BrandService } from "@/lib/services/brand.service";

export const revalidate = 60; // Fast cached SSR

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
  const catParam = resolvedParams?.category?.toLowerCase() || "bedding";

  // SSR fetch DB data
  const [categories, products, brands] = await Promise.all([
    CategoryService.getCategories().catch(() => []),
    ProductService.getProducts({ status: "published" }).catch(() => []),
    BrandService.getBrands().catch(() => []),
  ]);

  return (
    <CollectionPageView
      initialCategory={catParam}
      initialSubcategory={resolvedParams?.sub || "all"}
      dbCategories={JSON.parse(JSON.stringify(categories))}
      dbProducts={JSON.parse(JSON.stringify(products))}
      dbBrands={JSON.parse(JSON.stringify(brands))}
    />
  );
}
