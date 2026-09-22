"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Warehouse, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { clientele } from "@/lib/data";

const values = [
  {
    icon: Sparkles,
    title: "Uncompromising Quality",
    description: "Sourcing premium yarns and employing rigorous quality control at every stage.",
  },
  {
    icon: Warehouse,
    title: "Scale & Reliability",
    description: "50,000 sq ft Dubai hub ensures we never run out of stock when you need it most.",
  },
  {
    icon: ShieldCheck,
    title: "Factory Direct",
    description: "Our exclusive partnerships mean you get wholesale pricing without middlemen.",
  },
  {
    icon: Award,
    title: "Proven Heritage",
    description: "Trusted by GCC's top retailers since 2009 for consistent excellence.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent pb-24">
      {/* ── Editorial Header ───────────────────────── */}
      <header className="relative w-full pt-28 pb-20 md:pt-32 md:pb-24 text-center px-4 sm:px-6 min-h-[30vh] flex flex-col items-center justify-center overflow-hidden mb-16">
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

      {/* ── Modern Bento Grid: The BHT Story ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-16">
          <p className="text-[#D02E30] text-[11px] tracking-[0.22em] font-bold uppercase mb-4">
            Our Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#13233A]" style={{ fontFamily: "var(--font-playfair-display)" }}>
            A Legacy of Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5 h-auto md:h-[600px]">
          
          {/* Card 1: Large Story (Span 2 col, 2 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden bg-[#13233A] group flex flex-col justify-end p-8 md:p-12 min-h-[400px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop"
              alt="Premium bedding textiles"
              fill
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13233A] via-[#13233A]/40 to-transparent" />
            <div className="relative z-10 max-w-lg">
              <div className="flex h-[3px] w-12 mb-6 rounded-full overflow-hidden">
                <div className="flex-1 bg-[#D02E30]" />
                <div className="flex-1 bg-[#238D7D]" />
                <div className="flex-1 bg-[#3C97C5]" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair-display)" }}>
                The 2009 Origin
              </h3>
              <p className="text-white/80 text-[15px] leading-relaxed mb-4">
                Founded in Dubai, B.H.T. Collections began with a simple premise: bridge the gap between premium textile manufacturing and the growing GCC market.
              </p>
              <p className="text-white/80 text-[15px] leading-relaxed hidden md:block">
                Our founder spent over a decade working directly with leading suppliers before launching Blanket House Trading. This deep-rooted knowledge of materials, weaving techniques, and factory relationships became our competitive advantage.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Stat Box 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/96 border border-[#D8DCE2] rounded-3xl p-8 flex flex-col justify-center shadow-sm"
          >
            <p className="text-[#D02E30] text-5xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair-display)" }}>2009</p>
            <p className="text-[#13233A] font-bold text-lg mb-1">Established</p>
            <p className="text-[#25262C]/60 text-sm">Over 15 years of uninterrupted supply across the Middle East.</p>
          </motion.div>

          {/* Card 3: Stat Box 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#F8F7F4] border border-[#D8DCE2] rounded-3xl p-8 flex flex-col justify-center shadow-sm"
          >
            <p className="text-[#238D7D] text-5xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair-display)" }}>50k<span className="text-3xl">+</span></p>
            <p className="text-[#13233A] font-bold text-lg mb-1">Sq Ft Logistics Hub</p>
            <p className="text-[#25262C]/60 text-sm">Operating from a massive Dubai warehouse ensuring immediate dispatch.</p>
          </motion.div>

        </div>
      </section>

      {/* ── Modern Values Layout ───────────────────────── */}
      <section className="bg-[#13233A] py-24 mb-24 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#238D7D]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            
            <div className="md:w-1/3 sticky top-32">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair-display)" }}>
                The <span className="text-[#D02E30]">BHT</span> Advantage
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Concrete operational advantages that translate to uncompromising quality, flawless logistics, and better pricing for you.
              </p>
              <Link href="/collections" className="btn-primary !px-6 !py-3">
                View Collections
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="md:w-2/3 grid sm:grid-cols-2 gap-4 md:gap-6">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#D02E30] to-[#A82224] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#D02E30]/20">
                      <Icon className="w-6 h-6 text-white" />
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
        </div>
      </section>

      {/* ── Client Proof (Monochrome) ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-12">
          <p className="text-[#238D7D] text-[10.5px] font-bold uppercase tracking-[0.22em] mb-3">
            B2B &amp; Institutional
          </p>
          <h2 className="text-3xl font-bold text-[#13233A]" style={{ fontFamily: "var(--font-playfair-display)" }}>
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="bg-white/96 border border-[#D8DCE2] rounded-3xl p-10 flex flex-wrap justify-center gap-10 md:gap-16 items-center shadow-sm">
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

      {/* ── Contact CTA ───────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#13233A] mb-8" style={{ fontFamily: "var(--font-playfair-display)" }}>
          Ready to experience the quality?
        </h2>
        <div className="flex flex-row flex-nowrap items-center justify-center gap-4">
          <Link href="/collections" className="btn-primary !px-5 sm:!px-7 whitespace-nowrap">
            Shop for Home
          </Link>
          <Link href="/contact" className="btn-secondary !px-5 sm:!px-7 whitespace-nowrap">
            Wholesale Enquiries
          </Link>
        </div>
      </section>
    </div>
  );
}
