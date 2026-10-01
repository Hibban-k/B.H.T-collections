import Link from 'next/link';
import { regionalOffices, type RegionalOffice } from '@/lib/data';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({ title: 'Our regions | B.H.T. Collections', description: 'Find your regional B.H.T. contact, starting with our Dubai headquarters.', path: '/region' });

const ids = ['uae', 'oman', 'qatar', 'bahrain', 'kuwait', 'saudi-arabia'];

function Office({ office, id }: { office: RegionalOffice; id: string }) {
  return <article className="office" id={id}>
    {office.isHeadquarters && <span className="eyebrow text-green">Headquarters</span>}
    <h2 className="text-[30px] mb-4">{office.country}</h2>
    <h3 className="text-sm mb-4">{office.companyName}</h3>
    <address className="not-italic text-sm leading-relaxed mb-4">{office.address}</address>
    {office.contactPerson && <p className="text-sm mb-3">{office.contactPerson}</p>}
    <div className="office-contacts">
      <a href={`tel:${office.mobile.replace(/\s/g,'')}`}>{office.mobile}</a>
      {office.tel && <a href={`tel:${office.tel.replace(/\s/g,'')}`}>{office.tel}</a>}
      {office.email && <a href={`mailto:${office.email}`}>{office.email}</a>}
    </div>
  </article>;
}

export default function RegionPage() {
  return <>
    <header className="page-intro"><div className="wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Our regions</span></nav>
      <span className="eyebrow">Our regions</span><h1>Local understanding.<br/>A personal connection.</h1>
      <p>Find your regional team to discuss the collections and requirements that matter to your business.</p>
      <nav className="region-nav" aria-label="Regional offices">{regionalOffices.map((office,i) => <a key={ids[i]} href={`#${ids[i]}`}>{office.country}</a>)}</nav>
    </div></header>
    <section className="section bg-white"><div className="wrap split">
      <div className="location-panel"><span className="location-kicker">Our starting point</span><span className="location-city">Dubai<span lang="ar">دبي</span></span><div className="location-bottom"><span>United Arab Emirates<br/>Blanket House Trading L.L.C.</span><span className="location-mark" aria-hidden="true">↗</span></div></div>
      <Office office={regionalOffices[0]} id="uae" />
    </div></section>
    <section className="section"><div className="wrap"><div className="section-title"><div><span className="eyebrow">Closer to you</span><h2>Our regional directory.</h2></div></div><div className="office-grid">{regionalOffices.slice(1).map((office,i) => <Office key={ids[i+1]} office={office} id={ids[i+1]} />)}</div></div></section>
    <section className="cta dark"><div className="wrap cta-inner"><div><h2>Not sure who to contact?</h2><p>Share your requirements and destination with our team.</p></div><Link className="btn light" href="/contact?context=Regional%20enquiry">Let’s start a conversation <span aria-hidden="true">↗</span></Link></div></section>
  </>;
}
