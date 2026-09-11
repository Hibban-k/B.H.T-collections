"use client";
// app/admin/categories/page.tsx
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  X,
  Layers,
  AlertCircle,
  UploadCloud,
  Loader2,
} from "lucide-react";
import { cleanImageUrl } from "@/lib/utils/image";

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  type: "primary" | "secondary";
  status: "active" | "disabled";
  productCount: number;
}

const defaultFormData = {
  name: "",
  slug: "",
  description: "",
  image: "",
  type: "primary",
  status: "active",
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [formData, setFormData] = useState<any>(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error("Failed to load categories", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData(defaultFormData);
    setErrorMsg("");
    setImageInputMode("upload");
    setModalOpen(true);
  };

  const handleOpenEdit = (category: CategoryItem) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      type: category.type || "primary",
      status: category.status,
    });
    setErrorMsg("");
    setImageInputMode("upload");
    setModalOpen(true);
  };

  // Direct File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setErrorMsg("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setFormData((prev: any) => ({ ...prev, image: data.url }));
      } else {
        setErrorMsg(data.error || "Failed to upload image.");
      }
    } catch (err) {
      setErrorMsg("Network error while uploading category image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory._id}`
        : "/api/admin/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: cleanImageUrl(formData.image),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save category");
      }

      setModalOpen(false);
      await fetchCategories();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
        setDeleteConfirmId(null);
      }
    } catch (e) {
      console.error("Failed to delete category", e);
    }
  };

  const handleToggleStatus = async (cat: CategoryItem) => {
    const nextStatus = cat.status === "active" ? "disabled" : "active";
    try {
      const res = await fetch(`/api/admin/categories/${cat._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setCategories((prev) =>
          prev.map((c) => (c._id === cat._id ? { ...c, status: nextStatus } : c))
        );
      }
    } catch (e) {
      console.error("Failed to toggle category status", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0B131F]"
            style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
          >
            Categories Management
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Organize product taxonomies and showcase collections across the storefront.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchCategories}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E8DFC8] text-xs font-semibold text-[#0B131F] rounded-xl shadow-xs hover:border-[#D4AF37] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0B131F] text-[#E6C687] hover:bg-[#1A2433] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-[#8A95A5]">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[#8A95A5]">
            No categories available. Click &quot;Add Category&quot; to create one.
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-36 bg-[#FAF8F5] border-b border-[#E8DFC8] overflow-hidden">
                  <Image
                    src={cleanImageUrl(cat.image || "/categories/bedsheets.png")}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleToggleStatus(cat)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all shadow-xs ${
                        cat.status === "active"
                          ? "bg-[#0B131F] text-[#E6C687] border border-[#D4AF37]/50"
                          : "bg-[#8A95A5] text-white"
                      }`}
                    >
                      {cat.status}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3
                    className="text-base font-bold text-[#0B131F] flex items-center justify-between"
                    style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
                  >
                    <span>{cat.name}</span>
                    {cat.type === "secondary" && (
                      <span className="text-[9px] font-sans font-bold bg-[#FAF8F5] text-[#D4AF37] border border-[#E8DFC8] px-2 py-0.5 rounded uppercase tracking-widest">
                        Programmatic
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {cat.description || "No description provided."}
                  </p>
                </div>
              </div>

              {/* Footer / Actions */}
              <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFC8] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#8A95A5]">
                  slug: <code className="text-[#0B131F]">{cat.slug}</code>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0B131F] hover:bg-white transition-colors"
                    title="Edit Category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(cat._id)}
                    className="p-1.5 rounded-lg text-[#D92626] hover:bg-red-50 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E8DFC8] overflow-hidden animate-fade-in">
            <div className="p-6 bg-[#0B131F] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#E6C687] font-bold tracking-widest uppercase">
                  {editingCategory ? "Edit Category" : "New Category"}
                </span>
                <h3 className="text-xl font-bold font-serif text-white mt-0.5">
                  {editingCategory ? editingCategory.name : "Add New Category"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs text-[#0B131F]">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Blankets"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Category Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. blankets"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Category Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  >
                    <option value="primary">Primary (Main Taxonomies)</option>
                    <option value="secondary">Secondary / Programmatic Tag</option>
                  </select>
                </div>
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-[#0B131F] uppercase tracking-wider text-[11px]">
                    Category Image
                  </label>
                  <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-lg border border-[#E8DFC8] text-[10px]">
                    <button
                      type="button"
                      onClick={() => setImageInputMode("upload")}
                      className={`px-2 py-0.5 rounded font-bold transition-all ${
                        imageInputMode === "upload"
                          ? "bg-[#0B131F] text-white"
                          : "text-[#64748B] hover:text-[#0B131F]"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode("url")}
                      className={`px-2 py-0.5 rounded font-bold transition-all ${
                        imageInputMode === "url"
                          ? "bg-[#0B131F] text-white"
                          : "text-[#64748B] hover:text-[#0B131F]"
                      }`}
                    >
                      URL / Path
                    </button>
                  </div>
                </div>

                {imageInputMode === "upload" ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                        uploading
                          ? "border-[#D4AF37] bg-amber-50/40"
                          : "border-[#D4AF37]/50 bg-[#FAF8F5] hover:bg-[#F2EBDC]/60 hover:border-[#D4AF37]"
                      }`}
                    >
                      {uploading ? (
                        <div className="py-3 flex flex-col items-center justify-center gap-2 text-[#D4AF37]">
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <p className="text-xs font-bold">Uploading image from device...</p>
                        </div>
                      ) : formData.image ? (
                        <div className="flex items-center justify-between gap-4 p-2 bg-white rounded-xl border border-[#E8DFC8]">
                          <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#E8DFC8] shrink-0">
                              <Image
                                src={cleanImageUrl(formData.image)}
                                alt="Selected preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-[#0B131F] text-xs">Image Loaded</p>
                              <span className="inline-block text-[10px] text-[#D4AF37] font-bold">
                                Click to choose another file
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-4 flex flex-col items-center justify-center gap-2 text-[#64748B]">
                          <div className="w-8 h-8 rounded-full bg-amber-100/60 text-[#D4AF37] flex items-center justify-center">
                            <UploadCloud className="w-4 h-4" />
                          </div>
                          <p className="text-xs font-bold text-[#0B131F]">
                            Click here to select an image from your device
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/categories/bedsheets.png"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none font-mono"
                  />
                )}
              </div>

              <div>
                <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description for collection banners..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E8DFC8]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#E8DFC8] text-[#64748B] hover:text-[#0B131F] font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-5 py-2 bg-[#0B131F] text-[#E6C687] hover:bg-[#1A2433] font-bold rounded-xl text-xs uppercase tracking-wider shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingCategory ? "Update Category" : "Create Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-[#E8DFC8] p-6 space-y-4">
            <h3
              className="text-lg font-bold text-[#0B131F]"
              style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
            >
              Delete Category?
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-white border border-[#E8DFC8] text-[#64748B] hover:text-[#0B131F] font-semibold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-[#D92626] text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-red-700 shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
