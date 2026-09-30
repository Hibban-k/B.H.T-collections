import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer dark">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/" aria-label="B.H.T. Collections home">
              <span className="brand-name">
                B.H.T. COLLECTIONS<small>Blanket House Trading</small>
              </span>
            </Link>
            <p>Considered collections for the way you live, travel, and do business.</p>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Explore</div>
            <Link href="/collections?group=home">Home textiles</Link>
            <Link href="/collections?group=travel">Travel &amp; luggage</Link>
            <Link href="/collections?group=footwear">Footwear</Link>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Our company</div>
            <Link href="/about">About B.H.T.</Link>
            <Link href="/brands-partners">Brand &amp; Partners</Link>
            <Link href="/region">Our regions</Link>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Let's talk</div>
            <a href="mailto:info@blankethouse.ae">info@blankethouse.ae</a>
            <a href="tel:+971558879237">+971 55 887 9237</a>
            <Link href="/contact">Make an enquiry ↗</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} B.H.T. Collections.</span>
          <span>
            Dubai, United Arab Emirates &nbsp; / &nbsp;{' '}
            <a href="#">Back to top ↑</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
