// app/collections/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

      <div className="category-nav">
        <nav className="wrap category-nav-inner" aria-label="Collection groups">
          <Link className="category-tab active" href="/collections" aria-current="page">All collections</Link>
          <Link className="category-tab" href="/collections?group=home"><small>01</small>Home Textiles</Link>
          <Link className="category-tab" href="/collections?group=travel"><small>02</small>Travel & Luggage</Link>
          <Link className="category-tab" href="/collections?group=footwear"><small>03</small>Footwear</Link>
        </nav>
      </div>

      <section className="catalogue">
        <div className="wrap">
          <nav className="subcategories" aria-label="Home textile collections">
            {categories.map(cat => (
              <Link key={cat._id} href={`/collections/${cat.slug}`}>
                {cat.name}
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h15m-6-6 6 6-6 6"/>
                </svg>
              </Link>
            ))}
          </nav>
          <div style={{ height: '25px' }}></div>
          
          <div className="catalogue-toolbar">
            <p className="result-count" aria-live="polite">{products.length} selections</p>
            <div className="desktop-filters">
              {/* Note: Filters in demo are just UI placeholders. */}
              <label className="field-inline" htmlFor="sort-filter">
                Sort by
                <select id="sort-filter" data-filter="sort" defaultValue="featured">
                  <option value="featured">Featured</option>
                  <option value="az">Name: A–Z</option>
                </select>
              </label>
            </div>
            <button className="btn outline mobile-filter-btn" id="filters-open">
              Filters &amp; sort
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h15m-6-6 6 6-6 6"/>
              </svg>
            </button>
          </div>
          
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product._id}>
                <Link href={`/collections/${product.categorySlug}/${product.slug}`} className="product-image-link" aria-label={`Explore ${product.name} collection`}>
                  <div className="media">
                    <Image 
                      src={product.image || '/reference-home-textiles.jpg'} 
                      alt={`${product.name} — illustrative collection image`} 
                      width={800} 
                      height={1000} 
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="product-meta">
                  <span className="eyebrow">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="price">Enquire for details</p>
                  <Link href={`/collections/${product.categorySlug}/${product.slug}`} className="text-link" style={{ border: 0, background: 'none', padding: 0 }}>
                    View selection 
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h15m-6-6 6 6-6 6"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="empty-state" style={{ marginTop: '3rem' }}>
              <h2>No selections found.</h2>
              <p>Try exploring another collection.</p>
              <Link href="/collections" className="btn">
                Reset filters
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h15m-6-6 6 6-6 6"/>
                </svg>
              </Link>
            </div>
          )}
          
          <p className="section-footnote">Sample catalogue · Images and product-to-brand associations are illustrative. Prices and availability are confirmed by enquiry.</p>
        </div>
      </section>

      <section className="cta dark">
        <div className="wrap cta-inner">
          <div>
            <span className="eyebrow">Let’s work together</span>
            <h2>A collection for<br/>your business.</h2>
            <p>From individual selections to larger requirements, let’s start with what you need.</p>
          </div>
          <Link className="btn light" href="/contact?context=Collection%20enquiry">
            Discuss your requirements
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h15m-6-6 6 6-6 6"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
