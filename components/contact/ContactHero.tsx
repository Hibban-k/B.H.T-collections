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
            ? "تواصل مع شركة بيت البطانيات للتجارة ذ.م.م في دبي ومكاتبنا الإقليمية عبر دول الخليج. تفضل بزيارة صالات العرض، أو ناقش طلبات التوزيع والجملة، أو تحدث مباشرة مع فريق خدمة العملاء."
            : "Connect with Blanket House Trading LLC in Dubai and our regional offices across the GCC. Visit our showrooms, discuss corporate & wholesale partnerships, or speak directly with our team."
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
              +971 4 2266 095 / +971 55 887 9237
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-1.5">
            <div className="text-bht-charcoal">
              <MapPin className="w-5 h-5 stroke-[1.8] text-bht-red" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 tracking-tight leading-tight">
              {language === "ar" ? "المقر الرئيسي في دبي" : "Dubai Head Office"}
            </h4>
            <p className="text-[11px] text-neutral-500 leading-snug">
              {language === "ar" ? "ميدان بني ياس، ديرة، دبي، الإمارات" : "Baniyas Square, Deira, Dubai, UAE"}
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
              {language === "ar" ? "السبت – الخميس: 9:00 ص – 1:30 م و 4:30 م – 9:00 م" : "Sat – Thu: 9:00 AM – 1:30 PM & 4:30 PM – 9:00 PM"}
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
              bhtrdg@eim.ae
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
