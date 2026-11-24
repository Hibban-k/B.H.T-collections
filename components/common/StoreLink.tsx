"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { localizePath } from "@/lib/seo/urls";

/** Keep storefront navigation on the current locale without a redirect hop. */
export default function StoreLink({ href, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  return <Link {...props} href={typeof href === "string" ? localizePath(href, locale) : href} />;
}
