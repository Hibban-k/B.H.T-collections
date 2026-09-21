"use client";
// components/sections/AboutUs.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LogoWatermark from "@/components/ui/LogoWatermark";

export default function AboutUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Watermark */}
      <LogoWatermark opacity={0.05} position="right" size={600} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p
              className="text-[var(--color-primary)] text-xs tracking-[0.2em] font-bold uppercase mb-4"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              Our Heritage
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-[var(--color-dark)] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              A Legacy of Quality Since 2009
            </h2>
            
            <div className="space-y-4 text-sm text-[#64748B] leading-relaxed mb-8">
              <p>
                Blanket House Trading L.L.C. was established in Dubai with a singular vision: to bring the world's finest home textiles and trading goods to the GCC. Over the past decade, we have grown from a specialized blanket supplier into a comprehensive trading powerhouse.
              </p>
              <p>
                Today, we serve over 500+ esteemed clients across 6 GCC countries, spanning major hypermarkets, 5-star hospitality projects, and massive B2B labour camp setups. Our commitment remains unchanged: delivering uncompromised quality, exceptional durability, and outstanding value.
              </p>
            </div>

            <Link href="/about" className="btn-primary">
              Discover Our Story
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-2xl shadow-2xl border border-[#E5E5E5]">
              <Image
                src="https://images.unsplash.com/photo-1615876234886-fd1a88df4bf6?q=80&w=1000&auto=format&fit=crop"
                alt="BHT Collections Office and Textiles"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/40 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-xl border border-white shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0" style={{ fontFamily: "var(--font-playfair-display)" }}>
                    15+
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-dark)]">Years of Excellence</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Trusted across the Middle East</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
