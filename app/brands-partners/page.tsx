import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brands & Partners | B.H.T. Collections",
  description: "Discover our exclusive brand portfolio and the trusted partners we supply across the GCC.",
};

const brands = [
  { id: 'hanaa', name: 'HANAA', group: 'home', category: 'Home textiles', description: 'Soft textures and everyday comfort.', serif: true },
  { id: 'damas', name: 'DAMAS GOLD', group: 'home', category: 'Home textiles', description: 'Rich detail for a beautifully layered home.', serif: true },
  { id: 'royalon', name: 'ROYALON 3D', group: 'home', category: 'Home textiles', description: 'A thoughtful collection of comforting textures.', serif: false },
  { id: 'travelgo', name: 'TRAVEL GO', group: 'travel', category: 'Travel & luggage', description: 'Considered companions for your next destination.', serif: false },
  { id: 'infinity', name: 'INFINITY PARIS', group: 'travel', category: 'Travel & luggage', description: 'Understated style, wherever the journey leads.', serif: true },
  { id: 'magicwalk', name: 'MAGICWALK', group: 'footwear', category: 'Footwear', description: 'Everyday comfort, one step at a time.', serif: false },
  { id: 'adda', name: 'ADDA', group: 'footwear', category: 'Footwear', description: 'Easy silhouettes for everyday living.', serif: false }
];

export default function BrandsPartnersPage() {
  return (
    <>
      <header className="page-intro">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Brand &amp; Partners</span>
          </nav>
          <div className="intro-line">
            <div>
              <span className="eyebrow">Brand &amp; Partners</span>
              <h1>Distinct identities.<br />A shared perspective.</h1>
              <p>Explore the names represented in our portfolio, from home comforts to everyday journeys.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="demo-note">Portfolio preview · Brand names identify the proposed portfolio. All imagery is newly generated; product pairings and descriptive copy are illustrative.</p>
          <div className="brand-grid">
            {brands.map((b) => (
              <article key={b.id} className="brand-entry">
                <div className="brand-top">
                  <div className={`brand-wordmark ${b.serif ? 'serif' : ''}`}>{b.name}</div>
                  <span className="brand-category">{b.category}</span>
                </div>
                <p className="brand-description">{b.description}</p>
                <Link href={`/collections?group=${b.group}&brand=${b.id}`} aria-label={`Explore ${b.name}`}>
                  <div className="media">
                    <div style={{ background: "#eaeaea", width: "100%", height: "200px" }}></div>
                  </div>
                </Link>
                <Link className="text-link" href={`/collections?group=${b.group}&brand=${b.id}`}>
                  Explore the selection
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--linen)" }}>
        <div className="wrap">
          <div className="section-title">
            <div>
              <span className="eyebrow">Our wider network</span>
              <h2>Clients &amp; partners.</h2>
            </div>
          </div>
          <div className="partner-grid">
            {[
              ['lulu', 'Lulu on the Move', 'Hypermarket chain'],
              ['mark', 'Mark & Save', 'Department stores'],
              ['madina', 'Al Madina Group', 'Hypermarket group'],
              ['talal', 'Talal Group', 'Hypermarket group'],
              ['shaklan', 'Shaklan Markets', 'Supermarket chain']
            ].map((p, i) => (
              <div key={i} className="partner-tile">
                <div className="partner-name">{p[1]}</div>
                <p>{p[2]}</p>
              </div>
            ))}
          </div>
          <p className="section-footnote">Client names shown as plain text for layout review; these are not recreated logos.</p>
        </div>
      </section>

      <section className="cta dark">
        <div className="wrap cta-inner">
          <div>
            <span className="eyebrow">Let’s work together</span>
            <h2>A new relationship.<br />A shared opportunity.</h2>
            <p>Get in touch to discuss your business and how we could work together.</p>
          </div>
          <Link className="btn light" href="/contact?context=Partnership%20enquiry">
            Discuss your requirements
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
