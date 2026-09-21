"use client";
// components/sections/FeaturedProducts.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { formatAED, calculateDiscount } from "@/lib/utils";
import LogoWatermark from "@/components/ui/LogoWatermark";

interface FeaturedProductsProps {
  initialProducts: any[];
}

export default function FeaturedProducts({ initialProducts }: FeaturedProductsProps) {
  const products = initialProducts || [];

  return (
    <section className="section-padding bg-transparent relative overflow-hidden">
      {/* Background Watermark */}
      <LogoWatermark opacity={0.04} position="right" size={600} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p
              className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-2"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              Our Range
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B131F]"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Featured Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="btn-primary !py-2.5 !px-5 text-xs"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => {
            const prodKey = product._id || product.id || product.slug;
            return (
              <motion.article
                key={prodKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <Link href={`/collections/${product.categorySlug}/${product.slug}`} className="group block h-full flex flex-col bg-white p-3 rounded-xl border border-[#F2EBDC] shadow-sm hover:shadow-lg transition-all hover:border-[#1C75BC]/30">
                  {/* Image */}
                  <div className="relative aspect-square bg-[#FAF8F3] overflow-hidden rounded-lg mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 tag-badge !bg-[#0B131F] !border-[#0B131F] text-[10px]">
                        {product.badge}
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 tag-badge !bg-[#D92626] !border-[#D92626] text-[10px] shadow-sm">
                        -{calculateDiscount(product.price, product.originalPrice)}%
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1">
                    <p className="text-[10px] text-[#D92626] font-bold tracking-widest uppercase mb-1">
                      {product.category}
                    </p>
                    <h3
                      className="text-sm md:text-base font-semibold text-[#0B131F] group-hover:text-[#1C75BC] transition-colors leading-snug mb-2"
                      style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2 mt-auto">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating || 5)
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-[#E2E8F0] fill-[#E2E8F0]"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#64748B] font-medium">({product.reviewCount || 12})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1 border-t border-[#FAF8F3]">
                      <span className="text-base md:text-lg font-bold text-[#0B131F]">
                        {formatAED(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#94A3B8] line-through">
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
      </div>
    </section>
  );
}
