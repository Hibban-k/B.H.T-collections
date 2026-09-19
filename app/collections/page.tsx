// app/collections/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { formatAED, calculateDiscount } from "@/lib/utils";
import LogoWatermark from "@/components/ui/LogoWatermark";
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
  const [products, categories] = await Promise.all([
    ProductService.getProducts({ status: "published", showOnCollection: true }),
    CategoryService.getCategories(),
  ]);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema(products, getAbsoluteUrl("/collections"))) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />
      {/* Page Hero */}
      <div className="relative overflow-hidden bg-[#0B131F] text-white py-16 md:py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="text-[#D92626] text-xs tracking-[0.25em] font-bold uppercase mb-4 bg-[#D92626]/20 inline-block px-3 py-1 rounded"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            B.H.T. COLLECTIONS
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
          >
            Our Collections
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Premium home textiles designed for exceptional comfort, warmth, and everyday elegance
          </p>
        </div>
      </div>

      {/* Categories nav */}
      <div className="border-b border-[#F2EBDC] bg-ivory/90 backdrop-blur-md shadow-xs sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap gap-2.5">
          <Link
            href="/collections"
            className="tag-badge bg-[#0B131F]! text-white! border-[#0B131F]! py-2.5! px-5! text-xs font-bold"
          >
            All Collections
          </Link>
          {categories.filter((c) => c.status === "active").map((cat) => (
            <Link
              key={cat._id}
              href={`/collections/${cat.slug}`}
              className="tag-badge bg-white! text-[#0B131F]! border-[#E2E8F0]! hover:bg-[#1C75BC]! hover:text-white! hover:border-[#1C75BC]! py-2.5! px-5! text-xs font-semibold transition-all shadow-xs"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-[#64748B] mb-8">{products.length} products available</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <article key={product._id}>
                <Link
                  href={`/collections/${product.categorySlug}/${product.slug}`}
                  className="group h-full flex flex-col bg-white p-3 rounded-xl border border-[#F2EBDC] shadow-sm hover:shadow-lg transition-all hover:border-[#1C75BC]/30"
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
                      <div className="absolute top-2 left-2 tag-badge bg-[#0B131F]! border-[#0B131F]! text-[9px]! px-2! py-0.5!">
                        {product.badge}
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-2 right-2 tag-badge bg-[#D92626]! border-[#D92626]! text-[9px]! px-2! py-0.5! shadow-sm">
                        -{calculateDiscount(product.price, product.originalPrice)}%
                      </div>
                    )}
                  </div>
                  <p className="text-[9px] text-[#D92626] font-bold tracking-widest uppercase mb-1">
                    {product.category}
                  </p>
                  <h2
                    className="text-sm font-semibold text-[#0B131F] group-hover:text-[#1C75BC] transition-colors leading-snug mb-1.5"
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
        </div>
      </div>

      {/* Contact CTA */}
      <div className=" py-12 text-center border-t border-[#F2EBDC]">
        <h3
          className="text-2xl font-bold text-[#0B131F] mb-3"
          style={{ fontFamily: "var(--font-playfair-display)" }}
        >
          Looking for a Specific Blanket or Collection?
        </h3>
        <p className="text-[#64748B] text-sm mb-6 max-w-md mx-auto">
          Contact our team via WhatsApp or message — we&apos;re happy to assist with sizes, custom options, or bulk orders.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/971558879237"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            WhatsApp Us
          </a>
          <Link
            href="/contact"
            className="btn-secondary"
          >
            Contact Form <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
