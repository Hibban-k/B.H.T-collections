import { constructRegionalMetadata as constructMetadata } from "@/lib/seo/regional-metadata";
import { AboutPageView } from "@/components/about/AboutPageView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return constructMetadata({
    path: `/${locale}/about`,
  title: "About Us | BHT Collections — Blanket House Trading LLC Dubai",
  description:
    "Discover the story of BHT Collections (Blanket House Trading LLC): from our humble founding father's textile heritage in historic Dubai to our modern flagship presence across the UAE and GCC.",
  });
}

export default function AboutPage() {
  return <AboutPageView />;
}
