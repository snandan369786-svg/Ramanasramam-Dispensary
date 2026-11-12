import Link from "next/link";
import { ArrowRight, Info, Stethoscope } from "lucide-react";
import { atlasMeta } from "@/content/health-atlas";

/** Discreet educational disclaimer, with review status stated honestly. */
export function AtlasDisclaimer({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="Medical disclaimer"
      className={`flex gap-4 rounded-[6px] border border-line bg-paper p-6 text-[0.86rem] leading-relaxed text-muted sm:p-7 ${className}`}
    >
      <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
      <div>
        <p>{atlasMeta.disclaimer}</p>
        <p className="mt-2 text-[0.8rem] text-muted/90">
          {atlasMeta.review
            ? `Reviewed by ${atlasMeta.review.name}, ${atlasMeta.review.date}.`
            : "Compiled from the public sources cited on each page."}{" "}
          Last updated {atlasMeta.lastUpdated}.
        </p>
      </div>
    </aside>
  );
}

/** Closing invitation to see a doctor at the dispensary. */
export function AtlasCta() {
  return (
    <section aria-labelledby="atlas-cta-title" className="bg-forest-deep py-20 text-ivory sm:py-24">
      <div className="container-page flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="flex gap-6">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-light/40 text-gold-light sm:inline-flex">
            <Stethoscope aria-hidden className="h-6 w-6" strokeWidth={1.3} />
          </span>
          <div>
            <h2 id="atlas-cta-title" className="display text-[2rem] sm:text-[2.6rem]">
              Have a question about your health?{" "}
              <em className="text-gold-light">Speak with a doctor.</em>
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-ivory/75">
              Reading can help you understand a condition, but only a doctor can
              assess your health. Consultations at the dispensary are free of charge.
            </p>
          </div>
        </div>
        <Link
          href="/#visit"
          scroll={false}
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-[3px] border border-ivory bg-ivory px-6 py-3.5 text-[0.86rem] font-medium text-forest-deep transition-colors hover:bg-white"
        >
          Plan your visit
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.6} />
        </Link>
      </div>
    </section>
  );
}
