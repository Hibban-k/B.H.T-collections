"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "bed-sheets",
    name: "Bed Sheets",
    href: "/collections/bed-linen",
    image: "/bht-bed-sheets.jpg",
    alt: "Luxury hotel styled bed sheets in soft blues and crisp whites",
    color: "#298DCB",
  },
  {
    id: "comforters",
    name: "Comforters",
    href: "/collections/comforters",
    image: "/bht-comforters.jpg",
    alt: "Premium plush quilted beige comforter in hotel master suite",
    color: "#DE2628",
  },
  {
    id: "blankets",
    name: "Blankets",
    href: "/collections/blankets",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
    alt: "Folded stack of premium luxury textured blankets and throws",
    color: "#149344",
  },
  {
    id: "pillows",
    name: "Pillows & Cushions",
    href: "/collections",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
    alt: "Fluffy white hotel grade pillows",
    color: "#0C1220",
  },
  {
    id: "luggage",
    name: "Travel Suitcases",
    href: "/collections",
    image: "/dubai-portfolio-circle.jpg",
    alt: "Travel Go luxury trolley suitcases",
    color: "#DE2628",
  },
  {
    id: "slippers",
    name: "Comfort Footwear",
    href: "/collections",
    image: "/dubai-portfolio-circle.jpg",
    alt: "Arabic slippers and ADDA footwear",
    color: "#298DCB",
  },
];

export default function CollectionShowcase() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden" id="collections">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        
        {/* Header with Dual Elements */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#64748B] uppercase font-sans block mb-2">
              SHOP BY CATEGORY
            </span>
            <h2 className="text-[34px] sm:text-[46px] font-black text-[#0C1220] uppercase font-sans tracking-tight mb-2">
              Our <span className="text-[#DE2628]">Collections</span>
            </h2>
            <p className="text-[14px] text-[#64748B] font-sans leading-relaxed">
              From cozy bed sheets to elegant blankets, find everything you need to make every space more comfortable and luxurious.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-[#0C1220] hover:bg-[#1E293B] text-white text-[11px] font-bold tracking-[0.08em] uppercase px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(12,18,32,0.2)] shrink-0 group self-start md:self-auto"
          >
            <span>Explore All Collections</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#DE2628]" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {collections.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-400 hover:shadow-[0_10px_26px_rgba(0,0,0,0.06)] flex flex-col"
            >
              {/* Card Image */}
              <div className="relative w-full h-[140px] sm:h-[155px] overflow-hidden bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </div>

              {/* Bottom Label & Arrow */}
              <div className="p-3.5 flex items-center justify-between border-t border-gray-100 bg-white">
                <span className="text-[12px] font-bold text-[#0C1220] font-sans group-hover:text-[#DE2628] transition-colors">
                  {item.name}
                </span>

                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#64748B] group-hover:bg-[#DE2628] group-hover:text-white transition-all duration-200">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
