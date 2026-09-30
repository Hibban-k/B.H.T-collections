import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <>
      <header className="page-intro">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Enquire</span>
          </nav>
          <div className="intro-line">
            <div>
              <span className="eyebrow">Enquire</span>
              <h1>Let’s talk about<br />what you have in mind.</h1>
              <p>Share your requirements or contact our Dubai team directly.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap contact-layout">
          <div>
            <span className="eyebrow">A personal conversation</span>
            <h2>Here to help you<br />find your collection.</h2>
            <p>Home textiles, travel essentials, footwear, or a business partnership — tell us where you’d like to begin.</p>
            
            <article className="office" id="office-uae">
              <span className="office-tag">Headquarters</span>
              <h3>United Arab Emirates</h3>
              <p className="company">BLANKET HOUSE TRADING L.L.C.</p>
              <address>Office No. 204, Bldg No. R146 WASL, Baniyas Square, Deira, Dubai, U.A.E.</address>
              <div className="office-contacts">
                <a href="tel:+971558879237">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z"/></svg>
                  +971 55 887 9237
                </a>
                <a href="mailto:info@blankethouse.ae">info@blankethouse.ae ↗</a>
              </div>
            </article>

            <Link className="text-link region-link" href="/region">
              Find a regional contact
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
            </Link>
          </div>
          
          <ContactForm />
          
        </div>
      </section>
    </>
  );
}
