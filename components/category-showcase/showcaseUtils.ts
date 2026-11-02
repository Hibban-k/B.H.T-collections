export interface BrandSlide {
  name: string;
  slug: string;
  logo: string;
  banner: string;
}

export interface CategoryWithSlidingBrands {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  href: string;
  subtitleEn: string;
  subtitleAr: string;
  brands: BrandSlide[];
}

// Fallback categories used ONLY if database is empty/unreachable
export const DEFAULT_CATEGORIES: CategoryWithSlidingBrands[] = [
  {
    id: "bedding",
    slug: "bedding",
    nameEn: "BEDDING",
    nameAr: "المفروشات",
    href: "/collections/bedding",
    subtitleEn: "Hanaa • Damas Gold • Royalon",
    subtitleAr: "هناء • داماس جولد • رويالون",
    brands: [
      {
        name: "ROYALON",
        slug: "royalon",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792213225/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792213225275.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792213227/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792213227623.jpg",
      },
      {
        name: "DAMAS GOLD",
        slug: "damas-gold",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792213459/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792213459140.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792213462/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792213462442.jpg",
      },
      {
        name: "HANA",
        slug: "hana",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792213648/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792213648290.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792213651/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792213651461.jpg",
      },
    ],
  },
  {
    id: "travel-bags",
    slug: "travel-bags",
    nameEn: "TRAVEL BAGS",
    nameAr: "حقائب السفر",
    href: "/collections/travel-bags",
    subtitleEn: "Infinity Paris • TravelGo",
    subtitleAr: "إنفينيتي باريس • ترافل جو",
    brands: [
      {
        name: "INFINITY PARIS",
        slug: "infinity-paris",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792213839/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792213839931.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792213860/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792213860411.jpg",
      },
      {
        name: "TRAVEL GO",
        slug: "travel-go",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792214055/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792214055034.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792214058/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792214058226.jpg",
      },
    ],
  },
  {
    id: "footwear",
    slug: "footwear",
    nameEn: "FOOTWEAR",
    nameAr: "الأحذية",
    href: "/collections/footwear",
    subtitleEn: "MagicWalk • Adda",
    subtitleAr: "ماجيك ووك • أدا",
    brands: [
      {
        name: "MAGIC WALK",
        slug: "magic-walk",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792214289/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792214289162.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792214293/bht-collections/brands/banners/whatsapp_image_2026-09-24_at_11_1792214293893.jpg",
      },
      {
        name: "ADDA",
        slug: "adda",
        logo: "https://res.cloudinary.com/iit55brn/image/upload/v1792214511/bht-collections/brands/logos/whatsapp_image_2026-09-24_at_11_1792214511513.jpg",
        banner: "https://res.cloudinary.com/iit55brn/image/upload/v1792484589/bht-collections/brands/banners/images_1792484588998.jpg",
      },
    ],
  },
];

// Pure function callable from Server Components or Client Components
export function buildShowcaseCategories(
  dbCategories: any[],
  dbBrands: any[]
): CategoryWithSlidingBrands[] {
  if (!dbCategories || dbCategories.length === 0) {
    return DEFAULT_CATEGORIES;
  }

  const topCategories = dbCategories.filter((cat) => !cat.parentId && !cat.parentSlug);
  const activeBrands = (dbBrands || []).filter((b) => b.isActive !== false);

  const mapped = topCategories.map((cat) => {
    const normCatSlug = (cat.slug || "").toLowerCase();
    const catNameLower = (cat.name || "").toLowerCase();

    const matchedBrands = activeBrands.filter((b) => {
      const bSlug = (b.categorySlug || "").toLowerCase();
      const bCat = (b.category || "").toLowerCase();
      const bCatId = b.categoryId ? String(b.categoryId) : "";
      const catId = cat._id ? String(cat._id) : "";

      return (
        (catId && bCatId === catId) ||
        bSlug === normCatSlug ||
        bCat === catNameLower ||
        (normCatSlug === "travel-bags" && (bSlug === "travelling" || bCat === "travel bags" || bSlug === "travel-bags")) ||
        (normCatSlug === "bedding" && (bSlug === "bedding" || bCat === "bedding" || bSlug === "blankets")) ||
        (normCatSlug === "footwear" && (bSlug === "footwear" || bCat === "footwear"))
      );
    });

    const fallbackMatch = DEFAULT_CATEGORIES.find(
      (def) => def.slug === normCatSlug
    );

    const brandSlides: BrandSlide[] =
      matchedBrands.length > 0
        ? matchedBrands.map((b) => ({
            name: b.name,
            slug: b.slug || b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            logo: b.logo || "",
            banner: b.image || fallbackMatch?.brands[0]?.banner || "/collections/bht-collection-banner.png",
          }))
        : fallbackMatch?.brands || [];

    const subtitleEn =
      brandSlides.length > 0
        ? brandSlides.map((b) => b.name).join(" • ")
        : fallbackMatch?.subtitleEn || "Exclusive Collections";

    return {
      id: cat._id ? String(cat._id) : cat.slug,
      slug: normCatSlug,
      nameEn: cat.name.toUpperCase(),
      nameAr: fallbackMatch?.nameAr || cat.name,
      href: `/collections/${normCatSlug}`,
      subtitleEn,
      subtitleAr: fallbackMatch?.subtitleAr || subtitleEn,
      brands: brandSlides,
    };
  });

  return mapped.length > 0 ? mapped : DEFAULT_CATEGORIES;
}
