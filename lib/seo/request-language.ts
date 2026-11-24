import { cookies } from "next/headers";
import type { StoreLanguage } from "./locales";

export async function getRequestLanguage(): Promise<StoreLanguage> {
  return (await cookies()).get("bht_language")?.value === "ar" ? "ar" : "en";
}
