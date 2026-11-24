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
const testState = { language: 'en', regions: [{ code: 'ae', name: 'United Arab Emirates', isActive: true }, { code: 'sa', name: 'Saudi Arabia', isActive: true }] };
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
    if (id === 'next/headers') return { cookies: async () => ({ get: () => ({ value: testState.language }) }) };
    if (id === '@/lib/services/region.service') return { RegionService: {
      getRegions: async () => testState.regions,
      getRegionByCode: async code => testState.regions.find(region => region.code === code) || null,
    } };
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

test('country-only URLs have correct regional tags and no language-prefix variants', () => {
  const locales = load('lib/seo/locales.ts');
  for (const code of ['ae', 'sa', 'qa', 'kw', 'bh', 'om']) {
    assert.equal(locales.parseStoreLocale(code).market, code);
    assert.equal(locales.parseStoreLocale(code).hreflang, `en-${code.toUpperCase()}`);
  }
  assert.equal(locales.parseStoreLocale('en').market, null);
  for (const code of ['ar', 'en-sa', 'ar-sa', 'us', 'constructor']) assert.equal(locales.parseStoreLocale(code), null);
  assert.deepEqual(locales.marketAlternates('/sa/bedding', ['sa', 'qa', 'xx']), {
    en: '/en/bedding', 'en-SA': '/sa/bedding', 'en-QA': '/qa/bedding', 'x-default': '/en/bedding',
  });
});

test('regional SEO uses active database markets, local copy and unchanged product currency', async () => {
  const original = testState.regions;
  try {
    testState.regions = ['ae', 'sa', 'qa', 'kw', 'bh', 'om'].map(code => ({ code, isActive: code !== 'om' }));
    const { constructRegionalMetadata } = load('lib/seo/regional-metadata.ts');
    const result = await constructRegionalMetadata({ path: '/sa/bedding', title: 'Bedding' });
    assert.match(result.title.absolute, /Saudi Arabia/);
    assert.match(result.description, /availability/);
    assert.equal(result.alternates.canonical, 'https://www.example.com/sa/bedding');
    assert.equal(result.alternates.languages['en-SA'], result.alternates.canonical);
    assert.equal(result.alternates.languages['en-OM'], undefined);
    assert.equal(result.alternates.languages.ar, undefined);
    const global = await constructRegionalMetadata({ path: '/en/bedding', title: 'Bedding' });
    assert.deepEqual(global.alternates.languages, result.alternates.languages);
    const product = schema.generateProductSchema({ name: 'Blanket', slug: 'blue', image: '/a.png', categorySlug: 'bedding', price: 10 }, 'sa');
    assert.equal(product.offers.priceCurrency, 'AED');
    assert.equal(product.offers.price, 10);
  } finally { testState.regions = original; }
});

test('language switching refreshes the same market URL instead of navigating to another country', () => {
  const React = require('react');
  let refreshes = 0;
  const { LanguageProvider } = load('context/LanguageContext.tsx', {
    react: { ...React, useEffect: () => {} },
    'next/navigation': { useRouter: () => ({ refresh: () => refreshes++, push: () => { throw new Error('Language must not navigate'); } }) },
  });
  const oldWindow = globalThis.window;
  const oldDocument = globalThis.document;
  try {
    globalThis.window = { location: { pathname: '/sa/bedding', search: '?brand=test', hash: '#products' } };
    globalThis.document = { documentElement: {}, cookie: '' };
    const provider = LanguageProvider({ initialLanguage: 'en', children: null });
    provider.props.value.setLanguage('ar');
    assert.equal(globalThis.window.location.pathname, '/sa/bedding');
    assert.equal(globalThis.window.location.search, '?brand=test');
    assert.match(globalThis.document.cookie, /bht_language=ar/);
    assert.equal(refreshes, 1);
  } finally {
    if (oldWindow === undefined) delete globalThis.window; else globalThis.window = oldWindow;
    if (oldDocument === undefined) delete globalThis.document; else globalThis.document = oldDocument;
  }
});

