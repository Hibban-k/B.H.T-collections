"use client";
// components/sections/WhyBHT.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import LogoWatermark from "@/components/ui/LogoWatermark";

const reasons = [
  {
    title: "Sourced from Trusted Mills",
    description: "We work directly with certified textile manufacturers who share our dedication to premium materials and craftsmanship.",
  },
  {
    title: "Curated for the UAE Climate",
    description: "Our collections are specifically chosen for life in the UAE — extra warm multi-ply blankets for AC rooms, light linens for summer.",
  },
  {
    title: "Tested for Durability & Anti-Pilling",
    description: "Every product passes strict quality inspections for pilling resistance, colorfastness, and wash longevity.",
  },
  {
    title: "Customer-First Service",
    description: "From quick enquiries on WhatsApp to fast delivery across all seven Emirates, we prioritize your satisfaction.",
  },
];

export default function WhyBHT() {
  return (
    <section className="section-padding bg-transparent relative overflow-hidden">
      {/* Background Watermark */}
      <LogoWatermark opacity={0.04} position="left" size={600} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg border border-[#F2EBDC]">
              <Image
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=85"
                alt="Premium bedding quality — B.H.T. Collections"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-5 -right-5 md:-right-8 bg-[#0B131F] text-white p-5 min-w-[160px] rounded-xl shadow-xl border border-[#1A2433]">
              <div
                className="text-3xl font-bold text-[#D92626]"
                style={{ fontFamily: "var(--font-playfair-display)" }}
              >
                5,000+
              </div>
              <div className="text-xs font-semibold text-white/90 mt-1">Satisfied Families</div>
              <div className="text-xs text-[#94A3B8]">Across UAE & GCC</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-4"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              Why Choose Us
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              The B.H.T. COLLECTIONS Difference
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-8">
              We believe that quality sleep starts with exceptional textiles. B.H.T. Collections was founded on a simple promise — to bring luxury blankets and home textiles to families across the UAE at honest prices.
            </p>

            <ul className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.li
                  key={reason.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className="flex gap-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#D92626] shrink-0 mt-0.5" />
                  <div>
                    <h3
                      className="text-sm font-bold text-[#0B131F] mb-1"
                      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                    >
                      {reason.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

