"use client";
// components/sections/Testimonials.tsx — design-patch: static 3-card grid, no marquee
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/data";

export default function Testimonials() {
  // Show max 3 per design spec
  const displayReviews = reviews.slice(0, 3);

  return (
    <section className="section-padding bg-[#13233A] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#238D7D] text-[11px] tracking-[0.22em] font-bold uppercase mb-4">
            Customer Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <span className="text-white/70 text-sm">4.8 average across 600+ reviews</span>
          </div>
        </motion.div>

        {/* Static 3-card grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="bg-white/06 backdrop-blur-sm border border-white/10 p-7 rounded-2xl flex flex-col hover:bg-white/10 transition-colors"
            >
              <Quote className="w-6 h-6 text-[#D02E30] mb-5 opacity-80" />

              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              <p className="text-white/80 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{review.comment}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="w-9 h-9 bg-[#D02E30]/20 border border-[#D02E30]/30 rounded-full flex items-center justify-center text-[#D02E30] text-sm font-bold shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{review.name}</p>
                  <p className="text-white/50 text-xs">{review.location} · {review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
