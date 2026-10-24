import { Navbar } from "@/components/header/Navbar";
import { AnnouncementTicker } from "@/components/ticker/AnnouncementTicker";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { ShopByCategory } from "@/components/category-showcase/ShopByCategory";
import { FeaturedProducts } from "@/components/featured-products/FeaturedProducts";
import { WhyChooseUs } from "@/components/why-choose-us/WhyChooseUs";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { RegionalPresence } from "@/components/regional-presence/RegionalPresence";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header & Navigation: Row 1, Mega Menu & Row 2 Secondary Nav */}
      <Navbar />

      <main className="flex-1">
        {/* 3. Hero Carousel (3 Slides, 2.5s Autoplay) */}
        <HeroCarousel />

        {/* 2. Announcement Ticker (Directly above hero, transparent/no background) */}
        <AnnouncementTicker />

        {/* 4. Shop by Category Showcase (3 Pure White Containers with DB Sliding Brand Logos & Banners) */}
        <ShopByCategory />

        {/* 5. Featured Products Section (Real DB Products with Category Tabs & Quick View) */}
        <FeaturedProducts />

        {/* 6. Why Choose Us (6 Items Grid, Strictly NO Heading) */}
        <WhyChooseUs />

        {/* 7. Testimonials (5 Boxes: 1 Black + 4 White, Strictly NO Heading) */}
        <Testimonials />

        {/* 8. Our Regional Presence (Burj Khalifa Split Layout + 6 Circular Country Flags) */}
        <RegionalPresence />
      </main>

      {/* 9. Luxury Charcoal Footer */}
      <Footer />
    </div>
  );
}
