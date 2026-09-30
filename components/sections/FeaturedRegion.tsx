import React from 'react';
import Link from 'next/link';

export default function FeaturedRegion() {
  return (
    <section className="py-14 md:py-20 lg:py-26 bg-ivory" aria-labelledby="featured-region-title">
      <div className="max-w-[1280px] w-[calc(100%-40px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] mx-auto grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 md:gap-12 lg:gap-[72px] items-center">
        <div className="bg-linen text-forest aspect-[4/3] md:aspect-[6/5] rounded-[4px] p-7 md:p-11 flex flex-col justify-between relative overflow-hidden">
          <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-body">
            Our starting point
          </span>
          <span className="font-serif font-medium text-[75px] lg:text-[clamp(70px,9vw,125px)] leading-none tracking-[-0.06em] flex items-baseline gap-5 md:gap-[25px] border-b border-[#b2b5a8] pb-5">
            Dubai<span className="font-serif font-normal text-[29px] md:text-[40px] tracking-normal opacity-50">دبي</span>
          </span>
          <div className="flex justify-between items-end text-[10px] md:text-[11px] leading-[1.9] gap-[15px]">
            <span>United Arab Emirates<br />Blanket House Trading L.L.C.</span>
            <span className="text-[36px] md:text-[45px] leading-none" aria-hidden="true">↗</span>
          </div>
        </div>
        <div>
          <span className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-red mb-3">
            Rooted in Dubai. Connected across the region.
          </span>
          <h2 id="featured-region-title" className="font-serif font-medium text-[clamp(28px,3.2vw,44px)] leading-[1.18] tracking-[-0.035em] text-ink mb-4 md:mb-6">
            A local conversation.<br />A wider perspective.
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.8] text-body mb-6 max-w-[48ch]">
            Our Dubai headquarters is the starting point for a network of regional relationships. Find the team closest to you.
          </p>
          <Link
            className="inline-flex items-center gap-2 md:gap-3 text-[13px] font-semibold tracking-[0.04em] uppercase text-ink hover:text-red transition-colors group mb-6"
            href="/region?office=uae"
          >
            Explore our regions
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </Link>
          <div className="border-t border-border pt-[22px] mt-2 text-[12px] md:text-[13px] leading-relaxed text-body">
            <strong className="block font-medium text-ink mb-[5px]">Dubai, United Arab Emirates</strong>
            Blanket House Trading L.L.C.<br />
            Baniyas Square, Deira
          </div>
        </div>
      </div>
    </section>
  );
}
