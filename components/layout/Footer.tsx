import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-forest text-muted-light border-t border-white/20 pt-16 pb-6">
      <div className="max-w-[1280px] w-[calc(100%-40px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.25fr] gap-8 md:gap-5 lg:gap-11">
          <div className="lg:col-span-1 md:col-span-2">
            <Link className="inline-flex items-center gap-2.5 text-ivory shrink-0" href="/" aria-label="B.H.T. Collections home">
              <span className="text-[15px] font-semibold tracking-[0.06em] leading-snug">
                B.H.T. COLLECTIONS<small className="block text-[8px] font-medium tracking-[0.2em] uppercase mt-1">Blanket House Trading</small>
              </span>
            </Link>
            <p className="text-xs leading-[1.9] max-w-[28ch] mt-[18px]">Considered collections for the way you live, travel, and do business.</p>
          </div>
          <div className="flex flex-col">
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted-light font-medium mb-4">Explore</div>
            <Link href="/collections?group=home" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">Home textiles</Link>
            <Link href="/collections?group=travel" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">Travel &amp; luggage</Link>
            <Link href="/collections?group=footwear" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">Footwear</Link>
          </div>
          <div className="flex flex-col">
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted-light font-medium mb-4">Our company</div>
            <Link href="/about" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">About B.H.T.</Link>
            <Link href="/brands-partners" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">Brand &amp; Partners</Link>
            <Link href="/region" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">Our regions</Link>
          </div>
          <div className="flex flex-col md:col-span-2 lg:col-span-1 md:flex-row md:flex-wrap lg:flex-col lg:flex-nowrap md:gap-x-6">
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted-light font-medium mb-4 md:w-full lg:w-auto lg:mb-4">Let's talk</div>
            <a href="mailto:info@blankethouse.ae" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">info@blankethouse.ae</a>
            <a href="tel:+971558879237" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">+971 55 887 9237</a>
            <Link href="/contact" className="block text-xs min-h-[35px] text-ivory hover:underline hover:underline-offset-4">Make an enquiry ↗</Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2.5 md:gap-5 border-t border-white/20 mt-11 pt-6 text-[9px] md:text-[10px]">
          <span>© {new Date().getFullYear()} B.H.T. Collections.</span>
          <span>
            Dubai, United Arab Emirates &nbsp; / &nbsp;{' '}
            <a href="#" className="underline underline-offset-4">Back to top ↑</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
