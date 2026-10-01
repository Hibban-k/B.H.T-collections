import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Brands & Partners | B.H.T. Collections",
  description: "Discover our exclusive brand portfolio and the trusted partners we supply across the GCC.",
};

const brands = [
  { id: 'hanaa', name: 'HANAA', group: 'home', category: 'Home textiles', description: 'Soft textures and everyday comfort.', serif: true, image: '/brand-hanaa.jpg' },
  { id: 'damas', name: 'DAMAS GOLD', group: 'home', category: 'Home textiles', description: 'Rich detail for a beautifully layered home.', serif: true, image: '/brand-damas.jpg' },
  { id: 'royalon', name: 'ROYALON 3D', group: 'home', category: 'Home textiles', description: 'A thoughtful collection of comforting textures.', serif: false, image: '/brand-royalon.jpg' },
  { id: 'travelgo', name: 'TRAVEL GO', group: 'travel', category: 'Travel & luggage', description: 'Considered companions for your next destination.', serif: false, image: '/brand-travelgo.jpg' },
  { id: 'infinity', name: 'INFINITY PARIS', group: 'travel', category: 'Travel & luggage', description: 'Understated style, wherever the journey leads.', serif: true, image: '/brand-infinity.jpg' },
  { id: 'magicwalk', name: 'MAGICWALK', group: 'footwear', category: 'Footwear', description: 'Everyday comfort, one step at a time.', serif: false, image: '/brand-magicwalk.jpg' },
  { id: 'adda', name: 'ADDA', group: 'footwear', category: 'Footwear', description: 'Easy silhouettes for everyday living.', serif: false, image: '/brand-adda.jpg' }
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

      <section className="pb-[56px] md:pb-[80px] lg:pb-[104px] pt-0">
        <div className="wrap">
          <p className="text-[12px] md:text-[13px] leading-[1.65] text-body mb-8 md:mb-12 max-w-[64ch]">Portfolio preview · Brand names identify the proposed portfolio. All imagery is newly generated; product pairings and descriptive copy are illustrative.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-[45px] md:gap-y-[60px]">
            {brands.map((b) => (
              <article key={b.id} className="flex flex-col h-full border-t border-border pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                  <div className={`text-[19px] tracking-[0.1em] text-ink ${b.serif ? 'font-serif' : 'font-sans font-medium'}`}>{b.name}</div>
                  <span className="text-[10px] font-semibold tracking-[0.1em] text-body uppercase">{b.category}</span>
                </div>
                <p className="text-[14px] leading-[1.6] text-body mb-[25px]">{b.description}</p>
                <Link href={`/collections?group=${b.group}&brand=${b.id}`} aria-label={`Explore ${b.name}`}>
                  <div className="relative overflow-hidden rounded-[4px] aspect-[5/4] bg-linen">
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
                      className="object-cover transition-transform duration-500 motion-safe:md:hover:scale-[1.025]"
                    />
                  </div>
                </Link>
                <Link className="inline-flex items-center gap-[18px] text-[13px] font-medium underline decoration-1 underline-offset-[6px] text-ink hover:text-red transition-colors mt-[25px]" href={`/collections?group=${b.group}&brand=${b.id}`}>
                  Explore the selection
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[19px] h-[19px] shrink-0 fill-none stroke-current stroke-2"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[56px] md:py-[80px] lg:py-[104px] bg-linen">
        <div className="wrap">
          <SectionTitle
            eyebrow="Our wider network"
            title="Clients &amp; partners."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 mt-[45px] md:mt-[60px]">
            {[
              ['lulu', 'Lulu on the Move', 'Hypermarket chain'],
              ['mark', 'Mark & Save', 'Department stores'],
              ['madina', 'Al Madina Group', 'Hypermarket group'],
              ['talal', 'Talal Group', 'Hypermarket group'],
              ['shaklan', 'Shaklan Markets', 'Supermarket chain']
            ].map((p, i) => (
              <div key={i} className="flex flex-col p-5 md:p-6 bg-white border border-[#ece9e1] rounded-[4px] aspect-[4/3] justify-center items-center text-center transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                <div className="font-serif font-medium text-[17px] text-ink mb-1.5">{p[1]}</div>
                <p className="text-[11px] font-medium tracking-[0.05em] text-body uppercase">{p[2]}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] md:text-[13px] leading-[1.65] text-body mt-[45px] max-w-[64ch]">Client names shown as plain text for layout review; these are not recreated logos.</p>
        </div>
      </section>

      <section className="py-[56px] md:py-[80px] lg:py-[104px] bg-forest text-ivory">
        <div className="wrap cta-inner flex flex-col md:flex-row md:items-center justify-between gap-7 md:gap-8 lg:gap-16">
          <div>
            <span className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-light mb-3">Let’s work together</span>
            <h2 className="font-serif font-medium text-[clamp(28px,3.5vw,44px)] leading-[1.18] tracking-[-0.035em] text-ivory max-w-[650px]">A new relationship.<br />A shared opportunity.</h2>
            <p className="text-[14px] md:text-[15px] leading-[1.7] text-muted-light mt-3 md:mt-4 max-w-[48ch]">Get in touch to discuss your business and how we could work together.</p>
          </div>
          <div className="shrink-0 self-start md:self-auto">
            <Button variant="light" href="/contact?context=Partnership%20enquiry">
              Discuss your requirements
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px] shrink-0 ml-2">
                <path d="M4 12h15m-6-6 6 6-6 6"/>
              </svg>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
