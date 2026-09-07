"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Building2, ExternalLink, Sparkles, Navigation } from "lucide-react";
import { regionalOffices } from "@/lib/data";

const countryHighlights = [
  { id: "UAE", name: "Dubai, UAE", flag: "🇦🇪", role: "Global Headquarters", tag: "Head Office" },
  { id: "Oman", name: "Oman", flag: "🇴🇲", role: "Ruwi / Muscat Distribution", tag: "Branch" },
  { id: "Qatar", name: "Qatar", flag: "🇶🇦", role: "Doha Logistics & Trading", tag: "Branch" },
  { id: "Bahrain", name: "Bahrain", flag: "🇧🇭", role: "Manama Regional Desk", tag: "Branch" },
  { id: "Kuwait", name: "Kuwait", flag: "🇰🇼", role: "Kuwait City Wholesale Hub", tag: "Branch" },
  { id: "Saudi Arabia", name: "Saudi Arabia (Dammam)", flag: "🇸🇦", role: "Dammam / Riyadh Supply", tag: "Branch" },
];

export default function GCCLocationsMap() {
  const [selectedCountry, setSelectedCountry] = useState<string>("UAE");

  const activeOffice = regionalOffices.find(
    (o) => o.country.toLowerCase().includes(selectedCountry.toLowerCase()) || 
           (selectedCountry === "UAE" && o.isHeadquarters) ||
           (selectedCountry.includes("Saudi") && o.country.includes("Saudi"))
  ) || regionalOffices[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0B131F] via-[#101B2B] to-[#0B131F] border border-[#1E2E42] shadow-2xl p-4 sm:p-8 text-white my-10">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1C75BC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D92626]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#D92626]/20 border border-[#D92626]/30 text-[#D92626] text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3">
            <Navigation className="w-3.5 h-3.5" />
            Pan-GCC Regional Network
          </div>
          <h3
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Our GCC &amp; Global Distribution Locations
          </h3>
          <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl">
            Established in Dubai in 2009 — serving 500+ commercial clients with local distribution branches across 6 GCC nations.
          </p>
        </div>

        {/* Quick Location Pills for Mobile & Desktop */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#E6C687] bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl shrink-0">
          <Sparkles className="w-4 h-4 text-[#F59E0B]" />
          <span>6 Active Regional Hubs</span>
        </div>
      </div>

      {/* Main Grid: Map & Interactive Details */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
        {/* Left / Top: The Interactive Map Display (Optimized for Mobile & Desktop) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#FAF8F5] border border-white/15 shadow-inner group">
            <Image
              src="/gcc-locations-map.png"
              alt="BLANKET HOUSE TRADING L.L.C. GCC & Global Locations Map - UAE, Oman, Qatar, Bahrain, Kuwait, Saudi Arabia"
              fill
              className="object-contain sm:object-cover object-center p-1 sm:p-2 transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              priority
            />

            {/* Subtle Overlay badge on bottom of map */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto bg-[#0B131F]/90 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 flex items-center justify-between sm:justify-start gap-3 text-xs shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1BA14B] animate-pulse" />
                <span className="text-white/90 font-medium text-[11px] sm:text-xs">Live Direct Supply Routes</span>
              </div>
              <span className="text-white/50 text-[10px] hidden sm:inline">|</span>
              <span className="text-[#E6C687] font-semibold text-[10px] sm:text-xs">Dubai &bull; Muscat &bull; Doha &bull; Manama &bull; Kuwait &bull; Dammam</span>
            </div>
          </div>

          {/* Country Selector Strip (Mobile friendly scrollable chips) */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {countryHighlights.map((item) => {
              const isSelected = selectedCountry === item.id || (item.id === "UAE" && selectedCountry === "UAE");
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCountry(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isSelected
                      ? "bg-[#D92626] text-white border-[#D92626] shadow-md shadow-[#D92626]/20 scale-[1.02]"
                      : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-sm">{item.flag}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right / Bottom: Active Selected Country Card */}
        <div className="lg:col-span-4 h-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOffice.country}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#D92626] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className="text-lg font-bold text-white leading-tight"
                        style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                      >
                        {activeOffice.country}
                      </h4>
                      <p className="text-[11px] text-[#E6C687] font-semibold">
                        {activeOffice.isHeadquarters ? "Global Headquarters & Hub" : "Regional Distribution Branch"}
                      </p>
                    </div>
                  </div>

                  {activeOffice.isHeadquarters && (
                    <span className="bg-[#D92626] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      HQ
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 my-4 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider mb-1">Company / Branch</p>
                    <p className="text-white font-semibold text-sm leading-snug">{activeOffice.companyName}</p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider mb-1">Office Location</p>
                    <p className="text-white/90 text-xs leading-relaxed">{activeOffice.address}</p>
                  </div>

                  {activeOffice.contactPerson && (
                    <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[#94A3B8] text-[11px]">Representative:</span>
                      <span className="text-white font-medium text-[11px]">{activeOffice.contactPerson}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                {activeOffice.mobile && (
                  <a
                    href={`tel:${activeOffice.mobile.replace(/\s+/g, "")}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1BA14B] hover:bg-[#15803D] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call {activeOffice.mobile}
                  </a>
                )}
                {activeOffice.email && (
                  <a
                    href={`mailto:${activeOffice.email}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors border border-white/15"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
