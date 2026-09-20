"use client";
// components/sections/Testimonials.tsx
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/data";

export default function Testimonials() {
  // Duplicate reviews to ensure seamless infinite scrolling (50% width translation)
  const scrollItems = [...reviews, ...reviews];

  return (
    <section className="section-padding bg-[#0B131F] relative overflow-hidden text-white">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-3 bg-[#D92626]/10 inline-block px-2.5 py-1 rounded"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            Customer Stories
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
          >
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">4.8 average across 600+ reviews</span>
          </div>
        </motion.div>
      </div>

      {/* Infinite Scrolling Marquee Container */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute left-0 top-0 w-12 md:w-32 h-full bg-gradient-to-r from-[#0B131F] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-12 md:w-32 h-full bg-gradient-to-l from-[#0B131F] to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 animate-infinite-scroll w-max">
          {scrollItems.map((review, index) => (
            <div
              key={index}
              className="bg-[#111C2E] border border-[#1A2433] p-6 rounded-xl flex flex-col hover:border-[#1C75BC]/40 transition-colors shadow-lg w-[320px] md:w-[380px] flex-shrink-0"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-[#D92626] mb-4 opacity-80" />

              {/* Stars */}
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-white/85 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#1A2433]">
                <div className="w-9 h-9 bg-[#1C75BC]/20 border border-[#1C75BC]/40 rounded-full flex items-center justify-center text-[#1C75BC] text-sm font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{review.name}</p>
                  <p className="text-[#94A3B8] text-xs">{review.location} · {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
