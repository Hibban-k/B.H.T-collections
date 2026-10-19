"use client";

import React from "react";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { AboutHeroSection } from "./AboutHeroSection";
import { AboutPresentDarkSection } from "./AboutPresentDarkSection";
import { AboutPastFatherSection } from "./AboutPastFatherSection";
import { AboutValuesSection } from "./AboutValuesSection";
import { ContactRegionalStrip } from "@/components/contact/ContactRegionalStrip";

export const AboutPageView: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Consistent Header & Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. SECTION 1: White Editorial Hero with High-Contrast Portrait & 4 Micro Credential Pillars */}
        <AboutHeroSection />

        {/* 3. SECTION 2: Dark Full-Bleed Section with Modern Dubai Flagship & +100,000 Customers Narrative */}
        <AboutPresentDarkSection />

        {/* 4. SECTION 3: The Past Story with Historic Founding Father Image & Handshake Trust Heritage */}
        <AboutPastFatherSection />

        {/* 5. TIMELESS VALUES CONNECTING PAST AND PRESENT */}
        <AboutValuesSection />

        {/* 6. GCC REGIONAL PRESENCE STRIP (6 Countries) */}
        <ContactRegionalStrip />
      </main>

      {/* 7. Luxury Dark Footer */}
      <Footer />
    </div>
  );
};
