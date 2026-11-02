"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/header/Navbar";
import { AnnouncementTicker } from "@/components/ticker/AnnouncementTicker";
import { Footer } from "@/components/footer/Footer";
import { CollectionHero } from "./CollectionHero";
import { CategoryTabsNav, DynamicCategoryTab } from "./CategoryTabsNav";
import { SubcategoryPills } from "./SubcategoryPills";
import { CollectionIntro } from "./CollectionIntro";
import { ProductToolbar, SortOption } from "./ProductToolbar";
import { ProductFilterSidebar, FilterState } from "./ProductFilterSidebar";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { RelatedCollections } from "./RelatedCollections";
import { Product, CollectionCategoryMeta } from "@/data/productsData";
import { PackageX, RotateCcw } from "lucide-react";

export interface DBProduct {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  category?: string;
  categorySlug?: string;
  subcategoryId?: string | null;
  subcategorySlug?: string;
  price: number;
  salePrice?: number | null;
  originalPrice?: number | null;
  rating?: number;
  reviewCount?: number;
  image: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  brand?: any;
  status?: string;
  featured?: boolean;
}

export interface DBCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  parentId?: string | null;
  parentSlug?: string;
  description?: string;
  longDescription?: string;
}

export interface DBBrand {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  image?: string;
  category?: string;
  categorySlug?: string;
}

interface CollectionPageViewProps {
  initialCategory?: string;
  initialSubcategory?: string;
  dbCategories?: DBCategory[];
  dbProducts?: DBProduct[];
  dbBrands?: DBBrand[];
}

