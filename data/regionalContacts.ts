export interface RegionalContact {
  id: string;
  nameEn: string;
  nameAr: string;
  flag: "uae" | "ksa" | "qatar" | "bahrain" | "kuwait" | "oman";
  companyNameEn?: string;
  companyNameAr?: string;
  image?: string;
  imageAlt?: string;
  addressEn?: string;
  addressAr?: string;
  phone?: string;
  mobile?: string;
  whatsapp?: string;
  email?: string;
  contactPerson?: string;
  crNumber?: string;
  hoursEn?: string;
  hoursAr?: string;
  mapUrl?: string;
  usesDubaiTeam?: boolean;
}

// Regional office branch details sourced directly from official corporate profile
export const REGIONAL_CONTACTS: RegionalContact[] = [
  {
    id: "uae",
    nameEn: "United Arab Emirates (Dubai)",
    nameAr: "الإمارات العربية المتحدة (دبي)",
    flag: "uae",
    companyNameEn: "BLANKET HOUSE TRADING L.L.C.",
    companyNameAr: "شركة بيت البطانيات للتجارة ذ.م.م",
    image: "/contact/dubai-shop.png",
    imageAlt: "BHT Collections Dubai Flagship Office",
    addressEn: "Office No. 204, Bldg No. R146 WASL, Same Bldg as Gulf Optics, Baniyas Square, Deira, Dubai, U.A.E.",
    addressAr: "مكتب رقم 204، مبنى وصل رقم R146، نفس مبنى نظارات الخليج، ميدان بني ياس، ديرة، دبي، الإمارات العربية المتحدة",
    contactPerson: "Corporate Sales Team",
    phone: "+971 4 2266 095",
    mobile: "+971 55 887 9237",
    whatsapp: "+971 55 887 9237",
    email: "bhtrdg@eim.ae",
    hoursEn: "Sat – Thu: 9:00 AM – 1:30 PM & 4:30 PM – 9:00 PM",
    hoursAr: "السبت – الخميس: 9:00 ص – 1:30 م و 4:30 م – 9:00 م",
    mapUrl: "https://maps.google.com/?q=Baniyas+Square+Deira+Dubai+Blanket+House+Trading",
    usesDubaiTeam: false,
  },
  {
    id: "saudi",
    nameEn: "Saudi Arabia (Dammam)",
    nameAr: "المملكة العربية السعودية (الدمام)",
    flag: "ksa",
    companyNameEn: "MUBARAK ZAIDAN SHAMRI TRADING CO.",
    companyNameAr: "شركة مبارك زيدان الشمري للتجارة",
    image: "/contact/damam-shop.png",
    imageAlt: "BHT Collections Dammam Regional Office",
    addressEn: "8190, Yazid Bin Malik Street, Al Khalidiyah Ash Shamaliya Dist. – 32231, Dammam, K.S.A.",
    addressAr: "8190، شارع يزيد بن مالك، حي الخالدية الشمالية – 32231، الدمام، المملكة العربية السعودية",
    contactPerson: "MUHAMMED",
    phone: "+966 5949 46120",
    mobile: "+966 5949 46120",
    whatsapp: "+966 5949 46120",
    email: "mtedmm@gmail.com",
    mapUrl: "https://maps.google.com/?q=8190+Yazid+Bin+Malik+Street+Al+Khalidiyah+Ash+Shamaliya+Dammam",
    usesDubaiTeam: false,
  },
  {
    id: "qatar",
    nameEn: "Qatar (Doha)",
    nameAr: "دولة قطر (الدوحة)",
    flag: "qatar",
    companyNameEn: "NEW BLANKET HOUSE TRADING W.L.L.",
    companyNameAr: "شركة بيت البطانيات الجديد للتجارة ذ.م.م",
    image: "/contact/qatar-shop.png",
    imageAlt: "BHT Collections Qatar Regional Office",
    addressEn: "Shop No. 57, Souq Al Harraj, Najma, Doha, Qatar",
    addressAr: "محل رقم 57، سوق الحراج، النجمة، الدوحة، قطر",
    contactPerson: "Mr. Esam Ahmed",
    phone: "+974 5080 8644",
    mobile: "+974 5080 8644",
    whatsapp: "+974 5080 8644",
    email: "bhtrdg@eim.ae",
    crNumber: "CR No.: 137721L | Code: L31050",
    mapUrl: "https://maps.google.com/?q=Souq+Al+Harraj+Najma+Doha+Qatar",
    usesDubaiTeam: false,
  },
  {
    id: "bahrain",
    nameEn: "Bahrain (Manama)",
    nameAr: "مملكة البحرين (المنامة)",
    flag: "bahrain",
    companyNameEn: "BLANKETS HOUSE FOR TRADING W.L.L.",
    companyNameAr: "شركة بيت البطانيات للتجارة ذ.م.م",
    image: "/contact/bahrain-shop.png",
    imageAlt: "BHT Collections Bahrain Regional Office",
    addressEn: "Shop No. 0, Bldg. No. A0093, Road No. 356, Block No. 302, P.O. Box 3250, Manama, Bahrain",
    addressAr: "محل رقم 0، مبنى رقم A0093، طريق رقم 356، مجمع رقم 302، ص.ب 3250، المنامة، البحرين",
    contactPerson: "Mr. Syed Maazen",
    phone: "+973 3802 7070",
    mobile: "+973 3802 7070",
    whatsapp: "+973 3802 7070",
    email: "mazeens@gmail.com",
    crNumber: "C.R. No.: 134877-1",
    mapUrl: "https://maps.google.com/?q=Manama+Bahrain+Blankets+House+For+Trading",
    usesDubaiTeam: false,
  },
  {
    id: "kuwait",
    nameEn: "Kuwait (Kuwait City)",
    nameAr: "دولة الكويت (مدينة الكويت)",
    flag: "kuwait",
    companyNameEn: "Al Nakhlah Jewellery Co.",
    companyNameAr: "شركة النخلة للمجوهرات والتجارة",
    image: "/contact/kuwait-shop.png",
    imageAlt: "BHT Collections Kuwait Regional Office",
    addressEn: "Souk Al Kuwait, Shop No. 35, Oman Street, Mubarakiyya, Kuwait City, Kuwait - P.O. Box: 22840",
    addressAr: "سوق الكويت، محل رقم 35، شارع عمان، المباركية، مدينة الكويت، الكويت - ص.ب: 22840",
    contactPerson: "Mohammed Hashim",
    phone: "+965 9962 7819",
    mobile: "+965 9962 7819",
    whatsapp: "+965 9962 7819",
    email: "bhtrdg@eim.ae",
    mapUrl: "https://maps.google.com/?q=Souq+Al+Kuwait+Mubarakiyya+Kuwait+City",
    usesDubaiTeam: false,
  },
  {
    id: "oman",
    nameEn: "Oman (Muscat)",
    nameAr: "سلطنة عمان (مسقط)",
    flag: "oman",
    companyNameEn: "BLANKET HOUSESHINING MEDAL GLOBAL CO. LLC",
    companyNameAr: "شركة ميدالية لمعان بيت البطانيات العالمية ش.م.م",
    image: "/contact/oman-shop.png",
    imageAlt: "BHT Collections Oman Regional Office",
    addressEn: "Opposite Makkah Centre, Next to Bank Saderat Iran, Ruwi High Street, Muscat, Oman",
    addressAr: "مقابل مركز مكة، بجوار بنك صادرات إيران، شارع روي التجاري، مسقط، سلطنة عمان",
    contactPerson: "Mr. Arshad",
    phone: "+968 2478 9774",
    mobile: "+968 9212 4669",
    whatsapp: "+968 9212 4669",
    email: "bhtrdg@eim.ae",
    mapUrl: "https://maps.google.com/?q=Ruwi+High+Street+Muscat+Oman",
    usesDubaiTeam: false,
  },
];
