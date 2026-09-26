"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BrandItem {
  id: string;
  name: string;
  tagline?: string;
  category: string;
  type: "svg" | "image";
  imageSrc?: string;
  accentColor?: string;
}

const brands: BrandItem[] = [
  {
    id: "bht",
    name: "B.H.T. COLLECTIONS",
    tagline: "BLANKET HOUSE TRADING",
    category: "Master Brand",
    type: "image",
    imageSrc: "/bht-flower-icon.png",
  },
  {
    id: "magicwalk",
    name: "MAGICWALK",
    tagline: "COMFORT FOOTWEAR",
    category: "Footwear",
    type: "svg",
    accentColor: "#DE2628",
  },
  {
    id: "adda",
    name: "ADDA",
    tagline: "LET'S WALK TOGETHER",
    category: "Footwear",
    type: "svg",
    accentColor: "#0C1220",
  },
  {
    id: "travelgo",
    name: "TRAVEL GO",
    tagline: "SUPER LIGHT WEIGHT TROLLEY",
    category: "Luggage",
    type: "svg",
    accentColor: "#298DCB",
  },
  {
    id: "infinity",
    name: "INFINITY PARIS",
    tagline: "PARISIAN TRAVEL GEAR",
    category: "Travel Accessories",
    type: "svg",
    accentColor: "#0C1220",
  },
  {
    id: "hanaa",
    name: "HANAA",
    tagline: "PREMIUM BLANKETS",
    category: "Blankets",
    type: "svg",
    accentColor: "#C9B79F",
  },
  {
    id: "damas",
    name: "DAMAS GOLD",
    tagline: "LUXURY EMBOSSED BLANKETS",
    category: "Blankets",
    type: "svg",
    accentColor: "#B78A38",
  },
  {
    id: "royalon",
    name: "ROYALON 3D",
    tagline: "HIGH DENSITY CLOUD BLANKETS",
    category: "Blankets",
    type: "svg",
    accentColor: "#149344",
  },
];

export default function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-6 sm:py-8 relative overflow-hidden" id="brands">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#0C1220] uppercase font-sans">
              BRANDS WE <span className="text-[#DE2628]">REPRESENT</span>
            </span>
          </div>

          {/* Slider Control Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[#0C1220] flex items-center justify-center transition-all duration-200 hover:-translate-x-0.5 hover:border-[#DE2628] shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[#0C1220] flex items-center justify-center transition-all duration-200 hover:translate-x-0.5 hover:border-[#DE2628] shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand Card Track */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3.5 overflow-x-auto scrollbar-none py-1 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="shrink-0 w-[190px] sm:w-[210px] h-[78px] bg-white/95 backdrop-blur-sm border border-gray-200/90 rounded-xl px-4 py-2.5 flex items-center justify-center transition-all duration-200 hover:border-[#DE2628] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] group cursor-pointer"
            >
              {brand.type === "image" && brand.imageSrc ? (
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 shrink-0">
                    <Image
                      src={brand.imageSrc}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11.5px] font-extrabold text-[#0C1220] tracking-tight leading-none font-sans">
                      {brand.name}
                    </span>
                    <span className="text-[8px] text-[#64748B] tracking-[0.1em] mt-1 font-semibold">
                      {brand.tagline}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <span
                    className="text-[13px] sm:text-[14px] font-black tracking-[0.06em] leading-none transition-colors group-hover:scale-[1.02]"
                    style={{
                      color: brand.accentColor || "#0C1220",
                      fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)",
                    }}
                  >
                    {brand.name}
                  </span>
                  {brand.tagline && (
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-[#64748B] tracking-[0.14em] uppercase mt-1">
                      {brand.tagline}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
