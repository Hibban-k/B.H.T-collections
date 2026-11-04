"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ArrowLeft, Star, ShieldCheck, CheckCircle2 } from "lucide-react";

export const AboutPastFatherSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="bht-section w-full bg-white py-16 sm:py-24 overflow-hidden border-b border-[#F0F0F0]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div data-reveal-group="split" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT: History & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Heritage Monogram Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-bht-red flex items-center justify-center font-black text-xs border border-red-100 shadow-2xs">
                <span>BHT</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-arabic">
                بيت البطانيات للتجارة ذ.م.م
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-bht-charcoal font-normal tracking-tight leading-[1.18] mb-3 max-w-xl">
              {language === "ar"
                ? "عن بيت البطانيات: حكاية البدايات وتراث الجودة في دبي."
                : "About Blanket House: Where It All Began in Dubai."}
            </h2>

            {/* Heritage Stars */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                ))}
              </div>
              <span className="text-xs text-neutral-500 font-semibold">
                {language === "ar" ? "تأسست في دبي عام 2009 • التزام بالجودة" : "Established in Dubai (2009) • Proven Quality"}
              </span>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base font-normal max-w-xl mb-6">
              <p>
                {language === "ar"
                  ? "تأسست شركة بيت البطانيات للتجارة ذ.م.م عام 2009 في مدينة دبي النابضة بالحياة على يد خبير متمرس يتمتع بأكثر من 15 عاماً من الخبرة العملية في قطاع البطانيات والمفروشات. قبل إطلاق مشروعنا، أمضى مؤسسنا أكثر من عقد في العمل مع كبرى المصانع والموردين في كوريا الجنوبية، متقناً فن انتقاء أجود المواد الخام وبناء شراكات دولية وثيقة. شكلت هذه المعرفة العميقة وشبكة العلاقات الموثوقة الأساس المتين لشركة مكرسة للتميز في الجودة والقيمة."
                  : "Established in 2009 in the vibrant city of Dubai, BLANKET HOUSE TRADING L.L.C. was founded by a seasoned industry expert with over 15 years of hands-on experience in the blanket sector. Prior to launching our venture, our founder spent more than a decade working with leading Korean suppliers, mastering the art of sourcing premium materials and building strong international partnerships. This deep-rooted knowledge and trusted network laid the foundation for a business dedicated to excellence in quality and value."}
              </p>
              <p>
                {language === "ar"
                  ? "منذ البداية، وضعنا نصب أعيننا إعادة تعريف سوق البطانيات في الإمارات وخارجها. رؤيتنا الراسخة هي تقديم أرقى أنواع البطانيات بأفضل الأسعار التنافسية الممكنة — دون المساومة إطلاقاً على جودة المواد الخام. نؤمن بأن القيمة الحقيقية تأتي من استخدام أقمشة رفيعة المستوى وحرفية عالية، دون تقليل التكاليف على حساب الجودة."
                  : "From the very beginning, we set out to redefine the blanket market in the UAE and beyond. Our unwavering vision is to deliver the finest quality blankets at the most competitive prices possible—without ever compromising on raw materials. We believe true value comes from using high-grade fabrics and craftsmanship, never cutting corners to reduce costs."}
              </p>
            </div>

            {/* Trust-Building Quality & Verification Card */}
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF9F6] to-white border border-[#E8E5DF] shadow-sm relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-bht-red flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                  <ShieldCheck className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                      {language === "ar"
                        ? "عهد الجودة والأمانة المعتمدة"
                        : "Certified Quality & Handshake Trust"}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      {language === "ar" ? "معايير معتمدة" : "UAE Verified"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                    {language === "ar"
                      ? "كل قطعة تمر بفحص يدوي دقيق للأقمشة والدرزات والمتانة، لضمان أعلى مستويات الراحة والأصالة التي توارثتها عائلات الإمارات عبر العقود."
                      : "Every textile, luggage seam, and sole undergoes rigorous hands-on inspection to guarantee the enduring comfort and authentic reliability trusted by UAE families for decades."}
                  </p>
                </div>
              </div>
            </div>

            {/* Link to Brands */}
            <div>
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-bht-charcoal hover:text-bht-red group transition-colors"
              >
                <span>{language === "ar" ? "تعرف على علاماتنا وشركائنا" : "VIEW OUR AUTHORIZED BRANDS"}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Framed Archival Vintage Image */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[560px] aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 group">
              <Image
                src="/about/founder-father-heritage.jpg"
                alt="Founding of Blanket House Trading LLC Dubai"
                fill
                className="object-cover object-center filter sepia-[0.15] transition-transform duration-700 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

              {/* Archival Tag */}
              <div className="absolute bottom-5 inset-x-5 text-white">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-300 block mb-1">
                  {language === "ar" ? "الأرشيف التاريخي للتأسيس" : "HISTORIC FOUNDING ARCHIVE"}
                </span>
                <p className="text-xs sm:text-sm font-serif font-bold text-white">
                  {language === "ar"
                    ? "بدايات بيت البطانيات للتجارة ذ.م.م — دبي (2009)"
                    : "The Founding Journey of Blanket House Trading LLC — Dubai (2009)"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
