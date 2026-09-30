'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const sampleProducts = [
  { name: 'Everyday soft blanket', brand: 'HANAA', categorySlug: 'blankets', categoryName: 'Home textiles', asset: '/reference-home-textiles.jpg', serif: true },
  { name: 'Textured comforter set', brand: 'DAMAS GOLD', categorySlug: 'comforters', categoryName: 'Home textiles', asset: '/reference-home-textiles.jpg', serif: true },
  { name: 'Cloud comfort collection', brand: 'ROYALON 3D', categorySlug: 'blankets', categoryName: 'Home textiles', asset: '/reference-home-textiles.jpg', serif: false },
  { name: 'Everyday cabin companion', brand: 'TRAVEL GO', categorySlug: 'travel-luggage', categoryName: 'Travel & luggage', asset: '/reference-travel-luggage.jpg', serif: false },
  { name: 'The considered travel set', brand: 'INFINITY PARIS', categorySlug: 'travel-luggage', categoryName: 'Travel & luggage', asset: '/reference-travel-luggage.jpg', serif: true },
  { name: 'Everyday comfort sandal', brand: 'MAGICWALK', categorySlug: 'footwear', categoryName: 'Footwear', asset: '/reference-footwear.jpg', serif: false },
  { name: 'The easy slip-on', brand: 'ADDA', categorySlug: 'footwear', categoryName: 'Footwear', asset: '/reference-footwear.jpg', serif: false }
];

export default function ExclusiveProducts() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScroll = () => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanScrollPrev(scrollLeft > 2);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollPrev = () => {
    if (!railRef.current) return;
    const item = railRef.current.querySelector('.featured-item');
    if (item) {
      const gap = parseFloat(getComputedStyle(railRef.current).gap) || 0;
      railRef.current.scrollBy({ left: -(item.clientWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (!railRef.current) return;
    const item = railRef.current.querySelector('.featured-item');
    if (item) {
      const gap = parseFloat(getComputedStyle(railRef.current).gap) || 0;
      railRef.current.scrollBy({ left: item.clientWidth + gap, behavior: 'smooth' });
    }
  };

  return (
    <section className="section section-exclusive">
      <div className="wrap">
        <div className="section-title">
          <div>
            <span className="eyebrow">Selected from our brands</span>
            <h2>A closer look at the collection.</h2>
          </div>
          <div className="controls">
            <button 
              className="icon-btn" 
              onClick={scrollPrev} 
              disabled={!canScrollPrev} 
              aria-label="Previous featured products"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m14 6-6 6 6 6"/>
              </svg>
            </button>
            <button 
              className="icon-btn" 
              onClick={scrollNext} 
              disabled={!canScrollNext} 
              aria-label="Next featured products"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m10 6 6 6-6 6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div 
          className="brand-rail" 
          id="brand-rail" 
          aria-label="Exclusive products, one per brand" 
          tabIndex={0}
          ref={railRef}
          onScroll={checkScroll}
        >
          {sampleProducts.map((p, i) => (
            <div className="featured-item" key={i}>
              <div className={`brand-wordmark ${p.serif ? 'serif' : ''}`}>{p.brand}</div>
              <article className="product-card">
                <Link href={`/collections/${p.categorySlug}`} className="product-image-link" aria-label={`Explore ${p.name} collection`}>
                  <div className="media">
                    <Image 
                      src={p.asset} 
                      alt={`${p.name} — illustrative collection image`} 
                      width={800} 
                      height={1000} 
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="product-meta">
                  <span className="eyebrow">{p.brand}</span>
                  <h3>{p.name}</h3>
                  <p className="price">Enquire for details</p>
                  <Link href={`/collections/${p.categorySlug}`} className="text-link" style={{ border: 0, background: 'none', padding: 0 }}>
                    View selection{' '}
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h15m-6-6 6 6-6 6"/>
                    </svg>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
        <p className="section-footnote">Demo selection · Product names, imagery and brand pairings illustrate the proposed layout.</p>
      </div>
    </section>
  );
}
