import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionPageView } from "@/components/collection/CollectionPageView";
import { COLLECTION_CATEGORIES_META } from "@/data/productsData";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{
    sub?: string;
  }>;
}

// Subcategory to parent category map for universal route resolution
const SLUG_TO_CATEGORY_MAP: Record<
  string,
  { category: "bedding" | "travel-bags" | "footwear"; subcategory: string }
> = {
  // Main Categories
  bedding: { category: "bedding", subcategory: "all" },
  "travel-bags": { category: "travel-bags", subcategory: "all" },
  travelling: { category: "travel-bags", subcategory: "all" },
  footwear: { category: "footwear", subcategory: "all" },

  // Bedding subcategories
  blankets: { category: "bedding", subcategory: "blankets" },
  "bed-sheets": { category: "bedding", subcategory: "bedsheets" },
  bedsheets: { category: "bedding", subcategory: "bedsheets" },
  comforters: { category: "bedding", subcategory: "comforters" },
  "duvet-covers": { category: "bedding", subcategory: "duvet-covers" },
  pillows: { category: "bedding", subcategory: "pillows" },
  towels: { category: "bedding", subcategory: "all" },

  // Travel bags subcategories
  trolleys: { category: "travel-bags", subcategory: "trolleys" },
  "travel-bags-sub": { category: "travel-bags", subcategory: "travel-bags" },
  backpacks: { category: "travel-bags", subcategory: "backpacks" },
  "luggage-sets": { category: "travel-bags", subcategory: "luggage-sets" },
  accessories: { category: "travel-bags", subcategory: "accessories" },
  "travel-accessories": { category: "travel-bags", subcategory: "accessories" },

  // Footwear subcategories
  mens: { category: "footwear", subcategory: "mens" },
  "mens-footwear": { category: "footwear", subcategory: "mens" },
  womens: { category: "footwear", subcategory: "womens" },
  "womens-footwear": { category: "footwear", subcategory: "womens" },
  kids: { category: "footwear", subcategory: "kids" },
  "kids-footwear": { category: "footwear", subcategory: "kids" },
  sports: { category: "footwear", subcategory: "sports" },
  "sports-shoes": { category: "footwear", subcategory: "sports" },
  casual: { category: "footwear", subcategory: "casual" },
  "casual-shoes": { category: "footwear", subcategory: "casual" },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const slug = category.toLowerCase();
  const mapping = SLUG_TO_CATEGORY_MAP[slug];

  if (!mapping) {
    return {
      title: "Collections | BHT Collections",
    };
  }

  const meta = COLLECTION_CATEGORIES_META[mapping.category];
  return {
    title: `${meta.nameEn} Collection | BHT Collections — Blanket House Trading LLC`,
    description: meta.descriptionEn,
  };
}

export function generateStaticParams() {
  return [
    { category: "bedding" },
    { category: "travel-bags" },
    { category: "travelling" },
    { category: "footwear" },
    { category: "blankets" },
    { category: "bed-sheets" },
    { category: "comforters" },
    { category: "trolleys" },
    { category: "backpacks" },
    { category: "mens-footwear" },
    { category: "sports-shoes" },
    { category: "casual-shoes" },
  ];
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const slug = category.toLowerCase();
  const mapping = SLUG_TO_CATEGORY_MAP[slug];

  if (!mapping) {
    notFound();
  }

  const activeSub = resolvedSearchParams?.sub || mapping.subcategory || "all";

  return (
    <CollectionPageView
      initialCategory={mapping.category}
      initialSubcategory={activeSub}
    />
  );
}
