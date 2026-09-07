// app/contact/page.tsx
import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock, Building2, Globe } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import GCCLocationsMap from "@/components/contact/GCCLocationsMap";
import { regionalOffices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us & Regional Offices | BLANKET HOUSE TRADING L.L.C.",
  description:
    "Get in touch with BLANKET HOUSE TRADING L.L.C. (B.H.T. Collections). Head office in Dubai, UAE, with regional branches in Oman, Qatar, Bahrain, Kuwait, and Saudi Arabia.",
};

const contactDetails = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "+971 55 887 9237",
    href: "https://wa.me/971558879237",
    sub: "Direct Dubai sales & inquiry",
    iconColor: "text-[#1BA14B]",
  },
  {
    Icon: Phone,
    label: "Landline Tel",
    value: "+971 4 2266 095",
    href: "tel:+97142266095",
    sub: "Dubai Head Office (WASL Bldg R146)",
    iconColor: "text-[#1C75BC]",
  },
  {
    Icon: Phone,
    label: "Mobile Tel",
    value: "+971 55 887 9237",
    href: "tel:+971558879237",
    sub: "Mon – Sat, 9:00 AM – 6:00 PM",
    iconColor: "text-[#D92626]",
  },
  {
    Icon: Mail,
    label: "Official Email",
    value: "info@blankethouse.ae",
    href: "mailto:info@blankethouse.ae",
    sub: "We reply within 24 hours",
    iconColor: "text-[#8C6D2B]",
  },
  {
    Icon: MapPin,
    label: "Dubai Head Office",
    value: "Baniyas Square, Deira, Dubai",
    href: null,
    sub: "Office 204, Bldg R146 WASL (Gulf Optics Bldg)",
    iconColor: "text-[#D92626]",
  },
  {
    Icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat: 9:00am – 6:00pm",
    href: null,
    sub: "Sunday: Closed",
    iconColor: "text-[#1C75BC]",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0B131F] py-20 md:py-28 text-center px-4">


        <div className="relative z-10">
          <p
            className="text-[#D92626] text-[11px] tracking-[0.25em] font-bold uppercase mb-4 bg-[#D92626]/20 inline-block px-3 py-1 rounded"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            BLANKET HOUSE TRADING L.L.C.
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)", color: "#FFFFFF" }}
          >
            Contact &amp; Regional Offices
          </h1>
          <p
            className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
          >
            Headquartered in Dubai with dedicated regional branches across the UAE, Oman, Qatar, Bahrain, Kuwait, and Saudi Arabia.
          </p>
        </div>
      </section>

      {/* ── Main Content Form & Info ─────────────────────── */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="relative z-10 grid lg:grid-cols-5 gap-12 lg:gap-16 mb-20">

          {/* Left — Contact Info */}
          <aside className="lg:col-span-2 space-y-4">
            <div className="mb-6">
              <p
                className="text-[#D92626] text-[11px] tracking-[0.2em] font-bold uppercase mb-2"
                style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
              >
                DUBAI HEADQUARTERS
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold text-[#0B131F] mb-3 leading-tight"
                style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
              >
                Let&apos;s Connect
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed">
                For wholesale blankets, institutional camp supplies, travel luggage, footwear orders, or general inquiries.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {contactDetails.map(({ Icon, label, value, href, sub, iconColor }) => (
                <div
                  key={label}
                  className="flex items-start gap-3.5 p-4 bg-white border border-[#F2EBDC] rounded-xl shadow-xs hover:border-[#1C75BC]/40 transition-colors"
                >
                  <div className={`w-10 h-10 bg-[#FAF8F3] border border-[#F2EBDC] rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[10px] font-bold text-[#0B131F] tracking-[0.15em] uppercase mb-0.5"
                      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-bold text-[#0B131F] hover:text-[#1C75BC] transition-colors block truncate"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-bold text-[#0B131F]">{value}</p>
                    )}
                    <p className="text-[11px] text-[#64748B] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA card */}
            <div className="p-6 bg-[#0B131F] text-white rounded-xl shadow-md mt-2 border border-[#1A2433]">
              <p
                className="text-white text-sm font-bold mb-1"
                style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)", color: "#FFFFFF" }}
              >
                Fastest Response via WhatsApp
              </p>
              <p className="text-[#94A3B8] text-xs mb-4 leading-relaxed">
                Connect directly with our Dubai sales and quotation desk.
              </p>
              <a
                href="https://wa.me/971558879237"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D92626] text-white px-5 py-2.5 rounded text-xs font-semibold tracking-wider hover:bg-[#B91C1C] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                CHAT ON WHATSAPP (+971 55 887 9237)
              </a>
            </div>
          </aside>

          {/* Right — Form */}
          <div className="lg:col-span-3 bg-white p-8 md:p-10 rounded-2xl border border-[#F2EBDC] shadow-sm">
            <div className="mb-8">
              <p
                className="text-[#D92626] text-[11px] tracking-[0.2em] font-bold uppercase mb-3"
                style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
              >
                GET A QUOTE / ENQUIRE
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold text-[#0B131F] leading-tight"
                style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
              >
                Send Us a Message
              </h2>
              <p className="text-[#64748B] text-sm mt-1">
                Tell us about your requirements and we&apos;ll respond with a customized quotation.
              </p>
            </div>
            <ContactForm />
          </div>

        </div>

        {/* ── Interactive GCC Map & Location Highlights ────────── */}
        <GCCLocationsMap />

        {/* ── 6 Regional GCC Offices Directory from PDF Pages 4-5 ── */}
        <div className="border-t border-[#F2EBDC] pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p
              className="text-[#D92626] text-xs tracking-[0.25em] font-bold uppercase mb-2"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              REGIONAL CONTACT DIRECTORY
            </p>
            <h2
              className="text-3xl font-bold text-[#0B131F]"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Our 6 GCC Regional Offices
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              Reach out directly to our regional representatives across the Middle East.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalOffices.map((office) => (
              <div
                key={office.country}
                className={`p-6 rounded-2xl border transition-all ${office.isHeadquarters ? "bg-[#0B131F] text-white border-[#1A2433] shadow-lg" : "bg-white text-[#0B131F] border-[#F2EBDC] shadow-xs"}`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${office.isHeadquarters ? "bg-[#D92626] text-white" : "bg-[#FAF8F5] border border-[#E8DFC8] text-[#8C6D2B]"}`}>
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3
                      className={`text-base font-bold ${office.isHeadquarters ? "text-white" : "text-[#0B131F]"}`}
                      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
                    >
                      {office.country}
                    </h3>
                  </div>
                  {office.isHeadquarters && (
                    <span className="text-[9px] bg-[#D92626] text-white font-bold px-2 py-0.5 rounded uppercase">HQ</span>
                  )}
                </div>

                <p className={`text-xs font-bold mb-1 ${office.isHeadquarters ? "text-white/95" : "text-[#1C75BC]"}`}>{office.companyName}</p>
                <p className={`text-xs leading-relaxed mb-4 ${office.isHeadquarters ? "text-white/70" : "text-[#64748B]"}`}>{office.address}</p>

                <div className={`text-xs space-y-1.5 pt-3 border-t ${office.isHeadquarters ? "border-white/10 text-white/80" : "border-[#F2EBDC] text-[#64748B]"}`}>
                  {office.contactPerson && <p><span className="font-semibold">Contact Person:</span> {office.contactPerson}</p>}
                  {office.mobile && (
                    <p>
                      <span className="font-semibold">Mobile:</span>{" "}
                      <a href={`tel:${office.mobile.replace(/\s+/g, "")}`} className="hover:underline font-medium">
                        {office.mobile}
                      </a>
                    </p>
                  )}
                  {office.tel && <p><span className="font-semibold">Tel:</span> {office.tel}</p>}
                  {office.email && (
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      <a href={`mailto:${office.email}`} className="hover:underline">
                        {office.email}
                      </a>
                    </p>
                  )}
                  {office.crNo && <p className="text-[11px] opacity-75"><span className="font-semibold">CR No.:</span> {office.crNo}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
