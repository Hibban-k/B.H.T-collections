import Link from "next/link";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <span className="text-sm font-semibold tracking-widest uppercase text-bht-red mb-3">
          404 Error
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-bht-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="text-bht-slate max-w-md mx-auto mb-8 text-sm md:text-base">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-bht-red hover:bg-bht-red-hover text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-sm"
        >
          Return to Homepage
        </Link>
      </main>
      <Footer />
    </div>
  );
}
