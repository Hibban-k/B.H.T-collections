"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CircularFlag } from "@/components/regional-presence/CircularFlag";
import { REGIONAL_CONTACTS } from "@/data/regionalContacts";

export const ContactStoreLocation: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [selectedId, setSelectedId] = useState("uae");
  const selected = REGIONAL_CONTACTS.find((region) => region.id === selectedId) || REGIONAL_CONTACTS[0];
  const ar = language === "ar";
  const name = ar ? selected.nameAr : selected.nameEn;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const address = ar ? selected.addressAr || selected.addressEn : selected.addressEn;
  const hours = ar ? selected.hoursAr || selected.hoursEn : selected.hoursEn;
  const hasContact = selected.phone || selected.email || address;

  function navigate(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % REGIONAL_CONTACTS.length;
    else if (event.key === "ArrowUp") next = (index - 1 + REGIONAL_CONTACTS.length) % REGIONAL_CONTACTS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = REGIONAL_CONTACTS.length - 1;
    else return;
    event.preventDefault();
    setSelectedId(REGIONAL_CONTACTS[next].id);
    document.getElementById(`region-tab-${REGIONAL_CONTACTS[next].id}`)?.focus();
  }

  return (
    <section id="store-location" aria-labelledby="locations-title" className="bht-section bg-[#faf9f7] scroll-mt-24 border-b border-neutral-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mb-10 sm:mb-12">
          <p className="bht-eyebrow uppercase text-neutral-500 mb-4">{ar ? "تواصل معنا" : "Find us"}</p>
          <h2 id="locations-title">{ar ? "مواقعنا وتواصلنا الإقليمي" : "Locations & regional contacts"}</h2>
          <p className="bht-copy mt-4 text-neutral-600">{ar ? "اختر المنطقة لعرض موقعها وبيانات التواصل." : "Choose a region to explore its location and contact details."}</p>
        </div>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:hidden">
            <label htmlFor="contact-region" className="block mb-2 text-sm text-neutral-600">{ar ? "المنطقة" : "Region"}</label>
            <select id="contact-region" value={selected.id} onChange={(event) => setSelectedId(event.target.value)} aria-controls="regional-contact-details" className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-base">
              {REGIONAL_CONTACTS.map((region) => <option key={region.id} value={region.id}>{ar ? region.nameAr : region.nameEn}</option>)}
            </select>
          </div>
          <div role="tablist" aria-label={ar ? "المنطقة" : "Region"} aria-orientation="vertical" className="hidden lg:block lg:col-span-5 lg:order-2 border-y border-neutral-200">
            {REGIONAL_CONTACTS.map((region, index) => <button key={region.id} id={`region-tab-${region.id}`} role="tab" type="button" aria-selected={selected.id === region.id} aria-controls="regional-contact-details" tabIndex={selected.id === region.id ? 0 : -1} onClick={() => setSelectedId(region.id)} onKeyDown={(event) => navigate(event, index)} className={`flex w-full items-center gap-4 px-4 py-5 border-b last:border-b-0 border-neutral-200 text-start transition-colors ${selected.id === region.id ? "bg-white text-bht-red" : "text-neutral-600 hover:bg-white"}`}>
              <span aria-hidden="true"><CircularFlag country={region.flag} size={28} /></span>
              <span className="flex-1 text-base font-medium">{ar ? region.nameAr : region.nameEn}</span>
              <Arrow className="w-4 h-4" aria-hidden="true" />
            </button>)}
          </div>
          <div id="regional-contact-details" role="tabpanel" aria-labelledby={`region-tab-${selected.id}`} tabIndex={0} className="lg:col-span-7 lg:order-1 min-w-0">
            <div key={selected.id} className="regional-contact-enter">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#eeece6]">
                {selected.image ? <Image src={selected.image} alt={selected.imageAlt || name} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" /> : <div className="h-full flex flex-col items-center justify-center gap-5"><CircularFlag country={selected.flag} size={88} /><span className="text-neutral-600 text-sm tracking-wide">{name}</span></div>}
              </div>
              <div className="pt-7 sm:pt-8">
                <h3 className="text-2xl sm:text-3xl mb-5">{name}</h3>
                {selected.usesDubaiTeam && <p className="bht-copy text-neutral-600 mb-6">{ar ? "فريق المبيعات في دبي — جهة التواصل لهذه المنطقة. الصورة والعنوان المعروضان هنا لموقع دبي." : "Dubai sales team — your contact for this region. The image and address shown here are for our Dubai location."}</p>}
                {!hasContact && <p className="bht-copy text-neutral-600 mb-6">{ar ? "تواصل مع فريقنا للحصول على معلومات التواصل والخدمة في هذه المنطقة." : "Contact our team for local contact and service information in this region."}</p>}
                <dl className="grid sm:grid-cols-2 gap-x-7 gap-y-5 text-sm text-neutral-700">
                  {address && <div className="sm:col-span-2"><dt className="flex items-center gap-2 text-neutral-500 text-xs mb-2"><MapPin className="w-4 h-4" />{ar ? "العنوان" : "Address"}</dt><dd className="leading-7">{address}</dd></div>}
                  {selected.phone && <div><dt className="flex items-center gap-2 text-neutral-500 text-xs mb-2"><Phone className="w-4 h-4" />{ar ? "الهاتف" : "Telephone"}</dt><dd><a dir="ltr" className="inline-block hover:text-bht-red" href={`tel:${selected.phone.replace(/\s/g, "")}`}>{selected.phone}</a></dd></div>}
                  {selected.whatsapp && <div><dt className="flex items-center gap-2 text-neutral-500 text-xs mb-2"><MessageCircle className="w-4 h-4" />{ar ? "واتساب" : "WhatsApp"}</dt><dd><a dir="ltr" className="inline-block hover:text-bht-red" href={`https://wa.me/${selected.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">{selected.whatsapp}</a></dd></div>}
                  {selected.email && <div><dt className="flex items-center gap-2 text-neutral-500 text-xs mb-2"><Mail className="w-4 h-4" />{ar ? "البريد الإلكتروني" : "Email"}</dt><dd><a dir="ltr" className="break-all hover:text-bht-red" href={`mailto:${selected.email}`}>{selected.email}</a></dd></div>}
                  {hours && <div><dt className="flex items-center gap-2 text-neutral-500 text-xs mb-2"><Clock className="w-4 h-4" />{ar ? "ساعات العمل" : "Opening hours"}</dt><dd className="leading-7">{hours}</dd></div>}
                </dl>
                <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-neutral-200">
                  {selected.mapUrl && <a href={selected.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center text-sm font-medium hover:text-bht-red">{selected.usesDubaiTeam ? (ar ? "الاتجاهات إلى موقع دبي" : "Directions to Dubai location") : (ar ? "الاتجاهات" : "Get directions")}<Arrow className="w-4 h-4" /></a>}
                  <a href="#contact-form-section" className="inline-flex gap-2 items-center text-sm font-medium hover:text-bht-red">{ar ? "إرسال استفسار" : "Send an inquiry"}<Arrow className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
