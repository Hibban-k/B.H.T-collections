"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/header/Navbar";
import { AnnouncementTicker } from "@/components/ticker/AnnouncementTicker";
import { Footer } from "@/components/footer/Footer";
import { CollectionHero } from "./CollectionHero";
import { CategoryTabsNav } from "./CategoryTabsNav";
import { SubcategoryPills } from "./SubcategoryPills";
import { CollectionIntro } from "./CollectionIntro";
import { ProductToolbar, SortOption } from "./ProductToolbar";
import { ProductFilterSidebar, FilterState } from "./ProductFilterSidebar";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { RelatedCollections } from "./RelatedCollections";
import {
  ALL_PRODUCTS,
  COLLECTION_CATEGORIES_META,
  Product,
} from "@/data/productsData";
import { PackageX, RotateCcw } from "lucide-react";

interface CollectionPageViewProps {
  initialCategory?: "bedding" | "travel-bags" | "footwear";
  initialSubcategory?: string;
}

export const CollectionPageView: React.FC<CollectionPageViewProps> = ({
  initialCategory = "bedding",
  initialSubcategory = "all",
}) => {
  const { language } = useLanguage();

  // 1. STATE MANAGEMENT
  const [activeCategory, setActiveCategory] = useState<"bedding" | "travel-bags" | "footwear">(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState<string>(initialSubcategory);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const categoryMeta = COLLECTION_CATEGORIES_META[activeCategory] || COLLECTION_CATEGORIES_META["bedding"];

  // Calculate highest price for the category
  const categoryProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const highestCategoryPrice = useMemo(() => {
    return Math.max(...categoryProducts.map((p) => p.price), 500);
  }, [categoryProducts]);

  const [filters, setFilters] = useState<FilterState>({
    subcategory: initialSubcategory,
    selectedBrands: [],
    maxPrice: highestCategoryPrice,
    inStockOnly: false,
  });

  // Available brands in the category
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    categoryProducts.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet);
  }, [categoryProducts]);

  // Product counts by subcategory
  const productCountBySubcategory = useMemo(() => {
    const counts: Record<string, number> = {
      all: categoryProducts.length,
    };
    categoryProducts.forEach((p) => {
      counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
    });
    return counts;
  }, [categoryProducts]);

  // Handle switching category
  const handleCategorySwitch = (catId: "bedding" | "travel-bags" | "footwear" | "all") => {
    if (catId === "all") return;
    setActiveCategory(catId);
    setActiveSubcategory("all");
    setFilters({
      subcategory: "all",
      selectedBrands: [],
      maxPrice: 700,
      inStockOnly: false,
    });
    setVisibleCount(8);
  };

  // Handle subcategory pill selection
  const handleSubcategorySelect = (subId: string) => {
    setActiveSubcategory(subId);
    setFilters((prev) => ({ ...prev, subcategory: subId }));
  };

  // Reset all filters
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

  // 2. FILTER & SORT PRODUCTS
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      // Subcategory check
      if (
        filters.subcategory !== "all" &&
        product.subcategory !== filters.subcategory
      ) {
        return false;
      }
      // Brand check
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }
      // Price check
      if (product.price > filters.maxPrice) {
        return false;
      }
      // Stock check
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    });
  }, [categoryProducts, filters]);

  // Sorted Products
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

  // Paginated visible slice
  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount);
  }, [sortedProducts, visibleCount]);

  // Active filter tags for the toolbar
  const activeFilterChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = [];

    if (filters.subcategory !== "all") {
      const sub = categoryMeta.subcategories.find(
        (s) => s.id === filters.subcategory
      );
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

    if (filters.inStockOnly) {
      chips.push({
        id: "stock-only",
        label: language === "ar" ? "المتوفر فقط" : "In Stock",
        onRemove: () => setFilters((prev) => ({ ...prev, inStockOnly: false })),
      });
    }

    return chips;
  }, [filters, categoryMeta, language]);



  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Category Hero Banner with BHT Winter Offer Banner (Full Bleed Cover like Home Page) */}
        <CollectionHero
          categoryMeta={categoryMeta}
          totalProducts={categoryProducts.length}
        />

        {/* 3. Announcement Ticker (Directly below Hero, matching Home Page layout) */}
        <div className="border-b border-[#F0F0F0]">
          <AnnouncementTicker />
        </div>

        {/* 4. Primary Category Navigation Tabs */}
        <CategoryTabsNav
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySwitch}
        />

        {/* 6. Subcategory Pills */}
        <SubcategoryPills
          subcategories={categoryMeta.subcategories}
          activeSubcategory={filters.subcategory}
          onSelectSubcategory={handleSubcategorySelect}
          productCountBySubcategory={productCountBySubcategory}
        />

        {/* 7. Collection Intro & Authorized Distributor Logos */}
        <CollectionIntro
          categoryMeta={categoryMeta}
          productCount={categoryProducts.length}
        />

        {/* 8. Main Product Grid Section with Filters */}
        <section className="w-full bg-white py-8" aria-label="Product Catalogue">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Toolbar */}
            <ProductToolbar
              productCount={displayedProducts.length}
              totalCount={sortedProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isFilterOpen={isFilterOpen}
              onToggleFilter={() => setIsFilterOpen((prev) => !prev)}
              gridColumns={gridColumns}
              onGridColumnsChange={setGridColumns}
              activeFilters={activeFilterChips}
              onClearAllFilters={handleResetFilters}
            />

            {/* Layout Container: Sidebar + Grid */}
            <div className="flex items-start">
              {/* Filter Sidebar */}
              <ProductFilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFiltersChange={setFilters}
                availableBrands={availableBrands}
                availableSubcategories={categoryMeta.subcategories}
                highestPrice={highestCategoryPrice}
                onResetFilters={handleResetFilters}
              />

              {/* Product Grid Area */}
              <div className="flex-1 min-w-0">
                {displayedProducts.length > 0 ? (
                  <>
                    <div
                      className={`grid gap-4 sm:gap-6 ${
                        gridColumns === 4
                          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                          : "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
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
                      <div className="mt-12 text-center">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((prev) => prev + 8)}
                          className="px-8 py-3 bg-white hover:bg-bht-charcoal text-bht-charcoal hover:text-white rounded-xl text-xs font-black uppercase tracking-wider border-2 border-bht-charcoal transition-all shadow-xs hover:shadow-md"
                        >
                          {language === "ar"
                            ? `عرض المزيد (${sortedProducts.length - visibleCount} متبقية)`
                            : `Load More Products (${sortedProducts.length - visibleCount} Remaining)`}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  /* EMPTY STATE */
                  <div className="py-20 text-center bg-[#FAFAFA] rounded-3xl border border-dashed border-[#D5D5D5] p-8 max-w-lg mx-auto">
                    <PackageX className="w-12 h-12 text-gray-400 mx-auto mb-3 stroke-[1.5]" />
                    <h3 className="text-lg font-black text-bht-charcoal mb-1">
                      {language === "ar" ? "لم نجد أي منتجات" : "No Products Found"}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6">
                      {language === "ar"
                        ? "جرب تعديل الفلاتر أو تصفح تشكيلة أخرى لاستكشاف خيارات إضافية."
                        : "Try adjusting your filters or search options to explore more products."}
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-bht-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === "ar" ? "إعادة ضبط جميع الفلاتر" : "Reset All Filters"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 9. Related Collections Showcase */}
        <RelatedCollections currentCategory={activeCategory} />
      </main>

      {/* 10. Quick View Interactive Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* 11. Footer */}
      <Footer />
    </div>
  );
};
