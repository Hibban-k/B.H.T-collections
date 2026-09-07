import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

export interface IOrder extends Document {
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
  items: IOrderItem[];
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Cash on Delivery" | "Failed";
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    shippingAddress: {
      street: { type: String, default: "" },
      city: { type: String, default: "Dubai" },
      emirate: { type: String, default: "Dubai" },
      country: { type: String, default: "United Arab Emirates" },
      postalCode: { type: String, default: "" },
    },
    items: [
      {
        productId: { type: String },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String, default: "" },
        size: { type: String, default: "Standard" },
        color: { type: String, default: "Classic" },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Cash on Delivery", "Failed"],
      default: "Cash on Delivery",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
      index: true,
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const OrderModel: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
