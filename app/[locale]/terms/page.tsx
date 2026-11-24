import { getRequestLanguage } from "@/lib/seo/request-language";
import { constructRegionalMetadata as constructMetadata } from "@/lib/seo/regional-metadata";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return constructMetadata({
    path: `/${locale}/terms`,
    title: (await getRequestLanguage()) === "ar" ? "الشروط والأحكام | بيت البطانيات للتجارة" : "Terms & Conditions | Blanket House Trading LLC",
    description: (await getRequestLanguage()) === "ar" ? "شروط وأحكام استخدام الموقع والتعاملات التجارية لدى بيت البطانيات للتجارة ذ.م.م في دبي." : "Terms and conditions of use and commercial trade of Blanket House Trading LLC Dubai.",
  });
}

export default async function TermsPage() {
  const ar = (await getRequestLanguage()) === "ar";
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <span className="text-xs font-bold uppercase tracking-widest text-bht-red mb-2 block">
          {ar ? "الشروط القانونية والتجارية" : "LEGAL & COMMERCIAL TERMS"}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-bht-charcoal font-normal tracking-tight mb-8">
          {ar ? "الشروط والأحكام" : "Terms & Conditions"}
        </h1>

        <div className="space-y-8 text-sm sm:text-base text-neutral-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "١. قبول الشروط" : "1. Acceptance of Terms"}</h2>
            <p>
              {ar ? "بدخولك إلى هذا الموقع واستخدامه أو الاستفسار عن المنتجات أو شراء البضائع من بيت البطانيات للتجارة ذ.م.م، فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع القوانين واللوائح المعمول بها في دولة الإمارات." : <>
              By accessing and using this website, inquiring about products, or purchasing goods from Blanket House Trading LLC, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in the United Arab Emirates.
              </>}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "٢. الملكية الفكرية" : "2. Intellectual Property"}</h2>
            <p>
              {ar ? "جميع العلامات التجارية والصور والنصوص والشعارات المعروضة على هذا الموقع، بما فيها BHT Collections والعلامات المعتمدة، مملوكة لبيت البطانيات للتجارة ذ.م.م أو لأصحابها المعنيين، وتخضع لحماية قوانين الملكية الفكرية في الإمارات." : <>
              All trademarks, brands, photography, text, and logos displayed on this site, including BHT Collections and authorized labels, are the property of Blanket House Trading LLC or their respective owners and are protected by UAE intellectual property laws.
              </>}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "٣. الطلبات والبيع بالجملة والأسعار" : "3. Orders, Wholesale & Pricing"}</h2>
            <p>
              {ar ? "تخضع جميع الطلبات للقبول وتوفر المنتجات. نبذل كل جهد لعرض أوصاف ومواصفات دقيقة لمجموعات المفروشات وحقائب السفر والأحذية، ونحتفظ بحق تصحيح أي أخطاء مطبعية." : <>
              All orders are subject to acceptance and product availability. While we make every effort to display accurate descriptions and specifications for our bedding, travel luggage, and footwear lines, we reserve the right to correct any typographical errors.
              </>}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "٤. القانون الواجب التطبيق والاختصاص القضائي" : "4. Governing Law & Jurisdiction"}</h2>
            <p>
              {ar ? "تخضع هذه الشروط والأحكام لقوانين إمارة دبي والقوانين الاتحادية لدولة الإمارات وتُفسر وفقاً لها. وتخضع أي نزاعات ناشئة عنها للاختصاص الحصري لمحاكم دبي." : <>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the Dubai Courts.
              </>}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{ar ? "٥. التواصل مع الشركة" : "5. Company Contact"}</h2>
            <p>
              {ar ? <>{"للاستفسارات القانونية أو التجارية، يرجى التواصل مع بيت البطانيات للتجارة ذ.م.م في المنطقة التجارية، ديرة، دبي، الإمارات، أو عبر البريد الإلكتروني "}<a href="mailto:info@blankethouse.ae" className="text-bht-red font-semibold hover:underline">info@blankethouse.ae</a>{"."}</> : <>
              For any legal or commercial inquiries, please reach out to Blanket House Trading LLC, Commercial District, Deira, Dubai, UAE, or email <a href="mailto:info@blankethouse.ae" className="text-bht-red font-semibold hover:underline">info@blankethouse.ae</a>.
              </>}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
