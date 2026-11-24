import { constructRegionalMetadata as constructMetadata } from "@/lib/seo/regional-metadata";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CollectionPageView } from "@/components/collection/CollectionPageView";
import { CategoryService } from "@/lib/services/category.service";
import { ProductService } from "@/lib/services/product.service";
import { BrandService } from "@/lib/services/brand.service";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    category: string;
  }>;
  searchParams?: Promise<{
    subcategory?: string;
    sub?: string;
    variation?: string;
    color?: string;
    size?: string;
    brand?: string;
  }>;
}

const RESERVED_STATIC_SLUGS = new Set([
  "about",
  "search",
  "brands",
  "brand",
  "contact",
  "privacy",
  "refund-policy",
  "terms",
  "collections",
  "admin",
  "api",
  "products",
]);

const DEFAULT_MAIN_CATEGORIES = ["bedding", "travel-bags", "footwear"];

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, category: rawCategory } = await params;
  const slug = rawCategory.replace(/^c=/, "").toLowerCase();

  if (RESERVED_STATIC_SLUGS.has(slug)) {
    return {};
  }

  const dbCat = await CategoryService.getCategoryBySlug(slug).catch(() => null);

  if (!dbCat && !DEFAULT_MAIN_CATEGORIES.includes(slug)) {
    return {
      title: "Category Not Found | BHT Collections",
    };
  }

  const title = dbCat
    ? `${dbCat.name.toUpperCase()} Collection | BHT Collections — Blanket House Trading LLC`
    : `${slug.toUpperCase()} Collection | BHT Collections — Blanket House Trading LLC`;

  return constructMetadata({ title: dbCat?.metaTitle || title,
    description: dbCat?.metaDescription || dbCat?.description || `Explore our ${slug} collection at BHT Collections.`,
    path: `/${locale}/${slug}` });
}

export default async function DynamicCategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, category: rawCategory } = await params;
  const slug = rawCategory.replace(/^c=/, "").toLowerCase();

  // If slug is a reserved route, let Next.js handle or 404
  if (RESERVED_STATIC_SLUGS.has(slug)) {
    notFound();
  }

  // Fetch DB data with selective projection for catalog card grids
  const [categories, products, brands] = await Promise.all([
    CategoryService.getCategories().catch(() => []),
    ProductService.getGridProducts({ status: "published" }).catch(() => []),
    BrandService.getBrands().catch(() => []),
  ]);

  // Determine if slug exists in DB or is one of the default pillars
  const matchedCat = categories.find((c) => c.slug.toLowerCase() === slug);
  const isDefaultPillar = DEFAULT_MAIN_CATEGORIES.includes(slug);

  if (!matchedCat && !isDefaultPillar) {
    // If not found in DB, return 404 error page per requirement
    notFound();
  }

  if (matchedCat?.status === "disabled") notFound();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  if (rawCategory !== slug) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(resolvedSearchParams || {})) {
      if (value !== undefined) query.set(key, value);
    }
    permanentRedirect(`/${locale}/${slug}${query.size ? `?${query}` : ""}`);
  }
  let mainCategorySlug = slug;
  let activeSub = resolvedSearchParams?.subcategory || resolvedSearchParams?.sub || "all";

  if (matchedCat) {
    if (matchedCat.parentId || matchedCat.parentSlug) {
      // It's a subcategory! Resolve parent category
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
      initialVariation={resolvedSearchParams?.variation || resolvedSearchParams?.color || resolvedSearchParams?.size}
      initialBrand={resolvedSearchParams?.brand}
      dbCategories={JSON.parse(JSON.stringify(categories))}
      dbProducts={JSON.parse(JSON.stringify(products))}
      dbBrands={JSON.parse(JSON.stringify(brands))}
    />
  );
}
