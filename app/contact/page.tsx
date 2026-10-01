import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ context?: string | string[] }> }) {
  const query = await searchParams;
  const context = typeof query.context === "string" ? query.context.slice(0, 200) : "";
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

      <section className="pb-[56px] md:pb-[80px] lg:pb-[104px] pt-0">
        <div className="wrap contact-layout grid lg:grid-cols-[1fr_2fr] gap-[45px] lg:gap-[90px]">
          <div>
            <span className="block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase text-red mb-4">A personal conversation</span>
            <h2 className="font-serif font-medium tracking-[-0.035em] text-[clamp(28px,3.5vw,44px)] leading-[1.18] text-ink mb-5">Here to help you<br />find your collection.</h2>
            <p className="text-[14px] md:text-[15px] leading-[1.75] max-w-[48ch] mb-4 text-body">Home textiles, travel essentials, footwear, or a business partnership — tell us where you’d like to begin.</p>

            <article className="office bg-linen rounded-[4px] p-6 md:p-8 mt-10 mb-8 border border-border" id="office-uae">
              <span className="inline-block text-[9px] font-semibold tracking-[0.15em] uppercase text-ivory bg-red rounded-[2px] px-2 py-1 mb-4 leading-none">Headquarters</span>
              <h3 className="font-serif font-medium text-[24px] md:text-[28px] text-ink mb-1">United Arab Emirates</h3>
              <p className="text-[12px] font-semibold tracking-[0.05em] text-body mb-3">BLANKET HOUSE TRADING L.L.C.</p>
              <address className="not-italic text-[13px] leading-[1.7] text-body mb-5 max-w-[32ch]">Office No. 204, Bldg No. R146 WASL, Baniyas Square, Deira, Dubai, U.A.E.</address>
              <div className="office-contacts flex flex-col gap-2.5 pt-5 border-t border-[#d8d4cc]">
                <a href="tel:+971558879237" className="inline-flex items-center gap-2.5 text-[14px] font-medium text-ink hover:text-red transition-colors w-fit">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-none stroke-current stroke-2"><path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z"/></svg>
                  +971 55 887 9237
                </a>
                <a href="mailto:info@blankethouse.ae" className="inline-flex items-center gap-2.5 text-[14px] font-medium text-ink hover:text-red transition-colors w-fit pl-[28px]">
                  info@blankethouse.ae ↗
                </a>
              </div>
            </article>

            <Link className="inline-flex items-center gap-[18px] text-[13px] font-medium underline decoration-1 underline-offset-[6px] text-ink hover:text-red transition-colors" href="/region">
              Find a regional contact
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[19px] h-[19px] shrink-0 fill-none stroke-current stroke-2"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
            </Link>
          </div>

          <ContactForm initialSubject={context} />

        </div>
      </section>
    </>
  );
}
