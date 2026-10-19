import { Metadata } from "next";
import { ContactPageView } from "@/components/contact/ContactPageView";

export const metadata: Metadata = {
  title: "Contact Us | BHT Collections — Blanket House Trading LLC Dubai",
  description:
    "Get in touch with BHT Collections (Blanket House Trading LLC). Visit our Dubai flagship outlet or contact us for wholesale, distribution, and retail inquiries.",
};

export default function ContactPage() {
  return <ContactPageView />;
}
