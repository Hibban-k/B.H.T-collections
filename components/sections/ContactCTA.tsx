"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactCTA() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#F8F7F4]/97 py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Mobile Slider Container */}
        <div className="relative w-full overflow-hidden lg:overflow-visible">
          <div 
            className={`flex flex-row items-stretch transition-transform duration-700 ease-in-out lg:!translate-x-0 ${
              activeIndex === 1 ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            {/* Left: Shop for Home */}
            <motion.div
              className="w-full shrink-0 lg:w-auto lg:flex-1 flex flex-col items-center text-center px-4 py-8 lg:py-0 lg:pr-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0 }}
              variants={fadeUp}
            >
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#13233A]/10 bg-[#13233A]/5">
                <ShoppingBag className="w-6 h-6 text-[#13233A]" strokeWidth={1.5} />
              </div>

              <h2
                className="text-3xl lg:text-4xl font-bold text-[#13233A] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Shop for Home
              </h2>

              <p
                className="text-[#25262C]/75 text-[15px] leading-relaxed max-w-xs mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Discover our curated range of premium textiles crafted for every
                room — from bedroom essentials to living-room accents.
              </p>

              <Link
                href="/collections"
                className="btn-secondary"
              >
                Browse Collections
              </Link>
            </motion.div>

            {/* Tri-colour Divider (desktop vertical only) */}
            <div className="hidden lg:flex flex-col self-stretch w-[3px] shrink-0 my-6 rounded-full overflow-hidden">
              <div className="flex-1 bg-[#D02E30]" />
              <div className="flex-1 bg-[#238D7D]" />
              <div className="flex-1 bg-[#3C97C5]" />
            </div>

            {/* Right: Wholesale & Hospitality */}
            <motion.div
              className="w-full shrink-0 lg:w-auto lg:flex-1 flex flex-col items-center text-center px-4 py-8 lg:py-0 lg:pl-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              variants={fadeUp}
            >
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#13233A]/10 bg-[#13233A]/5">
                <MessageCircle className="w-6 h-6 text-[#13233A]" strokeWidth={1.5} />
              </div>

              <h2
                className="text-3xl lg:text-4xl font-bold text-[#13233A] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Wholesale &amp; Hospitality
              </h2>

              <p
                className="text-[#25262C]/75 text-[15px] leading-relaxed max-w-xs mb-8"
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

        {/* Mobile Dots Indicator */}
        <div className="flex lg:hidden justify-center gap-2 mt-2">
          <button 
            onClick={() => setActiveIndex(0)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 0 ? "w-6 bg-[#D02E30]" : "bg-[#13233A]/20"}`}
          />
          <button 
            onClick={() => setActiveIndex(1)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 1 ? "w-6 bg-[#238D7D]" : "bg-[#13233A]/20"}`}
          />
        </div>

      </div>
    </section>
  );
}
