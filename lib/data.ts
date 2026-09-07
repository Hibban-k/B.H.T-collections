// lib/data.ts
import type { Product, Category, Review } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Blankets",
    slug: "blankets",
    description: "Premium multi-ply blankets for ultimate warmth and comfort",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    productCount: 8,
  },
  {
    id: "2",
    name: "Bed Linen",
    slug: "bed-linen",
    description: "Luxurious fitted and flat sheets for a perfect night's sleep",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    productCount: 6,
  },
  {
    id: "3",
    name: "Comforters",
    slug: "comforters",
    description: "Plush quilt and duvet sets for all-season comfort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    productCount: 5,
  },
  {
    id: "4",
    name: "Bedspreads",
    slug: "bedspreads",
    description: "Elegant bedspreads to transform your bedroom aesthetic",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80",
    productCount: 7,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "SMARTEX Two-Ply Premium Blanket",
    slug: "smartex-two-ply-premium-blanket",
    category: "Blankets",
    categorySlug: "blankets",
    price: 129,
    originalPrice: 175,
    rating: 4.8,
    reviewCount: 320,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85",
    ],
    description: "Experience unparalleled warmth with our SMARTEX Two-Ply Premium Blanket. Crafted from ultra-soft, high-quality fibres with a dual-layer construction that traps heat while remaining breathable. Perfect for UAE winters and air-conditioned rooms.",
    shortDescription: "Ultra-soft dual-layer blanket with superior warmth retention",
    sizes: ["Single", "Double", "King", "Super King"],
    colors: ["Ivory", "Charcoal", "Camel", "Navy"],
    materials: ["100% Premium Polyester", "Anti-pilling treatment", "Machine washable"],
    featured: true,
    bestseller: true,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Luxury Fitted Bed Sheet Set",
    slug: "luxury-fitted-bed-sheet-set",
    category: "Bed Linen",
    categorySlug: "bed-linen",
    price: 89,
    originalPrice: 120,
    rating: 4.7,
    reviewCount: 86,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=85",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85",
    ],
    description: "Wrap yourself in 400-thread-count luxury with our fitted bed sheet set. Includes one fitted sheet, one flat sheet, and two pillowcases. Cool-to-touch fabric keeps you comfortable all night.",
    shortDescription: "400-thread-count luxury bedding set with pillowcases",
    sizes: ["Single", "Double", "King", "Super King"],
    colors: ["White", "Ivory", "Stone", "Slate Blue"],
    materials: ["100% Egyptian Cotton", "400 Thread Count", "Sateen weave"],
    featured: true,
    bestseller: true,
    badge: "New",
    isNew: true,
  },
  {
    id: "3",
    name: "Quilt & Duvet Comforter Set",
    slug: "quilt-duvet-comforter-set",
    category: "Comforters",
    categorySlug: "comforters",
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviewCount: 72,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=800&q=85",
    ],
    description: "Our all-season Quilt & Duvet Comforter Set delivers the perfect balance of warmth and breathability. The microfibre fill is hypoallergenic and maintains its loft wash after wash.",
    shortDescription: "All-season hypoallergenic comforter with duvet cover",
    sizes: ["Double", "King", "Super King"],
    colors: ["White", "Cream", "Light Grey", "Dusty Rose"],
    materials: ["Microfibre fill", "Hypoallergenic", "Duvet cover included"],
    featured: true,
    bestseller: true,
  },
  {
    id: "4",
    name: "Premium Pillow Case Set (4-Pack)",
    slug: "premium-pillow-case-set",
    category: "Bed Linen",
    categorySlug: "bed-linen",
    price: 39,
    originalPrice: 55,
    rating: 4.6,
    reviewCount: 43,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=85",
    ],
    description: "Soft, smooth pillow cases with envelope closure for a tidy look. Made from high-quality microfibre that's gentle on skin and hair. Easy care — machine washable and quick-dry.",
    shortDescription: "Soft microfibre pillow cases with envelope closure, 4-pack",
    sizes: ["Standard", "King"],
    colors: ["White", "Ivory", "Blush", "Grey", "Navy"],
    materials: ["Microfibre", "Hypoallergenic", "Easy care"],
    bestseller: true,
  },
  {
    id: "5",
    name: "Luxury Bedspread Collection",
    slug: "luxury-bedspread-collection",
    category: "Bedspreads",
    categorySlug: "bedspreads",
    price: 119,
    originalPrice: 160,
    rating: 4.7,
    reviewCount: 39,
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=85",
    ],
    description: "Transform your bedroom with our Luxury Bedspread Collection. Features a stunning jacquard-woven pattern with a subtle sheen that adds an instant touch of elegance. Lightweight yet warm.",
    shortDescription: "Jacquard-woven luxury bedspread with elegant pattern",
    sizes: ["Single", "Double", "King", "Super King"],
    colors: ["Gold & Ivory", "Silver & White", "Burgundy & Gold", "Navy & Silver"],
    materials: ["Jacquard woven", "Polyester-cotton blend", "Dry clean recommended"],
    featured: true,
    badge: "Premium",
  },
  {
    id: "6",
    name: "SMARTEX Ultra-Soft Fleece Blanket",
    slug: "smartex-ultra-soft-fleece-blanket",
    category: "Blankets",
    categorySlug: "blankets",
    price: 79,
    originalPrice: 99,
    rating: 4.8,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=85",
    ],
    description: "Snuggle up in our SMARTEX Ultra-Soft Fleece Blanket. Made from premium coral fleece, this blanket is incredibly soft, lightweight, and perfect for everyday use. Great for sofas, travel, or as a bedroom layer.",
    shortDescription: "Coral fleece blanket — lightweight, ultra-soft, everyday comfort",
    sizes: ["Single", "Double", "King"],
    colors: ["Cream", "Sky Blue", "Blush Pink", "Camel", "Mint"],
    materials: ["Premium coral fleece", "Anti-static", "Machine washable"],
    bestseller: true,
    badge: "Best Seller",
  },
  {
    id: "7",
    name: "Hotel Collection Duvet Set",
    slug: "hotel-collection-duvet-set",
    category: "Comforters",
    categorySlug: "comforters",
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviewCount: 58,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=85",
    ],
    description: "Recreate the five-star hotel experience at home. Our Hotel Collection Duvet Set includes a 300-thread-count duvet cover with matching shams. The baffle-box construction keeps the filling evenly distributed.",
    shortDescription: "Five-star hotel quality duvet with shams — 300TC",
    sizes: ["Double", "King", "Super King"],
    colors: ["Pure White", "Ivory", "Soft Grey"],
    materials: ["300 Thread Count Cotton", "Baffle-box construction", "Premium fill"],
    featured: true,
    badge: "Premium",
    isNew: true,
  },
  {
    id: "8",
    name: "Classic Woven Bedspread",
    slug: "classic-woven-bedspread",
    category: "Bedspreads",
    categorySlug: "bedspreads",
    price: 89,
    originalPrice: 119,
    rating: 4.5,
    reviewCount: 61,
    image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=800&q=85",
    ],
    description: "Our Classic Woven Bedspread combines traditional craftsmanship with modern aesthetics. The herringbone weave adds texture and depth to any bedroom. Versatile enough for year-round use.",
    shortDescription: "Herringbone woven bedspread — timeless and versatile",
    sizes: ["Single", "Double", "King"],
    colors: ["Natural", "Charcoal", "Rust", "Sage"],
    materials: ["Cotton-acrylic blend", "Herringbone weave", "Machine washable"],
  },
  {
    id: "9",
    name: "SMARTEX Heavy Weight Blanket",
    slug: "smartex-heavy-weight-blanket",
    category: "Blankets",
    categorySlug: "blankets",
    price: 159,
    originalPrice: 210,
    rating: 4.9,
    reviewCount: 144,
    image: "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=800&q=85",
    ],
    description: "Our flagship SMARTEX Heavy Weight Blanket delivers deep, cozy warmth for even the coldest nights. Three-ply construction with premium thermal insulation — ideal for UAE winters and cold hotel rooms.",
    shortDescription: "Three-ply thermal blanket for maximum warmth",
    sizes: ["Single", "Double", "King", "Super King"],
    colors: ["Ivory", "Mocha", "Charcoal", "Burgundy"],
    materials: ["Three-ply premium polyester", "Thermal insulation layer", "Anti-pilling"],
    featured: true,
    badge: "New",
    isNew: true,
  },
  {
    id: "10",
    name: "Embroidered Luxury Bedspread",
    slug: "embroidered-luxury-bedspread",
    category: "Bedspreads",
    categorySlug: "bedspreads",
    price: 145,
    originalPrice: 195,
    rating: 4.8,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&q=85",
    ],
    description: "Make a statement with our Embroidered Luxury Bedspread. Intricate floral embroidery on a satin-finish base creates a look of opulence and sophistication. Perfect for master bedrooms and guest rooms.",
    shortDescription: "Floral embroidered bedspread with satin-finish base",
    sizes: ["Double", "King", "Super King"],
    colors: ["Gold on Ivory", "Silver on White", "Champagne on Blush"],
    materials: ["Satin-finish base", "Machine embroidery", "Dry clean recommended"],
    badge: "Premium",
  },
  {
    id: "11",
    name: "Cotton Rich Flat Sheet Set",
    slug: "cotton-rich-flat-sheet-set",
    category: "Bed Linen",
    categorySlug: "bed-linen",
    price: 65,
    originalPrice: 85,
    rating: 4.6,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1629949009765-5734ab20c81b?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1629949009765-5734ab20c81b?w=800&q=85",
    ],
    description: "Our Cotton Rich Flat Sheet Set gives you the luxurious feel of pure cotton at an accessible price. Crisp, cool, and breathable — ideal for hot UAE summers. Includes flat sheet and two standard pillowcases.",
    shortDescription: "Breathable cotton-rich flat sheet with pillowcases",
    sizes: ["Single", "Double", "King", "Super King"],
    colors: ["White", "Ivory", "Pale Blue", "Soft Pink", "Sage"],
    materials: ["60% Cotton, 40% Polyester", "Percale weave", "Easy iron"],
  },
  {
    id: "12",
    name: "Microfibre Comforter — All Seasons",
    slug: "microfibre-comforter-all-seasons",
    category: "Comforters",
    categorySlug: "comforters",
    price: 99,
    originalPrice: 135,
    rating: 4.7,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=85",
    ],
    description: "Our lightweight Microfibre Comforter is designed for the UAE climate — warm enough for cool nights, light enough to use year-round. The silky microfibre shell is smooth against the skin.",
    shortDescription: "Lightweight year-round comforter ideal for UAE climate",
    sizes: ["Single", "Double", "King"],
    colors: ["White", "Cream", "Light Grey"],
    materials: ["Microfibre shell", "Hollow fibre fill", "Machine washable"],
    bestseller: true,
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    name: "Fatima Al-Rashidi",
    location: "Dubai, UAE",
    rating: 5,
    comment: "The SMARTEX blanket is absolutely incredible. So soft and warm — perfect for our air-conditioned bedroom. Ordered two and will definitely be buying more!",
    date: "January 2025",
  },
  {
    id: "2",
    name: "Ahmed Hassan",
    location: "Abu Dhabi, UAE",
    rating: 5,
    comment: "Best bedding I've ever bought. The quality is on par with five-star hotels. Fast delivery too — arrived in two days. Highly recommended!",
    date: "February 2025",
  },
  {
    id: "3",
    name: "Sara Mohammed",
    location: "Sharjah, UAE",
    rating: 5,
    comment: "The luxury bedspread completely transformed our master bedroom. It looks so elegant and the quality is exceptional. Worth every dirham.",
    date: "March 2025",
  },
  {
    id: "4",
    name: "Khalid Al-Mansoori",
    location: "Ajman, UAE",
    rating: 4,
    comment: "Very happy with the bed linen set. Soft, well-made, and the colours are exactly as shown. Wash well and stay crisp. Great value for money.",
    date: "March 2025",
  },
  {
    id: "5",
    name: "Nadia Ibrahim",
    location: "Dubai, UAE",
    rating: 5,
    comment: "I've been searching for quality bedding like this for ages. BHTCOLLECTIONS delivers exactly what they promise — premium comfort at a fair price.",
    date: "April 2025",
  },
  {
    id: "6",
    name: "Omar Al-Farsi",
    location: "Ras Al Khaimah, UAE",
    rating: 5,
    comment: "Purchased the SMARTEX fleece blanket for my kids — they absolutely love it! So soft and the colour is beautiful. Will order more for gifts.",
    date: "April 2025",
  },
];

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

