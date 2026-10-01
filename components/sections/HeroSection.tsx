'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const slides = [
  {
    group: 'home',
    sentence: 'Considered collections for everyday living, crafted with exceptional quality.',
    categories: 'BEDDING | BATH | LIFESTYLE',
    asset: '/editorial/home-textiles.png',
    className: '',
    cta: 'Explore Home Textiles',
    name: 'Home Textiles',
    alt: 'Original concept visual of soft linen in a sunlit room',
  },
  {
    group: 'travel',
    sentence: 'Designed by you, crafted for every journey across the globe.',
    categories: 'LUGGAGE | BAGS | ACCESSORIES',
    asset: '/editorial/travel-luggage.png',
    className: 'travel',
    cta: 'Explore Travel & Luggage',
    name: 'Travel & Luggage',
    alt: 'Original concept visual of a forest green suitcase in warm stone architecture',
  },
  {
    group: 'footwear',
    sentence: 'Ease in every step, blending comfort with timeless elegance.',
    categories: 'SHOES | SANDALS | SLIPPERS',
    asset: '/editorial/footwear.png',
    className: 'footwear',
    cta: 'Explore Footwear',
    name: 'Footwear',
    alt: 'Original concept visual of cognac leather sandals on travertine',
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(true);
  const touchStart = useRef<number | null>(null);
  
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set(trackRef.current, { xPercent: -100 * index });
      return;
    }

    // Slide transition
    gsap.to(trackRef.current, {
      xPercent: -100 * index,
      duration: 1.2,
      ease: 'power3.inOut',
    });

    // Text Reveal Animation for current slide
    const currentSlide = slidesRef.current[index];
    if (currentSlide) {
      const elements = currentSlide.querySelectorAll('.gsap-reveal');
      
      gsap.set(elements, { y: 20, opacity: 0 });
      gsap.to(elements, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3,
      });
    }
  }, { dependencies: [index, reducedMotion] });

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    const visibility = () => setVisible(!document.hidden);
    update();
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      preference.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !visible) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, visible]);

  const next = () => {
    setPaused(true);
    setIndex((i) => (i + 1) % slides.length);
  };

  const prev = () => {
    setPaused(true);
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  };

  const goTo = (i: number) => {
    setPaused(true);
    setIndex(i);
  };

  return (
    <section className="hero lg:!h-[calc(100vh-116px)] lg:!max-h-none relative w-full overflow-hidden bg-forest" aria-label="Featured collections" aria-roledescription="carousel"
      onFocusCapture={(event) => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setPaused(true); }}
      onPointerDown={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current !== null) {
          const distance = touchStart.current - event.changedTouches[0].clientX;
          if (Math.abs(distance) > 60) { if (distance > 0) next(); else prev(); }
          touchStart.current = null;
        }
      }}>
      
      {/* Slides Track */}
      <div
        ref={trackRef}
        className="absolute inset-0 flex w-full h-full"
      >
        {slides.map((s, i) => {
          const isCurrent = i === index;
          return (
            <div
              key={i}
              ref={(el) => { slidesRef.current[i] = el; }}
              className={`relative min-w-full h-full ${s.className}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.name}`}
              inert={!isCurrent}
              aria-hidden={!isCurrent}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={s.asset}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
              
              {/* Dark Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-black/30"></div>
              
              {/* Minimal Centered Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="gsap-reveal text-white font-sans text-[15px] md:text-[18px] mb-3 md:mb-5 max-w-2xl drop-shadow-md">
                  {s.sentence}
                </p>
                <div className="gsap-reveal text-white font-sans text-[13px] md:text-[15px] tracking-[0.2em] font-medium mb-10 md:mb-12 drop-shadow-md">
                  {s.categories}
                </div>
                <Link 
                  href={`/collections?group=${s.group}`} 
                  className="gsap-reveal inline-flex items-center justify-center border border-white text-white bg-transparent px-10 py-3.5 text-[11px] md:text-[13px] uppercase tracking-[0.15em] font-semibold hover:bg-white hover:text-ink transition-colors duration-300"
                >
                  {s.cta}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Minimal Slider Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20" aria-label="Choose slide">
        {slides.map((_, i) => {
          const isCurrent = i === index;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative flex items-center justify-center w-6 h-6 focus:outline-none group"
              aria-label={`Show slide ${i + 1}`}
              aria-current={isCurrent}
            >
              {isCurrent ? (
                <span className="w-3 h-3 rounded-full border-[1.5px] border-white bg-transparent" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-white opacity-60 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}
      </div>
      
    </section>
  );
}
