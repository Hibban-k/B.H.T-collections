"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { cleanImageUrl } from "@/lib/utils/image";

interface BrandItem {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  isActive: boolean;
}

const defaultFormData = {
  name: "",
  slug: "",
  logo: "",
  description: "",
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  isActive: true,
};

export default function BrandsPage() {
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [formData, setFormData] = useState<any>(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/brands");
      if (res.ok) {
        const data = await res.json();
        setBrands(data.brands || []);
      }
    } catch (e) {
      console.error("Failed to load brands", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setFormData(defaultFormData);
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleOpenEdit = (brand: BrandItem) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      logo: brand.logo,
      description: brand.description,
      metaTitle: brand.metaTitle || "",
      metaDescription: brand.metaDescription || "",
      keywords: brand.keywords || [],
      isActive: brand.isActive,
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const payload = {
      ...formData,
      logo: cleanImageUrl(formData.logo),
    };

    try {
      const url = editingBrand
        ? `/api/admin/brands/${editingBrand._id}`
        : "/api/admin/brands";
      const method = editingBrand ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setModalOpen(false);
        fetchBrands();
      } else {
        setErrorMsg(data.error || "Failed to save brand");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save brand");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;
    try {
      const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchBrands();
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const handleToggleStatus = async (brand: BrandItem) => {
    try {
      await fetch(`/api/admin/brands/${brand._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !brand.isActive }),
      });
      fetchBrands();
    } catch (e) {
      console.error("Status toggle failed", e);
    }
  };

  const filteredBrands = brands.filter(
    (b) =>
      search.trim() === "" ||
      b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0B131F]"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Brands Management
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage product brands, logos, and SEO metadata.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-bht-charcoal text-[#E6C687] hover:bg-[#1A2433] text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Brand</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E8DFC8] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search brands by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs text-[#0B131F] placeholder-[#94A3B8] focus:border-[#D4AF37] focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#64748B] flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
            <p className="text-xs font-medium">Loading brands...</p>
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="p-12 text-center text-[#64748B] space-y-3">
            <p className="text-sm font-semibold text-[#0B131F]">No brands found</p>
            <p className="text-xs text-[#64748B]">Try searching with a different term or add a new brand.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-[#E8DFC8] text-[#64748B] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Brand</th>
                  <th className="px-4 py-3.5 font-bold">Slug</th>
                  <th className="px-4 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EBDC] text-[#0B131F]">
                {filteredBrands.map((brand) => (
                  <tr key={brand._id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold text-[#94A3B8]">
                          {brand.logo ? (
                            <Image src={brand.logo} alt={brand.name} fill className="object-cover" />
                          ) : (
                            brand.name.charAt(0)
                          )}
                        </div>
                        <span className="font-bold text-[#0B131F] text-xs">{brand.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8DFC8] font-medium text-[11px] text-[#0B131F]">
                        {brand.slug}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleToggleStatus(brand)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          brand.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        {brand.isActive ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                        <span className="capitalize">{brand.isActive ? "Active" : "Inactive"}</span>
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(brand)}
                          className="p-1.5 text-[#64748B] hover:text-[#0B131F] hover:bg-[#FAF8F5] rounded-lg transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Brand Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B131F]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E8DFC8] shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 bg-[#0B131F] text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  {editingBrand ? "Edit Brand" : "Add Brand"}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-[#0B131F]">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Blankethouse"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Logo URL (Optional)</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#F2EBDC] space-y-4">
                <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#64748B]">SEO Metadata</h4>
                
                <div>
                  <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>
                
                <div>
                  <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Meta Description</label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>
                
                <div>
                  <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Keywords (comma separated)</label>
                  <input
                    type="text"
                    value={formData.keywords?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value.split(",").map(s => s.trim()).filter(s => s) })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2EBDC] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 text-[#64748B] font-bold hover:text-[#0B131F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#0B131F] text-[#E6C687] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#1A2433] transition-colors flex items-center gap-2"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  <span>{saving ? "Saving..." : "Save Brand"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
