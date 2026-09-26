"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <div className="w-full">
      {/* Newsletter Subscription Strip (As in Pic) */}
      <section className="py-12 bg-white/90 backdrop-blur-sm border-t border-b border-gray-200/80 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Brand & Copy */}
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/bht-flower-icon.png" alt="BHT" fill className="object-contain" />
            </div>
            <div>
              <h3 className="text-[16px] font-black text-[#0C1220] uppercase tracking-tight">
                Stay Updated
              </h3>
              <p className="text-[12px] text-[#64748B]">
                Be the first to know about new arrivals, institutional catalogues and B2B offers.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="px-4 py-2.5 rounded-full border border-gray-300 focus:border-[#DE2628] focus:outline-none text-[12px] w-full sm:w-[280px] bg-white shadow-inner"
            />
            <button
              type="submit"
              className="bg-[#DE2628] hover:bg-[#B71C1E] text-white text-[11px] font-bold tracking-wider uppercase px-6 py-2.5 rounded-full transition-all shrink-0 shadow-[0_2px_8px_rgba(222,38,40,0.25)]"
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>

          {/* Red & Blue Brand Petals on the Right */}
          <div className="hidden lg:block absolute right-[-20px] -bottom-4 w-28 h-28 pointer-events-none opacity-90">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path d="M10,90 C10,40 40,10 90,10 C90,60 60,90 10,90 Z" fill="#DE2628" />
              <path d="M15,95 C15,55 45,25 95,25 C95,65 65,95 15,95 Z" fill="#298DCB" opacity="0.8" />
            </svg>
          </div>

        </div>
      </section>

      {/* High-Impact Navy B2B CTA Banner */}
      <section className="bg-[#0C1220] text-white py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(41,141,203,0.1),transparent_60%)] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* LEFT: Text & Button */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#DE2628] uppercase">
                  GLOBAL DISTRIBUTION PARTNER
                </span>
              </div>

              <h2 className="text-[34px] sm:text-[46px] font-black leading-[1.08] text-white uppercase font-sans mb-5">
                Trusted by Businesses.<br />
                Chosen for <span className="text-[#DE2628]">Quality.</span>
              </h2>

              <p className="text-[14px] leading-[1.75] text-[#94A3B8] max-w-[460px] mb-8 font-sans">
                From homes to leading hospitality groups, we deliver quality textiles and institutional supplies across global destinations — B.H.T. Collections delivers products that people trust.
              </p>

              <Link
                href="/collections"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-100 text-[#0C1220] text-[11px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)] group"
              >
                <span>EXPLORE ALL COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#DE2628]" />
              </Link>
            </div>

            {/* RIGHT: Visual & 3 Large Metric Counters */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-between gap-8 pt-4 lg:pt-0">
              
              <div className="relative w-full sm:w-[260px] h-[200px] sm:h-[220px] rounded-2xl overflow-hidden border border-white/10 shrink-0">
                <Image
                  src="/dubai-portfolio-circle.jpg"
                  alt="BHT Travel & Lifestyle Products"
                  fill
                  className="object-cover object-bottom"
                  sizes="(max-width: 768px) 100vw, 260px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1220]/80 via-transparent to-transparent" />
              </div>

              {/* 3 Metric Counters */}
              <div className="flex flex-row sm:flex-col justify-around w-full gap-5 border-t sm:border-t-0 sm:border-l border-white/15 pt-5 sm:pt-0 sm:pl-8">
                <div>
                  <span className="text-[34px] sm:text-[42px] font-black text-white font-sans leading-none block">
                    10+
                  </span>
                  <span className="text-[10px] font-bold text-[#94A3B8] tracking-[0.16em] uppercase block mt-1">
                    Countries
                  </span>
                </div>

                <div>
                  <span className="text-[34px] sm:text-[42px] font-black text-[#DE2628] font-sans leading-none block">
                    100+
                  </span>
                  <span className="text-[10px] font-bold text-[#94A3B8] tracking-[0.16em] uppercase block mt-1">
                    Product SKUs
                  </span>
                </div>

                <div>
                  <span className="text-[34px] sm:text-[42px] font-black text-[#298DCB] font-sans leading-none block">
                    50+
                  </span>
                  <span className="text-[10px] font-bold text-[#94A3B8] tracking-[0.16em] uppercase block mt-1">
                    Product Categories
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
