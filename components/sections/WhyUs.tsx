import React from 'react';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';

const points = [
  {
    title: 'Quality in the details',
    quote: '“Care you can feel.”',
    desc: 'Attention to the materials, finish, and feel of the pieces you choose.',
  },
  {
    title: 'A range that works together',
    quote: '“More choice. One connection.”',
    desc: 'Home, travel, and footwear collections in one considered destination.',
  },
  {
    title: 'People who understand',
    quote: '“Your needs come first.”',
    desc: 'A personal conversation about your selection, quantities, and destination.',
  },
  {
    title: 'Clarity at every step',
    quote: '“Confidence in every conversation.”',
    desc: 'Straightforward communication, from your first enquiry to the next step.',
  },
];

export default function WhyUs() {
  return (
    <section className="py-14 md:py-20 lg:py-26 bg-surface" aria-labelledby="home-why-title">
      <div className="max-w-[1280px] w-[calc(100%-40px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] mx-auto">
        <SectionTitle
          eyebrow="Why us"
          title="Our care. Your confidence."
          linkText="Talk to our team"
          linkHref="/contact"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] lg:gap-8">
          {points.map((p, i) => (
            <article className="border-t border-border pt-6" key={i}>
              <div className="flex items-center justify-between mb-[17px] md:mb-[25px]">
                <span className="relative block w-[44px] h-[49px] overflow-hidden bg-white rounded-[3px]">
                  <Image
                    src="/reference-logo-lockup.png"
                    alt="B.H.T. Collections"
                    width={160}
                    height={160}
                    className="absolute w-[76px] h-[76px] max-w-none -left-[16px] -top-[12px] object-contain"
                  />
                </span>
                <span className="text-[10px] tracking-[0.1em] text-body">0{i + 1}</span>
              </div>
              <h3 className="text-[19px] md:text-[17px] font-medium leading-[1.5] text-ink lg:min-h-[51px]">
                {p.title}
              </h3>
              <p className="font-serif font-medium text-[22px] md:text-[21px] leading-[1.5] text-red mt-2.5 mb-3 md:mt-3.5 md:mb-4 lg:min-h-[63px]">
                {p.quote}
              </p>
              <p className="text-[14px] md:text-[13px] leading-[1.85] text-body max-w-[48ch] md:max-w-none">
                {p.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
