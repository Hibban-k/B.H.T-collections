// app/collections/[category]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatAED, calculateDiscount } from "@/lib/utils";
import LogoWatermark from "@/components/ui/LogoWatermark";
import { ProductService } from "@/lib/services/product.service";
import { CategoryService } from "@/lib/services/category.service";

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string }>;
}

import { constructMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const allCategories = await CategoryService.getCategories();
  const cat = allCategories.find((c) => c.slug === category);
  if (!cat || cat.status !== "active") return {};
  
  return constructMetadata({
    title: `${cat.name} Collection | B.H.T. Collections`,
    description: `${cat.description}. Premium quality home textiles, delivered across UAE.`,
    image: cat.image,
    path: `/collections/${cat.slug}`
  });
}

import { generateBreadcrumbSchema, generateItemListSchema, generateFaqSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const allCategories = await CategoryService.getCategories();
  const cat = allCategories.find((c) => c.slug === category);
  if (!cat || cat.status !== "active") notFound();

  const products = await ProductService.getProducts({
    status: "published",
    categorySlug: category,
    showOnCollection: true,
  });

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: cat.name, path: `/collections/${cat.slug}` }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema(products, getAbsoluteUrl(`/collections/${cat.slug}`))) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />
      {cat.faq && cat.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(cat.faq)) }}
        />
      )}
      {/* Editorial Header with Background Image */}
      <header className="relative w-full pt-28 pb-20 md:pt-32 md:pb-24 text-center px-4 sm:px-6 min-h-[30vh] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src={cat.image || "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?q=80&w=2000&auto=format&fit=crop"}
          alt={cat.name}
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-[#13233A]/75 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto">
          <p className="text-[#3C97C5] text-[10.5px] font-bold uppercase tracking-[0.22em] mb-4">
            B.H.T. Collections
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5 drop-shadow-md"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            {cat.name}
          </h1>
          <p className="text-white/80 text-[15px] leading-relaxed max-w-xl mx-auto">
            {cat.description}
          </p>
        </div>
      </header>

      {/* Category Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-white/97 backdrop-blur-md border-y border-[#D8DCE2] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto hide-scrollbar py-3.5 gap-2 snap-x">
            <Link
              href="/collections"
              className="snap-start shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F8F7F4] text-[#13233A] text-[13px] font-bold tracking-wide border border-[#D8DCE2] hover:border-[#13233A] transition-colors"
            >
              All Collections
            </Link>
            {allCategories.filter((c) => c.status === "active").map((c) => (
              <Link
                key={c._id}
                href={`/collections/${c.slug}`}
                className={`snap-start shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide border transition-colors ${
                  c.slug === category
                    ? "bg-[#13233A] text-white border-[#13233A]"
                    : "bg-[#F8F7F4] text-[#13233A] border-[#D8DCE2] hover:border-[#13233A]"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#25262C]/60 text-sm font-semibold uppercase tracking-wider">
            {products.length} Products in {cat.name}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#D8DCE2]">
              <p className="text-[#64748B] mb-4">No products found in this collection yet.</p>
              <Link href="/collections" className="btn-primary">
                View all collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <article key={product._id}>
                  <Link
                    href={`/collections/${product.categorySlug}/${product.slug}`}
                    className="group flex flex-col h-full bg-white border border-[#D8DCE2] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] bg-[#F8F7F4] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {/* Badge priority: Discount first, then product.badge */}
                      {product.originalPrice && calculateDiscount(product.price, product.originalPrice) <= 70 ? (
                        <div className="absolute top-3 right-3 tag-badge !bg-[#D02E30] !border-[#D02E30] text-[9px]">
                          -{calculateDiscount(product.price, product.originalPrice)}%
                        </div>
                      ) : product.badge ? (
                        <div className="absolute top-3 left-3 tag-badge !bg-[#13233A] !border-[#13233A] text-[9px]">
                          {product.badge}
                        </div>
                      ) : null}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1 p-4">
                      <p className="text-[10px] text-[#D02E30] font-bold tracking-widest uppercase mb-1.5">
                        {product.category || cat.name}
                      </p>
                      <h3
                        className="text-sm font-semibold text-[#13233A] group-hover:text-[#D02E30] transition-colors leading-snug mb-3 flex-1 line-clamp-2"
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                      >
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating || 5)
                                  ? "fill-[#F59E0B] text-[#F59E0B]"
                                  : "text-[#D8DCE2] fill-[#D8DCE2]"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#6B7280]">({product.reviewCount || 1})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 pt-3 border-t border-[#D8DCE2]">
                        <span className="text-base font-bold text-[#13233A]">
                          {formatAED(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#9CA3AF] line-through">
                            {formatAED(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

        {/* Collection SEO Details */}
        {(cat.longDescription || (cat.faq && cat.faq.length > 0)) && (
          <div className="mt-20 pt-16 border-t border-[#D8DCE2] max-w-4xl mx-auto">
            {cat.longDescription && (
              <div className="mb-16">
                <div 
                  dangerouslySetInnerHTML={{ __html: cat.longDescription }} 
                  className="prose prose-sm sm:prose-base max-w-none text-[#25262C]/80 prose-headings:font-playfair prose-headings:text-[#13233A] prose-headings:font-bold prose-headings:mb-4 prose-a:text-[#D02E30] prose-a:no-underline hover:prose-a:underline" 
                />
              </div>
            )}

            {cat.faq && cat.faq.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#13233A] mb-6" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {cat.faq.map((item, i) => (
                    <div key={i} className="bg-[#F8F7F4] p-5 sm:p-6 rounded-2xl border border-[#D8DCE2]">
                      <h3 className="font-bold text-[#13233A] text-[15px] mb-2">{item.question}</h3>
                      <p className="text-[#25262C]/70 text-[14px] leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
