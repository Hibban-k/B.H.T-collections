"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactCTA() {
  return (
    <section className="w-full bg-[#13233A] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-0">

          {/* Left: Shop for Home */}
          <motion.div
            className="flex-1 flex flex-col items-center text-center px-8 py-10 lg:py-0 lg:pr-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0 }}
            variants={fadeUp}
          >
            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-white/5">
              <ShoppingBag className="w-6 h-6 text-[#F8F7F4]" strokeWidth={1.5} />
            </div>

            <h2
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop for Home
            </h2>

            <p
              className="text-[#F8F7F4]/75 text-base leading-relaxed max-w-xs mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Discover our curated range of premium textiles crafted for every
              room — from bedroom essentials to living-room accents.
            </p>

            <Link
              href="/collections"
              className="btn-secondary-white"
            >
              Browse Collections
            </Link>
          </motion.div>

          {/* Tri-colour Divider (desktop vertical / mobile horizontal) */}
          <div className="hidden lg:flex flex-col self-stretch w-[3px] shrink-0 my-6 rounded-full overflow-hidden">
            <div className="flex-1 bg-[#D02E30]" />
            <div className="flex-1 bg-[#238D7D]" />
            <div className="flex-1 bg-[#3C97C5]" />
          </div>
          <div className="flex lg:hidden h-[3px] w-3/4 mx-auto my-2 rounded-full overflow-hidden">
            <div className="flex-1 bg-[#D02E30]" />
            <div className="flex-1 bg-[#238D7D]" />
            <div className="flex-1 bg-[#3C97C5]" />
          </div>

          {/* Right: Wholesale & Hospitality */}
          <motion.div
            className="flex-1 flex flex-col items-center text-center px-8 py-10 lg:py-0 lg:pl-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            variants={fadeUp}
          >
            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-white/5">
              <MessageCircle className="w-6 h-6 text-[#F8F7F4]" strokeWidth={1.5} />
            </div>

            <h2
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Wholesale &amp; Hospitality
            </h2>

            <p
              className="text-[#F8F7F4]/75 text-base leading-relaxed max-w-xs mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Outfitting a hotel, resort, or business? Talk to us directly for
              bulk pricing, custom branding, and dedicated account support.
            </p>

            <a
              href="https://wa.me/971558879237"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              Enquire on WhatsApp
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
