"use client";
// components/sections/HeroSection.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative bg-transparent overflow-hidden"
      style={{ minHeight: "clamp(460px, 54vh, 540px)" }}
      aria-label="B.H.T. Collections Hero"
    >
      {/* SVG Clip Path Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="heroCurveClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.25 0
                     C 0.17 0.12, 0.145 0.28, 0.155 0.44
                     C 0.165 0.62, 0.19 0.82, 0.32 1
                     L 1 1
                     L 1 0
                     Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ─── Main Two-Column Hero Grid ──────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col md:flex-row items-stretch h-full">

        {/* ── LEFT: Text Content ────────────────────────────── */}
        <div
          className="flex-1 md:w-[48%] flex flex-col justify-center px-6 sm:px-10 md:pl-[9vw] md:pr-8 py-12 md:py-8"
          style={{ minHeight: "clamp(460px, 54vh, 540px)" }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[11px] font-bold tracking-[0.28em] text-[#122936] uppercase mb-3.5"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)", letterSpacing: "0.28em" }}
          >
            P&nbsp;R&nbsp;E&nbsp;M&nbsp;I&nbsp;U&nbsp;M&nbsp;&nbsp;&nbsp;B&nbsp;E&nbsp;D&nbsp;D&nbsp;I&nbsp;N&nbsp;G&nbsp;&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;H&nbsp;O&nbsp;M&nbsp;E&nbsp;&nbsp;&nbsp;T&nbsp;E&nbsp;X&nbsp;T&nbsp;I&nbsp;L&nbsp;E&nbsp;S
          </motion.p>

          {/* Main Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="font-extrabold leading-[1.05] text-[#122936] mb-2"
            style={{
              fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)",
              fontSize: "clamp(34px, 3.8vw, 50px)",
              letterSpacing: "0.01em",
            }}
          >
            B.H.T. COLLECTIONS
          </motion.h1>

          {/* Arabic Brand Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="font-bold text-[#E12620] leading-[1.18] mb-5"
            style={{
              fontFamily: "var(--font-playfair-display, 'Noto Naskh Arabic', serif)",
              fontSize: "clamp(28px, 3vw, 40px)",
              direction: "rtl",
              textAlign: "left",
            }}
          >
            بيت البطانيات
            <br />
            مجموعات
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
            className="text-[14px] text-[#56636A] mb-8 font-medium tracking-wide"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            Better Sleep&nbsp;&nbsp;|&nbsp;&nbsp;More Comfort&nbsp;&nbsp;|&nbsp;&nbsp;A Beautiful Home
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
          >
            <Link
              href="/collections"
              className="hero-cta-button inline-flex items-center gap-2 group"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: Hero Image with Exact Curved Cut & Accents ── */}
        <div
          className="hidden md:block relative flex-shrink-0"
          style={{ width: "52%", minHeight: "clamp(460px, 54vh, 540px)" }}
        >
          {/* Main Clipped Bedroom Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative w-full h-full overflow-hidden"
            style={{
              clipPath: "url(#heroCurveClip)",
              WebkitClipPath: "url(#heroCurveClip)",
              minHeight: "clamp(460px, 54vh, 540px)",
            }}
          >
            <Image
              src="/hero-bedroom.jpg"
              alt="Luxury bedroom with premium B.H.T. Collections bedding"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 52vw"
            />
          </motion.div>

          {/* Decorative Vector Overlay (Thin Arc, Red Circle, Top Curve) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 500 520"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            {/* Elegant Outer Thin Arc Line */}
            <path
              d="M 80 0
                 C 25 70, 10 160, 16 230
                 C 22 300, 48 410, 100 520"
              stroke="#122936"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Hollow Red Accent Circle centered on the thin line at y=230 */}
            <circle
              cx="16"
              cy="230"
              r="7.5"
              fill="#FFFFFF"
              stroke="#E12620"
              strokeWidth="1.8"
            />

            {/* Soft white crescent swoosh across top edge of photo */}
            <path
              d="M 125 0
                 C 160 22, 220 26, 290 0
                 Z"
              fill="#FAFAFC"
            />
          </svg>

          {/* High-res Green Leaf Accent nestled in top curve */}
          <div
            className="absolute z-30 pointer-events-none"
            style={{
              left: "6.5%",
              top: "4.5%",
              width: "15.5%",
              maxWidth: "85px",
            }}
          >
            <Image
              src="/hero-green-leaf.png"
              width={85}
              height={110}
              alt=""
              className="w-full h-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>

        {/* ── MOBILE: Bedroom Image under text ──────────────── */}
        <div className="md:hidden relative w-full h-[260px] overflow-hidden">
          <Image
            src="/hero-bedroom.jpg"
            alt="Luxury bedroom with premium B.H.T. Collections bedding"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <style>{`
        .hero-cta-button {
          background: #102A37;
          color: #ffffff;
          font-family: var(--font-montserrat-var, system-ui, sans-serif);
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 13px 30px;
          border-radius: 12px;
          box-shadow: 3px 3px 0 #E12620;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .hero-cta-button:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 #E12620;
        }
        .hero-cta-button:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 #E12620;
        }
      `}</style>
    </section>
  );
}
