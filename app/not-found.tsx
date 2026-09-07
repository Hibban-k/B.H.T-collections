// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p
        className="text-[#C49A6C] text-xs tracking-[0.25em] font-semibold uppercase mb-4"
        style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
      >
        404
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold text-[#0D1B2A] mb-4"
        style={{ fontFamily: "var(--font-playfair-display)" }}
      >
        Page Not Found
      </h1>
      <p className="text-[#6B7280] text-sm max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="btn-primary"
        >
          BACK TO HOME
        </Link>
        <Link
          href="/collections"
          className="btn-secondary"
        >
          VIEW COLLECTIONS
        </Link>
      </div>
    </div>
  );
}
