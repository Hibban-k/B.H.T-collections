"use client";
// components/sections/HeroSection.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─── Framer helpers ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 1.02 as number },
  visible: { opacity: 1, scale: 1 as number },
};

/* ─── Tri-colour brand stripe ─────────────────────────────────── */
function BrandStripe({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="absolute inset-y-0 right-0 z-20 flex flex-col w-[3px]">
        <div className="flex-1 bg-[#D02E30]" />
        <div className="flex-1 bg-[#238D7D]" />
        <div className="flex-1 bg-[#3C97C5]" />
      </div>
    );
  }
  return (
    <div className="w-full h-[3px] flex">
      <div className="flex-1 bg-[#D02E30]" />
      <div className="flex-1 bg-[#238D7D]" />
      <div className="flex-1 bg-[#3C97C5]" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  return (
    <section
      className="relative bg-transparent overflow-hidden min-h-[88vh] flex flex-col"
      aria-label="B.H.T. Collections Hero"
    >
      {/* ── Mobile: stacked (image on top, copy below) ── */}
      {/* ── Desktop: 7/5 asymmetric split ─────────────── */}
      <div className="flex flex-col md:grid md:grid-cols-12 flex-1 min-h-[88vh]">

        {/* ══ LEFT PANEL — 7 cols — editorial copy ══════════════ */}
        <motion.div
          className="
            order-2 md:order-1
            md:col-span-7
            relative flex flex-col justify-center
            bg-[#F8F7F4]/97
            px-6 sm:px-10
            py-12 md:py-0
            md:px-0
          "
        >
          {/* Vertical brand stripe on right edge of left panel (desktop only) */}
          <div className="hidden md:block">
            <BrandStripe vertical />
          </div>

          {/* Inner content — constrained width for readability */}
          <div className="md:pl-[8vw] md:pr-14 xl:pl-24 xl:pr-16 max-w-[680px]">

            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="
                inline-flex items-center gap-2
                text-[10.5px] font-bold tracking-[0.22em] uppercase
                text-[#D02E30] mb-5
              "
              style={{ fontFamily: "var(--font-montserrat-var, Montserrat, sans-serif)" }}
            >
              {/* Red pip */}
              <span className="inline-block w-4 h-[2px] bg-[#D02E30] rounded-full" />
              Premium Home Textiles · Dubai
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold leading-[1.08] text-[#13233A] mb-5"
              style={{
                fontFamily: "var(--font-playfair-display, 'Playfair Display', Georgia, serif)",
                fontSize: "clamp(32px, 4.2vw, 64px)",
                letterSpacing: "-0.01em",
              }}
            >
              Where Comfort
              <br />
              <em className="not-italic text-[#13233A]">Meets Luxury</em>
            </motion.h1>

            {/* Support line */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[15px] leading-relaxed text-[#25262C]/75 mb-10 font-medium"
              style={{ fontFamily: "var(--font-montserrat-var, Montserrat, sans-serif)" }}
            >
              Trusted by <span className="text-[#13233A] font-semibold">500+ clients</span> across{" "}
              <span className="text-[#13233A] font-semibold">6 GCC countries</span> since 2009.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-row flex-nowrap gap-3 items-center"
            >
              {/* btn-primary */}
              <Link
                href="/collections"
                className="btn-primary !px-4 sm:!px-6 !py-2.5 !min-h-[42px] !text-[10px] sm:!text-xs whitespace-nowrap"
              >
                Explore Collections
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 duration-200" />
              </Link>

              {/* btn-secondary */}
              <Link
                href="/contact"
                className="btn-secondary !px-4 sm:!px-6 !py-2.5 !min-h-[42px] !text-[10px] sm:!text-xs whitespace-nowrap"
              >
                Wholesale Enquiries
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ══ RIGHT PANEL — 5 cols — full-bleed image ═══════════ */}
        <div className="order-1 md:order-2 md:col-span-5 relative min-h-[52vw] md:min-h-0">
          <motion.div
            variants={imageVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop"
              alt="Luxury hotel bed with premium white bedding — B.H.T. Collections"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            {/* Subtle dark gradient on left edge to blend with left panel */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8F7F4]/60 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* ── Horizontal brand stripe at section bottom (mobile) ── */}
      <div className="md:hidden">
        <BrandStripe />
      </div>
    </section>
  );
}
