'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import type { SerializedProduct } from '@/lib/repositories/product.repository';
import { collectionGroups, catalogueBrands, approvedProductBrands } from '@/lib/catalogue';

type Props = {
  products: SerializedProduct[];
  categories?: { slug: string; name: string; status: string }[];
  collectionName?: string;
};

export default function Catalogue({ products, categories, collectionName }: Props) {
  const query = useSearchParams();
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const group = query.get('group') || '';
  const brand = query.get('brand') || '';
  const sort = query.get('sort') === 'az' ? 'az' : 'featured';
  const activeGroup = collectionGroups.find(g => g.id === group);
  const selected = products.filter(p =>
    (!group || (activeGroup?.categories.includes(p.categorySlug) ?? false)) &&
    (!brand || approvedProductBrands[p.slug] === brand)
  ).sort((a, b) => sort === 'az' ? a.name.localeCompare(b.name) : Number(b.featured) - Number(a.featured));
  const pageCount = Math.max(1, Math.ceil(selected.length / 24));
  const requestedPage = Number(query.get('page') || 1);
  const page = Math.max(1, Math.min(pageCount, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1));
  const visible = selected.slice((page - 1) * 24, page * 24);

  function url(values: Record<string, string>) {
    const next = new URLSearchParams(query.toString());
    for (const [key,value] of Object.entries(values)) { if(value) next.set(key,value); else next.delete(key); }
    return pathname + (next.size ? '?' + next.toString() : '');
  }
  function change(values: Record<string, string>) { window.history.pushState(null, '', url({ ...values, page: '' })); }
  function filters(prefix: string) {
    return <>
      <label className="field-inline" htmlFor={`${prefix}-brand`}>Brand
        <select id={`${prefix}-brand`} value={brand} onChange={e => change({ brand: e.target.value })}>
          <option value="">All brands</option>
          {catalogueBrands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </label>
      <label className="field-inline" htmlFor={`${prefix}-sort`}>Sort by
        <select id={`${prefix}-sort`} value={sort} onChange={e => change({ sort: e.target.value })}>
          <option value="featured">Featured</option><option value="az">Name: A–Z</option>
        </select>
      </label>
    </>;
  }

  return <>
    {categories && <div className="category-nav"><nav className="wrap category-nav-inner" aria-label="Collection groups">
      <Link className={`category-tab ${!group ? 'active' : ''}`} href={url({group:'',page:''})} aria-current={!group ? 'page' : undefined}>All collections</Link>
      {collectionGroups.map((g,i) => <Link key={g.id} className={`category-tab ${group === g.id ? 'active' : ''}`} href={url({group:g.id,page:''})} aria-current={group === g.id ? 'page' : undefined}><small>0{i+1}</small>{g.name}</Link>)}
    </nav></div>}
    <section className="catalogue" aria-label={collectionName ? `${collectionName} products` : 'Product catalogue'}>
      <div className="wrap">
        {categories && <nav className="subcategories mb-8" aria-label="Collections">
          {categories.filter(c => c.status === 'active' && (!activeGroup || activeGroup.categories.includes(c.slug))).map(c => <Link key={c.slug} href={`/collections/${c.slug}`}>{c.name} <span aria-hidden="true">↗</span></Link>)}
        </nav>}
        <div className="catalogue-toolbar">
          <p className="result-count" aria-live="polite">{selected.length} selections{collectionName ? ` in ${collectionName}` : ''}</p>
          <div className="desktop-filters">{filters('catalogue')}</div>
          <button ref={trigger} className="btn outline mobile-filter-btn" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>Filters &amp; sort</button>
        </div>
        {(group || brand || sort !== 'featured') && <Link className="text-link mb-6" href={pathname} scroll={false}>Reset filters</Link>}
        <div className="product-grid">
          {visible.map(product => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
        {!selected.length && <div className="empty-state"><h2>No selections found.</h2><p>Try another filter, or speak to our team about the range you need.</p><Link href={pathname} className="btn outline">Reset filters</Link> <Link className="text-link" href={`/contact?context=${encodeURIComponent(catalogueBrands.find(b => b.id === brand)?.name || activeGroup?.name || collectionName || 'Collection enquiry')}`}>Enquire about this range</Link></div>}
        {pageCount > 1 && <nav className="pagination" aria-label="Catalogue pages">{Array.from({length:pageCount},(_,i) => <Link key={i} className="page-link" href={url({page:String(i+1)})} aria-current={page === i+1 ? 'page' : undefined} aria-label={`Page ${i+1}`}>{i+1}</Link>)}</nav>}
        <p className="section-footnote">Prices, specifications and availability are confirmed by enquiry.</p>
      </div>
    </section>
    <dialog className="filter-dialog" ref={dialog} aria-labelledby="filters-title" onClose={() => trigger.current?.focus()}>
      <div className="dialog-top"><h2 id="filters-title">Filters &amp; sort</h2><button className="icon-btn" aria-label="Close filters" onClick={() => dialog.current?.close()}>×</button></div>
      <div className="grid gap-6">{filters('mobile')}</div>
      <div className="dialog-actions mt-8"><Link className="text-link" href={pathname} scroll={false}>Reset filters</Link><button className="btn" onClick={() => dialog.current?.close()}>Show selections</button></div>
    </dialog>
  </>;
}
