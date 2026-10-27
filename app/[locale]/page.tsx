import { Navbar } from "@/components/header/Navbar";
import { AnnouncementTicker } from "@/components/ticker/AnnouncementTicker";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { ShopByCategory } from "@/components/category-showcase/ShopByCategory";
import { FeaturedProducts } from "@/components/featured-products/FeaturedProducts";
import { WhyChooseUs } from "@/components/why-choose-us/WhyChooseUs";
import { OurCustomers } from "@/components/customers/OurCustomers";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { RegionalPresence } from "@/components/regional-presence/RegionalPresence";
import { Footer } from "@/components/footer/Footer";
import { CategoryService } from "@/lib/services/category.service";
import { HERO_SLIDES, HeroSlide } from "@/data/heroData";

export default async function HomePage() {
  // Fetch database categories on the server for 0ms load time SSR hero carousel
  let categories: any[] = [];
  try {
    categories = await CategoryService.getCategories();
  } catch (error) {
    console.error("HomePage: Failed to load categories for hero carousel", error);
  }

  // Pre-bake database category background images into the hero slides
  const heroSlides: HeroSlide[] = HERO_SLIDES.map((slide) => {
    const matched = categories.find((c) => {
      const cSlug = (c.slug || "").toLowerCase();
      const cName = (c.name || "").toLowerCase();
      const dest = slide.destination.toLowerCase();
      const slideCat = slide.category.toLowerCase();

      return (
        dest.includes(cSlug) ||
        slideCat.includes(cName) ||
        (slideCat === "blankets" && (cSlug === "bedding" || cSlug === "blankets" || cName === "bedding")) ||
        (slideCat === "trolleys" && (cSlug === "travel-bags" || cSlug === "trolly" || cSlug === "trolleys" || cName === "travel bags")) ||
        (slideCat === "footwear" && (cSlug === "footwear" || cName === "footwear"))
      );
    });

    if (matched && matched.image && matched.image.trim()) {
      return {
        ...slide,
        image: matched.image,
      };
    }
    return slide;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header & Navigation: Row 1, Mega Menu & Row 2 Secondary Nav */}
      <Navbar />

      <main className="flex-1">
        {/* 3. Hero Carousel (Server-rendered with DB category background images, zero load time) */}
        <HeroCarousel slides={heroSlides} />

        {/* 2. Announcement Ticker (Directly above hero, transparent/no background) */}
        <AnnouncementTicker />

        {/* 4. Shop by Category Showcase (3 Pure White Containers with DB Sliding Brand Logos & Banners) */}
        <ShopByCategory />

        {/* 5. Featured Products Section (Real DB Products with Category Tabs & Quick View) */}
        <FeaturedProducts />

        {/* 6. Why Choose Us (3 Items: Timely Delivery, Price Match Guarantee, Strong Accountability) */}
        <WhyChooseUs />

        {/* 7. Our Customers / Clientele Section */}
        <OurCustomers />

        {/* 8. Testimonials (5 Boxes: 1 Black + 4 White, Strictly NO Heading) */}
        <Testimonials />

        {/* 9. Our Regional Presence (Burj Khalifa Split Layout + 6 Circular Country Flags) */}
        <RegionalPresence />
      </main>

      {/* 10. Luxury Charcoal Footer */}
      <Footer />
    </div>
  );
}
