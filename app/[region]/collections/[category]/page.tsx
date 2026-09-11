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
  params: Promise<{ region: string; category: string }>;
}

import { constructMetadata } from "@/lib/seo/metadata";
import { RegionService } from "@/lib/services/region.service";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, category } = await params;
  
  const regionData = await RegionService.getRegionByCode(region);
  if (!regionData) return {};

  const allCategories = await CategoryService.getCategories();
  const cat = allCategories.find((c) => c.slug === category);
  if (!cat || cat.status !== "active") return {};
  
  return constructMetadata({
    title: `${cat.name} Collection in ${regionData.name} | B.H.T. Collections`,
    description: `Shop premium ${cat.name.toLowerCase()} online in ${regionData.name}. Discover elegant designs and unparalleled comfort delivered across ${regionData.name}.`,
    image: cat.image,
    path: `/${region}/collections/${cat.slug}`
  });
}

import { generateBreadcrumbSchema, generateItemListSchema, generateFaqSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export default async function CategoryPage({ params }: Props) {
  const { region, category } = await params;

  const regionData = await RegionService.getRegionByCode(region);
  if (!regionData) notFound();

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
      {/* Breadcrumb */}
      <div className="border-b border-[#F2EBDC] bg-[#FAFAF7]/80 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#64748B]">
          <Link href={`/${region}`} className="hover:text-[#1C75BC] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${region}/collections`} className="hover:text-[#1C75BC] transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-[#0B131F] font-bold">{cat.name}</span>
        </div>
      </div>

      {/* Category Hero */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-[#0B131F]">
        <Image
          src={cat.image || "/categories/bedsheets.png"}
          alt={cat.name}
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0B131F]/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <p
            className="text-[#D92626] text-xs tracking-[0.25em] font-bold uppercase mb-3 bg-[#D92626]/20 px-3 py-1 rounded"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            B.H.T. COLLECTIONS {regionData.name.toUpperCase()}
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
          >
            {cat.name}
          </h1>
          <p className="text-white/80 text-sm max-w-sm font-medium">{cat.description}</p>
        </div>
      </div>

      {/* Categories nav */}
      <div className="border-b border-[#F2EBDC] bg-[#FAFAF7]/90 backdrop-blur-md shadow-xs sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap gap-2.5">
          <Link
            href={`/${region}/collections`}
            className="tag-badge !bg-white !text-[#0B131F] !border-[#E2E8F0] hover:!bg-[#0B131F] hover:!text-white !py-2.5 !px-5 text-xs font-semibold transition-all shadow-xs"
          >
            All Collections
          </Link>
          {allCategories.filter((c) => c.status === "active").map((c) => (
            <Link
              key={c._id}
              href={`/${region}/collections/${c.slug}`}
              className={`tag-badge !py-2.5 !px-5 text-xs font-semibold transition-all shadow-xs ${c.slug === category
                  ? "!bg-[#0B131F] !text-white !border-[#0B131F] font-bold"
                  : "!bg-white !text-[#0B131F] !border-[#E2E8F0] hover:!bg-[#1C75BC] hover:!text-white hover:!border-[#1C75BC]"
                }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-[#64748B] mb-8">{products.length} products in {cat.name}</p>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#F2EBDC]">
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
                    href={`/${region}/collections/${product.categorySlug}/${product.slug}`}
                    className="group block h-full flex flex-col bg-white p-3 rounded-xl border border-[#F2EBDC] shadow-sm hover:shadow-lg transition-all hover:border-[#1C75BC]/30"
                  >
                    <div className="relative aspect-square bg-[#FAF8F3] overflow-hidden rounded-lg mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {product.badge && (
                        <div className="absolute top-2 left-2 tag-badge !bg-[#0B131F] !border-[#0B131F] !text-[9px] !px-2 !py-0.5">
                          {product.badge}
                        </div>
                      )}
                      {product.originalPrice && (
                        <div className="absolute top-2 right-2 tag-badge !bg-[#D92626] !border-[#D92626] !text-[9px] !px-2 !py-0.5 shadow-sm">
                          -{calculateDiscount(product.price, product.originalPrice)}%
                        </div>
                      )}
                    </div>
                    <h2
                      className="text-sm font-semibold text-[#0B131F] group-hover:text-[#1C75BC] transition-colors leading-snug mb-2"
                      style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-1 mb-2 mt-auto">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-2.5 h-2.5 ${i < Math.floor(product.rating || 5)
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-[#E2E8F0] fill-[#E2E8F0]"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#64748B] font-medium">({product.reviewCount || 12})</span>
                    </div>
                    <div className="flex items-baseline gap-2 pt-1 border-t border-[#FAF8F3]">
                      <span className="text-sm font-bold text-[#0B131F]">
                        {formatAED(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#94A3B8] line-through">
                          {formatAED(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* SEO Category Description */}
        {cat.longDescription && (
          <div className="mt-16 pt-10 border-t border-[#F2EBDC] max-w-4xl text-[#64748B]">
            <div dangerouslySetInnerHTML={{ __html: cat.longDescription }} className="prose prose-sm sm:prose-base max-w-none prose-headings:font-playfair prose-headings:text-[#0B131F] prose-a:text-[#1C75BC] prose-a:no-underline hover:prose-a:underline" />
          </div>
        )}

        {/* FAQ Section */}
        {cat.faq && cat.faq.length > 0 && (
          <div className="mt-12 pt-10 border-t border-[#F2EBDC] max-w-4xl">
            <h2 className="text-2xl font-bold text-[#0B131F] mb-6" style={{ fontFamily: "var(--font-playfair-display)" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {cat.faq.map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-[#F2EBDC]">
                  <h3 className="font-bold text-[#0B131F] mb-2">{item.question}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
