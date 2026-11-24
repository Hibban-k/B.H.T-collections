"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, CheckCircle2, MessageCircle, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface OrderModalItem {
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
  sku?: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderModalItem[];
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    city: "Dubai",
    street: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [placedOrder, setPlacedOrder] = useState<{
    orderNumber: string;
    whatsappUrl: string;
  } | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        customerName: formData.customerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        shippingAddress: {
          city: formData.city,
          street: formData.street.trim(),
          emirate: formData.city,
          country: "United Arab Emirates",
        },
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image || "",
          size: item.size || "Standard",
          color: item.color || "Classic",
        })),
        notes: formData.notes.trim(),
      };

      const res = await fetch("/api/store/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      const orderNumber = data.orderNumber;

      // Construct detailed WhatsApp message including the official Order ID
      const itemsText = items
        .map(
          (i, idx) =>
            `${idx + 1}. *${i.name}* (x${i.quantity}) - AED ${i.price * i.quantity}${
              i.size ? ` [Size: ${i.size}]` : ""
            }${i.color ? ` [Color: ${i.color}]` : ""}`
        )
        .join("\n");

      const waMessage = `Hello BHT Collections! I have placed an order on your website:

*Order Number: #${orderNumber}*
• *Customer:* ${formData.customerName.trim()}
• *Phone:* ${formData.phone.trim()}
• *Email:* ${formData.email.trim()}
• *Delivery City:* ${formData.city}, UAE
${formData.street ? `• *Address:* ${formData.street.trim()}\n` : ""}${
        formData.notes ? `• *Notes:* ${formData.notes.trim()}\n` : ""
      }
*Ordered Items:*
${itemsText}

*Total Order Amount:* AED ${totalAmount.toFixed(2)}

Please confirm my order and provide delivery and payment details. Thank you!`;

      const whatsappUrl = `https://wa.me/971558879237?text=${encodeURIComponent(
        waMessage
      )}`;

      setPlacedOrder({ orderNumber, whatsappUrl });

      // Automatically attempt to redirect to WhatsApp in a new tab
      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank");
      }
    } catch (err) {
      console.error("[OrderModal] Error placing order:", err);
      setErrorMessage(
        (err instanceof Error ? err.message : "Unexpected error") ||
          (language === "ar"
            ? "حدث خطأ أثناء حفظ الطلب، يرجى المحاولة مرة أخرى."
            : "An error occurred while saving your order. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setPlacedOrder(null);
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E0E0E0] z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#F0F0F0] flex items-center justify-between bg-[#FAFAFA]">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-bht-red block mb-0.5">
              {language === "ar" ? "إتمام الطلب" : "CONFIRM YOUR ORDER"}
            </span>
            <h3
              className="text-lg sm:text-xl font-bold text-bht-charcoal"
              style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
            >
              {placedOrder
                ? language === "ar"
                  ? "تم تسجيل طلبك بنجاح!"
                  : "Order Successfully Placed!"
                : language === "ar"
                ? "بيانات العميل والمتابعة عبر واتساب"
                : "Customer Details & WhatsApp Checkout"}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-neutral-200 text-gray-600 hover:text-black shadow-xs flex items-center justify-center transition-colors border border-gray-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {placedOrder ? (
            /* ========================================================= */
            /* SUCCESS CONFIRMATION STATE                                */
            /* ========================================================= */
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-[#888888] mb-1">
                  {language === "ar" ? "رقم الطلب الرسمي" : "OFFICIAL ORDER NUMBER"}
                </p>
                <p className="text-2xl font-black font-mono text-bht-charcoal tracking-wider">
                  #{placedOrder.orderNumber}
                </p>
              </div>

              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                {language === "ar"
                  ? "تم حفظ وتوثيق طلبك في نظام BHT بنجاح. لقد تم فتح تطبيق واتساب للتواصل مع فريق المبيعات لتأكيد التوصيل والدفع."
                  : "Your order is recorded in our system. WhatsApp was opened so you can chat directly with our sales team for fast delivery and confirmation."}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={placedOrder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>
                    {language === "ar" ? "فتح واتساب الآن" : "Open WhatsApp Now"}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {language === "ar" ? "إغلاق" : "Done / Close"}
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* ORDER ENTRY FORM                                          */
            /* ========================================================= */
            <>
              {/* Product Items Summary Card */}
              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-[#E5E7EB] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-wider border-b border-[#E5E7EB] pb-2">
                  <span>{language === "ar" ? "المنتجات المطلوبة" : "Selected Items"}</span>
                  <span>
                    {items.length} {language === "ar" ? "صنف" : items.length > 1 ? "items" : "item"}
                  </span>
                </div>

                <div className="space-y-2.5 max-h-40 overflow-y-auto">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.image && (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill sizes="40px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-neutral-900 truncate">{item.name}</p>
                          <p className="text-[11px] text-neutral-500">
                            Qty: {item.quantity}
                            {item.size ? ` • ${item.size}` : ""}
                            {item.color ? ` • ${item.color}` : ""}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-900 shrink-0">
                        AED {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-700">
                    {language === "ar" ? "المجموع الكلي:" : "Total Amount:"}
                  </span>
                  <span className="text-base font-black text-bht-red">
                    AED {totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    {language === "ar" ? "الاسم الكامل *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    placeholder={language === "ar" ? "أدخل اسمك الكريم" : "e.g. Sheikh Mohammed"}
                    className="w-full bg-white text-xs sm:text-sm text-neutral-900 px-3.5 py-3 rounded-xl border border-[#D1D5DB] focus:border-bht-charcoal focus:ring-1 focus:ring-bht-charcoal focus:outline-none transition-all placeholder:text-neutral-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      {language === "ar" ? "رقم الهاتف / واتساب *" : "Phone / WhatsApp *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+971 50 123 4567"
                      className="w-full bg-white text-xs sm:text-sm text-neutral-900 px-3.5 py-3 rounded-xl border border-[#D1D5DB] focus:border-bht-charcoal focus:ring-1 focus:ring-bht-charcoal focus:outline-none transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      {language === "ar" ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="customer@domain.ae"
                      className="w-full bg-white text-xs sm:text-sm text-neutral-900 px-3.5 py-3 rounded-xl border border-[#D1D5DB] focus:border-bht-charcoal focus:ring-1 focus:ring-bht-charcoal focus:outline-none transition-all placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      {language === "ar" ? "الإمارة / المدينة" : "City / Emirate"}
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full bg-white text-xs sm:text-sm text-neutral-900 px-3.5 py-3 rounded-xl border border-[#D1D5DB] focus:border-bht-charcoal focus:outline-none cursor-pointer"
                    >
                      <option value="Dubai">Dubai (دبي)</option>
                      <option value="Abu Dhabi">Abu Dhabi (أبوظبي)</option>
                      <option value="Sharjah">Sharjah (الشارقة)</option>
                      <option value="Ajman">Ajman (عجمان)</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah (رأس الخيمة)</option>
                      <option value="Fujairah">Fujairah (الفجيرة)</option>
                      <option value="Umm Al Quwain">Umm Al Quwain (أم القيوين)</option>
                      <option value="Other GCC">Other GCC (دول الخليج)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      {language === "ar" ? "العنوان / المنطقة (اختياري)" : "Area / Street (Optional)"}
                    </label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) =>
                        setFormData({ ...formData, street: e.target.value })
                      }
                      placeholder={language === "ar" ? "مثال: ديرة، شارع بني ياس" : "e.g. Deira, WASL Bldg"}
                      className="w-full bg-white text-xs sm:text-sm text-neutral-900 px-3.5 py-3 rounded-xl border border-[#D1D5DB] focus:border-bht-charcoal focus:outline-none placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    {language === "ar" ? "ملاحظات إضافية (اختياري)" : "Notes / Delivery Instructions"}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder={
                      language === "ar"
                        ? "أي متطلبات خاصة للتوصيل أو التغليف..."
                        : "Special delivery or packing instructions..."
                    }
                    className="w-full bg-white text-xs sm:text-sm text-neutral-900 px-3.5 py-2.5 rounded-xl border border-[#D1D5DB] focus:border-bht-charcoal focus:outline-none placeholder:text-neutral-400 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#166534] hover:bg-[#14532d] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                    <span>
                      {isSubmitting
                        ? language === "ar"
                          ? "جاري تسجيل الطلب..."
                          : "PLACING ORDER..."
                        : language === "ar"
                        ? "تأكيد الطلب والمتابعة عبر واتساب"
                        : "CONFIRM ORDER & PROCEED TO WHATSAPP"}
                    </span>
                    {!isSubmitting && <ArrowIcon className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>
                    {language === "ar"
                      ? "الدفع عند الاستلام أو بالتحويل بعد تأكيد الطلب مع فريقنا"
                      : "Cash on delivery or direct bank transfer confirmed with our team"}
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
