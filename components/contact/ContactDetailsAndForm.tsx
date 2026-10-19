"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Lock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ContactDetailsAndForm: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate instantaneous smooth submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 800);
  };

  return (
    <section
      id="contact-form-section"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 border-b border-[#F0F0F0] scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ========================================================= */}
          {/* LEFT COLUMN: OUR CONTACT DETAILS                          */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1 mb-2">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-neutral-600">
                <span className="text-bht-red font-black">R</span>EACH US
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-serif text-bht-charcoal font-normal tracking-tight mb-8">
              {language === "ar" ? "تفاصيل الاتصال بنا" : "Our Contact Details"}
            </h2>

            {/* List of 5 Contact Items */}
            <div className="space-y-6 sm:space-y-7">
              {/* 1. HEAD OFFICE */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] group-hover:bg-neutral-200 transition-colors flex items-center justify-center text-neutral-700 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-400 block mb-1">
                    {language === "ar" ? "المقر الرئيسي" : "HEAD OFFICE"}
                  </span>
                  <p className="text-sm font-semibold text-neutral-900 leading-snug">
                    BHT Collections
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-normal mt-0.5">
                    {language === "ar"
                      ? "دبي، الإمارات العربية المتحدة"
                      : "Dubai, United Arab Emirates (UAE)"}
                  </p>
                </div>
              </div>

              {/* 2. PHONE */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] group-hover:bg-neutral-200 transition-colors flex items-center justify-center text-neutral-700 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-400 block mb-1">
                    {language === "ar" ? "الهاتف" : "PHONE"}
                  </span>
                  <a
                    href="tel:+97141234567"
                    dir="ltr"
                    className="text-sm font-semibold text-neutral-900 hover:text-bht-red transition-colors inline-block"
                  >
                    +971 4 123 4567
                  </a>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-normal mt-0.5">
                    {language === "ar"
                      ? "الإثنين - السبت: 10 ص - 6 م بتوقيت الإمارات"
                      : "Mon - Sat: 10 AM - 6 PM UAE Time"}
                  </p>
                </div>
              </div>

              {/* 3. WHATSAPP */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] group-hover:bg-[#E7F8EE] transition-colors flex items-center justify-center text-neutral-700 group-hover:text-emerald-600 shrink-0 mt-0.5">
                  {/* WhatsApp SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-400 block mb-1">
                    {language === "ar" ? "واتساب" : "WHATSAPP"}
                  </span>
                  <a
                    href="https://wa.me/971501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="text-sm font-semibold text-neutral-900 hover:text-emerald-600 transition-colors inline-block"
                  >
                    +971 50 123 4567
                  </a>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-normal mt-0.5">
                    {language === "ar"
                      ? "تواصل معنا مباشرة عبر واتساب"
                      : "Chat with us on WhatsApp"}
                  </p>
                </div>
              </div>

              {/* 4. EMAIL */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] group-hover:bg-neutral-200 transition-colors flex items-center justify-center text-neutral-700 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-400 block mb-1">
                    {language === "ar" ? "البريد الإلكتروني" : "EMAIL"}
                  </span>
                  <a
                    href="mailto:info@bhtcollections.ae"
                    className="text-sm font-semibold text-neutral-900 hover:text-bht-red transition-colors inline-block"
                  >
                    info@bhtcollections.ae
                  </a>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-normal mt-0.5">
                    {language === "ar"
                      ? "سنرد عليك في أقرب وقت ممكن"
                      : "We'll respond as soon as possible"}
                  </p>
                </div>
              </div>

              {/* 5. BUSINESS HOURS */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] group-hover:bg-neutral-200 transition-colors flex items-center justify-center text-neutral-700 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-400 block mb-1">
                    {language === "ar" ? "ساعات العمل" : "BUSINESS HOURS"}
                  </span>
                  <p className="text-sm font-semibold text-neutral-900 leading-snug">
                    {language === "ar"
                      ? "الإثنين - السبت: 10 ص - 6 م بتوقيت الإمارات"
                      : "Mon - Sat: 10 AM - 6 PM UAE Time"}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-normal mt-0.5">
                    {language === "ar" ? "(مغلق يوم الأحد)" : "(Closed on Sunday)"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: CONTACT FORM (WE'D LOVE TO HEAR FROM YOU)    */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1 mb-2">
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-neutral-600">
                <span className="text-bht-red font-black">S</span>END US A MESSAGE
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-serif text-bht-charcoal font-normal tracking-tight mb-2">
              {language === "ar"
                ? "يسعدنا دائماً التواصل معك"
                : "We'd Love to Hear From You"}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-neutral-500 mb-8 font-normal">
              {language === "ar"
                ? "املأ النموذج أدناه وسيقوم فريقنا بالرد عليك في أقرب وقت."
                : "Fill out the form below and our team will get back to you shortly."}
            </p>

            {/* Submission Success Banner */}
            {isSubmitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold">
                    {language === "ar"
                      ? "تم استلام رسالتك بنجاح!"
                      : "Your message has been sent successfully!"}
                  </p>
                  <p className="text-emerald-700 mt-0.5">
                    {language === "ar"
                      ? "شكراً لتواصلك معنا، سيتصل بك فريقنا قريباً."
                      : "Thank you for reaching out. Our team will contact you shortly."}
                  </p>
                </div>
              </div>
            )}

            {/* The Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder={
                      language === "ar" ? "الاسم الكامل *" : "Full Name *"
                    }
                    className="w-full bg-white text-sm text-neutral-900 px-4 py-3.5 rounded-lg border border-[#E2E4E8] focus:border-bht-charcoal focus:ring-1 focus:ring-bht-charcoal focus:outline-none transition-all placeholder:text-neutral-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={
                      language === "ar" ? "البريد الإلكتروني *" : "Email Address *"
                    }
                    className="w-full bg-white text-sm text-neutral-900 px-4 py-3.5 rounded-lg border border-[#E2E4E8] focus:border-bht-charcoal focus:ring-1 focus:ring-bht-charcoal focus:outline-none transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* Row 2: Subject Dropdown */}
              <div className="relative">
                <select
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-white text-sm text-neutral-900 px-4 py-3.5 rounded-lg border border-[#E2E4E8] focus:border-bht-charcoal focus:ring-1 focus:ring-bht-charcoal focus:outline-none transition-all appearance-none cursor-pointer placeholder:text-neutral-400"
                >
                  <option value="" disabled>
                    {language === "ar" ? "اختر موضوع الاستفسار *" : "Subject *"}
                  </option>
                  <option value="general">
                    {language === "ar" ? "استفسار عام" : "General Inquiry"}
                  </option>
                  <option value="wholesale">
                    {language === "ar"
                      ? "طلبات الجملة والتوزيع"
                      : "Wholesale & Bulk Orders"}
                  </option>
                  <option value="products">
                    {language === "ar"
                      ? "استفسار عن المنتجات"
                      : "Product Information & Availability"}
                  </option>
                  <option value="support">
                    {language === "ar"
                      ? "خدمة العملاء ومتابعة الطلبات"
                      : "Customer Support & Orders"}
                  </option>
                  <option value="partnership">
                    {language === "ar"
                      ? "الشراكات والتوكيلات"
                      : "Partnership & Brand Inquiries"}
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-neutral-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Row 3: Your Message Textarea */}
              <div>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={
                    language === "ar"
                      ? "اكتب رسالتك هنا..."
                      : "Your Message *\nType your message here..."
                  }
                  className="w-full bg-white text-sm text-neutral-900 px-4 py-3.5 rounded-lg border border-[#E2E4E8] focus:border-bht-charcoal focus:ring-1 focus:ring-bht-charcoal focus:outline-none transition-all placeholder:text-neutral-400 resize-y min-h-[140px]"
                />
              </div>

              {/* Row 4: Solid Black SEND MESSAGE Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] hover:bg-[#222222] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
                >
                  <span>
                    {isSubmitting
                      ? language === "ar"
                        ? "جاري الإرسال..."
                        : "SENDING..."
                      : language === "ar"
                      ? "إرسال الرسالة"
                      : "SEND MESSAGE"}
                  </span>
                  {!isSubmitting && (
                    <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  )}
                </button>
              </div>

              {/* Row 5: Security Assurance */}
              <div className="flex items-center gap-2 text-neutral-500 pt-1">
                <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  {language === "ar"
                    ? "معلوماتك آمنة وسرية تماماً لدينا."
                    : "Your information is safe and secure with us."}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
