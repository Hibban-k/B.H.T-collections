"use client";
// components/sections/WhyBHT.tsx
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Heart, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description: "Only the best for your home",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "On time, every time",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "Your happiness matters",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "We're here to help",
  },
];

export default function WhyBHT() {
  return (
    <section className="section-padding  relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-3"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Why Choose Us
          </h2>
          <p className="text-[#D92626] text-lg font-semibold mb-2">
            Quality You Can Trust
          </p>
          <p className="text-[#64748B] text-sm max-w-2xl mx-auto">
            The B.H.T. COLLECTIONS Difference
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Icon className="w-8 h-8 text-[#D92626]" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-sm font-bold text-[#0B131F] mb-2"
                  style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

