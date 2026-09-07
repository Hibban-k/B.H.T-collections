"use client";
// components/sections/CategoryGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import LogoWatermark from "@/components/ui/LogoWatermark";

export default function CategoryGrid() {
  return (
    <section className="section-padding bg-[#FAF8F3] border-b border-[#F2EBDC] relative overflow-hidden">
      {/* Background Watermark */}
      <LogoWatermark opacity={0.04} position="center" size={550} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p
            className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-3"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            What We Offer
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-4"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Shop By Collection
          </h2>
          <p className="text-[#64748B] max-w-md mx-auto text-sm leading-relaxed">
            Explore our curated range of premium home textiles, designed for the UAE lifestyle
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={`/collections/${cat.slug}`}
                className="group relative block aspect-square rounded-[22px] overflow-hidden bg-[#F2EBDC] shadow-sm hover:shadow-xl transition-all border border-[#F2EBDC] hover:border-[#1C75BC]/40"
                aria-label={`Browse ${cat.name}`}
              >
                {/* Product Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Dark Gradient Overlay for Crisp Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40 transition-opacity duration-300" />

                {/* Top-Left Category Name & Count */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                  <h3
                    className="text-white font-bold text-base sm:text-lg md:text-xl tracking-wider uppercase drop-shadow-sm leading-tight group-hover:text-[#FAF8F3] transition-colors"
                    style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                  >
                    {cat.name}
                  </h3>
                  <span className="text-white/90 text-[11px] font-semibold tracking-wide mt-1 inline-block bg-[#D92626]/90 px-2 py-0.5 rounded-sm">
                    {cat.productCount} Products
                  </span>
                </div>

                {/* Bottom-Right Rounded Notch Cutout with Circular Arrow Icon */}
                <div className="absolute -bottom-[1px] -right-[1px] bg-[#FAF8F3] pt-2.5 pl-2.5 rounded-tl-[20px] z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#F2EBDC] flex items-center justify-center text-[#0B131F] shadow-sm group-hover:bg-[#D92626] group-hover:text-white group-hover:border-[#D92626] transition-all duration-300 transform group-hover:scale-105">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

