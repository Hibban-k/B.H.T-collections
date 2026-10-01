'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';

const categories = [
  { name: 'Crockery', image: '/bht-bed-sheets.jpg' },
  { name: 'Duvet Cover Sets', image: '/hero-bedroom.jpg' },
  { name: 'Pillowcases', image: '/bht-blankets.png' },
  { name: 'Duvet', image: '/bht-comforters.jpg' },
  { name: 'Bed Spreads', image: '/temp-lifestyle.jpg' },
];

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default function MainCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-[60px] md:py-[90px]" id="categories">
      <div className="wrap">
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-[28px] md:text-[36px] font-serif text-ink mb-3 font-normal">Shop by Category</h2>
            <p className="text-[14px] md:text-[15px] text-body max-w-lg mx-auto">Soft, stylish, and comfortable essentials for every room</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={50} delay={0.15}>
          <div className="relative group">
            {/* Scroll Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-[42%] -translate-y-1/2 -translate-x-1/2 w-10 h-10 md:w-[50px] md:h-[50px] bg-white border border-border rounded-full flex items-center justify-center text-ink z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-linen shadow-sm hidden md:flex"
            aria-label="Scroll left"
          >
            <ArrowLeft />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-[42%] -translate-y-1/2 translate-x-1/2 w-10 h-10 md:w-[50px] md:h-[50px] bg-white border border-border rounded-full flex items-center justify-center text-ink z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-linen shadow-sm hidden md:flex"
            aria-label="Scroll right"
          >
            <ArrowRight />
          </button>

          {/* Carousel Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat, index) => (
              <Link 
                key={index}
                href="/collections"
                className="flex flex-col items-center flex-shrink-0 w-[260px] md:w-[280px] lg:w-[310px] snap-start group/card"
              >
                <div className="relative w-full aspect-square rounded-[6px] overflow-hidden mb-6 bg-linen border border-black/5">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 280px, 310px"
                    className="object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
                  />
                </div>
                <div className="text-center">
                  <span className="inline-block text-[11px] md:text-[12px] font-medium tracking-[0.12em] text-ink uppercase pb-1 border-b border-[#D8D4CC] group-hover/card:border-ink transition-colors">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
