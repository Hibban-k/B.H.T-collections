// Run with node --test scripts/seo-regression.mjs. No database/network writes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function load(file, mocks = {}, cache = new Map()) {
  const filename = path.resolve(root, file);
  if (cache.has(filename)) return cache.get(filename).exports;
  const compiledModule = { exports: {} };
  cache.set(filename, compiledModule);
  const js = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const localRequire = id => {
    if (id in mocks) return mocks[id];
    if (id.startsWith('.') || id.startsWith('@/')) {
      const target = id.startsWith('@/') ? path.join(root, id.slice(2)) : path.resolve(path.dirname(filename), id);
      return load(target + '.ts', mocks, cache);
    }
    return require(id);
  };
  new Function('require', 'module', 'exports', js)(localRequire, compiledModule, compiledModule.exports);
  return compiledModule.exports;
}
const urls = load('lib/seo/urls.ts');
const seo = load('lib/seo/product.ts');
const schema = load('lib/seo/schema.ts');
const metadata = load('lib/seo/metadata.ts');
process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';

test('canonical origin and absolute remote images', () => {
  assert.equal(urls.getBaseUrl(), 'https://www.example.com');
  assert.equal(urls.getAbsoluteUrl('/en/about'), 'https://www.example.com/en/about');
  assert.equal(urls.getAbsoluteUrl('https://cdn.example.com/image.jpg'), 'https://cdn.example.com/image.jpg');
});
test('confirmed production default is blankethouse.ae', () => {
  const originalSite = process.env.NEXT_PUBLIC_SITE_URL;
  const originalApp = process.env.NEXT_PUBLIC_APP_URL;
  delete process.env.NEXT_PUBLIC_SITE_URL;
  delete process.env.NEXT_PUBLIC_APP_URL;
  assert.equal(urls.getBaseUrl(), 'https://www.blankethouse.ae');
  assert.equal(urls.getCanonicalRedirect('https://blankethouse.ae/en/about?q=1'), 'https://www.blankethouse.ae/en/about?q=1');
  assert.equal(urls.getCanonicalRedirect('http://www.blankethouse.ae/en/about'), 'https://www.blankethouse.ae/en/about');
  if (originalSite !== undefined) process.env.NEXT_PUBLIC_SITE_URL = originalSite;
  if (originalApp !== undefined) process.env.NEXT_PUBLIC_APP_URL = originalApp;
});
test('apex redirect preserves query and never loops or redirects auth/preview/local', () => {
  assert.equal(urls.getCanonicalRedirect('http://example.com/en/a?q=1'), 'https://www.example.com/en/a?q=1');
  for (const url of ['https://www.example.com/en', 'http://localhost:3000/en', 'https://preview.vercel.app/en', 'https://example.com/api/auth/callback', 'https://example.com/admin']) assert.equal(urls.getCanonicalRedirect(url), null);
});
test('metadata uses the page canonical, both languages and existing logo', () => {
  const result = metadata.constructMetadata({ title: 'Contact', path: '/ar/contact' });
  assert.equal(result.alternates.canonical, 'https://www.example.com/ar/contact');
  assert.equal(result.alternates.languages.en, 'https://www.example.com/en/contact');
  assert.equal(result.openGraph.images[0].url, 'https://www.example.com/logo/logo.png');
  assert.equal(result.title.absolute, 'Contact');
});
test('automatic copy extracts facts and preserves overrides', () => {
  const result = seo.generateProductSeo({ name: 'Blue blanket', description: '<p>Size 220 x 240 cm.</p>' });
  assert.match(result.metaDescription, /220 x 240/);
  assert.doesNotMatch(result.metaDescription, /luxury|premium|certified|<p>/i);
  assert.deepEqual(result.keywords, ['Blue blanket']);
  assert.equal(seo.generateProductSeo({ name: 'New', metaTitle: 'Custom' }).metaTitle, 'Custom');
  assert.ok(seo.generateProductSeo({ name: 'Item', description: 'Facts '.repeat(80) }).metaDescription.length <= 160);
  assert.equal(seo.productSlug(' بطانية زرقاء '), 'بطانية-زرقاء');
});
test('schema has canonical offers, remote images, zero sale prices and no invented ratings', () => {
  const product = { name: 'Blanket', slug: 'blanket', categorySlug: 'bedding', image: 'https://cdn.example.com/a.jpg', price: 10, salePrice: 0, stock: 0, rating: 5, reviewCount: 12 };
  const result = schema.generateProductSchema(product, 'ar');
  assert.equal(result.offers.url, 'https://www.example.com/ar/c=bedding/blanket');
  assert.equal(result.offers.price, 0);
  assert.equal(result.image[0], product.image);
  assert.equal(result.aggregateRating, undefined);
  assert.equal(result.brand, undefined);
  assert.equal(result.offers.availability, 'https://schema.org/OutOfStock');
});
test('JSON-LD escapes script injection without corrupting data', () => {
  const input = { name: '</script><script>alert(1)</script>' };
  const output = schema.serializeJsonLd(input);
  assert.ok(!output.includes('<'));
  assert.deepEqual(JSON.parse(output), input);
});
test('product writes generate SEO, refresh derived copy, preserve custom copy and slug', async () => {
  let current = { _id: 'id', name: 'Old blanket', slug: 'old-blanket', description: 'Blue cotton', price: 25, status: 'published' };
  let saved;
  const repository = { findById: async () => current, findByName: async () => null,
    findBySlug: async () => null, create: async data => data,
    update: async (_id, data) => { saved = data; return { ...current, ...data }; } };
  const { ProductService, getPublishedProduct } = load('lib/services/product.service.ts', {
    '@/lib/repositories/product.repository': { ProductRepository: repository },
    '@/lib/repositories/brand.repository': { BrandRepository: {} },
    react: { cache: fn => fn },
  });
  const created = await ProductService.createProduct({ name: 'Blue blanket', description: 'Cotton', price: 25, image: '/a.jpg' });
  assert.equal(created.slug, 'blue-blanket');
  assert.match(created.metaTitle, /Blue blanket/);
  current = { ...current, ...seo.generateProductSeo(current) };
  await ProductService.updateProduct('id', { name: 'New blanket', description: 'Red cotton' });
  assert.match(saved.metaTitle, /New blanket/);
  assert.match(saved.metaDescription, /Red cotton/);
  assert.equal(saved.slug, undefined);
  current.metaTitle = 'Editor title';
  await ProductService.updateProduct('id', { name: 'Another blanket' });
  assert.equal(saved.metaTitle, 'Editor title');
  repository.findBySlug = async () => ({ ...current, status: 'draft' });
  assert.equal(await getPublishedProduct('old-blanket'), null);
});
test('sitemap excludes redirects, inactive records and unpublished products', async () => {
  let filter;
  const sitemap = load('app/sitemap.ts', {
    '@/lib/services/product.service': { ProductService: { getProducts: async options => { filter = options; return [{ slug: 'blue', categorySlug: 'bedding', updatedAt: '2026-11-01' }]; } } },
    '@/lib/services/brand.service': { BrandService: { getBrands: async () => [{ slug: 'active', isActive: true }, { slug: 'hidden', isActive: false }] } },
    '@/lib/services/category.service': { CategoryService: { getCategories: async () => [{ slug: 'disabled', status: 'disabled' }] } },
    '@/lib/services/region.service': { RegionService: { getRegions: async () => [] } },
  }).default;
  const entries = await sitemap();
  assert.equal(filter.status, 'published');
  assert.ok(entries.some(e => e.url.endsWith('/ar/c=bedding/blue')));
  assert.ok(entries.some(e => e.url.endsWith('/en/privacy')));
  assert.ok(entries.every(e => !/collections|hidden|disabled/.test(e.url)));
  assert.equal(new Set(entries.map(e => e.url)).size, entries.length);
});

