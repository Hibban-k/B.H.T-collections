"use client";

import React from "react";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandClientHero } from "./BrandClientHero";
import { BrandClientGrid } from "./BrandClientGrid";
import { ContactRegionalStrip } from "@/components/contact/ContactRegionalStrip";

export const BrandClientPageView: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        <BrandClientHero />
        <BrandClientGrid />
        <ContactRegionalStrip />
      </main>

      <Footer />
    </div>
  );
};
