// app/collections/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Catalogue from "@/components/collections/Catalogue";
import Button from "@/components/ui/Button";
import { ProductService } from "@/lib/services/product.service";
import { CategoryService } from "@/lib/services/category.service";

import { constructMetadata } from "@/lib/seo/metadata";
import { generateItemListSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export const revalidate = 3600;

export const metadata: Metadata = constructMetadata({
  title: "All Collections | B.H.T. Collections",
  description: "Browse our full range of premium blankets, bed linen, comforters and bedspreads. Quality home textiles for every bedroom across the UAE.",
  path: "/collections",
});

export default async function CollectionsPage() {
  const [initialProducts, categories] = await Promise.all([
    ProductService.getProducts({ status: "published", showOnCollection: true }),
    CategoryService.getCategories(),
  ]);

  const products = (initialProducts || []).filter((p) => p.name && p.name.length >= 4);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema(products, getAbsoluteUrl("/collections"))) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />

      <header className="page-intro">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Our collections</span>
          </nav>
          <div className="intro-line">
            <div>
              <span className="eyebrow">Our collections</span>
              <h1>Everyday essentials.<br/>Extraordinary possibilities.</h1>
              <p>Explore home textiles, travel companions, and footwear. Find a collection that feels right for you.</p>
            </div>
            <span className="intro-number" aria-hidden="true">03</span>
          </div>
        </div>
      </header>

      <Suspense fallback={<div className="wrap section">Loading collections…</div>}>
        <Catalogue products={products} categories={categories} />
      </Suspense>

      <section className="py-[56px] md:py-[80px] lg:py-[104px] bg-forest text-ivory">
        <div className="wrap cta-inner flex flex-col md:flex-row md:items-center justify-between gap-7 md:gap-8 lg:gap-16">
          <div>
            <span className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-light mb-3">Let’s work together</span>
            <h2 className="font-serif font-medium text-[clamp(28px,3.5vw,44px)] leading-[1.18] tracking-[-0.035em] text-ivory max-w-[650px]">A collection for<br/>your business.</h2>
            <p className="text-[14px] md:text-[15px] leading-[1.7] text-muted-light mt-3 md:mt-4 max-w-[48ch]">From individual selections to larger requirements, let’s start with what you need.</p>
          </div>
          <div className="shrink-0 self-start md:self-auto">
            <Button variant="light" href="/contact?context=Collection%20enquiry">
              Discuss your requirements
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px] shrink-0 ml-2">
                <path d="M4 12h15m-6-6 6 6-6 6"/>
              </svg>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
