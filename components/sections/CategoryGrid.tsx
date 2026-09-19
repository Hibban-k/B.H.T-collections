"use client";
// components/sections/CategoryGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import LogoWatermark from "@/components/ui/LogoWatermark";

const borderColors = [
  "bg-[#D92626]", // Red
  "bg-[#1C75BC]", // Blue
  "bg-[#22C55E]", // Green
  "bg-[#D92626]", // Red
];

export default function CategoryGrid() {
  return (
    <section className="">
      {/* Background Watermark */}
      <LogoWatermark opacity={0.04} position="center" size={550} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile: Stacked layout */}
        <div className="lg:hidden">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p
              className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-3"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              SHOP BY CATEGORY
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              <span className="text-[#4A4A4A]">Our</span>{" "}
              <span className="text-[#D92626]">Collections</span>
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              From cozy bed sheets to elegant pillow covers, find everything you need to make your home feel more comfortable and stylish.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#D92626] transition-colors shadow-md"
              style={{ 
                fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)",
                color: "white"
              }}
            >
              Explore All Collections
              <ArrowRight className="w-4 h-4" style={{ color: "white" }} />
            </Link>
          </motion.div>

          {/* Mobile Grid */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/collections/${cat.slug}`}
                  className="group block"
                  aria-label={`Browse ${cat.name}`}
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all border-2 border-gray-100 hover:border-gray-200">
                    {/* Product Image */}
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Colored Bottom Border */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${borderColors[index % borderColors.length]}`} />
                  </div>

                  {/* Category Title with Arrow */}
                  <div className="flex items-center justify-between mt-3 px-1">
                    <h3
                      className="text-[#0B131F] font-semibold text-sm"
                      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                    >
                      {cat.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#D92626] transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className="hidden lg:flex gap-8 lg:gap-12">
          {/* Left Section - Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start"
          >
            <p
              className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-3"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              SHOP BY CATEGORY
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              <span className="text-[#4A4A4A]">Our</span>{" "}
              <span className="text-[#D92626]">Collections</span>
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              From cozy bed sheets to elegant pillow covers, find everything you need to make your home feel more comfortable and stylish.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#D92626] transition-colors shadow-md"
              style={{ 
                fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)",
                color: "white"
              }}
            >
              Explore All Collections
              <ArrowRight className="w-4 h-4" style={{ color: "white" }} />
            </Link>
          </motion.div>

          {/* Right Section - Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-2/3"
          >
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-48 snap-start"
                >
                  <Link
                    href={`/collections/${cat.slug}`}
                    className="group block"
                    aria-label={`Browse ${cat.name}`}
                  >
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all border-2 border-gray-100 hover:border-gray-200">
                      {/* Product Image */}
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 200px, 192px"
                      />

                      {/* Colored Bottom Border */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${borderColors[index % borderColors.length]}`} />
                    </div>

                    {/* Category Title with Arrow */}
                    <div className="flex items-center justify-between mt-3 px-1">
                      <h3
                        className="text-[#0B131F] font-semibold text-sm"
                        style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                      >
                        {cat.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#D92626] transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

