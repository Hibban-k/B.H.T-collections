"use client";
// components/sections/ClienteleSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { clientele } from "@/lib/data";
import { CheckCircle2, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ClienteleSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p className="text-[#D02E30] text-[10.5px] font-bold tracking-[0.22em] uppercase mb-4">
            B2B &amp; Institutional
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#13233A] mb-5 leading-tight"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Trusted by Premier Retailers
          </h2>
          <p className="text-[#25262C]/75 text-[15px] font-medium max-w-2xl mx-auto leading-relaxed">
            We proudly serve a distinguished portfolio of over <strong className="text-[#13233A]">500+ clients</strong> across the UAE and GCC countries, providing unmatched scale and reliability.
          </p>
        </motion.div>

        {/* Brand Logos Grid - Clean white/96 surfaces */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-10">
          {clientele.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group p-6 bg-white/96 border border-[#D8DCE2] hover:border-[#13233A] rounded-2xl flex flex-col items-center justify-between text-center transition-all duration-300 min-h-[160px] shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="relative w-full h-14 flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={`${client.name} official client logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                ) : (
                  <span className="font-bold text-[#13233A]">{client.name}</span>
                )}
              </div>

              <div className="w-full pt-4 mt-2 border-t border-[#D8DCE2]/60">
                <h3
                  className="text-[12px] font-bold text-[#13233A] transition-colors leading-tight truncate mb-1"
                  style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                >
                  {client.name}
                </h3>
                <p className="text-[10px] text-[#25262C]/60 font-semibold tracking-wider uppercase">
                  {client.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Institutional Proof Banner */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeUp}
          className="bg-white/96 border border-[#D8DCE2] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex items-center gap-5 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-full bg-[#13233A]/5 text-[#13233A] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4
                className="text-[15px] font-bold text-[#13233A] mb-1"
                style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
              >
                500+ Institutional &amp; Retail Network
              </h4>
              <p className="text-[13px] text-[#25262C]/70">
                Supplying leading hypermarkets, hotel chains, and corporate accommodations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[13px] font-semibold text-[#25262C]/80 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#238D7D]" />
              <span>Direct Factory Supply</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#238D7D]" />
              <span>GCC Doorstep Logistics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#238D7D]" />
              <span>Price Match Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
