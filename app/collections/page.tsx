// app/collections/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { formatAED, calculateDiscount } from "@/lib/utils";
import { ProductService } from "@/lib/services/product.service";
import { CategoryService } from "@/lib/services/category.service";

import { constructMetadata } from "@/lib/seo/metadata";
import { generateItemListSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export const revalidate = 3600;

export const metadata: Metadata = constructMetadata({
  title: "All Collections | B.H.T. Collections",
  description: "Browse our full range of premium blankets, bed linen, comforters and bedspreads. Quality home textiles for every bedroom across the UAE.",
  path: "/collections",
});

export default async function CollectionsPage() {
  const [initialProducts, categories] = await Promise.all([
    ProductService.getProducts({ status: "published", showOnCollection: true }),
    CategoryService.getCategories(),
  ]);

  // Filter out placeholder products (discounts > 70% or short names)
  const products = (initialProducts || []).filter((p) => {
    if (!p.name || p.name.length < 4) return false;
    if (p.originalPrice && p.price) {
      const disc = ((p.originalPrice - p.price) / p.originalPrice) * 100;
      if (disc > 70) return false; // hide implausible discounts
    }
    return true;
  });

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" }
  ];

  return (
    <div className="min-h-screen bg-transparent pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema(products, getAbsoluteUrl("/collections"))) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      {/* Compact Editorial Header */}
      <header className="relative pt-12 pb-8 md:pt-20 md:pb-12 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="text-[#D02E30] text-[10.5px] font-bold uppercase tracking-[0.22em] mb-4">
          B.H.T. Collections
        </p>
        <h1 
          className="text-4xl md:text-5xl font-bold text-[#13233A] mb-5"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Our Collections
        </h1>
        <p className="text-[#25262C]/75 text-[15px] leading-relaxed max-w-xl mx-auto">
          Premium home textiles designed for exceptional comfort, warmth, and everyday elegance.
        </p>
      </header>

      {/* Category Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-white/97 backdrop-blur-md border-y border-[#D8DCE2] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto hide-scrollbar py-3.5 gap-2 snap-x">
            <Link
              href="/collections"
              className="snap-start shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#13233A] text-white text-[13px] font-bold tracking-wide transition-colors"
            >
              All Collections
            </Link>
            {categories.filter((c) => c.status === "active").map((cat) => (
              <Link
                key={cat._id}
                href={`/collections/${cat.slug}`}
                className="snap-start shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F8F7F4] text-[#13233A] text-[13px] font-bold tracking-wide border border-[#D8DCE2] hover:border-[#13233A] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#25262C]/60 text-sm font-semibold uppercase tracking-wider">
            {products.length} Products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const discount = product.originalPrice ? calculateDiscount(product.price, product.originalPrice) : null;
            return (
              <article key={product._id}>
                <Link
                  href={`/collections/${product.categorySlug}/${product.slug}`}
                  className="group flex flex-col h-full bg-white border border-[#D8DCE2] rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] bg-[#F8F7F4] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Badge priority: Discount first, then product.badge */}
                    {discount && discount <= 70 ? (
                      <div className="absolute top-3 left-3 tag-badge !bg-[#D02E30] !border-[#D02E30]">
                        -{discount}%
                      </div>
                    ) : product.badge ? (
                      <div className="absolute top-3 left-3 tag-badge !bg-[#13233A] !border-[#13233A]">
                        {product.badge}
                      </div>
                    ) : null}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-4 md:p-5">
                    <p className="text-[10px] text-[#238D7D] font-bold tracking-[0.2em] uppercase mb-2">
                      {product.category}
                    </p>
                    <h2
                      className="text-[15px] font-bold text-[#13233A] group-hover:text-[#D02E30] transition-colors leading-snug mb-3 flex-1 line-clamp-2"
                      style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                      {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating || 5)
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-[#D8DCE2] fill-[#D8DCE2]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#25262C]/50 font-medium">({product.reviewCount || 1})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2.5 pt-3.5 border-t border-[#D8DCE2]">
                      <span className="text-[17px] font-bold text-[#13233A]">
                        {formatAED(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[13px] text-[#25262C]/40 line-through font-medium">
                          {formatAED(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#D8DCE2] mt-8">
            <p className="text-[#25262C]/60 text-[15px]">No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
