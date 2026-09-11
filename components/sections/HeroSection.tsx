"use client";
// components/sections/HeroSection.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import LogoWatermark from "@/components/ui/LogoWatermark";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen bg-[#FAF8F3] overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=85"
          alt="Luxury bedroom with premium B.H.T. Collections blanket"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark Navy Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B131F]/90 via-[#0B131F]/65 to-[#0B131F]/30" />
      </div>



      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 w-full">
        <div className="max-w-xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-8 h-0.5 bg-[#D92626]" />
            <span
              className="text-[#D92626] text-xs tracking-[0.25em] font-bold uppercase bg-[#D92626]/10 px-2.5 py-1 rounded"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              B.H.T. COLLECTIONS · UAE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
          >
            Wrap Yourself in{" "}
            <span className="text-[#D92626]">Luxury</span>{" "}
            &amp; Warmth
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/85 leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            Premium blankets, bed linens, comforters, and bedspreads designed for exceptional comfort and everyday elegance. Delivered across the UAE &amp; GCC.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/collections"
              className="btn-primary"
            >
              EXPLORE COLLECTIONS
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white px-8 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase rounded hover:bg-[#1C75BC] hover:border-[#1C75BC] transition-all"
            >
              OUR STORY
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

