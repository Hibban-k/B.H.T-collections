"use client";
// components/sections/ContactCTA.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail } from "lucide-react";
import LogoWatermark from "@/components/ui/LogoWatermark";

export default function ContactCTA() {
  return (
    <section className="section-padding bg-transparent relative overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-[#D92626] text-xs tracking-[0.2em] font-bold uppercase mb-4 bg-[#D92626]/10 inline-block px-2.5 py-1 rounded"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              Get In Touch
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#0B131F] mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Ready to Elevate Your Bedroom?
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              Have a question about our collections, bulk orders, or delivery across the UAE? Our team is ready to assist you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="w-4 h-4" />
                WHATSAPP US
              </a>
              <Link
                href="/contact"
                className="btn-secondary"
              >
                <Mail className="w-4 h-4" />
                SEND A MESSAGE
              </Link>
            </div>

            <div className="flex items-center justify-center gap-3 text-[#64748B] bg-white p-3 rounded-lg border border-[#F2EBDC] inline-flex shadow-sm">
              <Phone className="w-4 h-4 text-[#D92626]" />
              <a href="tel:+971501234567" className="text-sm font-semibold text-[#0B131F] hover:text-[#1C75BC] transition-colors">
                +971 50 123 4567
              </a>
              <span className="text-[#E2E8F0]">|</span>
              <span className="text-xs">Mon–Sat, 9am–6pm</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

