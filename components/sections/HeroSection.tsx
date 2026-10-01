'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const slides = [
  {
    group: 'home',
    title: <>Warmth in<br/>every <em>detail.</em></>,
    asset: '/editorial/home-textiles.png',
    className: '',
    cta: 'Explore home textiles',
    short: 'Home textiles',
    name: 'Home Textiles',
    alt: 'Original concept visual of soft linen in a sunlit room',
  },
  {
    group: 'travel',
    title: <>A world of<br/>new <em>possibilities.</em></>,
    asset: '/editorial/travel-luggage.png',
    className: 'travel',
    cta: 'Explore travel & luggage',
    short: 'Travel & luggage',
    name: 'Travel & Luggage',
    alt: 'Original concept visual of a forest green suitcase in warm stone architecture',
  },
  {
    group: 'footwear',
    title: <>Ease in<br/>every <em>step.</em></>,
    asset: '/editorial/footwear.png',
    className: 'footwear',
    cta: 'Explore footwear',
    short: 'Footwear',
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
  const pauseBeforePointer = useRef<boolean | null>(null);

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
    <section className="hero lg:h-[90vh]  lg:max-h-none!" aria-label="Featured collections" aria-roledescription="carousel"
      onFocusCapture={(event) => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setPaused(true); }}
      onPointerDown={(event) => { if (!(event.target as HTMLElement).closest('#hero-pause')) setPaused(true); }}
      onMouseEnter={() => setPaused(true)}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current !== null) {
          const distance = touchStart.current - event.changedTouches[0].clientX;
          if (Math.abs(distance) > 60) { if (distance > 0) next(); else prev(); }
          touchStart.current = null;
        }
      }}>
      <div
        className="hero-track"
        id="hero-track"
        style={{ transform: `translateX(-${index * 100}%)`, transition: 'transform 450ms ease' }}
      >
        {slides.map((s, i) => {
          const isCurrent = i === index;
          return (
            <div
              key={i}
              className={`hero-slide ${s.className}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.name}`}
              inert={!isCurrent}
              aria-hidden={!isCurrent}
            >
              <div className="hero-photo">
                <Image
                  src={s.asset}
                  alt={s.alt}
                  width={1376}
                  height={768}
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="hero-shade"></div>
              <div className="wrap hero-content !justify-center !items-center text-center !pt-0">
                <span className="eyebrow">B.H.T. Collections &nbsp; / &nbsp; {s.name}</span>
                {i === 0 ? <h1 className="!mx-auto">{s.title}</h1> : <h2 className="!mx-auto">{s.title}</h2>}
                <Button href={`/collections?group=${s.group}`} variant="light" className="mt-8">
                  {s.cta}
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" className="w-[19px] h-[19px] shrink-0 ml-2">
                    <path d="M4 12h15m-6-6 6 6-6 6"/>
                  </svg>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <span className="hero-side-note">Considered collections. Everyday living.</span>

      <div className="wrap hero-bottom">
        <div className="slide-dots" aria-label="Choose slide">
          {slides.map((_, i) => (
            <button
              key={i}
              className="slide-dot"
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
            >
              0{i + 1}
            </button>
          ))}
          <span className="hero-index-label" id="hero-label">
            {slides[index].short}
          </span>
        </div>
      </div>
    </section>
  );
}
