"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gem, Handshake, Truck, TrendingUp } from "lucide-react";

const missionPoints = [
  {
    icon: Gem,
    title: "Deliver consistent quality",
    desc: "Strict quality controls and international material standards.",
    color: "#298DCB",
  },
  {
    icon: Handshake,
    title: "Build long-term business relationships",
    desc: "Reliable B2B partnerships sustained over decades.",
    color: "#DE2628",
  },
  {
    icon: Truck,
    title: "Maintain reliable supply",
    desc: "Expansive warehouse capacity and on-time fulfillment.",
    color: "#149344",
  },
  {
    icon: TrendingUp,
    title: "Continuously evolve with market needs",
    desc: "Adaptive portfolio responding to institutional demands.",
    color: "#0C1220",
  },
];

export default function WhoWeAre() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden" aria-label="Who We Are">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Story & Introduction */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#64748B] uppercase font-sans">
                WHO WE ARE
              </span>
              <span className="text-[#DE2628]">•</span>
              <span className="text-[11px] font-bold text-[#DE2628] font-sans" dir="rtl">
                بيت البطانيات مجموعات
              </span>
            </div>

            <h2 className="text-[36px] sm:text-[46px] font-black leading-[1.08] text-[#0C1220] font-sans uppercase tracking-tight mb-5">
              Built on Quality.<br />
              Driven by <span className="text-[#DE2628]">Trust.</span>
            </h2>

            <p className="text-[14px] leading-[1.75] text-[#475569] mb-5 font-sans">
              B.H.T. Collections is a trusted partner in the global supply chain, offering premium textiles, bedding, travel accessories and footwear. We are committed to delivering quality products, reliable service and long-term business relationships.
            </p>

            <p className="text-[14px] leading-[1.75] text-[#475569] mb-8 font-sans">
              With deep roots established across the UAE, GCC, and international trading hubs, we bridge direct international manufacturing with seamless regional logistics.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#0C1220] hover:bg-[#1E293B] text-white text-[11px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(12,18,32,0.2)] group"
            >
              <span>EXPLORE OUR STORY</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#DE2628]" />
            </Link>
          </div>

          {/* RIGHT: 4-Quadrant Mission Card with Color Theory Accents */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-2xl p-7 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-7">
                <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#0C1220] uppercase font-sans">
                  OUR MISSION
                </span>
                <span className="w-6 h-1 rounded-full bg-[#DE2628]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
                {missionPoints.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex flex-col">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 border"
                        style={{ backgroundColor: `${item.color}12`, borderColor: `${item.color}25` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={2} />
                      </div>
                      <h3 className="text-[13.5px] font-bold text-[#0C1220] mb-1.5 font-sans leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-[#64748B] leading-[1.6]">
                        {item.desc}
                      </p>
                      <div className="w-5 h-[2px] rounded-full mt-3" style={{ backgroundColor: item.color }} />
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
