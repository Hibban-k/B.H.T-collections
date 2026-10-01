import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';

export default function MainCategories() {
  return (
    <section className="py-[56px] md:py-[80px] lg:py-[104px]" id="categories">
      <div className="wrap">
        <SectionTitle
          eyebrow="The world of B.H.T."
          title={<>For home. For journeys.<br />For every day.</>}
          subtitle={<>Three considered collections.<br />A world of possibilities.</>}
        />

        <div className="flex flex-col gap-4 mt-8 md:mt-12">
          {/* Top Large Banner - Home Textiles */}
          <Link href="/collections?group=home" className="relative block w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden group bg-ink">
            <Image
              src="/editorial/home-textiles.png"
              alt="Home Textiles"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient overlay to ensure text is legible against any image */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
              <h3 className="font-sans font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-tight mb-2 tracking-tight">
                Warmth in<br/>Every Detail.
              </h3>
              <div className="mt-6">
                <span className="inline-flex items-center justify-center bg-white text-ink font-semibold px-6 py-3 rounded-sm text-[13px] md:text-[14px] hover:bg-ivory transition-colors">
                  Shop Home Textiles
                </span>
              </div>
            </div>
          </Link>

          {/* Bottom Two Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Bottom Left - Travel & Luggage */}
            <Link href="/collections?group=travel" className="relative block w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden group bg-[#EFEBE4]">
              <Image
                src="/editorial/travel-luggage.png"
                alt="Travel & Luggage"
                fill
                className="object-cover object-left transition-transform duration-700 group-hover:scale-105"
              />
              {/* Fade out the right side to white so the text is legible */}
              <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/60 to-transparent"></div>
              
              <div className="absolute inset-y-0 right-0 flex flex-col justify-center p-8 md:p-12 w-[70%] md:w-[60%] items-start">
                <h3 className="font-sans font-bold text-[32px] md:text-[38px] leading-[1.1] text-ink mb-3 tracking-tight">
                  Travel &<br/>Luggage
                </h3>
                <p className="text-[14px] md:text-[15px] text-ink mb-6">Explore the <strong className="font-bold">Collection</strong></p>
                <span className="inline-flex items-center justify-center bg-ink text-white font-semibold px-7 py-3 text-[13px] rounded-sm hover:bg-black transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>

            {/* Bottom Right - Footwear */}
            <Link href="/collections?group=footwear" className="relative block w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden group bg-[#F5EFE6]">
              <Image
                src="/editorial/footwear.png"
                alt="Footwear"
                fill
                className="object-cover object-right transition-transform duration-700 group-hover:scale-105"
              />
              {/* Fade out the left side to beige so the text is legible */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE6]/95 via-[#F5EFE6]/70 to-transparent"></div>
              
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-8 md:p-12 w-[80%] md:w-[65%] items-start">
                <h3 className="font-sans font-bold text-[32px] md:text-[38px] leading-[1.1] text-ink mb-3 tracking-tight">
                  Footwear &<br/>Shoes
                </h3>
                <p className="text-[14px] md:text-[15px] text-ink mb-6">Starting at <strong className="font-bold">56 AED</strong></p>
                <span className="inline-flex items-center justify-center bg-ink text-white font-semibold px-7 py-3 text-[13px] rounded-sm hover:bg-black transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
}
