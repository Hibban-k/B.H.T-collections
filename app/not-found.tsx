// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <p className="eyebrow" style={{ color: 'var(--color-red)' }}>
          404
        </p>
        <h1 style={{ marginBottom: '1rem' }}>
          Page Not Found
        </h1>
        <p style={{ marginBottom: '2rem' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/" className="btn">
            Back to home
          </Link>
          <Link href="/collections" className="btn outline">
            View collections
          </Link>
        </div>
      </div>
    </section>
  );
}
