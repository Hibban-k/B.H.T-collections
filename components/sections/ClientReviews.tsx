'use client';

import React, { useState } from 'react';

const quotes = [
  { text: 'The right collection makes a space feel completely different. This is the kind of comfort we come home to.', name: 'Illustrative customer review', location: 'Sample content · Home textiles' },
  { text: 'A thoughtful range, a helpful conversation, and the details that make choosing easier.', name: 'Illustrative client review', location: 'Sample content · Collection enquiry' },
  { text: 'Everyday pieces, beautifully considered. A little more ease in the way we live.', name: 'Illustrative customer review', location: 'Sample content · Lifestyle collection' },
  { text: 'The attention to detail and premium finish truly sets these collections apart from anything else.', name: 'Illustrative partner review', location: 'Sample content · B2B Client' },
];

export default function ClientReviews() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? quotes.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % quotes.length);

  // Get current and next quote for the 2-card layout
  const visibleQuotes = [
    quotes[index],
    quotes[(index + 1) % quotes.length]
  ];

  return (
    <section className="py-14 md:py-20 lg:py-26 bg-linen" aria-labelledby="reviews-title">
      <div className="wrap grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-[40px] lg:gap-[80px]">
        
        {/* Left Side: Intro & Controls */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="block text-[10px] md:text-[11px] font-semibold tracking-[0.15em] uppercase text-red mb-4">
              Client experiences
            </span>
            <h2 id="reviews-title" className="font-serif font-medium text-[32px] md:text-[40px] tracking-[-0.02em] text-ink leading-[1.1]">
              In good company.
            </h2>
            <p className="text-[13px] md:text-[14px] text-body mt-4 leading-[1.8] max-w-[32ch]">
              Illustrative testimonials for this design preview. Discover what our partners have to say.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 mt-12">
            <button
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-transparent text-ink hover:bg-ink hover:text-ivory hover:border-ink transition-colors duration-200 cursor-pointer"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="m14 6-6 6 6 6" />
              </svg>
            </button>
            <button
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-transparent text-ink hover:bg-ink hover:text-ivory hover:border-ink transition-colors duration-200 cursor-pointer"
              onClick={next}
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="m10 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side: Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {visibleQuotes.map((q, i) => (
              <div 
                key={`${index}-${i}`} 
                className={`bg-white p-8 md:p-10 rounded-[4px] border border-[#e5e0d8] shadow-[0_4px_20px_-10px_rgba(32,39,35,0.08)] flex flex-col justify-between min-h-[280px] lg:min-h-[320px] transition-opacity duration-300 animate-in fade-in zoom-in-95 ${i === 1 ? 'hidden md:flex' : 'flex'}`}
              >
                <div>
                  <p className="font-serif text-[17px] md:text-[19px] leading-[1.6] text-ink">
                    {q.text}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/60">
                  <strong className="block text-[13px] font-semibold tracking-wide text-ink">
                    {q.name}
                  </strong>
                  <span className="block text-[11px] font-medium text-body mt-1.5">
                    {q.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden justify-between items-center mt-8">
            <span className="text-[11px] font-medium tracking-[0.1em] text-body">
              0{index + 1} / 0{quotes.length}
            </span>
            <div className="flex gap-3">
              <button
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-transparent text-ink hover:bg-ink hover:text-ivory hover:border-ink transition-colors"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="m14 6-6 6 6 6" />
                </svg>
              </button>
              <button
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-transparent text-ink hover:bg-ink hover:text-ivory hover:border-ink transition-colors"
                onClick={next}
                aria-label="Next testimonial"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="m10 6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
