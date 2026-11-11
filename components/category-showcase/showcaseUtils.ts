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

// Pure function callable from Server Components or Client Components
// STRICT DB ONLY: If DB is empty, returns empty array (no mock/dummy data)
export function buildShowcaseCategories(
  dbCategories: any[],
  dbBrands: any[]
): CategoryWithSlidingBrands[] {
  if (!dbCategories || dbCategories.length === 0) {
    return [];
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

    // First added brand in DB shows first (keep chronological order)
    matchedBrands.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (timeA !== timeB) return timeA - timeB;
      return String(a._id || '').localeCompare(String(b._id || ''));
    });

    const brandSlides: BrandSlide[] = matchedBrands.map((b) => ({
      name: b.name,
      slug: b.slug || b.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      logo: b.logo || "",
      banner: (b.image && b.image !== b.logo) ? b.image : (cat.image || b.image || ""),
    }));

    const subtitleEn =
      brandSlides.length > 0
        ? brandSlides.map((b) => b.name).join(" • ")
        : "";

    return {
      id: cat._id ? String(cat._id) : cat.slug,
      slug: normCatSlug,
      nameEn: cat.name.toUpperCase(),
      nameAr: cat.name,
      href: `/${normCatSlug}`,
      subtitleEn,
      subtitleAr: subtitleEn,
      brands: brandSlides,
    };
  });

  return mapped;
}