test('search renders bounded published results, locale links, pagination and safe empty/error states', async () => {
  const { renderToStaticMarkup } = require('react-dom/server');
  const { createElement } = require('react');
  let calls = [];
  let fail = false;
  let empty = false;
  const route = load('app/[locale]/search/page.tsx', {
    '@/components/header/Navbar': { Navbar: () => null },
    '@/components/footer/Footer': { Footer: () => null },
    'next/image': ({ src, alt }) => createElement('img', { src, alt }),
    'next/link': ({ href, children }) => createElement('a', { href }, children),
    '@/lib/services/product.service': { ProductService: { getGridProducts: async options => {
      calls.push(options);
      if (fail) throw new Error('Test connection failure');
      if (empty) return [];
      return Array.from({ length: 25 }, (_, i) => ({ _id: String(i), name: `Blanket ${i}`, slug: `blanket-${i}`, categorySlug: 'bedding', image: '/a.jpg', price: 10, salePrice: 0, stock: 1 }));
    } } },
  });
  const props = (q, page = '1', locale = 'en') => ({ params: Promise.resolve({ locale }), searchParams: Promise.resolve({ q, page }) });
  testState.language = 'ar';
  let html = renderToStaticMarkup(await route.default(props('  blanket  ', '2', 'sa')));
  assert.equal(calls[0].status, 'published');
  assert.equal(calls[0].search, 'blanket');
  assert.equal(calls[0].limit, 25);
  assert.equal(calls[0].skip, 24);
  assert.match(html, /\/sa\/c=bedding\/blanket-0/);
  assert.doesNotMatch(html, /blanket-24/);
  assert.match(html, /page=3/);
  assert.match(html, /د.إ<!-- --> <!-- -->0|د.إ 0/);
  const meta = await route.generateMetadata(props('', '1', 'sa'));
  assert.equal(meta.robots.index, false);
  assert.equal(meta.robots.follow, true);
  assert.match(meta.alternates.canonical, /\/sa\/search$/);
  testState.language = 'en';
  calls = [];
  await route.default(props('   '));
  await route.default(props(['one', 'two']));
  assert.equal(calls.length, 0);
  await route.default(props('a'.repeat(200), '-3'));
  assert.equal(calls[0].search.length, 120);
  assert.equal(calls[0].skip, 0);
  await route.default(props('x', '99999999'));
  assert.equal(calls[1].skip, 99 * 24);
  empty = true;
  html = renderToStaticMarkup(await route.default(props('<script>alert(1)</script>')));
  assert.match(html, /No matching products/);
  assert.doesNotMatch(html, /<script>/);
  fail = true;
  const originalError = console.error;
  try {
    console.error = () => {};
    html = renderToStaticMarkup(await route.default(props('blanket')));
  } finally { console.error = originalError; }
  assert.match(html, /Results could not be loaded/);
  assert.doesNotMatch(html, /No matching products/);
});

test('search repository escapes regex characters and preserves published/category filters', async () => {
  let received;
  const query = { sort: () => query, skip: () => query, limit: () => query, select: () => query, lean: async () => [] };
  const { ProductRepository } = load('lib/repositories/product.repository.ts', {
    '@/lib/db/models/Brand': {},
    '@/lib/db/mongodb': { connectToDatabase: async () => {} },
    '@/lib/db/models/Product': { ProductModel: { find: filter => { received = filter; return query; } } },
  });
  await ProductRepository.findGrid({ status: 'published', categorySlug: 'bedding', search: 'a.*(b)' });
  assert.equal(received.status, 'published');
  assert.equal(received.$and[0].$or[0].categorySlug, 'bedding');
  assert.equal(received.$and[1].$or[0].name.$regex, 'a\\.\\*\\(b\\)');
});

test('typed auth wrapper preserves route context and permission/error responses', async () => {
  let session = null;
  const { withAuth } = load('lib/api/helpers.ts', {
    '@/lib/auth/auth': { auth: async () => session },
  });
  const { NextResponse } = require('next/server');
  const request = new Request('https://example.com/api/admin/brands/id');
  const context = { params: Promise.resolve({ id: 'brand-id' }) };
  let called = false;
  const handler = withAuth('brands:write', async (_request, ctx) => {
    called = true;
    return NextResponse.json({ id: (await ctx.params).id });
  });
  assert.equal((await handler(request, context)).status, 401);
  assert.equal(called, false);
  session = { user: { role: 'super_admin' } };
  assert.deepEqual(await (await handler(request, context)).json(), { id: 'brand-id' });
  const duplicate = withAuth('brands:write', async () => { throw { code: 11000, keyPattern: { slug: 1 } }; });
  assert.equal((await duplicate(request, context)).status, 409);
});
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
test('metadata uses explicit market alternatives and existing logo', () => {
  const result = metadata.constructMetadata({ title: 'Contact', path: '/sa/contact', languages: { en: 'https://www.example.com/en/contact', 'en-SA': 'https://www.example.com/sa/contact' } });
  assert.equal(result.alternates.canonical, 'https://www.example.com/sa/contact');
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
  const result = schema.generateProductSchema(product, 'sa');
  assert.equal(result.offers.url, 'https://www.example.com/sa/c=bedding/blanket');
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
  assert.ok(entries.some(e => e.url.endsWith('/en/c=bedding/blue')));
  assert.ok(entries.some(e => e.url.endsWith('/en/privacy')));
  assert.ok(entries.every(e => !/collections|hidden|disabled/.test(e.url)));
  assert.equal(new Set(entries.map(e => e.url)).size, entries.length);
});

