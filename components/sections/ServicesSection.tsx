"use client";
// components/sections/ServicesSection.tsx
import { motion } from "framer-motion";
import { BedDouble, Briefcase, Footprints, Hotel, ShieldCheck, Warehouse, Sparkles, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const portfolios = [
  {
    num: "01",
    icon: BedDouble,
    title: "Complete Labour Camp Supplies",
    description: "Heavy-duty steel bunker beds, secure lockers, multi-ply industrial blankets, certified foam mattresses, and bulk pillows.",
    badge: "Institutional B2B",
    highlights: ["Bunker Beds & Lockers", "High-Warmth Blankets", "Certified Mattresses"],
  },
  {
    num: "02",
    icon: Briefcase,
    title: "Travel Luggage & Suitcases",
    description: "High-grade Polypropylene (PP), ultra-tough ABS hard-shell, and premium fabric luggage engineered for frequent travel across the GCC.",
    badge: "Travel Accessories",
    highlights: ["PP & ABS Hard-Shell", "Fabric Suitcase Sets", "GCC Travel Durability"],
  },
  {
    num: "03",
    icon: Footprints,
    title: "Footwear Distribution",
    description: "Official local distributor for internationally renowned brands ADDA (Thailand) and Paragon (India), alongside authentic Arabic style slippers.",
    badge: "Authorized Distributor",
    highlights: ["ADDA Brand (Thailand)", "Paragon (India)", "Arabic Style Slippers"],
  },
  {
    num: "04",
    icon: Hotel,
    title: "Hospitality & Hotel Bedding",
    description: "Five-star hotel duvets, comforters, high-thread-count cotton linens, and luxury multi-ply blankets tailored for resorts and hotels.",
    badge: "Hospitality Grade",
    highlights: ["5-Star Duvets & Sheets", "High Thread Count", "Custom Hospitality Bulk"],
  },
];

const companyMetrics = [
  { icon: Clock, value: "15+ Years", label: "Industry Expertise", sub: "Founded in Dubai (2009)" },
  { icon: Warehouse, value: "50,000+ SQFT", label: "Warehouse Hub", sub: "Immediate dispatch in Dubai" },
  { icon: Sparkles, value: "4 Factories", label: "Exclusive Partners", sub: "Dedicated GCC manufacturing" },
  { icon: ShieldCheck, value: "100%", label: "Price Match", sub: "Finest quality at fair prices" },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#0B131F] text-white px-4 py-1.5 rounded text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-sm">
            DIVERSIFIED PORTFOLIO &amp; SERVICES
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-4"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Comprehensive Commercial &amp; Trading Solutions
          </h2>
          <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
            BLANKET HOUSE TRADING L.L.C. has expanded across multiple essential commercial categories to serve businesses, contractors, and retail partners across the Middle East.
          </p>
        </motion.div>

        {/* 4 Luxury Portfolios Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {portfolios.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative bg-white rounded-2xl border border-[#E8DFC8] hover:border-[#C5A869] p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(197,168,105,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Emblem Icon + Category Badge */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    {/* Luxury Dual-Layer Emblem Icon */}
                    <div className="relative shrink-0 w-13 h-13 rounded-xl bg-gradient-to-b from-[#0C1220] to-[#1B2432] p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-[11px] bg-[#0C1220] flex items-center justify-center border border-[#D4AF37]/30 group-hover:border-[#D4AF37]/70 transition-colors">
                        <Icon className="w-6 h-6 text-[#E6C687] group-hover:text-[#F3DC9B] transition-colors" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-[#D1C7B2] font-serif mb-1">
                        {item.num}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8C6D2B] bg-[#F7F2E7] px-2 py-0.5 rounded border border-[#E9DCBF]/70">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="text-[16px] font-bold text-[#0B131F] group-hover:text-[#8C6D2B] transition-colors mb-2.5 leading-snug tracking-tight"
                    style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[12.5px] text-[#6B7280] leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Feature Highlights List */}
                  <ul className="space-y-1.5 pt-4 border-t border-[#F5F1E8]">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-[11px] font-medium text-[#4A5568]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D2B] shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="pt-5 mt-5 border-t border-[#F5F1E8]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B131F] group-hover:text-[#8C6D2B] transition-colors tracking-wide"
                  >
                    Enquire for Quotation
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4 Corporate Strengths Banner */}
        <div className="bg-[#0B131F] text-white p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden border border-[#1A2433]">
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {companyMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#E6C687] shadow-inner">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      className="text-2xl md:text-3xl font-bold text-white mb-0.5"
                      style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
                    >
                      {metric.value}
                    </div>
                    <div className="text-xs font-bold text-[#E6C687] tracking-wider uppercase">{metric.label}</div>
                    <div className="text-[11px] text-white/60 mt-0.5">{metric.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
