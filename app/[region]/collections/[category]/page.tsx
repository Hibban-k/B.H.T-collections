// app/[region]/collections/[category]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ProductService } from "@/lib/services/product.service";
import { CategoryService } from "@/lib/services/category.service";
import { RegionService } from "@/lib/services/region.service";
import { constructMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema, generateItemListSchema, generateFaqSchema } from "@/lib/seo/schema";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export const revalidate = 3600;

interface Props {
  params: Promise<{ region: string; category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, category } = await params;
  
  const regionData = await RegionService.getRegionByCode(region);
  if (!regionData) return {};

  const allCategories = await CategoryService.getCategories();
  const cat = allCategories.find((c) => c.slug === category);
  if (!cat || cat.status !== "active") return {};
  
  return constructMetadata({
    title: `${cat.name} Collection in ${regionData.name} | B.H.T. Collections`,
    description: `Shop premium ${cat.name.toLowerCase()} online in ${regionData.name}. Discover elegant designs and unparalleled comfort delivered across ${regionData.name}.`,
    image: cat.image,
    path: `/${region}/collections/${cat.slug}`
  });
}

export default async function CategoryPage({ params }: Props) {
  const { region, category } = await params;

  const regionData = await RegionService.getRegionByCode(region);
  if (!regionData) notFound();

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
    { name: cat.name, path: `/${region}/collections/${cat.slug}` }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema(products, getAbsoluteUrl(`/${region}/collections/${cat.slug}`))) }}
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
            <Link href={`/${region}/collections`}>Collections</Link>
            <span>/</span>
            <span aria-current="page">{cat.name}</span>
          </nav>
          <div className="split reverse">
            <div>
              <span className="eyebrow">{cat.name} in {regionData.name}</span>
              <h1>{cat.name}</h1>
              <p>{cat.description}</p>
              <Link className="text-link" href={`/${region}/collections`}>
                Explore all {regionData.name} collections
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
                <Link href={`/${region}/collections/${product.categorySlug}/${product.slug}`} className="product-image-link" aria-label={`Explore ${product.name} collection`}>
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
                  <Link href={`/${region}/collections/${product.categorySlug}/${product.slug}`} className="text-link" style={{ border: 0, background: 'none', padding: 0 }}>
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
              <Link href={`/${region}/collections`} className="btn">
                View all collections
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h15m-6-6 6 6-6 6"/>
                </svg>
              </Link>
            </div>
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