test('localized links avoid redirect hops and preserve external links', () => {
  assert.equal(urls.localizePath('/about', 'ar'), '/ar/about');
  assert.equal(urls.localizePath('/collections?q=blue', 'en'), '/en/bedding?q=blue');
  assert.equal(urls.localizePath('/en/contact', 'ar'), '/en/contact');
  assert.equal(urls.localizePath('https://example.org', 'ar'), 'https://example.org');
});

test('region endpoints reject anonymous requests before accessing the database', async () => {
  const mocks = {
    '@/lib/auth/auth': { auth: async () => null },
    '@/lib/services/region.service': { RegionService: {} },
    'next/cache': { revalidatePath: () => {} },
  };
  for (const file of ['app/api/admin/regions/route.ts', 'app/api/admin/regions/[id]/route.ts']) {
    const route = load(file, mocks);
    for (const method of ['GET', 'POST', 'PUT', 'DELETE']) {
      if (route[method]) {
        const response = await route[method](new Request('https://example.com/api/admin/regions'), { params: Promise.resolve({ id: 'unused' }) });
        assert.equal(response.status, 401);
      }
    }
  }
});

test('proxy preserves locale queries, sets document locale and leaves auth handling intact', async () => {
  const { NextRequest } = require('next/server');
  const proxy = load('proxy.ts', { '@/lib/auth/auth': { auth: async () => new Response(null, { status: 401 }) } }).default;
  const apex = await proxy(new NextRequest('https://example.com/ar/about?q=1'));
  assert.equal(apex.status, 308);
  assert.equal(apex.headers.get('location'), 'https://www.example.com/ar/about?q=1');
  const locale = await proxy(new NextRequest('https://www.example.com/about?q=1', { headers: { cookie: 'bht_language=ar' } }));
  assert.equal(locale.headers.get('location'), 'https://www.example.com/ar/about?q=1');
  const page = await proxy(new NextRequest('https://www.example.com/ar/about'));
  assert.equal(page.headers.get('x-middleware-request-x-bht-locale'), 'ar');
  assert.equal((await proxy(new NextRequest('https://www.example.com/admin'))).status, 401);
});

