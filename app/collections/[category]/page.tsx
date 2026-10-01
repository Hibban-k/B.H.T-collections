// app/collections/[category]/page.tsx
import { Suspense } from "react";
import Catalogue from "@/components/collections/Catalogue";
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
                src={cat.image || "/editorial/home-textiles.png"}
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

      <Suspense fallback={<div className="wrap section">Loading selections…</div>}>
        <Catalogue products={products} collectionName={cat.name} />
      </Suspense>

      <section className="section collection-details">
        <div className="wrap reading">
          <span className="eyebrow">A closer look</span>
          <h2>Find your right fit.</h2>
          <p>
            Our team can help you compare the available specifications and options for your requirements.
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
          {(!cat.faq || cat.faq.length === 0) && (
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
