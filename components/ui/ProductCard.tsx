import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use product.category as the badge, default to B.H.T. Collections
  const badgeText = product.category ? product.category.toUpperCase() : 'B.H.T. COLLECTIONS';
  
  return (
    <article className="flex flex-col bg-white border border-border/80 shadow-sm overflow-hidden h-full p-4 md:p-5">
      {/* Image Section */}
      <div className="relative aspect-[4/3] md:aspect-[5/4] w-full bg-linen overflow-hidden group mb-5">
        <Link href={`/collections/${product.categorySlug}/${product.slug}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`}></Link>
        <Image
          src={product.image || '/editorial/home-textiles.png'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-white px-3 py-1.5 z-20 shadow-sm pointer-events-none rounded-[2px]">
          <span className="font-sans font-bold text-[10px] md:text-[11px] tracking-widest text-ink">
            {badgeText}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow">
        <Link href={`/collections/${product.categorySlug}/${product.slug}`} className="hover:text-red transition-colors block mb-2">
          <h3 className="font-sans font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-tight text-ink uppercase">
            {product.name}
          </h3>
        </Link>
      </div>

      {/* Footer Actions (Price & View Button side by side) */}
      <div className="flex justify-between items-center border-t border-border/60 pt-4 mt-auto">
        <div className="font-sans font-bold text-[14px] md:text-[16px] text-ink">
          {product.price ? `${product.price} AED` : 'From 56 AED'}
        </div>
        
        <Link 
          href={`/collections/${product.categorySlug}/${product.slug}`} 
          className="inline-flex items-center justify-center border border-ink text-ink bg-transparent font-sans text-[11px] md:text-[12px] font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-[3px] hover:bg-red-900 hover:border-red-900 hover:text-white transition-colors duration-300"
        >
          View
        </Link>
      </div>
    </article>
  );
}
