"use client";

import React from "react";
import { PageHeroIntro } from "@/components/hero/PageHeroIntro";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneCall, MapPin, Clock, Mail } from "lucide-react";

export const ContactHero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-white select-none" aria-label="Contact Us Hero">
      {/* 1. EDITORIAL HERO BANNER */}
      <PageHeroIntro
        title={language === "ar" ? "تواصل معنا" : "Contact us"}
        description={
          language === "ar"
            ? "تواصل مع شركة بيت البطانيات للتجارة ذ.م.م في دبي. تفضل بزيارة صالة عرضنا في ديرة، أو ناقش طلبات التوزيع والجملة، أو تحدث مباشرة مع فريق خدمة العملاء."
            : "Connect with Blanket House Trading LLC in Dubai. Visit our flagship showroom in Deira, discuss corporate & wholesale partnerships, or speak directly with our concierge team."
        }
      />

      {/* 2. QUICK CONTACT HIGHLIGHT PILLARS */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-b border-neutral-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Item 1 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <PhoneCall className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "الهاتف والواتساب" : "Call & WhatsApp"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug dir-ltr">
              +971 4 226 8838
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <MapPin className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "معرض دبي الرئيسي" : "Dubai Flagship"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar" ? "منطقة ديرة، دبي، الإمارات" : "Al Ras, Deira, Dubai, UAE"}
            </p>
          </div>

          {/* Item 3 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <Clock className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "ساعات العمل" : "Opening Hours"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar" ? "السبت – الخميس: 9ص – 9م" : "Sat – Thu: 9:00 AM – 9:00 PM"}
            </p>
          </div>

          {/* Item 4 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <Mail className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "البريد الإلكتروني" : "Direct Email"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              info@blankethouse.ae
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