test('localized links avoid redirect hops and preserve external links', () => {
  assert.equal(urls.localizePath('/about', 'sa'), '/sa/about');
  assert.equal(urls.localizePath('/collections?q=blue', 'en'), '/en/bedding?q=blue');
  assert.equal(urls.localizePath('/en/contact', 'sa'), '/en/contact');
  assert.equal(urls.localizePath('https://example.org', 'sa'), 'https://example.org');
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
  const proxy = load('proxy.ts', { '@/lib/auth/auth': { auth: () => async () => new Response(null, { status: 401 }) } }).default;
  const apex = await proxy(new NextRequest('https://example.com/ar/about?q=1'));
  assert.equal(apex.status, 308);
  assert.equal(apex.headers.get('location'), 'https://www.example.com/ar/about?q=1');
  const locale = await proxy(new NextRequest('https://www.example.com/about?q=1', { headers: { cookie: 'bht_language=ar' } }));
  assert.equal(locale.headers.get('location'), 'https://www.example.com/en/about?q=1');
  const page = await proxy(new NextRequest('https://www.example.com/sa/about'));
  assert.equal(page.headers.get('x-middleware-request-x-bht-locale'), 'sa');
  const legacy = await proxy(new NextRequest('https://www.example.com/ar/about?q=1'));
  assert.equal(legacy.headers.get('location'), 'https://www.example.com/en/about?q=1');
  assert.match(legacy.headers.get('set-cookie'), /bht_language=ar/);
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

test('all informational pages have unique self-canonicals for separate markets', async () => {
  const mocks = {
    '@/components/about/AboutPageView': {}, '@/components/brands/BrandClientPageView': {},
    '@/components/contact/ContactPageView': {}, '@/components/header/Navbar': {}, '@/components/footer/Footer': {},
  };
  const canonicalUrls = [];
  for (const slug of ['about', 'brands', 'contact', 'privacy', 'terms', 'refund-policy']) {
    const route = load(`app/[locale]/${slug}/page.tsx`, mocks);
    for (const locale of ['en', 'sa']) {
      const result = await route.generateMetadata({ params: Promise.resolve({ locale }) });
      assert.equal(result.alternates.canonical, `https://www.example.com/${locale}/${slug}`);
      canonicalUrls.push(result.alternates.canonical);
    }
  }
  assert.equal(new Set(canonicalUrls).size, 12);
});

test('legal pages render Arabic copy and metadata while preserving English and contact links', async () => {
  const { renderToStaticMarkup } = require('react-dom/server');
  for (const slug of ['privacy', 'terms', 'refund-policy']) {
    const route = load(`app/[locale]/${slug}/page.tsx`, {
      '@/components/header/Navbar': { Navbar: () => null },
      '@/components/footer/Footer': { Footer: () => null },
    });
    for (const locale of ['en', 'ar']) {
      testState.language = locale;
      const props = { params: Promise.resolve({ locale: 'sa' }) };
      const html = renderToStaticMarkup(await route.default(props));
      const heading = html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1];
      assert.equal(/[\u0600-\u06ff]/.test(heading), locale === 'ar');
      assert.equal((html.match(/<h2/g) || []).length, 5);
      assert.match(html, /href="mailto:info@blankethouse.ae"/);
      const meta = await route.generateMetadata(props);
      assert.equal(/[\u0600-\u06ff]/.test(meta.title.absolute), locale === 'ar');
    }
  }
  testState.language = 'en';
});
