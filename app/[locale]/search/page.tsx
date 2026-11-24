import { getRequestLanguage } from "@/lib/seo/request-language";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ProductService } from "@/lib/services/product.service";
import { constructRegionalMetadata as constructMetadata } from "@/lib/seo/regional-metadata";
import { getProductPath } from "@/lib/seo/urls";

type SearchProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
};

const PAGE_SIZE = 24;

export async function generateMetadata({ params }: SearchProps) {
  const { locale } = await params;
  return {
    ...await constructMetadata({
      title: (await getRequestLanguage()) === "ar" ? "البحث عن المنتجات" : "Search products",
      path: `/${locale}/search`,
      noIndex: true,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ params, searchParams }: SearchProps) {
  const [{ locale }, search] = await Promise.all([params, searchParams]);
  const ar = (await getRequestLanguage()) === "ar";
  const query = typeof search.q === "string" ? search.q.trim().slice(0, 120) : "";
  const requestedPage = typeof search.page === "string" ? Number(search.page) : 1;
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, 100) : 1;
  let products: Awaited<ReturnType<typeof ProductService.getGridProducts>> = [];
  let failed = false;
  if (query) {
    try {
      products = await ProductService.getGridProducts({
        status: "published", search: query,
        skip: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE + 1,
        select: "name slug categorySlug price salePrice originalPrice image stock",
      });
    } catch (error) {
      console.error("Product search failed", error);
      failed = true;
    }
  }
  const hasNext = products.length > PAGE_SIZE && page < 100;
  const pageHref = (number: number) => `/${locale}/search?${new URLSearchParams({ q: query, page: String(number) })}`;

  return <>
    <Navbar />
    <main className="bht-section min-h-[60vh] bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-bht-charcoal mb-6">{ar ? "البحث عن المنتجات" : "Search products"}</h1>
        <form action={`/${locale}/search`} method="get" role="search" className="flex gap-3 max-w-2xl mb-8">
          <label htmlFor="product-search" className="sr-only">{ar ? "اسم المنتج أو وصفه" : "Product name or description"}</label>
          <input key={query} id="product-search" name="q" defaultValue={query} maxLength={120} type="search"
            placeholder={ar ? "ابحث عن منتج..." : "Search for a product..."}
            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3" />
          <button type="submit" className="rounded-xl bg-bht-charcoal text-white px-6 py-3 font-semibold">{ar ? "بحث" : "Search"}</button>
        </form>
        {query && <p className="mb-6 text-bht-slate">{ar ? "نتائج البحث عن:" : "Results for:"} <bdi>{query}</bdi></p>}
        {failed ? <p role="alert">{ar ? "تعذر تحميل النتائج. يرجى المحاولة مرة أخرى." : "Results could not be loaded. Please try again."}</p>
          : !query ? <p>{ar ? "أدخل اسم المنتج أو وصفه للبحث." : "Enter a product name or description to search."}</p>
          : products.length === 0 ? <p>{ar ? "لا توجد منتجات مطابقة. جرّب كلمات أخرى أو ارجع إلى الصفحة السابقة." : "No matching products on this page. Try another search or return to the previous page."}</p>
          : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, PAGE_SIZE).map(product => <Link key={product._id} href={getProductPath(product, locale)}
              className="group bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-[#F7F7F7]">
                <Image src={product.image || "/logo/logo.png"} alt={product.name} fill sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw" className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="font-bold text-sm line-clamp-2 mb-2">{product.name}</h2>
                <p className="font-bold">{ar ? "د.إ" : "AED"} {product.salePrice ?? product.price}</p>
                <p className="text-xs mt-2 text-bht-slate">{product.stock > 0 ? (ar ? "متوفر" : "In stock") : (ar ? "غير متوفر حالياً" : "Out of stock")}</p>
              </div>
            </Link>)}
          </div>}
        {query && !failed && (page > 1 || hasNext) && <nav aria-label={ar ? "صفحات النتائج" : "Search result pages"} className="flex gap-6 mt-8">
          {page > 1 && <Link href={pageHref(page - 1)}>{ar ? "السابق" : "Previous"}</Link>}
          <span>{ar ? "الصفحة" : "Page"} {page}</span>
          {hasNext && <Link href={pageHref(page + 1)}>{ar ? "التالي" : "Next"}</Link>}
        </nav>}
      </div>
    </main>
    <Footer />
  </>;
}
