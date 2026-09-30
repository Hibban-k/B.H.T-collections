import React from 'react';
import Button from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section className="py-14 md:py-20 lg:py-26 bg-forest text-ivory" aria-labelledby="cta-title">
      <div className="max-w-[1280px] w-[calc(100%-40px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-7 md:gap-8 lg:gap-16">
        <div>
          <span className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-light mb-3">
            Let’s work together
          </span>
          <h2 id="cta-title" className="font-serif font-medium text-[clamp(28px,3.5vw,44px)] leading-[1.18] tracking-[-0.035em] text-ivory max-w-[650px]">
            Good things begin<br />with a conversation.
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-muted-light mt-3 md:mt-4 max-w-[48ch]">
            Tell us what you have in mind. We’ll help you find the right collection.
          </p>
        </div>
        <div className="shrink-0 self-start md:self-auto">
          <Button variant="light" href="/contact">
            Discuss your requirements{' '}
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
