import React from 'react';
import Link from 'next/link';

export default function RegionPage() {
  return (
    <>
      <header className="page-intro">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Our regions</span>
          </nav>
          <div className="intro-line">
            <div>
              <span className="eyebrow">Our regions</span>
              <h1>Local understanding.<br/>Global reach.</h1>
              <p>Our network of offices connects you directly to the collections you need, guided by teams who understand your market.</p>
            </div>
          </div>
        </div>
      </header>

      <div className="category-nav">
        <nav className="wrap category-nav-inner" aria-label="Regional offices">
          <Link className="category-tab active" href="/region?office=uae" aria-current="page">United Arab Emirates</Link>
          <Link className="category-tab" href="/region?office=oman">Oman</Link>
          <Link className="category-tab" href="/region?office=saudi">Saudi Arabia</Link>
          <Link className="category-tab" href="/region?office=china">China</Link>
        </nav>
      </div>

      <section className="section">
        <div className="wrap split">
          <div className="location-panel">
            <span className="location-kicker">Headquarters</span>
            <span className="location-city">Dubai<span>دبي</span></span>
            <div className="location-bottom">
              <span>United Arab Emirates<br/>Blanket House Trading L.L.C.</span>
              <span className="location-mark" aria-hidden="true">↗</span>
            </div>
          </div>
          <div>
            <span className="eyebrow">Your local connection</span>
            <h2>Start the conversation in Dubai.</h2>
            <p>Our central hub in Dubai is ready to discuss your requirements across the UAE. From here, we coordinate across our regional network.</p>
            <Link className="text-link" href="/contact">
              Contact the Dubai team
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h15m-6-6 6 6-6 6"/>
              </svg>
            </Link>
            <div className="region-detail">
              <strong>Dubai, United Arab Emirates</strong>
              <br/>Blanket House Trading L.L.C.<br/>Baniyas Square, Deira
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
