"use client";
// app/admin/page.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Clock,
  Package,
  AlertTriangle,
  Users,
  DollarSign,
  ArrowUpRight,
  Eye,
  RefreshCw,
  CheckCircle2,
  X,
} from "lucide-react";

interface StatsData {
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  totalCustomers: number;
  totalRevenue: number;
  recentOrders: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error("Failed to load dashboard stats", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (res.ok) {
        await fetchStats();
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev: any) => ({ ...prev, orderStatus: newStatus }));
        }
      }
    } catch (e) {
      console.error("Failed to update status", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0B131F]"
            style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
          >
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Real-time management for Products, Categories, and Orders.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DFC8] hover:border-[#D4AF37] text-xs font-semibold text-[#0B131F] rounded-xl shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Data</span>
          </button>
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-[#0B131F] text-[#E6C687] hover:bg-[#1A2433] text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* ── 6 Metric Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Total Orders */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFC8] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#8A95A5] uppercase tracking-wider">Total Orders</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B131F] mt-1 font-serif">
              {stats?.totalOrders ?? "—"}
            </h3>
            <Link href="/admin/orders" className="text-[11px] font-semibold text-[#D92626] hover:underline flex items-center gap-1 mt-2">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <ShoppingCart className="w-6 h-6" strokeWidth={1.75} />
          </div>
        </div>

        {/* Card 2: Pending Orders */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFC8] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#8A95A5] uppercase tracking-wider">Pending Orders</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1 font-serif">
              {stats?.pendingOrders ?? "—"}
            </h3>
            <span className="text-[11px] text-[#64748B] block mt-2">Requires attention</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-6 h-6" strokeWidth={1.75} />
          </div>
        </div>

        {/* Card 3: Total Products */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFC8] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#8A95A5] uppercase tracking-wider">Total Products</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B131F] mt-1 font-serif">
              {stats?.totalProducts ?? "—"}
            </h3>
            <Link href="/admin/products" className="text-[11px] font-semibold text-[#D92626] hover:underline flex items-center gap-1 mt-2">
              Manage Catalog <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Package className="w-6 h-6" strokeWidth={1.75} />
          </div>
        </div>

        {/* Card 4: Low Stock Products */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFC8] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#8A95A5] uppercase tracking-wider">Low Stock</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-rose-600 mt-1 font-serif">
              {stats?.lowStockProducts ?? "—"}
            </h3>
            <span className="text-[11px] text-[#64748B] block mt-2">&lt; 15 units available</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-6 h-6" strokeWidth={1.75} />
          </div>
        </div>

        {/* Card 5: Total Customers */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFC8] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#8A95A5] uppercase tracking-wider">Total Customers</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B131F] mt-1 font-serif">
              {stats?.totalCustomers ?? "—"}
            </h3>
            <span className="text-[11px] text-[#64748B] block mt-2">Unique buyers</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Users className="w-6 h-6" strokeWidth={1.75} />
          </div>
        </div>

        {/* Card 6: Total Revenue */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DFC8] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-[#8A95A5] uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B131F] mt-1 font-serif">
              AED {stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : "0"}
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct Sales
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#0B131F] border border-[#1E2B3E] flex items-center justify-center text-[#E6C687] shrink-0">
            <DollarSign className="w-6 h-6" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* ── Recent Orders Section ───────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
        <div className="p-6 border-b border-[#F2EBDC] flex items-center justify-between">
          <div>
            <h2
              className="text-lg sm:text-xl font-bold text-[#0B131F]"
              style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
            >
              Recent Orders
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">Latest transactions and fulfillment statuses.</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#D92626] hover:text-[#B31E1E] flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#F2EBDC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Product / Items</th>
                <th className="py-3.5 px-6">Total Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EBDC] text-xs font-medium text-[#0B131F]">
              {!stats?.recentOrders || stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#8A95A5]">
                    No orders recorded yet.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#0B131F] font-mono">
                      {order.orderNumber}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#0B131F]">{order.customerName}</div>
                      <div className="text-[11px] text-[#64748B]">{order.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="max-w-xs truncate font-semibold">
                        {order.items?.map((i: any) => `${i.name} (x${i.quantity})`).join(", ") || "1 item"}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#0B131F]">
                      AED {order.totalAmount}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={order.orderStatus}
                        disabled={updatingId === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md border outline-none cursor-pointer ${getStatusBadge(
                          order.orderStatus
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-[11px] text-[#64748B]">
                      {new Date(order.createdAt).toLocaleDateString("en-AE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#D4AF37] text-[11px] font-bold text-[#0B131F] rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── View Order Modal ─────────────────────────────────── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden animate-fade-in">
            <div className="p-6 bg-[#0B131F] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#E6C687] font-bold tracking-widest uppercase">Order Details</span>
                <h3 className="text-lg font-bold font-mono text-white">{selectedOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs text-[#0B131F]">
              {/* Customer Info */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8] space-y-1">
                <div className="font-bold text-sm text-[#0B131F]">{selectedOrder.customerName}</div>
                <div className="text-[#64748B]">Email: {selectedOrder.email}</div>
                <div className="text-[#64748B]">Phone: {selectedOrder.phone}</div>
                <div className="text-[#64748B] pt-1 border-t border-[#F2EBDC] mt-2">
                  <span className="font-semibold text-[#0B131F]">Shipping Address:</span>{" "}
                  {selectedOrder.shippingAddress?.street ? `${selectedOrder.shippingAddress.street}, ` : ""}
                  {selectedOrder.shippingAddress?.city || "Dubai"},{" "}
                  {selectedOrder.shippingAddress?.emirate || "Dubai"},{" "}
                  {selectedOrder.shippingAddress?.country || "UAE"}
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#64748B] mb-2">Purchased Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white border border-[#E8DFC8] rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-[#0B131F]">{item.name}</div>
                        <div className="text-[11px] text-[#64748B]">
                          Qty: {item.quantity} · Price: AED {item.price}
                          {item.size ? ` · Size: ${item.size}` : ""}
                          {item.color ? ` · Color: ${item.color}` : ""}
                        </div>
                      </div>
                      <div className="font-bold text-sm text-[#0B131F]">
                        AED {item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Status */}
              <div className="pt-4 border-t border-[#F2EBDC] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#64748B]">Payment: <span className="font-semibold text-[#0B131F]">{selectedOrder.paymentStatus}</span></div>
                  <div className="text-base font-bold text-[#0B131F] mt-0.5">Total: AED {selectedOrder.totalAmount}</div>
                </div>
                <div>
                  <label className="block text-[10px] text-[#64748B] uppercase font-bold mb-1">Status</label>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none ${getStatusBadge(selectedOrder.orderStatus)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] border-t border-[#F2EBDC] flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#0B131F] text-white text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
