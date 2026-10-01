'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';

const products = [
  { _id: 'sample-1', id: 'sample-1', name: 'Everyday soft blanket', brand: 'HANAA', category: 'HANAA', categorySlug: 'blankets', slug: 'everyday-soft-blanket', image: '/editorial/home-textiles.png', asset: '/editorial/home-textiles.png', serif: true, shortDescription: 'Pure comfort and warmth crafted for serene living spaces.' },
  { _id: 'sample-2', id: 'sample-2', name: 'Textured comforter set', brand: 'DAMAS GOLD', category: 'DAMAS GOLD', categorySlug: 'comforters', slug: 'textured-comforter-set', image: '/editorial/home-textiles.png', asset: '/editorial/home-textiles.png', serif: true, shortDescription: 'Luxurious textures and breathable comfort for restful sleep.' },
  { _id: 'sample-3', id: 'sample-3', name: 'Cloud comfort collection', brand: 'ROYALON 3D', category: 'ROYALON 3D', categorySlug: 'blankets', slug: 'cloud-comfort-collection', image: '/editorial/home-textiles.png', asset: '/editorial/home-textiles.png', serif: false, shortDescription: 'Ultra-plush finish with superior thermal regulation.' },
  { _id: 'sample-4', id: 'sample-4', name: 'Everyday cabin companion', brand: 'TRAVEL GO', category: 'TRAVEL GO', categorySlug: 'travel-luggage', slug: 'everyday-cabin-companion', image: '/editorial/travel-luggage.png', asset: '/editorial/travel-luggage.png', serif: false, shortDescription: 'Engineered durability meets effortless lightweight mobility.' },
  { _id: 'sample-5', id: 'sample-5', name: 'The considered travel set', brand: 'INFINITY PARIS', category: 'INFINITY PARIS', categorySlug: 'travel-luggage', slug: 'the-considered-travel-set', image: '/editorial/travel-luggage.png', asset: '/editorial/travel-luggage.png', serif: true, shortDescription: 'Sophisticated design tailored for modern international travel.' },
  { _id: 'sample-6', id: 'sample-6', name: 'Everyday comfort sandal', brand: 'MAGICWALK', category: 'MAGICWALK', categorySlug: 'footwear', slug: 'everyday-comfort-sandal', image: '/editorial/footwear.png', asset: '/editorial/footwear.png', serif: false, shortDescription: 'Ergonomic cushioning for all-day effortless support.' },
  { _id: 'sample-7', id: 'sample-7', name: 'The easy slip-on', brand: 'ADDA', category: 'ADDA', categorySlug: 'footwear', slug: 'the-easy-slip-on', image: '/editorial/footwear.png', asset: '/editorial/footwear.png', serif: false, shortDescription: 'Timeless silhouette designed for daily relaxed elegance.' }
];
const sampleProducts = products;

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
      railRef.current.scrollBy({ left: -(item.clientWidth + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 'instant' : 'smooth' });
    }
  };

  const scrollNext = () => {
    if (!railRef.current) return;
    const item = railRef.current.querySelector('.featured-item');
    if (item) {
      const gap = parseFloat(getComputedStyle(railRef.current).gap) || 0;
      railRef.current.scrollBy({ left: item.clientWidth + gap, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 'instant' : 'smooth' });
    }
  };

  return (
    <section className="py-[56px] md:py-[80px] lg:py-[104px] bg-white">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[22px] md:gap-[28px] mb-[45px]">
          <div className="max-w-[650px] w-full">
            <span className="block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase mb-[18px] text-red">Selected from our brands</span>
            <h2 className="font-serif font-medium tracking-[-0.035em] text-[clamp(30px,3.65vw,48px)] leading-[1.18] text-ink">A closer look at the collection.</h2>
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
          {products.map((product) => (
            <div className="featured-item" key={product._id}>
              <div className={`brand-wordmark ${product.serif ? 'serif' : ''}`}>{product.brand}</div>
              <ProductCard key={product._id} product={product as any} />
            </div>
          ))}
        </div>
        <p className="section-footnote">Demo selection · Product names, imagery and brand pairings illustrate the proposed layout.</p>
      </div>
    </section>
  );
}
