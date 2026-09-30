'use client';

import React, { useState } from 'react';

const quotes = [
  { text: '“The right collection makes a space feel completely different. This is the kind of comfort we come home to.”', name: 'Illustrative customer review', location: 'Sample content · Home textiles' },
  { text: '“A thoughtful range, a helpful conversation, and the details that make choosing easier.”', name: 'Illustrative client review', location: 'Sample content · Collection enquiry' },
  { text: '“Everyday pieces, beautifully considered. A little more ease in the way we live.”', name: 'Illustrative customer review', location: 'Sample content · Lifestyle collection' },
];

export default function ClientReviews() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? quotes.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % quotes.length);

  const current = quotes[index];

  return (
    <section className="py-14 md:py-20 lg:py-26 bg-linen" aria-labelledby="reviews-title">
      <div className="max-w-[1280px] w-[calc(100%-40px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] mx-auto review-layout grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[3fr_7fr] gap-[35px] md:gap-[50px] lg:gap-[90px]">
        <div>
          <span className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-red mb-3">
            Client experiences
          </span>
          <h2 id="reviews-title" className="font-serif font-medium text-[30px] md:text-[32px] tracking-[-0.035em] text-ink leading-[1.18]">
            In good company.
          </h2>
          <p className="text-[13px] md:text-[14px] text-body mt-2.5 md:mt-4 leading-relaxed max-w-[32ch]">
            Illustrative testimonials for this design preview.
          </p>
        </div>
        <div>
          <span className="block font-serif font-medium text-[64px] leading-[0.6] text-red mb-5 select-none" aria-hidden="true">
            “
          </span>
          <div id="quote-content" aria-live="polite">
            <p className="font-serif font-medium text-[clamp(24px,2.6vw,35px)] leading-[1.45] text-ink tracking-[-0.015em] max-w-[650px]">
              {current.text}
            </p>
          </div>
          <div className="flex justify-between items-center mt-7 md:mt-8 gap-5 pt-4">
            <div id="quote-author" className="text-[12px] md:text-[13px] font-medium text-ink">
              {current.name}
              <small className="block text-[10px] md:text-[11px] text-body font-normal mt-1">{current.location}</small>
            </div>
            <div className="flex items-center gap-2.5">
              <span id="quote-count" className="text-[11px] font-medium tracking-[0.1em] text-body pr-2.5">
                0{index + 1} / 0{quotes.length}
              </span>
              <button
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-transparent text-ink hover:bg-ink hover:text-ivory hover:border-ink transition-colors duration-160 cursor-pointer"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="m14 6-6 6 6 6" />
                </svg>
              </button>
              <button
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-transparent text-ink hover:bg-ink hover:text-ivory hover:border-ink transition-colors duration-160 cursor-pointer"
                onClick={next}
                aria-label="Next testimonial"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
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
