"use client";
// components/sections/WhyBHT.tsx — design-patch: B2B/client proof on navy
import { motion } from "framer-motion";
import { Factory, ShieldCheck, Truck, Globe } from "lucide-react";

const proofPoints = [
  {
    icon: Factory,
    stat: "4",
    label: "Exclusive GCC Factories",
    detail: "Direct manufacturing partnerships dedicated to our brand standards",
  },
  {
    icon: ShieldCheck,
    stat: "15+",
    label: "Years of Excellence",
    detail: "Founded 2009. Trusted supplier to major hypermarkets & hospitality groups",
  },
  {
    icon: Globe,
    stat: "6",
    label: "GCC Countries",
    detail: "UAE, Oman, Qatar, Bahrain, Kuwait & Saudi Arabia — fully served",
  },
  {
    icon: Truck,
    stat: "50K+",
    label: "Sq Ft Warehouse",
    detail: "Dubai logistics hub ensuring immediate dispatch, no supply gaps",
  },
];

export default function WhyBHT() {
  return (
    <section className="section-padding bg-[#13233A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#238D7D] text-[11px] tracking-[0.22em] font-bold uppercase mb-4">
            Why Choose B.H.T.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The BHT Difference
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mx-auto leading-relaxed">
            Premium quality, direct factory supply, and uninterrupted GCC logistics — built on 15 years of trusted trade relationships.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {proofPoints.map((pt, index) => {
            const Icon = pt.icon;
            return (
              <motion.div
                key={pt.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/05 border border-white/10 rounded-2xl p-7 hover:bg-white/08 hover:border-white/20 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#D02E30]/15 border border-[#D02E30]/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#D02E30]" strokeWidth={1.5} />
                </div>
                <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  {pt.stat}
                </p>
                <p className="text-[#238D7D] text-xs font-bold uppercase tracking-wider mb-3">
                  {pt.label}
                </p>
                <p className="text-white/55 text-xs leading-relaxed">
                  {pt.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