export const CollectionPageView: React.FC<CollectionPageViewProps> = ({
  initialCategory = "bedding",
  initialSubcategory = "all",
  dbCategories: propCategories,
  dbProducts: propProducts,
  dbBrands: propBrands,
}) => {
  const { language } = useLanguage();

  // 1. DATA STATE
  const [categories, setCategories] = useState<DBCategory[]>(propCategories || []);
  const [products, setProducts] = useState<DBProduct[]>(propProducts || []);
  const [brands, setBrands] = useState<DBBrand[]>(propBrands || []);

  // Fetch client-side if not SSR-provided
  useEffect(() => {
    if (propCategories && propProducts && propBrands) return;

    let isMounted = true;
    const fetchStoreData = async () => {
      try {
        const [catsRes, prodsRes, brandsRes] = await Promise.all([
          fetch("/api/store/categories"),
          fetch("/api/store/products?collection=true"),
          fetch("/api/store/brands"),
        ]);

        if (isMounted) {
          if (catsRes.ok) {
            const data = await catsRes.json();
            setCategories(data.categories || []);
          }
          if (prodsRes.ok) {
            const data = await prodsRes.json();
            setProducts(data.products || []);
          }
          if (brandsRes.ok) {
            const data = await brandsRes.json();
            setBrands(data.brands || []);
          }
        }
      } catch (err) {
        console.error("Failed to load store collection data:", err);
      }
    };

    fetchStoreData();
    return () => {
      isMounted = false;
    };
  }, [propCategories, propProducts, propBrands]);

  // Top-level categories from DB
  const topCategories = useMemo(() => {
    return categories.filter((c) => !c.parentId && !c.parentSlug);
  }, [categories]);

  // 2. ACTIVE CATEGORY STATE
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory.toLowerCase());
  const [activeSubcategory, setActiveSubcategory] = useState<string>(initialSubcategory.toLowerCase());
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Sync if initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory.toLowerCase());
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSubcategory) {
      setActiveSubcategory(initialSubcategory.toLowerCase());
    }
  }, [initialSubcategory]);

  // Find active category DB object
  const activeCategoryObj = useMemo(() => {
    return (
      topCategories.find(
        (c) =>
          c.slug.toLowerCase() === activeCategory ||
          c.name.toLowerCase() === activeCategory
      ) || topCategories[0]
    );
  }, [topCategories, activeCategory]);

  // Subcategories for the active category
  const activeSubcategories = useMemo(() => {
    if (!activeCategoryObj) return [];
    const catId = String(activeCategoryObj._id);
    const catSlug = activeCategoryObj.slug.toLowerCase();

    return categories.filter((c) => {
      const pId = c.parentId ? String(c.parentId) : "";
      const pSlug = (c.parentSlug || "").toLowerCase();
      return (pId && pId === catId) || (pSlug && pSlug === catSlug);
    });
  }, [categories, activeCategoryObj]);

  const subcategoryPillItems = useMemo(() => {
    const list = [{ id: "all", nameEn: "All", nameAr: "الكل" }];
    activeSubcategories.forEach((sub) => {
      list.push({
        id: sub.slug.toLowerCase(),
        nameEn: sub.name,
        nameAr: sub.name,
      });
    });
    return list;
  }, [activeSubcategories]);

  // Brand lookup map
  const brandsMap = useMemo(() => {
    const map: Record<string, { name: string; logo: string }> = {};
    brands.forEach((b) => {
      map[String(b._id)] = { name: b.name, logo: b.logo || "" };
      map[b.name.toLowerCase()] = { name: b.name, logo: b.logo || "" };
    });
    return map;
  }, [brands]);

  // Products belonging to the active category
  const categoryProducts = useMemo(() => {
    const activeSlug = (activeCategoryObj?.slug || activeCategory).toLowerCase();
    const activeName = (activeCategoryObj?.name || "").toLowerCase();

    return products.filter((p) => {
      const pCatSlug = (p.categorySlug || "").toLowerCase();
      const pCatName = (p.category || "").toLowerCase();

      return (
        pCatSlug === activeSlug ||
        pCatName === activeName ||
        (activeSlug === "bedding" && (pCatSlug.includes("bed") || pCatSlug.includes("blanket"))) ||
        (activeSlug === "travel-bags" && (pCatSlug.includes("travel") || pCatSlug.includes("bag") || pCatSlug.includes("trolly") || pCatSlug.includes("trolley"))) ||
        (activeSlug === "footwear" && (pCatSlug.includes("foot") || pCatSlug.includes("shoe") || pCatSlug.includes("flip") || pCatSlug.includes("slide") || pCatSlug.includes("clog")))
      );
    });
  }, [products, activeCategoryObj, activeCategory]);

  // Map to UI Products
  const uiCategoryProducts = useMemo<Product[]>(() => {
    return categoryProducts.map((p) => {
      const brandObj = p.brand
        ? brandsMap[String(p.brand)] ||
          brandsMap[String(p.brand).toLowerCase()] || {
            name: typeof p.brand === "string" ? p.brand : p.brand?.name || "",
            logo: p.brand?.logo || "",
          }
        : { name: "", logo: "" };

      return {
        id: p._id,
        nameEn: p.name,
        nameAr: p.name,
        category: (p.categorySlug || p.category || "bedding").toLowerCase() as any,
        subcategory: (p.subcategorySlug || "").toLowerCase(),
        subcategoryEn: p.subcategorySlug || "",
        subcategoryAr: p.subcategorySlug || "",
        brand: brandObj.name || (typeof p.brand === "string" ? p.brand : ""),
        brandLogo: brandObj.logo || "",
        price: p.salePrice || p.price || 0,
        originalPrice: p.originalPrice || (p.salePrice ? p.price : undefined),
        image: p.image || "/collections/bht-collection-banner.png",
        inStock: true,
        isNew: false,
        isFeatured: Boolean(p.featured),
        colorVariants: p.colors || [],
        sizes: p.sizes || [],
        rating: p.rating || 5,
        reviewsCount: p.reviewCount || 1,
        descriptionEn: p.description || "",
        descriptionAr: p.description || "",
        featuresEn: p.materials || [],
        featuresAr: p.materials || [],
      };
    });
  }, [categoryProducts, brandsMap]);

  // Highest price in this category
  const highestCategoryPrice = useMemo(() => {
    if (uiCategoryProducts.length === 0) return 500;
    return Math.max(...uiCategoryProducts.map((p) => p.price), 500);
  }, [uiCategoryProducts]);

  const [filters, setFilters] = useState<FilterState>({
    subcategory: initialSubcategory.toLowerCase(),
    selectedBrands: [],
    maxPrice: highestCategoryPrice,
    inStockOnly: false,
  });

  // Available brands in this category from real products
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    uiCategoryProducts.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet);
  }, [uiCategoryProducts]);

  // Product counts by subcategory
  const productCountBySubcategory = useMemo(() => {
    const counts: Record<string, number> = {
      all: uiCategoryProducts.length,
    };
    uiCategoryProducts.forEach((p) => {
      if (p.subcategory) {
        counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
      }
    });
    return counts;
  }, [uiCategoryProducts]);

  // Handle category switch
  const handleCategorySwitch = (catSlug: string) => {
    setActiveCategory(catSlug.toLowerCase());
    setActiveSubcategory("all");
    setFilters({
      subcategory: "all",
      selectedBrands: [],
      maxPrice: highestCategoryPrice,
      inStockOnly: false,
    });
    setVisibleCount(12);
  };

  // Handle subcategory pill selection
  const handleSubcategorySelect = (subId: string) => {
    setActiveSubcategory(subId.toLowerCase());
    setFilters((prev) => ({ ...prev, subcategory: subId.toLowerCase() }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setActiveSubcategory("all");
    setFilters({
      subcategory: "all",
      selectedBrands: [],
      maxPrice: highestCategoryPrice,
      inStockOnly: false,
    });
    setSortBy("featured");
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return uiCategoryProducts.filter((product) => {
      if (filters.subcategory !== "all") {
        const pSub = product.subcategory.toLowerCase();
        const fSub = filters.subcategory.toLowerCase();
        if (pSub !== fSub && !pSub.includes(fSub) && !fSub.includes(pSub)) {
          return false;
        }
      }
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }
      if (product.price > filters.maxPrice) {
        return false;
      }
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    });
  }, [uiCategoryProducts, filters]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        return copy.sort((a, b) => a.price - b.price);
      case "price-high":
        return copy.sort((a, b) => b.price - a.price);
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating);
      case "name":
        return copy.sort((a, b) =>
          language === "ar"
            ? a.nameAr.localeCompare(b.nameAr)
            : a.nameEn.localeCompare(b.nameEn)
        );
      case "featured":
      default:
        return copy.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortBy, language]);

  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount);
  }, [sortedProducts, visibleCount]);

  // Active filter chips
  const activeFilterChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = [];

    if (filters.subcategory !== "all") {
      const sub = subcategoryPillItems.find((s) => s.id === filters.subcategory);
      chips.push({
        id: `sub-${filters.subcategory}`,
        label: sub
          ? language === "ar"
            ? sub.nameAr
            : sub.nameEn
          : filters.subcategory,
        onRemove: () => handleSubcategorySelect("all"),
      });
    }

    filters.selectedBrands.forEach((brand) => {
      chips.push({
        id: `brand-${brand}`,
        label: brand,
        onRemove: () => {
          setFilters((prev) => ({
            ...prev,
            selectedBrands: prev.selectedBrands.filter((b) => b !== brand),
          }));
        },
      });
    });

    return chips;
  }, [filters, subcategoryPillItems, language]);

  // Build categoryMeta dynamically from DB
  const categoryMeta: CollectionCategoryMeta = useMemo(() => {
    const name = activeCategoryObj?.name || "Bedding";
    const slug = activeCategoryObj?.slug || "bedding";
    const banner = activeCategoryObj?.image || "/collections/bht-collection-banner.png";
    const desc =
      activeCategoryObj?.description ||
      activeCategoryObj?.longDescription ||
      `Premium ${name} wholesale and retail distribution across the UAE & GCC.`;

    const matchedBrands = brands
      .filter((b) => {
        const bSlug = (b.categorySlug || "").toLowerCase();
        const bCat = (b.category || "").toLowerCase();
        return (
          bSlug === slug.toLowerCase() ||
          bCat === name.toLowerCase() ||
          (slug === "travel-bags" && (bSlug === "travelling" || bCat.includes("travel"))) ||
          (slug === "bedding" && (bSlug === "blankets" || bCat.includes("bed"))) ||
          (slug === "footwear" && (bSlug === "shoes" || bCat.includes("foot")))
        );
      })
      .map((b) => ({
        name: b.name,
        logo: b.logo || "",
      }));

    return {
      id: slug as any,
      slug,
      nameEn: name.toUpperCase(),
      nameAr: name,
      href: `/collections/${slug}`,
      bannerImage: banner,
      taglineEn: `Exclusive ${name} Collections`,
      taglineAr: `تشكيلات ${name} الحصرية`,
      descriptionEn: desc,
      descriptionAr: desc,
      distributorLogos: matchedBrands,
      subcategories: subcategoryPillItems.filter((s) => s.id !== "all"),
    };
  }, [activeCategoryObj, brands, subcategoryPillItems]);

  const categoryTabs: DynamicCategoryTab[] = useMemo(() => {
    return topCategories.map((c) => ({
      id: c._id,
      slug: c.slug,
      nameEn: c.name,
      nameAr: c.name,
    }));
  }, [topCategories]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Announcement Ticker */}
      <AnnouncementTicker />

      {/* 3. Hero Banner */}
      <CollectionHero
        categoryMeta={categoryMeta}
        activeCategoryName={activeCategoryObj?.name || activeCategory}
        totalProducts={uiCategoryProducts.length}
      />

      {/* 4. Sticky Segmented Category Navigation */}
      <CategoryTabsNav
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySwitch}
        categories={categoryTabs}
      />

      {/* 5. Subcategories Pill Filter Bar */}
      {subcategoryPillItems.length > 1 && (
        <SubcategoryPills
          subcategories={subcategoryPillItems}
          activeSubcategory={activeSubcategory}
          onSelectSubcategory={handleSubcategorySelect}
          productCountBySubcategory={productCountBySubcategory}
        />
      )}

      {/* 6. Editorial Collection Introduction */}
      <CollectionIntro
        categoryMeta={categoryMeta}
        productCount={uiCategoryProducts.length}
      />

      {/* 7. Product Toolbar */}
      <ProductToolbar
        productCount={displayedProducts.length}
        totalCount={filteredProducts.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen((prev) => !prev)}
        gridColumns={gridColumns}
        onGridColumnsChange={setGridColumns}
        activeFilters={activeFilterChips}
        onClearAllFilters={handleResetFilters}
      />

      {/* 8. Main Product Grid Section */}
      <main className="w-full bg-[#FAF9F7]/40 py-8 sm:py-12 flex-1">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {displayedProducts.length > 0 ? (
            <>
              <div
                className={`grid gap-3 sm:gap-5 lg:gap-6 ${
                  gridColumns === 3
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < sortedProducts.length && (
                <div className="flex flex-col items-center justify-center mt-12 sm:mt-16 gap-3">
                  <p className="text-xs text-neutral-500 font-medium">
                    {language === "ar"
                      ? `عرض ${displayedProducts.length} من ${sortedProducts.length} منتج`
                      : `Showing ${displayedProducts.length} of ${sortedProducts.length} products`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="px-8 py-3 bg-white text-bht-charcoal font-bold text-xs uppercase tracking-wider rounded-xl border border-neutral-300 hover:border-bht-charcoal shadow-2xs hover:shadow-sm transition-all duration-200"
                  >
                    {language === "ar" ? "تحميل المزيد" : "Load More Products"}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Clean Empty State: Strictly DB Driven */
            <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-neutral-200/80 p-8 shadow-xs max-w-xl mx-auto my-8">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                <PackageX className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {language === "ar"
                  ? "لا توجد منتجات متاحة حالياً"
                  : "No Products Available in this Category"}
              </h3>
              <p className="text-sm text-neutral-500 max-w-md mb-6 leading-relaxed">
                {language === "ar"
                  ? "لم يتم إضافة أي منتجات في هذا القسم بعد. تصفح الأقسام الأخرى أو تواصل مع فريق المبيعات للاستفسارات المباشرة."
                  : "No products are currently available in this category. Browse our other collections or speak directly with our sales team."}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-bht-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 9. Related Collections */}
      <RelatedCollections currentCategory={activeCategory as any} />

      {/* 10. Filter Sidebar Drawer */}
      <ProductFilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        availableBrands={availableBrands}
        availableSubcategories={subcategoryPillItems.filter((s) => s.id !== "all")}
        highestPrice={highestCategoryPrice}
        onResetFilters={handleResetFilters}
      />

      {/* 11. Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* 12. Site Footer */}
      <Footer />
    </div>
  );
};
