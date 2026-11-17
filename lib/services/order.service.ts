import { OrderRepository, OrderFilter, SerializedOrder } from "@/lib/repositories/order.repository";
import { EmailService } from "@/lib/services/email.service";
import type { IOrder } from "@/lib/db/models/Order";

const VALID_ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

export type OrderStatus = (typeof VALID_ORDER_STATUSES)[number];

export interface CreateOrderInput {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress?: {
    street?: string;
    city?: string;
    emirate?: string;
    country?: string;
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
  paymentStatus?: "Pending" | "Paid" | "Cash on Delivery" | "Failed";
  orderStatus?: OrderStatus;
  notes?: string;
}

export class OrderService {
  static async createOrder(input: CreateOrderInput): Promise<SerializedOrder> {
    if (!input.customerName || !input.customerName.trim()) {
      throw new Error("Customer name is required.");
    }
    if (!input.email || !input.email.includes("@")) {
      throw new Error("A valid customer email is required.");
    }
    if (!input.phone || !input.phone.trim()) {
      throw new Error("Customer phone number is required.");
    }
    if (!input.items || input.items.length === 0) {
      throw new Error("Order must contain at least one item.");
    }

    const calculatedTotal = input.items.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );

    const orderData: Partial<IOrder> = {
      customerName: input.customerName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      shippingAddress: {
        street: input.shippingAddress?.street || "",
        city: input.shippingAddress?.city || "Dubai",
        emirate: input.shippingAddress?.emirate || "Dubai",
        country: input.shippingAddress?.country || "United Arab Emirates",
        postalCode: input.shippingAddress?.postalCode || "",
      },
      items: input.items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: Number(i.price),
        quantity: Math.max(1, Number(i.quantity) || 1),
        image: i.image || "",
        size: i.size || "Standard",
        color: i.color || "Classic",
      })),
      totalAmount: calculatedTotal,
      paymentStatus: input.paymentStatus || "Cash on Delivery",
      orderStatus: input.orderStatus || "Pending",
      notes: input.notes || "",
    };

    const order = await OrderRepository.create(orderData);

    // Asynchronously trigger notification
    EmailService.sendOrderNotification({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      totalAmount: order.totalAmount,
      items: order.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
    }).catch((err) => {
      console.error("[OrderService] Notification error:", err);
    });

    return order;
  }

  static async getOrders(options?: OrderFilter) {
    return OrderRepository.findAll(options);
  }

  static async getOrderById(id: string) {
    return OrderRepository.findById(id);
  }

  static async updateOrderStatus(id: string, orderStatus: string) {
    if (!VALID_ORDER_STATUSES.includes(orderStatus as OrderStatus)) {
      throw new Error(`Invalid order status: ${orderStatus}`);
    }
    return OrderRepository.updateStatus(id, orderStatus);
  }
}
