import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutSummary() {
  return (
    <section className="py-[56px] md:py-[80px] lg:py-[104px] bg-forest text-muted-light dark" aria-labelledby="home-about-title">
      <div className="wrap about-home-grid">
        <div className="flex flex-col justify-center">
          <span className="block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase mb-[18px] text-muted-light">About B.H.T. Collections</span>
          <h2 id="home-about-title" className="font-serif font-medium tracking-[-0.035em] text-[clamp(30px,3.65vw,48px)] leading-[1.18] text-ivory max-w-[15ch] mb-6 md:mb-8">
            Many collections.<br />One personal connection.
          </h2>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] text-ivory mb-5 md:mb-6 max-w-[32ch]">
            From the comfort of home to the possibilities of a new journey, we bring everyday essentials together.
          </p>
          <p className="text-[13px] leading-[1.7] max-w-[42ch] mb-8 md:mb-10">
            Based in Dubai, Blanket House Trading connects home textiles, travel &amp; luggage, and footwear with a personal approach to your requirements.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-x-[35px] gap-y-2 mb-8 md:mb-10">
            <span className="flex items-center text-[10px] md:text-[11px] font-medium tracking-[0.1em] uppercase before:content-[''] before:block before:w-[5px] before:h-[5px] before:bg-red before:mr-2.5 md:before:mr-[14px]">Home textiles</span>
            <span className="flex items-center text-[10px] md:text-[11px] font-medium tracking-[0.1em] uppercase before:content-[''] before:block before:w-[5px] before:h-[5px] before:bg-red before:mr-2.5 md:before:mr-[14px]">Travel &amp; luggage</span>
            <span className="flex items-center text-[10px] md:text-[11px] font-medium tracking-[0.1em] uppercase before:content-[''] before:block before:w-[5px] before:h-[5px] before:bg-red before:mr-2.5 md:before:mr-[14px]">Footwear</span>
          </div>
          <Link className="inline-flex items-center gap-[18px] text-[13px] font-medium underline decoration-1 underline-offset-[6px] text-ivory hover:text-muted-light transition-colors w-fit" href="/about">
            Discover the story of B.H.T.
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px] shrink-0">
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
        <div className="about-home-photo">
          <Image
            src="/editorial/home-textiles.png"
            alt="Original concept visual of soft linen"
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
