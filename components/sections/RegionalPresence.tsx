"use client";
// components/sections/RegionalPresence.tsx
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, CheckCircle2 } from "lucide-react";
import { regionalOffices } from "@/lib/data";

export default function RegionalPresence() {
  return (
    <section className="section-padding bg-transparent relative overflow-hidden border-t border-[#F2EBDC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <p
            className="text-[#D92626] text-xs tracking-[0.25em] font-bold uppercase mb-3 bg-[#D92626]/10 inline-block px-3 py-1 rounded"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            OUR REGIONAL NETWORK
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-4"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Active Across 6 GCC Countries
          </h2>
          <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
            Connecting markets and delivering quality products through our dedicated regional offices, authorized trading hubs, and local distribution channels.
          </p>
        </motion.div>

        {/* 6 Regional Offices Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {regionalOffices.map((office, idx) => (
            <motion.div
              key={office.country}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${office.isHeadquarters
                  ? "bg-[#0B131F] text-white border-[#1A2433] shadow-xl"
                  : "bg-[#FAF8F5] text-[#0B131F] border-[#EFE9DE] hover:border-[#1C75BC]/40 hover:bg-white hover:shadow-lg"
                }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${office.isHeadquarters ? "bg-[#D92626] text-white" : "bg-white border border-[#E8DFC8] text-[#8C6D2B]"}`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3
                      className={`text-base font-bold tracking-tight ${office.isHeadquarters ? "text-white" : "text-[#0B131F]"}`}
                      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                    >
                      {office.country}
                    </h3>
                  </div>
                  {office.isHeadquarters && (
                    <span className="text-[9px] font-bold tracking-wider uppercase bg-[#D92626] text-white px-2 py-0.5 rounded">
                      Headquarters
                    </span>
                  )}
                </div>

                <p className={`text-xs font-semibold mb-2 ${office.isHeadquarters ? "text-white/90" : "text-[#1C75BC]"}`}>
                  {office.companyName}
                </p>

                <p className={`text-xs leading-relaxed mb-4 ${office.isHeadquarters ? "text-white/70" : "text-[#64748B]"}`}>
                  {office.address}
                </p>
              </div>

              <div className={`pt-4 border-t space-y-1.5 text-xs ${office.isHeadquarters ? "border-white/10 text-white/80" : "border-[#EFE9DE] text-[#64748B]"}`}>
                {office.contactPerson && (
                  <p><span className="font-semibold">Contact:</span> {office.contactPerson}</p>
                )}
                {office.mobile && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <a href={`tel:${office.mobile.replace(/\s+/g, "")}`} className="hover:underline font-medium">
                      {office.mobile}
                    </a>
                  </p>
                )}
                {office.tel && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span>Tel: {office.tel}</span>
                  </p>
                )}
                {office.email && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <a href={`mailto:${office.email}`} className="hover:underline">
                      {office.email}
                    </a>
                  </p>
                )}
                {office.crNo && (
                  <p className="text-[11px] opacity-75"><span className="font-semibold">CR:</span> {office.crNo}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corporate Aim Statement from PDF Page 6 */}
        <div className="bg-[#FAF8F5] border border-[#EFE9DE] rounded-2xl p-8 md:p-10 text-center max-w-4xl mx-auto">
          <p
            className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-3"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            OUR AIM &amp; VISION
          </p>
          <blockquote
            className="text-lg md:text-xl font-bold text-[#0B131F] leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            &ldquo;To build a strong and trusted global presence by delivering quality products and reliable trading solutions across the Middle East and beyond. We aim to connect markets, strengthen partnerships, and grow sustainably through excellence, integrity, and customer-focused service.&rdquo;
          </blockquote>
          <p className="text-xs text-[#64748B] font-semibold tracking-wider uppercase">
            BLANKET HOUSE TRADING L.L.C. · DUBAI, UAE
          </p>
        </div>
      </div>
    </section>
  );
}
