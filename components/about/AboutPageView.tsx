"use client";

import React from "react";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { AboutHeroSection } from "./AboutHeroSection";
import { AboutPresentDarkSection } from "./AboutPresentDarkSection";
import { AboutPastFatherSection } from "./AboutPastFatherSection";

export const AboutPageView: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section: 4 Principles Passed from Father to the Future (Overlapping Staggered Cards) */}
        <AboutHeroSection />

        {/* 3. Dark Full-Bleed Section with Modern Dubai Flagship & +100,000 Customers Narrative */}
        <AboutPresentDarkSection />

        {/* 4. History of BHT Collections: The Father's Story with Trust & Quality Verification Card */}
        <AboutPastFatherSection />
      </main>

      {/* 5. Luxury Dark Footer */}
      <Footer />
    </div>
  );
};
