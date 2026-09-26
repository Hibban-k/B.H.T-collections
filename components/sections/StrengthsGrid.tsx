"use client";

import { Truck, Users, ShieldCheck, Warehouse, Shield, Lightbulb } from "lucide-react";

const strengths = [
  {
    icon: Truck,
    title: "Timely Delivery",
    description: "On time, every time.",
    color: "#298DCB",
  },
  {
    icon: Users,
    title: "Professional Sales Team",
    description: "Experienced. Dedicated.",
    color: "#DE2628",
  },
  {
    icon: ShieldCheck,
    title: "Price Match Guarantee",
    description: "Best value, always.",
    color: "#149344",
  },
  {
    icon: Warehouse,
    title: "50,000+ SQFT Warehouse",
    description: "Efficient. Scalable.",
    color: "#0C1220",
  },
  {
    icon: Shield,
    title: "Strong Accountability",
    description: "Your trust drives us.",
    color: "#298DCB",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description: "Latest market products.",
    color: "#DE2628",
  },
];

export default function StrengthsGrid() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden" id="strengths">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#64748B] uppercase font-sans block mb-2">
            WHY CHOOSE US
          </span>
          <h2 className="text-[34px] sm:text-[44px] font-black text-[#0C1220] uppercase font-sans tracking-tight mb-2">
            Quality You Can <span className="text-[#DE2628]">Trust</span>
          </h2>
          <p className="text-[14px] text-[#64748B] font-sans">
            Designed for comfort. Built for everyday living.
          </p>
        </div>

        {/* 6 Horizontal Cards Grid with Bottom Accent Pill */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {strengths.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-gray-300 group cursor-default"
                style={{ minHeight: "155px" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 border"
                  style={{ backgroundColor: `${item.color}12`, borderColor: `${item.color}25` }}
                >
                  <IconComponent className="w-4 h-4" style={{ color: item.color }} strokeWidth={2} />
                </div>
                
                <div>
                  <h3 className="text-[12.5px] font-bold text-[#0C1220] leading-snug font-sans mb-1">
                    {item.title}
                  </h3>
                  
                  <p className="text-[11px] text-[#64748B] leading-tight font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Color Accent Line */}
                <div
                  className="w-6 h-[2px] rounded-full mt-3 group-hover:w-10 transition-all duration-200"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
