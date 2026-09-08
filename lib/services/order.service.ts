import { OrderRepository, OrderFilter } from "@/lib/repositories/order.repository";

const VALID_ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

export type OrderStatus = (typeof VALID_ORDER_STATUSES)[number];

export class OrderService {
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
