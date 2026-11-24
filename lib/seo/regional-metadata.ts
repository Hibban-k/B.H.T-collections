import { RegionService } from "@/lib/services/region.service";
import { constructMetadata, type MetadataInput } from "./metadata";
import { getAbsoluteUrl } from "./urls";
import { isStoreMarket, marketAlternates, MARKETS, parseStoreLocale } from "./locales";
import { getRegionalCopy } from "./regional-content";
import { getRequestLanguage } from "./request-language";

export async function constructRegionalMetadata(input: MetadataInput) {
  const path = input.path || "/en";
  const [, locale, ...parts] = path.split("/");
  const parsed = parseStoreLocale(locale);
  const language = await getRequestLanguage();
  // Only advertise active, routable country versions; no cookie-only Arabic alternates.
  const regions = await RegionService.getRegions().catch(() => []);
  const markets = regions.filter(r => r.isActive && isStoreMarket(r.code)).map(r => r.code);
  const languages = Object.fromEntries(Object.entries(marketAlternates(path, markets))
    .map(([key, value]) => [key, getAbsoluteUrl(value)]));
  const copy = getRegionalCopy(locale, parts.join("/"), language);
  let title = copy?.title || input.title;
  let description = copy?.description || input.description;
  const region = regions.find(r => r.code === parsed?.market);
  // Existing admin regional templates customize the landing page, not every product.
  if (region && parts.length === 0 && language === "en") {
    const name = MARKETS[region.code as keyof typeof MARKETS]?.en || region.name;
    if (region.metaTitleSuffix) title = `BHT Collections ${region.metaTitleSuffix.replaceAll("{{region_name}}", name)}`;
    if (region.metaDescriptionTemplate) description = region.metaDescriptionTemplate.replaceAll("{{region_name}}", name);
  }
  return constructMetadata({ ...input, title, description, languages: input.noIndex ? undefined : languages });
}
