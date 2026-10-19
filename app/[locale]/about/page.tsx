import { Metadata } from "next";
import { AboutPageView } from "@/components/about/AboutPageView";

export const metadata: Metadata = {
  title: "About Us | BHT Collections — Blanket House Trading LLC Dubai",
  description:
    "Discover the story of BHT Collections (Blanket House Trading LLC): from our humble founding father's textile heritage in historic Dubai to our modern flagship presence across the UAE and GCC.",
};

export default function AboutPage() {
  return <AboutPageView />;
}
