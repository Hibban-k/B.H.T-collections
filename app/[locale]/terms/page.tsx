import { Metadata } from "next";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Blanket House Trading LLC",
  description: "Terms and conditions of use and commercial trade of Blanket House Trading LLC Dubai.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <span className="text-xs font-bold uppercase tracking-widest text-bht-red mb-2 block">
          LEGAL & COMMERCIAL TERMS
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-bht-charcoal font-normal tracking-tight mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-8 text-sm sm:text-base text-neutral-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, inquiring about products, or purchasing goods from Blanket House Trading LLC, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in the United Arab Emirates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">2. Intellectual Property</h2>
            <p>
              All trademarks, brands, photography, text, and logos displayed on this site, including BHT Collections and authorized labels, are the property of Blanket House Trading LLC or their respective owners and are protected by UAE intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">3. Orders, Wholesale & Pricing</h2>
            <p>
              All orders are subject to acceptance and product availability. While we make every effort to display accurate descriptions and specifications for our bedding, travel luggage, and footwear lines, we reserve the right to correct any typographical errors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">4. Governing Law & Jurisdiction</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the Dubai Courts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">5. Company Contact</h2>
            <p>
              For any legal or commercial inquiries, please reach out to Blanket House Trading LLC, Commercial District, Deira, Dubai, UAE, or email <a href="mailto:info@blankethouse.ae" className="text-bht-red font-semibold hover:underline">info@blankethouse.ae</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
