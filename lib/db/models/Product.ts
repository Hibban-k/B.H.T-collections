import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
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
  crossSellSlugs?: string[];
  additionalCategories?: string[];
  status: "published" | "draft" | "disabled";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    categorySlug: { type: String, required: true, index: true },
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
    stock: { type: Number, default: 50 },
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
