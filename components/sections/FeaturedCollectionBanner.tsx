"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeaturedCollectionBanner() {
  return (
    <section className="py-8 sm:py-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#FAFAFA] rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="grid lg:grid-cols-12 items-center">
            {/* ── Left Content ── */}
            <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 z-10">
              <p
                className="text-[11px] font-bold tracking-[0.25em] text-gray-500 uppercase mb-2.5"
                style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
              >
                FEATURED COLLECTION
              </p>

              <h2
                className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#0B131F] leading-tight mb-3"
                style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
              >
                Comfort for <br />
                <span className="text-[#D92626]">Every Season</span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6 max-w-sm">
                Soft, breathable, and made for every season. Upgrade your home with premium bedding and home textiles.
              </p>

              <Link
                href="/collections"
                className="inline-flex items-center gap-2 bg-[#0B131F] text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#1A2636] transition-all shadow-md group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* ── Right Lifestyle Image & Brand Wave ── */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[380px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85"
                alt="B.H.T. Collections featured bedroom bedding"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-transparent to-transparent lg:block hidden w-24" />

              {/* Decorative Brand Color Arc Flourish (Red, Green, Blue) */}
              <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none z-10">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <path
                    d="M100,20 C60,20 20,60 20,100 L100,100 Z"
                    fill="#1599D6"
                    opacity="0.9"
                  />
                  <path
                    d="M100,45 C70,45 45,70 45,100 L100,100 Z"
                    fill="#008C5A"
                    opacity="0.95"
                  />
                  <path
                    d="M100,68 C80,68 68,80 68,100 L100,100 Z"
                    fill="#D92626"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
