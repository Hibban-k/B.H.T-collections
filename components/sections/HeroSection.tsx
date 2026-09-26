"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, ShieldCheck, Truck, Heart } from "lucide-react";

const heroFeatures = [
  {
    icon: Award,
    title: "Premium Quality",
    subtitle: "Long-lasting comfort",
    color: "#298DCB",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Brand",
    subtitle: "Your Comfort, Our Priority",
    color: "#149344",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    subtitle: "Across UAE & GCC",
    color: "#DE2628",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    subtitle: "Thousands of Happy Homes",
    color: "#DE2628",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pb-16" aria-label="B.H.T. Collections Hero">
      
      {/* SVG Clip Path for Organic Arch Hero Image */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="heroArchClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.22 0 C 0.12 0.15, 0.08 0.35, 0.11 0.55 C 0.14 0.75, 0.18 0.88, 0.28 1 L 1 1 L 1 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        
        {/* Main Two-Column Hero Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[460px] py-6 sm:py-8">
          
          {/* LEFT: Text Content */}
          <div className="w-full lg:w-[48%] flex flex-col justify-center text-left z-10">
            
            {/* Eyebrow */}
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#64748B] uppercase font-sans mb-3 block">
              PREMIUM BEDDING &amp; HOME TEXTILES
            </span>

            {/* English Main Title */}
            <h1 className="text-[40px] sm:text-[50px] lg:text-[58px] font-black leading-[1.02] text-[#0C1220] tracking-tight uppercase font-sans mb-1">
              B.H.T. COLLECTIONS
            </h1>

            {/* Prominent Red Arabic Sub-Title */}
            <div className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold text-[#DE2628] leading-[1.1] mb-5 font-sans" dir="rtl">
              بيت البطانيات مجموعات
            </div>

            {/* Tagline / Value Proposition */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[13px] sm:text-[14px] font-medium text-[#475569] mb-7">
              <span>Better Sleep</span>
              <span className="text-[#CBD5E1]">|</span>
              <span>More Comfort</span>
              <span className="text-[#CBD5E1]">|</span>
              <span>A Beautiful Home</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2.5 bg-[#0C1220] hover:bg-[#1E293B] text-white text-[11px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(12,18,32,0.2)] group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-white" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#0C1220] border border-gray-300 hover:border-[#0C1220] text-[11px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                Enquire Catalog
              </Link>
            </div>

          </div>

          {/* RIGHT: Visual Image with Curved Border & Decorative Leaf */}
          <div className="w-full lg:w-[52%] relative flex items-center justify-center">
            
            {/* Decorative Green Petal Flourish on the Curve */}
            <div className="absolute top-[8%] left-[10%] w-12 h-12 sm:w-16 sm:h-16 pointer-events-none z-20">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-sm">
                <path d="M10,90 C10,40 40,10 90,10 C90,60 60,90 10,90 Z" fill="#149344" />
              </svg>
            </div>

            {/* Hero Bedroom Image with Curved Arch */}
            <div
              className="relative w-full h-[340px] sm:h-[420px] lg:h-[460px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] bg-white border border-gray-100"
              style={{ clipPath: "url(#heroArchClip)" }}
            >
              <Image
                src="/hero-bedroom.jpg"
                alt="BHT Collections Premium Bedding & Luxury Master Bedroom"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>

          </div>

        </div>

        {/* 4 Feature Trust Strip (Directly Below Hero As Shown in Pic) */}
        <div className="mt-6 pt-6 border-t border-gray-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/70 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          {heroFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                  style={{ backgroundColor: `${feat.color}10`, borderColor: `${feat.color}30` }}
                >
                  <Icon className="w-4 h-4" style={{ color: feat.color }} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12.5px] font-bold text-[#0C1220] leading-tight">
                    {feat.title}
                  </span>
                  <span className="text-[11px] text-[#64748B] mt-0.5">
                    {feat.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
