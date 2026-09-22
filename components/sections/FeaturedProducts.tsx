"use client";
// components/sections/FeaturedProducts.tsx — design-patch: 4-col grid, opaque card surfaces
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { formatAED, calculateDiscount } from "@/lib/utils";

interface FeaturedProductsProps {
  initialProducts: any[];
}

export default function FeaturedProducts({ initialProducts }: FeaturedProductsProps) {
  // Filter out obvious placeholder products (those with extreme discounts or test names)
  const products = (initialProducts || []).filter((p) => {
    if (!p.name || p.name.length < 4) return false;
    if (p.originalPrice && p.price) {
      const disc = ((p.originalPrice - p.price) / p.originalPrice) * 100;
      if (disc > 70) return false; // hide implausible 90-99% discounts
    }
    return true;
  }).slice(0, 8);

  return (
    <section className="section-padding bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-[#D02E30] text-[11px] tracking-[0.22em] font-bold uppercase mb-3">
              Our Range
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#13233A]"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Featured Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#13233A] hover:text-[#D02E30] transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Product grid — 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, index) => {
            const prodKey = product._id || product.id || product.slug;
            const discount = product.originalPrice ? calculateDiscount(product.price, product.originalPrice) : null;
            return (
              <motion.article
                key={prodKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
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
                    {/* Only show badge for reasonable discounts */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 tag-badge !bg-[#13233A] !border-[#13233A] text-[9px]">
                        {product.badge}
                      </div>
                    )}
                    {discount && discount <= 70 && (
                      <div className="absolute top-3 right-3 tag-badge !bg-[#D02E30] !border-[#D02E30] text-[9px]">
                        -{discount}%
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-4">
                    <p className="text-[10px] text-[#D02E30] font-bold tracking-widest uppercase mb-1.5">
                      {product.category}
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
              </motion.article>
            );
          })}
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#6B7280] text-sm">Collections coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
}
