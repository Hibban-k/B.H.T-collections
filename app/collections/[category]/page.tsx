// app/collections/[category]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ProductService } from "@/lib/services/product.service";
import { CategoryService } from "@/lib/services/category.service";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema, generateItemListSchema, generateFaqSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const allCategories = await CategoryService.getCategories();
  const cat = allCategories.find((c) => c.slug === category);
  if (!cat || cat.status !== "active") return {};
  
  return constructMetadata({
    title: `${cat.name} Collection | B.H.T. Collections`,
    description: `${cat.description}. Premium quality home textiles, delivered across UAE.`,
    image: cat.image,
    path: `/collections/${cat.slug}`
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const allCategories = await CategoryService.getCategories();
  const cat = allCategories.find((c) => c.slug === category);
  if (!cat || cat.status !== "active") notFound();

  const initialProducts = await ProductService.getProducts({
    status: "published",
    categorySlug: category,
    showOnCollection: true,
  });

  const products = (initialProducts || []).filter((p) => p.name && p.name.length >= 4);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: cat.name, path: `/collections/${cat.slug}` }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema(products, getAbsoluteUrl(`/collections/${cat.slug}`))) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />
      {cat.faq && cat.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema(cat.faq)) }}
        />
      )}

      <header className="collection-intro">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/collections">Collections</Link>
            <span>/</span>
            <span aria-current="page">{cat.name}</span>
          </nav>
          <div className="split reverse">
            <div>
              <span className="eyebrow">{cat.name}</span>
              <h1>{cat.name}</h1>
              <p>{cat.description}</p>
              <Link className="text-link" href="/collections">
                Explore all collections
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h15m-6-6 6 6-6 6"/>
                </svg>
              </Link>
            </div>
            <div className="media">
              <Image 
                src={cat.image || "/reference-home-textiles.jpg"} 
                alt={`${cat.name} collection preview`} 
                width={800} 
                height={1000} 
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Embedded Catalogue */}
      <section className="catalogue">
        <div className="wrap">
          <div className="catalogue-toolbar">
            <p className="result-count" aria-live="polite">{products.length} selections in {cat.name}</p>
            <div className="desktop-filters">
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
                  <span className="eyebrow">{product.category || cat.name}</span>
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
                View all collections
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h15m-6-6 6 6-6 6"/>
                </svg>
              </Link>
            </div>
          )}

          <p className="section-footnote">Sample catalogue · Images and product-to-brand associations are illustrative. Prices and availability are confirmed by enquiry.</p>
        </div>
      </section>

      <section className="section collection-details">
        <div className="wrap reading">
          <span className="eyebrow">A closer look</span>
          <h2>Find your right fit.</h2>
          <p>
            This demo shows how collection information and common questions can sit alongside the range. For a live enquiry, the team can confirm available specifications and options.
          </p>

          {cat.longDescription && (
            <div 
              dangerouslySetInnerHTML={{ __html: cat.longDescription }} 
              style={{ marginBottom: '3rem' }}
            />
          )}

          {cat.faq && cat.faq.length > 0 && cat.faq.map((item, i) => (
            <details className="faq" key={i}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
          {!cat.faq || cat.faq.length === 0 && (
            <>
              <details className="faq">
                <summary>How can I enquire about this collection?</summary>
                <p>Use the enquiry link below to contact the team with this collection already selected.</p>
              </details>
              <details className="faq">
                <summary>Can I discuss a bulk requirement?</summary>
                <p>Share your preferred products, quantities, and destination so the team can discuss the appropriate options.</p>
              </details>
            </>
          )}
        </div>
      </section>

      <section className="cta dark">
        <div className="wrap cta-inner">
          <div>
            <span className="eyebrow">Let’s work together</span>
            <h2>Let’s find the right<br/>collection for you.</h2>
            <p>Tell us about your requirements and preferred selection.</p>
          </div>
          <Link className="btn light" href={`/contact?context=${encodeURIComponent(cat.name)}`}>
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
