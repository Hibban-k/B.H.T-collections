"use client";
// components/sections/SmartexBanner.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import LogoWatermark from "@/components/ui/LogoWatermark";

const features = [
  "Multi-Ply Premium Construction",
  "Extra Warm Thermal Insulation Layer",
  "Ultra-Soft Microfibre Touch & Touch",
  "Anti-Pilling & Wash-Durable Technology",
];

export default function SmartexBanner() {
  return (
    <section className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-xl border border-[#F2EBDC]">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] md:aspect-auto min-h-[360px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85"
              alt="SMARTEX Premium Blanket Collection"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:hidden" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-[#0B131F] p-8 md:p-12 flex flex-col justify-center overflow-hidden"
          >
            <div className="relative z-10">
              <p
                className="text-[#D92626] text-xs tracking-[0.25em] font-bold uppercase mb-3 bg-[#D92626]/10 inline-block px-2.5 py-1 rounded"
                style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
              >
                Featured Collection
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
              >
                SMARTEX Premium Collections
              </h2>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                Our flagship SMARTEX range sets the benchmark for luxury home textiles in the UAE. Engineered for heavy warmth, supreme softness, and long-lasting quality.
              </p>

              <ul className="space-y-3.5 mb-8">
                {features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#1BA14B] shrink-0" />
                    <span className="text-sm font-medium text-white/90">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/collections/blankets"
                className="btn-primary self-start"
              >
                EXPLORE SMARTEX
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

