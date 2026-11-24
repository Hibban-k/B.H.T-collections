import { constructMetadata } from "@/lib/seo/metadata";
import { ContactPageView } from "@/components/contact/ContactPageView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return constructMetadata({
    path: `/${locale}/contact`,
  title: "Contact Us | BHT Collections — Blanket House Trading LLC Dubai",
  description:
    "Get in touch with BHT Collections (Blanket House Trading LLC). Visit our Dubai flagship outlet or contact us for wholesale, distribution, and retail inquiries.",
  });
}

export default function ContactPage() {
  return <ContactPageView />;
}
