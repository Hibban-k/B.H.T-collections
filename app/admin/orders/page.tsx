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
  Plus,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    email: "",
    phone: "",
    city: "Dubai",
    street: "",
    productName: "",
    price: "",
    quantity: 1,
    notes: "",
  });

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingOrder(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: newOrder.customerName,
          email: newOrder.email,
          phone: newOrder.phone,
          shippingAddress: {
            city: newOrder.city,
            street: newOrder.street,
            country: "United Arab Emirates",
            emirate: newOrder.city,
          },
          items: [
            {
              name: newOrder.productName,
              price: parseFloat(newOrder.price) || 0,
              quantity: parseInt(String(newOrder.quantity), 10) || 1,
            },
          ],
          notes: newOrder.notes,
        }),
      });

      if (res.ok) {
        setCreateModalOpen(false);
        setNewOrder({
          customerName: "",
          email: "",
          phone: "",
          city: "Dubai",
          street: "",
          productName: "",
          price: "",
          quantity: 1,
          notes: "",
        });
        await fetchOrders();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to create order");
      }
    } catch (err) {
      console.error("Order creation failed", err);
    } finally {
      setCreatingOrder(false);
    }
  };

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
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#D92626] hover:bg-[#B31E1E] text-xs font-bold text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Order</span>
          </button>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DFC8] hover:border-[#D4AF37] text-xs font-semibold text-[#0B131F] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
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

      {/* Create Order Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-[#E8DFC8] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-5 right-5 text-[#8A95A5] hover:text-[#0B131F] p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              className="text-xl font-bold text-[#0B131F] mb-1"
              style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
            >
              Create New Order
            </h3>
            <p className="text-xs text-[#64748B] mb-5">
              Manually register a customer order into the fulfillment system.
            </p>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#0B131F] mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    placeholder="e.g. Sheikh Mohammed"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:bg-white rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0B131F] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newOrder.email}
                    onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                    placeholder="customer@domain.ae"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:bg-white rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#0B131F] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:bg-white rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0B131F] mb-1">
                    City / Emirate
                  </label>
                  <select
                    value={newOrder.city}
                    onChange={(e) => setNewOrder({ ...newOrder, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:bg-white rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B131F] mb-1">
                  Product / Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={newOrder.productName}
                  onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
                  placeholder="e.g. SOLANA PLUS Ultra Soft 1Ply Blanket"
                  className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:bg-white rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#0B131F] mb-1">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={newOrder.price}
                    onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                    placeholder="55.00"
                    className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:bg-white rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0B131F] mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:bg-white rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0B131F] mb-1">
                  Internal Notes / Instructions
                </label>
                <textarea
                  rows={2}
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                  placeholder="Customer requested delivery before 5 PM..."
                  className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:bg-white rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#F2EBDC]">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-[#0B131F] font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingOrder}
                  className="px-5 py-2 bg-[#D92626] hover:bg-[#B31E1E] text-white font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {creatingOrder ? "Creating..." : "Save Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
