"use client";

import React from "react";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ContactHero } from "./ContactHero";
import { ContactDetailsAndForm } from "./ContactDetailsAndForm";
import { ContactStoreLocation } from "./ContactStoreLocation";
import { ContactRegionalStrip } from "./ContactRegionalStrip";

export const ContactPageView: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header & Navigation (Consistent across all pages) */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section: Editorial Headline + Dubai Flagship Storefront & Skyline */}
        <ContactHero />

        {/* 3. Reach Us: Contact Cards (5 items) + Send Us a Message Form */}
        <ContactDetailsAndForm />

        {/* 4. Visit Our Store: Stylized Dubai Coastline Map + Dubai UAE Store CTA */}
        <ContactStoreLocation />

        {/* 5. Regional Identity Strip: Proudly based in UAE + 6 Gulf Country Flags */}
        <ContactRegionalStrip />
      </main>

      {/* 6. Luxury Dark Footer */}
      <Footer />
    </div>
  );
};
