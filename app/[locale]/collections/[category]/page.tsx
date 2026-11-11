import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionPageView } from "@/components/collection/CollectionPageView";
import { CategoryService } from "@/lib/services/category.service";
import { ProductService } from "@/lib/services/product.service";
import { BrandService } from "@/lib/services/brand.service";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{
    sub?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const slug = category.toLowerCase();
  const dbCat = await CategoryService.getCategoryBySlug(slug).catch(() => null);

  const title = dbCat
    ? `${dbCat.name.toUpperCase()} Collection | BHT Collections — Blanket House Trading LLC`
    : `${slug.toUpperCase()} Collection | BHT Collections — Blanket House Trading LLC`;

  return {
    title,
    description: dbCat?.description || `Explore our certified ${slug} collection in UAE and GCC.`,
  };
}


export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const slug = category.toLowerCase();

  // Fetch DB data
  const [categories, products, brands] = await Promise.all([
    CategoryService.getCategories().catch(() => []),
    ProductService.getProducts({ status: "published" }).catch(() => []),
    BrandService.getBrands().catch(() => []),
  ]);

  // Determine if slug is a top-level category or a subcategory
  const matchedCat = categories.find((c) => c.slug.toLowerCase() === slug);
  let mainCategorySlug = slug;
  let activeSub = resolvedSearchParams?.sub || "all";

  if (matchedCat) {
    if (matchedCat.parentId || matchedCat.parentSlug) {
      // It's a subcategory!
      const parent = categories.find(
        (c) =>
          (matchedCat.parentId && String(c._id) === String(matchedCat.parentId)) ||
          (matchedCat.parentSlug && c.slug.toLowerCase() === matchedCat.parentSlug.toLowerCase())
      );
      if (parent) {
        mainCategorySlug = parent.slug;
        activeSub = matchedCat.slug;
      }
    }
  }

  return (
    <CollectionPageView
      initialCategory={mainCategorySlug}
      initialSubcategory={activeSub}
      dbCategories={JSON.parse(JSON.stringify(categories))}
      dbProducts={JSON.parse(JSON.stringify(products))}
      dbBrands={JSON.parse(JSON.stringify(brands))}
    />
  );
}
