// app/not-found.tsx
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-[56px] md:py-[80px] lg:py-[104px] min-h-[60vh] flex items-center justify-center text-center">
      <div className="wrap flex flex-col items-center">
        <p className="block text-[11px] font-semibold leading-[1.5] tracking-[0.15em] uppercase text-red mb-[18px]">
          404
        </p>
        <h1 className="font-serif font-medium tracking-[-0.035em] text-[clamp(40px,5.3vw,72px)] leading-[1.08] text-ink mb-4">
          Page Not Found
        </h1>
        <p className="text-[14px] md:text-[15px] leading-[1.75] text-body mb-8 max-w-[48ch]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/">
            Back to home
          </Button>
          <Button href="/collections" variant="outline">
            View collections
          </Button>
        </div>
      </div>
    </section>
  );
}
