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

export interface ProductVariantItem {
  name: string;
  sku?: string;
  size?: string;
  color?: string;
  price?: number;
  salePrice?: number;
  stock?: number;
  image?: string;
}

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  category: string;
  categorySlug: string;
  subcategoryId?: string | null;
  subcategorySlug?: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  stock: number;
  image: string;
  images: string[];
  variants?: ProductVariantItem[];
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
  slug: "",
  sku: "",
  category: "",
  categorySlug: "",
  subcategoryId: "",
  subcategorySlug: "",
  price: "",
  salePrice: "",
  originalPrice: "",
  stock: "50",
  image: "",
  images: [] as string[],
  variants: [] as ProductVariantItem[],
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
  const [uploadingVariantIndex, setUploadingVariantIndex] = useState<number | null>(null);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slotFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
    setFormData({ ...defaultFormData, images: [] });
    setErrorMsg("");
    setImageInputMode("upload");
    setModalOpen(true);
  };

  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct(product);
    const initialImages = Array.isArray(product.images) && product.images.length > 0
      ? product.images.slice(0, 4)
      : product.image ? [product.image] : [];

    setFormData({
      name: product.name,
      slug: product.slug || "",
      sku: product.sku || "",
      category: product.category,
      categorySlug: product.categorySlug,
      subcategoryId: product.subcategoryId || "",
      subcategorySlug: product.subcategorySlug || "",
      price: product.price.toString(),
      salePrice: product.salePrice ? product.salePrice.toString() : "",
      originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
      stock: product.stock.toString(),
      image: product.image || initialImages[0] || "",
      images: initialImages,
      variants: product.variants || [],
      description: product.description,
      shortDescription: product.shortDescription,
      featured: product.featured,
      showOnHomepage: product.showOnHomepage,
      showOnCollection: product.showOnCollection,
      additionalCategories: product.additionalCategories || [],
      brand: (product as any).brand?._id ? String((product as any).brand._id) : ((product as any).brand || ""),
      metaTitle: (product as any).metaTitle || "",
      metaDescription: (product as any).metaDescription || "",
      keywords: (product as any).keywords ? (product as any).keywords.join(", ") : "",
      status: product.status,
    });
    setErrorMsg("");
    setImageInputMode("upload");
    setModalOpen(true);
  };

  // Upload helper for single file
  const uploadSingleFile = async (file: File): Promise<string> => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("folder", "products/images");

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();
    if (res.ok && data.success && data.url) {
      return data.url;
    }
    throw new Error(data.error || `Failed to upload ${file.name}`);
  };

  // Multiple File Upload Handler (Up to 4 images)
  const handleUploadFiles = async (filesList: FileList | File[], replaceIndex?: number) => {
    const files = Array.from(filesList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;

    setUploading(true);
    setErrorMsg("");

    try {
      if (replaceIndex !== undefined && replaceIndex >= 0) {
        // Replacing a specific slot
        const url = await uploadSingleFile(files[0]);
        setFormData((prev: any) => {
          const current = [...(prev.images || [])];
          while (current.length <= replaceIndex) {
            current.push("");
          }
          current[replaceIndex] = url;
          const clean = current.filter(Boolean).slice(0, 4);
          return {
            ...prev,
            images: clean,
            image: clean[0] || "",
          };
        });
      } else {
        // Appending images up to max 4
        const currentImages = [...(formData.images || [])];
        const remaining = Math.max(0, 4 - currentImages.length);

        if (remaining <= 0) {
          setErrorMsg("Maximum of 4 product images reached. Remove an image to upload more, or replace a slot.");
          setUploading(false);
          return;
        }

        const filesToUpload = files.slice(0, remaining);
        const uploadedUrls: string[] = [];

        for (const file of filesToUpload) {
          const url = await uploadSingleFile(file);
          if (url) uploadedUrls.push(url);
        }

        setFormData((prev: any) => {
          const combined = [...(prev.images || []), ...uploadedUrls].slice(0, 4);
          return {
            ...prev,
            images: combined,
            image: combined[0] || prev.image || "",
          };
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload image(s).");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev: any) => {
      const updated = [...(prev.images || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        images: updated,
        image: updated[0] || "",
      };
    });
  };

  const handleSetCoverImage = (index: number) => {
    if (index === 0) return;
    setFormData((prev: any) => {
      const updated = [...(prev.images || [])];
      const [selected] = updated.splice(index, 1);
      if (selected) {
        updated.unshift(selected);
      }
      return {
        ...prev,
        images: updated,
        image: updated[0] || "",
      };
    });
  };

  // Variant Image Upload Handler
  const handleVariantImageUpload = async (file: File, variantIndex: number) => {
    setUploadingVariantIndex(variantIndex);
    setErrorMsg("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "products/variants");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        const updated = [...formData.variants];
        updated[variantIndex].image = data.url;
        setFormData({ ...formData, variants: updated });
      } else {
        setErrorMsg(data.error || "Failed to upload variant image.");
      }
    } catch (err) {
      setErrorMsg("Network error while uploading variant image.");
    } finally {
      setUploadingVariantIndex(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const trimmedName = formData.name?.trim();
    if (!trimmedName) {
      setErrorMsg("Product name is required.");
      setSaving(false);
      return;
    }

    const trimmedSlug = (formData.slug || trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")).trim().toLowerCase();

    // Client-side uniqueness check
    const duplicate = products.find((p) => {
      if (editingProduct && p._id === editingProduct._id) return false;
      const sameName = p.name.trim().toLowerCase() === trimmedName.toLowerCase();
      const sameSlug = p.slug?.trim().toLowerCase() === trimmedSlug;
      return sameName || sameSlug;
    });

    if (duplicate) {
      if (duplicate.name.trim().toLowerCase() === trimmedName.toLowerCase()) {
        setErrorMsg(`A product with the name "${trimmedName}" already exists.`);
        setSaving(false);
        return;
      }
      if (duplicate.slug?.trim().toLowerCase() === trimmedSlug) {
        setErrorMsg(`A product with the slug "${trimmedSlug}" already exists.`);
        setSaving(false);
        return;
      }
    }

    // Home screen featured limit: max 4 products per main category
    if (formData.showOnHomepage || formData.featured) {
      const getCategoryGroup = (cat?: string, catSlug?: string) => {
        const s = `${cat || ""} ${catSlug || ""}`.toLowerCase();
        if (s.includes("travel") || s.includes("bag") || s.includes("trolley") || s.includes("trolly") || s.includes("luggage")) {
          return "travel-bags";
        }
        if (s.includes("footwear") || s.includes("shoe") || s.includes("slipper") || s.includes("flip-flop") || s.includes("clog")) {
          return "footwear";
        }
        return "bedding";
      };

      const targetGroup = getCategoryGroup(formData.category, formData.categorySlug);
      const featuredCount = products.filter((p) => {
        if (editingProduct && p._id === editingProduct._id) return false;
        return (
          getCategoryGroup(p.category, p.categorySlug) === targetGroup &&
          (p.showOnHomepage || p.featured)
        );
      }).length;

      if (featuredCount >= 4) {
        setErrorMsg(
          `A maximum of 4 products in category "${formData.category || 'this category'}" can be featured / shown on the home screen. There are already 4 featured products in this category. More than 4 is restricted. Please uncheck another product first.`
        );
        setSaving(false);
        return;
      }
    }

    const cleanImgs = (formData.images || [])
      .map((img: string) => cleanImageUrl(img))
      .filter((img: string) => img && img.trim().length > 0)
      .slice(0, 4);

    const primaryImg = cleanImgs[0] || cleanImageUrl(formData.image) || "";
    if (primaryImg && !cleanImgs.includes(primaryImg)) {
      cleanImgs.unshift(primaryImg);
    }

    const payload = {
      ...formData,
      name: trimmedName,
      slug: trimmedSlug,
      sku: formData.sku ? formData.sku.trim().toUpperCase() : undefined,
      image: primaryImg,
      images: cleanImgs.slice(0, 4),
      brand: formData.brand && formData.brand.trim() !== "" ? formData.brand.trim() : null,
      subcategoryId: formData.subcategoryId && formData.subcategoryId.trim() !== "" ? formData.subcategoryId.trim() : null,
      subcategorySlug: formData.subcategorySlug || "",
      variants: Array.isArray(formData.variants) ? formData.variants : [],
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
      subcategoryId: "",
      subcategorySlug: "",
    });
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subId = e.target.value;
    const selectedSub = categories.find(c => c._id === subId);
    setFormData({
      ...formData,
      subcategoryId: subId,
      subcategorySlug: selectedSub ? selectedSub.slug : "",
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
                          <div className="flex items-center gap-2 mt-0.5">
                            {product.sku && (
                              <span className="text-[10px] bg-white border border-[#E8DFC8] px-1.5 py-0.5 rounded text-[#0B131F] font-mono font-bold">
                                SKU: {product.sku}
                              </span>
                            )}
                            {product.variants && product.variants.length > 0 && (
                              <span className="text-[10px] text-[#D4AF37] font-semibold">
                                {product.variants.length} variant{product.variants.length > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Connected Brand */}
                    <td className="px-4 py-3.5">
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8DFC8] font-medium text-[11px] text-[#0B131F]">
                          {product.category}
                        </span>
                        {(() => {
                          const productBrand = brands.find((b) => b._id === product.brand || b.name === product.brand);
                          if (productBrand) {
                            return (
                              <div className="text-[10px] text-[#64748B] flex items-center gap-1 font-semibold">
                                <span className="text-[#D4AF37]">★</span> {productBrand.name}
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
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

              {/* Product Name, Slug & Parent SKU */}
              <div className="grid sm:grid-cols-12 gap-4">
                <div className="sm:col-span-5">
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      const autoSlug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                      setFormData((prev: any) => ({
                        ...prev,
                        name: newName,
                        slug: (!editingProduct && (!prev.slug || prev.slug === prev.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")))
                          ? autoSlug
                          : prev.slug,
                      }));
                    }}
                    placeholder="e.g. Smartex Two-Ply Premium Blanket"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Product Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ""}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    placeholder="e.g. smartex-two-ply-premium-blanket"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none font-mono"
                  />
                  <p className="text-[10px] text-[#64748B] mt-0.5">Unique URL identifier</p>
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Parent SKU (Unique)
                  </label>
                  <input
                    type="text"
                    value={formData.sku || ""}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                    placeholder="e.g. BHT-BL-01"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none font-mono uppercase"
                  />
                  <p className="text-[10px] text-[#64748B] mt-0.5">Base code for variants</p>
                </div>
              </div>

              {/* Category & Subcategory */}
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
                    {categories
                      .filter((cat) => !cat.parentId) // Only top-level categories
                      .map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    {/* Fallback for legacy categories that might have parentId set */}
                    {categories.filter((cat) => !cat.parentId).length === 0 &&
                      categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                    Subcategory (Optional)
                  </label>
                  {(() => {
                    const currentParentCat = categories.find(
                      (c) => c.name === formData.category
                    );
                    const availableSubs = categories.filter(
                      (c) => currentParentCat && c.parentId === currentParentCat._id
                    );

                    return (
                      <select
                        value={formData.subcategoryId || ""}
                        onChange={handleSubcategoryChange}
                        disabled={!currentParentCat || availableSubs.length === 0}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none disabled:opacity-50"
                      >
                        <option value="">
                          {availableSubs.length === 0
                            ? "No subcategories for this category"
                            : "Select subcategory (optional)"}
                        </option>
                        {availableSubs.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    );
                  })()}
                </div>
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block font-bold text-[#0B131F] mb-1 uppercase tracking-wider text-[11px]">
                  Default Stock Quantity *
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
                  {brands.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}{b.category ? ` (${b.category})` : ""}
                    </option>
                  ))}
                </select>
                {(() => {
                  const selectedBrand = brands.find(
                    (b) => b._id === formData.brand || b.name === formData.brand
                  );
                  if (selectedBrand && selectedBrand.category) {
                    return (
                      <p className="text-[10px] text-[#246783] mt-1 font-medium">
                        Connected Category: <span className="font-bold">{selectedBrand.category}</span>
                      </p>
                    );
                  }
                  return null;
                })()}
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

              {/* IMAGE UPLOAD SECTION (Multi-Image 4 slots / Drag & Drop / URL) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-bold text-[#0B131F] uppercase tracking-wider text-[11px]">
                      Product Images (Up to 4 images) *
                    </label>
                    <p className="text-[10px] text-[#64748B]">
                      Upload up to 4 images. The 1st image is the primary cover. Drag & drop files onto slots or dropzone.
                    </p>
                  </div>
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
                      Upload Files
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
                      Image URLs
                    </button>
                  </div>
                </div>

                {imageInputMode === "upload" ? (
                  <div className="space-y-3">
                    {/* Hidden multi-file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleUploadFiles(e.target.files);
                          e.target.value = "";
                        }
                      }}
                      className="hidden"
                    />

                    {/* Main Drag & Drop Zone if fewer than 4 images */}
                    {(!formData.images || formData.images.length < 4) && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsDraggingOver(true);
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsDraggingOver(false);
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsDraggingOver(false);
                          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                            handleUploadFiles(e.dataTransfer.files);
                          }
                        }}
                        className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                          isDraggingOver
                            ? "border-[#D4AF37] bg-amber-50/80 scale-[1.01]"
                            : uploading
                            ? "border-[#D4AF37] bg-amber-50/40"
                            : "border-[#D4AF37]/50 bg-[#FAF8F5] hover:bg-[#F2EBDC]/60 hover:border-[#D4AF37]"
                        }`}
                      >
                        {uploading ? (
                          <div className="py-2 flex flex-col items-center justify-center gap-2 text-[#D4AF37]">
                            <Loader2 className="w-7 h-7 animate-spin" />
                            <p className="text-xs font-bold">Uploading product image(s)...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2 text-[#64748B]">
                            <div className="w-10 h-10 rounded-full bg-amber-100/70 text-[#D4AF37] flex items-center justify-center">
                              <UploadCloud className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#0B131F]">
                                Click or drag &amp; drop images here ({4 - (formData.images?.length || 0)} slot{(4 - (formData.images?.length || 0)) > 1 ? "s" : ""} remaining)
                              </p>
                              <p className="text-[10px] text-[#94A3B8] mt-0.5">
                                Select up to 4 images (JPG, PNG, WEBP, JPEG). You can drop multiple files at once.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 4 Image Slots Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[0, 1, 2, 3].map((slotIdx) => {
                        const imgUrl = formData.images?.[slotIdx];
                        const isCover = slotIdx === 0;

                        return (
                          <div
                            key={slotIdx}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                handleUploadFiles(e.dataTransfer.files, slotIdx);
                              }
                            }}
                            className={`relative rounded-xl border p-2 flex flex-col items-center justify-between text-center transition-all min-h-[140px] ${
                              imgUrl
                                ? isCover
                                  ? "bg-amber-50/30 border-[#D4AF37] ring-1 ring-[#D4AF37]/50"
                                  : "bg-white border-[#E8DFC8]"
                                : "border-dashed border-[#D8D4CC] bg-[#FAF8F5] hover:bg-[#F2EBDC]/50 cursor-pointer"
                            }`}
                            onClick={() => {
                              if (!imgUrl) {
                                slotFileInputRefs.current[slotIdx]?.click();
                              }
                            }}
                          >
                            <input
                              ref={(el) => {
                                slotFileInputRefs.current[slotIdx] = el;
                              }}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  handleUploadFiles(e.target.files, slotIdx);
                                  e.target.value = "";
                                }
                              }}
                              className="hidden"
                            />

                            {imgUrl ? (
                              <>
                                <div className="w-full flex items-center justify-between mb-1">
                                  <span
                                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                      isCover
                                        ? "bg-[#D4AF37] text-white"
                                        : "bg-gray-100 text-[#64748B]"
                                    }`}
                                  >
                                    {isCover ? "Cover (Main)" : `Image ${slotIdx + 1}`}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveImage(slotIdx);
                                    }}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                    title="Remove image"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="relative w-full h-20 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#E8DFC8] my-1">
                                  <Image
                                    src={cleanImageUrl(imgUrl)}
                                    alt={`Product image ${slotIdx + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div className="w-full flex items-center justify-center gap-2 mt-1">
                                  {!isCover && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetCoverImage(slotIdx);
                                      }}
                                      className="text-[9px] font-bold text-[#D4AF37] hover:underline"
                                      title="Set as cover image"
                                    >
                                      Make Cover
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      slotFileInputRefs.current[slotIdx]?.click();
                                    }}
                                    className="text-[9px] font-medium text-[#64748B] hover:text-[#0B131F]"
                                    title="Replace this image"
                                  >
                                    Replace
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-4 text-[#94A3B8] h-full w-full">
                                <div className="w-8 h-8 rounded-full border border-dashed border-[#CBD5E1] flex items-center justify-center mb-1">
                                  <Plus className="w-4 h-4 text-[#94A3B8]" />
                                </div>
                                <span className="text-[10px] font-bold text-[#64748B]">
                                  Slot {slotIdx + 1}
                                </span>
                                <span className="text-[8px] text-[#94A3B8]">
                                  Click or drop file
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <textarea
                      rows={3}
                      value={
                        formData.images && formData.images.length > 0
                          ? formData.images.join("\n")
                          : formData.image || ""
                      }
                      onChange={(e) => {
                        const lines = e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean)
                          .slice(0, 4);
                        setFormData({
                          ...formData,
                          images: lines,
                          image: lines[0] || "",
                        });
                      }}
                      placeholder="Enter up to 4 image URLs (one per line):&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none font-mono text-xs"
                    />
                    <p className="text-[10px] text-[#94A3B8] mt-1">
                      Enter up to 4 image URLs (one per line). First image is used as primary cover.
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
                <div className="flex items-center justify-between">
                  <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#64748B]">
                    Storefront Visibility &amp; Status
                  </h4>
                  {(() => {
                    const getCategoryGroup = (cat?: string, catSlug?: string) => {
                      const s = `${cat || ""} ${catSlug || ""}`.toLowerCase();
                      if (s.includes("travel") || s.includes("bag") || s.includes("trolley") || s.includes("trolly") || s.includes("luggage")) {
                        return "travel-bags";
                      }
                      if (s.includes("footwear") || s.includes("shoe") || s.includes("slipper") || s.includes("flip-flop") || s.includes("clog")) {
                        return "footwear";
                      }
                      return "bedding";
                    };
                    const targetGroup = getCategoryGroup(formData.category, formData.categorySlug);
                    const featuredCount = products.filter((p) => {
                      if (editingProduct && p._id === editingProduct._id) return false;
                      return (
                        getCategoryGroup(p.category, p.categorySlug) === targetGroup &&
                        (p.showOnHomepage || p.featured)
                      );
                    }).length;
                    const isLimitReached = featuredCount >= 4;

                    return (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isLimitReached
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {featuredCount}/4 Home Featured in category
                      </span>
                    );
                  })()}
                </div>

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

              {/* =========================================================
                  PRODUCT VARIANTS SECTION
              ========================================================= */}
              <div className="pt-4 border-t border-[#F2EBDC] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#0B131F]">
                      Product Variants
                    </h4>
                    <p className="text-[10px] text-[#64748B]">
                      Add sizes, colors, custom pricing, and SKUs (e.g. King / Royal Blue).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const baseSku = formData.sku ? formData.sku.trim().toUpperCase() : "";
                      const nextIndex = (formData.variants?.length || 0) + 1;
                      const defaultVariantSku = baseSku ? `${baseSku}-VAR${nextIndex}` : "";

                      setFormData({
                        ...formData,
                        variants: [
                          ...(formData.variants || []),
                          {
                            name: "",
                            size: "",
                            color: "",
                            price: formData.price ? Number(formData.price) : undefined,
                            stock: 10,
                            sku: defaultVariantSku,
                          },
                        ],
                      });
                    }}
                    className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#D4AF37] rounded-xl text-xs font-bold text-[#0B131F] flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Add Variant</span>
                  </button>
                </div>

                {formData.variants && formData.variants.length > 0 ? (
                  <div className="space-y-3">
                    {formData.variants.map((v: any, index: number) => (
                      <div
                        key={index}
                        className="p-3.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-2xl space-y-3 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] uppercase tracking-wider text-[#64748B]">
                            Variant #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...formData.variants];
                              updated.splice(index, 1);
                              setFormData({ ...formData, variants: updated });
                            }}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete variant"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#64748B] mb-1">
                              Variant Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. King Size - Blue"
                              value={v.name}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                updated[index].name = e.target.value;
                                setFormData({ ...formData, variants: updated });
                              }}
                              className="w-full p-2 bg-white border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] outline-none text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#64748B] mb-1">
                              Size
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. King (220x240)"
                              value={v.size || ""}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                const newSize = e.target.value;
                                updated[index].size = newSize;
                                setFormData({ ...formData, variants: updated });
                              }}
                              className="w-full p-2 bg-white border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] outline-none text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#64748B] mb-1">
                              Color
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Royal Navy"
                              value={v.color || ""}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                const newColor = e.target.value;
                                updated[index].color = newColor;
                                setFormData({ ...formData, variants: updated });
                              }}
                              className="w-full p-2 bg-white border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] outline-none text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#64748B] mb-1">
                              Price (AED)
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              placeholder="AED Price"
                              value={v.price !== undefined ? v.price : ""}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                updated[index].price = e.target.value ? Number(e.target.value) : undefined;
                                setFormData({ ...formData, variants: updated });
                              }}
                              className="w-full p-2 bg-white border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] outline-none text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-[#64748B] mb-1">
                              Stock Quantity
                            </label>
                            <input
                              type="number"
                              min="0"
                              placeholder="10"
                              value={v.stock !== undefined ? v.stock : ""}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                updated[index].stock = Number(e.target.value) || 0;
                                setFormData({ ...formData, variants: updated });
                              }}
                              className="w-full p-2 bg-white border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] outline-none text-xs"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-[10px] font-bold uppercase text-[#64748B]">
                                Variant SKU
                              </label>
                              {formData.sku && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const base = formData.sku.trim().toUpperCase();
                                    const s = v.size ? v.size.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase() : "";
                                    const c = v.color ? v.color.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase() : "";
                                    const suffix = [s, c].filter(Boolean).join("-") || `VAR${index + 1}`;
                                    const updated = [...formData.variants];
                                    updated[index].sku = `${base}-${suffix}`;
                                    setFormData({ ...formData, variants: updated });
                                  }}
                                  className="text-[9px] text-[#D4AF37] font-bold hover:underline"
                                  title="Auto-format using Parent SKU + Size/Color"
                                >
                                  Auto-generate
                                </button>
                              )}
                            </div>
                            <input
                              type="text"
                              placeholder={formData.sku ? `${formData.sku}-K-BLU` : "e.g. BHT-BL-K-01"}
                              value={v.sku || ""}
                              onChange={(e) => {
                                const updated = [...formData.variants];
                                updated[index].sku = e.target.value.toUpperCase();
                                setFormData({ ...formData, variants: updated });
                              }}
                              className="w-full p-2 bg-white border border-[#E8DFC8] rounded-xl focus:border-[#D4AF37] outline-none text-xs font-mono uppercase"
                            />
                          </div>
                        </div>

                        {/* Variant Image Upload Button & Preview */}
                        <div className="pt-2 border-t border-[#E8DFC8] flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {v.image ? (
                              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#E8DFC8] shrink-0 bg-white">
                                <Image
                                  src={cleanImageUrl(v.image)}
                                  alt={v.name || "Variant preview"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-9 h-9 rounded-lg border border-dashed border-[#E8DFC8] flex items-center justify-center text-[#94A3B8] shrink-0 bg-white">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            )}

                            <div>
                              <p className="text-[10px] font-bold text-[#0B131F]">
                                {v.image ? "Variant Image Attached" : "No Variant Image"}
                              </p>
                              <p className="text-[9px] text-[#64748B]">
                                {v.image ? "Overrides main product image when selected" : "Will use main product image"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <label
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                  handleVariantImageUpload(e.dataTransfer.files[0], index);
                                }
                              }}
                              className="cursor-pointer px-2.5 py-1.5 bg-white hover:bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#D4AF37] text-[11px] font-bold rounded-xl text-[#0B131F] flex items-center gap-1.5 transition-colors"
                            >
                              {uploadingVariantIndex === index ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                                  <span>Uploading...</span>
                                </>
                              ) : (
                                <>
                                  <UploadCloud className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{v.image ? "Change Image" : "Upload Image"}</span>
                                </>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                disabled={uploadingVariantIndex !== null}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleVariantImageUpload(e.target.files[0], index);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>

                            {v.image && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...formData.variants];
                                  updated[index].image = "";
                                  setFormData({ ...formData, variants: updated });
                                }}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove variant image"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-[#FAF8F5] border border-dashed border-[#E8DFC8] rounded-2xl text-center text-[#64748B]">
                    <p className="text-xs">No variants added. This product will use the single default price & stock above.</p>
                  </div>
                )}
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
