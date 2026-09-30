import React from 'react';
import Link from 'next/link';

export default function AboutSummary() {
  return (
    <section className="section about-summary dark" aria-labelledby="home-about-title">
      <div className="wrap about-summary-grid">
        <div>
          <span className="eyebrow">About B.H.T. Collections</span>
          <h2 id="home-about-title">
            Many collections.<br />One personal connection.
          </h2>
        </div>
        <div className="about-summary-copy">
          <p className="lead">
            From the comfort of home to the possibilities of a new journey, we bring everyday essentials together.
          </p>
          <p>
            Based in Dubai, Blanket House Trading connects home textiles, travel &amp; luggage, and footwear with a personal approach to your requirements.
          </p>
          <div className="about-category-list">
            <span>Home textiles</span>
            <span>Travel &amp; luggage</span>
            <span>Footwear</span>
          </div>
          <Link className="text-link region-link" href="/about">
            Discover the story of B.H.T.
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
