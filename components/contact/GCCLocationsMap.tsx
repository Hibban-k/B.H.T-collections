"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  ExternalLink,
  Sparkles,
  Navigation,
  Maximize2,
  X,
  Compass,
  CheckCircle2,
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeOffice =
    regionalOffices.find(
      (o) =>
        o.country.toLowerCase().includes(selectedCountry.toLowerCase()) ||
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

        {/* Live Route Badge */}
        <div className="flex items-center gap-2.5 text-xs font-semibold text-[#E6C687] bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1BA14B] animate-pulse shrink-0" />
          <span>6 Active Regional Hubs</span>
        </div>
      </div>

      {/* Status Bar / Legend (Placed clearly OUTSIDE the map image so nothing is covered) */}
      <div className="relative z-10 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 mb-5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-white/80">
          <Compass className="w-4 h-4 text-[#D92626] shrink-0" />
          <span className="font-semibold text-white">Direct GCC Supply Corridors:</span>
          <span className="text-[#E6C687] hidden sm:inline">Dubai &bull; Muscat &bull; Doha &bull; Manama &bull; Kuwait &bull; Dammam</span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E6C687] hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors ml-auto sm:ml-0"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Full Map View</span>
        </button>
      </div>

      {/* Main Grid: Map & Interactive Details */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-start">
        {/* Left / Top: The Unobstructed Interactive Map Display */}
        <div className="lg:col-span-8 flex flex-col">
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative w-full rounded-2xl overflow-hidden bg-[#FAF8F5] border border-white/15 shadow-inner cursor-pointer group flex items-center justify-center p-2 sm:p-4"
          >
            {/* Map Image: high visual clarity with natural proportions */}
            <div className="relative w-full aspect-[16/11] sm:aspect-[16/10]">
              <Image
                src="/gcc-locations-map.png"
                alt="BLANKET HOUSE TRADING L.L.C. GCC & Global Locations Map - UAE, Oman, Qatar, Bahrain, Kuwait, Saudi Arabia"
                fill
                priority
                className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
              />
            </div>

            {/* Click to expand hover banner */}
            <div className="absolute inset-0 bg-[#0B131F]/0 group-hover:bg-[#0B131F]/20 transition-colors flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0B131F]/85 backdrop-blur-md text-white border border-white/20 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-[#E6C687]" /> Tap to Enlarge
              </span>
            </div>
          </div>

          {/* Country Selector Strip (Mobile touch-friendly scrollable chips) */}
          <div className="mt-4">
            <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>Select Location for Direct Branch Details:</span>
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
              {countryHighlights.map((item) => {
                const isSelected =
                  selectedCountry === item.id ||
                  (item.id === "UAE" && selectedCountry === "UAE") ||
                  (item.id.includes("Saudi") && selectedCountry.includes("Saudi"));
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCountry(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? "bg-[#D92626] text-white border-[#D92626] shadow-md shadow-[#D92626]/30 scale-[1.02]"
                        : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{item.flag}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right / Bottom: Active Selected Country Card */}
        <div className="lg:col-span-4 h-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOffice.country}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#D92626] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
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
                    <span className="bg-[#D92626] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
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
                    <p className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider mb-1">Office Address</p>
                    <p className="text-white/90 text-xs leading-relaxed">{activeOffice.address}</p>
                  </div>

                  {activeOffice.contactPerson && (
                    <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[#94A3B8] text-[11px]">Representative:</span>
                      <span className="text-white font-medium text-[11px]">{activeOffice.contactPerson}</span>
                    </div>
                  )}

                  {activeOffice.crNo && (
                    <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[#94A3B8] text-[11px]">Commercial Reg (CR):</span>
                      <span className="text-white/80 font-mono text-[11px]">{activeOffice.crNo}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                {activeOffice.mobile && (
                  <a
                    href={`tel:${activeOffice.mobile.replace(/\s+/g, "")}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#1BA14B] hover:bg-[#15803D] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Mobile ({activeOffice.mobile})
                  </a>
                )}
                <div className="flex gap-2">
                  {activeOffice.tel && (
                    <a
                      href={`tel:${activeOffice.tel.replace(/\s+/g, "")}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white py-2 px-2.5 rounded-xl text-xs font-semibold transition-colors border border-white/10"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#1C75BC]" />
                      Tel: {activeOffice.tel}
                    </a>
                  )}
                  {activeOffice.email && (
                    <a
                      href={`mailto:${activeOffice.email}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white py-2 px-2.5 rounded-xl text-xs font-semibold transition-colors border border-white/10"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#E6C687]" />
                      Email Office
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── High-Resolution Lightbox Modal ────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 px-2 border-b border-[#E8DFC8] mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#D92626]" />
                  <span className="text-sm sm:text-base font-bold text-[#0B131F]">
                    BLANKET HOUSE TRADING L.L.C. — GCC &amp; Global Distribution Map
                  </span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#0B131F] text-white flex items-center justify-center hover:bg-[#D92626] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* High-Res Image View */}
              <div className="relative w-full aspect-[16/10] max-h-[75vh]">
                <Image
                  src="/gcc-locations-map.png"
                  alt="BLANKET HOUSE TRADING L.L.C. Full GCC Locations Map"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 px-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
                <span>Head Office: Baniyas Square, Deira, Dubai, UAE</span>
                <span className="font-semibold text-[#D92626]">Direct Branches: UAE &bull; Oman &bull; Qatar &bull; Bahrain &bull; Kuwait &bull; Saudi Arabia</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

