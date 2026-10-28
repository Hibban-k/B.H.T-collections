import { Metadata } from "next";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Blanket House Trading LLC",
  description: "Privacy Policy and personal data protection principles of Blanket House Trading LLC Dubai.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <span className="text-xs font-bold uppercase tracking-widest text-bht-red mb-2 block">
          LEGAL & COMPLIANCE
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-bht-charcoal font-normal tracking-tight mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-sm sm:text-base text-neutral-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">1. Overview</h2>
            <p>
              Blanket House Trading LLC (&ldquo;BHT Collections&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to safeguarding the privacy of our website visitors, showroom guests, and retail/wholesale customers in the United Arab Emirates and GCC.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">2. Information We Collect</h2>
            <p>
              We collect information provided directly by you when inquiring about our collections, placing orders, requesting wholesale catalogs, or contacting our concierge team, including your name, email, phone number, and delivery address.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">3. How We Use Your Information</h2>
            <p>
              Your information is used solely to process your inquiries, arrange safe and prompt courier delivery across the UAE and GCC, provide concierge support, and inform you of new seasonal collections from our authorized brands.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">4. Data Security & UAE Compliance</h2>
            <p>
              We maintain industry-standard security measures and strictly adhere to United Arab Emirates Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection. We never sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">5. Contact Our Privacy Officer</h2>
            <p>
              If you have any questions regarding our Privacy Policy or wish to review your data, please contact us at <a href="mailto:info@blankethouse.ae" className="text-bht-red font-semibold hover:underline">info@blankethouse.ae</a> or visit our Dubai headquarters in Deira.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
