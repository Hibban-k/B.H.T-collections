"use client";
// components/sections/CategoryGrid.tsx — design-patch: bento grid with 4:5 ratio
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function CategoryGrid() {
  // First category gets the featured (tall) slot
  const [featured, ...rest] = categories;

  return (
    <section className="section-padding bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#D02E30] text-[11px] tracking-[0.22em] font-bold uppercase mb-4">
            Browse by Category
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#13233A] mb-4"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Shop by Collection
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-sm leading-relaxed">
            Meticulously crafted premium home textiles for every bedroom, designed for the UAE lifestyle.
          </p>
        </motion.div>

        {/* Bento grid — desktop: featured (large) + 3 standard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[340px]">
          {/* Featured tile — spans 2 columns and 2 rows */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65 }}
              className="col-span-2 row-span-2"
            >
              <Link
                href={`/collections/${featured.slug}`}
                className="group relative flex flex-col h-full overflow-hidden rounded-3xl bg-[#13233A]"
              >
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Accent edge — BHT red left border */}
                <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-[#D02E30] rounded-full" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#13233A]/85 via-[#13233A]/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-[#238D7D] text-[10px] font-bold tracking-widest uppercase mb-2 block">
                    Most Loved · {featured.productCount} Products
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-playfair-display)" }}
                  >
                    {featured.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                    Shop Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Supporting tiles */}
          {rest.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <Link
                href={`/collections/${cat.slug}`}
                className="group relative flex h-full overflow-hidden rounded-2xl bg-[#13233A]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Accent top border */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-[#D02E30] rounded-full" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#13233A]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-white/55 text-[9px] font-bold tracking-widest uppercase mb-1 block">
                    {cat.productCount} Products
                  </span>
                  <h3
                    className="text-base font-bold text-white leading-tight group-hover:text-[#D02E30] transition-colors"
                    style={{ fontFamily: "var(--font-playfair-display)" }}
                  >
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-white/60 mt-2 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* View All Collections Tile to fill the empty spot */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.6, delay: (rest.length + 1) * 0.1 }}
          >
            <Link
              href="/collections"
              className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white/40 border border-[#D8DCE2] border-dashed hover:bg-white hover:border-[#13233A] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-300 items-center justify-center p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#13233A]/5 text-[#13233A] group-hover:bg-[#13233A] group-hover:text-white flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110">
                <ArrowRight className="w-5 h-5" />
              </div>
              <h3
                className="text-[17px] font-bold text-[#13233A] leading-tight mb-1"
                style={{ fontFamily: "var(--font-playfair-display)" }}
              >
                View All
              </h3>
              <span className="text-[#25262C]/60 text-[10px] font-bold tracking-widest uppercase block">
                Collections
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
