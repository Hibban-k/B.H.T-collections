"use client";
// app/admin/inquiries/page.tsx
import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  RefreshCw,
  X,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Trash2,
  CheckCircle,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/inquiries?";
      if (statusFilter !== "all") url += `status=${statusFilter}&`;
      if (search.trim()) url += `search=${encodeURIComponent(search.trim())}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (e) {
      console.error("Failed to load inquiries", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleStatusChange = async (inquiryId: string, newStatus: string) => {
    setUpdatingId(inquiryId);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === inquiryId ? { ...inq, status: newStatus } : inq))
        );
        if (selectedInquiry && selectedInquiry._id === inquiryId) {
          setSelectedInquiry((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error("Failed to update inquiry status", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (inquiryId: string) => {
    if (!confirm("Are you sure you want to delete this customer inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq._id !== inquiryId));
        if (selectedInquiry && selectedInquiry._id === inquiryId) {
          setSelectedInquiry(null);
        }
      }
    } catch (e) {
      console.error("Failed to delete inquiry", e);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "in_progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "archived":
        return "bg-neutral-100 text-neutral-600 border-neutral-300";
      default: // new
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const statusOptions = ["all", "new", "in_progress", "resolved", "archived"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0B131F]"
            style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
          >
            Customer Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Review customer contact submissions, quotes, and product requests.
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DFC8] hover:border-[#D4AF37] text-xs font-semibold text-[#0B131F] rounded-xl shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                statusFilter === status
                  ? "bg-[#0B131F] text-white shadow-xs"
                  : "bg-[#FAF8F5] text-[#64748B] hover:bg-[#F2EBDC] hover:text-[#0B131F]"
              }`}
            >
              {status.replace("_", " ")}
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
              placeholder="Search by name, email, subject..."
              className="w-full bg-[#FAF8F5] border border-[#E8DFC8] focus:border-[#D4AF37] focus:bg-white rounded-xl pl-9 pr-4 py-2 text-xs text-[#0B131F] outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#D92626] hover:bg-[#B31E1E] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#F2EBDC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-4 px-6">Sender</th>
                <th className="py-4 px-6">Subject / Product</th>
                <th className="py-4 px-6">Message Preview</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EBDC] text-xs font-medium text-[#0B131F]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8A95A5]">
                    Loading inquiries...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8A95A5]">
                    No inquiries matching your criteria.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#0B131F]">{inq.name}</div>
                      <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        <span>{inq.email}</span>
                      </div>
                      {inq.phone && (
                        <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{inq.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-[#0B131F]">{inq.subject || "Inquiry"}</div>
                      {inq.productName && (
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md">
                          Product: {inq.productName}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="max-w-xs truncate text-[#64748B]">{inq.message}</div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={inq.status}
                        disabled={updatingId === inq._id}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md border outline-none cursor-pointer ${getStatusBadge(
                          inq.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-[11px] text-[#64748B] whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString("en-AE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#D4AF37] text-[11px] font-bold text-[#0B131F] rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="inline-flex items-center p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl border border-[#E8DFC8] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 text-[#8A95A5] hover:text-[#0B131F] p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${getStatusBadge(
                  selectedInquiry.status
                )}`}
              >
                {selectedInquiry.status.toUpperCase()}
              </span>
              <span className="text-xs text-[#64748B]">
                {new Date(selectedInquiry.createdAt).toLocaleString("en-AE")}
              </span>
            </div>

            <h3
              className="text-xl font-bold text-[#0B131F] mb-4"
              style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
            >
              {selectedInquiry.subject || "Customer Inquiry"}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#F2EBDC] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0B131F]">{selectedInquiry.name}</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-[#D92626] font-semibold hover:underline"
                  >
                    Reply via Email
                  </a>
                </div>
                <div className="text-[#64748B] flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedInquiry.email}</span>
                </div>
                {selectedInquiry.phone && (
                  <div className="text-[#64748B] flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedInquiry.phone}</span>
                  </div>
                )}
                {selectedInquiry.productName && (
                  <div className="pt-2 text-[11px] border-t border-[#F2EBDC] text-[#0B131F] font-semibold">
                    Referenced Product: {selectedInquiry.productName}
                  </div>
                )}
              </div>

              <div>
                <label className="font-bold text-[#64748B] uppercase tracking-wider text-[10px] block mb-1">
                  Message Content
                </label>
                <div className="p-4 bg-white rounded-xl border border-[#E8DFC8] text-sm text-[#0B131F] leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#64748B]">Change Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry._id, e.target.value)}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#E8DFC8] bg-white outline-none cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(
                    selectedInquiry.subject || "Your inquiry with B.H.T Collections"
                  )}`}
                  className="px-4 py-2 bg-[#0B131F] hover:bg-[#1E2B3E] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Send Direct Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
