'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    group: 'home',
    title: <>Warmth in<br/>every <em>detail.</em></>,
    asset: '/reference-home-textiles.jpg',
    className: '',
    cta: 'Explore home textiles',
    short: 'Home textiles',
    name: 'Home Textiles',
    alt: 'Original concept visual of soft linen in a sunlit room',
  },
  {
    group: 'travel',
    title: <>A world of<br/>new <em>possibilities.</em></>,
    asset: '/reference-travel-luggage.jpg',
    className: 'travel',
    cta: 'Explore travel & luggage',
    short: 'Travel & luggage',
    name: 'Travel & Luggage',
    alt: 'Original concept visual of a forest green suitcase in warm stone architecture',
  },
  {
    group: 'footwear',
    title: <>Ease in<br/>every <em>step.</em></>,
    asset: '/reference-footwear.jpg',
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

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [paused]);

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
    <section className="hero" aria-label="Featured collections" aria-roledescription="carousel">
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
                  className="object-cover"
                />
              </div>
              <div className="hero-shade"></div>
              <div className="wrap hero-content">
                <span className="eyebrow">B.H.T. Collections &nbsp; / &nbsp; {s.name}</span>
                {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
                <Link href={`/collections?group=${s.group}`} className="btn light">
                  {s.cta}{' '}
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h15m-6-6 6 6-6 6"/>
                  </svg>
                </Link>
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
        <div className="controls">
          <button className="icon-btn" onClick={prev} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m14 6-6 6 6 6"/>
            </svg>
          </button>
          <button className="icon-btn" id="hero-pause" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
            {paused ? '▶' : 'Ⅱ'}
          </button>
          <button className="icon-btn" onClick={next} aria-label="Next slide">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m10 6 6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
