import { connectToDatabase } from "@/lib/db/mongodb";
import { OrderModel } from "@/lib/db/models/Order";

export interface OrderFilter {
  status?: string;
  search?: string;
}

export interface SerializedOrderItem {
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

export interface SerializedOrder {
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
  items: SerializedOrderItem[];
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Cash on Delivery" | "Failed";
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

function buildMongoFilter(options?: OrderFilter): Record<string, unknown> {
  const filter: Record<string, unknown> = {};
  if (!options) return filter;

  if (options.status) filter.orderStatus = options.status;
  if (options.search) {
    filter.$or = [
      { customerName: { $regex: options.search, $options: "i" } },
      { email: { $regex: options.search, $options: "i" } },
      { phone: { $regex: options.search, $options: "i" } },
      { orderNumber: { $regex: options.search, $options: "i" } },
    ];
  }
  return filter;
}

interface HasId {
  _id: { toString(): string };
}

function serialize<T extends HasId>(doc: T): SerializedOrder {
  return { ...doc, _id: doc._id.toString() } as unknown as SerializedOrder;
}

export class OrderRepository {
  static async findAll(options?: OrderFilter): Promise<SerializedOrder[]> {
    await connectToDatabase();
    const filter = buildMongoFilter(options);
    const docs = await OrderModel.find(filter).sort({ createdAt: -1 }).lean();
    return docs.map(serialize);
  }

  static async findById(id: string): Promise<SerializedOrder | null> {
    await connectToDatabase();
    const doc = await OrderModel.findById(id).lean();
    return doc ? serialize(doc) : null;
  }

  static async updateStatus(id: string, orderStatus: string): Promise<SerializedOrder | null> {
    await connectToDatabase();
    const doc = await OrderModel.findByIdAndUpdate(
      id,
      { orderStatus, updatedAt: new Date() },
      { new: true }
    ).lean();
    return doc ? serialize(doc) : null;
  }
}
