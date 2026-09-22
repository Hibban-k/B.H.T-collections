"use client";
// app/contact/page.tsx
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Clock, Building2, ChevronDown } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import dynamic from "next/dynamic";
import { regionalOffices } from "@/lib/data";

const GCCLocationsMap = dynamic(() => import("@/components/contact/GCCLocationsMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[400px] bg-[#E8E2D5]/30 animate-pulse rounded-2xl" />
});

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const [openOffice, setOpenOffice] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-transparent pb-24">
      {/* ── Page Header ────────────────────────────────────── */}
      <header className="relative w-full pt-28 pb-20 md:pt-32 md:pb-24 text-center px-4 sm:px-6 min-h-[30vh] flex flex-col items-center justify-center overflow-hidden mb-12">
        <Image 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
          alt="Modern office" 
          fill 
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-[#13233A]/75 z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto">
          <p className="text-[#3C97C5] text-[10.5px] font-bold uppercase tracking-[0.22em] mb-4 drop-shadow-sm">
            Get in Touch
          </p>
          <h1 
            className="text-4xl md:text-5xl font-bold text-white mb-5 drop-shadow-md"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Contact Us
          </h1>
          <p className="text-white/80 text-[15px] leading-relaxed max-w-xl mx-auto drop-shadow">
            Whether you&apos;re shopping for your home or outfitting a hospitality group, our team in Dubai is ready 
            to assist.
          </p>
        </div>
      </header>

      {/* ── Compact Contact Rail ───────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-white/96 border border-[#D8DCE2] rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row md:divide-x divide-y md:divide-y-0 divide-[#D8DCE2]">
          
          <a href="https://wa.me/971558879237" className="flex-1 p-6 flex items-center justify-center gap-4 hover:bg-[#F8F7F4] transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#1BA14B]/10 flex items-center justify-center text-[#1BA14B] group-hover:bg-[#1BA14B] group-hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#25262C]/60 mb-1">WhatsApp</p>
              <p className="font-semibold text-[#13233A]">+971 55 887 9237</p>
            </div>
          </a>

          <a href="tel:+97142266095" className="flex-1 p-6 flex items-center justify-center gap-4 hover:bg-[#F8F7F4] transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#13233A]/5 flex items-center justify-center text-[#13233A] group-hover:bg-[#13233A] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#25262C]/60 mb-1">Dubai Landline</p>
              <p className="font-semibold text-[#13233A]">+971 4 2266 095</p>
            </div>
          </a>

          <a href="mailto:info@bhtcollections.com" className="flex-1 p-6 flex items-center justify-center gap-4 hover:bg-[#F8F7F4] transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#3C97C5]/10 flex items-center justify-center text-[#3C97C5] group-hover:bg-[#3C97C5] group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#25262C]/60 mb-1">Email</p>
              <p className="font-semibold text-[#13233A]">info@bhtcollections.com</p>
            </div>
          </a>

        </div>
      </section>

      {/* ── Form + Dubai HQ ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Form Side */}
          <motion.div 
            className="flex-1 bg-white/96 border border-[#D8DCE2] rounded-2xl shadow-sm p-6 md:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-bold text-[#13233A] mb-2" style={{ fontFamily: "var(--font-playfair-display)" }}>Send a Message</h2>
            <p className="text-[#25262C]/60 text-[14px] mb-8">We usually respond within 2 hours during business hours.</p>
            <ContactForm />
          </motion.div>

          {/* Dubai HQ Side */}
          <motion.div 
            className="lg:w-[400px] flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeUp}
          >
            <div className="bg-[#13233A] rounded-2xl p-8 text-white flex-1 flex flex-col shadow-lg">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-[#D02E30]" />
              </div>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair-display)" }}>Dubai Head Office</h2>
              
              <div className="space-y-6 flex-1">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-[#238D7D] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[15px] mb-1">BLANKET HOUSE TRADING L.L.C.</p>
                    <p className="text-white/70 text-[14px] leading-relaxed">
                      WASL Building R146<br />
                      Shop No 14, Al Muteena<br />
                      Deira, Dubai - UAE
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 text-[#3C97C5] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[15px] mb-1">Business Hours</p>
                    <p className="text-white/70 text-[14px] leading-relaxed">
                      Mon - Sat: 9:00 AM - 9:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/971558879237"
                className="mt-8 btn-red w-full"
              >
                Chat with Dubai Office
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Regional Offices ───────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#13233A]" style={{ fontFamily: "var(--font-playfair-display)" }}>
            GCC Regional Presence
          </h2>
          <p className="text-[#25262C]/60 text-[15px] mt-3">
            Select a region to view local contact details.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {regionalOffices.map((office) => (
            <div 
              key={office.country} 
              className={`bg-white/96 border rounded-xl overflow-hidden transition-all ${
                openOffice === office.country ? "border-[#13233A] shadow-md" : "border-[#D8DCE2] hover:border-[#9CA3AF]"
              }`}
            >
              <button
                onClick={() => setOpenOffice(openOffice === office.country ? null : office.country)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#13233A]">{office.country}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#25262C]/50 transition-transform ${openOffice === office.country ? "rotate-180" : ""}`} />
              </button>
              
              {openOffice === office.country && (
                <div className="px-5 pb-5 pt-2 border-t border-[#D8DCE2]/50 bg-[#F8F7F4]/50">
                  <div className="space-y-3 mt-3">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-4 h-4 text-[#13233A] mt-1 shrink-0" />
                      <p className="text-[14px] font-semibold text-[#13233A]">{office.companyName}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#D02E30] mt-1 shrink-0" />
                      <p className="text-[14px] text-[#25262C]/80 leading-relaxed">{office.address}</p>
                    </div>
                    {office.mobile && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#238D7D] shrink-0" />
                        <p className="text-[14px] font-semibold text-[#13233A]">{office.mobile}</p>
                      </div>
                    )}
                    {office.tel && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#238D7D] shrink-0" />
                        <p className="text-[14px] font-semibold text-[#13233A]">{office.tel}</p>
                      </div>
                    )}
                    {office.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#3C97C5] shrink-0" />
                        <p className="text-[14px] text-[#13233A]">{office.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── GCC Map ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <GCCLocationsMap />
      </section>
    </div>
  );
}
