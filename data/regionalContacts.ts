import { REGIONAL_PRESENCE_DATA } from "./regionalData";

export interface RegionalContact {
  id: string;
  nameEn: string;
  nameAr: string;
  flag: "uae" | "ksa" | "qatar" | "bahrain" | "kuwait" | "oman";
  image?: string;
  imageAlt?: string;
  addressEn?: string;
  addressAr?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  hoursEn?: string;
  hoursAr?: string;
  mapUrl?: string;
  usesDubaiTeam?: boolean;
}

// Shared Dubai sales contact until individual regional branch details are supplied.
export const REGIONAL_CONTACTS: RegionalContact[] = REGIONAL_PRESENCE_DATA.countries.map((country) => ({
  id: country.id,
  nameEn: country.id === "uae" ? "United Arab Emirates" : country.nameEn.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase()),
  nameAr: country.nameAr,
  flag: country.flagColors.type,
  usesDubaiTeam: country.id !== "uae",
    image: "/contact/dubai-flagship.jpg",
    imageAlt: "BHT Collections Dubai flagship showroom",
    addressEn: "Al Ras, Deira, Dubai, United Arab Emirates",
    addressAr: "الراس، ديرة، دبي، الإمارات العربية المتحدة",
    phone: "+971 4 226 6095",
    whatsapp: "+971 55 887 9237",
    email: "bhtrdg@eim.ae",
    mapUrl: "https://maps.google.com/?q=Dubai+UAE+Blanket+House+Trading",
}));
