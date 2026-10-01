import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

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

      <section className="pb-[56px] md:pb-[80px] lg:pb-[104px] pt-0">
        <div className="wrap split reverse grid md:grid-cols-[6fr_5fr] lg:grid-cols-[7fr_5fr] gap-[45px] md:gap-[65px] lg:gap-[120px] items-center">
          <div>
            <span className="block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase text-red mb-4">Blanket House Trading</span>
            <h2 className="font-serif font-medium tracking-[-0.035em] text-[clamp(28px,3.5vw,44px)] leading-[1.18] text-ink mb-5">At home in<br />everyday living.</h2>
            <p className="text-[14px] md:text-[15px] leading-[1.75] max-w-[48ch] mb-4 text-body">Based in Dubai, B.H.T. Collections brings together products for homes, journeys, and everyday routines.</p>
            <p className="text-[14px] md:text-[15px] leading-[1.75] max-w-[48ch] mb-4 text-body">Our approach starts with a conversation: understanding the range you need and helping you take the next step.</p>
            <Link className="inline-flex items-center gap-[18px] text-[13px] font-medium underline decoration-1 underline-offset-[6px] text-ink hover:text-red mt-4 transition-colors" href="/collections">
              Discover our collections
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[19px] h-[19px] shrink-0 fill-none stroke-current stroke-2"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
            </Link>
          </div>
          <div className="media">
            <Image
              src="/editorial/home-textiles.png"
              alt="Original concept visual: tactile linen on a sculptural daybed"
              width={800}
              height={1000}
              priority
              className="object-cover w-full h-full rounded-[4px]"
            />
          </div>
        </div>
      </section>

      <section className="py-[56px] md:py-[80px] lg:py-[104px] bg-white">
        <div className="wrap story-layout grid lg:grid-cols-[2fr_1fr] gap-[45px] lg:gap-[90px]">
          <div>
            <span className="block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase text-red mb-4">Our perspective</span>
            <h2 className="font-serif font-medium tracking-[-0.035em] text-[clamp(28px,3.5vw,44px)] leading-[1.18] text-ink mb-5">The details make<br />the difference.</h2>
            <p className="text-[14px] md:text-[15px] leading-[1.75] max-w-[48ch] mb-4 text-body">The texture of a textile. The ease of a daily essential. The clarity of a helpful conversation. These are the details that shape how a collection fits into your life and business.</p>
            <p className="text-[14px] md:text-[15px] leading-[1.75] max-w-[48ch] mb-4 text-body">We bring our categories together in a single destination, with regional contacts to help you explore the possibilities.</p>
          </div>
          <aside className="facts flex flex-wrap lg:flex-col gap-6 lg:gap-8 justify-start lg:justify-center border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-10">
            <div className="fact">
              <strong className="block text-[18px] md:text-[22px] font-medium text-ink mb-1.5 font-serif">Dubai</strong>
              <span className="text-[12px] md:text-[13px] text-body">Our headquarters</span>
            </div>
            <div className="fact">
              <strong className="block text-[18px] md:text-[22px] font-medium text-ink mb-1.5 font-serif">03</strong>
              <span className="text-[12px] md:text-[13px] text-body">Core collection groups</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-[56px] md:py-[80px] lg:py-[104px] bg-forest text-muted-light dark">
        <div className="wrap why-layout grid lg:grid-cols-[3fr_7fr] gap-[45px] lg:gap-[90px]">
          <div>
            <span className="block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase mb-[18px] text-muted-light">Our working principles</span>
            <h2 className="font-serif font-medium tracking-[-0.035em] text-[clamp(28px,3.5vw,44px)] leading-[1.18] text-ivory">A thoughtful way<br />to work together.</h2>
          </div>
          <div className="principles grid sm:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-[45px]">
            <article className="principle">
              <span className="block text-[10px] tracking-[0.15em] text-muted-light mb-4 font-semibold uppercase">01</span>
              <h3 className="text-[17px] md:text-[18px] font-medium text-ivory mb-2.5">Quality, considered</h3>
              <p className="text-[13px] md:text-[14px] leading-[1.75] text-muted-light">Attention to materials, finish, and the everyday experience of each collection.</p>
            </article>
            <article className="principle">
              <span className="block text-[10px] tracking-[0.15em] text-muted-light mb-4 font-semibold uppercase">02</span>
              <h3 className="text-[17px] md:text-[18px] font-medium text-ivory mb-2.5">A connected range</h3>
              <p className="text-[13px] md:text-[14px] leading-[1.75] text-muted-light">Home textiles, travel essentials, and footwear, brought together for your business.</p>
            </article>
            <article className="principle">
              <span className="block text-[10px] tracking-[0.15em] text-muted-light mb-4 font-semibold uppercase">03</span>
              <h3 className="text-[17px] md:text-[18px] font-medium text-ivory mb-2.5">People who listen</h3>
              <p className="text-[13px] md:text-[14px] leading-[1.75] text-muted-light">A dedicated conversation to understand your selection and requirements.</p>
            </article>
            <article className="principle">
              <span className="block text-[10px] tracking-[0.15em] text-muted-light mb-4 font-semibold uppercase">04</span>
              <h3 className="text-[17px] md:text-[18px] font-medium text-ivory mb-2.5">Clear communication</h3>
              <p className="text-[13px] md:text-[14px] leading-[1.75] text-muted-light">From the first enquiry to coordinating the next steps, stay in the conversation.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-[56px] md:py-[80px] lg:py-[104px]">
        <div className="wrap cta-inner flex flex-col md:flex-row md:items-center justify-between gap-7 md:gap-8 lg:gap-16">
          <div>
            <span className="block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase mb-[18px] text-red">Let’s get acquainted</span>
            <h2 className="font-serif font-medium tracking-[-0.035em] text-[clamp(28px,3.5vw,44px)] leading-[1.18] text-ink max-w-[650px]">It starts with a conversation.</h2>
          </div>
          <div className="shrink-0 self-start md:self-auto">
            <Button href="/contact?context=Company%20enquiry">
              Talk to our team
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

