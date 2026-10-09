"use client";
// app/admin/products/page.tsx
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Sparkles,
  Home,
  Layers,
  X,
  RefreshCw,
  AlertCircle,
  UploadCloud,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { cleanImageUrl } from "@/lib/utils/image";

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  stock: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  featured: boolean;
  showOnHomepage: boolean;
  showOnCollection: boolean;
  additionalCategories?: string[];
  brand?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  status: "published" | "draft" | "disabled";
}

const defaultFormData = {
  name: "",
  category: "Blankets",
  categorySlug: "blankets",
  price: "",
  salePrice: "",
  originalPrice: "",
  stock: "50",
  image: "",
  description: "",
  shortDescription: "",
  featured: false,
  showOnHomepage: true,
  showOnCollection: true,
  additionalCategories: [],
  brand: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  status: "published",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [formData, setFormData] = useState<any>(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/products?";
      if (categoryFilter !== "all") url += `categorySlug=${categoryFilter}&`;
      if (search.trim()) url += `search=${encodeURIComponent(search.trim())}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error("Failed to load products", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/admin/brands");
      if (res.ok) {
        const data = await res.json();
        setBrands(data.brands || []);
      }
    } catch (e) {
      console.error("Failed to load brands", e);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error("Failed to load categories", e);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchCategories();
  }, [categoryFilter]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(defaultFormData);
    setErrorMsg("");
    setImageInputMode("upload");
    setModalOpen(true);
  };

  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      categorySlug: product.categorySlug,
      price: product.price.toString(),
      salePrice: product.salePrice ? product.salePrice.toString() : "",
      originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
      stock: product.stock.toString(),
      image: product.image,
      description: product.description,
      shortDescription: product.shortDescription,
      featured: product.featured,
      showOnHomepage: product.showOnHomepage,
      showOnCollection: product.showOnCollection,
      additionalCategories: product.additionalCategories || [],
      brand: (product as any).brand || "",
      metaTitle: (product as any).metaTitle || "",
      metaDescription: (product as any).metaDescription || "",
      keywords: (product as any).keywords ? (product as any).keywords.join(", ") : "",
      status: product.status,
    });
    setErrorMsg("");
    setImageInputMode(product.image?.startsWith("/uploads/") ? "upload" : "upload");
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
        setErrorMsg(data.error || "Failed to upload image. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Network error while uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
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
          setErrorMsg(data.error || "Failed to upload image");
        }
      } catch (err) {
        setErrorMsg("Failed to upload dropped image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const payload = {
      ...formData,
      image: cleanImageUrl(formData.image),
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : null,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stock: Number(formData.stock),
      keywords: typeof formData.keywords === 'string'
        ? formData.keywords.split(',').map((s: string) => s.trim()).filter((s: string) => s)
        : formData.keywords
    };

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct._id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setModalOpen(false);
        fetchProducts();
      } else {
        setErrorMsg(data.error || "Failed to save product");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteConfirmId(null);
        fetchProducts();
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const handleToggleStatus = async (product: ProductItem) => {
    const newStatus = product.status === "published" ? "draft" : "published";
    try {
      await fetch(`/api/admin/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchProducts();
    } catch (e) {
      console.error("Status toggle failed", e);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const selectedCat = categories.find(c => c.name === val);
    setFormData({
      ...formData,
      category: val,
      categorySlug: selectedCat ? selectedCat.slug : "uncategorized",
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.categorySlug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#0B131F]"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Products Management
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage your live e-commerce catalog, upload images from your device, and sync storefront displays in real time.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary !py-2.5 !px-5 text-xs font-bold self-start sm:self-auto flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E8DFC8] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs text-[#0B131F] placeholder-[#94A3B8] focus:border-[#D4AF37] focus:bg-white transition-all outline-none"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              categoryFilter === "all"
                ? "bg-[#0B131F] text-white shadow-xs"
                : "bg-[#FAF8F5] text-[#64748B] hover:text-[#0B131F] hover:bg-[#F2EBDC]"
            }`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setCategoryFilter(cat.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat.slug
                  ? "bg-[#0B131F] text-white shadow-xs"
                  : "bg-[#FAF8F5] text-[#64748B] hover:text-[#0B131F] hover:bg-[#F2EBDC]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#64748B] flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
            <p className="text-xs font-medium">Loading catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-[#64748B] space-y-3">
            <p className="text-sm font-semibold text-[#0B131F]">No products found</p>
            <p className="text-xs text-[#64748B]">Try searching with a different term or add a new product.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-[#E8DFC8] text-[#64748B] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Product</th>
                  <th className="px-4 py-3.5 font-bold">Category</th>
                  <th className="px-4 py-3.5 font-bold">Price</th>
                  <th className="px-4 py-3.5 font-bold">Stock</th>
                  <th className="px-4 py-3.5 font-bold">Homepage</th>
                  <th className="px-4 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EBDC] text-[#0B131F]">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    {/* Product info */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E8DFC8] overflow-hidden shrink-0">
                          <Image
                            src={product.image || "/collections/korean-super-soft-blanket.png"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#0B131F] text-xs line-clamp-1">{product.name}</p>
                          <p className="text-[10px] text-[#64748B] font-mono mt-0.5">slug: {product.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8DFC8] font-medium text-[11px] text-[#0B131F]">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-[#0B131F]">AED {product.price}</div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-[#94A3B8] line-through">AED {product.originalPrice}</div>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          product.stock < 15
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </td>

                    {/* Show on Homepage */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                          product.showOnHomepage
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.showOnHomepage ? <Sparkles className="w-2.5 h-2.5" /> : null}
                        {product.showOnHomepage ? "Featured" : "Hidden"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleToggleStatus(product)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          product.status === "published"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        {product.status === "published" ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-gray-500" />
                        )}
                        <span className="capitalize">{product.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 text-[#64748B] hover:text-[#0B131F] hover:bg-[#FAF8F5] rounded-lg transition-all"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete product"
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

      {/* =========================================================
          ADD / EDIT PRODUCT MODAL
      ========================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B131F]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E8DFC8] shadow-2xl max-w-2xl w-full overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0B131F] text-white flex items-center justify-between">
              <div>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair-display)" }}
                >
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <p className="text-[11px] text-white/70">
                  {editingProduct
                    ? "Update product details, pricing, stock, and imagery"
                    : "Create a new product and publish it immediately to your storefront"}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-[#0B131F]">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Product Name */}
              <div>
                <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Smartex Two-Ply Premium Blanket"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              {/* Category & Stock */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Primary Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={handleCategoryChange}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="50"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                  Additional Categories / Tags (comma separated slugs)
                </label>
                <input
                  type="text"
                  value={formData.additionalCategories?.join(", ") || ""}
                  onChange={(e) => setFormData({ ...formData, additionalCategories: e.target.value.split(",").map(s => s.trim()).filter(s => s) })}
                  placeholder="e.g. hotel-collection, summer-sale"
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              {/* Brand Selection */}
              <div>
                <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                  Brand
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                >
                  <option value="">No Brand (Optional)</option>
                  {brands.map(b => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Price & Original/Sale Price */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="280"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Original Price (Optional strikethrough)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="350"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD SECTION (File Upload / Drag & Drop / URL) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-[#0B131F] uppercase tracking-wider text-[11px]">
                    Product Image *
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
                      Image URL
                    </button>
                  </div>
                </div>

                {imageInputMode === "upload" ? (
                  <div>
                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {/* Drag & Drop Box */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                        uploading
                          ? "border-[#D4AF37] bg-amber-50/40"
                          : "border-[#D4AF37]/50 bg-[#FAF8F5] hover:bg-[#F2EBDC]/60 hover:border-[#D4AF37]"
                      }`}
                    >
                      {uploading ? (
                        <div className="py-4 flex flex-col items-center justify-center gap-2 text-[#D4AF37]">
                          <Loader2 className="w-8 h-8 animate-spin" />
                          <p className="text-xs font-bold">Uploading image from device...</p>
                        </div>
                      ) : formData.image ? (
                        <div className="flex items-center justify-between gap-4 p-2 bg-white rounded-xl border border-[#E8DFC8]">
                          <div className="flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#E8DFC8] shrink-0">
                              <Image
                                src={cleanImageUrl(formData.image)}
                                alt="Selected preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-[#0B131F] text-xs">Image Loaded</p>
                              <p className="text-[10px] text-[#64748B] font-mono truncate max-w-[240px]">
                                {formData.image}
                              </p>
                              <span className="inline-block text-[10px] text-[#D4AF37] font-bold mt-1">
                                Click to replace with another file
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData({ ...formData, image: "" });
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="py-5 flex flex-col items-center justify-center gap-2 text-[#64748B]">
                          <div className="w-10 h-10 rounded-full bg-amber-100/60 text-[#D4AF37] flex items-center justify-center">
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0B131F]">
                              Click here to choose an image from your device
                            </p>
                            <p className="text-[10px] text-[#94A3B8] mt-0.5">
                              Supports JPG, PNG, WEBP, JPEG up to 10MB (or drag &amp; drop)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg or /collections/korean-super-soft-blanket.png"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none font-mono"
                    />
                    <p className="text-[10px] text-[#94A3B8] mt-1">
                      Tip: Google Image search URLs are automatically converted to direct clean images.
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Crafted with ultra-fine microfiber for maximum warmth..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                />
              </div>

              {/* SEO Metadata */}
              <div className="pt-4 border-t border-[#F2EBDC] space-y-4">
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#64748B]">
                  SEO Metadata (Optional)
                </h4>

                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle || ""}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="Custom page title for search engines (leave blank to auto-generate)"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription || ""}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Short description for search engine results (150-160 chars recommended)"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.keywords || ""}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="e.g. premium blanket, korean blanket, soft bedding"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>
              </div>

              {/* Display & Status Switches */}
              <div className="p-4 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#64748B]">
                  Storefront Visibility &amp; Status
                </h4>

                <div className="grid sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showOnHomepage}
                      onChange={(e) => setFormData({ ...formData, showOnHomepage: e.target.checked })}
                      className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4"
                    />
                    <span className="font-semibold text-xs text-[#0B131F]">Show on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showOnCollection}
                      onChange={(e) => setFormData({ ...formData, showOnCollection: e.target.checked })}
                      className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4"
                    />
                    <span className="font-semibold text-xs text-[#0B131F]">Show on Collections</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4"
                    />
                    <span className="font-semibold text-xs text-[#0B131F]">Mark as Featured</span>
                  </label>
                </div>

                <div className="pt-2 border-t border-[#E8DFC8] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B131F]">Publishing Status</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="p-1.5 bg-white border border-[#E8DFC8] rounded-lg text-xs font-semibold focus:border-[#D4AF37] outline-none"
                  >
                    <option value="published">Published (Live on Website)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFC8]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8DFC8] text-[#64748B] hover:bg-[#FAF8F5] font-semibold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="btn-primary !py-2.5 !px-6 text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProduct ? "Update Product" : "Publish Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          DELETE CONFIRMATION MODAL
      ========================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B131F]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3
              className="text-base font-bold text-[#0B131F]"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Delete Product?
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Are you sure you want to permanently delete this product from your database and storefront?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 rounded-xl border border-[#E8DFC8] text-xs font-semibold text-[#64748B] hover:bg-[#FAF8F5]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
