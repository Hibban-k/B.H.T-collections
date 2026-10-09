"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  RefreshCw,
  AlertCircle,
  Globe
} from "lucide-react";

interface RegionItem {
  _id: string;
  name: string;
  code: string;
  currency: string;
  metaTitleSuffix: string;
  metaDescriptionTemplate: string;
  isActive: boolean;
}

const defaultFormData = {
  name: "",
  code: "",
  currency: "AED",
  metaTitleSuffix: "",
  metaDescriptionTemplate: "",
  isActive: true,
};

export default function RegionsPage() {
  const [regions, setRegions] = useState<RegionItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<RegionItem | null>(null);
  const [formData, setFormData] = useState<any>(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchRegions = async () => {
    setLoading(true);
    try {
      // Pass includeInactive=true for admin to see all regions
      const res = await fetch("/api/admin/regions?includeInactive=true");
      if (res.ok) {
        const data = await res.json();
        setRegions(data.regions || []);
      }
    } catch (e) {
      console.error("Failed to load regions", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleOpenAdd = () => {
    setEditingRegion(null);
    setFormData(defaultFormData);
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleOpenEdit = (region: RegionItem) => {
    setEditingRegion(region);
    setFormData({
      name: region.name,
      code: region.code,
      currency: region.currency || "AED",
      metaTitleSuffix: region.metaTitleSuffix || "",
      metaDescriptionTemplate: region.metaDescriptionTemplate || "",
      isActive: region.isActive,
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const url = editingRegion
        ? `/api/admin/regions/${editingRegion._id}`
        : "/api/admin/regions";
      const method = editingRegion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setModalOpen(false);
        fetchRegions();
      } else {
        setErrorMsg(data.error || "Failed to save region");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save region");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this region?")) return;
    try {
      const res = await fetch(`/api/admin/regions/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchRegions();
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const handleToggleStatus = async (region: RegionItem) => {
    try {
      await fetch(`/api/admin/regions/${region._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !region.isActive }),
      });
      fetchRegions();
    } catch (e) {
      console.error("Status toggle failed", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0B131F]"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Regions &amp; Programmatic SEO
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage your localized store variants (e.g. /ae, /sa) and their SEO metadata templates.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-bht-charcoal text-[#E6C687] hover:bg-[#1A2433] text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Region</span>
        </button>
      </div>

      {/* Regions Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#64748B] flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
            <p className="text-xs font-medium">Loading regions...</p>
          </div>
        ) : regions.length === 0 ? (
          <div className="p-12 text-center text-[#64748B] space-y-3">
            <Globe className="w-8 h-8 mx-auto text-[#D4AF37]" />
            <p className="text-sm font-semibold text-[#0B131F]">No regions found</p>
            <p className="text-xs text-[#64748B]">Add a region (like 'ae' for UAE) to start generating localized URLs.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-[#E8DFC8] text-[#64748B] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Region Name</th>
                  <th className="px-4 py-3.5 font-bold">Code (URL)</th>
                  <th className="px-4 py-3.5 font-bold">Currency</th>
                  <th className="px-4 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EBDC] text-[#0B131F]">
                {regions.map((region) => (
                  <tr key={region._id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center text-[#64748B]">
                          <Globe className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[#0B131F] text-xs">{region.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8DFC8] font-medium text-[11px] text-[#0B131F]">
                        /{region.code}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#64748B]">
                      {region.currency}
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleToggleStatus(region)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          region.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        {region.isActive ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                        <span className="capitalize">{region.isActive ? "Active" : "Inactive"}</span>
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(region)}
                          className="p-1.5 text-[#64748B] hover:text-[#0B131F] hover:bg-[#FAF8F5] rounded-lg transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(region._id)}
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

      {/* Add / Edit Region Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B131F]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E8DFC8] shadow-2xl max-w-xl w-full overflow-hidden">
            <div className="px-6 py-4 bg-[#0B131F] text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair-display)" }}>
                  {editingRegion ? "Edit Region" : "Add Region"}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Region Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. United Arab Emirates"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Region Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toLowerCase() })}
                    placeholder="e.g. ae, sa, om"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                  <p className="text-[10px] text-[#64748B] mt-1">This forms the URL (e.g. /ae)</p>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Currency</label>
                <input
                  type="text"
                  required
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value.toUpperCase() })}
                  placeholder="e.g. AED"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#F2EBDC] space-y-4">
                <h4 className="font-bold text-[11px] uppercase tracking-wider text-[#64748B]">Programmatic SEO Templates</h4>
                <p className="text-[10px] text-[#64748B]">
                  These templates automatically inject localization into your meta titles and descriptions for this specific region. Use <code>{`{{region_name}}`}</code> as a placeholder.
                </p>
                
                <div>
                  <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Meta Title Suffix</label>
                  <input
                    type="text"
                    value={formData.metaTitleSuffix}
                    onChange={(e) => setFormData({ ...formData, metaTitleSuffix: e.target.value })}
                    placeholder="e.g. | Premium Blankets in {{region_name}}"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>
                
                <div>
                  <label className="block font-bold mb-1 uppercase tracking-wider text-[11px]">Meta Description Template</label>
                  <textarea
                    rows={2}
                    value={formData.metaDescriptionTemplate}
                    onChange={(e) => setFormData({ ...formData, metaDescriptionTemplate: e.target.value })}
                    placeholder="e.g. Shop our premium collections in {{region_name}}. Free shipping across the {{region_name}}..."
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
                  <span>{saving ? "Saving..." : "Save Region"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
