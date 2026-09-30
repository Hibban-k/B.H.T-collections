// app/collections/[category]/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ProductService } from "@/lib/services/product.service";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { formatAED } from "@/lib/utils";
import { constructMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await ProductService.getProductBySlug(slug);
  if (!product || product.status !== "published") return {};
  
  return constructMetadata({
    title: `${product.name} | B.H.T. Collections`,
    description: (product.shortDescription || product.description) + " · Premium UAE bedding from B.H.T. Collections.",
    image: product.image,
    path: `/collections/${product.categorySlug}/${product.slug}`
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug, category } = await params;
  const product = await ProductService.getProductBySlug(slug);
  if (!product || product.status !== "published" || product.categorySlug !== category) {
    notFound();
  }

  let crossSells: typeof product[] = [];
  if (product.crossSellSlugs && product.crossSellSlugs.length > 0) {
    crossSells = await ProductService.getProductsBySlugs(product.crossSellSlugs);
  }

  const related = crossSells.length > 0 ? crossSells : await ProductService.getRelatedProducts(
    product.categorySlug,
    product.slug,
    4
  );

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: product.category, path: `/collections/${product.categorySlug}` },
    { name: product.name, path: `/collections/${product.categorySlug}/${product.slug}` }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)) }}
      />
      
      <section className="section" style={{ paddingTop: 'calc(var(--header) + 2rem)' }}>
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '3rem' }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/collections">Collections</Link>
            <span>/</span>
            <Link href={`/collections/${product.categorySlug}`}>{product.category}</Link>
            <span>/</span>
            <span aria-current="page">{product.name}</span>
          </nav>
          
          <div className="preview-grid">
            <div className="media">
              <Image 
                src={product.image || "/reference-home-textiles.jpg"} 
                alt={product.name} 
                width={800} 
                height={1000} 
                className="object-cover"
                priority
              />
            </div>
            
            <div>
              <span className="eyebrow">{product.category}</span>
              <h2 id="product-title">{product.name}</h2>
              <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '1.25rem', color: 'var(--color-ink)', fontWeight: 600 }}>
                {formatAED(product.price)}
              </p>
              
              <p>Explore this selection with our team. Ask about the available sizes, materials, and options for your requirements.</p>
              
              <p className="demo-note">{product.description || 'Premium selection designed for everyday comfort.'}</p>
              
              {product.materials && product.materials.length > 0 && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                  <span className="eyebrow">Materials & Care</span>
                  <ul style={{ listStyle: 'square', marginLeft: '1.25rem', marginTop: '0.5rem', color: 'var(--color-body)' }}>
                    {product.materials.map((mat: string, i: number) => (
                      <li key={i}>{mat}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Link 
                className="btn" 
                href={`/contact?context=${encodeURIComponent(`${product.name} — ${product.category}`)}`}
                style={{ marginTop: '2rem' }}
              >
                Enquire about this selection 
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h15m-6-6 6 6-6 6"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--color-linen)' }}>
          <div className="wrap">
            <span className="eyebrow">Explore more</span>
            <h2 style={{ marginBottom: '2rem' }}>{crossSells.length > 0 ? "Frequently Bought Together" : "You May Also Like"}</h2>
            <div className="product-grid">
              {related.map((rel) => (
                <article className="product-card" key={rel._id}>
                  <Link href={`/collections/${rel.categorySlug}/${rel.slug}`} className="product-image-link" aria-label={`Explore ${rel.name}`}>
                    <div className="media">
                      <Image 
                        src={rel.image || '/reference-home-textiles.jpg'} 
                        alt={rel.name} 
                        width={800} 
                        height={1000} 
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="product-meta">
                    <span className="eyebrow">{rel.category}</span>
                    <h3>{rel.name}</h3>
                    <p className="price">Enquire for details</p>
                    <Link href={`/collections/${rel.categorySlug}/${rel.slug}`} className="text-link" style={{ border: 0, background: 'none', padding: 0 }}>
                      View selection 
                      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h15m-6-6 6 6-6 6"/>
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
