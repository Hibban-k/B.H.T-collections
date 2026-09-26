"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bed, Briefcase, Footprints } from "lucide-react";

const portfolioItems = [
  {
    icon: Bed,
    title: "Complete Labour Camp Supplies",
    description: "Bunker Beds, Lockers, Blankets, Mattresses, Pillows & More.",
    color: "#298DCB",
  },
  {
    icon: Briefcase,
    title: "Travel Suitcases",
    description: "PP, ABS, and Fabric Luggage with lightweight durable designs.",
    color: "#DE2628",
  },
  {
    icon: Footprints,
    title: "Footwear",
    description: "Arabic Style Slippers and ADDA / Magicwalk Comfort Branded Footwear.",
    color: "#149344",
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Text & 3 Categories (7 cols) */}
          <div className="lg:col-span-7">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#64748B] uppercase font-sans">
                BEYOND TEXTILES
              </span>
              <span className="text-[#DE2628]">•</span>
              <span className="text-[11px] font-bold text-[#DE2628]" dir="rtl">
                بيت البطانيات مجموعات
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-[34px] sm:text-[44px] font-black leading-[1.08] text-[#0C1220] uppercase font-sans mb-1.5">
              Other Product <span className="text-[#DE2628]">Portfolio</span>
            </h2>
            <p className="text-[10.5px] font-bold tracking-[0.14em] text-[#64748B] uppercase mb-4">
              BLANKET HOUSE TRADING L.L.C.
            </p>

            <p className="text-[14px] leading-[1.75] text-[#475569] max-w-[500px] mb-6 font-sans">
              B.H.T. Collections has diversified into multiple product categories. We are also active in Travel Accessories and Footwear, serving as regional distributors for renowned international brands.
            </p>

            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-[#0C1220] hover:bg-[#1E293B] text-white text-[11px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(12,18,32,0.2)] group mb-10"
            >
              <span>OUR SERVICES</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#DE2628]" />
            </Link>

            {/* 3 Category Feature Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 pt-6 border-t border-gray-200/80">
              {portfolioItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="bg-white/85 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                    <div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border"
                        style={{ backgroundColor: `${item.color}12`, borderColor: `${item.color}30` }}
                      >
                        <IconComponent className="w-4 h-4" style={{ color: item.color }} strokeWidth={2} />
                      </div>
                      <h3 className="text-[13px] font-bold text-[#0C1220] mb-1 font-sans leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11.5px] text-[#64748B] leading-[1.5]">
                        {item.description}
                      </p>
                    </div>
                    <div className="w-5 h-[2px] rounded-full mt-3.5" style={{ backgroundColor: item.color }} />
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Circular Composition with Brand Accent Petal */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            
            {/* Red & Blue Curved Accent Corner */}
            <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none z-20">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
                <path d="M10,90 C10,40 40,10 90,10 C90,60 60,90 10,90 Z" fill="#DE2628" />
              </svg>
            </div>

            {/* Main Circular Image */}
            <div className="relative w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-4 border-white shadow-[0_12px_36px_rgba(0,0,0,0.08)] group bg-white">
              <Image
                src="/dubai-portfolio-circle.jpg"
                alt="Dubai skyline with luxury BHT travel luggage and blankets"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 320px, 420px"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
