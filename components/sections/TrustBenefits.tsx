"use client";
// components/sections/TrustBenefits.tsx
import { motion } from "framer-motion";
import { Award, Leaf, Shield, Truck } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Carefully selected fabrics and multi-ply thermal materials",
  },
  {
    icon: Leaf,
    title: "Soft & Comfortable",
    description: "Gentle on skin with ultra-soft microfibre & cotton",
  },
  {
    icon: Shield,
    title: "Durable & Reliable",
    description: "Anti-pilling treatment built for everyday luxury",
  },
  {
    icon: Truck,
    title: "Fast UAE Delivery",
    description: "Express delivery across Dubai and all 7 Emirates",
  },
];

export default function TrustBenefits() {
  return (
    <section className="bg-transparent border-b border-[#F2EBDC] py-8 md:py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group flex items-center gap-3.5"
              >
                {/* Premium Luxury Icon Container */}
                <div className="relative shrink-0 w-12 h-12 rounded-xl bg-gradient-to-b from-[#FAF8F5] to-[#F3EFE8] border border-[#E5DFD3] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover:border-[#C5A869] group-hover:shadow-[0_4px_16px_rgba(197,168,105,0.18)] transition-all duration-300">
                  {/* Subtle inner gold rim */}
                  <div className="w-[38px] h-[38px] rounded-[9px] bg-white border border-[#EFE9DE] flex items-center justify-center group-hover:border-[#E8D8B0] transition-colors">
                    <Icon
                      className="w-5 h-5 text-[#8C6D2B] group-hover:text-[#B58B35] group-hover:scale-110 transition-all duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-sm font-bold text-[#0B131F] mb-0.5 tracking-tight group-hover:text-[#8C6D2B] transition-colors"
                    style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-snug hidden sm:block">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