test('product route uses canonical metadata, rejects missing records and redirects wrong categories', async () => {
  let product = { name: 'Blue blanket', slug: 'blue', categorySlug: 'bedding', description: 'Cotton', image: '/a.jpg' };
  const route = load('app/[locale]/[category]/[slug]/page.tsx', {
    '@/components/product/ProductDetailView': { ProductDetailView: () => null },
    '@/lib/services/product.service': { getPublishedProduct: async () => product, ProductService: {} },
    'next/navigation': { notFound: () => { throw new Error('404'); }, permanentRedirect: path => { throw new Error('308 ' + path); } },
  });
  const props = { params: Promise.resolve({ locale: 'en', category: 'wrong', slug: 'blue' }) };
  assert.equal((await route.generateMetadata(props)).alternates.canonical, 'https://www.example.com/en/c=bedding/blue');
  await assert.rejects(route.default(props), /308 \/en\/c=bedding\/blue/);
  product = null;
  await assert.rejects(route.generateMetadata(props), /404/);
});

test('all informational pages have unique self-canonicals for both languages', async () => {
  const mocks = {
    '@/components/about/AboutPageView': {}, '@/components/brands/BrandClientPageView': {},
    '@/components/contact/ContactPageView': {}, '@/components/header/Navbar': {}, '@/components/footer/Footer': {},
  };
  const canonicalUrls = [];
  for (const slug of ['about', 'brands', 'contact', 'privacy', 'terms', 'refund-policy']) {
    const route = load(`app/[locale]/${slug}/page.tsx`, mocks);
    for (const locale of ['en', 'ar']) {
      const result = await route.generateMetadata({ params: Promise.resolve({ locale }) });
      assert.equal(result.alternates.canonical, `https://www.example.com/${locale}/${slug}`);
      canonicalUrls.push(result.alternates.canonical);
    }
  }
  assert.equal(new Set(canonicalUrls).size, 12);
});
