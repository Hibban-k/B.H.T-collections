"use client";
// app/admin/orders/page.tsx
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Eye,
  RefreshCw,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Package,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/orders?";
      if (statusFilter !== "all") url += `status=${statusFilter}&`;
      if (search.trim()) url += `search=${encodeURIComponent(search.trim())}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error("Failed to load orders", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
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

  const statusOptions = ["all", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0B131F]"
            style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
          >
            Orders Management
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Track customer orders, manage shipments, and update fulfillment statuses.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DFC8] hover:border-[#D4AF37] text-xs font-semibold text-[#0B131F] rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DFC8] shadow-xs flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                statusFilter === status
                  ? "bg-[#0B131F] text-white shadow-xs"
                  : "bg-[#FAF8F5] text-[#64748B] hover:bg-[#F2EBDC] hover:text-[#0B131F]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-[#8A95A5] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, phone, ID..."
              className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:border-[#D4AF37] focus:bg-white rounded-xl pl-9 pr-4 py-2 text-xs text-[#0B131F] outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#D92626] hover:bg-[#B31E1E] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#F2EBDC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Products</th>
                <th className="py-4 px-6">Total (AED)</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EBDC] text-xs font-medium text-[#0B131F]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#8A95A5]">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#8A95A5]">
                    No orders matching your criteria.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-4 px-6 font-bold font-mono text-[#0B131F]">
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
                      <span className="text-[11px] px-2 py-0.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded text-[#64748B] font-semibold">
                        {order.paymentStatus}
                      </span>
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

      {/* Detailed Order Dialog Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 bg-[#0B131F] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#E6C687] font-bold tracking-widest uppercase">Order Inspection</span>
                <h3 className="text-xl font-bold font-mono text-white mt-0.5">{selectedOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-[#0B131F]">
              {/* Customer & Shipping Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8] space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#D92626]" /> Customer Info
                  </h4>
                  <div className="font-bold text-sm text-[#0B131F]">{selectedOrder.customerName}</div>
                  <div className="text-[#64748B] flex items-center gap-1.5"><Mail className="w-3 h-3" /> {selectedOrder.email}</div>
                  <div className="text-[#64748B] flex items-center gap-1.5"><Phone className="w-3 h-3" /> {selectedOrder.phone}</div>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8] space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D92626]" /> Shipping Destination
                  </h4>
                  <div className="text-[#64748B] leading-relaxed">
                    {selectedOrder.shippingAddress?.street ? `${selectedOrder.shippingAddress.street}, ` : ""}
                    {selectedOrder.shippingAddress?.city || "Dubai"},{" "}
                    {selectedOrder.shippingAddress?.emirate || "Dubai"},{" "}
                    {selectedOrder.shippingAddress?.country || "UAE"}
                  </div>
                  {selectedOrder.notes && (
                    <div className="pt-2 border-t border-[#E8DFC8] text-[11px] text-[#64748B]">
                      <span className="font-semibold text-[#0B131F]">Notes:</span> {selectedOrder.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#64748B] mb-2 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#D92626]" /> Items Ordered
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-[#0B131F]">{item.name}</div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">
                          Quantity: <span className="font-bold text-[#0B131F]">{item.quantity}</span> · Unit Price: AED {item.price}
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

              {/* Payment & Order Summary */}
              <div className="p-4 bg-white border border-[#E8DFC8] rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#64748B] flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#1BA14B]" />
                    <span>Payment: <strong className="text-[#0B131F]">{selectedOrder.paymentStatus}</strong></span>
                  </div>
                  <div className="text-lg font-bold text-[#0B131F] mt-1">
                    Total: AED {selectedOrder.totalAmount}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#64748B] uppercase font-bold mb-1">Update Status</label>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${getStatusBadge(
                      selectedOrder.orderStatus
                    )}`}
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

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#F2EBDC] flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-[#0B131F] text-white text-xs font-bold rounded-xl hover:bg-[#1A2433] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