export const getBestSellers = (): Product[] =>
  products.filter((p) => p.bestseller);

export const getProductsByCategory = (slug: string): Product[] =>
  products.filter((p) => p.categorySlug === slug);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);

export interface RegionalOffice {
  country: string;
  companyName: string;
  address: string;
  mobile: string;
  tel?: string;
  email?: string;
  contactPerson?: string;
  crNo?: string;
  isHeadquarters?: boolean;
}

export const regionalOffices: RegionalOffice[] = [
  {
    country: "United Arab Emirates",
    companyName: "BLANKET HOUSE TRADING L.L.C.",
    address: "Office No. 204, Bldg No. R146 WASL, Same Bldg as Gulf Optics, Baniyas Square, Deira, Dubai, U.A.E.",
    mobile: "+971 55 887 9237",
    tel: "+971 4 2266 095",
    email: "info@blankethouse.ae",
    isHeadquarters: true,
  },
  {
    country: "Oman",
    companyName: "BLANKET HOUSESHINING MEDAL GLOBAL CO. LLC",
    address: "Opposite Makkah Centre, Next to Bank Saderat Iran, Ruwi High Street, Muscat, Oman",
    mobile: "+968 9212 4669",
    tel: "+968 2478 9774",
    contactPerson: "Mr. Arshad",
  },
  {
    country: "Qatar",
    companyName: "NEW BLANKET HOUSE TRADING W.L.L.",
    address: "Shop No. 57, Souq Al Harraj, Najma, Doha, Qatar",
    mobile: "+974 5080 8644",
    contactPerson: "Mr. Esam Ahmed",
    crNo: "137721L | Code: L31050",
  },
  {
    country: "Bahrain",
    companyName: "BLANKETS HOUSE FOR TRADING W.L.L.",
    address: "Shop No. 0, Bldg. No. A0093, Road No. 356, P.O. Box 3250, Block No. 302, Manama, Bahrain",
    mobile: "+973 3802 7070",
    email: "mazeens@gmail.com",
    contactPerson: "Mr. Syed Maazen",
    crNo: "134877-1",
  },
  {
    country: "Kuwait",
    companyName: "Al Nakhlah Jewellery Co.",
    address: "Souk Al Kuwait, Shop No. 35, Oman Street, Mubarakiyya, Kuwait City, Kuwait - P.O. Box: 22840",
    mobile: "+965 9962 7819",
    contactPerson: "Mohammed Hashim",
  },
  {
    country: "Saudi Arabia (Dammam)",
    companyName: "MUBARAK ZAIDAN SHAMRI TRADING CO.",
    address: "8190, Yazid Bin Malik Street, Al Khalidiyah Ash Shamaliya Dist. – 32231, Dammam, K.S.A.",
    mobile: "+966 5949 46120",
    email: "mtedmm@gmail.com",
    contactPerson: "MUHAMMED",
  },
];

