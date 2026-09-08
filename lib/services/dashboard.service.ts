import { connectToDatabase } from "@/lib/db/mongodb";
import { ProductModel } from "@/lib/db/models/Product";
import { OrderModel } from "@/lib/db/models/Order";
import type { SerializedOrder } from "@/lib/repositories/order.repository";

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  totalCustomers: number;
  totalRevenue: number;
  recentOrders: SerializedOrder[];
}

export class DashboardService {
  static async getStats(): Promise<DashboardStats> {
    await connectToDatabase();

    const [
      totalOrders,
      pendingOrders,
      totalProducts,
      lowStockProducts,
      revenueResult,
      uniqueCustomersResult,
      recentOrderDocs,
    ] = await Promise.all([
      OrderModel.countDocuments(),
      OrderModel.countDocuments({ orderStatus: "Pending" }),
      ProductModel.countDocuments(),
      ProductModel.countDocuments({ stock: { $lt: 15 } }),
      OrderModel.aggregate([
        { $match: { orderStatus: { $ne: "Cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      OrderModel.aggregate([
        { $group: { _id: { $toLower: "$email" } } },
        { $count: "count" },
      ]),
      OrderModel.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;
    const totalCustomers = uniqueCustomersResult[0]?.count || 0;

    // Serialize recent orders
    const recentOrders = recentOrderDocs.map((doc: any) => ({
      _id: doc._id.toString(),
      orderNumber: doc.orderNumber,
      customerName: doc.customerName,
      email: doc.email,
      phone: doc.phone,
      shippingAddress: doc.shippingAddress,
      items: doc.items?.map((item: any) => ({
        ...item,
        productId: item.productId?.toString(),
        _id: item._id?.toString(),
      })),
      subtotal: doc.subtotal,
      tax: doc.tax,
      shipping: doc.shipping,
      totalAmount: doc.totalAmount,
      orderStatus: doc.orderStatus,
      paymentMethod: doc.paymentMethod,
      paymentStatus: doc.paymentStatus,
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    }));

    return {
      totalOrders,
      pendingOrders,
      totalProducts,
      lowStockProducts,
      totalCustomers,
      totalRevenue,
      recentOrders,
    };
  }
}
