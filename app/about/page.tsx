import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <header className="page-intro">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">About B.H.T.</span>
          </nav>
          <div className="intro-line">
            <div>
              <span className="eyebrow">About B.H.T.</span>
              <h1>Considered collections.<br />Human connections.</h1>
              <p>Home textiles, travel essentials, and footwear, brought together with a personal approach.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split reverse">
          <div>
            <span className="eyebrow">Blanket House Trading</span>
            <h2>At home in<br />everyday living.</h2>
            <p>Based in Dubai, B.H.T. Collections brings together products for homes, journeys, and everyday routines.</p>
            <p>Our approach starts with a conversation: understanding the range you need and helping you take the next step.</p>
            <Link className="text-link" href="/collections">
              Discover our collections
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
            </Link>
          </div>
          <div className="media">
            <Image 
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop" 
              alt="Original concept visual: tactile linen on a sculptural daybed" 
              width={800} 
              height={1000} 
              priority 
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "white" }}>
        <div className="wrap story-layout">
          <div>
            <span className="eyebrow">Our perspective</span>
            <h2>The details make<br />the difference.</h2>
            <p>The texture of a textile. The ease of a daily essential. The clarity of a helpful conversation. These are the details that shape how a collection fits into your life and business.</p>
            <p>We bring our categories together in a single destination, with regional contacts to help you explore the possibilities.</p>
          </div>
          <aside className="facts">
            <div className="fact">
              <strong>Dubai</strong>
              <span>Our headquarters</span>
            </div>
            <div className="fact">
              <strong>03</strong>
              <span>Core collection groups</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap why-layout">
          <div>
            <span className="eyebrow">Our working principles</span>
            <h2>A thoughtful way<br />to work together.</h2>
          </div>
          <div className="principles">
            <article className="principle">
              <span className="principle-num">01</span>
              <h3>Quality, considered</h3>
              <p>Attention to materials, finish, and the everyday experience of each collection.</p>
            </article>
            <article className="principle">
              <span className="principle-num">02</span>
              <h3>A connected range</h3>
              <p>Home textiles, travel essentials, and footwear, brought together for your business.</p>
            </article>
            <article className="principle">
              <span className="principle-num">03</span>
              <h3>People who listen</h3>
              <p>A dedicated conversation to understand your selection and requirements.</p>
            </article>
            <article className="principle">
              <span className="principle-num">04</span>
              <h3>Clear communication</h3>
              <p>From the first enquiry to coordinating the next steps, stay in the conversation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap cta-inner">
          <div>
            <span className="eyebrow">Let’s get acquainted</span>
            <h2>It starts with a conversation.</h2>
          </div>
          <Link className="btn" href="/contact?context=Company%20enquiry">
            Talk to our team
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}

