"use client";
// components/sections/ClienteleSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { clientele } from "@/lib/data";
import { CheckCircle2, Users } from "lucide-react";

export default function ClienteleSection() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#0B131F] text-white px-5 py-1.5 rounded text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-sm">
            OUR CLIENTELE
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B131F] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Trusted by Premier Retailers &amp; Hypermarkets
          </h2>
          <p className="text-[#64748B] text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            &ldquo;We serve a distinguished portfolio of over <span className="text-[#0B131F] font-bold">500+ customers</span> across the UAE &amp; GCC countries.&rdquo;
          </p>
        </motion.div>

        {/* 5 Official Brand Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-10">
          {clientele.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group p-5 bg-white border border-[#E8E2D5] hover:border-[#D4AF37] rounded-xl flex flex-col items-center justify-between text-center shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 min-h-[160px]"
            >
              {/* Brand Logo Container */}
              <div className="relative w-full h-16 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={client.logo}
                  alt={`${client.name} official client logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>

              {/* Title & Category */}
              <div className="w-full pt-3 border-t border-[#F5F2EA]">
                <h3
                  className="text-xs font-bold text-[#0B131F] group-hover:text-[#D92626] transition-colors leading-tight truncate"
                  style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                >
                  {client.name}
                </h3>
                <p className="text-[10px] text-[#8A95A5] font-medium tracking-wide mt-0.5">
                  {client.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unified Banner Container as in PDF Page 7 */}
        <div className="bg-white border border-[#EAE3D2] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B131F] text-[#E6C687] flex items-center justify-center shrink-0 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4
                className="text-base font-bold text-[#0B131F]"
                style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
              >
                500+ Institutional &amp; Retail Network
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Supplying leading hypermarkets, hotel chains, department stores &amp; corporate accommodation.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1BA14B]" />
              <span>Direct Factory Supply</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1BA14B]" />
              <span>GCC Doorstep Logistics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1BA14B]" />
              <span>Price Match Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
