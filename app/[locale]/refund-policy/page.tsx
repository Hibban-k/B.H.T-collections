import { getRequestLanguage } from "@/lib/seo/request-language";
import { constructRegionalMetadata as constructMetadata } from "@/lib/seo/regional-metadata";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return constructMetadata({
    path: `/${locale}/refund-policy`,
    title: (await getRequestLanguage()) === "ar" ? "سياسة الاسترجاع واسترداد المبالغ | بيت البطانيات للتجارة" : "Refund & Return Policy | Blanket House Trading LLC",
    description: (await getRequestLanguage()) === "ar" ? "سياسة الاسترجاع واسترداد المبالغ لدى بيت البطانيات للتجارة ذ.م.م في دبي، الإمارات." : "Official Refund & Return Policy of Blanket House Trading LLC Dubai, UAE.",
  });
}

export default async function RefundPolicyPage() {
  const ar = (await getRequestLanguage()) === "ar";
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <span className="text-xs font-bold uppercase tracking-widest text-bht-red mb-2 block">
          {ar ? "رضا العملاء والضمان" : "CUSTOMER SATISFACTION & GUARANTEE"}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-bht-charcoal font-normal tracking-tight mb-8">
          {ar ? "سياسة الاسترجاع واسترداد المبالغ" : "Refund & Return Policy"}
        </h1>

        <div className="space-y-8 text-sm sm:text-base text-neutral-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "١. ضمان الجودة وشروط الأهلية" : "1. Quality Guarantee & Eligibility"}</h2>
            <p>
              {ar ? "نعتز في بيت البطانيات للتجارة ذ.م.م بجودة صناعة مجموعات المفروشات وحقائب السفر والأحذية وراحتها. إذا لم تكن راضياً تماماً عن مشترياتك، يمكنك بدء طلب إرجاع أو استبدال خلال 14 يوماً تقويمياً من تاريخ التوصيل." : <>
              At Blanket House Trading LLC, we take immense pride in the craftsmanship and comfort of our bedding, travel luggage, and footwear collections. If you are not completely satisfied with your purchase, you may initiate a return or exchange within 14 calendar days of delivery.
              </>}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "٢. حالة المنتجات عند الإرجاع" : "2. Condition of Items for Return"}</h2>
            <p>
              {ar ? "لاستحقاق استرداد المبلغ، يجب أن تكون المنتجات بحالتها الأصلية وغير مستخدمة أو مغسولة، مع سلامة جميع عبوات الشركة المصنعة الأصلية والبطاقات والأختام والملحقات." : <>
              To qualify for a refund, items must be in their original, unused, unwashed condition with all authentic manufacturer packaging, tags, seals, and accessories intact.
              </>}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "٣. معالجة المبالغ المستردة" : "3. Processing Refunds"}</h2>
            <p>
              {ar ? "بعد استلام المنتج المرتجع وفحصه من فريق ضمان الجودة في دبي، تتم معالجة استرداد المبلغ عبر وسيلة الدفع الأصلية خلال 5–7 أيام عمل." : <>
              Once your returned item is received and inspected by our Dubai quality assurance team, your refund will be processed promptly via the original payment method within 5–7 business days.
              </>}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "٤. المنتجات التالفة أو المعيبة" : "4. Damaged or Defective Items"}</h2>
            <p>
              {ar ? "إذا استلمت منتجاً به عيب تصنيعي أو تلف أثناء النقل، يرجى إبلاغنا خلال 48 ساعة من الاستلام. سنرتب استبدالاً مجانياً أو استرداداً كاملاً للمبلغ فوراً." : <>
              If an item is received with a manufacturing defect or transit damage, please notify us within 48 hours of receipt. We will arrange a complimentary replacement or full refund immediately.
              </>}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "٥. كيفية تقديم طلب إرجاع" : "5. How to Initiate a Return"}</h2>
            <p>
              {ar ? <>{"لبدء طلب إرجاع أو استبدال، تواصل مع فريق خدمة العملاء عبر البريد الإلكتروني "}<a href="mailto:info@blankethouse.ae" className="text-bht-red font-semibold hover:underline">info@blankethouse.ae</a>{" أو الهاتف، أو قم بزيارة معرضنا في ديرة، دبي."}</> : <>
              To start a return or exchange, contact our customer concierge at <a href="mailto:info@blankethouse.ae" className="text-bht-red font-semibold hover:underline">info@blankethouse.ae</a> or reach out to our team via phone or showroom visit in Deira, Dubai.
              </>}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
