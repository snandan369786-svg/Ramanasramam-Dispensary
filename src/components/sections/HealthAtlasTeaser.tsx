import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conditions, featuredSlugs, getCategory } from "@/content/health-atlas";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ConditionGlyph } from "@/components/atlas/ConditionGlyph";

/** Home-page introduction to the Health Atlas. */
export function HealthAtlasTeaser() {
  const featured = featuredSlugs
    .map((s) => conditions.find((c) => c.slug === s))
    .filter((c) => c !== undefined);

  return (
    <section aria-labelledby="atlas-teaser-title" className="border-y border-line bg-paper py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="atlas-teaser-title"
              eyebrow="Health Atlas"
              title={
                <>
                  Understand your health, <em className="text-forest-soft">in plain words.</em>
                </>
              }
            />
          </div>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-[1.05rem] leading-[1.8] text-muted">
              Clear, carefully sourced explanations of common conditions — what happens
              inside the body, the signs to look out for, and when to see a doctor.
            </p>
            <Link
              href="/health-atlas"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-[3px] bg-forest px-6 py-3.5 text-[0.86rem] font-medium tracking-[0.02em] text-ivory transition-colors hover:bg-forest-deep"
            >
              Explore the Health Atlas
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.6} />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 80} className="bg-paper">
              <Link
                href={`/health-atlas/${c.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-ivory"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-sage/50 text-forest transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                  <ConditionGlyph icon={c.icon} className="h-5 w-5" />
                </span>
                <span className="eyebrow mt-6 text-[0.62rem] text-gold">{getCategory(c.category).name}</span>
                <span className="mt-2 font-serif text-[1.5rem] leading-tight text-forest-deep">{c.name}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8rem] font-medium text-forest">
                  Learn more
                  <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.6} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
