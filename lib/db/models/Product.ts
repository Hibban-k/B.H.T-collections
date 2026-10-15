import mongoose, { Schema, Document, Model } from "mongoose";
import { IBrand } from "./Brand";
export interface IProductVariant {
  name: string;
  sku?: string;
  size?: string;
  color?: string;
  price?: number;
  salePrice?: number;
  stock?: number;
  image?: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  sku?: string;
  category: string;
  categorySlug: string;
  subcategoryId?: mongoose.Types.ObjectId;
  subcategorySlug?: string;
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
  variants?: IProductVariant[];
  brand?: mongoose.Types.ObjectId | IBrand; // Or string, but usually ObjectId
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  stock: number;
  badge?: string;
  featured: boolean;
  bestseller: boolean;
  showOnHomepage: boolean;
  showOnCollection: boolean;
  crossSellSlugs?: string[];
  additionalCategories?: string[];
  status: "published" | "draft" | "disabled";
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema = new Schema<IProductVariant>(
  {
    name: { type: String, required: true },
    sku: { type: String, default: "" },
    size: { type: String, default: "" },
    color: { type: String, default: "" },
    price: { type: Number },
    salePrice: { type: Number, default: null },
    stock: { type: Number, default: 0 },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    sku: { type: String, unique: true, sparse: true, trim: true, uppercase: true },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true, index: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    subcategorySlug: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, default: null },
    originalPrice: { type: Number, default: null },
    rating: { type: Number, default: 5.0, min: 1, max: 5 },
    reviewCount: { type: Number, default: 12 },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    sizes: { type: [String], default: ["Single", "Double", "King"] },
    colors: { type: [String], default: ["Classic"] },
    materials: { type: [String], default: ["100% Premium Material"] },
    variants: { type: [ProductVariantSchema], default: [] },
    stock: { type: Number, default: 50 },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], default: [] },
    badge: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    showOnHomepage: { type: Boolean, default: true },
    showOnCollection: { type: Boolean, default: true },
    crossSellSlugs: { type: [String], default: [] },
    additionalCategories: { type: [String], default: [] },
    status: { type: String, enum: ["published", "draft", "disabled"], default: "published" },
  },
  { timestamps: true }
);

export const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
