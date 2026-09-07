import fs from "fs";
import path from "path";
import { connectToDatabase } from "./mongodb";
import { ProductModel, IProduct } from "./models/Product";
import { CategoryModel, ICategory } from "./models/Category";
import { OrderModel, IOrder } from "./models/Order";
import { products as initialProducts, categories as initialCategories } from "../data";
import { cleanImageUrl } from "../utils/image";

export interface StoreProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  sizes: string[];
  colors: string[];
  materials: string[];
  stock: number;
  badge?: string;
  featured: boolean;
  bestseller: boolean;
  showOnHomepage: boolean;
  showOnCollection: boolean;
  status: "published" | "draft" | "disabled";
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface StoreCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "active" | "disabled";
  productCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface StoreOrder {
  _id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    street?: string;
    city: string;
    emirate: string;
    country: string;
    postalCode?: string;
  };
  items: Array<{
    productId?: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    size?: string;
    color?: string;
  }>;
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Cash on Delivery" | "Failed";
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  notes?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface LocalStoreData {
  products: StoreProduct[];
  categories: StoreCategory[];
  orders: StoreOrder[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

function ensureLocalStore(): LocalStoreData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_FILE)) {
    const defaultCategories: StoreCategory[] = initialCategories.map((c, i) => ({
      _id: `cat_${i + 1}`,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      status: "active",
      productCount: c.productCount || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const defaultProducts: StoreProduct[] = initialProducts.map((p) => ({
      _id: `prod_${p.id}`,
      name: p.name,
      slug: p.slug,
      category: p.category,
      categorySlug: p.categorySlug,
      price: p.price,
      originalPrice: p.originalPrice || undefined,
      salePrice: p.originalPrice ? p.price : undefined,
      rating: p.rating,
      reviewCount: p.reviewCount,
      image: p.image,
      images: p.images || [p.image],
      description: p.description,
      shortDescription: p.shortDescription || p.description.slice(0, 120),
      sizes: p.sizes || ["Standard"],
      colors: p.colors || ["Classic"],
      materials: p.materials || ["100% Premium Bedding"],
      stock: 45,
      badge: p.badge || undefined,
      featured: p.featured || false,
      bestseller: p.bestseller || false,
      showOnHomepage: true,
      showOnCollection: true,
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const defaultOrders: StoreOrder[] = [
      {
        _id: "ord_1001",
        orderNumber: "BHT-98421",
        customerName: "Rashid Al Nuaimi",
        email: "rashid.nuaimi@example.ae",
        phone: "+971 50 123 4567",
        shippingAddress: {
          street: "Villa 14, Al Safa 2",
          city: "Dubai",
          emirate: "Dubai",
          country: "United Arab Emirates",
        },
        items: [
          {
            name: "Smartex Two-Ply Premium Blanket",
            price: 280,
            quantity: 2,
            size: "King (220x240cm)",
            color: "Royal Navy & Gold",
          },
        ],
        totalAmount: 560,
        paymentStatus: "Paid",
        orderStatus: "Processing",
        notes: "Deliver before 5 PM",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "ord_1002",
        orderNumber: "BHT-98422",
        customerName: "Fatima Al Mansoori",
        email: "fatima.m@example.ae",
        phone: "+971 52 876 5432",
        shippingAddress: {
          street: "Apt 502, Marina Crown Tower",
          city: "Dubai",
          emirate: "Dubai",
          country: "United Arab Emirates",
        },
        items: [
          {
            name: "Luxury Fitted Bed Sheet Set",
            price: 195,
            quantity: 1,
            size: "King",
            color: "Ivory White",
          },
        ],
        totalAmount: 195,
        paymentStatus: "Cash on Delivery",
        orderStatus: "Pending",
        notes: "Call before arrival",
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "ord_1003",
        orderNumber: "BHT-98423",
        customerName: "Mohamed Al Mazrouei",
        email: "m.mazrouei@example.ae",
        phone: "+971 55 334 9988",
        shippingAddress: {
          street: "Corniche Residence",
          city: "Abu Dhabi",
          emirate: "Abu Dhabi",
          country: "United Arab Emirates",
        },
        items: [
          {
            name: "Quilt Duvet Comforter Set",
            price: 340,
            quantity: 1,
            size: "Super King",
            color: "Charcoal Grey",
          },
        ],
        totalAmount: 340,
        paymentStatus: "Paid",
        orderStatus: "Shipped",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const initialData: LocalStoreData = {
      products: defaultProducts,
      categories: defaultCategories,
      orders: defaultOrders,
    };

    fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { products: [], categories: [], orders: [] };
  }
}

function saveLocalStore(data: LocalStoreData) {
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
}

/* =========================================================
   PRODUCTS
========================================================= */

export async function getProducts(options?: {
  status?: string;
  categorySlug?: string;
  showOnHomepage?: boolean;
  showOnCollection?: boolean;
  featured?: boolean;
  search?: string;
}): Promise<StoreProduct[]> {
  const db = await connectToDatabase();
  if (db) {
    const filter: Record<string, any> = {};
    if (options?.status) filter.status = options.status;
    if (options?.categorySlug) filter.categorySlug = options.categorySlug;
    if (options?.showOnHomepage !== undefined) filter.showOnHomepage = options.showOnHomepage;
    if (options?.showOnCollection !== undefined) filter.showOnCollection = options.showOnCollection;
    if (options?.featured !== undefined) filter.featured = options.featured;
    if (options?.search) {
      filter.$or = [
        { name: { $regex: options.search, $options: "i" } },
        { description: { $regex: options.search, $options: "i" } },
      ];
    }

    const docs = await ProductModel.find(filter).sort({ createdAt: -1 }).lean();
    if (docs.length > 0) {
      return docs.map((doc: any) => ({
        ...doc,
        _id: doc._id.toString(),
      })) as StoreProduct[];
    }
  }

  // Fallback / local store
  const store = ensureLocalStore();
  let list = [...store.products];

  if (options?.status) {
    list = list.filter((p) => p.status === options.status);
  }
  if (options?.categorySlug) {
    list = list.filter((p) => p.categorySlug.toLowerCase() === options.categorySlug?.toLowerCase());
  }
  if (options?.showOnHomepage !== undefined) {
    list = list.filter((p) => p.showOnHomepage === options.showOnHomepage);
  }
  if (options?.showOnCollection !== undefined) {
    list = list.filter((p) => p.showOnCollection === options.showOnCollection);
  }
  if (options?.featured !== undefined) {
    list = list.filter((p) => p.featured === options.featured);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  return list;
}

export async function getProductBySlug(slug: string): Promise<StoreProduct | null> {
  const db = await connectToDatabase();
  if (db) {
    const doc = await ProductModel.findOne({ slug }).lean();
    if (doc) {
      return { ...doc, _id: (doc as any)._id.toString() } as StoreProduct;
    }
  }

  const store = ensureLocalStore();
  const found = store.products.find((p) => p.slug === slug);
  return found || null;
}

export async function createProduct(input: Partial<StoreProduct>): Promise<StoreProduct> {
  const now = new Date().toISOString();
  const slug = input.slug || input.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `product-${Date.now()}`;
  const cleanImg = cleanImageUrl(input.image);
  const cleanImgs = input.images && input.images.length > 0 ? input.images.map(cleanImageUrl) : [cleanImg];

  const productData: Omit<StoreProduct, "_id"> = {
    name: input.name || "Untitled Product",
    slug,
    category: input.category || "Blankets",
    categorySlug: input.categorySlug || "blankets",
    price: Number(input.price) || 0,
    salePrice: input.salePrice ? Number(input.salePrice) : undefined,
    originalPrice: input.originalPrice ? Number(input.originalPrice) : undefined,
    rating: input.rating || 5.0,
    reviewCount: input.reviewCount || 1,
    image: cleanImg,
    images: cleanImgs,
    description: input.description || "",
    shortDescription: input.shortDescription || input.description?.slice(0, 120) || "",
    sizes: input.sizes || ["Standard"],
    colors: input.colors || ["Classic"],
    materials: input.materials || ["100% Premium Material"],
    stock: input.stock !== undefined ? Number(input.stock) : 50,
    badge: input.badge || undefined,
    featured: Boolean(input.featured),
    bestseller: Boolean(input.bestseller),
    showOnHomepage: input.showOnHomepage !== undefined ? Boolean(input.showOnHomepage) : true,
    showOnCollection: input.showOnCollection !== undefined ? Boolean(input.showOnCollection) : true,
    status: input.status || "published",
    createdAt: now,
    updatedAt: now,
  };

  const db = await connectToDatabase();
  if (db) {
    const doc = await ProductModel.create(productData);
    return { ...doc.toObject(), _id: doc._id.toString() } as StoreProduct;
  }

  const store = ensureLocalStore();
  const newProduct: StoreProduct = {
    ...productData,
    _id: `prod_${Date.now()}`,
  };
  store.products.unshift(newProduct);
  saveLocalStore(store);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<StoreProduct>): Promise<StoreProduct | null> {
  const now = new Date().toISOString();
  const sanitizedUpdates = { ...updates };
  if (sanitizedUpdates.image) {
    sanitizedUpdates.image = cleanImageUrl(sanitizedUpdates.image);
  }
  if (sanitizedUpdates.images && sanitizedUpdates.images.length > 0) {
    sanitizedUpdates.images = sanitizedUpdates.images.map(cleanImageUrl);
  }

  const db = await connectToDatabase();
  if (db) {
    const doc = await ProductModel.findByIdAndUpdate(id, { ...sanitizedUpdates, updatedAt: now }, { new: true }).lean();
    if (doc) {
      return { ...doc, _id: (doc as any)._id.toString() } as StoreProduct;
    }
  }

  const store = ensureLocalStore();
  const index = store.products.findIndex((p) => p._id === id || p.slug === id);
  if (index === -1) return null;

  store.products[index] = {
    ...store.products[index],
    ...sanitizedUpdates,
    updatedAt: now,
  };
  saveLocalStore(store);
  return store.products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = await connectToDatabase();
  if (db) {
    const res = await ProductModel.findByIdAndDelete(id);
    if (res) return true;
  }

  const store = ensureLocalStore();
  const beforeLen = store.products.length;
  store.products = store.products.filter((p) => p._id !== id && p.slug !== id);
  if (store.products.length !== beforeLen) {
    saveLocalStore(store);
    return true;
  }
  return false;
}

/* =========================================================
   CATEGORIES
========================================================= */

export async function getCategories(): Promise<StoreCategory[]> {
  const db = await connectToDatabase();
  if (db) {
    const docs = await CategoryModel.find().sort({ createdAt: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((doc: any) => ({ ...doc, _id: doc._id.toString() })) as StoreCategory[];
    }
  }

  const store = ensureLocalStore();
  return store.categories;
}

export async function createCategory(input: Partial<StoreCategory>): Promise<StoreCategory> {
  const now = new Date().toISOString();
  const slug = input.slug || input.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `cat-${Date.now()}`;

  const categoryData: Omit<StoreCategory, "_id"> = {
    name: input.name || "New Category",
    slug,
    description: input.description || "",
    image: input.image || "/collections/korean-super-soft-blanket.png",
    status: input.status || "active",
    productCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  const db = await connectToDatabase();
  if (db) {
    const doc = await CategoryModel.create(categoryData);
    return { ...doc.toObject(), _id: doc._id.toString() } as StoreCategory;
  }

  const store = ensureLocalStore();
  const newCat: StoreCategory = {
    ...categoryData,
    _id: `cat_${Date.now()}`,
  };
  store.categories.push(newCat);
  saveLocalStore(store);
  return newCat;
}

export async function updateCategory(id: string, updates: Partial<StoreCategory>): Promise<StoreCategory | null> {
  const now = new Date().toISOString();
  const db = await connectToDatabase();
  if (db) {
    const doc = await CategoryModel.findByIdAndUpdate(id, { ...updates, updatedAt: now }, { new: true }).lean();
    if (doc) {
      return { ...doc, _id: (doc as any)._id.toString() } as StoreCategory;
    }
  }

  const store = ensureLocalStore();
  const index = store.categories.findIndex((c) => c._id === id || c.slug === id);
  if (index === -1) return null;

  store.categories[index] = {
    ...store.categories[index],
    ...updates,
    updatedAt: now,
  };
  saveLocalStore(store);
  return store.categories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  const db = await connectToDatabase();
  if (db) {
    const res = await CategoryModel.findByIdAndDelete(id);
    if (res) return true;
  }

  const store = ensureLocalStore();
  const beforeLen = store.categories.length;
  store.categories = store.categories.filter((c) => c._id !== id && c.slug !== id);
  if (store.categories.length !== beforeLen) {
    saveLocalStore(store);
    return true;
  }
  return false;
}

/* =========================================================
   ORDERS
========================================================= */

export async function getOrders(options?: { status?: string; search?: string }): Promise<StoreOrder[]> {
  const db = await connectToDatabase();
  if (db) {
    const filter: Record<string, any> = {};
    if (options?.status) filter.orderStatus = options.status;
    if (options?.search) {
      filter.$or = [
        { customerName: { $regex: options.search, $options: "i" } },
        { email: { $regex: options.search, $options: "i" } },
        { phone: { $regex: options.search, $options: "i" } },
        { orderNumber: { $regex: options.search, $options: "i" } },
      ];
    }
    const docs = await OrderModel.find(filter).sort({ createdAt: -1 }).lean();
    if (docs.length > 0) {
      return docs.map((doc: any) => ({ ...doc, _id: doc._id.toString() })) as StoreOrder[];
    }
  }

  const store = ensureLocalStore();
  let list = [...store.orders];

  if (options?.status) {
    list = list.filter((o) => o.orderStatus.toLowerCase() === options.status?.toLowerCase());
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (o) =>
        o.customerName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.orderNumber.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateOrderStatus(id: string, orderStatus: StoreOrder["orderStatus"]): Promise<StoreOrder | null> {
  const now = new Date().toISOString();
  const db = await connectToDatabase();
  if (db) {
    const doc = await OrderModel.findByIdAndUpdate(id, { orderStatus, updatedAt: now }, { new: true }).lean();
    if (doc) {
      return { ...doc, _id: (doc as any)._id.toString() } as StoreOrder;
    }
  }

  const store = ensureLocalStore();
  const index = store.orders.findIndex((o) => o._id === id || o.orderNumber === id);
  if (index === -1) return null;

  store.orders[index].orderStatus = orderStatus;
  store.orders[index].updatedAt = now;
  saveLocalStore(store);
  return store.orders[index];
}

/* =========================================================
   DASHBOARD STATS
========================================================= */

export async function getDashboardStats() {
  const [products, orders] = await Promise.all([getProducts(), getOrders()]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock < 15).length;

  const uniqueCustomers = new Set(orders.map((o) => o.email.toLowerCase())).size;
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== "Cancelled")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return {
    totalOrders,
    pendingOrders,
    totalProducts,
    lowStockProducts,
    totalCustomers: uniqueCustomers,
    totalRevenue,
    recentOrders: orders.slice(0, 5),
  };
}
