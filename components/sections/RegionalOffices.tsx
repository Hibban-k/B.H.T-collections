"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface OfficeLocation {
  country: string;
  city: string;
  image: string;
  href: string;
  code: string;
}

const offices: OfficeLocation[] = [
  {
    country: "UAE",
    city: "Dubai",
    code: "+971",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop",
    href: "/contact?region=uae",
  },
  {
    country: "OMAN",
    city: "Muscat",
    code: "+968",
    image: "https://images.unsplash.com/photo-1578895101407-a36c5db610ee?q=80&w=600&auto=format&fit=crop",
    href: "/contact?region=oman",
  },
  {
    country: "QATAR",
    city: "Doha",
    code: "+974",
    image: "https://images.unsplash.com/photo-1579600161224-cac5a2971069?q=80&w=600&auto=format&fit=crop",
    href: "/contact?region=qatar",
  },
  {
    country: "SAUDI ARABIA",
    city: "Riyadh",
    code: "+966",
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=600&auto=format&fit=crop",
    href: "/contact?region=saudi",
  },
  {
    country: "INDIA",
    city: "Bangalore",
    code: "+91",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600&auto=format&fit=crop",
    href: "/contact?region=india",
  },
  {
    country: "SINGAPORE",
    city: "Singapore",
    code: "+65",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop",
    href: "/contact?region=singapore",
  },
];

export default function RegionalOffices() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden" id="offices">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="text-left mb-10">
          <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#64748B] uppercase font-sans block mb-2">
            GLOBAL NETWORK
          </span>
          <h2 className="text-[34px] sm:text-[44px] font-black text-[#0C1220] uppercase font-sans tracking-tight mb-1">
            Our Regional <span className="text-[#DE2628]">Offices</span>
          </h2>
          <p className="text-[14px] text-[#64748B] font-sans">
            Global Presence. Local Support.
          </p>
        </div>

        {/* 6 Office Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {offices.map((office, idx) => (
            <Link
              key={idx}
              href={office.href}
              className="group bg-white/95 backdrop-blur-sm border border-gray-200/90 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-gray-400 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex flex-col"
            >
              {/* City Photo */}
              <div className="relative w-full h-[96px] sm:h-[105px] overflow-hidden bg-gray-100">
                <Image
                  src={office.image}
                  alt={`${office.city}, ${office.country}`}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </div>

              {/* Text Meta */}
              <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <span className="text-[9.5px] font-bold tracking-[0.14em] text-[#64748B] uppercase block font-sans">
                    {office.country}
                  </span>
                  <span className="text-[13px] font-bold text-[#0C1220] block mt-0.5 font-sans">
                    {office.city}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#0C1220] group-hover:text-[#DE2628] transition-colors mt-3 pt-2 border-t border-gray-100">
                  <span>View Location</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
