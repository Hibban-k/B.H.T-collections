"use client";
// components/layout/AnnouncementBar.tsx
import { Phone } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div
      className="bg-[#0B131F] py-2.5 px-4 border-b border-[#1A2433]"
      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Phone Contact in Pure White */}
        <div className="flex items-center gap-2 shrink-0">
          <Phone className="w-3.5 h-3.5 shrink-0 text-[#D92626]" />
          <a
            href="tel:+97142266095"
            className="text-[11.5px] font-bold tracking-wide hover:text-[#D92626] transition-colors"
            style={{ color: "#FFFFFF" }}
          >
            +971 4 2266 095 / +971 55 887 9237
          </a>
        </div>

        {/* Centre: Free Delivery */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-2">
          <span className="bg-[#D92626] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            Free Delivery
          </span>
          <span className="text-[11px] font-medium tracking-wide text-center" style={{ color: "#FFFFFF" }}>
            across UAE &amp; GCC on orders over AED 150
          </span>
        </div>

        {/* Right: Working Hours */}
        <div className="hidden sm:block shrink-0">
          <span className="text-[11px] font-medium" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
            Mon–Sat · 9am–6pm
          </span>
        </div>
      </div>
    </div>
  );
}
