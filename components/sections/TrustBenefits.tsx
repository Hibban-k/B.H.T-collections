"use client";
// components/sections/TrustBenefits.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Established", value: "Since 2009" },
  { label: "GCC Clients", value: "500+" },
  { label: "Sourcing", value: "Direct Factory Supply" },
  { label: "Shipping", value: "UAE Delivery" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function TrustBenefits() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      aria-label="Trust proof rail"
      className="relative z-20 w-full"
    >
      {/* Tri-colour top border: red → teal → sky */}
      <div className="flex w-full" aria-hidden="true">
        <div className="h-[3px] flex-1 bg-[#D02E30]" />
        <div className="h-[3px] flex-1 bg-[#238D7D]" />
        <div className="h-[3px] flex-1 bg-[#3C97C5]" />
      </div>

      {/* Content surface */}
      <div className="bg-white/96 backdrop-blur-sm w-full py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="
            max-w-[1240px] mx-auto px-4 sm:px-6
            grid grid-cols-2 md:grid-cols-4
            divide-y md:divide-y-0 md:divide-x divide-[#D8DCE2]
          "
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex flex-col items-center justify-center text-center py-4 md:py-0 px-4 sm:px-6"
            >
              {/* Uppercase label */}
              <span
                className="block mb-1 tracking-widest uppercase"
                style={{
                  fontFamily: "var(--font-montserrat, Montserrat, sans-serif)",
                  fontSize: "10px",
                  color: "rgba(37,38,44,0.50)",
                  letterSpacing: "0.12em",
                }}
              >
                {stat.label}
              </span>

              {/* Primary value */}
              <span
                className="font-bold leading-tight text-[#13233A]"
                style={{
                  fontFamily: "var(--font-montserrat, Montserrat, sans-serif)",
                  fontSize: "18px",
                }}
              >
                {stat.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
