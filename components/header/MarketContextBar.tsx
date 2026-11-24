"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MARKETS, parseStoreLocale } from "@/lib/seo/locales";
import { getRegionalCopy } from "@/lib/seo/regional-content";
import { REGIONAL_CONTACTS } from "@/data/regionalContacts";

export function MarketContextBar() {
  const { language, availableMarkets } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [, locale, ...parts] = pathname.split("/");
  const market = parseStoreLocale(locale)?.market;
  const contact = market ? REGIONAL_CONTACTS.find(c => c.id === MARKETS[market].contactId) : undefined;
  const copy = getRegionalCopy(locale, parts.join("/"), language);
  const ar = language === "ar";
  return <aside aria-label={ar ? "السوق الإقليمي" : "Regional market"} className="border-b border-neutral-200 bg-[#FAF8F5]">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-2">
        <label htmlFor="store-market">{ar ? "البلد" : "Market"}</label>
        <select id="store-market" value={market || "en"} className="bg-white border border-neutral-300 rounded-lg px-3 py-2 max-w-56"
          onChange={event => {
            const country = event.target.value;
            if (country !== "en" && !availableMarkets.some(code => code === country)) return;
            const target = new URL(window.location.href);
            target.pathname = `/${country}${pathname.slice(locale.length + 1)}`;
            if (parts[0] === "contact") {
              target.searchParams.delete("region");
              target.hash = "store-location";
            }
            router.push(target.pathname + target.search + target.hash);
          }}>
          <option value="en">{ar ? "دولي" : "International"}</option>
          {availableMarkets.map(code => <option key={code} value={code}>{MARKETS[code][language]}</option>)}
        </select>
      </div>
      {contact && <Link href={`/${locale}/contact?region=${contact.id}#store-location`} className="font-semibold text-bht-charcoal hover:underline">
        {ar ? contact.nameAr : contact.nameEn} · <bdi>{contact.phone}</bdi>
      </Link>}
      {copy && <div className="w-full text-neutral-600 leading-relaxed">
        <p className="font-semibold text-bht-charcoal">{copy.heading}</p>
        <p>{copy.description}</p>
        {contact && <p className="text-xs mt-1">{ar ? contact.addressAr || contact.addressEn : contact.addressEn}</p>}
      </div>}
    </div>
  </aside>;
}
