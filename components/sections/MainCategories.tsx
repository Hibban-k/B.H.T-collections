import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 'home',
    name: 'Home Textiles',
    asset: '/reference-home-textiles.jpg',
  },
  {
    id: 'travel',
    name: 'Travel & luggage',
    asset: '/reference-travel-luggage.jpg',
  },
  {
    id: 'footwear',
    name: 'Footwear',
    asset: '/reference-footwear.jpg',
  },
];

export default function MainCategories() {
  return (
    <section className="section" id="categories">
      <div className="wrap">
        <div className="section-title">
          <div>
            <span className="eyebrow">The world of B.H.T.</span>
            <h2>
              For home. For journeys.<br />For every day.
            </h2>
          </div>
          <p>
            Three considered collections.<br />A world of possibilities.
          </p>
        </div>
        
        <div className="category-grid">
          {categories.map((c, i) => (
            <Link key={c.id} className="category-card" href={`/collections?group=${c.id}`}>
              <div className="media">
                <Image 
                  src={c.asset} 
                  alt={`${c.name} lifestyle preview`} 
                  width={800} 
                  height={1000} 
                  className="object-cover"
                />
              </div>
              <div className="category-meta">
                <div>
                  <span className="number">0{i + 1} / COLLECTION</span>
                  <h3>{c.name}</h3>
                  <span className="text-link">Discover collection</span>
                </div>
                <span className="icon-btn" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h15m-6-6 6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
