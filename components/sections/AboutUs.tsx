"use client";
// components/sections/AboutUs.tsx — design-patch: editorial split with stats
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "2009", label: "Established" },
  { value: "500+", label: "GCC Clients" },
  { value: "50K+", label: "Sq Ft Warehouse" },
];

export default function AboutUs() {
  return (
    <section className="section-padding bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative order-2 md:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
                alt="B.H.T. Collections premium bedding warehouse and showroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13233A]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-white rounded-2xl p-5 shadow-xl border border-[#D8DCE2]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#D02E30] text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0"
                  style={{ fontFamily: "var(--font-playfair-display)" }}>
                  15+
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#13233A] uppercase tracking-wider">Years of Excellence</p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Trusted across the GCC</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            className="order-1 md:order-2"
          >
            {/* Tri-colour stripe */}
            <div className="flex h-[3px] w-16 mb-8 overflow-hidden rounded-full">
              <span className="flex-1 bg-[#D02E30]" />
              <span className="flex-1 bg-[#238D7D]" />
              <span className="flex-1 bg-[#3C97C5]" />
            </div>

            <p className="text-[#D02E30] text-[11px] tracking-[0.22em] font-bold uppercase mb-4">
              Our Heritage
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#13233A] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              A Legacy of Quality Since 2009
            </h2>

            <div className="space-y-4 text-[15px] text-[#6B7280] leading-relaxed mb-8">
              <p>
                Blanket House Trading L.L.C. was established in Dubai by an industry veteran with deep roots in Korean textile manufacturing. From a specialist blanket supplier, we grew into a comprehensive GCC trading powerhouse trusted by 500+ clients.
              </p>
              <p>
                Operating from a 50,000+ sq ft Dubai warehouse with four exclusive GCC factory partnerships, we deliver uncompromised quality directly — no middlemen, no shortcuts.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mb-10">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-[#13233A]" style={{ fontFamily: "var(--font-playfair-display)" }}>
                    {s.value}
                  </p>
                  <p className="text-[11px] text-[#6B7280] uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