export const clientele = [
  { name: "LULU ON THE MOVE", tag: "LOT", category: "Hypermarket Chain", logo: "/clientele/lulu-lot.png" },
  { name: "MARK & SAVE", tag: "Mark & Save", category: "Department Stores", logo: "/clientele/mark-and-save.png" },
  { name: "AL MADINA GROUP", tag: "Al Madina Hypermarkets", category: "Hypermarket Group", logo: "/clientele/al-madina.png" },
  { name: "TALAL GROUP", tag: "Talal Hypermarkets", category: "Hypermarket Group", logo: "/clientele/talal-group.png" },
  { name: "SHAKLAN", tag: "Shaklan Markets", category: "Supermarket Chain", logo: "/clientele/shaklan.png" },
];

export const diversifiedServices = [
  {
    title: "Complete Labour Camp Supplies",
    description: "High-grade bunker beds, steel lockers, heavy-duty blankets, certified mattresses, pillows & linen essentials.",
    icon: "Building2",
  },
  {
    title: "Premium Travel Luggage & Suitcases",
    description: "Durable PP, ABS hard-shell and fabric luggage engineered for frequent travel across the GCC.",
    icon: "Luggage",
  },
  {
    title: "Footwear & Arabic Slippers",
    description: "Official local distributor for renowned brands ADDA (Thailand) and Paragon (India), plus authentic Arabic style slippers.",
    icon: "Footprints",
  },
  {
    title: "Hotel & Hospitality Bedding",
    description: "Five-star luxury duvets, comforters, high-thread-count sheets and plush multi-ply blankets for hospitality.",
    icon: "Hotel",
  },
];

export const companyStrengths = [
  { value: "2009", label: "Established in Dubai", sub: "15+ Years Industry Experience" },
  { value: "4", label: "Exclusive Factories", sub: "Dedicated Manufacturing in GCC" },
  { value: "50,000+", label: "SQFT Warehouse Capacity", sub: "Huge Stock for Immediate Delivery" },
  { value: "500+", label: "Distinguished Clients", sub: "Hypermarkets, Hotels & Retailers" },
  { value: "6", label: "GCC Regional Offices", sub: "UAE, Oman, Qatar, Bahrain, Kuwait, KSA" },
  { value: "100%", label: "Price Match Guarantee", sub: "Finest Quality at Unbeatable Prices" },
];

