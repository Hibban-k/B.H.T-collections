// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Globe, ShieldCheck, Warehouse, Sparkles, Building2, Briefcase, Footprints, Hotel, CheckCircle2 } from "lucide-react";
import LogoWatermark from "@/components/ui/LogoWatermark";
import { clientele, regionalOffices } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | BLANKET HOUSE TRADING L.L.C. (B.H.T. Collections)",
  description:
    "Established in 2009 in Dubai. BLANKET HOUSE TRADING L.L.C. (B.H.T. Collections) has 15+ years experience, 4 exclusive GCC factories, 50,000+ sqft warehouse, and serves 500+ clients across 6 GCC countries.",
};

const values = [
  {
    icon: Award,
    title: "15+ Years Industry Expertise",
    description: "Founded in 2009 in Dubai by a seasoned industry expert with extensive experience working with leading Korean suppliers.",
  },
  {
    icon: Warehouse,
    title: "50,000+ SQFT Warehouse",
    description: "Massive storage and logistics hub in Dubai ensuring immediate dispatch and uninterrupted supply across the region.",
  },
  {
    icon: Sparkles,
    title: "4 Exclusive GCC Factories",
    description: "Direct manufacturing partnerships with four major factories dedicated to our brands and quality standards.",
  },
  {
    icon: ShieldCheck,
    title: "Price Match Guarantee",
    description: "Highest-grade materials delivered at honest competitive pricing without ever cutting corners on raw materials.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* ── Page Hero ───────────────────────────────────── */}
      <div className="relative h-80 md:h-[420px] overflow-hidden bg-[#0B131F]">
        <Image
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=85"
          alt="B.H.T. Collections & Blanket House Trading Story"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B131F] via-[#0B131F]/80 to-transparent" />


        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <p
            className="text-[#D92626] text-xs tracking-[0.25em] font-bold uppercase mb-3 bg-[#D92626]/20 px-3 py-1 rounded"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            BUILT ON QUALITY · DELIVERED WITH CARE
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
          >
            About Blanket House Trading
          </h1>
          <p className="text-white/80 text-sm md:text-base font-medium max-w-xl">
            Established in 2009 in Dubai | Trusted Partner in Warmth &amp; Quality Across 6 GCC Countries
          </p>
        </div>
      </div>

      {/* ── Corporate Story & Mission ───────────────────── */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <LogoWatermark opacity={0.03} position="right" size={650} />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p
              className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-3"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              ABOUT US &amp; HERITAGE
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              More Than Just a Blanket Brand
            </h2>

            <p className="text-[#64748B] text-sm md:text-base leading-relaxed mb-4">
              Established in <strong>2009 in the vibrant city of Dubai</strong>, <strong>BLANKET HOUSE TRADING L.L.C.</strong> was founded by a seasoned industry expert with over 15 years of hands-on experience in the blanket and home textiles sector.
            </p>
            <p className="text-[#64748B] text-sm md:text-base leading-relaxed mb-4">
              Prior to launching our venture, our founder spent more than a decade working directly with leading Korean suppliers, mastering the art of sourcing premium materials and building strong international partnerships. This deep-rooted knowledge and trusted network laid the foundation for a business dedicated to excellence in quality and value.
            </p>
            <p className="text-[#64748B] text-sm md:text-base leading-relaxed mb-6">
              Today, we source directly from top-tier international partners, with <strong>four major factories working exclusively for BLANKET HOUSE TRADING L.L.C.</strong> in the GCC region, bringing world-class blankets and textiles to homes, hotels, and retailers.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F2EBDC]">
              <div className="p-3 bg-white border border-[#F2EBDC] rounded-xl text-center">
                <div className="text-2xl font-bold text-[#D92626]" style={{ fontFamily: "var(--font-playfair-display)" }}>2009</div>
                <div className="text-xs text-[#64748B] font-bold">Est. in Dubai</div>
              </div>
              <div className="p-3 bg-white border border-[#F2EBDC] rounded-xl text-center">
                <div className="text-2xl font-bold text-[#1C75BC]" style={{ fontFamily: "var(--font-playfair-display)" }}>50,000+</div>
                <div className="text-xs text-[#64748B] font-bold">SQFT Warehouse</div>
              </div>
              <div className="p-3 bg-white border border-[#F2EBDC] rounded-xl text-center">
                <div className="text-2xl font-bold text-[#1BA14B]" style={{ fontFamily: "var(--font-playfair-display)" }}>500+</div>
                <div className="text-xs text-[#64748B] font-bold">GCC Clients</div>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-[#0B131F] text-white p-8 md:p-10 rounded-2xl shadow-xl border border-[#1A2433] relative overflow-hidden">
            <LogoWatermark opacity={0.08} position="right" size={400} isDarkBg />
            <div className="relative z-10">
              <span className="text-[#D92626] text-xs font-bold tracking-widest uppercase bg-[#D92626]/20 px-3 py-1 rounded inline-block mb-4">
                OUR MISSION &amp; PROMISE
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
              >
                Quality Craftsmanship Without Overpaying
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Our mission is simple yet resolute: to provide our valued customers with the highest-grade blankets available, crafted from superior materials and offered at fair, reasonable prices.
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                Backed by our <strong>Price Match Guarantee</strong>, we ensure you always receive exceptional quality without overpaying. We stand behind every product, committed to your complete satisfaction and comfort.
              </p>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1BA14B] shrink-0" />
                  <span className="text-sm font-medium text-white/90">Never cutting corners on raw materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1BA14B] shrink-0" />
                  <span className="text-sm font-medium text-white/90">Four exclusive dedicated manufacturing facilities</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1BA14B] shrink-0" />
                  <span className="text-sm font-medium text-white/90">Price Match Guarantee across UAE &amp; GCC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Company Pillars ─────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0B131F] py-16 md:py-20 text-white">
        <LogoWatermark opacity={0.06} position="center" size={650} isDarkBg />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p
              className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-3 bg-[#D92626]/10 inline-block px-2.5 py-1 rounded"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              WHY CHOOSE US
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
            >
              Our Core Strengths
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-[#111C2E] border border-[#1A2433] p-6 rounded-xl shadow-lg hover:border-[#1C75BC]/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#1C75BC]/20 border border-[#1C75BC]/40 rounded-xl flex items-center justify-center mb-4 text-[#1C75BC]">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <h3
                    className="text-base font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-playfair-display)", color: "#FFFFFF" }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Other Product Portfolio & Services ──────────── */}
      <section className="section-padding bg-transparent relative overflow-hidden border-b border-[#F2EBDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0B131F] text-white px-4 py-1 rounded text-xs font-bold tracking-[0.2em] uppercase mb-3 shadow-xs">
              DIVERSIFIED SERVICES
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-4"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Commercial &amp; Institutional Product Categories
            </h2>
            <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
              BLANKET HOUSE TRADING L.L.C. has expanded across multiple essential commercial categories to serve businesses, contractors, and retail partners.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#C5A869] rounded-2xl transition-all shadow-xs hover:bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0C1220] border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C687]">
                    <Building2 className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6D2B] bg-[#F7F2E7] px-2 py-0.5 rounded border border-[#E9DCBF]">
                    Labour Camp B2B
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0B131F] mb-2 leading-snug">Complete Labour Camp Supplies</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Heavy-duty bunker beds, steel lockers, industrial blankets, certified foam mattresses &amp; pillows.
                </p>
              </div>
            </div>

            <div className="p-7 bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#C5A869] rounded-2xl transition-all shadow-xs hover:bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0C1220] border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C687]">
                    <Briefcase className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6D2B] bg-[#F7F2E7] px-2 py-0.5 rounded border border-[#E9DCBF]">
                    Travel Luggage
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0B131F] mb-2 leading-snug">Travel Suitcases &amp; Luggage</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  PP, ABS hard-shell and heavy-duty fabric luggage engineered for maximum durability across the GCC.
                </p>
              </div>
            </div>

            <div className="p-7 bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#C5A869] rounded-2xl transition-all shadow-xs hover:bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0C1220] border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C687]">
                    <Footprints className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6D2B] bg-[#F7F2E7] px-2 py-0.5 rounded border border-[#E9DCBF]">
                    Distribution
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0B131F] mb-2 leading-snug">Footwear Distribution</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Distributor for renowned brands <strong>ADDA (Thailand)</strong> &amp; <strong>Paragon (India)</strong>, plus Arabic slippers.
                </p>
              </div>
            </div>

            <div className="p-7 bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#C5A869] rounded-2xl transition-all shadow-xs hover:bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0C1220] border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C687]">
                    <Hotel className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8C6D2B] bg-[#F7F2E7] px-2 py-0.5 rounded border border-[#E9DCBF]">
                    Hospitality
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0B131F] mb-2 leading-snug">Hospitality &amp; Hotel Bedding</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Five-star duvets, comforters, high-thread-count cotton sheets, and luxury multi-ply blankets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── Clientele Hypermarkets ───────────────────────── */}
      <section className="py-16 bg-transparent border-t border-[#F2EBDC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0B131F] text-white px-4 py-1 rounded text-xs font-bold tracking-[0.2em] uppercase mb-3 shadow-xs">
            OUR CLIENTELE
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B131F] mb-3" style={{ fontFamily: "var(--font-playfair-display)" }}>
            Serving 500+ Valued Partners Across the GCC
          </h2>
          <p className="text-[#64748B] text-sm max-w-xl mx-auto mb-10">
            Trusted supplier to major hypermarket chains, department stores, and retail groups.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {clientele.map((c) => (
              <div key={c.name} className="p-4 bg-[#FAF8F5] border border-[#E8E2D5] hover:border-[#D4AF37] rounded-xl flex flex-col items-center justify-between min-h-[140px] shadow-xs hover:bg-white transition-all">
                <div className="relative w-full h-14 flex items-center justify-center p-1">
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
                <div className="pt-2 border-t border-[#EFE9DE] w-full">
                  <p className="text-xs font-bold text-[#0B131F] truncate">{c.name}</p>
                  <p className="text-[10px] text-[#8A95A5]">{c.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────── */}
      <section className="bg-transparent py-16 text-center border-t border-[#F2EBDC]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0B131F] mb-4" style={{ fontFamily: "var(--font-playfair-display)" }}>
            Partner with Blanket House Trading L.L.C.
          </h2>
          <p className="text-[#64748B] text-sm mb-8 leading-relaxed">
            Whether for retail distribution, hotel projects, labour camp requirements, or retail bedding — our team in Dubai and across the GCC is at your service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections" className="btn-primary">
              EXPLORE COLLECTIONS
            </Link>
            <Link href="/contact" className="btn-secondary">
              CONTACT OUR REGIONAL OFFICES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
