import { Metadata } from "next";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Refund & Return Policy | Blanket House Trading LLC",
  description: "Official Refund & Return Policy of Blanket House Trading LLC Dubai, UAE.",
};

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <span className="text-xs font-bold uppercase tracking-widest text-bht-red mb-2 block">
          CUSTOMER SATISFACTION & GUARANTEE
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-bht-charcoal font-normal tracking-tight mb-8">
          Refund & Return Policy
        </h1>

        <div className="space-y-8 text-sm sm:text-base text-neutral-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">1. Quality Guarantee & Eligibility</h2>
            <p>
              At Blanket House Trading LLC, we take immense pride in the craftsmanship and comfort of our bedding, travel luggage, and footwear collections. If you are not completely satisfied with your purchase, you may initiate a return or exchange within 14 calendar days of delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">2. Condition of Items for Return</h2>
            <p>
              To qualify for a refund, items must be in their original, unused, unwashed condition with all authentic manufacturer packaging, tags, seals, and accessories intact.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">3. Processing Refunds</h2>
            <p>
              Once your returned item is received and inspected by our Dubai quality assurance team, your refund will be processed promptly via the original payment method within 5–7 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">4. Damaged or Defective Items</h2>
            <p>
              If an item is received with a manufacturing defect or transit damage, please notify us within 48 hours of receipt. We will arrange a complimentary replacement or full refund immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">5. How to Initiate a Return</h2>
            <p>
              To start a return or exchange, contact our customer concierge at <a href="mailto:info@blankethouse.ae" className="text-bht-red font-semibold hover:underline">info@blankethouse.ae</a> or reach out to our team via phone or showroom visit in Deira, Dubai.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
