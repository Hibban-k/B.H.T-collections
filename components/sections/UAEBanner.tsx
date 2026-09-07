"use client";
// components/sections/UAEBanner.tsx
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import LogoWatermark from "@/components/ui/LogoWatermark";

const deliveryAreas = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Um Al Quwain"];

export default function UAEBanner() {
  return (
    <section className="bg-transparent py-14 md:py-16 relative overflow-hidden border-b border-[#F2EBDC]">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
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
              Delivery &amp; Service
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Delivered Across the UAE &amp; GCC
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              We deliver to all seven Emirates and across GCC countries. Fast, reliable, and free on orders over AED 150.
            </p>

            {/* Delivery areas */}
            <div className="flex flex-wrap gap-2 mb-8">
              {deliveryAreas.map((area) => (
                <span
                  key={area}
                  className="tag-badge !bg-white !text-[#0B131F] !border-[#1C75BC]/30 hover:!bg-[#1C75BC] hover:!text-white hover:!border-[#1C75BC] shadow-sm cursor-default transition-all"
                >
                  {area}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="btn-primary"
            >
              <Phone className="w-4 h-4" />
              CONTACT FOR DELIVERY INFO
            </Link>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Truck, value: "FREE", label: "On orders AED 150+", sub: "UAE-wide delivery", color: "#D92626" },
              { icon: Clock, value: "1-2", label: "Business days", sub: "Standard delivery", color: "#1C75BC" },
              { icon: MapPin, value: "7", label: "Emirates covered", sub: "All UAE regions", color: "#1BA14B" },
              { icon: Phone, value: "24h", label: "WhatsApp support", sub: "Quick response", color: "#D92626" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-xl border border-[#F2EBDC] shadow-sm hover:shadow-md transition-all">
                  <Icon className="w-6 h-6 mb-3" style={{ color: stat.color }} />
                  <div
                    className="text-2xl font-bold text-[#0B131F] mb-1"
                    style={{ fontFamily: "var(--font-playfair-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-[#0B131F]">{stat.label}</div>
                  <div className="text-xs text-[#64748B] mt-0.5">{stat.sub}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

