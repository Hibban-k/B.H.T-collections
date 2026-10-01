import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use product.category as the badge, default to B.H.T. Collections
  const badgeText = product.category ? product.category.toUpperCase() : 'B.H.T. COLLECTIONS';
  
  // Format materials or sizes for the specs table
  const materialSpec = product.materials && product.materials.length > 0 
    ? product.materials.join(', ') 
    : 'Premium Materials';
    
  const sizeSpec = product.sizes && product.sizes.length > 0 
    ? product.sizes.join(', ') 
    : 'Multiple Options Available';

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
        <div className="absolute top-3 left-3 bg-white px-3 py-1.5 z-20 shadow-sm pointer-events-none">
          <span className="font-sans font-bold text-[10px] md:text-[11px] tracking-widest text-ink">
            {badgeText}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow">
        <Link href={`/collections/${product.categorySlug}/${product.slug}`} className="hover:text-red transition-colors block mb-3">
          <h3 className="font-sans font-bold text-[18px] md:text-[20px] lg:text-[22px] leading-tight text-ink uppercase">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-[13px] md:text-[14px] text-body mb-6 flex-grow">
          {product.shortDescription || (product.description ? product.description.substring(0, 80) + '...' : '')}
        </p>

        {/* Specs Table */}
        <div className="border-t border-border/60 pt-4 pb-1 mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="font-sans text-[12px] md:text-[13px] text-body">Material:</span>
            <span className="font-sans font-semibold text-[12px] md:text-[13px] text-ink text-right max-w-[70%] truncate">{materialSpec}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-sans text-[12px] md:text-[13px] text-body">Options:</span>
            <span className="font-sans font-semibold text-[12px] md:text-[13px] text-ink text-right max-w-[70%] truncate">{sizeSpec}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center border-t border-border/60 pt-5 mt-3">
        <Link 
          href={`/collections/${product.categorySlug}/${product.slug}`} 
          className="inline-flex items-center gap-2 font-sans font-bold text-[11px] md:text-[12px] tracking-wider text-ink hover:text-red transition-colors uppercase"
        >
          <svg className="w-[15px] h-[15px] text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Specs
        </Link>
        
        <Link 
          href={`/contact?context=${encodeURIComponent('Sample Request: ' + product.name)}`}
          className="inline-flex items-center justify-center bg-ink text-white font-sans font-bold text-[10px] md:text-[11px] tracking-widest uppercase px-4 py-2.5 rounded-[2px] hover:bg-black transition-colors"
        >
          Sample Request
        </Link>
      </div>
    </article>
  );
}
