"use client";
// components/sections/TrustBenefits.tsx
import { motion } from "framer-motion";
import { Gem, ShieldCheck, Truck, Heart } from "lucide-react";

const benefits = [
  {
    icon: Gem,
    title: "Premium Quality",
    description: "Long lasting comfort",
    accentLeft: "#E12620",
    accentRight: "#1598D0",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Brand",
    description: "Your Comfort, Our Priority",
    accentLeft: "#1598D0",
    accentRight: "#E12620",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Across UAE",
    accentLeft: "#16845E",
    accentRight: "#E12620",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "Thousands of Happy Homes",
    accentLeft: "#16845E",
    accentRight: "#1598D0",
  },
];

export default function TrustBenefits() {
  return (
    <section
      className="relative z-20 bg-transparent pt-3 pb-12"
      aria-label="Brand Benefits"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Floating White Benefit Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.06)] border border-[#ECECEC] overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#EFEFEF]">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group flex flex-col items-center text-center px-4 py-7 sm:px-6 sm:py-8 hover:bg-[#FAFAFC]/60 transition-colors duration-200"
                >
                  {/* Icon */}
                  <div className="mb-3.5 text-[#122936] group-hover:text-[#E12620] transition-colors duration-200">
                    <Icon
                      className="w-[28px] h-[28px]"
                      strokeWidth={1.6}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[13.5px] font-bold text-[#122936] mb-1.5 leading-snug"
                    style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                  >
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[11.5px] text-[#56636A] leading-snug mb-3.5"
                    style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                  >
                    {benefit.description}
                  </p>

                  {/* Two-tone accent indicator */}
                  <div className="flex gap-[3px] items-center mt-auto">
                    <div
                      className="h-[2px] w-6 rounded-full"
                      style={{ backgroundColor: benefit.accentLeft }}
                    />
                    <div
                      className="h-[2px] w-4 rounded-full"
                      style={{ backgroundColor: benefit.accentRight }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
