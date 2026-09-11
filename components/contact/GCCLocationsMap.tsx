"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Building2,
  Navigation,
  Compass,
} from "lucide-react";
import { regionalOffices } from "@/lib/data";

const countryHighlights = [
  { id: "UAE", name: "Dubai, UAE", flag: "🇦🇪", role: "Global Headquarters", tag: "Head Office" },
  { id: "Oman", name: "Oman", flag: "🇴🇲", role: "Ruwi / Muscat Distribution", tag: "Branch" },
  { id: "Qatar", name: "Qatar", flag: "🇶🇦", role: "Doha Logistics & Trading", tag: "Branch" },
  { id: "Bahrain", name: "Bahrain", flag: "🇧🇭", role: "Manama Regional Desk", tag: "Branch" },
  { id: "Kuwait", name: "Kuwait", flag: "🇰🇼", role: "Kuwait City Wholesale Hub", tag: "Branch" },
  { id: "Saudi Arabia", name: "Saudi Arabia", flag: "🇸🇦", role: "Dammam / Riyadh Supply", tag: "Branch" },
];

export default function GCCLocationsMap() {
  const [selectedCountry, setSelectedCountry] = useState<string>("UAE");

  const activeOffice =
    regionalOffices.find(
      (o) =>
        o.country.toLowerCase().includes(selectedCountry.toLowerCase()) ||
        (selectedCountry === "UAE" && o.isHeadquarters) ||
        (selectedCountry.includes("Saudi") && o.country.includes("Saudi"))
    ) || regionalOffices[0];

  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#0B131F] via-[#101B2B] to-[#0B131F] border border-[#1E2E42] shadow-2xl p-4 sm:p-8 text-white my-8 sm:my-10">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1C75BC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D92626]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#D92626]/20 border border-[#D92626]/30 text-[#D92626] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-2.5">
            <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Pan-GCC Regional Network
          </div>
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-playfair-display), Georgia, serif" }}
          >
            Our GCC &amp; Global Distribution Locations
          </h3>
          <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Established in Dubai in 2009 — serving 500+ commercial clients with local distribution branches across 6 GCC nations.
          </p>
        </div>

        {/* Live Route Status Pill */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#E6C687] bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl shrink-0 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#1BA14B] animate-pulse shrink-0" />
          <span>6 Active Regional Hubs</span>
        </div>
      </div>

      {/* Corridor Description Banner (Clean status strip with no extra button) */}
      <div className="relative z-10 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 mb-5 flex items-center gap-2 text-xs text-white/80">
        <Compass className="w-4 h-4 text-[#D92626] shrink-0" />
        <span className="font-semibold text-white">Direct GCC Supply Corridors:</span>
        <span className="text-[#E6C687] truncate">Dubai &bull; Muscat &bull; Doha &bull; Manama &bull; Kuwait &bull; Dammam</span>
      </div>

      {/* Main Grid: Map & Interactive Details */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-5 sm:gap-6 items-start w-full min-w-0">
        {/* Left / Top: The Unobstructed Natural Map Display */}
        <div className="lg:col-span-8 flex flex-col w-full min-w-0">
          <div className="relative w-full rounded-2xl bg-[#FAF8F5] border border-white/15 shadow-inner p-2 sm:p-3 overflow-hidden">
            {/* Map Image rendered with natural responsive scaling so NOTHING is cropped */}
            <div className="relative w-full">
              <Image
                src="/gcc-locations-map.png"
                alt="BLANKET HOUSE TRADING L.L.C. GCC & Global Locations Map - UAE, Oman, Qatar, Bahrain, Kuwait, Saudi Arabia"
                width={1200}
                height={750}
                priority
                className="w-full h-auto max-w-full rounded-xl object-contain block shadow-xs"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
              />
            </div>
          </div>

          {/* Country Selector Strip (Mobile touch-friendly scrollable chips) */}
          <div className="mt-4 w-full min-w-0">
            <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider mb-2">
              Select Location for Direct Branch Details:
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full">
              {countryHighlights.map((item) => {
                const isSelected =
                  selectedCountry === item.id ||
                  (item.id === "UAE" && selectedCountry === "UAE") ||
                  (item.id.includes("Saudi") && selectedCountry.includes("Saudi"));
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCountry(item.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-[#D92626] text-white border-[#D92626] shadow-md shadow-[#D92626]/30 scale-[1.02]"
                        : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-sm sm:text-base">{item.flag}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right / Bottom: Active Selected Country Card */}
        <div className="lg:col-span-4 w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOffice.country}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full min-w-0 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg"
            >
              <div className="w-full min-w-0">
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D92626] text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className="text-base sm:text-lg font-bold text-white leading-tight truncate"
                        style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                      >
                        {activeOffice.country}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#E6C687] font-semibold truncate">
                        {activeOffice.isHeadquarters ? "Global Headquarters & Hub" : "Regional Distribution Branch"}
                      </p>
                    </div>
                  </div>

                  {activeOffice.isHeadquarters && (
                    <span className="bg-[#D92626] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      HQ
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 my-3 text-xs w-full min-w-0">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 w-full min-w-0">
                    <p className="text-[#94A3B8] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Company / Branch</p>
                    <p className="text-white font-semibold text-xs sm:text-sm leading-snug break-words">{activeOffice.companyName}</p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 w-full min-w-0">
                    <p className="text-[#94A3B8] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-1">Office Address</p>
                    <p className="text-white/90 text-xs leading-relaxed break-words">{activeOffice.address}</p>
                  </div>

                  {activeOffice.contactPerson && (
                    <div className="flex flex-wrap items-center justify-between gap-1 p-2.5 bg-white/5 rounded-xl border border-white/10 w-full min-w-0">
                      <span className="text-[#94A3B8] text-[10px] sm:text-[11px]">Representative:</span>
                      <span className="text-white font-medium text-[10px] sm:text-[11px] truncate">{activeOffice.contactPerson}</span>
                    </div>
                  )}

                  {activeOffice.crNo && (
                    <div className="flex flex-wrap items-center justify-between gap-1 p-2.5 bg-white/5 rounded-xl border border-white/10 w-full min-w-0">
                      <span className="text-[#94A3B8] text-[10px] sm:text-[11px]">Commercial Reg (CR):</span>
                      <span className="text-white/80 font-mono text-[10px] sm:text-[11px] truncate">{activeOffice.crNo}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Action Buttons - Clean Mobile Stacking */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2 w-full min-w-0">
                {activeOffice.mobile && (
                  <a
                    href={`tel:${activeOffice.mobile.replace(/\s+/g, "")}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#1BA14B] hover:bg-[#15803D] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Call Mobile ({activeOffice.mobile})</span>
                  </a>
                )}
                <div className="flex flex-col sm:flex-row gap-2 w-full min-w-0">
                  {activeOffice.tel && (
                    <a
                      href={`tel:${activeOffice.tel.replace(/\s+/g, "")}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white py-2 px-2.5 rounded-xl text-xs font-semibold transition-colors border border-white/10"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#1C75BC] shrink-0" />
                      <span className="truncate">Tel: {activeOffice.tel}</span>
                    </a>
                  )}
                  {activeOffice.email && (
                    <a
                      href={`mailto:${activeOffice.email}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white py-2 px-2.5 rounded-xl text-xs font-semibold transition-colors border border-white/10"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#E6C687] shrink-0" />
                      <span className="truncate">Email Office</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


