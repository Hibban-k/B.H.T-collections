"use client";
// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Warehouse, Sparkles, ShieldCheck } from "lucide-react";
import { clientele } from "@/lib/data";

const values = [
  {
    icon: Award,
    title: "15+ Years Expertise",
    description: "Founded in 2009 by an industry expert with extensive Korean supply chain experience.",
  },
  {
    icon: Warehouse,
    title: "50,000 Sq Ft Warehouse",
    description: "Massive storage and logistics hub in Dubai ensuring immediate dispatch across the GCC.",
  },
  {
    icon: Sparkles,
    title: "4 Exclusive Factories",
    description: "Direct manufacturing partnerships dedicated strictly to our brands and standards.",
  },
  {
    icon: ShieldCheck,
    title: "Honest Sourcing",
    description: "Highest-grade materials at competitive pricing without ever cutting corners.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent pb-24">
      {/* ── Compact Editorial Header ───────────────────────── */}
      <header className="relative w-full pt-28 pb-20 md:pt-32 md:pb-24 text-center px-4 sm:px-6 min-h-[30vh] flex flex-col items-center justify-center overflow-hidden mb-12">
        <Image 
          src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2000&auto=format&fit=crop" 
          alt="Premium interiors" 
          fill 
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-[#13233A]/80 z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-[#3C97C5] text-[10.5px] font-bold uppercase tracking-[0.22em] mb-4"
          >
            Our Heritage
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight drop-shadow-md"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Blanket House Trading
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-[15px] leading-relaxed max-w-2xl mx-auto drop-shadow"
          >
            From a specialist supplier in 2009 to a comprehensive GCC trading powerhouse. We build direct factory 
            relationships to bring you uncompromising quality.
          </motion.p>
        </div>
      </header>

      {/* ── 3 Stat Callouts ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="bg-white/96 border border-[#D8DCE2] rounded-2xl shadow-sm p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#D8DCE2] text-center">
            <div className="pt-4 md:pt-0">
              <p className="text-[#13233A] text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair-display)" }}>2009</p>
              <p className="text-[#25262C]/60 text-[10px] uppercase tracking-widest font-bold">Established</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-[#13233A] text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair-display)" }}>500+</p>
              <p className="text-[#25262C]/60 text-[10px] uppercase tracking-widest font-bold">GCC Clients</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-[#13233A] text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair-display)" }}>50K+</p>
              <p className="text-[#25262C]/60 text-[10px] uppercase tracking-widest font-bold">Sq Ft Warehouse</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-[#13233A] text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair-display)" }}>4</p>
              <p className="text-[#25262C]/60 text-[10px] uppercase tracking-widest font-bold">Exclusive Factories</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chronological Story ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        {/* Chapter 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
            className="order-2 md:order-1"
          >
            <div className="flex h-[3px] w-12 mb-6 rounded-full overflow-hidden">
              <div className="flex-1 bg-[#D02E30]" />
              <div className="flex-1 bg-[#238D7D]" />
              <div className="flex-1 bg-[#3C97C5]" />
            </div>
            <h2 className="text-3xl font-bold text-[#13233A] mb-5" style={{ fontFamily: "var(--font-playfair-display)" }}>
              The 2009 Origin
            </h2>
            <p className="text-[#25262C]/75 text-[15px] leading-relaxed mb-4">
              Founded in Dubai, B.H.T. Collections began with a simple premise: bridge the gap between premium Korean textile manufacturing and the growing GCC market.
            </p>
            <p className="text-[#25262C]/75 text-[15px] leading-relaxed">
              Our founder spent over a decade working directly with leading suppliers before launching Blanket House Trading. This deep-rooted knowledge of materials, weaving techniques, and factory relationships became our competitive advantage.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D8DCE2] shadow-md"
          >
            <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop"
              alt="Premium bedding textiles"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Chapter 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D8DCE2] shadow-md"
          >
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
              alt="Warehouse and logistics"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <div className="flex h-[3px] w-12 mb-6 rounded-full overflow-hidden">
              <div className="flex-1 bg-[#D02E30]" />
              <div className="flex-1 bg-[#238D7D]" />
              <div className="flex-1 bg-[#3C97C5]" />
            </div>
            <h2 className="text-3xl font-bold text-[#13233A] mb-5" style={{ fontFamily: "var(--font-playfair-display)" }}>
              Scale &amp; Distribution
            </h2>
            <p className="text-[#25262C]/75 text-[15px] leading-relaxed mb-4">
              Today, we operate from a massive 50,000+ square foot logistics hub in Dubai. This allows us to hold significant inventory and ensure immediate dispatch.
            </p>
            <p className="text-[#25262C]/75 text-[15px] leading-relaxed">
              We manage four exclusive manufacturing partnerships. This means we control the quality from raw yarn to final stitch, supplying over 500 hypermarkets, hotels, and retailers across the UAE, Oman, Qatar, Bahrain, Kuwait, and Saudi Arabia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Values Grid ────────────────────────────────────── */}
      <section className="bg-[#13233A] py-24 mb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair-display)" }}>
              How We Operate
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Concrete operational advantages that translate to better quality and pricing for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  variants={fadeUp}
                  className="bg-white/05 border border-white/10 rounded-2xl p-8"
                >
                  <div className="w-12 h-12 bg-[#D02E30]/20 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#D02E30]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair-display)" }}>
                    {val.title}
                  </h3>
                  <p className="text-white/60 text-[15px] leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Client Proof (Monochrome) ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-12">
          <p className="text-[#238D7D] text-[10.5px] font-bold uppercase tracking-[0.22em] mb-3">
            B2B &amp; Institutional
          </p>
          <h2 className="text-3xl font-bold text-[#13233A]" style={{ fontFamily: "var(--font-playfair-display)" }}>
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="bg-white/96 border border-[#D8DCE2] rounded-2xl p-10 flex flex-wrap justify-center gap-10 md:gap-16 items-center shadow-sm">
          {clientele.filter(c => c.logo).map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative w-28 h-12 md:w-36 md:h-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={client.logo!}
                alt={client.name}
                fill
                className="object-contain"
                sizes="150px"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold text-[#13233A] mb-6" style={{ fontFamily: "var(--font-playfair-display)" }}>
          Ready to experience the quality?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/collections" className="btn-primary">
            Shop for Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Wholesale Enquiries
          </Link>
        </div>
      </section>
    </div>
  );
}
