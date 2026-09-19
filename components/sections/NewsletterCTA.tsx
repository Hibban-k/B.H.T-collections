"use client";
// components/sections/NewsletterCTA.tsx
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] px-6 sm:px-10 py-7 sm:py-9 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* ── Left: Logo & Text ──────────────────────── */}
          <div className="flex items-center gap-4 z-10 w-full md:w-auto">
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/bht-logo.jpg"
                alt="BHT Logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div>
              <h3
                className="text-base sm:text-lg font-bold text-[#0B131F]"
                style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
              >
                Stay Updated
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Be the first to know about new arrivals, exclusive collections, and more
              </p>
            </div>
          </div>

          {/* ── Center/Right: Subscription Input ──────── */}
          <div className="z-10 w-full md:w-auto shrink-0">
            {subscribed ? (
              <div className="text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-200">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-full px-5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#D92626] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#D92626] text-white text-xs font-semibold px-6 sm:px-7 py-2.5 rounded-full hover:bg-[#B91C1C] transition-all shadow-sm shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* ── Far Right: Stylized Petal Arc Swoop Motif ── */}
          <div className="absolute right-0 bottom-0 w-28 h-28 pointer-events-none z-0 hidden lg:block opacity-90">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path
                d="M100,10 C55,10 10,55 10,100 L100,100 Z"
                fill="#1599D6"
                opacity="0.85"
              />
              <path
                d="M100,40 C65,40 40,65 40,100 L100,100 Z"
                fill="#008C5A"
                opacity="0.9"
              />
              <path
                d="M100,65 C80,65 65,80 65,100 L100,100 Z"
                fill="#D92626"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
